document.addEventListener('DOMContentLoaded', () => {
    const selecaoRaca = document.getElementById('selecao-raca');
    const galeria = document.getElementById('galeria');

    // Função para buscar e exibir a lista de raças
    function buscarRacas() {
        fetch('https://dog.ceo/api/breeds/list/all')
            .then(response => response.json())
            .then(data => {
                const racas = data.message;
                for (const raca in racas) {
                    const option = document.createElement('option');
                    option.value = raca;
                    option.textContent = raca;
                    selecaoRaca.appendChild(option);
                }
            })
            .catch(error => {
                console.error('Erro ao buscar raças:', error);
                alert('Falha ao carregar a lista de raças. Por favor, tente novamente.');
            });
    }

    // Função para buscar e exibir imagens de uma raça
    function buscarImagens(raca) {
        fetch(`https://dog.ceo/api/breed/${raca}/images/random/10`)
            .then(response => response.json())
            .then(data => {
                galeria.innerHTML = ''; // Limpa a galeria
                data.message.forEach(imgUrl => {
                    const img = document.createElement('img');
                    img.src = imgUrl;
                    galeria.appendChild(img);
                });
            })
            .catch(error => {
                console.error('Erro ao buscar imagens:', error);
                alert('Falha ao carregar imagens. Por favor, tente novamente.');
            });
    }

    // Evento para buscar imagens ao selecionar uma raça
    selecaoRaca.addEventListener('change', (event) => {
        const racaSelecionada = event.target.value;
        if (racaSelecionada) {
            buscarImagens(racaSelecionada);
        }
    });

    // Inicializa a lista de raças
    buscarRacas();
});
