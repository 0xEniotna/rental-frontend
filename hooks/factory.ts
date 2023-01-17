import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import factoryAbi from "./abi/factory_abi.json";

export const useFactory = () => {
  return useContract({
    abi: factoryAbi as Abi,
    address: process.env.NEXT_PUBLIC_FACTORY_ADDRESS,
  });
};
