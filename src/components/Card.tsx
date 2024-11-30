import { RefreshCcw, ShieldIcon } from "lucide-react";
import { useState, useEffect } from "react";

const Card = () => {
  const [password, setPassword] = useState<string>("");
  const [length, setLength] = useState<number>(4);
  const [pwStrength, setStrength] = useState<string>("Weak");
  const [params, setParams] = useState<parameters>({
    passwordLength: length,
    numbers: true,
    symbols: false,
    lowercase: true,
    uppercase: true,
  });

  
  
  type parameters = {
    passwordLength: number;
    numbers: boolean;
    symbols: boolean;
    lowercase: boolean;
    uppercase: boolean;
  };

  useEffect(() => {
    generatePassword(params);
  }, [params]);

  useEffect(() => {
    generatePassword(params);
  }, []);

  const handleCopy = (password: string) => {
    if (!password) return;
    navigator.clipboard.writeText(password);
    window.alert("Copied to clipboard");
  };

  
  const generatePassword = ({
    passwordLength,
    numbers,
    symbols,
    lowercase,
    uppercase,
  }: parameters) => {
    let charset = "";
    if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (numbers) charset += "0123456789";
    if (symbols) charset += "!@#$%^&*()_+";

    if (charset.length === 0) {
      return;
    }

    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset.charAt(randomIndex);
    }

    setPassword(password);
    const passwordStrength = checkStrength(password);
    setStrength(passwordStrength);
  };

  const checkStrength = (password: string) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[^A-Za-z0-9]/.test(password);
  
    if (password.length < 5) {
      return "Very Weak";
    } else if (password.length < 8 || !hasUppercase || !hasLowercase) {
      return "Weak";
    } else if (password.length < 10 || !hasNumber) {
      return "Fairly Strong";
    } else if (password.length < 12 || !hasSpecialChar) {
      return "Strong";
    } else {
      return "Very Strong";
    }
  };
  
  return (
    <div className="w-[400px] flex flex-col bg-slate-950 shadow-xl rounded-2xl justify-center text-white p-6">
      <div className="flex justify-between items-center">
        <input
          type="text"
          readOnly
          name="generatePassword"
          value={password}
          className="outline-none focus:border-none bg-slate-700 rounded-2xl w-full p-2 text-gray"
        />
        <button className="m-2" onClick={() => generatePassword(params)}>
          <RefreshCcw color="white" size={24} />
        </button>
      </div>
      <div className="flex flex-col m-4 gap-6 justify-center sm:flex-row text-nowrap ">
        <div className="flex items-center">
          <ShieldIcon color="white" size={24} className="mr-2" />
          {pwStrength} Password
        </div>
        <button
          className="bg-slate-700 p-2 rounded-2xl"
          onClick={() => handleCopy(password)}
        >
          Copy Password
        </button>
      </div>
      <div className="justify-evenly">
        <label htmlFor="range">Length: {length}</label>
        <input
          type="range"
          min={4}
          max={40}
          value={length}
          onChange={(e) => {
            const newLength = e.target.valueAsNumber;
            setLength(newLength);
            setParams((params) => ({
              ...params,
              passwordLength: newLength,
            }));
          }}
          className="w-full"
        />
      </div>
      <div className="grid grid-cols-2 grid-rows-2">
        <div className="flex items-center gap-2 justify-center">
          <label htmlFor="numbers">Numbers</label>
          <input
          checked={params["numbers"]}
            type="checkbox"
            name="numbers"
            id="numbers"
            onChange={(e) =>
              setParams({ ...params, numbers: e.target.checked })
            }
          />
        </div>
        <div className="flex items-center gap-2 justify-center">
          <label htmlFor="symbols">Symbols</label>
          <input
          checked={params["symbols"]}
            type="checkbox"
            name="symbols"
            id="symbols"
            onChange={(e) =>
              setParams({ ...params, symbols: e.target.checked })
            }
          />
        </div>
        <div className="flex items-center gap-2 justify-center">
          <label htmlFor="lowercase">Lowercase</label>
          <input
          checked={params["lowercase"]}
            type="checkbox"
            name="lowercase"
            id="lowercase"
            onChange={(e) =>
              setParams({ ...params, lowercase: e.target.checked })
            }
          />
        </div>
        <div className="flex items-center gap-2 justify-center">
          <label htmlFor="uppercase">Uppercase</label>
          <input
            checked={params["uppercase"]}
            type="checkbox"
            name="uppercase"
            id="uppercase"
            onChange={(e) =>
              setParams({ ...params, uppercase: e.target.checked })
            } 
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
