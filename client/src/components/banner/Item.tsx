import styled from 'styled-components';
import Banner1 from './bannersrc/Banner1';
import Banner2 from './bannersrc/Banner2';
import Banner3 from './bannersrc/Banner3';
import Slick from './Slick';

interface itemsProps {
  item: string;
  name: string;
  el?: any;
}

const SliderItem = styled.div`
  width: 100%;
  height: 300px;
  /* background-color: red; */
  img {
    max-width: 100%;
    height: auto;
  }
  margin-top: 65px;
  @media only screen and (max-width: 768px) {
    height: 200px;
  }
`;

const items: itemsProps[] = [
  {
    item: '/icons/',
    name: '이미지01',
    el: <Banner2 />,
  },
  {
    item: 'http://placehold.it/1200x400/ff0000',
    name: '이미지02',
    el: <Banner1 />,
  },
  {
    item: 'http://placehold.it/1200x400/00ffff',
    name: '이미지03',
    el: <Banner3 />,
  },
];
const Container = styled.div`
  margin-bottom: 20px;
`;

function Item() {
  return (
    <Container>
      <Slick>
        {items.map((item, index) => (
          <SliderItem key={index}>
            {/* <img src={item.item} alt={item.name} /> */}
            {item.el}
          </SliderItem>
        ))}
      </Slick>
    </Container>
  );
}

export default Item;
