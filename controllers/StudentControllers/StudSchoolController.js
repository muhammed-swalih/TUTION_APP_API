import studSchoolDetails from "../../models/StudentRegistrationModels/studSchoolDetails.js";

export const postStudSchool = async (req, res) => {
  const { schoolName, schoolAdrs, idProof } = req.body;

  if (!schoolName || !schoolAdrs || !idProof) {
    res.status(404).json("please fill the required feild");
    return;
  }

  const school = new studSchoolDetails({
    schoolName: schoolName,
    schoolAdrs: schoolAdrs,
    idProof: idProof,
  });

  try {
    await school.save();

    res.status(200).json(school);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};
