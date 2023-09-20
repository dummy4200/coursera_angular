(function () {
'use strict';

  angular.module('LunchCheck', [])
    
    .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope']
  function LunchCheckController($scope) {
    $scope.items = "";
    $scope.message = "";
    $scope.state = "";
    $scope.accept = false;
    
    $scope.checkItems = function () {
      let text = "How are you doing today?";
      const myArray = text.split(" ");
      

        let count = $scope.count_items();        
      console.log("Item count returned: " + count);
      if (count < 1) {
        $scope.message = "Enter some data first!";
        $scope.state = "alert-message";
        console.log("empty state");
      }
      else if (count < 4) {
        $scope.message = "Enjoy";
        $scope.state = "succes-message";
        console.log("acceptable state");
      }
      else {
        $scope.message = "Too much";
        $scope.state = "error-message";
        console.log("exceeded state");
      }
    
    }

    // Calculate number of items provided by user
    // include optional empty items
    $scope.count_items = function () {
      if ($scope.items == "") {
        return 0;
      }

      let content = $scope.items.replace(/\s/g, '');
      let data = content.split(',');
      let filteredArray = data.filter(function (e) { return e !== '' })

      // debug messages
      console.log("Data:          " + data);
      console.log("filtered data: " + filteredArray);

      if (!$scope.accept) {
        return data.length;
      }
      return filteredArray.length;

    }
  }
})();
