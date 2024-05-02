import { listings } from "@/helpers/listings";
import { listingData } from "@/helpers/listingData";
import React from "react";
import ListingCard from "./ListingCard";
import Listing from "./Listing";

const Listings = () => {
  return (
    <div className="mx-2 mt-[50px]">
      <div className="flex justify-between my-2 items-center">
        <h3 className="font-semibold">Browse By Listings</h3>
        <h4 className="text-brownish text-sm ">View All</h4>
      </div>
      <div className="flex min-w-[300px] overflow-x-scroll">
        {listings.map((listing, index) => {
          return (
            <Listing key={index} text={listing.text} />
          );
        })}
      </div>
      <div className="mt-[20px] flex min-w-[300px] overflow-x-scroll">
        {listingData.map((data, index) => {
          return (
            <ListingCard
              key={index}
              img={data.img}
              text={data.text}
              price={data.price}
              owner={data.owner}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Listings;
