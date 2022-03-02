import React, { useEffect } from 'react';
import { config } from '../../config/config';
import { apiClient } from '../../apis';
import { useAppDispatch, useAppSelector } from '../../redux/configStore.hooks';
import type { RootState } from '../../redux/configStore';
import styled from 'styled-components';
const env = 'development';
const urlConfig = config[env];

const Comments = ({ itemId, list }: any) => {
  const itemData = useAppSelector((state: RootState) => state);
  const dispatch = useAppDispatch();

  const id = itemData.itemSlice.data.id;
  let clist = itemData.itemSlice.comments || [];
  console.log('clist', clist);

  useEffect(() => {
    apiClient
      .get(`${urlConfig.url}/comments/itemlist?item_id=${id}`)
      .then((res) => {
        if (res.status === 200)
          clist = JSON.parse(JSON.stringify(res.data.data)) || [];
      });
  }, []);

  console.log('clist', clist);

  const ratingHandler = (x: number) => {
    if (x === 5) return '⭐⭐⭐⭐⭐';
    else if (x === 4) return '⭐⭐⭐⭐';
    else if (x === 3) return '⭐⭐⭐';
    else if (x === 2) return '⭐⭐';
    else return '⭐';
  };

  return (
    <Container>
      {clist.length > 0
        ? clist.map((el: any) => {
            let email = el.user.email.split('@')[0];
            let answer;
            if (email.length === 1) email = '*';
            else if (email.length === 2) email += email[0] + '*';
            else if (email.length === 3) email += email[0] + '**';
            else email = email.slice(0, 3).padEnd(email.length, '*');
            return (
              <CommentContainer>
                <UpperContainer>
                  <Profile>
                    <PictureContainer>
                      <Picture
                        src={
                          el.image_src
                            ? el.image_src
                            : '/icons/post/emptyPerson.png'
                        }
                      ></Picture>
                    </PictureContainer>
                    <NameAndDateContainer>
                      <Name>{email}</Name>
                      <Date>{el.createdAt.substr(0, 10)}</Date>
                    </NameAndDateContainer>
                  </Profile>
                  <Rating>
                    {ratingHandler(el.score)}
                    <RatingNum>{el.score}</RatingNum>
                  </Rating>
                </UpperContainer>
                <Contents>{el.contents}</Contents>
                <Line></Line>
              </CommentContainer>
            );
          })
        : null}
    </Container>
  );
};

const Container = styled.div`
  /* display: flex;
  flex-direction: column; */
`;

const CommentContainer = styled.div`
  /* display: flex;
  flex-direction: column; */
  margin: 20px 5px;
`;
const UpperContainer = styled.div`
  margin: 5px 0px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const Profile = styled.div`
  display: flex;
`;

const PictureContainer = styled.div`
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Picture = styled.img`
  /* height: 40px; */
  border-radius: 50px;
  width: 50px;
`;
const NameAndDateContainer = styled.div`
  display: flex;
  margin: 0px 10px;
  flex-direction: column;
  justify-content: center;
`;
const Name = styled.div`
  font-size: 16px;
  font-weight: 600;
  padding: 3px 0px;
  /* margin: 5px 0px; */
  color: ${(props) => props.theme.colors.charcol};
`;
const Date = styled.div`
  font-size: 13px;
  margin-top: 3px;
  color: ${(props) => props.theme.colors.darkGrey};
`;
const Rating = styled.div`
  color: transparent; /* 기존 이모지 컬러 제거 */
  text-shadow: 0 0 0 ${(props) => props.theme.colors.accentColor}; /* 새 이모지 색상 부여 */
`;
const RatingNum = styled.span`
  font-weight: 600;
  margin-left: 5px;
  color: ${(props) => props.theme.colors.charcol};
`;
const Contents = styled.div`
  margin: 15px 10px;
  font-size: 18px;
  color: ${(props) => props.theme.colors.charcol};
`;
const Line = styled.hr``;
export default Comments;
