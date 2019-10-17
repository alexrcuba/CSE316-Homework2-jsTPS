import jsTPS_Transaction from '../../src/jsTPS_Transaction.js';
export default class AddToNum_Transaction extends jsTPS_Transaction {
    /**
     * Constructor for this transaction, it initializes this
     * object with all the data needed to both do and undo
     * the transaction.
     * 
     * @param initNum
     * @param initAmountToAdd 
     */
    constructor(initNum, initAmountToAdd) {
        // KEEP THESE FOR LATER
        super();
        this.num = initNum;
        this.num = this.num
        this.amountToAdd = initAmountToAdd;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction = function() {
        let oldNum = this.num.getNum();
        let newNum = oldNum + this.amountToAdd;
        this.num.setNum(newNum);
    };

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction = function() {
        let oldNum = this.num.getNum();
        let newNum = oldNum - this.amountToAdd;
        this.num.setNum(newNum);
    };

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString = function() {
        return "Add " + this.amountToAdd;
    }
}