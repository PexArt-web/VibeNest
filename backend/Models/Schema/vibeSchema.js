const mongoose = require('mongoose');
const { trim } = require('validator');
const Schema = mongoose.Schema;
const vibeSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    // displayName:{
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
    // username:{
    //     type: String,
    //     required: true,
    //     trim: true,
    // },
    content:{
        type: String,
        required: true,
        trim: true,
        maxlength: 500
    },
    imageUrl: {
        type: String,
        trim: true,
        default: null,
        required: false
    },
})

module.exports = vibeSchema