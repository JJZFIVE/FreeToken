import { ethers } from "ethers";
import { useState } from "react";

import { freeTokenAddressRinkeby } from "../../.config";
import FreeTokenABI from "../../artifacts/contracts/FreeToken.sol/FreeToken.json";

export default function GiveTokensButton(props) {
  const [bal, setBal] = useState(0);
  const balance = async () => {
    const provider = new ethers.providers.JsonRpcProvider(
      "https://rinkeby-light.eth.linkpool.io/"
    );
    const tokencontract = new ethers.Contract(
      freeTokenAddressRinkeby,
      FreeTokenABI.abi,
      provider
    );
    if (bal == 0) {
      setBal(await tokencontract.owner());
    } else {
      setBal(0);
    }

    console.log(
      "Owner Address: " +
        (await tokencontract.owner()) +
        " owns " +
        (await tokencontract.balanceOf(tokencontract.owner()))
    );
  };

  return (
    <div className="flex flex-col">
      <button
        onClick={balance}
        className="p-4 bg-black text-white font-bold py-2 px-12 rounded w-full mt-4"
      >
        {bal == 0 ? <p>Show balance of owner</p> : <p>Hide balance of owner</p>}
      </button>
      <p>{bal !== 0 ? bal : <br />}</p>
    </div>
  );
}
