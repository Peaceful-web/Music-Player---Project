let musicas = [
    {titulo:'Guitar solo', artista:'Artista desconhecido', src:'musicas/We Ride! - Reed Mathis.mp3', img:'imagens/rock.jpg'},
    {titulo:'Samba raíz', artista:'Artista desconhecido', src:'musicas/Ella Vater - The Mini Vandals.mp3', img:'imagens/samba.jpg'},
    {titulo:'Piano solo', artista:'Artista desconhecido', src:'musicas/A Brand New Start - TrackTribe (1).mp3',img:'imagens/piano.jpg'}
]
let indexMusica = 0

let musica = document.querySelector('audio')
let barra = document.querySelector('progress')
let tempoDecorrido = document.querySelector('.inicio')
let duracao = document.querySelector('.fim')

let imagem = document.querySelector('img')
let nomeMusica = document.querySelector('.descricao h2')
let nomeArtista = document.querySelector('.descricao i')

renderizarMusica(indexMusica)


//adicionando um evento de click ao botaoPlay
document.querySelector('.botao-play').addEventListener('click', tocarMusica);//obs: não colocar parenteses na função
 
document.querySelector('.botao-pause').addEventListener('click', pausarMusica)

musica.addEventListener('timeupdate', atualizarBarra)

document.querySelector('.anterior').addEventListener('click', () => {
    indexMusica--
    if (indexMusica < 0) {
        indexMusica = 2
    }
    renderizarMusica(indexMusica)
})

document.querySelector('.proximo').addEventListener('click', () => {
    indexMusica++
    if (indexMusica > 2) {
        indexMusica = 0
    }
    renderizarMusica(indexMusica)
})

function renderizarMusica(index) {
    musica.setAttribute('src', musicas[index].src) //adiciona um atributo src,
    musica.addEventListener('loadeddata', () => { //loadeddata é quando a música termina de carregar
        nomeMusica.textContent = musicas[index].titulo
        nomeArtista.textContent = musicas[index].artista
        imagem.src = musicas[index].img
        duracao.textContent = segundosParaMinutos(Math.floor(musica.duration))
    }) 
}

//criando a função para tocar a música
function tocarMusica() {
    musica.play();
    document.querySelector('.botao-pause').style.display = 'block' //acessa o display do botao-pause e o torna block, pois estava como none
    document.querySelector('.botao-play').style.display = 'none'
}

function pausarMusica() {
    musica.pause()// .pause() faz a música pausar
    document.querySelector('.botao-pause').style.display = 'none'
    document.querySelector('.botao-play').style.display = 'block'
}

function atualizarBarra() {
    barra.style.width = Math.floor((musica.currentTime / musica.duration) * 100) + '%'
    tempoDecorrido.textContent = segundosParaMinutos(Math.floor(musica.currentTime))
    //tempoDecorrido.textContent = Math.floor(musica.currentTime)//textContent é o coneteúdo do texto
}

    function segundosParaMinutos(segundos) {
        let campoMinutos = Math.floor(segundos / 60)
        let campoSegundos = segundos % 60
        if (campoSegundos < 10) {
            campoSegundos = '0' + campoSegundos
        }

        return campoMinutos+ ':' +campoSegundos
    }