export const CONTRACT_CRYTO_MERC_ADDRESS = "0x6be204e348619687aebdc7aab2781bd905faebf9";
export const CONTRACT_CRYPTO_MERC_ABI = [
    {
        "constant": false,
        "inputs": [
            {
                "name": "_name",
                "type": "string"
            },
            {
                "name": "_description",
                "type": "string"
            }
        ],
        "name": "register",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [],
        "name": "owner",
        "outputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "",
                "type": "address"
            }
        ],
        "name": "users",
        "outputs": [
            {
                "name": "addr",
                "type": "address"
            },
            {
                "name": "name",
                "type": "string"
            },
            {
                "name": "description",
                "type": "string"
            },
            {
                "name": "fame",
                "type": "uint256"
            },
            {
                "name": "isBlackListed",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "constant": true,
        "inputs": [
            {
                "name": "_address",
                "type": "address"
            }
        ],
        "name": "isRegistered",
        "outputs": [
            {
                "name": "",
                "type": "bool"
            }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "Registration",
        "type": "event"
    }
];