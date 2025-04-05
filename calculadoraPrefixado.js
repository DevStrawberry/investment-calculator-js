const prompt = require('prompt-sync')();

let dataInicial = prompt('Digite a data da aplicação (aa-mm-dd): ');
let dataFinal = prompt('Digite a data do vencimento (aa-mm-dd): ');
let valorInicial = prompt('Digite o valor total investido: ');
valorInicial = parseFloat(valorInicial);
let taxaAnual = prompt('Digite a taxa de juros: ');
taxaAnual = parseFloat(taxaAnual);

function calcularDiferencaDias(dataInicial, dataFinal) {
    const inicio = new Date(dataInicial);
    const fim = new Date(dataFinal);

    const diferencaMs = fim - inicio;

    const diferencaDias = diferencaMs / (1000*60*60*24);

    return diferencaDias;
}

const diferencaDias = calcularDiferencaDias(dataInicial, dataFinal);
console.log(`Diferença em dias: ${diferencaDias}`);

taxaAnual = taxaAnual/100;
const taxaDiaria = (1 + taxaAnual) ** (1/365) - 1;

let valorFuturo = valorInicial * ((1 + taxaDiaria) ** diferencaDias);

let rendimentoBruto = valorFuturo - valorInicial;

let aliquotaIR;
if (diferencaDias <= 180) {
    aliquotaIR = 22.5/100;
} else if (diferencaDias <= 360) {
    aliquotaIR = 20/100;
} else if (diferencaDias <= 720) {
    aliquotaIR = 17.5/100;
} else {
    aliquotaIR = 15/100;
}

let IR = aliquotaIR * rendimentoBruto;
let rendimentoLiquido = rendimentoBruto - IR;
let valorLiquidoFinal = valorInicial + rendimentoLiquido;
let taxaMensalLiquida = ((valorLiquidoFinal / valorInicial) ** (30 / diferencaDias)) - 1;

console.log(`\nValor investido: R$ ${valorInicial.toFixed(2)}`);
console.log(`Valor bruto no vencimento: R$ ${valorFuturo.toFixed(2)}`);
console.log(`Rendimento bruto: R$ ${rendimentoBruto.toFixed(2)}`);
console.log(`IR (${(aliquotaIR*100).toFixed(1)}%): -R$ ${IR.toFixed(2)}`);
console.log(`Rendimento líquido: R$ ${rendimentoLiquido.toFixed(2)}`);
console.log(`Valor líquido final: R$ ${valorLiquidoFinal.toFixed(2)}`);
console.log(`Rentabilidade mensal líquida (média): ${(taxaMensalLiquida*100).toFixed(2)}% ao mês`);