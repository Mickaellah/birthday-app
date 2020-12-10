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
const addBttn = document.querySelector('.add'); // A function that fetch the data.

async function fetchPeople() {
  const response = await fetch('./people.json');
  const data = await response.json();
  let result = [];
  result = data;
  let month_arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  function getNextBirthday(birthday) {
    const birthdayDate = new Date(birthday);
    const today = new Date(); // we check when is their next birthday. we check the date with the same month and day as their birthday, and add this year.

    let nextBirthDay = setFullYear(birthdayDate, today.getFullYear()); // if it's today, we return the value

    if (isToday(nextBirthDay)) {
      return nextBirthDay;
    } // if the date is already behind us, we add + 1 to the year


    if (isPast(nextBirthDay)) {
      nextBirthDay = addYears(nextBirthDay, 1);
    }

    return nextBirthDay;
  } // A functin to display the data into html.


  async function displayPeople() {
    const html = result.map(person => {
      const birthdayDate = new Date(person.birthday);
      console.log('birthday date', birthdayDate);
      const today = new Date();
      const nextBirthDay = getNextBirthday(birthdayDate); // we do the difference between this date and the next

      let daysToBirthday = differenceInCalendarDays(nextBirthDay, today);
      console.log(daysToBirthday);
      return `
                <ul class="navigation">
                    <li class="list_item">
                        <img class="profile" src="${person.picture}" alt="profile picture">
                    </li>
                    <li class="list_item">
                        ${person.firstName} ${person.lastName}<br>
                        <small>Turn on ${month} the </small>
                    </li>
                    <li class="list_item">${day} ${month} ${year}</li>
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
      popup.classList.add('form'); // HTML for the form that we need for adding some new people.

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
        popup.reset(); // HTML for grabbing all the values from the form and push them into the page.

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
  }; // Handle the edit buttons.


  const handleEditBttn = id => {
    return new Promise(async function (resolve, reject) {
      let popup = document.createElement('popup');
      popup.classList.add('form'); // Find the data which you want to edit.

      const editPerson = result.find(person => person.id !== id); // HTML for the edit form.

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
                    <input type="date" id="birthday" name="birthday">
                </fieldset>
                <fieldset>
                    <label for="picture">Profile picture</label>
                    <input type="url" id="picture" name="picture" value="${editPerson.picture}">
                </fieldset>
                <button class="submitbttn" type="submit">Submit</button>
            </div>
            `;
      popup.insertAdjacentHTML('afterbegin', html);
      destroyPopup(popup); // A condition to create a cancel button and handle that button.

      if (reject) {
        const skipButton = document.createElement('button');
        skipButton.type = "button";
        skipButton.textContent = "Cancel";
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
      popup.addEventListener('submit', e => {
        e.preventDefault();
        editPerson.firstName = popup.firstName.value;
        editPerson.lastName = popup.lastName.value;
        editPerson.birthday = popup.birthday.value;
        editPerson.picture = popup.picture.value;
        displayPeople();
        destroyPopup(popup);
        popup.reset();
      });
      document.body.appendChild(popup);
      await wait(50);
      popup.classList.add('open');
      personList.dispatchEvent(new CustomEvent('editInformation'));
    });
  }; // Handle delete button.


  const handleDeleteBttn = id => {
    return new Promise(async function (resolve, reject) {
      let div = document.createElement('div');
      div.classList.add('want_to_delete');
      const deletePerson = result.filter(person => person.id !== id); // HTML for the little popup contains the yes button for accepting the deletion and cancel for reusing.

      const html = `
            <div class="delete_item">
                <h3>Do you want to delete this?</h3>
                <div>
                    <button class="yes" type="submit">Ok</button>
                </div>
            </div>
        `;
      div.innerHTML = html;
      resolve(); // const destroyPopup = async () => {
      //     div.classList.remove('open');
      //     await wait(1000);
      //     div.remove();
      //     div = null;
      // }

      if (reject) {
        const skipButton = document.createElement('button');
        skipButton.type = "button";
        skipButton.textContent = "Cancel";
        skipButton.classList.add('no');
        div.firstElementChild.appendChild(skipButton);
        skipButton.addEventListener('click', () => {
          resolve(null);
          destroyPopup(div);
        });
      }

      window.addEventListener('submit', e => {
        if (e.target.matches('button.yes')) {
          console.log('Delete me');
          result = result.filter(person => person.id !== id);
          displayPeople();
          destroyPopup(div);
        }
      });
      document.body.appendChild(div);
      await wait(50);
      div.classList.add('open');
      personList.dispatchEvent(new CustomEvent('editInformation'));
    });
  }; // Storing the data into the localeStorage.


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
  }; // Event listener and event delegation.


  addBttn.addEventListener('click', handleAddBttn);
  window.addEventListener('click', handleClick);
  personList.addEventListener('editInformation', editLocalStorage);
  personList.dispatchEvent(new CustomEvent('editInformation'));
  initLocalStorage();
} // Call the function.


fetchPeople();
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63594" + '/');

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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","script.js"], null)
//# sourceMappingURL=/script.75da7f30.js.map