import React from 'react';
import OrderHistory from '../../../components/order-history/OrderHistory';

function UserOrderHistory() {
  return (
    <div>
      <h2>주문 내역</h2>
      <OrderHistory search={true}></OrderHistory>
    </div>
  );
}

export default UserOrderHistory;
