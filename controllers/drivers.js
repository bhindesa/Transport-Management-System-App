const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const Driver = require('../models/driver');
const Truck = require('../models/truck');

function findAge(driverDob){
    const now  =  new Date();
    const dob = new Date(driverDob);
    return now.getFullYear() - dob.getFullYear();
}

function index(req, res){
    Driver.find({})
    .populate('assignedTruck')
    .exec(function(err, drivers){
        if(err){
            console.log('Error occured during pulling Data from Drivers Database -> \n', err);
        }
        res.render('drivers/index',{
            title : 'All Drivers',
            drivers
        })
    })
    
}
function newDriver(req, res){
    res.render('drivers/new',{
        title : 'Add New Driver'
    });
}

function create(req, res){
    console.log(req.body)
   
    Driver.create({
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

function edit(req, res){
    const driverId = req.params.driverId;
    Driver.findById(driverId)
    .populate('assignedTruck')
    .exec(function(err, driver){
        Truck.find({}, function(err, trucks){

            res.render('drivers/edit',{
                title : 'Add New Driver',
                driver,
                trucks
            });
        })
    })
    
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

function deleteDriver(req, res){
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

module.exports = {
    index,
    new : newDriver,
    create,
    update,
    edit,
    delete: deleteDriver
}