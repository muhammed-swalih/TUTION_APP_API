import TeacherPersonalDetails from "../../models/TeacherRegistrationModels/TeacherPersonalDetails.js";
import multer from "multer";
import { v4 as uuidv4 } from "uuid";
import firebaseConfig from "../../firebase.config.cjs";

const { bucket } = firebaseConfig;

const Storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage: Storage,
}).single("img");

export const postPersonal = (req, res) => {
  console.log(req.body);
  upload(req, res, async (err) => {
    if (err) {
      res.status(500).json(err);
    }
    const uniqueFilename = uuidv4();
    const filePath = Buffer.from(req.file.path);
    const destination = `teachersImages/${
      req.file.originalname + uniqueFilename
    }`;

    bucket
      .upload(filePath, {
        destination: destination,
        contentType: req.file.mimetype,
        public: true,
      })
      .then(() => {
        console.log("Image uploaded successfully.");
      })
      .catch((error) => {
        console.error("Error uploading image:", error);
      });

    const file = bucket.file(destination);
    const [url] = await file.getSignedUrl({
      action: "read",
      expires: "01-01-2028", // Set an expiration date or duration as needed
    });
    const {
      teacherId,
      dob,
      primaryLang,
      secondaryLang,
      PrimaryPhone,
      SecondaryPhone,
      address,
      pincode,
      state,
      img,
    } = req.body;

    const isAlreadySubmitted = await TeacherPersonalDetails.find({
      _id: req.user._id,
    });
    if (isAlreadySubmitted) {
      return res
        .status(500)
        .json("you are already submitted your details! Thank you :)");
    }

    try {
      const personalDetails = new TeacherPersonalDetails({
        teacherId: teacherId,
        dob: dob,
        primaryLang: primaryLang,
        secondaryLang: secondaryLang,
        PrimaryPhone: PrimaryPhone,
        SecondaryPhone: SecondaryPhone,
        address: address,
        pincode: pincode,
        state: state,
        picUrl: url,
      });

      const newPersonalDetails = await TeacherPersonalDetails.create(
        personalDetails
      );

      const response = await TeacherPersonalDetails.findOne({
        _id: personalDetails._id,
      }).populate("teacherId", "-password");
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json(error);
    }
  });
};

export const getPersonal = async (req, res) => {
  const teacherPersonal = await TeacherPersonalDetails.findOne({
    teacherId: req.user._id,
  });

  if (!teacherPersonal) {
    res.status(404).json("please upload your personal details");
    return;
  }

  try {
    res.status(200).json(teacherPersonal);
  } catch (error) {
    res.status(500).json(error);
  }
};
