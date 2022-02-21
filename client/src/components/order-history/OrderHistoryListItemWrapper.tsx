import React, { useState } from 'react';
import EditReview from '../order-review/EditReview';
import { IOrderData } from './OrderHistory';
import OrderHistoryListItem from './OrderHistoryListItem';

interface OrderHistoryListItemWrapper {
  order: IOrderData;
}

function OrderHistoryListItemWrapper({ order }: OrderHistoryListItemWrapper) {
  const [showEdit, setShowEdit] = useState(false);
  return (
    <li>
      <OrderHistoryListItem
        order={order}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
      ></OrderHistoryListItem>
      {showEdit && <EditReview showEdit={showEdit}></EditReview>}
    </li>
  );
}

export default OrderHistoryListItemWrapper;
