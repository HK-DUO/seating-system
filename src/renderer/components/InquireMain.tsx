import { useDialog } from '@/hooks/useDialog';
import '@/styles/InquireMain.css';
import { ResType } from '@/types/resType';
import { useState } from 'react';

function InquireMain() {
  const { userPrompt, alert } = useDialog();

  const [value, setValue] = useState({
    title: '',
    content: '',
  });

  const onChange = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const onSubmit = async () => {
    if (value.title == '') {
      await alert('오류', '제목을 작성해주세요');
    } else if (value.content == '') {
      await alert('오류', '문의내용을 작성해주세요');
    } else {
      let ok = false;
      while (!ok) {
        await userPrompt('문의').then(async (res: any) => {
          if (res) {
            if (res.name == '') {
              await alert('오류', '이름을 입력해주세요');
            } else if (res.number == '') {
              await alert('오류', '전화번호를 입력해주세요');
            } else {
              await window.electron
                .submitInquiry(res.name, res.number, value.title, value.content)
                .then(async (res: ResType<any>) => {
                  if (res.code == 200) {
                    await alert('문의', '문의사항이 등록되었습니다.');
                    ok = true;
                  } else {
                    await alert('문의', '오류가 발생했습니다.');
                  }
                });
            }
          } else {
            ok = true;
          }
        });
      }
    }
  };

  return (
    <div className="inquire-main" onChange={(e) => onChange(e)}>
      <div>
        <label>제목</label>
        <input placeholder="제목" type="text" name="title" />
      </div>
      <div>
        <label>내용</label>
        <textarea placeholder="내용을 입력하세요" name="content" />
      </div>
      <div>
        <button onClick={onSubmit}>등록</button>
      </div>
    </div>
  );
}

export default InquireMain;
