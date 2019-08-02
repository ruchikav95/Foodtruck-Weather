//

$.ajax({
  url:
    "https://data.boston.gov/api/3/action/datastore_search?resource_id=9960513f-1a7f-4f02-847c-553e7c8a60f7",
  method: "GET"
}).then(function(response) {
  document.write(JSON.stringify(response));
});

$.ajax({
  url:
    "https://api.openweathermap.org/data/2.5/weather?q=Boston&appid=74694f219dec1ad3f001b89fcece53c7",
  method: "GET"
}).then(function(response) {
  console.log(response);
  console.log(response.Runtime);
});
