//Collections

_.each = function(list, iteratee) {
  if(Array.isArray(list)) {
    for (var i = 0; i < list.length; i++) {
      iteratee(list[i],i,list);
    }
  } else if (typeof list === 'object') {
    for (var key in list) {
      iteratee(list[key],key,list);
    }
  }
}

_.map = function(list, iteratee) {
  var results = [];
  if(Array.isArray(list)) {
    for(var i = 0; i < list.length; i++) {
      results.push(iteratee(list[i],i,list));
    }
  } else if (typeof list === 'object') {
    for(var key in list) {
      results.push(iteratee(list[key],key,list));
    }
  }
  return results;
}

_.reduce = function(list,iteratee,memo) {
  if(arguments.length < 3) {
    memo = list.shift();
  }
  if(Array.isArray(list)) {
    for(var i = 0; i < list.length; i++) {
      memo = iteratee(memo,list[i],i,list)
    }
  } else if (typeof list === 'object') {
    for (var key in list) {
      memo = iteratee(memo,list[key],key,list);
    }
  }
  return memo;
}

_.reduceRight = function(list,iteratee,memo) {
  if(arguments.length < 3) memo = list.shift();
  if(Array.isArray(list)) {
    for (var i = list.length-1; i >= 0; i--) {
      memo =iteratee(memo,list[i],i,list);
    }
  } else if (typeof list === 'object') {
    for(var key in list) {
      memo = iteratee(memo,list[key],key,list);
    }
  }
  return memo;
}

_.find = function(list, predicate) {
  for (var i = 0; i < list.length;i++) {
    if(predicate(list[i])) return list[i];
  }
  return undefined;
}

_.filter = function(list,predicate) {
  var results = [];
  for (var i = 0; i < list.length; i++) {
    if(predicate(list[i],i,list)) results.push(list[i]);
  }
  return results;
}





//Arrays

//First
_.first = function(array, n) {
  return n ? array.slice(0,n) : array[0];
}

_.initial = function(array,n) {
  return n ? array.slice(0,array.length-n) : array.slice(0,array.length-1);
}

_,last = function(array,n) {
  return n ? array.slice(array.length-n) : array[array.length-1];
}

_.rest = function(array, index) {
  return index ? array.slice(index) : array.slice(1);
}

//this is incomplete; returns the opposite of what it should. 
_.compact = function(array) {
  var results = [];
  for (var i = 0; i < array.length; i++) {
    if((array[i])) {
      results.push(array[i]);
    }
  }
  return results;
}

// The standard _.compact excludes false as well as falsy values. I think it would be useful to create a funciton that does something for only falsy (non-false) values. Whether it's as simple as _.compact but leaving in false, or turning those values into strings (we'd then presumably have a function that un-stringifies them too)
//I like the idea of stringifying 'falsy non-false' values, and then reconverting them after. 

_.falsyString = function(array) {
  var results = [];
  for (var i = 0; i < array.length; i++) {
    if(!(array[i]) && typeof array[i] !== 'boolean') {
      if(typeof array[i] === 'undefined') results.push('undefined');
      else if (typeof array[i] === 'string') results.push("''");
      else if (array[i] === 0) results.push('0');
      else if (typeof array[i] === 'number') results.push('NaN');
      else if (typeof array[i] === 'object') results.push('null');
      else {
        results.push(array[i]);
        console.log('you have found an edge case');
      }
    } else results.push(array[i]);
  }
  return results;
}

_.unFalsyString = function(array) {
  var results = [];
  for (var i = 0; i < array.length; i++) {
    if(typeof array[i] === 'string') {
      if(array[i] === 'undefined') results.push(undefined);
      else if (array[i] === "''") results.push('');
      else if (array[i] === '0') results.push(0);
      else if (array[i] === 'NaN') results.push(NaN);
      else if (array[i] === 'null') results.push(null);
      else results.push(array[i]);
    } else results.push(array[i]);
  }
  return results;
}

//ok, let's see if i can do flatten both recursively and non-recursively. 
//non-recursively: var while(countOfNonArrays !== array.length)
//basically, count the number of things in the array that are not arrays, and if this isn't equal to the length of the array, call a function on the array
//that function will iterate through the array, and flatten one level further

//the first implementation (below) works well for arrays only
_.flatten = function(array,shallow) {
  var results = [];

  //recursive flattener that only works for arrays currently
  var rFlattener = function(rInput, rKey) {
    if(Array.isArray(rInput)) {
      for (var i = 0; i < rInput.length; i++) {
        rFlattener(rInput[i]);
      }
    } else results.push(rInput);
  }

  //single-level flattener, only implemented for arrays currently
  if(arguments[1]) {
    for (var i = 0; i < array.length; i++) {
      if(Array.isArray(array[i])) {
        for (var j = 0; j < array[i].length; j++) {
          results.push(array[i][j]);
        }
      } else results.push(array[i]);
    }
  } else rFlattener(array);
  return results;
}

//supporting objects gets tricky when we have objects nested within objects: how do we display the key value pairs? 
//This implementation works, though it's not prettiest solution in the world. 
_.flatten = function(array,shallow) {
  var results = [];

  //recursive flattener that only works for arrays currently
  var rFlattener = function(rInput, rKey) {
    if(Array.isArray(rInput)) {
      for (var i = 0; i < rInput.length; i++) {
        rFlattener(rInput[i]);
      }
    } else if (typeof rInput === 'object') {
      for (var key in rInput) {
        results.push('key: ' + key);
        rFlattener(rInput[key],key);
      }
    } else if(rKey) {
      results.push('value: ' + rInput);
    } else results.push(rInput);
  }

  //single-level flattener, only implemented for arrays currently
  if(arguments[1]) {
    for (var i = 0; i < array.length; i++) {
      if(Array.isArray(array[i])) {
        for (var j = 0; j < array[i].length; j++) results.push(array[i][j]);
      } else results.push(array[i]);
    }
  } else rFlattener(array);
  return results;
}

//this implementation is non-recursive, just for the heck of it, and handles arrays only for simplicity
//this does not quite work yet. 
pflatten = function(array) {
  var results = [];
  var notArrayCount = 0;

  for (var i = 0; i < array.length; i++) {
    results.push(array[i]);
    if(!(Array.isArray(array))) {
      notArrayCount += 1;
    }
  }

  while(notArrayCount !== results.length) {
    notArrayCount = 0;
    var tempResults = [];
    for (var j = 0; j < results.length; j++) {
      if(Array.isArray(array[j])) {
        for (var k = 0; k < array[j].length; k++) {
          tempResults.push(array[j][k]);
          if(!(Array.isArray(array[j][k]))) notArrayCount +=1;
        }
      } else {
        tempResults.push(array[j]);
        notArrayCount +=1;
      }
    }
    results = tempResults;
  }

  return results;
}

//could probably be refactored to use filter or every
_.without = function(array) {
  var results = [];
  for (var i = 0; i < array.length; i++) {
    var isUnique = true;
    for (var j = 1; j < arguments.length; j++) {
      if(arguments[j] === array[i]) {
        isUnique = false;
      }
    }
    if(isUnique) results.push(array[i]);
  }
  return results;
}

//currently this implementation checks if the number is present in at least two of the arrays. this definition does not strictly match any of the underscore functions
_.looseIntersection = function() {
  var nums = _.flatten(arguments);
  var results = [];
  for (var i = 0; i < nums.length-1; i++) {
    for (var j = i + 1; j < nums.length; j++) {
      if (nums[i] === nums[j]) {
        results.push(nums[i]);
      }
    }
  }
  return _.uniq(results);
}

_.union = function() {
  return _.uniq(_.flatten(arguments));
}

_.intersection = function() {
  //start the results array with the values of the first input array. it can never grow from here, only shrink
  var results = arguments[0];
  //iterate through each following array. check whether all elements of the results array are still present
  for (var i = 1; i < arguments.length; i++) {
    //within each of the arguments arrays, check to make sure they contain everything in the results array
    for(var j = 0; j < results.length; j++) {
       if(_.contains(arguments[i],results[j]) === false) {
         results.splice(j,1);
         j = j-1;
       }
    }
  }
  return results;
}

_.difference = function(list) {
  var results = list;
  for (var i = 1; i < arguments.length; i++) {
    for (var j = 0; j < results.length; j++) {
      if (_.contains(arguments[i],results[j]) === true) {
        results.splice(j,1);
        j = j-1;
      }
    }
  }
  return results;
}

_.uniq = function(array) {
  var results = [];
  for (var i = 0; i < array.length; i++) {
    if(_.contains(results,array[i]) === false) {
      results.push(array[i]);
    }
  }
  return results;
}

_.zip = function() {
  var results = [];
  for (var i = 0; i < arguments[0].length; i++) {
    var innerResult = [];
    for (var j = 0; j < arguments.length; j++) {
      innerResult.push(arguments[j][i]);
    }
    results.push(innerResult);
  }
  return results;
}


_.object = function(list, values) {
  var results = {};
  if(values) {
    for (var i = 0; i < list.length; i++) {
      results[list[i]] = values[i];
    }
  } else {
    for (var j = 0; j < list.length; j++) {
      results[list[j][0]] = list[j][1];
    }
  }
  return results;
}

_.indexOf = function(array, value) {
  for (var i = 0; i < array.length; i++) {
    if (array[i] === value) return i;
  }
  return -1;
}


_.lastIndexOf = function(array,value) {
  for (var i = array.length-1; i >=0; i--) {
    if(array[i] === value) return i;
  }
  return -1;
}


_.sortedIndex = function(list, value) {
  var direction = (list[1] - list[0] > 0) ? 'asc' : 'desc';
  for (var i = 0; i < list.length; i++) {
    if((direction === 'asc' && list[i] >= value) || (direction === 'desc' && list[i] <= value)) {
      return i;
    }
  }
  return -1;
}

//does not support negative numbers yet. 
_.range = function(start,stop,step) {
  var results = [];
  if(arguments.length === 1) {
    stop = start;
    step = 1;
    start = 0;
  } else if (arguments.length === 2) {
    if (stop < start) {
      step = stop;
      stop = start;
      start = 0;
    } else step = 1;
  }

  for (var i = start; i < stop; i += step) {
    results.push(i);
  }
  return results;
}


























