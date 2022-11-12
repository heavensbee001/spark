import Link from "next/link";
import { useEffect, useState } from "react";

export default function MyEnergy() {
  return (
    <div className="pt-4">
      <section className="mb-4 grid grid-cols-6 gap-2">
        <p className="text-sparkGreen text-[32px] font-bold col-span-1 text-center w-full">
          1
        </p>
        <div className="col-span-5">
          <p>
            Please, connect your Polygon wallet 👛 to start using Spark protocol
          </p>
        </div>
      </section>
      <section className="mb-4 grid grid-cols-6 gap-2">
        <p className="text-sparkGreen text-[32px] font-bold col-span-1 text-center w-full">
          2
        </p>
        <div className="col-span-5">
          <p>Almost there! Register your electricity meter serial number</p>
        </div>
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
