import TeacherCollegeDetails from "../../models/TeacherRegistrationModels/TeacherCollegeDetails.js";

export const postCollegeDetails = async (req, res) => {
  console.log(req.body);
  const {
    collegeName,
    colAddress,
    courses,
    currentYear,
    joined,
    passOutYear,
    collegeId,
  } = req.body;

  if (
    !collegeName ||
    !colAddress ||
    !courses ||
    !currentYear ||
    !joined ||
    !passOutYear ||
    !collegeId
  ) {
    res.status(404).json("pleas fill the required feilds");
    return;
  }

  const collegeDetails = new TeacherCollegeDetails({
    collegeName: collegeName,
    colAddress: colAddress,
    courses: courses,
    currentYear: currentYear,
    joined: joined,
    passOutYear: passOutYear,
    collegeId: collegeId,
  });

  try {
    await collegeDetails.save();
    res.status(200).json(collegeDetails);
  } catch (error) {
    res.status(500).json(error);
  }
};
