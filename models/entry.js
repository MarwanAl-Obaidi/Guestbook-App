const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    }
});

const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;