function renderCalendar(events){
var settings = {};
var element = document.getElementById('caleandar');
caleandar(element, events, settings);
}

document.getElementById('close-caleander').addEventListener("click", ()=> {
  closeCommandsView();
  document.getElementById('caleander-holder').style.display = "none";
})


