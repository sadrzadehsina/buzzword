const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");

const adapter = new FileSync("words.json");
const db = low(adapter);

const ramda = require("ramda");

db.defaults({ words: [] }).write();

const addNewWord = (word) => {
  const foundWord = db
    .get("words")
    .find({ name: word.name, category: word.category })
    .value();

  if (foundWord) {
    db.get("words")
      .find({ name: word.name, category: word.category })
      .assign({ count: foundWord.count + 1 })
      .write();
  } else {
    db.get("words")
      .push({ name: word.name, category: word.category, count: 0 })
      .write();
  }
};

const getWords = () => {
  const words = db.get("words").value();
  // 2. sort by category
  const sorted = ramda.sortBy((word) => word.category)(words);
  // 1. group by category
  const grouped = ramda.groupBy((word) => word.category)(sorted);
  // return words
  return grouped;
};

module.exports = {
  addNewWord,
  getWords,
};
