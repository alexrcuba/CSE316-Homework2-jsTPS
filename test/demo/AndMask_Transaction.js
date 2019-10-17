import jsTPS_Transaction from '../../src/jsTPS_Transaction.js';
export default class AndMask_Transaction extends jsTPS_Transaction {
    // THIS IS THE OBJECT IT WILL MANIPULATE
    constructor(initNum,initIntNum,initMask) {
        // KEEP THESE FOR LATER
        super();
        this.num = initNum;
        this.intNum = initIntNum;
        this.mask = initMask;
    }

    /**
     * This transaction simply adds the value to the num.
     */
    doTransaction = function() {
        this.num.andMask(this.mask);
    }

    /**
     * As the reverse of do, this method substracts from num.
     */
    undoTransaction = function() {
        this.num.setNum(this.intNum);
    }

    /**
     * Provides a textual summary of this transaction.
     * 
     * @return A string storing a textual summary of this object.
     */
    toString = function() {
        return "And Mask " + this.mask;
    }
}