const fs = require("fs");
const faker = require("faker");
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

const generateData = async (x) => {
  try {
    const json = JSON.stringify({ data: arrayFiller(x)([]) });

    await fs.writeFile("db.json", json, "utf8", () => {
      console.log("Items are generated:", x);
    });
  } catch (e) {
    console.log(new Error(e));
  }
};

const arrayFiller = (count) => (array) => {
  const data = {
    id: array.length,
    name: "Friend 1",
    message: "Helloooo",
  };

  array.push(data);

  return count >= array.length ? arrayFiller(count)(array) : array;
};

const main = () => {
  readline.question(
    "How much data items do you need? Number: ",
    async (answer) => {
      await generateData(Number(answer));

      readline.close();
    }
  );
};

main();
