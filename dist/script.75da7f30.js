// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"script.js":[function(require,module,exports) {
// Grab some elements which are used in this project.
const personList = document.querySelector('.people');
const addBttn = document.querySelector('.add');
const filterInput = document.querySelector('.search_by_name');
const filterByMonth = document.querySelector('.filter_by_month'); // A function that fetch the data.

async function fetchPeople() {
  const response = await fetch('./people.json');
  let data = await response.json();

  function calculateBirthdayDate(item) {
    let birthTime = new Date(item.birthday);
    let birthDate = birthTime.getDate();
    let birthMonth = birthTime.getMonth();
    let today = new Date();
    let thisYear = today.getFullYear();
    let birthdayYear = new Date(thisYear, birthMonth, birthDate);
    let oneDay = 1000 * 60 * 60 * 24;
    let numberOfDaysLeft = Math.ceil((birthdayYear.getTime() - today.getTime()) / oneDay);
    let birthdayInDays = numberOfDaysLeft < 0 ? 365 + numberOfDaysLeft : numberOfDaysLeft;
    return birthdayInDays;
  } // Generate the data into html.


  function htmlGenerator(arr) {
    const sortBirthday = arr.sort((a, b) => {
      return calculateBirthdayDate(a) - calculateBirthdayDate(b);
    });
    return sortBirthday.map(item => {
      const birthdayDate = new Date(item.birthday);

      function ordinary_suffix_of(d) {
        let j = d % 10,
            k = d % 100;

        if (j == 1 && k != 11) {
          return d + "st";
        }

        if (j == 2 && k != 12) {
          return d + "nd";
        }

        if (j == 3 && k != 13) {
          return d + "rd";
        }

        return d + "th";
      }

      function getAge(age) {
        let date = Date.now() - age.getTime();
        const actualAge = new Date(date);
        return Math.abs(actualAge.getFullYear() - 1970) + 1;
      }

      const age = getAge(new Date(item.birthday));
      let day = birthdayDate.getDate();
      let monthName = birthdayDate.toLocaleString('default', {
        month: 'long'
      });
      const today = new Date();
      let myDate = new Date(item.birthday);
      let birthdayMonth = myDate.getMonth() + 1;
      let birtdayDay = myDate.getDate();
      const todayDate = today.getFullYear();
      const birthDayDates = new Date(todayDate, birthdayMonth - 1, birtdayDay);
      let oneDay = 1000 * 60 * 60 * 24;
      const getTheDate = Math.ceil(birthDayDates.getTime() - today.getTime() / oneDay);
      const dayLeft = calculateBirthdayDate(item);
      const futureBirthday = getTheDate > 1 ? "days" : "day"; // To get the number of days untill your next birthday.

      if (today > birthdayDate) {
        birthdayDate.setFullYear(today.getFullYear() + 1);
      }

      return `
                <ul data-id="${item.id}" class="navigation">
                    <li class="list_item">
                        <img class="profile" src="${item.picture}" alt="profile picture">
                    </li>
                    <li class="list_item names" data-value="${item.firstName}">
                        <h4>${item.firstName} ${item.lastName}</h4>
                        <p class="birthday">Turns <small class="age">${age}</small> on ${monthName} ${ordinary_suffix_of(day)}. </p>
                    </li>
                    <li class="list_item list_item--buttons"> 
                        <p class="next_birthday">In ${dayLeft} ${futureBirthday}</p>

                        <div class="buttons">
                            <button class="edit" id="${item.id}">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.75 5H5C4.33696 5 3.70107 5.26339 3.23223 5.73223C2.76339 6.20107 2.5 6.83696 2.5 7.5V25C2.5 25.663 2.76339 26.2989 3.23223 26.7678C3.70107 27.2366 4.33696 27.5 5 27.5H22.5C23.163 27.5 23.7989 27.2366 24.2678 26.7678C24.7366 26.2989 25 25.663 25 25V16.25" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M23.125 3.125C23.6223 2.62772 24.2967 2.34835 25 2.34835C25.7033 2.34835 26.3777 2.62772 26.875 3.125C27.3723 3.62228 27.6517 4.29674 27.6517 5C27.6517 5.70326 27.3723 6.37772 26.875 6.875L15 18.75L10 20L11.25 15L23.125 3.125Z" stroke="#094067" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                </svg>                            
                            </button>
                            <button class="delete" id="${item.id}">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#EF4565" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M22 3H7c-.69 0-1.23.35-1.59.88L0 12l5.41 8.11c.36.53.9.89 1.59.89h15c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H7.07L2.4 12l4.66-7H22v14zm-11.59-2L14 13.41 17.59 17 19 15.59 15.41 12 19 8.41 17.59 7 14 10.59 10.41 7 9 8.41 12.59 12 9 15.59z"/></svg>
                            </button>
                        </div>
                    </li>
                </ul>
            `;
    }).join('');
  } // A functin to display the data into html.


  function displayPeople() {
    const html = htmlGenerator(data);
    personList.innerHTML = html;
  }

  displayPeople();

  const wait = (ms = 0) => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

  const destroyPopup = async popup => {
    popup.classList.remove('open');
    await wait(1000);
    popup = null;
  }; // A function for adding new people and handle the add item button.


  const handleAddBttn = async e => {
    return new Promise(async function (resolve, reject) {
      let popup = document.createElement('form');
      popup.classList.add('form');
      const dateInput = new Date().toISOString().slice(0, 10); // HTML for the form that we need for adding some new people.

      const html = `
                <div class="add_form">
                    <button class="close_button">
                        <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                    </button>
                    <h2 class="add_header">Add a new person</h2>
                    <fieldset>
                        <label for="firstname">Firstname</label>
                        <input type="text" id="firstname" name="firstName" placeholder="enter your firstname" required>
                    </fieldset>
                    <fieldset>
                        <label for="lastname">Lastname</label>
                        <input type="text" id="lastname" name="lastName" placeholder="enter your lastname" required>
                    </fieldset>
                    <fieldset>
                        <label for="birthday">Birthday</label>
                        <input class="birthday_date" type="date" id="birthday" max="${dateInput}" name="birthday" placeholder="enter your birthday" required>
                    </fieldset>
                    <fieldset>
                        <label for="profile">Avatar image</label>
                        <input type="text" id="profile" name="picture" placeholder="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWPtccjWVFluoAnrs-ZL_dmwSIt0SC_9CSnw&usqp=CAU">
                    </fieldset>
                    <button class="submitbttn" type="submit">Submit person</button>
                </div>
            `;
      popup.innerHTML = html;
      resolve();
      destroyPopup(popup); // A condition to create the cancel button.

      if (reject) {
        const skipButton = document.createElement('button');
        skipButton.type = "button";
        skipButton.textContent = "Cancel";
        skipButton.classList.add('cancel');
        popup.firstElementChild.appendChild(skipButton);
        skipButton.addEventListener('click', () => {
          resolve(null);
          destroyPopup(popup);
        }, {
          once: true
        });
      } // An event listener for the submit button in the form.


      popup.addEventListener('submit', e => {
        e.preventDefault();
        const formEl = e.target;
        const newPerson = {
          firstName: formEl.firstName.value,
          lastName: formEl.lastName.value,
          birthday: formEl.birthday.value,
          picture: formEl.picture.value,
          id: Date.now()
        };
        data.push(newPerson);
        personList.dispatchEvent(new CustomEvent('editInformation'));
        displayPeople();
        destroyPopup(popup);
        popup.reset(); // HTML for grabbing all the values from the form and push them into the page.

        const html = `
                    <ul>
                        <li>
                            <img class="profile" src="${newPerson.picture}" alt="profile picture" />
                        </li>
                        <li>
                            ${newPerson.firstName} ${newPerson.lastname}
                        </li>
                        <li>${newPerson.birthday}</li>
                        <li>
                            
                        </li>
                        <li>
                            <div class="buttons">
                                <button class="edit">
                                    <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                                </button>
                                <button class="delete">
                                    <svg class="w-6 h-6" width="32px" height="32px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
                                </button>
                            </div>
                        </li>
                    </ul>
                `;
        formEl.innerHTML = html;
      }, {
        once: true
      });
      document.body.appendChild(popup);
      await wait(50);
      popup.classList.add('open');
    });
  }; // A function that handle delete and edit buttons.


  const handleClick = e => {
    const editBtn = e.target.closest('button.edit');

    if (editBtn) {
      const list = e.target.closest('ul');
      const editItem = list.dataset.id;
      handleEditBttn(editItem);
    }

    const deleteBtn = e.target.closest('button.delete');

    if (deleteBtn) {
      const list = e.target.closest('ul');
      const deleteItem = list.dataset.id;
      handleDeleteBttn(deleteItem);
    }
  }; // Handle the edit buttons.


  const handleEditBttn = id => {
    // Find the data which you want to edit.
    let editPerson = data.find(person => person.id == id);
    return new Promise(function (resolve, reject) {
      let popup = document.createElement('form');
      let dateInput = new Date().toISOString().slice(0, 10);
      let formatDate = new Date(editPerson.birthday).toISOString().slice(0, 10);
      popup.classList.add('form');
      popup.classList.add('open'); // HTML for the edit form.

      const html = `
                <div class="edit_form">
                    <div>
                        <button class="close_button">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                        </button>
                    </div>
                    <h2 class="edit_header">Edit ${editPerson.firstName} ${editPerson.lastName}</h2>
                    <fieldset>
                        <label for="firstname">Firstname</label>
                        <input type="text" name="firstname" id="firstname" value="${editPerson.firstName}">
                    </fieldset>
                    <fieldset>
                        <label for="lastname">Lastname</label>
                        <input type="text" name="lastname" id="lastname" value="${editPerson.lastName}">
                    </fieldset>
                    <fieldset>
                        <label for="birthday">Birthday date</label>
                        <input class="birthday_date" type="date" value="${formatDate}" name="birthdayDate" max="${dateInput}" id="birthday">
                    </fieldset>
                    <fieldset>
                        <label for="picture">Profile picture</label>
                        <input type="url" id="picture" name="picture" value="${editPerson.picture}">
                    </fieldset>
                    <button class="submitbttn" name="submit" type="submit">Save changes</button>
                </div>
            `;
      popup.insertAdjacentHTML('afterbegin', html);
      popup.addEventListener('submit', e => {
        e.preventDefault();
        editPerson.firstName = popup.firstname.value;
        editPerson.lastName = popup.lastname.value;
        editPerson.birthday = popup.birthday.value;
        editPerson.picture = popup.picture.value;
        displayPeople(editPerson);
        destroyPopup(popup);
        personList.dispatchEvent(new CustomEvent('editInformation'));
      }, {
        once: true
      }); // A condition to create a cancel button and handle that button.

      if (reject) {
        const skipButton = document.createElement('button');
        skipButton.type = "button";
        skipButton.textContent = "Cancel";
        skipButton.classList.add('cancel');
        popup.firstElementChild.appendChild(skipButton);
        skipButton.addEventListener('click', () => {
          resolve(null);
          destroyPopup(popup);
        }, {
          once: true
        });
      }

      document.body.appendChild(popup);
      popup.classList.add('open');
    });
  }; // Handle delete button.


  const handleDeleteBttn = id => {
    return new Promise(async function (resolve, reject) {
      let div = document.createElement('div');
      div.classList.add('form'); // HTML for the little popup contains the yes button for accepting the deletion and cancel for reusing.

      const html = `
            <div class="delete_items">
                <button class="close_button">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
                </button>
                <h3 class="delete_header">Want to delete this?</h3>
                <div>
                    <button class="delete_item" type="button">Delete</button>
                </div>
            </div>
            `;
      div.innerHTML = html;

      if (reject) {
        const skipButton = document.createElement('button');
        skipButton.type = "button";
        skipButton.textContent = "Cancel";
        skipButton.classList.add('Cancel');
        div.firstElementChild.appendChild(skipButton);
        skipButton.addEventListener('click', () => {
          resolve(null);
          destroyPopup(div);
        });
      }

      div.addEventListener('click', e => {
        const filteredArr = data.filter(person => person.id != id);
        let deleteBttn = document.querySelector('button.delete_item');

        if (deleteBttn) {
          data = filteredArr;
          displayPeople(data);
          destroyPopup(div);
        }
      });
      document.body.appendChild(div);
      div.classList.add('open');
      personList.dispatchEvent(new CustomEvent('editInformation'));
    });
  }; // Storing the data into the localeStorage.


  const initLocalStorage = () => {
    const stringForm = localStorage.getItem('result');
    const listItem = JSON.parse(stringForm);

    if (listItem) {
      data = listItem;
      personList.dispatchEvent(new CustomEvent('editInformation'));
    } else {
      result = [];
    }
  };

  const editLocalStorage = () => {
    localStorage.setItem('result', JSON.stringify(data));
  };

  const filterPeople = () => {
    const nameFilter = filterInput.value.toLowerCase();
    const monthFilter = Number(filterByMonth.value);
    const filteredPeople = data.filter(person => (nameFilter ? person.lastName.toLowerCase().includes(nameFilter) || person.firstName.toLowerCase().includes(nameFilter) : true) && (monthFilter ? new Date(person.birthday).getMonth() + 1 === monthFilter : true));
    personList.innerHTML = htmlGenerator(filteredPeople);
  }; // events for the search input and the select in index.html page.


  filterInput.addEventListener('input', function (e) {
    filterPeople();
  });
  filterByMonth.addEventListener('input', function (e) {
    filterPeople();
  }); // Event listener and event delegation.

  addBttn.addEventListener('click', handleAddBttn);
  window.addEventListener('click', handleClick);
  personList.addEventListener('editInformation', editLocalStorage);
  personList.dispatchEvent(new CustomEvent('editInformation'));
  initLocalStorage();
} // Call the function.


fetchPeople();
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42263" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map