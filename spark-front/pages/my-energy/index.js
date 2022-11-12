import { useEffect, useState } from "react";

const sources = [
  {
    _id: "0",
    type: "solar",
    displayName: "☀️ solar",
    "$/kWh": 10.2,
    "cm3CO2/h": 0.2,
    percent: 0,
  },
  {
    _id: "1",
    type: "Eolic",
    displayName: "🍃 Eolic",
    "$/kWh": 9.2,
    "cm3CO2/h": 0.5,
    percent: 0,
  },
  {
    _id: "2",
    type: "Nuclear",
    displayName: "⚛ Nuclear",
    "$/kWh": 4.8,
    "cm3CO2/h": 0.6,
    percent: 0,
  },
  {
    _id: "3",
    type: "Gas",
    displayName: "🔥 Gas",
    "$/kWh": 3.2,
    "cm3CO2/h": 4.6,
    percent: 0,
  },
];

export default function MyEnergy() {
  const [sourcesPercentage, setSourcesPercentage] = useState({});
  const [selectedButton, setSelectedButton] = useState(null);

  useEffect(() => {
    const _sourcesPercentageObj = {};
    sources.forEach((source, index) => {
      _sourcesPercentageObj[source._id] = 0;
    });
    setSourcesPercentage(_sourcesPercentageObj);
  }, []);

  const totalPrice = sources.reduce((price, source) => {
    return (price += (source["$/kWh"] * sourcesPercentage[source._id]) / 100);
  }, 0);

  const totalCO2 = sources.reduce((price, source) => {
    return (price +=
      (source["cm3CO2/h"] * sourcesPercentage[source._id]) / 100);
  }, 0);

  return (
    <div className="pt-4">
      <section className="mb-4">
        <p className="mb-4">Select the energy sources you want to consume</p>
        {sources
          .sort((a, b) => a["cm3CO2/h"] - b["cm3CO2/h"])
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
                value={sourcesPercentage[source._id]}
                onChange={(e) => {
                  setSourcesPercentage({
                    ...sourcesPercentage,
                    [source._id]: Number(e.target.value),
                  });
                  setSelectedButton(null);
                }}
              />
              <span>{sourcesPercentage[source._id]}%</span>
            </div>
          ))}
      </section>
      <section className="flex items-center mb-4">
        <h2 className="mr-4">Quick selection:</h2>
        <button
          onClick={() => {
            const selected = sources.sort(
              (a, b) => a["cm3CO2/h"] - b["cm3CO2/h"]
            )[0];
            const newPercentage = {};
            sources.forEach((source) => {
              newPercentage[source._id] = selected._id === source._id ? 100 : 0;
            });
            setSourcesPercentage(newPercentage);
            setSelectedButton("green");
          }}
          className={`cursor-pointer rounded-full border-4 border-sparkGreen w-12 h-12 flex items-center justify-center text-2xl mr-3 ${
            selectedButton === "green" ? "bg-sparkGreen" : ""
          }`}
        >
          🌱
        </button>
        <button
          onClick={() => {
            const selected = sources.sort((a, b) => a["$/kWh"] - b["$/kWh"])[0];
            const newPercentage = {};
            sources.forEach((source) => {
              newPercentage[source._id] = selected._id === source._id ? 100 : 0;
            });
            setSourcesPercentage(newPercentage);
            setSelectedButton("cheap");
          }}
          className={`cursor-pointer rounded-full border-4 border-sparkGreen w-12 h-12 flex items-center justify-center text-2xl mr-3 ${
            selectedButton === "cheap" ? "bg-sparkGreen" : ""
          }`}
        >
          💰
        </button>
      </section>
      <section>
        <h2>Your hourly energy price is:</h2>
        <p className="text-[48px] text-sparkGreen text-center">
          {Math.floor(totalPrice * 100) / 100} $/kWh
        </p>{" "}
        <p className="text-slate-400 text-center">
          generating{" "}
          <b>{Math.floor(totalCO2 * 100) / 100} cm3 of CO2 per hour</b>
        </p>
      </section>
    </div>
  );
}
