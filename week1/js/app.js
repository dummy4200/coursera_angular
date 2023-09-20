(function () {
'use strict';

  angular.module('LunchCheck', [])
    
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope']
  function LunchCheckController($scope) {
    $scope.items = "";
    $scope.message = "";
    $scope.checkItems = function () {
      console.log("checking");
      const content = $scope.items.split(',');
      const count = content.length;
      console.log("Count: " + count);
      if (count < 4) {
        $scope.message = "Enjoy";
      }
      else {
        $scope.message = "Too much";
      }
    }
  }
  
})();
