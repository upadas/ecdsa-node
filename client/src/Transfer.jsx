import { useState } from "react";
import server from "./server";
import userWallet from "./accounts";

function Transfer({ address, setBalance }) {
  const [sendAmount, setSendAmount] = useState("");
  const [recipient, setRecipient] = useState("");

  console.log("address/sender = " + address);  

  const setValue = (setter) => (evt) => setter(evt.target.value);
 
  async function transfer(evt) {
    evt.preventDefault();

    const message = {
      amount: parseInt(sendAmount),
      recipient,  
    };

    const signature = await userWallet.sign(message,address);
    const transaction = {
      message,
      signature,
    };

      try {
        const { data: { balance }, } = await server.post(`send`, transaction);
        console.log("balance after sending transaction to server:" + balance)
        setBalance(balance);
      } catch (ex) {
        alert(ex.response.data.message);
      }
  }

  return (
    <form className="container transfer" onSubmit={transfer}>
      <h1>Send Transaction</h1>

      <label>
        Send Amount
        <input
          placeholder="1, 2, 3..."
          value={sendAmount}
          onChange={setValue(setSendAmount)}
        ></input>
      </label>

      <label>
        Recipient
        <input
          placeholder="Type an address, Ex: 0x48f086b50..."
          value={recipient}
          onChange={setValue(setRecipient)}
        ></input>
      </label>

      <input type="submit" className="button" value="Transfer" />
    </form>
  );
}

export default Transfer;
