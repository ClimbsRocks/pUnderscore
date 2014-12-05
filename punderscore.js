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


_.where = function(list, properties) {
  var results = [];
  for (var i = 0; i < list.length; i++) {
    var isEqual = true;
    for(var key in properties) {
      if(list[i][key] !== properties[key]) isEqual = false;
    }
    if(isEqual) results.push(list[i]);
  }
  return results;
}

_.findWhere = function(list, properties) {
  for (var i = 0; i < list.length; i++) {
    var isEqual = true;
    for (var key in list) {
      if(list[i][key] !== properties[key]) isEqual = false;
    }
    if(isEqual) return list[i];
  }
  return undefined;
}

_.reject = function(list, predicate) {
  return _.filter(list,function(item) {
    if(!(predicate(item))) return true;
  });
}

_.every = function(list,predicate) {
  return _.reduce(list,function(memo,value,index,list) {
    if(predicate(value) && memo) return true;
    else return false;
  },true);
}

_.some = function(list, predicate) {
  for(var i = 0; i < list.length; i++) {
    if(predicate(list[i])) return true;
  }
  return false;
}

_.contains = function(list,value) {
  var result = false;
  _.each(list,function(num) {
    if (num === value) result = true;
  });
  return result;
}

//skipping invoke to avoid using call and apply
_.invoke = function(list, methodName) {
  _.each(list,methodName)
}

_.pluck = function(list, propertyName) {
  return _.map(list, function(value) {
    return value[propertyName];
  });
}

_.max = function(list, iteratee) {
  var max=list[0];
  if(iteratee) {
    _.each(list,function(item) {
      if(iteratee(item) > iteratee(max)) max = item;
    })
  } else {
    for (var i = 0; i < list.length; i++) {
      if(list[i] > max) max = list[i];
    }
  }
  return max;
}


_.min = function(list, iteratee) {
  var min=list[0];
  if(iteratee) {
    _.each(list,function(item) {
      if(iteratee(item) < iteratee(min)) min = item;
    })
  } else {
    for (var i = 0; i < list.length; i++) {
      if(list[i] < min) min = list[i];
    }
  }
  return min;
}

//This implementation didn't work. 
_.sortBy = function(list, iteratee) {
  var results = [];
  var listLength = list.length;
  if(typeof iteratee === 'string') {
    console.log('entered a string');
    for(var i = 0; i < listLength; i++) {
      console.log('total results: ' + list.splice(_.indexOf(_.min(list, function(input) {return input[iteratee];})),1));
      console.log('min: ' + _.min(list, function(input) {return input[iteratee];}));
      results.push(list.splice(_.indexOf(list, _.min(list, function(input) {return input[iteratee];})),1));
    }
  } else if (typeof iteratee == 'function') {
    return 'this is a solemn function.';
  }
  return results;
}

_.sortBy = function(list, iteratee) {
  var results = [];
  var listLength = list.length;
  if(typeof iteratee === 'string') {
    //create a new list that has passed through the iteratee and is thus the numbers we want to sort by
    var iterateedList = _.map(list,function(item) {
      return item[iteratee];
    });
    //this loops the number of times that we have items, it does not actually iterate through the list
    for(var i = 0; i < listLength; i++) {
      //find the minimum within this list of values that we're sorting by
      var position = _.indexOf(iterateedList,_.min(iterateedList));
      iterateedList.splice(position,1);
      results.push(list.splice(position,1)[0]);
    }

  } else if (typeof iteratee === 'function' ) {
    console.log('iteratee is a function');
    for(var i = 0; i < listLength; i++) {
      results.push(list.splice(_.indexOf(list,_.min(list,function(item) {
        return iteratee(item);
      })),1)[0]);
    }
  }
  return results;
}
//test: _.sortBy([[1,2,3],[1,2],[1],[1,2,3,4,5]],'length');


_.groupBy = function(list, iteratee) {
  var results = {};
  if(typeof iteratee === 'string') {
    for(var i = 0; i < list.length; i++) {
      var currentKey = list[i][iteratee];
      if(results[currentKey]) {
        results[currentKey].push(list[i]);
      } else {
        results[currentKey] = [list[i]];
      }
    }
  } else if (typeof iteratee === 'function' ) {
    for (var i = 0; i < list.length; i++) {
      var currentKey = iteratee(list[i]);
      if(results[currentKey]) {
        results[currentKey].push(list[i]);
      } else results[currentKey] = [list[i]];
    }
  }
  return results;
}

_.indexBy = function(list, iteratee) {
  var results = {};
  for(var i = 0; i < list.length; i++) {
    var currentKey;
    if(typeof iteratee === 'string' ) {
      currentKey = list[i][iteratee];
    } else if (typeof iteratee === 'function') {
      currentKey = iteratee(list[i]);
    }
    results[currentKey] = list[i];
  }
  return results;
}

_.countBy = function(list, iteratee) {
  var groupedArray = _.groupBy(list,iteratee);
  for (var key in groupedArray) {
    groupedArray[key] = groupedArray[key].length;
  }
  return groupedArray;
}

_.shuffle = function(list) {
  var results = [];
  var listLength = list.length;
  for (var i = 0; i < listLength; i++) {
    var randomNumber = Math.floor(Math.random()*list.length);
    results.push(list.splice(randomNumber,1)[0]);
  }
  return results;
}

_.sample = function(list, n) {
  var randomList = _.shuffle(list);
  if(n) return randomList.slice(0,n)
  else return randomList[0];
}

_.toArray = function(list) {
  var results = [];
  for (var i =0; i < list.length; i++) {
    results.push(list[i]);
  }
  return results;
}

_.size = function(list) {
  return list.length === +list.length ? list.length : _.keys(list).length;
}

_.partition = function(array,predicate) {
  var results1 = _.filter(array,predicate);
  var results2 = _.filter(array,function(item) {return !predicate(item);});
  return[results1,results2];
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


//Objects

//when testing on the underscore site, this creates an infinite loop, since keys relies on map, and map relies on keys
_.keys = function(object) {
  return _.map(object,function(value,key,list) {
    return key;
  });
}

_.values = function(obj) {
  return _.map(obj, function(value) {
    return value;
  });
}

_.pairs = function(object) {
  return _.map(object, function(value, key) {
    var results = [];
    results.push(key);
    results.push(value);
    return results;
  });
}


_.invert = function(object) {
  var results = {};
  _.each(object, function(value, key) {
    results[value] = key;
  });
  return results;
}
















