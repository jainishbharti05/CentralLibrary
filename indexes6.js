console.log('This is ES6 version of Project 2');
showBook();

class Book {
    constructor(name, author, type) {
        this.name = name;
        this.author = author;
        this.type = type;
    }
}

class Display {

    add() {
        console.log("Adding to UI");
        let Books = JSON.parse(localStorage.getItem('Books'));
        let tableBody = document.getElementById('tableBody');
        tableBody.innerHTML = '';
        Array.from(Books).forEach(element => {
            let uiString = `<tr>
                                  <td>${element.name}</td>
                                  <td>${element.author}</td>
                                  <td>${element.type}</td>
                            </tr>`;
            if (bookArr.length != 0) {
                tableBody.innerHTML += uiString;
            }
            else {
                tableBody.innerHTML = `No books added yet. Add some book`
            }
        });
    }

    clear() {
        let libraryForm = document.getElementById('libraryForm');
        libraryForm.reset();
    }

    validate(book) {
        if (book.name.length < 2 || book.author.length < 2) {
            return false;
        }
        else {
            return true;
        }
    }

    show(type, displayMessage) {
        let message = document.getElementById('message');
        let boldText;
        if (type === 'success') {
            boldText = 'Success';
        }
        else {
            boldText = 'Error!';
        }
        message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                                <strong>${boldText}:</strong> ${displayMessage}
                                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                                <span aria-hidden="true">×</span>
                                </button>
                            </div>`;
        setTimeout(function () {
            message.innerHTML = '';
        }, 5000);

    }
}

// Add submit event listener to libraryForm
let libraryForm = document.getElementById('libraryForm');
libraryForm.addEventListener('submit', libraryFormSubmit);

function libraryFormSubmit(e) {
    console.log('You have submitted library form');
    let name = document.getElementById('bookName').value;
    let author = document.getElementById('author').value;
    let type;
    let fiction = document.getElementById('fiction');
    let programming = document.getElementById('programming');
    let cooking = document.getElementById('cooking');

    if (fiction.checked) {
        type = fiction.value;
    }
    else if (programming.checked) {
        type = programming.value;
    }
    else if (cooking.checked) {
        type = cooking.value;
    }

    let book = new Book(name, author, type);
    let books = localStorage.getItem('Books');
    if (books == null) {
        var bookArr = [];
    }
    else {
        bookArr = JSON.parse(books);
    }
    bookArr.push(book);
    localStorage.setItem('Books', JSON.stringify(bookArr));

    let display = new Display();

    if (display.validate(book)) {

        display.add();
        display.clear();
        display.show('success', 'Your book has been successfully added')
    }
    else {
        // Show error to the user
        display.show('danger', 'Sorry you cannot add this book');
    }

    e.preventDefault();
}

function deleteBook(index){
    console.log(`Remove Action initiated for ${index} `);
    let Books = JSON.parse(localStorage.getItem('Books'));
    let newArr = Array.from(Books);
    newArr.splice(index, 1);
    console.log(newArr);
    localStorage.setItem('Books', JSON.stringify(newArr));
    showBook();
}


function showBook() {
    let Books = JSON.parse(localStorage.getItem('Books'));
    let tableBody = document.getElementById('tableBody');
    tableBody.innerHTML = '';
    Array.from(Books).forEach(function(element, index){
        let uiString = `<tr>
                                  <td>${element.name}</td>
                                  <td>${element.author}</td>
                                  <td>${element.type}</td>
                                  <td><button id="${index}" onclick="deleteBook(this.id)" class="newBtn btn btn-secondary">Remove</button></td>
                            </tr>`;
        tableBody.innerHTML += uiString;
    });
} 







