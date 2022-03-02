import styled from 'styled-components';
import Banner1 from './bannersrc/Banner1';
import Slick from './Slick';

interface itemsProps {
  item: string;
  name: string;
  el?: any;
}

const SliderItem = styled.div`
  width: 100%;
  height: 300px;
  background-color: red;
  img {
    max-width: 100%;
    height: auto;
  }
  margin-top: 65px;
`;

const items: itemsProps[] = [
  {
    item: '/icons/',
    name: '이미지01',
    el: <Banner1 />,
  },
  {
    item: 'http://placehold.it/1200x400/ff0000',
    name: '이미지02',
  },
  {
    item: 'http://placehold.it/1200x400/00ffff',
    name: '이미지03',
  },
];
const BackGround = styled.div`
  background-color: green;
`;

function Item() {
  return (
    <Slick>
      {items.map((item, index) => (
        <SliderItem key={index}>
          <img src={item.item} alt={item.name} />
          {item.el}
        </SliderItem>
      ))}
    </Slick>
  );
}

export default Item;
