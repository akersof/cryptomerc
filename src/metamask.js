import React, {useReducer, useEffect} from 'react';
import {ethers} from 'ethers';

export const MetaMaskContext = React.createContext(null);

export const MetaMaskProvider = ({children}) => {
    const [userState] = useMetaMask();
    return(
        <>
            <MetaMaskContext.Provider value={userState}>
                {children}
            </MetaMaskContext.Provider>
        </>
    );
};

const metaMaskReducer = (state, action) => {
    switch(action.type) {
        case 'INIT_CONNECTION':
            return {...state, isLoading: true};
        case 'CONNECTION_SUCCESS':
            return {...state, isLoading: false};
        case 'DETECT_METAMASK':
            return {...state, isMetaMask: action.isMetaMask};
        case 'DETECT_ACCOUNT_CHANGE':
            return {...state, address: action.address};
        case 'DETECT_NETWORK_CHANGE':
            return {...state, network: action.address};
        case 'GET_ADDRESS':
            return {...state, address: action.address};
        case 'GET_PROVIDER':
            return {...state, provider: action.provider};
        case 'GET_NETWORK':
            return {...state, network: action.network};
        case 'GET_BALANCE':
            return {...state, balance: action.balance};
        default:
            throw new Error('Unhandled action in metaMaskReducer')
    }
};

const initialUserState = {isMetaMask: false, address: "0x0", network: "", isLoading: true};
const useMetaMask = () => {
    const [user, dispatch] = useReducer(metaMaskReducer, initialUserState);
    useEffect(() => {
        //TODO: https://ethereum.stackexchange.com/questions/42768/how-can-i-detect-change-in-account-in-metamask
        // window.onbeforeunload = function() {
        //    return "Prevent reload";
        //};
        window.ethereum.on('accountsChanged', (accounts) => {
            dispatch({type: 'DETECT_ACCOUNT_CHANGE', address: accounts[0]})});
        window.ethereum.on('networkChanged', (netID) => {
            dispatch({type: 'DETECT_NETWORK_CHANGE', network: netID});
        });
        (async () => {
            dispatch({type: 'INIT_CONNECTION'});
            const address = (await window.ethereum.enable())[0];
            dispatch({type: "GET_ADDRESS", address: address});
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            dispatch({type: "GET_PROVIDER", provider: provider});
            const network = (await provider.getNetwork()).name;
            dispatch({type: "GET_NETWORK", network: network});
            //TODO: find a way to get update on balance change.
            const balance = ethers.utils.formatEther(await provider.getBalance(address));
            dispatch({type: "GET_BALANCE", balance: balance});
            dispatch({type: 'CONNECTION_SUCCESS'});
        })();
    }, [user.address, user.network]);
    return [user];
};