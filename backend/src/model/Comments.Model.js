import mongoose, {Schema} from "mongoose";

const CommentSchema = new Schema({
    content:{
        type: String,
        reqruired: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blog:{
        type: Schema.Types.ObjectId,
        ref: "Blog",
        required: true,
    }
}, {timestamps: true});

const Comment = mongoose.model("Comment", CommentSchema)
export default Comment;