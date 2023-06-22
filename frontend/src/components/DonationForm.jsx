import React, { useState } from "react";

const DonationForm = () => {
  const [donationAmount, setDonationAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiration, setCardExpiration] = useState("");
  const [cardCVV, setCardCVV] = useState("");
  const [cardZipCode, setCardZipCode] = useState("");

  const handleDonationSubmit = (e) => {
    e.preventDefault();
    // Logic to handle the donation submission
    console.log("Donation submitted");
    // Clear the form after submission
    setDonationAmount("");
    setPaymentMethod("");
    setCardNumber("");
    setCardExpiration("");
    setCardCVV("");
    setCardZipCode("");
  };

  const handlePayPalRedirect = () => {
    // Logic to redirect the user to PayPal
    console.log("Redirecting to PayPal");
    // Clear the form after redirection
    setDonationAmount("");
    setPaymentMethod("");
    setCardNumber("");
    setCardExpiration("");
    setCardCVV("");
    setCardZipCode("");
  };

  const renderPaymentFields = () => {
    if (paymentMethod === "creditCard" || paymentMethod === "debitCard") {
      return (
        <div>
          <label htmlFor="cardNumber">Card Number:</label>
          <input
            type="text"
            id="cardNumber"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="16"
            required
          />

          <label htmlFor="cardExpiration">Expiration Date:</label>
          <input
            type="text"
            id="cardExpiration"
            value={cardExpiration}
            onChange={(e) => setCardExpiration(e.target.value)}
            required
          />

          <label htmlFor="cardCVV">CVV:</label>
          <input
            type="text"
            id="cardCVV"
            value={cardCVV}
            onChange={(e) => setCardCVV(e.target.value)}
            maxLength="3"
            required
          />

          <label htmlFor="cardZipCode">ZIP Code:</label>
          <input
            type="text"
            id="cardZipCode"
            value={cardZipCode}
            onChange={(e) => setCardZipCode(e.target.value)}
            maxLength="5"
            required
          />
        </div>
      );
    } else if (paymentMethod === "paypal") {
      return (
        <div>
          <p>Click the button below to donate via PayPal:</p>
        </div>
      );
    } else {
      return null;
    }
  };

  return (
    <form onSubmit={handleDonationSubmit}>
      <label htmlFor="donationAmount">Donation Amount:</label>
      <input
        type="number"
        id="donationAmount"
        value={donationAmount}
        onChange={(e) => setDonationAmount(e.target.value)}
        min="1"
        required
      />

      <label htmlFor="paymentMethod">Payment Method:</label>
      <select
        id="paymentMethod"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        required
      >
        <option value="">Select Payment Method</option>
        <option value="creditCard">Credit Card</option>
        <option value="debitCard">Debit Card</option>
        <option value="paypal">PayPal</option>
      </select>

      {renderPaymentFields()}

      <div>
        <button type="submit">Donate</button>
        {paymentMethod === "paypal" && (
          <button type="button" onClick={handlePayPalRedirect}>
            Redirect to PayPal
          </button>
        )}
      </div>
    </form>
  );
};

export default DonationForm;
