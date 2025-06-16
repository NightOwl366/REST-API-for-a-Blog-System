export const validatePost = (req,res,next) =>{
      const {title,content } = req.body;

    if (!title || !content) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required: title,content '
        });
    }
    next();
}