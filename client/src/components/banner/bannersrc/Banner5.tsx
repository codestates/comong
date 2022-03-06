import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const UpperContainer = styled.div`
  background-color: #ff7836;
  width: 100%;
  height: 80%;
  position: relative;
`;
const LowerContainer = styled.div`
  background-color: white;
  height: 1000px;
  position: relative;
  height: 20%;
`;

const Contents = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: space-between;
`;

const MentionContainer = styled.div`
  font-family: 'roboto', 'Noto Sans KR';
  /* position: absolute; */
  justify-content: space-between;
  align-items: space-evenly;
  background-color: #ff7836;
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
const RealMentionContainer = styled.div`
  position: absolute;
  left: 1100px;
  color: white;
`;
const RealMention1 = styled.div``;
const RealMention2 = styled.div``;
const RealMention3 = styled.div``;

const Mention1 = styled.div`
  font-size: 30px;
  color: white;
  color: #ff7836;
  font-weight: 500;
  margin-top: 20px;

  @media only screen and (max-width: 768px) {
    font-size: 21px;
  }
`;
const Mention2 = styled.div`
  font-size: 30px;
  color: white;
  color: #ff7836;
  font-weight: 600;
  margin-top: 10px;
  @media only screen and (max-width: 768px) {
    font-size: 21px;
  }
`;
const Mention3 = styled.div`
  font-size: 15px;
  color: white;
  color: #ff7836;
  background-color: white;
  font-weight: 300;
  margin-top: 20px;
  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
`;
const Mention4 = styled.div`
  font-size: 15px;
  color: white;
  color: #ff7836;
  background-color: white;
  font-weight: 300;
  /* margin-top: 10px; */
  @media only screen and (max-width: 768px) {
    font-size: 13px;
  }
`;

const BurrImgContainer = styled.div`
  /* display: flex; */
  filter: blur(50px);
  justify-content: center;
  align-items: center;
  /* margin-left: 200px; */
  width: 600px;
  /* position: relative; */
  background-color: #ff7836;

  z-index: 0;
  top: 50px;
  left: 300px;
  @media only screen and (max-width: 1200px) {
    width: 400px;
    margin-left: 50px;
  }
  @media only screen and (max-width: 768px) {
    width: 200px;
    margin-left: 50px;
  }
`;

const ImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  /* margin-left: 200px; */
  width: 700px;
  height: 400px;
  /* float: right; */
  /* position: relative; */
  bottom: 10px;
  position: absolute;
  /* height: 100%; */
  background-color: #ff7836;
  /* z-index: 100000; */
  /* top: 100px; */
  left: 300px;
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
  width: 480px;
  @media only screen and (max-width: 1200px) {
    width: 400px;
  }
  @media only screen and (max-width: 768px) {
    width: 200px;
  }
`;

const Banner2 = () => {
  return (
    <Container>
      <UpperContainer>
        <BurrImgContainer>
          <Img src="/img/banner/giftbox2.gif"></Img>
        </BurrImgContainer>
        <RealMentionContainer>
          <RealMention1>정말 핫한 신상</RealMention1>
          <RealMention2>입고 완료!</RealMention2>
          <RealMention3>코몽에서 만나보세요</RealMention3>
        </RealMentionContainer>
        <ImgContainer>
          <Img src="/img/banner/giftbox2.gif"></Img>
        </ImgContainer>
        <MentionContainer>
          <Mention1>.</Mention1>
          <Mention2>.</Mention2>
          <Mention3>.</Mention3>
          <Mention4>.</Mention4>
        </MentionContainer>
      </UpperContainer>
      <LowerContainer>fasdfasdfadsf</LowerContainer>
    </Container>
  );
};

export default Banner2;
