import { injected } from "../injectedProvider";
import { useState } from "react";

export default function ConnectButton(props) {
  const [buttontext, setButtontext] = useState("Connect to MetaMask");
  async function connect() {
    try {
      await props.activate(injected);
      // Fix account render bug, have to click it a few times to update
      let acc = props.account;
      setButtontext(
        acc.substring(0, 5) + "..." + acc.substring(acc.length - 5, acc.length)
      );
    } catch (ex) {
      console.log(ex);
    }
  }

  return (
    <button
      className="bg-blue-900 px-4 py-2 rounded-md text-gray-200 "
      onClick={connect}
    >
      <p className="text-lg">{buttontext}</p>
    </button>
  );
}
