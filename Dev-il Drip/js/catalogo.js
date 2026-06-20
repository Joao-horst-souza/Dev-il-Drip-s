const chips = document.querySelectorAll('.chip');
const cards = document.querySelectorAll('.card-produto');
const busca = document.getElementById('busca');
const ordenar = document.getElementById('ordenar');
const grid = document.getElementById('grid');
let categoriaAtual = 'todos';

function aplicarFiltros() {
  const termo = busca.value.toLowerCase();
  cards.forEach(card => {
    const categoriaOk = categoriaAtual === 'todos' || card.dataset.categoria === categoriaAtual;
    const nomeOk = card.dataset.nome.includes(termo);
    card.style.display = (categoriaOk && nomeOk) ? 'block' : 'none';
  });
}

chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('ativo'));
    chip.classList.add('ativo');
    categoriaAtual = chip.dataset.categoria;
    aplicarFiltros();
  });
});

busca.addEventListener('input', aplicarFiltros);

ordenar.addEventListener('change', () => {
  const valor = ordenar.value;
  const lista = Array.from(cards);
  if (valor === 'menor') lista.sort((a, b) => a.dataset.preco - b.dataset.preco);
  if (valor === 'maior') lista.sort((a, b) => b.dataset.preco - a.dataset.preco);
  lista.forEach(card => grid.appendChild(card));
});