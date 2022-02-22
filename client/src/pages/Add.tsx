import React, { Component, useRef, useState } from 'react';
import styled from 'styled-components';
import CoViewer from '../components/add/CoViewer';
import StepOne from '../components/add/StepOne';
import ButtonBasic from '../components/common/button/ButtonBasic';
import CoEditor from '../components/common/CoEditor';


const Add  = () => {
  const [step, setStep] = useState<number>(0)
  const [data, setData] = useState<any>({title: '타이틀임시', category: '카테고리'})

  const navHandler = (move: number): void => {
    const dMove = (step + move) >= 0 ? step + move : 0; 
    setStep(dMove)
  }

  // handling form input data by taking onchange value and updating our previous form data state
  const handleInputData = (input: any)=> (e: any) => {
    // input value from the form
    const { value } = e.target;
    console.log(data)
    //updating for data state taking previous state and then adding new value to create new object
    setData((data: any): any => ({
      ...data,
      [input]: value
    }));
 
  }

  const submit = () => {
    return 0
  }

  return (
    <div>
      <AddContainer>
      { step === 0 && <StepOne step={step} handleInputData={handleInputData} values={data} />}
      { step === 1 && <CoEditor />}
      { step === 2 && <CoViewer />}
      <NavBtnContainer>
        <BtnBox>
          
            {switch (step) {
              case 1: 
              return (
                <Button onClick={() => navHandler(-1)} children={'이전'} />
              );
              case 2: 
              return (
                <Button onClick={() => navHandler(-1)} children={'이전'} />
              )
            }}
          
        { step > 0 && <Button onClick={() => navHandler(-1)} children={'이전'} />}
        <Button onClick={() => navHandler(1)} children={'다음'} />
        </BtnBox>
      
      </NavBtnContainer>
      </AddContainer>
      

      
    </div>
  ) 
};
const AddContainer = styled.div`
  font-family: 'Noto Sans KR', 'serif';
  width: 80%;
  height: 100%;
  margin: 0 auto;
`
const NavBtnContainer = styled.div`
  display: flex;
  justify-content: right;
`

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
