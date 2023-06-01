const request = require('supertest');
const server = `http://localhost:${process.env.PORT || 5000}`;

// testing for HTML first
describe('Route integration', () => {
    describe('/', () => {
        describe('GET', () => {
        it('responds with 200 status and text/html content type', () => {
            return request(server)
            .get('/')
            .expect('Content-Type', /text\/html/)
            .expect(200);
        });
        });
    });


    // testing post request
    describe('/new-warehouse', () => {
        describe('POST', () => {
        it('responds with 200 status and application/json content type', () =>
            request(server)
            .post('/new-warehouse')
            .expect('Content-Type', /application\/json/)
            .expect(200));

        it('Testing for the return of the request', () => {
            return request(server)
            .post('/new-warehouse')
            .send({
                name: 'papaya',
                zoneValues: [
                  5, 5, 5, 5, 5,
                  5, 5, 5, 5, 5,
                  5, 5
                ]
              })
              .then(({body}) => {
                expect(body).toEqual({
                    name: 'papaya',
                    zoneValues: [
                      5, 5, 5, 5, 5,
                      5, 5, 5, 5, 5,
                      5, 5
                    ]
                  })
              })
            });
        });
    })
});