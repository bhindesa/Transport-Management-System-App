const Driver = require('../models/driver');
const Truck = require('../models/truck');
const Trip = require('../models/trip');
const User = require('../models/user');
console.log("user model : ", User)


async function index(req, res){
    if(req.user){
        console.log("I'm in Home index func and user is :\n ", req.user);
    
        await User.findOne({ '_id':  `${req.user._id.toString()}`})
        .populate(['trucks','drivers', 'trips'])
        .exec(function(err, user){
            // console.log("Trips in if block : ", user)

            res.render('home/index',
            { 
                title : 'Home',
                trips : user.trips,
                user : req.user
            });
        })
    }
    else{
        Trip.find({}, function(err, trips){
            console.log("Trips in ELse block : ", trips)

            if(err){
                console.log('Error occured during pulling Data from Trips Database -> \n', err);
            }
            // console.log("Trips Data - >\n", trips)
            let tripPrice = 0;
            let fuelConsumption = 0;
            let otherExpenses = 0;
    
            const chartData = trips.forEach(trip => {
                    tripPrice = tripPrice + trip.tripPrice ;
                    fuelConsumption = fuelConsumption + trip.fuelConsumption
                    otherExpenses = otherExpenses + trip.otherExpenses
            });
            // console.log("Chart Data : ", tripPrice)
            
    
            res.render('home/index',
            { 
                title : 'Home',
                trips,
                user : req.user
            },
            // function(err){
            //     // res.json({
            //     //     tripPrice,
            //     //     fuelConsumption,
            //     //     otherExpenses
            //     // });
            // }
            )
        });
    }
    
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