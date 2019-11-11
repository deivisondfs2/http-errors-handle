const nock = require('nock');
const assert = require('assert');
const axios = require('axios');

const errorHandle = require('../httpErrorsHandle');

describe("httpErrorsHandle()", () => {

    let req;

    beforeEach(() => {
        req = axios.get("http://example.test/");
    })

    it("Request Success", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(200, 'OK');

        try {
            const resp = await errorHandle(req, "my custom");
            assert.equal(resp.status, 200)
            assert.equal(resp.data, "OK")            
        } catch (e) {
            assert.strictEqual(e.message, 'my custom');
            assert.strictEqual(e.name, 'NotFoundError');
            assert.strictEqual(e.status, 404);
            assert.strictEqual(e.statusCode, 404);
        }
    })

    it("when status is NotFound", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(404, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Not Found');
            assert.strictEqual(e.name, 'NotFoundError');
            assert.strictEqual(e.status, 404);
            assert.strictEqual(e.statusCode, 404);
        }
    })

    it("when status is NotFound with a custom message", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(404, 'HEHE!');

        try {
            const resp = await errorHandle(req, "my custom message");
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'my custom message');
            assert.strictEqual(e.name, 'NotFoundError');
            assert.strictEqual(e.status, 404);
            assert.strictEqual(e.statusCode, 404);
        }
    })

    it("when status is BadRequest", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(400, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Bad Request');
            assert.strictEqual(e.name, 'BadRequestError');
            assert.strictEqual(e.status, 400);
            assert.strictEqual(e.statusCode, 400);
        }
    })

    it("when status is BadRequest with custom message", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(400, 'HEHE!');

        try {
            const resp = await errorHandle(req, "custom msg BadRequest");
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'custom msg BadRequest');
            assert.strictEqual(e.name, 'BadRequestError');
            assert.strictEqual(e.status, 400);
            assert.strictEqual(e.statusCode, 400);
        }
    })

})