import StudPersonalDetails from "../../models/StudentRegistrationModels/StudPersonalDetails.js";

export const postStudPersonal = async (req, res) => {
  const {
    gender,
    dob,
    primaryLang,
    secondayLang,
    PrimaryPhone,
    secondayPhone,
    address,
    pincode,
    district,
    state,
    img,
  } = req.body;

  if (
    !gender ||
    !dob ||
    !primaryLang ||
    !secondayLang ||
    !PrimaryPhone ||
    !secondayPhone ||
    !address ||
    !pincode ||
    !district ||
    !state ||
    !img
  ) {
    res.status(404).json("please fill the required feilds");
    return;
  }

  try {
    const personalDetails = new StudPersonalDetails({
      gender : gender,
      dob: dob,
      primaryLang: primaryLang,
      secondaryLang: secondayLang,
      PrimaryPhone: PrimaryPhone,
      SecondaryPhone: secondayPhone,
      address: address,
      pincode: pincode,
      district : district,
      state: state,
      img: img,
    });

    await personalDetails.save();
    res.status(200).json(personalDetails);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const getPersonal = async(req,res) => {
  const personal = await StudPersonalDetails.findOne({ studentId: req.user._id });
  if (!personal) {
    res.status(404).json("please upload your personal details");
    return;
  }

  try {
    res.status(200).json(personal);
  } catch (error) {
    res.status(500).json(error);
  }
}