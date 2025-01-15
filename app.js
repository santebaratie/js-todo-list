"use strict";

// Select UI elements

const submitBtn = document.querySelector("input[type='submit'");
const itemInput = document.querySelector("input[type='text']:first-child");
const itemList = document.querySelector("ul");

// Add element to the page

function addItemToUI(item){

  // Create list element items

  const li = document.createElement('li');
  const circle = document.createElement('i');
  circle.classList.add('fa-regular', 'fa-circle');
  circle.addEventListener("click", (e) => {
    circle.parentElement.classList.toggle('completed');
  });
  const circleFilled = document.createElement('i');
  circleFilled.classList.add('fa-solid','fa-circle', 'hidden');
  const xMark = document.createElement('i');
  xMark.classList.add('fa-solid', 'fa-xmark', 'delete');
  li.append(circle);
  li.append(circleFilled)
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
       e.target.parentElement.remove();
    })
   }
})


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
})