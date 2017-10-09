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

			this.hash = this.calculateHash();

		};

		calculateHash(){

			return SHA256(this.index + this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();

		}
	}

	class BlockChain {

		constructor(){
			//creating an array of blocks on the chain, initialising with just the Genesis[Hardie] block in place

			this.chain = [this.createHardieBlock()];
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

			newBlock.previousHash = this.getLatestBlock().hash; //checking the previous blocks hash
			newBlock.hash = newBlock.calculateHash(); //make sure whenever there are any changes to the block, the hashes update

			//Now we can push this block onto the chain
			//ADD IN SECURITY CHECKS HERE! LOL LEDGER ETC
			this.chain.push(newBlock);

		}
	}

	let labourCoin = new BlockChain();

	labourCoin.addBlock(new Block(1,"10/07/2017",{amount: 1}));
	labourCoin.addBlock(new Block(2,"10/07/2017, Michael O'Sullivan",{amount: 2}));
	labourCoin.addBlock(new Block(3,"10/07/2017, Michael O'Sullivan",{amount: 100}));

	console.log(JSON.stringify(labourCoin, null, 4)) //dunno what null does, but 4 seperates it with four spaces

