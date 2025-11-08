import React from "react";
import { Spinner } from "../ui/spinner";

const Loader = ({ message }) => {
  return (
    <div className="w-screen h-screen flex items-center justify-center text-center text-lg flex-col gap-4">
      <p>{message || "Loading..."}</p>
      <Spinner className=" w-8 h-8" />
    </div>
  );
};

export default Loader;
