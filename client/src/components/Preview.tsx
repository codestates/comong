import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100px;
  height: 100px;
  position: relative;
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
}

function Preview({ src, idx, deletePreview }: IPreview) {
  return (
    <Wrapper>
      <DeleteBtn onClick={() => deletePreview(idx)}>x</DeleteBtn>
      <Img src={src} />
    </Wrapper>
  );
}

export default Preview;
