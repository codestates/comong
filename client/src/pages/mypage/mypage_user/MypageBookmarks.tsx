import React from 'react';
import { useAppSelector } from '../../../redux/configStore.hooks';

function MypageBookmarks() {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  console.log(userinfo?.bookmarks);

  return <div>MypageBookmarks</div>;
}

export default MypageBookmarks;
