import styled from 'styled-components';

const Wrapper = styled.div`
  margin-bottom: 1.2rem;
  display: flex;
  flex-direction: column;
`;

const Title = styled.span`
  margin-bottom: 4px;
  font-weight: 600;
  font-size: 14px;
`;

const Input = styled.input`
  height: 45px;
  padding: 1rem;
  margin-bottom: 4px;
  border-radius: 5px;
  border: 1px solid ${(props) => props.theme.colors.textColor};

  @media only screen and (max-width: 768px) {
    height: 40px;
  }
`;

function InputAdress() {
  return (
    <Wrapper>
      <Title>배송지</Title>
      <Input placeholder="주소" />
      <Input placeholder="상세주소" />
    </Wrapper>
  );
}

export default InputAdress;
