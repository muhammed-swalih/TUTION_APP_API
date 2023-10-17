import express from "express";

//importing routers
import TeacherAuth from "./routes/Teacher_Routes/Auth.js";
import teacherPersonal from "./routes/Teacher_Routes/Personal.js";
import teacherCollege from "./routes/Teacher_Routes/College.js";
import teacherBank from "./routes/Teacher_Routes/Bank.js";
import teacherReq from './routes/Teacher_Routes/Req.js'
import teachAccept from './routes/Teacher_Routes/AcceptClass.js'
import teachWebinar from './routes/Teacher_Routes/webinar.js'

import studAuth from './routes/Student_Routes/Auth.js'
import studPersonal from './routes/Student_Routes/Personal.js'
import studSchool from './routes/Student_Routes/School.js'
import studParent from './routes/Student_Routes/Parent.js'

//importing dependencies
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
dotenv.config();
app.use(cors());

//Teacher endpoints
app.use("/teachAuth", TeacherAuth);
app.use("/teachPersonal", teacherPersonal);
app.use("/teachCollege", teacherCollege);
app.use("/teachBank", teacherBank);
app.use("/teachReq" , teacherReq)
app.use("/teachAcc",teachAccept)
app.use("/teachWebinar",teachWebinar)

//students endpoints
app.use("/studAuth", studAuth)
app.use("/studPersonal", studPersonal)
app.use("/studSchool", studSchool)
app.use("/studParent" ,studParent)

const connect = async () => {
  try {
    mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("mongodb is successfully connected");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("mongodb is connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("mongodb is disconnected");
});

app.listen(3005, () => {
  console.log("listening");
  connect();
});

app.get("/", (req, res) => {
  res.json("this is the backend page");
});
