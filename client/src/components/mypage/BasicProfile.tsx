import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { useAppSelector } from '../../redux/configStore.hooks';
import ButtonBasic from '../common/ButtonBasic';

const Wrapper = styled.div`
  height: 250px;
  padding-top: 20px;
`;

const ProfilPhotoWrapper = styled.div`
  height: 50%;
  padding: 80px 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const PhotoWrapper = styled.div`
  height: 130px;
  width: 130px;
  border-radius: 50%;
  overflow: hidden;
  position: relative;

  img {
    width: 100%;
    height: 100%;
  }
`;

const EditBtn = styled.div`
  width: 100%;
  height: 22%;
  padding-top: 6px;
  background-color: ${(props) => props.theme.colors.accentColor};
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 0;
  color: white;
  font-weight: 400;
  transform: translateY(30px);

  ${PhotoWrapper}:hover & {
    cursor: pointer;
    transform: translateY(0px);
    transition: transform 0.5s;
  }
`;

const EditConfirmBtn = styled(EditBtn)`
  background-color: red;
  transform: translateY(0px);
`;

const ProfileInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 25px;

  div.userinfo {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
  }
`;

const UserName = styled.span`
  font-size: 20px;
  font-weight: 700;
`;

const UserType = styled.span`
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 16px;
`;

const UserEmail = styled.span`
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 14px;
`;

function BasicProfile() {
  const fileRef = useRef<HTMLInputElement>(null);
  const { role, userinfo } = useAppSelector((state) => state.userSlice);
  const [isEditing, setIsEdtiting] = useState(false);
  const [preview, setPreview] = useState('');
  // 편집하기 버튼 누르면
  // => isEditing = true & 클라우드 플레어 링크 요청 & 이미지 등록 창 뜨고
  // => isEditing = true이면 등록하기 버튼 활성화
  // => 등록하기 버튼 누르면 서버에 imgsrc 수정 요청 && isEditing = false

  const editProfile = (e: React.MouseEvent) => {
    console.log(fileRef);
    setIsEdtiting(true);
    fileRef.current?.click();
  };

  const previewUploader = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.dir(e.target);
    //    const uploadFile = e.target.files[0];
    //  console.log(uploadFile);
    //getCloudUrl(uploadFile);
    //setIsImgLoading(true);
  };

  return (
    <Wrapper>
      <ProfilPhotoWrapper>
        <PhotoWrapper>
          <img src="./img/profile.jpeg" onClick={editProfile} />
          {isEditing ? (
            <EditConfirmBtn
              onClick={(e) => {
                //TODO! 서버에 등록하는 axios 요청
                setIsEdtiting(false);
              }}
            >
              등록
            </EditConfirmBtn>
          ) : (
            <EditBtn onClick={editProfile} className={isEditing ? 'edit' : ''}>
              편집하기
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
        <div className="userinfo">
          <UserName>{userinfo?.name}</UserName>
          <UserType>{role === 0 ? '일반회원' : '판매회원'}</UserType>
        </div>
        <UserEmail>{userinfo?.email}</UserEmail>
      </ProfileInfoWrapper>
    </Wrapper>
  );
}

export default BasicProfile;
