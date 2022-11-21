const mongoose = require('mongoose');
const Truck = require('../models/truck'); 

const Schema = mongoose.Schema;

const driverSchema = new Schema({
    firstname: {
        type : String,
        required : true
    },
    lastname: {
        type : String,
        required : true
    },
    age : {
        type : Number,
        required: true
    },
    isIdeal:{
        type: Boolean,
        required: true,
        default : true
    },
    license : {
        type : String,
        required: true,
        default : null
    },
    dob: {
        type : Date,
        required: true
    },
    licenseType : {
        type : String,
        required: true,
        enum : ['G','DZ','AZ'],
        default : 'G'

    },
    assignedTruck : {
        type : Schema.Types.ObjectId,
        ref : 'Truck',
        default : null
    }
    
},
{
    timestamp : true
});

module.exports = mongoose.model('Driver', driverSchema)