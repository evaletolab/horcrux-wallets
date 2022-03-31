export async function sendTransaction(ethereum:any, from:string,to:string,data:string) {
  // from => ethereum.selectedAddress
  const transactionParameters = {
    nonce: '0x00', // ignored by MetaMask
    gasPrice: '0x09184e72a000', // customizable by user during MetaMask confirmation.
    gas: '0x2710', // customizable by user during MetaMask confirmation.
    to: to, // Required except during contract publications.
    from: from, // must match user's active address.
    value: '0x00', // Only required to send ether to the recipient from the initiating external account.
    data: data, // Optional, but used for defining smart contract creation and interaction.
    chainId: '0x3', // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
  };
  
  // txHash is a hex string
  // As with any RPC call, it may throw an error
  const txHash = await ethereum.request({
    method: 'eth_sendTransaction',
    params: [transactionParameters],
  });
  return txHash;
}


