const mongoose = require('mongoose');
const FAQ = require('../src/models/faqModel'); // Adjust the path as necessary

const faqs = [
    {
        question: "How do I reset my password?",
        answer: "Go to Account Settings → Security → Reset Password...",
    },
    {
        question: "What is the return policy?",
        answer: "You can return items within 30 days of receipt.",
    },
    // ...add more FAQs as needed...
];

const seedFAQs = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        await FAQ.deleteMany(); // Clear existing FAQs
        await FAQ.insertMany(faqs); // Insert new FAQs
        console.log("FAQs seeded successfully!");
    } catch (error) {
        console.error("Error seeding FAQs:", error);
    } finally {
        mongoose.connection.close();
    }
};

seedFAQs();
