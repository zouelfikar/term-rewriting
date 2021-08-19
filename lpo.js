var zu = 'f(f(f(x,u),i(x)),f(e,y))'
// get all the children of root node as formulae
var x = /[(](.+)[)]/.exec(zu)[1]
//get the first child or get fase if it has only variables
parsing = getFirstChild(x)
if(parsing!=false){
  first = parsing[0]
  rest=parsing[1]
}else{
  // do split by comma
}
console.log(first);




function getFirstChild(formula) {
  var res = ''
  var counter = null
  var found = false;
  var result =[];
  for (var i = 0; i < formula.length; i++) {
    if (formula[i] == '(') {
      counter += 1
    }
    if (formula[i] == ')') {
      counter -= 1
    }
    if (counter == 0) {
      found = true;
      res = i
      break
    }
  }
  if(found){
  res1 = formula.substring(0, res + 1)
  res2 = formula.substring(res + 2, formula.length)
  result.push(res1)
  result.push(res2)

  }else{
      console.log('do split be comma');
      return false;
  }

  // console.log(res2)
  return result
}
