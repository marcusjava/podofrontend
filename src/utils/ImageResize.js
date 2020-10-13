import Resizer from 'react-image-file-resizer';

export default (file) =>
	new Promise((resolve) => {
		Resizer.imageFileResizer(
			file,
			3280,
			2464,
			'JPEG',
			100,
			0,
			(uri) => {
				resolve(uri);
			},
			'blob'
		);
	});
