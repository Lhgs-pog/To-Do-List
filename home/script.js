document.addEventListener('DOMContentLoaded', function(){

    const areaTarefa = document.getElementById('area-tarefa');
    const areaForm = document.getElementById('area-cadastro');

    function adiconarTarefa(){
        areaTarefa.classList.remove('active');
        areaForm.classList.add('active');
    }

    function visualizarTarefa(){
        areaForm.classList.remove('active');
        areaTarefa.classList.add('active');
    }

    function pesquisar(){
        
    }

    function cadastrarTarfea(){
        const formulario = document.getElementById('formulario');
        let tarefa =  formulario.getAttribute();
    }

    function concluirTarefa(){

    }

    function atualizarTarefa(){

    }

    function excluirTarefa(){

    }
});