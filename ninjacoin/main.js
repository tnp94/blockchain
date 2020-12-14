const SHA256 = require('crypto-js/sha256');
class Block {
   constructor(index, timestamp, data, previousHash = '') {
      this.index = index;
      this.timestamp = timestamp;
      this.data = data;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
   }

   calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
   }
}

class BlockChain {
   constructor() {
      this.chain = [this.createGenesisBlock()];
   }

   createGenesisBlock() {
      return new Block(0, "01/01/2020", "Genesis Block", "0");
   }

   getLatestBlock() {
      return this.chain[this.chain.length - 1];
   }

   addBlock(newBlock) {
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.hash = newBlock.calculateHash();
      this.chain.push(newBlock);
   }

   isChainValid() {
      for(let i = 1; i < this.chain.length; i++)
      {
         const currentBlock = this.chain[i];
         const previousBlock = this.chain[i-1];

         if(currentBlock.hash !== currentBlock.calculateHash())
         {
            return false;
         }
         if(currentBlock.previousHash !== previousBlock.calculateHash())
         {
            return false;
         }
      }
      return true;
   }
}

let ninjaCoin = new BlockChain();
ninjaCoin.addBlock(new Block(ninjaCoin.getLatestBlock.index + 1, "12/8/2020", {notes: "First test data"}));
ninjaCoin.addBlock(new Block(ninjaCoin.getLatestBlock.index + 1, "12/9/2020", {notes: "Second test data"}));

console.log(JSON.stringify(ninjaCoin, null, 2));
// console.log(ninjaCoin);

console.log(`Is chain valid? ${ninjaCoin.isChainValid()}`);

ninjaCoin.chain[1].data = {notes: "This was modified"};
ninjaCoin.chain[1].hash = ninjaCoin.chain[1].calculateHash();

console.log(JSON.stringify(ninjaCoin, null, 2));
// console.log(ninjaCoin);

console.log(`Is chain valid? ${ninjaCoin.isChainValid()}`);
