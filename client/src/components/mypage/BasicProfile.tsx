import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { getCloudUrl } from '../../apis/api/items';
import { useAppSelector } from '../../redux/configStore.hooks';
import ButtonBasic from '../common/button/ButtonBasic';
import ImgLodingIndicator from '../common/loading-indicator/ImgLodingIndicator';

const Wrapper = styled.div`
  height: 250px;
  padding-top: 20px;
  margin-bottom: 10px;

  @media only screen and (max-width: 1200px) {
    margin-bottom: 1rem;
  }

  @media only screen and (max-width: 768px) {
    height: 150px;
    display: flex;
    align-items: center;
    padding-top: 0;
  }
`;

const ProfilPhotoWrapper = styled.div`
  height: 50%;
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (max-width: 768px) {
  }
`;

const PhotoWrapper = styled.div`
  height: 130px;
  width: 130px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;
  background-color: white;
  display: flex;
  justify-content: center;
  cursor: pointer;

  @media only screen and (max-width: 768px) {
    height: 100px;
    width: 100px;
  }

  img {
    width: 150%;
    height: 100%;
  }
  & > input {
    display: none;
  }
`;

const EditBtn = styled.div`
  width: 100%;
  height: 24%;
  padding-top: 6px;
  background-color: ${(props) => props.theme.colors.charcol};
  opacity: 0.7;
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  color: white;
  font-weight: 400;
  transform: translateY(35px);
  transition: all 0.5s;

  img {
    width: 1rem;
    height: 1rem;
  }

  ${PhotoWrapper}:hover & {
    cursor: pointer;
    transform: translateY(0px);
  }
  &:hover {
    opacity: 1;
  }
`;

const EditConfirmBtn = styled(EditBtn)`
  background-color: ${(props) => props.theme.colors.accentColorLight};
  transform: translateY(0px);
`;

const ProfileInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 0 4px;
  @media only screen and (max-width: 1200px) {
    padding: 0 1rem;
    gap: 0.5rem;
  }
  @media only screen and (max-width: 768px) {
    padding: 0 1rem;
    gap: 0.5rem;
  }
`;

const UserName = styled.span`
  font-size: 18px;
  font-weight: 700;
`;

const UserType = styled.span`
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 14px;
`;

const UserEmail = styled.span`
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 14px;
`;

function BasicProfile() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { role, userinfo } = useAppSelector((state) => state.userSlice);
  const [isEditing, setIsEdtiting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState('');
  // 편집하기 버튼 누르면
  // => isEditing = true & 클라우드 플레어 링크 요청 & 이미지 등록 창 뜨고
  // => isEditing = true이면 등록하기 버튼 활성화
  // => 등록하기 버튼 누르면 서버에 imgsrc 수정 요청 && isEditing = false

  const editProfile = (e: React.MouseEvent) => {
    console.log(fileRef);
    fileRef.current?.click();
  };

  const previewUploader = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);
    try {
      const uploadFile = e.currentTarget.files?.[0];
      const data = uploadFile && (await getCloudUrl(uploadFile));

      // await getCloudUrl(async (prevTask, currTask) => {
      //   await prevTask;
      //   return handleTask(currTask)
      // }, Promise.resolve());

      //setIsImgLoading(true);
      setIsLoading(false);
      setPreview(data[0]);
      setIsEdtiting(true); //업로드 완료 되고 나서로 위치 이동
    } catch (error) {
      console.log(error);
    }
  };

  const patchUserProfilePhoto = () => {
    // 회원정보수정 요청
    setIsEdtiting(false);
  };

  return (
    <Wrapper>
      <ProfilPhotoWrapper>
        <PhotoWrapper>
          {isLoading ? (
            <ImgLodingIndicator></ImgLodingIndicator>
          ) : (
            <img
              src={preview || 'icons/post/emptyPerson.png'}
              onClick={editProfile}
            />
          )}
          {isEditing ? (
            <EditConfirmBtn onClick={patchUserProfilePhoto}>
              <img src="img/check.png" />
            </EditConfirmBtn>
          ) : (
            <EditBtn onClick={editProfile} className={isEditing ? 'edit' : ''}>
              편집
            </EditBtn>
          )}
          <input
            ref={fileRef}
            onChange={previewUploader}
            type="file"
            accept=".jpeg, .jpg, .png"
          />
        </PhotoWrapper>
      </ProfilPhotoWrapper>
      <ProfileInfoWrapper>
        <UserName>{userinfo?.name}</UserName>
        <UserType>{role === 0 ? '일반회원' : '판매회원'}</UserType>
        <UserEmail>{userinfo?.email}</UserEmail>
      </ProfileInfoWrapper>
    </Wrapper>
  );
}

export default BasicProfile;
