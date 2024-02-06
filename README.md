# login-logic-project
nods.js 숙련주차 개인과제


API 명세서


<<회원가입 API>>

endpoint : POST /auth/signup

request : {
  "email": "user@example.com",
  "password": "userpassword",
  "confirmPassword": "userpassword",
  "name": "John Doe"
}

response(성공) : {
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe"
}

response(실패) : {
  "error": "에러 메시지"
}


<<로그인 API>>

endpoint : POST /auth/login

responce(성공) : {
  "accessToken": "jsonwebtoken"
}

responce (실패) : {
  "error": "에러 메시지"
}


<<에러 메시지>>

400 : 필수 필드가 누락되었거나, 비밀번호 확인이 일치하지 않음 등의 요청 오류.
401 : 이메일 또는 비밀번호가 올바르지 않음.
500 : 서버 내부 오류.
