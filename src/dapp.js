import React, {useContext, useReducer, useEffect, useState} from 'react';
import {ethers} from 'ethers';
import {CONTRACT_CRYTO_MERC_ADDRESS, CONTRACT_CRYPTO_MERC_ABI} from "./contracts/contractCryptoMerc";
import {MetaMaskContext} from "./metamask";

export const DappContext = React.createContext(null);

export const DappProvider = ({children}) => {
    const [dappState] = useDapp();
    return(
        <>
            <DappContext.Provider value={dappState}>
                {children}
            </DappContext.Provider>
        </>
    );
};

const dappReducer = (state, action) => {
    switch(action.type) {
        case 'SET_CONTRACT':
            return {...state, contract: action.contract};
        case 'SET_SIGNER':
            return {...state, signer: action.signer};
        case 'SET_ISREADY':
            return {...state, ready: true};
        default:
            throw new Error('Unhandled action in dappReducer');
    }
};

const useDapp = () => {
    const metaMaskContext = useContext(MetaMaskContext);
    const [dapp, dispatch] = useReducer(dappReducer, {ready: false});
    useEffect(() => {
        (async () => {
            if(!metaMaskContext.isLoading) {
                const contract = new ethers.Contract(CONTRACT_CRYTO_MERC_ADDRESS, CONTRACT_CRYPTO_MERC_ABI, metaMaskContext.provider);
                console.log('contract');
                console.log(contract);
                dispatch({type: 'SET_CONTRACT', contract: contract});
                const signer = contract.connect(metaMaskContext.provider.getSigner(metaMaskContext.address));
                console.log('signer');
                console.log(signer);
                dispatch({type: 'SET_SIGNER', signer: signer});
                dispatch({type: 'SET_ISREADY'});
            }
        })()
    }, [metaMaskContext.address, metaMaskContext.network, metaMaskContext.isLoading]);
    return [dapp];
};