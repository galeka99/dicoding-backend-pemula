const moment = require('moment');
const { v1 } = require('uuid');
const config = require('./config');

exports.print = (message, error = false) => {
  if (config.log.enable) {
    const now = moment().locale('id').format(config.log.timestamp);
    console.log(`[${now}][${error ? 'X' : '\u2713'}] ${message}`);
  }
}

exports.generateId = () => v1().replace(/-/g, '');
