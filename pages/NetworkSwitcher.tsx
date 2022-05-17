import { Web3Provider } from "@ethersproject/providers";
import { useWeb3React } from "@web3-react/core";
import { useCallback } from "react";
import { talismanChains } from "../talisman/talismanChains";

export const NetworkSwitcher = () => {
  const { chainId, library, account, active } = useWeb3React<Web3Provider>();

  const switchNetwork = useCallback(
    (network) => async () => {
      try {
        const res = await library?.send("wallet_switchEthereumChain", [
          { chainId: "0x" + network.id.toString(16) },
        ]);
      } catch (err) {
        console.log("failed to switch network", { err });
        //attempt to add network in case it's missing from wallet
        try {
          const {
            // non expected properties
            name,
            id,
            testNet,
            //expected properties
            ...networkDetails
          } = network;

          await library?.send("wallet_addEthereumChain", [
            {
              chainId: "0x" + network.id.toString(16),
              chainName: name,
              ...networkDetails,
            },
          ]);
        } catch (err) {
          console.error("failed to add network", { err });
        }
      }
    },
    [library]
  );

  if (!library) return null;

  return (
    <div>
      {talismanChains.map((network) => (
        <button
          key={network.id}
          disabled={network.id === chainId}
          onClick={switchNetwork(network)}
        >
          {network.name}
        </button>
      ))}
      <p>
        By default Talisman only supports Moonbeam, Moonriver, Astar, Acala and
        their testnets.
      </p>
      <p>
        You may add any other EVM network by toggling the "Allow custom
        networks" in Talisman option. Toggling it off and on will clear the
        custom networks list.
      </p>
      <p>
        To reset authorized accounts for a given dapp, browse Talisman settings
        - trusted sites - ethereum tab - and forget current site.{" "}
      </p>
    </div>
  );
};
