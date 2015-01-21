angular.module('Beacon.filters', [])
//.filter('statusFilter', function(){
//  return null;
  //  return function(requests){
  //    console.log('executed')
  //    var status;
  //    var posFilterArray = [];
  //    angular.forEach(requests, function(request){
  //      status = request.polarity;
  //      console.log(status);
  //      if(polarity==='open'){
  //        posFilterArray.push(request);
  //      }
  //console.log(polarity);
  //    });
  //    return posFilterArray;
  //  };
//});
.filter('myFilter', function () {
  return function (items, search) {
    var result = [];
    angular.forEach(items, function (value, key) {
      if (value.status === search) {
        result.push(value);
      }
    });
    return result;
  }
});
