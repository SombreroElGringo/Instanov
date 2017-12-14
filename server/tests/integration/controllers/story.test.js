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


    describe('GET /story/:id', () => {
        it('should return 400', (done) => {
            request(app)
            .get('/story/sjqi182882929290s')
            .expect(400, done);
        });

        it('should return 500', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.get('/story/18282hquhd727812')
                .expect(500, done);
            });
        });

        it('should return 200', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.post('/story')
                .field('username', 'test_instanov')
                .field('hastag', '#japan #ryokan')
                .field('desrcription', 'japan test')
                .attach('story', `${__dirname}/../../images/test.jpeg`)
                .end(() => {
                    Story.findOne({username: 'test_instanov'}).then(story => {
                        agent.get(`/story/${story._id}`)
                        .expect(200, done); 
                    })
                    .catch(done);
                });
            });
        });
    });


    describe('GET /story/:id/like/:username', () => {
        it('should return 400', (done) => {
            request(app)
            .put('/story/sjqi182882929290s/like/test_instanov')
            .expect(400, done);
        });

        it('should return 500', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.put('/story/18282hquhd727812/like/test_instanov')
                .expect(500, done);
            });
        });

        it('should return 200', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.post('/story')
                .field('username', 'test_instanov')
                .field('hastag', '#japan #ryokan')
                .field('desrcription', 'japan test')
                .attach('story', `${__dirname}/../../images/test.jpeg`)
                .end(() => {
                    Story.findOne({username: 'test_instanov'}).then(story => {
                        agent.put(`/story/${story._id}/like/test_instanov`)
                        .expect(200, done); 
                    })
                    .catch(done);
                });
            });
        });
    });



    describe('POST /story', () => {
        it('should return 400 Bad Login', (done) => {
            request(app)
            .post('/story')
            .expect(400, done);
        });

        it('should return 400', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.post('/story')
                .attach('story', `${__dirname}/../../images/test.jpeg`)
                .expect(400, done);
            });
        });

        it('should return 201', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.post('/story')
                .field('username', 'test_instanov')
                .field('hastag', '#japan #ryokan')
                .field('desrcription', 'japan test')
                .attach('story', `${__dirname}/../../images/test.jpeg`)
                .expect(201, done);
            });
        });
    });


    describe('GET /story/embed/:filename', () => {
        it('should return 400', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'failed',
            })
            .end(() => {
                Story.findOne({username: 'test_instanov'}).then(story => {
                    agent.get(`/story/embed/${story.info.filename}`)
                    .expect(400, done); 
                })
                .catch(done);
            });
        });

        it('should return 404', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.get('/story/embed/qjdsnqjsndjnsdjqndjsqndj.jpg')
                .expect(404, done);
            });
        });

        it('should return 200', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                Story.findOne({username: 'test_instanov'}).then(story => {
                    agent.get(`/story/embed/${story.info.filename}`)
                    .expect(200, done); 
                })
                .catch(done);
            });
        }); 
    });


    describe('PUT /story/:id', () => {
        it('should return 400', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'failed',
            })
            .end(() => {
                Story.findOne({username: 'test_instanov'}).then(story => {
                    agent.put(`/story/${story._id}`)
                    .send({
                        description: 'New description',
                        hastag: '#new #test#edit',
                    })
                    .expect(400, done); 
                })
                .catch(done);
            });
        });

        it('should return 500', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.put(`/story/dqhszghaqduhauzidnauqdni12`)
                .send({
                    description: 'New description',
                    hastag: '#new #test#edit',
                })
                .expect(500, done);
            });
        });

        it('should return 200', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                Story.findOne({username: 'test_instanov'}).then(story => {
                    agent.put(`/story/${story._id}`)
                    .send({
                        description: 'New description',
                        hastag: '#new #test#edit',
                    })
                    .expect(200, done); 
                })
                .catch(done);
            });
        });
    });


    describe('PUT /story/:id/like/:username', () => {
        it('should return 400', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'failed',
            })
            .end(() => {
                Story.findOne({username: 'test_instanov'}).then(story => {
                    agent.put(`/story/${story._id}/like/test_instanov`)
                    .expect(400, done); 
                })
                .catch(done);
            });
        });

        it('should return 500', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.put(`/story/dqhszghaqduhauzidnauqdni12/like/123`)
                .expect(500, done);
            });
        });

        it('should return 200', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                Story.findOne({username: 'test_instanov'}).then(story => {
                    agent.put(`/story/${story._id}/like/test_instanov`)
                    .expect(200, done); 
                })
                .catch(done);
            });
        });
    });


    describe('DELETE /story/:id', () => {
        it('should return 400', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'failed',
            })
            .end(() => {
                Story.findOne({username: 'test_instanov'}).then(story => {
                    agent.delete(`/story/${story._id}`)
                    .expect(400, done); 
                })
                .catch(done);
            });
        });

        it('should return 500', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                agent.delete(`/story/dqhszghaqduhauzidnauqdni12`)
                .expect(500, done);
            });
        });

        it('should return 200', (done) => {
            
            const agent = request.agent(app);
            
            agent.post('/login')
            .send({
                email: 'test.instanov@gmail.com',
                password: 'success',
            })
            .end(() => {
                Story.findOne({username: 'test_instanov'}).then(story => {
                    agent.delete(`/story/${story._id}`)
                    .expect(200, done); 
                })
                .catch(done);
            });
        });


        Story.remove({username: 'test_instanov'}).exec();
    });
});