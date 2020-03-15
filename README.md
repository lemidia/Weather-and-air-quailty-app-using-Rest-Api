# Weather-and-air-quailty-app-using-Rest-Api
Rest Api를 이용해 현재 사용자의 위치를 기반으로 한 날씨와 대기상태를 보여주는 웹 어플리케이션 입니다.

사용자가 브라우저로 서버에 웹 애플리케이션을 요청하면 서버는 사용자로부터 위도와 경도의 위치 값을 받아 그 값으로 현재 지역의 날씨와 대기 상태를 Rest Api로 부터 얻고 이를 클라이언트에 전송합니다. 클라이언트의 자바스크립트 파일은 이 정보로 html Dom 엘리먼트를 조작하여 정보를 표시합니다. 

사용자의 위치는 카카오 Api, 날씨는 Open whather map, 대기정보는 한국환경공단 에어코리아의 Api 데이터를 이용하였습니다.

앱에 들어간 온도 차트는 Chart.js 이용하였고, 전체적인 앱 스타일링은 Pure CSS를 적용하였습니다.

## Used Tech, Packages, Libraris, Dependencies in the project.
- HTML 5
- CSS 3
- Java Script
- Chart.js
- Node.js
- nodemon: To server restart
- Express.js: Node.js package
- dotenv: Configuration private setting data
- chart.js - chart
- font awesome - icon

## 사전 지식
- Api(Application proramming interface) and Api call
- 클라이언트-서버 모델
- http 통신 - request and response
- URL
- html
- Javascript
- css
- javascript Dom manipulation
- Node.js
- npm

## Make sure

- Node.js가 사전에 설치되어 있어야 합니다.
- 카카오 개발자 센터 API키와 한국환경공단 에어코리아의 근접측정소 목록 및 대기환경상태에 대한 API키가 필요합니다.

## How to run

1. 저장소를 클론합니다.
2. 터미널을 열고 프로젝트 폴더로 이동한 다음, 명령어 'npm install'을 실행함으로써 package.json에 있는 의존성들을 설치합니다.
3. .env 파일을 만들고, API 키를 기입합니다.
4. 터미널에서 'npm start'를 쳐서 서버를 작동합니다. 기본 포트는 3000 입니다. 
5. 127.0.0.1/3000으로 접속합니다.

## Demo

다음 링크에서 예제 프로젝트를 확인 하실 수 있습니다.

예제 데모는 glitch 서버를 이용하고 있습니다.

- [Full Project](https://weather-and-aq-app.glitch.me/)