## Sobre o autor

O meu nome é [Kitty Giraudel](https://kittygiraudel.com), sou um front-end francês, morando em Berlim (Alemanha) desde 2015 e, atualmente, trabalhando na [Cofenster](https://www.cofenster.com).

Estive escrevendo Sass por vários anos e sou o autor de muitos projetos relacionados ao Sass, como [SassDoc](http://sassdoc.com), SitePoint Sass Reference e [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/). Se você tem interesse em saber mais sobre minhas contribuições na comunidade Sass, dê uma olhada [nesta lista](https://github.com/KittyGiraudel/awesome-sass).

Além disso, também sou autor de um livro sobre CSS (em francês), entitulado [CSS3 Pratique du Design Web](https://www.eyrolles.com/Informatique/Livre/css3-9782212678963/) (_Eyrolles_ editions). Assim como um livro sobre Sass (em inglês), entitulado [Jump Start Sass](https://learnable.com/books/jump-start-sass) (_Learnable_ editions).

[Encontra-me no Twitter](https://twitter.com/KittyGiraudel)

## Contribuir

Sass Guidelines é um projecto sem fins lucrativos que mantenho no meu tempo livre. Escusado será dizer que é necessário uma generosa quantidade de tempo para o manter sempre actualizado, bem documentado e relevante. Felizmente, recebi ajuda de ótimos contribuidores, especialmente na manutenção das dezenas de diferentes traduções. Certifique-se de agradecê-los!

Se quiserem contribuir, lembrem-se que tweetar, espalhar a palavra ou corrigir pequenos erros abrindo um _issue_ ou criando _pull requests_ no [repositório de Github](https://github.com/KittyGiraudel/sass-guidelines), seria excelente!

Por último, antes de começarmos: se gostaram deste documento ou se o consideraram com valor pessoal ou para a vossa equipa, por favor considerem apoiá-lo para que eu consiga mantê-lo!

[Apoiar Sass Guidelines](https://gum.co/sass-guidelines) [Espalhar a palavra](https://twitter.com/share?text=Sass+Guidelines%2C+An+opinionated+styleguide+for+writing+sane%2C+maintainable+and+scalable+Sass+by+%40KittyGiraudel+%E2%80%93&url=https://sass-guidelin.es)

## Sobre Sass

Esta é forma como [Sass](https://sass-lang.com) se auto-descreve na sua própria [documentação](https://sass-lang.com/documentation/file.SASS_REFERENCE.html):

> Sass é uma extensão de CSS que adiciona novas possibilidades e elegância à linguagem base.

O objectivo final de Sass é corrigir as falhas de CSS. CSS, como todos sabemos, não é a melhor linguagem no mundo \[carece de fontes\]. Enquanto é muito simples de aprender, pode rapidamente tornar-se uma confusão, especialmente em projectos grandes.

É aqui que Sass entra em cena, como meta-linguagem, para melhorar a sintaxe original de CSS de maneira a oferecer novas funcionalidades e ferramentas úteis. No entanto, Sass pretende manter-se algo conservadora no que diz respeito à linguagem de CSS.

A ideia não é tornar CSS numa linguagem de programação de alto nível; Sass pretende apenas oferecer ajuda onde CSS demonstra falhas. Graças a esta abordagem, começar a aprender Sass não é mais difícil que aprender CSS: simplesmente adiciona funcionalidades em cima da linguagem.

Dito isto, existem imensas formas de utilizar estas funcionalidades. Algumas são boas, outras más, outras pouco usuais. Este guia pretende providenciar uma forma documentada e consistente de escrever código em Sass.

### Ruby Sass ou LibSass

[O primeiro _commit_ de Sass](https://github.com/hcatlin/sass/commit/fa5048ba405619273e474a50400c7243fbff54fe) foi feito em 2006, mais de 10 anos atrás. Desnecessário dizer que evoluiu muito desde então. Inicialmente desenvolvido utilizando Ruby, diversas adaptações foram surgindo. A mais bem sucedida, [LibSass](https://webdesign.tutsplus.com/articles/getting-to-know-libsass--cms-23114) (written in C/C++) está hoje muito perto de ser totalmente compatível com a versão original.

Em 2014, [ambas as equipas de Ruby Sass e LibSass decidiram esperar até que as versões se sincronizassem antes de continuar o desenvolvimento](https://github.com/sass/libsass/wiki/The-LibSass-Compatibility-Plan). Desde então, LibSass tem ativamente vindo a lançar versões com paridade de funcionalidades com a sua irmã mais velha. As últimas inconsistências estão a ser reunidas e listadas por mim no projeto [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/). Se estiverem a par de alguma incompatibilidade entre as duas versões que não esteja listada, por favor abram um _issue_ no repositório.

Voltando à questão de escolher o compilador. Na verdade, tudo depende do vosso projeto. Se se tratar de um projecto em Ruby on Rails, será preferível utilizar Ruby Sass, já que é perfeitamente adequado para o caso. Convém manter em mente que Ruby Sass vai sempre ser a implementação de referência e por isso estará sempre um passo à frente no que diz respeito a funcionalidades. Além disso, se você está procurando trocar do Ruby Sass por o LibSass, [este artigo](https://www.sitepoint.com/switching-ruby-sass-libsass/) é para você.

Em projetos que não sejam em Ruby que precisem de integração no método de trabalho, LibSass será provavelmente uma melhor opção, uma vez que esta é praticamente dedicada a adaptações externas. Por exemplo, se quiserem utilizar NodeJS, [node-sass](https://github.com/sass/node-sass), a escolha já está feita.

### Sass ou SCSS

Existe alguma confusão no que diz respeito à semântica do nome _Sass_, e justificadamente: Sass significa tanto o pré-processador e a sua própria sintaxe. Não é lá muito conveniente, pois não?

Inicialmente, Sass descrevia a sintaxe cuja característica que a definia era a sua sensibilidade à indentação. Rapidamente, os escritores de Sass decidiram encurtar a distância entre Sass e CSS providenciando uma sintaxe mais próxima de CSS original chamada _SCSS_ para _Sassy CSS_. O lema é: se é CSS válido, é valido SCSS também.

Desde então, Sass (enquanto pré-processador) oferece [duas sintaxes diferentes](https://www.sitepoint.com/whats-difference-sass-scss/): Sass (que não é escrito em maiúsculas, [por favor](http://sassnotsass.com)), também conhecido como _a sintaxe indentada_, e SCSS. Qual delas utilizar é uma questão de preferência pessoal, uma vez que ambas são equivalentes a nível de funcionalidades. Até aqui, é tudo uma questão de estética.

A sensibilidade aos espaços em Sass depende na indentação para se ver livre de chavetas, pontos e vírgula e outros símbolos de pontuação, o que leva a uma sintaxe mais curta e mais limpa. Por outro lado, SCSS é mais fácil de aprender já que consiste maioritariamente em pedaços extra que sao escritos adicionalmente ao CSS habitual.

Pessoalmente, prefiro SCSS a Sass apenas porque é mais aproximada de CSS e mais amigável para os programadores. Por isso, SCSS será a sintaxe padrão, durante esse guia. Podem sempre alterar para a sintaxe indentada de Sass no painel de .

### Outros pré-processadores

Entre outras coisas, Sass é um pré-processador. O seu principal rival será [Less](http://lesscss.org/), um pré-processador baseado em NodeJS que se tornou bastante popular graças à _framework_ de CSS [Bootstrap](https://getbootstrap.com/), que faz uso deste (até a versão 4). Existe ainda o [Stylus](https://stylus-lang.com/), um pré-processador muito permissivo e flexível, apesar de ser mais difícil de usar e possuir comunidade menor.

_Porquê escolher Sass em vez de outro processador qualquer?_ continua a ser uma questão válida. Não há muito tempo, era habitual recomendar Sass para projectos baseados em Ruby apenas porque foi o primeiro construído nesta mesma linguagem e andava de mãos dadas com Ruby on Rails. Agora que LibSass já está a par (maioritariamente) com o Sass original, esta recomendação não é mais relevante.

O que eu mais aprecio em Sass é a sua abordagem conservadora para com CSS. O design em Sass é fundamentado em princípios fortes: a grande parte da abordagem de design vem das crenças básicas das equipas que a) adicionar funcionalidades extra possui um custo de complexidade que precisa de ser justificado pela sua utilidade, e b) deve ser simples e intuitivo compreender o que um bloco de estilo é responsável por, olhando apenas para esse mesmo bloco individualmente. Sass possui também uma maior atenção ao detalhe relativamente a outros pré-processadores. Tanto quanto posso afirmar, os seus designers responsáveis preocupam-se bastante com todos os casos de compatibilidade com CSS e com a consistência de comportamento da linguagem. Em outras palavras, Sass é um software destinado a resolver problemas de verdade, ajudando a fornecer funcionalidades úteis para o CSS, onde ele falha.

Pré-processadores à parte, devemos também mencionar ferramentas como [PostCSS](https://github.com/postcss/postcss) e [cssnext](https://cssnext.github.io/), as quais receberam uma atenção significante, nos últimos meses.

PostCSS é comumente (e incorretamente) referido como um “pós-processador”. A suposição, combinada com o nome infeliz, é que PostCSS analisa CSS que já foi processado por um pré-processador. Enquanto isso pode realmente ocorrer, na verdade, não é obrigatório. Portanto, PostCSS é somente um processador.

O PostCSS permite que você acesse “tokens” da sua folha de estilos (seletores, propriedades e valores), processe isso com JavaScript (para fazer alguma operação de algum tipo) e compilar os resultados para CSS. Por exemplo, a biblioteca de prefixos [Autoprefixer](https://github.com/postcss/autoprefixer) é construída com PostCSS. Ela analisa cada regra para ver se é necessário usar _vendor prefixes_, usando como referência a ferramenta [CanIUse](https://caniuse.com).

Isso é incrivelmente poderoso e bom para construir bibliotecas que funcionam com qualquer pré-processador (como vanilla CSS), mas PostCSS não é tão fácil de usar, ainda. Você tem que saber um pouco de JavaScript para construir qualquer coisa e sua API pode ser confusa, às vezes. Enquanto Sass só fornece um conjunto de ferramentas que são úteis para escrever CSS, PostCSS provê acesso direto ao AST CSS (_ávore abstrata de sintaxe CSS_) e JavaScript.

Em resumo, Sass é meio que fácil de usar e vai resolver a maioria dos seus problemas. Por outro lado, PostCSS pode ser difícil de dominar (se você não é bom com JavaScript), mas é incrivelmente poderoso, no final das contas. Além disso, não há razão para que você não possa ou deva usar ambos. Na verdade, PostCSS oferece um SCSS parser oficial, só para isso.

```
<p>Agradeço ao <a href="https://github.com/corysimmons">Cory Simmons</a> por sua ajuda e expertise, nessa seção.</p>
```

## Introdução

### Porque um guia de estilo

Um guia de estilo não é só um documento agradável à leitura que pretende descrever um estado perfeito para o nosso código. Um guia de estilo é um documento importante no ciclo de vida de um projeto, descrevendo como e porquê o código deve ser escrito. Para pequenos projetos pode parecer excessivo, mas ajuda imenso à manutenção e escalabilidade do código-fonte.

Invariavelmente, quantos mais programadores estiverem envolvidos num projeto, mais regras serão necessárias. Da mesma forma, quanto maior o projeto, mais necessário se torna um guia de estilo.

[Harry Roberts](https://csswizardry.com) refere muito bem nas [CSS Guidelines](https://cssguidelin.es/#the-importance-of-a-styleguide):

> Um guia de estilo de código (e não um visual) é uma ferramenta de grande valor para equipas que:
> 
> -   criem e mantenham produtos durante uma quantidade de tempo considerável;
> -   possuam programadores com habilidades e especialidades variadas;
> -   possuam vários programadores a trabalhar num produto num dado momento;
> -   recebam novos membros regularmente;
> -   possuam várias bases de código que os programadores alternem;

### Termos de Responsabilidades

Em primeiro lugar: **isto não é um guia de estilo de CSS**. Este documento não pretende discutir convenções de nomes para classes em CSS, padrões de módulos ou a questão de utilizar IDs no mundo de CSS. Estas guias dizem apenas respeito a conteúdo específico de Sass.

Para além disso, este guia de estilo é da minha autoria e consequentemente **muito parcial**. Podem pensar nele como uma coleção de metodologias e conselhos que eu tenho vindo a polir ao longo dos anos. Isto dá-me também a oportunidade de referenciar um punhado de recursos valiosos, por isso certifiquem-se que espreitam a secção de _leitura adicional_.

Obviamente, esta não será a única maneira de fazer as coisas e poderá ou não adequar-se ao vosso projeto. Sintam-se livres de o adaptar às vossas necessidades.

### Princípios chave

No final do dia, se há algum conceito que eu gostava que toda a gente retirasse, seria que **[Sass deve ser mantido o mais simples possível](https://www.sitepoint.com/keep-sass-simple/)**.

Graças às minhas experiências, tais como [operadores binários](https://github.com/KittyGiraudel/SassyBitwise), [iteradores e geradores](https://github.com/KittyGiraudel/SassyIteratorsGenerators) e [um interpretador de JSON](https://github.com/KittyGiraudel/SassyJSON) em Sass, temos todos uma boa ideia das capacidades deste pré-processador.

Apesar de tudo, CSS é uma linguagem simples. Sass, com o propósito de escrever CSS, não deverá tornar-se muito mais complexa que CSS normal. O [princípio KISS](https://en.wikipedia.org/wiki/KISS_principle) (_Keep It Simple Stupid_) é chave, aqui, e deverá manter a precedência sobre o [princípio DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (_Don’t Repeat Yourself_) na maior parte das situações.

Por vezes é preferível repetirmo-nos um pouco para manter o código em boas condições de manutenção, em vez de construir um sistema desnecessariamente complicado, convulso e impossível de manter devido à sua complexidade.

Permitam-me ainda citar novamente o [Harry Roberts](https://csswizardry.com), **pragmatismo vence sobre a perfeição**. A determinada altura, vão provavelmente dar por vocês a ir contra as regras aqui descritas. Se fizer sentido, se parecer a atitude correta, simplesmente façam-no. Código é o meio, e nunca o fim.

### Estendendo a diretriz

Uma grande parte deste guia de estilo é, basicamente, opinião. Mas, tenho lido e escrito Sass por muitos anos, até chegar a este ponto onde tenho muitos princípios para escrever uma folha de estilos limpa. No entanto, entendo que, ainda assim, isso pode não agradar todo mundo e é perfeitamente normal.

Contudo, acredito que diretrizes são feitas para serem expandidas. Expandindo a Sass Guidelines poderia ser tão simples quanto ter um documento dizendo que o código está seguindo instruções desta diretriz, exceto por algumas coisas. E em cada caso, regras específicas seriam explicadas abaixo.

Um exemplo de uma extensão de guia de estilos pode ser achada no [SassDoc repository](https://github.com/SassDoc/sassdoc/blob/master/GUIDELINES.md):

> [Esta](https://github.com/SassDoc/sassdoc/blob/master/GUIDELINES.md) é uma extensão para [Node Styleguide](https://github.com/felixge/node-style-guide) feita por Felix Geisendörfer. Qualquer coisa deste documento substitui o que poderia ser dito no Node Styleguide.

## Formatação e sintaxe

Se me perguntarem, diria que a primeira coisa que um guia de estilo deve ser capaz de nos dizer é descrição do aspecto visual que queremos para o nosso código.

Quando vários programadores estão responsáveis por escrever CSS simultaneamente nos mesmos projectos, é apenas uma questão de tempo até que um deles comece a escrever as coisas à sua maneira. Guias de estilo que promovam consistência não só previnem isto, mas ajudam também à leitura e manutenção do código.

Sucintamente, queremos que (desavergonhadamente inspirado nas [CSS Guidelines](https://cssguidelin.es/#syntax-and-formatting)):

-   dois (2) espaços de indentação, em vez de tabs;
-   idealmente, linhas de no máximo 80 caráteres
-   regras de CSS multi-linha devidamente escritas
-   uso significativo de espaço em branco

```
// Yep
.foo {
  display: block;
  overflow: hidden;
  padding: 0 1em;
}

// Nope
.foo {
    display: block; overflow: hidden;

    padding: 0 1em;
}
```

```
// Uma vez que Sass força estes padrões de indentação,
// Não há como errar aqui.
.foo
  display: block
  overflow: hidden
  padding: 0 1em
```

### Strings

Acreditem ou não, strings desempenham um papel muito importante tanto em ecosistemas CSS e Sass. A maior parte dos valores de CSS são medidas ou identificadores, por isso é bastante crucial seguir algumas regras.

#### Codificação

Para evitar algum eventual problema com codificação de carateres, é recomendado forçar o modo [UTF-8](https://pt.wikipedia.org/wiki/UTF-8) na principal [folhas de estilo](#ficheiro-principal), utilizando a directiva `@charset`. Certifiquem-se que é o primeiro elemento da folhas de estilo e que não existe mais nenhum caráter antes deste.

```
@charset 'utf-8';
```

```
@charset 'utf-8'
```

#### Aspas

CSS não necessita que strings apareçam entre aspas, nem mesmo as que contêm espaços. Peguemos no exemplo de font-family: não importa se utilizamos aspas no início e no fim.

Graças a isto, Sass _também_ não necessita que as strings sejam entre aspas. Melhor ainda (e _felizmente_), uma string entre aspas é estritamente equivalente à sua irmã gémea sem aspas (por ex., `'abc'` é estritamente igual a `abc`).

Dito isto, linguagens que não necessitam de aspas à volta de strings são uma minoria e, desta forma, **strings devem sempre ser escritas com aspas curvas simples (também chamadas plicas)** em Sass (as aspas simples `'` são mais fáceis de escrever do que as duplas `"` em teclados _qwerty_). Para além de consistência com outras linguagens, incluindo JavaScript, existem outros motivos para esta escolha:

-   nomes de cores são tratados como cores quando não possuem aspas, o que pode levar a conflitos;
-   a maior parte dos _highlighters_ de sintaxe dão problemas com strings sem aspas;
-   ajuda em geral à leitura;
-   não existe uma razão válida para não as usar;

```
// Yep
$direction: 'left';

// Nope
$direction: left;
```

```
// Yep
$direction: 'left'

// Nope
$direction: left
```

De acordo com as especificações CSS, a diretiva `@charset` deve ser declarada em aspas duplas para [ser considerada válida](https://www.w3.org/TR/css3-syntax/#charset-rule). Contudo, o Sass já faz isso quando está compilando CSS, então, a forma como você declarou não tem impacto, no resultado final. Portanto, podes usar aspas simples, mesmo para a `@charset`.

#### Strings como valores CSS

Valores específicos de CSS (identificadores), tais como `initial` ou `sans-serif` não necessitam de aspas. É verdade que a declaração `font-family: sans-serif` vai falhar silenciosamente porque o CSS está à espera de encontrar um indentificador, não uma string envolta em aspas. Deste modo, não utilizamos aspas nestes valores.

```
// Yep
$font-type: sans-serif;

// Nope
$font-type: 'sans-serif';

// Okay I guess
$font-type: unquote('sans-serif');
```

```
// Yep
$font-type: sans-serif

// Nope
$font-type: 'sans-serif'

// Okay I guess
$font-type: unquote('sans-serif')
```

Desta forma, podemos fazer uma distinção entre strings que pretendemos utilizar como valores de CSS (identificadores) como no exemplo anterior, e strings quando nos referimos aos tipos de dados em Sass, como por exemplo índices de mapas.

Não utilizamos aspas no primeiro, mas no segundo exemplo utilizamos aspas simples.

#### Strings com aspas

Se uma string contém uma ou várias aspas, vale a pena considerar envolver a string com aspas duplas (`"`), de modo a evitar fazer o `escaping` de carateres dentro da string.

```
// Okay
@warn 'You can\'t do that.';

// Okay
@warn "You can't do that.";
```

```
// Okay
@warn 'You can\'t do that.'

// Okay
@warn "You can't do that."
```

#### URLs

URLs devem ser envolvidos em aspas:

```
// Yep
.foo {
  background-image: url('/images/kittens.jpg');
}

// Nope
.foo {
  background-image: url(/images/kittens.jpg);
}
```

```
// Yep
.foo
  background-image: url('/images/kittens.jpg')

// Nope
.foo
  background-image: url(/images/kittens.jpg)
```

### Números

Em Sass, um número representa um tipo de dados que inclui tudo desde números sem unidades a medidas, a frequências, ângulos, e outros. Isto permite que cálculos sejam efetuados nestas medidas.

#### Zeros

Números devem mostrar zeros à esquerda da vírgula em valores abaixo de um (1). Nunca se deve mostrar zeros no final.

```
// Yep
.foo {
  padding: 2em;
  opacity: 0.5;
}

// Nope
.foo {
  padding: 2.0em;
  opacity: .5;
}
```

```
// Yep
.foo
  padding: 2em
  opacity: 0.5

// Nope
.foo
  padding: 2.0em
  opacity: .5
```

No Sublime Text e outros editores que permitem busca e substituição de expressões regulares, é muito fácil adicionar um zero à esquerda a quase todos (se não todos) números quebrados. Simplesmente, substitua `\s+\.(\d+)` por `0.$1`. Além disso, não esqueça o espaço antes do `0`.

#### Unidades

Quando estamos a lidar com medidas, um valor `0` nunca deve ter unidade.

```
// Yep
$length: 0;

// Nope
$length: 0em;
```

```
// Yep
$length: 0

// Nope
$length: 0em
```

Tome cuidado, pois, esta prática é limitada a cumprimentos, apenas. Ter um zero sem unidade de medida para uma propriedade de tempo (como `transition-delay`) não é permitido. Teoricamente, se um zero sem unidade de medida é especificado para uma duração, a declaração é considerada invalida e será descartada. Contudo, nem todos os navegadores são tão rigorosos, apesar de alguns serem. Resumindo a história: somente omita unidades de cumprimento.

O erro mais comum que me consigo lembrar no que diz respeito a números em Sass é pensar que as unidades representam `strings` que podem ser adicionadas livremente a um número. Enquanto isto pode parecer correto, não é como as unidades funcionam. Pensem em unidades como símbolos algébricos. Por exemplo, no mundo real, multiplicar 5 centímetros por 5 centímetros resulta em 25 centímetros quadrados. A mesma lógica aplica-se em Sass.

Para adicionar uma unidade a um número, devemos multiplicar este número por _1 unidade_.

```
$value: 42;

// Yep
$length: $value * 1px;

// Nope
$length: $value + px;
```

```
$value: 42

// Yep
$length: $value * 1px

// Nope
$length: $value + px
```

Reparem que adicionar _0 dessa mesma unidade_ também funciona, mas recomendo o primeiro método, uma vez que adicionar _0 unidades_ é algo confuso. Na verdade, quando tentamos converter um número para outra unidade comparável, adicionar 0 não irá funcionar. Leia mais sobre isso, [neste artigo](https://css-tricks.com/snippets/sass/correctly-adding-unit-number/).

```
$value: 42 + 0px;
// -> 42px

$value: 1in + 0px;
// -> 1in

$value: 0px + 1in;
// -> 96px
```

```
$value: 42 + 0px
// -> 42px

$value: 1in + 0px
// -> 1in

$value: 0px + 1in
// -> 96px
```

No final de contas, depende tudo do que estivermos a tentar obter. Lembrem-se apenas que adicionar o número-unidade como string não é uma boa prática.

Para remover a unidade de um valor, temos que dividi-lo por _uma unidade do seu tipo_.

```
$length: 42px;

// Yep
$value: $length / 1px;

// Nope
$value: str-slice($length + unquote(''), 1, 2);
```

```
$length: 42px

// Yep
$value: $length / 1px

// Nope
$value: str-slice($length + unquote(''), 1, 2)
```

Adicionar uma unidade como string a um número resulta numa string, prevenindo qualquer operação adicional no seu valor. Cortar a parte numérica de um número com uma unidade também resulta numa string, o que não é o desejado. [Use cumprimentos, não strings](https://kittygiraudel.com/2013/09/03/use-lengths-not-strings/).

#### Cálculos

**Cálculos numéricos de maior prioridade devem sempre estar presentes entre parênteses**. Isto não só melhora significativamente a sua leitura, como evita que aconteçam alguns casos extremos como forçar Sass a avaliar e computar o conteúdo entre parênteses.

```
// Yep
.foo {
  width: (100% / 3);
}

// Nope
.foo {
  width: 100% / 3;
}
```

```
// Yep
.foo
  width: (100% / 3)

// Nope
.foo
  width: 100% / 3
```

#### Números mágicos

“Números mágicos” (_magic numbers_) dizem respeito a um [termo antigo](https://en.wikipedia.org/wiki/Magic_number_\(programming\)#Unnamed_numerical_constants) computacional para _constante numérica não definida_. Basicamente, é um número aleatório que simplesmente parece _funcionar por magia_ num caso específico e que não tem qualquer lógica por detrás dele.

Escusado será dizer que **números mágicos são uma praga e devem ser evitados a todo o custo**. Quando não conseguirem encontrar uma explicação para um determinado número funcionar, escrevam pelo menos um comentário que explique como chegaram a ele e porque é que acham que ele funciona. Admitir que não sabemos porque algo funciona é sempre mais útil do que deixar o programador seguinte tentar adivinhar o que se passa, sem qualquer pista.

```
/**
 * 1. Número mágico. Este é o valor mais baixo que encontrei para
 * alinhar o topo de `.foo` com o elemento pai.
 * Idealmente devíamos corrigir isto.
 */
.foo {
  top: 0.327em; /* 1 */
}
```

```
/**
 * 1. Número mágico. Este é o valor mais baixo que encontrei para
 * alinhar o topo de `.foo` com o elemento pai.
 * Idealmente devíamos corrigir isto.
 */
.foo
  top: 0.327em /* 1 */
```

Sobre o tema, CSS-Tricks tem um [artigo maravilhoso](https://css-tricks.com/magic-numbers-in-css/) sobre números mágicos em CSS que eu te encorajo a ler.

### Cores

Cores ocupam um lugar muito importante em CSS. Naturalmente, Sass acaba por se tornar um aliado poderoso no que toca à manipulação de cores, especialmente porque providencia um punhado de [funções úteis para tal](https://sass-lang.com/documentation/Sass/Script/Functions.html).

Sass é tão bom na hora de manipular cores que artigos tem florescidos por toda parte da internet, exatamente sobre este tema. Por isso, posso recomendar algumas leituras:

-   [How to Programmatically Go From One Color to Another](https://kittygiraudel.com/2014/01/30/programmatically-go-from-one-color-to-another-with-sass/)
-   [Using Sass to Build Color Palettes](https://www.sitepoint.com/using-sass-build-color-palettes/)
-   [Dealing with Color Schemes in Sass](https://www.sitepoint.com/dealing-color-schemes-sass/)

#### Formatos de cores

De maneira a tornar cores em Sass o mais simples possível, o meu conselho é que respeitem a seguinte ordem de preferência para formatação de cores:

1.  [Anotação HSL](https://en.wikipedia.org/wiki/HSL_and_HSV);
2.  [Anotação RGB](https://en.wikipedia.org/wiki/RGB_color_model);
3.  Anotação hexadecimal (minúscula e encurtada).

Keywords de cores CSS não devem ser usadas, a não ser para uma rápida prototipagem. De fato, elas são palavras reais, mas algumas fazem um trabalho péssimo em descrever a cor que representam, especialmente para falantes não nativos. Desse modo, keywords não são perfeitamente semânticas. Por exemplo: `grey` é, na verdade, mais escura que `darkgrey`. Além disso, a confusão entre `grey` e `gray`, pode levar a usos inconsistentes desta cor.

A representação HSL não é somente a mais fácil para o cérebro humano compreender\[citation needed\], ela também facilita que autores das folhas de estilos troquem a cor ajustando matiz (hue), saturação e luminosidade (lightness), individualmente.

RGB tem a vantagem de mostrar de cara se uma cor é mais vermelha, verde ou azul. Portanto, isso pode ser melhor que HSL em algumas situações, especialmente quando é necessário um vermelho, verde ou azul puro. Contudo, isso não facilita a criação de uma cor à partir das três partes.

Finalmente, a notação hexadecimal é próxima do indecifrável para a mente humana. Use isso como um último recurso, se você precisar.

```
// Yep
.foo {
  color: hsl(0, 100%, 50%);
}

// Also yep
.foo {
  color: rgb(255, 0, 0);
}

// Meh
.foo {
  color: #f00;
}

// Nope
.foo {
  color: #FF0000;
}

// Nope
.foo {
  color: red;
}
```

```
.foo
  color: hsl(0, 100%, 50%)

// Also yep
.foo
  color: rgb(255, 0, 0)

// Nope
.foo
  color: #f00

// Nope
.foo
  color: #FF0000

// Nope
.foo
  color: red
```

Quando usarem a anotação HSL ou RGB, adicionem sempre um espaço simples depois da vírgula (`,`) e removam os espaços entre os parênteses (`(`, `)`) e o conteúdo.

```
// Yep
.foo {
  color: rgba(0, 0, 0, 0.1);
  background: hsl(300, 100%, 100%);
}

// Nope
.foo {
  color: rgba(0,0,0,0.1);
  background: hsl( 300, 100%, 100% );
}
```

```
// Yep
.foo
  color: rgba(0, 0, 0, 0.1)
  background: hsl(300, 100%, 100%)

// Nope
.foo
  color: rgba(0,0,0,0.1)
  background: hsl( 300, 100%, 100% )
```

#### Cores e variáveis

No caso de utilizarmos uma cor mais que uma vez, será provavelmente útil guardá-la numa variável cujo nome diga algo sobre essa cor.

```
$sass-pink: hsl(330, 50%, 60%);
```

```
$sass-pink: hsl(330, 50%, 60%)
```

Assim podemos usar esta variável onde for necessário. No entanto, se o seu uso estiver demasiado preso a um tema, eu não recomendaria utilizar a variável desta forma. Em vez disso, devemos guardá-la numa variável cujo nome explique como deve ser utilizada.

```
$main-theme-color: $sass-pink;
```

```
$main-theme-color: $sass-pink
```

Assim previne-se que a mudança de um tema leve a algo como `$sass-pink: blue`. [Este artigo](https://davidwalsh.name/sass-color-variables-dont-suck) faz um bom trabalho ao explicar por que o pensamento de suas variáveis ​​de cores é importante.

#### Clarear e Escurecer cores

Tanto o clarear [`lighten`](https://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method) como o escurecer [`darken`](https://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method) representam funções que permitem manipular a luz de uma cor no espaço HSL adicionando ou subtraindo ao valor do espaço HSL. Basicamente, representam atalhos para o parâmetro `$lightness` do método de ajuste de cor [`adjust-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#adjust_color-instance_method).

É importante referir que estas funções muitas vezes não geram os resultados que se esperaria. Por outro lado, a função de mistura [`mix`](https://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method) é uma boa forma de escurecer ou clarear uma cor misturando-a com branco ou preto.

A vantagem de usar a `mix` em vez das primeiras funções mencionadas é que esta fará com que a cor tenda progressivamente para preto (ou branco) à medida que subtraímos a proporção da cor, enquanto que `darken` e `lighten` irão rapidamente esgotar a cor para os extremos de branco ou preto.

  

Ilustração da diferença entre `lighten`/`darken` e `mix` por [KatieK](https://codepen.io/KatieK2/pen/tejhz/)

Se não quiserem escrever a função `mix` todas as vezes, podem criar duas funções fáceis-de-usar `tint` e `shade` (que já fazem parte de [Compass](http://compass-style.org/reference/compass/helpers/colors/#shade)) que fazem essencialmente o mesmo:

```
/// Clarear ligeiramente uma cor
/// @access public
/// @param {Color} $color - cor
/// @param {Number} $percentage - percentagem da `$color` na cor devolvida
/// @return {Color}
@function tint($color, $percentage) {
  @return mix($color, white, $percentage);
}

/// Escurecer ligeiramente uma cor
/// @access public
/// @param {Color} $color - cor
/// @param {Number} $percentage - percentagem da `$color` na cor devolvida
/// @return {Color}
@function shade($color, $percentage) {
  @return mix($color, black, $percentage);
}
```

```
/// Clarear ligeiramente uma cor
/// @access public
/// @param {Color} $color - cor
/// @param {Number} $percentage - percentagem da `$color` na cor devolvida
/// @return {Color}
@function tint($color, $percentage)
  @return mix($color, white, $percentage)

/// Escurecer ligeiramente uma cor
/// @access public
/// @param {Color} $color - cor
/// @param {Number} $percentage - percentagem da `$color` na cor devolvida
/// @return {Color}
@function shade($color, $percentage)
  @return mix($color, black, $percentage)
```

A função [`scale-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method) permite efetuar um escalamento das propriedades mais fluído tendo em conta o quão alto ou baixo o seu valor já é. Deverá oferecer resultados que são tão agradáveis como o `mix` mas com uma convenção mais clara. O fator de escala não é exactamente o mesmo, no entanto.

### Listas

Listas são o equivalente de arrays. Uma lista é uma estrutura de dados _“flat”_ (ao contrário de [mapas](#mapas)) usada para guardar valores de qualquer tipo (incluindo listas, dando origem a listas aninhadas).

As listas devem respeitar as seguintes orientações:

-   sejam uma linha ou várias;
-   necessariamente em várias linhas se forem demasiado longas para caber numa linha de 80 carateres;
-   a não ser para fins de CSS, sempre separadas por vírgula;
-   sempre envolvidas em parêntesis;
-   finalizadas com um ponto final em multi-linha.

```
// Yep
$font-stack: ('Helvetica', 'Arial', sans-serif);

// Yep
$font-stack: (
  'Helvetica',
  'Arial',
  sans-serif,
);

// Nope
$font-stack: 'Helvetica' 'Arial' sans-serif;

// Nope
$font-stack: 'Helvetica', 'Arial', sans-serif;

// Nope
$font-stack: ('Helvetica', 'Arial', sans-serif,);
```

```
// Yep
$font-stack: ('Helvetica', 'Arial', sans-serif)

// Nope (not supported)
$font-stack: (
  'Helvetica',
  'Arial',
  sans-serif,
)

// Nope
$font-stack: 'Helvetica' 'Arial' sans-serif

// Nope
$font-stack: 'Helvetica', 'Arial', sans-serif

// Nope
$font-stack: ('Helvetica', 'Arial', sans-serif,)
```

Ao adicionar novos itens a uma lista, usar sempre a API fornecida. Nunca tentar adicionar novos itens manualmente.

```
$shadows: (0 42px 13.37px hotpink);

// Yep
$shadows: append($shadows, $shadow, comma);

// Nope
$shadows: $shadows, $shadow;
```

```
$shadows: (0 42px 13.37px hotpink)

// Yep
$shadows: append($shadows, $shadow, comma)

// Nope
$shadows: $shadows, $shadow
```

[Neste artigo](https://kittygiraudel.com/2013/07/15/understanding-sass-lists/), eu vou a fundo de vários truques e dicas para lidar e manipular listas corretamente, no Sass.

### Mapas

Com Sass, autores de folhas de estilo podem definir mapas - o termo do Sass para arrays associativos, mapas de hash ou mesmo objectos em JavaScript. Um mapa é uma estrutura de dados que associa chaves a valores. Tanto chaves quanto valores podem ser de qualquer tipo de dados, incluindo mapas, embora eu não o recomende usar tipos de dados complexos como chaves, para que matenhamos a sanidade.

Mapas devem ser escritos da seguinte forma:

-   espaços depois dos dois pontos (`:`);
-   parêntesis de abertura (`(`) na mesma linha dos dois pontos (`:`);
-   **chaves com aspas** se forem strings (o que representa 99% dos casos);
-   cada par chave/valor na sua própria linha;
-   vírgula (`,`) após cada par chave/valor;
-   **vírgula final** (`,`) no último item, para que seja mais fácil adicionar, remover ou reordenar items;
-   parêntesis de fecho (`)`) na sua própria linha;
-   não colocar um espaço um um caractér de nova linha entre o parêntesis de fecho (`)`) e o ponto e vírgula (`;`).

Ilustração:

```
// Yep
$breakpoints: (
  'small': 767px,
  'medium': 992px,
  'large': 1200px,
);

// Nope
$breakpoints: ( small: 767px, medium: 992px, large: 1200px );
```

```
// Yep
$breakpoints: ('small': 767px, 'medium': 992px, 'large': 1200px,)

// Nope
$breakpoints: ( 'small': 767px, 'medium': 992px, 'large': 1200px )

// Nope
$breakpoints: (small: 767px, medium: 992px, large: 1200px,)

// Nope (since it is not supported)
$breakpoints: (
  'small': 767px,
  'medium': 992px,
  'large': 1200px,
)
```

Textos sobre mapas Sass são muitos, dado o quão esperada essa feature foi esperada. Aqui vai três, dos quais eu recomendo: [Using Sass Maps](https://www.sitepoint.com/using-sass-maps/), [Extra Map functions in Sass](https://www.sitepoint.com/extra-map-functions-sass/), [Real Sass, Real Maps](http://blog.grayghostvisuals.com/sass/real-sass-real-maps/).

### Conjunto de regras para CSS

A esta altura, isto é essencialmente uma revisão do que toda a gente sabe, mas é assim que um conjunto de regras para CSS deve ser escrito (pelo menos, de acordo com a maioria dos guias de orientação, incluindo [CSS Guidelines](https://cssguidelin.es/#anatomy-of-a-ruleset)):

-   seletores relacionados na mesma linha; seletores sem relação numa nova linha;
-   chaveta de abertura (`{`) separada do último seletor por um espaço único;
-   cada declaração na sua própria linha;
-   um espaço a seguir aos dois pontos (`:`);
-   um ponto e vírgula terminal (`;`) no final de cada declaração;
-   chaveta de fecho (`}`) na sua própria linha;
-   uma linha em branco após a chaveta de fecho (`}`).

Ilustração:

```
// Yep
.foo, .foo-bar,
.baz {
  display: block;
  overflow: hidden;
  margin: 0 auto;
}

// Nope
.foo,
.foo-bar, .baz {
    display: block;
    overflow: hidden;
    margin: 0 auto }
```

```
// Yep
.foo, .foo-bar,
.baz
  display: block
  overflow: hidden
  margin: 0 auto

// Nope
.foo,
.foo-bar, .baz
    display: block
    overflow: hidden
    margin: 0 auto
```

Acrescentando às regras relacionadas com CSS, queremos prestar atenção a:

-   variáveis locais declaradas antes de qualquer outra declaração, separadas de declarações seguintes por uma linha em branco;
-   chamadas de mixins sem `@content` feitas antes de qualquer declaração;
-   seletores aninhados sempre precedidos por uma linha em branco;
-   chamadas de mixins com `@content` feitas depois de qualquer seletor aninhado;
-   não adicionar uma linha em branco depois da chaveta de fecho (`}`).

Ilustração:

```
.foo, .foo-bar,
.baz {
  $length: 42em;

  @include ellipsis;
  @include size($length);
  display: block;
  overflow: hidden;
  margin: 0 auto;

  &:hover {
    color: red;
  }

  @include respond-to('small') {
    overflow: visible;
  }
}
```

```
.foo, .foo-bar,
.baz
  $length: 42em

  +ellipsis
  +size($length)
  display: block
  overflow: hidden
  margin: 0 auto

  &:hover
    color: red

  +respond-to('small')
    overflow: visible
```

### Ordenar as declarações

Não me ocorrem muitos tópicos em que as opiniões sejam tão divididas como são em relação a ordenar declarações em CSS. Na verdade, existem duas facções:

-   manter a ordem alfabética;
-   ordenar declarações por tipo (position, display, cores, tipo de letra, outros).

Existem prós e contras em ambas as abordagens. Por um lado, a ordem alfabética é universal (pelo menos em todos os idiomas que usam o alfabeto latino), portanto não existe dúvida quanto a colocar uma propriedade antes de outra. No entanto, parece-me bastante estranho ver propriedades como `bottom` e `top` separadas uma da outra. Por que motivo apareceriam animações antes do tipo `display`? Há imensas peculiaridades na ordenação alfabética.

```
.foo {
  background: black;
  bottom: 0;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
  height: 100px;
  overflow: hidden;
  position: absolute;
  right: 0;
  width: 100px;
}
```

```
.foo
  background: black
  bottom: 0
  color: white
  font-weight: bold
  font-size: 1.5em
  height: 100px
  overflow: hidden
  position: absolute
  right: 0
  width: 100px
```

Por outro lado, ordenar propriedades por tipo faz todo o sentido. Todas as declarações relacionadas com tipos de letra estão próximas, `top` e `bottom` estão juntas e ler um conjunto de regras quase se assemelha a ler uma pequena história. Mas a não ser que te mantenhas fiel a algumas convenções, como [Idiomatic CSS](https://github.com/necolas/idiomatic-css), há imenso espaço para interpretação própria nesta forma de fazer as coisas. Onde ficaria `white-space`: `font` ou `display`? Onde é que `overflow` pertence exactamente? Qual é a ordem das declarações dentro de um grupo (poderia ser ordem alfabética; ah, a ironia)?

```
.foo {
  height: 100px;
  width: 100px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  right: 0;
  background: black;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
}
```

```
.foo
  height: 100px
  width: 100px
  overflow: hidden
  position: absolute
  bottom: 0
  right: 0
  background: black
  color: white
  font-weight: bold
  font-size: 1.5em
```

Há ainda outro tipo de ordenação interessante chamado [Concentric CSS](https://github.com/brandon-rhodes/Concentric-CSS), que parece ser também bastante popular. Basicamente, o Concentric CSS baseia-se no box-model para definir uma ordem: começa no exterior, move-se para o interior.

```
.foo {
  width: 100px;
  height: 100px;
  position: absolute;
  right: 0;
  bottom: 0;
  background: black;
  overflow: hidden;
  color: white;
  font-weight: bold;
  font-size: 1.5em;
}
```

```
.foo
  width: 100px
  height: 100px
  position: absolute
  right: 0
  bottom: 0
  background: black
  overflow: hidden
  color: white
  font-weight: bold
  font-size: 1.5em
```

Devo dizer que pessoalmente não me consigo decidir. Uma [recente sondagem no CSS-Tricks](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/) apurou que mais de 45% dos programadores ordenam as suas declarações por tipo, contra 14% que o fazem alfabeticamente. Há ainda 39% que o fazem de uma forma totalmente aleatória, incluindo eu próprio.

  ![Gráfico demonstrativo de como os programadores ordenam as suas declarações de CSS ](https://sass-guidelin.es/assets/images/css-order-chart.png)

Gráfico demonstrativo de como os programadores ordenam as suas declarações de CSS

Por esse motivo, não vou impor uma escolha neste guia de estilos. Escolham aquele que preferirem, desde que sejam consistentes ao longo das vossas folhas de estilo (isto é, não escolham a opção _aleatória_).

Um [estudo recente](https://web.archive.org/web/20190618180712/http://peteschuster.com/2014/12/reduce-file-size-css-sorting/) mostra que usar [CSS Comb](https://github.com/csscomb/csscomb.js) (que por sua vez usa [ordenação por tipo](https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json)) para ordenar declarações em CSS acaba por diminuir o tamanho média dos ficheiros comprimidos com Gzip em cerca de 2.7%, comparando com 1.3% quando ordenados alfabeticamente.

### Seletores aninhados

Uma das características do Sass que está a ser extremamente mal usada por muitos programadores são os _seletores aninhados_. Alinhar seletores oferece aos autores de folhas de estilo uma forma de computar seletores longos, aninhando seletores mais pequenos dentro de outros.

#### Regra geral

Por exemplo, o seguinte código aninhado em Sass:

```
.foo {
  .bar {
    &:hover {
      color: red;
    }
  }
}
```

```
.foo
  .bar
    &:hover
      color: red
```

… vai gerar este CSS:

```
.foo .bar:hover {
  color: red;
}
```

Do mesmo modo, desde o Sass 3.3 que é possível usar uma referência ao seletor atual (`&`) para gerar seletores avançados. Por exemplo:

```
.foo {
  &-bar {
    color: red;
  }
}
```

```
.foo
  &-bar
    color: red
```

… vai gerar este CSS:

```
.foo-bar {
  color: red;
}
```

```
.foo-bar
  color: red
```

Este método é geralmente usado em conjunto com [a nomenclatura BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) para gerar os seletores `.block__element` e `.block--modifier` baseados no seletor original (neste caso, `.block`).

Embora pareça anedótico, gerar novos seletores a partir da referência ao seletor atual (`&`) torna os seletores impossíveis de procurar no código, já que não existem per se.

O problema com aninhar seletores é que, em última instância, torna o código mais difícil de ler. O leitor tem de mentalmente computador o seletor resultante a partir dos níveis de indentação; nem sempre é óbvio o que é que o CSS resultante acabará por ser.

Este argumento torna-se ainda mais verdadeiro à medida que os seletores se tornam mais longos e as referências ao seletor atual (`&`) mais frequentes. A dada altura, o risco de perder o fio à meada e deixar de perceber o que se passa e onde é tão alto que deixa de valer a pena.

Para evitar tais situações, nós falamos muito sobre a [Inception rule](https://thesassway.herokuapp.com/beginner/the-inception-rule) alguns anos atrás, aconselhando contra aninhamento de mais de três leveis a fundo, usando como referência o filme “Inception” de Christopher Nolan. Além do mais, eu seria mais dramático e recomendaria **evitar aninhamento de seletores, o máximo possível**.

Enquanto há, obviamente, algumas exceções para esta regra (como nós vamos ver na próxima seção), esta opinião parece ser a mais popular. Você pode ler sobre isso mais em detelhes no [Beware of Selector Nesting](https://www.sitepoint.com/beware-selector-nesting-sass/) e [Avoid nested selectors for more modular CSS](https://thesassway.herokuapp.com/intermediate/avoid-nested-selectors-for-more-modular-css).

#### Exceções

Para começar, é permitido e até aconselhado aninhar pseudo-classes e pseudo-elementos no seletor inicial.

```
.foo {
  color: red;

  &:hover {
    color: green;
  }

  &::before {
    content: 'pseudo-element';
  }
}
```

```
.foo
  color: red

  &:hover
    color: green

  &::before
    content: 'pseudo-element'
```

Aninhar seletores em pseudo-classes e pseudo-elementos não só faz sentido (porque lida com seletores intimamente ligados), mas também ajuda a manter tudo relacionado com um determinado componente num único sítio.

Além disso, quando se usam classes de estado independentes de um componente, como `.is-active`, é perfeitamente aceitável aninhá-las sob o selctor do componente, de modo a manter tudo limpo.

```
.foo {
  // …

  &.is-active {
    font-weight: bold;
  }
}
```

```
.foo
  // …

  &.is-active
    font-weight: bold
```

Por fim, quando se estiliza um elemento só porque ele está dentro de outro elemento específico, é também aceitável aninhá-lo, de modo a manter tudo sobre um determinado componente no mesmo sítio.

```
.foo {
  // …

  .no-opacity & {
    display: none;
  }
}
```

```
.foo
  // …

  .no-opacity &
    display: none
```

Como tudo, as especificidades são de certa forma irrelevantes, o importante é a consistência. Se te sentes perfeitamente confiante com seletores aninhados, então usa seletores aninhados. Certifica-te apenas que toda a tua equipa está confortável com isso.

## Convenções de nomenclatura

Nesta secção, não iremos lidar com as melhores convenções de nomenclatura para manutenção e escalabilidade; não só isso apenas vos diz respeito, como também está fora do âmbito de um guia de estilo de Sass. Eu sugiro os recomendados por [CSS Guidelines](https://cssguidelin.es/#naming-conventions).

Existem algumas coisas às quais podem dar nome em Sass, e é importante nomeá-las corretamente para que toda a base de código pareça consistente e fácil de ler:

-   variáveis;
-   funções;
-   _mixins_.

_Placeholders_ de Sass são deliberadamente omitidos desta lista visto que podem ser considerados selectores normais de CSS, seguindo assim o mesmo padrão de nomenclatura como classes.

Em relação às variáveis, funções e _mixins_, mantemos algo bastante semelhante a CSS: **minúsculas delimitadas por hífens**, e acima de tudo significativos.

```
$vertical-rhythm-baseline: 1.5rem;

@mixin size($width, $height: $width) {
  // …
}

@function opposite-direction($direction) {
  // …
}
```

```
$vertical-rhythm-baseline: 1.5rem

=size($width, $height: $width)
  // …

@function opposite-direction($direction)
  // …
```

### Constantes

Se por acaso são programadores de _frameworks_ ou bibliotecas, poderão encontrar-se a lidar com variáveis que não é suposto serem alteradas em qualquer circunstância: constantes. Infelizmente (ou felizmente?), Sass não fornece nenhuma forma de definir tais entidades, por isso temos que ficar pelas rigorosas convenções de nomenclatura de forma a nos darmos a entender.

Tal como para várias linguagens, eu sugiro variáveis em maiúsculas e delimitadas por subtraços (\_) quando são constantes. Não só é uma convenção muito antiga, mas também contrasta bem com as habituais variáveis em minúsculas e separadas por hífens.

```
// Yep
$CSS_POSITIONS: (top, right, bottom, left, center);

// Nope
$css-positions: (top, right, bottom, left, center);
```

```
// Yep
$CSS_POSITIONS: (top, right, bottom, left, center)

// Nope
$css-positions: (top, right, bottom, left, center)
```

Se você realmente quer brincar com essas ideias de constantes no Sass, deverias ler [esse artigo dedicado](https://www.sitepoint.com/dealing-constants-sass/).

### Namespace

Se tencionam distribuir o vosso código Sass, no caso de uma biblioteca, uma _framework_, um sistema de grelhas ou o que seja, talvez queiram considerar colocar todas as vossas variáveis, funções, _mixins_ e _placeholders_ no seu próprio _namespace_, para que não entrem em conflito com o código de alguém.

Por exemplo, se trabalharem num projecto chamado _Sassy Unicorn_ que se destina a ser distribuído, poderiam considerar usar `su-` como _namespace_. É específico o suficiente para prevenir colisões de nomes e curto o suficiente para não ser maçador a escrever.

```
$su-configuration: ( … );

@function su-rainbow($unicorn) {
  // …
}
```

```
$su-configuration: ( … )

@function su-rainbow($unicorn)
  // …
```

[Kaelig](https://kaelig.fr) tem [um artigo muito perpicaz sobre namespace CSS global](https://blog.kaelig.fr/post/44554267597/please-respect-the-global-css-namespace), no caso deste tópico seja de interesse para você.

De notar que _namespacing_ automático é definitivamente um objectivo de design para a próxima reformulação do `@import` de Sass 4.0. À medida que tal se aproxima da sua concretização, será cada vez menos útil fazer _namespacing_ manual; eventualmente, bibliotecas manualmente _namespaced_ poderão realmente ser mais difíceis de usar.

## Arquitetura

Criar a arquitetura de um projeto de CSS é uma das coisas mais difíceis que se pode fazer durante a vida de um projeto. Manter essa arquitetura constante e significativa é ainda mais difícil.

Felizmente, um dos benefícios principais de usar um pré-processador de CSS é ter a habilidade de dividir a nossa base de código em vários ficheiros sem ter impacto na performance (como a diretiva de CSS `@import` fazia). Graças à sobrecarga da diretiva `@import` no Sass, é perfeitamente seguro (e até recomendado) usar os ficheiros necessários na fase de desenvolvimento, todos estes compilados numa única folha de estilo quando o projeto for para produção.

Em cima disso, não posso salientar o suficiente a necessidade de pastas, mesmo em pequenos projetos. Em casa, não deixas todas as folhas de papel na mesma caixa. Tens uma para os papéis da casa, uma para documentos do banco, uma para contas e assim em diante. Não há razão para fazeres de maneira diferente quando estás a estruturar um projeto de CSS. Separa o teu código em pastas com nomes compreensíveis para depois ser fácil encontrar qualquer código quando mais tarde tiveres que voltar ao projeto.

Há muitas [arquiteturas populares](https://www.sitepoint.com/look-different-sass-architectures/) para projectos de CSS: [OOCSS](https://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/), [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), arquitetura usada no [Bootstrap](https://getbootstrap.com/), arquitetura usada no [Foundation](https://get.foundation/)… Todas têm os seus méritos, prós e contras.

Eu uso uma abordagem que acaba por ser muito parecida com [SMACSS](http://smacss.com/) de [Jonathan Snook](https://snook.ca/), e que se foca em manter as coisas simples e óbvias.

Eu aprendi que a arquitetura é muito especifica para o projeto. Estejam à vontade para ignorarem ou adaptarem a solução proposta para lidarem com um sistema que se adapta melhor às vossas necessidades.

### Componentes

Há uma grande diferença entre fazer algo _funcionar_ e fazer algo _bom_. Mais uma vez, CSS é uma linguagem muito desorganizada \[carece de fontes\]. Quanto menos CSS tiverem, melhor. Nós não queremos lidar com megabytes de CSS. Para manter as nossas folhas de estilo pequenas e efecientes—e isto não será nenhuma surpresa para ti— é normalmente uma boa ideia pensar numa interface como uma coleção de componentes.

Componentes podem ser qualquer coisa desde que:

-   façam uma e apenas uma coisa;
-   sejam reutilizáveis e usados por todo o projeto;
-   sejam independentes.

Por exemplo um formulário de pesquisa deve ser tratado como um componente. Deverá ser reutilizável, em diferentes posições, páginas e em situações diversas. Não deve depender da sua posição na DOM (rodapé, barra lateral, conteúdo principal…).

A maior parte de qualquer interface pode ser pensada como pequenos componentes e eu recomendo que fique com este paradigma. Isto vai não só diminuir a quantidade de CSS necessário para um projeto completo, mas também acaba por ser muito mais fácil do que manter uma desorganização onde está tudo junto.

### Estrutura de componentes

Idealmente, componentes devem existir em seus próprios partials Sass (dentro da pasta `components/`, como descrito no [padrão 7-1](#o-padro-7-1)), por exemplo `components/_button.scss`. Os estilos descritos em cada arquivo de componente devem se preocupar com:

-   O estilo do próprio componente;
-   O estilo dos variantes, modificadores e/ou estados do componente;
-   Os estilos dos descendentes (elementos filhos) do componente, se necessário.

Se você quer que seus componentes sejam capazes de serem tematizados externamente (por exemplo: à partir um tema dentro da pasta `themes/`), limite as declaração à apenas estilos estruturais, como dimensões (largura/altura), padding, margin, alignment e etc. Exclua estilos como cores, sombras, fontes, background e etc.

Um partial pode incluir variáveis, placeholder, mixins e funções específicas para componentes. No entanto, mantenha em mente que você deve evitar ficar referenciando (importando) arquivos de componentes de outros arquivos de componentes, já que isso pode fazer o gráfico de dependencia do seu projeto uma bagunça e incapaz de se manter.

Aqui tem um exemplo de um componente partial de botão:

```
// Button-specific variables
$button-color: $secondary-color;

// … include any button-specific:
// - mixins
// - placeholders
// - functions

/**
 * Buttons
 */
.button {
  @include vertical-rhythm;
  display: block;
  padding: 1rem;
  color: $button-color;
  // … etc.

  /**
   * Inlined buttons on large screens
   */
  @include respond-to('medium') {
    display: inline-block;
  }
}

/**
 * Icons within buttons
 */
.button > svg {
  fill: currentcolor;
  // … etc.
}

/**
 * Inline button
 */
.button--inline {
  display: inline-block;
}
```

```
// Button-specific variables
$button-color: $secondary-color

// ... include any button-specific:
// - mixins
// - placeholders
// - functions

/**
 * Buttons
 */
.button
  +vertical-rhythm
  display: block
  padding: 1rem
  color: $button-color
  // ... etc.

  /**
   * Inlined buttons on large screens
   */
  +respond-to('medium')
    display: inline-block
}

/**
 * Icons within buttons
 */
.button > svg
  fill: currentcolor
  // ... etc.

/**
 * Inline button
 */
.button--inline
  display: inline-block
```

Agradeço ao [David Khourshid](https://twitter.com/davidkpiano) por sua ajuda e expertise, nesta seção.

### O padrão 7-1

Vamos então voltar à arquitetura, ok? Eu normalmente uso o que chamo _O padrão 7-1_: 7 pastas, 1 ficheiro. Basicamente, tudo o que tens são ficheiros parciais colocados em 7 pastas diferentes, e um único ficheiro na raiz do projeto (normalmente chamado `main.scss`) que importa todos os ficheiros parciais para serem compilados numa única folha de estilo de CSS.

-   `base/`
-   `components/`
-   `layout/`
-   `pages/`
-   `themes/`
-   `abstracts/`
-   `vendors/`

E claro:

-   `main.scss`

Se você está querendo usar o padrão 7-1, existe um [boilerplate](https://github.com/KittyGiraudel/sass-boilerplate) pronto, no Github. Ele deve ter tudo que você precisa para começar essa arquitetura.

  

Fundo de parede por [Julien He](https://twitter.com/julien_he)

Idealmente, teríamos algo como:

```
sass/
|
|– abstracts/
|   |– _variables.scss    # Variáveis Sass
|   |– _functions.scss    # Funções Sass
|   |– _mixins.scss       # Mixins Sass
|   |– _placeholders.scss # Placeholders Sass
|
|- base/
|   |- _reset.scss        # Reset
|   |- _typography.scss   # Regras de Tipografia
|   …                     # Etc.
|
|- components/
|   |- _buttons.scss      # Botões
|   |- _carousel.scss     # Carossel
|   |- _cover.scss        # Cover
|   |- _dropdown.scss     # Dropdown
|   …                     # Etc.
|
|- layout/
|   |- _navigation.scss   # Navegação
|   |- _grid.scss         # Grelha
|   |- _header.scss       # Cabeçalho
|   |- _footer.scss       # Rodapé
|   |- _sidebar.scss      # Barra Lateral
|   |- _forms.scss        # Formulários
|   …                     # Etc.
|
|- pages/
|   |- _home.scss         # Estilos especificos à página Inicial
|   |- _contact.scss      # Estilos especificos à página de Contacto
|   …                     # Etc.
|
|- themes/
|   |- _theme.scss        # Tema Padrão
|   |- _admin.scss        # Tema de Administração
|   …                     # Etc.
|
|- utils/
|   |- _variables.scss    # Variáveis
|   |- _functions.scss    # Funções
|   |- _mixins.scss       # Mixins
|   |- _helpers.scss      # Auxiliares de classes e placeholders
|
|- vendors/
|   |– _bootstrap.scss    # Bootstrap
|   |– _jquery-ui.scss    # jQuery UI
|   …                     # Etc.
|
`– main.scss              # Principal ficheiro de Sass
```

Os ficheiros seguem as mesma convenções de nome descritas acima: são delimitados com um hífen.

#### Pasta Base

A pasta `base/` contém o que nós podemos chamar de código padrão para o projeto. Aqui podemos encontrar um ficheiro de reset, algumas regras tipográficas e provavelmente uma folha de estilo (gosto de chamar `_base.scss`), que define alguns estilos padrão para elementos de HTML mais usados.

-   `_base.scss`
-   `_reset.scss`
-   `_typography.scss`

Se seu projeto usa _muitas_ animações CSS, você deve considerar adicionar um arquivo `\_animations.scss` nele, contendo as definições dos `@keyframes` de todas suas animações. No entanto, se você só usa de vez em quando, coloque-as junto dos seletores que usam elas.

#### Pasta Layout

A pasta `layout/` contêm tudo que é necessário para criar o layout do site ou aplicação. Esta pasta contêm as folhas de estilo para as partes principais do site (cabeçalho, rodapé, navegação, barra lateral…), a grelha ou mesmo o CSS de todos os formulários.

-   `_grid.scss`
-   `_header.scss`
-   `_footer.scss`
-   `_sidebar.scss`
-   `_forms.scss`
-   `_navigation.scss`

A pasta `layout/` também pode ser chamada `partials/`, sendo isto uma questão de preferência.

#### Pasta Components

Para componentes mais pequenos, há a pasta `components/`. Enquanto a pasta `layout/`é _macro_ (definindo a estrutura global), a pasta `components/` é mais focada em módulos. Contêm todo o tipo de módulos específicos como um slider, um carregador e tudo que seja desse tipo. Há normalmente imensos ficheiros na pasta `components/` tendo em conta que todo o site/aplicação deverá ser constituído por pequenos módulos.

-   `_media.scss`
-   `_carousel.scss`
-   `_thumbnails.scss`

A pasta `components/` também se poderá chamar `modules/`, sendo isto uma questão de preferência.

#### Pasta Pages

Se tiveres estilos específicos a páginas, o melhor será colocá-las na pasta `pages/`, num ficheiro com o nome da página. Por exemplo, não deixa de ser comum ter estilos muito específicos para a página inicial que criam a necessidade de ter um `_home.scss` na pasta `pages/`.

-   `_home.scss`
-   `_contact.scss`

Dependendo do processo de desenvolvimento estes ficheiros podem ser chamados individualmente para evitar que eles se juntem com outros quando todas as folhas de estilo se juntam. Na realidade é uma questão de preferência.

#### Pasta Themes

Em grandes sites ou aplicações, é comum existirem vários temas. Há certamente diversas maneira de lidar com temas mas eu pessoalmente gosto de colocar tudo numa pasta com o nome `themes/`.

-   `_theme.scss`
-   `_admin.scss`

Isto é algo muito específico a cada projeto e em muitos deles podem nem existir a necessidade.

#### Pasta Abstracts

A pasta de `/abstracts` guarda todas as ferramentas e auxiliares de SASS usados por todo o projeto. Todas as funções globais, mixins e placeholders devem ser colocados nesta pasta.

A regra desta pasta é que não deve produzir uma única linha de CSS se for compilada sozinha. Tudo o que está aqui deverá ser nada mais que auxiliares.

-   `_variables.scss`
-   `_mixins.scss`
-   `_functions.scss`
-   `_placeholders.scss`

Quando trabalhamos em um projeto muito grande e com muitos utilitários abstratos, pode ser interessante agrupá-los por assunto invés de tipo, por exemplo: tipografia (`_tipografia.scss`), tema (`tema.scss`), etc. Cada arquivo contendo os auxiliares relacionados ao assunto: variáveis, funções, mixins e placeholders. Fazendo de tal maneira, o código fica mais fácil de ser lido e mantido, especialmente quando os arquivos estão ficando muito grandes.

A pasta `abstracts/` também pode ser chamada de `utilities/` ou `helpers/`, sendo uma questão de preferência.

#### Pasta Vendors

E por fim, a maioria dos projetos irão ter uma pasta `vendors/` que vai conter todo o CSS usado por biblioteca e _frameworks_ externas - Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered, e por ai. Por todos estes componentes na mesma pasta é uma boa maneira de dizer “Hey, este código não é meu, não o escrevi, não é a minha responsabilidade”.

-   `_normalize.scss`
-   `_bootstrap.scss`
-   `_jquery-ui.scss`
-   `_select2.scss`

Se tiveres que substituir uma secção de alguma destas extensões, eu recomendo criar um oitava pasta chamada `vendors-extensions/` na qual estarão ficheiros com os mesmos nomes dos quais estás a substituir.

Por exemplo, `vendors-extensions/_boostrap.scss` é um ficheiro que contém todas as regras de CSS que tiveste que declarar de novo por cima do CSS padrão do Bootstrap. Isto é para evitar editar os ficheiros originais das extensões, o que normalmente não é uma boa ideia.

#### Ficheiro Principal

O ficheiro principal (normalmente chamado `main.scss`) deverá ser o único ficheiro de SASS que não começa com um underscore. Este ficheiro não deve conter nada mais que `@import` e comentários.

Os ficheiros devem ser importados de acordo com a pasta onde estão, uma depois da outra na seguinte ordem:

1.  `abstracts/`
2.  `vendors/`
3.  `base/`
4.  `layout/`
5.  `components/`
6.  `pages/`
7.  `themes/`

De maneira a preservar a legibilidade, o ficheiro principal deverá seguir as seguintes diretrizes:

-   um ficheiro por `@import`;
-   um `@import`por linha;
-   não colocar linha de espaço entre importações da mesma pasta;
-   uma linha de espaço depois da última importação de uma pasta;
-   extensões e underscores antes do nome devem ser omitidos.

```
@import 'abstracts/variables';
@import 'abstracts/functions';
@import 'abstracts/mixins';
@import 'abstracts/placeholders';

@import 'vendors/bootstrap';
@import 'vendors/jquery-ui';

@import 'base/reset';
@import 'base/typography';

@import 'layout/navigation';
@import 'layout/grid';
@import 'layout/header';
@import 'layout/footer';
@import 'layout/sidebar';
@import 'layout/forms';

@import 'components/buttons';
@import 'components/carousel';
@import 'components/cover';
@import 'components/dropdown';

@import 'pages/home';
@import 'pages/contact';

@import 'themes/theme';
@import 'themes/admin';
```

```
@import vendors/bootstrap
@import vendors/jquery-ui

@import utils/variables
@import utils/functions
@import utils/mixins
@import utils/placeholders

@import base/reset
@import base/typography

@import layout/navigation
@import layout/grid
@import layout/header
@import layout/footer
@import layout/sidebar
@import layout/forms

@import components/buttons
@import components/carousel
@import components/cover
@import components/dropdown

@import pages/home
@import pages/contact

@import themes/theme
@import themes/admin
```

Existe outra maneira de importar parciais que também considero válida. O lado positivo dela é que torna o ficheiro mais legível. Por outro lado, faz qualquer mudança a esse ficheiro mais difícil. De qualquer maneira eu vou deixar isto ao vosso critério pois a diferença não é muita. Ao importar desta maneira o ficheiro principal deve seguir as seguintes diretrizes:

-   um `@import` por pasta;
-   linha de espaço entre cada `@import`;
-   cada ficheiro fica na sua linha;
-   uma linha de espaço depois da ultima importação numa pasta;
-   extensões e underscores antes do nome devem ser omitidos.

```
@import
  'abstracts/variables',
  'abstracts/functions',
  'abstracts/mixins',
  'abstracts/placeholders';

@import
  'vendors/bootstrap',
  'vendors/jquery-ui';

@import
  'base/reset',
  'base/typography';

@import
  'layout/navigation',
  'layout/grid',
  'layout/header',
  'layout/footer',
  'layout/sidebar',
  'layout/forms';

@import
  'components/buttons',
  'components/carousel',
  'components/cover',
  'components/dropdown';

@import
  'pages/home',
  'pages/contact';

@import
  'themes/theme',
  'themes/admin';
```

```
@import
  vendors/bootstrap,
  vendors/jquery-ui

@import
  utils/variables,
  utils/functions,
  utils/mixins,
  utils/placeholders

@import
  base/reset,
  base/typography

@import
  layout/navigation,
  layout/grid,
  layout/header,
  layout/footer,
  layout/sidebar,
  layout/forms

@import
  components/buttons,
  components/carousel,
  components/cover,
  components/dropdown

@import
  pages/home,
  pages/contact

@import
  themes/theme,
  themes/admin
```

De maneira a não ter que importar cada ficheiro manualmente, existe uma extensão para o Sass chamada [sass-globbing](https://github.com/chriseppstein/sass-globbing), que torna possivel usar padrões globais no `@import` como `@import "components/\*"`.

Tendo isto dito, eu não recomendo o uso desta extensão porque ela importa os ficheiros por ordem alfabética e normalmente não é isto que queremos, principalmente quando lidamos com uma linguagem que se baseia na ordem.

### Sobre globbing

Em programação de computadores, os padrões glob especificam conjuntos de arquivos usando caracteres coringas, como `*.scss`. De modo geral, globbing significa combinar um conjunto de arquivos baseados numa expressão, invés de uma lista de arquivos. Quando aplicado ao Sass, isso significa importar partials no [arquivo principal](#ficheiro-principal) com o glob pattern, invés de importar cada um deles. Portanto, isso nos levaria a ter um arquivo parecido com esse:

```
@import 'abstracts/*';
@import 'vendors/*';
@import 'base/*';
@import 'layout/*';
@import 'components/*';
@import 'pages/*';
@import 'themes/*';
```

```
@import 'abstracts/*'
@import 'vendors/*'
@import 'base/*'
@import 'layout/*'
@import 'components/*'
@import 'pages/*'
@import 'themes/*'
```

Sass não suporta globbing, porque isso pode ser uma feature perigosa, já que o CSS é conhecido por funcionar de acordo com a ordem de arquivos e declarações. Quando importando arquivos dinamicamente (que é feito em ordem alfabética, normalmente), não teríamos controle da ordem, o que pode levar a um debug muito difícil.

Dado isso, em uma arquitetura estritamente baseada em componentes e com esforço extra para não usar estilo de um partial em outro, a ordem de importação não importaria de fato, o que permitiria importar arquivos usando globbing. Portanto, isso faria ser mais fácil adicionar ou remover partials, já que não seria necessário atualizar o arquivo principal com tanta cautela.

Quando usando Ruby Sass, podemos usar uma gem chamada [sass-globbing](https://github.com/chriseppstein/sass-globbing) que ativa exatamente esse comportamento. Já se estamos executando node-sass, vamos depender do Node.js ou qualquer ferramenta de build usada para compilação (Gulp, Grunt e etc.).

### Ficheiro Vergonhoso

Existe um conceito interessante que foi tornado popular por [Harry Roberts](https://csswizardry.com), [Dave Rupert](https://daverupert.com) e [Chris Coyier](https://css-tricks.com) que consiste em colocar todas as declarações, hacks e coisas das quais não estamos propriamente orgulhosos num [ficheiro vergonhoso](https://csswizardry.com/2013/04/shame-css-full-net-interview/). Este ficheiro dramaticamente chamado `_shame.css`, seria importado depois de todos os outros mesmo no fim da folha de estilo.

```
/**
 * Arranjar a navegação.
 *
 * Alguém usou um ID no código do cabeçalho (`#header a {}`) que
 * passa por cima dos seletores da navegação (`.site-nav a {}`).
 * Usar !important para sobrepor estes até ter tempo de refazer
 * o código do cabeçalho.
 */
.site-nav a {
    color: #BADA55 !important;
}
```

```
/**
 * Arranjar a navegação.
 *
 * Alguém usou um ID no código do cabeçalho (`#header a {}`) que
 * passa por cima dos seletores da navegação (`.site-nav a {}`).
 * Usar !important para sobrepor estes até ter tempo de refazer
 * o código do cabeçalho.
 */
.site-nav a
    color: #BADA55 !important
```

## Web Design Responsivo (RWD) e breakpoints

Não creio que tenhamos ainda de apresentar o que é Web Design Responsivo, agora que está em todo o lado. No entanto podem-se perguntar _porque há uma secção de RWD num guia de estilo?_ Na realidade existem algumas coisas que podem ser feitas para facilitar o trabalho com breakpoints, como tal achei que podia não ser má ideia listá-las aqui.

### Definir breakpoints

Acho que é seguro dizer que as _media queries_ não devem estar agarradas a dispositivos específicos. Por exemplo, seria definitivamente uma má ideia ter especificamente iPhones ou Blackberries como público-alvo. As _media queries_ devem afetar um conjunto de tamanhos de ecrã, pelo menos até o design partir e a próxima _media query_ entrar em acção.

Pelos mesmos motivos, breakpoints não devem ter nomes de dispositivos, mas sim algo mais geral. Especialmente agora, porque alguns telemóveis são maiores que tablets e algumas tablets são maiores que pequenos ecrãs de computadores, e por aí além…

```
// Yep
$breakpoints: (
  'medium': (min-width: 800px),
  'large': (min-width: 1000px),
  'huge': (min-width: 1200px),
);

// Nope
$breakpoints: (
  'tablet': (min-width: 800px),
  'computer': (min-width: 1000px),
  'tv': (min-width: 1200px),
);
```

```
// Yep
$breakpoints: ('medium': (min-width: 800px), 'large': (min-width: 1000px), 'huge': (min-width: 1200px))

// Nope
$breakpoints: ('tablet': (min-width: 800px), 'computer': (min-width: 1000px), 'tv': (min-width: 1200px))
```

Por esta altura, qualquer [convenção de nomeclatura](https://css-tricks.com/naming-media-queries/) serve, desde que ajude a clarificar que o design não está intimamente agarrado a um tipo de dispositivo especifíco e que dê uma ideia da escala de magnitudes.

```
$breakpoints: (
  'semente': (min-width: 800px),
  'rebento': (min-width: 1000px),
  'planta': (min-width: 1200px),
);
```

```
$breakpoints: ("semente": (min-width: 800px), "rebento": (min-width: 1000px), "planta": (min-width: 1200px))
```

Os exemplos anteriores utilizam mapas aninhados para definir breakpoints; no entanto isto depende bastante no tipo de gestor de breakpoints que seja utilizado. Podem optar por strings em vez de usar mapas, para maior flexibilidade (e.g. `'(min-width: 800px)'`).

### Gestor de Breakpoints

Assim que definam os breakpoints da maneira que quiserem, é necessário arranjar uma maneira de os usar realmente em _media queries_. Há imensas maneiras de o fazer, mas confesso que sou grande fã do mapa de breakpoints acedido por uma função de leitura. Este sistema é simples e eficiente.

```
/// Gestor Responsivo
/// @access public
/// @param {String} $breakpoint - Breakpoint
/// @requires $breakpoints
@mixin respond-to($breakpoint) {
  @if map-has-key($breakpoints, $breakpoint) {
    @media #{inspect(map-get($breakpoints, $breakpoint))} {
      @content;
    }
  }

  @else {
    @error 'No value found for `#{$breakpoint}`. '
         + 'Please make sure it is defined in `$breakpoints` map.';
  }
}
```

```
/// Gestor Responsivo
/// @access public
/// @param {String} $breakpoint - Breakpoint
/// @requires $breakpoints
=respond-to($breakpoint)
  @if map-has-key($breakpoints, $breakpoint)
    @media #{inspect(map-get($breakpoints, $breakpoint))}
      @content

  @else
    @error 'Nenhum valor encontrado para `#{$breakpoint}`. '
         + 'Por favor assegure que está definido no mapa `$breakpoints`.'
```

Obviamente, este é um gestor de breakpoints bastante simplista. Se precisarem de algo mais permissivo,recomendo que não reinventem a roda e utilizem algo que já provou ser eficaz, tal como [Sass-MQ](https://github.com/sass-mq/sass-mq), [Breakpoint](http://breakpoint-sass.com/) ou [include-media](https://github.com/eduardoboucas/include-media)..

Se você está procurando ler mais sobre como abordar media queries no Sass, ambos [SitePoint](https://www.sitepoint.com/managing-responsive-breakpoints-sass/) e [CSS-Tricks](https://css-tricks.com/approaches-media-queries-sass/) possuem bons artigos sobre.

### Media Queries

Não há muito tempo atrás, houve um debate aceso sobre onde é que as _media queries_ deveriam ser escritas: deveriam ser escritas dentro dos selectores (tal como Sass o permite), ou deveriam ser separadas? Tenho a dizer que sou um defensor renhido do sistema _media-queries-dentro-de-selectores_, um vez que acho que encaixa bem com a ideia de _componentes_.

```
.foo {
  color: red;

  @include respond-to('medium') {
    color: blue;
  }
}
```

```
.foo
  color: red

  +respond-to('medium')
    color: blue
```

Que gera o seguinte resultado em CSS:

```
.foo {
  color: red;
}

@media (min-width: 800px) {
  .foo {
    color: blue;
  }
}
```

Podem ter ouvido que esta convenção resulta na duplicação das _media queries_ no resultado de CSS. Isto é definitivamente verdade. No entanto, foram feitos testes e o resultado final é que não interessa assim que Gzip (ou algo equivalente) fizer o seu trabalho:

> … we hashed out whether there were performance implications of combining vs scattering Media Queries and came to the conclusion that the difference, while ugly, is minimal at worst, essentially non-existent at best.  
> — Sam Richards, regarding Breakpoint

Agora, se realmente tiverem preocupados com a duplicação das _media queries_, podem usar uma ferramenta para as juntar, tal como [esta gema](https://github.com/aaronjensen/sass-media_query_combiner) no entanto, sinto que vos devo avisar na possibilidade de efeitos secundários de alteram a ordem do código, uma vez que já sabem que a ordem do código-fonte é importante.

## Variáveis

As variáveis são a essência de qualquer linguagem de programação. Elas permitem-nos reutilizar valores sem ter que os copiar constantemente. Mais importante ainda, elas permitem-nos actualizar um valor facilmente. Acabou-se a procura e substituição de valores manualmente.

No entanto o CSS não é mais do que um cesto com todos os vossos ovos. Ao contrário de muitas outras linguagens, não há verdadeiros contextos no CSS. Como tal, temos de prestar atenção aos riscos de adicionar variáveis pois podemos entrar em conflicto com variáveis existentes.

O meu conselho passa por apenas criar variáveis quando estas fazem sentido. Não inicializer variáveis só porque sim, isso não ajudará. Uma nova variável deve ser criada quando acontece os seguintes critérios:

-   o seu valor é repetido pelo menos duas vezes;
-   o seu valor provavelemnte irá ser atualizado, pelo menos uma vez;
-   todas as ocorrências do seu valor, estã diretamente ligadas à variável (por exemplo, não ser uma coicidência).

Basicamente, não vale a pena declarar uma variável que nunca irá ser atualizada ou que apenas irá ser usada uma vez.

### Contextos

O contexto das variáveis no Sass mudou ao longo dos anos. Até muito recentemente, as declarações de variáveis dentro de rulesets e outros contextos eram locais por omissão. No entanto quando já havia uma variável global com o mesmo nome, a declaração local iria alterar o valor da variável global. Desde a versão 3.4, o Sass lida corretamente com o conceito de contextos, e cria uma variável local em vez de substituir a global.

A documentação fala na _ocultação de variáveis globais_. Quando se declara uma variável, que já existe no contexto global, dentro de um contexto local (selector, função, mixin…), diz-se que a variável local está a _ocultar_ a variável global. Basicamente substitui o seu valor dentro do contexto local.

O enxerto de código seguinte explica o conceito de _ocultação de variável_

```
// Inicia uma variável global ao nível de raiz.
// Neste caso, a flag `!global` é opcional.
$variable: 'initial value' !global;

// Cria um mixin que substitui a variável global anterior.
@mixin global-variable-overriding {
  $variable: 'mixin value' !global;
}

.local-scope::before {
  // Cria uma variável local que se sobrepõe à global anterior.
  $variable: 'local value';

  // Inclui o mixin: substitui a variável global.
  @include global-variable-overriding;

  // Imprime o valor da variável.
  // É o valor **local**, visto que se sobrepõe à global.
  content: $variable;
}

// Imprime a variável noutro seletor que nada sobrepõe.
// É a variável **global**, como esperado.
.other-local-scope::before {
  content: $variable;
}
```

```
// Inicia uma variável global ao nível de raiz.
// Neste caso, a flag `!global` é opcional.
$variable: 'initial value' !global

// Cria um mixin que substitui a variável global anterior.
@mixin global-variable-overriding
  $variable: 'mixin value' !global

.local-scope::before
  // Cria uma variável local que se sobrepõe à global anterior.
  $variable: 'local value'

  // Inclui o mixin: substitui a variável global.
  +global-variable-overriding

  // Imprime o valor da variável.
  // É o valor **local**, visto que se sobrepõe à global.
  content: $variable

// Imprime a variável noutro seletor que nada sobrepõe.
// É a variável **global**, como esperado.
.other-local-scope::before
  content: $variable
```

### Flag `!default`

Quando se está a construir uma biblioteca, uma _framework_, um sistema de grelhas ou qualquer pedaço de código Sass com a intenção de ser distribuido e usado por programadores externos, todas as variáveis de configuração devem ser definidas com o marcador `!default` de forma a que possam ser substituidas.

```
$baseline: 1em !default;
```

```
$baseline: 1em !default
```

Graças a isto, um programador pode definir a sua própria variável `$baseline` _antes_ de importar a vossa biblioteca, sem que esta substitua o valor da vossa variável.

```
// Variável definida pelo programador
$baseline: 2em;

// A declaração de `$baseline` da vossa biblioteca
@import 'your-library';

// $baseline == 2em;
```

```
// Variável definida pelo programador
$baseline: 2em

// A declaração de `$baseline` da vossa biblioteca
@import your-library

// $baseline == 2em
```

### Flag `!global`

O marcador `!global` deve ser usado apenas quando se vai substituir uma variável global a partir de um contexto local. Quando se define uma variável num contexto global, o uso deste marcador deve ser omitido.

```
// Yep
$baseline: 2em;

// Nope
$baseline: 2em !global;
```

```
// Yep
$baseline: 2em

// Nope
$baseline: 2em !global
```

### Variáveis multiplas ou mapas

Existem vantagens em usar mapas em vez de múltiplas variáveis. A principal é poder iterar um mapa, algo que não é possivel com variáveis distintas.

Outra vantagem de usar um mapa, é a habilidade de criar uma função de leitura para providenciar uma API mais amigável. Por exemplo, considerem o seguinte código Sass:

```
/// Mapa dos z-indexes, reunindo todas as camadas Z da aplicação
/// @access private
/// @type Map
/// @prop {String} key - Nome da camada
/// @prop {Number} value - Valor de Z mapeado à chave (key)
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// Obtém um valor de z-index através do nome de uma camada
/// @access public
/// @param {String} $layer - Nome da camada
/// @return {Number}
/// @require $z-indexes
@function z($layer) {
  @return map-get($z-indexes, $layer);
}
```

```
/// Mapa dos z-indexes, reunindo todas as camadas Z da aplicação
/// @access private
/// @type Map
/// @prop {String} key - Nome da camada
/// @prop {Number} value - Valor de Z mapeado à chave (key)
$z-indexes: ('modal': 5000, 'dropdown': 4000, 'default': 1, 'below': -1,)

/// Obtém um valor de z-index através do nome de uma camada
/// @access public
/// @param {String} $layer - Nome da camada
/// @return {Number}
/// @require $z-indexes
@function z($layer)
  @return map-get($z-indexes, $layer)
```

## Extend

A diretiva `@extend` é uma ferramenta poderosa que é, frequentemente, má entendida. No geral, ela permite dizer ao Sass para estilizar um seletor A, tal como se ele fosse abrangido pelo seletor B. Escusado será dizer que isto pode ser um valioso aliado quando se escreve CSS modular.

No entanto, a verdadeiro propósito do `@extend` é manter relações (restrições) dentro de seletores estendidos entre blocos de regras. O que exatamente isso significa?

-   Seletores possuem _restrições_ (por exemplo `.bar` in `.foo > .bar` deve ter um ancestral `.foo`);
-   Essas restrições são _carregadas_ para o seletor sendo estendido (por exemplo `.baz { @extend .bar; }` vai compilar `.foo > .bar, .foo > .baz`);
-   As declarações do seletor extensor vão ser compartilhadas com o seletor sendo estendido;

Dado isso, é certo ver como os seletores sendo estendidos com fracas restrições podem levar a uma explosão de seletor. Se `.baz .qux` estende `.foo .bar`, o resultado pode ser `.foo .baz .qux` ou `.baz .foo .qux`, já que `.foo` e `.baz` são ancestrais mais genéricos (eles podem ser pais, avós e etc).

Sempre tente definir relações via placeholders, não classes. Isso vai lhe dar a liberdade para usar (e alterar) qualquer convenção de nomeclatura que você usa em seus seletores e, já que relações são definidas apenas uma vez dentro do placeholder, é menos provavel que você irá compilar seletores indesejados.

```
%button {
  display: inline-block;
  // … button styles

  // Relationship: a %button that is a child of a %modal
  %modal > & {
    display: block;
  }
}

.button {
  @extend %button;
}

// Yep
.modal {
  @extend %modal;
}

// Nope
.modal {
  @extend %modal;

  > .button {
    @extend %button;
  }
}
```

```
%button
  display: inline-block
  // … button styles

  // Relationship: a %button that is a child of a %modal
  %modal > &
    display: block

.button
  @extend %button

// Yep
.modal
  @extend %modal

// Nope
.modal
  @extend %modal

  > .button
    @extend %button
```

Existem muitos cenários onde seletores sendo extendidos são úteis e valem a pena. Portanto, sempre mantenha em mente essas regras para que você possa usar `@extend` com cuidado:

-   Use, exclusivamente, `@extend` em `%placeholders`, não em seletores.
-   Estenda um `%placeholder` diretamente, a menor quantidade de vezes possível.
-   Evite estender seletores ancestrais genéricos (como `.foo .bar`) ou seletores irmãos genéricos (como `.foo ~ .bar`). Isso é o que causa explosão de seletores.

Frequentemente, é falado que o `@extend` ajuda com o tamanho tamanho do arquivo, já que ele combina seletores invés de duplicar propriedades. Isso verdade, mas a diferença é insignificante quando o [Gzip](https://en.wikipedia.org/wiki/Gzip) faz sua compressão.

Dessa maneira, se você não pode usar Gzip (ou algo parecido), então, usar a abordagem `@extend` pode ser bom, especialmente, se o peso da folha de estilos é o gargalo na performance.

#### Extend e media queries

Você deve estender apenas seletores com o mesmo escopo da media (`@media`). Pense na media query como uma outra restrição.

```
%foo {
  content: 'foo';
}

// Nope
@media print {
  .bar {
    // Isto não funciona. Pior: rebenta.
    @extend %foo;
  }
}

// Yep
@media print {
  .bar {
    @at-root (without: media) {
      @extend %foo;
    }
  }
}

// Yep
%foo {
  content: 'foo';

  &-print {
    @media print {
      content: 'foo print';
    }
  }
}

@media print {
  .bar {
    @extend %foo-print;
  }
}
```

```
%foo
  content: 'foo'

// Nope
@media print
  .bar
    // Isto não funciona. Pior: rebenta.
    @extend %foo

// Yep
@media print
  .bar
    @at-root (without: media)
      @extend %foo

// Yep
%foo
  content: 'foo'

  &-print
    @media print
      content: 'foo print'

@media print
  .bar
    @extend %foo-print
```

As opiniões parecem ser extremamente divididas a respeito das vantagens e problemas do `@extend`, ao ponto que muitos desenvolvedores (incluindo eu) tem discutido contra o uso disso, como você pode ver nos seguintes artigos:

-   [What Nobody Told you About Sass Extend](https://www.sitepoint.com/sass-extend-nobody-told-you/)
-   [Why You Should Avoid Extend](https://www.sitepoint.com/avoid-sass-extend/)
-   [Don’t Over Extend Yourself](https://pressupinc.com/blog/2014/11/dont-overextend-yourself-in-sass/)

Dado isso e resumindo, eu gostaria de aconselhar o uso de `@extend` apenas para manter relações entre seletores, se dois seletores são característicamente similares porque, então, teremos uma situação perfeita para uso do `@extend`. No entanto, se eles são irrelacionados mas compartilham algumas regras, um `@mixin` pode ser melhor. Para saber mais, sobre como escolher entre esses dois, leia este [artigo](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/).

Agradeço o [David Khourshid](https://twitter.com/davidkpiano) por sua ajuda e expertise, nesta seção.

## Mixins

Os Mixins são uma das funcionalidades mais usadas em todo o Sass. São a chave para reutilização de código e componentes DRY (DRY significa, em Inglês, _Don’t Repeat Yourself_. Em português podemos traduzir para “Não te repitas”). Os Mixins têm esta caraterística por uma boa razão: eles permitem que o programador defina estilos que podem ser reutilizados em todas os ficheiros de estilos, sem precisarem de utilizar classes não semânticas como `.float-left`.

Os Mixins podem conter regras de CSS e praticamente tudo o que é permitido num documento Sass. Podem por exemplo, ter argumentos da mesma forma que uma função. As funcionalidades que um Mixin permite são imensas.

No entanto é necessário termos cuidado para não abusarmos das potencialidades de um Mixin. A palavra-chave neste aspecto é _simplicidade_. Pode ser tentator escrever mixins extremamente capazes com imensa quantidade de lógica. A isto chama-se excesso de engenharia e é algo de que a maioria dos programadores sofre. Não pensem demasiado sobre o vosso código e acima de tudo mantenham-no simples. Se um mixin tiver mais do que 20 linhas, então devem dividi-lo ou revê-lo.

### Básicos

Tendo em conta o que foi dito acima, os Mixins são extremamente úteis e devem usar algums. Regra geral, se têm um grupo de propriedades de CSS que aparecem juntas por alguma razão e não por coincidência, devem pô-las num mixin. Por exemplo, o código abaixo, o [micro-clearfix hack de Nicolas Gallagher](http://nicolasgallagher.com/micro-clearfix-hack/) merece ser colocado num mixin:

```
/// Ajudante para limpar floats
/// @author Nicolas Gallagher
/// @link http://nicolasgallagher.com/micro-clearfix-hack/ Micro Clearfix
@mixin clearfix {
  &::after {
    content: '';
    display: table;
    clear: both;
  }
}
```

```
/// Ajudante para limpar floats
/// @author Nicolas Gallagher
/// @link http://nicolasgallagher.com/micro-clearfix-hack/ Micro Clearfix
@mixin clearfix
  &::after
    content: ''
    display: table
    clear: both
```

Outro exemplo de código que deveria estar num Mixin é definir o tamanho de um elemento, definindo tanto a `largura` como a `altura` ao mesmo tempo. Isto não só vai fazer como o vosso código seja mais fácil de escrever como mais fácil de ler.

```
/// Ajudante para dar tamanho a um elemento
/// @author Kitty Giraudel
/// @param {Length} $width
/// @param {Length} $height
@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}
```

```
/// Ajudante para dar tamanho a um elemento
/// @author Kitty Giraudel
/// @param {Length} $width
/// @param {Length} $height
=size($width, $height: $width)
  width: $width
  height: $height
```

Para mais exemplos complexos de mixins, dê uma olhada [neste mixin para gerar triângulos CSS](https://www.sitepoint.com/sass-mixin-css-triangles/), [nesse mixin para criar sombras longas](https://www.sitepoint.com/ultimate-long-shadow-sass-mixin/) ou [neste outro mixin de polyfill para gradientes CSS em navegadores antigos](https://www.sitepoint.com/building-linear-gradient-mixin-sass/).

### Mixins sem argumentos

Algumas vezes os mixins são usados apenas para evitar repetição do mesmo grupo de declarações, os quais não precisam de qualquer parâmetro ou já possuem valores padrões o suficiente para não demandar que você passe argumentos.

Em tais casos, nos podemos omitir os parênteses na hora de chamar os mixins. A keyword `@include` (ou o sinal `+` na sintaxe indentada) já age indicando que aquela linha é uma chamada de mixin. Portanto, não há necessidade de parênteses extras.

```
// Yep
.foo {
  @include center;
}

// Nope
.foo {
  @include center();
}
```

```
// Yep
.foo
  +center

// Nope
.foo
  +center()
```

### Lista de argumentos

Quando estão a lidar com um mixin que tem um número desconhecido de argumentos, o Sass suporta “argumentos variáveis”. “Argumentos variáveis” são os argumentos que estão no fim de um mixin ou de uma declaração de função e são transformados numa lista, à qual vamos chamar `arglist`. Isto é implicitamente usado quando passamos um número de argumentos para um mixin ou uma função cuja assinatura de uma função contém `...`.

```
@mixin shadows($shadows...) {
  // type-of($shadows) == 'arglist'
  // …
}
```

```
=shadows($shadows...)
  // type-of($shadows) == 'arglist'
  // …
```

Quando estiverem a construir um mixin que aceita três ou mais argumentos, deves pensar duas vezes antes de os passar como uma lista ou uma mapa só porque é mais fácil do que os passar uma a um. O Sass é bastante inteligente relativamente aos mixins e a declaração de funções. Tanto que podemos passar uma lista ou um mapa de argumentos como uma arglist para um mixin ou uma função e estes vão ser lidos como uma série de argumentos.

```
@mixin dummy($a, $b, $c) {
  // …
}

// Yep
@include dummy(true, 42, 'kittens');

// Yep but nope
$params: (true, 42, 'kittens');
$value: dummy(nth($params, 1), nth($params, 2), nth($params, 3));

// Yep
$params: (true, 42, 'kittens');
@include dummy($params...);

// Yep
$params: (
  'c': 'kittens',
  'a': true,
  'b': 42,
);
@include dummy($params...);
```

```
=dummy($a, $b, $c)
  // …

// Yep
+dummy(true, 42, 'kittens')

// Yep but nope
$params: (true, 42, 'kittens')
$value: dummy(nth($params, 1), nth($params, 2), nth($params, 3))

// Yep
$params: (true, 42, 'kittens')
+dummy($params...)

// Yep
$params: ('c': 'kittens', 'a': true, 'b': 42,)
+dummy($params...)
```

Para mais informação, sobre se é melhor usar múltiplos argumentos, lista ou uma lista de argumentos [o SitePoint tem um ótimo tópico sobre isso](https://www.sitepoint.com/sass-multiple-arguments-lists-or-arglist/).

### Mixins e prefixos de fabricantes

Pode ser tentador definir mixins personalizados para prefixos de fabricantes que são propriedades de CSS não suportadas ou fracamente suportadas. Mas nós não queremos fazer isso. Primeiro, se puderem usar o [Autoprefixer](https://github.com/postcss/autoprefixer), usem-no. O Autoprefixer vai remover código Sass do projeto, vai estar sempre atualizado e vai muito provavelmente fazer um melhor trabalho do que nós a colocar prefixos.

Infelizmente, usar o Autoprefixer nem sempre é uma opção. Se usam [Bourbon](https://bourbon.io/) ou [Compass](http://compass-style.org/), provavelmente já sabem que tanto um como outro oferecem uma coleção de mixins que tratam dos prefixos de fabricantes por nós.

Se não podem usar Autoprefixer nem Bourbon ou Compass, então, apenas nesta situação, podem criar o vosso próprio mixin para colocar prefixos em propriedades de CSS. Mas, por favor, não criem um mixin por propriedade.

```
// Nope
@mixin transform($value) {
  -webkit-transform: $value;
  -moz-transform: $value;
  transform: $value;
}
```

```
// Nope
=transform($value)
  -webkit-transform: $value
  -moz-transform: $value
  transform: $value
```

Façam isso de uma forma inteligente.

```
/// Ajudante para expor prefixos de fabricantes
/// @access public
/// @author KittyGiraudel
/// @param {String} $propriedade - Propriedade de CSS sem prefixo
/// @param {*} $valor - valor de CSS crú
/// @param {List} $prefixos - Lista de prefixos a serem expostos
@mixin prefixo($propriedade, $valor, $prefixos: ()) {
  @each $prefixo in $prefixos {
    -#{$prefixo}-#{$propriedade}: $valor;
  }

  #{$propriedade}: $valor;
}
```

```
/// Ajudante para expor prefixos de fabricantes
/// @access public
/// @author KittyGiraudel
/// @param {String} $propriedade - Propriedade de CSS sem prefixo
/// @param {*} $valor - valor de CSS crú
/// @param {List} $prefixos - Lista de prefixos a serem expostos
=prefixo($propriedade, $valor, $prefixos: ()) {
  @each $prefixo in $prefixos {
    -#{$prefixo}-#{$propriedade}: $valor;
  }

  #{$propriedade}: $valor;
```

Usar este mixin deve ser bastante simples:

```
.foo {
  @include prefix(transform, rotate(90deg), ('webkit', 'ms'));
}
```

```
.foo
  +prefix(transform, rotate(90deg), ('webkit', 'ms'))
```

Por favor não se esqueçam que isto não é uma solução feliz. Por exemplo, esta solução não consegue lidar com _polyfills_ complexos como os que são necessários para o Flexbox. Neste sentido, usar o Autoprefixer é uma solução muito melhor.

## Instruções condicionais

Provavelmente já sabem que Sass fornece instruções condicionais através das diretivas `@if` e `@else`. A menos que possuam alguma lógica média ou altamente complexa no vosso código, não há necessidade para instruções condicionais nas vossas folhas de estilo do dia a dia. Na verdade, estas instruções existem maioritariamente para bibliotecas e _frameworks_.

De qualquer forma, se alguma vez necessitarem delas, por favor respeitem as seguintes diretrizes:

-   Não usar parêntesis exceto quando necessário;
-   Colocar sempre uma linha em branco antes de um `@if`;
-   Colocar sempre uma linha em branco após abrir chavetas (`{`);
-   Colocar a instrução `@else` na mesma linha que o fecho das chavetas anteriores (`}`);
-   Colocar sempre uma linha em branco após fechar as últimas chavetas (`}`), a menos que a linha seguinte seja uma chaveta de fecho (`}`).

```
// Yep
@if $support-legacy {
  // …
} @else {
  // …
}

// Nope
@if ($support-legacy == true) {
  // …
}
@else {
  // …
}
```

```
// Yep
@if $support-legacy
  // …
@else
  // …

// Nope
@if ($support-legacy == true)
  // …
@else
  // …
```

Quando se testa um valor falso, usem sempre a palavra-chave `not` ao invés de testar contra `false` ou `null`.

```
// Yep
@if not index($list, $item) {
  // …
}

// Nope
@if index($list, $item) == null {
  // …
}
```

```
// Yep
@if not index($list, $item)
  // …

// Nope
@if index($list, $item) == null
  // …
```

Quando se usa instruções condicionais dentro de uma função para devolver um resultado diferente baseado nalguma condição, certifiquem-se que a função ainda possui uma instrução `@return` fora de qualquer bloco condicional.

```
// Yep
@if $value == 42 {
  // …
}

// Nope
@if 42 == $value {
  // …
}
```

```
// Yep
@if $value == 42
  // …

// Nope
@if 42 == $value
  // …
```

Quando se utilizam expresões condicionais dentro de uma função para retornar um resultado diferente baseado numa condição, certifiquem-se que a função devolve sempre uma expressão `@return` fora de qualquer bloco condicional.

```
// Yep
@function dummy($condition) {
  @if $condition {
    @return true;
  }

  @return false;
}

// Nope
@function dummy($condition) {
  @if $condition {
    @return true;
  } @else {
    @return false;
  }
}
```

```
// Yep
@function dummy($condition)
  @if $condition
    @return true

  @return false;

// Nope
@function dummy($condition)
  @if $condition
    @return true
  @else
    @return false
```

## Ciclos

Visto que Sass providencia estruturas de dados complexas, tal como [listas](#listas) e [mapas](#mapas), não é surpresa fornecer também formas de iterar sobre essas entidades.

No entanto, a presença de ciclos normalmente implica lógica moderadamente complexa que provavelmente não pertence a Sass. Antes de usar um ciclo, certifiquem-se que tal faz sentido e que realmente resolve um problema.

### Each

O ciclo `@each` é definitivamente o mais usado dos três ciclos que Sass oferece. Apresenta uma API simples para iterar uma lista ou mapa.

```
@each $theme in $themes {
  .section-#{$theme} {
    background-color: map-get($colors, $theme);
  }
}
```

```
@each $theme in $themes
  .section-#{$theme}
    background-color: map-get($colors, $theme)
```

Ao iterar um mapa, usem sempre `$key` e `$value` como nomes de variáveis para manter a consistência.

```
@each $key, $value in $map {
  .section-#{$key} {
    background-color: $value;
  }
}
```

```
@each $key, $value in $map
  .section-#{$key}
    background-color: $value
```

Façam também questão de respeitar as seguintes diretrizes para preservar a legibilidade:

-   Colocar sempre uma linha em branco antes do `@each`;
-   Colocar sempre uma linha em branco antes da chaveta de fecho (`}`) a menos que a próxima linha seja uma chaveta de fecho (`}`).

### For

O ciclo `@for` poderá ser útil quando combinado com as pseudo-classes `:nth-*` de CSS. À exceção destes cenários, é preferível um ciclo `@each` se _têm_ de iterar sobre algo.

```
@for $i from 1 through 10 {
  .foo:nth-of-type(#{$i}) {
    border-color: hsl($i * 36, 50%, 50%);
  }
}
```

```
@for $i from 1 through 10
  .foo:nth-of-type(#{$i})
    border-color: hsl($i * 36, 50%, 50%)
```

Usem sempre `$i` como nome de variável para manter a convenção comum e a menos que tenham boa razão para tal, nunca usem a palavra-chave `to`: usem sempre `through`. Muitos programadores não sabem que Sass oferece esta variação; usá-la poderá levar a confusão.

Também não se esqueçam de respeitar as seguintes diretrizes para preservar a legibilidade:

-   Colocar sempre uma linha em branco antes do `@each`;
-   Colocar sempre uma linha em branco antes da chaveta de fecho (`}`) a menos que a próxima linha seja uma chaveta de fecho (`}`).

### While

O ciclo `@while` não possui absolutamente nenhum uso real num projeto de Sass, especialmente porque não é possível quebrar o ciclo por dentro. **Não usar**.

## Avisos e erros

Se há uma característica que é muitas vezes esquecida pelos programadores de Sass, é a capacidade de enviar dinamicamente avisos e erros. Por acaso, Sass vem com três diretivas personalizadas para imprimir conteúdo no _standard output system_ (CLI, compilador…):

-   `@debug`;
-   `@warn`;
-   `@error`.

Vamos colocar o `@debug` de lado, uma vez que se destina claramente a fazer _debug_ a SassScript, o que não é o nosso ponto aqui. Ficamos então com `@warn` and `@error` que são visivelmente idênticos, exceto que um para o compilador, enquanto que o outro não. Vocês podem adivinhar qual faz o quê.

Agora, há muito espaço num projecto de Sass para avisos e erros. Basicamente, qualquer _mixin_ ou função à espera de um tipo ou argumento específico poderia lançar um error se algo desse errado, ou mostrar um aviso ao fazer uma suposição.

### Avisos

Considerem esta função de [Sass-MQ](https://github.com/sass-mq/sass-mq) a tentar converter um valor em `px` para `em`, por exemplo:

```
@function mq-px2em($px, $base-font-size: $mq-base-font-size) {
  @if unitless($px) {
    @warn 'Assuming #{$px} to be in pixels, attempting to convert it into pixels.';
    @return mq-px2em($px + 0px);
  } @else if unit($px) == em {
    @return $px;
  }
   @return ($px / $base-font-size) * 1em;
}
```

```
@function mq-px2em($px, $base-font-size: $mq-base-font-size)
  @if unitless($px)
    @warn 'Assuming #{$px} to be in pixels, attempting to convert it into pixels.'
    @return mq-px2em($px + 0px)
  @else if unit($px) == em
    @return $px
   @return ($px / $base-font-size) * 1em
```

Se o valor fornecido não possuir unidade, a função assume que o valor está expresso em píxeis. Neste ponto, uma suposição poderá ser arriscada, pelo que o utilizador deverá ser avisado que o software fez algo que poderá ser considerado inesperado.

### Erros

Erros, ao contrário de avisos, previnem o compilador de ir mais além. Basicamente, interrompem o compilador e mostram uma mensagem no _output stream_ tal como o _stack trace_, o que é útil para _debugging_. Por causa disto, erros deverão ser lançados quando não há mais forma do programa continuar a correr. Sempre que possível, tentem antes contornar o problema e mostrar um aviso em seu lugar.

Como exemplo, digamos que querem construir uma função _getter_ para aceder a valores de um mapa específico. Poderiam lançar um erro se a chave pedida não existir no mapa.

```
/// Mapa dos z-indexes, reunindo todas as camadas Z da aplicação
/// @access private
/// @type Map
/// @prop {String} key - Nome da camada
/// @prop {Number} value - Valor de Z mapeado à chave (key)
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// Obtém um valor de z-index através do nome de uma camada
/// @access public
/// @param {String} $layer - Nome da camada
/// @return {Number}
/// @require $z-indexes
@function z($layer) {
  @if not map-has-key($z-indexes, $layer) {
    @error 'There is no layer named `#{$layer}` in $z-indexes. '
         + 'Layer should be one of #{map-keys($z-indexes)}.';
  }

  @return map-get($z-indexes, $layer);
}
```

```
/// Mapa dos z-indexes, reunindo todas as camadas Z da aplicação
/// @access private
/// @type Map
/// @prop {String} key - Nome da camada
/// @prop {Number} value - Valor de Z mapeado à chave (key)
$z-indexes: ('modal': 5000, 'dropdown': 4000, 'default': 1, 'below': -1,)

/// Obtém um valor de z-index através do nome de uma camada
/// @access public
/// @param {String} $layer - Nome da camada
/// @return {Number}
/// @require $z-indexes
@function z($layer)
  @if not map-has-key($z-indexes, $layer)
    @error 'There is no layer named `#{$layer}` in $z-indexes. '
         + 'Layer should be one of #{map-keys($z-indexes)}.'

  @return map-get($z-indexes, $layer)
```

Para mais informações de como usar a diretiva `@error` eficientemente, [esta introdução sobre controle de erros](https://webdesign.tutsplus.com/tutorials/an-introduction-to-error-handling-in-sass--cms-19996) deve ajudar você.

## Ferramentas

O que um pré-processador de CSS tão popular como Sass tem de bom é que vem com todo um ecossistema de _frameworks_, _plugins_, bibliotecas e ferramentas. Após 8 anos de existência, estamos cada vez mais perto do ponto onde [tudo o que pode ser escrito em Sass foi escrito em Sass](https://kittygiraudel.com/2014/10/27/rethinking-atwoods-law/).

No entanto, o meu conselho seria para reduzir o número de dependências ao estritamente necessário. Gerir dependências é uma espécie de inferno do qual não querem fazer parte. Além disso, há pouca ou nenhuma necessidade de dependências externas no que toca a Sass.

### Compass

[Compass](http://compass-style.org/) é a [_framework_](https://www.sitepoint.com/compass-or-bourbon-sass-frameworks/) principal de Sass por aí. Desenvolvida por [Chris Eppstein](https://twitter.com/chriseppstein), um dos designers principais do Sass, não a vejo a perder popularidade drasticamente durante uns tempos, se querem a minha opinião.

Mesmo assim, [já não uso Compass](https://www.sitepoint.com/dont-use-compass-anymore/), a razão principal sendo que abranda muito processamento de Sass. Sass em Ruby é bastante lento por si só, então adicionar mais Ruby e Sass por cima não ajuda de verdade.

De verdade, usamos muito pouco de toda a _framework_. Compass é enorme. _Mixins_ de compatibilidade inter-browser é apenas a ponta do icebergue. Funções matemáticas, auxiliares de images, _spriting_… Há muito que pode ser feito com esta grande peça de software.

Infelizmente, isto tudo é apenas agradável, mas não essencial. Uma exceção poderia ser feita do construtor de _sprites_, que é _realmente bom_, mas [Grunticon](https://github.com/filamentgroup/grunticon) e [Grumpicon](http://grumpicon.com/) dão para a despesa, e têm o benefício de poderem ser integrados no _building process_.

De qualquer forma, eu não proíbo o uso de Compass embora também não o recomende, especialmente visto que não é compatível com LibSass (mesmo que esforços tenham sido desenvolvidos nessa direção). Se se sentem melhor em usá-la, é justo, mas não acho que tirarão muito dela no final do dia.

Sass em Ruby está de momento a sofrer otimizações notáveis que são especificamente orientadas a estilos altamente baseados em lógica, com muitas funções e _mixins_. Estas mudanças deverão melhorar dramaticamente o seu desempenho, até ao ponto onde Compass e outras _frameworks_ já não abrandarão Sass.

### Sistemas de grelhas

Não usar um sistema de grelhas não é opção, agora que _Responsive Web Design_ é omnipresente. Para manter designs consistentes e sólidos em todos os tamanhos, usamos um tipo de grelha para dispor os elementos. Para evitar ter que programar estas grelhas uma e outra vez, algumas mentes brilhantes tornaram estas reutilizáveis.

Deixem-me ser direto: não sou grande fã de sistemas de grelhas. Claro que vejo o potencial, mas penso que a maior parte deles são completamente exagerados e são maioritariamente usados para desenhar colunas vermelhas num fundo branco em apresentações totós de designers. Quando foi a última vez que que pensaram _graças-a-Deus-que-tenho-esta-ferramenta-para-construir-esta-grelha-de-2-5-3.1-π_? Exatamente, nunca. Porque na maior parte dos casos, apenas querem a grelha comum de 12 colunas, nada de especial.

Se estão a usar uma _framework_ de CSS para o vosso projecto como [Bootstrap](https://getbootstrap.com/) ou [Foundation](https://get.foundation/), é provável que já incluam um sistema de grelhas que eu recomendo que usem de forma a evitar ter que lidar com mais uma dependência.

Se não estiverem presos a um sistema de grelhas específico, gostarão de saber que há dois sistemas de grelhas topo de gama: [Susy](https://www.oddbird.net/susy/) e [Singularity](https://github.com/at-import/Singularity). Ambos fazem muito mais do que alguma vez irão precisar, por isso podem escolher o que preferirem de entre os dois e terão a certeza que todos os vossos casos extremos—mesmo os mais rebuscados—estarão cobertos. Se me perguntarem, Susy possui uma comunidade ligeiramente melhor, mas é apenas a minha opinião.

Ou podem preferir algo mais casual, como [csswizardry-grids](https://github.com/csswizardry/csswizardry-grids). No final de contas, a escolha não terá muito impacto no vosso guia de estilo, por isso fica ao vosso critério.

### SCSS-lint

Analisar código é muito importante. Normalmente, seguir as diretrizes de um guia de estilo ajuda a reduzir a quantidade de erros de qualidade de código, mas ninguém é perfeito e há sempre algo a melhorar. Por isso pode-se dizer que fazer _linting_ a código é tão importante quanto documentá-lo.

[SCSS-lint](https://github.com/causes/scss-lint) é uma ferramenta importante para vos ajudar a manter os vossos ficheiros SCSS limpos e legíveis. É completamente personalizável e fácil de integrar com as vossas ferramentas.

Felizmente, as recomendações de SCSS-lint são bastante parecidas com as descritas neste documento. De forma a configurar SCSS-lint de acordo com as Sass Guidelines, recomendo a seguinte configuração:

```
linters:

  BangFormat:
    enabled: true
    space_before_bang: true
    space_after_bang: false

  BemDepth:
    enabled: true
    max_elements: 1

  BorderZero:
    enabled: true
    convention: zero

  ChainedClasses:
    enabled: false

  ColorKeyword:
    enabled: true

  ColorVariable:
    enabled: false

  Comment:
    enabled: false

  DebugStatement:
    enabled: true

  DeclarationOrder:
    enabled: true

  DisableLinterReason:
    enabled: true

  DuplicateProperty:
    enabled: false

  ElsePlacement:
    enabled: true
    style: same_line

  EmptyLineBetweenBlocks:
    enabled: true
    ignore_single_line_blocks: true

  EmptyRule:
    enabled: true

  ExtendDirective:
    enabled: false

  FinalNewline:
    enabled: true
    present: true

  HexLength:
    enabled: true
    style: short

  HexNotation:
    enabled: true
    style: lowercase

  HexValidation:
    enabled: true

  IdSelector:
    enabled: true

  ImportantRule:
    enabled: false

  ImportPath:
    enabled: true
    leading_underscore: false
    filename_extension: false

  Indentation:
    enabled: true
    allow_non_nested_indentation: true
    character: space
    width: 2

  LeadingZero:
    enabled: true
    style: include_zero

  MergeableSelector:
    enabled: false
    force_nesting: false

  NameFormat:
    enabled: true
    convention: hyphenated_lowercase
    allow_leading_underscore: true

  NestingDepth:
    enabled: true
    max_depth: 1

  PlaceholderInExtend:
    enabled: true

  PrivateNamingConvention:
    enabled: true
    prefix: _

  PropertyCount:
    enabled: false

  PropertySortOrder:
    enabled: false

  PropertySpelling:
    enabled: true
    extra_properties: []

  PropertyUnits:
    enabled: false

  PseudoElement:
    enabled: true

  QualifyingElement:
    enabled: true
    allow_element_with_attribute: false
    allow_element_with_class: false
    allow_element_with_id: false

  SelectorDepth:
    enabled: true
    max_depth: 3

  SelectorFormat:
    enabled: true
    convention: hyphenated_lowercase
    class_convention: '^(?:u|is|has)\-[a-z][a-zA-Z0-9]*$|^(?!u|is|has)[a-zA-Z][a-zA-Z0-9]*(?:\-[a-z][a-zA-Z0-9]*)?(?:\-\-[a-z][a-zA-Z0-9]*)?$'

  Shorthand:
    enabled: true

  SingleLinePerProperty:
    enabled: true
    allow_single_line_rule_sets: false

  SingleLinePerSelector:
    enabled: true

  SpaceAfterComma:
    enabled: true

  SpaceAfterPropertyColon:
    enabled: true
    style: one_space

  SpaceAfterPropertyName:
    enabled: true

  SpaceAfterVariableColon:
    enabled: true
    style: at_least_one_space

  SpaceAfterVariableName:
    enabled: true

  SpaceAroundOperator:
    enabled: true
    style: one_space

  SpaceBeforeBrace:
    enabled: true
    style: space
    allow_single_line_padding: true

  SpaceBetweenParens:
    enabled: true
    spaces: 0

  StringQuotes:
    enabled: true
    style: single_quotes

  TrailingSemicolon:
    enabled: true

  TrailingZero:
    enabled: true

  TransitionAll:
    enabled: false

  UnnecessaryMantissa:
    enabled: true

  UnnecessaryParentReference:
    enabled: true

  UrlFormat:
    enabled: false

  UrlQuotes:
    enabled: true

  VariableForProperty:
    enabled: false

  VendorPrefixes:
    enabled: true
    identifier_list: base
    include: []
    exclude: []

  ZeroUnit:
    enabled: true
```

Se você não está convencido da necessidade de uso do SCSS-lint, recomendo ler estes ótimos artigos: [Clean Up your Sass with SCSS-lint](https://blog.martinhujer.cz/clean-up-your-sass-with-scss-lint/), [Improving Sass code quality on theguardian.com](https://www.theguardian.com/info/developer-blog/2014/may/13/improving-sass-code-quality-on-theguardiancom) e [An Auto-Enforceable SCSS Styleguide](https://davidtheclark.com/scss-lint-styleguide/).

Se pretendem ligar o SCSS-lint no _build process_ de Grunt, gostarão de saber que há um _plugin_ de Grunt para tal chamado [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint).

Além disso, se estão à procura de uma aplicação boa que funcione com SCSS-lint e afins, o pessoal da [Thoughtbot](https://thoughtbot.com/) (Bourbon, Neat…) estão a trabalhar na [Hound](https://houndci.com/).

## Longo Demais; Não Li

Essas diretrizes são longas e, de vez em quando, é bom tê-las resumidas. Portanto, abaixo segue o resumo.

### Princípios chaves

-   Ter um guia de estilo diz a respeito de ter **consistência**. Se você discorda com algumas de nossas regras, está tudo bem, se você é consistente.
-   O Sass deve ser mantido tão simples quanto ele é. Portanto, evite criar sistemas complexos, a não ser que seja absolutamente necessário.
-   Mantenha em mente que, às vezes, o princípio _KISS_ (Keep It Simple, Stupid) é melhor que o _DRY_ (Don’t Repeat Yourself).

### Sintaxe e formatação

-   Identação é feita com com dois (2) espaços, sem tabulações.
-   Linhas devem ser, tanto quanto possível, menores que 80 caracteres. Sinta-se à vontade para dividi-las em várias linhas, quando necessário.
-   O CSS deve ser bem escrito e, possivelmente, seguindo o [CSS Guidelines](https://cssguidelin.es) de Harry Roberts.
-   Espaços em branco são de grátis, então, use-o para separar itens, regras e declarações. Portanto, não hesite em deixar linhas em branco, afinal, não machuca ninguém.

#### Strings

-   Declarar a diretiva `@charset` no topo da folha de estilos é altamente recomendado.
-   A não ser que aplicadas como identificadores CSS, strings devem ser envoltas em aspas simples. Além disso, URLs também devem ser envoltas em aspas.

#### Números

-   O Sass não faz distinção entre números inteiros e pontos flutuantes, então zeros (0) a direita devem ser omitidos. Contudo, zeros (0) a esquerda ajudam na legibilidade e devem ser adicionados.
-   Valores nulos (0) não devem ter unidades de medidas.
-   Manipulação de unidades devem ser pensadas como operações aritméticas e, não como operações de strings.
-   A fim de melhorar a legibilidade, cálculos complexos devem estar envoltos em parênteses. Além do mais, operações matemáticas complexas devem ser divididas em pedaços menores.
-   Números mágicos dificultam a manutenção do código e devem ser evitados ao máximo. Se hesitar, extensivamente explique este valor questionável.

#### Colors

-   Cores devem ser expressas com valores HSL quando possível, então, RGB e depois valores hexadecimais (minúsculos e encurtados). Além disso, keywords devem ser evitadas.
-   Prefira `mix(..)`, invés de `darken(..)` e `lighten(..)`, quando clareando ou escurecendo uma cor.

#### Listas

-   A menos que usadas como um mapeamento direto para valores CSS separados com espaço, listas devem ser separadas com vírgulas.
-   Envoltá-las em parênteses deve ser considerado, para melhorar a legibilidade.
-   Listas em única linha não devem ter vírgula ao final, diferente de listas com múltiplas linhas.

#### Mapas

-   Mapas com mais de um par, devem ser escritos em múltiplas linhas.
-   Para ajudar a manutenção, o último par do mapa deve ter vírgula no final.
-   Keys que são strings devem ser envoltas em aspas, como qualquer outra string.

#### Classificação de declarações

-   O sistema usado para classificar declarações (alfabético, por tipo e etc.) não importa, contanto que seja consistente.

#### Aninhamento de seletores

-   Evite aninhamento de seletores quando não é necessário (maioria dos casos).
-   Use aninhamento de seletores para pseudo-classes e pseudo-elementos.
-   Media queries também podem ser aninhadas dentro de seus seletores mais importantes.

### Convenções de nomeclatura

-   É melhor se apegar as convenções de nomeclatura CSS (exceto algumas) que usam letras minúsculas e delimitação com hífen.

### Comentando

-   CSS é uma linguagem complicada, então, não hesite em escrever longos comentários sobre coisas que parecem (ou são) esquisitas.
-   Para variáveis, funções, mixins e placeholders usando uma API pública, use comentários do SassDoc.

### Variáveis

-   Não use a flag `!default` para variáveis que são parte de uma API pública, as quais podem ser seguramente alteradas.
-   Não use a flag `!global` no escopo raíz, já que isso pode se tornar uma violação da sintaxe Sass, no futuro.

### Extend

-   Prefira extender placeholders e, não seletores CSS.
-   Extenda placeholders o menos possível, a fim de evitar efeitos colaterais.
