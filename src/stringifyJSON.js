// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
// var toJSON = function (obj) {

//   var typeCheck = function (obj) {

//   }

//   var integerToString = function (obj) {
//     return String(obj);
//   }

//   var strToString = function (obj) {
//     var qutoer = /\"/;
//     return '"' + quoter.replace(obj, '\\"') + '"'
//   }

//   var arrayToString = function (obj) {

//   }

//   var type = typeCheck(obj);
//   if (type == 'array' || type == 'object') {
//     return toJson(obj);
//   }

// }


var stringifyJSON = function(obj) {
  //var miniresult = [];
  //var finalresult = [];
  // var placeholder;
  // var openbracket = 0;
  // var closebracket = 0;
  // var arrayopen = false;

  function checkType(x) {
    // if(typeof x == "function" || x == undefined) {
    //   return;
    // }
    if(typeof x == "number" || typeof x == "boolean" || x == null) {
      if (x === undefined) return '"null"';
      placeholder = String(x);
      return placeholder;
    }
    if(typeof x == "string") {
      placeholder = ['"' + x + '"'].join();
      return placeholder
    }
    
    if(typeof x == "object") {
      if(Array.isArray(x) == false) {
        if(x == {}) {
          return "{}";
        } else {
          return runThroughObject(x);
        };
      } else {
        if(x.length === 0) {
          return "[]"
        } else {
          return runThroughArray(x);
        }
      }
    }
  };
  
  function runThroughObject(o) {
    var values = [];
    var results = [];
    var i;

    var copy = {};
    for (var key in o) {
      if (o.hasOwnProperty(key)) {
        if (typeof o[key] == 'function' || typeof o[key] == 'undefined') continue;
        copy[key] = o[key];
      }
    }

    var keys = Object.keys(copy);

    for(i = 0; i < keys.length; i++) {
      values.push(checkType(copy[keys[i]]));
    }

    for(i = 0; i < keys.length; i++) {
      results.push('"' + keys[i] + '"' + ":" + values[i]);
    }

    // finalresult.push("{" + results.join() + "}");
    return "{" + results.join() + "}";
  };
      
  function runThroughArray(arr) {
    var memo = [];
    for (var i = 0; i < arr.length; i++) {
      memo.push(checkType(arr[i]));
    }
    memo = '[' + memo.join() + ']';
    return memo;
    


    //   if (Array.isArray(arr[i]) == false) {
    //     //if(i > 0) {results.push(",");}
    //     var thing = checkType(arr[i]);
    //     if (arr.length == 1) {
    //       miniresult.push("[" + thing + "]");
    //     } else if (i === 0) {
    //       miniresult.push("[" + thing);
    //     } else if (i == arr.length - 1) {
    //       miniresult.push(thing + "]");
    //     } else {
    //       miniresult.push(thing);
    //     }
    //   } else if ((arr[i]).length === 0 && i === 0) {
    //     miniresult.push("[[]");
    //   } else if ((arr[i]).length === 0) {
    //     miniresult.push("[]");
    //   } else {
    //     checkType(arr[i]);
    //   }
    // }
    // //finalresult.push("[" + miniresult.join() + "]");
    // finalresult.push(miniresult.join());
    // miniresult = [];
    // return finalresult.join("");
  };

    
    // while (openbracket > closebracket) {
    //   finalresult.push("]");
    //   closebracket++;
    // }
    
    
return checkType(obj);
};

//stringifyJSON([8,[[],3,4]])
