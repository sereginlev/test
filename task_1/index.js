import {encoded, translations} from './data.js'

console.log("Let's rock")
console.log(encoded, translations)

// first decode solution
function decodeDataWithLoops() {
	const decoded = structuredClone(encoded);

	decoded.forEach(item => {
		for (let key in item) {
			for (let prop in translations) {
				if (item[key] === 'groupId' || item[key] === 'service' || item[key] === 'formatSize' || item[key] === 'ca') {
					return 
				} else if (item[key] === prop) {
					item[key] = translations[prop];
				}
			}
		}
	})

	return decoded;
}

// second decode solution
function decodeDataWithJSON() {
	let decoded = structuredClone(encoded);

	decoded.forEach(item => {
		for (let key in item) {
			if (key === 'groupId' || key === 'service' || key === 'formatSize' || key === 'ca') {
				delete item[key];
			}
		}
	})

	let json = JSON.stringify(decoded);

	for (let key in translations) {
		const REG_EXP = /"0"?/gm;

		if (REG_EXP.test(json)) {
			json = json.replaceAll(REG_EXP, '""');
		} else {
			json = json.replaceAll(key, translations[key]);
		}
	}

	decoded = JSON.parse(json);

	decoded.forEach((item, i) => {
		item.groupId = encoded[i].groupId;
		item.service= encoded[i].service;
		item.formatSize = encoded[i].formatSize;
		item.ca = encoded[i].ca;
	})

	return decoded;
}

function findUniqIds() {
	const REG_EXP = /^\d+$/;

	const uniqIds = encoded.map(item => Object.values(item)).toString().split(',').filter((item, i, arr) => {
		if (REG_EXP.test(item)) {
			return i === arr.indexOf(item);
		} else {
			return
		}
	});

	 return uniqIds;
}

console.table(decodeDataWithLoops());
console.table(decodeDataWithJSON());
console.log(findUniqIds());
