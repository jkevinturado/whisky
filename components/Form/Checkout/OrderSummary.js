import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const OrderSummary = (props) => {
  return (
    <div>
      <div className='border border-gray-200 p-4 space-y-2 rounded-sm shadow-md'>
        <h3 className='text-md font-medium'>ORDER SUMMARY</h3>
        <div className='flex justify-between items-center text-sm'>
          <div>1 item</div>
          <div>₱ 2,700.00</div>
        </div>
        <div className='flex justify-between items-center text-sm'>
          <div>Delivery</div>
          <div>₱ 500.00</div>
        </div>
        <hr />
        <div className='flex justify-between items-center text-sm'>
          <div>Total</div>
          <div>₱ 3,200.00</div>
        </div>
        <hr />
        <div>Accepted payments</div>
      </div>
    </div>
  );
};

export default OrderSummary;
