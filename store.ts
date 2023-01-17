import {
    createModel,
    init,
    Models,
    RematchDispatch,
    RematchRootState,
} from "@rematch/core";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from 'react'


type SetAccountType = {
    account: string;
    accountConnected: boolean;
};

export const state = createModel<RootModel>()({
    state: {
        rehydrated: false,
        message: "",
        account: "",
        accountConnected: false,
        network: "",
    },
    reducers: {
        setMessage(state, message: string) {
            return { ...state, message };
        },
        setAccount(state, { account, accountConnected }: SetAccountType) {
            let newState = { ...state, account, accountConnected };
            if (account) {
                localStorage.setItem("account", account);
                if (
                    state.message === "please connect your Starknet wallet"
                ) {
                    newState.message = "";
                }
            } else {
                localStorage.removeItem("account");
            }
            return newState;
        },
        setNetwork(state, network: string) {
            const newState: any = { ...state, network };
            // const networkMessage = `please connect to the ${process.env.NEXT_PUBLIC_STARKNET_NETWORK} network`;
            if (network) {
                newState.network = network;
                // if (network !== process.env.NEXT_PUBLIC_STARKNET_NETWORK) {
                //     newState.message = networkMessage;
                // } else if (state.message === networkMessage) {
                //     newState.message = "";
                // }
            }
            return newState;
        },

        setRehydrated(state) {
            return { ...state, rehydrated: true };
        },
    },
});

export interface RootModel extends Models<RootModel> {
    state: typeof state;
}

export const models: RootModel = { state };

export const store = init({
    models,
});

// setTimeout(() => {
//     if (typeof window !== "undefined") {
//         const previousAccount = localStorage.getItem("account");
//         if (previousAccount) {
//             store.dispatch({
//                 type: "state/setAccount",
//                 payload: {
//                     account: previousAccount,
//                     accountConnected: false,
//                 },
//             });
//         }
//         store.dispatch({
//             type: "state/setRehydrated",
//             payload: true,
//         });
//     }
// }, 100);

export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export const useStoreState = () => useSelector((s: RootState) => s.state);
export const useStoreDispatch = () => {
    const dispatch = useDispatch<Dispatch>();
    return dispatch.state;
};
