import rawCsv from '../../data/selectedwork.csv?raw';

const orgOrder = ['The Washington Post', 'The Texas Tribune', 'The Detroit News', 'The Diamondback', 'The Frederick News-Post'];

function parseCSVRow(row) {
	const result = [];
	let current = '';
	let inQuotes = false;
	for (const char of row) {
		if (char === '"') {
			inQuotes = !inQuotes;
		} else if (char === ',' && !inQuotes) {
			result.push(current.trim());
			current = '';
		} else {
			current += char;
		}
	}
	result.push(current.trim());
	return result;
}

function parseCSV(raw) {
	const lines = raw.trim().split('\n').slice(1);
	return lines
		.map((line) => {
			const [hed, org, url, tools, bucket, img, , embed, bio] = parseCSVRow(line);
			return { hed, org, url, tools, bucket, img, embed, bio };
		})
		.filter((item) => item.bucket && (item.hed || item.embed));
}

export function load() {
	const items = parseCSV(rawCsv);
	/** @type {Record<string, {org: string, items: object[]}[]>} */
	const grouped = {};

	for (const item of items) {
		const buckets = item.bucket.split(',').map((b) => b.trim());
		for (const bucket of buckets) {
			if (!grouped[bucket]) grouped[bucket] = [];
			const orgGroup = grouped[bucket].find((g) => g.org === item.org);
			if (orgGroup) {
				orgGroup.items.push(item);
			} else {
				grouped[bucket].push({ org: item.org, items: [item] });
			}
		}
	}

	if (grouped['reporting']) {
		grouped['reporting'].sort((a, b) => {
			const ai = orgOrder.indexOf(a.org);
			const bi = orgOrder.indexOf(b.org);
			return (ai === -1 ? Infinity : ai) - (bi === -1 ? Infinity : bi);
		});
	}

	return { work: grouped };
}
