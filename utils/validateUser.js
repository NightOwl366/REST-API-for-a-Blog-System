import validator from 'validator';

export const validateSignUp = (req, res, next) => {
    const { name, phone, email, password } = req.body;

    if (!name || !phone || !email || !password) {
        return res.status(400).json({
            success: false,
            message: 'All fields are required: name, phone, email, password'
        });
    }

    if (!validator.isEmail(email)) {
        return res.status(400).json({
            success: false,
            message: 'Please enter a valid email address'
        });
    }

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: 'Password must be at least 6 characters'
        });
    }
    next();
}

export const validateLogin = (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: 'Both email and password are required'
        });
    }
    next();
}