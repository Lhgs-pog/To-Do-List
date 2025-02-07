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
        //Esconde o formulario e mostra a area de tarefas
        areaForm.classList.remove('active');
        areaTarefa.classList.add('active');

        //Recupera a listas de tarefas
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        //Mostra um mensagem ao usuario caso não tenha tarefas cadastradas
        if(tarefas == null){
            let p = document.createElement("p");
            p.innerHTML = "<p>Nenhuma tarefa cadastrada</P>";
            areaTarefa.appendChild(p);
        }

        //Limpa a area de tarefas antes de inseri-ls
        areaTarefa.innerHTML = "";

        tarefas.forEach(tarefa => {
            //Desconstroi o objeto tarefa em varias variaveis
            const {titulo, descricao, inicio, termino} = tarefa;

            //Cria e configura a estrutura html de um novo elemento span
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

            //Insere o span dentro da área de tarefas
            areaTarefa.appendChild(li);
        });
    }

    /*
    * Pesquisar por uma tarefa pelo titulo
    */
    function pesquisar(){
        // Recupera o valor pesquisado e converte para minúsculas para comparação case-insensitive
        const pesquisa = document.getElementById('campo-pesquisa').value.trim().toLowerCase();


        //Tratamento de erros e depuração
        if(!pesquisa){
            console.error("Campo de pesquisa vazio");
            alert("O campo de pesquisa não pode estar vazio");
            return;
        }
        console.log(`A pesquisa inserida é: ${pesquisa}`);
        
        // Recupera as tarefas do localStorage (ou um array vazio se não houver)
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
        
        // Limpa a área de tarefas para exibir somente os resultados da pesquisa
        areaTarefa.innerHTML = "";
        
        // Percorre todas as tarefas e exibe aquelas cujo título confere com o termo pesquisado
        tarefas.forEach(tarefa => {
            const {titulo, descricao, inicio, termino} = tarefa;
            
            console.log(`o titulo é ${titulo}`);
            // Compara de forma case-insensitive
            if(titulo.trim().toLowerCase() == pesquisa){
                // Cria um elemento para a tarefa encontrada
                let li = document.createElement('span');
                
                // Define a estrutura do span no html
                li.innerHTML = `
                    <div class="cards">
                        <!-- Conteúdo do card -->
                        <div class="conteudo">
                            <h2><b>${titulo}</b></h2>
                            <span class="descricao">${descricao}</span>
                            <span class="datas">Início: ${inicio}</span>
                            <span class="datas">Término: ${termino}</span>
                        </div>
                        <!-- Botões do card -->
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
                
                // Adiciona o item na área de exibição das tarefas
                areaTarefa.appendChild(li);
            }
        });
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

        //Atualiza a área de tarefas
        visualizarTarefa();
    }


    /*
    * Função para concluir uma tarefa e remove-la da lista
    */
    function concluirTarefa(titulo){
        //Aproveita a classe de exclussão
        excluirTarefa(titulo);
    }

    /*
    * Função para alterar uma tarefa já existente
    */
    function atualizarTarefa(tituloExistente){
        //Puxa as tarefas salvas
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        //Loop para passar em cada uma das tarefas dentro de tarefas
        tarefas.forEach(tarefa => {
            //Separa a tarefa em varias variaveis
            const {titulo, descricao, inicio, termino} = tarefa;

            //Verifica se a tarefa atual é a mesma que tem que ser atualizada
            if(titulo == tituloExistente){
        
                //Salva os elementos do formulario html
                const titulo1 = document.getElementById('form-titulo');
                const descricao1 = document.getElementById('form-descricao');
                const inicio1 = document.getElementById('data-inicio');
                const termino1 = document.getElementById('data-termino');
                
                
                //Colocar os valores da tarefa no formulario
                titulo1.value = titulo;
                descricao1.value = descricao;
                inicio1.value = inicio;
                termino1.value = termino;

                //Exclue a tarefa
                excluirTarefa(titulo);
                //Abre o formulário
                adicionarTarefa();
            }
        })
    }

    /*
    * Função para excluir uma tarefa
    */
    function excluirTarefa(titulo){
        //Puxa a lista de tarefas
        let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

        //Filtra a tarefa que posui o mesmo titulo da excluida
        tarefas = tarefas.filter(tarefa => tarefa.titulo.trim() != titulo.trim());

        //Salva a nova lista sem a tarefa
        localStorage.setItem("tarefas", JSON.stringify(tarefas));

        //Console para testes
        console.log(`Tarefa excluida: ${titulo}`);
        //Atualiza a area de tarefas
        visualizarTarefa()
    }

    //Inicializa os eventos
    iniciar();
    //Ao iniciar a página já mostra todas as tarefas
    visualizarTarefa();

    /*
    * Gerencia os eventos dos botões das tarefas.
    * Ele está depois do visualizar tarefa para que quanto ele seja carregado esses elementos já existam no html
    */
    areaTarefa.addEventListener('click', function(event) {
        //Captura qual elemento foi clicado
        const element = event.target;
        
        //Chamada de metedo de acordo com o evento
        if (element.classList.contains('btn-concluir')) {
            concluirTarefa(element.value);
        } else if (element.classList.contains('btn-atualizar')) {
            atualizarTarefa(element.value);
        } else if (element.classList.contains('btn-excluir')) {
            excluirTarefa(element.value);
        }
    });
});