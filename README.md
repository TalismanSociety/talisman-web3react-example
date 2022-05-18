# Web3React - Talisman Integration

This repository demonstrate how to integrate talisman with web3react.

It is a copy of the [web3react v6 example project](https://github.com/NoahZinsmeister/web3-react/tree/v6/example), with the following changes :

- added TalismanConnector which can be used the same way as web3react's InjectedConnector.
- removed other connectors from the home page's connect options
- removed the useEagerConnect hook that was built in the example, as it always forces Metamask to connect on page load, if authorized.
- added a network switcher, which appears when a wallet is connected, to demonstrate how talisman networks can be switched from dapps.

InjectedConnector uses any ethereum provider injected in `window.ethereum`, which most of the time should be Metamask.
TalismanConnector uses exclusively Talisman ethereum provider which is injected in `window.talismanEth` instead. It is [EIP 1193](https://eips.ethereum.org/EIPS/eip-1193) compliant.
We do not inject in `window.ethereum` unless it's empty, as we think most users will want to keep using both Talisman and Metamask.

Please let us know if you need any assistance while integrating Talisman into your dapp.

## Run the project

Prerequisite : Node.js v14

```bash
# install dependencies
yarn

# launch web server
yarn start
```
