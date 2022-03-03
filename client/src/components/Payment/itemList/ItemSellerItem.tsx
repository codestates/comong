import styled from 'styled-components';
import {
  useAppDispatch,
  useAppSelector,
} from '../../../redux/configStore.hooks';
import type { RootState } from '../../../redux/configStore';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 22px 0px;
`;

const CartListItemImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 70px;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    width: 50px;
  }
`;

const CartListItemImage = styled.img`
  width: 60px;
`;

const NameAndStockContainer = styled.div`
  width: 60%;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    width: 30%;
  }
`;
const CartListItemName = styled.div`
  font-size: 15px;
  font-weight: 400;
  width: 100%;
  height: 20px;
  text-overflow: ellipsis;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    font-size: 12px;
  }
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 10px;
  width: 25%;
`;

const CartListItemPrice = styled.div`
  justify-content: flex-end;
  align-items: flex-end;
  vertical-align: middle;
  text-align: right;
  font-size: 18px;
  font-weight: 600;
  @media only screen and (max-width: 1200px) {
  }
  @media only screen and (max-width: 768px) {
    font-size: 14px;
  }
`;

const ItemSellerItem = ({ data, storeName, groupName }: any) => {
  const cartData = useAppSelector((state: RootState) => state);

  console.log(data);

  console.log(data.item.image_src);
  console.log(
    'data.item.image_src',
    JSON.parse(JSON.stringify(data.item.image_src.split(',')[0])),
  );

  const dispatch = useAppDispatch();
  const name = data.item.title;
  // const img_src =
  //   'https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/fe9f218d-5134-4a76-ba20-bf97e5c21900/thumbnail';
  const img_src = data.item.image_src
    ? data.item.image_src.split(',')[0]
    : 'https://imagedelivery.net/BOKuAiJyROlMLXwCcBYMqQ/fe9f218d-5134-4a76-ba20-bf97e5c21900/thumbnail';
  const stock = data.order_amount;
  const price = data.peritem_price;

  return (
    <Container>
      <CartListItemImageContainer>
        <CartListItemImage src={img_src} />
      </CartListItemImageContainer>
      <NameAndStockContainer>
        <CartListItemName>{name}</CartListItemName>
      </NameAndStockContainer>
      <PriceContainer>
        <CartListItemPrice>
          {(price * stock).toLocaleString('en')}원
        </CartListItemPrice>
      </PriceContainer>
    </Container>
  );
};

export default ItemSellerItem;
