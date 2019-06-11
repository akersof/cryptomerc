import React, {useContext, useEffect, useState} from 'react';
import {DappContext} from "./dapp";
import {MetaMaskContext} from "./metamask";

export const useIsRegistered = () =>  {
    const dappContext = useContext(DappContext);
    const metaMaskContext = useContext(MetaMaskContext);
    const [isRegistered, setRegistered] = useState(false);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if(dappContext.ready)
        (async () => {
            setLoading(true);
            const registered = await dappContext.contract.isRegistered(metaMaskContext.address);
            setRegistered(registered);
            setLoading(false);
        })();}, [metaMaskContext.address, metaMaskContext.network, dappContext.ready]);
    return [isRegistered, loading];
};

