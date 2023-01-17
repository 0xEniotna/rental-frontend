import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import argentAbi from "./abi/argent_account.json";

export const useArgentAccount = (address: string) => {
  return useContract({
    abi: argentAbi as Abi,
    address: address,
  });
};
