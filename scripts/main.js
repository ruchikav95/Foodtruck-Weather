
// $.ajax({
//   url:
//     "https://data.boston.gov/api/3/action/datastore_search?resource_id=9960513f-1a7f-4f02-847c-553e7c8a60f7",
//   method: "GET"
// }).then(function(response) {
//   document.write(JSON.stringify(response));
// });

// $.ajax({
//     url: "https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=74694f219dec1ad3f001b89fcece53c7",
//     method: "GET"
//    }).then(function(response) {
//     weatherResponse=response;
//     console.log(response);
//     console.log(response.Runtime);
//    });


var centralCambridge={
    name: "Central Square",
    city:"Cambridge",
    clouds:"",
    precipitation:"",
    temperature:"",
    wind:"",

    xCoordinate:42.36541,
    yCoordinate:-71.103802,
    foodTruckNames:["Tom", "bob", "sam"],
    foodTruckLocations:[],
    foodTruckHours:[],
    foodTruckLink:[],
    foodTruckPinpoint:[]
};

var southStationBoston={
    name: "South Station",
    city:"Boston",
    clouds:"",
    precipitation:"",
    temperature:"",
    wind:"",

    yCoordinate:42.3519,
    xCoordinate:-71.0551,
    foodTruckNames:[],
    foodTruckLocations:[],
    foodTruckHours:[],
    foodTruckLink:[],
    foodTruckPinpoint:[]
}



var records;
var maxX, maxY, minX, minY;

function findFoodTrucks(location){

    $.ajax({
        url: "https://data.boston.gov/api/3/action/datastore_search?resource_id=9960513f-1a7f-4f02-847c-553e7c8a60f7",
        dataType:'jsonp',
        cache: true,
        method: "GET"
       }).then(function(response) {
        // document.write(JSON.stringify(response));
        records=response.result.records;
    maxX=parseFloat(location.xCoordinate)+.005;
    minX=parseFloat(location.xCoordinate)-.005;

    maxY=parseFloat(location.yCoordinate)+.005;
    minY=parseFloat(location.yCoordinate)-.005;

    console.log(records[0].y + " "+maxY);
    for (var i=0;i<records.length;i++){
        if ((records[i].x<=maxX&&records[i].x>=minX)&&(records[i].y<=maxY&&records[i].y>=minY))
        {
        location.foodTruckLocations.push(records[i].Location);
        location.foodTruckNames.push(records[i].Truck);
        location.foodTruckHours.push(records[i].Hours);
        location.foodTruckLink.push(records[i].Link);
        location.foodTruckPinpoint.push(records[i].Pinpoint);
    }
    }
    console.log(location.foodTruckNames);
});

}

function findWeather(location){

}


function openDisplay(location){
    $("#search-screen").hide();
    $("#display-screen").show();
    $("#display-header").text(location.name + ", "+location.city);
    findFoodTrucks(location);
    // findWeather(location);

}

$("#central-cambridge").on("click", function(){
    openDisplay(centralCambridge);
    for (var i=0; i<centralCambridge.foodTruckNames.length;i++){
        $("#food-trucks").append("<p>"+centralCambridge.foodTruckNames[i]+"</p>");
    }
});

$("#south-station-boston").on("click", function(){
    openDisplay(southStationBoston);
    for (var i=0; i<southStationBoston.foodTruckNames.length;i++){
        $("#food-trucks").append("<p>"+southStationBoston.foodTruckNames[i]+"</p>");
    }
});
