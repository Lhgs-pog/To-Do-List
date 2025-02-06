document.addEventListener('DOMContentLoaded', function(){

    //Eventos
    document.getElementById('add-btn').addEventListener('click', adicionarTarefa);
    document.getElementById('show-btn').addEventListener('click', visualizarTarefa);
    document.getElementById('form-btn').addEventListener('click', cadastrarTarefa);
    document.getElementById('btn-concluir').addEventListener('click', concluirTarefa);
    document.getElementById('btn-atualizar').addEventListener('click', atualizarTarefa);
    document.getElementById('btn-excluir').addEventListener('click', excluirTarefa);
    document.getElementById('btn-pesquisar').addEventListener('click', pesquisar);


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
        areaTarefa.innerHTML = "";

        tarefas.forEach(tarefa => {
            const {titulo, descricao, inicio, termino} = tarefa;

            let li = document.createElement("li");
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
                        <button type="button" id="btn-concluir">
                            Concluir
                        </button>
                        <button type="button" id="btn-atualizar">
                            Atualizar
                        </button>
                        <button type="button" id="btn-excluir">
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

                
            }
        })

    }

    function cadastrarTarefa(){
        //Recupera os valores no form
        const titulo = document.getElementById('form-titulo').value;
        const descricao = document.getElementById('form-descricao').value;
        const inicio = document.getElementById('form-inicio').value;
        const termino = document.getElementById('form-termino').value;

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
    }


    function concluirTarefa(){
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];




    }

    function atualizarTarefa(){
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

    }

    function excluirTarefa(){
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        tarefas = tarefas.filter(tarefa => tarefa.nome != nome);

        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
});