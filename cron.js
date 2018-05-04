
const db = require('./controllers/populatedb');
const Agenda = require('agenda');
module.exports = function Cron() {
	var agenda = new Agenda({
		db: {
			address: 'mongodb://localhost/sfmovies'
		}
	});

	(function initCron() {
		agenda.define('load movies in database', function(job, done) {
			console.log("load movies in");
			db.Load(done);
		});

		agenda.on('ready', function() {
			agenda.every('7 days', 'load movies in database');
			agenda.start();
		});
	})();
}
