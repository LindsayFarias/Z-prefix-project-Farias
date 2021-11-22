const { app, knex } = require('../app');
const request = require('supertest');
const { response } = require('express');
const { TestWatcher } = require('@jest/core');

describe('the bloggeropolis endpoints', () => {
    beforeAll(() => {
        return knex.migrate
            .latest();
    });
    afterAll(() => {
        return knex.migrate
            .rollback()
            .then(() => knex.destroy());
    });

    test('POST /create should create a new user profile', (done) => {
        request(app)
            .post('/create')
            .send({
                username: 'lulujean96',
                password: 'notARealPassword'
            })
            .then((res) => {
                expect(res.status).toBe(201);
                expect(res.body).toBe('SUCCESSFUL CREATION');
                done();
            })
            .catch(err => done(err));
    });

    test('POST /login should allow a user to login', (done) => {
        request(app)
        .post('/login')
        .send({
            username: 'lulujean96',
            password: 'notARealPassword'
        })
        .then((res) => {
            expect(res.status).toBe(202);
            expect(res.body).toBe('SUCCESSFUL LOGIN');
            done();
        })
        .catch(err => done(err));
    });

    test('POST /blogs/:userId should allow a post to be created', (done) => {
        request(app)
            .post('/blogs/1')
            .send({
                title: 'The Best Chocolate Chip Cookie Recipe',
                content: 'Whenever I was in junior high school (approximately 10 years ago) I got the most amazing chocolate chip cookie recipe. An older lady from my church found out that I loved to bake and gifted the recipe to me. She told me that I would not be disappointed. And I wasn\'t, they are still to this day my favorite cookie recipe. I have the same notebook paper recipe card she gave me, it\'s now almost unreadable!'
            })
            .then((res) => {
                expect(res.status).toBe(201)
                expect(res.body).toBe('BLOG HAS BEEN POSTED')
                done();
            })
            .catch(err => done(err));
    });

    test('GET /blogs/:userId should retrieve all of the blogs of a user with just 100 char in context', async () => {
        let result = await request(app)
            .get('/blogs/1')
            .expect(200);

        expect(result.body).toHaveLength(1);
        expect(result.body[0].shortened_content).toHaveLength(100);
    });

    test('GET /blogs should return all user posts with only the first 100 char in content section', async () => {
        let result = await request(app)
            .get('/blogs')
            .expect(200);

        expect(result.body).toHaveLength(1);
        expect(result.body[0].shortened_content).toHaveLength(100);
    });

    test('GET /blogs/individual/:postId should grab an individual post with complete content', async () => {
        let result = await request(app)
        .get('/blogs/individual/1')
        .expect(200);

        console.log(result.body)
        expect(result.body[0].content).toEqual('Whenever I was in junior high school (approximately 10 years ago) I got the most amazing chocolate chip cookie recipe. An older lady from my church found out that I loved to bake and gifted the recipe to me. She told me that I would not be disappointed. And I wasn\'t, they are still to this day my favorite cookie recipe. I have the same notebook paper recipe card she gave me, it\'s now almost unreadable!');
    });

    test('PATCH /blogs/:postId should let the user edit blog content', (done) => {
        request(app)
        .patch('/blogs/1')
        .send({
            content: 'Whenever I was in junior high school (approximately 10 years ago) I got the most amazing chocolate chip cookie recipe. An older lady from my church found out that I loved to bake and gifted the recipe to me. She told me that I would not be disappointed. And I wasn\'t, they are still, to this day my favorite cookie recipe. I even have the same piece of notebook paper she wrote the recipe on, it\'s now almost unreadable!'
        })
        .then((res) => {
            expect(res.status).toBe(201)
            expect(res.body).toBe('BLOG HAS BEEN UPDATED')
            done();
        })
        .catch(err => done(err));
    });

    test('GET /blogs/individual/:postId should have the updated post content', async () => {
        let result = await request(app)
        .get('/blogs/individual/1')
        .expect(200);

        expect(result.body[0].content).toEqual('Whenever I was in junior high school (approximately 10 years ago) I got the most amazing chocolate chip cookie recipe. An older lady from my church found out that I loved to bake and gifted the recipe to me. She told me that I would not be disappointed. And I wasn\'t, they are still, to this day my favorite cookie recipe. I even have the same piece of notebook paper she wrote the recipe on, it\'s now almost unreadable!');
    });

    test('DELETE /blogs/:postId should delete user post', (done) => {
        request(app)
            .delete('/blogs/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .catch(err => done(err))
    })
})