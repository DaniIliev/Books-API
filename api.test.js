const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server');
const expect = chai.expect;

chai.use(chaiHttp);

describe('test Books API', () => {
    let bookId;

    it('should post a book', (done) => {
        const book = {id: "1", title: "Test Book", author: 'Test Author'}

        chai.request(server)
            .post('/books')
            .send(book)
            .end((err, res) => {
                if(err){
                    return done()
                }
                expect(res).to.have.status(201);
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('author');
                bookId = res.body.id
                done()
            });
    })

    it('should get a book by id', (done) => {
        chai.request(server)
            .get(`/books/${bookId}`)
            .end((err, res) => {
                if(err){
                    return done()
                }
                expect(res).to.have.status(200)
                expect(res.body).to.be.a('object');
                expect(res.body).to.have.property('id');
                expect(res.body).to.have.property('title');
                expect(res.body).to.have.property('author');
                done()
            })
    })

})

