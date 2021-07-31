const ParksApiUrl = 'https://developer.nps.gov/api/v1/parks?';
const APIKey = 'z5aTTxKjyFgjnbJSRxYfFYEXkXIgKSA9fkN4nK4P';

$(document).ready(() => {
    $("#searchForm").on('submit', (e) => {
      e.preventDefault();
      let searchText = $("#searchText").val();
      getParks(searchText);
    });
  });



  
  function getParks(searchText) {
    axios.get('https://developer.nps.gov/api/v1/parks?stateCode='+searchText+'&api_key=z5aTTxKjyFgjnbJSRxYfFYEXkXIgKSA9fkN4nK4P')
    .then((response) => {
      let parks = response.data.data;
      let output = '';
        $.each(parks, (index, park) => {
          console.log(park)
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
  
        $('#parks').html(output);
      })

      .catch((err) => {
        console.log(err);
    })}

   
  function parkSelected(code){
    sessionStorage.setItem('parkCode', code);
    console.log(parkCode);
    window.location = 'park.html';
    return false;
  }


  function getPark(){
    let parkCode = sessionStorage.getItem('parkCode');
    console.log(parkCode)

    axios.get('https://developer.nps.gov/api/v1/parks?parkCode='+parkCode+'&api_key=z5aTTxKjyFgjnbJSRxYfFYEXkXIgKSA9fkN4nK4P')
    .then((response) => {
      console.log(response.data.data);
      let park = response.data.data;
      console.log(park);

      let output =`
      <div class="parkDetails">
       <div class="row">
        <img src="${park.images[1].url}">
        <h5 class="parkName">${park.fullName}</h5>
       </div>
        <div class="contact row">
         <h2> ${park.adresses[0].url} </h2>
        </div>
      </div>
         `;

         $('#park').html(output);
       
    })

    .catch((err) => {
      console.log(err);
    });
  
  }