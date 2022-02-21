import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 150px;
  height: 30px;
  display: flex;
  align-items: center;
  background-color: pink;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
`;

const Rate = styled.span`
  margin-top: 4px;
  margin-left: 8px;
  font-weight: 700;
`;

function StarRatings() {
  const [rate, setRate] = useState(0);

  const makeStars = (num: number) => {
    let stars = [];
    for (let i = 1; i <= num; i++) {
      stars.push(
        <FontAwesomeIcon
          icon={faStar}
          color={rate >= i ? 'red' : '#B8B8B8'}
          onClick={() => setRate(i)}
        />,
      );
    }
    return stars;
  };

  return (
    <Wrapper>
      <Stars>{makeStars(5)}</Stars>
      <Rate>{rate}</Rate>
    </Wrapper>
  );
}

export default StarRatings;
