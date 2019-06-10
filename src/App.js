import React, {useContext, useState} from 'react';
import './App.css';
import {MetaMaskProvider, MetaMaskContext} from "./metamask";

function App() {
  return (
    <div className="App">
        <MetaMaskProvider>
            <DashBoard />
        </MetaMaskProvider>
    </div>
  );
}

const DashBoard = () => {
    const metaMaskContext = useContext(MetaMaskContext);
    return(
        <>
            <p>
                {metaMaskContext.address}
                <br />
                {metaMaskContext.network}
                <br />
                {metaMaskContext.balance}
                <br />
            </p>
        </>
    );
};

export default App;
