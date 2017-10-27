const request = require('supertest');
const app = require('../../app.js');

const token = 'f34c5268b72404747c32e602a72b7bda25349ebba7a400e09d925613d7ec6c11';
const timestamp = Math.floor(Date.now() / 1000);

describe('GET /api/v1', () => {
   it('should return 200 OK', (done) => {
       request(app)
       .get('/api/v1?token='+token+'&timestamp='+timestamp)
       .expect(200, done);
   });
});
/*
describe('GET /api/v1', () => {
   it('should return 400, bad token', (done) => {
       request(app)
       .get('/api/v1?token='+token+'_test&timestamp='+timestamp)
       .expect(400, done);
   });
});*/

describe('GET /api/v1/random-url', () => {
   it('should return 404', (done) => {
       request(app)
       .get('/reset')
       .expect(404, done);
   });
});
