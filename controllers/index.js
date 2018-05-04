const movieModel = require('../models/movies')
const locationModel = require('../models/locations')
const Movies = require('./methods');




module.exports = {

    /**
	 * AutoComplete Search Function to get movie obejects based on the search term
     * @param request
     * @param response will be up to 10 movie objects
     */
	searchMovies: function(request, response) {
		const searchTerm = request.query.movieName.toString();
		const term = new RegExp('\\b' + searchTerm.trim(), "i");
		//A naive way to deal with autocomplete, to be improved
		const resultLimit = 10;			
		movieModel.getMovies(term, resultLimit)
			.then(function(movies) {
				response.json({
					status: "success",
					movies: movies,
					code: 200
				})
			})
			.catch(function(error) {
				console.log(error)
				response.json({
					status: "error",
					result: "Internal Server Error",
					code: 500
				})
			})

	},
    /**
	 * Get Locations of movie with MovieID
     * @param request
     * @param response
     */
	getLocations: function(request, response) {
		var id = request.params.id;
		locationModel.getLocations(id)
			.then(function(movies) {
				response.json({
					status: "success",
					movies: movies,
					code: 200
				})
			})
			.catch(function(error) {
				console.log(error);
				response.json({
					status: "error",
					result: "Internal Server Error",
					code: 500
				})
			})
	}
}