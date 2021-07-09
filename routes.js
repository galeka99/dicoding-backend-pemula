const controller = require('./controller');

module.exports = [
  {
    method: 'GET',
    path: '/',
    handler: () => {
      return {
        status: 'success',
        message: 'Selamat datang di RakBuku!'
      };
    }
  },
  {
    method: 'GET',
    path: '/books',
    handler: controller.all
  },
  {
    method: 'POST',
    path: '/books',
    handler: controller.add
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: controller.get
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: controller.update
  },
  {
    method: 'DELETE',
    path: '/books/{id}',
    handler: controller.delete
  }
]
