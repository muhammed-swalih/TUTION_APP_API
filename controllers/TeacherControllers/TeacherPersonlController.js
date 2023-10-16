import TeacherPersonalDetails from "../../models/TeacherRegistrationModels/TeacherPersonalDetails.js";

export const postPersonal = async (req, res) => {
  const {
    dob,
    primaryLang,
    secondayLang,
    PrimaryPhone,
    secondayPhone,
    address,
    pincode,
    state,
    img,
  } = req.body;

  if (
    !dob ||
    !primaryLang ||
    !secondayLang ||
    !PrimaryPhone ||
    !secondayPhone ||
    !address ||
    !pincode ||
    !state ||
    !img
  ) {
    res.status(404).json("please fill the required feilds");
    return;
  }

  try {
    const personalDetails = new TeacherPersonalDetails({
      dob: dob,
      primaryLang: primaryLang,
      secondaryLang: secondayLang,
      PrimaryPhone: PrimaryPhone,
      SecondaryPhone: secondayPhone,
      address: address,
      pincode: pincode,
      state: state,
      img: img,
    });

    await personalDetails.save();
    res.status(200).json(personalDetails);
  } catch (error) {
    res.status(500).json(error);
  }
};
