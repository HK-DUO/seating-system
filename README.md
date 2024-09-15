# seating-system

## start

```
git clone https://github.com/HK-DUO/seating-system.git
```

```
cd seating-system
```

```
npm i
```

```
npm run start
```


api
- 개별 좌석 상태정보 보내주기

- 로그남기기(**)
- api로 관리자 컴퓨터에서 클라이언트db 나 로그 확인하도록

- 퇴실요청시 누가 퇴실요청했는지 로그 남기기
- 추가기능으로 이용제한 이용자 만들어서 기한동안 로그인안되도록
- 매일마다 데이터베이스 초기화되도록(**)
- 자동퇴실은 구현했는데 로그를 남겨야됨(로그 남기기),현재 1분마다 체크
- 자동퇴실시에 예약삭제, 좌석상태변경만 됨. 유저정보도 같이 삭제해줘야됨
