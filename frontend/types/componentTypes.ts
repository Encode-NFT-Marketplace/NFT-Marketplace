import { StaticImageData } from "next/image";

export type ListingType = {
  text: string;
};

export type CardType = {
    img: StaticImageData;
    text: string;
    price: string;
    owner: string;
}