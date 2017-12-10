const request = require('supertest');
const app = require('../../../app.js');
const User = require('../../../src/models/User');

describe('controllers/index.js', () => {
    beforeEach("Add user", async () => {
        await User.create({
            email: 'test.instanov@gmail.com',
            password: 'success',
            profile: {
                name: 'Alfred Test',
                username: 'test_instanov',
            }
        })
    });

    afterEach("Delete User", async () => {
        await User.remove({
            email: 'test.instanov@gmail.com',
        }).exec();
    });

    describe('GET /', () => {
        it('should return 400 Bad Login', (done) => {
            request(app)
            .get('/')
            .expect(400, done);
        });
    });

    describe('GET /', () => {
        it('should return 200 & a object', (done) => {

            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.get('/').expect(200, done);
            });
        });
    });

    describe('GET /', () => {
        it('should return 404 Not Found', (done) => {
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.get('/').expect(200, done);
            });
        });
    });
});