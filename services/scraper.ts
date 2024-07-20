const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const baseUrl =
  "https://www.weightloss.com.au/diet/food-nutrition-tables/protein-iron-table-";
const alphabet = "abcdefghijklmnopqrstuvwxyz";

// Function to fetch data from URL
const fetchData = async (url:any) => {
  try {
    const response = await axios.get(url);
    const html = response.data;
    const $ = cheerio.load(html);

    const tableRows = $(".bodyText tr");

    let data:any = [];

    tableRows.each((index:any, element:any) => {
      const columns = $(element)
        .find("td")
        .map((i:any, cell:any) => $(cell).text().trim())
        .get();

      if (columns.length > 0) {
        const name = columns[0].replace(/\n/g, "").replace(/\s+/g, "");
        data.push({
          name: name,
          calories: parseFloat(columns[2]),
          protein: parseFloat(columns[3]),
          iron: parseFloat(columns[4]),
        });
      }
    });

    return data;
  } catch (error) {
    console.error(error);
    return []; // Return an empty array if there's an error
  }
};

// Main function to fetch data for all letters and write to JSON file
const fetchDataForAllLetters = async () => {
  let allData:any = [];

  for (let i = 0; i < alphabet.length; i++) {
    const letter = alphabet[i];
    const url = `${baseUrl}${letter}.html`;
    console.log(`Fetching data from ${url}`);
    const data = await fetchData(url);
    allData = allData.concat(data); // Concatenate data arrays into allData
  }

  // Write allData to JSON file
  const jsonFilePath = path.join(__dirname, "data.json");
  fs.writeFile(jsonFilePath, JSON.stringify(allData, null, 2), (err:any) => {
    if (err) {
      console.error("Error writing JSON file:", err);
    } else {
      console.log(`Data successfully written to ${jsonFilePath}`);
    }
  });
};

// Call the main function to start fetching and writing data
fetchDataForAllLetters();
