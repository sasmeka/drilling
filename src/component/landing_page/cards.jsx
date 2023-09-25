import React from "react";

function Cards({ image, title, desc }) {
  return (
    <>
      <div className="flex bg-white rounded-lg items-center flex-col justify-center gap-4 w-[300px] p-5 md:p-3 lg:p-10">
        <figure className="bg-indigo-50 p-2 rounded-full">
          <img src={image} alt="" />
        </figure>
          <div className="flex flex-col items-center text-center gap-2">
            <h2 className="font-bold text-xs md:text-md">{title}</h2>
            <p className="text-gray-400 text-[9px]">{desc}</p>
          </div>
      </div>
    </>
  );
}

export default Cards;
