import ReqModel from "../../models/TeacheReqModelFromStudent/ReqModel.js";

export const postReqFromStud = async (req, res) => {
  const { studPersonal, studSchool, teacherId, studentId } = req.body;

  if (!studPersonal || !studSchool || !teacherId || !studentId) {
    res.status(404).json("please fill the required feilds");
    return;
  }

  const newReq = {
    teacherId: [teacherId],
    studPersonal: studPersonal,
    studSchool: studSchool,
    studentId: studentId,
  };

  try {
    const newStudent = await ReqModel.create(newReq);
    const studDetails = await ReqModel.findOne({ _id: newStudent._id })
      .populate("studPersonal", "-phone")
      .populate("studSchool", "-idProof")
      .populate("teacherId", "-password")
      .populate("studentId", "-password");

    res.status(200).json(studDetails);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getReqFromStud = async (req, res) => {
  try {
    const requests = await ReqModel.find({ teacherId: req.user._id })
      .populate("studPersonal", "-phone")
      .populate("studSchool", "-idProof")
      .populate("studentId", "-password");

    if (!requests) {
      res.status(404).json("there is no requests");
      return;
    }

    res.status(200).json(requests);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const acceptReq = async (req,res) => {
  const {reqId} = req.body
  if(!reqId){
    res.status(404).json("please fill the required feilds")
    return;
  }



  try {
    
  } catch (error) {
    
  }

}
