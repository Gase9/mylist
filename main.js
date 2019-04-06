// Select my form and input
const itemForm = document.querySelector('.myList form');
const textValue = itemForm.querySelector('input[type="text"]');

// Select the items list
const itemsList = document.querySelector('.list .ul');
const bookedList = document.querySelector('.list .booked');

// ADD NEW ITEMS
itemForm.addEventListener('submit', addItems);

function addItems(e) {
    e.preventDefault();

    for(let i=0;i<localStorage.length;i++){
        const localKey = localStorage.key(i).toLowerCase();
        const listItem = header2.value.toLowerCase();
        if(localKey === listItem) {
            let fullDate = new Date();
            let d = fullDate.getDate();
            let mon = fullDate.getMonth() + 1;
            let y = fullDate.getFullYear();
            let h = fullDate.getHours();
            const min = getMin();
            function getMin() {
                if (fullDate.getMinutes() < 10) {
                    return '0' + fullDate.getMinutes();
                }
                return fullDate.getMinutes();
            };

            let fullTime = `${d}/${mon}/${y} ${h}:${min}`;

            let uniqueId = function() {
                return 'id-' + Math.random().toString(36).substr(2, 16);
            };
            
            let myItem = {
                id: uniqueId(),
                text: textValue.value,
                date: fullTime,
                edited: false,
                bookmarked: false
            }

            // <i class="icon-long-arrow-up"></i>
            // <i class="icon-long-arrow-down"></i>
            // Creating a new list item
            itemsList.innerHTML += 
            `
            <li class="item" id="${myItem.id}">
                <div class="text" lang="en">
                <input type="text" class="itemTitle" value="${myItem.text}" disabled="true">
                <h6>${myItem.date}</h6>
                </div>
                <div class="itemSettings">
                <i class="icon-circle-arrow-left arrow"></i>
                <div class="options">
                    <button class="delete"><i class="icon-trash"></i></button>
                    <button class="edit"><i class="icon-pencil"></i></button>
                    <button class="star"><i class="icon-bookmark-empty"></i></button>
                </div>    
                </div>
                <div class="editSubmit">
                    <button class="save">Save</button>
                    <button class="cancel">Cancel</button>
                </div>    
            </li>
            `

            if(localStorage.getItem(localStorage.key(i)) === null) {
                let mylist = [];
                mylist.push(myItem);
                localStorage.setItem(localStorage.key(i), JSON.stringify(mylist));
            } else {
                let mylist = JSON.parse(localStorage.getItem(localStorage.key(i)));
                mylist.push(myItem);
                localStorage.setItem(localStorage.key(i), JSON.stringify(mylist));
            }
        }
    }

    itemForm.reset();
}



// GENRAL ITEM SETTINGS
const ul = document.querySelectorAll('.ul');
const booked = document.querySelectorAll('.booked');

ul.forEach(item => item.addEventListener('click', itemBtns))
booked.forEach(item => item.addEventListener('click', itemBtns))

function itemBtns(e) {
    //OPEN ITEM SETTINGS
    if(e.target.classList.contains('arrow')) {
        openSettings(e);
    }

    //EDIT ITEM
    else if(e.target.classList.contains('icon-pencil') && e.target.parentElement.parentElement.classList.contains('showOptions')) {
        editContent(e);
    }

    //DELETE ITEM
    else if(e.target.classList.contains('icon-trash') && e.target.parentElement.parentElement.classList.contains('showOptions')) {
        const item = e.target.parentElement.parentElement.parentElement.parentElement;
        itemsList.removeChild(item);
        for(let i=0;i<localStorage.length;i++){
            const localKey = localStorage.key(i).toLowerCase();
            const listItem = header2.value.toLowerCase();
            if(localKey === listItem) {              
                let mylist = JSON.parse(localStorage.getItem(localStorage.key(i)));
                for(let x=0;x<mylist.length;x++) {
                    if(mylist[x].id === item.id) {
                        mylist.splice(x, 1);
                    }
                }
                localStorage.setItem(localStorage.key(i), JSON.stringify(mylist));
            }
        }
    }

    //STAR ITEM
    else if(e.target.classList.contains('icon-bookmark-empty') && e.target.parentElement.parentElement.classList.contains('showOptions')) {
        const markText = e.target.parentElement.parentElement.parentElement.previousElementSibling;
        const item = e.target.parentElement.parentElement.parentElement.parentElement;

        for(let i=0;i<localStorage.length;i++){
            const localKey = localStorage.key(i).toLowerCase();
            const listItem = header2.value.toLowerCase();
            if(localKey === listItem) {
                let mylist = JSON.parse(localStorage.getItem(localStorage.key(i)));
                for(let x=mylist.length-1;x>=0;x--) {
                    if(mylist[x].id === item.id) {
                        if(mylist[x].bookmarked === false) {
                            item.classList.add('itemBookmark');
                            bookedList.appendChild(item);
                            mylist[x].bookmarked = true;
                        } else {
                            item.classList.remove('itemBookmark');
                            mylist[x].bookmarked = false;
                            itemsList.appendChild(item);
                        }
                    }
                }
                localStorage.setItem(localStorage.key(i), JSON.stringify(mylist));
            }
        }
    }

    //MOVE UP
    else if(e.target.classList.contains('icon-long--up')) {
        const previous = e.target.parentElement.parentElement.previousElementSibling;
        const thisItem = e.target.parentElement.parentElement;
        itemsList.insertBefore(thisItem, previous);
    }

    //MOVE DOWN
    else if(e.target.classList.contains('icon-long-arrow-down')) {
        const next = e.target.parentElement.parentElement.nextElementSibling.nextElementSibling;
        const thisItem = e.target.parentElement.parentElement;
        itemsList.insertBefore(thisItem, next);
    }
}

// OPEN ITEM SETTINGS
function openSettings (e) {
        const menu = e.target.nextElementSibling;
        menu.classList.toggle('showOptions');
        e.target.classList.toggle('focus');
        e.target.classList.toggle('arrowMove');
}

// EDIT ITEM
function editContent(e) {
    const optionsDiv = e.target.parentElement.parentElement;
    const editSubmit = e.target.parentElement.parentElement.parentElement.nextElementSibling;
    const itemSettings = e.target.parentElement.parentElement.parentElement;
    const item = e.target.parentElement.parentElement.parentElement.parentElement;

    const editText = e.target.parentElement.parentElement.parentElement.previousElementSibling;
    const text = editText.querySelector('input');
    const date = editText.querySelector('h6');

    const oldText = text.value;

    if(optionsDiv.classList.contains('showOptions')) {
        text.disabled = false;
        itemSettings.classList.add('settingsSwitch');
        editSubmit.classList.add('editSwitch');
        text.focus();
        
    }
    editSubmit.addEventListener('click', function(e) {
        let fullDate = new Date();
        let d = fullDate.getDate();
        let mon = fullDate.getMonth() + 1;
        let y = fullDate.getFullYear();
        let h = fullDate.getHours();
        const min = getMin();
        function getMin() {
            if (fullDate.getMinutes() < 10) {
                return '0' + fullDate.getMinutes();
            }
            return fullDate.getMinutes();
        };
        let fullTime = `${d}/${mon}/${y} ${h}:${min}`;
        if(e.target.classList.contains('save')) {
            text.value = text.value;
            text.disabled = true;
            itemSettings.classList.remove('settingsSwitch');
            editSubmit.classList.remove('editSwitch');
            date.innerHTML = `<i>Last Updated</i> ${fullTime}`;

            for(let i=0;i<localStorage.length;i++){
                const localKey = localStorage.key(i).toLowerCase();
                const listItem = header2.value.toLowerCase();
                if(localKey === listItem) {
                    let mylist = JSON.parse(localStorage.getItem(localStorage.key(i)));
                    for(let x=0;x<mylist.length;x++) {
                        if(mylist[x].id === item.id) {
                            mylist[x].text = text.value;
                            mylist[x].date = fullTime;
                            mylist[x].edited = true;
                        }
                    }
                    localStorage.setItem(localStorage.key(i), JSON.stringify(mylist));
                }
            }
        }
        else if(e.target.classList.contains('cancel')) {
            text.value = oldText;
            text.disabled = true;
            itemSettings.classList.remove('settingsSwitch');
            editSubmit.classList.remove('editSwitch');
        }
    })
}

// MANAGE LISTS POPUP
const addListSign = document.querySelector('.addListSign');
const addPopup = document.querySelector('.addPopup');
const closeBtn = addPopup.querySelector('.close');


addListSign.addEventListener('click', manageListsOpen);
closeBtn.addEventListener('click',manageListsClose);
window.addEventListener('click', popClose);

function popClose(e) {
    if(e.target == addPopup) {
        addPopup.classList.remove('popShow');
        document.body.style.overflowY = 'scroll';
    }
}

function manageListsOpen(e) {
    addPopup.classList.add('popShow');
    document.body.style.overflowY = 'hidden';
}

function manageListsClose(e) {
    addPopup.classList.remove('popShow');
    document.body.style.overflowY = 'visible';
}

// ADD LISTS
const allLists = document.querySelector('.allLists');
const listOfLists = document.querySelector('.listOfLists');
const select = document.querySelector('#select');

const addListForm = addPopup.querySelector('.add-lists');
const addListFormValue = addListForm.querySelector('input[type="text"]');

addListForm.addEventListener('submit', addList);
listOfLists.addEventListener('click', removeList);


document.getElementById('listName').addEventListener('keydown', submitList);
document.getElementById('listName').addEventListener('change', submitList);

function addList(e) {
    e.preventDefault();

    let uniqueId = function() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    };

    let newList = {
        id: uniqueId(),
        name: addListFormValue.value
    }
    console.log(addListFormValue.value.length);
    allLists.innerHTML += `<li id="${newList.id}">${newList.name}</li>`;
    listOfLists.innerHTML += `<li id="${newList.id}">${newList.name}<button>Delete</button></li>`;
    select.innerHTML += `<option id="${newList.id}" value="${newList.name}">${newList.name}</option>`;
    let listArray = [];
    localStorage.setItem(`${newList.name}`, JSON.stringify(listArray));
    if(localStorage.getItem('fullList') === null) {
        let fullList = [];
        fullList.push(newList);
        localStorage.setItem('fullList', JSON.stringify(fullList));
    } else {
        let fullList = JSON.parse(localStorage.getItem('fullList'));
        fullList.push(newList);
        localStorage.setItem('fullList', JSON.stringify(fullList));
    }
    addListForm.reset();
    alertMessage.removeAlert();
}

function submitList(e) {
    let nameLength = addListFormValue.value.length;
    if(nameLength === 30) {
        if(e.keyCode !== 8) {
            e.preventDefault();
            alertMessage.addAlert(`Your list title can't contain more than 30 characters`);
            return false;
        }
        return true;
    }
}

// DELETE LIST
function removeList(e) {
    const listEl = e.target.parentElement;
    const allListsChilds = Array.from(document.querySelectorAll('.allLists li'));
    if(e.target.tagName === 'BUTTON') {
        for(i=0;i<allListsChilds.length;i++){
            if(allListsChilds[i].id === listEl.id) {
                allLists.removeChild(allListsChilds[i]);
                listOfLists.removeChild(listEl);
                // REMOVE LIST FROM FULL LIST
                let fullList = JSON.parse(localStorage.getItem('fullList'));
                for(let x=0;x<fullList.length;x++){
                    if(fullList[x].id === listEl.id) {
                        fullList.splice(x, 1);
                    }
                }
                localStorage.setItem('fullList', JSON.stringify(fullList));
                
                // REMOVE LIST LOCAL STORAGE
                for(let x=0;x<localStorage.length;x++){
                    const localKey = localStorage.key(x).toLowerCase();
                    const listItem = listEl.firstChild.textContent.toLowerCase();
                    if(localKey === listItem) {
                        localStorage.removeItem(localStorage.key(x));
                    }
                }
            }
        }
    }
}

// FETCH LISTS
allLists.addEventListener('click', loadList);
select.addEventListener('change', loadList);

function loadList(e) {
    if(e.target.tagName === 'LI' || e.target.tagName === 'SELECT') {
        const optionValue = select.options[select.selectedIndex].value.toLowerCase();
        const currentList = e.target.textContent.toLowerCase();
        for(let i=0;i<localStorage.length;i++){
            const localKey = localStorage.key(i).toLowerCase();
            if(localKey === currentList || localKey === optionValue) {
                let mylist = JSON.parse(localStorage.getItem(localStorage.key(i)));
                header2.value = localStorage.key(i);
                oldHeadText = localStorage.key(i);
                getList(mylist);
            }
        }
    }
}

function getList(mylist) {
                itemsList.innerHTML = '';
                bookedList.innerHTML = '';

                for(let i=0;i<mylist.length;i++) {
                    let id = mylist[i].id;
                    let text = mylist[i].text;
                    let date = mylist[i].date;
                    let edited = function() {
                        if(mylist[i].edited === true) {
                            return `<i>Last Updated</i> ${date}`
                        } else {
                            return `${date}`
                        }
                    };
                    function fetchBookmark() {
                        if(mylist[i].bookmarked === true) {
                            bookedList.innerHTML += 
                            `
                                <li class="item itemBookmark" id="${id}">
                                <div class="text" lang="en">
                                <input type="text" class="itemTitle" value="${text}" disabled="true">
                                <h6>${edited()}</h6>
                                </div>
                                <div class="itemSettings">
                                <i class="icon-circle-arrow-left arrow"></i>
                                <div class="options">
                                    <button class="delete"><i class="icon-trash"></i></button>
                                    <button class="edit"><i class="icon-pencil"></i></button>
                                    <button class="star"><i class="icon-bookmark-empty"></i></button>
                                </div>    
                                </div>
                                <div class="editSubmit">
                                    <button class="save">Save</button>
                                    <button class="cancel">Cancel</button>
                                </div>    
                                </li>
                            `
                        } else {
                            itemsList.innerHTML +=
                            `
                                <li class="item" id="${id}">
                                <div class="text" lang="en">
                                <input type="text" class="itemTitle" value="${text}" disabled="true">
                                <h6>${edited()}</h6>
                                </div>
                                <div class="itemSettings">
                                <i class="icon-circle-arrow-left arrow"></i>
                                <div class="options">
                                    <button class="delete"><i class="icon-trash"></i></button>
                                    <button class="edit"><i class="icon-pencil"></i></button>
                                    <button class="star"><i class="icon-bookmark-empty"></i></button>
                                </div>    
                                </div>
                                <div class="editSubmit">
                                    <button class="save">Save</button>
                                    <button class="cancel">Cancel</button>
                                </div>    
                                </li>
                            `
                        }
                    }
                    fetchBookmark();
                }
}

function fetchList() {
    let fullList = JSON.parse(localStorage.getItem('fullList'));
    if(localStorage.length === 0 || fullList.length === 0) {
        let uniqueId = function() {
            return 'id-' + Math.random().toString(36).substr(2, 16);
        };

        let newList = {
            id: uniqueId(),
            name: 'My First List'
        }
    
        allLists.innerHTML = `<li id="${newList.id}">${newList.name}</li>`;
        listOfLists.innerHTML = `<li id="${newList.id}">${newList.name}<button>Delete</button></li>`;
        select.innerHTML += `<option id="${newList.id}" value="${newList.name}">${newList.name}</option>`;
        header2.value = `${newList.name}`;
        select.value = `${newList.name}`;

        let listArray = [];
        localStorage.setItem(`${newList.name}`, JSON.stringify(listArray));

        if(localStorage.getItem('fullList') === null) {
             let fullList = [];
             fullList.push(newList);
             localStorage.setItem('fullList', JSON.stringify(fullList));
        } else {
            let fullList = JSON.parse(localStorage.getItem('fullList'));
            fullList.push(newList);
            localStorage.setItem('fullList', JSON.stringify(fullList));
        }

    } else {
        for(let i=0;i<localStorage.length;i++){
            if(localStorage.key(i) === 'fullList') {
                const fullList = JSON.parse(localStorage.getItem(localStorage.key(i)));
                for(let x=0;x<fullList.length;x++) {
                    let listID = fullList[x].id;
                    let listName = fullList[x].name;
                    allLists.innerHTML += `<li id="${listID}">${listName}</li>`;
                    listOfLists.innerHTML += `<li id="${listID}">${listName}<button>Delete</button></li>`;
                    select.innerHTML += `<option id="${listID}" value="${listName}">${listName}</option>`;
                    header2.value = `${listName}`;
                    oldHeadText = header2.value;
                    select.value = `${listName}`;
                }
                const mylist = JSON.parse(localStorage.getItem(header2.value));
                getList(mylist);
            }
        }
    }


}


// LIST HEADER RENAME
const listHeader = document.querySelector('.listHeader');
const header2 = listHeader.querySelector('input');
const headerp = listHeader.querySelector('p');   

const headEdit = document.querySelector('.headEdit');
let oldHeadText = header2.value;

listHeader.addEventListener('click', headerFunctions);
header2.addEventListener('keydown', textEditing);
header2.addEventListener('change', textEditing);

function headerFunctions(e) {
    if (e.target.classList.contains('icon-pencil')) {
        editHead();
        headerp.innerHTML = `${header2.value.length}/30`;
    }
    else if(e.target.classList.contains('saveHead')) {
        let newValue = header2.value;
        for(let i=0;i<localStorage.length;i++){
            const localKey = localStorage.key(i).toLowerCase();
            const listItem = oldHeadText.toLowerCase();
            let mylist = JSON.parse(localStorage.getItem(localStorage.key(i)));
            if(localKey === listItem) {  
                headText = newValue;
                localStorage.setItem(`${newValue}`, JSON.stringify(mylist));
                localStorage.removeItem(`${oldHeadText}`);
                const navLi = Array.from(document.querySelectorAll('.allLists li'));
                const manLi = Array.from(document.querySelectorAll('.listOfLists li'));
                for(x=0;x<navLi.length;x++){
                    if(listItem === navLi[x].innerHTML.toLowerCase()) {
                        navLi[x].innerHTML = `${newValue}`;
                    }
                }
                for(a=0;a<manLi.length;a++){
                    if(listItem === manLi[a].innerHTML.toLowerCase()) {
                        manLi[a].innerHTML = `${newValue}`;
                    }
                }
                let fullList = JSON.parse(localStorage.getItem('fullList')); 
                for(b=0;b<fullList.length;b++){
                    if(listItem === fullList[b].name.toLowerCase()) {
                        fullList[b].name = `${newValue}`;
                    }
                    localStorage.setItem('fullList', JSON.stringify(fullList));
                }
            }
        }
        oldHeadText = newValue;
        endEditing();
    }
    else if(e.target.classList.contains('cancelHead')) {
        header2.value = oldHeadText;
        endEditing();
    }
}

function editHead() {
    header2.disabled = false;
    header2.focus();
    headEdit.classList.add('rev');
}

function endEditing() {
    header2.disabled = true;
    headEdit.classList.remove('rev');
    alertMessage.removeAlert();
}

function textEditing(e) {
    let headLength = header2.value.length;
    headerp.innerHTML = `${headLength}/30`;
    if(headLength >= 30) {
        if(e.keyCode !== 8) {
            e.preventDefault();
            alertMessage.addAlert(`Your list title can't contain more than 30 characters`);
            return false;
        }
        return true;
    }
}

const alertMsg = document.querySelector('.alertMsg');
const alerth5 = alertMsg.querySelector('h5');

class alertMessage {
    static addAlert(message) {
        alertMsg.classList.add('alertPop');
        alerth5.innerHTML = message;
    }

    static removeAlert() {
        alertMsg.classList.remove('alertPop');
    }
}