const request = require('supertest');
const app = require('../../../app.js');

describe('GET /', () => {
   it('should return 400 Bad Login', (done) => {
       request(app)
       .get('/')
       .expect(400, done);
   });
});
/*
describe('GET /', () => {
    it('should return 200 & a object', () => {
        request(app)
        .get('/')
        .expect(200, done);
    });
});*/

describe('GET /random-url', () => {
   it('should return 404 Not Found', (done) => {
       request(app)
       .get('/reset')
       .expect(404, done);
   });
});
