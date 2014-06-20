// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
  var miniresult = [];
  var finalresult = [];
  var placeholder;
  var openbracket = 0;
  var closebracket = 0;
  var arrayopen = false;

  function checkType(x) {
    if(typeof x == "number" || typeof x == "boolean" || x == null) {
      // finalresult.push(String(x));
      // return finalresult.join();
      placeholder = String(x);
      return placeholder;
    }
    if(typeof x == "string") {
      // finalresult.push(x);
      // return finalresult.join();
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
    var keys = [];
    var values = [];
    var results = [];
    if(Array.isArray(o) == false) {
      for(var k in o) {
        keys.push(String(k));
      }
      for(i = 0; i < keys.length; i++) {
        var thing = checkType((o[keys[i]]));
        values.push(String(thing));
      }
      for(i = 0; i <keys.length; i++) {
        results.push(keys[i]);
        results.push(": ");
        results.push(values[i]);
      }
      finalresult.push("{" + results.join("") + "}");
    }
  };
      
  function runThroughArray(arr) {
    for (var i = 0; i < arr.length; i++) {
      if (Array.isArray(arr[i]) == false) {
        //if(i > 0) {results.push(",");}
        var thing = checkType(arr[i]);
        if (arr.length == 1) {
          miniresult.push("[" + thing + "]");
        } else if (i === 0) {
          miniresult.push("[" + thing);
        } else if (i == arr.length - 1) {
          miniresult.push(thing + "]");
        } else {
          miniresult.push(thing);
        }
      } else if ((arr[i]).length === 0 && i === 0) {
        miniresult.push("[[]");
      } else if ((arr[i]).length === 0) {
        miniresult.push("[]");
      } else {
        checkType(arr[i]);
      }
    }
    //finalresult.push("[" + miniresult.join() + "]");
    finalresult.push(miniresult.join());
    miniresult = [];
    return finalresult.join("");
  };

    
    // while (openbracket > closebracket) {
    //   finalresult.push("]");
    //   closebracket++;
    // }
    
    
return checkType(obj);
};

//stringifyJSON([8,[[],3,4]])
