var heightInfoCard = "250px";
function getEvents()
{
  let container = document.getElementById("container");
  let load = `
    <div class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;
  container.innerHTML = load;
  var config =
  {
    method: 'get',
    url: 'https://sheet.best/api/sheets/61e644c2-ec9e-4ea3-bfab-682c517690a9',
    headers: 
    {
      
    }
  }
  axios(config)
  .then((result) => {
    orderEvents(result.data)
  }).catch((err) => {
    console.log(err)
  });
}
function orderEvents(array){
  let currentEvents = []
  for (let l = 0; l<array.length; l++){
    if (array[l].current == "yes"){
      currentEvents.push(array[l])
    }
  }
  currentEvents.sort(function(a,b){
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateA-dateB;
  })
  postEventsInContainer(currentEvents)
  // postEventsInSidebar(currentEvents)
}
function postEventsInContainer(array){
  let container = document.getElementById("container");
  let eventName = null;
  let date = null;
  let registrationLink = null;
  let flyer = null;
  let hour = null;
  let venueName = null;
  let card = ``;
  for(let i = 0; i<array.length; i++)
  {
    eventName = array[i].eventName;
    description = array[i].description;
    date = () => {
      parts = array[i].date.split("/");
      year = parts[0];
      preMonth = parts[1];
      day = parts[2];
      if(preMonth == 1) {month = "enero"}
      else if(preMonth == 2) {month = "febrero"}
      else if(preMonth == 3) {month = "marzo"}
      else if(preMonth == 4) {month = "abril"}
      else if(preMonth == 5) {month = "mayo"}
      else if(preMonth == 6) {month = "junio"}
      else if(preMonth == 7) {month = "julio"}
      else if(preMonth == 8) {month = "agosto"}
      else if(preMonth == 9) {month = "septiembre"}
      else if(preMonth == 10) {month = "octubre"}
      else if(preMonth == 11) {month = "noviembre"}
      else if(preMonth == 12) {month = "diciembre"}
      date = `${day} de ${month} del ${year}`
      return date
    }
    dateEnd = () => {
      parts = array[i].dateEnd.split("/");
      year = parts[0];
      preMonth = parts[1];
      day = parts[2];
      if(preMonth == 1) {month = "enero"}
      else if(preMonth == 2) {month = "febrero"}
      else if(preMonth == 3) {month = "marzo"}
      else if(preMonth == 4) {month = "abril"}
      else if(preMonth == 5) {month = "mayo"}
      else if(preMonth == 6) {month = "junio"}
      else if(preMonth == 7) {month = "julio"}
      else if(preMonth == 8) {month = "agosto"}
      else if(preMonth == 9) {month = "septiembre"}
      else if(preMonth == 10) {month = "octubre"}
      else if(preMonth == 11) {month = "noviembre"}
      else if(preMonth == 12) {month = "diciembre"}
      dateEnd = `${day} de ${month} del ${year}`
      return dateEnd
    }
    registrationLink = array[i].registrationLink;
    flyer = array[i].flyer;
    hour = array[i].hour;
    venueLink = array[i].venueLink;
    venueName = array[i].venueName;
    type = array[i].type;
    eventLinkInGoogleCalendar = array[i].eventLinkInGoogleCalendar
    if(array[i].registrationLink === "N/A"){
      card += `
              <div class="card align-self-start mx-1 my-2"  style="width: 25rem;">
                <div class="card-body">
                  <div>
                    <img src="${flyer}" style="width:-webkit-fill-available;"/>
                    <div style="height:${heightInfoCard}">
                      <h4 class="my-2">${eventName}<h4/>
                      <h5>${description}</h5>
                      <h5> Lugar: ${venueName}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Fecha: ${date()}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Hora: ${hour}</h5>
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-center" style="position:relative">
                      <a href=${eventLinkInGoogleCalendar} target="_blank" style="text-decoration: none">
                        <input type="button" value="Calendar" class="btn btn-outline-primary" style="width:310px"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    else if(array[i].type == "Evento presencial"){
      card += `
              <div class="card align-self-start mx-1 my-2"  style="width: 25rem;">
                <div class="card-body">
                  <div>
                    <img src="${flyer}" style="width:-webkit-fill-available;"/>
                    <div style="height:${heightInfoCard}">
                      <h4 class="my-2 text-justify">${eventName}<h4/>
                      <h5>${description}</h5>
                      <h5>Lugar: ${venueName}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Fecha: ${date()}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Hora: ${hour}</h5>
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-between" style="position:relative">
                      <a href="http://${registrationLink}" target="_blank" style="text-decoration: none;">
                        <input type="button" value="Regístrate"/ class="btn btn-outline-success" style="width:150px">
                      </a>
                      <a href=${eventLinkInGoogleCalendar} target="_blank" style="text-decoration: none">
                        <input type="button" value="Calendar" class="btn btn-outline-primary" style="width:150px"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    else if(array[i].type == "Convocatoria"){
      card += `
              <div class="card align-self-start mx-1 my-2"  style="width: 25rem;">
                <div class="card-body">
                  <div>
                    <img src="${flyer}" style="width:-webkit-fill-available;"/>
                    <div style="height:${heightInfoCard}">
                      <h4 class="my-2 text-justify">${eventName}<h4/>
                      <h5>${description}</h5>
                      <h5>${type}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Fecha de apertura: ${date()}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Fecha de cierre: ${dateEnd()}</h5>
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-between" style="position:relative">
                      <a href="http://${registrationLink}" target="_blank" style="text-decoration: none;">
                        <input type="button" value="Regístrate"/ class="btn btn-outline-success" style="width:150px">
                      </a>
                      <a href=${eventLinkInGoogleCalendar} target="_blank" style="text-decoration: none">
                        <input type="button" value="Calendar" class="btn btn-outline-primary" style="width:150px"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;
    }
    else {
      card += `
              <div class="card align-self-start mx-1 my-2"  style="width: 25rem;">
                <div class="card-body">
                  <div>
                    <img src="${flyer}" style="width:-webkit-fill-available;"/>
                    <div style="height:${heightInfoCard}">
                      <h4 class="my-2 text-justify">${eventName}<h4/>
                      <h5>${description}</h5>
                      <h5>${venueName}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Fecha: ${date()}</h5>
                      <h5 class="card-subtitle mb-2 text-muted">Hora: ${hour}</h5>
                    </div>
                    <div class="card-footer bg-white d-flex justify-content-between" style="position:relative">
                      <a href="http://${registrationLink}" target="_blank" style="text-decoration: none;">
                        <input type="button" value="Regístrate"/ class="btn btn-outline-success" style="width:150px">
                      </a>
                      <a href=${eventLinkInGoogleCalendar} target="_blank" style="text-decoration: none">
                        <input type="button" value="Calendar" class="btn btn-outline-primary" style="width:150px"/>
                      </a>
                    </div>
                  </div>
                </div>
              </div>`;
    }
  }
  container.innerHTML = card;
}

// Funciones para postear eventos por fechas en el sidebar
// function postEventsInSidebar(array){
//   let sidebar = document.getElementById("sidebar");
//   let events = [];
//   let eventsEnero = [];
//   let eventsFebrero = [];
//   let eventsMarzo = [];
//   let eventsAbril = [];
//   let eventsMayo = [];
//   let eventsJunio = [];
//   let eventsJulio = [];
//   let eventsAgosto = [];
//   let eventsSeptiembre = [];
//   let eventsOctubre = [];
//   let eventsNoviembre = [];
//   let eventsDiciembre = [];
//   let card= ``;
//   for(let i = 0; i<array.length; i++){
//       let parts = array[i].date.split("/");
//       let year = parts[0];
//       let preMonth = parts[1];
//       let day = parts[2];
//       let month = null;
//       if(preMonth == 1) {month = "enero" && eventsEnero.push(array[i])}
//       else if(preMonth == 2) {month = "febrero" && eventsFebrero.push(array[i])}
//       else if(preMonth == 3) {month = "marzo" && eventsMarzo.push(array[i])}
//       else if(preMonth == 4) {month = "abril" && eventsAbril.push(array[i])}
//       else if(preMonth == 5) {month = "mayo" && eventsMayo.push(array[i])}
//       else if(preMonth == 6) {month = "junio" && eventsJunio.push(array[i])}
//       else if(preMonth == 7) {month = "julio" && eventsJulio.push(array[i])}
//       else if(preMonth == 8) {month = "agosto" && eventsAgosto.push(array[i])}
//       else if(preMonth == 9) {month = "septiembre" && eventsSeptiembre.push(array[i])}
//       else if(preMonth == 10) {month = "octubre" && eventsOctubre.push(array[i])}
//       else if(preMonth == 11) {month = "noviembre" && eventsNoviembre.push(array[i])}
//       else if(preMonth == 12) {month = "diciembre" && eventsDiciembre.push(array[i])}    
//   }
//   events.push(eventsEnero, eventsFebrero, eventsMarzo, eventsAbril, eventsMayo, eventsJunio, eventsJulio, eventsAgosto, eventsSeptiembre, eventsOctubre, eventsNoviembre, eventsDiciembre)
//   for(let j = 0; j<events.length; j++){
//     if (j == 0 && events[j].length > 0){
//       card += `
//         <div>
//           <div class="event">
//             <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('enero2023')">
//               Enero <i class="fa fa-caret-down"></i>
//             </button>
//           <div id="eventsEnero2023" class="w3-hide w3-white w3-card">
//             ${postEventsByMonthInSidebar(events[j])}
//           </div>   
//         </div>
//     `
//     }
//     else if(j == 1 && events[j].length > 0){
//       card += `
//       <div>
//         <div class="event">
//           <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('febrero2023')">
//             Febrero <i class="fa fa-caret-down"></i>
//           </button>
//         <div id="eventsFebrero2023" class="w3-hide w3-white w3-card">
//           ${postEventsByMonthInSidebar(events[j])}
//         </div>   
//       </div>
//       `
//     }
//     else if(j == 2 && events[j].length > 0){
//       card += `
//       <div>
//         <div class="event">
//           <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('marzo2023')">
//             Marzo <i class="fa fa-caret-down"></i>
//           </button>
//         <div id="eventsMarzo2023" class="w3-hide w3-white w3-card">
//           ${postEventsByMonthInSidebar(events[j])}
//         </div>   
//       </div>
//       `
//     }
//     else if(j == 3 && events[j].length > 0){
//       card += `
//       <div>
//         <div class="event">
//           <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('abril2023')">
//             Abril <i class="fa fa-caret-down"></i>
//           </button>
//         <div id="eventsAbril2023" class="w3-hide w3-white w3-card">
//           ${postEventsByMonthInSidebar(events[j])}
//         </div>   
//       </div>
//       `;
//     }
//     else if(j == 4 && events[j].length > 0){
//       card += `
//       <div>
//         <div class="event">
//           <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('mayo2023')">
//             Mayo <i class="fa fa-caret-down"></i>
//           </button>
//         <div id="eventsMayo2023" class="w3-hide w3-white w3-card">
//         ${postEventsByMonthInSidebar(events[j])}
//         </div>   
//       </div>
//       `
//     }
//     else if(j == 5 && events[j].length > 0){
//       card += `
//       <div>
//         <div class="event">
//           <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('junio2023')">
//             Junio <i class="fa fa-caret-down"></i>
//           </button>
//         <div id="eventsJunio2023" class="w3-hide w3-white w3-card">
//           ${postEventsByMonthInSidebar(events[j])}
//         </div>   
//       </div>
//       `
//     }
//     else if(j == 6 && events[j].length > 0){
//       card += `
//       <div>
//         <div class="event">
//           <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('julio2023')">
//             Julio <i class="fa fa-caret-down"></i>
//           </button>
//         <div id="eventsJulio2023" class="w3-hide w3-white w3-card">
//           ${postEventsByMonthInSidebar(events[j])}
//         </div>   
//       </div>
//       `
//     }
//     else if(j == 7 && events[j].length > 0){
//       card += `
//       <div>
//         <div class="event">
//           <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('agosto2023')">
//             Agosto <i class="fa fa-caret-down"></i>
//           </button>
//         <div id="eventsAgosto2023" class="w3-hide w3-white w3-card">
//           ${postEventsByMonthInSidebar(events[j])}
//         </div>   
//       </div>
//       `
//     }
//     else if(j == 8 && events[j].length > 0){
//       card += `
//       <div>
//         <div class="event">
//           <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('septiembre2023')">
//             Septiembre <i class="fa fa-caret-down"></i>
//           </button>
//         <div id="eventsSeptiembre2023" class="w3-hide w3-white w3-card">
//           ${postEventsByMonthInSidebar(events[j])}
//         </div>   
//       </div>
//       `
//     }
//     else if(j == 9 && events[j].length > 0){
//       card += `
//       <div>
//         <div class="event">
//           <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('octubre2023')">
//             Octubre <i class="fa fa-caret-down"></i>
//           </button>
//         <div id="eventsOctubre2023" class="w3-hide w3-white w3-card">
//           ${postEventsByMonthInSidebar(events[j])}
//         </div>   
//       </div>
//       `
//     }
//     else if(j == 10 && events[j].length > 0){
//       card += `
//       <div>
//         <div class="event">
//           <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('noviembre2023')">
//             Noviembre <i class="fa fa-caret-down"></i>
//           </button>
//         <div id="eventsNoviembre2023" class="w3-hide w3-white w3-card">
//           ${postEventsByMonthInSidebar(events[j])}
//         </div>   
//       </div>
//       `
//     }
//     else if(j == 11 && events[j].length > 0){
//       card += `
//       <div>
//         <div class="event">
//           <button class="w3-button w3-block w3-left-align" onclick="myAccFunc('diciembre2023')">
//             Diciembre <i class="fa fa-caret-down"></i>
//           </button>
//         <div id="eventsDiciembre2023" class="w3-hide w3-white w3-card">
//           ${postEventsByMonthInSidebar(events[j])}
//         </div>   
//       </div>
//       `
//     }
//   }
//   sidebar.innerHTML = card
// }
// function postEventsByMonthInSidebar(array){
//   let eventDates = ``;
//   for (let k = 0; k<array.length; k++){
//     eventDates += `
//     <button href="#" class="w3-bar-item w3-button">${(array[k].date.split("/"))[2]}</button>
//   `
//   }
//   return eventDates;
// }
// function myAccFunc(month) {
//   if(month == "enero2023"){
//   var events = document.getElementById("eventsEnero2023");
//     if (events.className.indexOf("w3-show") == -1) {
//       events.className += " w3-show";
//       events.previousElementSibling.className += " w3-green";
//     } else { 
//       events.className = events.className.replace(" w3-show", "");
//       events.previousElementSibling.className = 
//       events.previousElementSibling.className.replace(" w3-green", "");
//     }
//   }
//   else if(month == "febrero2023"){
//   var events = document.getElementById("eventsFebrero2023");
//     if (events.className.indexOf("w3-show") == -1) {
//       events.className += " w3-show";
//       events.previousElementSibling.className += " w3-green";
//     } else { 
//       events.className = events.className.replace(" w3-show", "");
//       events.previousElementSibling.className = 
//       events.previousElementSibling.className.replace(" w3-green", "");
//     }
//   }
//   else if(month == "marzo2023"){
//     var events = document.getElementById("eventsMarzo2023");
//       if (events.className.indexOf("w3-show") == -1) {
//         events.className += " w3-show";
//         events.previousElementSibling.className += " w3-green";
//       } else { 
//         events.className = events.className.replace(" w3-show", "");
//         events.previousElementSibling.className = 
//         events.previousElementSibling.className.replace(" w3-green", "");
//       }
//     }
//   else if(month == "abril2023"){
//   var events = document.getElementById("eventsAbril2023");
//     if (events.className.indexOf("w3-show") == -1) {
//       events.className += " w3-show";
//       events.previousElementSibling.className += " w3-green";
//     } else { 
//       events.className = events.className.replace(" w3-show", "");
//       events.previousElementSibling.className = 
//       events.previousElementSibling.className.replace(" w3-green", "");
//     }
//   }
//   else if(month == "mayo2023"){
//     var events = document.getElementById("eventsMayo2023");
//       if (events.className.indexOf("w3-show") == -1) {
//         events.className += " w3-show";
//         events.previousElementSibling.className += " w3-green";
//       } else { 
//         events.className = events.className.replace(" w3-show", "");
//         events.previousElementSibling.className = 
//         events.previousElementSibling.className.replace(" w3-green", "");
//       }
//     }
//   else if(month == "junio2023"){
//   var events = document.getElementById("eventsJunio2023");
//     if (events.className.indexOf("w3-show") == -1) {
//       events.className += " w3-show";
//       events.previousElementSibling.className += " w3-green";
//     } else { 
//       events.className = events.className.replace(" w3-show", "");
//       events.previousElementSibling.className = 
//       events.previousElementSibling.className.replace(" w3-green", "");
//     }
//   }
//   else if(month == "julio2023"){
//   var events = document.getElementById("eventsJulio2023");
//     if (events.className.indexOf("w3-show") == -1) {
//       events.className += " w3-show";
//       events.previousElementSibling.className += " w3-green";
//     } else { 
//       events.className = events.className.replace(" w3-show", "");
//       events.previousElementSibling.className = 
//       events.previousElementSibling.className.replace(" w3-green", "");
//     }
//   }
//   else if(month == "agosto2023"){
//   var events = document.getElementById("eventsAgosto2023");
//     if (events.className.indexOf("w3-show") == -1) {
//       events.className += " w3-show";
//       events.previousElementSibling.className += " w3-green";
//     } else { 
//       events.className = events.className.replace(" w3-show", "");
//       events.previousElementSibling.className = 
//       events.previousElementSibling.className.replace(" w3-green", "");
//     }
//   }
//   else if(month == "septiembre2023"){
//   var events = document.getElementById("eventsSeptiembre2023");
//     if (events.className.indexOf("w3-show") == -1) {
//       events.className += " w3-show";
//       events.previousElementSibling.className += " w3-green";
//     } else { 
//       events.className = events.className.replace(" w3-show", "");
//       events.previousElementSibling.className = 
//       events.previousElementSibling.className.replace(" w3-green", "");
//     }
//   }
//   else if(month == "octubre2023"){
//   var events = document.getElementById("eventsOctubre2023");
//     if (events.className.indexOf("w3-show") == -1) {
//       events.className += " w3-show";
//       events.previousElementSibling.className += " w3-green";
//     } else { 
//       events.className = events.className.replace(" w3-show", "");
//       events.previousElementSibling.className = 
//       events.previousElementSibling.className.replace(" w3-green", "");
//     }
//   }
//   else if(month == "noviembre2023"){
//   var events = document.getElementById("eventsNoviembre2023");
//     if (events.className.indexOf("w3-show") == -1) {
//       events.className += " w3-show";
//       events.previousElementSibling.className += " w3-green";
//     } else { 
//       events.className = events.className.replace(" w3-show", "");
//       events.previousElementSibling.className = 
//       events.previousElementSibling.className.replace(" w3-green", "");
//     }
//   }
//   else if(month == "diciembre2023"){
//   var events = document.getElementById("eventsDiciembre2023");
//     if (events.className.indexOf("w3-show") == -1) {
//       events.className += " w3-show";
//       events.previousElementSibling.className += " w3-green";
//     } else { 
//       events.className = events.className.replace(" w3-show", "");
//       events.previousElementSibling.className = 
//       events.previousElementSibling.className.replace(" w3-green", "");
//     }
//   }
// }