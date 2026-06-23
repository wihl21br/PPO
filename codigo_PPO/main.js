const container = document.querySelector("#container-categoria");
const inputCategoria = document.querySelector("#nova-cate");
const dataItem = document.querySelector("#data-item")

function fu() {
    const nomeDaCategoria = inputCategoria.value;
    const novoItem = `
    <div class="tudo">
        <div class="Menu">
        <div class="info">
        <div class="nome">
        <h1>${nomeDaCategoria}</h1>
        </div>
        <div class="div-verde1"></div>
        <button id="excluir-categoria">excluir</button>
      </div>
      <div class="personalizar">
      <input id="nome-item" placeholder="Digite o nome do novo item">   
      <input id="data-item" placeholder="Digite o Nome do Item" type="date"/>
      <input id="valor-item" placeholder="Digite o Valor do Item">
      </div>
      <div id="container-item"></div>
      <div class="div-item">
        <button id="adicionar-item">adicionar item</button>
        <h2 id="Valores">Valor total dos itens:</h2>
      </div>
    </div>
    </div>
    `;    
    container.insertAdjacentHTML("afterbegin", novoItem);
    inputCategoria.value = "";
}


container.addEventListener("click", function(event) {

  if (event.target.id === "excluir-categoria") {
    event.target.closest(".tudo").remove();
  }

  if (event.target.id === "adicionar-item") {
    const categoriaAtual = event.target.closest(".tudo");
    const NomeItem = categoriaAtual.querySelector("#nome-item");
    const dataItem = categoriaAtual.querySelector("#data-item")
    const ValorItem = categoriaAtual.querySelector("#valor-item")
    const containerItem = categoriaAtual.querySelector("#container-item");
    const nomeItemValor = NomeItem.value.trim();
    const dataItemValor = dataItem.value;
    const mostrarData = dataItemValor.value;
    const nomeItem = NomeItem.value

    if (nomeItemValor && dataItemValor){
    const novoi = `
      <div id="item">
        <h3>${nomeItem}</h3>
        <p>${mostrarData}</p>
        <button id="excluir-item" style="background-color: blue;color: white;border: none;">excluir</button>
      </div>
    `;
    
    containerItem.insertAdjacentHTML("afterbegin", novoi);
    NomeItem.value = "";
    }else{
       alert("Por favor, preencha o nome e a data do item.");
    }
    
  }
});
document.querySelector("#adicionar-categoria").addEventListener("click", fu);
