import React from 'react';
import OrderHistory from '../../../components/common/order-history/OrderHistory';

function UserOrderHistory() {
  return (
    <div>
      <h2>최근 주문 내역</h2>
      <OrderHistory></OrderHistory>
    </div>
  );
}

export default UserOrderHistory;
