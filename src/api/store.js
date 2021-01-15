export default class Store {
  constructor() {
    this._storage = window.localStorage;
  }

  getItems(key) {
    try {
      return JSON.parse(this._storage.getItem(key)) || [];
    } catch (err) {
      return [];
    }
  }

  setItems(key, items) {
    this._storage.setItem(key, JSON.stringify(items));
  }

  setItem(key, id, value, isNewItem) {
    const savedItems = this.getItems(key);

    if (isNewItem) {
      savedItems.push(value);
    } else {
      for (let i = 0; i < savedItems.length; i++) {
        if (savedItems[i].id === id) {
          savedItems[i] = value;
          break;
        }
      }
    }

    this._storage.setItem(key, JSON.stringify(savedItems));
  }

  removeItem(key, id) {
    const updatedItems = this.getItems()
      .filter((item) => item.id !== id);

    this._storage.setItem(key, JSON.stringify(updatedItems));
  }
}
