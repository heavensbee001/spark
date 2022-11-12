export default function Home() {
  return (
    <div>
      <h2 className="mb-2">Add power source</h2>
      <form>
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
            <label htmlFor="SourcekWh" className="mr-2">
              kWh/h:
            </label>
            <input
              type="text"
              id="SourcekWh"
              className="w-full border-0 bg-transparent appearance-none"
            ></input>
          </div>
        </div>
        <button className="bg-sparkGreen text-white px-4 py-px pb-1 rounded-full">
          submit
        </button>
      </form>
    </div>
  );
}
