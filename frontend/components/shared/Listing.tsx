import { ListingType } from "@/types/componentTypes";
import React from "react";

const Listing = ({ text }: ListingType) => {
  return (
    <div className="flex justify-around rounded-full border border-gray-300 py-2 px-4 mx-1">
      <h4>{text}</h4>
    </div>
  );
};

export default Listing;
