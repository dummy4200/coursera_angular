(function () {
    'use strict';

    angular.module('ShoppingListApp', [])
        .controller("ToBuyController", ToBuyController)
        .controller("HasBoughtController", HasBoughtController)
        .provider("ShoppingListService", ShoppingListServiceProvider);
    
    ToBuyController.$inject = ['$scope', 'ShoppingListService'];
    function ToBuyController($scope, ShoppingListService) {
        let list = this;

        list.items = ShoppingListService.getItems();

        list.itemName = "";
        list.itemQuantity = "";

        list.addItem = function () {
            try {
                ShoppingListService.addItem(list.itemName, list.itemQuantity);
            }
            catch (error) {
                list.errorMessage = error.message;
            }
        }

        list.removeItem = function (itemIndex) {
            ShoppingListService.removeItem(itemIndex);
        };
    }

    HasBoughtController.$inject = ['$scope', 'ShoppingListService'];
    function HasBoughtController ($scope, ShoppingListService) {
        
    }


    function ShoppingListServiceProvider() {
        let provider = this;

        provider.defaults = {
            maxItems: 10
        };

        provider.$get = function () {
            let shoppingList = new ShoppingListService(provider.defaults.maxItems);

            return shoppingList;
        }



        function ShoppingListService(maxItems) {
            let service = this;

            // list of shoppingList items
            let items = [];

            service.addItem = function (itemName, itemQuantity) {
                if ((maxItems === undefined) || 
                    (maxItems !== undefined) && (items.length < maxItems)) {
                    let item = {
                        name: itemName,
                        quantity: itemQuantity
                    };
                    items.push(item);
                }
                else {
                    throw new Error("Max items (" + maxItems + ") reached!");
                }
            }

            service.getItems = function () {
                return items;
            }
        }
    }

})();