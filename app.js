"use strict";

// Select UI elements

const submitBtn = document.querySelector("input[type='submit'");
const itemInput = document.querySelector("input[type='text']:first-child");
const itemList = document.querySelector("ul");
const filterInput = document.querySelector(".search-input");
const clearBtn = document.querySelector(".clear-btn");

// Add element to the page

function addItemToUI(item){

  // Create list element items

  const li = document.createElement('li');
  const circle = document.createElement('i');
  circle.classList.add('fa-regular', 'fa-circle');
  circle.addEventListener("click", (e) => {
    circle.parentElement.classList.toggle('completed');
  });
  const xMark = document.createElement('i');
  xMark.classList.add('fa-solid', 'fa-xmark', 'delete');
  li.append(circle);
  li.append(` ${item}`);
  li.append(xMark)
  itemList.append(li);

  // Clean input field after adding item to the page

  itemInput.value = '';
}

submitBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const item = itemInput.value.trim();

  // Check if the value an empty string

  if(item){
    addItemToUI(item);
    saveItemToLocalStorage(item);
    checkUI();
  }
});


// A function to add an element to the local storage 

function saveItemToLocalStorage(item){
  const items = getLocalStorageItems();
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}

// A function to retrieve items from the local storage

function getLocalStorageItems(){
  let items = localStorage.getItem('items');
  if (items === null) {
    items = [];
    return items;
  } else {
    return JSON.parse(items);
  }
}


// Remove element from the page

itemList.addEventListener("click", (e) => {
   if(e.target.classList.contains('delete')){
    e.target.parentElement.classList.add('fall');
    e.target.parentElement.addEventListener("animationend", () => {
      removeItemFromLocalStorage(e.target.previousSibling.textContent.trim());
      e.target.parentElement.remove();
      checkUI();
    })
   }
})

// A function to remove element from the local storage

function removeItemFromLocalStorage(item){
  const items = getLocalStorageItems();
  const index = items.indexOf(item);
  items.splice(index, 1);
  localStorage.setItem('items', JSON.stringify(items));
}

// A function that loads items from local storage and add to the page

function loadItemsToThePage(){
  itemList.innerHTML = '';
  const items = getLocalStorageItems();
  for(const item of items){
    addItemToUI(item);
  }
}


// Load items from the local storage when page loaded

window.addEventListener("DOMContentLoaded", (e) => {
  loadItemsToThePage();
  checkUI();
})


// Filter items feature

function filterItems(){
  const items = getLocalStorageItems();
  const filteredItems = items.filter((item) => {
    return item.includes(filterInput.value);
  });
  itemList.innerHTML = '';
  for(const item of filteredItems){
    addItemToUI(item);
  }
}

filterInput.addEventListener('input', (e) => {
  filterItems();
});


// Hide the filter input when the list empty

function checkUI(){
  const items = getLocalStorageItems();
  if(items.length >= 2){
    clearBtn.classList.remove('hidden');
    filterInput.classList.remove('hidden');
  } else {
    clearBtn.classList.add('hidden');
    filterInput.classList.add('hidden');
  }
}


// Clear the list when 'clear list' button clicked
clearBtn.addEventListener("click", () => {
  itemList.innerHTML = '';
  localStorage.removeItem('items');
  checkUI();
})

