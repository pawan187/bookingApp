const chaiHttp = require('chai-http');
const chai = require('chai');
const app = require('./index'); // Assuming your Express app is exported from index.js
const expect = chai.expect;

chai.use(chaiHttp);

describe('GET /book-availability/:book_name', () => {
    it('should return days to return for a valid book', (done) => {
        chai.request(app)
            .get('/booking/book-availability/psst huzzah meh')
            .end((err, res) => {
                expect(res).to.have.status(200);
                done();
            });
    });

    it('should return 404 if book not found', (done) => {
        chai.request(app)
            .get('/booking/book-availability/asfdasfd')
            .end((err, res) => {
                expect(res).to.have.status(404);
                done();
            });
    });
});
