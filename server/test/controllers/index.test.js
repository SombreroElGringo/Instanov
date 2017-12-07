const request = require('supertest');
const app = require('../../app.js');

describe('GET /', () => {
   it('should return 400 Bad Login', (done) => {
       request(app)
       .get('/')
       .expect(400, done);
   });
});

describe('GET /random-url', () => {
   it('should return 404', (done) => {
       request(app)
       .get('/reset')
       .expect(404, done);
   });
});
