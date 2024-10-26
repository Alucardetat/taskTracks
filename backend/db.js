const fs = require("fs");
const path = require("path");

const dbFilePath = path.join(__dirname, "database.json");

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
