import { NextFunction, Request, Response } from "express";
import { sendJsonSuccess } from "../helpers/responseHandler";
import cloudinary from "../configs/cloundinaryConfig";

const create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const files = req.files;

    if (!files || !Array.isArray(files)) {
      throw new Error("No files found or files is not an array");
    }

    const images = files.map((file) => file.path);
    // const images = req.files?.map((file) => file.path);
    const uploadedImage = [];

    for (let image of images) {
      const result = await cloudinary.uploader.upload(image);
      console.log(result);
      uploadedImage.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }
    sendJsonSuccess(res)(uploadedImage);
  } catch (error) {
    next(error);
  }
};
export default {
  create,
};
