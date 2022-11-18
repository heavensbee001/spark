import { useEffect, useState, useMemo } from "react";

import {
  useContractRead,
  usePrepareContractWrite,
  useContractWrite,
} from "wagmi";
import { useAccount, useConnect } from "wagmi";
import Modal from "../../components/Modal";

import { abi } from "../../utils/abi/WHVendor.json";

export default function MyEnergy() {
  const { address, isConnected } = useAccount();
  const [sources, setSources] = useState([]);
  const [preferences, setPreferences] = useState([]);
  const [sourcesPercentage, setSourcesPercentage] = useState({});
  const [selectedButton, setSelectedButton] = useState(null);
  const [openModal, setOpenModal] = useState(null);

  const getAllSources = async () => {
    const res = await fetch(
      "https://gateway.pinata.cloud/ipfs/QmdasBi77QnUy4wRG1cMDwfPvKAfAkLbedgJXgsSbq8rrt"
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
  //     _sourcesPercentageObj[source.sourceID] = 0;
  //   });
  //   debugger;
  //   setSourcesPercentage(_sourcesPercentageObj);
  // }, [sources]);

  useEffect(() => {
    if (preferencesData) {
      const _sourcesPercentageObj = {};
      sources.forEach((source, index) => {
        _sourcesPercentageObj[source.sourceID] = Number(
          preferencesData[index]?.percentage || 0
        );
        // _sourcesPercentageObj[source.sourceID] = preferences[index];
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
    return (val +=
      (source["currentPricekWh"] * sourcesPercentage[source.sourceID]) / 100);
  }, 0);

  const totalCO2 = sources.reduce((val, source) => {
    return (val +=
      (source["currentEmissioncm3CO2"] * sourcesPercentage[source.sourceID]) /
      100);
  }, 0);

  const totalPercentageSelected = sources.reduce((val, source) => {
    return (val += sourcesPercentage[source.sourceID]);
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
              <label
                htmlFor={"source-" + source.type}
                className="col-span-1 flex items-center justify-center"
                onClick={() => setOpenModal(index)}
              >
                {source.displayName.slice(0, 2)}
              </label>
              <label
                htmlFor={"source-" + source.type}
                className="col-span-3 flex items-center whitespace-nowrap"
                onClick={() => setOpenModal(index)}
              >
                {source.displayName.slice(2)}
              </label>
              <input
                className="col-span-6 flex items-center"
                type="range"
                id={"source-" + source.type}
                name="volume"
                min="0"
                max="100"
                step={10}
                value={sourcesPercentage[source.sourceID]}
                onChange={(e) => {
                  const totalPercentage = sources.reduce((val, _source) => {
                    return (val +=
                      source.sourceID !== _source.sourceID
                        ? sourcesPercentage[_source.sourceID]
                        : 0);
                  }, 0);

                  const val =
                    totalPercentage + Number(e.target.value) >= 100
                      ? 100 - totalPercentage
                      : Number(e.target.value);
                  setSourcesPercentage({
                    ...sourcesPercentage,
                    [source.sourceID]: val,
                  });
                  const _newPreferences = preferences;
                  _newPreferences[index] = [index, val];
                  setPreferences(_newPreferences);
                  setSelectedButton(null);
                }}
              />
              <span className="col-span-1 flex items-center">
                {sourcesPercentage[source.sourceID]}%
              </span>
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
            _array = _array.sort(
              (a, b) => a["currentEmissioncm3CO2"] - b["currentEmissioncm3CO2"]
            );
            const selected = _array[0];
            const newPercentage = {};
            const _newPreferences = preferences;
            sources.forEach((source, index) => {
              newPercentage[source.sourceID] =
                selected.sourceID === source.sourceID ? 100 : 0;
              _newPreferences[index] = [
                index,
                selected.sourceID === source.sourceID ? 100 : 0,
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
            _array = _array.sort(
              (a, b) => a["currentPricekWh"] - b["currentPricekWh"]
            );
            const selected = _array[0];
            const newPercentage = {};
            const _newPreferences = preferences;
            sources.forEach((source, index) => {
              newPercentage[source.sourceID] =
                selected.sourceID === source.sourceID ? 100 : 0;
              _newPreferences[index] = [
                index,
                selected.sourceID === source.sourceID ? 100 : 0,
              ];
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
      {openModal !== null && (
        <Modal
          source={sources[openModal]}
          onClose={() => {
            setOpenModal(null);
          }}
        />
      )}
    </div>
  );
}
