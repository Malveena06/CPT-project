const express = require('express');
const multer = require('multer');
const fs = require('fs');
const app = express();
const port = 3000;

// Configure storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads'); // Create an 'uploads' folder to store files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

// Serve uploaded files
app.use('/uploads', express.static('uploads'));

// Handle file uploads
app.post('/upload', upload.array('file'), (req, res) => {
    // Handle file storage and database integration here
    // Store file information in a database (e.g., MongoDB) for later retrieval
    res.json({ message: 'Files uploaded successfully' });
});

// Handle file deletions
app.delete('/delete/:fileId', (req, res) => {
    const fileId = req.params.fileId;
    const filePath = `uploads/${fileId}`;

    // Check if the file exists and delete it
    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        // You may also want to delete the file from the database
        res.json({ message: 'File deleted successfully' });
    } else {
        res.status(404).json({ message: 'File not found' });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


