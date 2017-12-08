const request = require('supertest');
const app = require('../../../app.js');
const User = require('../../../src/models/User');
const Story = require('../../../src/models/Story');

describe('controllers/story.js', () => {
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

    describe('POST /story', () => {
        it('should return 400 Bad Login', (done) => {
            request(app)
            .get('/profiles/username_not_in_the_db')
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
                agent.get('/profiles/test_instanov').expect(200, done);
            });
        });
    });

    describe('GET /story/:id', () => {
        
    });

    describe('PUT /story/:id', () => {
        
    });

    describe('DELETE /story/:id', () => {
        
    });

    describe('DELETE /story/:id/like/:username', () => {
        
    });
});