const valores = {
    valorInicial: () => window.document.getElementById('valorInicial'),
    aportesMensais: () => window.document.getElementById('aportesMensais'),
    taxaAnual: () => window.document.getElementById('taxaAnual'),
    dataInicial: () => window.document.getElementById('dataInicial'),
    dataFinal: () => window.document.getElementById('dataFinal')
}

function calcularDiferencaDias(dataInicial, dataFinal) {
    const inicio = new Date(dataInicial);
    const fim = new Date(dataFinal);
    const diferencaMs = fim - inicio;
    const diferencaDias = diferencaMs / (1000 * 60 * 60 * 24);
    const diferencaMeses = Math.floor((fim.getFullYear() - inicio.getFullYear()) * 12 + fim.getMonth() - inicio.getMonth());

    return {
        diferencaDias,
        diferencaMeses
    };
}

function formatar(valor) {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function calculadora() {
    const valorInicial = Number(valores.valorInicial().value);
    const aportesMensais = Number(valores.aportesMensais().value);
    const taxaAnual = Number(valores.taxaAnual().value);
    const dataInicial = valores.dataInicial().value;
    const dataFinal = valores.dataFinal().value;

    const res = document.getElementById("res");
    res.innerHTML = "";

    // Verificações
    if (!valorInicial || !taxaAnual || !dataInicial || !dataFinal) {
        res.innerHTML = "<p style='color:red;'>Preencha todos os campos corretamente.</p>";
        return;
    }

    if (new Date(dataFinal) <= new Date(dataInicial)) {
        res.innerHTML = "<p style='color:red;'>A data final deve ser posterior à data inicial.</p>";
        return;
    }

    if (taxaAnual < 0) {
        res.innerHTML = "<p style='color:red;'>A taxa de juros não pode ser menor que zero.</p>";
        return;
    }

    const taxaMensal = (1 + (taxaAnual / 100)) ** (1 / 12) - 1;

    const { diferencaDias, diferencaMeses } = calcularDiferencaDias(dataInicial, dataFinal);

    let montante = valorInicial;
    for (let i = 0; i < diferencaMeses; i++) {
        montante += aportesMensais;
        montante *= (1 + taxaMensal);
    }

    const valorTotalInvestido = valorInicial + (aportesMensais * diferencaMeses);
    const rendimentoBruto = montante - valorTotalInvestido;

    // Cálculo do IR regressivo
    let aliquotaIR;
    if (diferencaDias <= 180) {
        aliquotaIR = 22.5 / 100;
    } else if (diferencaDias <= 360) {
        aliquotaIR = 20 / 100;
    } else if (diferencaDias <= 720) {
        aliquotaIR = 17.5 / 100;
    } else {
        aliquotaIR = 15 / 100;
    }

    const IR = aliquotaIR * rendimentoBruto;
    const valorLiquidoFinal = montante - IR;
    const rendimentoLiquido = valorLiquidoFinal - valorTotalInvestido;
    const taxaMensalLiquida = ((valorLiquidoFinal / valorTotalInvestido) ** (30 / diferencaDias)) - 1;

    res.innerHTML += `<p>Valor total investido (inicial + aportes): ${formatar(valorTotalInvestido)}</p>`;
    res.innerHTML += `<p>Valor bruto no vencimento: ${formatar(montante)}</p>`;
    res.innerHTML += `<p>Rendimento bruto: ${formatar(rendimentoBruto)}</p>`;
    res.innerHTML += `<p>IR (${(aliquotaIR * 100).toFixed(1)}%): -${formatar(IR)}</p>`;
    res.innerHTML += `<p>Rendimento líquido: ${formatar(rendimentoLiquido)}</p>`;
    res.innerHTML += `<p>Valor líquido final: ${formatar(valorLiquidoFinal)}</p>`;
    res.innerHTML += `<p>Rentabilidade mensal líquida (média): ${(taxaMensalLiquida * 100).toFixed(2)}% ao mês</p>`;
}
