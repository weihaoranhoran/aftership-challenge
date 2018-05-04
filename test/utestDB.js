'use strict';

process.env.NODE_ENV = 'test';

// Dependencies
const request = require('supertest');
const expect = require('expect');
const app = require('./../app');
const Movie = require('../models/movies').Movie;
const Location = require('../models/locations').Location;
const db = require('../controllers/populatedb');

db: {
    address: 'mongodb://localhost/testing'
}
describe('Test Database Population', function () {
	// Populate Database
	it('should populate database from remote json file', function (done) {
		this.timeout(100000);
        db.Load(function(err, res) {
            if (err) return done(err);
            done();
          });
        done();
        });
    });
    /*Other testings to be continued,if more time given
     
    */

