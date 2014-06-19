// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:
var stringifyJSON = function(obj) {
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
      return runThroughObject(x);
    }
  };
  
  function runThroughObject(obj) {
    var keys = [];
    var values = [];
    var results = [];
    if(Array.isArray(obj) == false) {
      for(var k in obj) {
        keys.push(String(k));
      }
      for(i = 0; i < keys.length; i++) {
        var thing = checkType((obj[keys[i]]));
        values.push(String(thing));
      }
      for(i = 0; i <keys.length; i++) {
        results.push(keys[i]);
        results.push(": ");
        results.push(values[i]);
      }
      finalresult.push("{" + results.join("") + "}");
    } else {
        console.log(obj);
        console.log(finalresult);
        if(Array.isArray(obj) == true && obj.length === 0) {
          if(arrayopen) {
            finalresult.push("]");
            closebracket++;
          } else {
            finalresult.push("[]");
            openbracket++;
            closebracket++;
          }
          
        }
        for (i = 0; i < obj.length; i++) {
          //console.log(obj.length);
          if (Array.isArray(obj[i]) == false) {
            if (i === 0) {
              finalresult.push("[");
              openbracket++;
            }
            //if(i > 0) {results.push(",");}
            var thing = checkType(obj[i]);
            if (i < obj.length - 1) {
              results.push(thing + ",");
            } else {
              results.push(thing);
            }
            if(i >= obj.length - 1) {
              results.push("]");
              arrayopen = false;
              closebracket++;
            }
            finalresult.push(results.join(""));
            results = [];
          } else { 
            if (Array.isArray(obj[i])== true) {
              finalresult.push("[");
              arrayopen = true;
              openbracket++
            }
            checkType(obj[i]);
          }
          
        }
    }
    
    // while (openbracket > closebracket) {
    //   finalresult.push("]");
    //   closebracket++;
    // }
    
    return finalresult.join("");
  };
  return checkType(obj);
};

//stringifyJSON([8,[[],3,4]])
