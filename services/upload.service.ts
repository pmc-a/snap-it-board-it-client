export const uploadImage = async (uri: string) => {
	const uriParts = uri.split('.');
	const fileType = uriParts[uriParts.length - 1];

	const formData = new FormData();
	formData.append('image', {
		uri,
		name: `photo.${fileType}`,
		type: `image/${fileType}`,
	});

	const options = {
		method: 'POST',
		body: formData,
		headers: {
			Accept: 'application/json',
			'Content-Type': 'multipart/form-data',
		},
	};

	return fetch('https://838d84dd.ngrok.io/upload', options);
};
