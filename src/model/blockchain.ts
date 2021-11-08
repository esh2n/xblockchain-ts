import { Block } from './block';
import { Transaction } from './transaction';
export class Blockchain {
    chain: Block[]
    pendingTransactions: Transaction[] = [];
    miningReward: number

    constructor() {
        this.chain = [this.createGenesisBlock()];
        this.pendingTransactions = [];
        this.miningReward = 12.5;
    }

    createGenesisBlock(): Block {
        return new Block(Date.now(), [], '0');
    }

    getLatestBlock(): Block {
        return this.chain[this.chain.length - 1];
    }

    createTransaction(transaction: Transaction): void {
        this.pendingTransactions.push(transaction);
    }

    getBalanceOfAddress(address: string): number {
        let balance = 0;

        for (const block of this.chain) {
            for (const trans of block.transactions) {
                if(trans.senderAddress === address) {
                    balance -= trans.amount
                }
                if(trans.recipientAddress === address) {
                    balance += trans.amount
                }
            }
        }
        return balance
    }

    minePendingTransactions(miningRewardAddress: string): void {
        let block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash);
        block.mineBlock();
        console.log('ブロックが正常にマイニングされました');
        this.chain.push(block);
        this.pendingTransactions = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    isChainValid(): boolean {
        for (let i = 1; i < this.chain.length; i++) {
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
    }
}