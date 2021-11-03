import SHA256 from 'crypto-js/sha256';

export class Block {
    timestamp: number
    data:any
    previousHash: string
    hash: string

    constructor(timestamp: number, data:any, previousHash?: string) {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash ?? "";
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.timestamp + this.previousHash + JSON.stringify(this.data)).toString();
    }
}
