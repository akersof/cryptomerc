//The CrytoMerc app
import React, {useContext} from "react";
import {MetaMaskContext} from "./metamask";
import {DappContext} from "./dapp";
import {useIsRegistered} from './contract';


export const CryptoMerc = () => {
    const metaMaskContext = useContext(MetaMaskContext);
    const dappContext = useContext(DappContext);
    const [isRegistered, isLoading] = useIsRegistered();
    if(isLoading) return <p>LOADING....</p>
    else if(isRegistered)
        return <p>you are register bro</p>
    else
        return <p>you are not registered</p>
};