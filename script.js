const personList = document.querySelector('.people');
const outerModal = document.querySelector('.outer_modal');
const innerModal = document.querySelector('.inner_modal');
const addBttn = document.querySelector('.add');


async function fetchPeople() {
    const response = await fetch('./people.json');
    const data = await response.json();
    return data;
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


// const handleClick = (e) => {
//     const updateItem = e.target.closest('button.edit');
//     if (updateItem) {
//         const id = Number(updateItem.id);
//         editItem(id);
//     }
// }

// const editItem = (id) => {
//     const itemToEdit = people.find(person => person.id === id);

//     const html = `
//         <div>
//             <fieldset>
//                 <label for="first_name">First name</label>
//                 <input type="text" id="first_name" name="firstname">
//             </fieldset>
//             <fieldset>
//                 <label for="last_name">Last name</label>
//                 <input type="text" id="last_name" name="lastname">
//             </fieldset>
//             <fieldset>
//                 <label for="birthday">Birthday</label>
//                 <input type="number" id="birthday" name="birthday">
//             </fieldset>
//             <fieldset>
//                 <label for="profile">Avatar image</label>
//                 <input type="url" id="profile" name="picture">
//             </fieldset>
//             <fieldset>
//                 <label for=""></label>
//                 <input type="text" id="">
//             </fieldset>
//         </div>
//     `;
//     innerModal.innerHTML = html;
// };

// personList.addEventListener('click', handleClick);

// const deleteItem = (id) => {

// };

const handleAddBttn = (e) => {
    return new Promise(function(resolve) {
        const form = document.createElement('form');
        form.classList.add('form');

        const html = `
        <div class="add_form">
            <h2>Add your name and your birthday</h2>
            <fieldset>
                <label for="first_name">First name</label>
                <input type="text" id="first_name" name="firstname" placeholder="enter your firstname">
            </fieldset>
            <fieldset>
                <label for="last_name">Last name</label>
                <input type="text" id="last_name" name="lastname" placeholder="enter your lastname">
            </fieldset>
            <fieldset>
                <label for="birthday">Birthday</label>
                <input type="number" id="birthday" name="birthday" placeholder="enter your birthday">
            </fieldset>
            <fieldset>
                <label for="profile">Avatar image</label>
                <input type="url" id="profile" name="picture" placeholder="https://onja.org/wp-content/uploads/2019/08/Clopedia@2x-430x520.jpg">
            </fieldset>
            <button class="submitbttn" type="submit">Submit</button>
        </div>
        `;
        form.innerHTML = html;

        innerModal.innerHTML = html;
        outerModal.classList.add('open');
        resolve();


        form.addEventListener('submit', handleSubmit);
        e.preventDefault();
        const formEl = e.currentTarget;

        const newDate = {
            firstname: formEl.firstname.value,
            lastname: formEl.lastname.value,
            birthday: formEl.birthday.value,
            picture: formEl.picture.value,
            id: Date.now(),
        };
    });
};


const closeModal = () => {
    outerModal.classList.remove('open');
}


addBttn.addEventListener('click', handleAddBttn);
outerModal.addEventListener('click', (e) => {
    const isOutside = !e.target.closest('.inner_modal');
    if (isOutside) {
        closeModal();
    }
});
window.addEventListener('keydown', (e) => {
    if (e.key === "Escape") {
        closeModal();
    }
});




