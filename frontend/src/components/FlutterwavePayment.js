import React from "react";
import { FlutterWaveButton, closePaymentModal } from "flutterwave-react-v3";
import { useDispatch, useSelector } from "react-redux";

export default function App({ price, order }) {
  const cost = price;
  let config = {
    public_key: "FLWPUBK_TEST-60a0ec85d1508d6e31fc719d7d5cdcae-X",
    tx_ref: Date.now(),
    amount: 100,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: "user@gmail.com",
      phonenumber: "07064586146",
      name: "joel ugwumadu",
    },
    customizations: {
      title: "E-plaza",
      description: "Payment Order",
      logo: "https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg",
    },
  };

  config.amount = cost;

  const fwConfig = {
    ...config,
    text: "Pay with Flutterwave!",
    callback: (response) => {
      localStorage.setItem("paymentStatus", JSON.stringify(response.status));

      closePaymentModal(); // this will close the modal programmatically
    },

    onClose: () => {},
  };

  return (
    <div className="App">
      <h1>Hello Test user</h1>
      <FlutterWaveButton className="btn btn-block btn-info" {...fwConfig} />
    </div>
  );
}
