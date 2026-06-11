const xlsx = require('xlsx');
const fs = require('fs');

function readExcel(filename) {
    if (!fs.existsSync(filename)) {
        console.log(`File not found: ${filename}`);
        return;
    }
    
    console.log(`--- Parsing ${filename} ---`);
    const workbook = xlsx.readFile(filename);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    
    const data = xlsx.utils.sheet_to_json(sheet, { defval: null });
    
    if (data.length === 0) {
        console.log("No data found.");
        return;
    }
    
    const columns = Object.keys(data[0]);
    console.log("Columns:", columns);
    console.log(`Total Rows: ${data.length}`);
    console.log("First 3 rows:", JSON.stringify(data.slice(0, 3), null, 2));
    console.log("\n");
}

readExcel("Inventory Master Data Centralized  25.02.2025 (1).xlsx");
readExcel("Non inventory Master data centralized 25.02.2026.xlsx");
