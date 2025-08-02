const express = require("express");
const { adminAuth } = require("./middlewares/auth");
const { userAuth } = require("./middlewares/auth");
const multer = require("multer");
const path = require('path');
const fs = require('fs');

const app = express();

const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

    const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const allowedTypes = ['.jpg', '.jpeg', '.png', '.gif', '.pdf'];
    const extname = path.extname(file.originalname).toLowerCase();
    
    if (allowedTypes.includes(extname)) {
        return cb(null, true);
    }
    
    cb(new Error('Invalid file type. Only images and PDFs are allowed.'));
};

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
    },
    fileFilter: fileFilter
});

const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            success: false,
            smessage: 'File upload error',
            error: err.message
        });
    } else if (err) {
        return res.status(400).json({
            success: false,
            message: 'Error uploading file',
            error: err.message
        });
    }
    next();
};

app.post('/upload', upload.single('file'), handleMulterError, (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: 'No file uploaded'
            });
        }

        res.status(200).json({
            success: true,
            message: 'File uploaded successfully',
            file: {
                originalname: req.file.originalname,
                filename: req.file.filename,
                path: req.file.path,
                size: req.file.size
            }
        });
    } catch (error) {
        console.error('Error processing file upload:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while processing upload',
            error: error.message
        });
    }
});

app.post('/uploadMultiple', upload.array('files', 10), handleMulterError, (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({
                success: false,
                message: 'No files uploaded'
            });
        }

        res.status(200).json({
            success: true,
            message: 'Files uploaded successfully',
            files: req.files.map(file => ({
                originalname: file.originalname,
                filename: file.filename,
                path: file.path,
                size: file.size
            }))
        });
    } catch (error) {
        console.error('Error processing file upload:', error);
        res.status(500).json({
            success: false,
            message: 'Server error while processing upload',
            error: error.message
        });
    }
});

app.get('/files', (req, res) => {
    fs.readdir(uploadDir, (err, files) => {
        if (err) {
            console.error('Error reading uploads directory:', err);
            return res.status(500).json({
                success: false,
                message: 'Error reading uploads directory',
                error: err.message
            });
        }
        
        res.status(200).json({
            success: true,
            files: files.filter(file => !file.startsWith('.')), // Filter out hidden files
            count: files.length
        });
    });
});

app.use('/uploads', express.static(uploadDir));

app.use("/admin", adminAuth);
app.use("/user", userAuth);

app.post("/user/login", (req, res) => {
    res.status(200).send("User logged in");
});

// app.get("/user ",userAuth,(req,res)=>{
//     res.status(200).send("User data sent")
// });

// app.get("/admin/getAllData",(req,res)=>{
//     res.status(200).send("All data sent")
// });

// app.get("/admin/deleteUser",(req,res)=>{
//     res.status(200).send("User deleted")
// });

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});
