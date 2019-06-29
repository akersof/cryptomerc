import React, {useReducer, useContext, useEffect, useState} from 'react';
import {DappContext} from "./dapp";
import {MetaMaskContext} from "./metamask";

const contractReducer = (state, action) => {
    switch(action.type) {
        case "INIT":
            return {...state, status: "init"};
        case 'LOADING':
            return {...state, status: "loading"};
        case 'ERROR':
            return {...state, status: "error"};
        case 'SUCCESS':
            return {...state, status: "success", result: action.result};
        default:
            return {...state, status: "error"};
    }
};


export const useContract = (funcName, params) => {
    //TODO check for funcName present in ABI
    //TODO check if funcNAme is const or not, to check if we need a signer, or go with a signer call only?
    const dappContext = useContext(DappContext);
    const metaMaskContext = useContext(MetaMaskContext);
    const [state, dispatch] = useReducer(contractReducer, {status: "loading"});
    useEffect(() => {
        if(dappContext.ready)
            (async () => {
                const result = await dappContext.contract.functions[funcName](...params);
                dispatch({type:"SUCCESS", result: result});
            })();}, [metaMaskContext.address, metaMaskContext.network, dappContext.ready]); //TODO: is it redundant to add address and network
    return [state];
};