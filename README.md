# Investment Calculator - Calculadora de Investimentos

Uma calculadora simples e robusta para simular a evolução de investimentos com aportes regulares e diferentes tipos de rentabilidade (Prefixado, Pós-fixado e IPCA+).

O projeto é construído com **HTML, CSS e JavaScript vanilla**, utilizando as bibliotecas **Chart.js** para visualização gráfica e **jsPDF** para exportação de relatórios.

## Acesso ao Projeto

Você pode acessar e utilizar a calculadora diretamente no GitHub Pages:

**[Clique aqui para acessar a Investment Calculator](https://devstrawberry.github.io/investment-calculator-js/)**

---

## Funcionalidades

* **Simulação de Investimentos:** Calcule o valor final, rendimento bruto e líquido de uma aplicação.
* **Aportes Mensais:** Inclua o valor de aportes mensais para projeções de longo prazo.
* **Tipos de Rentabilidade:**
    * **Prefixado:** Insira a taxa de juros anual.
    * **Pós-fixado:** Insira o percentual do CDI (já configurado com um valor fixo de CDI para simulação).
    * **IPCA+:** Insira a taxa real de juros (já configurado com um valor fixo de IPCA para simulação).
* **Período Flexível:** Simule em anos ou meses.
* **Cálculo de IR:** O Imposto de Renda é calculado automaticamente com base na tabela regressiva de Renda Fixa (prazo do investimento).
* **Gráfico de Evolução:** Visualize a curva de crescimento do seu investimento ao longo do tempo.
* **Modo Escuro (Dark Mode):** Alterne o tema da aplicação para maior conforto visual.
* **Exportação em PDF:** Exporte o resumo dos resultados e o gráfico para um arquivo PDF em alta resolução.

---

## Tecnologias Utilizadas

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla)**
* **[Chart.js](https://www.chartjs.org/)**: Para criação do gráfico de evolução.
* **[jsPDF](https://jspdf.org/)**: Para a exportação dos resultados em PDF.

---

## Como Executar Localmente

Se você deseja rodar ou contribuir com o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/DevStrawberry/investment-calculator-js.git](https://github.com/DevStrawberry/investment-calculator-js.git)
    ```

2.  **Navegue até a pasta do projeto:**
    ```bash
    cd investment-calculator-js
    ```

3.  **Abra o arquivo:**
    Simplesmente abra o arquivo `index.html` em seu navegador.

Como este projeto utiliza apenas HTML, CSS e JavaScript vanilla, não é necessário instalar dependências de Node.js ou servidor local.

---

## Contribuição

Contribuições são bem-vindas! Se você tiver sugestões de melhorias, novos recursos ou encontrar algum bug, sinta-se à vontade para abrir uma **Issue** ou enviar um **Pull Request**.

1.  Faça um Fork do projeto.
2.  Crie uma nova branch (`git checkout -b feature/minha-feature`).
3.  Commit suas alterações (`git commit -m 'feat: adiciona nova funcionalidade'`).
4.  Envie para o branch (`git push origin feature/minha-feature`).
5.  Abra um Pull Request.

---

## Licença

Este projeto está sob a licença [MIT](https://opensource.org/licenses/MIT).

---

Feito com ❤️ por **DevStrawberry**
