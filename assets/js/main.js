
const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const pokemonDetail = document.getElementById('pokemonDetail')


const maxRecords = 151
const limit = 12
let offset = 0;

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}"
                     alt="${pokemon.name}">
            </div>
            <button class="pokemon ${pokemon.type} button-detail" data-modal ="${pokemon.name}" title="Click to see more details" onclick="openModal(this)">
                <span class="text-detail">Show more detail</span>
            </button>
        </li>
        <div id="modal_${pokemon.name}" class="modal">
            <li class="detail-pokemon">
            <span class="fechar" data-modal ="${pokemon.name}" onclick="closedModal(this)" >&times;</span>
                <div class="">
                    <h4 style="color:rgba(0, 0, 0, 0.7);">Abilites</h4>
                    <ol ol-detail>
                        ${pokemon.abilities.map((ability) => `<li class=" ${ability}">${ability}</li>`).join('')}
                    </ol>
                </div>
                <div class="">
                    <h4 style="color:rgba(0, 0, 0, 0.7);">Attributes</h4>
                    <ol class="">
                        ${pokemon.stats.map((stat) => `<li class=" ${stat}">${stat}</li>`).join('')}
                    </ol>
                </div>
            </li>    
        </div>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})

loadPokemonItens(offset, limit)

/**
 * @OPEN MODAL
 */
openModal=(self)=>{

    const element =  self.getAttribute("data-modal")   
    document.getElementById("modal_"+element).style.display = "block"

}
/**
 * @CLOSED MODAL
 */
closedModal=(self)=>{

    const element =  self.getAttribute("data-modal")   
    document.getElementById("modal_"+element).style.display = "none"

}
