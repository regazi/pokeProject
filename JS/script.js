//Pokemon Deck wrapped in IIFE with 'add' && 'get all' methods = = = = = = 
const deckContainer = document.querySelector('.pokemon-list');
let pokemonRepository = (function () {
    let pokemonList = [];
    let apiUrl = 'https://pokeapi.co/api/v2/pokemon/?limit=150';

    function addListItem(pokemon){
        let deckCard = document.createElement('li');
        let cardButton = document.createElement('button');
        cardButton.innerText = pokemon.name;
        cardButton.classList.add('card-button');
        cardButton.addEventListener('click', showDetails(pokemon));
        deckCard.appendChild(cardButton);
        deckContainer.appendChild(deckCard);
    }

    //initilize elements for "show details" function --------------------------------
    let glass = document.createElement('div');
    let exitGlass = document.createElement('button');
    let imgPoke = document.createElement('img');
    let list = document.createElement('ul');
    list.classList.add('glass-list');
    let heightPoke = document.createElement('li');
    let namePoke = document.createElement('li');
    // currently displaying the pokemon types in stringified JSON. It looks bad. Change ASAP
    let typesPoke = document.createElement('div');
    typesPoke.classList.add('types-list')

   // let typesPoke = document.createElement('li');
    function showDetails(pokemon) {
        return function(){loadDetails(pokemon).then(function () {
            imgPoke.setAttribute('src', pokemon.imageUrl);
            heightPoke.innerText = pokemon.height;
            namePoke.innerText = pokemon.name
            glass.appendChild(imgPoke);
            list.appendChild(namePoke);
            list.appendChild(heightPoke);
            glass.appendChild(exitGlass);
            //Im sure theres a better way to do this-----------------------------------
            typesPoke.innerText = JSON.stringify(pokemon.types)
            list.appendChild(typesPoke);
            glass.appendChild(list);
            document.body.appendChild(glass);
            glass.classList.add('glass');
            exitGlass.classList.add('exitGlass');
            exitGlass.addEventListener('click', () =>{
                document.body.removeChild(glass);;
                typesPoke.innerText = "";
            })
            document.addEventListener('keydown', escapeGlass)
            function escapeGlass(e){
                if (e.key === 'Escape'){
                    document.body.removeChild(glass); 
                    document.removeEventListener('keydown', escapeGlass)
                    document.removeEventListener('click', clickOffGlass)
                }};


            let glassPosition = glass.getBoundingClientRect()
            document.addEventListener('click', clickOffGlass) 
            function clickOffGlass(e){
                if  (e.pageX < glassPosition.left || e.pageX > glassPosition.right|| e.pageY < glassPosition.top || e.pageY > glassPosition.bottom){
                    document.body.removeChild(glass); 
                    document.removeEventListener('keydown', escapeGlass)
                    document.removeEventListener('click', clickOffGlass)
                }
            }
         
        })
    }

}

    function add(pokemon) {
        if(typeof pokemon === "object" &&
        "name"in pokemon 
        ){
            pokemonList.push(pokemon);
        }else{
            console.log("Invalid or Incomplete Data for Pokemon")
        }
    }
  
    function getAll() {
      return pokemonList;
    }
    //Loading pokemon API = = = = = = = = = = = = = = = = 
    //Loading and loading-error custom pop-ups - - - - - 
    
    let header = document.querySelector('header')
    let alertContainer = document.createElement('div');
    let alertMsg = document.createElement('h2')
   
    function displayLoadError(){
        alertContainer.classList.add('error-alert')
        alertMsg.innerText = "Error Loading Resources";
        alertContainer.appendChild(alertMsg)
        header.appendChild(alertContainer)
        const errorDisplayTime = setTimeout(hideLoadError, 5000);
        errorDisplayTime()
      
    }       
    
    function hideLoadError(){
        header.removeChild(alertContainer);
            alertContainer.classList.remove('error-alert');
    };

    function displayLoading(){
        alertContainer.classList.add('loading-alert')
        alertMsg.innerText = "Loading";
        alertContainer.appendChild(alertMsg)
        header.appendChild(alertContainer)
    }    
    function hideLoading(){
        header.removeChild(alertContainer)
        alertContainer.classList.remove('error-alert')
    }
    //fetch data from API --------------------------------
    function loadList() {
        displayLoading();
        return fetch(apiUrl).then(function (response) {
          return response.json();
        }).then(function (json) {
            hideLoading();
          json.results.forEach(function (item) {
            let pokemon = {
              name: item.name,
              detailsUrl: item.url
            };
            add(pokemon);
          });
        }).catch(function (e) {
          console.error(e);
          hideLoading()
          displayLoadError()
        })
    }


    function loadDetails(item) {
        displayLoading();
        let url = item.detailsUrl;
        return fetch(url).then(function (response) {
            return response.json();
        }).then(function (details) {
            hideLoading();
            item.imageUrl = details.sprites.front_default;
            item.height = details.height;
            item.types = details.types;
        }).catch(function (e) {
            console.error(e);
            displayLoadError()
        });

    };
    // return Values------------------------------------
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem,
      loadList: loadList,
      loadDetails: loadDetails,
    };
  })();



//async load pokemon repositorys from API and create pokemon
pokemonRepository.loadList().then(function() {
    pokemonRepository.getAll().forEach(function(pokemon){
    pokemonRepository.addListItem(pokemon);
    });
});


 
//search functionality

let userSearch = document.getElementById('search');
const searchForm = document.querySelector('#search-bar')
searchForm.addEventListener('submit', (e) =>{
     e.preventDefault();
     filterList();
     userSearch.value ="";
})

//event listener that returns pokemon containing search value on each key-up
userSearch.addEventListener('keyup', filterList)
function filterList(e){
filteredPokemon = pokemonRepository.getAll().filter(filteredPokemon => filteredPokemon.name.toLowerCase().indexOf(userSearch.value.toLowerCase()) > -1)//(userSearch.value.toLowerCase()) === 0)
  updateListbySearch()
  return filteredPokemon
}

//update pokemon list
function updateListbySearch(){  
    //clear <ul> diplaying pokemon
    deckContainer.innerHTML = '';  
    filteredPokemon.forEach(function(filteredPokemon){
        pokemonRepository.addListItem(filteredPokemon);
        console.log(filteredPokemon)
    });

} 
