import Link from "next/link";
import { useEffect, useState } from "react";
import { useAccount, useConnect } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";

import { abi } from "../../utils/abi/WHVendor.json";

export default function MyEnergy() {
  const { address, isConnected } = useAccount();
  const [serialId, setSerialId] = useState("");
  const [userRegistered, setUserRegistered] = useState(false);
  const [hasAddress, setHasAddress] = useState(false);

  const {
    data: userData,
    isError: userIsError,
    isLoading: userIsLoading,
    isSuccess: userIsSuccess,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: "getUserFromAddress",
    args: [address],
    watch: true,
  });

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: "addUser",
    args: [address, serialId],
  });

  const {
    data: addUserData,
    isLoading: addUserIsLoading,
    isSuccess: addUserIsSuccess,
    write: addUserWrite,
  } = useContractWrite(config);

  useEffect(() => {
    setUserRegistered((userIsSuccess && userData && userData[1]) || false);
  }, [userData]);
  useEffect(() => {
    setHasAddress(!!address || false);
  }, [address]);

  return (
    <div className="pt-4">
      <div className="flex mb-6 inline justify-center items-center">
        <div
          className={`w-[20px] h-[20px] rounded-full border-4 border-slate-300 z-20 ${
            hasAddress ? "!border-sparkGreen bg-sparkGreen" : ""
          }`}
        ></div>
        <div
          className={`w-12 h-1 bg-slate-300 -mx-1 z-10 ${
            hasAddress && !userRegistered
              ? "bg-gradient-to-r from-sparkGreen to-slate-300"
              : ""
          } ${hasAddress && userRegistered ? "!bg-sparkGreen" : ""}`}
        ></div>
        <div
          className={`w-[20px] h-[20px] rounded-full border-4 border-slate-300 z-20 ${
            userRegistered ? "!border-sparkGreen bg-sparkGreen" : ""
          }`}
        ></div>

        <div
          className={`w-12 h-1 bg-slate-300 -mx-1 z-10 ${
            userRegistered
              ? "bg-gradient-to-r from-sparkGreen to-slate-300"
              : ""
          }`}
        ></div>
        <div className="w-[20px] h-[20px] rounded-full border-4 border-slate-300 z-20"></div>
      </div>
      <section className="mb-4 grid grid-cols-6 gap-2">
        <p className="text-sparkGreen text-[32px] font-bold col-span-1 text-center w-full">
          1
        </p>
        <div className="col-span-5">
          <p>Connect your Polygon wallet 👛 to start using Spark</p>
        </div>
        <p className="col-span-6 text-center">
          {/* <button
            onClick={() => connect()}
            className={`inline cursor-pointer rounded-full border-2 text-white border-sparkGreen bg-sparkGreen px-4 py-1`}
          >
            Connect Wallet
          </button> */}
        </p>
      </section>
      <section className="mb-4 grid grid-cols-6 gap-2">
        <p className="text-sparkGreen text-[32px] font-bold col-span-1 text-center w-full">
          2
        </p>
        <div className="col-span-5 mb-2">
          <p className="mb-2">
            Almost there! Register your electricity meter serial number
          </p>
          <div className="">
            {!userRegistered && (
              <div className="w-60 shadow-md shadow-sparkGreen/30 border-2 border-sparkGreen rounded-full px-2 flex">
                <label htmlFor="id" className="mr-2">
                  Serial_ID:
                </label>
                <input
                  required
                  type="text"
                  id="id"
                  className="w-full border-0 bg-transparent appearance-none"
                  onChange={(e) => setSerialId(e.target.value)}
                ></input>
              </div>
            )}
            {userRegistered && (
              <p className="text-sparkGreen font-medium">
                Your serial number is{" "}
                <span className="font-semibold underline">{userData[1]}</span>
              </p>
            )}
          </div>
        </div>
        {!userRegistered && (
          <p className="col-span-6 text-center">
            <button
              disabled={!serialId}
              onClick={() => {
                addUserWrite();
              }}
              className={`inline cursor-pointer rounded-full border-2 text-white border-sparkGreen bg-sparkGreen px-4 py-1`}
            >
              Submit
            </button>
          </p>
        )}
      </section>
      <section className="mb-6 grid grid-cols-6 gap-2">
        <p className="text-sparkGreen text-[32px] font-bold col-span-1 text-center w-full">
          3
        </p>
        <div className="col-span-5">
          <p>Finally, select you energy consumption preferences ⚡️</p>
        </div>
      </section>
      <p className="text-center">
        <Link href="/my-energy">
          <span
            className={`inline cursor-pointer rounded-full border-2 text-sparkGreen border-sparkGreen bg-white px-2 py-1`}
          >
            Take me there →
          </span>
        </Link>
      </p>
    </div>
  );
}
