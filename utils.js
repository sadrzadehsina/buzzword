const prepareWordToStore = word => word.toLowerCase();

const parseArgs = args => {

	const arrArgs = args.split(' ');

	return {
		command: [...arrArgs].shift(),
		rest: [...arrArgs].splice(1),
	}

};

module.exports = {
	prepareWordToStore,
	parseArgs,
};