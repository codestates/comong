import styled from 'styled-components';

const BannerContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 65px;
  height: 380px;
  background-color: #7927a8;
`;

const BannerEffect = styled.img`
  margin: 1 auto;
`;

const BannerTitle = styled.span`
  margin: 1 auto;
  margin-top: 40px;
  font-weight: bold;
  font-size: 50px;
`;
const BannerMention = styled.span``;

const BannerGif = styled.img`
  margin: 1 auto;
`;

const Banner = () => {
  return (
    <BannerContainer>
      {/* <BannerGif src="icons/heart.gif"></BannerGif>
      <BannerEffect src="icons/effect.gif"></BannerEffect>
      <BannerTitle>연인에게 전하는 사랑</BannerTitle>
      <BannerMention>사랑하는 사람에게</BannerMention>
      <BannerMention>의미있는 하루를 선물하세요</BannerMention> */}
    </BannerContainer>
  );
};

export default Banner;
