var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

CollageProvider = function(host, port){
    this.db = new Db('mongo-node-collage', new Server(host, port,{auto_reconnect: true}, {}));
    this.db.open(function(){});
};


CollageProvider.prototype.getCollection= function(callback) {
  this.db.collection('collages', function(error, collage_collection) {
    if( error ) callback(error);
    else callback(null, collage_collection);
  });
};

CollageProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, collage_collection) {
        if(error) callback(error)
        else {
            collage_collection.find().toArray(function(error, results) {
                if(error) callback(error)
                else callback(null, results)
            });
        }
    });
};

CollageProvider.prototype.findById = function(id, callback) {
	console.log("!!!!!!!!!!!\n" + id + "!!!!!!!!!!!\n");
    this.getCollection(function(error, collage_collection) {
      if( error ) callback(error)
      else {
        collage_collection.findOne({_id: collage_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

CollageProvider.prototype.save = function(collage, callback) {
    this.getCollection(function(error, collage_collection) {
      if( error ) callback(error)
      else {
		collage.created_at = new Date();
		
        collage_collection.insert(collage, function() {
          callback(null, collage);
        });
      }
    });
};

exports.CollageProvider = CollageProvider;