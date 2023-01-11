# Kakao-P3-GithubFinder
(안내) 공부를 위한 프로젝트로 .env 파일은 .gitignore에 포함하지 않았습니다.<br>
(안내) 해당 프로젝트는 yarn berry(yarn2)를 이용해서 zero installs로 구성되었습니다.<br>
(안내) 403 권한 오류가 발생한다면 .env 파일 내에 GITHUB_TOKEN을 통해 github access token을 등록해주세요.

---
<h2>프로젝트 개요</h2>
비동기 통신에서 사용되는 패턴을 이해하기 위한 프로젝트입니다.
Github API를 이용해 아래와 같은 작업을 진행합니다.
- 유저와 저장소 정보를 가져와서 보여줍니다.
- 데이터 성공 및 실패 시에 확인 할 수 있는 UI를 생성해서 보여줍니다.
- ES Classes를 이용해 OOP 방법으로 앱을 구현합니다.

---

<h2>실행 안내</h2>

1. 설치
```
별도의 설치가 필요하지 않습니다.
```

2. 빌드
```
yarn run build
```

3. 로컬 서버 구동
```
yarn run dev
```
<br>

---

<br>
<h2>alias 설정 안내</h2>

|이름|경로|설명|
|---|---|------|
|@|/src|source|
|@controller|/src/controller|특정 기능에 대한 UI, Event를 관리하는 객체 모음|
|@styles|/src/styles|html 스타일링을 위한 scss 모음|
