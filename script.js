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
                <h5>${park.fullName}</h5>
                <a onclick="parkSelected('${park.id}')"class="btn btn-primary" href="#">Park Details</a>
              </div>
            </div>
          `;
        });
  
        $('#parks').html(output);
      })

      .catch((err) => {
        console.log(err);
    })}

    function parkSelected(id){
      sessionStorage.setItem('parkId', id);
      window.location = 'park.html';
      return false;
  }

  function getPark(){
    let parkId = sessionStorage.getItem('parkId');
    console.log(parkId)

    axios.get('https://developer.nps.gov/api/v1/parks?i='+parkId+'&api_key=z5aTTxKjyFgjnbJSRxYfFYEXkXIgKSA9fkN4nK4P')
    .then((response) => {
      console.log(response.data);
      let park = response.data;

      let output =`
       <div class="row">
       <h5 class="parkName">${park.name}
       </div>
         `;

         $('#park').html(output);
    })}