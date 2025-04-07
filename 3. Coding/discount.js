// discount.js
class Discount {
    constructor(name, type, amount, maxAmount = Infinity) {
      this.name = name;
      this.type = type;
      this.amount = amount;
      this.maxAmount = maxAmount;
    }
  
    apply(total) {
      if (this.type === 'fixed') {
        return Math.max(0, total - this.amount);
      } else if (this.type === 'percentage') {
        const discountAmount = Math.min((total * this.amount) / 100, this.maxAmount);
        return Math.max(0, total - discountAmount);
      }
      return total;
    }
  }
  
  module.exports = Discount;