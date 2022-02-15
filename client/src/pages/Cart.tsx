import styled from 'styled-components';
import Nav from '../components/Nav';
import MobileNav from '../components/MobileNav';

const CartContainer = styled.div`
  margin-top: 65px;
  margin-bottom: 70px;
`;

const Cart = () => {
  return (
    <div>
      <Nav></Nav>
      <CartContainer>Cart 페이지입니다</CartContainer>
      <MobileNav></MobileNav>
    </div>
  );
};

export default Cart;
