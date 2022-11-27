const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name : {
        type :String,
        required : true
    },
    email : {
        type :String,
        required : true
    },
    googleId: {
        type :String,
        required : true
    },
    avatar: {
        type :String,
        required : true
    },
    trucks :[
        {
            type : Schema.Types.ObjectId,
            ref : 'Truck'
        }
    ],
    drivers :[
        {
            type : Schema.Types.ObjectId,
            ref : 'Driver'
        }
    ]
    ,
    trips :[
        {
            type : Schema.Types.ObjectId,
            ref : 'Trip'
        }
    ]
})

module.exports = mongoose.model('User', userSchema);
