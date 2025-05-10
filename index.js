const titulo = document.getElementById('titulo');
const descricao = document.getElementById('descricao');
const lista = document.getElementById('lista');
const overlay = document.getElementById('overlay');
const criarTarefa = document.getElementById('criarTarefa');

function abrirModal() {
    overlay.classList.add('active');
    criarTarefa.classList.add('active');
}
  
function fecharModal() {
    overlay.classList.remove('active');
    criarTarefa.classList.remove('active');
}

function buscarTarefas() {
    fetch('http://localhost:3000/tarefas')
        .then(response => response.json())
        .then(response => {
            inserirTarefas(response);
            });
} buscarTarefas();

function inserirTarefas(listaDeTarefas) {
    if (listaDeTarefas.length > 0) {
        lista.innerHTML = ""
        listaDeTarefas.map(tarefa => {
            lista.innerHTML += `
             <li>
                    <h5>${tarefa.titulo}</h5>
                    <p>${tarefa.descricao}</p>
                    <div class="actions">
                        <box-icon name='trash' size="sm" onclick="deletarTarefa(${tarefa.id})"></box-icon>
                    </div>
                </li>
            `
        });
    }

}

function novaTarefa(event) {
    event.preventDefault();

    let tarefa = {
        titulo: titulo.value,
        descricao: descricao.value,
    };

    fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(tarefa)
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);
        fecharModal();
        buscarTarefas(); 
        alert('Tarefa criada com sucesso!');
        let form = document.querySelector('#criarTarefa form');
        form.reset();
    })
    .catch(error => {
        console.error('Erro ao criar tarefa:', error);
    });
}

function deletarTarefa(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(response => {
        alert('Tarefa deletada.');
        console.log(response);
        buscarTarefas();
    })
    .catch(error => {
        console.error('Erro ao deletar tarefa:', error);
        buscarTarefas();
    });
}

function pesquisarTarefa() {
    let lis = document.querySelectorAll("ul li");
    if (busca.value.length > 0) {
        lis.forEach(li => {
            if (!li.children[0].innerText.includes(busca.value)) {
                li.classList.add('oculto');
            } else {
                li.classList.remove('oculto');
            }
        });
    } else {
        lis.forEach(li => {
            li.classList.remove('oculto');
        });
    }
}
