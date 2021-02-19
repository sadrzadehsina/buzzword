const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const adapter = new FileSync('words.json');
const db = low(adapter);

db.defaults({ words: [] }).write();

const addNewWord = word => {

	const foundWord = db.get('words').find({ name: word.name }).value();

	if (foundWord) {
		db.get('words').find({ name: word.name }).assign({ count: foundWord.count + 1 }).write();
	} else {
		db.get('words').push({ name: word.name, count: 0 }).write();
	}

}

const getWords = () => {

	return db.get('words').value();

};

module.exports = {
	addNewWord,
	getWords,
};