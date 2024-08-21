export class User {
    constructor() {
        this.books = [];
    }

    borrow(book, library) {
        this.books.push(book);
        library.removeBook(book);
    }

    hasBook(book) {
        return this.books.includes(book);
    }

    return(book, library) {
        if(this.books.includes(book)){
        library.addBook(book);
        this.books = this.books.filter(b => b !== book);
        } else {
            return false;
        }

    }

    getBookNames() {
        return this.books.map(b => b.name);
    }
}