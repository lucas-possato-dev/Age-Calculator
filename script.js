const button = document.querySelector(".button");
const inputs = document.querySelectorAll(".form input");
const spans = document.querySelectorAll(".results div span");
const errors = document.querySelectorAll(".form .error");
const invalid = document.querySelectorAll(".form .invalid");
const dataAtual = new Date();
let dataAnterior = null;


function setDataAnterior() {
  button.addEventListener("click", function() {
    const dia = parseInt(document.querySelector("#dd").value);
    const mes = parseInt(document.querySelector("#mm").value) - 1; // ajusta o mês para iniciar em 0
    const ano = parseInt(document.querySelector("#yyyy").value);
    dataAnterior = new Date(ano, mes, dia);

    const diff = dataAtual.getTime() - dataAnterior.getTime();
    const anos = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
    const meses = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) / (1000 * 60 * 60 * 24 * 30));
    const dias = Math.floor((diff % (1000 * 60 * 60 * 24 * 365.25)) % (1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24));

    februarySituation();

    inputs.forEach((input, index) => {
      if (!isNaN(anos)) {
        document.querySelector("#ano").textContent = anos;
        input.nextElementSibling.classList.remove("active");
        input.classList.remove("erro");
      } else {
        errors[index].classList.add("active");
        input.classList.add("erro");
      }
      if (!isNaN(meses)) {
        document.querySelector("#mes").textContent = meses;
        input.nextElementSibling.classList.remove("active");
        input.classList.remove("erro");
      } else {
        errors[index].classList.add("active");
        input.classList.add("erro");

      }
      if (!isNaN(dias)) {
        document.querySelector("#dia").textContent = dias;
        input.nextElementSibling.classList.remove("active");
        input.classList.remove("erro");
      } else {
        errors[index].classList.add("active");
        input.classList.add("erro");

      }
    });

    februarySituation();
  })    
}  

const inputDias = document.getElementById('dd');
const inputMeses = document.getElementById('mm');
const inputAnos = document.getElementById('yyyy');

function februarySituation(event) {
  if (parseInt(inputMeses.value) === 2 && inputDias.value > 28) {
    invalid.forEach((inv) => {
      inv.classList.add("alert");
      event.preventDefault();
    })
  } else {
    invalid.forEach((inv) => {
      inv.classList.remove("alert");
    })
  }
}


inputDias.addEventListener('input', () => {
  const valor = parseInt(inputDias.value);
  if (valor > 31) {
    inputDias.value = 31;
} else if (valor < 1 || isNaN(valor)) {
  inputDias.value = '--';
} 

})
inputMeses.addEventListener('input', () => {
  const valorMeses = parseInt(inputMeses.value);
  if (valorMeses > 12) {
    inputMeses.value = 12;
  } else if (valorMeses < 1 || isNaN(valorMeses)) {
    inputMeses.value = '--';
  }
})
inputAnos.addEventListener('input', () => {
  const valorAnos = parseInt(inputAnos.value);
  if (valorAnos > dataAtual.getFullYear()) {
    inputAnos.value = dataAtual.getFullYear();
  } else if (valorAnos < 1 || isNaN(valorAnos))
  inputAnos.value = '--';
})

setDataAnterior();
