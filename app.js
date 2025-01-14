"use strict";
// Select UI elements

const submitBtn = document.querySelector("input[type='submit'");
const itemInput = document.querySelector("input[type='text']:first-child");
const itemList = document.querySelector("ul");

// Add element to the page

function addItemToUI(item){
  console.log(item);
  // Create list element items

  const li = document.createElement('li');
  const circle = document.createElement('i');
  circle.classList.add('fa-regular', 'fa-circle');
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
  }
});