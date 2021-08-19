// Tree object

var deletedParentPositions = [];
var deletedNodePositions = [];
var deletedX = [];
var deletedY = [];
var deletedValue = [];
var result12 = [];

var result;
function Tree() {
  // Just store the root
  this.root = null;
}

// Add a new value to the tree
Tree.prototype.addValue = function (val, additional) {
  // add number of children
  var numberOfChildren;
  if (additional.numberOfChildren[val] !== undefined) {
    numberOfChildren = additional.numberOfChildren[val];
  } else {
    numberOfChildren = 0;
  }

  if (this.root == null) {
    additional.isRoot = true;
    var n = new Node(val, additional);
    this.root = n;
    this.root.x = width / 2;
    this.root.y = 30;
    return '0';
  } else {
    additional.isRoot = false;
    additional.position = '0';
    var n = new Node(val, additional);
    this.root.addNode(n, additional);
    if (n.position == '0') {
      return false;
    }
    return n.position;
  }
}

// Start by visiting the root
Tree.prototype.missing = function (additional) {
  //checking missing node
  this.root.checkMissingValues(additional);
}


Tree.prototype.printTree = function (additional) {
  additional.type = type;
  //checking missing node
  this.root.printNodes(additional, this.root);
}

/*    ----------------------------------       other features        --------------------------------    */

// to print tree not from root
function printNewTree(node, additional) {

  node.printNodes(additional, node);
}

// Start by searching the root
Tree.prototype.searchANDPrint = function (pos, additional) {
  this.root.searchFofNodePrint(pos, additional);
}

function searchANDgetAnode(value, element) {
  if (element.value == value && !result12.includes(element.position)) {
    result12.push(element.position);
  }
  if (element.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      searchANDgetAnode(value, element.children[i]);
    }
  }

  return result12;
}



function removeChildren(parent, pos) {
  if (!parent.children)
    return;

  var i = 0;
  while (i < parent.children.length) {

    if (parent.children[i].position == pos) {
      // remove child - could save it in _children if you wanted to ever put it back
      var child = parent.children.splice(i, 1);
      // length of child list reduced, i points to the next child
    }
    else {
      // not a bye - recurse
      removeChildren(parent.children[i], pos);
      // all the child's bye's are removed so go to the next child
      i++;
    }
  }
}

function reductionReplaceNode(element, rootvalue, childrenArr, val, deleteAt) {

  if (element.position == val) {
    // console.log("sssdasdas",rootvalue);
    element.value = rootvalue;
    console.log("zzz", childrenArr);
    element.children = childrenArr;
    // return true;
  } else if (element.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = reductionReplaceNode(element.children[i], rootvalue, childrenArr, val, deleteAt);
    }
  }
}
function removeNodeAndGetData(parent, val, deleteAt) {
  if (!parent.children)
    return;

  var i = 0;

  while (i < parent.children.length) {
    // when we search by value
    if (parent.children[i].value == val && deleteAt == 'value') {
      deletedX.push(parent.children[i].x)
      deletedY.push(parent.children[i].y)
      deletedValue.push(parent.children[i].value)
      deletedNodePositions.push(parent.children[i].position)
      // remove child - could save it in _children if you wanted to ever put it back
      var child = parent.children.splice(i, 1);
      deletedParentPositions.push(parent.position);
    }
    // when we search by position
    else if (parent.children[i].position == val && deleteAt == 'pos') {
      deletedX.push(parent.children[i].x)
      deletedY.push(parent.children[i].y)
      deletedValue.push(parent.children[i].value)
      deletedNodePositions.push(parent.children[i].position)
      // remove child - could save it in _children if you wanted to ever put it back
      var child = parent.children.splice(i, 1);
      deletedParentPositions.push(parent.position);
    } else {
      removeNodeAndGetData(parent.children[i], val, deleteAt);
      i++;
    }
  }
  result = { parent: deletedParentPositions, node: deletedNodePositions, x: deletedX, y: deletedY, value: deletedValue };

  return result;
}

function addNodeTOPosition(pos, element, n) {
  if (element.position == pos) {
    element.children.push(n);
  } else if (element.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = addNodeTOPosition(pos, element.children[i], n);
    }
  }
}

function LPOCalculator(S_tree, T_tree, S_variable, T_variable, orderedFunctions) {

  //LPO1
  if (T_tree.children.length == 0 && S_variable.includes(T_tree.value) && T_tree.value != S_tree.value) {
    return true;
  }

  // LPO2
  if (!S_variable.includes(S_tree.value) && !T_variable.includes(T_tree.value)) {

    if (S_tree.value != T_tree.value) {

      //LPO2a
      if (S_tree.children.some(x => LPOCalculator(x, T_tree, S_variable, T_variable, orderedFunctions) || x.value === T_tree.value)) {
        return true;
      }

      //LPO2b
      if ((orderedFunctions[S_tree.value] > orderedFunctions[T_tree.value]) &&
        (T_tree.children.every(x => LPOCalculator(S_tree, x, S_variable, T_variable, orderedFunctions)))) {
        return true;
      }

    } else
      //LPO2c
      if ((orderedFunctions[S_tree.value] == orderedFunctions[T_tree.value]) &&
        (T_tree.children.every(x => LPOCalculator(S_tree, x, S_variable, T_variable, orderedFunctions)))) {

        for (let i = 0; i < S_tree.children.length; i++) {
          var Schild = S_tree.children[i];
          var Tchild = T_tree.children[i];
          if (Schild.value == Tchild.value) {
            continue;
          }
          return LPOCalculator(S_tree.children[i], T_tree.children[i], S_variable, T_variable, orderedFunctions)
        }
      }
    
  }
  // return false;
}




function getNOdebyPosition(element, pos) { 
  // console.log
    if (element.position == pos) {
    // //retrun the node
    // return element;
    // // retrun just true that we found it
    return element;
  } else if (element.children != null) {
    var i;
    var result = null;
    for (i = 0; result == null && i < element.children.length; i++) {
      result = getNOdebyPosition(element.children[i],pos);
    }
    return result;
  }
  return null;

}

function checkEqualityOfTwoTrees(first, second) { 

  if (first.value != second.value) {
    return false;
  }
  if (first.children != null && first.children.length == second.children.length) {
    var i;
    var result = null;
    for (i = 0; result == null && i < first.children.length; i++) {
      var found33 = checkEqualityOfTwoTrees(first.children[i], second.children[i]);
      if (!found33) { 
        return false;
      }
    }
  }

  return true;
}


function getrestOfFormula(parent) { 
  

  // if (parent.isSubTree == false) { 
  //   return "";
  // }

  currentChar = parent.value;

  if (parent.children != undefined && parent.children.length == 0) {
    return currentChar;
  }

  if (parent.children.length == 1) {
    return currentChar + '(' + getrestOfFormula(parent.children[0]) + ')';
  }

  if (parent.children.length == 2) {
    return currentChar + '(' + getrestOfFormula(parent.children[0]) + "," +
      getrestOfFormula(parent.children[1]) + ')';
  }
  // temporaryFromlua = temporaryFromlua.concat(parent.value);
  // console.log("sss",curr);
  return currentChar;
  // temporaryFromlua = temporaryFromlua.concat("(");
  // console.log(temporaryFromlua);
}

// function checkEqualityOfTwoTrees(first, second) { 
//   console.log(first.children.length);
//   console.log(second.children.length);
//   // if (first.value == second.value) {
//     if (first.children.length == second.children.length && first.children.length == 0 && first.value == second.value) { 

//     return true;
//   }

//   if (first.children.length == second.children.length && first.children.length != 0) { 
//     for (let i = 0; i < first.children.length; i++) {
//       var Schild = first.children[i];
//       var Tchild = second.children[i];
//       if (Schild.value != Tchild.value) {
//         return false;
//       }
//       checkEqualityOfTwoTrees(first.children[i], second.children[i]);
//     }
//   }
//   return false;
//   // console.log(newNode)
//   // console.log(NewTree)
// }

// function searchANDgetAnode(value, element) {
//   if (element.value == value) {
//     // //retrun the node
//     // return element;
//     // // retrun just true that we found it
//     return true;
//   } else if (element.children != null) {
//     var i;
//     var result = null;
//     for (i = 0; result == null && i < element.children.length; i++) {
//       result = searchANDgetAnode(value, element.children[i]);
//     }
//     return result;
//   }
//   return null;
// }



/*    ----------------------------------       other way        --------------------------------    */

// function CreateTree (formula, functionObjects){
//   newFormula = substitList[property];
//   newchar = newFormula.charAt(0);
//   restOfFormula = formula.slice(1, formula.length);
//   // create the root Node
//   newRoot = new Node(newchar, additional);
//   var parents = [];
//   parents.push(newchar);
//   for (var i = 0; i < newFormula.length; i++) {
//     tempChar = newFormula.charAt(i);
//     switch (tempChar) {
//       case '(':
//         parents.push(newchar);
//         break;
//       case ')':
//         parents.splice(-1, 1);

//         break;

//       default:
//         newRoot = new Node(newchar, additional);

//         break;
//     }
//   }

// }

// var Tree2 = function () {
//   Tree2.obj = {};
//   return Tree2;
// };

// // Parent Will be object
// Tree2.AddChild = function (parent, child) {

//   if (parent === null) {
//       if (Tree2.obj.hasOwnProperty(child)) {
//           return Tree2.obj[child];
//       } else {
//         Tree2.obj[child] = {};
//           return Tree2.obj[child];
//       }
//   } else {
//       parent[child] = {};
//       return parent[child];
//   }
// };

/*    // Uses

    // Inserting -
    var t = Tree();
    var twoDoor = t.AddChild(null, "2 Door");
    var fdoor = t.AddChild(null, "4 Door");
    t.AddChild(fdoor, "manual");
    t.AddChild(twoDoor, "automatic");
    var man = t.AddChild(twoDoor, "manual");
    t.AddChild(man, "Extended Cab");
    console.log(t.obj);

 */
/*    ----------------------------------        some useful functions unsed        --------------------------------    */


// Start by searching the root then delete at posstion
// Tree.prototype.deleteANode = function (tree,pos,additional) {
//   // delele node
//   var newTree = this.root.deleteAt(tree, pos, additional);
//   return newTree;
// }





// // another work - not used
// function addNode2 (val, parentPos){
//   var n = new Node(val, additional);
//   n.value = 

// parentNode = searchANDgetAnode(pos, this.root);

// // get the parent node node.parent

// // node.parent = parentNode;
// parentNode.children.push(node);

// }
// // using in search/treeController - another way not used for now 
// function printANode (parent, Node,additional) {
//   additional.type = type;
//   additional.firstParentNodeLines = true;
//   //checking missing node
//   Node.printNodes(additional, parent);
// }    
