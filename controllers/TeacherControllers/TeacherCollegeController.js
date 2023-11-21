import TeacherCollegeDetails from "../../models/TeacherRegistrationModels/TeacherCollegeDetails.js";

export const postCollegeDetails = async (req, res) => {
  console.log(req.body);
  const {
    teacherId,
    collegeName,
    colAddress,
    courses,
    currentYear,
    joined,
    passOutYear,
    collegeId,
  } = req.body;

  if (
    !teacherId ||
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
    teacherId: teacherId,
    collegeName: collegeName,
    colAddress: colAddress,
    courses: courses,
    currentYear: currentYear,
    joined: joined,
    passOutYear: passOutYear,
    collegeId: collegeId,
  });

  try {
    const teacherCollegeDetails = await TeacherCollegeDetails.create(
      collegeDetails
    );
    const response = await TeacherCollegeDetails.findOne({
      _id: teacherCollegeDetails._id,
    }).populate("teacherId", "-password");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getCollege = async (req, res) => {
  const teacherCollege = await TeacherCollegeDetails.findOne({
    teacherId: req.user._id,
  });

  if (!teacherCollege) {
    res.status(404).json("please upload your college details");
    return;
  }

  try {
    res.status(200).json(teacherCollege);
  } catch (error) {
    res.status(500).json(error);
  }
};
