const { print, generateId } = require('./helper');
const db = require('./database');
const moment = require('moment');

module.exports = {
  add: (request, h) => {
    try {
      const book = request.payload;
      const fields = ['name', 'year', 'author', 'summary', 'publisher', 'pageCount', 'readPage', 'reading'];

      for (const [key] of Object.entries(book)) {
        if (!fields.includes(key)) delete book[key];
      }

      if (!book.name)
        return h.response({ status: 'fail', message: 'Gagal menambahkan buku. Mohon isi nama buku' }).code(400);
      if (book.readPage > book.pageCount)
        return h.response({ status: 'fail', message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount' }).code(400);

      book.id = generateId();
      book.finished = book.pageCount === book.readPage;
      const now = moment().toISOString();
      book.insertedAt = now;
      book.updatedAt = now;
      db.add(book);
      print(`Berhasil menambahkan buku baru dengan ID: ${book.id}`);

      return h.response({
        status: 'success',
        message: 'Buku berhasil ditambahkan',
        data: {
          bookId: book.id
        }
      }).code(201);
    } catch (err) {
      console.log(err);
      print('Terjadi kesalahan saat menambahkan buku', true);
      return h.response({ status: 'error', message: 'Buku gagal ditambahkan' }).code(500);
    }
  },
  all: (request) => {
    let datas;
    if (request.query.name !== undefined) {
      datas = db.search(request.query.name);
    } else if (request.query.reading !== undefined) {
      const reading = request.query.reading;
      datas = db.read(reading !== '0');
    } else if (request.query.finished !== undefined) {
      const finished = request.query.finished;
      datas = db.finish(finished !== '0');
    } else {
      datas = db.all();
    }
    const books = datas.map(el => {
      return {
        id: el.id,
        name: el.name,
        publisher: el.publisher
      };
    });
    print('Mengambil semua data buku');

    return {
      status: 'success',
      data: {
        books: books
      }
    };
  },
  get: (request, h) => {
    const id = request.params.id;
    const book = db.get(id);
    if (!book) return h.response({ status: 'fail', message: 'Buku tidak ditemukan' }).code(404);

    print(`Menampilkan detail buku dengan ID: ${book.id}`);
    return {
      status: 'success',
      data: {
        book: book
      }
    };
  },
  update: (request, h) => {
    const id = request.params.id;
    const book = db.get(id);
    if (!book) return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Id tidak ditemukan' }).code(404);

    const bookData = request.payload;
    const fields = ['name', 'year', 'author', 'summary', 'publisher', 'pageCount', 'readPage', 'reading'];

    for (const [key] of Object.entries(bookData)) {
      if (!fields.includes(key)) delete bookData[key];
    }

    if (!bookData.name)
      return h.response({ status: 'fail', message: 'Gagal memperbarui buku. Mohon isi nama buku' }).code(400);
    if (bookData.readPage > bookData.pageCount)
      return h.response({ status: 'fail', message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount' }).code(400);

    bookData.id = id;
    bookData.insertedAt = book.insertedAt;
    bookData.updatedAt = moment().toISOString();
    bookData.finished = bookData.pageCount === bookData.readPage;
    const newBook = db.update(id, bookData);

    print(`Berhasil memperbarui buku dengan ID: ${id}`);
    return {
      status: 'success',
      message: 'Buku berhasil diperbarui',
      data: {
        book: newBook
      }
    };
  },
  delete: (request, h) => {
    const id = request.params.id;
    const book = db.get(id);
    if (!book) return h.response({ status: 'fail', message: 'Buku gagal dihapus. Id tidak ditemukan' }).code(404);

    db.delete(id);
    print(`Berhasil menghapus buku dengan ID: ${id}`);
    return { status: 'success', message: 'Buku berhasil dihapus' };
  }
}
