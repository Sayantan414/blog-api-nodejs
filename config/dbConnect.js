const mongoose = require('mongoose');

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("DB connected Successfully");
    }catch (e){
        console.log(e.message);
        process.exit(1);
    }
};

dbConnect();