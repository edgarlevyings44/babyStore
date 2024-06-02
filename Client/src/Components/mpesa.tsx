import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface PaymentFormProps {
  isOpen: boolean;
  onClose: () => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [responseMessage, setResponseMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
  const [checkoutRequestID, setCheckoutRequestID] = useState<string | null>(null);

  useEffect(() => {
    if (checkoutRequestID) {
      const interval = setInterval(async () => {
        try {
          const response = await axios.get(`https://hot-rivers-roll.loca.lt/api/paymentstatus/${checkoutRequestID}`);
          if (response.data.status === 'Paid') {
            setPaymentStatus('Paid');
            clearInterval(interval);
          } else if (response.data.status === 'Failed') {
            setPaymentStatus('failed');
            clearInterval(interval);
          }
        } catch (error) {
          console.error('Error fetching payment status:', error);
        }
      }, 5000); // Poll every 5 seconds

      return () => clearInterval(interval);
    }
  }, [checkoutRequestID]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setResponseMessage('');
    setPaymentStatus(null);

    try {
      const response = await axios.post('https://hot-rivers-roll.loca.lt/api/mpesa/stk-push', {
        amount,
        phone_number: phoneNumber,
      });
      if (response.data.CheckoutRequestID) {
        setCheckoutRequestID(response.data.CheckoutRequestID);
        setResponseMessage(response.data.message);
      } else {
        setResponseMessage('Failed to initiate payment.');
      }
    } catch (error) {
      console.error('Error:', error);
      setResponseMessage('Error initiating payment.');
    } finally {
      setIsLoading(false);
    }

  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-bold mb-4">Make Payment</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="amount" className="block font-medium mb-2">
              Amount
            </label>
            <input
              type="text"
              id="amount"
              name='amount'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="phoneNumber" className="block font-medium mb-2">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name='phoneNumber'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 w-full"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Processing...' : 'Make Payment'}
            </button>
          </div>
        </form>
        {responseMessage && <p>{responseMessage}</p>}
        {paymentStatus === 'Paid' && (
          <div className="success-icon">
            <img src="/success-icon.png" alt="Payment Successful" />
            <p>Payment Successful!</p>
          </div>
        )}
        {paymentStatus === 'Failed' && (
          <div className="error-icon">
            <img src="/error-icon.png" alt="Payment Failed" />
            <p>Payment Failed.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentForm;