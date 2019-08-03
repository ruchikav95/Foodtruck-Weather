
// $.ajax({
//   url:
//     "https://data.boston.gov/api/3/action/datastore_search?resource_id=9960513f-1a7f-4f02-847c-553e7c8a60f7",
//   method: "GET"
// }).then(function(response) {
//   document.write(JSON.stringify(response));
// });

// $.ajax({
//   url:
//     "https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=74694f219dec1ad3f001b89fcece53c7",
//   method: "GET"
// }).then(function(response) {
//   console.log(response);
//   console.log(response.Runtime);
// });
// var foodtruckResponse;
// var weatherResponse;




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

    xCoordinate:0,
    yCoordinate:0,
    foodTruckNames:[],
    foodTruckLocations:[],
    foodTruckHours:[],
    foodTruckLink:[],
    foodTruckPinpoint:[]
}


var records;

function findFoodTrucks(location){

    console.log(location.name);
    $.ajax({
        url: "https://data.boston.gov/api/3/action/datastore_search?resource_id=9960513f-1a7f-4f02-847c-553e7c8a60f7",
        dataType:'jsonp',
        method: "GET",
       }).then(function(response) {
        document.write(JSON.stringify(response));
        records=response.result.records;
        console.log(response);
       });

    for (var i=0;i<records.length;i++){
    if ((location.xCoordinate+.001===records[i].x||location.xCoordinate-.001===records[i].x)&&(location.yCoordinate+.001===records[i].y||location.yCoordinate-.001===records[i].y))
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

}
console.log(centralCambridge.name);

function openDisplay(location){
    $("#search-screen").hide();
    $("#display-screen").show();
    $("#display-header").text(location.name + ", "+location.city);
    findFoodTrucks(location);
    // findWeather(location);

}

$("#central-cambridge").on("click", function(){
    console.log(centralCambridge.name);
    openDisplay(centralCambridge);
    for (var i=0; i<centralCambridge.foodTruckNames.length;i++){
        $("#food-trucks").after("<p>"+centralCambridge.foodTruckNames[i]+"</p>")
    }
});