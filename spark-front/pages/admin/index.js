import axios from "axios";
import { useEffect, useState } from "react";
import SourcesList from "../../components/SourcesList";

export default function Home() {
  // const sources = [
  //   {
  //     _id: "0",
  //     type: "solar",
  //     displayName: "☀️ solar",
  //     "$/kWh": 10.2,
  //     "cm3CO2/h": 0.2,
  //   },
  //   {
  //     _id: "1",
  //     type: "Eolic",
  //     displayName: "🍃 Eolic",
  //     "$/kWh": 9.2,
  //     "cm3CO2/h": 0.5,
  //   },
  //   {
  //     _id: "2",
  //     type: "Nuclear",
  //     displayName: "⚛ Nuclear",
  //     "$/kWh": 4.8,
  //     "cm3CO2/h": 0.6,
  //   },
  //   {
  //     _id: "3",
  //     type: "Gas",
  //     displayName: "🔥 Gas",
  //     "$/kWh": 3.2,
  //     "cm3CO2/h": 4.6,
  //   },
  // ];

  const [sources, setSources] = useState([]);

  const addSource = async (data) => {
    try {
      await fetch("http://localhost:8888/.netlify/functions/addsource", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
    } catch (err) {
      console.log(err);
    }

    getAllSources();
  };

  const getAllSources = async () => {
    const res = await fetch(
      "http://localhost:8888/.netlify/functions/findallsources"
    );

    const data = await res.json();

    setSources(data || []);
  };

  useEffect(() => {
    getAllSources();
  }, []);

  const handleAddSource = (e) => {
    const value = {
      sourceID: e.target[0].value,
      displayName: e.target[2].value,
      type: e.target[1].value,
      "kWh/h": Number(e.target[3].value),
      "$/kWh": Number(e.target[4].value),
      "cm3CO2/h": Number(e.target[5].value),
    };

    addSource(value);
  };

  return (
    <div>
      <SourcesList sources={sources} />
      <h2 className="mb-2">Add power source</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleAddSource(e);
        }}
      >
        <div className="mb-2">
          <div className="w-52 shadow-md shadow-sparkGreen/30 border-2 border-sparkGreen rounded-full px-2 flex">
            <label htmlFor="SourceID" className="mr-2">
              ID:
            </label>
            <input
              type="text"
              id="SourceID"
              className="w-full border-0 bg-transparent appearance-none"
            ></input>
          </div>
        </div>
        <div className="mb-2">
          <div className="w-52 shadow-md shadow-sparkGreen/30 border-2 border-sparkGreen rounded-full px-2 flex">
            <label htmlFor="SourceName" className="mr-2">
              Name:
            </label>
            <input
              type="text"
              id="SourceName"
              className="w-full border-0 bg-transparent appearance-none"
            ></input>
          </div>
        </div>
        <div className="mb-2">
          <div className="w-52 shadow-md shadow-sparkGreen/30 border-2 border-sparkGreen rounded-full px-2 flex">
            <label htmlFor="SourceType" className="mr-2">
              Type:
            </label>
            <input
              type="text"
              id="SourceType"
              className="w-full border-0 bg-transparent appearance-none"
            ></input>
          </div>
        </div>
        <div className="mb-4">
          <div className="w-52 shadow-md shadow-sparkGreen/30 border-2 border-sparkGreen rounded-full px-2 flex">
            <label htmlFor="SourcekWh" className="mr-2">
              kWh/h:
            </label>
            <input
              type="number"
              step="0.01"
              id="SourcekWh"
              className="w-full border-0 bg-transparent appearance-none"
            ></input>
          </div>
        </div>
        <div className="mb-4">
          <div className="w-52 shadow-md shadow-sparkGreen/30 border-2 border-sparkGreen rounded-full px-2 flex">
            <label htmlFor="SourcePricekWh" className="mr-2">
              $/kWh:
            </label>
            <input
              type="number"
              step="0.01"
              id="SourcePricekWh"
              className="w-full border-0 bg-transparent appearance-none"
            ></input>
          </div>
        </div>
        <div className="mb-4">
          <div className="w-52 shadow-md shadow-sparkGreen/30 border-2 border-sparkGreen rounded-full px-2 flex">
            <label htmlFor="Sourcecm3CO2" className="mr-2">
              cm3CO2/h:
            </label>
            <input
              type="number"
              step="0.01"
              id="Sourcecm3CO2"
              className="w-full border-0 bg-transparent appearance-none"
            ></input>
          </div>
        </div>
        <button
          className="bg-sparkGreen text-white px-4 py-px pb-1 rounded-full"
          type="submit"
        >
          submit
        </button>
      </form>
    </div>
  );
}
