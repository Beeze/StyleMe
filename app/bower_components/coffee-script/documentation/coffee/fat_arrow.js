// Generated by CoffeeScript 1.9.3
(function() {
  var Account;

  Account = function(customer, cart) {
    this.customer = customer;
    this.cart = cart;
    return $('.shopping_cart').on('click', (function(_this) {
      return function(event) {
        return _this.customer.purchase(_this.cart);
      };
    })(this));
  };

}).call(this);

//# sourceMappingURL=fat_arrow.js.map
