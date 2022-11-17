import Link from "next/link";

export default function BurgerMenu({ className, children }) {
  return (
    <>
      <link
        rel="stylesheet"
        href="//maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
      />

      <nav className="menu">
        <input
          type="checkbox"
          className="menu-open"
          name="menu-open"
          id="menu-open"
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
        <a className="menu-item text-[40px] drop-shadow-md drop-shadow-black/50">
          <Link href={"/energy-history"}>📈</Link>
        </a>
        <span className="menu-item text-[40px] drop-shadow-md drop-shadow-black/50">
          <Link href={"/my-energy"}>⚡️</Link>
        </span>
        <span className="menu-item text-[40px] drop-shadow-md drop-shadow-black/50">
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
