const mongoose = require('mongoose');
const uri = "mongodb+srv://saisurya7989_database:Surya2003@cluster0.axhaya4.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

console.log("Attempting to connect to MongoDB...");
mongoose.connect(uri)
    .then(() => {
        console.log("SUCCESS: Connection established!");
        process.exit(0);
    })
    .catch(err => {
        console.error("FAILURE: Could not connect.");
        console.error(err);
        process.exit(1);
    });
