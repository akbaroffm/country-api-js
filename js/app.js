let elList = document.querySelector(".country")

let elSearchName = document.querySelector(".search-name")
let elSearchCapital = document.querySelector(".search-capital")
let elSearchSelect= document.querySelector(".select-region")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")


let selectOpTionList = [];

const getData = async (URL) =>{
    const res = await fetch(URL)
    const data = await res.json()
    return data
}


getData("https://restcountries.com/v3.1/all").then(res =>{
    renderCountry(res, elList)
    res.map(item => {
        if(!selectOpTionList.includes(item.region))
        selectOpTionList.push(item.region)
    })
    
        selectOpTionList.map(item => {
          let elOption = document.createElement('option')
          elOption.textContent = item
          elOption.value = item
          elSearchSelect.appendChild(elOption)
        })
      
})


function renderCountry(arr, list) {
    list.innerHTML = "";
    for (let item of arr) {
      if (item && item.altSpellings && item.altSpellings[1]) {
        let elItem = document.createElement("li");
        elItem.innerHTML = `
              <img src=${item.flags.png} width ="350" height="200px"/>
              <hr>
              <div class=flex-col>
                  <strong><span>Country name: </span> ${item.altSpellings[1]}</strong>
                  <strong><span>Area: </span> ${item.area}</strong>
                  <strong><span>Population: </span> ${item.population}</strong>
                  <strong><span>Capital: </span> ${item.capital ? item.capital[0] : "-"}</strong>
              </div>
              <button class="more-btn" id="${item.capital ? item.capital[0] : "-"}">More</button>
          `;
        list.appendChild(elItem);
      }
    }
  }

elSearchName.addEventListener("keyup", function(evt){
    let value = evt.target.value
    if(value){
        getData(`https://restcountries.com/v3.1/name/${value}`).then(res =>{
        renderCountry(res, elList)
    })
    }else{
        getData("https://restcountries.com/v3.1/all").then(res =>{
            renderCountry(res, elList)
        })
    }
})

elSearchCapital.addEventListener("keyup", function(evt){
    let value = evt.target.value
    if(value){
        getData(`https://restcountries.com/v3.1/capital/${value}`).then(res =>{
        renderCountry(res, elList)
    })
    }else{
        getData("https://restcountries.com/v3.1/all").then(res =>{
            renderCountry(res, elList)
        })
    }
})

elSearchSelect.addEventListener("change", function(evt){
    let value = evt.target.value
    if(value != "All"){
        getData(`https://restcountries.com/v3.1/region/${value}`).then(res =>{
        renderCountry(res, elList)
    })
    }else{
        getData("https://restcountries.com/v3.1/all").then(res =>{
            renderCountry(res, elList)
        })
    }
})

elList.addEventListener('click', function(evt) {
    if (evt.target.matches(".more-btn")) {
      let capital = evt.target.id;
      getData(`https://restcountries.com/v3.1/capital/${capital}`).then(res => {
        if (res.length > 0) {
          elModalWrapper.classList.add("open-modal");
          elModal.innerHTML = `
             <div class="wrapper">
            <div>
                 <img src=${res[0].flags.png} width ="350" height="200px"/>
            </div>
              <hr>
              <div class=flex-col>
                  <strong><span>Country name: </span> ${res[0].altSpellings[1]}</strong>
                  <strong><span>Area: </span> ${res[0].area}</strong>
                  <strong><span>Population: </span> ${res[0].population}</strong>
                  <strong><span>Subregion: </span> ${res[0].subregion}</strong>
                  <strong><span>Languages: </span> ${Object.values(res[0].languages).join(', ')}</strong>
                  <strong><span>Currencies: </span>${res[0].currencies.EUR ? res[0].currencies.EUR.name : "-"}</strong>
                  <strong><span>Capital: </span> ${res[0].capital ? res[0].capital[0] : "-"}</strong>
                  <strong><span>Timezone: </span> ${res[0].timezones}</strong>
              </div>
             </div>
          `;
        } 
      });
    }
});
elModalWrapper.addEventListener('click', function(evt) {
    if (evt.target === elModalWrapper) {
      elModalWrapper.classList.remove("open-modal");
    }
});


let elLogOut = document.querySelector(".logout");

elLogOut.addEventListener("click", function(evt){
    alert("Are you sure to Exit?")
    window.location = "./login.html"
})