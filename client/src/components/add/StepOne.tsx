import React, { useEffect, useState } from "react";
import styled from "styled-components";
import GeneralInput from "./GeneralInput";
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import { setContents, setStepOne } from '../../redux/modules/editorSlice'


interface StepOneProps {
    step: number;
    handleInputData: any;
    values: any;
}

const StepOne = ({ step, handleInputData, values }: StepOneProps) => {
    const dispatch = useAppDispatch();

    const [ data, setData ] = useState({title: ''})
    

    const getData = (param: string, event: any) => {
        setData({
            ...data,
            [param]: event.target.value,
        })
        //console.log(data)
    } 

    const dispatchData = () =>{
        //console.log(data)
        dispatch(setStepOne({...data})); 
    }
    useEffect( () => {
        dispatchData()
    }, [data])
    return (
        <>
        <Label1> 기본정보 </Label1>
        <StepOneContainer>


        {itemEntity.map((elements, index) => {
            return <GeneralInput type={elements[0]} description={elements[1]} param={elements[2]} handleInputData={handleInputData} values={values} getData={getData} key={index} />
        })}


        </StepOneContainer>
        </>
    )
}

const StepOneContainer = styled.div`
    //display: flex;
    margin: 50px 0 50px 0;
`

const TypeContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const InputContainer = styled.div`
    
`


const Label1 = styled.span.attrs(props => ({

}))`
    font-weight: 500;
    font-size: 26px;

`

const Label2 = styled.span`
    font-weight: 500;
    font-size: 16px;
`

const itemEntity = [
    ['노출상품명', '고객이 보는 상품명 입니다.', 'title'],
    ['카테고리', '상품등록 후 카테고리가 이동될 수 있습니다.', 'category'],
    ['판매가', '판매가는 실제 판매 가격으로 최소 10원 단위 숫자로 입력합니다. ', 'price'],
    ['재고', '재고입니다.', 'stock'],
]


export default StepOne