import React, { useState, useEffect } from "react";
import { updatePayment } from "../adapters/user-adapter";
import { getUser } from "../adapters/user-adapter";

const DonationForm = ({ id, setUserProfile, payment }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [payment_info, setDonationInfo] = useState("");
  const [deletePayment, setDeletePayment] = useState(
    payment ? "Delete Payment" : "Add Payment"
  );

  const onChange = (e) => {
    setDonationInfo(e.target.value);
  };

  useEffect(() => {
    if (payment_info === "" && payment) {
      setDeletePayment("Delete Payment");
    } else if (payment_info === "" && !payment) {
      setDeletePayment("Add Payment");
    } else if (payment_info && payment) {
      setDeletePayment("Update Payment");
    } else if (payment_info && !payment) {
      setDeletePayment("Add Payment");
    }
  }, [payment_info, payment]);

  const handleDonationSubmit = async (e) => {
    e.preventDefault();
    let payment_url =
      payment_info === ""
        ? ""
        : paymentMethod === "coffee"
        ? `1${payment_info}`
        : paymentMethod === "payPalAccount"
        ? `2${payment_info}`
        : `3${payment_info}`;
    await updatePayment({ id, payment_url });
    setDeletePayment(
      deletePayment === "Delete Payment" ? "Add Payment" : "Delete Payment"
    );
    const [user] = await getUser(id);
    setUserProfile(user);
    setDonationInfo("");
    setPaymentMethod("");
    if (payment_info === "" && !payment) {
      setDeletePayment("Add Payment");
    }
  };

  const renderPaymentFields = () => {
    if (paymentMethod === "coffee") {
      return (
        <div>
          <label htmlFor="coffee">coffee Number:</label>
          <input
            type="text"
            id="coffee"
            value={payment_info}
            onChange={onChange}
            placeholder="Buy Me a Coffee Username Here:"
          />
          <p>
            Input your{" "}
            <a href="https://www.buymeacoffee.com/" target="_blank">
              Buy Me A Coffee
            </a>{" "}
            account username above to connect your account.
          </p>
        </div>
      );
    } else if (paymentMethod === "payPalAccount") {
      return (
        <div>
          <label htmlFor="payPalAccount">payPalAccount Number:</label>
          <input
            type="text"
            id="payPalAccount"
            value={payment_info}
            onChange={onChange}
            placeholder="PayPal Username Here:"
          />
          <p>
            Input your
            <a href="https://www.paypal.com/us/home" target="_blank">
              PayPal
            </a>
            account username above to connect your account.
          </p>
        </div>
      );
    } else if (paymentMethod === "payPalDonate") {
      return (
        <div>
          <label htmlFor="payPalDonate">payPalDonate Number:</label>
          <input
            type="text"
            id="payPalDonate"
            value={payment_info}
            onChange={onChange}
            placeholder="PayPal Donation Link Here:"
          />
          <p>
            Create a donation page through the
            <a href="https://www.paypal.com/donate/buttons" target="_blank">
              PayPal Donation Creator
            </a>
            and make sure you copy the entire link to connect your account.
          </p>
        </div>
      );
    } else {
      return null;
    }
  };
  return (
    <>
      <br></br>
      <form onSubmit={handleDonationSubmit} aria-label="form">
        <label htmlFor="paymentMethod">Payment Method:</label>
        <select
          id="paymentMethod"
          value={paymentMethod}
          onChange={(e) => {
            setPaymentMethod(e.target.value);
            setDonationInfo("");
          }}
        >
          <option value="">Select Payment Method</option>
          <option value="coffee">Buy Me A Coffee</option>
          <option value="payPalAccount">PayPal Profile</option>
          <option value="payPalDonate">PayPal Donation Page</option>
        </select>
        {renderPaymentFields()}
        <button type="submit">{deletePayment}</button>
      </form>
      <br></br>
    </>
  );
};
export default DonationForm;
