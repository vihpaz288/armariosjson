var armarios = [];

fetch('armarios.json')
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    armarios = data.armarios;
    renderizarArmarios();
  });

function renderizarArmarios() {
  var container = document.getElementById('armarios-container');
  container.innerHTML = '';

  for (var i = 0; i < armarios.length; i++) {
    var armario = armarios[i];
    var div = document.createElement('div');
    
    
    div.className = 'armarios';
    div.style.backgroundColor = obterCorEstado(armario.estado);
    div.textContent = armario.numero;
    div.style.width = "largura";
    div.style.height = "altura";
    div.setAttribute('data-indice', i);
    div.addEventListener('click', alterarEstadoArmario);
    container.appendChild(div);
  }
}

function obterCorEstado(estado) {
  switch (estado) {
    case 'liberado':
      return '#2E8B57';
    case 'ocupado':
      return '#e32636';
    case 'manutencao':
      return '#696969';
  }
}

function alterarEstadoArmario() {
  var indice = parseInt(this.getAttribute('data-indice'));
  var armario = armarios[indice];

  switch (armario.estado) {
    case 'liberado':
      armario.estado = 'ocupado';
      break;
    case 'ocupado':
      armario.estado = 'manutencao';
      break;
    case 'manutencao':
      armario.estado = 'liberado';
      break;
  }

  renderizarArmarios();
}
