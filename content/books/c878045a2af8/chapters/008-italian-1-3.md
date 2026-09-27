## L’autore

Mi chiamo [Kitty Giraudel](https://kittygiraudel.com), sono uno sviluppatore front-end francese e abito a Berlino, in Germania dal 2015. Al momento lavoro da [Cofenster](https://www.cofenster.com).

Lavoro con Sass da diversi anni e sono la persona che sta dietro a progetti come [SassDoc](http://sassdoc.com), SitePoint Sass Reference e [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/). Se sei interessato ai miei contributi nella comunità di Sass, dai un’occhiata a [questa lista](https://github.com/KittyGiraudel/awesome-sass).

Sono anche l’autore di un libro su CSS (in francese) dal titolo [CSS3 Pratique du Design Web](https://www.eyrolles.com/Informatique/Livre/css3-9782212678963/) (_Eyrolles_ editions) e di un libro su Sass (in inglese) dal titolo [Jump Start Sass](https://learnable.com/books/jump-start-sass) (_Learnable_ editions).

[Trovami su Twitter](https://twitter.com/KittyGiraudel)

## Contributi

“Le linee guida di Sass” è un progetto libero di cui mi prendo cura nel mio tempo libero. Inutile a dirsi, c’è un bel po’ di lavoro da fare per tenere tutto aggiornato, documentato e rilevante. Per fortuna, mi aiutano un sacco di _contributors_ specialmente quando si tratta di mantenere [traduzioni](#options-panel). Ringraziamoli!

Ora, se ti senti di poter contribuire, sappi che già twittare riguardo questo progetto, passar parola o aggiustare qualche errore di battitura aprendo un issue o una pull-request sulla [repository GitHub](https://github.com/KittyGiraudel/sass-guidelines) è già un’ottima cosa!

Aggiungo anche: se t’è piaciuto questo documento, o se è stato utile a te o al tuo team, prendi in considerazione l’idea di supportarlo!

[Supporta Sass Guidelines](https://gum.co/sass-guidelines) [Passaparola](https://twitter.com/share?text=Sass+Guidelines%2C+An+opinionated+styleguide+for+writing+sane%2C+maintainable+and+scalable+Sass+by+%40KittyGiraudel+%E2%80%93&url=https://sass-guidelin.es)

## A proposito di Sass

Questo è come [Sass](https://sass-lang.com) descrive se stesso e la propria [documentazione](https://sass-lang.com/documentation/file.SASS_REFERENCE.html):

> Sass è un’estensione di CSS che aggiunge potenzialità ed eleganza al linguaggio base.

L’obiettivo finale di Sass è di sistemare i difetti di CSS. CSS, come tutti sappiamo, non è il miglior linguaggio di programmazione nel mondo \[citazione necessaria\]. È molto semplice da imparare, ma può diventare presto un casino, specialmente nei progetti grandi.

Ed è qui che arriva Sass, che come meta linguaggio migliora la sintassi di CSS in modo da fornire funzionalità in più e strumenti di supporto extra. Inoltre Sass vuole rimanere conservativo riguardo la sintassi CSS.

Il punto non è rendere CSS un linguaggio di programmazione pieno di funzionalità: Sass vuole solo aiutare dove CSS fallisce. Proprio per questo, iniziare con Sass non è più difficile che imparare CSS: vengono semplicemente aggiunte un paio di funzionalità.

Detto questo, per usare queste funzionalità, ci sono molti modi. Alcuni buoni, altri cattivi, altri inusuali. Queste linee guida intendono fornire un approccio consistente e documentato per scrivere codice in Sass.

### Ruby Sass o LibSass

[La prima commit di Sass](https://github.com/hcatlin/sass/commit/fa5048ba405619273e474a50400c7243fbff54fe) è del lontano 2006, più di dieci anni fa. Inutile dire che è passato molto tempo. Inizialmente è stato sviluppato in Ruby e sono apparsi qua e là vari _porting_. Quello che ha avuto più successo è [LibSass](https://webdesign.tutsplus.com/articles/getting-to-know-libsass--cms-23114) (scritto in C), che è quasi pronto ad essere pienamente compatibile con la versione originale scritta in Ruby.

Nel 2014 [i team di Ruby Sass e LibSass hanno deciso di aspettare che entrambe le versioni fossero sincronizzate prima di andare avanti](https://github.com/sass/libsass/wiki/The-LibSass-Compatibility-Plan). Da allora LibSass ha rilasciato molte versioni ed ha oramai le stesse funzioni del suo fratello maggiore. Le ultime inconsistenze sono raccolte ed elencate da me sul progetto [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/). Se siete a conoscenza di un’incompatibilità non elencata tra le due versioni, per piacere siate così gentili da aprire un _issue_.

Torniamo indietro alla scelta del vostro compilatore. Attualmente tutto dipende dal progetto su cui siete. Se il vostro progetto è in Ruby on Rails, meglio usare Ruby Sass, perfetto in questo caso. Altrimenti sappiate che Ruby Sass è comunque il riferimento per l’implementazione e sarà sempre il primo a ricevere nuove funzionalità, rispetto a Libsass. Se state provando a cambiare da Ruby Sass a LibSass [questo articolo](https://www.sitepoint.com/switching-ruby-sass-libsass/) fa al caso vostro.

Su progetti che non utilizzano Ruby e che necessitano di una integrazione del flusso di lavoro, LibSass è probabilmente un’idea migliore, visto che è pensato maggiormente per essere incluso in _workflow_ differenti. Quindi se volete usarlo con Node.js, ad esempio, potete farlo subito grazie a [node-sass](https://github.com/sass/node-sass).

### Sass o SCSS

C’è sempre molta confusione sulla semantica del nome _Sass_, e per una buona ragione: il nome Sass si riferisce sia al preprocessore che alla propria sintassi. Non proprio comodo eh?

Vedete, inizialmente Sass descriveva una sintassi la cui peculiarità era quella di tener conto dell’indentazione. Molto presto i manutentori di Sass decisero di ridurre il divario tra Sass e CSS fornendo una sintassi più simile al CSS. Questa sintassi chiamata _SCSS_, che sta per _Sassy CSS_, ha il motto: se è valido in CSS, è valido in SCSS.

Da allora Sass (il preprocessor) ha provvisto [due sintassi differenti](https://www.sitepoint.com/whats-difference-sass-scss/): Sass (non in maiuscolo, [per piacere](http://sassnotsass.com)), anche conosciuta come _la sintassi indentata_ e SCSS. Quale delle due usare sta totalmente a voi, visto che entrambe sono uguali in quanto a funzionalità. È solo una questione di estetica a questo punto.

La sintassi indentata si basa sull’indentazione e sugli spazi bianchi per eliminare graffe, punti e virglola e gli altri segni di interpunzione, portando ad una sintassi più snella e breve. Tuttavia, SCSS è più facile da imparare, visto che è per lo più simile al CSS, con giusto qualche pizzico in più.

Personalmente preferisco SCSS a Sass perchè è più vicino al CSS ed è più facile da comprendere per la maggiorparte degli sviluppatori. Proprio per questo, SCSS è la sintassi standard di queste linee guida. Potete passare alla sintassi Sass tramite il .

Thanks to [Cory Simmons](https://github.com/corysimmons) for his help and expertise on this section.

### Altri preprocessor

Sass è un _preprocessor_ come un altro. Il suo maggior concorrente è [LESS](http://lesscss.org/), un _preprocessor_ basato su Node.js, che ha avuto molta popolarità grazie al famoso _framework_ CSS [Bootstrap](https://getbootstrap.com/) che lo utilizza. C’è anche [Stylus](https://stylus-lang.com/), molto capace e flessibile; un po’ più difficile da usare e con una comunità più piccola.

_Perchè scegliere Sass piuttosto che un altro \_preprocessor\_?_ è ancora un’ottima domanda. Non molto tempo fa eravamo soliti raccomandare Sass per progetti basati su Ruby, visto che era sviluppato in Ruby e si comportava egregiamente con _Ruby on Rails_. Ora che Libsass è praticamente identico (o quasi) alla libreria originale, tutto ciò non è più una raccomandazione rilevante.

Quello che mi piace di Sass è il suo approccio conservativo al CSS. Il design di Sass è basato su forti principi. L’approccio allo sviluppo di Sass è una conseguenza alle opinioni del suo team di sviluppo, ovvero: a) visto che aggiungere funzionalità extra ha un costo, questo costo deve essere giustificato da una reale utilità e b) deve essere facile comprendere cosa fa un blocco di stile osservando quel blocco di codice da solo. Inoltre, Sass ha una maggiore attenzione al dettaglio rispetto ad altri _preprocessor_. Da quel che posso dirvi, i designer principali di Sass si preoccupano parecchio di supportare qualsiasi tipo di compatibilità CSS e si rendono certi che ogni comportamento generale sia consistente.

In altre parole, Sass non è un _preprocessor_ volto ad accontentare qualche programmatore/nerd improvvisato a cui piacerebbe aggiungere funzionalità straordinarie ad un linguaggio che non ha nessuna intenzione di supportare logica. È un software volto a risolvere problemi reali; aiuta a fornire funzionalità a CSS dove CSS è inferiore.

_Preprocessor_ a parte, dovremmo parlare anche di strumenti come [PostCSS](https://github.com/postcss/postcss) e [cssnext](https://cssnext.github.io/) che hanno ricevuto parecchia attenzione recentemente.

PostCSS è spesso chiamato (in maniera scorretta) “postprocessor”. Il presupposto - il nome non aiuta - è che PostCSS analizzi il CSS già compilato da un _preprocessor_. Sebbene possa lavorare in questa maniera, non è sempre vero. PostCSS sarebbe piuttosto un _“processor”_.

Con PostCSS è facile accedere a dei “token” del proprio foglio di stile (come selettori, proprietà e valori), processare questi con JavaScript per realizzare qualsiasi operazione e poi compilare il risultato in CSS. Ad esempio, la libreria [Autoprefixer](https://github.com/postcss/autoprefixer) è realizzata proprio con PostCSS. Analizza ogni regola per vedere se ci sono da aggiungere o rimuovere dei _vendor prefix_, facendo riferimento a [CanIUse](https://caniuse.com) per il supporto dei browser.

PostCSS è potentissimo e ottimo per costruire librerie che possono lavorare insieme con altri _preprocessor_, ma certamente non è ancora facile da usare. C’è da conoscere un po’ di JavaScript per fare qualsiasi cosa e la sua API può essere un po’ complicata. Mentre Sass offre solo un set di funzioni che sono utili a scrivere CSS, PostCSS offre un accesso diretto al CSS AST (_abstract syntax tree_) e JavaScript.

In breve Sass è facile e risolve molti dei nostri problemi. Dall’altro lato, PostCSS può essere difficile da maneggiare, se non si è bravi con JavaScript, ma certamente è uno strumento potentissimo. Non c’è motivo per cui uno non dovrebbe usare entrambi. Addrittura, PostCSS offre un _parser_ ufficiale proprio per SCSS.

## Introduzione

### Perché una guida di stile

Una guida di stile non è solamente un bel documento da leggere, che racconta come dovrebbe essere scritto il vostro codice. È un documento importantissimo per la vita di un progetto, che descrive come e perchè il codice dovrebbe esser scritto. Può sembrare una cosa eccessiva per un piccolo progetto, ma aiuta parecchio a mantenere la codebase pulita, scalabile e facile da manutenere.

È ovvio aggiungere che: più sono gli sviluppatori in un progetto, più c’è bisogno di linee guida per il codice. Per lo stesso motivo, più è grande un progetto, più sono necessarie delle linee guida.

[Harry Roberts](https://csswizardry.com) lo spiega molto bene nelle [linee guida CSS](https://cssguidelin.es/#the-importance-of-a-styleguide):

> Una guida di stile per il codice (attenzione, non una guida di stile visivo) è uno strumento prezioso per i team che:
> 
> -   costruiscono e manutengono prodotto per un periodo di tempo ragionevole;
> -   hanno sviluppatori con differenti abilità e specialità;
> -   hanno un numero di sviluppatori diversi che lavorano su un prodotto in diversi momenti;
> -   accolgono spesso nuovi membri
> -   hanno parecchie codebase in cui gli sviluppatori entrano ed escono.

### Disclaimer

Prima di tutto: **questa non è una guida di stile CSS**. Questo documento non andrà a descrivere convenzioni per i nomi delle classi CSS, pattern modulari o la questione degli ID nel CSS. Queste linee guida hanno solo a che fare con contenuti relativi a Sass.

Aggiungo poi che queste linee guida sono _le mie_, per cui è tutto un **secondo me**. Pensate a questo lavoro come ad una raccolta di metodologie e consigli che ho raffinato e selezionato nel corso degli anni. Mi dà anche l’opportunità di segnalare dei link verso contenuti utili; date uno sguardo anche alle sezioni _approfondimenti_.

Naturalmente, quella che illustro non è l’unica maniera per fare le cose e può o non può essere adatta al vostro progetto. Sentitevi liberi di partire da qui e adattare le cose ai vostri bisogni. Come si dice: _le cose potrebbero cambiare_.

### Principi chiave

Alla fin fine, se c’è una cosa che mi piacerebbe arrivasse da tutte queste linee guida è che **[Sass dovrebbe essere scritto il più semplice possibile](https://www.sitepoint.com/keep-sass-simple/)**.

Grazie ai miei esperimenti scemi come [bitwise operators](https://github.com/KittyGiraudel/SassyBitwise), [iterators and generators](https://github.com/KittyGiraudel/SassyIteratorsGenerators) e [a JSON parser](https://github.com/KittyGiraudel/SassyJSON) con Sass, siamo tutti ben consapevoli di ciò che si può fare con questo preprocessore.

D’altro canto, CSS è un linguaggio semplice. Sass, inteso come strumento per scrivere CSS, non dovrebbe essere più complesso del normale CSS. Il [principio KISS](https://en.wikipedia.org/wiki/KISS_principle) (_Keep It Simple Stupid_) è la cosa più importante e può anche prender la precedenza sul [principio DRY](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (_Don’t Repeat Yourself_), in alcune circostanze.

Certe volte è meglio ripetere un po’ di codice per mantenere il tutto più semplice da manutenere, piuttosto che costruire sistemi pesanti, ingombranti e inutilmente complicati che sono un incubo da manutenere perchè troppo complessi.

Fatemi ancora citare [Harry Roberts](https://csswizardry.com): **il pragmatismo vince sulla perfezione**. Ad un certo punto, probabilmente vi troverete ad andare contro le regole descritte in queste linee guida. Se ciò ha un senso, se le cose filano, fatelo. Il codice è solo un mezzo, non il fine.

### Estendere le linee guida

Buona parte di questa guida di stile è scritta secondo le mie opinioni. Sono anni che leggo e scrivo Sass ed ho ormai un sacco di principi quando si tratta di scrivere fogli di stile puliti. Capisco che questo possa non piacere o non andare bene a qualcuno. È perfettamente normale.

Tuttavia credo che le linee guida siano fatte per essere estese. Estendere queste linee guida per Sass potrebbe essere così semplice come avere un documento che afferma che il vostro codice segue le linee di questa guida tranne che per qualche punto. In un caso del genere le regole specifiche andrebbero illustrate successivamente.

Un esempio di estensione di una guida di stile può essere trovata nella [repository SassDoc](https://github.com/SassDoc/sassdoc/blob/master/GUIDELINES.md):

> [Questa](https://github.com/SassDoc/sassdoc/blob/master/GUIDELINES.md) è una estensione della [guida di stile di Node](https://github.com/felixge/node-style-guide) di Felix Geisendörfer. Tutto ciò che è scritto in questo documento può non tenere conto di quanto scritto nella guida di stile di Node.

## Sintassi e formattazione

Se me lo chiedeste, la prima cosa che una guida di stile dovrebbe fare è descrivere il modo in cui vogliamo che il nostro codice sia scritto.

Quando diversi sviluppatori sono coinvolti nello scrivere CSS sullo stesso progetto, è solo questione di tempo prima che uno di loro cominci a scrivere alla sua maniera. Delle linee guida sul codice, che spingono alla coerenza, non servono solo a prevenire ciò, ma aiutano anche quando c’è da leggere e aggiornare il codice.

Ispirandoci senza vergogna a [CSS Guidelines](https://cssguidelin.es/#syntax-and-formatting) vogliamo:

-   indentare con due (2) spazi, non utilizzando tab;
-   avere righe di 80 caratteri, se possibile;
-   scrivere le regole css su più righe;
-   usare in modo ragionato le righe bianche.

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
// Since Sass indented-syntax forces those coding standards
// There is no wrong way of proceeding
.foo
  display: block
  overflow: hidden
  padding: 0 1em
```

### Stringhe

Che ci crediate o no, le stringhe giocano un ruolo fondamentale in CSS così come in Sass. Molti valori CSS possono essere sia lunghezze che identificatori, perciò è molto importante rispettare le linee guida quando si ha a che fare con le stringhe in Sass.

#### Codifica

Per evitare possibili guai con la codifica dei caratteri, è altamente cosigliato forzare l’enconding [UTF-8](https://en.wikipedia.org/wiki/UTF-8) nel [foglio di stile principale](#il-file-main) usando la direttiva `@charset`. Fate attenzione che sia il primo elemento del foglio di stile e che non ci siano caratteri a precederlo.

```
@charset 'utf-8';
```

```
@charset 'utf-8'
```

#### Apici

CSS non ha bisogni di apici per le stringhe, nemmeno per quelle che contengono spazi. Prendete la dichiarazione font-family: non importa se si usano gli apici per i nomi dei font oppure no.

Per questo motivo, Sass non _richiederebbe_ di usare gli apici per le stringe. Meglio ancora (e per fortuna!) una stringa con gli apici è uguale a una senza (`'abc'` è uguale ad `abc`).

Detto questo però, i linguaggi che non richiedono gli apici per le stringhe sono una minoranza, quindi in Sass **le stringhe dovrebbero sempre essere comunque messe dentro singoli apici** (`'`). È preferibile usare gli apici singoli rispetto ai doppi perchè più facili da digitare in una tastiera _qwerty_. Ci sono inoltre diverse ragioni per questa scelta, oltre alla coerenza con altri linguaggi, incluso il cugino JavaScript:

-   i nomi dei colori sono considerati colori solo quando non hanno gli apici, il che può portare diversi problemi;
-   molti degli strumenti di evidenziazione della sintassi non funzionano su stringhe senza apici;
-   aiuta la leggibilità;
-   non c’è nessuna ragione per non aggiungere gli apici alle stringhe.

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

Per le specifiche CSS, la direttiva `@charset` deve essere dichiarata con doppi apici per [poter essere valida](https://www.w3.org/TR/css3-syntax/#charset-rule). Naturalmente, Sass si prende cura di compilare il CSS in maniera corretta. Si può tranquillamente usare il singolo apice, anche per `@charset`.

#### Stringhe come valori CSS

Valori specifici CSS come `initial` o `sans-serif` (alias: identificatori CSS) non hanno bisogno di apici. Dichiarazioni come `font-family: 'sans-serif'` non verranno applicate, in quanto CSS si aspetta un identificatore e non una stringa tra apici. Per questo motivo, meglio non usare gli apici in questi casi.

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

Possiamo fare quindi una distinzione tra le stringhe che vogliamo usare come valori CSS (vedi l’esempio qui sopra) e stringhe che si riferiscono a dati Sass, come le _chiavi_ di una _mappa_.

Non usiamo gli apici nel primo caso, ma usiamo gli apici singoli nel secondo.

#### Stringhe che contengono apici / apostrofi

Se una stringa contiene uno o più apici singoli o apostrofi, si può considerare di utilizzare per la stringa il doppio apice (`"`), in modo da evitare di spezzare la stringa.

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

#### URL

Le URL dovrebbero sempre essere tra apici, per le stesse ragioni:

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

### Numeri

In Sass, i numeri sono un tipo di dato che include cifre senza unità, lunghezze, durate, frequenze, angoli e così via. Abbiamo così la possibilità di fare calcoli usando queste misure.

#### Zero

I numeri dovrebbero avere lo zero prima di un valore decimale inferiore a uno. Non scrivete mai zero alla fine del valore.

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

Usando Sublime Text o altri editor, si può usare la funzione cerca / rimpiazza con espressioni regolari. È facile allora aggiungere uno zero ai numeri con la virgola. Semplicemente, basta rimpiazzare il codice `\s+\.(\d+)` con `\ 0.$1`. Non dimenticate anche lo spazio prima dello `0`

#### Unità di misura

Quando si ha a che fare con le lunghezze, un valore `0` non dovrebbe mai avere l’unità di misura.

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

Attenzione: questa pratica è limitata solo alle lunghezze. Uno zero senza unità di misura per proprietà come `transition-delay` non è ammesso. In teoria non sarebbe valido e verrebbe scartato. Non tutti i browser però si comportano così. In pratica: omettete le unità di misura solo per le lunghezze.

L’errore più comune che si può immaginare riguardo i numeri e Sass è pensare che le unità di misura siano solo stringhe che si possono aggiungere ai numeri. Se delle volte è vero, non è così che le unità di misura funzionano in Sass. Le unità di misura dovrebbero essere immaginate come simboli algebrici. Ad esempio, moltiplicare 5 pollici per 5 pollici ci dà 25 pollici quadrati. La stessa logica va applicata a Sass.

Per aggiungere l’unità di misura ad un numero, basta moltiplicare il numero per _1 unità_.

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

Funziona anche aggiungere _0 di quella unità di misura_, ma consiglierei il metodo precedente, dato che aggiungere _0 unità_ può creare confusione. Quando invece proviamo a convertire un numero in un altra unità di misura compatibile, aggiungere lo zero non serve a nulla. Per saperne di più potete leggere [questo articolo](https://css-tricks.com/snippets/sass/correctly-adding-unit-number/).

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

Dipende quindi da cosa si sta cercando di ottenere. C’è da ricordare che aggiungere l’unità come una stringa non è una buona maniera di procedere.

Per rimuovere l’unità di misura di un valore, basta dividere di _una unità del suo genere_.

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

Aggiungere un’unità di misura come stringa ad un numero genera una stringa, impendendo qualsiasi altra operazione sul valore. Anche fare uno `str-slice` (ovvero tagliare una parte della stringa), prendendo solo la parte numerica, genererà comunque una nuova stringa. Non è certo quel che vogliamo. [Usiamo lunghezze, non stringhe](https://kittygiraudel.com/2013/09/03/use-lengths-not-strings/).

#### Calcoli

**I calcoli numerici dovrebbero essere sempre contenuti all’interno di parentesi tonde**. Non solo così aumenterete di molto la leggibilità, ma eviterete alcuni casi limite, forzando Sass a valutare il contenuto delle parentesi prima di procedere con altri calcoli.

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

#### Numeri magici

Il “Numero magico” è un [termine da vecchia scuola della programmazione](https://en.wikipedia.org/wiki/Magic_number_\(programming\)#Unnamed_numerical_constants) utilizzato per descrivere _costanti numeriche senza nome_. In pratica si tratta di un numero casuale che semplicemente _funziona_ anche senza nessuna logica dietro.

Non ci sarebbe bisogno di dirlo ma: **i numeri magici sono una piaga e dovrebbero essere evitati a qualsiasi costo**. Quando non riuscite a capire perchè un numero funziona, aggiungete almeno un bel commento esaustivo, che spiega per bene come siete arrivati ad utilizzare questo numero e come mai pensate che funzioni. Ammettere che non sapete precisamente come funziona è comunque un aiuto per il prossimo sviluppatore che metterà mano al vostro codice.

```
/**
 * 1. Magic number. This value is the lowest I could find to align the top of
 * `.foo` with its parent. Ideally, we should fix it properly.
 */
.foo {
  top: 0.327em; /* 1 */
}
```

```
/**
 * 1. Magic number. This value is the lowest I could find to align the top of
 * `.foo` with its parent. Ideally, we should fix it properly.
 */
.foo
  top: 0.327em /* 1 */
```

Su questo argomento c’è questo [magnifico articolo](https://css-tricks.com/magic-numbers-in-css/) sui numeri magici in CSS e vi consiglio di leggerlo.

### Colori

I colori occupano un importante posto nel mondo CSS. Ovviamente Sass è un nostro grande alleato quando si tratta di manipolare i colori, per lo più fornendoci una serie di [potenti funzioni](https://sass-lang.com/documentation/Sass/Script/Functions.html).

Sass è così utile quando si tratta di manipolare colori, che sono spuntati ovunque su internet articoli su questo argomento. Posso raccomandarvene alcuni da leggere:

-   [How to Programmatically Go From One Color to Another](https://kittygiraudel.com/2014/01/30/programmatically-go-from-one-color-to-another-with-sass/)
-   [Using Sass to Build Color Palettes](https://www.sitepoint.com/using-sass-build-color-palettes/)
-   [Dealing with Color Schemes in Sass](https://www.sitepoint.com/dealing-color-schemes-sass/)

#### Formati di colore

Per creare colori nel modo più semplice possibile, il mio consiglo è quello di seguire questo ordine di preferenze per il formato colore:

1.  [Notazione HSL](https://en.wikipedia.org/wiki/HSL_and_HSV);
2.  [Notazione RGB](https://en.wikipedia.org/wiki/RGB_color_model);
3.  Notazione Esadecimale (minuscolo e in versione abbreviata).

Le parole chiave CSS non dovrebbero essere utilizzate, tranne che per prototipazione fatta al volo. Inoltre sono parole in inglese e alcune di loro non descrivono perfettamente il colore che rappresentano, soprattutto per chi non è madrelingua. Oltre a questo, le parole chiave CSS non sono perfettamente semantiche; per esempio `grey` (grigio), è più scuro di `darkgrey` (grigio scuro), inoltre si può generare confusione tra `grey` (grigio in inglese) e `gray` (grigio in americano), introducendo inconsistenza nell’uso di questo colore.

La rappresentazione HSL del colore non solo è la più facile da comprendere per il cervello umano \[citazione necessaria\], ma rende anche più facile sistemare i colori, manipolando separatamente la tonalità, la saturazione e la luminosità.

RGB ha il beneficio di mostrare chiaramente se il colore è più rosso, verde o blu. Per questo motivo delle volte risulta migliore dell’HSL, specialmente quando si tratta di descrivere colori primari puri. Tuttavia non rende molto semplice creare un colore mescolando le tre parti.

Infine, poniamo l’esadecimale, praticamente indecifrabile per la mente umana. Utilizzatelo solo come ultima risorsa, se proprio dovete.

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

Quando usate la notazione HSL o RGB, aggiungete sempre un singolo spazio dopo la virgola (`,`) e non inserite nessuno spazio tra le parentesi tonde e il contenuto (`(`, `)`).

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

#### Colori e variabili

Quando usate un colore più di una volta, abbinatelo ad una variabile con un nome che serva a rappresentare il colore.

```
$sass-pink: hsl(330, 50%, 60%);
```

```
$sass-pink: hsl(330, 50%, 60%)
```

Ora potete usare questa variabile ovunque vogliate. Se il vostro utilizzo è fortemente legato ad un tema mi sento di sconsigliare l’uso di questa variabile così com’è. Associatela ad un’altra variabile che descriva come questo colore dovrebbe essere usato.

```
$main-theme-color: $sass-pink;
```

```
$main-theme-color: $sass-pink
```

Fare così vi eviterà di dover cambiare domani il tema con qualcosa del genere: `$rosa-sass: blue`. [Questo articolo](https://davidwalsh.name/sass-color-variables-dont-suck) fa un ottimo lavoro nello spiegare perché è importante pensare bene al nome da dare alle vostre variabili di colore.

#### Schiarire e scurire i colori

Entrambe le funzioni [`lighten`](https://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method) (schiarisci) e [`darken`](https://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method) (scurisci) manipolano la luminosità di un colore nello spazio HSL, aggiungendo o sottraendo luminosità allo spazio colore. In pratica non sono altro che alias che si riferiscono al parametro `$lightness` (luminosità) della funzione [`adjust-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#adjust_color-instance_method) (regola colore).

In pratica, queste funzioni non danno spesso il risultato sperato. D’altra parte la funzione [`mix`](https://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method) è un ottimo modo per schiarire o scurire un colore, mischiandolo con il `white` (bianco) o `black` (nero).

Il beneficio di usare `mix` al posto di una delle due funzioni di cui sopra è che `mix` è più graduale e vi consente di andare verso il nero (o il bianco) diminuendo la proporzione del colore, mentre `darken` e `lighten` hanno la tendenza a rendere il risultato direttamente nero o bianco molto velocemente.

  

L’illustrazione della differenza tra `lighten`/`darken` e `mix` è di [KatieK](https://codepen.io/KatieK2/pen/tejhz/)

Se non vi và di scrivere la funzione `mix` tutte le volte, potete creare due funzioni pronte all’uso: `tint` and `shade` (già incluse in [Compass](http://compass-style.org/reference/compass/helpers/colors/#shade)) che fanno in pratica la stessa cosa:

```
/// Slightly lighten a color
/// @access public
/// @param {Color} $color - color to tint
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}

/// Slightly darken a color
/// @access public
/// @param {Color} $color - color to shade
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}
```

```
/// Slightly lighten a color
/// @access public
/// @param {Color} $color - color to tint
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function tint($color, $percentage)
  @return mix($color, white, $percentage)

/// Slightly darken a color
/// @access public
/// @param {Color} $color - color to shade
/// @param {Number} $percentage - percentage of `$color` in returned color
/// @return {Color}
@function shade($color, $percentage)
  @return mix($color, black, $percentage)
```

La funzione [`scale-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method) (gamma colore) è stata creata per scalare le proprietà in modo più fluido, prendendo in conto quanto già il colore di partenza sia chiaro o scuro. Questo può darci risultati buoni come quelli di `mix`, ma con un nome di funzione più chiaro. Tuttavia il fattore di scala del colore non è esattamente lo stesso.

### Liste

Le liste sono l’equivalente Sass degli array. Una lista, a differenza di una [mappa](#mappe), è una struttura piatta creata per contenere valori di ogni tipo (incluse altre liste, creando così liste annidate).

Le liste dovrebbero rispettare le seguenti linee guida:

-   possono essere scritte in una o più righe a seconda dei casi;
-   vanno obbligatoriamente su più linee nel caso siano troppo lunghe per stare in una riga di 80 caratteri;
-   a meno che non siano usati per CSS, hanno sempre una virgola come separatore;
-   sono sempre incluse in parentesi tonde;
-   una virgola di chiusura solo se su più righe.

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

Quando si aggiunge un nuovo elemento ad una lista, bisogna sempre utilizzare la API fornita. Non provate ad aggiungere nuovi elementi manualmente.

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

In [questo articolo](https://kittygiraudel.com/2013/07/15/understanding-sass-lists/), mostro un sacco di consigli e trucchi per gestire e manipolare correttamente le liste in Sass.

### Mappe

Gli autori di fogli di stile possono definire con Sass delle mappe — il termine Sass per definire array associativi, hash o addirittura oggetti JavaScript. Una mappa è una struttura dati associativa composta da chiavi e valori. Entrambe le chiavi e i valori di una mappa possono essere di differenti tipi di dato, incluso il tipo mappa. Tuttavia sconsiglio di utilizzare tipi di dato complessi come chiavi di una mappa, anche solo per amore della sanità mentale.

Le mappe dovrebbero essere così scritte:

-   uno spazio dopo i due punti (`:`);
-   parentesi di apertura (`(`) sulla stessa riga dei due punti (`:`);
-   **chiavi all’interno di apici** nel caso siano stringhe (il che rappresenta il 99% dei casi);
-   ogni coppia chiave/valore su una nuova riga;
-   una virgola (`,`) alla fine di ogni coppia chiave/valore;
-   **una virgola di chiusura** (`,`) inserita dopo l’ultimo elemento, in modo da rendere più facile l’aggiunta, la rimozione o il riordino di elementi;
-   la parentesi di chiusura (`)`) deve andare su una nuova riga;
-   nessuno spazio o nuova riga tra la parentesi di chiusura (`)`) e il punto e virgola (`;`).

Esempio:

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

Questa funzionalità è stata a lungo desiderata e gli articoli a riguardo sono molti. Eccone qui tre di cui raccomando la lettura: [Using Sass Maps](https://www.sitepoint.com/using-sass-maps/), [Extra Map functions in Sass](https://www.sitepoint.com/extra-map-functions-sass/), [Real Sass, Real Maps](http://blog.grayghostvisuals.com/sass/real-sass-real-maps/).

### Set di regole CSS

A questo punto non ci rimane che ripassare qualcosa che tutti sappiamo, ovvero come andrebbe scritto un set di regole CSS (almeno secondo la maggior parte delle linee guida, inclusa [CSS Guidelines](https://cssguidelin.es/#anatomy-of-a-ruleset)):

-   selettori correlati sulla stessa riga; non correlati su una nuova riga;
-   la graffa di apertura (`{`) deve essere separata dall’ultimo selettora da uno spazio;
-   ogni dichiarazione deve avere una propria riga;
-   uno spazio dopo i due punti (`:`);
-   un punto e virgola di chiusura (`;`) alla fine di tutte le dichiarazioni;
-   la graffa di chiusura (`}`) deve avere una proria riga;
-   una nuova riga dopo la graffa di chiusura `}`.

Esempio:

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

In aggiunta a queste linee guida correlate al CSS, facciamo attenzione ai seguenti punti:

-   le variabili locali devono essere dichiarate prima di ogni dichiarazione e devono essere separate dalle dichiarazioni da una nuova riga vuota;
-   i mixin senza alcun `@content` devono essere inseriti prima delle dichiarazioni;
-   selettori annidati vanno sempre preceduti da una riga vuota;
-   mixin con un `@content` vanno dopo i selettori annidati;
-   nessuna nuova riga prima della graffa di chiusura (`}`).

Esempio:

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

### Ordine delle dichiarazioni

Non credo ci siano molti altri argomenti oltre a come ordinare dichiarazioni CSS, che abbiano opinioni così divergenti. Ci sono due fazioni principali:

-   ordine alfabetico;
-   ordine di dichiarazioni in base al tipo di dichiarazione (position, display, colori, font, eccetera…).

Ci sono pro e contro per entrambi i modi. Da una parte, l’ordine alfabetico è (almeno per chi usa l’alfabeto latino) universale, quindi non ci possono essere discussioni su come ordinare una proprietà rispetto ad un’altra. Tuttavia è davvero strano per me vedere proprietà come `bottom` e `top` non una affianco all’altra. Perchè le animazioni devono essere prima delle proprietà di posizionamento? Ci sono un sacco di stranezze nell’ordinare alfabeticamente.

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

D’altro canto, ordinare le proprietà per tipo ha perfettamente senso. Tutte le dichiarazioni correlate ai font sono riunite, `top` e `bottom` sono vicine tra loro a leggere un set di regole sembra come leggere un riassunto. Ma a meno che non vi affidiate a qualche convenzione come: [Idiomatic CSS](https://github.com/necolas/idiomatic-css), ci sarà fin troppo spazio per l’interpretazione sul come fare le cose. Dove va a finire `white-space`: font o display? A quale gruppo appartiene precisamente `overflow`? In che modo le proprietà di un gruppo devono essere ordinate (alfabeticamente, sarebbe ironico)?

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

C’è un altro interessante metodo riguardo l’ordine delle proprietà CSS: [Concentric CSS](https://github.com/brandon-rhodes/Concentric-CSS), anche questo abbastanza popolare. In pratica, Concentric CSS si basa sul box-model per definire un ordine: si parte dall’esterno e ci si muove all’interno.

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

Io posso dirvi che non riesco a decidermi. Un [sondaggio recente su CSS-Tricks](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/) si è concluso con il 45% degli sviluppatori che ordina le proprie dichiarazione secondo il tipo, il 14% in modo alfabetico. Ma c’è anche un 39% che le ordina in maniera randomica, me incluso.

  ![Il grafico mostra come gli sviluppatori ordinano le loro dichiarazioni CSS ](https://sass-guidelin.es/assets/images/css-order-chart.png)

Il grafico mostra come gli sviluppatori ordinano le loro dichiarazioni CSS

Proprio per questo, non voglio imporre una scelta in queste linee guida. Scegliete quella che preferite, purchè la manteniate in modo consistente nei vostri fogli di stile (quindi il metodo _random_ non vale).

Uno [studio recente](https://web.archive.org/web/20190618180712/http://peteschuster.com/2014/12/reduce-file-size-css-sorting/) mostra che usare [CSS Comb](https://github.com/csscomb/csscomb.js) (che utilizza [l’ordine per tipo](https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json)) migliora la compressione Gzip del 2.7%, rispetto al miglioramento dell’ 1.3% dell’ordine alfabetico.

### Selettori annidati

Una particolare funzionalità, che Sass fornisce e di cui molti sviuppatori stanno abusando, è quella dei _selettori annidati_. Annidare i selettori offre agli autori di fogli di stile un modo per generare lunghi selettori annidando selettori più corti uno dentro l’altro.

#### Regola generale

Per esempio, il seguente codice Sass:

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

… genererà questo CSS:

```
.foo .bar:hover {
  color: red;
}
```

Allo stesso modo, a partire da Sass 3.3 è possibile utilizzare il riferimento al selettore corrente (`&`) per generare selettori avanzati. Ad esempio:

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

… genererà:

```
.foo-bar {
  color: red;
}
```

```
.foo-bar
  color: red
```

Questo approccio è molto utilizzato con la [convenzione BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) per generare selettori `.blocco__elemento` e `.block--modificatore` basati sul selettore originale (`.blocco` in questo caso).

Questa nota potrebbe essere aneddotica, ma segnalo comunque che generare un nuovo selettore partendo dal riferimento al selettore corrente (`&`) rende questi selettori non ricercabili nella codebase, in quanto non esistono come entità singole.

Il problema con i selettori annidati è che rendono definitivamente il codice molto più difficile da leggere. Chi legge deve mentalmente calcolare il selettore risultante a seconda dei livelli di indentazione; non è quindi sempre ovvio quale sarà il CSS generato.

Questo diventa sempre più vero man mano che i selettori diventano più lunghi e i riferimenti al selettore corrente (`&`) diventano più frequenti. Ad un certo punto, il rischo di perdere traccia e di non capire più cosa sta accadendo diventa sempre più grande, tanto che annidare non vale più la pena.

Per prevenire queste situazione, abbiamo discusso a lungo qualche anno fa riguardo [la regola Inception](https://thesassway.herokuapp.com/beginner/the-inception-rule). Il suggerimento è semplice, ovvero evitare di andare oltre 3 livelli di profondità, come riferimento al film Inception di Christopher Nolan. Io sarei più drastico e raccomando di **evitare i selettori annidati il più possibile**.

Per quanto ci siano alcune eccezioni a questa regola, come vedremo nella prossima sezione, questa opinione pare essere molto popolare. Potete leggere a riguardo qualcosa su questi articoli: [Beware of Selector Nesting](https://www.sitepoint.com/beware-selector-nesting-sass/) e [Avoid nested selectors for more modular CSS](https://thesassway.herokuapp.com/intermediate/avoid-nested-selectors-for-more-modular-css).

#### Eccezioni

Per iniziare: è consentito ed anche raccomandato annidare pseudo-classi e pseudo-elementi al selettore iniziale.

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

Utilizzare selettori annidati per le pseudo-classi e gli pseudo-elementi non solo ha senso (perchè riguardano da vicino il selettore correlato), ma aiuta anche ad avere tutto quel che riguarda un componente nello stesso punto.

Inoltre, quando si utilizza uno stato di classe agnostico, come `is-active`, è totalmente corretto annidarlo sotto il selettore del componente per tenere le cose compatte.

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

Infine, quando si stila un elemento perchè contenuto da un altro specifico elemento, è corretto utilizzare l’annidamento per tenere tutto ciò che riguarda un componente nello stesso spazio.

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

Come per tutto, le specifiche sono sì rilevanti, ma è la consistenza la chiave. Se vi sentite pienamente fiduciosi di un selettore annidato, allora utilizzatelo. Solo siate sicuri che tutto il team sia d’accordo con voi.

## Convenzione sui nomi

In questa parte non andremo a parlare di qual è il miglior modo per creare nomi nel CSS in modo da assicurare manutenibilità e scalabilità. Non solo sta a te scegliere, ma è anche fuori dalla portata di queste linee guida Sass. Io suggerisco le convenzioni raccomandate da [CSS Guidelines](https://cssguidelin.es/#naming-conventions).

Ci sono alcune cose a cui si possono dare nomi in Sass, ed è importante scegliere bene, in modo che l’intera codebase sia coerente e facile da leggere:

-   variabili;
-   funzioni;
-   _mixin_;

I placeholder di Sass sono stati omessi deliberatamente da questa lista, dato che possono esser considerati come dei normali selettori CSS, che seguono dunque la stessa convenzione dei nomi delle classi.

Riguardo variabili, funzioni e _Mixin_, rimaniamo con qualcosa di molto _CSS_: **minuscolo separato da trattino** e accertiamoci che abbiano un senso.

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

### Costanti

Se ti capita di essere uno sviluppatore di _framework_, o di scrivere una libreria, può capitare di trovarsi di fronte a variabili che non sono intese come qualcosa da poter aggiornare in ogni circostanza: sono delle costanti. Sfortunatamente (o fortunatamente?) Sass non offre nessuna maniera per definire queste entità. Dobbiamo così far leva su una stretta convenzione per i nomi in modo da raggiungere il nostro obiettivo.

Come per molti linguaggi, suggerisco di nominare le variabili costanti completamente in maiuscolo e divise da trattino basso nel caso formato da più parole. Non solo questa è una convenzione piuttosto vecchia, ma rende anche evidente la differenza con le variabili minuscole-trattino.

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

Se volete davvero giocare con l’idea di costanti in Sass, dovreste leggere [questo articolo sull’argomento](https://www.sitepoint.com/dealing-constants-sass/).

### Namespace

Se si vuol distribuire il proprio codice Sass, ad esempio in una libreria, un framework, una griglia o qualsiasi altra cosa, si può considerare di applicare un namespace alle proprie variabili, funzioni, _mixin_ e _placeholder_, in modo da evitare conflitti con altro codice.

Ad esempio, se si lavora su un progetto _Sassy Unicorn_ che sarà adottato da sviluppatori di tutto il mondo, si può considerare di usare `su-` come namespace. Questo è abbastanza specifico per prevenire qualsiasi collisione con altri nomi, e abbastanza corto da non essere una palla da scrivere ogni volta.

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

Notare che il namespace automatico è un obiettivo del progetto della prossima ristrutturazione di `@import` prevista per Sass 4.0. Quando sarà disponibile, diventerà sempre meno utile inserire un namespace a mano; librerie che contengono namespace manuali saranno addirittura più difficili da usare.

## Architettura

Una delle cose più difficili da fare è decidere la giusta architettura per un progetto CSS. Mantenere questa architettura coerente e facile da capire è ancora più complicato.

Fortunatamente, uno dei benefici principali dell’usare un preprocessore CSS è quello di avere la capacità di dividere la codebase in diversi file, senza impattare sulla performance (usando la direttiva `@import`). Grazie alla capacità della direttiva `@import` di Sass, usare molti file durante lo sviluppo non solo è totalmente sicuro, ma anche raccomandato. Questi file saranno poi compilati in un unico file quando il codice sarà compilato per l’ambiente di produzione.

Detto questo, non mi stancherò mai di sottolineare quanto sia importante dividere questi file in cartelle, anche per progetti piccoli. A casa non mettiamo tutti i nostri fogli di carta in una scatola. Li dividiamo in cartelle: una per i documenti della casa, una per la banca, una per le bollette e così via. Non c’è ragione per non far così anche quando si struttura un progetto CSS. Dividere la codebase dentro cartelle separate, ognuna con il proprio ruolo, ci aiuterà a trovare le cose quando torneremo sul codice in un secondo momento.

Ci sono [molti modi](https://www.sitepoint.com/look-different-sass-architectures/) per organizzare i file di un progetto CSS: [OOCSS](https://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/), [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), simil-[Bootstrap](https://getbootstrap.com/), simil-[Foundation](https://get.foundation/)… Hanno tutti i propri meriti, i vantaggi e gli svantaggi.

Io uso un approccio che sembra piuttosto simile a [SMACSS](http://smacss.com/) di [Jonathan Snook](https://snook.ca/), che mantiene le cose semplici e facili da capire.

Ho imparato che l’architettura il più delle volte è differente da progetto a progetto. Sentitevi liberi di adattare o modificare completamente la soluzione proposta, in modo da poter ottenere un sistema che fa al caso vostro.

### Componenti

C’è una differenza sostanziale tra il _far funzionare qualcosa_ e il farlo funzionare _bene_. Anche qui CSS si rivela un bel casino \[necessaria citazione\]. Meno CSS abbiamo, meglio è. Non vogliamo aver a che fare con megabyte di codice CSS. Per mantenere i fogli di stile piccoli ed efficienti —è non c’è da sorprendersi— è una buona idea pensare all’interfaccia come ad un insieme di componenti.

Qualsiasi cosa può essere un componente, purchè:

-   faccia una e una sola cosa;
-   sia riutilizzabile e riusata all’interno del progetto;
-   sia indipendente.

Ad esempio, una form di ricerca potrebbe essere considerata come un componente. Potrebbe essere riutilizzabile in diverse posizioni, in diverse pagine, in diverse situazioni. Il componente non dovrebbe dipendere dalla sua posizione nel DOM (footer, sidebar, contenuto principale…).

La maggior prte delle interfacce può essere pensata come un insieme di piccoli componenti. Suggerisco di tener sempre presente questo paradigma. Questo non solo ridurrà la quantità di CSS di cui il progetto avrà bisogno, ma ci porterà anche ad avere un codice più semplice da manutenere rispetto a un caos dove tutto è mischiato.

### La struttura dei componenti

I componenti dovrebbero essere idealmente descritti ciascuno nel loro file .sass parziale. Dovrebbero essere poi contenuti all’interno della cartella `components/`, come descritto nel [7-1 pattern](#il-pattern-7-1)) - ad esempio: `components/_button.scss`. Lo stile descritto in ciascuno di questi file dovrebbe solo includere:

-   lo stile del componente;
-   lo stile delle variazioni del componente;
-   lo stile dei discendenti del componente (ad esempio, gli elementi figli), se necessario.

Se si vuol fare in modo che il proprio componente possa essere _temizzato_ (ad esempio, in un tema contenuto nella cartella `themes/`), bisogna limitarsi solo alle dichiarazioni della struttura, come ad esempio le dimensioni (width/height), il padding, i margini, l’allineamento etc. Bisogna escludere gli stili come ad esempio i colori, le ombre, le dichiarazioni del font, il background etc.

Un parziale dedicato al componente può includere variabili specifice per il comeponente, _placeholders_ e anche funzioni e _mixins_. C’è da ricordare che bisognerebbe evitare di riferirsi a file (ad esempio, usando `@import`) che provengono da altri componenti. L’alternativa è creare una serie di dipendenze che renderanno il progetto un macello inmanutenibile.

Ecco un esempio del parziale di un componente:

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

Grazie a [David Khourshid](https://twitter.com/davidkpiano) per aver dato una mano in questa sezione.

### Il pattern 7-1

Torniamo all’architettura, che ne dite? Io di solito utilizzo ciò che chiamo il _pattern 7-1_: 7 cartelle, 1 file. In pratica si hanno tutti i file parziali dentro sette cartelle differenti e un singolo file al livello root (di solito chiamato `main.scss`) che importa il resto dei file. Questo viene compilato in un singolo foglio CSS.

-   `abstracts/`
-   `base/`
-   `components/`
-   `layout/`
-   `pages/`
-   `themes/`
-   `vendors/`

E naturalmente:

-   `main.scss`

  

Wallpaper di [Julien He](https://twitter.com/julien_he)

Idealmente, avremo qualcosa simile a questo:

```
sass/
|
|– abstracts/
|   |– _variables.scss    # Sass Variabili
|   |– _functions.scss    # Sass Funzioni
|   |– _mixins.scss       # Sass Mixins
|   |– _placeholders.scss # Sass Placeholders
|
|– base/
|   |– _reset.scss        # Reset/normalize
|   |– _typography.scss   # Regole di tipografia
|   …                     # Etc.
|
|– components/
|   |– _buttons.scss      # Bottoni
|   |– _carousel.scss     # Carousel
|   |– _cover.scss        # Cover
|   |– _dropdown.scss     # Dropdown
|   …                     # Etc.
|
|– layout/
|   |– _navigation.scss   # Navigazione
|   |– _grid.scss         # Griglia
|   |– _header.scss       # Header
|   |– _footer.scss       # Footer
|   |– _sidebar.scss      # Sidebar
|   |– _forms.scss        # Forms
|   …                     # Etc.
|
|– pages/
|   |– _home.scss         # Stili specifici per la Home
|   |– _contact.scss      # Stili specifici per la pagina Contact
|   …                     # Etc.
|
|– themes/
|   |– _theme.scss        # Tema di default
|   |– _admin.scss        # Tema admin
|   …                     # Etc.
|
|– vendors/
|   |– _bootstrap.scss    # Bootstrap
|   |– _jquery-ui.scss    # jQuery UI
|   …                     # Etc.
|
`– main.scss              # File principale
```

I file seguono la stessa convenzione sui nomi descritta prima: sono separati dal trattino.

#### La cartella Base

La cartella `base/` contiene ciò che potremmo chiamare il codice boilerplate per il progetto. Qui troveremo il file di reset, qualche regola tipografica, e probabilmente un foglio di stile (che di solito chiamo `_base.scss`), il quale definisce alcuni stili standard per elementi HTML comunemente usati.

-   `_base.scss`
-   `_reset.scss`
-   `_typography.scss`

Se il progetto usa _molto_ le animazioni CSS, si potrebbe pensare di aggiungere un file `_animations.scss` che contiene le definizioni dei `@keyframes` per le animazioni. Se si usano solo sporadicamente, meglio farle vivere nei selettori che le usano.

#### La cartella Layout

La cartella `layout/` contiene tutto ciò che si occupa di creare i layout del sito o dell’applicazione. Questa cartella può raccogliere i fogli di stile per le parti principali del sito (header, footer, navigazione, sidebar…), la griglia (grid), o anche le regole CSS per tutte le form.

-   `_grid.scss`
-   `_header.scss`
-   `_footer.scss`
-   `_sidebar.scss`
-   `_forms.scss`
-   `_navigation.scss`

La cartella `layout/` può anche essere chiamata `partials/`; dipende da ciò che preferite.

#### La cartella Components

Per i piccoli componenti, c’è la cartella `components/`. Mentre `layout/` è _macro_ (definisce il _wireframe_ globale), `components/` è più focalizzato sui widget. Contiene tutti i moduli specifici come uno slider, un loader, un widget, e via dicendo. Di solito ci sono molti file in `components/`, dato che l’intera applicazione andrebbe composta come l’insieme di tanti piccoli moduli

-   `_media.scss`
-   `_carousel.scss`
-   `_thumbnails.scss`

La cartella `components/` può essere anche chiamata `modules/`; dipende da ciò che preferite.

#### La cartella Pages

Se si hanno stili specifici per una pagina, è meglio raccoglierli in un file con lo stesso nome in una cartella `pages/`. Non è così strano avere stili particolari per la home page, che avranno bisogno di un `_home.scss` nella cartella `pages/`.

-   `_home.scss`
-   `_contact.scss`

A seconda del processo di deploy, questi file possono essere richiamati indipendentemente nella pagina, piuttosto che essere raccolti col resto del foglio di stile in un unico file. Vedete voi.

#### Cartella Themes

In grossi siti o applicazioni, non è strano avere bisogno di differenti temi. Ci sono molti diversi modi per lavorare bene coi temi. Personalmente mi piace averli tutti in una cartella `themes/`.

-   `_theme.scss`
-   `_admin.scss`

Il bisogno di questa cartella dipende dal progetto. In molti progetti potrebbe non essercene la necessità.

#### La cartella Abstracts

La cartella `abstracts/` raccoglie tutti gli strumenti e gli helper usati nel progetto. Tutte le variabili globali, le funzioni, i mixin e i placeholder dovrebbero essere messi qui dentro.

La regola vuole che questa cartella non produca una singola linea di CSS quando compilata. Qui ci sono solo Sass helper.

-   `_variables.scss`
-   `_mixins.scss`
-   `_functions.scss`
-   `_placeholders.scss` (spesso chiamata `_helpers.scss`)

Quando si lavora in un progetto grande, con molte _utility_ astratte, sarebbe buono raggrupparle per argomento piuttosto che per tipo. Ad esempio: tipografia (`_typography.scss`), temi (`_theming.scss`), etc. Ogni file contiene tutti gli helper come variabili, funzioni, mixin e placeholder. Facendo così si può ottenere un codice più facile da capire e mantenere, specialmente quando i file diventano parecchio lunghi.

La cartella `abstracts/` può anche essere chiamanta `utilities` o `helpers`, a seconda di come si preferisce.

#### La cartella Vendors

Ultima ma non ultima, la cartella `vendors/` presente in molti progetti contiene tutti i file CSS che provengono da librerie e framework esterni – Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered, e così via. Mettere tutto nella stessa cartella è un buon modo per dire “Ehi, questa non è roba mia, non è il mio codice, non è mia responsabilità”.

-   `_normalize.scss`
-   `_bootstrap.scss`
-   `_jquery-ui.scss`
-   `_select2.scss`

Se c’è da sovrascrivere una parte di qualche file Vendor, consiglio di avere un’ottava cartella, chiamata `vendors-extensions/` nella quale avere i file chiamati esattamente nella stessa maniera dei file Vendor che andranno a sovrascrivere.

Ad esempio, `vendors-extensions/_bootstrap.scss` è un file che contiene tutto il CSS che ri-dichiara alcune dei default di Bootstrap. Evitate di modificare direttamente i file Vendor: non è una buona idea.

#### Il file Main

Il file principale (Main, spesso chiamato `main.scss`) dovrebbe essere l’unico file Sass nell’intera codebase a non iniziare per trattino basso (underscore). Questo file non contiene nient’altro che `@import` e commenti.

I file dovrebbero essere importati secondo la cartella dove risiedono, una dopo l’altra in quest’ordine:

1.  `vendors/`
2.  `abstracts/`
3.  `base/`
4.  `layout/`
5.  `components/`
6.  `pages/`
7.  `themes/`

Per preservare la leggibilità, il file Main deve rispettare queste linee guida:

-   ogni `@import` è riferito ad un singolo file;
-   Un `@import` per riga;
-   nessuna riga vuota tra due import dallo stessa cartella;
-   una riga vuoto dopo l’ultimo import di una cartella;
-   omettere estensione dei file e l’underscore iniziale.

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

C’è un altro modo per importare i file parziali che ritengo valido. Da un lato, rede il file più leggibile. Dall’altro, rende l’aggiornamento leggermente più complicato. Ad ogni modo, vi lascerei decidere qual è meglio; non ha molta importanza. Secondo questo metodo, il file Main dovrebbe rispettare queste linee guida:

-   un `@import` per ciascuna cartella;
-   un a capo dopo ogni `@import`;
-   ogni file in una riga;
-   una riga vuota dopo l’ultimo import di una cartella;
-   omettere estensione dei file e l’underscore iniziale.

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

### Riguardo al globbing

In informatica, i pattern detti _glob_ si riferiscono all’uso di asterischi (wildcard) per accedere ad un set di file, come ad esempio `*.scss`. Partendo da qui, _globbing_ significa riferirsi ad un set di file basandosi su un’espressione piuttosto che una lista di nomi di file. Quando è applicato a Sass, significa che importare i parziali dentro il [main file](#il-file-main) può essere fatto usando un pattern _globbing_ invece che aggiungendo i file uno ad uno. Il risultato è una cosa del genere:

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

Sass non supporta il file globbing di natura, perchè può essere una caratteristica pericolosa: il CSS dopotutto è dipendente dall’ordine delle dichiarazioni. Quando si importano i file dinamicamente, non si controlla più l’ordine della sorgente, e questo può creare qualche problema quando si fa debug.

Detto ciò, in un’architettura strettamente basata sui componenti, con parecchia attenzione a non contaminare un parziale con l’altro, l’ordine non dovrebbe essere un problema. È quindi più semplice aggiungere e rimuovere i parziali nel main file.

Quando si usa Ruby Sass, c’è una gemma chiamata [sass-globbing](https://github.com/chriseppstein/sass-globbing) che abilita esattamente questa funzionalità. Se utilizzate invece node-sass, potete fare affidamento o direttamente a Node.js o a qualsiasi tool di sviluppo che state utilizzando al momento (Gulp, Grunt, etc.),

### Il file Shame

C’è un’idea interessante, diffusa da [Harry Roberts](https://csswizardry.com), [Dave Rupert](https://daverupert.com) e [Chris Coyier](https://css-tricks.com) che consiste nel mettere tutto il CSS, gli hack e tutte le cose di cui non andremmo fieri in un _[file della vergogna](https://csswizardry.com/2013/04/shame-css-full-net-interview/) (Shame)_. Questo file, platealmente chiamato `_shame.scss`, verrebbe importato dopo tutti i file, alla fine del foglio di stile.

```
/**
 * Nav specificity fix.
 *
 * Someone used an ID in the header code (`#header a {}`) which trumps the
 * nav selectors (`.site-nav a {}`). Use !important to override it until I
 * have time to refactor the header stuff.
 */
.site-nav a {
    color: #BADA55 !important;
}
```

```
/**
 * Nav specificity fix.
 *
 * Someone used an ID in the header code (`#header a {}`) which trumps the
 * nav selectors (`.site-nav a {}`). Use !important to override it until I
 * have time to refactor the header stuff.
 */
.site-nav a
    color: #BADA55 !important
```

## Responsive Web Design e i breakpoint

Non penso che ci sia bisogno di introdurre il _Responsive Web Design_ ora che lo si trova dappertutto. Ma potreste comunque domandarvi _perché c’è una sezione sul RWD in questa guida di stile?_ In realtà ci sono un po’ di cose che rendono più facile lavorare con i _breakpoint_, così ho pensato che non sarebbe stata una cattiva idea elencarle qui.

### Dare un nome ai breakpoint

Penso che sia giusto dire che le _media query_ non debbano essere legate a specifici dispositivi. Per esempio, è decisamente una brutta idea cercare di individuare specificatamente gli iPad o i telefoni Blackberry. Le _media query_ dovrebbero occuparsi delle diverse dimensioni dello schermo. Una _media query_ si applica fino a che il design non si rompe e subentra la _media query_ successiva.

Per le stesse ragioni, i _breakpoint_ non dovrebbero avere i nomi di device, ma di qualcosa di più generico. Soprattutto da quando ci sono telefoni più grandi di alcuni tablet, tablet più grandi di alcuni computer con lo schermo minuscolo, ecc…

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

A questo punto, [qualsiasi convenzione di nomenclatura](https://css-tricks.com/naming-media-queries/) che renda chiaro e cristallino che un design non è mutualmente legato ad uno specifico dispositivo farà al caso nostro, l’importante è che parli di grandezze.

```
$breakpoints: (
  'seed': (min-width: 800px),
  'sprout': (min-width: 1000px),
  'plant': (min-width: 1200px),
);
```

```
$breakpoints: ('seed': (min-width: 800px), 'sprout': (min-width: 1000px), 'plant': (min-width: 1200px))
```

L’esempio precedente usa mappe innestate per definire i _breakpoint_, tuttavia dipende molto dal gestore di _breakpoint_ che utilizzate. Potreste optare per stringhe intere invece che mappe interne per una flessibilità maggiore (es\_: `’(min-width: 800px)’`).

### Gestire i Breakpoint

Una volta che avrete dato il nome che preferite ai vostri _breakpoint_, avrete bisogno di utilizzarli all’interno di _mediaquery_ reali. Ci sono molti modi per farlo e devo ammettere che sono un grande fan delle mappe di breakpoint lette da una funzione _getter_. Questo sistema è sia semplice che efficiente.

```
/// Responsive breakpoint manager
/// @access public
/// @param {String} $breakpoint - Breakpoint
/// @requires $breakpoints
@mixin respond-to($breakpoint) {
  $raw-query: map-get($breakpoints, $breakpoint);

  @if $raw-query {
    $query: if(
      type-of($raw-query) == 'string',
      unquote($raw-query),
      inspect($raw-query)
    );

    @media #{$query} {
      @content;
    }
  } @else {
    @error 'No value found for `#{$breakpoint}`. '
         + 'Please make sure it is defined in `$breakpoints` map.';
  }
}
```

```
/// Responsive breakpoint manager
/// @access public
/// @param {String} $breakpoint - Breakpoint
/// @requires $breakpoints
=respond-to($breakpoint)
  $raw-query: map-get($breakpoints, $breakpoint)

  @if $raw-query
    $query: if(type-of($raw-query) == 'string', unquote($raw-query), inspect($raw-query))

    @media #{$query}
      @content

  @else
    @error 'No value found for `#{$breakpoint}`. '
         + 'Please make sure it is defined in `$breakpoints` map.'
```

Ovviamente questo è un modo fin troppo semplice di gestire i _breakpoint_. Se avete bisogno di un metodo più permissivo, vi raccomando di non reinventare la ruota ed utilizzare qualcosa di testato ed efficace come: [Sass-MQ](https://github.com/sass-mq/sass-mq), [Breakpoint](http://breakpoint-sass.com/) o [include-media](https://github.com/eduardoboucas/include-media).

Se state cercando degli approfondimenti su come approcciare le Media Query in Sass, sia [SitePoint](https://www.sitepoint.com/managing-responsive-breakpoints-sass/) (sinceramente vostro) che [CSS-Tricks](https://css-tricks.com/approaches-media-queries-sass/)hanno dei begli articoli sull’argomento.

### Utilizzo delle Mediaquery

Non molto tempo fa, c’era un dibattito molto caldo riguardo dove le _mediaquery_ dovessero essere scritte: devono essere incluse nei selettori (Sass permette di farlo) o totalmente a parte? Devo ammettere di essere un sostenitore delle _mediaquery-dentro-i-selettori_, visto che penso si sposino molto bene con l’idea dei _componenti_.

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

Che ci porta al seguente codice CSS:

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

Potreste aver sentito che questa convenzione porta all’avere _mediaquery_ duplicate nel CSS generato. Totalmente vero. Tuttavia sono stati fatti dei test e il risultato finale è che non importa una volta che Gzip (o qualcosa di simile) fa il suo lavoro:

> … abbiamo discusso molto sulle implicazioni delle prestazioni delle _mediaquery_ combinate contro quelle sparpagliate e siamo giunti alla conclusione che le differenze, seppur brutte, sono minime nel caso peggiore e non esistenti nel migliore dei casi.  
> — Sam Richards riguardo Breakpoint

Ora, se siete veramente preoccupati delle _mediaquery_ duplicate, potete usare un tool per combinale insieme, qualcosa tipo [questa gemma](https://github.com/aaronjensen/sass-media_query_combiner), però mi sento di avvisarvi dei possibili effetti collaterali dovuti allo spostare il CSS qua e là. Sapete bene quanto è importante l’ordine del codice CSS.

## Variables

Le variabili sono l’essenza di ogni linguaggio di programmazione. Ci permettono di riutilizzare un valore senza doverlo copiare e incollare ogni volta. Ancora più importante, le variabili ci permettono di aggiornare un valore molto facilmente. Ci permettono di dire addio al cerca e sostituisci o alla sostituzione manuale.

Tuttavia CSS non è altro che un enorme cestino che contiene tutte le nostre uova. A differenza di altri linguaggi, CSS non implementa uno _scope_. Per questo motivo, dobbiamo fare attenzione ai possibili conflitti quando aggiungiamo variabili.

Il mio consiglio è di creare variabili solo quando ha senso farlo. Non inizializzate nuove variabili per il gusto di farlo, non aiuterà. Una nuova variabile dovrebbe essere creata solo quando sono validi i seguenti criteri:

-   il valore è ripetuto almeno due volte;
-   il valore ha la possibilità di essere aggiornato almeno una volta:
-   tutte le occorrenze del valore sono legate a una variabile; (es: non per coincidenza).

In pratica, non c’è nessun motivo di dichiarare una variabile che non verrà mai aggiornata o che verrà usata solo in un posto.

### Scoping

Lo _Scoping_ in Sass è cambiato molto durante gli anni. Fino a poco tempo fa, la dichiarazione di una variabile all’interno di set di regole e altri _scope_ era considerata locale di _default_. Tuttavia quando esisteva già una variabile globale con lo stesso nome, l’assegnazione della variabile locale avrebbe sovrascritto quella globale. Dalla versione 3.4, Sass implementa il concetto di _scope_ e crea una nuova variabile locale invece di sovrascrivere quella globale.

La documentazione parla di _oscuramento della variabile globale_. In pratica quando si dichiara in uno _scope_ interno (selettori, funzioni, mixin…) una variabile che esiste già nello scope globale, la variabile locale _oscura_ quella globale. Fondamentalmente la sovrascrive momentaneamente solo per lo _scope_ locale.

Il seguente frammento di codice spiega il concetto di _oscuramento di variabili_ .

```
// Initialize a global variable at root level.
$variable: 'initial value';

// Create a mixin that overrides that global variable.
@mixin global-variable-overriding {
  $variable: 'mixin value' !global;
}

.local-scope::before {
  // Create a local variable that shadows the global one.
  $variable: 'local value';

  // Include the mixin: it overrides the global variable.
  @include global-variable-overriding;

  // Print the variable’s value.
  // It is the **local** one, since it shadows the global one.
  content: $variable;
}

// Print the variable in another selector that does no shadowing.
// It is the **global** one, as expected.
.other-local-scope::before {
  content: $variable;
}
```

```
// Initialize a global variable at root level.
$variable: 'initial value'

// Create a mixin that overrides that global variable.
@mixin global-variable-overriding
  $variable: 'mixin value' !global

.local-scope::before
  // Create a local variable that shadows the global one.
  $variable: 'local value'

  // Include the mixin: it overrides the global variable.
  +global-variable-overriding

  // Print the variable’s value.
  // It is the **local** one, since it shadows the global one.
  content: $variable

// Print the variable in another selector that does no shadowing.
// It is the **global** one, as expected.
.other-local-scope::before
  content: $variable
```

### `!default` flag

Quando si costruisce una libreria, un framework, un sistema di griglie o un qualsiasi pezzo in Sass che si vuole poi distribuire e che sarà utilizzato da altri sviluppatori, tutte le variabili di configurazione devono essere contrassegnate con il _flag_ `!default`, in modo da poter essere sovrascritte.

```
$baseline: 1em !default;
```

```
$baseline: 1em !default
```

Grazie a questo, uno sviluppatore può definire la propria variabile `$baseline` _prima_ di importare la propria libreria senza dover vedere il proprio valore ridefinito.

```
// Developer’s own variable
$baseline: 2em;

// Your library declaring `$baseline`
@import 'your-library';

// $baseline == 2em;
```

```
// Developer’s own variable
$baseline: 2em

// Your library declaring `$baseline`
@import your-library

// $baseline == 2em
```

### `!global` flag

Il _flag_ `!global` dovrebbe essere usato solamente quando si sovrascrive una variabile globale da uno _scope_ locale. Quando si definisce una variabile fuori da un selettore, un mixin o una funzione, il flag `!global` dovrebbe essere omesso.

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

### Variabili multiple o mappe

Ci sono molti vantaggi ad usare le mappe invece che variabili distinte. Il principale è poter iterare in una mappa, cosa impossibile con variabili separate.

Un altro vantaggio di usare una mappa è la possibilità di creare una funzione _getter_ per fornire una _API_ più chiara. Per esempio, date un occhiata al seguente codice Sass:

```
/// Z-indexes map, gathering all Z layers of the application
/// @access private
/// @type Map
/// @prop {String} key - Layer’s name
/// @prop {Number} value - Z value mapped to the key
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// Get a z-index value from a layer name
/// @access public
/// @param {String} $layer - Layer’s name
/// @return {Number}
/// @require $z-indexes
@function z($layer) {
  @return map-get($z-indexes, $layer);
}
```

```
/// Z-indexes map, gathering all Z layers of the application
/// @access private
/// @type Map
/// @prop {String} key - Layer’s name
/// @prop {Number} value - Z value mapped to the key
$z-indexes: ('modal': 5000, 'dropdown': 4000, 'default': 1, 'below': -1,)

/// Get a z-index value from a layer name
/// @access public
/// @param {String} $layer - Layer’s name
/// @return {Number}
/// @require $z-indexes
@function z($layer)
  @return map-get($z-indexes, $layer)
```

## Extend

La direttiva `@extend` è una funzione spesso mal interpretata. Giusto per ricordarlo, con questa direttiva possiamo dire a Sass di stilare un elemento `A` esattamente come se corrispondesse ad un selettore `B`. Inutile dire che rappresenta un ottimo alleato quando c’è da scrivere del CSS modulare.

Tuttavia il vero scopo di `@extend` è quello di mantenere le relazioni (i vincoli) tra set di regole all’interno di selettori estesi. Cosa vuol dire tutto ciò esattamente?

-   I selettori hanno _vincoli_ (`.bar` in `.foo > .bar` deve avere un padre `.foo`)
-   Questi vincoli sono _trasportati_ al selettore estendente (`.baz { @extend .bar; }` produrrà `.foo > .bar, .foo > .baz`);
-   Le dichiarazioni del selettore esteso saranno condivise con il selettore estendente.

Detto questo, è chiaro che estendere selettori con vincoli blandi possa portare a risultati non voluti. Se `.baz .qux` estende `.foo .bar`, il risultato sarà `.foo .baz .qux` e `.baz .foo .qux` ed entrambi `.foo` e `.baz` sono _ancestor selector_ generici. Potrebbero essere padri, nonni, ecc…

Bisogna sempre cercare di definire le relazioni per mezzo dei placeholder e non attraverso i selettori reali. Questo vi darà la libertà di usare (e cambiare) qualsiasi convenzione dei nomi abbiate per i vostri selettori e, visto che le relazioni sono definite solo una volta e dentro i _placeholder_, sarete in grado di evitare selettori inintenzionali.

Per ereditare gli stili, usate `@extend` solo se la `.class` o il `%placeholder` che estende _è dello stesso tipo_ del selettore esteso. Per esempio: un `.error` è un tipo di `.warning`, quindi `.error` può fare `@extend .warning`.

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

Ci sono condizioni dove estendere un selettore può essere d’aiuto e può valerne la pena. C’è da tenere in mente queste regole, così da evitare qualche guaio:

-   Estendi un `%placeholder` non un selettore reale, quando possibile.
-   Se estendi una classe, estendi un selettore di classe solo con un altro selettore di classe, non farlo _mai_ con un [selettore complesso](https://www.w3.org/TR/selectors4/#syntax).
-   Estendi direttamente un `%placeholder` il meno possibile.
-   Evitate di estendere selettori discendenti generici (`.foo .bar`) selettori adiacenti generici (es: `.foo ~ .bar`). Questo è solitamente quello che provoca l’esplosione di un selettore.

Spesso si dice che `@extend` aiuta a tenere piccola la grandezza dei file css, in quanto combina diversi selettori piuttosto che duplicare le proprietà. Questo è vero, ma la differenza è davvero minima quando si attiva la compressione [Gzip](https://en.wikipedia.org/wiki/Gzip).

Detto questo, se non si può usare Gzip (o qualsiasi equivalente) allora passare ad un approccio che usa `@extend` può non essere così male, soprattutto se il peso dei vostri fogli di stile è un vostro collo di bottiglia alle performance.

#### Extend e media query

Dovreste estendere i selettori solo all’interno della stessa _mediaquery_ (la direttiva `@media`). Pensate alla _mediaquery_ come ad un altro vincolo.

```
%foo {
  content: 'foo';
}

// Nope
@media print {
  .bar {
    // This doesn't work. Worse: it crashes.
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
    // This doesn't work. Worse: it crashes.
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

Ci sono diverse opinioni riguardo i benefici e i problemi di `@extend` al punto che molti sviluppatori, incluso me, raccomandano di non usarlo affatto. Potete leggere di più sull’argomento in questi articoli:

-   [What Nobody Told you About Sass Extend](https://www.sitepoint.com/sass-extend-nobody-told-you/)
-   [Why You Should Avoid Extend](https://www.sitepoint.com/avoid-sass-extend/)
-   [Don’t Over Extend Yourself](https://pressupinc.com/blog/2014/11/dont-overextend-yourself-in-sass/)

Per riassumere: consiglio di usare `@extend` solo per mantenere le relazioni tra selettori. Se due selettori hanno funzionalità simili, è il caso perfetto per usare `@extend`. Se invece condividono delle regole non correlate tra loro, un `@mixin` potrebbe fare al caso vostro.

Un grazie a [David Khourshid](https://twitter.com/davidkpiano) per il suo aiuto ed esperienza in questa parte.

## I Mixin

I _Mixin_ sono una delle caratterstiche più usate dell’intero linguaggio Sass. Sono la chiave per ottenere componenti riusabili e fedeli al _DRY_. Per una buona ragione: i _Mixin_ danno l’opportunità all’autore di definire stili che possono essere riusati all’interno del foglio di stile senza aver bisogno di classi non semantiche come `.float-left`.

Possono contenere una serie di regole CSS e grosso modo tutto ciò che è lecito dovunque in un documento Sass. Possono anche accettare argomenti, proprio come le funzioni. Inutile dire che le possibilità sono infinite.

Devo però fare un avviso contro l’abuso del potere dei _Mixin_. Una volta ancora, la chiave qui è la _semplicità_. Costruire un _Mixin_ estremamente potente con un sacco di logica dentro potrebbe sembrare una buona idea, ma saremmo di fronte ad un caso di sovra-ingegnerizzazione, una malattia di cui molti sviluppatori soffrono. Se un _Mixin_ finisce per avere più di venti righe di codice, allora dovrebbe essere diviso in pezzetti più piccoli, o completamente rivisto.

### Le basi

Detto questo, i _Mixin_ sono estremamente utili e vi capiterà di usarne qualcuno. La regola di base è che se ci si accorge di avere un gruppo di proprietà CSS che compaiono sempre insieme per una ragione (non per coincidenza), queste dovrebbero essere inserite dentro un _Mixin_. Ad esempio, il [micro-clearfix hack di Nicolas Gallagher](http://nicolasgallagher.com/micro-clearfix-hack/) merita di esser messo (senza argomenti) in un _Mixin_.

```
/// Helper to clear inner floats
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
/// Helper to clear inner floats
/// @author Nicolas Gallagher
/// @link http://nicolasgallagher.com/micro-clearfix-hack/ Micro Clearfix
@mixin clearfix
  &::after
    content: ''
    display: table
    clear: both
```

Un altro esempio valido potrebbe essere un _Mixin_ per impostare la grandezza di un elemento, definendo `width` e `height` allo stesso tempo. Non solo si renderà il codice più veloce da scrivere, ma anche più facile da leggere.

```
/// Helper to size an element
/// @author Kitty Giraudel
/// @param {Length} $width
/// @param {Length} $height
@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}
```

```
/// Helper to size an element
/// @author Kitty Giraudel
/// @param {Length} $width
/// @param {Length} $height
=size($width, $height: $width)
  width: $width
  height: $height
```

Per esempi più complessi di mixin, date un occhio a [questo mixin per generare triangoli CSS](https://www.sitepoint.com/sass-mixin-css-triangles/), [questo mixin per generare ombre lunghe](https://www.sitepoint.com/ultimate-long-shadow-sass-mixin/) o [questo mixin per aggiungere il codice polyfill necessario per i gradienti su browser datati](https://www.sitepoint.com/building-linear-gradient-mixin-sass/).

### Mixin senza argomenti

Ci sono casi in cui i _Mixin_ sono utilizzati solamente per evitare di ripetere lo stesso gruppo di dichiarazioni più e più volte. Non hanno quindi bisogno di alcun parametro o hanno dei valori di default che non necessitano alcun passaggio di argomenti.

In questi casi, possiamo tranquillamente omettere le parentesi quando li richiamiamo. L’istruzione `@include` (o il simbolo `+` nella sintassi indentata) bastano a indicare che quella linea è la chiamata di un _Mixin_. Non c’è bisogno di parentesi extra.

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

### Lista di argomenti

Quando c’è da aver a che fare con un numero sconosciuto di argomenti in un _Mixin_ è meglio utilizzare un `arglist` piuttosto che una _Lista_. Pensate ad `arglist` come l’ottavo tipo di dati in Sass, nascosto e non documentato, che è implicitamente usato quando passiamo un numero arbitrario di argomenti ad un _Mixin_ o ad una funzione la cui firma contiene `...`.

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

Ora, quando si costruisce un _Mixin_ che accetta una manciata di argomenti (diciamo 3 o più), pensiamoci due volte prima di unirli in una lista o in una mappa: potrebbe essere più semplice passarli uno per uno.

Sass è piuttosto intelligente con la dichiarazione di _Mixin_ e funzioni, così tanto che si può passare ad una funzione/mixin una lista o una mappa come una _arglist_ in modo che sia interpretata come una serie di argomenti.

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

### I mixin e i prefissi vendor

Si potrebbe essere tentati di definire un mixin personalizzato per avere i prefissi _vendor_ da applicare a proprietà CSS non ancora supportate o supportate solo parzialmente. Ma non vogliamo certo farlo. Prima di tutto, se si può usare [Autoprefixer](https://github.com/postcss/autoprefixer), che si usi Autoprefixer. Autoprefixer rimuoverà dal vostro progetto del codice Sass superfluo, sarà sempre aggiornato e sarà compilato in una maniera più efficiente di quanto si possa fare da soli.

Sfortunatamente, non è sempre possibile avere a disposizione Autoprefixer. Se però usate [Bourbon](https://bourbon.io/) o [Compass](http://compass-style.org/) scoprirete che entrambi mettono a disposizione una collezione di Mixin per applicare i prefissi vendor. Usateli.

Se non si può usare Autoprefixer e nemmeno Bourbon o Compass, allora, e solo allora, si può creare un mixin per applicare i prefissi alle proprietà CSS. Ma per favore, non create un mixin per ogni proprietà, che stampa manualmente ogni prefisso.

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

Fatelo nella maniera intelligente.

```
/// Mixin helper to output vendor prefixes
/// @access public
/// @author KittyGiraudel
/// @param {String} $property - Unprefixed CSS property
/// @param {*} $value - Raw CSS value
/// @param {List} $prefixes - List of prefixes to output
@mixin prefix($property, $value, $prefixes: ()) {
  @each $prefix in $prefixes {
    -#{$prefix}-#{$property}: $value;
  }

  #{$property}: $value;
}
```

```
/// Mixin helper to output vendor prefixes
/// @access public
/// @author KittyGiraudel
/// @param {String} $property - Unprefixed CSS property
/// @param {*} $value - Raw CSS value
/// @param {List} $prefixes - List of prefixes to output
=prefix($property, $value, $prefixes: ())
  @each $prefix in $prefixes
    -#{$prefix}-#{$property}: $value

  #{$property}: $value
```

Usare questo Mixin ora è facilissimo:

```
.foo {
  @include prefix(transform, rotate(90deg), ('webkit', 'ms'));
}
```

```
.foo
  +prefix(transform, rotate(90deg), ('webkit', 'ms'))
```

Tenete a mente che questa è una soluzione molto semplice. Per esempio, non può interagire con polyfill complessi come quelli richiesti per Flexbox. In questo senso, Autoprefixer rimane l’opzione ideale.

## Istruzioni condizionali

Probabilmente già sapete che Sass offre istruzioni condizionali attraverso le direttive `@if` e `@else`. Finchè il codice non ha una logica così complessa, non c’è bisogno di istruzioni condizionali nei fogli di stile che si scrivono ogni giorno. Ad esser precisi, le istruzioni condizionali esistono principalmente per le librerie e i framework.

Comunque, se ti trovi nella situazione di averne bisogno, per favore rispetta queste linee guida:

-   Nessuna parentesi finchè non sono necessarie;
-   Metti sempre una riga vuota prima di `@if`;
-   Vai sempre a capo dopo l’apertura delle parentesi graffe (`{`);
-   Metti `@else` nella stessa linea della chiusura della parentesi graffa (`}`);
-   Metti sempre una riga vuota dopo l’ultima chiusura di parentesi graffa (`}`) a meno che la riga seguente non contenga solo una chiusura parentesi graffa (`}`).

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

Quando si controlla se un valore è falso, usa sempre la parola chiave `not` piuttosto che vedere se corrisponde a `false` o `null`.

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

Metti sempre la parte variabile a sinistra dell’istruzione e il risultato (in)aspettato a destra. Le istruzioni condizionali ribaltate spesso sono più difficili da leggere, specialmente per gli sviluppatori di primo pelo.

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

Quando si usano le istruzioni condizionali dentro una funzione per ottenere un risultato differente, controlla sempre che la funzione abbia un’istruzione `@return` fuori da ogni blocco condizionale.

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

## Iteratori

Dato che Sass mette a disposizione strutture di dati complesse come [liste](#liste) e [mappe](#mappe), non c’è da sorprendersi che ci siano strumenti per iterare all’interno di queste entità.

La presenza di iteratori implica però la presenza di una logica moderatamente complessa, che probabilmente non appartiene a Sass. Prima di usare un iteratore, bisogna essere sicuri che questo abbia un senso, e che risolva effettivamente un problema.

### Each

L’iteratore `@each` è il più usato dei tre tipi di iteratori messi a disposizione da Sass. Offre una API chiara per iterare all’interno di una lista o una mappa.

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

Quando si itera all’interno di una mappa, si usano sempre `$key` e `$value` come variabili, in modo da rinforzare la coerenza della codebase.

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

C’è poi bisogno di rispettare queste linee guida per mantenere la leggibilità:

-   Sempre una riga vuota prima di `@each`;
-   Sempre una riga vuota dopo la chiusura della parentesi graffa (`}`) a meno che la linea seguente non sia un’altra chiusura di parentesi graffa (`}`).

### For

L’iteratore `@for` può essere utile quando viene combinato con la pseudo-classe CSS `:nth-*`. Tranne per questo scenario, è preferibile usare un iteratore `@each` se c’è da iterare all’interno di qualcosa.

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

`$i` andrebbe sempre usato come nome per la variabile di iterazione, in modo da rafforzare la convenzione e, a meno che non ci sia un valido motivo, meglio non usare la parola-chiave `to`: sempre meglio `through`. Molti sviluppatori non sanno che Sass offre questa variante e quindi usarla può portare a generare confusione.

Anche in questo caso è meglio assicurarsi di rispettare una serie di linee guida per preservare la leggibilità:

-   Sempre una riga vuota prima di `@for`;
-   Sempre una riga vuota dopo la chiusura della parentesi graffa (`}`) a meno che la linea seguente non sia un’altra chiusura di parentesi graffa (`}`).

### While

L’iteratore `@while` non ha nessun caso d’uso in un vero progetto Sass, specialmente per il fatto che non c’è nessun modo per fermare l’iteratore dall’interno. **Non usatelo**.

## Avvisi ed errori

Se c’è una cosa che viene troppo spesso trascurata dagli sviluppatori di Sass, è la capacità di segnalare dinamicamente avvisi ed errori. Sass, infatti, ha tre direttive custom per stampare gli errori nel sistema di output standard (CLI, compiling app…):

-   `@debug`;
-   `@warn`;
-   `@error`.

Mettiamo da parte `@debug`, che è qui chiaramente per fare debug di SassScript (che non ci interessa a questo punto). Ci rimangono `@warn` e `@error` i quali sono praticamente identici tranne per il fatto che uno interrompe il compilatore, mentre l’altro no. Vi lascio indovinare quale.

In un progetto Sass c’è quindi parecchio bisogno di avvisi ed errori. In pratica, qualsiasi mixin o funzione che si aspetta uno specifico tipo o argomento può generare un errore se qualcosa è andato storto, o mostrare un avviso quando non ha le idee chiare e sta provando ad indovinare.

### Avvisi

Prendete ad esempio questa funzione di [Sass-MQ](https://github.com/sass-mq/sass-mq), che prova a convertire un valore in `px` in `em`. Ad esempio:

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

Se il valore è senza unità di misura, la fuzione parte dal presupposto che sia espresso in pixel. Un’ipotesi di questo tipo potrebbe essere rischiosa, perciò l’utente dovrebbe essere avvisato che il software ha fatto qualcosa il cui risultato potrebbe essere inaspettato.

### Errori

Gli errori, diversamente dagli avvisi, fanno in modo che il compiler vada avanti nel suo lavoro. Praticamente fermano la compilazione e mostrano un messaggio nell’output e nello stack trace, utile per il debug. Per questo motivo, gli errori dovrebbero essere chiamati quando non c’è altra maniera per il programmatore di tenere il programma in funzione. Quando possibile, meglio provare un workaround sul problema e mostrare un avviso.

Ad esempio, diciamo che si vuol costruire una fuzione _getter_ per accedere ai valori di una _map_ specifica. Si può chiamare un errore se la chiave richiesta non esiste nella _map_.

```
/// Z-indexes map, gathering all Z layers of the application
/// @access private
/// @type Map
/// @prop {String} key - Layer’s name
/// @prop {Number} value - Z value mapped to the key
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// Get a z-index value from a layer name
/// @access public
/// @param {String} $layer - Layer's name
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
/// Z-indexes map, gathering all Z layers of the application
/// @access private
/// @type Map
/// @prop {String} key - Layer's name
/// @prop {Number} value - Z value mapped to the key
$z-indexes: ('modal': 5000, 'dropdown': 4000, 'default': 1, 'below': -1,)

/// Get a z-index value from a layer name
/// @access public
/// @param {String} $layer - Layer's name
/// @return {Number}
/// @require $z-indexes
@function z($layer)
  @if not map-has-key($z-indexes, $layer)
    @error 'There is no layer named `#{$layer}` in $z-indexes. '
         + 'Layer should be one of #{map-keys($z-indexes)}.'

  @return map-get($z-indexes, $layer)
```

Per avere più informazioni su come usare `@error` in maniera efficiente, [questa introduzione alla gestione degli errori](https://webdesign.tutsplus.com/tutorials/an-introduction-to-error-handling-in-sass--cms-19996) potrebbe aiutarvi.

## Tools

Una cosa carina di un preprocessore CSS popolare come Sass è che si porta dietro un intero ecosistema di framework, plugin, librerie e strumenti. Dopo otto anni di esistenza, siamo sempre più vicini al punto in cui [qualsiasi cosa possa essere scritta in Sass è già stata scritta in Sass](https://kittygiraudel.com/2014/10/27/rethinking-atwoods-law/).

Tuttavia il mio consiglio è quello di tenere al minimo indispensabile il numero di dipendenze. Gestire dipendenze è un tipo di inferno di cui non velete fare parte. In più non c’è molto bisogno di dipendenze esterne quando parliamo di Sass.

### Compass

[Compass](http://compass-style.org/) è il maggior [framework Sass](https://www.sitepoint.com/compass-or-bourbon-sass-frameworks/) là fuori. Sviluppato da [Chris Eppstein](https://twitter.com/chriseppstein), uno dei due principali designer di Sass. Se volete la mia opinione, non credo che perderà molta popolarità nel breve periodo.

[Tuttavia non uso più Compass](https://www.sitepoint.com/dont-use-compass-anymore/). Il motivo principale è che rallenta molto Sass. Ruby Sass è già lento di suo, quindi aggiungere ancora più Ruby e ancora più Sass non è di molto aiuto.

La questione è che usiamo una piccola parte dell’intero framework. Compass è enorme. La compatibilità Cross-browser è solo la cima dell’iceberg. Le funzioni matematiche, gli _helper_ per immagini, lo _spriting_… Si può fare davvero molto con questo gran software.

È tutto molto bello ma, sfortunatamente, non c’è nessuna caratteristica indispensabile. Un’eccezione potrebbe essere il generatore di _sprite_ che è _davvero grandioso_, ma [Grunticon](https://github.com/filamentgroup/grunticon) e [Grumpicon](http://grumpicon.com/) fanno la stessa cosa e hanno il beneficio di poter essere collegati facilmente al vostro processo di _build_.

Comunque, non proibisco l’uso di Compass, ma non lo raccomando nemmeno, sopratutto finché non sarà compatibile con LibSass (anche se sono stati fatti molti sforzi a riguardo). Se vi sentite meglio nell’usarlo, giustissimo, ma non penso che ne ricaverete molto alla fin fine.

Ruby Sass sta subendo alcune ottimizzazioni, specificamente rivolte a stili con molta logica, funzioni e _mixin_\_. Queste modifiche dovrebbero migliorare sensibilmente le prestazioni fino al punto in cui Compass ed altri _framework_ potrebbero non rallentare più di tanto Sass.

### Sistemi di griglie

Non usare un sistema di griglie non è più un’opzione ora che il _Responsive Web Design_ è ovunque. Per rendere il design consistente e uniforme a tutte le dimensioni, usiamo una specie di griglia per impaginare gli elementi. Per evitare di riscrivere griglie costantemente, alcune menti brillanti hanno reso riutilizzabile il loro sistema di griglie.

Mettiamo le cose in chiaro: non sono un grande fan dei sistema di griglie. Certo, ne vedo il potenziale, ma penso che molte di loro siano davvero eccessive e sono usate per lo più per disegnare colonne rosse su sfondi bianchi durante le conferenze di designer un po’ nerd. Quand’è l’ultima volta che avete pensato: _grazie-a-Dio-ho-questo-strumento-per-costruire-questo-2-5-3.1-π-grid_? Esatto, mai. Questo perché nella maggior parte dei casi, volete semplicemente una griglia a dodici colonne, nulla di strano.

Se per i vostri progetti state usando un framework CSS come [Bootstrap](https://getbootstrap.com/) o [Foundation](https://get.foundation/), avete molte chance che includa già un grid system. In questo caso vi raccomando di usare quello ed evitare di dover gestire un’altra dipendenza.

Se non siete legati ad uno specifico sistema di griglie, sarete contenti di sapere che ci sono due motori di prima qualità sviluppati in Sass: [Susy](https://www.oddbird.net/susy/) e [Singularity](https://github.com/at-import/Singularity). Entrambi fanno molto di più di quanto avrete mai bisogno e potete scegliere quello che preferite tra i due ed essere sicuri che tutti i vostri casi —anche quelli limite— saranno gestiti. Se chiedete a me, Susy ha una comunità leggermente migliore, ma è solo la mia opinione.

Oppure si può andare verso qualcosa di un po’ più informale, tipo [csswizardry-grids](https://github.com/csswizardry/csswizardry-grids). Tutto sommato, la scelta non avrà molto impatto sul vostro modo di scrivere codice, quindi sta a voi scegliere a questo punto.

### SCSS-lint

Effettuare il _linting_ del codice è molto importante. Tipicamente seguire i suggerimenti di una guida di stile aiuta a migliorare la qualità e ridurre la quantità di errori, ma nessuno è perfetto e ci sono sempre cose da migliorare. Si potrebbe dire che fare il _linting_ del codice è importante esattamente come commentarlo.

[SCSS-lint](https://github.com/causes/scss-lint) è uno strumento che vi aiuta a mantenere i vostri file CSS puliti e leggibili. È totalmente configurabile ed è facile da integrare con i vostri strumenti.

Fortunatamente, le raccomandazioni di SCSS-lint sono molto simili a quelle descritte in questo documento. Per configurare SCSS-lint secondo queste linee guida, vi raccomando il seguente setup:

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

Se non siete ancora convinti dell’utilità di usare SCSS-lint, vi raccomando di leggere questi ottimi articoli: [Clean Up your Sass with SCSS-lint](https://blog.martinhujer.cz/clean-up-your-sass-with-scss-lint/), [Improving Sass code quality on theguardian.com](https://www.theguardian.com/info/developer-blog/2014/may/13/improving-sass-code-quality-on-theguardiancom) e [An Auto-Enforceable SCSS Styleguide](https://davidtheclark.com/scss-lint-styleguide/).

Se si desidera collegare SCSS-lint al vostro processo di build di Grunt, sarete felici di sapere che esiste un plugin Grunt chiamato[grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint).

Inoltre, se siete alla ricerca di un applicazione che funzioni in modo pulito con SCSS-lint e simili, i ragazzi di [Thoughtbot](https://thoughtbot.com/) (Bourbon, Neat…) stanno lavorando a [Hound](https://houndci.com/).

## Troppo lungo, non ho letto

Queste linee guida sono abbastanza lunghe e a volte è meglio avere accesso ad una versione più corta. Di seguito trovate quindi un riassunto.

### Principi chiave

-   Il senso di avere una linea guida sullo stile è tutto basato sull’essere **consistenti**. Se non siete d’accordo con alcune delle regole di queste linee guida è ok. L’importante è che siate comunque consistenti.
-   Sass deve essere tenuto il più semplice possibile. Evitate sistemi troppo complessi a meno che non sia assolutamente necessario.
-   Tenete sempre in mente che il concetto _KISS_ (Keep It Simple, Stupid - Rimani sul semplice, stupido) è spesso meglio del concetto _DRY_ (Don’t Repeat Yourself - Non ripetere te stesso).

### Sintassi e formattazione

-   Un’indentazione va fatta con due (2) spazi, nessun tab.
-   Le linee di testo dovrebbero essere più corte di 80 caratteri. Sentitevi liberi di dividere una linea in più linee, quando necessario.
-   Il CSS dovrebbe essere scritto in modo corretto, seguite le [Linee guida CSS](https://cssguidelin.es) di Harry Roberts, se potete.
-   Gli spazi sono gratis, usateli per separare elementi, regole e dichiarazioni. Non esistate a lasciare linee vuote, non fa’ mai male.

#### Stringhe

-   Dichiarare un `@charset` all’inizio di un foglio di stile è fortemente consigliato.
-   Le stringhe dovrebbero essere racchiuse in apici singoli, a meno che non siano applicate a identificatori CSS. Anche gli URL dovrebbero essere sempre contenuti tra apici.

#### Numeri

-   Sass non fa distinzione tra i numeri, gli interi e i numeri con la virgola. Quindi gli zero (0) non significativi dopo la virgola possono essere omessi. Invece gli zero (0) prima della virgola andrebbero aggiunti per aumentare la leggibilità.
-   Un valore a zero (0) non andrebbe scritto con l’unità di misura.
-   Le unità di misura andrebbero manipolate solo attraverso operazioni matematiche, non attraverso manipolazioni di stringhe.
-   È consigliabile inserire tra parentesi tonde le operazioni matematiche, per migliorarne la leggibilità. Inoltre le operazioni matematiche complesse dovrebbero essere divise in pezzi più piccoli.
-   I ‘numeri magici’ riducono drasticamente la manutenibilità del codice e per questo dovrebbero essere evitati a tutti i costi. Se avete dei dubbi, commentate spiegando estensivamente il perchè di quel valore.

#### Colori

-   I colori andrebbero espressi in HSL quando possibile, altrimenti in RGB e come ultima scelta in esadecimale (in minuscolo e nella versione abbreviata). Parole chiave riguardanti i colori andrebbero evitate.
-   Quando dovete schiarire o scurire un colore, alle funzioni `darken(..)` e `lighten(..)` preferite `mix(..)`.

#### Liste

-   Le liste andrebbero sempre separate con la virgola, a meno che non siano usate per mappare valori CSS separati da spazi.
-   L’utilizzo di parentesi tonde per aumentare la leggibilità è una buona prassi.
-   Le liste in linea non dovrebbero avere la virgola di chiusura, quelle su più righe invece sì.

#### Mappe

-   Le mappe che contengono più di una singola coppia chiave/valore vanno scritte su più righe.
-   Per aiutare la manutenibilità, l’ultima coppia di una mappa dovrebbe avere una virgola alla fine.
-   Se le chiavi di una mappa sono delle stringhe, andrebbero comunque tra parentesi come qualsiasi altra stringa.

#### Ordine delle dichiarazioni

-   Il sistema usato per ordinare le dichiarazioni (alfabetico, per tipo, ecc…) non è rilevante. L’importante è che sia consistente.

#### Annidamento dei selettori

-   Evitate l’annidamento dei selettori se non è necessario (ovvero la maggior parte delle volte).
-   Utilizzate selettori annidati per pseudo-classi e pseudo-elementi.
-   Le media query possono essere tranquillamente innestate all’interno del selettore di appartenenza.

### Convenzione sulla nomenclatura

-   È meglio scegliere una convenzione di nomenclatura che sia (con le dovute eccezioni) in minuscolo e separata da trattini.

-   CSS è un linguaggio ingannevole. Non esitate mai a scrivere commenti dettagliati su cose che possono sembrare (o essere) equivoche.
-   Per variabili, funzioni, mixin e placeholder stabilite una API pubblica e usate il sistema di commenti di SassDoc.

### Variabili

-   Usate il flag `!default` per qualsiasi variabile delle vostre API pubbliche che possa essere cambiata senza problemi.
-   Non usate il flag `!global` se siete a livello di root. Sarà considerata una violazione della sintassi Sass in futuro.

### Extend

-   Estendete placeholder, non selettori CSS.
-   Estendete un pleceholder lo stretto numero necessario di volte, onde evitare effetti non desiderati.
