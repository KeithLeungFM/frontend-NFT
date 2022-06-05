import * as React from 'react';
import {ethers} from 'ethers';
import BlockchainStories from "./contract/BlockchainStories.json"



export default function Edit() {
  const contractAddress = '0x0354dc7e46616d39c37907df45bcab86596acab8'


  const withdrawAll = async function(){
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask

    const signer = provider.getSigner();    
    const contract = new ethers.Contract(contractAddress, BlockchainStories.abi, signer)

    //const connection = contract.connect(signer);
    //const addr = await connection.address;

    const result = await contract.withdraw()
    console.log(result)
  }


  const handleClick = function(){
    withdrawAll()
  }
  return (
    <button onClick={handleClick}>Withdraw</button>
  )
}