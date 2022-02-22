import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { apiClient } from '../apis';
import CoViewer from '../components/add/CoViewer';
import StepOne from '../components/add/StepOne';
import CoEditor from '../components/common/CoEditor';
import { useAppDispatch, useAppSelector } from '../redux/configStore.hooks';
import { setStepOne } from '../redux/modules/editorSlice'



const Add  = () => {
  const [step, setStep] = useState<number>(0)
  const [data, setData] = useState<any>({title: '', category: ''})

  const editorState = useAppSelector((state) => state.editorSlice);
  const userState = useAppSelector((state) => state.userSlice)

  const navHandler = (move: number): void => {
    const dMove = step + move >= 0 ? step + move : 0;
    setStep(dMove);
  };

  const handleInputData = (input: any)=> (e: any) => {
    const { value } = e.target;
    setData((data: any): any => ({
      ...data,
      [input]: value
    }));
 
  }

  const submit = (): void => {
    const payload = {
      title: data.title,
      contents: editorState.contents,
      image_src: editorState.image_src.toString(),
      category: parseInt(data.category),
      price: parseInt(data.price),
      stock: parseInt(data.stock),
    }
    axios({
      method: 'post',
      headers: {
        'Authorization': `bearer ${userState.accessToken}`
      },
      data: payload,
      baseURL: process.env.REACT_APP_URL,
      url: '/items'
    }).catch(res => console.log(res))
  };

  return (
    <div>
      <AddContainer>
      { step === 0 && <StepOne step={step} handleInputData={handleInputData} values={data} />}
      { step === 1 && <CoEditor />}
      { step === 2 && <CoViewer />}
      <NavBtnContainer>
        <BtnBox>
        { step > 0 && step < 3 && <Button onClick={() => navHandler(-1)} children={'이전'} />}
        { step < 2 && <Button onClick={() => navHandler(1)} children={'다음'} />}
        { step >= 2 && <Button onClick={submit} children={'전송'} />}
        </BtnBox>
      </NavBtnContainer>
      </AddContainer>
    </div>
  );
};
const AddContainer = styled.div`
  font-family: 'Noto Sans KR', 'serif';
  width: 80%;
  height: 100%;
  margin: 0 auto;
`;
const NavBtnContainer = styled.div`
  display: flex;
  justify-content: right;
`;

const BtnBox = styled.div`
  display: flex;
  width: 300px;
  margin: 0 0 0 auto;;
`

const Button = styled.button`
  width: 100%;
  height: 55px;
  margin: 0 20px;
  font-size: 20px;
  font-weight: 500;
  border-radius: 4px;
  

  @media only screen and (max-width: 768px) {
    height: 50px;
  }
  `

export default Add;
