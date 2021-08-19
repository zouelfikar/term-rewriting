
// Node in the tree
function Node(val, additional) {
  let numberOfChildren;
  this.value = val;
  this.x = 0;
  this.y = 0;
  this.isClosed = false;
  this.isOverload = false;
  this.added = false;
  this.position = '0';
  this.isRoot = additional.isRoot;
  this.isFunctions = additional.isFunction;
  // create node regarding to number of children
  this.children = [];
  if (additional.isFunction == true) {
    numberOfChildren = additional.numberOfChildren[val];
    for (let i = 0; i < numberOfChildren; i++) {
      this.children[i] = null;
    }
  }
  if (this.children.length > 0) {
    this.isSubTree = true;
  } else { 
    this.isSubTree = false;
  }


}

// Add a node
Node.prototype.addNode = function (n, additional) {

  let lastParentLength = additional.lastParent.length - 1;
  let lastParent = additional.lastParent[lastParentLength];
  let NOCzz = this.children.length;
  let tempzz = 0;
  let tempaa = false;
  let index = additional.LastParentPosition.length - 1;
  //get parent positions
  let parentPosition = additional.LastParentPosition[index];

  if (additional.firstChild == true) {
    for (let i = 0; i < this.children.length; i++) {
      if (
        this.position == parentPosition
      ) {
        n.x = this.x - 100 / parentPosition.length;
        n.y = this.y + 50;
        this.children[0] = n;
        this.children[0].position = this.position + 1;
      }
      else if (this.children[i] != null) {
        // additional.position = this.children[i].position;
        this.children[i].addNode(n, additional);
      }
    }
  }

  if (additional.newChild == true) {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i] == null &&
        this.position == parentPosition
      ) {
        if (i != 0) {
          n.x = this.children[i - 1].x + 200 / parentPosition.length;
          n.y = this.children[i - 1].y;
        }
        this.children[i] = n;
        let temp2 = i + 1;
        this.children[i].position = this.position + temp2;
      } else if (this.children[i] != null) {
        // let temp4 = additional.getBack + 1;
        // let temp3 = this.children[i].position.substring(0, this.children[i].position.length - temp4)
        // additional.position = temp3;
        // additional.status = true;
        this.children[i].addNode(n, additional);
      }
    }
  }

  for (let i = 0; i < this.children.length; i++) {
    if (this.children[i] != null) {
      // console.log(this.children.length);  
      tempzz++;
    }
  }

  if (NOCzz == tempzz && NOCzz != 0) {
    this.isClosed = true;
  }

}

// checking for missing node
Node.prototype.checkMissingValues = function (additional) {
  for (let i = 0; i < this.children.length; i++) {
    if (this.children[i] != null) {
      this.children[i].checkMissingValues(additional);
    } else {
      console.log("######   ERROR   #####");
      console.log("one parameter is missing for function", this.value, "on poistion", this.position);
    }
  }
}

// print each node
Node.prototype.printNodes = function (additional, parent) {
  fill(255);
  noStroke();
  if (additional.type == 'value') {
    textSize(24);
    text(this.value, this.x - 5, this.y + 30);
  } else {
    text(this.position, this.x, this.y + 20);
  }
  stroke(255);
  ellipse(this.x, this.y, 20, 20)
  line(parent.x, parent.y, this.x, this.y);
  for (let i = 0; i < this.children.length; i++) {
    if (this.children[i] != null) {
      this.children[i].printNodes(additional, this);
    }
  }

}

// Search the tree for a value
Node.prototype.searchFofNodePrint = function (pos, additional) {
  if (this.position == pos) {
    console.log("Node at position:", pos);
    console.log(this);
    if (additional.searchOnly == true) {
      return true;
    } else {
      return this.printNodes(additional, this);
    }

  }

  for (let i = 0; i < this.children.length; i++) {
    if (this.children[i] != null) {
      this.children[i].searchFofNodePrint(pos, additional);
    }
  }
}
























/*    ----------------------------------        some useful functions unsed        --------------------------------    */







    // Node.prototype.deleteAt = function (tree, pos, additional) {


    //   var i = 1;

    //   switch (pos.length) {
    //     case 0:
    //       alert("please add a node's position to delete 0");
    //       break;

    //     case 1:
    //       // alert("you deleted the whoe ");
    //       console.log("you deleted the whole tree");
    //       tree.root = null;
    //       break;


    //     case 2:
    //       levelOnePosition = pos.charAt(i) - 1;
    //       tree.root.children[levelOnePosition] = null;
    //       break;


    //     case 3:
    //       levelOnePosition = pos.charAt(i) - 1;
    //       levelTwoPosition = pos.charAt(i + 1) - 1;
    //       tree.root.children[levelOnePosition].children[levelTwoPosition] = null;

    //       break;


    //     case 4:
    //       levelOnePosition = pos.charAt(i)-1;
    //       levelTwoPosition = pos.charAt(i + 1)-1;
    //       levelThreePosition = pos.charAt(i + 2)-1;
    //       tree.root.children[levelOnePosition].children[levelTwoPosition].children[levelThreePosition] = null;
    //       break;


    //     case 5:
    //       levelOnePosition = pos.charAt(i)-1;
    //       levelTwoPosition = pos.charAt(i + 1)-1;
    //       levelThreePosition = pos.charAt(i + 2)-1;
    //       levelfourPosition = pos.charAt(i + 3)-1;
    //       tree.root.children[levelOnePosition].children[levelTwoPosition].children[levelThreePosition].children[levelfourPosition] = null;
    //       break;


    //     case 6:
    //       levelOnePosition = pos.charAt(i)-1;
    //       levelTwoPosition = pos.charAt(i + 1)-1;
    //       levelThreePosition = pos.charAt(i + 2)-1;
    //       levelfourPosition = pos.charAt(i + 3)-1;
    //       levelfivePosition = pos.charAt(i + 4)-1;
    //       tree.root.children[levelOnePosition].children[levelTwoPosition].children[levelThreePosition].children[levelfourPosition].children[levelfivePosition] = null;
    //       break;


    //     case 7:
    //       levelOnePosition = pos.charAt(i)-1;
    //       levelTwoPosition = pos.charAt(i + 1)-1;
    //       levelThreePosition = pos.charAt(i + 2)-1;
    //       levelfourPosition = pos.charAt(i + 3)-1;
    //       levelfivePosition = pos.charAt(i + 4)-1;
    //       levelsixPosition = pos.charAt(i + 5)-1;
    //       tree.root.children[levelOnePosition].children[levelTwoPosition].children[levelThreePosition].children[levelfourPosition].children[levelfivePosition].children[levelsixPosition] = null;
    //       break;
    //   }



    //   return tree;
    // }

// 
// Search and Delete
// Node.prototype.deleteAt = function (tree, pos, additional) {
//   if (!this.children)
//     return;

//   var i = 0;
//   while (i < this.children.length) {
//     var data = this.children[i];
//     // console.log(this.position);

//     if (this.position == pos) {
//           console.log(tree);

//       // remove child - could save it in _children if you wanted to ever put it back
//       // tree.children.splice(i, 1);
//       // console.log(tree);

//       // length of child list reduced, i points to the next child
//     }
//     else {
//       // not a bye - recurse
//       this.children[i].deleteAt(this, pos, additional);
//       // all the child's bye's are removed so go to the next child
//       i++;
//     }
//   }
// }


// for search 
//   if (this.position== pos) {
//     return this.printNodes(additional, this);
//   } else if (this.children != null) {
//     var result = null;
//     for (let i = 0; result == null && i < this.children.length; i++) {
//       result = this.children[i].search(tree, pos, additional);
//     }
//     return result;
//   }
//   return null;




// Node.prototype.search = function (val) {
//   console.log(this.position);
//   if (this.value == val) {
//     return this;
//   } else if (val < this.value && this.left != null) {
//     return this.left.search(val);
//   } else if (val > this.value && this.right != null) {
//     return this.right.search(val);
//   }
//   return null;
// }