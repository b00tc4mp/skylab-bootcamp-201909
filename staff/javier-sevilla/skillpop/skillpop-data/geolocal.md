I was recently building an app that uses location based messages, and I wanted to implement the messages with MongoDB. By using the $near operator a programmer can really easily query a database for entries that fall within a distance that a crow flies on a sphere, without having to use complicated math like the Haversine Formula:
Haversine formula - Wikipedia
The haversine formula determines the great-circle distance between two points on a sphere given their longitudes and…
en.wikipedia.org
I implemented this solution using Javascript, Mongoose, Express, and Node. I’m excited about the implications of cool DB functions such as $near. But I will skip the basics of setting up an Express and mongoose application for this demonstration.
First, we must define our Schema. With mongoose this is pretty easy. Imagine we are building an app with messages that are stored by location. We need to query mongoDB with latitude and longitude coordinates and find messages within a certain distance of those coordinates.
Schema:
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var MessageSchema = new Schema(
 {
  username: String,
  text: String,  
  location: {
   type: { type: String },
   coordinates: []
  },
 {
  timestamps: true
 }
);
MessageSchema.index({ location: "2dsphere" });
var Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
Our location Object has a type Object, so that when we query a “type: Point”, we won’t interfere with “type: String”. The coordinates will be stored as an array in the format [longitude, latitude]. We index on location and let mongoDB know we are using a “2dsphere”.
Imagine we are just hardcoding the mongoDB for fun this time:
var message = new Message({
  username: "SexySkeletor",
  text: "Hello World",
  location: {
   type: "Point",
   coordinates: [36.098948, -112.110492]
  },
 });
message.save((err, message) => {
  if (err) console.log(err);
  console.log(message);
 });
And now in order to find our message we query with the magical $near operator.
$near - MongoDB Manual 3.6
sorts documents by distance. If you also include a for the query, re-orders the matching documents, effectively…
docs.mongodb.com
Message.find({
  location: {
   $near: {
    $maxDistance: 1000,
    $geometry: {
     type: "Point",
     coordinates: [long, latt]
    }
   }
  }
 }).find((error, results) => {
  if (error) console.log(error);
  console.log(JSON.stringify(results, 0, 2));
 });
In our query, “$maxDistance” is the distance in meters from the longitude and latitude values. We use error first callbacks in node, and the results param will contain an array of all messages and their locations:
[
 {
  location: {
   coordinates: [36.098948, -112.110492],
   type: "Point"
  },
  _id: "5acc105fd3e5d62bcbc24dbe",
  username: "SexySkeletor",
  text: "Hello World",
  createdAt: "2018-04-10T01:16:15.777Z",
  updatedAt: "2018-04-10T01:16:15.777Z",
 },
 {
  location: {
   coordinates: [36.098948, -112.110492],
   type: "Point"
  },
  _id: "5acc10b4d3e5d62bcbc24dbf",
  username: "DoodleBob",
  text: "Meahoy, memoyay? MeyoyYOY, ladyonmamoy!",
  createdAt: "2018-04-10T01:17:40.430Z",
  updatedAt: "2018-04-10T01:17:40.430Z",
 }
];
Thanks for reading…