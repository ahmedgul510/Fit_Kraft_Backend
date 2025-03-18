const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    nickname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    height: { type: Number, required: true },
    weight: { type: Number, required: true },
    age: { type: Number, required: true },
    gender: { type: String, required: true },
    goal: { type: String, required: true },
    activityLevel: { type: String, required: true },
    bmi: { type: Number, required: true },
    bmr: { type: Number, required: true },
    workouts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Workout' }],
    badges: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Badge' }]
});



module.exports = mongoose.model("User", userSchema);