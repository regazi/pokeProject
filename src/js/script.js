//Pokemon Deck wrapped in IIFE with 'add' && 'get all' methods = = = = = =

let pokemonRepository = (function () {
  const deckContainer = $(".list-group");
  let pokemonList = [];
  let apiUrl = "https://pokeapi.co/api/v2/pokemon/?limit=600";

  function addListItem(pokemon) {
    let li = $(
      '<li class="list-group-item d-inline-block mx-auto" style=" border: none;"></li>'
    );
    let cardButton = $(
      '<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">' +
        pokemon.name +
        "</button>"
    );
    li.append(cardButton);
    deckContainer.append(li);
    cardButton.on("click", function () {
      showModal(pokemon);
    });
  }

  //load pokemon details then create elements containing detail-values and append to corresponding modal child-element
  function showModal(pokemon) {
    loadDetails(pokemon).then(function () {
      let modalBody = $(".modal-body");
      let modalTitle = $(".modal-title");

      modalTitle.empty();
      modalBody.empty();
      let imgFrontPoke = $('<img class="modal-image">');
      imgFrontPoke.attr("src", pokemon.imageUrlFront);
      let imgBackPoke = $('<img class="modal-image">');
      imgBackPoke.attr("src", pokemon.imageUrlBack);
      let namePoke = $("<h1>" + pokemon.name + "</h1>");
      let heightPoke = $("<p> Height: " + pokemon.height + "</p>");
      let typesPoke = $("<p> Types: " + pokemon.types + "</p>");
      let abilityPoke = $("<p> Abilities: " + pokemon.abilities + "</p>");
      modalTitle.append(namePoke);
      modalBody.append(imgFrontPoke);
      modalBody.append(imgBackPoke);
      modalBody.append(heightPoke);
      modalBody.append(typesPoke);
      modalBody.append(abilityPoke);
      console.log(namePoke);
    });
  }

  function add(pokemon) {
    if (typeof pokemon === "object" && "name" in pokemon) {
      pokemonList.push(pokemon);
    } else {
      console.log("Invalid or Incomplete Data for Pokemon");
    }
  }

  function getAll() {
    return pokemonList;
  }

  //= = == = = = = = Loading pokemon API Function = = = = = = = = = =

  let header = document.querySelector("header");
  let alertContainer = document.createElement("div");
  let alertMsg = document.createElement("h2");
  // -------"Loading" and "Loading" Error modals----------------------
  function displayLoadError() {
    alertContainer.classList.add("error-alert");
    alertMsg.innerText = "Error Loading Resources";
    alertContainer.appendChild(alertMsg);
    header.appendChild(alertContainer);
    const errorDisplayTime = setTimeout(hideLoadError, 5000);
    errorDisplayTime();
  }
  function hideLoadError() {
    header.removeChild(alertContainer);
    alertContainer.classList.remove("error-alert");
  }
  //Loading pop-up---------------------------------------------
  function displayLoading() {
    alertContainer.classList.add("loading-alert");
    alertMsg.innerText = "Loading";
    alertContainer.appendChild(alertMsg);
    header.appendChild(alertContainer);
  }
  function hideLoading() {
    header.removeChild(alertContainer);
    alertContainer.classList.remove("error-alert");
  }
  //------fetch data from API and call loading/loading error modals -----
  function loadList() {
    displayLoading();
    return fetch(apiUrl)
      .then(function (response) {
        return response.json();
      })
      .then(function (json) {
        hideLoading();
        json.results.forEach(function (item) {
          let pokemon = {
            name: item.name,
            detailsUrl: item.url,
          };
          add(pokemon);
        });
        //error handling/ load error modal
      })
      .catch(function (e) {
        console.error(e);
        hideLoading();
        displayLoadError();
      });
  }

  // Load additonal information on pokemon
  function loadDetails(item) {
    displayLoading();
    let url = item.detailsUrl;
    return fetch(url)
      .then(function (response) {
        return response.json();
      })
      .then(function (details) {
        hideLoading();
        item.imageUrlFront = details.sprites.front_default;
        item.imageUrlBack = details.sprites.back_default;
        item.height = details.height;
        item.types = [];
        item.abilities = [];
        for (var i = 0; i < details.abilities.length; i++) {
          item.abilities.push(details.abilities[i].ability.name);
        }
        for (var i = 0; i < details.types.length; i++) {
          item.types.push(details.types[i].type.name);
        }
        //error handling
      })
      .catch(function (e) {
        console.error(e);
        displayLoadError();
      });
  }
  //search functionality-------------------------------------------------------------------
  let userSearch = document.getElementById("validationCustom01");
  const searchForm = document.querySelector("#search-bar");
  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    filterList();
    //clear the search-box
    userSearch.value = "";
  });

  //The first even listener just allows the bootsrap clear-search function to trigger filter filterList
  $("input").on("search", filterList);
  userSearch.addEventListener("keyup", filterList);
  function filterList(e) {
    filteredPokemon = pokemonRepository
      .getAll()
      .filter(
        (filteredPokemon) =>
          filteredPokemon.name
            .toLowerCase()
            .indexOf(userSearch.value.toLowerCase()) > -1
      );
    //checks to see if there are results. If none are found, search bar and button outline red
    if (filteredPokemon.length < 1) {
      $("#sub").addClass("btn btn-outline-danger my-2 my-sm-0");
      userSearch.classList.add("is-invalid");
    } else {
      $("#sub").removeClass("btn-outline-danger");
      userSearch.classList.remove("is-invalid");
    }
    updateListbySearch();
    return filteredPokemon;
  }

  //update pokemon list accoring to query
  function updateListbySearch() {
    //clear <ul> diplaying pokemon
    deckContainer.empty();
    filteredPokemon.forEach(function (filteredPokemon) {
      pokemonRepository.addListItem(filteredPokemon);
    });
  }
  // return Values------------------------------------
  return {
    add: add,
    getAll: getAll,
    addListItem: addListItem,
    loadList: loadList,
    loadDetails: loadDetails,
  };
})();

//async load pokemon repositorys from API and create pokemon deck
pokemonRepository.loadList().then(function () {
  pokemonRepository.getAll().forEach(function (pokemon) {
    pokemonRepository.addListItem(pokemon);
  });
});
