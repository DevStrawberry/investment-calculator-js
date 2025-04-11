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
    const diferencaDias = diferencaMs / (1000*60*60*24);
    const diferencaMeses = Math.floor((fim.getFullYear() - inicio.getFullYear()) * 12 + fim.getMonth() - inicio.getMonth());

    return {
        diferencaDias,
        diferencaMeses
    };
}

function calculadora() {
    const valorInicial = Number(valores.valorInicial().value);
    const aportesMensais = Number(valores.aportesMensais().value);
    const taxaAnual = Number(valores.taxaAnual().value);
    const dataInicial = valores.dataInicial().value;
    const dataFinal = valores.dataFinal().value;

    const taxaMensal = (1 + (taxaAnual / 100)) ** (1/12) - 1;
    
    const { diferencaDias, diferencaMeses } = calcularDiferencaDias(dataInicial, dataFinal);
    
    let montante = valorInicial;
    for (let i = 0; i < diferencaMeses; i++) {
        montante += aportesMensais;
        montante *= (1 + taxaMensal);
    }

    const valorTotalInvestido = valorInicial + (aportesMensais * diferencaMeses);
    const rendimentoBruto = montante - valorTotalInvestido;

    //Cálculo do IR com base na tabela regressiva
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

    const res = document.getElementById("res");
    res.innerHTML = "";
    res.innerHTML += `<p>Valor total investido (inicial + aportes): R$ ${valorTotalInvestido.toFixed(2)}</p>`;
    res.innerHTML += `<p>Valor bruto no vencimento: R$ ${montante.toFixed(2)}</p>`;
    res.innerHTML += `<p>Rendimento bruto: R$ ${rendimentoBruto.toFixed(2)}</p>`;
    res.innerHTML += `<p>IR (${(aliquotaIR*100).toFixed(1)}%): -R$ ${IR.toFixed(2)}</p>`;
    res.innerHTML += `<p>Rendimento líquido: R$ ${rendimentoLiquido.toFixed(2)}</p>`;
    res.innerHTML += `<p>Valor líquido final: R$ ${valorLiquidoFinal.toFixed(2)}</p>`;
    res.innerHTML += `<p>Rentabilidade mensal líquida (média): ${(taxaMensalLiquida * 100).toFixed(2)}% ao mês</p>`;
}
