import { Block } from './model/block';
import { Blockchain } from './model/blockchain';
import { Transaction } from './model/transaction';

const main = () => {
    const originalCoin = new Blockchain();
    transactionSample(originalCoin)
    tamperSample(originalCoin);
    console.log(JSON.stringify(originalCoin, null, 2));
}

const transactionSample = (originalCoin: Blockchain) => {
    originalCoin.createTransaction(new Transaction(null, 'your-address', 12.5));
    originalCoin.createTransaction(new Transaction('address1', 'your-address', 10));
    originalCoin.createTransaction(new Transaction('your-address', 'address2', 2));
    console.log('\n マイニングを開始');
    originalCoin.minePendingTransactions('your-address');
    console.log('\n あなたのアドレスの残高は',
    originalCoin.getBalanceOfAddress('your-address'));
    console.log('\n マイニングを再度実行');
    originalCoin.minePendingTransactions('your-address');
    console.log('\n あなたのアドレスの残高は',
    originalCoin.getBalanceOfAddress('your-address'));
}

const tamperSample = (originalCoin: Blockchain) => {
    // originalCoin.chain[1].data = {SendCoinToA : 200};
    // originalCoin.chain[1].hash = originalCoin.chain[1].calculateHash();
    // console.log('ブロックの中身を書き換えた状態:' + originalCoin.isChainValid());
}

main()