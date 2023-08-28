const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

const container = document.querySelector("#container");

addBookToLibrary("The Bible", "Johannes", 1988, false);
addBookToLibrary("Robert's memoirs", "Robert Arning", 1, true);
addBookToLibrary("The Swan", "Dr. Frank Pechart", 321, true);
addBookToLibrary("I was once lost", "Machiavelli", 864, false);

const displayLibrary = function () {
  for (book of myLibrary) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("card");

    let bookCardTitle = document.createElement("div");
    bookCardTitle.classList.add("title");
    bookCardTitle.textContent = book.title;
    bookCard.appendChild(bookCardTitle);

    let bookCardAuthor = document.createElement("div");
    bookCardAuthor.classList.add("author");
    bookCardAuthor.textContent = book.author;
    bookCard.appendChild(bookCardAuthor);

    let bookCardPages = document.createElement("div");
    bookCardPages.classList.add("pages");
    bookCardPages.textContent = book.pages;
    bookCard.appendChild(bookCardPages);

    let bookCardRead = document.createElement("div");
    bookCardRead.classList.add("read");
    bookCardRead.textContent = book.read;
    bookCard.appendChild(bookCardRead);

    container.appendChild(bookCard);
  }
};

displayLibrary();
