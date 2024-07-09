const axios = require("axios");
const cheerio = require("cheerio");

const url =
  "https://www.weightloss.com.au/diet/food-nutrition-tables/carbohydrates-sugars-table-a.html";

axios
  .get(url)
  .then(async (response: any) => {
    const html = response.data;
    const $ = cheerio.load(html);

    const tableRows = $(".bodyText tr");

    let data: { name: any; calories: number; carbs: number; sugar: number }[] =
      [];

    tableRows.each((index: any, element: any) => {
      const columns = $(element)
        .find("td")
        .map((i: any, cell: any) => $(cell).text().trim())
        .get();

      if (columns.length > 0) {
        const name = columns[0].replace(/\n/g, "").replace(/\s+/g, "");
        data.push({
          name: name,
          calories: parseFloat(columns[2]),
          carbs: parseFloat(columns[3]),
          sugar: parseFloat(columns[4]),
        });
      }
    });

    console.log("Data has been saved to the database.");
  })
  .catch((error: any) => {
    console.log(error);
  });
