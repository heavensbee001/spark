import BurgerMenu from "./BurgerMenu";
import Hero from "./Hero";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen">
      <header className="z-30 fixed top-0 left-0 w-screen h-10 pt-1">
        <div className=" flex items-center">
          <svg
            className="h-8 fill-sparkGreen drop-shadow-lg"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 415 415"
            xmlSpace="preserve"
          >
            <g>
              <g>
                <path d="M325.662,3.768C324.325,1.437,321.844,0,319.157,0H164.555c-3.218,0-6.078,2.053-7.107,5.102L91.19,201.421    c-0.772,2.289-0.394,4.81,1.014,6.772c1.409,1.962,3.677,3.126,6.093,3.126h62.812L88.817,404.876    c-1.278,3.422,0.096,7.268,3.254,9.106c1.18,0.686,2.48,1.018,3.769,1.018c2.16,0,4.287-0.932,5.756-2.687l201.228-240.49    c1.869-2.234,2.276-5.348,1.043-7.987c-1.232-2.639-3.882-4.326-6.795-4.326h-58.094l86.654-148.224    C326.988,8.966,327,6.099,325.662,3.768z M219.429,163.223c-1.356,2.32-1.368,5.187-0.03,7.518    c1.337,2.331,3.818,3.768,6.505,3.768h55.111L118.189,369.107l60.754-162.664c0.86-2.302,0.537-4.88-0.865-6.9    c-1.401-2.019-3.703-3.224-6.161-3.224h-63.173L169.939,15h136.145L219.429,163.223z" />
              </g>
            </g>
          </svg>
          <span className="text-2xl text-sparkGreen">Spark</span>
        </div>
      </header>
      {/* <div className="pt-10 mb-4 w-full"></div> */}
      <Hero className="z-20 bg-gradient-to-l from-sparkGreen to-pink-500">
        <h2 className="text-2xl">Admin zone</h2>
      </Hero>
      <main className="z-30 px-4 pt-4">{children}</main>
      <BurgerMenu />
    </div>
  );
}
