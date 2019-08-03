//ajax for food trucks and weather
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

var backBayBoston = {
  name: "Back Bay",
  city: "Boston",
  weather: {
    description: "",
    icon: "",
    temperature: "",
    humidity: "",
    tempMax: "",
    tempMin: ""
  },
  yCoordinate: 42.3053,
  xCoordinate: -71.081,
  foodTruckNames: [],
  foodTruckLocations: [],
  foodTruckHours: [],
  foodTruckLink: [],
  foodTruckPinpoint: []
};

var aquariumBoston = {
  name: "The New England Aquarium",
  city: "Boston",
  weather: {
    description: "",
    icon: "",
    temperature: "",
    humidity: "",
    tempMax: "",
    tempMin: ""
  },
  yCoordinate: 42.3592,
  xCoordinate: -71.0491,
  foodTruckNames: [],
  foodTruckLocations: [],
  foodTruckHours: [],
  foodTruckLink: [],
  foodTruckPinpoint: []
};

var kenmoreBoston = {
  name: "Kenmore Square",
  city: "Boston",
  weather: {
    description: "",
    icon: "",
    temperature: "",
    humidity: "",
    tempMax: "",
    tempMin: ""
  },
  yCoordinate: 42.3429,
  xCoordinate: -71.1003,
  foodTruckNames: [],
  foodTruckLocations: [],
  foodTruckHours: [],
  foodTruckLink: [],
  foodTruckPinpoint: []
};

var eastBoston = {
  name: "East Boston",
  city: "Boston",
  weather: {
    description: "",
    icon: "",
    temperature: "",
    humidity: "",
    tempMax: "",
    tempMin: ""
  },
  yCoordinate: 42.37021,
  xCoordinate: -71.03886,
  foodTruckNames: [],
  foodTruckLocations: [],
  foodTruckHours: [],
  foodTruckLink: [],
  foodTruckPinpoint: []
};

var southStationBoston = {
  name: "South Station",
  city: "Boston",
  weather: {
    description: "",
    icon: "",
    temperature: "",
    humidity: "",
    tempMax: "",
    tempMin: ""
  },
  yCoordinate: 42.3519,
  xCoordinate: -71.0551,
  foodTruckNames: [],
  foodTruckLocations: [],
  foodTruckHours: [],
  foodTruckLink: [],
  foodTruckPinpoint: []
};

var copleyBoston = {
  name: "Copley Square",
  city: "Boston",
  weather: {
    description: "",
    icon: "",
    temperature: "",
    humidity: "",
    tempMax: "",
    tempMin: ""
  },
  yCoordinate: 42.3432,
  xCoordinate: -71.0726,
  foodTruckNames: [],
  foodTruckLocations: [],
  foodTruckHours: [],
  foodTruckLink: [],
  foodTruckPinpoint: []
};

var northeasternBoston = {
  name: "Northeastern University",
  city: "Boston",
  weather: {
    description: "",
    icon: "",
    temperature: "",
    humidity: "",
    tempMax: "",
    tempMin: ""
  },
  yCoordinate: 42.3601,
  xCoordinate: -71.0589,
  foodTruckNames: [],
  foodTruckLocations: [],
  foodTruckHours: [],
  foodTruckLink: [],
  foodTruckPinpoint: []
};

var records;
var maxX, maxY, minX, minY;

function findFoodTrucks(location) {
  $.ajax({
    url:
      "https://data.boston.gov/api/3/action/datastore_search?resource_id=9960513f-1a7f-4f02-847c-553e7c8a60f7",
    dataType: "jsonp",
    cache: true,
    method: "GET"
  }).then(function(response) {
    // document.write(JSON.stringify(response));
    records = response.result.records;
    maxX = parseFloat(location.xCoordinate) + 0.005;
    minX = parseFloat(location.xCoordinate) - 0.005;

    maxY = parseFloat(location.yCoordinate) + 0.005;
    minY = parseFloat(location.yCoordinate) - 0.005;

    console.log(records[0].y + " " + maxY);
    for (var i = 0; i < records.length; i++) {
      if (
        records[i].x <= maxX &&
        records[i].x >= minX &&
        (records[i].y <= maxY && records[i].y >= minY)
      ) {
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

function findWeather(location) {
  var weather = location.weather;
  console.log(location.weather);
  $.ajax({
    url:
      "https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=74694f219dec1ad3f001b89fcece53c7",
    dataType: "jsonp",
    cache: true,
    method: "GET"
  }).then(function(response) {
    weather.description = response.weather.description;
    console.log(response);
    weather.icon = response.weather.icon;
    weather.temperature = response.main.temp;
    weather.humidity = response.main.humidity;
    weather.tempMin = response.main.temp_min;
    weather.tempMax = response.main.temp_max;
  });
}

function openDisplay(location) {
  $("#search-screen").hide();
  $("#display-screen").show();
  $("#display-header").text("Near " + location.name);
  findFoodTrucks(location);
  findWeather(location);
}

$("#back-bay-boston").on("click", function() {
  openDisplay(backBayBoston);
  for (var i = 0; i < backBayBoston.foodTruckNames.length; i++) {
    $("#food-trucks").append("<p>" + backBayBoston.foodTruckNames[i] + "</p>");
  }
});

$("#aquarium-boston").on("click", function() {
  openDisplay(aquariumBoston);
  for (var i = 0; i < aquariumBoston.foodTruckNames.length; i++) {
    $("#food-trucks").append("<p>" + aquariumBoston.foodTruckNames[i] + "</p>");
  }
});

$("#kenmore-boston").on("click", function() {
  openDisplay(kenmoreBoston);
  for (var i = 0; i < kenmoreBoston.foodTruckNames.length; i++) {
    $("#food-trucks").append("<p>" + kenmoreBoston.foodTruckNames[i] + "</p>");
  }
});

$("#east-boston").on("click", function() {
  openDisplay(eastBoston);
  for (var i = 0; i < eastBoston.foodTruckNames.length; i++) {
    $("#food-trucks").append("<p>" + eastBoston.foodTruckNames[i] + "</p>");
  }
});

$("#south-station-boston").on("click", function() {
  openDisplay(southStationBoston);
  for (var i = 0; i < southStationBoston.foodTruckNames.length; i++) {
    $("#food-trucks").append(
      "<p>" + southStationBoston.foodTruckNames[i] + "</p>"
    );
  }
});

$("#copley-boston").on("click", function() {
  openDisplay(copleyBoston);
  for (var i = 0; i < copleyBoston.foodTruckNames.length; i++) {
    $("#food-trucks").append("<p>" + copleyBoston.foodTruckNames[i] + "</p>");
  }
});

$("#northeastern-boston").on("click", function() {
  openDisplay(northeasternBoston);
  for (var i = 0; i < northeasternBoston.foodTruckNames.length; i++) {
    $("#food-trucks").append(
      "<p>" + northeasternBoston.foodTruckNames[i] + "</p>"
    );
  }
});
