const form = document.querySelector('form');
const textValue = document.querySelector('input[type="text"]');

const itemsList = document.querySelector('.list ul');
const doneList = document.querySelector('.doneList ul');

// OPEN THE OPTIONS MENU
// const arrows = document.querySelectorAll('.arrow');
// arrows.forEach(arrow => arrow.addEventListener('click', test));

// function test(e) {
//     const menu = e.target.nextElementSibling;
//         menu.classList.toggle('showOptions');
//         e.target.classList.toggle('focus');
//         e.target.classList.toggle('arrowMove');
// }

itemsList.addEventListener('click', open);

function open (e) {
    if(e.target.classList.contains('arrow')) {
        const menu = e.target.nextElementSibling;
        menu.classList.toggle('showOptions');
        e.target.classList.toggle('focus');
        e.target.classList.toggle('arrowMove');
    }
}

const edit = document.querySelector('.edit');
edit.addEventListener('click', editContent);

const editedText = document.querySelector('.text');
editedText.addEventListener('keypress', finishEdit);

function finishEdit(e) {
    if(e.code === 'Enter') {
        e.target.contentEditable = 'false';
    }
}

function editContent(e) {
    const editText = e.target.parentElement.parentElement.previousElementSibling.previousElementSibling;
    editText.contentEditable = 'true';
    editText.focus();
}

// function openOptions(e) {
//     if(e.target.classList.contains('icon-cogs')) {
//         const menu = e.target.querySelector('.options');
//         menu.classList.toggle('showOptions');
//         e.target.classList.toggle('focus');
//     }
//     else if (e.target.classList.contains('delete')) {
//         const item = e.target.parentElement.parentElement.parentElement;
//         if(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('doneList')) {
//             doneList.removeChild(item);
//         } else {
//             itemsList.removeChild(item);
//         }
//     }
//     else if (e.target.classList.contains('done')) {
//         itemsList.appendChild(e.target);
//         e.target.classList.remove('done');
//     }
//     else if (e.target.classList.contains('item')) {
//         e.target.classList.add('done');
//         doneList.appendChild(e.target);
//     }
//     else if (e.target.classList.contains('moveUp')) {
//         const previous = e.target.parentElement.parentElement.parentElement.previousElementSibling;
//         if(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('doneList')) {
//             doneList.insertBefore(e.target.parentElement.parentElement.parentElement, previous);
//         } else {
//             itemsList.insertBefore(e.target.parentElement.parentElement.parentElement, previous);
//         }
//     }
//     else if (e.target.classList.contains('moveDown')) {
//         const next = e.target.parentElement.parentElement.parentElement.nextElementSibling.nextElementSibling;
//         if(e.target.parentElement.parentElement.parentElement.parentElement.parentElement.classList.contains('doneList')) {
//             doneList.insertBefore(e.target.parentElement.parentElement.parentElement, next);
//         } else {
//             itemsList.insertBefore(e.target.parentElement.parentElement.parentElement, next);
//         }
//     }
// }

// ADD NEW ITEMS
form.addEventListener('submit', addItems);

function addItems(e) {
    e.preventDefault();
    // Creating a new list item

    itemsList.innerHTML += 
    `
    <li class="upNdown">
            <i class="icon-long-arrow-down"></i>
            <i class="icon-long-arrow-up"></i>
        </li>
        <li class="item">
          <div class="text">Item</div>
          <i class="icon-circle-arrow-left arrow"></i>
          <div class="options">
            <button class="delete"><i class="icon-trash"></i></button>
            <button class="star"><i class="icon-star"></i></button>
            <button class="edit"><i class="icon-pencil"></i></button>
          </div>     
        </li>
    `

    form.reset();
}