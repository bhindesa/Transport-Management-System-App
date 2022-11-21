const Driver = require('../models/driver');
const Truck = require('../models/truck');


function index(req, res){
    Driver.find({}, function(err, drivers){
        if(err){
            console.log('Error occured during pulling Data from Drivers Database -> \n', err);
        }
        res.render('drivers/index',{
            title : 'All Drivers',
            drivers
        })
    })
    
}

function create(req, res){

}

function show(req, res){

}

module.exports = {
    index,
    create,
    show
}