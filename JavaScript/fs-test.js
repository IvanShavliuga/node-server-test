'use strict';

const util = require('util');
const fs = require('fs');

const readFile2 = util.promisify(fs.readFile);

readFile2('elements.json', 'utf8')
  .then(data => {
    console.log(data.toString());
    return data.toString();
  })
  .catch(err => {
    console.log(err);
  });
