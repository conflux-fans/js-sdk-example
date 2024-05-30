const {
    conflux, 
  } = require('../init');
  
  const abi = [
      {
          "constant": false,
          "inputs": [
              {
                  "name": "self",
                  "type": "Set.Data storage"
              },
              {
                  "name": "value",
                  "type": "uint256"
              }
          ],
          "name": "remove",
          "outputs": [
              {
                  "name": "",
                  "type": "bool"
              }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      },
      {
          "constant": true,
          "inputs": [
              {
                  "name": "self",
                  "type": "Set.Data storage"
              },
              {
                  "name": "value",
                  "type": "uint256"
              }
          ],
          "name": "contains",
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
          "constant": false,
          "inputs": [
              {
                  "name": "self",
                  "type": "Set.Data storage"
              },
              {
                  "name": "value",
                  "type": "uint256"
              }
          ],
          "name": "insert",
          "outputs": [
              {
                  "name": "",
                  "type": "bool"
              }
          ],
          "payable": false,
          "stateMutability": "nonpayable",
          "type": "function"
      }
  ];
  
  const address = 'cfxtest:acff38wbgejy292nj6e9b86gf3jn14d8262rx12nmz';
  
  
  async function main() {
    // initialize a contract instance with abi and address
    let fc = conflux.Contract({
      address: address,
      abi: abi,
    });
    
  }
  
  main().catch(console.log);

  