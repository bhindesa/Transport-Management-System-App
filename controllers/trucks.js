const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Driver = require('../models/driver');
const Truck = require('../models/truck');
const Trip = require('../models/truck');

function index(req, res){
    Truck.find({})
    .populate(['driversHistory', 'currentDrivers'])
    .exec(function(err, trucks){
        if(err){
            console.log('Error occured during pulling Data from Trucks Database -> \n', err);
        }
        res.render('trucks/index',{
            title : 'All Trucks',
            trucks
        });
    });
    
}

function edit(req, res){
    const truckId = req.params.truckId;
    // console.log('Truck Id : ', truckId)

    Truck.findById(truckId)
    .populate(['driversHistory', 'currentDrivers'])
    .exec(function(err, truck){
        if(err){
            console.log('Error occured in  trucks controllers Update(func) for truck database -> \n', err);
        }
        // console.log("Current truck  : " , truck)
        // console.log("Current driver  : " , truck.currentDrivers)

        if(truck.currentDrivers.length === 0){

            Driver.find({}, function(err, drivers){
                
                // console.log('list of driver in ALL Driver: \n', drivers)
                if(err){
                    console.log('Error occured in trucks controllers Update(func) for driver database -> \n', err);
                }
                res.render('trucks/edit',{
                    title : 'Truck Details',
                    truck,
                    drivers
                })
            });
        }
        else {
            Driver.find({ _id : {$nin : truck.currentDrivers}}, function(err, drivers){
                // console.log('list of driver in NOT-IN: \n', drivers)
                if(err){
                    console.log('Error occured in trucks controllers Update(func) for driver database -> \n', err);
                }
                res.render('trucks/edit',{
                    title : 'Truck Details',
                    truck,
                    drivers
                });
            });
        }
        

      
    }); 
}
function update(req, res){

    Truck.findById(req.params.truckId , function(err, truck){

        if(req.body.newCurrentDriverSelected === 'notSelected'){
            console.log('Cant update (Not Selected) option selected on current drivers');
            truck.truckNumber =  req.body.truckNumber;
            truck.make = req.body.make;
            truck.mileage = req.body.mileage;
            truck.maintenanceDate = req.body.maintenanceDate;
            truck.active = req.body.active;;
            truck.fuelEfficiency = req.body.fuelEfficiency;

            truck.save(function(err){
                res.redirect(`/home/trucks/${req.params.truckId}`)
            })

        }
        else if(truck.driversHistory === null || truck.currentDrivers.length < 2){
            
                truck.truckNumber =  req.body.truckNumber;
                truck.make = req.body.make;
                truck.mileage = req.body.mileage;
                truck.maintenanceDate = req.body.maintenanceDate;
                truck.active = req.body.active;;
                truck.fuelEfficiency = req.body.fuelEfficiency;

                //current drivers are referenced
                truck.currentDrivers.push(req.body.newCurrentDriverSelected);
                //driver history is referenced
                
                const indexOdUpdatingDriver = truck.driversHistory.indexOf(ObjectId(req.body.newCurrentDriverSelected));
                console.log("index not found : ", indexOdUpdatingDriver)
                if(indexOdUpdatingDriver === -1) {
                    truck.driversHistory.push(req.body.newCurrentDriverSelected) ;
                }
                else{
                    console.log("Driver Exists in Drivers History")
                }


                truck.save(function(err){
                    res.redirect(`/home/trucks/${req.params.truckId}`)
                })

            // })
            
        }
        else if(truck.currentDrivers.length >= 2){
            console.log('Cant update current drivers More Than 2 ');
            Driver.findById(req.body.currentDriver, function(err, driver){
                // console.log('driver data in update is : ' , driver);
                // console.log('truck current driver data is : ' , truck.currentDrivers);

                truck.truckNumber =  req.body.truckNumber;
                truck.make = req.body.make;
                truck.mileage = req.body.mileage;
                truck.maintenanceDate = req.body.maintenanceDate;
                truck.active = req.body.active;;
                truck.fuelEfficiency = req.body.fuelEfficiency;
                
                //driver history is referenced
                truck.driversHistory.push(req.body.newCurrentDriverSelected) ;

                truck.save(function(err){
                    if(err){
                    console.log("Error", err)
                    }
                    res.redirect(`/home/trucks/${req.params.truckId}`)
                })

            })
        }
    });
}

function newDriver(req, res){
    
    res.render('trucks/new',{
        title : 'Add New Truck '
    });
}

function create(req, res){

    Truck.create(req.body);
    res.redirect(`/home/trucks`)
}

function deleteDriver(req, res){
    const truckId = req.params.truckId;
    const driverId = req.params.driverId;

    console.log("In Delete driver func \n")

    Truck.findById(truckId)
    .exec(function(err, truck){
        if(err){
            console.log('Error occured in  trucks controllers Update(func) for truck database -> \n', err);
        }
        
        console.log('deleting array :', truck.currentDrivers);
        console.log('test obj truck id :', ObjectId(driverId));

        
        const indexOdRemovingDriver = truck.currentDrivers.indexOf(ObjectId(driverId));
        truck.currentDrivers.splice(indexOdRemovingDriver, 1);
        truck.save(function(err){
                    console.log('Error -> ', err);
                    res.redirect(`/home/trucks/${truckId}`)
                });

        console.log('after delete array :', truck.currentDrivers);
    });

}

module.exports = {
    index,
    edit,
    update,
    new : newDriver,
    create,
    deleteDriver
}