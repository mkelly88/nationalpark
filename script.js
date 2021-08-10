const ParksApiUrl = "https://developer.nps.gov/api/v1/parks?";
const APIKey = "z5aTTxKjyFgjnbJSRxYfFYEXkXIgKSA9fkN4nK4P";

$(document).ready(() => {
  $("#searchForm").on("submit", (e) => {
    e.preventDefault();
    let searchText = $("#searchText").val();
    getParks(searchText);
  });
});

function getParks(searchText) {
  axios
    .get(
      "https://developer.nps.gov/api/v1/parks?stateCode=" +
        searchText +
        "&api_key=z5aTTxKjyFgjnbJSRxYfFYEXkXIgKSA9fkN4nK4P"
    )
    .then((response) => {
      let parks = response.data.data;
      let output = "";
      $.each(parks, (index, park) => {
        console.log(park);
        output += `
            <div class="col-md-3">
              <div class="well text-center">
                <img src="${park.images[0].url}"> 
                <h5 class="imgName">${park.fullName}</h5>
                <a onclick="parkSelected('${park.parkCode}')"class="parkBtn" href="park.html">Park Details</a>
              </div>
            </div>
          `;
      });

      $("#parks").html(output);
    })

    .catch((err) => {
      console.log(err);
    });
}

function parkSelected(code) {
  sessionStorage.setItem("parkCode", code);
  console.log(parkCode);
  window.location = "park.html";
  return false;
}

function getFormattedAddress(address) {
  return `${address.line1 ? address.line1 + ", " : ""} 
            ${address.line2 ? address.line2 + ", " : ""} 
            ${address.line3 ? address.line3 + ", " : ""} 
            ${address.city ? address.city + ", " : ""}
            ${address.postalCode ? address.postalCode + ", " : ""} 
            ${address.stateCode ? address.stateCode + ", " : ""}`;
}
console.log(address);

function getPark() {
  let parkCode = sessionStorage.getItem("parkCode");
  console.log(parkCode);

  axios
    .get(
      "https://developer.nps.gov/api/v1/parks?parkCode=" +
        parkCode +
        "&api_key=z5aTTxKjyFgjnbJSRxYfFYEXkXIgKSA9fkN4nK4P"
    )
    .then((response) => {
      let park = response.data.data[0];
      console.log(park);

      let output = `
      <div class="parkDetails">
       <div>
        <img class="headerimg" src="${
          park.images[0] && park.images[0].url && park.images[0].url
        }">
        </div>
        <div>
        <h5 class="parkName">${park.fullName && park.fullName}</h5>
        <div/>
       </div>
        <div class="col-md-4" id="contactInfo>
         <h2> Address: ${
           park.addresses[0] && getFormattedAddress(park.addresses[0])
         } </h2>
         <h2> ${
           park.contacts.emailAddresses[0] &&
           park.contacts.emailAddresses[0].emailAddress &&
           park.contacts.emailAddresses[0].emailAddress
         } </h2>
         <h2> ${
           park.contacts.phoneNumbers[0] &&
           park.contacts.phoneNumbers[0].phoneNumber &&
           park.contacts.phoneNumbers[0].phoneNumber
         } </h2>
         <h2> ${
           park.operatingHours[0] &&
           park.operatingHours[0].description &&
           park.operatingHours[0].description
         } </h2>
        </div>
        <div class="row" id="parkDesc">
         <p> ${park.description} </p>
        </div>
        <div class="weather">
         <p> ${park.weatherInfo} </p>
        </div>
        <div class="container" id='activeImage'>
          <div class="row>
          <div class="col">
          <img src="${
            park.images[1] && park.images[1].url && park.images[1].url
          }" id="imgClass" style="width:100%;height:500px;>
          </div>
          <div class="col">
        <h4 class="actList">Activities: </h4>  
        ${park.activities && getActivityList(park.activities)}
        </div>
        <div class="direction"
         <p> ${park.directionsInfo} </p>
        </div>
        </div>
        </div>

      </div>
         `;

      $("#park").html(output);
    })

    .catch((err) => {
      console.log(err);
    });
}

function getActivityList(activities) {
  let output = "<ul class='list-group list-group-flush'>"
  for(let i = 0 ; i < activities.length; i++) {
    output += "<li class='list-group-item'>"+activities[i].name+"</li>"

  }
  output += "</ul>";
  return output;
}