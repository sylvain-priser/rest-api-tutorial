const mongoose = require('mongoose');
let count = 0;

console.log('mongoose.service.js : Step#01');

const options = {
    autoIndex: false, // Don't build indexes
    poolSize: 10, // Maintain up to 10 socket connections
    // If not connected, return errors immediately rather than waiting for reconnect
    bufferMaxEntries: 0,
    // all other approaches are now deprecated by MongoDB:
    useNewUrlParser: true,
    useUnifiedTopology: true
};

const connectWithRetry = () => {
    console.log('MongoDB connection with retry')
    mongoose.connect("mongodb://localhost:27017/rest-tutorial", options).then(()=>{
        console.log('MongoDB is connected')
    }).catch(err=>{
        console.log('MongoDB connection unsuccessful, retry after 2 seconds. ', ++count);
        setTimeout(connectWithRetry, 2000)
    })
};

console.log('mongoose.service.js : Step#02');

connectWithRetry();

console.log('mongoose.service.js : Step#03');

exports.mongoose = mongoose;