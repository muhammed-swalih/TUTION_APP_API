import mongoose from "mongoose";

const {Schema} = mongoose

const BoardSchema = new Schema({
    board : {type : String, required : true},
    teacherId : {type : mongoose.Schema.Types.ObjectId, ref : "auth"}
})

export default mongoose.model("board", BoardSchema)