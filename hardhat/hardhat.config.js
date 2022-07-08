require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
require('hardhat-contract-sizer');
require('solidity-coverage');
require("hardhat-gas-reporter");
require('hardhat-abi-exporter');
require('hardhat-docgen');
require("@nomiclabs/hardhat-solhint");
const { removeConsoleLog } = require('hardhat-preprocessor');

const dotenv = require('dotenv')
dotenv.config({ path: "./.env" })

const mnemonic = process.env.MNEMONIC;
const providerUrl = process.env.PROVIDER_URL;
const scankey = process.env.ETHERSCAN_API_KEY;


module.exports = {
    solidity: {
        compilers: [{
            version: "0.8.4",
        }]
    },
    defaultNetwork: 'hardhat',
    settings: {
        optimizer: {
            enabled: true,
            runs: 200
        },
    },
    networks: {
        hardhat: {
            chainId: 31337,
            accounts: {
                count: 10,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
                accountsBalance: '10000000000000000000000', // (10000 ETH)
            },
        },
        dev: {
            url: "http://127.0.0.1:8545",
            chainId: 31337,
            accounts: {
                count: 10,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
                accountsBalance: '10000000000000000000000', // (10000 ETH)
            },
        },
        main: {
            url: providerUrl,
            accounts: {
                count: 1,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
            },
            chainId: 1,
        },
        goerli: {
            url: providerUrl,
            accounts: {
                count: 1,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
            },
            chainId: 5,
        },
        rinkeby: {
            url: providerUrl,
            accounts: {
                count: 1,
                initialIndex: 0,
                mnemonic,
                path: "m/44'/60'/0'/0",
            },
            chainId: 4,
        },
    },
    etherscan: {
        apiKey: scankey
    },
    contractSizer: {
        alphaSort: true,
        disambiguatePaths: false,
        runOnCompile: false,
        strict: true,
    },
    gasReporter: {
        enabled: true
    },
    abiExporter: {
        path: './deployments/abi',
        runOnCompile: true,
        clear: true,
        flat: true,
        spacing: 2,
        pretty: true,
    },
    preprocess: {
        eachLine: removeConsoleLog((hre) => !['hardhat', 'dev'].includes(hre.network.name)),
    },
    docgen: {
        path: './docs',
        clear: true,
        runOnCompile: true,
    }
};