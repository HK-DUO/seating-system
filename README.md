# 노은도서관 열람실 좌석예약 시스템

### ✨노은도서관 열람실 좌석예약시스템, NL✨
<img width="666" alt="스크린샷 2024-08-14 오후 3 58 27" src="https://github.com/user-attachments/assets/b4ad7c44-0eb2-4cc5-9b86-dbd98153331e">


## 🗨️ About 농행동행
"소비자가 느끼는 농촌관광의 진입장벽을 허물어주는 농촌관광 플랫폼"

현재의 농촌관광의 소비패턴 "정보탐색 → 여행선택 → 예약 → 예약관리 → 여행
(소비)" 과정에서의 겪는 불편함을 농행동행 플랫폼을 통해 해소
<table>
<tr>
<td align="center">
   <img width="666" alt="스크린샷 2024-08-14 오후 3 58 27" src="https://github.com/user-attachments/assets/b4ad7c44-0eb2-4cc5-9b86-dbd98153331e">
</td>
<td align="center">
    <img width="1186" alt="스크린샷 2024-09-23 오후 7 22 18" src="https://github.com/user-attachments/assets/63379b33-8f64-4a8c-b8f9-1af36dd6ed95">
</td>

</tr>
<tr>
<td align="center">메인 페이지</td>
<td align="center">관리자 페이지</td>
</tr>

</table>
## 👨🏻‍💻 Member
<table>
<tr>
<td align="center">프론트엔드</td>
<td align="center">백엔드</td>

</tr>
  <tr>
    <td align="center" width="120px">
      <a href="https://github.com/kimsunin" target="_blank">
        <img src="https://avatars.githubusercontent.com/kimsunin" alt="김선인 프로필" />
      </a>
    </td>
    <td align="center" width="120px">
      <a href="https://github.com/hcmhcs" target="_blank">
        <img src="https://avatars.githubusercontent.com/hcmhcs" alt="한창민 프로필" />
      </a>
  </tr>
 <tr>
    <td align="center">
      <a href="https://github.com/kimsunin" target="_blank">
        김선인
      </a>
    </td>
     <td align="center">
      <a href="https://github.com/hcmhcs" target="_blank">
       한창민
      </a>
    </td>
  </tr>
<tr>
<td align="center"> <a href="https://github.com/HK-DUO/seating-system">Repository</a></td>
<td align="center"> <a href="https://github.com/HK-DUO/seating-system">Repository</a></td>
</tr>
</table>


### test

#### fe
- [ ] 관리자페이지 ui, ux
- [x] 관리자페이지 - 라우팅
- [x] 관리자 페이지 - 일반설정 >> 일반설정 db와 통신 구현하기
- [ ] 관리자페이지 - 로그
- [ ] 관리자페이지 - 유저설정 >> 구상부터 필요


## be
- [ ] 관리자창에서 예약기본시간은 아직 동적으로 안변함, 퇴실대기시간,연장시간은 동적으로 변하게 가능
- [x] 비밀번호 암호화
- [x] 응답데이터 통일, 클래스 생성, 제네릭 적용
- [ ] 에러데이터 통일
- [x] 데이터 리셋
- [ ] 데이터 리셋 스케줄링 걸진 않음(전략 생각하기-> 자정마다 혹은 앱이 꺼질때마다)
- [ ] 로그 페이지네이션
- [ ] 로그 날짜,전화번호 검색기능
- [ ] 리팩토링, type에서 class로 바꿀거 바꾸기(기준은 자체 메소드가 필요한 구조는 class로)
- [ ] 무제한 연장되지 않도록 연장시 퇴실종료시간 확인해서 예를들면 1시간안일때만 연장가능하도록 변경
### 추가기능
- 데이터베이스 백업 및 불러오기
- 이용제한기능: 날짜로할지 말지 고민중, 유저별로 제한사항 두기, 경고전략도 있음 경고 3회시 이용제한, 몇개월마다 초기화(경고는 persistUser 열에 추가하기)
- 퇴실시나 경고시에 해당전화번호로 문자보내기(문자API 필요)
- 노약자석 표시하기
