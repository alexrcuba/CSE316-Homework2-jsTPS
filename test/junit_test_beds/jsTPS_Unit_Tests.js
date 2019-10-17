import AddToNum_Transaction from '../demo/AddToNum_Transaction.js';
import OrMask_Transaction from '../demo/OrMask_Transaction.js'
import AndMask_Transaction from '../demo/AndMask_Transaction.js';
import jsTPS from '../../src/jsTPS.js';
import Num from '../demo/Num.js';
/**
 * jsTPS_Unit_Tests.java
 * 
 * This file provides a test bed for the jsTPS framework.
 * 
 * @author McKilla Gorilla
 * @version 2.0
 */
export default class jsTPS_Unit_Tests {
    constructor(){
        this.currentTest = "";
    }
    /**
     * This JUnit test is for testing the adding of transactions.
     */
    testAdd() {
        let newAssertDiv = document.createElement("div");
        newAssertDiv.setAttribute("id", "assertion_title_div_add");
        this.currentTest = "assertion_title_div_add";
        let newAssertHeader = document.createElement("h3");
        newAssertHeader.setAttribute("class", "assert_header");
        newAssertHeader.innerHTML = "ADD TESTS";
        newAssertDiv.appendChild(newAssertHeader);
        let assertionList = document.getElementById("unit_test_results");
        assertionList.appendChild(newAssertDiv);
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        this.assert(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        this.assert(5, num.getNum());
        this.assert(1, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(1, tps.getUndoSize());
        
        // ADD 10 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        this.assert(15, num.getNum());
        this.assert(2, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(2, tps.getUndoSize());
        
        // ADD 15 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assert(35, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(3, tps.getUndoSize());
    }
    
    /**
     * 
     */
    testAndMask() {
        let newAssertDiv = document.createElement("div");
        newAssertDiv.setAttribute("id", "assertion_title_div_and");
        this.currentTest = "assertion_title_div_and";
        let newAssertHeader = document.createElement("h3");
        newAssertHeader.setAttribute("class", "assert_header");
        newAssertHeader.innerHTML = "AND TESTS";
        newAssertDiv.appendChild(newAssertHeader);
        let assertionList = document.getElementById("unit_test_results");
        assertionList.appendChild(newAssertDiv);
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        this.assert(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new AndMask_Transaction(num, num.getNum(), 4));
        this.assert(4, num.getNum());
        this.assert(2, tps.getSize());
        tps.undoTransaction();
        this.assert(12, num.getNum());
        this.assert(2, tps.getSize());
        this.assert(1, tps.getRedoSize());
        this.assert(1, tps.getUndoSize());

    }
    
    testOrMask() {
        let newAssertDiv = document.createElement("div");
        newAssertDiv.setAttribute("id", "assertion_title_div_or");
        this.currentTest = "assertion_title_div_or";
        let newAssertHeader = document.createElement("h3");
        newAssertHeader.setAttribute("class", "assert_header");
        newAssertHeader.innerHTML = "OR TESTS";
        newAssertDiv.appendChild(newAssertHeader);
        let assertionList = document.getElementById("unit_test_results");
        assertionList.appendChild(newAssertDiv);
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps = new jsTPS();
        let num = new Num();
        this.assert(0, num.getNum());
        
        // ADD 5 TRANSACTION
        tps.addTransaction(new AddToNum_Transaction(num, 12));
        tps.addTransaction(new OrMask_Transaction(num, num.getNum(), 5));
        this.assert(13, num.getNum());
        this.assert(2, tps.getSize());
        tps.undoTransaction();
        this.assert(12, num.getNum());
        this.assert(2, tps.getSize());
        this.assert(1, tps.getRedoSize());
        this.assert(1, tps.getUndoSize());
        
    }

    /**
     * This JUnit test is for testing the undoing of transactions.
     */
    testUndo() {
        let newAssertDiv = document.createElement("div");
        newAssertDiv.setAttribute("id", "assertion_title_div_undo");
        this.currentTest = "assertion_title_div_undo";
        let newAssertHeader = document.createElement("h3");
        newAssertHeader.setAttribute("class", "assert_header");
        newAssertHeader.innerHTML = "UNDO TESTS";
        newAssertDiv.appendChild(newAssertHeader);
        let assertionList = document.getElementById("unit_test_results");
        assertionList.appendChild(newAssertDiv);
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps =new jsTPS();
        let num =new Num();
        this.assert(num.getNum(), 0);
        this.assert(tps.hasTransactionToUndo(), false);
        this.assert(tps.hasTransactionToRedo(), false);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assert(tps.hasTransactionToUndo(), true);
        this.assert(tps.hasTransactionToRedo(), false);
        this.assert(35, num.getNum());
        this.assert(tps.hasTransactionToUndo(), true);
        this.assert(3, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION
        tps.undoTransaction();
        this.assert(tps.hasTransactionToUndo(), true);
        this.assert(tps.hasTransactionToRedo(), true);
        this.assert(15, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(1, tps.getRedoSize());
        this.assert(2, tps.getUndoSize());
        
        // UNDO ANOTHER
        tps.undoTransaction();
        this.assert(tps.hasTransactionToUndo(), true);
        this.assert(tps.hasTransactionToRedo(), true);
        this.assert(5, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(2, tps.getRedoSize());
        this.assert(1, tps.getUndoSize());
        
        // AND ANOTHER
        tps.undoTransaction();
        this.assert(tps.hasTransactionToUndo(), false);
        this.assert(tps.hasTransactionToRedo(), true);
        this.assert(0, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(3, tps.getRedoSize());
        this.assert(0, tps.getUndoSize());
        
        // WE HAVE NO MORE TO UNDO SO THIS SHOULD DO NOTHING
        tps.undoTransaction();
        this.assert(tps.hasTransactionToUndo(), false);
        this.assert(tps.hasTransactionToRedo(), true);
        this.assert(0, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(3, tps.getRedoSize());
        this.assert(0, tps.getUndoSize());
    }
    
    /**
     * This JUnit test is for testing the redoing of transactions.
     */
    testRedo(){
        let newAssertDiv = document.createElement("div");
        newAssertDiv.setAttribute("id", "assertion_title_div_redo");
        this.currentTest = "assertion_title_div_redo";
        let newAssertHeader = document.createElement("h3");
        newAssertHeader.setAttribute("class", "assert_header");
        newAssertHeader.innerHTML = "REDO TESTS";
        newAssertDiv.appendChild(newAssertHeader);
        let assertionList = document.getElementById("unit_test_results");
        assertionList.appendChild(newAssertDiv);
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps =new jsTPS();
        let num =new Num();
        this.assert(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assert(tps.hasTransactionToUndo(), true);
        this.assert(tps.hasTransactionToRedo(), false);
        this.assert(35, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(3, tps.getUndoSize());
        
        // UNDO A TRANSACTION AND THEN REDO IT
        tps.undoTransaction();
        tps.doTransaction();
        this.assert(tps.hasTransactionToUndo(), true);
        this.assert(tps.hasTransactionToRedo(), false);
        this.assert(35, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(3, tps.getUndoSize());
        
        // UNDO TWO TRANSACTIONS AND THEN REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assert(tps.hasTransactionToUndo(), true);
        this.assert(tps.hasTransactionToRedo(), false);
        this.assert(35, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(3, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO THEM
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assert(tps.hasTransactionToUndo(), true);
        this.assert(tps.hasTransactionToRedo(), false);
        this.assert(35, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(3, tps.getUndoSize());
        
        // UNDO THREE TRANSACTIONS AND REDO TWO
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assert(tps.hasTransactionToUndo(), true);
        this.assert(tps.hasTransactionToRedo(), true);
        this.assert(15, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(1, tps.getRedoSize());
        this.assert(2, tps.getUndoSize());
        
        // UNDO ALL THREE TRANSACTIONS AND REDO FOUR, WHICH
        // SHOULD NOT PRODUCE AN ERROR BUT THE LAST
        // REDO SHOULD DO NOTHING
        tps.undoTransaction();
        tps.undoTransaction();
        tps.undoTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        tps.doTransaction();
        this.assert(tps.hasTransactionToUndo(), true);
        this.assert(tps.hasTransactionToRedo(), false);
        this.assert(35, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(3, tps.getUndoSize());
    }    

    /**
     * This JUnit test is for testing clearing of transactions.
     */
    testClear() {
        let newAssertDiv = document.createElement("div");
        newAssertDiv.setAttribute("id", "assertion_title_div_clear");
        this.currentTest = "assertion_title_div_clear";
        let newAssertHeader = document.createElement("h3");
        newAssertHeader.setAttribute("class", "assert_header");
        newAssertHeader.innerHTML = "CLEAR TESTS";
        newAssertDiv.appendChild(newAssertHeader);
        let assertionList = document.getElementById("unit_test_results");
        assertionList.appendChild(newAssertDiv);
        // WE'LL JUST USE A SIMPLE NUM FOR TESTING
        let tps =new jsTPS();
        let num =new Num();
        this.assert(num.getNum(), 0);
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assert(35, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(3, tps.getUndoSize());
                
        // CLEAR ALL THE TRANSACTIONS
        tps.clearAllTransactions();
        this.assert(35, num.getNum());
        this.assert(0, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assert(70, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(3, tps.getUndoSize());
                
        // CLEAR THEM ALL OUT AGAIN
        tps.clearAllTransactions();
        this.assert(70, num.getNum());
        this.assert(0, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(0, tps.getUndoSize());
        
        // ADD 3 TRANSACTIONS (5, 10, and 15)
        tps.addTransaction(new AddToNum_Transaction(num, 5));
        tps.addTransaction(new AddToNum_Transaction(num, 10));
        tps.addTransaction(new AddToNum_Transaction(num, 20));
        this.assert(105, num.getNum());
        this.assert(3, tps.getSize());
        this.assert(0, tps.getRedoSize());
        this.assert(3, tps.getUndoSize());
    }

    assert(a, b){
        let newAssertDiv = document.createElement("div");
        newAssertDiv.setAttribute("id", "assertion_div");
        let assertionList = document.getElementById(this.currentTest);
        let text = "The assertion for " + a + " and " + b + " is: ";
        if(a === b){
            text += "TRUE";
        } else{
            text += "FALSE";
        }
        text += "\n";
        newAssertDiv.innerHTML = text;
        assertionList.appendChild(newAssertDiv);
    }
}