import * as secp from "ethereum-cryptography/secp256k1";
import { toHex } from "ethereum-cryptography/utils";
import { keccak256 } from "ethereum-cryptography/keccak";

const ACCOUNTS = [
  {
    privateKey:
      "92c6b6ace3344b0d6e8048eae5a3c3b6084ac9df0d84feb57b965fa355e5134d",
    publicKey: "48f086b50f57c77146d92a689b64151bb7fb2e1d",
  },
  {
    privateKey:
      "bdbeffdf8f9440531ec81d6e47859921d70c9c97b2a047ab1742666c851b22ae",
    publicKey: "7d21e252e4ddee98e088a4369daafc90ed7ff71d",
  },
  {
    privateKey:
      "37ecbfd04944b2fe150b745bb908063cf21e4e9a675a5011a823b18e096afca6",
    publicKey: "f0d7a6581c297a180f38456004c50c704b95e1fb",
  },
];

const hashMessage = (message) => keccak256(Uint8Array.from(message));

const getPublicKey = (privateKey) => {
  if (!privateKey) return null;
  const account = ACCOUNTS.find((ac) => ac.privateKey == privateKey);
  return account ? account.publicKey : null;
};

const getPrivateKey = (publicKey) => {
  if (!publicKey) return null;
  const account = ACCOUNTS.find((ac) => ac.publicKey == publicKey);
  return account ? account.privateKey : null;
};

const sign = async (message, account) => {
  const privateKey = getPrivateKey(account);
  console.log("sign-privateKey :" + privateKey);
  const hash = hashMessage(message);

  const [signature, recoveryBit] = await secp.sign(hash, privateKey, {
    recovered: true,
  });
  const fullSignature = new Uint8Array([recoveryBit, ...signature]);
  return toHex(fullSignature);
};

// console.log(
//   "getPublicKey : " +
//     getPublicKey(
//       "92c6b6ace3344b0d6e8048eae5a3c3b6084ac9df0d84feb57b965fa355e5134d"
//     )
// );

const userWallet = {
  sign,
  getPublicKey,
  getPrivateKey,
  ACCOUNTS,
};
export default userWallet;
