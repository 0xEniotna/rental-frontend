import { useAccount, useConnectors } from "@starknet-react/core";
import { useCallback, useEffect } from "react";

import { useStoreDispatch, useStoreState } from "../store";

type Props = {
  connectButton: React.ReactNode;
};

const ConnectToStarknet = ({ connectButton }: Props) => {
  const state = useStoreState();
  const dispatch = useStoreDispatch();

  const { connect, disconnect, available, refresh } = useConnectors();
  useEffect(() => {
    const interval = setInterval(refresh, 5000);
    return () => clearInterval(interval);
  }, [refresh]);

  const { address: starknetConnectedAccount } = useAccount();

  const connector = available.length > 0 ? available[0] : null;

  const disconnectAndDispatch = useCallback(() => {
    if (starknetConnectedAccount) {
      try {
        disconnect();
      } catch (e) {
        console.log("[DEBUG] Could not disconnect", e);
      }
    }
    dispatch.setAccount({
      account: "",
      accountConnected: false,
    });
    dispatch.setNetwork("");
  }, [starknetConnectedAccount, disconnect, dispatch]);

  useEffect(() => {
    if (
      state.network &&
      state.network !== process.env.NEXT_PUBLIC_STARKNET_NETWORK
    ) {
      disconnectAndDispatch();
    }
  }, [disconnectAndDispatch, state.network]);


  useEffect(() => {
    if (!state.rehydrated) return;
    if (
      state.network &&
      state.network === process.env.NEXT_PUBLIC_STARKNET_NETWORK &&
      starknetConnectedAccount &&
      starknetConnectedAccount !== state.account
    ) {
      dispatch.setAccount({
        account: starknetConnectedAccount,
        accountConnected: true,
      });
    } else if (
      !starknetConnectedAccount &&
      state.account &&
      state.accountConnected
    ) {
      console.log("here ")
      dispatch.setAccount({
        account: "",
        accountConnected: false,
      });
    }
  }, [
    dispatch,
    starknetConnectedAccount,
    state.account,
    state.accountConnected,
    state.network,
    state.rehydrated,
  ]);

  return (
    <div>
      {state.account ?
        <span className="btn-primary" onClick={disconnectAndDispatch}>
          {`${state.account.slice(0, 8)}...  (disconnect)`}
        </span>
        :
        <span
          onClick={() => {
            if (connector) {
              connect(connector);
            }
          }}
          className="btn-primary"
        >
          {connectButton}
        </span>
      }
    </div>
  );
};

export default ConnectToStarknet;
