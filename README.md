# Weather-and-air-quailty-app-using-Rest-Api
Rest Api를 이용해 현재 사용자의 위치를 기반으로 한 날씨와 대기상태를 보여주는 웹 어플리케이션 입니다.

사용자가 브라우저로 서버에 웹 애플리케이션을 요청하면 서버는 사용자로부터 위도와 경도의 위치 값을 받아 그 값으로 현재 지역의 날씨와 대기 상태를 Rest Api로 부터 받아와 클라이언트에 전송하고, 클라이언트의 자바스크립트 파일은 이 정보를 이용하여 html Dom엘리먼트를 조작하여 정보를 표시합니다. 

스타일링은 Pure CSS를 적용하였습니다.

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

## Make sure

- Node.js가 사전에 설치되어 있어야 합니다.
- 카카오 개발자 센터 API키와 한국환경공단 에어코리아의 근접측정소 목록 및 대기환경상태에 대한 API키가 필요합니다.

## Usage

1. 저장소를 클론합니다.
2. 터미널을 열고 프로젝트 폴더로 이동한 다음, 명령어 'npm install'을 실행함으로써 package.json에 있는 의존성들을 설치합니다.
3. .env 파일을 만들고, API 키를 기입합니다.
4. 터미널에서 'npm start'를 쳐서 서버를 동작합니다. 기본 포트는 3000 입니다.
