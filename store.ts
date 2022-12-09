import {
    createModel,
    init,
    Models,
    RematchDispatch,
    RematchRootState,
} from "@rematch/core";
import { useDispatch, useSelector } from "react-redux";

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
                localStorage.setItem("pxls-account", account);
                if (
                    state.message === "please connect your Starknet wallet before minting"
                ) {
                    newState.message = "";
                }
            } else {
                localStorage.removeItem("pxls-account");
                newState = (this as any)["state/resetColoringState"](newState);
            }
            return newState;
        },

        setNetwork(state, network: string) {
            const newState: any = { ...state, network };
            const networkMessage = `please connect to the ${process.env.NEXT_PUBLIC_STARKNET_NETWORK} network`;
            if (network) {
                if (network !== process.env.NEXT_PUBLIC_STARKNET_NETWORK) {
                    newState.message = networkMessage;
                } else if (state.message === networkMessage) {
                    newState.message = "";
                }
            }
            return newState;
        },
    }
});

export interface RootModel extends Models<RootModel> {
    state: typeof state;
}

export const models: RootModel = { state };

export const store = init({
    models,
});


export type Store = typeof store;
export type Dispatch = RematchDispatch<RootModel>;
export type RootState = RematchRootState<RootModel>;

export const useStoreState = () => useSelector((s: RootState) => s.state);
export const useStoreDispatch = () => {
    const dispatch = useDispatch<Dispatch>();
    return dispatch.state;
};
