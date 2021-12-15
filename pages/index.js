import { ethers } from "ethers";
import { useState } from "react";
import Web3Modal from "web3modal";
import Link from "next/link";

import { freeTokenAddressRinkeby } from "../.config";
import FreeTokenABI from "../artifacts/contracts/FreeToken.sol/FreeToken.json";

export default function Home() {
  const [provider, setProvider] = useState();
  const [signer, setSigner] = useState();
  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState("");

  const signIn = async () => {
    const web3modal = new Web3Modal();
    const connection = await web3modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    setProvider(provider);
    setSigner(signer);
    console.log(provider, signer, connected);
    setConnected(true);
    setAddress(signer.address);
    console.log(signer.address);
  };

  const giveTokens = async () => {
    const freeToken = new ethers.Contract(
      freeTokenAddressRinkeby,
      FreeTokenABI.abi,
      signer
    );

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
    <div className="text-center font-mono mt-28 space-y-4">
      <h2 className="text-3xl">FreeToken on Rinkeby</h2>
      <p className="text-sm mt-4">It's free. Really. Once every 24 hours.</p>
      <div className="flex justify-center">
        <div className="flex flex-col max-w-md justify-center ">
          <button onClick={signIn}>Sign in with Metamask</button>
          {connected ? (
            <p className="text-sm">Address: {address}</p>
          ) : (
            <p>Connect Wallet to Continue</p>
          )}
          <button
            onClick={giveTokens}
            className="p-4 bg-pink-500 text-white font-bold py-2 px-12 rounded w-full mt-4"
          >
            Give Me Tokens
          </button>
          <button
            onClick={balance}
            className="p-4 bg-black text-white font-bold py-2 px-12 rounded w-full mt-4"
          >
            Show balance of owner
          </button>
          <div className="flex flex-col ">
            <Link href="/localhost">
              <a className="text-sm">Go to Localhost testing</a>
            </Link>
            <Link href="/web3-react">
              <a className="text-sm mt-4">Go to web3-react test</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
