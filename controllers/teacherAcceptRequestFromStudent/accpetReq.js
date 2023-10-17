import Class from "../../models/classModel/Class.js";

export const acceptClass = async (req, res) => {
  const { reqId, teacher, student } = req.body;

  if (!reqId || !teacher || !student) {
    res.status(404).json("please fill the required feild");
    return;
  }

  const acceptedClass = {
    reqId: reqId,
    teacher: teacher,
    student: student,
  };

  try {
    const createdClass = await Class.create(acceptedClass);
    const response = await Class.findOne({ _id: createdClass._id })
      .populate("reqId")
      .populate("teacher", "-password")
      .populate("student", "-password");

    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAcceptedClass = async (req, res) => {
  try {
    const classes = await Class.findOne({ teacher: req.user._id })
      .populate("teacher", "-password")
      .populate("student", "-password")
      .populate({
        path: "reqId",
        populate: {
          path: "teacherId studPersonal studSchool studentId",
        },
      });

    if (!classes) {
      res.status(404).json("currently you dont have any classes");
      return;
    }

    res.status(200).json(classes);
  } catch (error) {
    res.status(500).json(error);
  }
};
