const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;
const crypto = require("./crypto");

app.use(cors());
app.use(express.json());

const balances = {
  "48f086b50f57c77146d92a689b64151bb7fb2e1d": 100,
  "7d21e252e4ddee98e088a4369daafc90ed7ff71d": 50,
  f0d7a6581c297a180f38456004c50c704b95e1fb: 75,
};

// privateKey : 92c6b6ace3344b0d6e8048eae5a3c3b6084ac9df0d84feb57b965fa355e5134d
// publicKey : 48f086b50f57c77146d92a689b64151bb7fb2e1d
// privateKey : bdbeffdf8f9440531ec81d6e47859921d70c9c97b2a047ab1742666c851b22ae
// publicKey : 7d21e252e4ddee98e088a4369daafc90ed7ff71d
// privateKey : 37ecbfd04944b2fe150b745bb908063cf21e4e9a675a5011a823b18e096afca6
// publicKey : f0d7a6581c297a180f38456004c50c704b95e1fb

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {
  const { message, signature } = req.body;
  const { recipient, amount } = message;

  // Get public key and sender
  const pubKey = crypto.signatureToPubKey(message, signature);
  console.log("pubKey : " + pubKey);
  const sender = crypto.pubKeyToAccount(pubKey);
  // The signer is signing the transaction with the amount and recipient in the message hash
  // with the private key of the sender
  console.log("sender :" + sender);
  console.log("recipient :" + recipient);
  console.log("message :" + JSON.stringify(message));
  console.log("signature :" + signature);

  setInitialBalance(sender);
  setInitialBalance(recipient);

  console.log("balances:" + JSON.stringify(balances));
  // The sender is not parsed correctly, not sure why? and the server is bailing out at this line
  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
