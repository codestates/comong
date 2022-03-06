import styled from 'styled-components';
import { CircularProgress } from '@mui/material';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 100;
  position: fixed;
  background-color: white;
  width: 100%;
  height: 100%;
`;

const Text = styled.div`
  margin-top: 20px;
  font-family: Noto Sans KR;
  font-size: 15px;
`;

export const LoadingIndicator = (props: any) => {
  return (
    <Container>
      <CircularProgress color="secondary" />
      <Text>로딩중입니다</Text>
    </Container>
  );
};
