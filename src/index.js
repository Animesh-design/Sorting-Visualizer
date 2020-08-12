import React from 'react'
import ReactDom from 'react-dom'

// MAIN //

var inp_as = document.getElementById("a_size");
var array_size = inp_as.value;

var inp_gen = document.getElementById("a_generate");
var inp_aspeed = document.getElementById("a_speed");

var butts_algos = document.querySelectorAll(".algos button");

var div_sizes = [];
var divs = [];
var margin_size;
var cont = document.getElementById("array_container"); //Array Area where it will be shown

cont.style = "flex-direction:row"; //Should be vertical in row wise

// Array Generation and Updation

inp_gen.addEventListener("click", generate_array);
inp_as.addEventListener("input", update_array_size);

function generate_array() {
  cont.innerHTML = "";
  for (var i = 0; i < array_size; i++) {
    div_sizes[i] =
      Math.floor(Math.random() * 0.5 * (inp_as.max - inp_as.min)) + 10; //Assigning Random Values to each Div of array bars

    divs[i] = document.createElement("div");
    cont.appendChild(divs[i]);
    margin_size = 0.1; //Margin of each array bars

    divs[i].style =
      " margin:0% " +
      margin_size +
      "%; background-color:blue; width:" +
      (100 / array_size - 2 * margin_size) +
      "%; height:" +
      div_sizes[i] +
      "%;"; //Giving each array bars width and height based on scroll
  }
}

function update_array_size() {
  array_size = inp_as.value;
  generate_array();
}

window.onload = update_array_size();

for (
  var i = 0;
  i < butts_algos.length;
  i++ //For Each Button
) {
  butts_algos[i].addEventListener("click", runalgo);
}

function disable_buttons() {
  for (var i = 0; i < butts_algos.length; i++) {
    butts_algos[i].classList = [];
    butts_algos[i].classList.add("butt_locked");

    butts_algos[i].disabled = true;
    inp_as.disabled = true;
    inp_gen.disabled = true;
    inp_aspeed.disabled = true;
  }
}

function runalgo() {
  disable_buttons();

  this.classList.add("butt_selected");
  switch (this.innerHTML) {
    case "Bubble":
       Bubble();
      break;
    case "Selection":
      Selection();
      break;
    case "Insertion":
      Insertion();
      break;
    case "Merge":
      Merge();
          break;
        case "Quick":
          Quick();
          break;
        case "Heap":
          Heap();
          break;
  }
}

// VISUALIZATION //

var speed = 100; //Default Speed of ALgo
inp_aspeed.addEventListener("input", vis_speed);

function vis_speed() {
  //To define the speed
  var array_speed = inp_aspeed.value;
  switch (parseInt(array_speed)) {
    case 1:
      speed = 3.5;
      break;
    case 2:
      speed = 10;
      break;
    case 3:
      speed = 40;
      break;
    case 4:
      speed = 85;
      break;
    case 5:
      speed = 125;
      break;
    case 6:
      speed = 175;
      break;
    case 7:
      speed = 250;
      break;
    case 8:
      speed = 330;
      break;
    case 9:
      speed = 500;
      break;
    default:
      speed = 1000;
      break;
  }

  delay_time = 10000 / (Math.floor(array_size / 10) * speed); //Decrease Numerator to increase speed
}
var delay_time = 10000 / (Math.floor(array_size / 10) * speed);

var c_delay = 0; // This is updated on every div so that visualization is visible

function div_update(cont, height, color) {
  //To update array size on scroll and speed
  window.setTimeout(function () {
    cont.style =
      " margin:0% " +
      margin_size +
      "%; width:" +
      (100 / array_size - 2 * margin_size) +
      "%; height:" +
      height +
      "%; background-color:" +
      color +
      ";";
  }, (c_delay += delay_time));
}

function enable_buttons() {
  // To enable the buttons once the sorting is over
  window.setTimeout(function () {
    for (var i = 0; i < butts_algos.length; i++) {
      butts_algos[i].classList = [];
      butts_algos[i].classList.add("butt_unselected");

      butts_algos[i].disabled = false;
      inp_as.disabled = false;
      inp_gen.disabled = false;
      inp_aspeed.disabled = false;
    }
  }, (c_delay += delay_time));
}

// DIFFERENT SORTING ALGORITHMS //

// INSERTION SORT //
function Insertion() {
  c_delay = 0;

  for (var j = 0; j < array_size; j++) {
    div_update(divs[j], div_sizes[j], "yellow"); //Color Update

    var key = div_sizes[j];
    var i = j - 1;
    while (i >= 0 && div_sizes[i] > key) {
      div_update(divs[i], div_sizes[i], "red"); //Color Update

      div_update(divs[i + 1], div_sizes[i + 1], "red"); //Color Update

      div_sizes[i + 1] = div_sizes[i];

      div_update(divs[i], div_sizes[i], "red"); //Height Update

      div_update(divs[i + 1], div_sizes[i + 1], "red"); //Height Update

      div_update(divs[i], div_sizes[i], "blue"); //Color Update

      if (i === j - 1) {
        div_update(divs[i + 1], div_sizes[i + 1], "yellow"); //Color update
      } else {
        div_update(divs[i + 1], div_sizes[i + 1], "purple"); //Color update
      }
      i -= 1;
    }
    div_sizes[i + 1] = key;

    for (var t = 0; t < j; t++) {
      div_update(divs[t], div_sizes[t], "green"); //Color update
    }
  }
  div_update(divs[j - 1], div_sizes[j - 1], "green"); //Color update

  enable_buttons(); //Enabling Disabled BUttons
}

// BUBBLE SORT //

function Bubble() {
  
  document.getElementById("Info_Cont1").innerHTML ="SARTHAK"
  ;
   
  
  c_delay = 0;

  for (var i = 0; i < array_size - 1; i++) {
    for (var j = 0; j < array_size - i - 1; j++) {
      div_update(divs[j], div_sizes[j], "yellow");

      if (div_sizes[j] > div_sizes[j + 1]) {
        div_update(divs[j], div_sizes[j], "red"); //Color Update

        div_update(divs[j + 1], div_sizes[j + 1], "red"); //Color Update

        var temp = div_sizes[j];
        div_sizes[j] = div_sizes[j + 1];
        div_sizes[j + 1] = temp;

        div_update(divs[j], div_sizes[j], "red"); //Height Update COlor

        div_update(divs[j + 1], div_sizes[j + 1], "red"); //Height Update Color
      }
      div_update(divs[j], div_sizes[j], "purple");
    }
    div_update(divs[j], div_sizes[j], "green");
  }
  div_update(divs[0], div_sizes[0], "green");
  enable_buttons();
}

// SELECTION SORT //

function Selection() {
  c_delay = 0;

  for (var i = 0; i < array_size - 1; i++) {
    div_update(divs[i], div_sizes[i], "red"); //Color update

    var index_min = i;

    for (var j = i + 1; j < array_size; j++) {
      div_update(divs[j], div_sizes[j], "yellow"); //Color update

      if (div_sizes[j] < div_sizes[index_min]) {
        if (index_min !== i) {
          div_update(divs[index_min], div_sizes[index_min], "blue"); //Color update
        }
        index_min = j;
        div_update(divs[index_min], div_sizes[index_min], "red"); //Color update
      } else {
        div_update(divs[j], div_sizes[j], "blue"); //Color update
      }
    }

    if (index_min !== i) {
      var temp = div_sizes[index_min];
      div_sizes[index_min] = div_sizes[i];
      div_sizes[i] = temp;

      div_update(divs[index_min], div_sizes[index_min], "red"); //Height update
      div_update(divs[i], div_sizes[i], "red"); //Height update
      div_update(divs[index_min], div_sizes[index_min], "blue"); //Color update
    }
    div_update(divs[i], div_sizes[i], "green"); //Color update
  }
  div_update(divs[i], div_sizes[i], "green"); //Color update

  enable_buttons();
}

// MERGE SORT //

function Merge() {
  c_delay = 0;

  merge_partition(0, array_size - 1);

  enable_buttons();
}

function merge_sort(start, mid, end) {
  var p = start, q = mid + 1;

  var Arr = [], k = 0;

  for (var i = start; i <= end; i++) {
    if (p > mid) {
      Arr[k++] = div_sizes[q++];
      div_update(divs[q - 1], div_sizes[q - 1], "red");//Color update
    }
    else if (q > end) {
      Arr[k++] = div_sizes[p++];
      div_update(divs[p - 1], div_sizes[p - 1], "red");//Color update
    }
    else if (div_sizes[p] < div_sizes[q]) {
      Arr[k++] = div_sizes[p++];
      div_update(divs[p - 1], div_sizes[p - 1], "red");//Color update
    }
    else {
      Arr[k++] = div_sizes[q++];
      div_update(divs[q - 1], div_sizes[q - 1], "red");//Color update
    }
  }

  for (var t = 0; t < k; t++) {
    div_sizes[start++] = Arr[t];
    div_update(divs[start - 1], div_sizes[start - 1], "green");//Color update
  }
}

function merge_partition(start, end) {
  if (start < end) {
    var mid = Math.floor((start + end) / 2);
    div_update(divs[mid], div_sizes[mid], "yellow");//Color update

    merge_partition(start, mid);
    merge_partition(mid + 1, end);

    merge_sort(start, mid, end);
  }
}


// QUICK SORT //

function Quick(){
  c_delay=0;
  quick_sort(0,array_size-1)
  enable_buttons();
}

function quick_partition(start, end) {
  var i = start + 1;
  var piv = div_sizes[start];//make the first element as pivot element.
  div_update(divs[start], div_sizes[start], "yellow");//Color update

  for (var j = start + 1; j <= end; j++) {
    //re-arrange the array by putting elements which are less than pivot on one side and which are greater that on other.
    if (div_sizes[j] < piv) {
      div_update(divs[j], div_sizes[j], "yellow");//Color update

      div_update(divs[i], div_sizes[i], "red");//Color update
      div_update(divs[j], div_sizes[j], "red");//Color update

      var temp = div_sizes[i];
      div_sizes[i] = div_sizes[j];
      div_sizes[j] = temp;

      div_update(divs[i], div_sizes[i], "red");//Height update
      div_update(divs[j], div_sizes[j], "red");//Height update

      div_update(divs[i], div_sizes[i], "blue");//Height update
      div_update(divs[j], div_sizes[j], "blue");//Height update

      i += 1;
    }
  }
  div_update(divs[start], div_sizes[start], "red");//Color update
  div_update(divs[i - 1], div_sizes[i - 1], "red");//Color update

  var temp = div_sizes[start];//put the pivot element in its proper place.
  div_sizes[start] = div_sizes[i - 1];
  div_sizes[i - 1] = temp;

  div_update(divs[start], div_sizes[start], "red");//Height update
  div_update(divs[i - 1], div_sizes[i - 1], "red");//Height update

  for (var t = start; t <= i; t++) {
    div_update(divs[t], div_sizes[t], "green");//Color update
  }

  return i - 1;//return the position of the pivot
}

function quick_sort(start, end){
  if(start<end){
    var piv_pos=quick_partition(start, end)
    quick_sort(start,piv_pos-1)
    quick_sort(piv_pos+1,end)
  }
}

// HEAP SORT //

function Heap() {
  c_delay = 0;

  heap_sort();

  enable_buttons();
}

function swap(i, j) {
  div_update(divs[i], div_sizes[i], "red");//Color update
  div_update(divs[j], div_sizes[j], "red");//Color update

  var temp = div_sizes[i];
  div_sizes[i] = div_sizes[j];
  div_sizes[j] = temp;

  div_update(divs[i], div_sizes[i], "red");//Height update
  div_update(divs[j], div_sizes[j], "red");//Height update

  div_update(divs[i], div_sizes[i], "blue");//Color update
  div_update(divs[j], div_sizes[j], "blue");//Color update
}

function max_heapify(n, i) {
  var largest = i;
  var l = 2 * i + 1;
  var r = 2 * i + 2;

  if (l < n && div_sizes[l] > div_sizes[largest]) {
    if (largest != i) {
      div_update(divs[largest], div_sizes[largest], "blue");//Color update
    }

    largest = l;

    div_update(divs[largest], div_sizes[largest], "red");//Color update
  }

  if (r < n && div_sizes[r] > div_sizes[largest]) {
    if (largest != i) {
      div_update(divs[largest], div_sizes[largest], "blue");//Color update
    }

    largest = r;

    div_update(divs[largest], div_sizes[largest], "red");//Color update
  }

  if (largest != i) {
    swap(i, largest);

    max_heapify(n, largest);
  }
}

function heap_sort() {
  for (var i = Math.floor(array_size / 2) - 1; i >= 0; i--) {
    max_heapify(array_size, i);
  }

  for (var i = array_size - 1; i > 0; i--) {
    swap(0, i);
    div_update(divs[i], div_sizes[i], "green");//Color update
    div_update(divs[i], div_sizes[i], "yellow");//Color update

    max_heapify(i, 0);

    div_update(divs[i], div_sizes[i], "blue");//Color update
    div_update(divs[i], div_sizes[i], "green");//Color update
  }
  div_update(divs[i], div_sizes[i], "green");//Color update
}

// PRINTING INFO IN THE BLOCK //

