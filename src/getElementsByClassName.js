// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  // var results = [];
  // var walkDOM = function(node) {
  // 	if (node.classList !== undefined && node.classList.contains(className)) {
  // 		results.push(node);
  // 	}
  // 	if (node.hasChildNodes) {
  // 		var children = node.childNodes;
  // 		for (var i = 0; i < children.length; i++) {
  // 			walkDOM(children[i]);
  // 		}
  // 	}
  // }
  // walkDOM(document.body);
  // return results;

  var results = [];
  var getKids = function(node) {
    if (node.classList !== undefined && node.classList.contains(className)) {
      results.push(node);
    }
    if (node.hasChildNodes) {
      var children = node.childNodes;
      for (var i = 0; i < children.length; i ++) {
        if (children[i].classList !== undefined && children[i].classList.contains(className)) {
          results.push(children[i]);
        }
      for (var i = 0; i < children.length; i ++) {
        getKids(children[i]);
      }
      }
    }
  };
  return getKids(document.body);
};
