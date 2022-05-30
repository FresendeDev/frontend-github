function calcularMedia(notas) {
  let soma = 0;
  for (c = 0; c < notas.length; c++) {
    soma += notas[c];
  }

  media = soma / notas.length;

  return media;
}

let media; // escopo global

function aprovacao(notas) {
  let media = calcularMedia(notas); // escopo da função

  let condicao = media >= 8 ? "aprovado" : "reprovado";

  return "Média: " + media + " - Resultado: " + condicao;
}

// contagem regressiva 50
document.addEventListener("submit", function (evento) {
  // não permite que o formulario seja submetido html
  evento.preventDefault();

  let formulario = this.getElementById("formulario-01");

  let dados = new FormData(formulario);

  let objeto = {};

  let notas = 0;

  for (let key of dados.keys()) {
    objeto[key] = dados.get(key);
    notas += parseInt(dados.get(key));
  }
  console.log(notas);
  console.log(objeto);
  console.log(media);

  // document.getElementById("reultado").innerHTML = aprovacao(notas);
});
