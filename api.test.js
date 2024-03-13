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

    it('should get all books', (done) => {
        chai.request(server)
            .get('/books')
            .end((err,res) => {
                if(err){
                    return done();
                }
                expect(res.body).to.be.an('array')
                expect(res).to.have.status(200);
                done()
            })
    })

    it('should put an existing book', (done) => {
        const updatedBook = {id: bookId, title: 'updated Book', author: 'Update Author' }

        chai.request(server)
            .put(`/books/${bookId}`)
            .send(updatedBook)
            .end((err,res) => {
                if(err){
                    return err;
                }
                expect(res).to.have.status(200);
                expect(res.body).to.be.a('object');
                expect(res.body.title).to.equal(updatedBook.title);
                expect(res.body.author).to.be.equal(updatedBook.author)
                done()
            })
    })

    it('should delete book', (done) => {
        chai.request(server)
            .delete(`/books/${bookId}`)
            .end((err, res) => {
                if(err){
                    return done()
                }
                expect(res).to.have.status(204)
                done()
            })
    })

    it('should return 404 when trying to GET, PUT or DELETE a non-existing book', (done) =>{
        const noExistingBook = {id: "9999", title: "No Exist", author: 'No Exist'}
        chai.request(server)
            .get('/books/999')
            .end((err, res) => {
                if(err){
                    return done()
                }
                expect(res).to.have.status(404);
            })

        chai.request(server)
            .post('/books/999')
            .send(noExistingBook)
            .end((err, res) => {
                if(err){
                    return done()
                }
                expect(res).to.have.status(404);
            })

        chai.request(server)
            .delete('/books/999')
            .end((err, res) => {
                if(err){
                    return done()
                }
                expect(res).to.have.status(404);
            })

            done()
    })

})

