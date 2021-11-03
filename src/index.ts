import { Block } from './model/block';
import { Blockchain } from './model/blockchain';

const main = () => {
    const originalCoin = new Blockchain();
    transactionSample(originalCoin)
    tamperSample(originalCoin);
    console.log(JSON.stringify(originalCoin, null, 2));
}

const transactionSample = (originalCoin: Blockchain) => {
    originalCoin.addBlock(new Block(Date.now(), { sendCoinToA: 3 }));
    originalCoin.addBlock(new Block(Date.now(), { sendCoinToB: 8 }));
}

const tamperSample = (originalCoin: Blockchain) => {
    originalCoin.chain[1].data = {SendCoinToA : 200};
    originalCoin.chain[1].hash = originalCoin.chain[1].calculateHash();
    console.log('ブロックの中身を書き換えた状態:' + originalCoin.isChainValid());
}

main()