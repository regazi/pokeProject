//Pokemon Deck ---------------------------------------------------------
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
//loop that writes each pokemon to the document, with some additions for "type: Fire"
for (let i= 0; i < pokemonList.length; i++){
    if(pokemonList[i].types == 'Fire'){
        document.write(pokemonList[i].name + " (" + pokemonList[i].height + "m" + ") *fire emoji<br> ") 
    }else{
        document.write(pokemonList[i].name + " (" + pokemonList[i].height + "m" + ") <br> ")
    }
}


