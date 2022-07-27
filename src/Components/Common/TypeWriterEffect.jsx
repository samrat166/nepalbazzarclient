import React from "react";
import Typewriter from "typewriter-effect";
const TypeWriterEffect = ({ staticTitle, dynamicTitle }) => {
  return (
    <div className="mt-4 text-center w-full ">
      <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
        {staticTitle}
        <span className="font-bold text-yellow-600">
          <Typewriter
            options={{
              strings: [dynamicTitle],
              autoStart: true,
              loop: true,
            }}
          />
        </span>
      </h1>
    </div>
  );
};

export default TypeWriterEffect;
