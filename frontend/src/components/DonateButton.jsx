import { useState } from "react";

export default function DonateButton({ url }) {
  const [payUrl] = useState(
    url[0] === "1"
      ? `https://www.buymeacoffee.com/${url.substring(1)}`
      : url[0] === "2"
      ? `https://www.paypal.com/paypalme/${url.substring(1)}`
      : url.substring(1)
  );

  return (
    <>
      <br></br>
      <div className="bmc-btn-container">
        <a className="bmc-btn" target="_blank" href={payUrl}>
          🦾<span className="bmc-btn-text">Support My Material Costs</span>
        </a>
      </div>
      <br></br>
    </>
  );
}
