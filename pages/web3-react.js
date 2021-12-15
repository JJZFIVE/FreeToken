import { ethers } from "ethers";
import { useState } from "react";
import Link from "next/link";
import { useWeb3React } from "@web3-react/core";
import ConnectButton from "../components/buttons/ConnectButton";
import GiveTokensButton from "../components/buttons/GiveTokensButton";
import OwnerBalanceButton from "../components/buttons/OwnerBalanceButton";

import { freeTokenAddressRinkeby } from "../.config";
import FreeTokenABI from "../artifacts/contracts/FreeToken.sol/FreeToken.json";

export default function Web3ReactComponent() {
  const {
    account,
    activate,
    active,
    chainId,
    connector,
    library,
    deactivate,
    error,
    provider,
    setError,
  } = useWeb3React();

  return (
    <div className="text-center font-mono mt-28 space-y-4">
      <ConnectButton activate={activate} active={active} account={account} />
      <h2 className="text-3xl">FreeToken on Rinkeby - Web3React</h2>
      <p className="text-sm mt-4">It's free. Really. Once every 24 hours.</p>
      <div className="flex justify-center">
        <div className="flex flex-col max-w-md justify-center ">
          <GiveTokensButton library={library} />
          <OwnerBalanceButton />
          <div className="flex flex-col mt-6">
            <Link href="/localhost">
              <a className="text-sm">Go to Localhost testing</a>
            </Link>
            <Link href="/">
              <a className="text-sm mt-4">Go to web3modal</a>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
