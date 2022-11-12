export default function Hero({ className, children }) {
  return (
    <section
      className={`relative bg-sparkGreen w-full h-32 text-white pt-12 pb-4 flex items-center px-2 ${className}`}
    >
      <div>{children}</div>

      <div className="absolute -bottom-px left-0 pt-4 w-full">
        <svg width="100%" height="20px" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <mask id="myMask">
              <rect width="100%" height="100%" fill="white"></rect>
              <ellipse
                cx="50%"
                cy="-2px"
                rx="50%"
                ry="100%"
                fill="black"
              ></ellipse>
            </mask>
          </defs>
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="white"
            mask="url(#myMask)"
          ></rect>
        </svg>
      </div>
    </section>
  );
}
