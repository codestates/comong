import styled from 'styled-components';

const Container = styled.div`
  background-color: #ff7836;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  justify-content: space-between;
  align-items: space-between;
`;

const MentionContainer = styled.div`
  font-family: 'roboto', 'Noto Sans KR';
  /* margin-top: 30px; */
  /* justify-content: center;
  align-items: center; */
  justify-content: space-between;
  align-items: space-between;
  align-items: space-evenly;
  /* display: flex; */
`;

const BadgeContainer = styled.div`
  display: flex;
  flex-direction: row;
`;
const Badge1 = styled.div`
  background-color: #007bf7;
  border-radius: 5px;
  text-align: center;
  color: white;
  height: 25px;
  font-size: 13px;
  /* margin: auto; */
  padding: 5px 10px;
  font-weight: 500;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
    padding: 7px 10px;
  }
`;
const Badge2 = styled.div`
  margin-left: 10px;
  background-color: #007bf7;
  border-radius: 5px;
  text-align: center;
  color: white;
  height: 25px;
  font-size: 13px;
  padding: 5px 10px;
  font-weight: 500;
  @media only screen and (max-width: 768px) {
    font-size: 10px;
    padding: 7px 10px;
  }
`;

const Mention1 = styled.div`
  font-size: 30px;
  color: white;
  font-weight: 500;
  margin-top: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 21px;
  }
`;
const Mention2 = styled.div`
  font-size: 30px;
  color: white;
  font-weight: 600;
  margin-top: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 21px;
  }
`;
const Mention3 = styled.div`
  font-size: 15px;
  color: white;
  font-weight: 300;
  margin-top: 20px;
  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
`;
const Mention4 = styled.div`
  font-size: 15px;
  color: white;
  font-weight: 300;
  margin-top: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 100px;
  width: 600px;
  @media only screen and (max-width: 1200px) {
    width: 400px;
    margin-left: 50px;
  }
  @media only screen and (max-width: 768px) {
    width: 200px;
    margin-left: 50px;
  }
`;
const Img = styled.img`
  width: 600px;
  @media only screen and (max-width: 1200px) {
    width: 400px;
  }
  @media only screen and (max-width: 768px) {
    width: 200px;
  }
`;

const Banner1 = () => {
  return (
    <Container>
      <Contents>
        <MentionContainer>
          <BadgeContainer>
            <Badge1>신상입고</Badge1>
            <Badge2>코몽</Badge2>
          </BadgeContainer>
          <Mention1>나만 몰랐었던</Mention1>
          <Mention2>따끈따끈한 신상템</Mention2>
          <Mention3>지금바로 Comong에서</Mention3>
          <Mention4>만나보세요</Mention4>
        </MentionContainer>
        <ImgContainer>
          <Img src="/img/banner/banner2.gif"></Img>
        </ImgContainer>
      </Contents>
    </Container>
  );
};

export default Banner1;
