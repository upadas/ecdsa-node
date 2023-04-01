import server from "./server";
import userWallet from "./accounts";


function Wallet({ address, setAddress, balance, setBalance, privateKey, setPrivateKey }) {
  async function onChange(evt) {

    const address = evt.target.value;
    // const privateKey = evt.target.value;
    // const publicKey = secp.getPublicKey(walletAccount);
    // const address = toHex(keccak256(publicKey).slice(-20));
    setAddress(address);
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
        Public Key
        <input placeholder="Put in Your Account (Public Key)" value={address} onChange={onChange}></input>
      </label>

      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
