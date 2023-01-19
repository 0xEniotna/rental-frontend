import { useContract } from "@starknet-react/core";
import { Abi } from "starknet";

import Erc721Abi from "./abi/nft_abi.json";

export const useERC721Contract = () => {
  return useContract({
    abi: Erc721Abi as Abi,
    address: process.env.NEXT_PUBLIC_ERC721_ADDRESS,
  });
};
