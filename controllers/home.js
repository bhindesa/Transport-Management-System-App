const Driver = require('../models/driver');
const Truck = require('../models/truck');
const Trip = require('../models/trip');


function index(req, res){
    console.log("I'm in Home index func and user is :\n ", req.user)
    Trip.find({}, function(err, trips){
        if(err){
            console.log('Error occured during pulling Data from Trips Database -> \n', err);
        }
        // console.log("Trips Data - >\n", trips)
        res.render('home/index',
        { 
            title : 'Home',
            trips,
            user : req.user
        });
    });
}

// function create(req, res){

// }

// function show(req, res){

// }

module.exports = {
    index,
    // create,
    // show
}