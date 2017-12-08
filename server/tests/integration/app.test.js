const app = require('../../app.js');
const chai = require('chai');
const request = require('supertest');

chai.should();


describe('app.js', () => {
	describe('#get /', () => {
		it('should return 400 & a json', () => {
			request(app).get('/')
				.then((res) => {
					res.statusCode.should.be.eql(400);
					res.text.should.be.a('string');
				});
		});
	});
	
	describe('#get not found', () => {
		it('should return 404 & a json', () => {
			request(app).get('/notfound')
				.then((res) => {
					res.statusCode.should.be.eql(404);
					res.text.should.be.a('string');
				});
		});
	});
});