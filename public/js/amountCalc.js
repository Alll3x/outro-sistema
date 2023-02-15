const campoValorTotal = document.getElementById('valorTotal');
const valoresUn = document.querySelectorAll("td.valorUn");

const valorTotal = (valoresUn) => {
  let total = 0;
  for (let i = 0; i < valoresUn.length; i++) { 
    total += parseFloat(valoresUn[i].innerText);
  }
  return total;
}

campoValorTotal.innerText = valorTotal(valoresUn);