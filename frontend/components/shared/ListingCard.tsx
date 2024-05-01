import { svg } from "@/constants";
import { CardType } from "@/types/componentTypes";
import Image from "next/image";
import React from "react";

const ListingCard = ({ img, text, price, owner }: CardType) => {
  return (
    <div className="rounded-xl min-w-[180px] overflow-hidden border border-gray-200 mx-1">
      <Image src={img} alt="" className="object-cover w-full" />
      <div className="p-1">
        <h3 className="text-sm my-1 font-semibold">{text}</h3>
        <div className="flex justify-between items-start my-2">
          <h4 className="text-sm">{price}</h4>
          <h4 className="text-sm">{owner}</h4>
        </div>
      </div>
    </div>
  );
};

export default ListingCard;
