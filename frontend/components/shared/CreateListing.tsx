"use client";

import React, { useState } from "react";

import { useForm } from "react-hook-form";
import {
  useAccount,
  useSignMessage,
  useWaitForTransactionReceipt,
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
import { NFTMarketPlaceABI} from "@/abi/NFTMarketplace"
import { OurNFTABI} from "@/abi/OurNFT"

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

    const dateTimeStamp = Math.floor(date!.getTime() / 1000); // converst Date() to unix timestamp

    const createListing = await writeContractAsync({
      chainId: sepolia.id,
      abi: NFTMarketPlaceABI,
      address: contract.NFTMarketplaceAddress,
      functionName: "listItem",
      args: [
        toHex(dataparam.ListingName, { size: 32 }),
        parseEther(`${dataparam.amount}`),
        address as `0x${string}`,
        BigInt(dateTimeStamp),
      ],
    });

    // console.log(createListing, status, hash, error);
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
                  htmlFor="ListingName"
                  className="text-black font-semibold mb-2 flex justify-start"
                >
                  NFT Listing Name
                </label>
                <input
                  {...registerListingModal("ListingName", {
                    required: " This is required ",
                  })}
                  id="ListingName"
                  type="text"
                  placeholder="Enter Listing Name"
                  className="flex justify-around border border-gray-300 bg-white rounded-full py-3 px-6  w-full focus:outline-none ring-offset-[#A5A5A533] focus-visible:bg-transparent text-black"
                />
              </div>

              <div>
                <label
                  htmlFor="amount"
                  className="text-black font-semibold mb-2 flex justify-start"
                >
                  Amount
                </label>
                <input
                  {...registerListingModal("amount", {
                    required: " This is required ",
                  })}
                  id="amount"
                  type="number"
                  placeholder="Enter Amount"
                  className="flex justify-around border border-gray-300 bg-white rounded-full py-3 px-6  w-full focus:outline-none ring-offset-[#A5A5A533] focus-visible:bg-transparent text-black"
                />
              </div>
              <div>
                <label
                  htmlFor="ListingDeadline"
                  className="text-black font-semibold mb-2 flex justify-start"
                >
                  Listing Deadline
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex justify-center border border-gray-300 bg-white rounded-full py-3 px-6  w-full focus:outline-none ring-offset-[#A5A5A533] focus-visible:bg-transparent text-black">
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
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
