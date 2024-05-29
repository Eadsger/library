const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }

    toggleReadStatus() {
        this.read = !this.read;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
    displayBooks();
}

function displayBooks() {
    const library = document.getElementById('library');
    library.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const bookCard = document.createElement('div');
        bookCard.classList.add('book-card');
        bookCard.dataset.index = index;

        const title = document.createElement('p');
        title.textContent = `Title: ${book.title}`;
        bookCard.appendChild(title);

        const author = document.createElement('p');
        author.textContent = `Author: ${book.author}`;
        bookCard.appendChild(author);

        const pages = document.createElement('p');
        pages.textContent = `Pages: ${book.pages}`;
        bookCard.appendChild(pages);

        const read = document.createElement('p');
        read.textContent = `Read: ${book.read ? 'Yes' : 'No'}`;
        bookCard.appendChild(read);

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBooks();
        });
        bookCard.appendChild(removeBtn);

        const toggleReadBtn = document.createElement('button');
        toggleReadBtn.textContent = 'Toggle Read Status';
        toggleReadBtn.addEventListener('click', () => {
            book.toggleReadStatus();
            displayBooks();
        });
        bookCard.appendChild(toggleReadBtn);

        library.appendChild(bookCard);
    });
}

document.getElementById('newBookBtn').addEventListener('click', () => {
    const bookForm = document.getElementById('bookForm');
    bookForm.style.display = bookForm.style.display === 'none' ? 'block' : 'none';
});

document.getElementById('bookForm').addEventListener('submit', (event) => {
    event.preventDefault();

    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;

    const newBook = new Book(title, author, pages, read);
    addBookToLibrary(newBook);

    event.target.reset();
    document.getElementById('bookForm').style.display = 'none';
});

// Add a few books manually for testing
addBookToLibrary(new Book('The Hobbit', 'J.R.R. Tolkien', 310, true));
addBookToLibrary(new Book('1984', 'George Orwell', 328, false));
