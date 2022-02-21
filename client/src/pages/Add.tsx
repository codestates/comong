import React, { Component, useRef, useState } from 'react';
import styled from 'styled-components';
import StepOne from '../components/add/StepOne';
import ButtonBasic from '../components/common/ButtonBasic';
import CoEditor from '../components/common/CoEditor';


const Add  = () => {

  const [step, setStep] = useState<number>(0)

  const navHandler = (move: number): void => {
    const dMove = (step + move) >= 0 ? step + move : 0; 
    setStep(dMove)
  }

  const submit = () => {
    return 0
  }

  return (
    <div>
      <AddContainer>
      { step === 0 && <StepOne />}
      { step === 1 && <CoEditor />}
      <NavBtnContainer>
        <BtnBox>
        { step > 0 && <ButtonBasic buttonClickHandler={() => navHandler(-1)} children={'이전'} />}
        </BtnBox>
      
        <BtnBox>
        <ButtonBasic buttonClickHandler={() => navHandler(1)} children={'다음'} />
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
  width: 100px;
  margin: 0 15px;
`

export default Add;
