import React, { useState } from 'react';
import styled from 'styled-components';
import ImgLodingIndicator from './common/loading-indicator/ImgLodingIndicator';

const Wrapper = styled.div`
  width: 5.5rem;
  height: 5.5rem;
  flex: 0 0 auto;
  position: relative;
  @media only screen and (max-width: 768px) {
    width: 5rem;
    height: 5rem;
  }
`;

const DeleteBtn = styled.div`
  width: 1.1rem;
  height: 1.1rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: black;
  border-radius: 2px;
  position: absolute;
  right: 0;
  top: 0;
  color: white;
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
`;

interface IPreview {
  src: string;
  idx: number;
  deletePreview: (idx: number) => void;
  isLoading: boolean;
}

function Preview({ src, idx, deletePreview, isLoading }: IPreview) {
  return isLoading ? (
    <Wrapper>
      <ImgLodingIndicator></ImgLodingIndicator>
    </Wrapper>
  ) : (
    <Wrapper>
      <DeleteBtn onClick={() => deletePreview(idx)}>x</DeleteBtn>
      <Img src={src} />
    </Wrapper>
  );
}

export default Preview;
