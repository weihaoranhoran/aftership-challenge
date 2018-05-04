const MovieLoader = require('./methods')
const dataSource = "https://data.sfgov.org/resource/wwmu-gmzc.json";

module.exports = {
    /**
	 * Load data in MongoDB
     * @param done
     */
	Load: function(done) {
		MovieLoader
			.SavingMoviesTodb(dataSource)
			.then(function(result) {
				if (result) {
					console.log("successfully stored")
					
				}
				console.log(result)
			})
			.catch(function(error) {
				console.log(error)
			})
	}
}