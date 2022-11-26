const mongoose = require('mongoose');
const Driver = require('../models/driver'); 


const Schema = mongoose.Schema;

const truckSchema = new Schema({
    truckNumber: {
        type : String,
        unique : true,
        required : true
    },
    make : {
        type : String,
        required : true
    },
    mileage:{
        type: Number,
        required : true
    },
    maintenanceDate: {
        type : Date,
        required : true
    },
    active: {
        type : Boolean,
        required : true,
        default : false
    },
    fuelEfficiency: {
        type : Number,
        required : true
    },
    currentDrivers : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Driver'
        }
    ],
    driversHistory : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Driver'
        }
    ]
},
{
    timestamp : true
});

module.exports = mongoose.model('Truck', truckSchema)

