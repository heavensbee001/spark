import { useEffect, useState, useMemo } from "react";

import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { useAccount, useConnect } from "wagmi";

import { abi } from "../../utils/abi/WHVendor.json";

export default function MyEnergy() {
  const [sources, setSources] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [sourcesPercentage, setSourcesPercentage] = useState({});
  const [selectedButton, setSelectedButton] = useState(null);
  const { address, isConnected } = useAccount();

  const getAllSources = async () => {
    const res = await fetch(
      "http://localhost:8888/.netlify/functions/findallsources"
    );

    const data = await res.json();

    setSources(data || []);
  };

  const {
    data: preferencesData,
    isError: preferencesIsError,
    isLoading: preferencesIsLoading,
    isSuccess: preferencesIsSuccess,
  } = useContractRead({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: "getUserPreferences",
    args: [address],
    watch: true,
  });

  const { config } = usePrepareContractWrite({
    address: process.env.NEXT_PUBLIC_CONTRACT_ADDRESS,
    abi: abi,
    functionName: "newUserPreferences",
    args: [address, preferences],
  });

  const {
    data: setUserPreferencesData,
    isLoading: setUserPreferencesIsLoading,
    isSuccess: setUserPreferencesIsSuccess,
    write: setUserPreferencesWrite,
  } = useContractWrite(config);

  useEffect(() => {
    getAllSources();
  }, []);

  // useEffect(() => {
  //   const _sourcesPercentageObj = {};
  //   sources.forEach((source, index) => {
  //     _sourcesPercentageObj[source.id] = 0;
  //   });
  //   debugger;
  //   setSourcesPercentage(_sourcesPercentageObj);
  // }, [sources]);

  useEffect(() => {
    if (preferencesData) {
      const _sourcesPercentageObj = {};
      sources.forEach((source, index) => {
        _sourcesPercentageObj[source.id] = Number(
          preferencesData[index]?.percentage || 0
        );
        // _sourcesPercentageObj[source.id] = preferences[index];
      });
      setSourcesPercentage(_sourcesPercentageObj);
      setPreferences(
        preferencesData.map((item, index) => [
          index,
          Number(item?.percentage || 0),
        ])
      );
    }
  }, [preferencesData, sources]);

  const totalPrice = sources.reduce((val, source) => {
    return (val += (source["$/kWh"] * sourcesPercentage[source.id]) / 100);
  }, 0);

  const totalCO2 = sources.reduce((val, source) => {
    return (val += (source["cm3CO2/h"] * sourcesPercentage[source.id]) / 100);
  }, 0);

  const totalPercentageSelected = sources.reduce((val, source) => {
    return (val += sourcesPercentage[source.id]);
  }, 0);

  const handleSubmit = () => {
    setUserPreferencesWrite();
  };

  return (
    <div className="pt-4">
      {/* {JSON.stringify(preferences)} */}
      <section className="mb-4">
        <p className="mb-4">Select the energy sources you want to consume</p>
        {sources
          .sort((a, b) => a["sourceID"] - b["sourceID"])
          .map((source, index) => (
            <div key={index} className="grid grid-cols-12 gap-2 mb-2">
              <label htmlFor={"source-" + source.type} className="col-span-3">
                {source.displayName}
              </label>
              <input
                className="col-span-7"
                type="range"
                id={"source-" + source.type}
                name="volume"
                min="0"
                max="100"
                step={10}
                value={sourcesPercentage[source.id]}
                onChange={(e) => {
                  const totalPercentage = sources.reduce((val, _source) => {
                    return (val +=
                      source.id !== _source.id
                        ? sourcesPercentage[_source.id]
                        : 0);
                  }, 0);

                  const val =
                    totalPercentage + Number(e.target.value) >= 100
                      ? 100 - totalPercentage
                      : Number(e.target.value);
                  setSourcesPercentage({
                    ...sourcesPercentage,
                    [source.id]: val,
                  });
                  const _newPreferences = preferences;
                  _newPreferences[index] = [index, val];
                  setPreferences(_newPreferences);
                  setSelectedButton(null);
                }}
              />
              <span>{sourcesPercentage[source.id]}%</span>
            </div>
          ))}
      </section>
      {totalPercentageSelected !== 100 && (
        <p className="text-sm text-red-400 mb-2 -mt-1">
          The sum of all percentages should be 100%
        </p>
      )}
      <section className="flex items-center mb-4">
        <h2 className="mr-4">Quick selection:</h2>
        <button
          onClick={() => {
            let _array = [...sources];
            _array = _array.sort((a, b) => a["cm3CO2/h"] - b["cm3CO2/h"]);
            const selected = _array[0];
            const newPercentage = {};
            const _newPreferences = preferences;
            sources.forEach((source, index) => {
              newPercentage[source.id] = selected.id === source.id ? 100 : 0;
              _newPreferences[index] = [
                index,
                selected.id === source.id ? 100 : 0,
              ];
            });

            setSourcesPercentage(newPercentage);
            setPreferences(_newPreferences);
            setSelectedButton("green");
          }}
          className={`cursor-pointer rounded-full border-4 border-sparkGreen w-12 h-12 flex items-center justify-center text-2xl mr-3 ${
            selectedButton === "green" ? "bg-lime-200" : ""
          }`}
        >
          🌱
        </button>
        <button
          onClick={() => {
            let _array = [...sources];
            _array = _array.sort((a, b) => a["$/kWh"] - b["$/kWh"]);
            const selected = _array[0];
            const newPercentage = {};
            const _newPreferences = preferences;
            sources.forEach((source, index) => {
              newPercentage[source.id] = selected.id === source.id ? 100 : 0;
              _newPreferences[index] = [
                index,
                selected.id === source.id ? 100 : 0,
              ];
              debugger;
            });
            setSourcesPercentage(newPercentage);
            setPreferences(_newPreferences);
            setSelectedButton("cheap");
          }}
          className={`cursor-pointer rounded-full border-4 border-sparkGreen w-12 h-12 flex items-center justify-center text-2xl mr-3 ${
            selectedButton === "cheap" ? "bg-lime-200" : ""
          }`}
        >
          💰
        </button>
      </section>
      <section className="mb-4">
        <h2>Your hourly energy price is:</h2>
        <p className="text-[48px] text-sparkGreen text-center">
          {Math.floor(totalPrice * 100) / 100} $/kWh
        </p>{" "}
        <p className="text-slate-400 text-center">
          generating{" "}
          <b>{Math.floor(totalCO2 * 100) / 100} cm3 of CO2 per hour</b>
        </p>
      </section>
      <p className="text-center">
        <button
          disabled={totalPercentageSelected !== 100}
          onClick={handleSubmit}
          className={`inline cursor-pointer rounded-full border-2 text-white border-sparkGreen bg-sparkGreen px-4 py-1`}
        >
          Submit Preferences
        </button>
      </p>
    </div>
  );
}
