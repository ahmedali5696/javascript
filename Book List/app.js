/*jshint esversion: 6 */

// Book class
class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}


// UI class
class UI {
  constructor() {}

  // Add book to list
  addBookToList(book) {
    const bookList = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href"#" class="delete">X</a></td>
  `;

    bookList.appendChild(row);
  }

  setMassege(msg, className) {
    // Alert Massege Element
    const p = document.getElementById('msg');
    p.className = `alert ${className}`;
    p.textContent = msg;

    // Get Uis to specify element place
    const form = document.querySelector('#book-form');
    const container = document.querySelector('.container');

    // Remove massege
    setTimeout(() => {
      p.textContent = '';
      p.classList = '';
    }, 3000);
  }

  // Delete book from list
  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.parentElement.remove();
    }
  }
}

// Stor book in LS
class Store {
  static getBook() {
    let books;
    if (localStorage.getItem('book') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('book'));
    }

    return books;
  }

  static addBookToLs(book) {
    const books = Store.getBook();
    books.push(book);
    localStorage.setItem('book', JSON.stringify(books));
  }

  static displayBook() {
    const books = Store.getBook();

    books.forEach((book) => {
      const ui = new UI();
      ui.addBookToList(book);
    });
  }

  static removeBookFromLs(isbn) {
    const books = Store.getBook();

    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('book', JSON.stringify(books));
  }
}

// Load events
loadAllEventListener();

// Group All event listener
function loadAllEventListener() {
  // Add book listener
  document.getElementById('book-form').addEventListener('submit', addBook);

  // Remove book listener
  document.getElementById('book-list').addEventListener('click', removeBook);

  // Load Books from LS
  document.addEventListener('DOMContentLoaded', Store.displayBook);
}

// Add book
function addBook(e) {
  // Get form values
  const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value;

  // instantiate Book
  const book = new Book(title, author, isbn);

  // instantiate
  const ui = new UI();

  // Validate inputs
  if (title === '' || author === '' || isbn === '') {
    ui.setMassege('Please fill all inputs', 'error');
  } else {

    //  Add Book
    ui.addBookToList(book);
    // Add book to LS
    Store.addBookToLs(book);

    // Clear Inputs
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';

    // Successing massege
    ui.setMassege('Book has been added', 'success');
  }

  e.preventDefault();
}

// Remove Book
function removeBook(e) {
  const ui = new UI();
  ui.deleteBook(e.target);
  Store.removeBookFromLs(e.target.parentElement.previousElementSibling.textContent);
  ui.setMassege('Book has been removed', 'success');
  e.preventDefault();
}