const editPopup = editId => {
    const editIdPopup = data.find(person => person.id === editId || person.id == editId);
    return new Promise(async function (resolve) {
        const formPopup = document.createElement('form');
        formPopup.classList.add('popup');
        formPopup.classList.add('open');
        console.log(editIdPopup.lastName);
        formPopup.insertAdjacentHTML('afterbegin',
            `
            <fieldset> 
                    <div class="form-group">
                        <label for="lastname">Lastname</label>
                        <input type="text" class="form-control" id="lastnameId" value="${editIdPopup.lastName}">
                    </div>
                    <div class="form-group">
                        <label for="firstname">Firstname</label>
                        <input type="text" class="form-control" id="firstnameId" aria-describedby="firstnameHelp" value="${editIdPopup.firstName}">
                    </div>
                    <div class="form-group">
                        <label for="birthday">Birthday</label>
                        <input type="date" class="form-control" id="birthdayId" name="birthday-date">
                    </div>
                    <div class="form-group">
                        <label for="url">Your avatar image</label>
                        <input type="url" class="form-control" id="urlId" value="${editIdPopup.picture}">
                    </div>
                    <div class="d-flex flex-row">
                        <button type="submit" class="submitbtn" name="submit">Submit</button>
                        <button class="close-btn" name="close" type="button">Close</button>
                    </div>
            </fiedset>
        `)
        // submit form 
        formPopup.addEventListener('submit', e => {
            e.preventDefault();
            console.log(e.target);
            editIdPopup.lastName = formPopup.lastnameId.value;
            editIdPopup.firstName = formPopup.firstnameId.value;
            editIdPopup.birthday = formPopup.birthdayId.value;
            editIdPopup.picture = formPopup.urlId.value;
            generatedBirthday(editIdPopup);
            // resolve(e.target.displayList(editIdPopup));
            destroyPopup(formPopup);
            // birthdayData.dispatchEvent(new CustomEvent('updatedBirthday'));
            updateLocalStorage();
        }, { once: true });
        // open form
        document.body.appendChild(formPopup);
        formPopup.classList.add('open');
        // await wait(50);
        // close form