import { useState } from "react";

import Address from "./Address";
import Payment from "./Payment";

import "./Checkout.css";

const Checkout = () => {
  const [step, setStep] = useState(1);

  return (
    <div>
      {step === 1 && <Address setStep={setStep} />}
      {step === 2 && <Payment setStep={setStep} />}
    </div>
  );
};

export default Checkout;

// <>
//     {loading ? (
//       <Spinner message="Baba Chill and watch netflix" />
//     ) : (
//       <div>
//         {step === 2 && <Payment />}
//       </div>
//     )}
//   </>
