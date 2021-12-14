import { ethers } from "ethers";
import { useState } from "react";
import Web3Modal from "web3modal";
import Link from "next/link";

import { freeTokenAddressLocal } from "../.config";
import FreeTokenABI from "../artifacts/contracts/FreeToken.sol/FreeToken.json";

export default function Home() {
  const [wallet, setWallet] = useState("");

  const giveTokens = async () => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    console.log(signer);
    const freeToken = new ethers.Contract(
      freeTokenAddress,
      FreeTokenABI.abi,
      signer
    );

    setWallet(signer.address);

    await freeToken.giveTokens();
  };

  const testAccount = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const tokencontract = new ethers.Contract(
      freeTokenAddressLocal,
      FreeTokenABI.abi,
      provider
    );

    console.log(
      (await tokencontract.balanceOf(tokencontract.owner())).toString()
    );
  };

  return (
    <div>
      <Link href="/">
        <a>Go to Rinkeby Testnet</a>
      </Link>
      <h2>FreeToken on Localost</h2>
      <br />
      <p>It's free. Really.</p>
      <br />
      <button onClick={giveTokens}>Give Me Tokens</button>
      <button onClick={testAccount}>Test the account balance</button>
    </div>
  );
}
