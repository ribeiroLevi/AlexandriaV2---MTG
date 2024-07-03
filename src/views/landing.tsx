export function Landing() {
  return (
    <div className="h-screen w-screen overflow-hidden flex items-center flex-col bg-orange-200">
      <img
        src="/ALEXANDRIA.svg"
        alt=""
        className="absolute w-screen bottom-0 "
      />
      <nav className="py-5 flex flex-row w-5/6">
        <div className="w-full flex flex-row items-center justify-between">
          <img src="alexandriaLogo.svg" className="w-10" alt="" />
        </div>
      </nav>
      <div className="flex flex-row w-screen items-center">
        <div className="-mt-[88px] h-screen w-screen flex justify-center items-center flex-col">
          <h1 className="text-[150px] font-Karantina uppercase text-orange-900">
            Alexandria
          </h1>
          <p className="font-Karantina text-[40px] -mt-16 text-orange-700">
            The Supreme Magic The Gathering Library
          </p>
          <button className="w-48 h-10 text-3xl rounded-md text-orange-200 font-Karantina bg-orange-900">
            EXPLORE
          </button>
        </div>
      </div>
    </div>
  );
}
