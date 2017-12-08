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

        it('should return 200', (done) => {
            const agent = request.agent(app);

            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
               password: 'success',
            })
            .end(() => {
                agent.get('/accounts').expect(200, done);
            })
        });
    });


    describe('PUT /accounts/profile', () => {
        
        it('should return 400 Bad Request', (done) => {
            request(app)
            .put('/accounts/profile')
            .expect(400, done);
        });
 
        it('should return 200', (done) => {
            const agent = request.agent(app);
 
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.put('/accounts/profile')
                .send({
                    email: 'test.instanov@gmail.com',
                    name: 'Frank Test',
                    description: 'Hello worl!',
                })
                .expect(200, done);
            })
        });
    });


    describe('PUT /accounts/password', () => {
        
        it('should return 400 Bad Request', (done) => {
            request(app)
            .put('/accounts/password')
            .expect(400, done);
        });
 
        it('should return 200', (done) => {
            const agent = request.agent(app);
 
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.put('/accounts/password')
                .send({
                    password: 'supersuccess',
                    confirmPassword: 'supersuccess',
                })
                .expect(200, done);
            })
        });
    });


    describe('DELETE /accounts', () => {
        
        it('should return 400 Bad Request', (done) => {
            request(app)
            .delete('/accounts')
            .expect(400, done);
        });
 
        it('should return 200', (done) => {
            const agent = request.agent(app);
 
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.delete('/accounts')
                .expect(200, done);
            })
        });
    });


    describe('GET /reset/:token', () => {
        
        it('should return 400 Bad Request', (done) => {
            request(app)
            .get('/reset/azerttyyfdfgd')
            .expect(400, done);
        });
    });


    describe('POST /reset/:token', () => {
        
        it('should return 400 Bad Request', (done) => {
            request(app)
            .post('/reset/azerttyyfdfgd')
            .send({})
            .expect(400, done);
        });
    });


    describe('GET /forgot', () => {
        
        it('should return 200', (done) => {
            request(app)
            .get('/forgot')
            .expect(200, done);
        });

        it('should return 400', (done) => {
            const agent = request.agent(app);
 
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.get('/forgot')
                .expect(400, done);
            })
        });
    });


    describe('POST /forgot', () => {

        it('should return 400', (done) => {
            request(app)
            .post('/forgot')
            .send({
                email: 'test.instanov',
            })
            .expect(400, done);
        });
        
        it('should return 500', (done) => {
            request(app)
            .post('/forgot')
            .send({
                email: 'test.instanov@gmail.com',
            })
            .expect(500, done);
        });
    });
});