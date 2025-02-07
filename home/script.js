document.addEventListener('DOMContentLoaded', function(){

    //Eventos
    function iniciar(){
        document.getElementById('add-btn').addEventListener('click', adicionarTarefa);
        document.getElementById('show-btn').addEventListener('click', visualizarTarefa);
        document.getElementById('form-btn').addEventListener('click', cadastrarTarefa);
        document.getElementById('btn-pesquisar').addEventListener('click', pesquisar);
    }


    //Variaveis globais
    const areaTarefa = document.getElementById('area-tarefa');
    const areaForm = document.getElementById('area-cadastro');

    /*
    * Salva uma nova tarefa
    */
    function adicionarTarefa(){
        //Mostra a área de conteudo correta
        areaTarefa.classList.remove('active');
        areaForm.classList.add('active');
    }

    /*
    * Função para visualizar tarefas
    */
    function visualizarTarefa(){
        areaForm.classList.remove('active');
        areaTarefa.classList.add('active');

        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        if(tarefas == null){
            let p = document.createElement("p");
            p.innerHTML = "<p>Nenhuma tarefa cadastrada</P>";
        }

        areaTarefa.innerHTML = "";

        tarefas.forEach(tarefa => {
            const {titulo, descricao, inicio, termino} = tarefa;

            let li = document.createElement("span");
            li.innerHTML = `
                <div class="cards">
                    <!--Conteudo do card-->
                    <div id="conteudo">
                        <h2><b>${titulo}</b></h2>
                        <span id="descricao">${descricao}</span>

                        <span id="inicio" class="datas">Início: ${inicio}</span>
                        <span id="Termino" class="datas">Termino: ${termino}</span>
                    </div>
                    <!--Botões do card-->
                    <div class="cards-botoes">
                        <button type="button" class="btn-concluir" value="${titulo}">
                            Concluir
                        </button>
                        <button type="button" class="btn-atualizar" value="${titulo}">
                            Atualizar
                        </button>
                        <button type="button" class="btn-excluir" value="${titulo}">
                            Excluir
                        </button>
                    </div>
                </div>
            `;

            areaTarefa.appendChild(li);
        });
    }

    /*
    * Pesquisar por uma tarefa pelo titulo
    */
    function pesquisar(){
        const pesquisa = document.getElementById('pesquisa').value;

        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        tarefas.forEach(tarefa => {
            const {titulo, descricao, inicio, termino} = tarefa;

            if(titulo == pesquisa){
                let pesquisada = tarefa;

                let li = document.createElement('li');

                li.innerHTML = "";

                li.innerHTML = `
                <div class="cards">
                    <!--Conteudo do card-->
                    <div id="conteudo">
                        <h2><b>${titulo}</b></h2>
                        <span id="descricao">${descricao}</span>

                        <span id="inicio" class="datas">Início: ${inicio}</span>
                        <span id="Termino" class="datas">Termino: ${termino}</span>
                    </div>
                    <!--Botões do card-->
                    <div class="cards-botoes">
                        <button type="button" class="btn-concluir" value="${titulo}>
                            Concluir
                        </button>
                        <button type="button" class="btn-atualizar" value="${titulo}>
                            Atualizar
                        </button>
                        <button type="button" class="btn-excluir" value="${titulo}">
                            Excluir
                        </button>
                    </div>
                </div>
            `;

            areaTarefa.appendChild(li);
            }
        })

    }

    function cadastrarTarefa(){
        //Recupera os valores no form
        const titulo = document.getElementById('form-titulo').value;
        const descricao = document.getElementById('form-descricao').value;
        const inicio = document.getElementById('data-inicio').value;
        const termino = document.getElementById('data-termino').value;

        //Cria um novo objeto tarefa
        const novaTarefa = {
            titulo, descricao, inicio, termino
        }

        //Pega tpdas as tarefas salvas no localstorage
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        //Insere a nova tarefa na lista
        tarefas.push(novaTarefa);

        //Salva nova lista
        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        visualizarTarefa();
    }


    function concluirTarefa(titulo){
        excluirTarefa(titulo);
    }

    function atualizarTarefa(tituloExistente){
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        tarefas.forEach(tarefa => {
            const {titulo, descricao, inicio, termino} = tarefa;

            if(titulo == tituloExistente){
        
                const titulo1 = document.getElementById('form-titulo');
                const descricao1 = document.getElementById('form-descricao');
                const inicio1 = document.getElementById('data-inicio');
                const termino1 = document.getElementById('data-termino');

                titulo1.value = titulo;
                descricao1.value = descricao;
                inicio1.value = inicio;
                termino1.value = termino;

                excluirTarefa(titulo);
                adicionarTarefa();
            }
        })
    }

    function excluirTarefa(titulo){
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        tarefas = tarefas.filter(tarefa => tarefa.titulo.trim() != titulo.trim());

        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        console.log(`Tarefa excluida: ${titulo}`);
        visualizarTarefa()
    }

    iniciar();
    visualizarTarefa();

    /*document.querySelectorAll(".btn-concluir").forEach(function(botao) {
        botao.addEventListener("click", function() {
            concluirTarefa(this.value);
        });
    });

    document.querySelectorAll(".btn-atualizar").forEach(function(botao) {
        botao.addEventListener("click", function() {
            atualizarTarefa(this.value);
        });
    });

    document.querySelectorAll(".nome-da-classe").forEach(function(botao) {
        botao.addEventListener("click", function() {
            excluirTarefa(this.value);
        });
    });*/
    areaTarefa.addEventListener('click', function(event) {
        const element = event.target;
        
        if (element.classList.contains('btn-concluir')) {
            concluirTarefa(element.value);
        } else if (element.classList.contains('btn-atualizar')) {
            atualizarTarefa(element.value);
        } else if (element.classList.contains('btn-excluir')) {
            excluirTarefa(element.value);
        }
    });
});