function sortear() {
  const quantNumeros = parseInt(document.getElementById('quantidade').value);
  const de = parseInt(document.getElementById('de').value);
  const ate = parseInt(document.getElementById('ate').value);
  let numeros = [];
  const validate = validateInputs(quantNumeros, de, ate);
  if (validate.status) {
    for (let i = 0; i < quantNumeros; i++) {
      let numero = gerarNumeros(de, ate);
      while (numeros.includes(numero)) {
        numero = gerarNumeros(de, ate);
      }
      numeros.push(numero);
    }
    alterarStatus(document.getElementById('btn-sortear'), false);
    alterarStatus(document.getElementById('btn-reiniciar'), true);
    document.getElementById('resultado').innerHTML = `<label class="texto__paragrafo">Números sorteados: ${numeros.join(', ')}</label>`;
  } else {
    document.getElementById('resultado').innerHTML = `<label class="texto__paragrafo">${validate.message}</label>`;
  }
}

function gerarNumeros(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function validateInputs(qtd, de, ate) {
  const rules = [
    {
      check: () => isNaN(qtd) || isNaN(de) || isNaN(ate),
      message: 'Todos os campos devem ser preenchidos',
    },
    {
      check: () => de > ate,
      message: 'O valor inicial deve ser menor que o valor final',
    },
    {
      check: () => qtd < 1,
      message: 'A quantidade de números deve ser maior que 0',
    },
    {
      check: () => qtd > (ate - de + 1),
      message: 'A quantidade de números deve ser menor que o valor final - valor inicial + 1',
    },
    {
      check: () => de < 1,
      message: 'O valor inicial deve ser maior que 0',
    },
  ];

  for (const rule of rules) {
    if (rule.check()) {
      return {
        status: false,
        message: rule.message,
      };
    }
  }

  return {
    status: true,
    message: '',
  };
}

function reiniciar() {
  document.getElementById('quantidade').value = '';
  document.getElementById('de').value = '';
  document.getElementById('ate').value = '';
  document.getElementById('resultado').innerHTML = '<label class="texto__paragrafo">Números sorteados:  nenhum até agora</label>';

  alterarStatus(document.getElementById('btn-reiniciar'), false);
  alterarStatus(document.getElementById('btn-sortear'), true);

}

function alterarStatus(btn, status) {
  if (status) {
    btn.classList.remove('container__botao-desabilitado');
    btn.classList.add('container__botao');
  } else {
    btn.classList.add('container__botao-desabilitado');
    btn.classList.remove('container__botao');
  }
}