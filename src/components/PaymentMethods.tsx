import React from 'react';
import { MastercardIcon, ApplePayIcon, PayPalIcon } from './icons';

const PaymentMethods: React.FC = () => {
  return (
    <div className="flex items-center justify-center gap-3 mt-2 bg-white/10 backdrop-blur-sm rounded-lg py-2 px-4">
      <MastercardIcon className="h-6 w-auto" />
      <ApplePayIcon className="h-6 w-auto" />
      <PayPalIcon className="h-6 w-auto" />
    </div>
  );
};

export default PaymentMethods;