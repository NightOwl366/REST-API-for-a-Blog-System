import mongoose from 'mongoose';
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        maxlength: [25, "Title cannot exceed 25 characters"],
        trim: true 
    },
    content: {
        type: String,
        required: [true, "Content is required"],
        trim: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, "Author is required"] 
    }
}, {
    timestamps: true 
});

postSchema.index({ author: 1, createdAt: -1 }); 
postSchema.index({ createdAt: -1 }); 

const Post = mongoose.model('Post', postSchema);
export default Post;
