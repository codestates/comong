import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import { IPostCommentFormPartial } from '../../apis/api/comment';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
`;

interface IStarRatings {
  fillPostForm?: (data: IPostCommentFormPartial) => void;
  score?: number;
  size?: SizeProp;
}

function StarRatings({ fillPostForm, score = 0, size }: IStarRatings) {
  const [rate, setRate] = useState(score);

  const makeStars = (num: number) => {
    let stars = [];
    for (let i = 1; i <= num; i++) {
      stars.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          size={size ? size : '1x'}
          color={rate >= i ? 'red' : '#B8B8B8'}
          onClick={() => {
            fillPostForm && setRate(i);
            fillPostForm && fillPostForm({ score: i });
          }}
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
