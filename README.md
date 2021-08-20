# Course Planet

MERN 스택 + Redux를 기반으로 만든 개인 프로젝트이며, Cloudinary와 Heroku 서비스를 이용하였습니다.

## 기능

#### [**기능 영상 재생 목록**](https://youtube.com/playlist?list=PLteiTo_UvJUBwK0_CbmUCfiE7IJ036FT1)

- 이메일 인증을 통한 계정 등록하기
- 소셜 로그인 (구글, 페이스북)
- 유저 로그인, 로그인 유지, 로그아웃, 유저 삭제
- 유저 프로필 업데이트
- 이메일 인증을 통한 유저 비밀번호 재설정
- 리뷰 작성하기, 수정하기, 삭제하기
- 리뷰 좋아요 & 좋아요 취소
- 내 리뷰 내역과 타 유저 리뷰 내역 불러오기
- 강의 검색 및 데이터 불러오기
- 인프런, 패스트캠퍼스 스크래핑 및 데이터 저장

---

## 주의사항

- client/src/config.js 파일에 자신의 google client id와 facebook app id를 입력해주세요.
- Heroku 배포 시 puppeteer 라이브러리를 사용할 경우 빌드팩을 설치하여야 합니다. 명령어는 아래 링크를 참고하시기 바랍니다.<br>
  [puppeteer-heroku-buildpack](https://elements.heroku.com/buildpacks/jontewks/puppeteer-heroku-buildpack)

---

## 설치

### 백엔드 모듈 설치

```textplain
npm run server-install
```

### 프론트엔드 모듈 설치

```textplain
npm run client-install
```

### 프론트엔드 & 백엔드 모듈 설치

```textplain
npm i concurrently
npm run install-all
```

---

## 실행

### 서버 실행 http://localhost:4250

```textplain
npm run server
```

```textplain
npm start
```

### 클라이언트 실행 http://localhost:3000

```textplain
npm run client
```

### 서버 & 클라이언트 실행

```textplain
npm run dev
```

## 환경변수 설정

| 환경변수                      | 설정 값                                 |
| ----------------------------- | --------------------------------------- |
| MONGODB_URL                   | 자신의 몽고DB 링크                      |
| ACCESS_TOKEN_SECRET           | 무작위 시크릿 키                        |
| ACTIVATION_TOKEN_SECRET       | 무작위 시크릿 키                        |
| REFRESH_TOKEN_SECRET          | 무작위 시크릿 키                        |
| MAILTRAP_USER                 | mailtrap 서비스 Username                |
| MAILTRAP_PASS                 | mailtrap 서비스 Password                |
| MAILTRAP_EMAIL                | mailtrap 서비스 이메일                  |
| MAILING_SERVICE_CLIENT_ID     | OAuth 2.0 클라이언트 ID                 |
| MAILING_SERVICE_CLIENT_SECRET | OAuth 2.0 클라이언트 보안 비밀          |
| MAILING_SERVICE_REFRESH_TOKEN | OAuth 2.0 Playground 구글 메일 API 토큰 |
| SENDER_EMAIL_ADDRESS          | OAuth 2.0 관리자 이메일                 |
| PASSWORD_SECRET               | 무작위 시크릿 키                        |
| CLIENT_URL                    | 배포 앱의 링크                          |

mailtrap 서비스 환경변수는 Contact Me 폼의 내용을 전달할 때만 사용됩니다.
