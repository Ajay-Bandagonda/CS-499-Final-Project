let submit = document.getElementById('submit')
let title = document.getElementsByTagName('h1')[0]
let userWallet = document.querySelector('#wallet-address')

submit.addEventListener('click', function(e) {
    e.preventDefault()
    let elements = document.querySelectorAll('form > div.mb-3, h5')
    elements.forEach((element) => {
        element.setAttribute('style', 'display: none;')
    })

    title.innerText = 'Congrats! Your smart contract has been created!'

    let subheading = document.querySelector("p");
    let p2 = document.querySelector('#wallet-add')
    subheading.innerText = 'After our team reviews your article and deems it fit to be displayed, the smart contract will execute.'
    p2.innerText = 'Wallet address confirmation: ' + userWallet.value

    smartContract(userWallet.value)

    document.querySelector('form').appendChild(subheading)
    submit.setAttribute('style', 'display: none;')
})

function smartContract(userWalletAddress) {
    // Contract Application Binary Interface (ABI) - Interface that allows you to interact with smart contract
    const ABI = [
        {
            "inputs": [],
            "name": "getBalance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address payable",
                    "name": "payee",
                    "type": "address"
                }
            ],
            "name": "sendCommission",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "withdrawAmount",
                    "type": "uint256"
                }
            ],
            "name": "withdraw",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "stateMutability": "payable",
            "type": "receive"
        }
    ]
    
    let provider = new ethers.providers.InfuraProvider("ropsten", '3c4c8512e12f43eb82d8f19ea0655022');

    const contract_address = '0xf7cbf44a699e6ecd909a9de8f7e99226b8b12fed'
    const wallet_key = '0x2df564cdf6e5068aa1729eaa7c2882c2e24d58b3e91a26f2d66e5dd2a1adfed8'
    let wallet = new ethers.Wallet(wallet_key, provider);

    let signer = wallet.connect(provider)
    let contract = new ethers.Contract(contract_address, ABI, signer);
    // let readonly_contract = new ethers.Contract(contract_address, ABI, provider);

    /*
    const tx = {
        from: '0x6B5A591F25c54D00a64d35e05d0046BEde21b073',
        to: '0xf7cbf44a699e6ecd909a9de8f7e99226b8b12fed',
        value: ethers.utils.parseEther('0.1'),
        nonce: provider.getTransactionCount('0x6B5A591F25c54D00a64d35e05d0046BEde21b073', "latest"),
        gasLimit: ethers.utils.parseUnits('0.000000000227'), // 100000
        gasPrice: provider.getGasPrice(),
    }
    
    
    // This is how we can send money to the contract...
    signer.sendTransaction(tx)
        .then((response) => {
            console.log('SEND TRANSACTION RESPONSE = ' + response);
        })
        .catch((err) => {
            console.log("SEND TRANSACTION ERROR = " + err);
        })
    */
    

    // console.log('Send Commission function being executed....');
    contract.sendCommission(userWalletAddress)
        .then((response) => {
            console.log("SENDING COMMISSION: ")
            console.log(response)
            output = response
        })
        .catch((err) => {
            console.log('ERROR' + err);
            output = err
        })
    
    let output = ''
    // contract.getBalance()
    //     .then((response) => {
    //         response.wait().then((res2) => {console.log(res2)})
    //         // console.log(response);
    //     })
    //     .catch((err) => {
    //         console.log(err);
    //         output = err
    //     })
    
}
