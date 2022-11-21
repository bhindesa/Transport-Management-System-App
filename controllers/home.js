const Driver = require('../models/driver');
const Truck = require('../models/truck');
const Trip = require('../models/trip');


function index(req, res){
    console.log("I'm in Home index func")
    Trip.find({}, function(err, trips){
        if(err){
            console.log('Error occured during pulling Data from Trips Database -> \n', err);
        }
        console.log("Trips Data - >\n", trips)
        res.render('home/index',
        { 
            title : 'Home Page',
            trips
        });
    })
    // Trip.find({})
    // .then(function(trips){
    //     console.log("Trips Data - >\n", trips)
    //     res.render('home/index',
    //     { 
    //         title : 'Home Page',
    //         trips
    //     });
    // })
    // .then(function(result){
    //     process.exit();
    // })
    // .catch(function(err){
    //     console.log('Error occured during pulling Data from Trips Database -> \n', err);
    // });
    // res.render('home/index',
    //     { 
    //         title : 'Home Page',
    //         trips:null
    //     });
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