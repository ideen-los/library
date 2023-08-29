/* DEFINE LIBRARY ARRAY & BOOK CONSTRUCTOR */
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/* DEFINE FUNCTION TO ADD A NEW BOOK TO THE LIBRARY */
function addBookToLibrary(title, author, pages, read) {
  myLibrary.push(new Book(title, author, pages, read));
}

/* DEFINE BOOK CONTRAINER & FUNCTION TO DISPLAY THE LIBRARY */
const container = document.querySelector("#container");

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

/* ADD EVENTLISTENERS TO TRIGGER ADD-A-NEW-BOOK DIALOG & SUBMIT THE FORM */
const addBookDialog = document.querySelector("#add-book-dialog");

const showDialogButton = document.querySelector(".show-btn");
showDialogButton.addEventListener("click", (e) => {
  addBookDialog.showModal();
});

const addBookForm = document.querySelector("#add-book-form");
addBookForm.addEventListener("submit", submitForm);

/* GET VALUE OF FORM INPUTS AND CALL ADD-A-NEW-BOOK FUNCTION ON SUBMIT */
function submitForm(e) {
  let addBookTitle = document.querySelector("#title");
  let addBookAuthor = document.querySelector("#author");
  let addBookPages = document.querySelector("#pages");
  let addBookRead = document.querySelector("#read");

  addBookToLibrary(
    addBookTitle.value,
    addBookAuthor.value,
    addBookPages.value,
    addBookRead.value
  );

  container.innerHTML = "";
  displayLibrary();
  e.preventDefault();
  addBookTitle.value = "";
  addBookAuthor.value = "";
  addBookPages.value = "";
  addBookRead.value = "";
  addBookDialog.close();
}
