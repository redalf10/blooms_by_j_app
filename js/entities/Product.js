export class Product {
  constructor({ id, name, variety, price, icon, badge, category, rating, oldPrice }) {
    this.id = id;
    this.name = name;
    this.variety = variety;
    this.price = price;
    this.icon = icon;
    this.badge = badge;
    this.category = category;
    this.rating = rating;
    this.oldPrice = oldPrice;
  }

  get formattedPrice() {
    return `₱${this.price.toLocaleString()}`;
  }

  get formattedOldPrice() {
    return this.oldPrice ? `₱${this.oldPrice.toLocaleString()}` : null;
  }
}
