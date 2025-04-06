const valores = {
    dataInicial: () => window.document.getElementById('dataInicial'),
    dataFinal: () => window.document.getElementById('dataFinal'),
    valorInicial: () => window.document.getElementById('valorInicial'),
    taxaAnual: () => window.document.getElementById('taxaAnual')
}

function calcularDiferencaDias(dataInicial, dataFinal) {
    const inicio = new Date(dataInicial);
    const fim = new Date(dataFinal);

    const diferencaMs = fim - inicio;

    const diferencaDias = diferencaMs / (1000*60*60*24);

    return diferencaDias;
}

function calculadora() {
    const dataInicial = valores.dataInicial().value;
    const dataFinal = valores.dataFinal().value;
    const valorInicial = Number(valores.valorInicial().value);
    const taxaAnual = Number(valores.taxaAnual().value);

    const diferencaDias = calcularDiferencaDias(dataInicial, dataFinal);
    const taxaAnualDecimal = taxaAnual / 100;
    const taxaDiaria = (1 + taxaAnualDecimal) ** (1 / 365) - 1;

    const valorFuturo = valorInicial * ((1 + taxaDiaria) ** diferencaDias);
    const rendimentoBruto = valorFuturo - valorInicial;

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
    const rendimentoLiquido = rendimentoBruto - IR;
    const valorLiquidoFinal = valorInicial + rendimentoLiquido;
    const taxaMensalLiquida = ((valorLiquidoFinal / valorInicial) ** (30 / diferencaDias)) - 1;

    const res = document.getElementById("res");
    res.innerHTML = "";
    res.innerHTML += `<p>Valor investido: R$ ${valorInicial.toFixed(2)}</p>`;
    res.innerHTML += `<p>Valor bruto no vencimento: R$ ${valorFuturo.toFixed(2)}</p>`;
    res.innerHTML += `<p>Rendimento bruto: R$ ${rendimentoBruto.toFixed(2)}</p>`;
    res.innerHTML += `<p>IR (${(aliquotaIR*100).toFixed(1)}%): -R$ ${IR.toFixed(2)}</p>`;
    res.innerHTML += `<p>Rendimento líquido: R$ ${rendimentoLiquido.toFixed(2)}</p>`;
    res.innerHTML += `<p>Valor líquido final: R$ ${valorLiquidoFinal.toFixed(2)}</p>`;
    res.innerHTML += `<p>Rentabilidade mensal líquida (média): ${(taxaMensalLiquida * 100).toFixed(2)}% ao mês</p>`;
}
