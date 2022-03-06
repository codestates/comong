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
  gap: 1rem;
  overflow-x: auto;
`;

const EmptyPreview = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface IReviewPhoto {
  fillPostForm: (data: IPostCommentFormPartial) => void;
}

function ReviewPhoto({ fillPostForm }: IReviewPhoto) {
  const [preview, setPreview] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const previewUploader = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreview([...preview, '']);
    setIsLoading(true);
    const uploadFile = e.currentTarget.files?.[0];
    const data = uploadFile && (await getCloudUrl(uploadFile));
    setPreview([...preview.slice(0, preview.length), data[0]]);
    fillPostForm({ image_src: [...preview, data[0]] });
    setIsLoading(false);
  };

  const deletePreview = (idx: number) => {
    setPreview([...preview.slice(0, idx), ...preview.slice(idx + 1)]);
  };

  const previewHandler = () => {
    console.log('length', preview.length);
    return preview.length > 0 ? (
      preview.map((el, idx) => {
        if (idx === preview.length - 1) {
          return (
            <Preview
              src={el}
              idx={idx}
              deletePreview={deletePreview}
              isLoading={isLoading}
            ></Preview>
          );
        }
        return (
          <Preview
            src={el}
            idx={idx}
            deletePreview={deletePreview}
            isLoading={false}
          ></Preview>
        );
      })
    ) : (
      <EmptyPreview>사진이 없습니다</EmptyPreview>
    );
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
