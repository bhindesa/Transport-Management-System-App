const mongoose = require('mongoose');
const Driver = require('../models/driver');
const Truck = require('../models/truck'); 

const Schema = mongoose.Schema;

const tripSchema = new Schema({
    from: {
        type : String,
        required : true,
        default : null
    },
    to : {
        type : String,
        required : true,
        default : null
    },
    tripPrice:{
        type: Number,
        required : true,
        default : 0
    },
    fuelConsumption: {
        type : Number,
        required : true,
        default : 0
    },
    otherExpenses :{
        type : Number,
        required : true,
        default : 0
    },
    drivers : {
        type : Schema.Types.ObjectId,
        ref : 'Driver',
        default : null

    },
    truck :{
        type : Schema.Types.ObjectId,
        ref : 'Truck',
        default : null
    }
},
{
    timestamp : true
});

module.exports = mongoose.model('Trip', tripSchema);