var Db = require('mongodb').Db;
var Connection = require('mongodb').Connection;
var Server = require('mongodb').Server;
var BSON = require('mongodb').BSON;
var ObjectID = require('mongodb').ObjectID;

CollageProvider = function(host, port){
    this.db = new Db('node-mongo-collage', new Server(host, port,{auto_reconnect: true}, {}));
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
            gif_collection.find().toArray(function(error, results) {
                if(error) callback(error)
                else callback(null, results)
            });
        }
    });
};

CollageProvider.prototype.findById = function(id, callback) {
    this.getCollection(function(error, collage_collection) {
      if( error ) callback(error)
      else {
        gif_collection.findOne({_id: collage_collection.db.bson_serializer.ObjectID.createFromHexString(id)}, function(error, result) {
          if( error ) callback(error)
          else callback(null, result)
        });
      }
    });
};

CollageProvider.prototype.save = function(collages, callback) {
    this.getCollection(function(error, collage_collection) {
      if( error ) callback(error)
      else {
        if( typeof(collages.length)=="undefined")
          collages = [collages];

        for( var i =0;i< gifs.length;i++ ) {
          collages = collages[i];
          collages.created_at = new Date();
        }

        collage_collection.insert(collages, function() {
          callback(null, collages);
        });
      }
    });
};

exports.CollageProvider = CollageProvider;