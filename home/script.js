document.addEventListener('DOMContentLoaded', function(){

    //Variaveis globais
    const areaTarefa = document.getElementById('area-tarefa');
    const areaForm = document.getElementById('area-cadastro');
    const formTitulo = document.getElementById('form-titulo');
    const formDescricao = document.getElementById('form-descricao');
    const formInicio = document.getElementById('data-inicio');
    const formTermino = document.getElementById('data-termino');

    /*
    * Inicalizador de eventos
    */
    function iniciarEventos(){
        document.getElementById('add-btn').addEventListener('click', adicionarTarefa);
        document.getElementById('show-btn').addEventListener('click', visualizarTarefa);
        document.getElementById('form-btn').addEventListener('click', cadastrarTarefa);
        document.getElementById('btn-pesquisar').addEventListener('click', pesquisar);
        //Gerencia o grupo os botões das tarefas
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
    }

    /*
    * Pega as tarefas salvas no local storage
    */
    function getTarefas(){
        // Retorna um array; se não houver nada, retorna um array vazio
        const data = localStorage.getItem('tarefas');
        return data ? JSON.parse(data) : [];
    }

    /*
    * Salva a nova lista de funções no local storage
    */
    function setTarefas(tarefas){
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }

    /*
    * Gerá o card das tarefas
    */
    function gerarCard(tarefa){
        //Desconstroi o objeto tarefa em varias variaveis
        const {titulo, descricao, inicio, termino} = tarefa;

        //Retorna o card já configurado
        return `
                <div class="cards">
                    <!--Conteudo do card-->
                    <div class="conteudo">
                        <h2><b>${titulo}</b></h2>
                        <span class="descricao">${descricao}</span>

                        <span class="inicio" class="datas">Início: ${inicio}</span>
                        <span class="Termino" class="datas">Término: ${termino}</span>
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
    }

    /*
    * Renderiza as tarefas na área de tarefas
    */
    function renderizarTarefas(tarefas){
        //Verifica se o array é nulo e exibe uma mensagem
        if(tarefas.length === 0){
            areaTarefa.innerHTML = "";
            const p = document.createElement('p');
            p.innerHTML = "Nenhuma tarefa encontrada.";
            areaTarefa.appendChild(p);
            return
        }

        //Limpa o campo de tarefas
        areaTarefa.innerHTML = "";

        //PEcorre o array para imprimir cada uma das tarefas
        tarefas.forEach(tarefa => {

            const span = document.createElement("span");
            span.innerHTML = gerarCard(tarefa);

            areaTarefa.appendChild(span);
        });
    }

    /*
    * Abre a área do formulário para o cadastro de tarefas
    */
    function adicionarTarefa(){
        //Esconde a área de tarefas e mostra o formulário
        areaTarefa.classList.remove('active');
        areaForm.classList.add('active');
    }

    /*
    * Mostra área de tarefas e imprime todas as tarefas salvas no local storage no html
    */
    function visualizarTarefa(){
        //Esconde o formulario e mostra a area de tarefas
        areaForm.classList.remove('active');
        areaTarefa.classList.add('active');

        //Recupera a listas de tarefas
        const tarefas = getTarefas();

        //Renderiza as tarefas na area de tarefas
        renderizarTarefas(tarefas);
    }

    /*
    * Pesquisar por uma tarefa pelo titulo
    */
    function pesquisar(){
        // Recupera o valor pesquisado e converte para minúsculas para comparação case-insensitive
        const pesquisa = document.getElementById('campo-pesquisa').value.trim().toLowerCase();


        //Avisa o usuário em caso do campo esteja vazio para evitar erros
        if(!pesquisa){
            console.error("Campo de pesquisa vazio");
            alert("O campo de pesquisa não pode estar vazio");
            return;
        }
        
        //Recupera a lista de tarefas
        const tarefasFiltradas = getTarefas().filter(t =>
             t.titulo.trim().toLowerCase() === pesquisa);

       //Renderiza as tarefas na area de tarefas
       renderizarTarefas(tarefasFiltradas);
    }
    
    
    /*
    * Recupera as informações no formulário e salva a nova lista de tarefas no local stoarage
    */
    function cadastrarTarefa(){

        //Validação dos campos
        if(formTitulo.value.trim() === null || formDescricao.value.trim() === null || 
            formInicio.value.trim() === null || formTermino.value.trim() === null){
            alert("Preencha todos os campos!");
            return ;
        }

        //Cria um novo objeto tarefa
        const novaTarefa = {
            titulo: formTitulo.value.trim(),
            descricao: formDescricao.value.trim(),
            inicio: formInicio.value.trim(),
            termino: formTermino.value.trim()
          };

        //Pega tpdas as tarefas salvas no localstorage
        let tarefas = getTarefas();

        //Insere a nova tarefa na lista
        tarefas.push(novaTarefa);

        //Salva nova lista
        setTarefas(tarefas);

        //Atualiza a área de tarefas
        visualizarTarefa();
    }


    /*
    * Remove a tarefa da lista no local storage
    */
    function concluirTarefa(titulo){
        //Aproveita a classe de exclussão
        excluirTarefa(titulo);
    }

    /*
    * Pega os dados da tarfea selecionada e insere eles no formulário ao mesmo tempo que paga o registro
    */
    function atualizarTarefa(tituloExistente){

        //Recupera as tarefas e procupara a tarefa de acordo com titulo informado
        const tarefa = getTarefas().find(t => t.titulo === tituloExistente);

        //Verifica se a tarefa atual é a mesma que tem que ser atualizada
        if(tarefa){
            //Separa a tarefa em varias variaveis
            const {titulo, descricao, inicio, termino} = tarefa;           
            
            //Colocar os valores da tarefa no formulario
            formTitulo.value = titulo;
            formDescricao.value = descricao;
            formInicio.value = inicio;
            formTermino.value = termino;

            //Exclue a tarefa
            excluirTarefa(titulo);
            //Abre o formulário
            adicionarTarefa();
        }
    }

    /*
    * Exclui a tarefa selecionada da lista do locla storage
    */
    function excluirTarefa(titulo){
        //Puxa a lista de tarefas
        let tarefas = getTarefas();

        //Filtra a tarefa que posui o mesmo titulo da excluida
        tarefas = tarefas.filter(tarefa => tarefa.titulo.trim() != titulo.trim());

        //Salva a nova lista sem a tarefa
        setTarefas(tarefas);

        //Atualiza a area de tarefas
        visualizarTarefa()
    }

    //Inicializa os eventos
    iniciarEventos();
    //Ao iniciar a página já mostra todas as tarefas
    visualizarTarefa();
});