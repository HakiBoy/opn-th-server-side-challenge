// freebie.js
class Freebie {
    constructor(triggerProductId, freeProductId, quantity = 1) {
      this.triggerProductId = triggerProductId;
      this.freeProductId = freeProductId;
      this.quantity = quantity;
    }
  
    apply(cart) {
      if (cart.items.some(item => item.productId === this.triggerProductId)) {
        cart.addItem(this.freeProductId, this.quantity);
      }
    }
  }
  
  module.exports = Freebie;