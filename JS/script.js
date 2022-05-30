
//Pokemon Deck wrapped in IIFE with 'add' && 'get all' methods---------------------------------------------------------  
let pokemonRepository = (function () {
    let pokemonList = [
        {
            name: 'Bulbasaur',
            types: ['Grass', 'Poison'], 
            height: 0.7
        },
        {
            name: 'Ivysaur', 
            types: ['Grass', 'Poison'], 
            height: 1
        },
        {
            name: 'Venusaur', 
            types: ['Grass', 'Poison'], 
            height: 2
        },
        {
            name: 'Charmander', 
            types: ['Fire'], 
            height: 0.6
        },
        {
            name: 'Jigglypuff', 
            types: ['Fairy', 'Normal'], 
            height: 0.5
        },
    ];
    function addListItem(pokemon){
        let deckContainer = document.querySelector('.pokemon-list');
        let deckCard = document.createElement('li');
        let cardButton = document.createElement('button');
        cardButton.innerText = pokemon.name;
        cardButton.classList.add('card-button');
        cardButton.addEventListener('click', showDetails(pokemon));
        deckCard.appendChild(cardButton);
        deckContainer.appendChild(deckCard);
    }
    function showDetails(pokemon){
        return function(){
            console.log(pokemon);
        }
     }

    function add(pokemon) {
        if(typeof pokemon === 'object' &&
        'name'in pokemon &&
        'types' in pokemon &&
        'height' in pokemon
        ){
            pokemonList.push(pokemon);
        }else{
            console.log("Invalid or Incomplete Data for Pokemon")
        }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    return {
      add: add,
      getAll: getAll,
      addListItem: addListItem
    };
  })();
 


//loop that writes each pokemon to the document, with some additions for "type: Fire"
   
pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
}); 


//bonus task. Search functionality that appends the searched pokemon to a display box
//In the future, I want the search to live-refresh the displayed pokemon on the page.
let filteredResult = {}
let returnString = ' '
let userSearch = document.getElementById('search');
const searchDisplay = document.getElementById('search-display');
const searchForm = document.querySelector('#search-bar')
searchForm.addEventListener('submit', (e) =>{
     e.preventDefault();
     filterList();
     returnResult();
     console.log(returnString)
     userSearch.value ="";
})

function filterList(){
    filteredResult = pokemonRepository.getAll().filter(pokemon => pokemon.name == userSearch.value);
    returnString = JSON.stringify(filteredResult)
   

}

function returnResult(){
let searchedPokemonButton = document.createElement('li');
searchedPokemonButton.classList.add('search-result-items')
searchedPokemonButton.innerText = (returnString)
searchDisplay.appendChild(searchedPokemonButton);
}