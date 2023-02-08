import Tilt from "react-parallax-tilt";

import ai from "./ai.png";

export default function Logo() {
  return (
    <div className="mx-[5em] my-[4rem]">
      <Tilt
        className="Tilt bg-gd rounded-lg h-[150px] w-[150px]
            shadow-[0_5px_15px_0_rgba(0,0,0,0.3)]"
      >
        <div className=" flex justify-center items-center m-auto">
          <img src={ai} alt="AI Brain" className="w-[150px] p-[4rem]" />
        </div>
      </Tilt>
    </div>
  );
}
