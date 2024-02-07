const XLSX = require("xlsx");

// Function to read the spreadsheet and parse it
function readSpreadsheet(filePath) {
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
  const sheet = workbook.Sheets[sheetName];
  return XLSX.utils.sheet_to_json(sheet);
}

// Function to process the data and output index entries as JSON lines
function processSpreadsheet(customers) {
  const headers = customers.shift();
  headers.__EMPTY = "id";
  customers.forEach((customer) => {
    // Assuming a generic schema for search index
    const indexEntry = {};
    Object.entries(customer).forEach(([key, value]) => {
      indexEntry[headers[key]] = value;
    });
    console.log(JSON.stringify(indexEntry));
  });
}

// Main function
function main() {
  const spreadsheetPath = process.argv[2]; // Get the path to the spreadsheet file from command line argument
  if (!spreadsheetPath) {
    console.error(
      "Please provide the path to the spreadsheet file as a command line argument."
    );
    return;
  }

  try {
    const customers = readSpreadsheet(spreadsheetPath);
    processSpreadsheet(customers);
  } catch (error) {
    console.error("Error processing spreadsheet:", error);
  }
}

main();
