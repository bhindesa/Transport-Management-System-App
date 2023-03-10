const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Driver = require('../models/driver');
const Truck = require('../models/truck');
const Trip = require('../models/trip');
const User = require('../models/user');



function index(req, res){
    if(req.user){
        User.findOne({ '_id':`${req.user._id.toString()}`})
        .populate(['trucks','drivers', 'trips'])
        .exec(function(err, user){
            if(err){
                console.log('Error occured in  trips controllers index(func) for user database -> \n', err);
            }
            Trip.find({ "_id" : { "$in" : user.trips}})
            .populate(['drivers', 'truck'])
            .exec(function(err, trips){
                if(err){
                    console.log('Error occured during pulling Data from Trips Database -> \n', err);
                }
                res.render('trips/index',{
                    title : 'All Trips',
                    trips,
                    user : req.user
                });
            })

        })
    }
}
function newTrip(req, res){

    res.render('trips/new',{
        title : 'Add Trip',
        user : req.user
    });
}
function edit(req, res){

    const tripId = req.params.tripId;
    if(req.user){
        User.findOne({ '_id':`${req.user._id.toString()}`})
        .populate(['trucks','drivers', 'trips'])
        .exec(function(err, user){

            Driver.find({ "_id" : {"$in" : user.drivers}}, function(err, drivers){
                Truck.find({ "_id" : {"$in" : user.trucks}}, function(err, trucks){
                    Trip.findById(tripId)
                    .populate(['drivers', 'truck'])
                    .exec(function(err, trip){
                        res.render('trips/edit',{
                            title : 'Edit Trip',
                            trip,
                            drivers,
                            trucks,
                            user : req.user
                        });
                    
                    });
                });
            });



        })
    }
    
    
}

function create(req, res){
        console.log(req.body)
    if(req.user){
        User.findOne({ '_id':  `${req.user._id.toString()}`},async function(err, user){ 
            const newTrip = await Trip.create({
                from : req.body.from,
                to : req.body.to,
                tripPrice : req.body.tripPrice,
                fuelConsumption : req.body.fuelConsumption,
                otherExpenses : req.body.otherExpenses,
            });
            user.trips.push(newTrip._id);
            user.save(function(err){
                res.redirect('/home/trips/');
            })
        });
    }
        
}

function update(req, res){

    Driver.find({}, function(err, drivers){
        Truck.find({}, function(err, trucks){
            Trip.findById(req.params.tripId , function(err, trip){

                // console.log("The trip info \n", trip)
                // console.log("The trip info -> req body \n", req.body)

                if(req.body.drivers === 'notSelected' || req.body.truck === 'notSelected'){
                    console.log('Cant update (Not Selected) option selected on current drivers');
                    trip.from =  req.body.from;
                    trip.to = req.body.to;
                    trip.mileage = req.body.tripPrice;
                    trip.fuelConsumption = req.body.fuelConsumption;
                    trip.otherExpenses = req.body.fotherExpenses;
                    if(req.body.drivers !== 'notSelected'){
                        trip.drivers.push(req.body.drivers);
                    } 
                    else if(req.body.truck !== 'notSelected'){
                        trip.truck.push(req.body.drivers);
                    }

                    trip.save(function(err){
                        res.redirect(`/home/trips/${req.params.tripId}`)
                    });

                }
                else if(trip.drivers.length < 2 && trip.truck.length < 2 ){
                    
                        trip.from =  req.body.from;
                        trip.to = req.body.to;
                        trip.mileage = req.body.tripPrice;
                        trip.fuelConsumption = req.body.fuelConsumption;
                        trip.otherExpenses = req.body.otherExpenses;

                        //trip truck is referenced
                        if(trip.truck.length < 1){
                            trip.truck.push(req.body.truck)
                        }
                        //trip drivers are referenced
                        trip.drivers.push(req.body.drivers);
                        console.log("Add all info \n")

                        trip.save(function(err){
                            res.redirect(`/home/trips/${req.params.tripId}`)
                        })
                }
                else if(trip.driver.length >= 2){
                    console.log('Cant update Trip drivers More Than 2 and truck more than 1 ');
                    // Driver.findById(req.body.currentDriver, function(err, driver){
                        // console.log('driver data in update is : ' , driver);
                        // console.log('truck current driver data is : ' , truck.currentDrivers);

                        trip.from =  req.body.from;
                        trip.to = req.body.to;
                        trip.mileage = req.body.tripPrice;
                        trip.fuelConsumption = req.body.fuelConsumption;
                        trip.otherExpenses = req.body.fotherExpenses;
                        
                        trip.save(function(err){
                            if(err){
                            console.log("Error", err)
                            }
                            res.redirect(`/home/trips/${req.params.tripId}`)
                        })

                    // })
                }
            });
        });
    });
}

function deleteTruckAndDriver(req, res){
    const tripId = req.params.tripId;
    const truckId = req.params.truckId;
    const driverId = req.params.driverId;

    console.log("In Delete driver func of Trips ctrl \n")

    Trip.findById(tripId)
    .exec(function(err, trip){
        if(err){
            console.log('Error occured in  driver crtl delete(func) -> \n', err);
        }
        
        console.log('deleting array :', trip.drivers);
        console.log('test obj driver id :', ObjectId(driverId));

        
        if(truckId){
            trip.truck.pop();
        }
        else{
            const indexOdRemovingDriver = trip.drivers.indexOf(ObjectId(driverId));
            trip.drivers.splice(indexOdRemovingDriver, 1);
        }
        trip.save(function(err){
                    console.log('Error -> ', err);
                    res.redirect(`/home/trips/${tripId}`)
                });

        console.log('after delete array :', trip.drivers);
    });
}

function deleteTrip(req,res){
    const tripId = req.params.tripId;
    if(req.user){
        User.findOne({ '_id':`${req.user._id.toString()}`})
        .populate(['trucks','drivers', 'trips'])
        .exec(function(err, user){
            // user.drivers.id(driverId).remove();
            const indexOdRemovingTrip = user.trips.indexOf(ObjectId(tripId));
            user.trips.splice(indexOdRemovingTrip, 1);
            user.save(function(err){
                console.log('Error -> ', err);
                
                Trip.findByIdAndDelete(tripId);
                res.redirect('/home/trips')

            });
        })
    }
}

module.exports = {
    index,
    new: newTrip,
    edit,
    create,
    update,
    delete : deleteTruckAndDriver,
    deleteTrip
}