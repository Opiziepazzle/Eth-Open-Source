const express = require('express');
const router = express.Router();
const skillSchema = require('../models/skills.model');


//when users select their category (Tech Bro or Non Tech Bro), fetch skills dynamically:

router.get('/:category', (req, res) => {
    const { category } = req.params;
    if (!['Tech', 'Non-Tech'].includes(category)) {
        return res.status(400).json({ success: false, error: 'Invalid category' });
    }

    skillSchema.find({ category })
        .then(skills => res.status(200).json({ success: true, data: skills }))
        .catch(err => res.status(500).json({ success: false, error: err.message }));
});




module.exports = router; 