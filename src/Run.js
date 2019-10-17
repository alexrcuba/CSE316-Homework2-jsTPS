import jsTPS_Tester from '../test/demo/jsTPS_Tester.js';
import jsTPS_Unit_Tests from '../test/junit_test_beds/jsTPS_Unit_Tests.js';
window.onload = function() {
    let jTs = new jsTPS_Tester();
    let jTus = new jsTPS_Unit_Tests();
    jTus.testAdd();
    jTus.testAndMask();
    jTus.testOrMask();
    jTus.testUndo();
    jTus.testRedo();
    jTus.testClear();
}