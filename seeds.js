require('./config/database');
const Driver = require('./models/driver');
const Trip = require('./models/trip');
const Truck = require('./models/truck');
const data = require('./data');

const p1 = Driver.deleteMany({});
const p2 = Trip.deleteMany({});
const p3 = Truck.deleteMany({});

Promise.all([p1,p2,p3])
.then((DeletionResult) => {
    console.log("DELETED from Databases -> \n" , DeletionResult);
    return Driver.create(data.driver);
})
.then((CreatedDriverResult) => {
    console.log("CREATED Driver Databases -> \n" , CreatedDriverResult);
    return Truck.create(data.truck);
})
.then((CreatedTruckResult) => {
    console.log("CREATED Truck Databases -> " ,CreatedTruckResult);
    return Trip.create(data.trip);
})
.then((CreatedTripResult) => {
    console.log("CREATED Trip Databases -> " ,CreatedTripResult);
    return "Success";
}).then((result) => { 
    console.log('Created Transport Management Data ' ,  result)
    process.exit();
})