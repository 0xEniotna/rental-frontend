import { useStarknet, useAccount } from "@starknet-react/core";
import { useEffect, useRef } from "react";
import { uint256, number, shortString } from "starknet";

export const getAddressFromBN = (bn: any) => {
  const hexString = bn.toString(16);
  const prefix = "0".repeat(64 - hexString.length);
  return `0x${prefix}${hexString}`;
};

export const getAddressFromString = (str: String) => {
  const prefix = "0x";
  return `${prefix}${str}`;
};

export const getNumberFromUint = (uint: any) => {
  return uint256.uint256ToBN(uint).toNumber();
};

export const getUintFromNumber = (num: any) => {
  return uint256.bnToUint256(num);
};

export const useStarknetNetwork = () => {
  const { library } = useStarknet();
  const { account, address, status } = useAccount();
  if (!account) {
    return;
  }
  try {
    const { baseUrl } = library as any;
    if (baseUrl.includes("alpha-mainnet.starknet.io")) {
      return "mainnet";
    } else if (baseUrl.includes("alpha4.starknet.io")) {
      return "SN_GOERLI";
    } else if (baseUrl.includes("alpha4-2.starknet.io")) {
      return "SN_GOERLI2";
    } else if (baseUrl.match(/^https?:\/\/localhost.*/)) {
      return "localhost";
    }
  } catch { }
};

export const starknetEndpoint = (network: string) => {
  if (!network) {
    return;
  }
  try {
    switch (network) {
      case "mainnet": {
        return `https://starknet-mainnet.infura.io/v3/${process.env.NEXT_INFURA_GOERLI2}`
      }
      case "SN_GOERLI": {
        return `https://starknet-goerli.infura.io/v3/${process.env.NEXT_INFURA_GOERLI2}`
      }
      case "SN_GOERLI2": {
        return `https://starknet-goerli2.infura.io/v3/${process.env.NEXT_INFURA_GOERLI2}`
      }
      case "localhost": {
        console.log("starknet endpoint: localhost");
      }
      default: {
        //statements; 
        console.log("starknet endpoint: none");
        break;
      }
    }
  } catch { }
};

const componentToHex = (c: number): string => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};

export const rgbToHex = (r: number, g: number, b: number): string => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

export const feltArrayToStr = (feltArray: number[]) => {
  return feltArray.map((n: number) => {
    if (n === 0) {
      return "";
    }
    return shortString.decodeShortString(number.toHex(number.toBN(n)));
  });
};

export const strToFeltArray = (str: string): string[] => {
  const feltStrings = str.match(/.{1,31}/g);
  if (!feltStrings) return [];
  const felts = feltStrings.map((s) => number.toBN(shortString.encodeShortString(s)).toString());
  return felts;
};

export const getExecuteParameterFromTheme = (theme: string): string[] => {
  const feltArray = [];
  try {
    for (const letter of theme) {
      feltArray.push(number.toBN(shortString.encodeShortString(letter)).toString());
    }
  } catch (e) {
    // console.error(e);
  }
  return [feltArray.length.toString(), ...feltArray];
};

export const shortAddress = (address: string) => {
  const addressWith0x = address.slice(0, 2) === "0x" ? address : `0x${address}`;
  return `${addressWith0x.slice(0, 6)}...${address.slice(
    address.length - 3,
    address.length
  )}`;
};

export const usePrevious = (value: any) => {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
};

export const useHasChanged = (value: any, callback: any) => {
  const previous = usePrevious(value);
  const hasChanged = previous !== value;

  useEffect(() => {
    if (hasChanged) {
      callback && callback(previous);
    }
  }, [callback, hasChanged, previous]);
  return [hasChanged, previous];
};

export const capitalizeFirstLetter = (s: string) => {
  return s.charAt(0).toUpperCase() + s.slice(1);
};
