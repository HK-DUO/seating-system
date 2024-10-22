# 노은도서관 열람실 좌석예약 시스템

### ✨노은도서관 열람실 좌석예약시스템, NL✨
<img width="1199" alt="스크린샷 2024-09-23 오후 7 17 58" src="https://github.com/user-attachments/assets/a2973b1e-1eb6-4170-8a83-335467e1575d">



## 🗨️ About 노은도서관 좌석예약 시스템
"아날로그식 종이표를 통한 열람실 이용에 불편함 해소"

### <기존의 문제점 해결>
- 실시간 좌석현황의 보기 어려움 -> 실시간 좌석현황 제공
- 열람실 좌석표(종이)의 분실로 인한 이용 제한 -> 분실될 걱정없는 디지털 좌석예약
- 자리 맡아두기 등으로 인한 퇴실요청의 어려움 -> 퇴실요청기능을 통한 자리의 순환 가속화
<table>
<tr>
<td align="center">
   <img width="1190" alt="메인페이지" src="https://github.com/user-attachments/assets/9a39fca3-e5b1-4bae-877e-49ce41a64100">
</td>
<td align="center">
    <img width="1186" alt="스크린샷 2024-09-23 오후 7 22 18" src="https://github.com/user-attachments/assets/63379b33-8f64-4a8c-b8f9-1af36dd6ed95">
</td>
</tr>
<tr>
<td align="center">메인 페이지</td>
<td align="center">관리자 페이지</td>
</tr>
<tr>
<td align="center">
   <img width="1173" alt="예약 프롬프트" src="https://github.com/user-attachments/assets/865ba066-4daf-4668-9602-52c091567d23">
</td>
<td align="center">
    <img width="1193" alt="연장 프롬프트" src="https://github.com/user-attachments/assets/24f1e6cb-08de-446e-8b4d-693100096f4c">
</td>
</tr>
<tr>
<td align="center">예약 페이지</td>
<td align="center">연장 페이지</td>
</tr>
<tr>
<td align="center">
   <img width="1193" alt="관리자모드 전환" src="https://github.com/user-attachments/assets/4e13c284-6cee-4742-a7f4-3594bace78d3">
</td>
<td align="center">
    <img width="1191" alt="앱 종료 불가" src="https://github.com/user-attachments/assets/3d1aba85-2ff9-44d8-95f1-bab86db8fc63">
</td>
</tr>
<tr>
<td align="center">관리자모드 전환 프롬프트</td>
<td align="center">앱 종료 불가</td>
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

## 🛠️ Skills
<img width="410" alt="스크린샷 2024-09-23 오후 7 51 28" src="https://github.com/user-attachments/assets/18092578-81fa-4ea6-ba6f-b3a0145d0c1e">

## 💻 진행중
### fe
test2
- [ ] 관리자페이지 ui, ux
- [x] 관리자페이지 - 라우팅
- [x] 관리자 페이지 - 일반설정 >> 일반설정 db와 통신 구현하기
- [ ] 관리자페이지 - 로그
- [ ] 관리자페이지 - 유저설정 >> 구상부터 필요


### be
- [x] 비밀번호 암호화
- [x] 응답데이터 통일, 클래스 생성, 제네릭 적용
- [ ] 에러데이터 통일
- [x] 데이터 리셋
- [ ] 로그 페이지네이션
- [ ] 로그 날짜,전화번호 검색기능
- [ ] 리팩토링, type에서 class로 바꿀거 바꾸기(기준은 자체 메소드가 필요한 구조는 class로)
- [x] 무제한 연장되지 않도록 연장시 퇴실종료시간 확인해서 예를들면 1시간안일때만 연장가능하도록 변경

### 정책
- [ ] 데이터 리셋 전략
### 추가기능
- 데이터베이스 백업 및 불러오기
- 이용제한기능: 날짜로할지 말지 고민중, 유저별로 제한사항 두기, 경고전략도 있음 경고 3회시 이용제한, 몇개월마다 초기화(경고는 persistUser 열에 추가하기)
- 퇴실시나 경고시에 해당전화번호로 문자보내기(문자API 필요)
- 노약자석 표시하기(o)


<프론트 수정해야될 부분>
- 문의하기 등록 눌렀을때 이름,전화번호 입력하기
- 
<백엔드 수정해야될 부분>
- 관리자페이지에서 좌석 바로 퇴실가능하도록
- 문의하기 
- 문의한 내용 관리자페이지에서 보기
- 설정 초기화 따로 만들기, 시간정책관련해서
- 초기화될때 좌석뿐만 아니라 설정시간도 초기화되는지 확인하기
