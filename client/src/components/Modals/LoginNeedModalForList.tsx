import { useState } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

export const ModalContainer = styled.div`
  position: fixed;
  height: 15rem;
  text-align: center;
  margin: 120px auto;
`;

export const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 20px 20px;
  width: 100%;
`;

export const ModalBtn = styled.button`
  background-color: ${(props) => props.theme.colors.accentColor};
  font-family: Noto Sans KR;
  text-decoration: none;
  margin: 10px 10px;
  border: none;
  /* padding: 20px; */
  font-size: 15px;

  color: white;
  border-radius: 10px;
  width: 40%;
  height: 100%;
  cursor: grab;
`;
export const ModalCloseBtn = styled.button`
  background-color: ${(props) => props.theme.colors.darkGrey};
  font-family: Noto Sans KR;
  font-size: 15px;
  text-decoration: none;
  margin: 10px 10px;
  border: none;
  /* padding: 20px; */

  color: white;
  border-radius: 10px;
  width: 40%;
  height: 100%;
  cursor: grab;
`;

export const ModalView = styled.div.attrs((props) => ({
  // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
  role: 'dialog',
}))`
  border-radius: 10px;
  background-color: #ffffff;
  width: 330px;
  height: 150px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  > div.desc {
    margin-top: 25px;
    color: ${(props) => props.theme.colors.charcol};
    font-size: 1.1rem;
  }
`;

// export const ModalBackdrop = styled.div`
//   position: fixed;
//   z-index: 1000;
//   top: 0;
//   left: 0;
//   bottom: 0;
//   right: 0;
//   background-color: rgba(0, 0, 0, 0.4);
//   display: grid;
//   place-items: center;
// `;

// export const ModalContainer = styled.div`
//   position: fixed;
//   height: 15rem;
//   text-align: center;
//   margin: 120px auto;
// `;

// export const BtnContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   margin: 20px 20px;
//   width: 100%;
// `;

// export const ModalBtn = styled.button`
//   background-color: ${(props) => props.theme.colors.accentColor};
//   font-family: Noto Sans KR;
//   text-decoration: none;
//   margin: 10px 10px;
//   border: none;
//   /* padding: 20px; */
//   font-size: 15px;

//   color: white;
//   border-radius: 10px;
//   width: 40%;
//   height: 100%;
//   cursor: grab;
// `;
// export const ModalCloseBtn = styled.button`
//   background-color: ${(props) => props.theme.colors.darkGrey};
//   font-family: Noto Sans KR;
//   font-size: 15px;
//   text-decoration: none;
//   margin: 10px 10px;
//   border: none;
//   /* padding: 20px; */

//   color: white;
//   border-radius: 10px;
//   width: 40%;
//   height: 100%;
//   cursor: grab;
// `;

// export const ModalView = styled.div.attrs((props) => ({
//   // attrs 메소드를 이용해서 아래와 같이 div 엘리먼트에 속성을 추가할 수 있습니다.
//   role: 'dialog',
// }))`
//   border-radius: 10px;
//   background-color: #ffffff;
//   width: 330px;
//   height: 150px;
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   z-index: 1000;
//   > div.desc {
//     margin-top: 25px;
//     color: ${(props) => props.theme.colors.charcol};
//     font-size: 1.1rem;
//   }
// `;

export const LoginNeedModalForList = ({ isModal, modalHandler }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();
  const openModalHandler = () => {
    setIsOpen(!isOpen);
    modalHandler(!isModal);
    // props.modalHandler(!isOpen);
    // if (isOpen === false) props.setModalMsg('');
  };

  return (
    <>
      <ModalContainer>
        {isOpen === true ? (
          <ModalBackdrop onClick={openModalHandler}>
            <ModalView
              onClick={(e) => {
                // e.stopPropagation();
                e.preventDefault();
              }}
            >
              <div className="desc">로그인이 필요합니다</div>
              <BtnContainer>
                <ModalBtn
                  onClick={() => {
                    navigate('/login');
                  }}
                >
                  로그인 하기
                </ModalBtn>
                <ModalCloseBtn onClick={openModalHandler}>닫기</ModalCloseBtn>
              </BtnContainer>
            </ModalView>
          </ModalBackdrop>
        ) : null}
      </ModalContainer>
    </>
  );
};
