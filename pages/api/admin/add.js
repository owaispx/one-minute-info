import bodyParser from "body-parser";
import multer from "multer";
import messagehandler from "../../../utils/features";
import connectdb from "../../../utils/conndb";
import cloudinary from "../../../utils/cloudinary";
import Info from "../../../models/adminmodel";
import { createRouter } from "next-connect";

const upload = multer({
  dest: "uploads/",
  limits: {
    fieldSize: 1024 * 1024 * 10,
  },
});

export const config = {
  api: {
    bodyParser: false,
  },
};

const apiroute = createRouter({
  onError(error, req, res) {
    console.error(error);
    res.status(500).json({ error: `Something went wrong! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(404).json({ error: "Not found" });
  },
});

apiroute.use(upload.single("image"));

apiroute.post(async (req, res) => {
  try {
    await connectdb();
    console.log("Connected to database");

    const { title, source, description  } = req.body;
    console.log(req.body)

     const image = req.file?.path;

    if (!title || !source || !description  ) {
     
      return messagehandler(res, 402, "All credentials required");
    }

    if (!image) {
      return messagehandler(res, 402, "Select image first");
    }

    const uploadimage = await cloudinary.uploader.upload(image, {
      folder: "Info_folder",
    });

    if (!uploadimage) {
      return messagehandler(res, 400, "Cloudinary error");

    }

    const imageurl = uploadimage.secure_url;

    const info = await Info.create({
      title,
      source,
      description,
      imageurl,
    });

    if (info) {
      return messagehandler(res, 201, "Information added successfully");
    } else {
      return messagehandler(res, 400, "Something went wrong");
    }
  } catch (error) {
    console.log(error);
    return messagehandler(res, 500, "Server error");
  }
});

export default apiroute.handler();
