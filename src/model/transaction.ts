export class Transaction {
    senderAddress: string;
    recipientAddress: string;
    amount: number;

    constructor(senderAddress: string | null, recipientAddress: string, amount: number) {
        this.senderAddress = senderAddress ?? '';
        this.recipientAddress = recipientAddress;
        this.amount = amount;
    }
}