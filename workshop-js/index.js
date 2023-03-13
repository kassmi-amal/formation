const events = require("./datasource.json");

console.log(events.events.length);

function toRad(x) {
  return (x * Math.PI) / 180;
}

function haversineDistance(coords1, coords2, isMiles) {
  var lon1 = coords1[0];
  var lat1 = coords1[1];

  var lon2 = coords2[0];
  var lat2 = coords2[1];

  var R = 6371; // km

  var x1 = lat2 - lat1;
  var dLat = toRad(x1);
  var x2 = lon2 - lon1;
  var dLon = toRad(x2);
  var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;

  if (isMiles) d /= 1.60934;

  return d;
}

const myCoords = [10.3324, 32.4245];

const newEvents = events.events
  .filter(
    (item) => {
    return item.isVisble == true;
    }
  ).map((event) => {
    let item = event;
    item.distance = haversineDistance(myCoords, [item.lat, item.long]);
    return item;
  }).sort((item1, item2) => {
    return item1.distance - item2.distance;
  });

console.log(newEvents.length);
