import "./index.css";

import React from "react";

type TImageLinkForm = {
  onButtonClick: (e: React.FormEvent<HTMLFormElement>) => void;
};
export default function ImageLinkForm({ onButtonClick }: TImageLinkForm) {
  return (
    <div className="text-center my-[3em]">
      <p className="text-[2.2rem] m-auto font-bold tracking-wider max-w-[90vw]">
        This Magic Brain will detect faces celebrity know before 2016 pass image
        URL. Get it try.
      </p>
      <form
        className="pattern flex items-center max-w-[90vw] w-[700px] my-9 mx-auto py-5
      px-12  rounded-[6px] shadow-[2px_5px_15px_0_rgba(0,0,0,0.2)]"
        onSubmit={onButtonClick}
      >
        <input
          type="url"
          name="inputURL"
          id="inputURL"
          placeholder="https://picture/yourimage.jpg"
          onClick={(e) => (e.target as HTMLInputElement).select()}
          className="rounded-sm outline-purple-400/50 text-[2rem] p-[.2em]
            w-[70%] block my-9 mx-auto"
        />
        <button
          type="submit"
          className="text-[1.6rem] text-slate-200 w-[30%] h-[40px] rounded-md
          transition-transform hover:scale-[1.05] bg-purple-500 font-medium"
        >
          Detect
        </button>
      </form>
    </div>
  );
}
