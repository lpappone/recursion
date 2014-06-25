// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:
var getElementsByClassName = function(className){
  var results = [];
  var walkDOM = function(node) {
  	if (node.classList !== undefined && node.classList.contains(className)) {
  		results.push(node);
  	}
  	if (node.hasChildNodes) {
  		var children = node.childNodes;
  		for (var i = 0; i < children.length; i++) {
  			walkDOM(children[i]);
  		}
  	}
  }
  walkDOM(document.body);
  return results;
};
