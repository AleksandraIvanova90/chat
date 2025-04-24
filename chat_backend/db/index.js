const users = {
  data: [],
  listeners: [],
  
  add(item) {
    this.data.push(item);
    console.log(users)
    this.listeners.forEach(handler => handler(item));
  },
  
  listen(handler) {
    this.listeners.push(handler);
    console.log(users)
  },
}

module.exports = users;
