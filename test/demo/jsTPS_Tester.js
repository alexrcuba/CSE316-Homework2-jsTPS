import jsTPS from '../../src/jsTPS.js';
import Num from './Num.js';
import AddToNum_Transaction from './AddToNum_Transaction.js';
export default class jsTPS_Tester {
    // HERE'S OUR TRANSACTION PROCESSING SYSTEM
    constructor(){
    this.tps = new jsTPS();
    // HERE'S THE DATA WE'RE MANIPULATING IN THIS DEMO
    this.num = new Num();
    this.entry = "";
    }
    /**
     * This runs our demo program. Note that it presents a 
     * menu, retrieves the input, and executes the selected
     * behavior.
     * 
     * @param args Not used in this demo.
     */
    main() {
            if(!this.entry.startsWith("Q")){
            // GET THE USER SELECTION
            let textfield = document.getElementById("decision_textfield");
            this.entry = textfield.value;
            
            // ADD AND EXECUTE A TRANSACTION
            if (this.entry.startsWith("1")) {
                textfield = document.getElementById("choice_one_textfield");
                let amountToAdd = parseInt(textfield.value);
                let transaction = new AddToNum_Transaction(this.num, amountToAdd);
                this.tps.addTransaction(transaction);
            }            
            // UNDO A TRANSACTION
            else if (this.entry.startsWith("2")) {
                this.tps.undoTransaction();
            }
            // REDO A TRANSACTION
            else if (this.entry.startsWith("3")) {
                this.tps.doTransaction();
            }
            // CLEAR ALL TRANSACTIONS
            else if (this.entry.startsWith("4")) {
                this.tps.clearAllTransactions();
            }
            // CLEAR ALL TRANSACTIONS AND RESET NUM TO 0
            else if (this.entry.startsWith("5")) {
                this.tps.clearAllTransactions();
                this.num.setNum(0);
            }
            // QUIT
            else if (this.entry.startsWith("Q")) {
                let newTpsDiv = document.createElement("div");
                newTpsDiv.setAttribute("id", "new_tps_div");
                let oldTpsDiv = document.getElementById("current_tps_div");
                let child = oldTpsDiv.firstElementChild;
                child.remove();
                newTpsDiv.innerHTML = "THE PROGRAM HAS BEEN TERMINATED";
                oldTpsDiv.appendChild(newTpsDiv);
                let newNumDiv = document.createElement("div");
                newNumDiv.setAttribute("id", "new_num_div");
                let oldNumDiv = document.getElementById("current_num_div");
                let childNum = oldNumDiv.firstElementChild;
                childNum.remove();
                newNumDiv.innerHTML = "NO MORE INPUTS WILL BE ACCEPTED";
                oldNumDiv.appendChild(newNumDiv);
                let control = document.getElementById("submit_button");
                control.removeEventListener("click", this.main);
                
            }
            if(!this.entry.startsWith("Q")){
            let newTpsDiv = document.createElement("div");
            newTpsDiv.setAttribute("id", "new_tps_div");
            let oldTpsDiv = document.getElementById("current_tps_div");
            let child = oldTpsDiv.firstElementChild;
            child.remove();
            newTpsDiv.innerHTML = this.tps.toString();
            oldTpsDiv.appendChild(newTpsDiv);
            let newNumDiv = document.createElement("div");
            newNumDiv.setAttribute("id", "new_num_div");
            let oldNumDiv = document.getElementById("current_num_div");
            let childNum = oldNumDiv.firstElementChild;
            childNum.remove();
            newNumDiv.innerHTML = this.num.getNum();
            oldNumDiv.appendChild(newNumDiv);
            }
        }
    }
}