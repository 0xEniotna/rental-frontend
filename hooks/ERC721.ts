import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import Erc721Abi from "./abi/nft_abi.json";

export const useERC721Contract = (address: string) => {
  return useContract({
    abi: Erc721Abi as Abi,
    address: address,
  });
};
