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
    dob: {
        type : Date,
        required: true
    },
    isIdle:{
        type: Boolean,
        required: true,
        default : true
    },
    licenseNumber : {
        type : String,
        required: true,
        default : null
    },
    licenseType : {
        type : String,
        required: true,
        enum : ['G','DZ','AZ'],
        default : 'G'

    },
    assignedTruck : [{
        type : Schema.Types.ObjectId,
        ref : 'Truck'
    }]
    
},
{
    timestamp : true
});

module.exports = mongoose.model('Driver', driverSchema);