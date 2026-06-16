const container = document.querySelector("#container-categoria");
const inputCategoria = document.querySelector("#nova-cate");

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
        <input placeholder="Nome do Item" />
        <input placeholder="Valor" />
        <input placeholder="Data" />
        <button id="excluir-item">excluir</button>
      </div>
      <div class="div-item">
        <input id="adicao-item" type="button" value="adicionar um Item" />
        <h2 id="Valores">Valor total dos itens:</h2>
      </div>
    </div>
    </div>
    `;    
    container.insertAdjacentHTML("beforeend", novoItem);
    inputCategoria.value = "";
}

document.querySelector("#adicionar-categoria").addEventListener("click", fu);

const botaoExcluir = document.querySelector("#excluir-categoria");

container.addEventListener("click", function(event) {
    if (event.target.id === "excluir-categoria") {
        const divParaDestruir = event.target.closest(".tudo");
        if (divParaDestruir) {
            divParaDestruir.remove();
        }
    }
});
