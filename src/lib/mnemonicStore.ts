import {create} from 'zustand';

type AddressDetails = {
    address: string;
    pvtKey: string;
    balance: bigint;
}
type chainId = {
    chainId: number;
    chainName: string;
    rpcUrl: string;
}
interface MnemonicState {
    mnemonic: string;
    addressArr: AddressDetails[];
    currentAddress: string;
    // address
    setCurrentAddress: (currentAddress: string) => void;
    setAddressArr: (addressArr: AddressDetails[]) => void;
    setMnemonic: (mnemonic: string) => void;
    chainIdArr: chainId[];
    currentChainId: chainId;
    setCurrentChainId: (chainDetails: chainId) => void;
}

const useMnemonicStore = create<MnemonicState>((set) => ({
    mnemonic: '',
    addressArr: [],
    currentAddress: '',
    chainIdArr: [{chainId: 1337, chainName: "GANACHE", rpcUrl: process.env.NEXT_PUBLIC_GANACHE_TEST_RPC_URL!},
        {chainId: 1, chainName: "MAINNET", rpcUrl: process.env.NEXT_PUBLIC_MAINNET_WSS_URL!},
        {chainId: 11155111, chainName: "SEPOLIA", rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_WSS_URL!},
        {chainId: 17000, chainName: "HOLESKY", rpcUrl: process.env.NEXT_PUBLIC_HOLESKY_WSS_URL!},
        {chainId: 56, chainName: "BSC", rpcUrl: process.env.NEXT_PUBLIC_BSC_WSS_URL!}
    ],
    currentChainId: {chainId: 11155111, chainName: "SEPOLIA", rpcUrl: process.env.NEXT_PUBLIC_SEPOLIA_WSS_URL!},
    setCurrentChainId: (currentChainId: chainId) => set({ currentChainId }),
    setCurrentAddress: (currentAddress: string) => set({ currentAddress }),
    setAddressArr: (addressArr: AddressDetails[]) => set({ addressArr }),
    setMnemonic: (mnemonic: string) => set({ mnemonic }),
}));

export default useMnemonicStore;