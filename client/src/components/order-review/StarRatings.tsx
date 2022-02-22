import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 200px;
  height: 30px;
  display: flex;
  justify-content: center;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
`;

function StarRatings() {
  const [rate, setRate] = useState(0);

  const makeStars = (num: number) => {
    let stars = [];
    for (let i = 1; i <= num; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          size="2x"
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
    </Wrapper>
  );
}

export default StarRatings;
