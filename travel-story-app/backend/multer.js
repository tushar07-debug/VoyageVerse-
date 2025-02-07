const multer = require('multer');
const path = require('path');

// Storage Configuration
const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, './uploads/'); // Destination folder to storing uploaded files
	},
	filename: (req, file, cb) => {
		cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
	},
});

// File filter to accep only images
const fileFilter = (req, file, cb) => {
	if (file.mimetype.startsWith('image/')) {
		cb(null, true);
	} else {
		cb(new Error('Only images are allowed'), false);
	}
};

// Initialize Multer instance
const upload = multer({ storage, fileFilter });

module.exports = upload;
