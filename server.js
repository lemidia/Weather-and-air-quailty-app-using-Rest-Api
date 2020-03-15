const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.listen(process.env.PORT || 3000, () => console.log(`Listening at port ${process.env.PORT}`));
app.use(express.static('public'));
app.use(express.json({limit:'5mb'}))
require('dotenv').config();

// app.post('/api', (request, response) => {
//     lat = request.body.lat;
//     long = request.body.long;
// })

app.get('/address/:latlong', async (request, response) => {
    // KaKao REST API: 좌표 -> 주소 변환
    // params : x: longitude
    //          y: latitude
    //          input_coord: transition from

    const latlong = request.params.latlong.split(',');
    const lat = latlong[0];
    const long = latlong[1];

    const kakaoRestApiForAddress = `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${long}&y=${lat}&input_coord=WGS84`;

    const res_address =  await fetch(kakaoRestApiForAddress, {
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': process.env.AUTH_KEY_KAKAO // Insert your own APP KEY (Kakao)
        }
    });

    const data_address =  await res_address.json();
    const addressLists = data_address.documents[0].address;
    const result_address =  addressLists.region_1depth_name + ' ' + addressLists.region_2depth_name
    + ' ' + addressLists.region_3depth_name;
    
    response.json({result_address});
})

app.get('/current_weather/:latlong', async (request, response) => {
    
    // WeatherMap REST API: 현재 날씨 정보
    // params : lon: longitude
    //          lat: latitude
    //          authKeyForWeatherMap: authorization API key (personal)

    const latlong = request.params.latlong.split(',');
    const lat = latlong[0];
    const long = latlong[1];

    const authKeyForWeatherMap = process.env.AUTH_KEY_FOR_WEATHER_MAP;

    const weatherMapRestApiForCurrentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${authKeyForWeatherMap}`
    const res_current_weather = await fetch(weatherMapRestApiForCurrentWeather);
    const data_current_weather = await res_current_weather.json();

    response.json({current_weather: data_current_weather});
});

    // WeatherMap REST API:  예보 날씨 정보
    // params : lon: longitude
    //          lat: latitude
    //          authKeyForWeatherMap: authorization API key (personal)
    //          cnt: 불러올 날씨 예보 리스트 개수 (3시간 마다)

app.get('/forecast/:latlong', async (request, response) => {

    const latlong = request.params.latlong.split(',');
    const lat = latlong[0];
    const long = latlong[1];

    const cnt = 8
    const authKeyForWeatherMap = process.env.AUTH_KEY_FOR_WEATHER_MAP;
    const weatherMapRestApiForForecast = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${authKeyForWeatherMap}&cnt=${cnt}`
    const res_forecast = await fetch(weatherMapRestApiForForecast);
    const data_forecast = await res_forecast.json();

    response.json({weather_forecast: data_forecast});
});

app.get('/transform/:latlong', async (request, response) => {

    // KaKao REST API: 죄표계 변환, WGS84 to TM 
    // params : x: longitude
    //          y: latitude
    //          input_coord: transition from
    //          output_coord: transition to

    const latlong = request.params.latlong.split(',');
    const lat = latlong[0];
    const long = latlong[1];

    const input_coord = 'WGS84'
    const output_coord = 'TM'

    const kakaoRESTApiForCoords = `https://dapi.kakao.com/v2/local/geo/transcoord.json?x=${long}&y=${lat}&input_coord=${input_coord}&output_coord=${output_coord}`;

    const res_coords = await fetch(kakaoRESTApiForCoords ,{
        method:'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization': process.env.AUTH_KEY_KAKAO // Insert your own APP KEY (Kakao)
        }
    })

    const data_coords = await res_coords.json();
    const coords = data_coords.documents[0]
    const tmX = coords.x;
    const tmY = coords.y;
    response.json({tmX, tmY})
});

app.get('/near_location/:tmXtmY', async (request, response) => {

    // 한국환경공단 REST API: TM 좌표 기반 근접 측정소 목록 조회 
    // params : tmX: tm coord x
    //          tmY: tm coord y
    //          ServiceKey: authorization API key (personal)

    const tmXtmY = request.params.tmXtmY.split(',');
    const tmX = tmXtmY[0];
    const tmY = tmXtmY[1];

    const authKeyForLocation = process.env.AUTH_KEY_FOR_LOCATION;

    const airKoreaRestApiForLocation = `http://openapi.airkorea.or.kr/openapi/services/rest/MsrstnInfoInqireSvc/getNearbyMsrstnList?tmX=${tmX}&tmY=${tmY}&ServiceKey=${authKeyForLocation}&_returnType=json`;

    const res_near_location = await fetch(airKoreaRestApiForLocation);
    const data_near_location = await res_near_location.json();
    // const addr = data_near_location.list[0].addr;
    const stationName = data_near_location.list[0].stationName;
    response.json({stationName});
});

app.get('/current_aq_info/:near_stationName', async (request, response) => {

    // 한국환경공단 REST API: 측정소별 실시간 측정정보 조회
    // params : stationName: Station name on current location
    //          ServiceKey: authorization API key (personal)

    const stationName = encodeURI(request.params.near_stationName);
    const authKeyForRealTimeInfo = process.env.AUTH_KEY_FOR_REALTIME_INFO;
    const airKoreaRestApiForRealTimeInfo = `http://openapi.airkorea.or.kr/openapi/services/rest/ArpltnInforInqireSvc/getMsrstnAcctoRltmMesureDnsty?stationName=${stationName}&dataTerm=month&pageNo=1&numOfRows=10&ServiceKey=${authKeyForRealTimeInfo}&ver=1.3&_returnType=json`;
    const res_real_time_info = await fetch(airKoreaRestApiForRealTimeInfo);
    const data_real_time_info = await res_real_time_info.json();

    response.json({current_aq_info: data_real_time_info})
})