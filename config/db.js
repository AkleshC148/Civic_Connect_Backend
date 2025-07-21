const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    console.log('MONGO_URI:', process.env.MONGO_URI); // <--- ADD THIS FOR DEBUGGING
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // other options if needed
    });
    console.log('✅ MongoDB Connected');
  } catch (err) {
    console.error('❌ MongoDB Connection Error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB; 