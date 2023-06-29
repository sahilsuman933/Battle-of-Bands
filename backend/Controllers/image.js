import ImageGenerate from "../services/image-generate";
import ImageBase64Convert from "image-data-uri";
import DB from "../services/database-service";

const image = {
  async generateImage(req, res) {
    const { prompt } = req.body;
    const image = await ImageGenerate.generateImage(prompt);

    res.send({
      images: image.images,
    });
  },
  async submission(req, res) {
    const { id, img } = req.body;

    DB.updateData("polling", id, {
      imageURL: img,
      createdTime: new Date().getTime(),
      votes: 0,
    });

    res.send({
      message: "Image Successfully Uploaded.",
    });
  },
};

export default image;
