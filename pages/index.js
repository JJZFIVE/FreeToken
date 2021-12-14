import { ethers } from "ethers";
import { useState } from "react";
import Web3Modal from "web3modal";
import Link from "next/link";

import { freeTokenAddressRinkeby } from "../.config";
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
      freeTokenAddressRinkeby,
      FreeTokenABI.abi,
      signer
    );

    setWallet(signer.address);

    await freeToken.giveTokens();
  };

  const balance = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rinkeby-light.eth.linkpool.io/"
    );
    const tokencontract = new ethers.Contract(
      freeTokenAddressRinkeby,
      FreeTokenABI.abi,
      provider
    );
    setWallet(
      "Owner Address: " +
        (await tokencontract.owner()) +
        " owns " +
        (await tokencontract.balanceOf(tokencontract.owner()))
    );
  };

  return (
    <div className="text-2xl font-bold underline bg-red-100">
      <Link href="/localhost">
        <a>Go to Localhost testing</a>
      </Link>
      <h2>FreeToken on Rinkeby</h2>
      <br />
      <p>It's free. Really. Once every 24 hours.</p>
      <br />
      <button onClick={giveTokens}>Give Me Tokens</button>
      <br />
      <button onClick={balance}>Show balance of owner</button>
      <p>{wallet}</p>
    </div>
  );
}
