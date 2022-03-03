import styled from 'styled-components';
import { JsxElement } from 'typescript';

const Container = styled.div`
  background-color: #f86d56;
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
  background-color: #34345a;
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
  background-color: #34345a;
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
  width: 400px;
  @media only screen and (max-width: 1200px) {
    width: 300px;
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
            <Badge1>대박찬스</Badge1>
            <Badge2>개학시즌</Badge2>
          </BadgeContainer>
          <Mention1>3월 신학기!</Mention1>
          <Mention2>중요한 거 아시죠?</Mention2>
          <Mention3>노트, 필기류</Mention3>
          <Mention4>Comong에서 준비하세요</Mention4>
        </MentionContainer>
        <ImgContainer>
          <Img src="/img/banner/banner1.png"></Img>
        </ImgContainer>
      </Contents>
    </Container>
  );
};

export default Banner1;
