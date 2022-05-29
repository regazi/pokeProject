
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
  
    function add(pokemon) {
        if(typeof pokemon === 'object'){
            pokemonList.push(pokemon);
        }else{
            return;
        }
    }
  
    function getAll() {
      return pokemonList;
    }
  
    return {
      add: add,
      getAll: getAll
    };
  })();
 
//loop that writes each pokemon to the document, with some additions for "type: Fire"
    function buildCard(pokemon){
        if(pokemon.types == 'Fire'){
            document.write(`<p id="fire">${pokemon.name} (${pokemon.height}m) </p> <br>`) 
        }else if(pokemon.height > 1){
            document.write(`<p>${pokemon.name} (${pokemon.height}m) Wow, thats big!</p> <br> `)
        }else{
            document.write(`<p>${pokemon.name} (${pokemon.height}m) </p> <br> `)
        }
    }
    pokemonRepository.getAll().forEach(buildCard); 
//bonus task. Search functionality that returns pokemon info to the console.  
   let searchResult = []
   let userSearch = document.getElementById('search')
   let submit = document.getElementById('sub')
   submit.addEventListener('click', (e) =>{
        e.preventDefault();
        filterList();
        console.log(searchResult)
        userSearch.value = " "
   })
   
   function filterList(){
    let searchParam =  userSearch.value;
    filteredResult = pokemonRepository.getAll().filter(pokemon => pokemon.name == searchParam);
    searchResult.push(filteredResult);
}
   

   