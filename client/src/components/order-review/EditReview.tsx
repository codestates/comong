import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import {
  IPostCommentForm,
  IPostCommentFormPartial,
  postComments,
} from '../../apis/api/comment';
import { getCloudUrl } from '../../apis/api/items';
import { useAppSelector } from '../../redux/configStore.hooks';
import ButtonBasic from '../common/button/ButtonBasic';
import { IOrderData } from '../order-history/OrderHistory';
import Preview from '../Preview';
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
  opacity: 0.7;
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
  display: flex;
  gap: 10px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 2rem;
`;

interface IEditReview {
  setShowEdit: React.Dispatch<React.SetStateAction<boolean>>;
  order: IOrderData;
}

function EditReview({ setShowEdit, order }: IEditReview) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string[]>([]);
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const [postForm, setPostForm] = useState<IPostCommentForm>({
    contents: '',
    image_src: preview,
    score: 0,
    order_detail_id: order?.order_detail_info.id,
    user_id: userinfo?.id!,
  });

  const previewUploader = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = e.currentTarget.files?.[0];
    const data = uploadFile && (await getCloudUrl(uploadFile));
    setPreview([...preview, data[0]]);
  };

  const previewHandler = () => {
    return preview.map((el, idx) => {
      return (
        <Preview src={el} idx={idx} deletePreview={deletePreview}></Preview>
      );
    });
  };

  const deletePreview = (idx: number) => {
    setPreview([...preview.slice(0, idx), ...preview.slice(idx + 1)]);
  };

  const fillPostForm = (data: IPostCommentFormPartial) => {
    setPostForm({ ...postForm, ...data });
  };

  const postReview = async () => {
    if (postForm.score === 0) {
      console.log('점수를 입력해주세요');
      return;
    }
    try {
      const response = await postComments({ ...postForm, image_src: preview });
      console.log('등록되었습니다');
    } catch (error) {}
  };

  return (
    <Wrapper>
      <RatingsWrapper>
        <span>상품은 만족하셨나요?</span>
        <StarRatings fillPostForm={fillPostForm}></StarRatings>
      </RatingsWrapper>
      <TextWrapper>
        <span>어떤 점이 좋았나요?</span>
        <ReviewText
          onChange={(e) => fillPostForm({ contents: e.currentTarget.value })}
          placeholder="상품평을 입력해주세요"
        ></ReviewText>
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
      <ButtonWrapper>
        <ButtonBasic type="extraSmall" buttonClickHandler={postReview}>
          등록
        </ButtonBasic>
        <ButtonBasic
          type="extraSmall"
          lightStyle={true}
          buttonClickHandler={() => setShowEdit(false)}
        >
          취소
        </ButtonBasic>
      </ButtonWrapper>
    </Wrapper>
  );
}

export default EditReview;
