import { SizeProp } from '@fortawesome/fontawesome-svg-core';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import styled from 'styled-components';
import { IPostCommentFormPartial } from '../../apis/api/comment';
import { ReactComponent as StarIcon } from '../../asset/star.svg';

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const Stars = styled.div`
  display: flex;
  align-items: center;
`;

const Star = styled(StarIcon)<{
  color?: string;
  size?: string;
}>`
  fill: ${(props) => (props.color ? props.color : '#B8B8B8')};
  width: ${(props) => (props.size ? props.size : '2.5rem')};
  height: ${(props) => (props.size ? props.size : '2.5rem')};
`;

interface IStarRatings {
  fillPostForm?: (data: IPostCommentFormPartial) => void;
  score?: number;
  size?: string;
}

function StarRatings({ fillPostForm, score = 0, size }: IStarRatings) {
  const [rate, setRate] = useState(score);

  const makeStars = (num: number) => {
    let stars = [];
    for (let i = 1; i <= num; i++) {
      stars.push(
        <Star
          key={i}
          color={rate >= i ? '#dd576f' : '#B8B8B8'}
          size={size ? size : '2.5rem'}
          onClick={() => {
            fillPostForm && setRate(i);
            fillPostForm && fillPostForm({ score: i });
          }}
        ></Star>,
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
