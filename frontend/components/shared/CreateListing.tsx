"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import {
  useAccount,
  useSignMessage,
  useWaitForTransactionReceipt,
  useReadContract,
  useWriteContract,
  useConnect,
} from "wagmi";
import { parseEther, toHex } from "viem";

import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

import { contract } from "@/constants/contract";
import { config } from "@/config";
import { sepolia } from "viem/chains";
import { injected } from "@wagmi/connectors";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { NFTMarketPlaceABI } from "@/abi/NFTMarketplace";
import { OurNFTABI } from "@/abi/OurNFT";

const CreateListing = () => {
  const { connectAsync } = useConnect();

  const [openListingModal, setOpenListingModal] = useState(false);
  const [date, setDate] = React.useState<Date>();
  const {
    register: registerListingModal,
    handleSubmit: handleSubmitListingModal,
    setValue: setListingModalValue,
    formState: { errors: errorsListingModal },
    control: controlListingModal,
  } = useForm();
  const {
    status,
    data: hash,
    writeContract,
    isPending,
    error,
    writeContractAsync,
  } = useWriteContract({
    config,
  });
  const { address } = useAccount();


  const onSubmitListingModal = async (dataparam: any) => {
    // onsumbit ListingModal logic
    if (!address) {
      await connectAsync({ chainId: sepolia.id, connector: injected() });
    }

    const createListing = await writeContractAsync({
      chainId: sepolia.id,
      abi: NFTMarketPlaceABI,
      address: contract.NFTMarketplaceAddress,
      functionName: "listItem",
      args: [
        dataparam.nftaddress as `0x${string}`,
        dataparam.tokenId,
        parseEther(`${dataparam.price}`),
      ],
    });

    console.log(createListing, status, hash, error);
  };



  return (
    <div className="mx-2">
      <Dialog open={openListingModal} onOpenChange={setOpenListingModal}>
        <DialogTrigger>
          <button className="py-3 px-6 m-2 border text-black rounded-full bg-white  hover:cursor-pointer hover:font-semibold">
            Create Listing
          </button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-black">
              {" "}
              Create a NFT Listing
            </DialogTitle>
            <DialogDescription></DialogDescription>
            <hr className="my-4" />
            <form
              className="flex flex-col justify-around h-[400px]"
              onSubmit={handleSubmitListingModal(onSubmitListingModal)}
            >
              <div>
                <label
                  htmlFor="NFTAddress"
                  className="text-black font-semibold mb-2 flex justify-start"
                >
                  NFT Address
                </label>
                <input
                  {...registerListingModal("nftaddress", {
                    required: " This is required ",
                  })}
                  id="NFTAddress"
                  type="text"
                  placeholder="Enter NFT Address"
                  className="flex justify-around border border-gray-300 bg-white rounded-full py-3 px-6  w-full focus:outline-none ring-offset-[#A5A5A533] focus-visible:bg-transparent text-black"
                />
              </div>

              <div>
                <label
                  htmlFor="price"
                  className="text-black font-semibold mb-2 flex justify-start"
                >
                  Price
                </label>
                <input
                  {...registerListingModal("price", {
                    required: " This is required ",
                  })}
                  id="price"
                  type="number"
                  placeholder="Enter Price"
                  className="flex justify-around border border-gray-300 bg-white rounded-full py-3 px-6  w-full focus:outline-none ring-offset-[#A5A5A533] focus-visible:bg-transparent text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="tokenId"
                  className="text-black font-semibold mb-2 flex justify-start"
                >
                  Token ID
                </label>
                <input
                  {...registerListingModal("tokenId", {
                    required: " This is required ",
                  })}
                  id="tokenId"
                  type="text"
                  placeholder="Enter Token ID"
                  className="flex justify-around border border-gray-300 bg-white rounded-full py-3 px-6  w-full focus:outline-none ring-offset-[#A5A5A533] focus-visible:bg-transparent text-black"
                />
              </div>
              <button
                disabled={isPending}
                type="submit"
                className="bg-brownish text-black font-semibold rounded-full p-3"
              >
                {isPending ? "Confirming..." : "Create Listing"}
              </button>
            </form>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateListing;
