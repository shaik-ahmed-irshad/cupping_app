import React from "react";
import "./App.css";


//..
function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}
//..

function App(){
// use this code inside function form 
//..

  async function showRazorpay(e) {
    e.preventDefault()
    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    const data = await fetch("http://localhost:1337/razorpay", {
      method: "POST",
    }).then((t) => t.json());

    console.log(data);

    const options = {
      key: "rzp_test_F2aO48FFkQUsX0",
      currency: data.currency,
      amount: data.amount.toString(),
      order_id: data.id,
      name: "Donation",
      description: "Thank you for nothing. Please give us some money",
      image: "http://localhost:1337/logo.svg",
      handler: function (response) {
        // alert(response.razorpay_payment_id);
        // alert(response.razorpay_order_id);
        // alert(response.razorpay_signature);

        alert("Transaction successful");
      },
      prefill: {
        name: "Rajat",
        email: "rajat@rajat.com",
        phone_number: "9899999999",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }
//..


  return (
    <div className="App">
      <header className="App-header">
        <p>Razorpay payment portal ezzzz</p>
        <a
          className="App-link"
          //..
          onClick={(()=> showRazorpay())}
          //..
          target="_blank"
          rel="noopener noreferrer"
        >
          Pay now
        </a>
      </header>
    </div>
  );
}

export default App;
