document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);


function openNav() {
  document.getElementsByClassName("overlay")[0].style.width = "100%";
}

function closeNav() {
  document.getElementsByClassName("overlay")[0].style.width = "0%";
}
