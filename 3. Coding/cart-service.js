// cart-service.js
const CartItem = require('./cart-item');
const Discount = require('./discount');
const Freebie = require('./freebie');

class CartService {
  constructor() {
    this.items = [];
    this.discounts = new Map();
    this.freebies = [];
  }

  // Basic

  createCart() {
    this.items = [];
    this.discounts.clear();
    this.freebies = [];
  }

  addItem(productId, quantity) {
    const existingItemIndex = this.items.findIndex(item => item.productId === productId);
    if (existingItemIndex !== -1) {
      this.items[existingItemIndex].quantity += quantity;
    } else {
      this.items.push(new CartItem(productId, quantity));
    }
    this.applyFreebies();
  }

  updateItem(productId, quantity) {
    const existingItemIndex = this.items.findIndex(item => item.productId === productId);
    if (existingItemIndex !== -1) {
      this.items[existingItemIndex].quantity = quantity;
    }
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.productId !== productId);
  }

  destroyCart() {
    this.items = [];
    this.discounts.clear();
    this.freebies = [];
  }

  // Utilities

  productExists(productId) {
    return this.items.some(item => item.productId === productId);
  }

  isCartEmpty() {
    return this.items.length === 0;
  }

  listItems() {
    return [...this.items];
  }

  countUniqueItems() {
    return this.items.length;
  }

  totalItems() {
    return this.items.reduce((total, item) => total + item.quantity, 0);
  }

  // Discount

  applyDiscount(discount) {
    this.discounts.set(discount.name, discount);
  }

  removeDiscount(discountName) {
    this.discounts.delete(discountName);
  }

  calculateTotal(prices) {
    let total = this.items.reduce((sum, item) => sum + (prices[item.productId] || 0) * item.quantity, 0);
    for (const discount of this.discounts.values()) {
      total = discount.apply(total);
    }
    return total;
  }

  // Freebie

  addFreebie(freebie) {
    this.freebies.push(freebie);
  }

  applyFreebies() {
    for (const freebie of this.freebies) {
      freebie.apply(this);
    }
  }
}

module.exports = CartService;