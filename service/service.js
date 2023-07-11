import TokenContract from '../abi/TokenContract.json'
import VotingContract from '../abi/VotingContract.json'

export const tokenContractInstance = (web3) => {
    return new web3.eth.Contract(
        TokenContract.abi, // abi of SC voting token
        "0x0991Af5d3748673b40859a75DCA5209d4927af07" // address of Voting token
    )
}

export const votingContractInstance = (web3) => {
    return new web3.eth.Contract(
        VotingContract.abi, // abi of SC governance contract
        "0x5D3E12b48812270067de236f07DBCE9452F215Af"  // address of governance contract
    )
}