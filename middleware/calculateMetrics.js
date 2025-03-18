const calculateMetrics = (req, res, next) => {
    try {
        const { weight, height, age, gender, activityLevel } = req.body;
        
        // Convert height to meters if it's in cm
        const heightInMeters = height > 3 ? height / 100 : height;
        
        // Calculate BMI
        const bmi = weight / (heightInMeters * heightInMeters);
        
        // Calculate BMR using Mifflin-St Jeor Equation
        let bmr;
        if (gender.toLowerCase() === 'male') {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) + 5;
        } else {
            bmr = (10 * weight) + (6.25 * height) - (5 * age) - 161;
        }
        
        // Adjust BMR based on activity level
        const activityMultipliers = {
            'sedentary': 1.2, // Little or no exercise
            'light': 1.375,   // Light exercise/sports 1-3 days/week
            'moderate': 1.55,  // Moderate exercise/sports 3-5 days/week
            'active': 1.725,   // Hard exercise/sports 6-7 days/week
            'very active': 1.9 // Very hard exercise/sports & physical job
        };
        
        const activityMultiplier = activityMultipliers[activityLevel.toLowerCase()] || 1.2;
        const adjustedBmr = bmr * activityMultiplier;
        
        // Add calculated values to request body
        req.body.bmi = parseFloat(bmi.toFixed(2));
        req.body.bmr = parseFloat(adjustedBmr.toFixed(2));
        
        next();
    } catch (error) {
        res.status(400).json({
            message: "Error calculating BMI and BMR",
            error: error.message
        });
    }
};

module.exports = calculateMetrics; 