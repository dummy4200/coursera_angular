(function () {
    'use strict';

    angular.module('ShoppingListApp', [])
        .config(Config)
        .controller("ToBuyController", ToBuyController)
        .controller("HasBoughtController", HasBoughtController)
        .provider("ShoppingListService", ShoppingListServiceProvider)
        ;


    // -------------------------------------------------------------------------
    //      Shopping list app - configuration
    // -------------------------------------------------------------------------

    Config.$inject = ['ShoppingListServiceProvider'];
    function Config(ShoppingListServiceProvider) {
        ShoppingListServiceProvider.defaults.maxItems = 10; 
    }

    // -------------------------------------------------------------------------
    //      Shopping list - To Buy Controller
    // -------------------------------------------------------------------------


    ToBuyController.$inject = ['$scope', 'ShoppingListService'];
    function ToBuyController($scope, ShoppingListService) {
        let toBuy = this;

        // initialize model values
        toBuy.items = ShoppingListService.itemsToBuy;
        
        // status for the visibility of message
        toBuy.isVisible = function () {
            return ShoppingListService.isToBuyListEmpty == true;
        }

        // handle when item marked as bought
        toBuy.handleBuy = function (id) {
            toBuy.items = ShoppingListService.moveItem(id);
        }
    }

    // -------------------------------------------------------------------------
    //      Shopping list - Has bought Controller
    // -------------------------------------------------------------------------

    HasBoughtController.$inject = ['$scope', 'ShoppingListService'];
    function HasBoughtController($scope, ShoppingListService) {
        let bought = this;

        // get data from service
        bought.items = ShoppingListService.itemsBought;

        // status for the visibility of message
        bought.isVisible = function() {
            return ShoppingListService.isHasBoughtListEmpty == true;  
        } 
    }


    // -------------------------------------------------------------------------
    //      Shopping list service provider
    // -------------------------------------------------------------------------


    // create the service provider function
    function ShoppingListServiceProvider() {
        let provider = this;
        
        // sets default values
        provider.defaults = {
            maxItems: 10,
            dataItems: [
                {
                    "name": "cookies",
                    "quantity": "1 bag"
                },
                {
                    "name": "soda",
                    "quantity": "3 bags"
                },
                {
                    "name": "marshmellows",
                    "quantity": "3 bags"
                },
                {
                    "name": "chocolates",
                    "quantity": "3 pieces"
                },
                {
                    "name": "diet coke",
                    "quantity": "10 cans"
                }
            ]
        };
    
        // create and return the shopping list service
        provider.$get = function () {
            let shoppingList = new ShoppingListService(provider.defaults.maxItems, provider.defaults.dataItems);
            return shoppingList;
        }
    }


    // -------------------------------------------------------------------------
    //      Shopping list service
    // -------------------------------------------------------------------------

    function ShoppingListService(maxItems, initialItems) {
        let service = this;

        // initial values for the lists of shopping items
        service.itemsToBuy = initialItems;
        service.itemsBought = [];

        // initialize the status variables used
        service.isToBuyListEmpty = service.itemsToBuy.length == 0;
        service.isHasBoughtListEmpty = service.itemsBought.length == 0;

        // move the item selected from the 'to buy' list to the 'has bought' list
        service.moveItem = function (id) {
            // add item to the 'already bought' list
            service.itemsBought.push(service.itemsToBuy[id]);
      
            // remove the item from the 'to buy' list
            const before = service.itemsToBuy.slice(0, id);
            const after = service.itemsToBuy.slice(id + 1);
            service.itemsToBuy = before.concat(after);

            // update the visible status of the two lists
            service.isToBuyListEmpty = service.itemsToBuy.length == 0;
            service.isHasBoughtListEmpty = service.itemsBought.length == 0;
            
            // return the updated 'to buy' list
            return service.itemsToBuy;
        }
        
    }

}) ();