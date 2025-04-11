function formatar(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}
  

document.addEventListener("DOMContentLoaded", function() {
    const tipoRentabilidade = document.getElementById("tipoRentabilidade");
    const campoTaxaJuros = document.getElementById("campoTaxaJuros");
    const textoTaxa = document.getElementById("textoTaxa");
    
    campoTaxaJuros.classList.add("campo-oculto");
    
    tipoRentabilidade.addEventListener("change", function() {
      if (tipoRentabilidade.value === "") {
        campoTaxaJuros.classList.add("campo-oculto");
      } else {
        campoTaxaJuros.classList.remove("campo-oculto");
        
        if (tipoRentabilidade.value === "posfixado") {
          textoTaxa.textContent = "% do CDI";
        } else {
          textoTaxa.textContent = "% a.a.";
        }
      }
    });
});
  
function calculadora() {
    const valorInicial = Number(document.getElementById('investimentoInicial').value);
    const aportesMensais = Number(document.getElementById('aportesMensais').value);
    const taxaInput = Number(document.getElementById('taxaJuros').value);
    const periodo = Number(document.getElementById('periodo').value);
    const unidadePeriodo = document.getElementById('unidadePeriodo').value;
    const tipoRentabilidade = document.getElementById('tipoRentabilidade').value;

    const resultado = document.getElementById("resultado");
    resultado.innerHTML = "";

    if (!valorInicial || !taxaInput || !periodo || !tipoRentabilidade || !unidadePeriodo) {
        resultado.innerHTML = "<p style='color:red;'>Preencha todos os campos obrigatórios.</p>";
        return;
    }

    const CDI = 14.15;
    const IPCA = 5.07;
    let taxaAnual;

    if (tipoRentabilidade === "posfixado") {
    taxaAnual = (taxaInput / 100) * CDI;
    } else if (tipoRentabilidade === "ipca") {
    const taxaReal = taxaInput / 100;
    const ipcaDecimal = IPCA / 100;
    taxaAnual = (1 + taxaReal) * (1 + ipcaDecimal) - 1;
    taxaAnual *= 100;
    } else {
    taxaAnual = taxaInput;
    }

    const taxaMensal = (1 + (taxaAnual / 100)) ** (1 / 12) - 1;
    const totalMeses = unidadePeriodo === "anos" ? periodo * 12 : periodo;

    let montante = valorInicial;
    for (let i = 0; i < totalMeses; i++) {
        montante *= (1 + taxaMensal);
        montante += aportesMensais;
    }

    const totalInvestido = valorInicial + (aportesMensais * totalMeses);
    const rendimentoBruto = montante - totalInvestido;

    const dias = totalMeses * 30;
    let aliquotaIR = 0.15;
    if (dias <= 180) aliquotaIR = 0.225;
    else if (dias <= 360) aliquotaIR = 0.20;
    else if (dias <= 720) aliquotaIR = 0.175;

    const IR = rendimentoBruto * aliquotaIR;
    const valorLiquido = montante - IR;
    const rendimentoLiquido = valorLiquido - totalInvestido;
    const taxaMensalLiquida = ((valorLiquido / totalInvestido) ** (1 / totalMeses)) - 1;

    resultado.innerHTML += `<p>Valor total investido: ${formatar(totalInvestido)}</p>`;
    resultado.innerHTML += `<p>Valor bruto final: ${formatar(montante)}</p>`;
    resultado.innerHTML += `<p>Rendimento bruto: ${formatar(rendimentoBruto)}</p>`;
    resultado.innerHTML += `<p>IR (${(aliquotaIR * 100).toFixed(1)}%): -${formatar(IR)}</p>`;
    resultado.innerHTML += `<p>Rendimento líquido: ${formatar(rendimentoLiquido)}</p>`;
    resultado.innerHTML += `<p>Valor líquido final: ${formatar(valorLiquido)}</p>`;
    resultado.innerHTML += `<p>Rentabilidade líquida média: ${(taxaMensalLiquida * 100).toFixed(2)}% ao mês</p>`;
}
