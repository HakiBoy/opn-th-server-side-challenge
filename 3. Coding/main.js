// main.js or cart-example.js
const CartService = require('./cart-service');

function runCartExamples() {
  const cartService = new CartService();
  const productPrices = { 1: 10, 2: 20, 3: 30 }; // Mock product prices

  // Basic
  cartService.createCart();
  cartService.addItem(1, 2);
  cartService.addItem(2, 3);
  cartService.updateItem(1, 5);
  cartService.removeItem(2);

  // Utilities
  console.log('Cart Items:', cartService.listItems());
  console.log('Product 1 Exists:', cartService.productExists(1));
  console.log('Is Cart Empty:', cartService.isCartEmpty());
  console.log('Unique Items:', cartService.countUniqueItems());
  console.log('Total Items:', cartService.totalItems());
  console.log('Cart Total:', cartService.calculateTotal(productPrices));

  // Discount
  const tenPercentDiscount = new (require('./discount'))('10%', 'percentage', 10, 200);
  cartService.applyDiscount(tenPercentDiscount);
  console.log('Cart Total with 10% Discount:', cartService.calculateTotal(productPrices));
  cartService.removeDiscount('10%');
  console.log('Cart Total after removing discount:', cartService.calculateTotal(productPrices));

  // Freebie
  const freebieDeal = new (require('./freebie'))(1, 3, 1);
  cartService.addFreebie(freebieDeal);
  cartService.addItem(1, 1); // Trigger freebie
  console.log('Cart Items with Freebie:', cartService.listItems());
  console.log('Cart Total with Freebie:', cartService.calculateTotal(productPrices));

  cartService.destroyCart();
  console.log('Is Cart Empty after destroy:', cartService.isCartEmpty());
}

runCartExamples();