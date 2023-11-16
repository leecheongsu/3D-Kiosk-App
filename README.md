# 배포 방법

- 다음 커멘드 입력

```
firebase use onna-intro

yarn build && firebase deploy --only hosting
```

설치된 fireabase가 없을 경우

```
npx firebase use onna-intro
yarn build && npx firebase deploy --only hosting
```
