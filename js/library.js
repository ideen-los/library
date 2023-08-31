/* CREATE LIBRARY ARRAY & BOOK CONSTRUCTOR */
const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

/* CREATE BOOK CONTAINER */
const container = document.querySelector("#container");

/* CREATE FUNCTION TO DISPLAY THE LIBRARY */
const displayLibrary = function () {
  container.innerHTML = "";

  for (book of myLibrary) {
    /* create card and book infos */
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

    let bookCardRead = document.createElement("label");
    bookCardRead.classList.add("switch");
    bookCardRead.setAttribute("data-book-id", book.index);
    bookCardRead.addEventListener("click", bookReadToggle);
    let bookCardRead_input = document.createElement("input");
    bookCardRead_input.type = "checkbox";
    let bookCardRead_span = document.createElement("span");
    bookCardRead_span.textContent = "Mark as Read";
    bookCardRead_span.classList.add("btn");
    bookCardRead.appendChild(bookCardRead_input);
    bookCardRead.appendChild(bookCardRead_span);
    bookCard.appendChild(bookCardRead);

    if (book.read === "Yes") {
      bookCardRead_input.checked = true;
    }

    let bookCardDelete = document.createElement("button");
    bookCardDelete.classList.add("btn");
    bookCardDelete.classList.add("btn-delete");
    /* get the position of the book inside the array via its index property and add it as data-book-id attribute to the button */
    bookCardDelete.setAttribute("data-book-id", book.index);
    bookCardDelete.textContent = "Delete Book";
    bookCardDelete.addEventListener("click", deleteBook);
    bookCard.appendChild(bookCardDelete);

    /* add card with the book infos to the container div */
    container.appendChild(bookCard);
  }
};

/* ADD EVENTLISTENERS TO TRIGGER & CLOSE THE MODAL */
const modal = document.querySelector("#modal");
const modalContent = document.querySelector(".modal-content");

const showModalButton = document.querySelector("#btn-show");
const closeModalButton = document.querySelector("#btn-close");

showModalButton.addEventListener("click", (e) => {
  modal.style.display = "flex";
});

closeModalButton.addEventListener("click", (e) => {
  modal.style.display = "none";
  e.preventDefault();
});

/* CREATE FUNCTION TO CLOSE THE MODAL WHEN CLICKING ANYWHERE BUT THE MODAL CONTENT */
window.addEventListener("click", (e) => {
  if (e.target == modal) {
    modal.style.display = "none";
  }
});

/* ADD EVENTLISTENERS TO SUBMIT THE FORM */
const addBookForm = document.querySelector("#add-book-form");
addBookForm.addEventListener("submit", submitForm);

/* CREATE FUNCTION TO GET THE VALUES OF THE FORM INPUTS AND CREATE A NEW BOOK OBJECT WITH THOSE VALUES ON SUBMIT */
function submitForm(e) {
  let addBookTitle = document.querySelector("#title");
  let addBookAuthor = document.querySelector("#author");
  let addBookPages = document.querySelector("#pages");
  let addBookRead = document.querySelector("#read");

  /* create new book and push to myLibrary array & save its position (index) in the variable indexOfBookInArray */
  let indexOfBookInArray = myLibrary.push(
    new Book(
      addBookTitle.value,
      addBookAuthor.value,
      addBookPages.value,
      addBookRead.value
    )
  );

  /* create a property with the value of indexOfBookInArray that we just saved */
  myLibrary[indexOfBookInArray - 1].index = indexOfBookInArray - 1;

  displayLibrary();
  e.preventDefault();

  /* clean up the form */
  addBookTitle.value = "";
  addBookAuthor.value = "";
  addBookPages.value = "";
  addBookRead.value = "";

  /* close modal */
  modal.style.display = "none";
}

/* CREATE Read TOGGLE FUNCTION */
function bookReadToggle(e) {
  /* prevent synthetic click on the input by browser to prevent event bubbling up a second time to the currentTarget */
  e.preventDefault();
  const checkbox = e.currentTarget.querySelector('input[type="checkbox"]');

  /* if checkbox is checked uncheck it and vice versa */
  checkbox.checked = !checkbox.checked;

  /* get index of the element that has been clicked on */
  let indexOfBookInArray = e.currentTarget.dataset.bookId;

  if (myLibrary[indexOfBookInArray].read === "Yes") {
    myLibrary[indexOfBookInArray].read = "No";
  } else if (
    myLibrary[indexOfBookInArray].read === "No" ||
    myLibrary[indexOfBookInArray].read === ""
  ) {
    myLibrary[indexOfBookInArray].read = "Yes";
  }

  displayLibrary();
}

/* CREATE DELETE-BOOK FUNCTION */
function deleteBook(e) {
  /* get the data-book-id value of the element */
  let indexOfBookInArray = e.target.dataset.bookId;

  /* remove the index that euqals the data-book-id from the array */
  myLibrary.splice(indexOfBookInArray, 1);

  /* update the index value of all books to represent their new position inside the array */
  for (i = indexOfBookInArray; i < myLibrary.length; i++) {
    myLibrary[i].index -= 1;
  }

  displayLibrary();
}
