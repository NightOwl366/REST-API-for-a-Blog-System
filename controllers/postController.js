import Post from '../models/Post.js';

export const getAllPosts = async (req, res) => {
    try {
        const { page = 1, limit = 10, sort = '-createdAt' } = req.query;
        const posts = await Post.find()
            .populate('author', 'name email')
            .sort(sort)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .lean();
        const total = await Post.countDocuments();

        return res.status(200).json({
            success: true,
            message: 'Posts retrieved successfully',
            data: {
                posts,
                pagination: {
                    currentPage: parseInt(page),
                    totalPages: Math.ceil(total / limit),
                    totalPosts: total,
                    hasNextPage: page < Math.ceil(total / limit),
                    hasPrevPage: page > 1
                }
            }
        })

    } catch (error) {
        console.error("Get all posts error:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
}

export const getPostById = async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findById(id)
            .populate('author', 'name email')
            .lean();

        if (!post) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Post retrieved successfully',
            data: { post }
        });

    } catch (error) {
        console.error("Get post by ID error:", error);
        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid post ID format'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }
};


export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const authorId = req.user?.id;
        const postData = { title, content };
        if (authorId) {
            postData.author = authorId;
        }
        const newPost = new Post(postData)
        await newPost.save();

        await newPost.populate('author', 'name email');

        return res.status(201).json({
            success: true,
            message: 'Post created successfully',
            data: { post: newPost }
        });

    } catch (error) {
        console.error("Create post error:", error);
        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }

}

export const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updateData = {};
        if (title !== undefined) updateData.title = title;
        if (content !== undefined) updateData.content = content;
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            updateData,
            {
                new: true,
                runValidators: true
            }
        ).populate('author', 'name email');

        if (!updatedPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Post updated successfully',
            data: { post: updatedPost }
        });

    } catch (error) {
        console.error("Update post error:", error);

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid post ID format'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }

}

export const deletePost = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return res.status(404).json({
                success: false,
                message: 'Post not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Post deleted successfully'
        });

    } catch (error) {
        console.error("Delete post error:", error);

        if (error.name === 'CastError') {
            return res.status(400).json({
                success: false,
                message: 'Invalid post ID format'
            });
        }

        return res.status(500).json({
            success: false,
            message: 'Internal server error'
        });
    }

};
