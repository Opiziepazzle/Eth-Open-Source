require('dotenv').config(); 
const mongoose = require('mongoose');
const skillSchema = require('../models/skills.model'); 

// Seed skills
const seedSkills = async () => {
    const skills = [
        { name: 'JavaScript', category: 'Tech' },
        { name: 'Graphic Design', category: 'Non-Tech' },
        { name: 'React', category: 'Tech' },
        { name: 'Public Speaking', category: 'Non-Tech' },
    ];

    try {
        for (const skill of skills) {
            await skillSchema.updateOne(skill, skill, { upsert: true });
        }
        console.log('Skills seeded successfully.');
        process.exit(0); // Exit script after completion
    } catch (error) {
        console.error('Error seeding skills:', error);
        process.exit(1); // Exit with an error code
    }
};

// Connect to MongoDB and run the seeder
const runSeeder = async () => {
    try {
        // Use the MongoDB URI from the .env file
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
        await seedSkills();
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);
    }
};

runSeeder();
