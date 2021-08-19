
// Binary tree
var tree;
var list = [];
var additional = [];
// var type = 'position';
var offsetX = 100;
var type = 'value';

var canvas;


function setup() {

    // noCanvas();
    /*    ----------------------------------        signature        --------------------------------    */
    signature = createElement('h3', 'Signature: ');
    signature.position(10, 10);

    var edgeX = signature.x + offsetX;
    //create functions input 
    signatureInput = createInput();
    signatureInput.position(edgeX, 30);
    signatureInput.size(420);

    /*    ----------------------------------        formula        --------------------------------    */

    formulaLabel = createElement('h3', 'Term: ');
    formulaLabel.position(10, signatureInput.height + 11);

    //create formula input
    formulaInput = createInput();
    formulaInput.position(edgeX, signatureInput.y + signatureInput.height + 5);
    formulaInput.size(420);

    /*    ----------------------------------        submit        --------------------------------    */

    subnitButton = createButton('Submit');
    subnitButton.position(formulaInput.width + 115, signatureInput.y + signatureInput.height + 5);
    subnitButton.size(240);
    subnitButton.mousePressed(parse);


    /*    ----------------------------------        search        --------------------------------    */

    searchLabel = createElement('h3', 'search for: ');
    searchLabel.position(10, subnitButton.y + 10);

    //create formula input
    searchInput = createInput();
    searchInput.position(edgeX, searchLabel.y + 21);
    searchInput.size(420);


    searchButton = createButton('search');
    searchButton.position(searchInput.width + 115, searchLabel.y + 21);
    searchButton.size(240);
    searchButton.mousePressed(searchForNode);


    /*    ----------------------------------        replacement        --------------------------------    */

    replaceATLabel = createElement('h3', 'replace at: ');
    replaceATLabel.position(10, searchButton.y + 10);

    //create replace at input
    replaceATInput = createInput();
    replaceATInput.position(edgeX, replaceATLabel.y + 21);
    replaceATInput.size(420);


    replaceWithLabel = createElement('h3', 'replace with: ');
    replaceWithLabel.position(10, replaceATInput.y + 10);

    //create replace with 
    replaceWithInput = createInput();
    replaceWithInput.position(edgeX, replaceWithLabel.y + 21);
    replaceWithInput.size(420);


    replaceATButton = createButton('replace');
    replaceATButton.position(replaceWithInput.width + 115, replaceWithInput.y);
    replaceATButton.size(240);
    replaceATButton.mousePressed(replaceNodeWith);

    /*    ----------------------------------            substitution            --------------------------------    */

    substitutionLabel = createElement('h3', 'Substitution: ');
    substitutionLabel.position(10, replaceATButton.y + 10);


    substitutionInput = createInput();
    substitutionInput.position(edgeX, substitutionLabel.y + 21);
    substitutionInput.size(420);

    substitutionButton = createButton('Substitution');
    substitutionButton.position(substitutionInput.width + 115, substitutionInput.y);
    substitutionButton.size(240);
    substitutionButton.mousePressed(substitution);



    /*    ----------------------------------            ordering            --------------------------------    */

    LPOLabel = createElement('h3', 'LPO: ');
    LPOLabel.position(10, substitutionButton.y + 10);


    LPOInput = createInput();
    LPOInput.position(edgeX, LPOLabel.y + 21);
    LPOInput.size(420);

    LPOButton = createButton('Ordering');
    LPOButton.position(LPOInput.width + 115, LPOInput.y);
    LPOButton.size(240);
    LPOButton.mousePressed(LPOfunction);



    /*    ----------------------------------            reduction            --------------------------------    */

    SearchByFormulaLabel = createElement('h3', 'Reduction: ');
    SearchByFormulaLabel.position(10, LPOButton.y + 10);


    SearchByFormulaInput = createInput();
    SearchByFormulaInput.position(edgeX, SearchByFormulaLabel.y + 21);
    SearchByFormulaInput.size(420);

    SearchByFormulaButton = createButton('Search');
    SearchByFormulaButton.position(SearchByFormulaInput.width + 115, SearchByFormulaInput.y);
    SearchByFormulaButton.size(240);
    SearchByFormulaButton.mousePressed(searchByFormula);


    /*    ----------------------------------            unification            --------------------------------    */

    unificationLabel = createElement('h3', 'Unification: ');
    unificationLabel.position(10, SearchByFormulaButton.y + 10);


    unificationInput = createInput();
    unificationInput.position(edgeX, unificationLabel.y + 21);
    unificationInput.size(420);

    unificationButton = createButton('unification');
    unificationButton.position(unificationInput.width + 115, unificationInput.y);
    unificationButton.size(240);
    unificationButton.mousePressed(unification);


    /*    ----------------------------------            unification2            --------------------------------    */

    // unificationLabel2 = createElement('h3', 'Unification2: ');
    // unificationLabel2.position(10, unificationButton.y + 10);


    // unificationInput2 = createInput();
    // unificationInput2.position(edgeX, unificationLabel2.y + 21);
    // unificationInput2.size(420);

    // unificationButton2 = createButton('unification2');
    // unificationButton2.position(unificationInput2.width + 115, unificationInput2.y);
    // unificationButton2.size(240);
    // unificationButton2.mousePressed(unification2);


    /*    ----------------------------------            clear and canvas            --------------------------------    */

    clear = createButton('Clear');
    clear.position(LPOInput.x + 60, unificationButton.y + unificationButton.height + 24);
    clear.size(240);
    clear.mousePressed(clearCanvas);

    canvas = createCanvas(600, 600);
    canvas.background(51);
    canvas.position(10, clear.y + clear.height + 20);

}
function LPOfunction() {
    // canvas.clear();
    // background(51);
    // canvas.position(10, clear.y + clear.height + 20);
    var LPORules = LPOInput.value();
    var functions1 = signatureInput.value();
    parseLPO(LPORules, functions1);
}

function substitution() {
    canvas.clear();
    background(51);
    canvas.position(10, clear.y + clear.height + 20);
    var substitutionInputRules = substitutionInput.value();
    var functions1 = signatureInput.value();
    additional.type = type;
    checksubstit = checkSubstitution(substitutionInputRules, functions1);
    if (substitutionInputRules != null && substitutionInputRules != '' && substitutionInputRules != undefined && checksubstit == true) {
        // var zu = 
        substitNodes(tree, substitutionInputRules, functions1, additional);
        // printNewTree(tree.root, additional);
    } else {
        console.log('please enter correct substituation rules!');
    }

}


function unification() {
    // canvas.clear();
    // background(51);
    // canvas.position(10, clear.y + clear.height + 20);
    var pairs = unificationInput.value();
    additional.type = type;
    var functions1 = signatureInput.value();
    unificationpairs(pairs, functions1, additional);
}
function unification2() {
    // canvas.clear();
    // background(51);
    // canvas.position(10, clear.y + clear.height + 20);
    var pairs = unificationInput.value();
    additional.type = type;
    var functions1 = signatureInput.value();
    unificationpairs2(pairs, functions1, additional);
}
function replaceNodeWith() {
    canvas.clear();
    background(51);
    canvas.position(10, clear.y + clear.height + 20);
    var deletePosition = replaceATInput.value();
    var replaceWithFormula = replaceWithInput.value();
    var functions1 = signatureInput.value();
    additional.type = type;

    var result = deleteThenAddNode(tree, deletePosition, additional,replaceWithFormula,functions1);
    if (result == false) {
        canvas.clear();
        background(51);
        canvas.position(10, clear.y + clear.height + 20);
    }


}

function searchForNode() {
    canvas.clear();
    background(51);
    canvas.position(10, clear.y + clear.height + 20);
    var nodePostion = searchInput.value();
    additional.type = type;
    searchForNodeAtPosition(tree, nodePostion, additional);
}
function searchByFormula() {
    canvas.clear();
    background(51);
    canvas.position(10, clear.y + clear.height + 20);
    var SearchFromula = SearchByFormulaInput.value();
    var functions1 = signatureInput.value();
    var formula1 = formulaInput.value();
    additional.type = type;
    searchInTreeByFormula(formula1, functions1, SearchFromula, additional);
}
function clearCanvas() {
    canvas.clear();
    canvas.background(51);
    canvas.position(10, clear.y + clear.height + 20);
}
function parse() {
    canvas.clear();
    background(51);
    canvas.position(10, clear.y + clear.height + 20);
    additional.type = type;
    var functions1 = signatureInput.value();
    var formula1 = formulaInput.value();
    tree = new Tree();

    parsing(tree, functions1, formula1, additional);

}
function clearpage(canvas,clear) { 
    canvas.clear();
    background(51);
    canvas.position(10, clear.y + clear.height + 20);
}
