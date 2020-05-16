const router = require("express").Router();
const upload = require("multer")();
const FileController = require("../controllers/file");
const baseRouter = require("./baseRouter");
const { errorMessage } = require("../config/constants");

router.post("/upload", upload.single("uploaded_file"), (req, res) => {
  let uploadedFile = req.file;
  if (!uploadedFile)
    return baseRouter.error(res, 400, errorMessage.UPLOAD_FILE_MISSING);

  FileController.addFile({
    name: uploadedFile.originalname,
    buffer: uploadedFile.buffer,
    type: uploadedFile.mimetype,
  })
    .then((newFile) => {
      return baseRouter.success(res, 200, newFile);
    })
    .catch((err) => {
      return baseRouter.error(res, 500);
    });
});

module.exports = router;
