// const crypto = require("ethereum-cryptography/crypto");
const secp = require("ethereum-cryptography/secp256k1");
const { toHex, utf8ToBytes } = require("ethereum-cryptography/utils");
const { keccak256 } = require("ethereum-cryptography/keccak");

const privateKey = secp.utils.randomPrivateKey();

console.log("privateKey : " + toHex(privateKey));
publicKey = secp.getPublicKey(privateKey);
const ethereumAddress = toHex(keccak256(publicKey).slice(-20));
console.log("publicKey : " + ethereumAddress);

// privateKey : 92c6b6ace3344b0d6e8048eae5a3c3b6084ac9df0d84feb57b965fa355e5134d
// publicKey : 48f086b50f57c77146d92a689b64151bb7fb2e1d
// privateKey : bdbeffdf8f9440531ec81d6e47859921d70c9c97b2a047ab1742666c851b22ae
// publicKey : 7d21e252e4ddee98e088a4369daafc90ed7ff71d
// privateKey : 37ecbfd04944b2fe150b745bb908063cf21e4e9a675a5011a823b18e096afca6
// publicKey : f0d7a6581c297a180f38456004c50c704b95e1fb
