import TokenContract from '../abi/TokenContract.json'
import VotingContract from '../abi/VotingContract.json'

export const tokenContractInstance = (web3) => {
    return new web3.eth.Contract(
        TokenContract.abi, 
        "0xF856F838577b6D72Ae83912ca0B333bd71DcEF9c" 
    )
}

export const votingContractInstance = (web3) => {
    return new web3.eth.Contract(
        VotingContract.abi, 
        "0x4c5910A874140DdB19cBdF3c4442D987010196F8"  
    )
}