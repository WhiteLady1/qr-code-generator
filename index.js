/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/

import fs from 'fs';
import inquirer from 'inquirer';
import qr from 'qr-image';
import { writeFile } from 'node:fs';
import { Buffer } from 'node:buffer';

inquirer.prompt([
  {
    'message': 'Type in your URL:',
    'name': 'URL'
  }, 
]).then((answers) => {
  const url = answers.URL;
  const qr_png = qr.image(url);
  qr_png.pipe(fs.createWriteStream('qr_url_img.png'));

  fs.writeFile('url.txt', url, (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
  }); 
}).catch((error) => {
  if (error.isTryError) {
    console.log(`Prompt couldn't be rendered in the current environment`);
  } else {
    console.log('Something else went wrong');
  }
});
