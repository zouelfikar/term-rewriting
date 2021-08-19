function parsing(tree, functions, formula, additional) {
    //wtf
    if (additional.allowPrint != false) {
        // functions = 'f/2,i/1,e/0';
        // functions = 'n/2,m/2,r/2,f/2,k/2,i/1,z/1,e/0,p/0';
        // formula = 'f(i(f(x,y)),f(i(x),e))';
        // formula = 'f(i(x),y)';
        // formula = 'r(i(f(x,k(k(o,o),e))),f(i(x),k(i(z(i(z(x)))),e)))';
    }
    // get function object whith the number of paarmeters
    functionObjects = getNumberOfChildrins(functions);
    nodeList = getList(formula);
    functionList = getList(functions);

    parametersList = getParametersList(nodeList, functionList);
    sortedFunctionsList = getSortedFunctions(nodeList, parametersList);
    usedFunctions = getUsedFunctions(functionObjects, sortedFunctionsList);

    list.nodeList = nodeList;
    list.functionList = functionList;
    list.parametersList = parametersList;
    list.sortedFunctions = sortedFunctionsList;
    list.functionObjects = usedFunctions;
    //parse out formula
    var finalTree = parseFormula(formula, functionObjects, list, tree);

    //validations
    validation(list, formula, finalTree);

    if (additional.allowPrint != false) {
        printValues(list, type);

        console.log("Tree :");
        console.log(tree);

    }

    var tempFormula = '';
    var returnedFormula = getFormula(finalTree.root);

    return finalTree;
}

function getFormula(parent) {

    if (parent.value != null) {
        var zu = getrestOfFormula(parent);
          console.log("fromula from getFormula",zu);
    }
    return zu;
}

function findOccurence(str, letter) {
    var letter_Count = 0;
    for (var position = 0; position < str.length; position++) {
        if (str.charAt(position) == letter) {
            letter_Count += 1;
        }
    }
    return letter_Count;
}

function getList(functions) {
    result = functions.match(/[a-z]/g);
    return result;
}

function getUsedFunctions(functionObjects, sortedFunctionsList) {

    for (var property in functionObjects) {
        if (!sortedFunctionsList.includes(property)) {
            // console.log(`${property}: ${functionObjects[property]}`);
            delete functionObjects[property];
        }
    }

    return functionObjects;
}

function getParametersList(nodeList, functionList) {
    let result = [];
    for (let i = 0; i < nodeList.length; i++) {
        if (!functionList.includes(nodeList[i])) {
            result.push(nodeList[i]);
        }
    }
    return result;
}

function getSortedFunctions(nodeList, ParametersList) {
    let result = [];
    for (let i = 0; i < nodeList.length; i++) {
        if (!ParametersList.includes(nodeList[i])) {
            result.push(nodeList[i]);
        }
    }
    return result;
}

function validation(list, formula, finalTree) {

    //    console.log(list.functionObjects);
    let temp = list.functionObjects;
    let count = 0;
    let rightnumOfcommaINFormula = 0;
    let numOfcommaINFormula = getIndicesOf(formula, ",");
    for (var x in temp) {
        if (temp[x] > 0) {
            count = findOccurence(formula, x);
            rightnumOfcommaINFormula += (parseInt(temp[x]) - 1) * count;
        }

    }

    let numOfLeftParentheses = getIndicesOf(formula, "(");
    let numOfRightParentheses = getIndicesOf(formula, ")");

    result1 = numOfcommaINFormula - rightnumOfcommaINFormula;
    result2 = numOfRightParentheses - numOfLeftParentheses;
    // console.log(result1);
    // console.log(result2);
    if (result1 != 0 || result2 != 0) {
        console.log("######   ERROR   #####");
        console.log("please check the formula");
    }
    //             // undo here
    missingValues(list, finalTree)


}

function getIndicesOf(str, searchStr) {

    var searchStrLen = searchStr.length;
    if (searchStrLen == 0) {
        return [];
    }
    var startIndex = 0, index, indices = [];

    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices.length;
}

function missingValues(list, finalTree) {
    // let additional = [];
    additional.nodeList = list.nodeList;
    additional.temp = list.nodeList;
    additional.functionList = list.functionList;
    additional.parametersList = list.parametersList;
    additional.sortedFunctions = list.sortedFunctions;

    finalTree.missing(additional);
}

function printValues(list) {
    // let additional = [];
    // additional.nodeList = list.nodeList;
    // additional.temp = list.nodeList;
    // additional.functionList = list.functionList;
    // additional.parametersList = list.parametersList;
    // additional.sortedFunctions = list.sortedFunctions;
    tree.printTree(additional);
}

function parseFormula(formula, functionObjects, list, tree) {
    let char;
    let restOfFormula;
    let isFunction = false;
    // let additional = [];
    let perpreviousChar = formula.charAt(0);
    // let newNodePosition = 0;
    additional.newChild = false;
    additional.firstChild = false;
    additional.getParent = false;
    additional.lastParent = [];
    LastParentPosition = [];
    additional.getBack = 0;
    additional.numberOfChildren = functionObjects;
    additional.nodeList = list.nodeList;
    additional.functionList = list.functionList;
    additional.parametersList = list.parametersList;

    for (var i = 0; i < formula.length; i++) {
        isFunction = false;
        if (functionObjects.hasOwnProperty(char)) {
            perpreviousChar = char;
        }
        char = formula.charAt(i);
        restOfFormula = formula.slice(1, formula.length);
        switch (char) {
            case "(":
                additional.firstChild = true;
                additional.newChild = false;
                additional.getParent = false;
                additional.getBack = 0;
                additional.lastParent.push(perpreviousChar);
                break;

            case ")":
                additional.getParent = true;
                additional.newChild = false;
                additional.firstChild = false;
                additional.getBack += 1;

                // additional.previousPosition = additional.position;

                additional.lastParent.splice(-1, 1);

                LastParentPosition.splice(-1, 1);

                //get back to parent
                break;

            case ",":
                additional.newChild = true;
                additional.firstChild = false;
                // additional.getParent = false;
                // add next children
                break;

            default:
                // if(additional.newChild == true){
                // }

                if (functionObjects.hasOwnProperty(char) && functionObjects[char] != 0) {
                    isFunction = true;
                    additional.parent = perpreviousChar;
                }
                additional.isFunction = isFunction;
                // if(functionObjects.hasOwnProperty(char)){
                //     additional.parent = perpreviousChar;
                // }
                additional.LastParentPosition = LastParentPosition;
                newNodePosition = tree.addValue(char, additional);

                if (isFunction == true) {
                    LastParentPosition.push(newNodePosition);
                }
                if (newNodePosition == false && i != 0) {
                    extraNode(LastParentPosition);
                }

                break;
        }

    }

    return tree;


}

function extraNode(LastParentPosition) {
    let index = LastParentPosition.length - 1;
    let poistionExtra = LastParentPosition[index];

    console.log("######   ERROR   #####");
    console.log("one parameter is extra for parent's poistion", poistionExtra);

}

function getLastParent(LastParentPosition) {
    let index = LastParentPosition.length - 1;
    let parentPosition = LastParentPosition[index];
    return parentPosition;

}

function getNumberOfChildrins(functions) {
    let temp = functions.split(',');
    let temp2 = [];
    let result1 = {};

    for (let i = 0; i < temp.length; i++) {
        temp2 = splitfunctions(temp[i], '/');
        if (temp2[1] > 0) {
            result1[temp2[0]] = temp2[1];
        } else {
            result1[temp2[0]] = 0;
        }
    }

    return result1;
}

function splitfunctions($arr, operator) {
    let temp = [];

    temp = $arr.split(operator);
    return temp;
}

/*    ----------------------------------        search for a  node        --------------------------------    */

function searchForNodeAtPosition(tree, nodePostion, additional) {
    // search in the tree
    tree.searchANDPrint(nodePostion, additional);

    // another Way for searching
    // var searchANDgetAnodeVlaue = searchANDgetAnode(nodePostion, tree.root);
    // ParentNodePostion = nodePostion.slice(0, -1);
    // var parentOFsearchingNode = searchANDgetAnode(ParentNodePostion, tree.root);

    // printANode(parentOFsearchingNode,searchANDgetAnodeVlaue,additional);
    // console.log(searchANDgetAnodeVlaue);
}

/*    ----------------------------------        delete a node for a  node        --------------------------------    */

function deleteThenAddNode(tree, deletePosition, additional, replaceWithFormula, functions) {
    //wtf
    // functions = 'n/2,m/2,r/2,f/2,k/2,i/1,z/1,e/0,p/0';
    deleteAt = 'pos';
    // remove node at given position and get the data
    deletedPositionFromTree = removeNodeAndGetData(tree.root, deletePosition, deleteAt);

    tree3 = new Tree();
    additional.allowPrint = false;
    // parse the given fromula
    var n = parsing(tree3, functions, replaceWithFormula, additional);
    n.root.isfunction = false;
    n.root.isRoot = false;
    n.root.x = deletedPositionFromTree['x'][0];
    n.root.y = deletedPositionFromTree['y'][0];
    n.root.position = deletedPositionFromTree['node'][0];
    newPos = deletedPositionFromTree['parent'][0];
    // updating children potions for the new node
    updateChildren(n.root);
    // add the new node
    addNodeTOPosition(newPos, tree.root, n.root);

    console.log('new tree after replacement:', tree);
    printNewTree(tree.root, additional);


}
/*    ----------------------------------        Substitution      --------------------------------    */


function substitNodes(tree, substitutionInputRules, functions, additional) {
    var newPos;
    var oldNodeValue;
    var deletedPositionFromTree;
    //wtf
    // functions = 'n/2,m/2,r/2,f/2,k/2,i/1,z/1,e/0,p/0';
    // substitutionInputRules = 'x/t|y/f(i(x),f(a,x))';
    // substitutionInputRules = 'x=t|y=f(f(x,x),f(y,y))';



    // i(f(x,i(x))) = f(f(x,x),f(y,y))



    // get function object whith the number of paarmeters
    functionObjects = getNumberOfChildrins(functions);
    substitList = getSubstitRules(substitutionInputRules);


    // delete all nodes that we should delete
    deletedPositionFromTree = [];
    deleteAt = 'value';
    for (var property in substitList) {
        deletedPositionFromTree = removeNodeAndGetData(tree.root, property, deleteAt);
    }
    // console.log("z", tree);
    // create new nodes for each deleted node
    for (let i = 0; i < deletedPositionFromTree['x'].length; i++) {
        tree2 = new Tree();
        additional.allowPrint = false;
        oldNodeValue = deletedPositionFromTree['value'][i];
        var n = parsing(tree2, functions, substitList[oldNodeValue], additional);
        n.root.isfunction = false;
        n.root.isRoot = false;
        n.root.x = deletedPositionFromTree['x'][i];
        n.root.y = deletedPositionFromTree['y'][i];
        n.root.position = deletedPositionFromTree['node'][i];
        newPos = deletedPositionFromTree['parent'][i];
        // console.log(n);
        if (n.root.children.length != 0) {
            updateChildren(n.root);
        }
        addNodeTOPosition(newPos, tree.root, n.root);
    }
    console.log(tree);
    printNewTree(tree.root, additional);
    // console.log(deletedPositionFromTree);
}

function updateChildren(selectNode) {
    // console.log("ss");
    for (let i = 0; i < selectNode.children.length; i++) {
        if (selectNode.children[i] != null) {
            let counter = i + 1;
            selectNode.children[i].position = selectNode.position + counter;
            if (i == 0) {
                selectNode.children[i].x = selectNode.x - 100 / selectNode.position.length;
                selectNode.children[i].y = selectNode.y + 50;
            } else {
                selectNode.children[i].x = selectNode.children[i - 1].x + 200 / selectNode.position.length;
                selectNode.children[i].y = selectNode.children[i - 1].y;
            }

        }
    }

    for (let i = 0; i < selectNode.children.length; i++) {
        if (selectNode.children[i] != null) {
            updateChildren(selectNode.children[i], selectNode)
        }
    }
}

function getSubstitRules(rules) {
    let temp = rules.split('|');
    let temp2 = [];
    let result = {};

    for (let i = 0; i < temp.length; i++) {
        temp2 = splitfunctions(temp[i], '/');
        result[temp2[0]] = temp2[1];
    }

    return result;
}

function parseLPO(rules, functions) {
    // wtf
    // functions = 'f/2,i/1,e/0';
    // rules = 'f(i(x),y)/f(f(x,y),e)';
    // rules = 'i(f(x,y))/f(i(x),i(y))';
    // rules = 'i(f(e,e))/f(f(x,y),x)';
    // rules = 'i(f(e,e))/f(f(x,y),x)';
    // f(f(x,y),x)/i(f(e,e))

    // rules = 'i(f(x,y))/i(f(x,y))';

    formulae = getSubstitRules(rules);
    var S_formula = Object.entries(formulae)[0][0];
    var T_formula = Object.values(formulae)[0];

    tree4 = new Tree();
    additional.allowPrint = false;
    // parse the given fromula
    var S_node = parsing(tree4, functions, S_formula, additional);
    additional.type = 'value';

    // printNewTree(S_node.root, additional);
    console.log("left hand side subtree", S_node);

    tree5 = new Tree();
    // parse the given fromula
    var T_node = parsing(tree5, functions, T_formula, additional);

    // printNewTree(T_node.root, additional);
    console.log("right hand side subtree", T_node);


    functionList = getList(functions);

    // S variables
    S_nodeList = getList(S_formula);
    S_variables = getParametersList(S_nodeList, functionList);

    // T variables
    T_nodeList = getList(T_formula);
    T_variables = getParametersList(T_nodeList, functionList);

    orderedFunctions = checkLenghtOfFunctions(functions, S_variables, T_variables);

    S_is_Larger = LPOCalculator(S_node.root, T_node.root, S_variables, T_variables, orderedFunctions);
    T_is_Larger = LPOCalculator(T_node.root, S_node.root, S_variables, T_variables, orderedFunctions);
    // console.log("S is larger", S_is_Larger);
    // console.log("T is larger", T_is_Larger);
    if (S_is_Larger) {
        console.log("S > T ==>", S_formula, ">", T_formula);
    } else if (T_is_Larger) {
        console.log("T > S ==>", T_formula, ">", S_formula);
    } else if (!S_is_Larger && !T_is_Larger) {
        console.log("can NOT order");
    }

    // var returnedFormula1 = getFormula(S_node.root);
    // var returnedFormula2 = getFormula(T_node.root);
    // console.log("new function 1 ", S_node.root);
    // console.log("new function 1 ", returnedFormula2);
}

function checkLenghtOfFunctions(functions, S_variables, T_variables) {
    // functionList = getList(functions);
    // counter = functionList.length;
    // for (let i = 0; i < functionList.length; i++) {
    //     result[functionList[i]] = counter;
    //     counter -= 1;
    // }

    // counter2 = result.length;
    // for (let i = 0; i < S_variables.length; i++) {
    //     result[functionList[i]] = counter2;
    //     counter2 -= 1;
    // }
    // f >  i > e
    result = {
        "i": 1,
        "f": 2,
        "e": 0,
        "y": 0,
        "x": 0,
    }

    return result;
}

// function searchInTreeByFormula(tree, functions, SearchInput, additional) {
//     console.log("DONT forget to fill the function field");
//     // wtf
//     // SearchFromula = 'i(f(x,y))';
//     // replacedFormula = 'f(i(x),i(y))'
//     // functions = 'f/2,i/1,e/2';

//     ReplaceList = getSubstitRules(SearchInput);

//     for (var property in ReplaceList) {
//         SearchFromula = property;
//         replacedFormula = ReplaceList[property];
//         break;
//     }


//     let ParentFunction = SearchFromula.charAt(0);

//     tree6 = new Tree();
//     additional.allowPrint = false;
//     // parse the given fromula
//     var NewTreeToSeach = parsing(tree6, functions, SearchFromula, additional);
//     console.log("seach for", NewTreeToSeach);
//     var possiblePOsition = searchANDgetAnode(ParentFunction, tree.root)
//     // console.log("possible POsition", possiblePOsition)
//     for (let i = 0; i < possiblePOsition.length; i++) {

//         FoundedNodes = getNOdebyPosition(tree.root, possiblePOsition[i]);
//         var isMatchedTrees = checkEqualityOfTwoTrees(FoundedNodes, NewTreeToSeach.root);
//         if (isMatchedTrees) {
//             console.log("match pos", possiblePOsition[i]);
//             // here you need to delete that posistion then add new tree
//             deleteAt = 'pos';
//             // remove node at given position and get the data
//             deletedPositionFromTree = removeNodeAndGetData(tree.root, possiblePOsition[i], deleteAt);
//             // create new node to be added in place of the old one
//             tree7 = new Tree();
//             var n = parsing(tree7, functions, replacedFormula, additional);
//             additional.allowPrint = false;
//             n.root.isfunction = false;
//             n.root.isRoot = false;
//             n.root.x = deletedPositionFromTree['x'][0];
//             n.root.y = deletedPositionFromTree['y'][0];
//             n.root.position = deletedPositionFromTree['node'][0];
//             newPos = deletedPositionFromTree['parent'][0];
//             // updating children potions for the new node
//             updateChildren(n.root);
//             // // add the new node
//             addNodeTOPosition(newPos, tree.root, n.root);

//             // console.log('new tree after replacement:',tree);
//             printNewTree(tree.root, additional);
//         }
//     }

// }
function searchInTreeByFormula(treeFormula, functions, SearchInput, additional) {
    console.log("DONT forget to fill the function field");
    // wtf
    // SearchFromula = 'i(f(x,y))';
    // replacedFormula = 'f(i(x),i(y))'
    // treeFormula = 'f(i(f(x,y)),f(i(x),e))';
    // SearchInput = 'i(f(x,y))/f(i(x),i(y))|i(x)/e';
    // functions = 'f/2,i/1,e/0';

    mainTree = new Tree();
    additional.allowPrint = false;
    // parse the given fromula
    var mainTreeNodes = parsing(mainTree, functions, treeFormula, additional);

    ReplaceList = getSubstitRules(SearchInput);

    for (var property in ReplaceList) {
        let possiblePOsition = [];
        clearpage(canvas, clear);
        SearchFromula = property;
        SearchTree = new Tree();

        // additional.allowPrint = false;
        // parse the given fromula
        var NewTreeToSeach = parsing(SearchTree, functions, SearchFromula, additional);
        replacedFormula = ReplaceList[property];
        // create new node to be added in place of the old one
        replacedTree = new Tree();
        var n = parsing(replacedTree, functions, replacedFormula, additional);
        let ParentFunction = SearchFromula.charAt(0);
        possiblePOsition = searchANDgetAnode(ParentFunction, mainTreeNodes.root)
        // console.log("possible POsition", possiblePOsition)
        for (let i = 0; i < possiblePOsition.length; i++) {

            FoundedNodes = getNOdebyPosition(mainTreeNodes.root, possiblePOsition[i]);
            console.log(FoundedNodes);
            var isMatchedTrees = checkEqualityOfTwoTrees(FoundedNodes, NewTreeToSeach.root);
            
            if (isMatchedTrees) {
                // console.log("match pos", possiblePOsition[i]);
                // here you need to delete that posistion then add new tree
                deleteAt = 'pos';
                // remove node at given position and get the data
                
                replacAtPosition = reductionReplaceNode(mainTreeNodes.root, n.root.value, n.root.children, possiblePOsition[i], deleteAt);
                // now we need to do update on that node and we're done
                updateChildren(mainTreeNodes.root);
                var zuzuzu = getFormula(mainTreeNodes.root);
                console.log("sss",zuzuzu);

                console.log("isMatchedTrees",mainTreeNodes);
                
            }
            
        }

        printNewTree(mainTreeNodes.root, additional);
        
        // console.log("zizi", ParentFunction);
        // console.log("zizi2", mainTreeNodes);
        // console.log("zizi3", n);
        if (SearchFromula == 'i(x)') { 
            

        }
        
        // break;
    }


    // let ParentFunction = SearchFromula.charAt(0);

    // tree6 = new Tree();
    // additional.allowPrint = false;
    // // parse the given fromula
    // var NewTreeToSeach = parsing(tree6, functions, SearchFromula, additional);
    // console.log("seach for", NewTreeToSeach);
    // var possiblePOsition = searchANDgetAnode(ParentFunction, tree.root)
    // // console.log("possible POsition", possiblePOsition)
    // for (let i = 0; i < possiblePOsition.length; i++) {

    //     FoundedNodes = getNOdebyPosition(tree.root, possiblePOsition[i]);
    //     var isMatchedTrees = checkEqualityOfTwoTrees(FoundedNodes, NewTreeToSeach.root);
    //     if (isMatchedTrees) {
    //         console.log("match pos", possiblePOsition[i]);
    //         // here you need to delete that posistion then add new tree
    //         deleteAt = 'pos';
    //         // remove node at given position and get the data
    //         deletedPositionFromTree = removeNodeAndGetData(tree.root, possiblePOsition[i], deleteAt);
    //         // create new node to be added in place of the old one
    //         tree7 = new Tree();
    //         var n = parsing(tree7, functions, replacedFormula, additional);
    //         additional.allowPrint = false;
    //         n.root.isfunction = false;
    //         n.root.isRoot = false;
    //         n.root.x = deletedPositionFromTree['x'][0];
    //         n.root.y = deletedPositionFromTree['y'][0];
    //         n.root.position = deletedPositionFromTree['node'][0];
    //         newPos = deletedPositionFromTree['parent'][0];
    //         // updating children potions for the new node
    //         updateChildren(n.root);
    //         // // add the new node
    //         addNodeTOPosition(newPos, tree.root, n.root);

    //         // console.log('new tree after replacement:',tree);
    //         printNewTree(tree.root, additional);
    //     }
    // }

}

function getVariablesfromRule(rule, functions) {
    var result = [];
    for (let i = 0; i < rule.length; i++) {
        val = rule[i];
        if (!functions.includes(val) && val != ")" && val != "(" && val != "/" && !result.includes(val)) {
            result.push(val);
        }
    }
    return result;
}

function unificationpairs(pairs, functions, additional) {
    //wtf
    // pairs = 'f(y,x)/f(x,i(e))'; //{ y->i(e) | x->i(e) }
    // pairs = 'f(x,y)/f(i(e),x)';
    // pairs = 'f(g(x,a),i(y))/f(g(i(b),a),x)';
    // functions = 'g/2,f/2,i/1,e/0,a/0,b/0';
    formulae = pairs.split('/');
    var rules = [];
    variableFromRules = getVariablesfromRule(pairs, functions);


    var result2 = unificationAlgo(formulae, rules, functions, variableFromRules);

    console.log("unified Ruleas ", result2);
}

function unificationAlgo(arr, rules, functions, variableFromRules) {
    // check if we have all variables 


    // create nodes for both right hand side and left handside
    additional.allowPrint = false;
    treelhs = new Tree();
    var lhs = parsing(treelhs, functions, arr[0], additional);
    treerhs = new Tree();
    var rhs = parsing(treerhs, functions, arr[1], additional);

    if ((lhs.root.value == rhs.root.value) && (lhs.root.children.length == rhs.root.children.length)) {
        // we have unifcation, Go over each childrem
        for (let i = 0; i < lhs.root.children.length; i++) {
            var leftValue = lhs.root.children[i].value;
            var rightValue = rhs.root.children[i].value;
            var leftFormula = getrestOfFormula(lhs.root.children[i]);
            var rightFormula = getrestOfFormula(rhs.root.children[i]);

            // when we have the same variables on both sides, don't add any thing
            if (leftValue == rightValue && variableFromRules.includes(leftValue)) {

                // do no thing 
            }
            // left hand side is variable
            else if (functions.includes(rightValue) && variableFromRules.includes(leftValue) && !rightFormula.includes(leftValue)) {
                console.log("variable = term");
                // check if we don't have that rule add it there
                if (!rules.hasOwnProperty(leftValue)) {
                    rules[leftValue] = rightFormula;
                    // substitute this rule in all right handside
                    rules = SubstituteVariableValue(rules, leftValue)
                }
                // check if we have two variables x=y then add two rules for x and y
                else if (rules.hasOwnProperty(leftValue) && variableFromRules.includes(rules[leftValue])) {
                    rules[rules[leftValue]] = rightFormula;
                    rules[leftValue] = rightFormula;
                    // substitute this rule in all right handside
                    rules = SubstituteVariableValue(rules, leftValue)
                }
                //
                else if (rules.hasOwnProperty(leftValue) && !variableFromRules.includes(rules[leftValue])) {
                    arr1 = [rules[leftValue], rightFormula];
                    var unifresult = unificationAlgo(arr1, rules, functions, variableFromRules);
                }
            }
            // right hand side is variable
            else if (functions.includes(leftValue) && variableFromRules.includes(rightValue) && !leftFormula.includes(rightValue)) {
                console.log("term = variable");
                // check if we don't have that rule add it there
                if (!rules.hasOwnProperty(rightValue)) {
                    rules[rightValue] = leftFormula;
                    // substitute this rule in all right handside
                    rules = SubstituteVariableValue(rules, rightValue)
                }
                // check if we have two variables x=y then add two rules for x and y
                else if (variableFromRules.includes(rules[rightValue]) && rules.hasOwnProperty(rightValue)) {
                    rules[rules[rightValue]] = leftFormula;
                    rules[rightValue] = leftFormula;
                    // substitute this rule in all right handside
                    rules = SubstituteVariableValue(rules, rightValue)
                }
                else if (!variableFromRules.includes(rules[rightValue]) && rules.hasOwnProperty(rightValue)) {
                    arr1 = [leftFormula, rules[rightValue]];
                    var unifresult = unificationAlgo(arr1, rules, functions, variableFromRules);
                }
            }
            // we have two function call back unif. algo.
            else if (functions.includes(rightValue) && functions.includes(leftValue) && leftFormula != rightFormula) {
                console.log("term1 = term2");
                arr1 = [leftFormula, rightFormula];
                var unifresult = unificationAlgo(arr1, rules, functions, variableFromRules);
            }
            // we have two different variables check if we have on of them, if not add x=y
            else if ((variableFromRules.includes(rightValue)) && (variableFromRules.includes(leftValue)) && (leftValue != rightValue)) {
                if (rules.hasOwnProperty(leftValue) && !rules[leftValue].includes(rightValue)) {
                    rules[rightValue] = rules[leftValue];
                    rules = SubstituteVariableValue(rules, rightValue)
                } else if (rules.hasOwnProperty(rightValue) && !rules[rightValue].includes(leftValue)) {
                    rules[leftValue] = rules[rightValue];
                    rules = SubstituteVariableValue(rules, leftValue);
                } else {
                    rules[leftValue] = rightValue;
                }
            }
        }
    }

    return rules;
}

function SubstituteVariableValue(rules, variable) {
    newValue = "";
    for (var i in rules) {
        if (rules[i].includes(variable)) {
            newValue = substituteVariableInRules(rules[i], variable, rules[variable]);
            console.log("resultaaaa0", newValue);
            rules[i] = newValue;
        }
        // if (i.length == 1 && rules[i].length == 1) {
        //     if (rules[i].includes(variable)) {
        //     }
        // }
        // console.log("ssss",i.length);
    }


    return rules;
}

function checkunificationRules(rules, variableFromRules) {
    for (let i = 0; i < variableFromRules.length; i++) {
        val = variableFromRules[i];
        if (!rules.hasOwnProperty(val)) {
            return false;
        }
    }
    return true;
}

function substituteVariableInRules(formula, variable, value) {
    var replacedValue = variable;
    var re = new RegExp(replacedValue, "g");
    var result = formula.replace(re, function (x) {
        return value;
    });
    // console.log("variable",variable);
    // console.log("term",term);
    // console.log("lstFormula",lstFormula);
    console.log("resultaaaaaa", result);
    return result;
}

function find2(str, find) {
    return str.split(find).length - 1;
}

function getpropertyOfvalue(obj, val) {
    for (var i in obj) {
        if (obj[i] == val) {
            return i;
        }
    }
    return '';
}

function checkSubstitution(rules,functions) {
    
    let temp = [];
    let result = false;
    temp = splitfunctions(rules, '/');
    if (temp[0].length == 1 && !functions.includes(temp[0])) { 
        result = true;
    }
    return result;
}
/*    ----------------------------------        some useful functions unsed        --------------------------------    */

// function updateChildren(zu) {


//     for (let i = 0; i < zu.children.length; i++) {
//         if (zu.children[i] != null) {
//             let counter = i + 1;
//             zu.children[i].position = zu.position + counter;
//             if(i == 0){
//                 zu.children[i].x = zu.x - 100 / zu.position.length;
//                 zu.children[i].y = zu.y + 50;
//             }else{
//                 zu.children[i].x = zu.children[i - 1].x + 200 /  zu.position.length;
//                 zu.children[i].y = zu.children[i - 1].y;
//             }
//             // zu.children[i].x = zu.x + (i+1) *20;
//             // zu.children[i].y = zu.y + (i+1) *20;;
//          }
//     }
// }


                    // if (Object.values(rules).includes(leftValue)) { 
                    //     // get property that has that value, then change the value of it by the value of that value
                    //     var property = getpropertyOfvalue(rules, leftValue);
                    //     rules[property] = rules[leftValue];
                    // }