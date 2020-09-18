const personList = document.querySelector('.people');
const addBttn = document.querySelector('.add');


async function fetchPeople() {
    const response = await fetch('./people.json');
    const data = await response.json();
    let result = data;
    return result;
}


async function displayPeople() {
    const people = await fetchPeople();
    const html = people.map(person => {
        return `
            <ul>
                <li>
                    <img class="profile" src="${person.picture}" alt="profile picture">
                </li>
                <li>
                    ${person.firstName} ${person.lastName}
                </li>
                <li>${person.birthday}</li>
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
    });
    personList.innerHTML = html.join('');
}

displayPeople();


const wait = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms));
}



const handleAddBttn = async (e) => {
    return new Promise(async function(resolve, reject) {
        let form = document.createElement('form');
        form.classList.add('form');

        const html = `
        <div class="add_form">
            <h2>Add your name and your birthday</h2>
            <fieldset>
                <label for="first_name">First name</label>
                <input type="text" id="first_name" name="firstname" placeholder="enter your firstname" required>
            </fieldset>
            <fieldset>
                <label for="last_name">Last name</label>
                <input type="text" id="last_name" name="lastname" placeholder="enter your lastname" required>
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
        form.innerHTML = html;

        resolve();

        const destroyPopup = async () => {
            form.classList.remove('open');
            await wait(1000);
            form.remove();
            form = null;
        }
        

        if (reject) {
            const skipButton = document.createElement('button');
            skipButton.type = "button";
            skipButton.textContent = "Cancel"
            skipButton.classList.add('cancel');

            form.firstElementChild.appendChild(skipButton);
            skipButton.addEventListener('click', () => {
                resolve(null);
                destroyPopup(form);
            }, { once: true });
        }

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            resolve(e.target.input.value);
            destroyPopup(form);

            const formEl = e.currentTarget;

            const newDate = {
                firstname: formEl.firstname.value,
                lastname: formEl.lastname.value,
                birthday: formEl.birthday.value,
                picture: formEl.picture.value,
                id: Date.now(),
            };
            result.push(newDate);
            displayPeople();
            destroyPopup(form);
            form.reset();

        }, { once: true });

        document.body.appendChild(form);
        await wait(50);
        form.classList.add('open');
    });
};

const handleClick = (e) => {
    const editBtn = e.target.closest('button.edit');

    if (editBtn) {
        const id = editBtn.value;
        handleEditBttn(id);
        console.log("Edit this person's information");
    }

};

const handleEditBttn = (id) => {
    return new Promise(async function(resolve, reject) {
    let form = document.createElement('form');
    form.classList.add('form');

    const html = `
    <div class="edit_form">
        <fieldset>
            <label for="firstname">Your firstname</label>
            <input type="text" id="firstname" placeholder="your firstname" required>
        </fieldset>
        <fieldset>
            <label for="lastname">Your lastname</label>
            <input type="text" id="lastname" placeholder="your lastname" required>
        </fieldset>
        <fieldset>
            <label for="birthday">Your birthday date</label>
            <input type="date" id="birthday" placeholder="your birthday" required>
        </fieldset>
        <fieldset>
            <label for="picture">Profile picture</label>
            <input type="url" id="picture" placeholder="https://onja.org/wp-content/uploads/2019/08/Clopedia@2x-430x520.jpg" required>
        </fieldset>
        <button class="submitbttn" type="submit">Submit</button>
    </div>
    `;
    form.innerHTML = html;
    resolve();

    const destroyPopup = async () => {
        form.classList.remove('open');
        await wait(1000);
        form.remove();
        form = null;
    }
    

    if (reject) {
        const skipButton = document.createElement('button');
        skipButton.type = "button";
        skipButton.textContent = "Cancel"
        skipButton.classList.add('cancel');

        form.firstElementChild.appendChild(skipButton);
        skipButton.addEventListener('click', () => {
            resolve(null);
            destroyPopup(form);
        }, { once: true });
    }

    document.body.appendChild(form);
    await wait(50);
    form.classList.add('open');
    });
};

const handleDeleteBttn = (id) => {

};

addBttn.addEventListener('click', handleAddBttn);
window.addEventListener('click', handleClick);



