const multer = require('multer')

const storage = multer.diskStorage({
    destination: 'public/files',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + '_' + file.originalname)
    }
})

const filter = (req, file, cb) => {
    if (file.mimetype == 'image/jpg' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true)
    } else {
        req.errorFileFIlter = 'File extensions are not supported.'
        cb(null, false)
    }
}

module.exports = multer({
    storage: storage,
    fileFilter: filter
})