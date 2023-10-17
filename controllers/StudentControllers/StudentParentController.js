import studParentDetails from "../../models/StudentRegistrationModels/studParentDetails.js";

export const postStudParent = async (req, res) => {
  const { guardian, email, phone } = req.body;

  if (!guardian || !email || !phone) {
    res.status(404).json("please fill the required feild");
    return;
  }

  const parent = new studParentDetails({
    guardian: guardian,
    email: email,
    phone: phone,
  });

  try {
    await parent.save();
    res.status(200).json(parent);
    return;
  } catch (error) {
    res.status(500).json(error);
    return;
  }
};

export const getParents = async (req, res) => {
  const parent = await studParentDetails.findOne({ studentId: req.user._id });
  if (!parent) {
    res.status(404).json("please upload your parent details");
    return;
  }

  try {
    res.status(200).json(parent);
  } catch (error) {
    res.status(500).json(error);
  }
};
