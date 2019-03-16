// Select my form and input
const form = document.querySelector('form');
const textValue = document.querySelector('input[type="text"]');

// Select the items list
const itemsList = document.querySelector('.list ul');

// ADD NEW ITEMS
form.addEventListener('submit', addItems);

function addItems(e) {
    e.preventDefault();
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

    var uniqueId = function() {
        return 'id-' + Math.random().toString(36).substr(2, 16);
    };
      
    let myItem = {
        id: uniqueId(),
        text: textValue.value,
        date: fullTime,
        edited: false,
        bookmarked: false
    }

    // Creating a new list item
    itemsList.innerHTML += 
    `
    <li class="item" id="${myItem.id}">
    <div class="upNdown">
      <i class="icon-long-arrow-up"></i>
      <i class="icon-long-arrow-down"></i>
    </div>
    <!-- <div class="checkbox">
        <input type="checkbox" id="check"/>
        <label for="check" style="--d: 20px;">
          <svg viewBox="0,0,50,50">
            <path d="M5 30 L 20 45 L 45 5"></path>
          </svg>
        </label>
    </div> -->
    <div class="text" lang="en">
      <h3>${myItem.text}</h3>
      <i class="icon-bookmark bookmark">
        <div class="bookmarks">
          <button><i class="icon-bookmark red"></i></button>
          <button><i class="icon-bookmark orange"></i></button>
          <button><i class="icon-bookmark yellow"></i></button>
        </div>
      </i>
      <h6>${myItem.date}</h6>
    </div>
    <div class="itemSettings">
      <i class="icon-circle-arrow-left arrow"></i>
    <div class="options">
        <button class="delete"><i class="icon-trash"></i></button>
        <button class="edit"><i class="icon-pencil"></i></button>
        <button class="star"><i class="icon-star"></i></button>
      </div>    
    </div>
    <div class="editSubmit">
        <button class="save">Save</button>
        <button class="cancel">Cancel</button>
      </div>    
  </li>
    `

     if(localStorage.getItem('mylist') === null) {
         let mylist = [];
         mylist.push(myItem);
         localStorage.setItem('mylist', JSON.stringify(mylist));
     } else {
        let mylist = JSON.parse(localStorage.getItem('mylist'));
        mylist.push(myItem);
        localStorage.setItem('mylist', JSON.stringify(mylist));
     }
    form.reset();
}

function fetchList() {
    if(localStorage.getItem('mylist') === null) {
    
    } else {
        const mylist = JSON.parse(localStorage.getItem('mylist'));
        for(let i=0;i<mylist.length;i++) {
            let id = mylist[i].id;
            let text = mylist[i].text;
            let date = mylist[i].date;
            const edited = function() {
                if(mylist[i].edited === true) {
                    return `<i>Last Updated</i> ${date}`
                } else {
                    return `${date}`
                }
            }
            itemsList.innerHTML +=
            `
        <li class="item" id="${id}">
        <div class="upNdown">
        <i class="icon-long-arrow-up"></i>
        <i class="icon-long-arrow-down"></i>
        </div>
        <!-- <div class="checkbox">
            <input type="checkbox" id="check"/>
            <label for="check" style="--d: 20px;">
            <svg viewBox="0,0,50,50">
                <path d="M5 30 L 20 45 L 45 5"></path>
            </svg>
            </label>
        </div> -->
        <div class="text" lang="en">
        <h3>${text}</h3>
        <i class="icon-bookmark bookmark">
            <div class="bookmarks">
            <button><i class="icon-bookmark red"></i></button>
            <button><i class="icon-bookmark orange"></i></button>
            <button><i class="icon-bookmark yellow"></i></button>
            </div>
        </i>
        <h6>${edited()}</h6>
        </div>
        <div class="itemSettings">
        <i class="icon-circle-arrow-left arrow"></i>
        <div class="options">
            <button class="delete"><i class="icon-trash"></i></button>
            <button class="edit"><i class="icon-pencil"></i></button>
            <button class="star"><i class="icon-star"></i></button>
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
}

// GENRAL ITEM SETTINGS
const ul = document.querySelectorAll('.ul');
ul.forEach(item => item.addEventListener('click', itemBtns))
ul.forEach(item => item.addEventListener('mouseover', itemOver))

function itemOver(e) {
    //BOOKMARK COLOR
    if(e.target.classList.contains('showBookmark')) {
        const bookmarksMenu = e.target.querySelector('.bookmarks');
        bookmarksMenu.classList.toggle('showBookmarks');
    }
}

function itemBtns(e) {
    //OPEN ITEM SETTINGS
    if(e.target.classList.contains('arrow')) {
        openSettings(e);
    }

    //EDIT ITEM
    else if(e.target.classList.contains('icon-pencil') && e.target.parentElement.parentElement.classList.contains('showOptions')) {
        editContent(e);
        let mylist = JSON.parse(localStorage.getItem('mylist'));
        for(let i=0;i<mylist.length;i++) {

        }
    }

    //DELETE ITEM
    else if(e.target.classList.contains('icon-trash') && e.target.parentElement.parentElement.classList.contains('showOptions')) {
        const item = e.target.parentElement.parentElement.parentElement.parentElement;
        itemsList.removeChild(item);
        let mylist = JSON.parse(localStorage.getItem('mylist'));
        for(let i=0;i<mylist.length;i++) {
            if(mylist[i].id === item.id) {
                mylist.splice(i, 1);
            }
        }
        localStorage.setItem('mylist', JSON.stringify(mylist));
    }

    //STAR ITEM
    else if(e.target.classList.contains('icon-star') && e.target.parentElement.parentElement.classList.contains('showOptions')) {
        const textDiv = e.target.parentElement.parentElement.parentElement.previousElementSibling;
        const bookmark = textDiv.querySelector('i');
        bookmark.style.color = 'red';
        bookmark.classList.toggle('showBookmark');
    }

    //MOVE UP
    else if(e.target.classList.contains('icon-long-arrow-up')) {
        const previous = e.target.parentElement.parentElement.previousElementSibling;
        const thisItem = e.target.parentElement.parentElement;
        itemsList.insertBefore(thisItem, previous);
        // let mylist = JSON.parse(localStorage.getItem('mylist'));
        // mylist.forEach(item => {
        //     move(mylist, item, 1);
        // })
        // localStorage.setItem('mylist', JSON.stringify(mylist));
    }

    //MOVE DOWN
    else if(e.target.classList.contains('icon-long-arrow-down')) {
        const next = e.target.parentElement.parentElement.nextElementSibling.nextElementSibling;
        const thisItem = e.target.parentElement.parentElement;
        itemsList.insertBefore(thisItem, next);
    }
    
    //BOOKMARKS COLORS
    else if(e.target.classList.contains('red')) {
        e.target.parentElement.parentElement.parentElement.style.color = 'red';
    }
    else if(e.target.classList.contains('orange')) {
        e.target.parentElement.parentElement.parentElement.style.color = 'orange';
    }
    else if(e.target.classList.contains('yellow')) {
        e.target.parentElement.parentElement.parentElement.style.color = 'yellow';
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
    const text = editText.querySelector('h3');
    const date = editText.querySelector('h6');

    const oldText = text.innerHTML;

    if(optionsDiv.classList.contains('showOptions')) {
        text.contentEditable = 'true';
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
            text.innerHTML = text.innerHTML;
            text.contentEditable = 'false'
            itemSettings.classList.remove('settingsSwitch');
            editSubmit.classList.remove('editSwitch');
            date.innerHTML = `<i>Last Updated</i> ${fullTime}`;

            let mylist = JSON.parse(localStorage.getItem('mylist'));
            for(let i=0;i<mylist.length;i++) {
            if(mylist[i].id === item.id) {
                    mylist[i].text = text.innerHTML;
                    mylist[i].date = fullTime;
                    mylist[i].edited = true;
                }
            }
            localStorage.setItem('mylist', JSON.stringify(mylist));
        }
        else if(e.target.classList.contains('cancel')) {
            text.innerHTML = oldText;
            text.contentEditable = 'false'
            itemSettings.classList.remove('settingsSwitch');
            editSubmit.classList.remove('editSwitch');
        }
    })
}

// function move(array, element, delta) {
//     var index = array.indexOf(element);
//     var newIndex = index + delta;
//     if (newIndex < 0  || newIndex == array.length) return; //Already at the top or bottom.
//     var indexes = [index, newIndex].sort(); //Sort the indixes
//     array.splice(indexes[0], 2, array[indexes[1]], array[indexes[0]]); //Replace from lowest index, two elements, reverting the order
//   };

//   function move(arr, element, offset) {
//     index = arr.indexOf(element)
//     newIndex = index + offset
//     if (newIndex > -1 && newIndex < arr.length) {
//         removedElement = arr.splice(index, 1)[0];
//         arr.splice(newIndex, 0, removedElement);
//     }
//   }