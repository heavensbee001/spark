export default function SourcesList({ sources }) {
  return (
    <section className="mb-8">
      <div className="grid grid-cols-12 gap-2 font-medium py-1 px-2 -mx-2">
        <span className="col-span-3">Name</span>
        <span className="col-span-3">Type</span>
        <span className="col-span-2 text-end">$/kWh</span>
        <span className="col-span-3 text-end">cm3CO2/h</span>
      </div>
      {sources.map((source, index) => (
        <div
          key={index}
          className="grid grid-cols-12 gap-2 even:bg-lime-200 py-1 px-2 -mx-2"
        >
          <span className="col-span-3">{source.displayName}</span>
          <span className="col-span-3">{source.type}</span>
          <span className="col-span-2 text-end">${source["$/kWh"]}</span>
          <span className="col-span-3 text-end">{source["cm3CO2/h"]}</span>
          <span className="col-span-1 text-end">✏️</span>
        </div>
      ))}
    </section>
  );
}
