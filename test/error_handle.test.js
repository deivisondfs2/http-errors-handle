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

    it("when status is Unauthorized", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(401, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Unauthorized');
            assert.strictEqual(e.name, 'UnauthorizedError');
            assert.strictEqual(e.status, 401);
            assert.strictEqual(e.statusCode, 401);
        }
    })

    it("when status is Unauthorized", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(401, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg Unauthorized');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg Unauthorized');
            assert.strictEqual(e.name, 'UnauthorizedError');
            assert.strictEqual(e.status, 401);
            assert.strictEqual(e.statusCode, 401);
        }
    })

    it("when status is Unauthorized", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(402, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Payment Required');
            assert.strictEqual(e.name, 'PaymentRequiredError');
            assert.strictEqual(e.status, 402);
            assert.strictEqual(e.statusCode, 402);
        }
    })

    it("when status is PaymentRequired", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(402, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg PaymentRequired');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg PaymentRequired');
            assert.strictEqual(e.name, 'PaymentRequiredError');
            assert.strictEqual(e.status, 402);
            assert.strictEqual(e.statusCode, 402);
        }
    })

    it("when status is Forbidden", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(403, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Forbidden');
            assert.strictEqual(e.name, 'ForbiddenError');
            assert.strictEqual(e.status, 403);
            assert.strictEqual(e.statusCode, 403);
        }
    })

    it("when status is Forbidden", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(403, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg Forbidden');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg Forbidden');
            assert.strictEqual(e.name, 'ForbiddenError');
            assert.strictEqual(e.status, 403);
            assert.strictEqual(e.statusCode, 403);
        }
    })

    it("when status is MethodNotAllowed", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(405, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Method Not Allowed');
            assert.strictEqual(e.name, 'MethodNotAllowedError');
            assert.strictEqual(e.status, 405);
            assert.strictEqual(e.statusCode, 405);
        }
    })

    it("when status is MethodNotAllowed", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(405, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg MethodNotAllowed');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg MethodNotAllowed');
            assert.strictEqual(e.name, 'MethodNotAllowedError');
            assert.strictEqual(e.status, 405);
            assert.strictEqual(e.statusCode, 405);
        }
    })

    it("when status is NotAcceptable", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(406, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Not Acceptable');
            assert.strictEqual(e.name, 'NotAcceptableError');
            assert.strictEqual(e.status, 406);
            assert.strictEqual(e.statusCode, 406);
        }
    })

    it("when status is NotAcceptable", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(406, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg NotAcceptable');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg NotAcceptable');
            assert.strictEqual(e.name, 'NotAcceptableError');
            assert.strictEqual(e.status, 406);
            assert.strictEqual(e.statusCode, 406);
        }
    })

    it("when status is ProxyAuthenticationRequired", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(407, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Proxy Authentication Required');
            assert.strictEqual(e.name, 'ProxyAuthenticationRequiredError');
            assert.strictEqual(e.status, 407);
            assert.strictEqual(e.statusCode, 407);
        }
    })

    it("when status is ProxyAuthenticationRequired", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(407, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg ProxyAuthenticationRequired');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg ProxyAuthenticationRequired');
            assert.strictEqual(e.name, 'ProxyAuthenticationRequiredError');
            assert.strictEqual(e.status, 407);
            assert.strictEqual(e.statusCode, 407);
        }
    })

    it("when status is RequestTimeout", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(408, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Request Timeout');
            assert.strictEqual(e.name, 'RequestTimeoutError');
            assert.strictEqual(e.status, 408);
            assert.strictEqual(e.statusCode, 408);
        }
    })

    it("when status is RequestTimeout", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(408, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg RequestTimeout');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg RequestTimeout');
            assert.strictEqual(e.name, 'RequestTimeoutError');
            assert.strictEqual(e.status, 408);
            assert.strictEqual(e.statusCode, 408);
        }
    })

    it("when status is Conflict", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(409, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Conflict');
            assert.strictEqual(e.name, 'ConflictError');
            assert.strictEqual(e.status, 409);
            assert.strictEqual(e.statusCode, 409);
        }
    })

    it("when status is Conflict", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(409, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg Conflict');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg Conflict');
            assert.strictEqual(e.name, 'ConflictError');
            assert.strictEqual(e.status, 409);
            assert.strictEqual(e.statusCode, 409);
        }
    })

    it("when status is Gone", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(410, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Gone');
            assert.strictEqual(e.name, 'GoneError');
            assert.strictEqual(e.status, 410);
            assert.strictEqual(e.statusCode, 410);
        }
    })

    it("when status is Gone", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(410, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg Gone');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg Gone');
            assert.strictEqual(e.name, 'GoneError');
            assert.strictEqual(e.status, 410);
            assert.strictEqual(e.statusCode, 410);
        }
    })

    it("when status is LengthRequired", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(411, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Length Required');
            assert.strictEqual(e.name, 'LengthRequiredError');
            assert.strictEqual(e.status, 411);
            assert.strictEqual(e.statusCode, 411);
        }
    })

    it("when status is LengthRequired", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(411, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg LengthRequired');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg LengthRequired');
            assert.strictEqual(e.name, 'LengthRequiredError');
            assert.strictEqual(e.status, 411);
            assert.strictEqual(e.statusCode, 411);
        }
    })

    it("when status is PreconditionFailed", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(412, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Precondition Failed');
            assert.strictEqual(e.name, 'PreconditionFailedError');
            assert.strictEqual(e.status, 412);
            assert.strictEqual(e.statusCode, 412);
        }
    })

    it("when status is PreconditionFailed", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(412, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg PreconditionFailed');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg PreconditionFailed');
            assert.strictEqual(e.name, 'PreconditionFailedError');
            assert.strictEqual(e.status, 412);
            assert.strictEqual(e.statusCode, 412);
        }
    })

    it("when status is PayloadTooLarge", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(413, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Payload Too Large');
            assert.strictEqual(e.name, 'PayloadTooLargeError');
            assert.strictEqual(e.status, 413);
            assert.strictEqual(e.statusCode, 413);
        }
    })

    it("when status is PayloadTooLarge", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(413, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg PayloadTooLarge');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg PayloadTooLarge');
            assert.strictEqual(e.name, 'PayloadTooLargeError');
            assert.strictEqual(e.status, 413);
            assert.strictEqual(e.statusCode, 413);
        }
    })

    it("when status is URITooLong", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(414, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'URI Too Long');
            assert.strictEqual(e.name, 'URITooLongError');
            assert.strictEqual(e.status, 414);
            assert.strictEqual(e.statusCode, 414);
        }
    })

    it("when status is URITooLong", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(414, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg URITooLong');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg URITooLong');
            assert.strictEqual(e.name, 'URITooLongError');
            assert.strictEqual(e.status, 414);
            assert.strictEqual(e.statusCode, 414);
        }
    })

    it("when status is UnsupportedMediaType", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(415, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Unsupported Media Type');
            assert.strictEqual(e.name, 'UnsupportedMediaTypeError');
            assert.strictEqual(e.status, 415);
            assert.strictEqual(e.statusCode, 415);
        }
    })

    it("when status is UnsupportedMediaType", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(415, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg UnsupportedMediaType');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg UnsupportedMediaType');
            assert.strictEqual(e.name, 'UnsupportedMediaTypeError');
            assert.strictEqual(e.status, 415);
            assert.strictEqual(e.statusCode, 415);
        }
    })

    it("when status is RangeNotSatisfiable", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(416, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Range Not Satisfiable');
            assert.strictEqual(e.name, 'RangeNotSatisfiableError');
            assert.strictEqual(e.status, 416);
            assert.strictEqual(e.statusCode, 416);
        }
    })

    it("when status is RangeNotSatisfiable", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(416, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg RangeNotSatisfiable');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg RangeNotSatisfiable');
            assert.strictEqual(e.name, 'RangeNotSatisfiableError');
            assert.strictEqual(e.status, 416);
            assert.strictEqual(e.statusCode, 416);
        }
    })

    it("when status is ExpectationFailed", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(417, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Expectation Failed');
            assert.strictEqual(e.name, 'ExpectationFailedError');
            assert.strictEqual(e.status, 417);
            assert.strictEqual(e.statusCode, 417);
        }
    })

    it("when status is ExpectationFailed", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(417, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg ExpectationFailed');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg ExpectationFailed');
            assert.strictEqual(e.name, 'ExpectationFailedError');
            assert.strictEqual(e.status, 417);
            assert.strictEqual(e.statusCode, 417);
        }
    })

    it("when status is ImATeapot", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(418, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, "I'm a teapot");
            assert.strictEqual(e.name, 'ImATeapotError');
            assert.strictEqual(e.status, 418);
            assert.strictEqual(e.statusCode, 418);
        }
    })

    it("when status is ImATeapot", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(418, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg ImATeapot');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg ImATeapot');
            assert.strictEqual(e.name, 'ImATeapotError');
            assert.strictEqual(e.status, 418);
            assert.strictEqual(e.statusCode, 418);
        }
    })

    it("when status is MisdirectedRequest", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(421, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Misdirected Request');
            assert.strictEqual(e.name, 'MisdirectedRequestError');
            assert.strictEqual(e.status, 421);
            assert.strictEqual(e.statusCode, 421);
        }
    })

    it("when status is MisdirectedRequest", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(421, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg MisdirectedRequest');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg MisdirectedRequest');
            assert.strictEqual(e.name, 'MisdirectedRequestError');
            assert.strictEqual(e.status, 421);
            assert.strictEqual(e.statusCode, 421);
        }
    })

    it("when status is UnprocessableEntity", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(422, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Unprocessable Entity');
            assert.strictEqual(e.name, 'UnprocessableEntityError');
            assert.strictEqual(e.status, 422);
            assert.strictEqual(e.statusCode, 422);
        }
    })

    it("when status is UnprocessableEntity", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(422, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg UnprocessableEntity');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg UnprocessableEntity');
            assert.strictEqual(e.name, 'UnprocessableEntityError');
            assert.strictEqual(e.status, 422);
            assert.strictEqual(e.statusCode, 422);
        }
    })

    it("when status is Locked", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(423, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Locked');
            assert.strictEqual(e.name, 'LockedError');
            assert.strictEqual(e.status, 423);
            assert.strictEqual(e.statusCode, 423);
        }
    })

    it("when status is Locked", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(423, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg Locked');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg Locked');
            assert.strictEqual(e.name, 'LockedError');
            assert.strictEqual(e.status, 423);
            assert.strictEqual(e.statusCode, 423);
        }
    })

    it("when status is FailedDependency", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(424, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Failed Dependency');
            assert.strictEqual(e.name, 'FailedDependencyError');
            assert.strictEqual(e.status, 424);
            assert.strictEqual(e.statusCode, 424);
        }
    })

    it("when status is FailedDependency", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(424, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg FailedDependency');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg FailedDependency');
            assert.strictEqual(e.name, 'FailedDependencyError');
            assert.strictEqual(e.status, 424);
            assert.strictEqual(e.statusCode, 424);
        }
    })

    it("when status is UnorderedCollection", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(425, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Unordered Collection');
            assert.strictEqual(e.name, 'UnorderedCollectionError');
            assert.strictEqual(e.status, 425);
            assert.strictEqual(e.statusCode, 425);
        }
    })

    it("when status is UnorderedCollection", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(425, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg UnorderedCollection');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg UnorderedCollection');
            assert.strictEqual(e.name, 'UnorderedCollectionError');
            assert.strictEqual(e.status, 425);
            assert.strictEqual(e.statusCode, 425);
        }
    })

    it("when status is UpgradeRequired", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(426, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Upgrade Required');
            assert.strictEqual(e.name, 'UpgradeRequiredError');
            assert.strictEqual(e.status, 426);
            assert.strictEqual(e.statusCode, 426);
        }
    })

    it("when status is UpgradeRequired", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(426, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg UpgradeRequired');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg UpgradeRequired');
            assert.strictEqual(e.name, 'UpgradeRequiredError');
            assert.strictEqual(e.status, 426);
            assert.strictEqual(e.statusCode, 426);
        }
    })

    it("when status is PreconditionRequired", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(428, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Precondition Required');
            assert.strictEqual(e.name, 'PreconditionRequiredError');
            assert.strictEqual(e.status, 428);
            assert.strictEqual(e.statusCode, 428);
        }
    })

    it("when status is PreconditionRequired", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(428, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg PreconditionRequired');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg PreconditionRequired');
            assert.strictEqual(e.name, 'PreconditionRequiredError');
            assert.strictEqual(e.status, 428);
            assert.strictEqual(e.statusCode, 428);
        }
    })

    it("when status is TooManyRequests", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(429, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Too Many Requests');
            assert.strictEqual(e.name, 'TooManyRequestsError');
            assert.strictEqual(e.status, 429);
            assert.strictEqual(e.statusCode, 429);
        }
    })

    it("when status is TooManyRequests", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(429, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg TooManyRequests');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg TooManyRequests');
            assert.strictEqual(e.name, 'TooManyRequestsError');
            assert.strictEqual(e.status, 429);
            assert.strictEqual(e.statusCode, 429);
        }
    })

    it("when status is RequestHeaderFieldsTooLarge", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(431, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Request Header Fields Too Large');
            assert.strictEqual(e.name, 'RequestHeaderFieldsTooLargeError');
            assert.strictEqual(e.status, 431);
            assert.strictEqual(e.statusCode, 431);
        }
    })

    it("when status is RequestHeaderFieldsTooLarge", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(431, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg RequestHeaderFieldsTooLarge');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg RequestHeaderFieldsTooLarge');
            assert.strictEqual(e.name, 'RequestHeaderFieldsTooLargeError');
            assert.strictEqual(e.status, 431);
            assert.strictEqual(e.statusCode, 431);
        }
    })

    it("when status is UnavailableForLegalReasons", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(451, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Unavailable For Legal Reasons');
            assert.strictEqual(e.name, 'UnavailableForLegalReasonsError');
            assert.strictEqual(e.status, 451);
            assert.strictEqual(e.statusCode, 451);
        }
    })

    it("when status is UnavailableForLegalReasons", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(451, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg UnavailableForLegalReasons');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg UnavailableForLegalReasons');
            assert.strictEqual(e.name, 'UnavailableForLegalReasonsError');
            assert.strictEqual(e.status, 451);
            assert.strictEqual(e.statusCode, 451);
        }
    })

    it("when status is InternalServerError", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(500, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Internal Server Error');
            assert.strictEqual(e.name, 'InternalServerError');
            assert.strictEqual(e.status, 500);
            assert.strictEqual(e.statusCode, 500);
        }
    })

    it("when status is InternalServerError", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(500, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg InternalServerError');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg InternalServerError');
            assert.strictEqual(e.name, 'InternalServerError');
            assert.strictEqual(e.status, 500);
            assert.strictEqual(e.statusCode, 500);
        }
    })

    it("when status is NotImplemented", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(501, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Not Implemented');
            assert.strictEqual(e.name, 'NotImplementedError');
            assert.strictEqual(e.status, 501);
            assert.strictEqual(e.statusCode, 501);
        }
    })

    it("when status is NotImplemented", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(501, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg NotImplemented');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg NotImplemented');
            assert.strictEqual(e.name, 'NotImplementedError');
            assert.strictEqual(e.status, 501);
            assert.strictEqual(e.statusCode, 501);
        }
    })

    it("when status is BadGateway", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(502, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Bad Gateway');
            assert.strictEqual(e.name, 'BadGatewayError');
            assert.strictEqual(e.status, 502);
            assert.strictEqual(e.statusCode, 502);
        }
    })

    it("when status is BadGateway", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(502, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg BadGateway');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg BadGateway');
            assert.strictEqual(e.name, 'BadGatewayError');
            assert.strictEqual(e.status, 502);
            assert.strictEqual(e.statusCode, 502);
        }
    })

    it("when status is ServiceUnavailable", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(503, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Service Unavailable');
            assert.strictEqual(e.name, 'ServiceUnavailableError');
            assert.strictEqual(e.status, 503);
            assert.strictEqual(e.statusCode, 503);
        }
    })

    it("when status is ServiceUnavailable", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(503, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg ServiceUnavailable');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg ServiceUnavailable');
            assert.strictEqual(e.name, 'ServiceUnavailableError');
            assert.strictEqual(e.status, 503);
            assert.strictEqual(e.statusCode, 503);
        }
    })

    it("when status is GatewayTimeout", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(504, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Gateway Timeout');
            assert.strictEqual(e.name, 'GatewayTimeoutError');
            assert.strictEqual(e.status, 504);
            assert.strictEqual(e.statusCode, 504);
        }
    })

    it("when status is GatewayTimeout", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(504, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg GatewayTimeout');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg GatewayTimeout');
            assert.strictEqual(e.name, 'GatewayTimeoutError');
            assert.strictEqual(e.status, 504);
            assert.strictEqual(e.statusCode, 504);
        }
    })

    it("when status is HTTPVersionNotSupported", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(505, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'HTTP Version Not Supported');
            assert.strictEqual(e.name, 'HTTPVersionNotSupportedError');
            assert.strictEqual(e.status, 505);
            assert.strictEqual(e.statusCode, 505);
        }
    })

    it("when status is HTTPVersionNotSupported", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(505, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg HTTPVersionNotSupported');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg HTTPVersionNotSupported');
            assert.strictEqual(e.name, 'HTTPVersionNotSupportedError');
            assert.strictEqual(e.status, 505);
            assert.strictEqual(e.statusCode, 505);
        }
    })

    it("when status is VariantAlsoNegotiates", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(506, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Variant Also Negotiates');
            assert.strictEqual(e.name, 'VariantAlsoNegotiatesError');
            assert.strictEqual(e.status, 506);
            assert.strictEqual(e.statusCode, 506);
        }
    })

    it("when status is VariantAlsoNegotiates", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(506, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg VariantAlsoNegotiates');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg VariantAlsoNegotiates');
            assert.strictEqual(e.name, 'VariantAlsoNegotiatesError');
            assert.strictEqual(e.status, 506);
            assert.strictEqual(e.statusCode, 506);
        }
    })

    it("when status is InsufficientStorage", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(507, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Insufficient Storage');
            assert.strictEqual(e.name, 'InsufficientStorageError');
            assert.strictEqual(e.status, 507);
            assert.strictEqual(e.statusCode, 507);
        }
    })

    it("when status is InsufficientStorage", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(507, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg InsufficientStorage');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg InsufficientStorage');
            assert.strictEqual(e.name, 'InsufficientStorageError');
            assert.strictEqual(e.status, 507);
            assert.strictEqual(e.statusCode, 507);
        }
    })

    it("when status is LoopDetected", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(508, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Loop Detected');
            assert.strictEqual(e.name, 'LoopDetectedError');
            assert.strictEqual(e.status, 508);
            assert.strictEqual(e.statusCode, 508);
        }
    })

    it("when status is LoopDetected", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(508, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg LoopDetected');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg LoopDetected');
            assert.strictEqual(e.name, 'LoopDetectedError');
            assert.strictEqual(e.status, 508);
            assert.strictEqual(e.statusCode, 508);
        }
    })

    it("when status is BandwidthLimitExceeded", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(509, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Bandwidth Limit Exceeded');
            assert.strictEqual(e.name, 'BandwidthLimitExceededError');
            assert.strictEqual(e.status, 509);
            assert.strictEqual(e.statusCode, 509);
        }
    })

    it("when status is BandwidthLimitExceeded", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(509, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg BandwidthLimitExceeded');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg BandwidthLimitExceeded');
            assert.strictEqual(e.name, 'BandwidthLimitExceededError');
            assert.strictEqual(e.status, 509);
            assert.strictEqual(e.statusCode, 509);
        }
    })

    it("when status is NotExtended", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(510, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Not Extended');
            assert.strictEqual(e.name, 'NotExtendedError');
            assert.strictEqual(e.status, 510);
            assert.strictEqual(e.statusCode, 510);
        }
    })

    it("when status is NotExtended", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(510, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg NotExtended');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg NotExtended');
            assert.strictEqual(e.name, 'NotExtendedError');
            assert.strictEqual(e.status, 510);
            assert.strictEqual(e.statusCode, 510);
        }
    })

    it("when status is NetworkAuthenticationRequired", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(511, 'HEHE!');

        try {
            const resp = await errorHandle(req);
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Network Authentication Required');
            assert.strictEqual(e.name, 'NetworkAuthenticationRequiredError');
            assert.strictEqual(e.status, 511);
            assert.strictEqual(e.statusCode, 511);
        }
    })

    it("when status is NetworkAuthenticationRequired", async () => {
        nock('http://example.test')
            .persist(false)
            .get('/')
            .reply(511, 'HEHE!');

        try {
            const resp = await errorHandle(req, 'Custom msg NetworkAuthenticationRequired');
            assert.fail('expected exception not thrown');
        } catch (e) {
            assert.strictEqual(e.message, 'Custom msg NetworkAuthenticationRequired');
            assert.strictEqual(e.name, 'NetworkAuthenticationRequiredError');
            assert.strictEqual(e.status, 511);
            assert.strictEqual(e.statusCode, 511);
        }
    })

})