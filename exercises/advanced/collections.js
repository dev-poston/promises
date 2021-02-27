/**
 * Using Promise.all, write a function, combineFirstLineOfManyFiles, that:
 *    1. Reads each file at the path in the `filePaths` array
 *    2. Plucks the first line of each file
 *    3. Joins each first line into a new file
 *      - The lines should be in the same order with respect to the input array
 *      - i.e. the second line in the new file should be the first line of `filePaths[1]`
 *    4. Writes the new file to the file located at `writePath`
 */
const fs = require('fs');
const Promise = require('bluebird');
const FS = Promise.promisifyAll(require('fs'));

var combineFirstLineOfManyFiles = function(filePaths, writePath) {
  let newArr = filePaths.map((filePath) => {
    return FS.readFileAsync(filePath)
      .then((data) => {
        let firstLine = data.toString().split('\n')[0];
        return firstLine;
      })
      .catch((error) => {
        console.log('readFile failed', error);
      });
  });

  Promise.all(newArr)
    .then((newArr) => {
      let joinArr = newArr.join('\n');
      console.log('this is newarr:', joinArr);
      return FS.writeFileAsync(writePath, joinArr)
        .then((data) => {
          console.log('this works', data);
        })
        .catch((error) => {
          console.log('inside writefile', error);
        });
    })
    .catch((error) => {
      console.log('writeFile failed', error);
    });
};



// let firstLine = response.toString().split('\n')[0];

// Export these functions so we can unit test them
module.exports = {
  combineFirstLineOfManyFiles: combineFirstLineOfManyFiles
};