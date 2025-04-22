function formatar(valor) {
  return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

document.addEventListener("DOMContentLoaded", function () {
  const tipoRentabilidade = document.getElementById("tipoRentabilidade");
  const campoTaxaJuros = document.getElementById("campoTaxaJuros");
  const textoTaxa = document.getElementById("textoTaxa");

  campoTaxaJuros.classList.add("campo-oculto");

  tipoRentabilidade.addEventListener("change", function () {
    if (tipoRentabilidade.value === "") {
      campoTaxaJuros.classList.add("campo-oculto");
    } else {
      campoTaxaJuros.classList.remove("campo-oculto");
      textoTaxa.textContent = tipoRentabilidade.value === "posfixado" ? "% do CDI" : "% a.a.";
    }
  });

  // Modo Escuro
  const toggle = document.getElementById('darkModeToggle');
  const isDark = localStorage.getItem('modoEscuro') === 'true';
  if (isDark) {
    document.body.classList.add('dark-mode');
    toggle.checked = true;
  }

  toggle.addEventListener('change', function () {
    document.body.classList.toggle('dark-mode', this.checked);
    localStorage.setItem('modoEscuro', this.checked);
  });
});

let grafico;

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
  let dadosEvolucao = [montante];
  let labels = ["Mês 0"];

  for (let i = 1; i <= totalMeses; i++) {
    montante *= (1 + taxaMensal);
    montante += aportesMensais;
    dadosEvolucao.push(montante);
    labels.push(`Mês ${i}`);
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

  document.getElementById('graficoWrapper').style.display = 'block';
  const ctx = document.getElementById('graficoEvolucao').getContext('2d');

  if (grafico) grafico.destroy();

  grafico = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Evolução do investimento (R$)',
        data: dadosEvolucao,
        borderColor: '#0066cc',
        backgroundColor: 'rgba(0,102,204,0.1)',
        fill: true,
        tension: 0.3,
        pointRadius: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          display: true
        }
      },
      scales: {
        y: {
          ticks: {
            callback: value => 'R$ ' + value.toLocaleString('pt-BR')
          }
        }
      }
    }
  });
}

// Exportar PDF com gráfico em alta resolução
document.getElementById('btnExportar').addEventListener('click', async function () {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const canvas = document.getElementById('graficoEvolucao');

  const tempCanvas = document.createElement('canvas');
  const scale = 3;
  tempCanvas.width = canvas.width * scale;
  tempCanvas.height = canvas.height * scale;
  const tempCtx = tempCanvas.getContext('2d');
  tempCtx.scale(scale, scale);
  tempCtx.drawImage(canvas, 0, 0);
  const imgData = tempCanvas.toDataURL('image/png');

  pdf.setFontSize(16);
  pdf.text('Relatório de Investimento', 20, 20);

  const resultadoHtml = document.getElementById('resultado').innerText;
  const linhas = resultadoHtml.split('\n');
  pdf.setFontSize(12);
  let y = 30;
  linhas.forEach((linha) => {
    if (y > 270) {
      pdf.addPage();
      y = 20;
    }
    pdf.text(linha, 20, y);
    y += 8;
  });

  y += 10;
  const imgWidth = 180;
  const imgHeight = (tempCanvas.height / tempCanvas.width) * imgWidth;
  pdf.addImage(imgData, 'PNG', 15, y, imgWidth, imgHeight);

  pdf.save('relatorio-investimento.pdf');
});
