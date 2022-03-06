import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { IPostCommentFormPartial } from '../../apis/api/comment';
import { getCloudUrl } from '../../apis/api/items';
import Preview from '../Preview';

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
  @media only screen and (max-width: 768px) {
    height: 2.5rem;
    font-size: 1rem;
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

interface IReviewPhoto {
  fillPostForm: (data: IPostCommentFormPartial) => void;
}

function ReviewPhoto({ fillPostForm }: IReviewPhoto) {
  const [preview, setPreview] = useState<string[]>([]);
  const fileRef = useRef<HTMLInputElement>(null);

  const previewUploader = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadFile = e.currentTarget.files?.[0];
    const data = uploadFile && (await getCloudUrl(uploadFile));
    setPreview([...preview, data[0]]);
    fillPostForm({ image_src: [...preview, data[0]] });
  };

  const deletePreview = (idx: number) => {
    setPreview([...preview.slice(0, idx), ...preview.slice(idx + 1)]);
  };

  const previewHandler = () => {
    return preview.map((el, idx) => {
      return (
        <Preview src={el} idx={idx} deletePreview={deletePreview}></Preview>
      );
    });
  };

  return (
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
  );
}

export default ReviewPhoto;
