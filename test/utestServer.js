process.env.NODE_ENV = 'test';

const request = require('supertest');
const expect = require('expect');
const app = require('./../app');
http = require('http');
	
	
	describe('GET /MovieTitle', function () {
		it('should return up to 10 movie objects accoding to the search item', function (done) {
			let starting_string = 'a';
			request(app)
				.get(`/movie?movieName=${starting_string}`)
				.expect(200)
				.expect(function (res) {
					expect(typeof res.body.movies).toBe('object');
					expect(res.body.movies.length).toBeLessThanOrEqual(10);				
				})
				.end(function(err, res) {
					if (err) return done(err);
					done();
				  });
		});
	});
	
	  describe('GET /MovieLocation', function () {
		it('should return locations of selected movie', function (done) {
			/* Used _id field to get the location from API,thought that it can enhance security
			 Will change it to title for easier testing if time allowed
			*/
			let Id = '5aebecbc5b07e71b1380a110'
			request(app)
				.get(`/movie/${Id}`)
				.expect(200)
				.expect(function (res) {
					expect(typeof res.body.movies).toBe('object');				
					//expect(res.body.movies[0].location).toBe("Embarcadero Freeway");

				})
				.end(function(err, res) {
					if (err) return done(err);
					done();
				  });
		});
	});
