import path from 'path';
import express from 'express';
import multer from 'multer';
const router = express.Router();

//where do we want to store the images on
const storage = multer.diskStorage({
    destination(req,file,cb) {
        cb(null, 'uploads/');
    },
    filename(req,file,cb) {
        cb(null, `${file.fieldname}-${Date.now()}-${path.extname(file.originalname)}`);
    }
});

//function to check file type
function checkFileType(file,cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if(mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Only images are allowed');
    }
}

//uploading a file

const upload = multer({
    storage,
});

router.post('/upload', upload.single('image'), (req, res) => {
    res.json({msg: 'Image uploaded successfully', path: req.file.path});
});

export default router;
