const PurchasedToken = require("../models/PurchasedTokens.model");
const { validatePurchase } = require("../utils/validator")
// Function to generate an eight-digit token
const generateToken = () => {
    const tokenLength = 8;
    const possibleChars = '123456789'; // Define the characters allowed in the token

    let token = '';
    for (let i = 0; i < tokenLength; i++) {
        token += possibleChars.charAt(
            Math.floor(Math.random() * possibleChars.length)
        );
    }

    return token;
};

exports.newToken = async (req, res) => {
    try {
        const { error } = validatePurchase(req.body);
        console.log(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }


        const { meterNumber, amount } = req.body;
        

        // Calculate tokenValueDays based on the amount
        const tokenValueDays = Math.min(Math.floor(amount / 100), 1825);

        // Generate an eight-digit token
        const token = generateToken();

        const newToken = new PurchasedToken({
            meterNumber,
            token,
            tokenValueDays,
            amount,
        });

        await newToken.save();
        console.log(newToken)
        res.status(201).json({ message: 'Token created successfully',token: newToken.token });
    } catch (error) {
        console.error('Error creating token:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

exports.verifyToken = async (req, res) => {
    const { token } = req.body;

    try {
        // Check if the token exists in the PurchasedToken model
        const foundToken = await PurchasedToken.findOne({ token });

        if (foundToken) {
            // Token exists, return the token
            res.status(200).json({ token: foundToken });
        } else {
            // Token not found
            res.status(404).json({ message: 'Invalid Token' });
        }
    } catch (error) {
        // Handle any errors that occur during the token verification process
        res.status(500).json({ message: 'Error occurred during token verification' });
    }
};

exports.getTokens = async (req, res) => {
    const { meterNumber } = req.body;
    console.log(meterNumber)
    try {
        // Find all tokens with the specified meterNumber
        const tokens = await PurchasedToken.find({ meterNumber });

        res.status(200).json({ tokens });
    } catch (error) {
        res.status(500).json({ message: 'Error occurred while retrieving tokens' });
    }
}

// module.exports = newToken ;