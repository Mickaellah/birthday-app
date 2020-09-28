// Grab some elements which are used in this project.
const personList = document.querySelector('.people');
const addBttn = document.querySelector('.add');

// A function that fetch the data.
async function fetchPeople() {
    const response = await fetch('./people.json');
    const data = await response.json();
    let result = [];
    result = data;

    // A functin to display the data into html.
    async function displayPeople() {
        const html = result.map(person => {
            return `
                <ul class="navigation">
                    <li class="list_item">
                        <img class="profile" src="${person.picture}" alt="profile picture">
                    </li>
                    <li class="list_item">
                        ${person.firstName} ${person.lastName}
                    </li>
                    <li class="list_item">${person.birthday}</li>
                    <li class="list_item">
                        <button class="edit" id="${person.id}">
                            <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                        </button>
                    </li>
                    <li class="list_item">
                        <button class="delete" id="${person.id}">
                            <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                        </button>
                    </li>
                </ul>
            `;
        });
        personList.innerHTML = html.join('');
    }
    // personList.addEventListener('editInformation', editLocalStorage);
    displayPeople();

    const wait = (ms = 0) => {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    const destroyPopup = async (popup) => {
        popup.classList.remove('open');
        await wait(1000);
        popup = null;
    }

    // A function for adding new people and handle the add item button.
    const handleAddBttn = async (e) => {
        return new Promise(async function(resolve, reject) {
            let popup = document.createElement('form');
            popup.classList.add('form');

            // HTML for the form that we need for adding some new people.
            const html = `
                <div class="add_form">
                    <h2>Add your name and your birthday</h2>
                    <fieldset>
                        <label for="firstname">First name</label>
                        <input type="text" id="firstname" name="firstName" placeholder="enter your firstname" required>
                    </fieldset>
                    <fieldset>
                        <label for="lastname">Last name</label>
                        <input type="text" id="lastname" name="lastName" placeholder="enter your lastname" required>
                    </fieldset>
                    <fieldset>
                        <label for="birthday">Birthday</label>
                        <input type="date" id="birthday" name="birthday" placeholder="enter your birthday" required>
                    </fieldset>
                    <fieldset>
                        <label for="profile">Avatar image</label>
                        <input type="url" id="profile" name="picture" placeholder="https://onja.org/wp-content/uploads/2019/08/Clopedia@2x-430x520.jpg">
                    </fieldset>
                    <button class="submitbttn" type="submit">Submit</button>
                </div>
            `;
            popup.innerHTML = html;
            resolve();
            destroyPopup(popup);

            // A condition to create the cancel button.
            if (reject) {
                const skipButton = document.createElement('button');
                skipButton.type = "button";
                skipButton.textContent = "Cancel"
                skipButton.classList.add('cancel');
                popup.firstElementChild.appendChild(skipButton);
                skipButton.addEventListener('click', () => {
                    resolve(null);
                    destroyPopup(popup);
                }, { once: true });
            }

            // An event listener for the submit button in the form.
            popup.addEventListener('submit', (e) => {
                e.preventDefault();
                resolve(e.target.input);
                const formEl = e.target;
                const newPerson = {
                    firstName: formEl.firstName.value,
                    lastName: formEl.lastName.value,
                    birthday: formEl.birthday.value,
                    picture: formEl.picture.value,
                    id: Date.now()
                };
                result.push(newPerson);
                personList.dispatchEvent(new CustomEvent('editInformation'));
                displayPeople();
                destroyPopup(popup);
                popup.reset();

                // HTML for grabbing all the values from the form and push them into the page.
                const html = `
                    <ul>
                        <li>
                            <img class="profile" src="${picture}" alt="profile picture">
                        </li>
                        <li>
                            ${firstname} ${lastname}
                        </li>
                        <li>${birthday}</li>
                        <li>
                            <button class="edit">
                                <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                            </button>
                        </li>
                        <li>
                            <button class="delete">
                                <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                            </button>
                        </li>
                    </ul>
                `;
                form.innerHTML = html;
                }, { once: true });
                document.body.appendChild(popup);
                await wait(50);
                popup.classList.add('open');
            });
        };

    // A function that handle delete and edit buttons.
    const handleClick = (e) => {
        const editBtn = e.target.closest('button.edit');

        if (editBtn) {
            const id = Number(editBtn.value);
            handleEditBttn(id);
            console.log("Edit this person's information");
        }

        const deleteBtn = e.target.closest('button.delete');

        if (deleteBtn) {
            const id = Number(deleteBtn.value);
            handleDeleteBttn(id);
            console.log('Delete this information');
        }
    };

    // Handle the edit buttons.
    const handleEditBttn = (id) => {
        return new Promise(async function(resolve, reject) {
            let popup = document.createElement('popup');
            popup.classList.add('form');

            // Find the data which you want to edit.
            const editPerson = result.find(person => person.id === id);

            // HTML for the edit form.
            const html = `
            <div class="edit_form">
                <h2>Edit somebody's information</h2>
                <fieldset>
                    <label for="firstname">Your firstname</label>
                    <input type="text" id="firstname" name="firstname" value="${editPerson.firstName}">
                </fieldset>
                <fieldset>
                    <label for="lastname">Your lastname</label>
                    <input type="text" id="lastname" name="lastname" value="${editPerson.lastName}">
                </fieldset>
                <fieldset>
                    <label for="birthday">Your birthday date</label>
                    <input type="date" id="birthday" name="birthday" value="${editPerson.birthday}">
                </fieldset>
                <fieldset>
                    <label for="picture">Profile picture</label>
                    <input type="url" id="picture" name="picture" value="${editPerson.picture}">
                </fieldset>
                <button class="submitbttn" type="submit">Submit</button>
            </div>
            `;
            popup.insertAdjacentHTML('afterbegin', html);
            destroyPopup(popup);

            // A condition to create a cancel button and handle that button.
            if (reject) {
                const skipButton = document.createElement('button');
                skipButton.type = "button";
                skipButton.textContent = "Cancel"
                skipButton.classList.add('cancel');
                popup.firstElementChild.appendChild(skipButton);
                skipButton.addEventListener('click', () => {
                    resolve(null);
                    destroyPopup(popup);
                });
            }

            document.body.appendChild(popup);
            await wait(50);
            popup.classList.add('open');

            popup.addEventListener('submit', (e) => {
                e.preventDefault();
                const formEl = e.currentTarget;

                const newBirthday = {
                    firstname: formEl.firstName.value,
                    lastname: formEl.lastName.value,
                    birthday: formEl.birthday.value,
                    picture: formEl.picture.value,
                    id: Date.now(),
                };
                result.push(newBirthday);
                resolve(e.currentTarget.remove());
                displayPeople();
                destroyPopup(popup);
                popup.reset();
            });
            document.body.appendChild(popup);
            await wait(50);
            popup.classList.add('open');
            personList.addEventListener('editInformation', editLocalStorage);
        });
    };

    // Handle delete button.
    const handleDeleteBttn = (id) => {
        return new Promise(async function(resolve, reject) {
            let div = document.createElement('div');
            div.classList.add('want_to_delete');

            // HTML for the little popup contains the yes button for accepting the deletion and cancel for reusing.
            const html = `
            <div class="delete_item">
                <h3>Do you want to delete this?</h3>
                <div>
                    <button class="yes" type="button">Ok</button>
                </div>
            </div>
        `;
        div.innerHTML = html;
        resolve();

        const destroyPopup = async () => {
            div.classList.remove('open');
            await wait(1000);
            div.remove();
            div = null;
        }

        
        if (reject) {
            const skipButton = document.createElement('button');
            skipButton.type = "button";
            skipButton.textContent = "Cancel"
            skipButton.classList.add('no');
            div.firstElementChild.appendChild(skipButton);
            skipButton.addEventListener('click', () => {
                resolve(null);
                destroyPopup(div);
            });
        }

        window.addEventListener('click', (e) => {
            if (e.target.matches('button.yes')) {
                console.log('Delete me');
                result = result.filter(person => person.id !== id);
                displayPeople();
                destroyPopup();
            }
        });
        document.body.appendChild(div);
        await wait(50);
        div.classList.add('open');
        personList.addEventListener('editInformation', editLocalStorage);
        });
    };

    // Storing the data into the localeStorage.
    const initLocalStorage = () => {
        const stringForm = localStorage.getItem('result');
        const listItem = JSON.parse(stringForm);
        console.log(listItem);
        if (listItem) {
            result = listItem;
            personList.dispatchEvent(new CustomEvent('editInformation'));
        } else {
            result = [];
        }
    };

    const editLocalStorage = () => {
        localStorage.setItem('result', JSON.stringify(result));
    }

    // Event listener and event delegation.
    addBttn.addEventListener('click', handleAddBttn);
    window.addEventListener('click', handleClick);
    personList.addEventListener('editInformation', editLocalStorage); 

    initLocalStorage();
}

// Call the function.
fetchPeople();