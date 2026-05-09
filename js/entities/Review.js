export class Review {
  constructor({ id, name, email, rating, comment, date = new Date(), avatar = null }) {
    this.id = id || Date.now();
    this.name = name;
    this.email = email;
    this.rating = rating;
    this.comment = comment;
    this.date = date;
    this.avatar = avatar;
  }
}
