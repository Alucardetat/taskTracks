const fs = require("fs");
const path = require("path");

// Define the path to the database file
const dbFilePath = path.join(__dirname, "database.json");

/**
 * Reads data from the database file.
 * @returns {Promise<object>} - Resolves to the parsed data from the JSON file.
 */
const readDatabase = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(dbFilePath, "utf-8", (err, data) => {
      if (err) {
        reject("Error reading database file:", err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
};

/**
 * Writes data to the database file.
 * @param {object} data - The data to be written to the JSON file.
 * @returns {Promise<void>}
 */
const writeDatabase = (data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(dbFilePath, JSON.stringify(data, null, 2), "utf-8", (err) => {
      if (err) {
        reject("Error writing to database file:", err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = { readDatabase, writeDatabase };