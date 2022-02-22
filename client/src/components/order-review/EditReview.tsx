import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { getCloudUrl } from '../../apis/api/items';
import ButtonBasic from '../common/button/ButtonBasic';
import StarRatings from './StarRatings';

const Wrapper = styled.div`
  width: 100%;
  padding: 10px 40px;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RatingsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 1rem 0;
  padding-bottom: 2rem;
  border-bottom: 1px solid ${(props) => props.theme.colors.lightGrey};

  > span {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 0.8rem;
  }
`;

const TextWrapper = styled(RatingsWrapper)``;

const ReviewText = styled.textarea`
  width: 100%;
  height: 150px;
  resize: none;
  padding: 1rem;
  border: 1px solid ${(props) => props.theme.colors.darkGrey};
  background-color: ${(props) => props.theme.colors.lightGrey};
`;

const PhotoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const PhotoInput = styled.div`
  width: 100%;
  height: 60px;
  margin-bottom: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: 700;
  font-size: 20px;
  background-color: white;
  border: 1px dashed ${(props) => props.theme.colors.darkGrey};
  span {
    margin-left: 8px;
  }
`;

const Input = styled.input`
  display: none;
`;

const PreviewList = styled.ul`
  width: 100%;
  height: 100px;
  margin-bottom: 1rem;
  background-color: white;
`;

const Preview = styled.img`
  width: 100px;
  height: 100px;
  position: relative;
  background-color: pink;
`;

interface IEditReview {
  showEdit: boolean;
}

function EditReview({ showEdit }: IEditReview) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState('');

  const previewUploader = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = e.currentTarget.files?.[0];
    const data = uploadFile && (await getCloudUrl(uploadFile));
    setPreview(data[0]);
  };

  const previewHandler = () => {
    return <Preview src={preview}></Preview>;
  };

  // const previewHandler = (e) => {
  //   if (!preview) {
  //     if (isImgLoading) {
  //       return <Indicator type="postForm">로딩중</Indicator>;
  //     } else if (postForm.image_src) {
  //       return <PreviewImg src={postForm.image_src}></PreviewImg>;
  //     } else {
  //       return <Indicator type="postForm">이미지를 등록해주세요</Indicator>;
  //     }
  //   } else {
  //     return <PreviewImg src={preview}></PreviewImg>;
  //   }
  // };

  return (
    <Wrapper className={showEdit ? 'show' : 'hide'}>
      <RatingsWrapper>
        <span>상품은 만족하셨나요?</span>
        <StarRatings></StarRatings>
      </RatingsWrapper>
      <TextWrapper>
        <span>어떤 점이 좋았나요?</span>
        <ReviewText placeholder="상품평을 입력해주세요"></ReviewText>
      </TextWrapper>
      <PhotoWrapper>
        <PhotoInput onClick={() => fileRef.current?.click()}>
          <FontAwesomeIcon icon={faCamera} />
          <span>사진 첨부하기</span>
        </PhotoInput>
        <Input
          type="file"
          ref={fileRef}
          onChange={previewUploader}
          accept=".jpeg, .jpg, .png"
        />
        <PreviewList>{previewHandler()}</PreviewList>
      </PhotoWrapper>
      <ButtonBasic type="extraSmall" buttonClickHandler={() => {}}>
        등록
      </ButtonBasic>
    </Wrapper>
  );
}

export default EditReview;
