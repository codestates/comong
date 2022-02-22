import React from "react";
import styled from "styled-components";
import InputBasic from "../Input/InputBasic";


interface Props {
    type: string;
    description: string;
}

const GeneralInput = ({type, description}: Props) => {
    return (
        <>
            <Line>
                <TextBox>
                <Label1>{type}</Label1>
                </TextBox>
            
            <Input />
            <Label2>{description}</Label2>
            </Line>

        </>
    )
}

const Line = styled.div`
    display: flex;
    //height: 40px;
    align-items: center;
    margin: 15px 0 0 0;
    justify-content: flex-start;
`

const TextBox = styled.div`
    display: flex;
    flex-direction: row-reverse;
    justify-content: right;
    width: 100px;
`

const Label1 = styled.span`
    font-weight: 500;
    font-size: 18px;
`

const Label2 = styled.span`
    font-weight: 300;
    font-size: 16px;
    margin: 0 0 0 20px;
    @media only screen and (max-width: 768px) {
    display: none;
  }
`

const Input = styled.input`
  margin: 5px 0 5px 20px;
  height: 49px;
  width: 50%;
  padding: 0.8rem;
  border-radius: 5px;
  border: 1px solid #cccccc;

  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

export default GeneralInput