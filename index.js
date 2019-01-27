const ml  = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR; // Simple Linear Regression

const readline = require('readline'); // For user prompt to allow predictions

const rl = readline.createInterface({
    input: process.stdin, 
    output: process.stdout
});

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
        X.push(f(row.radio));
        y.push(f(row.sales));
    });
}

function f(s) {
    return parseFloat(s, 10);
}

function predictOutput() {
    rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
        console.log(`At X = ${answer}, y =  ${regressionModel.predict(f(answer))}`);
        predictOutput();
    });
}

function performRegression() {
    regressionModel = new SLR(X, y); // Train the model on training data
    console.log(regressionModel.toString(3));
    predictOutput();
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
        performRegression();
    });
