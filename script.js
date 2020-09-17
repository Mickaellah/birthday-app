const personList = document.querySelector('.people');



async function fetchPeople() {
    const response = await fetch('./people.json');
    const data = response.json();
    return data;
}


async function displayPeople() {
    const people = await fetchPeople();
    const html  = people.map(person => {
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