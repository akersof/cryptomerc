import React from 'react';
import './App.css';
import {MetaMaskProvider} from "./metamask";
import {DappProvider} from "./dapp";
import {CryptoMerc} from "./cryptomerc"

function App() {
  return (
    <div className="App">
        <MetaMaskProvider>
            <DappProvider>
                <CryptoMerc />
            </DappProvider>
        </MetaMaskProvider>
    </div>
  );
}
export default App;
