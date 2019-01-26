const ml  = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR; // Simple Linear Regression

const csvFilePath = 'advertising.csv'; // Data
let csvData       = [], // parsed Data
      X           = [], // Input
      y           = []; // Output

let regressionModel;

function dressData() {
    /**
     * One row of the data object looks like:
     * {
     *   TV: "10",
     *   Radio: "100",
     *   Newspaper: "20",
     *   "Sales": "1000"
     * }
     *
     * Hence, while adding the data points,
     * we need to parse the String value as a Float.
     */
    csvData.forEach((row) => {
        const radio = f(row.radio);
        X.push(radio);
        y.push(f(row.sales));
    });
}

function f(s) {
    return parseFloat(s, 10);
}

csv().fromFile(csvFilePath)
    .then((jsonObj) => {
        csvData= jsonObj;
    })
    .then(() => {
        console.log('csvData', csvData);
        dressData(); // To get data points from JSON Objects
        console.log('x', X);
        console.log('y', y);
        // performRegression();
    });
