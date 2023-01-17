import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import rentalAbi from "./abi/rental_abi.json";

export const useRental = (address: string) => {
  return useContract({
    abi: rentalAbi as Abi,
    address: address,
  });
};
