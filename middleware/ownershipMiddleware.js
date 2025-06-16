import Post from "../models/Post.js";

export const ownershipMiddleware = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        const post = await Post.findById(id).select('author').lean();

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        if (!post.author) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. Post has no owner'
            });
        }

        const postAuthorId = post.author.toString();
        const currentUserId = req.user.id.toString();

        if (postAuthorId !== currentUserId) {
            return res.status(403).json({
                success: false,
                message: 'Access denied. You can only modify your own posts'
            });
        }

        // Attach post to request for potential reuse in controller
        req.post = post;
        next();

        
    } catch (error) {
        console.log("owernship error: ", error)
        res.status(500).json({ message: 'Server error' });
    }
}

