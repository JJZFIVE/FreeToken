import { ethers } from "ethers";

import { freeTokenAddressRinkeby } from "../../.config";
import FreeTokenABI from "../../artifacts/contracts/FreeToken.sol/FreeToken.json";

export default function GiveTokensButton(props) {
  const giveTokens = async () => {
    const library = props.library;
    try {
      const signer = library.getSigner();
      const freeToken = new ethers.Contract(
        freeTokenAddressRinkeby,
        FreeTokenABI.abi,
        signer
      );

      const tx = await freeToken.giveTokens();
      console.log(tx);
    } catch (ex) {
      console.log(ex);
    }
  };

  return (
    <button
      onClick={giveTokens}
      className="p-4 bg-pink-500 text-white font-bold py-2 px-12 rounded w-full mt-4"
    >
      Give Me Tokens
    </button>
  );
}
