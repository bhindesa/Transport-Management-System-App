const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Driver = require('../models/driver');
const Truck = require('../models/truck');
const User = require('../models/user');

function findAge(driverDob){
    const now  =  new Date();
    const dob = new Date(driverDob);
    return now.getFullYear() - dob.getFullYear();
}

async function index(req, res){
    if(req.user){
        await User.findOne({ '_id':`${req.user._id.toString()}`})
        .populate(['trucks','drivers', 'trips'])
        .exec(function(err, user){
            
            Driver.find({ "_id" : { "$in" : user.drivers}})
            .populate(['assignedTruck'])
            .exec(function(err, drivers){
                console.log('drivers in line 23 drivers ctrl : \n', drivers);
                res.render('drivers/index',
                        {
                            title : 'All Drivers',
                            drivers,
                            user : req.user
                        });
                if(err){
                    console.log('Error occured in  drivers controllers index(func) for driver database -> \n', err);
                }
            });
        });
            
    }
}

function newDriver(req, res){
    res.render('drivers/new',{
        title : 'Add New Driver',
        user : req.user
    });
}

function create(req, res){
    // console.log(req.body)
   if(req.user){
        User.findOne({ '_id':  `${req.user._id.toString()}`},async function(err, user){
            console.log("User in create func of driver", user)
            const newDriver = await Driver.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                age : findAge(req.body.dob),
                dob: req.body.dob,
                isIdle: req.body.isIdle,
                licenseNumber: req.body.licenseNumber,
                licenseType: req.body.licenseType,
            });

            // console.log("New Driver : \n", newDriver)

            user.drivers.push(newDriver._id);
            user.save(function(err){
                res.redirect('/home/drivers/');
            })
            
        })
   }
   else {
        const newDriver = Driver.create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            age : findAge(req.body.dob),
            dob: req.body.dob,
            isIdle: req.body.isIdle,
            licenseNumber: req.body.licenseNumber,
            licenseType: req.body.licenseType,
        });
        res.redirect('/home/drivers/');
   }
    
}

function edit(req, res){
    if(req.user){
        User.findOne({ '_id':`${req.user._id.toString()}`})
        .populate(['trucks','drivers', 'trips'])
        .exec(function(err, user){

            const driverId = req.params.driverId;

            Driver.findById(driverId)
            .populate('assignedTruck')
            .exec(function(err, driver){
                Truck.find({ '_id' : { '$in' : user.trucks}}, function(err, trucks){
                    res.render('drivers/edit',{
                        title : 'Add New Driver',
                        driver,
                        trucks,
                        user : req.user
                    });
                });
            });

        })
    }
}


function update(req, res){

    Driver.findById(req.params.driverId , function(err, driver){

        if(req.body.newAssignedTruckSelected === 'notSelected'){

            console.log('Cant update (Not Selected) option selected on Assigned Truck');

            driver.firstname = req.body.firstname;
            driver.lastname = req.body.lastname;
            driver.age = findAge(req.body.dob);
            driver.dob = req.body.dob;
            driver.isIdle = req.body.isIdle;
            driver.licenseNumber = req.body.licenseNumber;
            driver.licenseType =  req.body.licenseType;

            driver.save(function(err){
                res.redirect(`/home/drivers/${req.params.driverId}`)
            })

        }
        else if(driver.assignedTruck.length === 0){
            
            driver.firstname = req.body.firstname;
            driver.lastname = req.body.lastname;
            driver.age = findAge(req.body.dob);
            driver.dob = req.body.dob;
            driver.isIdle = req.body.isIdle;
            driver.licenseNumber = req.body.licenseNumber;
            driver.licenseType =  req.body.licenseType;

            //Assigned Truck is referenced
            driver.assignedTruck.push(req.body.newAssignedTruckSelected);
            


            driver.save(function(err){
                res.redirect(`/home/drivers/${req.params.driverId}`)
            })

            // })
            
        }
        else if(driver.assignedTruck.length >= 1){
            console.log('Can\'t Add more than 1 \n');

            driver.firstname = req.body.firstname;
            driver.lastname = req.body.lastname;
            driver.age = findAge(req.body.dob);
            driver.dob = req.body.dob;
            driver.isIdle = req.body.isIdle;
            driver.licenseNumber = req.body.licenseNumber;
            driver.licenseType =  req.body.licenseType;

            driver.save(function(err){
                if(err){
                    console.log("Error", err)
                }
                res.redirect(`/home/trucks/${req.params.truckId}`)
            })

            
        }
    });
}

function deleteAssigned(req, res){
    const truckId = req.params.truckId;
    const driverId = req.params.driverId;

    console.log("In Delete driver func of drivers ctrl \n")

    Driver.findById(driverId)
    .exec(function(err, driver){
        if(err){
            console.log('Error occured in  driver crtl delete(func) -> \n', err);
        }
        
        console.log('deleting array :', driver.assignedTruck);
        console.log('test obj driver id :', ObjectId(driverId));

        
        // const indexOdRemovingDriver = driver.indexOf(ObjectId('63800538e6885f7c91263a2e'));
        driver.assignedTruck.pop();
        driver.save(function(err){
                    console.log('Error -> ', err);
                    res.redirect(`/home/drivers/${driverId}`)
                });

        console.log('after delete array :', driver.assignedTruck);
    });
}

function deleteDriver(req,res){
    const driverId = req.params.driverId;
    if(req.user){
        User.findOne({ '_id':`${req.user._id.toString()}`})
        .populate(['trucks','drivers', 'trips'])
        .exec(function(err, user){
            // user.drivers.id(driverId).remove();
            const indexOdRemovingDriver = user.drivers.indexOf(ObjectId(driverId));
            user.drivers.splice(indexOdRemovingDriver, 1);
            user.save(function(err){
                console.log('Error -> ', err);
                
                Driver.findByIdAndDelete(driverId);
                res.redirect('/home/drivers')

            });
        })
    }
}

module.exports = {
    index,
    new : newDriver,
    create,
    update,
    edit,
    delete: deleteAssigned,
    deleteDriver
}