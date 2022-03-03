import { AxiosResponse } from 'axios';
import { objectTraps } from 'immer/dist/internal';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getBookmarks, getItems } from '../../../apis/api/items';
import PostListItem from '../../../components/postList/PostListItem';
import { useAppSelector } from '../../../redux/configStore.hooks';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1600px;
  padding: 10px;
  display: flex;
  margin: auto;
  margin-top: 20px;
  flex-wrap: wrap;

  @media only screen and (max-width: 1200px) {
    width: 100%;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;

const ItemContainer = styled.div`
  width: 25%;
  margin-bottom: 10px;

  @media only screen and (max-width: 768px) {
    width: 50%;
  }
`;

export type IItemPartial = Partial<IItem>;
export interface IItem {
  contents: string;
  id: number;
  image_src: string;
  price: number;
  title: string;
  user_id: number;
  user: { storename: string };
  item_inventories?: { stock: number }[];
}

function MypageBookmarks() {
  const { userinfo } = useAppSelector((state) => state.userSlice);
  const [bookmarks, setBookmarks] = useState<IItem[]>();

  useEffect(() => {
    fetchData();
  }, [userinfo?.bookmarks]);

  const fetchData = async () => {
    try {
      const data = userinfo && (await getBookmarks(userinfo.id));
      console.log(data);
      // !TODO 데이터 없어서 임시 적용
      if (data) {
        for (let i = 0; i < data?.length; i++) {
          data[i].user = { storename: '임시상점' };
        }
      }
      console.log(data);
      data && setBookmarks(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h2>찜 리스트</h2>
      <Wrapper>
        {bookmarks && bookmarks.length > 0 ? (
          bookmarks.map((post: IItem) => {
            return (
              <ItemContainer>
                <PostListItem post={post} />
              </ItemContainer>
            );
          })
        ) : (
          <span>마음에 드는 상품을 찜해보세요</span>
        )}
      </Wrapper>
    </div>
  );
}

export default MypageBookmarks;
