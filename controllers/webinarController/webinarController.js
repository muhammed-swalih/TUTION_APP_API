import webinar from "../../models/webinarModel/webinar.js";

export const postWebinar = async (req, res) => {
  const { teacherId, date, time, topic, description, poster, amount } =
    req.body;

  if (
    !teacherId ||
    !date ||
    !time ||
    !topic ||
    !description ||
    !poster ||
    !amount
  ) {
    res.status(404).json("please fill the required feild");
    return;
  }

  const newWebinar = new webinar({
    teacherId: teacherId,
    date: date,
    time: time,
    topic: topic,
    description: description,
    poster: poster,
    amount: amount,
  });

  try {
    const hostedWebinar = await webinar.create(newWebinar);
    const response = await webinar
      .findOne({ teacherId: req.user._id })
      .populate("teacherId");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getWebinar = async (req, res) => {
  const webinars = await webinar
    .find({ teacherId: req.user._id })
    .populate("teacherId");
  if (webinars.length === 0) {
    res.status(404).json("you don't have any webinars");
    return;
  }
  try {
    res.status(200).json(webinars);
  } catch (error) {
    res.status(500).json(error);
  }
};


export const enrollWebinar = async(req,res) => {
    
}