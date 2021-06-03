const size = (value, param: string) => {
	let valueConverted = value;
	switch (param) {
		case 'KB':
			valueConverted = `${String(parseInt(valueConverted, 10) / 1000)} KB`;
			break;
		default:
			break;
	}
	return valueConverted;
};

export default size;
