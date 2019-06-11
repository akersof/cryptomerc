//The CrytoMerc app
import React, {useContext} from "react";
import {MetaMaskContext} from "./metamask";
import {DappContext} from "./dapp";
import {useContract} from './contract';


export const CryptoMerc = () => {
    const metaMaskContext = useContext(MetaMaskContext);
    const dappContext = useContext(DappContext);
    const [response] = useContract("isRegistered", [metaMaskContext.address]);
    if(response.status === "loading") return <p>LOADING....</p>
    if(response.status === "success"){
        if(response.result === true)
            return <p>you are register bro</p>
        else if(response.result === false)
            return <p>you are not registered</p>
    }
    else return <p>????</p>;
};