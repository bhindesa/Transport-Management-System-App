const driver = [
    {
        firstname: 'Sam',
        lastname: 'Saunder',
        isIdle: true,
        licenseNumber : 'B123-1223-5505',
        dob: '1960-10-30',
        licenseType : 'G'
    },
    {
        firstname: 'James',
        lastname: 'William',
        isIdle: false,
        licenseNumber: 'B3313-1113-5510',
        dob: '1961-08-26',
        licenseType : 'DZ'
    },
    {
        firstname: 'Robert',
        lastname: 'Smith',
        isIdle: false,
        licenseNumber: 'B5503-1220-4400',
        dob: '1980-10-27',
        licenseType : 'AZ'
    }
];

const truck = [
    {
        truckNumber: 'ABC 213',
        make : 'Volvo',
        mileage: 50505,
        maintenanceDate: '2022-10-25',
        active: false,
        fuelEfficiency: 4
    },
    {
        truckNumber: 'ABCD 303',
        make : 'Mack',
        mileage: 67500,
        maintenanceDate: '2022-08-02',
        active: true,
        fuelEfficiency: 4
    }
]

const trip = [
    {
        from: 'Caledon',
        to : 'Ottawa',
        tripPrice: 1000,
        fuelConsumption: 200,
        otherExpenses : 50
    },
    {
        from: 'Brampton',
        to : 'Toronto',
        tripPrice: 600,
        fuelConsumption: 20,
        otherExpenses : 20
    }
]

module.exports = {
    driver,
    truck,
    trip
}