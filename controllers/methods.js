const request = require('request');
const async = require('async');
const MovieModel = require('../models/movies')
const LocationModel = require('../models/locations')
const NodeGeocoder = require('node-geocoder');
const underscore = require('underscore');


function Movie() {
	/**	Private Variables*/

	var geoCodeoptions = {
		provider: 'google',
		httpAdapter: 'https', 
		apiKey: "AIzaSyCb1TbW8x26LIsipElh4T_AdKD-cQnbGgE", 
		formatter: null 
	};
	var city = "San Francisco, CA";
	var geocoder = NodeGeocoder(geoCodeoptions);


	/**	Private Functions*/

    /**
	 * Saves Movie In Movies Collection
     * @param movie
     * @param callback
     */
	function saveMovie(movie, callback) {
		var newMovie;
		MovieModel.findMovie(movie.title)
			.then(function(movieFound) {
				if (movieFound)
					return movieFound;
				else {
					newMovie = {
						title: movie.title,
						release_year: movie.release_year,
						director: movie.director,
						productionCompany: movie.production_company || "",
						distributor: movie.distributor || "",
						writer: movie.writer
					};
					//console.log("Inside save Movie");
					return MovieModel(newMovie).save();
				}

			})
			.then(function(savedMovie) {
				return callback(null, savedMovie, movie.locations);
			})
			.catch(function(error) {
				console.log(error);
				return callback(error);
			})
	}

    /**
	 * Saves Location in location Collection In MongoDB
     * @param location
     * @param callback
     */
	function saveLocation(location, callback) {
		LocationModel.findOne({
				location: location.location
			}).exec()
			.then(function(locationFound) {
				if (locationFound)
					return null
				else
					return getGeoLocation(location)
			})
			.then(function(geoLocation) {
				if (geoLocation)
					return LocationModel(geoLocation).save();
				else
					return null;
			})
			.then(function(location) {
				//console.log("Inside save location")
				callback(null, location)
			})
			.catch(function() {
				callback(null, location)
			})
	}

    

    /**
	 * The function to deal with the movie and location saving process
	 * Using Async to save movies an then locations
	 *
     * @param movie
     * @param index
     * @param savecb
     */
	function processMovie(movie, index, savecb) {
		console.log(movie.title, "=======", index);
		async.waterfall(
			[

				function(callback) {
					saveMovie(movie, callback)
				},
				function(movie, location, callback) {
					var location = {
						movieId: movie._id,
						location: location
					};
					saveLocation(location, callback)
				}
			],
			function(error, result) {
				if (!error)
					savecb()
			})
	}

	/**
	 * This Function Get  LAT AND LONG  from google GeoCode Api
	 * 	Based on location name
     * @param location
     * @returns {Promise}
     */
	function getGeoLocation(location) {
		return new Promise(function(resolve) {
			geocoder.geocode(location.location + " " + city)
				.then(function(geoLocation) {
					if (geoLocation && geoLocation[0])
						location.loc = [geoLocation[0].latitude, geoLocation[0].longitude];
					resolve(location)
				})
				.catch(function() {
					resolve(location)
				})
		})

	}
	
	
	
	/**	Previleged Fuctions*/

    /**
	 * This generic method is Used to all Kinds Of Https request To external API
     * @param url - Url to fetch data from
     * @param method - Method [GET POST PUT DELETE]
     * @param callback - Callback Support [Optional]
     * @param data - Data To be passed to url
     * @returns {Promise}
     */
	this.caller = function(url, method, callback, data) {
		return new Promise(function(resolve, reject) {
			request({
				method: method,
				url: url,
				form: data
			}, function(error, result, body) {
				if (error) {
					if (typeof callback === "function")
						callback(error);
					reject(error);
				}
				if (result.statusCode === 200) {
					body = JSON.parse(body);
					if (typeof callback === "function")
						callback(null, result, body);
					resolve([result, body])
				}
			})
		});
	};

    /**
	 * Encapsulated Interface for Saving Movies and Locations
     * @param movies
     * @returns {Promise}
     */
	this.SaveAll = function(movies) {
		return new Promise(function(resolve, reject) {
			async.eachOfSeries(movies, function(movie, index, callback) {
				processMovie(movie, index, callback)
			}, function(error) {
				if (error)
					reject();
				else
					resolve(true);
			})
		})
	}
}


const movies = new Movie();

module.exports = {
    /**
	 * Export Function for the whole getting data and saving data process
     * @param url - is the Data source
     * @returns {Promise}
     */
	SavingMoviesTodb: function(url) {
		return new Promise(function(resolve, reject) {
			movies.caller(url)
				.then(function(result) {
					console.log(result[1].length);
					if (result)
						return movies.SaveAll(result[1])
				})
				.then(function() {
					console.log("Movies saved Successfully");
					resolve(true)
				})
				.catch(function(error) {
					console.log("Error Saving Movies In Database");
					reject(error)
				})
		})
	}

};