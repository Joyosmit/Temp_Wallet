import React from "react";
import { Button } from "./ui/button";
import { generateMnemonic } from "bip39";
import useMnemonicStore from "@/lib/mnemonicStore";


const MnemonicView = () => {
    
    const {mnemonic, setMnemonic} = useMnemonicStore();
  const mnemonicArray = mnemonic.split(" ");

  const getMnemonic = async () => {
    const mnemonic = generateMnemonic(); // generate mnemonic
    setMnemonic(mnemonic);
  };
  return (
    <div className="w-[40%] h-[50%] bg-blue-700 flex flex-col justify-center gap-y-5 items-center">
      <Button onClick={getMnemonic}>Create mnemonic</Button>
      {mnemonic && <div className=" grid grid-rows-4 grid-cols-3 gap-4 w-[75%] bg-red-600 h-[65%] rounded-md">
        {mnemonicArray.map((word, index) => {
          return (
            <div key={index} className="bg-green-500 flex items-center rounded-md justify-center">
              {word}
            </div>
          );
        })}
      </div>}
      <Button onClick={() => setMnemonic("")}>I have stored my Secret Phrase securely</Button>
    </div>
  );
};

export default MnemonicView;
