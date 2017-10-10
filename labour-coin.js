	const SHA256 = require('crypto-js/sha256');
	console.log(SHA256("Message"));
	
	//BLOCK CHAIN

	//Hash in the following context will mean unique digital signature

	// The index is there the block sits on the chain
	// The timestamp will tell us when the block was created
	// Data is the details of the transaction, how much money was transferred, who was the sender and receiver etc
	// Previous Hash is VIP - it is a string that contains the Hash of the block before it on the chain, this ensure the intergity of the blockChain 


	//We will use CryptoJS to handle the encryption of the Hash Keys, the following is to demostrate the system is working correctly

	/*
	var myString   = "https://www.labourfuture.org.uk/";
	var myPassword = "myPassword";


	// PROCESS
	var encrypted = CryptoJS.AES.encrypt(myString, myPassword);
	var decrypted = CryptoJS.AES.decrypt(encrypted, myPassword);
	document.getElementById("demo0").innerHTML = myString;
	document.getElementById("demo1").innerHTML = encrypted;
	document.getElementById("demo2").innerHTML = decrypted;
	document.getElementById("demo3").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);

	*/


	class Block {
		constructor(index, timestamp, data, previousHash = ''){
			this.index = index;
			this.timestamp = timestamp;
			this.data = data;
			this.previousHash = previousHash;
			this.nonce = 0;
			this.hash = this.calculateHash();

		};

		calculateHash(){

			return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data) + this.nonce).toString();

		}

		mineBlock(difficulty) {
			// PROOF OF WORK
			//We need to prove that a lot of computer power has gone into making a block, this is called mining. BitCOin requies a block to start with a limited
			// amount of zeros, since you can not inflience the output of a hash function, you have to try it over and over to match the right number of zeros
			//This is called the difficulty, create one new block evey ten minutes
			//As computers get faster we need to create the difficult
			//A block must be complicated to create so that it takes ten minutes (i.e complicated computer equation), so blocks are not spam created. 
			//As computers get faster we must make the difficulty or equation harder so it still takes ten minutes to create a new block
			// This while loop will keep running until its matches the right amount ofg zeros to start the hash
		    while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
		        this.nonce++; //none value is a random number, 
		        this.hash = this.calculateHash();
		    }

		    console.log("BLOCK MINED: " + this.hash);
		    }
	}

	class BlockChain {

		constructor(){
			//creating an array of blocks on the chain, initialising with just the Genesis[Hardie] block in place

			this.chain = [this.createHardieBlock()];
			this.difficulty = 5; //settomg ot ,anually for now
		};

		//This is the starting block of the chain and must always be created manually and during the initial coin creation = Gensis block = Hardie

		createHardieBlock(){
			return new Block(0, "27/02/1900", "Hardie Block", "0");
		};

		getLatestBlock(){
			return this.chain[this.chain.length -1]; //to return the last element in the block
		};

		addBlock(newBlock){
			//add new blocks on to the chain

			newBlock.previousHash = this.getLatestBlock().hash; //checking the previous blocks hash and sets a new hash
			newBlock.mineBlock(this.difficulty);


			//Now we can push this block onto the chain
			//ADD IN SECURITY CHECKS HERE! LOL LEDGER ETC
			this.chain.push(newBlock);

		};

		isChainValid() {
	        for (let i = 1; i < this.chain.length; i++){
	            const currentBlock = this.chain[i];
	            const previousBlock = this.chain[i - 1];

	            if (currentBlock.hash !== currentBlock.calculateHash()) {
	                return false;
	            }

	            if (currentBlock.previousHash !== previousBlock.hash) {
	                return false;
	            }
	        }

	        return true;
    	};
	}

	let labourCoin = new BlockChain();

	console.log("IS LABOUR COIN INTERGRITY AND BLOCKCHAIN VALID? " + labourCoin.isChainValid());

	console.log('Mining block 1...');

	labourCoin.addBlock(new Block(1,"10/07/2017",{amount: 1}));
	
	console.log('Mining block 2...');

	labourCoin.addBlock(new Block(3,"10/07/2017, Michael O'Sullivan",{amount: 100}));

	console.log('Mining block 3...');

	labourCoin.addBlock(new Block(2,"10/07/2017, Michael O'Sullivan",{amount: 2}));

	console.log("IS LABOUR COIN INTERGRITY AND BLOCKCHAIN VALID? " + labourCoin.isChainValid());


	if(labourCoin.isChainValid() === true ){
		console.log(JSON.stringify(labourCoin, null, 4)) //dunno what null does, but 4 seperates it with four spaces
	}

	


	

