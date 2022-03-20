import React, { BaseSyntheticEvent, MouseEventHandler, MutableRefObject, ReactComponentElement, ReactEventHandler, RefObject, SyntheticEvent, useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";
import * as FaIcons from 'react-icons/fa'
import axios from "axios";

interface COProps {
    category: any;
    onClick: MouseEventHandler;
}

interface CategoryTypes {
    id: number;
    pid: number;
    depth: number;
    category: string;
  }


const CategoryOptions = (props: COProps) => {
    return (
        <>
        {
            props.category &&
            <Option>
            <SCTop value={props.category.id} onClick={props.onClick} />
            <SCBottom value={props.category.id} onClick={props.onClick} />
            <Label> {props.category.category} </Label>
            <OptVal> {props.category.category} </OptVal>
            </Option>
        }
        </>
        
    )
}

export const CategoryDropdown = () => {
    const [ category, setCategory ] = useState<CategoryTypes[]>([])

    const selectBtnRef = useRef<HTMLInputElement>(null)
    const [ currentCategory, setCurrentCategory ] = useState(-1)

    useEffect(() =>{
        axios.get(`${process.env.REACT_APP_URL}items/categorylist`).then(category => {
            setCategory(category.data)
        })
    } ,[])

    const categoryOnClick = (event: BaseSyntheticEvent) => {
        setCurrentCategory(event.target.value)

        if(selectBtnRef.current){
            selectBtnRef.current.checked= false
        }
        
        console.log(selectBtnRef.current)
        console.log(event)
    }
    
    return (
        <div>
                    <Info>
                    <Cover>
        <SelectBox>
            <OptionsViewBtn ref={selectBtnRef} />
                <SelectBtn>
                    <SelectedVal>
                        <SpanText>{currentCategory !== -1 ? category[currentCategory-1].category : '카테고리를 선택해주세요'}</SpanText>
                    </SelectedVal>
                    <ChevIcons>
                        <ChevronsIUp />
                        <ChevronsIDown />
                        
                    </ChevIcons>
                </SelectBtn>

                <Options>

                    {category && category.map(((elements: any) => {
                        return (
                            <CategoryOptions category={elements} onClick={categoryOnClick} key={elements.id} /> 
                        )
                    }))}

                    

                    <Option>
                        <SCTop onClick={categoryOnClick} />
                        <SCBottom />
                        <Label> 카테고리 2 </Label>
                        <OptVal> 카테고리 2 </OptVal>
                    </Option>

                </Options>
            
        </SelectBox>
    </Cover>
        </Info>
        </div>

    )

}

const moveUp = keyframes`
        0%{ bottom: -25px; opacity: 0;}
    100%{ bottom: 0; opacity: 1;}
`

const moveDown = keyframes`
    0%{ top: -25px; opacity: 0;}
    100%{ top: 0; opacity: 1;}
`

const Info = styled.div`
    display: block;
    position: relative;
    top: 0;
    right: 0;
    left: 0;
    width: 300px;
    height: 42px;
    color: #2d3667;
    font-size: 16px;
    text-align: center;
    padding: 14px;
    background-color: #f3f9f9;
    margin: 0 0 0 20px;


`

const Cover = styled.form`
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    width: 300px;
    height: 42px;
`

const SelectBox = styled.div`
    position: relative;
    height: 16px;
    width: 100%;
    height: 100%;
    //padding: 12px 14px;
    background-color: #fff;
    border-radius: 4px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &:focus {
    outline: none;
    }
`

const Options = styled.div`
        border: 1px solid #e2eded;
    border-color: #eaf1f1 #e4eded #dbe7e7 #e4eded;
    position: absolute;
    top: 42px;
    right: 0;
    left: 0;
    width: 298px;
    margin: 0 auto;
    background-color: #fff;
    border-radius: 4px;

    max-height: 300px;

    overflow-y: scroll;
    &::-webkit-scrollbar-thumb{
    height: 17%;
    background-color: #ffdfca;
    border-radius: 10px;  
    }
    &::-webkit-scrollbar{
    width: 6px;
    }
`

const OptVal = styled.span`
    position: absolute;
    left: 14px;
    width: 217px;
    height: 21px;
    opacity: 0;
    background-color: #fff;
    -webkit-transform: scale(0);
    transform: scale(0);
    
`

const SCTop = styled.input.attrs( props => ({
    type: 'radio',
    name: 'platform',
    value: props.value
}))`
        position: absolute;
    right: 0;
    left: 0;
    width: 100%;
    height: 50%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    top: 0;

    &:hover ~ i {
        color: #2b2222;
    opacity: 0;
    }

    &:hover ~ i {
        top: -25px;
    -webkit-animation: movedown 0.3s ease 0.1s forwards;
            animation: movedown 0.3s ease 0.1s forwards;
    }
`

const SCBottom = styled.input.attrs( props => ({
    type: 'radio',
    name: 'platform',
    value: props.value
}))`
        position: absolute;
    right: 0;
    left: 0;
    width: 100%;
    height: 50%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    bottom: 0;

    &:hover {
        height: 100%;
    z-index: 1;
    }

    &:hover ~ i {
        color: #666666;
    opacity: 0;
    }

    &:hover + i {
        bottom: -25px;
    -webkit-animation: ${moveUp} 0.3s ease 0.1s forwards;
            animation: ${moveUp} 0.3s ease 0.1s forwards;
    }
`
const Label = styled.span`
        display: none;
    padding: 0;
    color: #000000;
    font-size: 16px;

    transition: 0.3s ease all;

`

const Option = styled.div`
        position: relative;
    line-height: 1;
    transition: 0.3s ease all;
    z-index: 2;
    color: #2d3667;
    font-size: 16px;

    &:hover {
        background-color: #444444;
        
    }
    &:hover ${Label} {
        color: #ffffff;
    }
`



const OptionsViewBtn = styled.input.attrs({
    type: 'checkbox'
})`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: 0;
    opacity: 0;
    cursor: pointer;
    z-index: 3;

        :checked {

        border: 1px solid #e2eded;
        border-color: #eaf1f1 #e4eded #dbe7e7 #e4eded;
    }

    &:checked ~ ${Options} ${Label} {
        
        display: block;
        height: 50px;
        padding: 12px 0;
    }
`

const SelectBtn = styled.div` //?
    border: 1px solid #e2eded;
    border-color: #eaf1f1 #e4eded #dbe7e7 #e4eded;
    position: relative;
    height: 16px;
    padding: 18px 14px;
    background-color: #fff;
    border-radius: 4px;
    width: 100%;
    height: 100%;
    cursor: pointer;
`

const SelectedVal = styled.div`
    font-size: 16px;
    line-height: 0.5;
    margin-right: 26px;
    
`

const SpanText = styled.div`

`

const ChevIcons = styled.div`
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    width: 12px;
    padding: 9px 20px;
`

const ChevronsIUp = styled(FaIcons.FaChevronUp)`
    display: block;
    height: 50%;
    color: #d1dede;
    font-size: 12px;
    text-align: right;
    opacity: 0.5;
`

const ChevronsIDown = styled(FaIcons.FaChevronDown)`
    display: block;
    height: 50%;
    color: #d1dede;
    font-size: 12px;
    text-align: right;
    opacity: 0.5;
`








