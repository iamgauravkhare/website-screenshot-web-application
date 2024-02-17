const fs = require("fs");
const axios = require("axios");
const cloudinary = require("cloudinary").v2;
const screenshotModel = require("../models/screenshot");

exports.captureScreenshot = async (req, res) => {
  const timestamp = Date.now();
  const randomString = Math.random().toString(36).substring(2, 8);
  const fileName = `${timestamp}_${randomString}.jpg`;
  const postData = {
    u: req.body.websiteLink,
    fs: 1,
    tkn: process.env.PIKWY_TOKEN,
    rt: "json",
  };
  const options = {
    method: "POST",
    url: "https://api.pikwy.com",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: postData,
  };
  try {
    const response = await axios.request(options);
    const decodedImageData = Buffer.from(response.data.body, "base64");
    fs.writeFile(fileName, decodedImageData, async (error) => {
      if (error) {
        return res.status(500).json({ error: error });
      }
      try {
        const uploadResponsePayload = await cloudinary.uploader.upload(
          fileName,
          {
            resource_type: "auto",
            folder: process.env.CLOUDINARY_CLOUD_FOLDER,
          }
        );
        const apiResponsePayload = await screenshotModel.create({
          websiteLink: req.body.websiteLink,
          screenshotLink: uploadResponsePayload.secure_url,
          createdAt: uploadResponsePayload.created_at,
        });
        fs.unlink(fileName, (error) => {
          if (error) {
            return res.status(500).json({ error: error });
          }
        });
        return res.status(201).json({
          success: true,
          message: "Screenshot captured succesfully!",
          payload: apiResponsePayload,
        });
      } catch (error) {
        return res.status(500).json({
          success: false,
          message: "Something went wrong! Try again",
          error: error,
        });
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error! Try again",
      error: error,
    });
  }
};
