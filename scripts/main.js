var centralCambridge={
    city:"Cambridge",
    clouds:"",
    precipitation:"",
    temperature:"",
    wind:"",

    xCoordinate:0,
    yCoordinate:0,
    foodTruckNames:[],
    foodTruckLocations:[],
    foodTruckHours:[],
    foodTruckLink:[],
    foodTruckPinpoint:[]
}

var records=foodTruckResponse.result.records;

function newPage(){
    $("#search-screen").hide();
    $("#display-screen").show();
}

function findFoodTrucks(location){
    for (var i=0;i<records.length;i++){
    if ((location.xCoordinate+.001===records[i].x||location.yCoordinate-.001===records[i].y))
    {
        location.foodTruckLocations.push(records.Location);
        location.foodTruckNames.push(records.Truck);
        location.foodTruckHours.push(records.Hours);
        location.foodTruckLink.push(records.Link);
        location.foodTruckPinpoint.push(records.Pinpoint);
    }
    }
}

function findWeather(location){
    location.city
}


$("#central-cambridge").on("click", function(){
    newPage();
    findFoodTrucks(centralCambridge);
    findWeather(location);
    for (var i=0; i<foodTruckNames.length;i++){
        $()
    }

});
