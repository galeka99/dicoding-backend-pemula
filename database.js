const path = require('path');
const fs = require('fs');

const bookPath = path.join(__dirname, 'books.json');

const db = {
  all: () => {
    const rawData = fs.readFileSync(bookPath, { encoding: 'utf-8' });
    const books = JSON.parse(rawData);
    return books;
  },
  search: (name) => {
    const rawData = fs.readFileSync(bookPath, { encoding: 'utf-8' });
    const books = JSON.parse(rawData);
    return books.filter(el => el.name.toLowerCase().includes(name.toLowerCase()));
  },
  read: (readed) => {
    const rawData = fs.readFileSync(bookPath, { encoding: 'utf-8' });
    const books = JSON.parse(rawData);
    return books.filter(el => el.reading === Boolean(readed));
  },
  finish: (finished) => {
    const rawData = fs.readFileSync(bookPath, { encoding: 'utf-8' });
    const books = JSON.parse(rawData);
    return books.filter(el => el.finished === Boolean(finished));
  },
  add: (book) => {
    const rawData = fs.readFileSync(bookPath, { encoding: 'utf-8' });
    const books = JSON.parse(rawData);
    books.push(book);
    fs.writeFileSync(bookPath, JSON.stringify(books, '\r\n', 2), { encoding: 'utf-8' });
    return true;
  },
  get: (id) => {
    const rawData = fs.readFileSync(bookPath, { encoding: 'utf-8' });
    const books = JSON.parse(rawData);
    const book = books.find(el => el.id === id);
    return book;
  },
  update: (id, book) => {
    const rawData = fs.readFileSync(bookPath, { encoding: 'utf-8' });
    const books = JSON.parse(rawData);
    const index = books.findIndex(el => el.id === id);
    books[index] = book;
    fs.writeFileSync(bookPath, JSON.stringify(books, '\r\n', 2), { encoding: 'utf-8' });
    return books[index];
  },
  delete: (id) => {
    const rawData = fs.readFileSync(bookPath, { encoding: 'utf-8' });
    const books = JSON.parse(rawData);
    const newBooks = books.filter(el => el.id !== id);
    fs.writeFileSync(bookPath, JSON.stringify(newBooks, '\r\n', 2), { encoding: 'utf-8' });
    return true;
  }
};
module.exports = db;
