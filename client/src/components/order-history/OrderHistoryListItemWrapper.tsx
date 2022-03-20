import React, { useState } from 'react';
import EditReview from '../order-review/EditReview';
import { IOrderData } from './OrderHistory';
import OrderHistoryListItem from './OrderHistoryListItem';

interface OrderHistoryListItemWrapper {
  order: IOrderData;
  key?: React.Key;
}

function OrderHistoryListItemWrapper({ order }: OrderHistoryListItemWrapper) {
  const [showEdit, setShowEdit] = useState(false);
  const [isReviewUpdated, setIsReviewUpdated] = useState(false);

  return (
    <li>
      <OrderHistoryListItem
        order={order}
        isReviewUpdated={isReviewUpdated}
        showEdit={showEdit}
        setShowEdit={setShowEdit}
      ></OrderHistoryListItem>
      {showEdit && (
        <EditReview order={order} setShowEdit={setShowEdit} setIsReviewUpdated={setIsReviewUpdated}></EditReview>
      )}
    </li>
  );
}

export default OrderHistoryListItemWrapper;
