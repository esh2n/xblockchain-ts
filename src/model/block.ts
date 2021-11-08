import SHA256 from 'crypto-js/sha256';
import { Transaction } from './transaction';

export class Block {
    timestamp: number
    transactions: Transaction[]
    previousHash: string
    hash: string
    nonce: number

    constructor(timestamp: number, transactions: Transaction[], previousHash?: string) {
        this.timestamp = timestamp;
        this.transactions = transactions;
        this.previousHash = previousHash ?? "";
        this.hash = this.calculateHash();
        this.nonce = 0;
    }

    calculateHash() {
        return SHA256(
            this.timestamp +
            this.previousHash +
            JSON.stringify(this.transactions) +
            this.nonce
            ).toString();
    }

    mineBlock(difficulty = 2) {
        while (this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);
    }
}
