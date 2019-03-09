const form = document.querySelector('form');
const itemsList = document.querySelector('.list ul');
const textValue = document.querySelector('input[type="text"]');
const doneList = document.querySelector('.doneList ul');

// OPEN THE OPTIONS MENU
itemsList.addEventListener('click', openOptions);
doneList.addEventListener('click', openOptions);

function openOptions(e) {
    if(e.target.classList.contains('icon-cogs')) {
        const menu = e.target.querySelector('.options');
        menu.classList.toggle('showOptions');
        e.target.classList.toggle('focus');
    }
    else if (e.target.classList.contains('delete')) {
        const item = e.target.parentElement.parentElement.parentElement;
        if(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('doneList')) {
            doneList.removeChild(item);
        } else {
            itemsList.removeChild(item);
        }
    }
    else if (e.target.classList.contains('done')) {
        itemsList.appendChild(e.target);
        e.target.classList.remove('done');
    }
    else if (e.target.classList.contains('item')) {
        e.target.classList.add('done');
        doneList.appendChild(e.target);
    }
    else if (e.target.classList.contains('moveUp')) {
        const previous = e.target.parentElement.parentElement.parentElement.previousElementSibling;
        if(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('doneList')) {
            doneList.insertBefore(e.target.parentElement.parentElement.parentElement, previous);
        } else {
            itemsList.insertBefore(e.target.parentElement.parentElement.parentElement, previous);
        }
    }
    else if (e.target.classList.contains('moveDown')) {
        const next = e.target.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling;
        if(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('doneList')) {
            doneList.insertBefore(e.target.parentElement.parentElement.parentElement, next);
        } else {
            itemsList.insertBefore(e.target.parentElement.parentElement.parentElement, next);
        }
    }
}

// ADD NEW ITEMS
form.addEventListener('submit', addItems);

function addItems(e) {
    e.preventDefault();
    // Creating a new list item
    const newItem = document.createElement('li');
    newItem.className = 'item';
    // Creating the settings icon + add the class icon-cogs
    const cog = document.createElement('i');
    cog.className = "icon-cogs";
    // Creating the text node out of the input
    newItem.appendChild(document.createTextNode(textValue.value));
    // Appending the settings cogs as child of the new list item
    newItem.appendChild(cog);
    // Appending the new list item to the unordered list
    itemsList.appendChild(newItem);
    // Resets the input value
    textValue.value = '';

    const div = document.createElement('div');
    div.className = 'options';
    const btn = document.createElement('button');
    btn.className = 'delete';
    btn.innerHTML = 'delete';
    div.appendChild(btn);
    cog.appendChild(div);
}