import React from 'react';
import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  width: 100%;
  height: 100%;
`;

export const ImgLodingIndicator = (props: any) => {
  return (
    <Container>
      <CircularProgress color="secondary" />
    </Container>
  );
};

export default ImgLodingIndicator;
