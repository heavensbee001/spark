import Image from "next/image";

export default function Modal({ source, onClose }) {
  return (
    <section className="z-50 fixed w-full px-2 left-0 top-[28%]">
      <div className="relative w-full bg-white rounded-xl px-4 py-2 shadow-black/30 shadow-lg">
        <div
          className="text-[34px] absolute top-2 right-2 rotate-45 text-slate-400"
          onClick={onClose}
        >
          +
        </div>
        {source && (
          <>
            <h2 className="text-[34px] mb-2">
              <span className="mr-4">{source?.displayName}</span>
              <span className="text-sparkGreen text-[20px]">
                {source.currentPricekWh}$/kWh
              </span>
            </h2>
            <section className="mb-4">
              <div className="grid grid-cols-12 gap-2 font-medium py-1 px-2 -mx-2">
                <span className="col-span-3">Year</span>
                <span className="col-span-3">GWh</span>
                <span className="col-span-2 text-end">$/kWh</span>
                <span className="col-span-4 text-end">m3CO2</span>
              </div>
              {source.productionHistory.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-12 gap-2 even:bg-lime-200 py-1 px-2 -mx-2"
                >
                  <span className="col-span-3 font-medium">{item.year}</span>
                  <span className="col-span-3">{item.Wh / 1000000000}</span>
                  <span className="col-span-2 text-end">
                    ${item.averagePrice}
                  </span>
                  <span className="col-span-4 text-end">
                    {item.averagecm3CO2 / 1000}
                  </span>
                </div>
              ))}
            </section>
            <p className="text-slate-400">
              <Image
                src={"/ipfs-logo.svg"}
                width={60}
                height={60}
                className="-mr-6 inline"
              />
              all sources data is stored on IPFS
            </p>
          </>
        )}
      </div>
    </section>
  );
}
