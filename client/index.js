const axios = require('axios');
const niceList = require('../utils/niceList.json');
const MerkleTree = require('../utils/MerkleTree');

const serverUrl = 'http://localhost:1225';

async function main() {
  // Create a Merkle tree using the niceList data
  const merkleTree = new MerkleTree(niceList);

  // Generate a Merkle proof for your name (replace 'YourName' with the name you want to prove)
  const nameToProve = 'Rosie Bartell';
  const merkleProof = merkleTree.getProof(nameToProve);

  // Send the Merkle proof to the server
  const { data: gift } = await axios.post(`${serverUrl}/gift`, {
    name: nameToProve,
    merkleProof: merkleProof,
    merkleRoot: merkleTree.getRoot().toString('hex')
  });

  console.log({ gift });
}

main();
