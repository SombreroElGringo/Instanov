const request = require('supertest');
const app = require('../../../app.js');
const User = require('../../../src/models/User');

describe('controllers/auth.js', () => {

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
    
    describe('GET /login', () => {
        it('should return 200', (done) => {
            request(app)
            .get('/login')
            .expect(200, done);
        });

        it('should return 404', (done) => {
            request(app)
            .get('/logins')
            .expect(404, done);
        });
    });


    describe('POST /login', () => {

        it('should return 200', (done) => {
            request(app)
            .post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .expect(200, done);
        });

        it('should return 404', (done) => {
            request(app)
            .post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'failed',
            })
            .expect(404, done);
        });
    });


    describe('GET /logout', () => {

        it('should return 200', (done) => {
            request(app)
            .get('/logout')
            .expect(200, done);
        });
    });


    describe('GET /signup', () => {
        it('should return 200', (done) => {
            request(app)
            .get('/signup')
            .expect(200, done);
        });

        it('should return 404', (done) => {
            request(app)
            .get('/signups')
            .expect(404, done);
        });
    });


    describe('POST /signup', () => {
        beforeEach("Delete User", async () => {
            await User.remove({
                email: 'test.instanov@gmail.com',
            }).exec();
        });

        it('should return 201 Created', (done) => {
            request(app)
            .post('/signup')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
                confirmPassword: 'success',
                name: 'Alfred Test',
                username: 'test_instanov',
            })
            .expect(201, done);
        });

        it('should return 400 Bad Request', (done) => {
            request(app)
            .post('/signup')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'failed',
                confirmPassword: 'fail',
                name: 'Alfred Test',
                username: 'test_instanov',
            })
            .expect(400, done);
        });
    });

    describe('GET /accounts', () => {
       
        it('should return 400 Bad Request', (done) => {
            request(app)
            .get('/accounts')
            .expect(400, done);
        });

        it('should return 400', (done) => {
            request(app)
            .post('/login')
            .set('Accept','application/json')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end((err, res) => {
                
                request(app)
                .get('/accounts')
                .expect(400, done);
                done();
            });

            
        });
    });



});