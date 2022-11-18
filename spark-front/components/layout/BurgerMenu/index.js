import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

export default function BurgerMenu({ className, children }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  return (
    <>
      {open && (
        <label
          className="z-40 fixed w-screen h-screen left-0 top-0"
          htmlFor="menu-open"
        ></label>
      )}
      <nav className="menu z-50">
        <input
          type="checkbox"
          className="menu-open"
          name="menu-open"
          id="menu-open"
          onChange={(e) => {
            setOpen(e.target.checked);
          }}
        />
        <label className="menu-open-button" htmlFor="menu-open">
          <span className="hamburger hamburger-1"></span>
          <span className="hamburger hamburger-2"></span>
          <span className="hamburger hamburger-3"></span>
        </label>

        {/* <a
          className="menu-item text-[40px] drop-shadow-md drop-shadow-black/50"
        >
          👛
        </a> */}
        <span
          className={`menu-item text-[40px] drop-shadow-md drop-shadow-black/50 ${
            router.pathname === "/energy-history" ? "!bg-lime-300" : ""
          }`}
        >
          <Link href={"/energy-history"}>📈</Link>
        </span>
        <span
          className={`menu-item text-[40px] drop-shadow-md drop-shadow-black/50 ${
            router.pathname === "/my-energy" ? "!bg-lime-300" : ""
          }`}
        >
          <Link href={"/my-energy"}>⚡️</Link>
        </span>
        <span
          className={`menu-item text-[40px] drop-shadow-md drop-shadow-black/50 ${
            router.pathname === "/my-profile" ? "!bg-lime-300" : ""
          }`}
        >
          <Link href={"/my-profile"}>🙋</Link>
        </span>
      </nav>
      <svg xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="shadowed-goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            {/* <feGaussianBlur in="goo" stdDeviation="3" result="shadow" /> */}
            {/* <feColorMatrix
              in="shadow"
              mode="matrix"
              values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 1 -0.2"
              result="shadow"
            />
            <feOffset in="shadow" dx="1" dy="1" result="shadow" />
            <feComposite in2="shadow" in="goo" result="goo" /> */}
            <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
          <filter id="goo">
            <feGaussianBlur
              in="SourceGraphic"
              result="blur"
              stdDeviation="10"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="goo"
            />
            <feComposite in2="goo" in="SourceGraphic" result="mix" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
