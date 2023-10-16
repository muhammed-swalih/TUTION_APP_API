import TeacherBank from "../../models/TeacherRegistrationModels/TeacherBank.js";

export const postBankDetails = async (req, res) => {
  const { bankHolderName, bankName, accNo, ifsc, bio, video } = req.body;

  if (!bankHolderName || !bankName || !accNo || !ifsc || !bio || !video) {
    res.status(404).json("please fill the required feilds");
    return;
  }

  const bankExist = await TeacherBank.findOne({accNo})
  if(bankExist){
    res.status(500).json("this bank is already is connected")
    return
  }

  const bankDetails = new TeacherBank({
    bankHolderName: bankHolderName,
    bankName: bankName,
    accNo: accNo,
    ifsc: ifsc,
    bio: bio,
    video: video,
  });

  try {
    await bankDetails.save();
    res.status(200).json(bankDetails);
  } catch (error) {
    res.status(500).json(error);
  }
};
