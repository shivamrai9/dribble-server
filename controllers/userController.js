
import uploadImg from '../controllers/utils.js'
const userController = {
  uploadImage: async (req, res) => {
    // Image upload logic
    uploadImg(req.body.image)
    .then((url) => res.send(url))
    .catch((err) => res.status(500).send(err));
  }
};

export default userController;
