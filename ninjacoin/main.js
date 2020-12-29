const SHA256 = require('crypto-js/sha256');
class Block {
   constructor(index, timestamp, data, previousHash = '') {
      this.index = index;
      this.timestamp = timestamp;
      this.data = data;
      this.previousHash = previousHash;
      this.hash = this.calculateHash();
      this.nonce = 0;
   }

   calculateHash() {
      return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();
   }

   mineBlock(difficulty) {
      while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join('0'))
      {
         this.hash = this.calculateHash();
         this.nonce += 1;
      }

      console.log(`Blocked mined: ${this.hash}`);
   }
}

class BlockChain {
   constructor() {
      this.chain = [this.createGenesisBlock()];
      this.difficulty = 4;
   }

   createGenesisBlock() {
      return new Block(0, "01/01/2020", "Genesis Block", "0");
   }

   getLatestBlock() {
      return this.chain[this.chain.length - 1];
   }

   addBlock(newBlock) {
      newBlock.previousHash = this.getLatestBlock().hash;
      newBlock.mineBlock(this.difficulty);
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

console.log(`Mining block 1...`);
ninjaCoin.addBlock(new Block(ninjaCoin.getLatestBlock.index + 1, "12/8/2020", {notes: "First test data"}));

console.log(`Mining block 2...`);
ninjaCoin.addBlock(new Block(ninjaCoin.getLatestBlock.index + 1, "12/9/2020", {notes: "Second test data"}));

