const categoria_container = document.querySelector("#container-categoria");
const inputCategoria = document.querySelector("#nova-categoria");

let dados = JSON.parse(localStorage.getItem("dados")) || {
    categorias: [],
};

function Dados() {
    localStorage.setItem("dados", JSON.stringify(dados));
}

function ValorTotalCategoria(categoria) {
    let total = 0;

    categoria.itens.forEach((item) => {
        total += Number(item.valor);
    });

    return total;
}
function calcularValorTotal() {
    let total = 0;
    dados.categorias.forEach((categoria) => {
        total += ValorTotalCategoria(categoria);
    });
    return total;
}

function atualizarValor() {
    const elemento = document.querySelector("#Valor_total");
    elemento.textContent = "Valor total: R$ " + calcularValorTotal().toFixed(2);
}

function atualizarOrcamento() {
    const input = document.querySelector("#input-orcamento");
    const orcamento = Number(input.value);
    if (!orcamento || orcamento <= 0) {
        alert("Digite um orçamento válido.");
        return;
    }
    localStorage.setItem("orcamento", orcamento);
    localStorage.setItem("gasto", "0");
    input.value = "";
    PainelOrcamento();
}

function PainelOrcamento() {
    const elementoOrcamento = document.querySelector("#orcamento");
    const elementoGasto = document.querySelector("#gasto");
    const luz = document.querySelector("#luz-orcamento");
    if (!elementoOrcamento || !elementoGasto || !luz) {
        return;
    }
    const orcamento = Number(localStorage.getItem("orcamento")) || 0;
    const gasto = Number(localStorage.getItem("gasto")) || 0;

    elementoOrcamento.textContent = "R$ " + orcamento.toFixed(2);
    elementoGasto.textContent = "R$ " + gasto.toFixed(2);
    let porcentagem = 0;
    // Calcula quanto do orçamento inicial já foi gasto.
    const totalInicial = orcamento + gasto;
    if (totalInicial > 0) {
        porcentagem = (gasto / totalInicial) * 100;
    }
    luz.classList.remove(
        "luz-verde",
        "luz-amarela",
        "luz-vermelha",
        "luz-apagada"
    );

    if (totalInicial === 0) {
        luz.textContent = "💡";
    } else if (orcamento <= 0) {
        luz.textContent = "💡";
        luz.classList.add("luz-apagada");

    } else if (porcentagem >= 80) {
        luz.textContent = "💡";
        luz.classList.add("luz-vermelha");
    } else if (porcentagem >= 50) {
        luz.textContent = "💡";
        luz.classList.add("luz-amarela");
    } else {
        luz.textContent = "💡";
        luz.classList.add("luz-verde");
    }
}

function AdicionarCategoria() {
    const nomeDaCategoria = inputCategoria.value.trim();
    if (!nomeDaCategoria) {
        alert("Digite o nome da categoria.");
        return;
    }
    const categoria = {
        nome: nomeDaCategoria,
        itens: []
    };
    dados.categorias.push(categoria);
    Dados();
    mostrarCategorias();
    inputCategoria.value = "";
}

function mostrarCategorias() {
    categoria_container.innerHTML = "";
    dados.categorias.forEach((categoria) => {
        const totalCategoria = ValorTotalCategoria(categoria);
        const novoItem = `
        <div class="tudo">
            <div class="Menu">
                <div class="info">
                    <div class="nome">
                        <h1 id="nome-grupo">
                            ${categoria.nome}
                        </h1>
                    </div>
                    <div class="div-verde1"></div>
                    <button id="excluir-categoria">excluir</button>
                </div>
                <div class="personalizar">
                    <input class="nome-item" placeholder="Digite o nome do item">

                    <input class="data-item" type="date"/>
                    <input class="valor-item" type="number" step="0.01" placeholder="Digite o Valor do Item">
                    <hr>
                    <textarea class="info-item"placeholder="Informações"></textarea>
                    <button id="adicionar-item">
                        adicionar item
                    </button>
                </div>
                <div class="container-item">
                    ${categoria.itens.map((item) => `
                        <li id="item">

                                <div>
                                    <h3>
                                        ${item.nome}
                                    </h3>
                                </div>
                                <div>
                                    <p>
                                        ${item.data}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        R$ ${Number(item.valor).toFixed(2)}
                                    </p>
                                </div>
                                <div>
                                    <p>
                                        Uso: ${item.informacao}
                                    </p>
                                </div>
                                <div>
                                    <button id="excluir-item">excluir</button>
                                </div>
                            </li>
                            `
                        )
                        .join("")}
                </div>
                <div class="div-item">
                    <h2 id="Valores">
                        Valor total dos itens:
                        R$ ${totalCategoria.toFixed(2)}
                    </h2>
                </div>
            </div>
        </div>
        `;
        categoria_container.insertAdjacentHTML("afterbegin",novoItem);
    });
    atualizarValor();
    PainelOrcamento();
}

categoria_container.addEventListener("click",function (event) {

    if (event.target.id === "excluir-item") {
        const categoriaAtual = event.target.closest(".tudo");
        const nomeCategoria = categoriaAtual.querySelector("h1").textContent.trim();
            const itemAtual =event.target.closest("#item");
            const nomeItem = itemAtual.querySelector("h3").textContent.trim();
            const categoria =dados.categorias.find((categoria) => categoria.nome.trim() === nomeCategoria);
            if (!categoria) {
                return;
            }

            categoria.itens = categoria.itens.filter((item) => item.nome.trim() !== nomeItem);
            Dados();
            mostrarCategorias();
        }

    if (event.target.id === "excluir-categoria") {
            const categoriaAtual = event.target.closest(".tudo");
            const nomeCategoria =categoriaAtual.querySelector("h1").textContent.trim();
            dados.categorias = dados.categorias.filter( (categoria) => categoria.nome.trim() !==nomeCategoria);
            Dados();
            mostrarCategorias();
        }
        if (event.target.id === "adicionar-item") {
            const categoriaAtual =event.target.closest(".tudo");
            const inputNome =categoriaAtual.querySelector(".nome-item");
            const inputData = categoriaAtual.querySelector(".data-item");
            const inputValor = categoriaAtual.querySelector(".valor-item");
            const inputInfo = categoriaAtual.querySelector(".info-item");
            const nomeItem = inputNome.value.trim();
            const dataItem = inputData.value;
            const valorItem = inputValor.value.trim();
            const textoInfo = inputInfo.value.trim();
            if (!nomeItem ||!dataItem ||!valorItem) {
                alert(
                    "Por favor, preencha o nome, a data e o valor do item."
                );
                return;
            }
            const nomeCategoria = categoriaAtual.querySelector("h1").textContent.trim();
            const categoria =dados.categorias.find((cat) =>cat.nome.trim() ===nomeCategoria);
            if (!categoria) {
                return;
            }
const valorNumerico =Number(valorItem);

const orcamentoAtual =Number(localStorage.getItem("orcamento")) || 0;
const gastoAtual =Number(localStorage.getItem("gasto")) || 0;

localStorage.setItem("orcamento",orcamentoAtual - valorNumerico);

localStorage.setItem("gasto",gastoAtual + valorNumerico);

categoria.itens.push({nome: nomeItem,data: dataItem,valor: valorItem,informacao: textoInfo});
            Dados();
            mostrarCategorias();
        }
    }
);


document.querySelector("#adicionar-categoria").addEventListener("click",AdicionarCategoria);

const botaoOrcamento =document.querySelector("#salvar-orcamento");
if (botaoOrcamento) {botaoOrcamento.addEventListener("click",atualizarOrcamento);
}
mostrarCategorias();
PainelOrcamento();
