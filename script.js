let isMoving = true; // Indica se o carrossel está se movendo
let interval; // Para armazenar o intervalo de movimentação
const carousel = document.getElementById('testimonialCarousel');
const wrapper = carousel.querySelector('.carousel-wrapper');
const items = wrapper.children; // Armazena os itens do carrossel
let currentIndex = 0; // Índice do item atual

// Função para mover o carrossel automaticamente
function moveCarousel() {
    if (!isMoving) return; // Se não estiver movendo, não faz nada
    currentIndex = (currentIndex + 1) % items.length; // Incrementa o índice e faz loop
    updateCarouselPosition();
}

// Atualiza a posição do carrossel
function updateCarouselPosition() {
    const offset = -currentIndex * 100; // Calcula o deslocamento baseado no índice atual
    wrapper.style.transform = `translateX(${offset}%)`; // Aplica a movimentação
}

// Inicia a movimentação automática
interval = setInterval(moveCarousel, 3000); // Muda a cada 3 segundos

// Para a movimentação ao clicar em qualquer item
Array.from(items).forEach(item => {
    item.addEventListener('click', () => {
        isMoving = !isMoving; // Alterna o estado de movimentação
        if (isMoving) {
            interval = setInterval(moveCarousel, 3000); // Reinicia a movimentação
        } else {
            clearInterval(interval); // Para a movimentação
        }
    });
});

// Variáveis para arrastar o carrossel
let isDragging = false;
let startX; // Posição inicial do clique
let scrollDirection = 1; // 1 para direita, -1 para esquerda

// Funções para arrastar o carrossel
wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX; // Posição do clique
    clearInterval(interval); // Para a movimentação ao arrastar
});

wrapper.addEventListener('mouseleave', () => {
    isDragging = false;
});

wrapper.addEventListener('mouseup', () => {
    isDragging = false;
});

wrapper.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    const x = e.pageX; // Nova posição
    const walk = (x - startX); // Distância movida
    if (walk > 30) { // Se arrastou para a direita
        scrollDirection = 1; // Mover para a direita
        moveToNextItem();
    } else if (walk < -30) { // Se arrastou para a esquerda
        scrollDirection = -1; // Mover para a esquerda
        moveToNextItem();
    }
});

// Função para mover para o próximo item
function moveToNextItem() {
    currentIndex = (currentIndex + scrollDirection + items.length) % items.length; // Atualiza o índice
    updateCarouselPosition();
}

// Reinicia a movimentação após arrastar
wrapper.addEventListener('mouseup', () => {
    isMoving = true;
    interval = setInterval(moveCarousel, 3000); // Reinicia a movimentação
});