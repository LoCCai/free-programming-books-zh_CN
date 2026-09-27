## Om forfatteren

Mit navn er [Kitty Giraudel](https://kittygiraudel.com), jeg er en fransk front-end udvikler med base i Berlin, Tyskland. Jeg har skrevet Sass i over to år nu, og er forfatteren af Sass-relaterede projekter såsom [SassDoc](http://sassdoc.com) og [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/). Jeg har også skrevet en bog om CSS (på fransk) med titlen [CSS3 Pratique du Design Web](https://www.amazon.fr/dp/2212140231).

Jeg har også skrevet en række Sass-biblioteker, egentlig mest bare fordi: [SassyJSON](https://github.com/KittyGiraudel/SassyJSON), [SassyLists](https://at-import.github.io/SassyLists/), [SassySort](https://github.com/KittyGiraudel/SassySort), [SassyCast](https://github.com/KittyGiraudel/SassyCast), [SassyMatrix](https://github.com/KittyGiraudel/SassyMatrix), [SassyBitwise](https://github.com/KittyGiraudel/SassyBitwise), [SassyIteratorsGenerators](https://github.com/KittyGiraudel/SassyIteratorsGenerators), [SassyLogger](https://github.com/KittyGiraudel/SassyLogger), [SassyStrings](https://github.com/KittyGiraudel/SassyStrings) og [SassyGradients](https://github.com/KittyGiraudel/SassyGradients).

[Fang mig på Twitter](https://twitter.com/KittyGiraudel)

## Kontribuering

Sass Guidelines er et gratis projekt, som jeg vedligeholder i min fritid. Jeg behøver ikke sige, at det er et ret stort arbejde at holde alt opdateret, dokumenteret og relevant. Det er dog åbenlyst, at bare det at vide, at du kunne lide denne styleguide allerede er meget værdsat!

Hvis du føler for at kontribuere, så skal du vide at bare det at tweete om det, sprede ordet eller fikse en mindre tastefejl ved at åbne et issue eller en pull request på [GitHub repository’et](https://github.com/KittyGiraudel/sass-guidelines) vil være fedt!

Sidst, men ikke mindst, før vi går i gang: hvis du har nydt dokumentet, eller hvis det er brugbart for dig eller dit team, så overvej venligst at støtte det!

[Støt Sass Guidelines](https://gum.co/sass-guidelines) [Spred ordet](https://twitter.com/share?text=Sass+Guidelines%2C+An+opinionated+styleguide+for+writing+sane%2C+maintainable+and+scalable+Sass+by+%40KittyGiraudel+%E2%80%93&url=https://sass-guidelin.es)

## Om Sass

Sådan beskriver [Sass](https://sass-lang.com) sig selv i dets [dokumentation](https://sass-lang.com/documentation/file.SASS_REFERENCE.html):

> Sass er en forlængelse af CSS, der tilføjer kraft og elegance til det basale sprog.

Sass’ ultimative mål er at fikse CSS’ skønhedsfejl. CSS, som vi alle kender det, er ikke det bedste sprog i verden \[citation mangler\]. På trods af at det er simpelt at lære, så kan det hurtigt blive ret rodet, især i store projekter.

Det er her hvor Sass kommer ind, som et metasprog, til at forbedre CSS’ syntaks på en måde der tilføjer ekstra funktionaliteter og brugbare værktøjer. Samtidig, så ønsker Sass at være konservativ når det kommer til CSS-sproget.

Pointen er ikke at transformere CSS til et fuldt udstyret programmeringssprog; Sass ønsker kun at hjælpe dér hvor CSS fejler. På grund af det, så er det at komme i gang med Sass ikke sværere end at lære CSS: det tilføjer blot et par ekstra funktionaliteter ovenpå det.

Når det er sagt, så er der mange måde at bruge disse funktionaliteter på. Nogle gode, nogle dårlige, nogle underlige. Disse retningslinjer er tiltænkt at give dig en konsistent og dokumenteret tilgang til at skrive Sass kode.

**Videre læsning:**

-   [Sass](https://sass-lang.com)
-   [Sass documentation](https://sass-lang.com/documentation/file.SASS_REFERENCE.html)

### Ruby Sass eller LibSass

[Sass’s første commit](https://github.com/hcatlin/sass/commit/fa5048ba405619273e474a50400c7243fbff54fe) går helt tilbage til sen-2006, over 8 år siden. Det er derfor overflødigt at sige, at det er kommet ret langt siden da. Originalt udviklet i Ruby, så poppede variationer op her og der. Den mest succesfulde, [LibSass](https://github.com/sass/libsass) (skrevet i C/C++), er nu tæt på at være fuldt kompatibel med den originale Ruby-version.

I 2014 [besluttede holdene bag Ruby Sass og LibSass at vente på at begge versioner kunne synkronisere, før de bevægede sig videre fremad](https://github.com/sass/libsass/wiki/The-LibSass-Compatibility-Plan). Siden da har LibSass været meget aktiv i at udgive versioner, der har funktionalitets-paritet med dets storebror. De sidste tilbageblivende inkonsistenser har jeg samlet og listet under projektet [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/). Hvis du er blevet opmærksom på en inkompatibilitet mellem de to versioner, så vær rar at åbne et issue.

For at vende tilbage til valget om din compiler. Det hele afhænger rent faktisk af dit projekt. Hvis dit projekt er et Ruby on Rails projekt, så bør du bruge Ruby Sass, der er perfekt velegnet til en sådan situation. Vær også opmærksom på at Ruby Sass altid vil være implementationsreferencen, og vil derfor altid være foran LibSass når det kommer til funktionaliteter.

Ved ikke-Ruby projekter, der har behov for en workflow integration, så er LibSass højest sandsynlig en bedre idé, da den for det meste er dedikeret til at blive indpakket. Så hvis du ønsker at bruge f.eks. Node.js, så er [node-sass](https://github.com/sass/node-sass) det klare valg.

**Videre læsning:**

-   [LibSass](https://github.com/sass/libsass)
-   [Getting to know LibSass](https://webdesign.tutsplus.com/articles/getting-to-know-libsass--cms-23114)
-   [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/)
-   [Switching from Ruby Sass to LibSass](https://www.sitepoint.com/switching-ruby-sass-libsass/)

### Sass eller SCSS

Der er eksisterer megen forvirring omkring semantikken ved navnet _Sass_, og af god grund: Sass betyder både preprocessoren og dens egen syntaks. Ikke særlig hensigtsmæssigt, vel?

Ser du, Sass blev originalt beskrevet som en syntaks hvoraf de definerende karaktertræk var dets sensitivitet overfor indentering. Inden længe besluttede holdet bag Sass at lukke hullet mellem Sass og CSS ved at tilbyde en CSS-venlig syntaks kaldet _SCSS_, som står for _Sassy CSS_. Dets motto er: hvis det er valid CSS, så er det valid SCSS.

Siden da har Sass (preprocessoren) tilbudt to forskellige syntakser: Sass (uden store bogstaver, [tak](http://sassnotsass.com)), også kendt som _den indenterede syntaks_, og SCSS. Hvilken en du bruger er faktisk helt op til dig, da de er fuldstændigt ens funktionalitetsmæssigt. Her er det kun et spørgsmål om æstetik.

Sass’ whitespace-sensitive syntaks afhænger af indentering for at fjerne klammer, semi-kolonner og andre tegnsætningssymboler, hvilket leder til en slankere og kortere syntaks. Samtidig, så er SCSS nemmere at lære da det egentlig bare er CSS med lidt ekstra ovenpå.

Jeg selv foretrækker SCSS frem for Sass, fordi det er tættere på CSS og rarere for de fleste udviklere. På grund af det, så er SCSS standard-syntaksen for disse retningslinjer. Du kan skifte til indenteret Sass syntaks via .

**Videre læsning:**

-   [What’s the difference between Sass and SCSS](https://www.sitepoint.com/whats-difference-sass-scss/)

### Andre preprocessorer

Sass er en preprocessor blandt mange andre. Dens mest seriøse konkurrent må være [LESS](http://lesscss.org/), en Node.js-baseret preprocessor, der er blevet ret populært fordi det kendte CSS framework [Bootstrap](https://getbootstrap.com/) anvender det. Der findes også [Stylus](https://stylus-lang.com/) - som er den nørdede, ubegrænsede version af LESS - hvor du kan gøre praktisk taget lige hvad du vil, da den nærmest transformerer CSS om til et programmeringssprog.

_Hvorfor vælge Sass frem for LESS eller en anden preprocessor?_, er et godt spørgsmål selv i dag. For ikke så længe siden anbefalede vi Sass til Ruby-baserede projekter, fordi det først var skrevet i Ruby og fungerede godt med Ruby on Rails. Nu hvor LibSass (næsten) er på samme niveau som det originale Sass, så er anbefalingen ikke længere relevant.

Hvad jeg godt kan lide ved Sass er dets konservative tilgang til CSS. Sass’ design er baseret på stærke principper: meget af designtilgangen kommer naturligt fra hovedteamets overbevisninger om, at a) tilføjelse af ekstra funktionaliteter har en kompleksitetsudgift, som skal retfærdiggøres på baggrund af brugbarhed, og b) at det skal være nemt at argumentere for hvad en given blok af styles laver ud fra at se på blokken alene. Dertil, så har Sass et meget skarpere øje for detaljer end de andre preprocessorer. Så vidt jeg ved bekymrer hovedteamet sig meget om at støtte hver eneste edge-case af CSS-kompatibilitet, og sikrer sig at hver enkelt generel adfærd er konsistent.

Med andre ord, så er Sass ikke en preprocessor der er målrettet mod at please nørdede wannabe-programmører som mig, ved at tilføje særlige funktionaliteter ovenpå et sprog der ikke er tiltænkt at skulle understøtte nogen logiske brugssituationer. Det er et stykke software målrettet mod at løse aktuelle problemer; at hjælpe med at tilføje brugbar funktionalitet til CSS, dér hvor CSS kommer til kort.

Lad os lægge preprocessorerne til side, da vi også bør nævne postprocessorer, der har modtaget nævneværdig eksponering de sidste par måneder, hovedsageligt på grund af [PostCSS](https://github.com/postcss/postcss) og [cssnext](https://cssnext.github.io/). Postprocessorer er rimeligt meget det samme som preprocessorer bortset fra at de ikke tilføjer andet end den kommende CSS syntax.

Du kan tænke på postprocessorer som en slags polyfill for ikke-understøttede CSS funktionaliteter. For eksempel, så ville du skrive variabler som de beskrives i [CSS specifications](https://drafts.csswg.org/css-variables/), dernæst kompilere dine stylesheets med en postprocessor for derefter at opleve at hver variabel bliver erstattet med dets værdi, ligesom Sass ville gøre.

Idéen bag postprocessorer er, at når browsere støtter nye funktionaliteter (f.eks. CSS variabler), så vil postprocessoren ikke kompilere dem længere og lade browserne tage over.

Selvom det at give os morgendagens syntaks i dag er en nobel idé, så bliver jeg nødt til at sige at jeg stadig foretrækker at anvende Sass til de fleste opgaver. Dog er der situationer, hvor jeg tror at postprocessorer er mere velegnet end Sass og lignende - CSS præ-fiksing for eksempel - men dette vender vi tilbage til.

**Videre læsning:**

-   [LESS](http://lesscss.org/)
-   [Stylus](https://stylus-lang.com/)
-   [cssnext](https://cssnext.github.io/)
-   [PostCSS](https://github.com/postcss/postcss)

## Indledning

### Hvorfor en styleguide

En styleguide er ikke bare hyggelæsning, der maler et ideelt billede af din kode. Det er et vigtigt dokument i et projekts liv, der beskriver hvordan og hvorfor kode bør blive skrevet. Det kan se overdrevet ud til små projekter, men det hjælper meget med at holde kodebasen ren, skalérbar og let at vedligeholde.

Det er unnødvendigt at sige, at jo flere udviklere der er involveret i et projekt desto flere kode-retningslinjer er nødvendige. I samme dur, så jo større et projekt desto større er kravet for en styleguide.

[Harry Roberts](https://csswizardry.com) forklarer dette meget godt i [CSS Guidelines](https://cssguidelin.es/#the-importance-of-a-styleguide):

> En programmeringsstyleguide (bemærk, ikke en visuel styleguide) er et værdifuldt værktøj for teams som:
> 
> -   bygger og vedligeholder produkter over en rimelig mængde tid;
> -   har udviklere med forskellige evner og specialiseringer;
> -   har et antal af forskellige udviklere, der arbejder på et produkt på ethvert givent tidspunkt;
> -   oplærer nye ansatte regelmæssigt;
> -   har et antal af kodebaser, som udviklere skal dykke ned i og op ad.

### Disclaimer

Først og fremmest: **dette er ikke en CSS styleguide**. Dette dokument vil ikke diskutere konventioner for navngivning af CSS-klasser, modulære mønstre og spørgsmålet om ID’er i CSS-verdenen. Disse retningslinjer fokuserer kun på hvordan man arbejder med Sass-specifikt indhold.

Dertil, så er denne styleguide min egen og den er derfor **meget farvet**. Tænk på denne som en samling af metodologier og råd, som jeg har finpudset og givet over årene. Det har også givet mig muligheden for at linke til en håndful indsigtsfulde resourcer, så vær sikker på at tjekke _Videre læsning_ ud.

Det er åbenlyst at dette selvfølgelig ikke er den eneste måde at gøre tingene på, og vil enten passe eller ikke passe til dit projekt. Vær velkommen til at udvælge hvad du kan bruge, og tilpasse det til dine behov. **Hver sin smag**, som vi siger.

### Nøgleprincipper

Når alt kommer til alt, så hvis der er noget jeg gerne vil have at du tager med dig fra hele denne styleguide, så er det at **Sass bør holdes så enkelt som det kan blive**.

Takket være mine fjollede eksperimenter, såsom [bitwise operatører](https://github.com/KittyGiraudel/SassyBitwise), [iteratorer og generatorer](https://github.com/KittyGiraudel/SassyIteratorsGenerators) og [en JSON parser](https://github.com/KittyGiraudel/SassyJSON) i Sass, så er vi alle meget klare over hvad man kan gøre med denne preprocessor.

I mellemtiden, så er CSS et simpelt sprog. Sass, som tiltænkt til at skrive CSS, bør ikke blive meget mere kompleks end almindelig CSS. [KISS princippet](https://en.wikipedia.org/wiki/KISS_principle) (Keep It Simple Stupid) er nøglen her, og kan endda være vigtigere end [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) (Don’t Repeat Yourself) i nogle tilfælde.

Sommetider er det bedre at gentage sig selv en smule for at holde koden vedligeholdelsesvenlig, fremfor at bygge et meget tungt, uhåndterbart og unnødvendigt kompliceret system, der er fuldstændig umulig at vedligeholde fordi det er alt for komplekst.

Dertil, så lad mig citere [Harry Roberts](https://csswizardry.com) endnu engang, **pragmatisme trumfer perfektion**. På et tidspunkt, så vil du højest sandsynlig finde dig selv i en situation hvor du går imod reglerne, som står beskrevet her. Hvis det giver mening, og hvis det føles rigtigt, så gør det. Kode er kun et middel, ikke målet.

**Videre læsning:**

-   [KISS principle](https://en.wikipedia.org/wiki/KISS_principle)
-   [DRY principle](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself)
-   [Keep Sass Simple](https://www.sitepoint.com/keep-sass-simple/)

## Syntaks & formatering

Hvis du spørger mig, så er noget af det allerførste en styleguide bør gøre, er at beskrive måden hvordan vi vil have vores kode til at se ud.

Når flere udviklere er involveret i at skrive CSS på de(t) samme projekt(er), så er det kun et spørgsmål om tid før en af dem begynder at gøre tingene på deres egen måde. Retningslinjer for kode, der fremmer konsistens, er ikke blot med til at undgå dette, men hjælper også når det kommer til at læse og opdatere koden.

Groft sagt, så ønsker vi (skamløst inspireret af [CSS Guidelines](https://cssguidelin.es/#syntax-and-formatting)):

-   indentering á to (2) mellemrum, ingen tabs;
-   80-karakterer brede linjer, ideelt set;
-   ordentligt skrevede, multi-linje CSS-regler;
-   meningsfuld brug af whitespace.

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

Vi vil ikke tackle spørgsmålet omkring filorganisering i denne sektion. Det er formålet for [en anden sektion](#arkitektur).

### Strenge

Tro det eller ej, så spiller strenge en ret stor rolle i økosystemerne for både CSS og Sass. De fleste CSS-værdier er enten længder eller strenge (ofte uciterede), så det er faktisk ret vigtigt at holde sig til nogle retningslinjer når man arbejder med strenge i Sass.

#### Encoding

For at undgå potentielle problemer med karakter-encoding, så anbefales det kraftigt at tvinge [UTF-8](https://en.wikipedia.org/wiki/UTF-8) encoding i [hoved-stylesheetet](#main-filen) ved at anvende `@charset` direktivet. Vær sikker på at det er det allerførste element i stylesheetet, og at der ikke er nogen form for karakterer før det.

```
@charset 'utf-8';
```

```
@charset 'utf-8'
```

#### Citationstegn

CSS kræver ikke at strenge bliver citerede, ikke engang dem der indeholder mellemrum. Tag font-family navne som eksempel: for CSS parseren gør det ingen forskel hvorvidt du pakker dem ind i citationstegn.

På grund af det, så kræver Sass _heller ikke_ at strenge citeres. Endnu bedre er (og _heldigvis_, vil du nok indrømme), at en citeret streng er fuldstændig den samme som dens uciterede tvilling (f. eks. er `'abc'` fuldstændig det samme som `abc`).

Med det sagt, så er sprog der ikke kræver at strenge bliver citeret klart en minoritet, og derfor **bør strenge altid indpakkes i enkelte citationstegn** (`'`) i Sass (enkelte citationstegn er nemmere at taste end dobbelte på _qwerty_ tastaturer). Foruden konsistens med andre sprog, inklusiv CSS’ kusine JavaScript, er der flere grunde bag dette valg:

-   farvenavne behandles på samme måde som uciterede farver, hvilket kan lede til alvorlige problemer;
-   de fleste syntax highlighters får sure opstød af uciterede strenge;
-   det hjælper med generel læsbarhed;
-   der er ingen god grund til ikke at citere strenge.

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

#### Strenge som CSS værdier

Specifikke CSS værdier, såsom `initial` eller `sans-serif` kræver ikke at blive citeret. Det er klart, at `font-family: 'sans-serif'` vil fejle i stilhed fordi CSS forventer en identifier og ikke en citeret streng. På grund af dette, så citerer vi ikke disse værdier.

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

Dermed kan vi lave en distinktion mellem strenge der har til hensigt at blive brugt som CSS værdier (CSS identifiers), som i det forrige eksempel, og strenge der holder sig til Sass’ datatype, som for eksempel map-nøgler.

Vi citerer ikke den førstnævnte, men vi indpakker den sidstnævnte i enkelte citationstegn.

#### Strenge der indeholder citationstegn

Hvis en streng indeholder en eller flere citationstegn, så kan man overveje at indpakke strengen i dobbelte citationstegn (`"`) i stedet, for at undgå at escape for mange karakterer inden i strengen.

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

#### URL’er

URL’er bør også blive citeret af de samme grunde som ovenfor:

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

**Videre læsning:**

-   [All You Ever Need to Know About Sass Interpolation](https://webdesign.tutsplus.com/tutorials/all-you-ever-need-to-know-about-sass-interpolation--cms-21375)
-   [SassyStrings](https://github.com/KittyGiraudel/SassyStrings)

### Tal

I Sass er tal en datatype der inkluderer alt lige fra enhedsløse numre til længder, varigheder, frekvenser, vinkler og så videre. Dette tillader udførelse af udregninger på sådanne målinger.

#### Nuller

Tal bør vise foranstillede nuller før en decimalværdi, der er mindre end et. Vis aldrig efterstillede nuller.

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

#### Enheder

Når du arbejder med længder, så bør en værdi af `0` aldrig have en enhed.

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

Den mest typiske fejl jeg kan komme i tanke om, i relation til tal i Sass, er at tænke på enheder som kun værende strenge der trygt kan tilføjes til et tal. Selvom det lyder sandt, så er det absolut ikke sådan enheder virker. Tænk på enheder som algebraiske symboler. For eksempel, som i den virkelig verden, hvis du ganger 5 tommer med 5 tommer så får du 25 kvadrattommer. Den samme logik gælder ved Sass.

For at tilføje en enhed til et tal, så er du nødt til at gange dette tal med _1 enhed_.

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

Bemærk at tilføjelse af _0 medlem af samme enhed_ også virker, men jeg vil hellere anbefale den førnævnte metode, siden _0 enhed_ kan være en anelse forvirrende. Det er klart, at når man forsøger at konvertere et tal til en anden kompatibel enhed, så vil tilføjelse af 0 ikke være nok.

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

Når alt kommer til alt, så afhænger det af hvad du forsøger at opnå. Bare hold det i tankerne, at tilføjelse af en enhed til en streng ikke altid er en god fremgangsmåde.

For at fjerne en værdis enhed, så er du nødt til at dividere den med _en enhed af dets slags_.

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

Tilføjelse af en enhed som en streng til et tal resulterer i en streng, hvilket forhindrer enhver yderligere operation på værdien. At opdele den numeriske del af et tal med en enhed resulterer også i en streng. Dette er ikke hvad du ønsker.

#### Kalkulationer

**Numeriske kalkulationer på top-niveau bør altid indpakkes i paranteser**. Ikke alene forbedrer dette krav læsbarheden dramatisk, det forhindrer også særtilfælde ved at tvinge Sass til at evaluere indholdet af paranteserne.

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

#### Magiske tal

“Magiske tal” er et [old school programmeringsterm](https://en.wikipedia.org/wiki/Magic_number_\(programming\)#Unnamed_numerical_constants) for _unavngivne numeriske konstanter_. Basalt set, så er det et tilfældigt tal der _bare virker_™, dog uden at være forbundet til nogen logisk forklaring.

Selvfølgelig er **magiske tal en plage og bør undgås for enhver pris**. Når du ikke kan finde en fornuftig forklaring for hvorfor et tal virker, så tilføj en uddybende kommentar der forklarer hvordan du er nået hertil, og hvorfor du tror det virker. At indrømme at du ikke ved hvorfor noget virker er stadig mere hjælpsomt for den næste udvikler, end at få dem til regne ud hvad det er der sker fra bunden af.

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

**Videre læsning:**

-   [Use Lengths, Not Strings](https://kittygiraudel.com/2013/09/03/use-lengths-not-strings/)
-   [Correctly Adding Unit to Number](https://css-tricks.com/snippets/sass/correctly-adding-unit-number/)
-   [Magic Numbers in CSS](https://css-tricks.com/magic-numbers-in-css/)
-   [Sassy-Math](https://github.com/at-import/sassy-math)

### Farver

Farver har en vigtig plads i CSS-sproget. Sass bliver derfor naturligt en værdifuld allieret når det kommer til manipulation af farver, mest fordi det giver os en håndfuld [kraftfulde funktioner](https://sass-lang.com/documentation/Sass/Script/Functions.html).

#### Farveformater

For at holde farver så simple som muligt, så vil mit råd være at respektere den følgende rækkefølge for farveformater:

1.  [CSS farve-nøgleord](https://www.w3.org/TR/css3-color/#svg-color);
2.  [HSL notation](https://en.wikipedia.org/wiki/HSL_and_HSV);
3.  [RGB notation](https://en.wikipedia.org/wiki/RGB_color_model);
4.  Hexadecimal notation. Små bogstaver og forkortet, hvis muligt, er at foretrække.

Som udgangspunkt, så taler nøgleord ofte for sig selv. HSL-repræsentationen er ikke kun den nemmeste for den menneskelige hjerne at forstå \[citation mangler\], den er også nemmere for forfattere af stylesheets når det kommer til at fintune farven ved at justere nuance, mætning og lyshed hver for sig. RGB har stadig en fordel ved med det samme at vise om farven er mere en blå, en grøn eller en rød, men den gør det ikke nemmere at bygge en farve ud af de tre dele. Til sidst, så er hexidecimaler tættest på at være uforståeligt for det menneskelige sind.

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

Når man anvender HSL eller RGB, så tilføj altid et enkelt mellemrum efter et komma (`,`) og ingen mellemrum mellem paranteser (`(`, `)`) og indhold.

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

#### Farver og variabler

Når en farve anvendes mere end én gang, så gem den i en variabel med et meningsfuldt navn, der repræsenterer farven.

```
$sass-pink: hsl(330, 50%, 60%);
```

```
$sass-pink: hsl(330, 50%, 60%)
```

Du står dig nu frit for at anvende denne variabel hvorend du vil. Dog, hvis din brug er tæt koblet til et tema, så vil jeg fraråde at anvende variablen som den er. Gem den i stedet i en anden variabel med et navn der forklarer hvordan den bør bruges.

```
$main-theme-color: $sass-pink;
```

```
$main-theme-color: $sass-pink
```

Ved at gøre det på denne måde, forhindrer du at tema-ændringer fører til ting som `$sass-pink: blue`.

#### Lysning og mørkning af farver

Både [`lighten`](https://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method) og [`darken`](https://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method) er funktioner til manipulation af lysstyrken af en farve i HSL-rum ved at tilføje eller fratrække lysstyrken i HSL-rummet. Basalt set er de intet andet end aliaser for `$lightness` parametret af [`adjust-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#adjust_color-instance_method) funktionen.

Sagen er den, at disse funktioner ofte ikke giver det forventede resultat. På den anden side, så er [`mix`](https://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method) funktionen en god måde at lysne eller mørkne en farve på, ved at mikse den med enten `white` eller `black`.

Fordelen ved at anvende `mix` i stedet for at en af de to førnævnte funktioner er, at det den vil progressivt gå mod sort (eller hvid) efterhånden som du reducerer farvens proportion, hvoraf `darken` og `lighten` hurtigt vil kaste en farve helt mod sort eller hvid.

  

Illustration af forskellen mellem `lighten`/`darken` og `mix` af [KatieK](https://codepen.io/KatieK2/pen/tejhz/)

Hvis du ikke ønsker at skrive `mix` funktionen hver gang, så kan du skabe to letanvendelige funktioner kaldet `tint` og `shade` (der også er en del af [Compass](http://compass-style.org/reference/compass/helpers/colors/#shade)), til at udføre den samme ting:

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

[`scale-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method) funktionen er designet til at skalere egenskaber mere flydende ved at tage hvor høje og lave de allerede er med i betragtning. Den bør give resultater der er ligeså gode som `mix'` men med en klarere konvention for kald. Skaleringsfaktoren er dog ikke helt den samme.

**Videre læsning:**

-   [A Visual Guide to Sass & Compass Color Functions](http://jackiebalzer.com/color)
-   [How to Programmatically Go From One Color to Another](https://kittygiraudel.com/2014/01/30/programmatically-go-from-one-color-to-another-with-sass/)
-   [Sass Color Variables That Don’t Suck](https://davidwalsh.name/sass-color-variables-dont-suck)
-   [Using Sass to Build Color Palettes](https://www.sitepoint.com/using-sass-build-color-palettes/)
-   [Dealing with Color Schemes in Sass](https://www.sitepoint.com/dealing-color-schemes-sass/)

### Lister

Lister er Sass’ svar på arrays. En liste er en flad datastruktur (modsat [maps](#maps)), der har til hensigt at gemme værdier af enhver type (inklusiv lister, hvilket leder til indlejrede lister).

Lister bør respektere de følgende retningslinjer:

-   enten indlejrede eller i flere linjer;
-   nødvendigvis i flere linjer, hvis for lang til at passe ind i linje på 80-karakterer;
-   medmindre brugt som den er til CSS formål, skal det altid være komma-separeret;
-   altid indpakked i paranteser;
-   efterstillede kommaer hvis flere linjer, ikke hvis indlejret.

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

Når du tilføjer nye artikler til en liste, så brug altid den medfølgende API. Forsøg ikke at tilføje nye artikler manuelt.

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

**Videre læsning:**

-   [Understanding Sass lists](https://kittygiraudel.com/2013/07/15/understanding-sass-lists/)
-   [SassyLists](https://at-import.github.io/SassyLists/)

### Maps

Siden Sass 3.3 kan stylesheet forfattere definere maps — Sass-termet for et associativ array, hashes eller endda JavaScript objekter. Et map er en datastruktur til forbinde nøgler (der kan være af enhver datatype, inklusiv maps, selvom jeg ikke anbefaler det) til værdier af enhver type.

Maps bør altid blive skrevet som følgende:

-   mellemrum efter kolon (`:`);
-   åbnende klamme (`(`) på samme linje som kolonet (`:`);
-   **citerede nøgler**, hvis de er strenge (hvilket repræsenterer 99% af situationerne);
-   hver nøgle/værdi par er på dets egen, nye linje;
-   **efterstillet komma** (`,`) på den sidste artikel gør det lettere at tilføje, fjerne eller omarrangere artikler;
-   afsluttende klamme (`)`) på hver sin, nye linje;
-   intet mellemrum eller ny linje mellem en afsluttende klamme (`)`) og semikolon (`;`).

Illustration:

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

#### Debugging af et Sass map

Hvis du nogensinde har følt dig fortabt, og tænkt hvilken skør magi der foregår i et Sass map, så fortvivl ikke, der stadig er en måde at blive reddet på.

```
@mixin debug-map($map) {
  @at-root {
    @debug-map {
      __toString__: inspect($map);
      __length__: length($map);
      __depth__: if(function-exists('map-depth'), map-depth($map), null);
      __keys__: map-keys($map);
      __properties__ {
        @each $key, $value in $map {
          #{'(' + type-of($value) + ') ' + $key}: inspect($value);
        }
      }
    }
  }
}
```

```
=debug-map($map)
  @at-root
    @debug-map
      __toString__: inspect($map)
      __length__: length($map)
      __depth__: if(function-exists('map-depth'), map-depth($map), null)
      __keys__: map-keys($map)
      __properties__
        @each $key, $value in $map
          #{'(' + type-of($value) + ') ' + $key}: inspect($value)
```

Hvis du er interesseret i at vide dybden af map’et, så tilføj følgende funktion. Mixin’en vil vise det automatisk.

```
/// Compute the maximum depth of a map
/// @param {Map} $map
/// @return {Number} max depth of `$map`
@function map-depth($map) {
  $level: 1;

  @each $key, $value in $map {
    @if type-of($value) == 'map' {
      $level: max(map-depth($value) + 1, $level);
    }
  }

  @return $level;
}
```

```
/// Compute the maximum depth of a map
/// @param {Map} $map
/// @return {Number} max depth of `$map`
@function map-depth($map)
  $level: 1

  @each $key, $value in $map
    @if type-of($value) == 'map'
      $level: max(map-depth($value) + 1, $level)

  @return $level;
```

**Videre læsning:**

-   [Using Sass Maps](https://www.sitepoint.com/using-sass-maps/)
-   [Debugging Sass Maps](https://www.sitepoint.com/debugging-sass-maps/)
-   [Extra Map functions in Sass](https://www.sitepoint.com/extra-map-functions-sass/)
-   [Real Sass, Real Maps](http://blog.grayghostvisuals.com/sass/real-sass-real-maps/)
-   [Sass Maps are Awesome](https://viget.com/extend/sass-maps-are-awesome)
-   [Sass list-maps](https://github.com/lunelson/sass-list-maps)
-   [Sass Maps Plus](https://github.com/lunelson/sass-maps-plus)
-   [Sassy-Maps](https://github.com/at-import/sassy-maps)
-   [Introduction to Sass Maps Usage and Examples](https://webdesign.tutsplus.com/tutorials/an-introduction-to-sass-maps-usage-and-examples--cms-22184)

### CSS Regelsæt

På dette tidspunkt, hvilket mest er en opsummering af hvad alle ved, men her er måden hvordan et CSS regelsæt bør blive skrevet (i det mindste ifølge de fleste retningslinjer, inklusiv [CSS Guidelines](https://cssguidelin.es/#anatomy-of-a-ruleset)):

-   relaterede selektorer på samme linje; urelaterede selektorer på nye linjer;
-   den åbnende klamme (`{`) har afstand fra den sidste selektor med et enkelt mellemrum;
-   hver deklaration på dets egen, nye linje;
-   et mellemrum efter kolonet (`:`);
-   et efterstillet semikolon (`;`) ved enden af alle deklarationer;
-   den afsluttende klamme (`}`) på sin egen, nye linje;
-   en ny linje efter den afsluttende klamme `}`.

Illustration:

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

Ifølge disse CSS-relaterede retningslinjer, så ønsker vi at være opmærksomme på:

-   at lokale variabler bliver deklareret før alle andre deklarationer, for derefter at have afstand til deklarationer via en ny linje;
-   at mixin-kald uden nogen `@content` kommer efter enhver deklaration;
-   at indlejrede selektorer altid kommer efter en ny linje;
-   at mixin-kald med `@content` kommer efter enhver indlejret selektor;
-   at der ikke er nogen ny linje før en afsluttende klamme (`}`).

Illustration:

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

**Videre læsning:**

-   [Anatomy of a Ruleset](https://cssguidelin.es/#anatomy-of-a-ruleset)

### Sortering af Deklarationer

Jeg kan ikke komme på mange emner, hvor meninger er så splittede som de er når det kommer til sortering af deklarationer i CSS. Helt konkret, så er to fraktioner på spil her:

-   at holde sig til den alfabetiske rækkefølge;
-   at arrangere deklarationerne efter type (position, display, farver, skrifttype, diverse…).

Der er fordele og ulemper ved begge tilgange. På den ene side, så er alfabetisk sortering universelt (i det mindste for sprog, der anvender det latinske alfabet), så der er ikke noget argument om at sortere en egenskab efter en anden. Dog finder jeg det ekstremt mærkeligt ikke at se værdier som `bottom` og `top` lige ved siden af hinanden. Hvorfor skulle animationer komme før display-typen? Der er mange særheder ved en alfabetisk arrangering.

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

På den anden side, giver arrangering af egenskaber efter type perfekt mening. Enhver skrifttype-relateret deklaration bliver samlet, `top` og `bottom` er genforenet, og at læse et regelsæt føles lidt ligesom at læse en kort historie. Men medmindre du holder til konventioner såsom [Idiomatic CSS](https://github.com/necolas/idiomatic-css), så opstår der en masse plads til fortolkning ved denne måde. Hvor bør `white-space` være: font eller display? Hvor hører `overflow` til helt præcist? Hvad er rækkefølgen for egenskaber i en gruppe (det kunne være alfabetisk, ironisk nok)?

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

Der findes også en helt anden, interessant underart af type-sortering kaldet [Concentric CSS](https://github.com/brandon-rhodes/Concentric-CSS), der virker til også at være ret populær. Grundlæggende, så læner Concentric CSS sig op ad box-modellen for at definere en rækkefølge: den starter udefra og bevæger sig indad.

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

For at tale for mig selv, så kan jeg ikke beslutte mig. En nylig afstemning på [recent poll on CSS-Tricks](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/) konkluderede, at over 45% af udviklerne arrangerer deres deklarationer efter type imod 14%, der gør det alfabetisk. Dertil, så går 39% fuldstændig tilfældig til værks, inklusiv mig selv.

  ![Diagram der viser hvordan udviklere arrangerer deres CSS deklarationer ](https://sass-guidelin.es/assets/images/css-order-chart.png)

Diagram der viser hvordan udviklere arrangerer deres CSS deklarationer

På grund af det, så vil jeg ikke pålægge dig et valg i denne styleguide. Vælg den tilgang du foretrækker, så længe du er konsistent gennem dine stylesheets (ikke den _tilfældige_ tilgang, for eksempel).

Et [nyligt studie](https://web.archive.org/web/20190618180712/http://peteschuster.com/2014/12/reduce-file-size-css-sorting/) viser at ved at anvende [CSS Comb](https://github.com/csscomb/csscomb.js) (der anvender [type-arrangering](https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json) til sortering af CSS deklarationer, så afkortes gennemsnitsfilen under Gzip kompression med 2.7%, sammenligned med 1.3% når der sorteres alfabetisk.

**Videre læsning:**

-   [CSS Comb](https://github.com/csscomb/csscomb.js)
-   [Concentric CSS](https://github.com/brandon-rhodes/Concentric-CSS)
-   [Idiomatic CSS](https://github.com/necolas/idiomatic-css)
-   [On Declaration Sorting](https://meiert.com/en/blog/20140924/on-declaration-sorting/)
-   [Reduce File Size With CSS Sorting](https://web.archive.org/web/20190618180712/http://peteschuster.com/2014/12/reduce-file-size-css-sorting/)
-   [Poll Results: How Do You Order Your CSS Properties?](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/)

### Indlejring af selektorer

En særlig funktionalitet som Sass giver, der bliver misbrugt alt for meget af mange udviklere er _indlejring af selektorer_. Indlejring af selektorer giver stylesheet forfattere en måde at beregne lange selektorer ved at indlejre kortere selektorer inde i hinanden.

#### Generel regel

For eksempel, så vil den følgende Sass indlejring:

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

… generere denne CSS:

```
.foo .bar:hover {
  color: red;
}
```

På samme måde er det siden Sass 3.3 muligt at anvende den nuværende selektor-reference (`&`) til at generere avancerede selektorer. For eksempel:

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

… vil generere denne CSS:

```
.foo-bar {
  color: red;
}
```

```
.foo-bar
  color: red
```

Denne metode anvendes ofte sammen med [navnekonventionerne for BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) ti at generere `.block__element` og `.block--modifier` selektorer, baseret på den oprindelige selektor (f. eks. `.block` i dette tilfælde).

Selvom det måske er anekdotisk, så når nye selektorer genereres fra den nuværende selektor-reference (`&`), så gør dét disse selektorer usøgbare i kodebasen, da egentlig ikke længere eksisterer.

Problemet med indlejring af selektorer er at det i sidste ende gør koden sværere at læse. Man skal mentalt beregne den endelige selektor ud fra indenteringsniveauer; det er derfor ikke altid særlig åbenlyst hvad CSS’en vil ende ud som.

Dette udsagn bliver mere sandt efterhånden som selektorer og referencer til den nuværende selektor (`&`) bliver hyppigere. På dette tidspunkt bliver risikoen for at miste overblikket, og at være ude af stand til at forstå hvad der sker, så høj at det ikke er dét værd.

For at undgå en sådan situation, så **undgår vi indlejring af selektorer så meget som muligt**. Dog er der åbenlyst nogle få undtagelser til denne regel.

#### Undtagelser

Til at starte med, så er det tilladt og endda anbefalet at indlejre pseudo-klasser og pseudo-elementer inden i den indledende selektor.

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

At anvende selektor-indlejring til pseudo-klasser og pseudo-elementer giver ikke alene mening (fordi det håndterer tæt relaterede selektorer), det hjælper også med at holde alt omkring et komponent på det samme sted.

Dertil, så når komponent-agnostiske tilstandsklasser såsom `.is-active` anvendes, så er det helt i orden at indlejre det under komponentets selektor for at holde tingene pæne.

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

Sidst, men ikke mindst, så når et element styles fordi det eksisterer inden i et andet specifikt element, så er det også fint at bruge indlejring til at holde alt omkring komponentet på det samme sted.

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

Når der arbejdes med uerfarne udviklere, så kan en selektor såsom `.no-opacity &` virke en anelse underlig. For at undgå enhver forvirring, så kan du bygge en meget kortfattet mixin, der transformerer denne underlige syntaks om til en eksplicit API.

```
/// Helper mixin to provide simple API to selector nesting
/// @param {String} $selector - Selector
@mixin when-inside($selector) {
  #{$selector} & {
    @content;
  }
}
```

```
/// Helper mixin to provide simple API to selector nesting
/// @param {String} $selector - Selector
=when-inside($selector) {
  #{$selector} &
    @content
}
```

Ved at genskrive vores tidligere eksempel, så vil det se ud som dette:

```
.foo {
  // …

  @include when-inside('.no-opacity') {
    display: none;
  }
}
```

```
.foo
  // …

  +when-inside('.no-opacity')
    display: none
```

Som med alting, så er det specifikke rimelig irrelevant, da det er konsistens der er det vigtige. Hvis du føler dig fuldstændig sikker på selektor-indlejring, så brug selektor-indlejring. Bare sikr dig, at hele dit team er med på det.

**Videre læsning:**

-   [Beware of Selector Nesting](https://www.sitepoint.com/beware-selector-nesting-sass/)
-   [The Inception Rule](https://thesassway.herokuapp.com/beginner/the-inception-rule)
-   [Avoid nested selectors for more modular CSS](https://thesassway.herokuapp.com/intermediate/avoid-nested-selectors-for-more-modular-css)

## Konventioner for navngivelse

I denne sektion vil vi ikke behandle hvad de bedste CSS navgivningskonventioner er for vedligeholdelse og skalering; det er ikke alene op til dig, det er også uden for rammerne af en Sass styleguide. Jeg foreslår disse, anbefalet af [CSS Guidelines](https://cssguidelin.es/#naming-conventions).

Der er få ting du kan navngive i Sass, og det er vigtigt at navngive dem ordentligt så hele kodebasen både ser konsistent ud og er let at læse:

-   variabler;
-   funktioner;
-   mixins.

Sass-placeholdere er bevidst fjernet fra denne liste, siden de kan betragtes som almindelige CSS selektorer, hvilket følger de samme mønstre for navngivning som klasser.

Når det kommer til variabler, funktioner og mixins, så holder vi os til noget meget _CSS-agtigt_: **små bogstaver og afgrænset med bindestreg**, og først og fremmest meningsfuldt.

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

**Videre læsning:**

-   [CSS Guidelines’ Naming Conventions](https://cssguidelin.es/#naming-conventions)

### Konstanter

Hvis du tilfældigvis er en framework-udvikler eller biblioteksforfatter, så finder du muligvis dig selv i færd med at behandle variabler, der ikke er tiltænkt at blive opdateret under nogen omstændigheder: konstanter. Desværre (eller heldigvis?), så giver Sass ikke nogen måde at definere denne slags enheder på, så vi er nødt til at holde os til strikse navngivningskonventioner for at slå vores pointe fast.

Som ved mange sprog, så anbefaler jeg variabelnavne i store bogstaver, med underscore som mellemrum når de er konstanter. Det er ikke blot en meget gammel konvention, men det giver også en god kontrast til de sædvanlige “små bogstaver med bindestreger som mellemrum”-variabler.

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

**Videre læsning:**

-   [Dealing With Constants in Sass](https://www.sitepoint.com/dealing-constants-sass/)

### Namespace

Hvis du har til hensigt at distribuere din Sass kode, i tilfældet af et bibliotek, et framework, et gittersystem eller hvadend det kunne være, så bør du muligvis overveje at namespace alle dine variabler, funktioner, mixins og placeholdere så de ikke kolliderer med nogen andens kode.

For eksempel, hvis du arbejder på et _Sassy Unicorn_ projekt, der er tænkt som at blive brugt af udviklere over hele verden (hvem ville ikke det, ikk?), så kunne du overveje at bruge `su-` som et namespace. Det er specifikt nok til at forebygge enhver navnekollision og er kort nok til at ikke at være træls at skrive.

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

Bemærk, at automatisk namespacing absolut er et designmål for den kommende `@import` opdatering fra Sass 4.0. Efterhånden som det kommer tættere på at være realitet, så vil det blive mindre og mindre brugbart at foretage manuel namespacing; efterhånden vil manuelt namespacede biblioteker muligvis blive sværere at bruge.

**Videre læsning:**

-   [Please Respect the Global CSS Namespace](https://blog.kaelig.fr/post/44554267597/please-respect-the-global-css-namespace)

## Arkitektur

At konstruere et CSS projekt er højest sandsynlig noget af det sværeste du kommer til at lave i et projekts levetid. At holde arkitekturen konsistent og meningsfuld er endnu sværere.

Heldigvis er en af hovedfordelene ved at have en CSS preprocessor evnen til at kunne splitte kodebasen i flere filer, uden at det påvirker performance (som `@import` CSS-direktivet ville gøre). Takket være Sass’ overload af `@import` direktivet, så er det fuldstændig sikkert (og faktisk anbefalet) at bruge så mange filer som nødvendigt i udvikling, og derefter samle alle i ét enkelt stylesheet når man går i produktion.

Oven på det, så kan jeg ikke udtrykke nødvendigheden for mapper nok, selv ved mindre projekter. Du smider ikke alle dine papirark i den samme kasse derhjemme. Du bruger mapper; en til huset/lejligheden, en til banken, en til regningerne og så videre. Der er ingen grund til ikke at strukturere et CSS projekt på samme måde. Split kodebasen i meningsfulde mapper, så det er nemt at finde tingene senere når du er nødt til at vende tilbage til koden.

Der er mange populære arkitekturer for CSS-projekter: [OOCSS](http://oocss.org/), [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), [Bootstrap](https://getbootstrap.com/)\-lignende, [Foundation](https://get.foundation/)\-lignende… De har alle deres meritter, fordele og ulemper.

Jeg selv bruger en tilgang der har vist sig at være meget lig [SMACSS](http://smacss.com/) fra [Jonathan Snook](https://snook.ca/), der fokuserer på at holde tingene simple og åbenlyse.

Jeg har lært at arkitetur, for det meste, er meget specifik til projektet. Det står dig frit for helt at afskrive eller tilpasse løsningsforslaget, så du står med et system der dækker dine behov.

**Videre læsning:**

-   [Architecture for a Sass project](https://www.sitepoint.com/architecture-sass-project/)
-   [A Look at Different Sass Architectures](https://www.sitepoint.com/look-different-sass-architectures/)
-   [SMACSS](http://smacss.com/)
-   [An Introduction to OOCSS](https://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)
-   [Atomic Web Design](https://bradfrost.com/blog/post/atomic-web-design/)
-   [Sass, une architecture composée](https://slides.com/kittygiraudel/sass-une-architecture-composee)

### Komponenter

Der er en kæmpe forskel mellem at få noget til at _virke_, og at få noget til at blive _godt_. Igen, så er CSS et ret rodet sprog \[citation mangler\]. Jo mindre CSS vi har, jo bedre. Vi ønsker ikke at håndtere megabytes af CSS-kode. For at holde dine stylesheets korte og effektive—og det her vil ikke komme som en overraskelse for dig—så det er tit en god idé at tænke på et interface som en samling af komponenter.

Komponenter kan være hvad som helst, så længe de:

-   gør én ting, og kun én ting;
-   er genbrugelige og genbrugt på tværs af projektet;
-   er uafhængige.

For eksempel bør en søgeformular behandles som et komponent. Det bør være genbrugeligt ved forskellige positioner, på forskellige sider og i forskellige situationer. Den bør ikke være afhængig af dens position i DOM’en (footer, sidebar, hovedindhold…).

Størstedelen af ethvert interface kan tænkes som små komponenter, og jeg anbefaler kraftigt at du holder dig til dette paradigme. Det vil ikke kun forkorte mængden af CSS der skal bruges til hele projektet, men det gør det også meget nemmere at håndtere end et kaotisk rod, hvor alting flyder rundt.

### 7-1 Mønstret

Lad os vende tilbage til arkitektur. Jeg arbejder typisk med hvad jeg kalder _7-1 mønstret_: 7 mapper, 1 fil. Basalt set, så har du alle dine partials pakket ned i 7 forskellige mapper, og en enkelt fil på rod-niveauet (oftest kaldet `main.scss`) der importerer dem alle til at blive kompileret til ét CSS stylesheet.

-   `base/`
-   `components/`
-   `layout/`
-   `pages/`
-   `themes/`
-   `utils/`
-   `vendors/`

Og selvfølgelig:

-   `main.scss`

  

Baggrund af [Julien He](https://twitter.com/julien_he)

Ideelt set, så kan vi ende med noget som dette:

```
sass/
|
|– abstracts/
|   |– _variables.scss    # Sass Variables
|   |– _functions.scss    # Sass Functions
|   |– _mixins.scss       # Sass Mixins
|   |– _placeholders.scss # Sass Placeholders
|
|– base/
|   |– _reset.scss        # Reset/normalize
|   |– _typography.scss   # Typography rules
|   …                     # Etc.
|
|– components/
|   |– _buttons.scss      # Buttons
|   |– _carousel.scss     # Carousel
|   |– _cover.scss        # Cover
|   |– _dropdown.scss     # Dropdown
|   …                     # Etc.
|
|– layout/
|   |– _navigation.scss   # Navigation
|   |– _grid.scss         # Grid system
|   |– _header.scss       # Header
|   |– _footer.scss       # Footer
|   |– _sidebar.scss      # Sidebar
|   |– _forms.scss        # Forms
|   …                     # Etc.
|
|– pages/
|   |– _home.scss         # Home specific styles
|   |– _contact.scss      # Contact specific styles
|   …                     # Etc.
|
|– themes/
|   |– _theme.scss        # Default theme
|   |– _admin.scss        # Admin theme
|   …                     # Etc.
|
|– vendors/
|   |– _bootstrap.scss    # Bootstrap
|   |– _jquery-ui.scss    # jQuery UI
|   …                     # Etc.
|
`– main.scss              # Main Sass file
```

Filer følger de samme konventioner for navngivelse beskrevet ovenfor: afgrænset med en bindestreg.

#### Base mappen

`base/` mappen holder på alt hvad vi kan kalde boilerplate-kode for projektet. Derinde finder du typisk reset-filen, nogle typografiske regler, og højest sandsynlig et stylesheet (som jeg er vant til at kalde `_base.scss`), der definerer nogle standard styles for de oftest anvendte HTML-elementer.

-   `_base.scss`
-   `_reset.scss`
-   `_typography.scss`

#### Layout mappen

`layout/` mappen indeholder alt der omhandler layoutet af siden eller applikationen. Denne mappe kan have stylesheets for hoveddelene af siden (header, footer, navigation, sidebar…), gitter-systemet eller endda CSS styles for alle formularerne.

-   `_grid.scss`
-   `_header.scss`
-   `_footer.scss`
-   `_sidebar.scss`
-   `_forms.scss`
-   `_navigation.scss`

`Layout/` mappen kan også kaldes `partials/`, afhængigt af hvad du foretrækker.

#### Components mappen

Til mindre komponenter er der `components/` mappen. Mens `layout/` er _makro_ (der definerer den globale wireframe), så fokuserer `components/` mere på widgets. Den indeholder alle slags specifikke moduler såsom en slider, en loader, et widget og basalt set alt derimellem. Der er ofte en masse filer i `components/`, da hele siden/applikationen stort set bør bestå hovedsageligt af bittesmå moduler.

-   `_media.scss`
-   `_carousel.scss`
-   `_thumbnails.scss`

`Components/` mappen kan også kaldes `modules/`, afhængigt af hvad du foretrækker.

#### Pages mappen

Hvis du har side-specifikke styles, så er det bedre at have dem i en `pages/` mappe, i en fil der er navngivet efter siden. For eksempel, så er det ikke unormalt at have meget specifikke styles for forsiden og derfor vil der være et behov for en `_home.scss` fil i `pages/`.

-   `_home.scss`
-   `_contact.scss`

Afhængigt af din implementeringsproces, så kan disse filer også blive kaldt enkeltvis, for at undgå at de bliver merged med andre i det samlede stylesheet. Det er helt op til dig.

#### Themes mappen

Ved store sider og applikationer, så er det ikke unormalt at have forskellige temaer. Der er absolut forskellige måder at håndtere temaer, men personligt foretrækker jeg at have dem alle samlet i en `themes/` mappe.

-   `_theme.scss`
-   `_admin.scss`

Denne er meget projekt-specifik, og er ofte ikke-eksisterende i mange projekter.

#### Utils mappen

`utils/` mappen samler alle de Sass værktøjer og hjælpere, der anvendes på tværs af projektet. Enhver global variabel, funktion, mixin og placeholder bør puttes herind.

Tommelfingerreglen for denne mappe er, at den ikke bør outputte en enkelt linje CSS når den kompileres for sig selv. De er intet andet end Sass hjælpere.

-   `_variables.scss`
-   `_mixins.scss`
-   `_functions.scss`
-   `_placeholders.scss` (oftest navngivet `_helpers.scss`)

`Utils/` mappen kan også kaldes `helpers/`, `sass-helpers/` eller `sass-utils/`, afhængigt af hvad du foretrækker.

#### Vendors mappen

Og sidst, men ikke mindst, så vil de fleste projekter have en `vendors/` mappe der indeholder alle CSS filerne fra eksterne biblioteker og frameworks - Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered, og så videre. At putte dem til side i den samme mappe er en god måde at sige “Hey, det her er ikke fra mig, ikke min kode, ikke mit ansvar”.

-   `_normalize.scss`
-   `_bootstrap.scss`
-   `_jquery-ui.scss`
-   `_select2.scss`

Hvis du er nødt til at overskrive en sektion fra en udbyder, anbefaler jeg at du har en ottende mappe kaldet `vendors-extensions/`, hvori du kan have filer der er navngivet præcist efter de udbydere du overskriver.

For eksempel, `vendors-extensions/_bootstrap.scss` er en fil der indeholder alle de CSS regler, der har til hensigt at redeklarere noget af Bootstraps originale CSS. Det er for at undgå at redigere i selve udbyderfilerne, hvilket generelt ikke er en god idé.

#### Main filen

Main filen (oftest navngivet `main.scss`) bør være den eneste Sass fil i hele kodebasen, der ikke starter med et underscore. Denne fil bør ikke indeholde andet end `@import` og kommentarer.

Filer bør blive importeret i forhold til den mappe de lever i, én efter én, i følgende rækkefølge:

1.  `vendors/`
2.  `utils/`
3.  `base/`
4.  `layout/`
5.  `components/`
6.  `pages/`
7.  `themes/`

For at bevare læsbarheden, bør main filen respektere følgende retningslinjer:

-   en fil per `@import`;
-   en `@import` per linje;
-   ingen ny linje mellem to imports fra samme mappe;
-   en ny linje efter den sidste import fra en mappe;
-   filtyper og ledende underscores udeladt.

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

Der er en anden måde at importerer partials, som jeg også anser som værende i orden. På den lyse side, så gør det filen mere læsbar. På den anden side, så gør dét det mere smertefuldt at opdatere. Under alle omstændigheder, så vil jeg lade dig om at beslutte hvad der er bedst, da det ikke betyder særlig meget. For denne måde, bør `main` filen respektere følgende guidelines:

-   en `@import` per mappe;
-   et linjeskift efter `@import`;
-   en fil på sin egen linje;
-   en ny linje efter den sidste import fra en mappe;
-   filtyper og ledende underscores udeladt.

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

For ikke at skulle importere hver fil manuelt, så findes der en udvidelse til Ruby Sass kaldet [sass-globbing](https://github.com/chriseppstein/sass-globbing), der gør det muligt at anvende glob-mønstre i Sass `@import` som eksempelvis `@import "components/*"`.

Med det sagt, så vil jeg ikke anbefale det fordi den importerer filerne i alfabetisk rækkefølge, hvilket typisk ikke er hvad du ønsker, især når du arbejder med et sprog der er afhængigt af en særlig kilde-rækkefølge.

### Shame filen

Der findes et interessant koncept, der allerede er blevet gjort populært af [Harry Roberts](https://csswizardry.com), [Dave Rupert](https://daverupert.com) og [Chris Coyier](https://css-tricks.com), hvilket involverer at alle CSS-deklarationer, hacks og ting vi ikke er stolte af, bliver smidt i en _shame fil_. Denne fil, med den dramatiske titel `_shame.scss`, bliver så importeret efter alle andre filer, til sidst i stylesheetet.

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

**Videre læsning:**

-   [shame.css](https://csswizardry.com/2013/04/shame-css/)
-   [shame.css - full .net interview](https://csswizardry.com/2013/04/shame-css-full-net-interview/)

## Responsivt Web Design og breakpoints

Jeg tror ikke at vi stadig behøver at introducere Responsivt Web Design, nu hvor det er overalt. Dog spørger du muligvis dig selv _hvorfor er der en sektion omkring RWD i en Sass styleguide?_ Rent faktisk er der en del ting som kan gøres, for at gøre arbejdet med breakpoints nemmere, så jeg tænkte at det ikke ville være en dårlig idé at liste dem her.

### Navngivelse af breakpoints

Jeg tænker at det er sikkert at sige, at media queries ikke bør være forbundet til specifikke enheder. For eksempel, så er det klart en dårlig idé at forsøge at ramme iPads og Blackberry telefoner alene. Media queries bør tage sig af en række af skærmstørrelser indtil designet bryder sammen, hvorefter den næste media query tager over.

Af de samme grunde, så bør breakpoints ikke blive navngivet efter enheder men efter noget mere generelt. Især fordi at nogle telefoner nu er større end tablets, nogle tablets større en nogle små skærmcomputere, og så videre…

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

Hertil vil enhver navngivningskonvention, der gør det krystalklart at et design ikke er tæt forbundet til en specifik enhedstype, gøre arbejdet godt så længe det giver en slags fornemmelse for størrelsesorden.

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

De forrige eksempler anvender indlejrede maps til at definere breakpoints, men dette afhænger faktisk af hvilken slags breakpoint-manager du anvender. Du kunne gå efter strenge fremfor indre maps for mere fleksibilitet (e.g. `'(min-width: 800px)'`).

**Videre læsning:**

-   [Naming Media Queries](https://css-tricks.com/naming-media-queries/)

### Breakpoint manager

Når du har navngivet dine breakpoints som du ønsker, så har du brug for en måde til rent faktisk at bruge dem i egentlige media queries. Der findes rigeligt med måder at gøre dette på, men jeg må sige at jeg er stor fan af et breakpoint map, der læses af en getter funktion. Denne tilgang er både enkel og effektiv.

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

Det er åbenlyst, at dette er en rimelig simpel breakpoint manager. Hvis du har behov for en mere eftergivende en, så anbefaler jeg at du ikke genopfinder hjulet og bruger noget som er bevist effektivt, såsom [Sass-MQ](https://github.com/sass-mq/sass-mq), [Breakpoint](http://breakpoint-sass.com/) eller [include-media](https://github.com/eduardoboucas/include-media).

**Videre læsning:**

-   [Managing Responsive Breakpoints in Sass](https://www.sitepoint.com/managing-responsive-breakpoints-sass/)
-   [Approaches to Media Queries in Sass](https://css-tricks.com/approaches-media-queries-sass/)

### Brug af Media Queries

For ikke så længe siden var der en ret ophedet debat omkring hvorhenne media queries bør blive skrevet: hører de til indeni selektorer (som Sass tillader det), eller skal de være helt afkoblet fra dem? Jeg bliver nødt til at sige, at jeg er en stærk forsvarer af _media-queries-indeni-selektorer_\-tilgangen, da jeg synes at det spiller godt sammen med idéen om komponenter.

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

Hvilket leder til det følgende CSS output:

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

Du har muligvis hørt at denne konvention resulterer i duplikerede media queries i CSS-outputtet. Det er helt klart sandt. Dog, så er der blevet foretaget tests og det sidste ord i denne diskussion er, at det ikke betyder noget så snart Gzip (eller lignende) har gjort sit arbejde:

> … vi undersøgte hvorvidt der var performance-påvirkninger ved kombinering vs spredning af Media Queries, og kom frem til konklusionen at forskellen, selvom den er grim, er minimal når den er værst, og grundlæggende ikke-eksisterende når den er bedst.  
> — [Sam Richards](https://twitter.com/snugug), vedrørende [Breakpoint](http://breakpoint-sass.com/)

Så hvis du virkelig er bekymret for duplikerede media queries, så kan du stadig bruge et værktøj til at forene dem, såsom [denne gem](https://github.com/aaronjensen/sass-media_query_combiner), dog føler jeg at jeg bliver nødt til at advare dig om de mulige bivirkninger af at flytte CSS kode rundt. Du ved allerede, at kildekodens rækkefølge er vigtig.

**Videre læsning:**

-   [Inline or Combined Media queries? Fight!](https://benfrain.com/inline-or-combined-media-queries-in-sass-fight/)
-   [Sass::MediaQueryCombiner](https://github.com/aaronjensen/sass-media_query_combiner)

## Variabler

Variabler er essencen af ethvert programmeringssprog. De tillader os at genbruge værdier uden at være nødsaget til at kopiere dem igen og igen. Vigtigst er dog at de gør opdateringen af en værdi meget nem. Slut med søg og erstat, eller manuel gennemgang.

Dog er CSS intet andet end en kæmpe kurv, der indeholder alle vores æg. Modsat mange sprog, så er der ikke nogen egentlige scopes i CSS. På grund af det er vi nødt til at holde særligt øje, når vi tilføjer variabler med risiko for at opleve konflikter.

Mit råd vil være, kun at oprette variabler når det giver mening. Lad være med at initialisere nye variabler bare fordi du kan, da det ikke vil hjælpe. En ny variabel bør kun blive skabt når alle følgende kriterier er mødt:

-   værdien bliver gentaget mindst to gange;
-   værdien vil sandsynligvis blive opdateret mere end én gang;
-   alle tilfælde af værdien er forbundet til variablen (f. eks. ikke ved et tilfælde);

Basalt set, er der ikke nogen grund til at deklarere en variabel der aldrig vil blive opdateret eller kun anvendes et enkelt sted.

### Scoping

Variabel-scoping i Sass har ændret sig med årene. Indtil for nylig har variabel-deklarationer inden for regelsæt og andre scopes været lokale, som udgangspunkt. Dog, når der allerede var en global variabel med det samme navn, så ændrede den lokale anvisning den globale variabel. Siden version 3.4, har Sass tacklet konceptet af scopes korrekt, og skaber en ny lokal variabel i stedet.

Dokumentationen taler om _overskygning af globale variabler_. Når en variabel, der allerede eksisterer i det globale scope, deklareres i et indre scope (selektor, funktion, mixin…), så siger man at den lokale variable _overskygger_ den globale. Basalt set, så overskriver den kun for det lokale scope.

Følgende kodestykke forklarer konceptet bag _overskygning af variabler_.

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

### `!default` flaget

Når du bygger et bibliotek, et framework, et gittersystem, eller ethvert andet stykke Sass der er tiltænkt at blive distribueret og anvendt af eksterne udviklere, bør alle konfigurations-variabler være defineret med `!default` flaget, så de kan blive overskrevet.

```
$baseline: 1em !default;
```

```
$baseline: 1em !default
```

Takket være dette, så kan en udvikler definere hans egen `$baseline` variabel _før_ han importerer dit bibliotek, uden at se hans værdi blive redefineret.

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

### `!global` flaget

`!global` flaget bør kun anvendes når en global variabel fra et lokalt scope overskrives. Når en variabel på root-niveauet defineres, bør `!global` flaget udelades.

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

### Flere variabler eller maps

Der er fordele ved at bruge maps frem for flere, særskilte variabler. Den primære er evnen til at iterere over et map, hvilket ikke er muligt med enkeltstående variabler.

En anden fordel ved at bruge et map er evnen til at skabe en lille getter-funktion der giver en lettere tilgængelig API. For eksempel, overvej følgende Sass kode:

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

`@extend` direktivet er en af de funktionaliteter der har gjort Sass så populært for et par år siden. Som en påmindelse, så er det muligt at fortælle Sass at det skal style element A præcis som hvis det også matchede selektor B. Det er derfor unnødvendigt at sige, at det kan ende med at blive en ret værdifuld allieret når der skal skrives modulært CSS.

Når der er sagt, så føler jeg, at jeg bør advare dig imod denne funktionalitet. Selvom den er smart, så er `@extend` stadig et ret udfordrende koncept, der kan gøre mere skade end gavn, især hvis anvendt forkert. Sagen er den, at når en selektor udvides, så har du lidt til ingen måde at at svare på disse spørgsmål uden at have dyb kendskab til hele kodebasen:

-   hvor vil min nuværende selektor blive tilføjet?
-   er der sandsynlighed for at jeg skaber uønskede bivirkninger?
-   hvor stor er den genererede CSS, der skabes af denne enkelte extend?

Ud fra hvad du ved, så kunne resultatet variere fra at gøre ingenting til at forårsage katastrofale bivirkninger. Derfor er mit første råd helt at undgå `@extend`\-direktivet. Det lyder måske brutalt, men når alt kommer til alt, så kan det redde dig fra et par hovedpiner og problemer.

Med det sagt, så kender du ordsproget:

> Aldrig sig aldrig.  
> — Tilsyneladende, [ikke Beyonce](https://github.com/KittyGiraudel/sass-guidelines/issues/31#issuecomment-69112419).

Der er scenarier, hvor at udvide selektorer kan være hjælpsomt og tiden værd. Hav dog altid disse regler for øje, så du ikke kommer i problemer:

-   Brug extend inden i et modul, ikke på tværs af forskellige moduler.
-   Brug extend udelukkende på placeholdere, ikke på egentlige selektorer.
-   Vær sikker på at placeholderen, du udvider, er så lidt til stede som muligt i stylesheetet.

Hvis du skal til at anvende extend, så lad mig minde dig om at den ikke fungerer godt sammen med `@media` blokke. Som du muligvis ved, så er Sass ikke i stand til at udvide en ydre selektor inden i en media query. Når du gør det, så bryder compileren simpelthen ned, og fortæller dig at du ikke kan gøre sådan. Ikke så fedt. Især da media queries nu næsten er alt hvad vi laver.

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

> Du bør ikke @extend’e en ydre selektor indefra @media.  
> Du bør kun @extend’e selektorer inden for det samme direktiv.

Ofte siges det, at `@extend` hjælper med filstørrelsen, siden den kombinerer selektorer fremfor at duplikere egenskaber. Det er sandt, dog er forskellen minimal når først [Gzip](https://en.wikipedia.org/wiki/Gzip) er færdig med sin kompression.

Når det er sagt, så hvis du ikke kan bruge Gzip (eller noget lignende), så kan det at skifte til en `@extend` tilgang muligvis ikke være så slem når du ved hvad du laver.

For at opsummere, så vil jeg **anbefale imod brugen af `@extend` direktivet**, medmindre under særlige omstændigheder, men jeg vil ikke gå så langt som at forbyde det.

**Videre læsning:**

-   [What Nobody Told you About Sass Extend](https://www.sitepoint.com/sass-extend-nobody-told-you/)
-   [Why You Should Avoid Extend](https://www.sitepoint.com/avoid-sass-extend/)
-   [Don’t Over Extend Yourself](https://pressupinc.com/blog/2014/11/dont-overextend-yourself-in-sass/)
-   [When to Use Extend; When to Use a Mixin](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)

## Mixins

Mixins er en af de mest anvendte funktionaliteter fra hele Sass sproget. De er nøglen til genbrugelighed og DRY komponenter. Og af en god grund: mixins tillader forfattere at definere styles der kan genbruges igennem stylesheetet uden at skulle tøve til ikke-semantiske klasser såsom `.float-left`.

De kan indeholde hele CSS-regler og faktisk alt hvad der er tilladt overalt i et Sass dokument. De kan endda tage argumenter, præcis som funktioner. Det er unnødvendigt at sige, at mulighederne er uendelige.

Men jeg føler, at jeg må advare dig imod at misbruge magten ved mixins. Igen, _simplicitet_ er nøgleordet her. Det kan være fristende at bygge ekstremt kraftulde mixins med massive mængder logik. Dette er at overkomplicere tingene, og de fleste udviklere lider af det. Lad være med at overtænke din kode, og hold den først og fremmest simpel. Hvis en mixin ender med at være mere end 20 linjer eller deromkring, så bør den enten blive splittet op i mindre stykker eller blive fuldstændig revideret.

### Det grundlæggende

Med det på plads, så er mixins ekstremt brugbare og du bør bruge et par stykker. Tommelfingerreglen er, at hvis det hænder for dig at du opdager en gruppe CSS egenskaber, der altid opstår som værende sammen af en grund (og ikke af tilfældighed), så kan du putte dem i en mixin i stedet. [Mikro-clearfix hacket fra Nicolas Gallagher](http://nicolasgallagher.com/micro-clearfix-hack/) fortjener at blive puttet i en (argumentløs) mixin, for eksempel.

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

Et andet validt eksempel ville være en mixin til at definere størrelsen på et element, der definerer både `width` og `height` på samme tid. Ikke alene vil det gøre koden meget lettere at skrive, men også nemmere at læse.

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

**Videre læsning:**

-   [Sass Mixins to Kickstart your Project](https://www.sitepoint.com/sass-mixins-kickstart-project/)
-   [A Sass Mixin for CSS Triangles](https://www.sitepoint.com/sass-mixin-css-triangles/)
-   [Building a Linear-Gradient Mixin](https://www.sitepoint.com/building-linear-gradient-mixin-sass/)

### Argumentliste

Når du står overfor et ukendt antal af argumenter i en mixin, så brug altid en `arglist` fremfor en liste. Tænk på `arglist` som den 8. skjulte, udokumenterede datatype fra Sass der anvendes implicit når et arbitrært antal af argumenter bliver videregivet til en mixin eller en funktion, hvis signatur indeholder `...`.

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

Når du bygger en mixin, der accepterer en håndfuld argumenter (3 eller flere), så tænk to gange før du forener dem som en liste eller et map, i den tro at det vil være nemmere end at videregive dem alle en for en.

Sass er faktisk ret smart med mixins og funktions-deklarationer, så smart at du faktisk kan give den en liste eller et map som en arglist til en funktion/mixin, således at det bliver parset som en serie af argumenter.

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

**Videre læsning:**

-   [Sass Multiple Arguments, Lists or Arglist](https://www.sitepoint.com/sass-multiple-arguments-lists-or-arglist/)

### Mixins og vendor-præfikser

Det er fristende at definere skræddersyede mixins til at håndtere udbyder-præfikser for ikke-understøttede eller delvist understøttede CSS egenskaber. Men det ønsker vi ikke at gøre. Først og fremmest, hvis du kan bruge [Autoprefixer](https://github.com/postcss/autoprefixer), så brug Autoprefixer. Det vil fjerne Sass kode fra dit projekt, det vil altid være up-to-date og vil højest sandsynlig gøre et bedre arbejde med at præfikse ting end dig.

Desværre er Autoprefixer ikke altid en mulighed. Hvis du bruger enten [Bourbon](https://bourbon.io/) eller [Compass](http://compass-style.org/), så ved du sikkert at de begge giver dig en samling af mixins der håndterer præfikser for dig. Brug disse.

Hvis du ikke kan bruge Autoprefixer og hverken kan bruge Bourbon eller Compass, så da, og kun da, kan du have dine egne mixins til at præfikse CSS egenskaber. Men. Lad venligst være med at bygge en mixin per enhed, der manuelt udskriver hver udbyder.

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

Gør det på den smarte måde.

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

Derfra vil brugen af denne mixin være meget ligetil:

```
.foo {
  @include prefix(transform, rotate(90deg), ('webkit', 'ms'));
}
```

```
.foo
  +prefix(transform, rotate(90deg), ('webkit', 'ms'))
```

Hav venligst for øje, at dette er en ringe løsning. For eksempel kan den ikke håndtere komplekse polyfills som dem der kræves til Flexbox. I den situation vil Autoprefixer være et langt bedre valg.

**Videre læsning:**

-   [Autoprefixer](https://github.com/postcss/autoprefixer)
-   [Building a Linear-Gradient Mixin](https://www.sitepoint.com/building-linear-gradient-mixin-sass/)

## Betingede udsagn

Du kender sikkert allerede til at Sass tilbyder betingede udsagn via `@if` og `@else` direktiverne. Medmindre du har rimelig kompleks logik i din kode, så er der ikke behov for betingede udsagn i dine hverdags-stylesheets. Faktisk, så eksisterer de hovedsageligt for biblioteker og frameworks.

Under alle omstændigheder, hvis du nogensinde finder behovet for dem, så respektér venligst følgende guidelines:

-   Ingen paranteser medmindre de er nødvendige;
-   Hav altid en ny, tom linje før `@if`;
-   Hav altid et linjeskift efter den åbnende klamme (`{`);
-   `@else` udsagn skal være på den samme linje som den forrige, lukkende klamme (`}`).
-   Hav altid en ny, tom linje efter den sidste, lukkende klamme (`}`), medmindre den næste linje er en lukkende klamme (`}`).

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

Når du tester en falsk værdi, skal du altid bruge `not` keywordet i stedet for at teste det imod `false` eller `null`.

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

Læg altid variabel-delen på den venstre side af et udsagn, og det (u)forventede resultat på den højre side. Omvendte betingede udsagn er ofte sværere at læse, især for uerfarne udviklere.

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

Når du anvender betingede udsagn inden for en funktion, for at returnere et forskelligt resultat baseret på nogle betingelser, så vær altid sikker på at funktionen stadig har et `@return` udsagn uden for enhver betinget blok.

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

## Løkker

Fordi Sass giver os komplekse datastrukturer såsom [lister](#lister) og [maps](#maps), så er det ikke nogen overraskelse, at det også giver forfattere en måde at iterere over disse enheder.

Dog indebærer tilstedeværelsen af løkker ofte en moderat, kompleks logik, der sandsynligvis ikke hører til Sass. Før en løkke anvendes bør man sikre sig at den giver mening, og faktisk løser et problem.

### Each

`@each` løkken er klart en af de mest anvendte af de tre løkker Sass tilbyder. Den giver os en ren API til at iterere over en liste eller et map.

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

Når der itereres over et map, så anvend altid `$key` og `$value` som variabelnavne for at fastholde konsistens.

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

Sikr dig også, at du respekterer disse guidelines for at bevare læsbarhed:

-   Hav altid en tom, ny linje før `@each`;
-   Hav altid en tom, ny linje efter den afsluttende klamme (`}`), medmindre den næste linje er en afsluttende klamme (`}`).

### For

`@for` løkken er brugbar når den kombineres med CSS’ `:nth-*` pseudo-klasser. Bortset fra disse scenarier, så foretræk en `@each` løkke hvis du _er nødt til_ at iterere over noget.

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

Anvend altid `$i` som variabelnavn, for at holde dig til den almene konvention, og medmindre du har en virkelig god grund til det, så brug aldrig `to` nøgleordet: brug altid `through`. Mange udviklere ved slet ikke at Sass tilbyder denne variation; at anvende den kan lede til forvirring.

Vær også sikker på, at respektere disse guidelines for at bevare læsbarhed:

-   Hav altid en tom, ny linje før `@for`;
-   Hav altid en tom, ny linje efter den afsluttende klamme (`}`), medmindre den næste linje er en afsluttende klamme (`}`).

### While

`@while` løkken har absolut ingen brugssituation i et virkeligt Sass-projekt, især da der ikke er nogen måde at bryde løkken indefra. **Brug den ikke**.

## Advarsler og Fejl

Hvis der er en funktionalitet, der ofte bliver overset af Sass udviklere, så er det evnen til dynamisk at outputte advarsler og fejl. Rent faktisk, så har Sass tre særlige direktiver til udprintning af indhold i gængse output-systemer (CLI, kompileringsapps…):

-   `@debug`;
-   `@warn`;
-   `@error`.

Lad os se bort fra `@debug`, da den åbenlyst er tænkt til debugging af SassScript, hvilket ikke er vores pointe her. Tilbage står vi med `@warn` og `@error`, der er bemærkelsesværdigt identiske bortset fra at den ene stopper compileren, mens den anden ikke gør. Jeg lader dig gætte hvilken der gør hvad.

Der er masser af plads i et Sass projekt til advarsler og fejl. Basalt set forventer enhver mixin eller funktion, at en specifik type eller argument kunne give en fejl hvis noget går galt, eller vise en advarsel når man udfører en antagelse.

**Videre læsning:**

-   [An Introduction To Error Handling](https://webdesign.tutsplus.com/tutorials/an-introduction-to-error-handling-in-sass--cms-19996)
-   [Building a Logger Mixin](https://webdesign.tutsplus.com/tutorials/building-a-logger-mixin-in-sass--cms-22070)
-   [SassyLogger](https://github.com/KittyGiraudel/SassyLogger)

### Advarsler

Tag, for eksempel, denne funktion fra [Sass-MQ](https://github.com/sass-mq/sass-mq), der forsøger at konvertere en `px` til `em`:

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

Hvis værdien viser sig at være enhedsløs, så vil funktionen antage at værdien er ment som at skulle være udtrykt i pixels. Herved kan en antagelse være risikabel for brugeren og bør blive advaret om, at softwaren gjorde noget der kunne opfattes som uventet.

### Fejl

Fejl, modsat advarsler, forhindrer compileren i at fortsætte. De stopper basalt set kompilering og viser en besked i både output-strømmen og i stack-tracen, hvilket er brugbart til debugging. På grund af dette, bør fejl gives når der ikke er nogen anden måde for programmet at fortsætte. Hvis muligt bør du prøve at arbejde rundt om problemet og vise en advarsel i stedet.

For eksempel, lad os sige at du er ved at bygge en getter funktion, der tilgår værdier fra et specifikt map. Du kunne give en fejl, hvis den anmodede nøgle ikke eksisterer i map’et.

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

## Værktøjer

Dét der er rart ved en så populær CSS preprocessor som Sass er, at den kommer med et helt økosystem af frameworks, plugins, biblioteker og værktøjer. Efter 8 års eksistens er vi ved at komme tættere og tættere på et punkt hvor [alt der kan skrives i Sass er blevet skrevet i Sass](https://kittygiraudel.com/2014/10/27/rethinking-atwoods-law/).

Mit råd er dog, at sænke antallet af dependencies til det absolut nødvendige. At håndtere dependencies er en form for helvede du ikke ønsker at være en del af. Plus, der er begrænset til intet behov for eksterne dependencies når det kommer til Sass.

### Compass

[Compass](http://compass-style.org/) er det primære Sass framework derude. Udviklet af [Chris Eppstein](https://twitter.com/chriseppstein), en af hoved-designerne bag Sass, og jeg ser det ikke tabe popularitet dramatisk det næste stykke tid, hvis du spørger mig.

Når det er sagt, så bruger jeg ikke Compass mere. Hovedårsagen er, at det gør Sass meget langsommere. Ruby Sass er ret langsomt i sig selv, så at tilføje mere Ruby og mere Sass ovenpå hjælper ikke rigtigt.

Sagen er, at vi bruger meget lidt fra hele frameworket. Compass er enormt. Mixins til kryds-browser kompatibilitet er bare toppen af isbjerget. Matematik-funktioner, billede-hjælpere, spriting… Der er så meget der kan klares med dette fantastiske stykke software.

Desværre er det hele sukker, og der er ikke nogen overvældende funktioner inde i pakken. En undtagelse kan gøres med sprite-byggeren, som er _virkelig god_, men [Grunticon](https://github.com/filamentgroup/grunticon) og [Grumpicon](http://grumpicon.com/) klarer også jobbet, og har fordelen af at kunne tages ind og ud af build-processen.

Under alle omstændigheder, så afviser jeg ikke brugen af Compass selvom jeg heller ikke vil anbefale det, især siden det ikke er kompatibel med LibSass (selv hvis der skulle blive gjort indsats i den retning). Hvis du føler dig mere tilpas ved at bruge det, fair nok, men jeg tror ikke du får meget ud af det når alt kommer til alt.

Ruby Sass er p.t. ved at gennemgå nogle ekstraordinære optimering, som er specifikt målrettet mod logik-tunge styles med mange funktioner og mixins. De skulle forbedre effektiviteten dramatisk til et punkt hvor Compass og andre frameworks muligvis ikke længere vil sløve Sass.

**Videre læsning:**

-   [Compass](http://compass-style.org/)
-   [Sass Frameworks: Compass or Bourbon](https://www.sitepoint.com/compass-or-bourbon-sass-frameworks/)
-   [Why I don’t use Compass anymore](https://www.sitepoint.com/dont-use-compass-anymore/)
-   [Is Compass to Sass with jQuery is to JavaScript?](https://www.sitepoint.com/compass-sass-jquery-javascript/)

### Gitter-systemer

At undlade at anvende et gitter-system er ikke længere en mulighed, nu hvor Responsivt Web Design er overalt. For at få designs til at se konsistente og solide ud på tværs af alle skærmstørrelser, anvender vi en eller anden form for gitter til at layoute elementer. For at undgå at skulle kode dette gitter igen og igen, så har nogle geniale folk gjort deres genbrugelige.

Lad mig gøre det helt klart: Jeg er ikke den store fan af gitter-systemer. Selvfølgelig ser jeg et potentiale, men mest ser jeg dem som at skyde gråspurve med kanoner, og anvendes for det meste til at tegne røde kolonner på en hvid baggrund i nørdede designeres præsentationer. Hvornår tænkte du sidst _gudskelov-at-jeg-har-det-her-værktøj-til-at-bygge-2-5-3-1-π-gitre_? Aldrig, det er rigtigt. Fordi i de fleste tilfælde, så ønsker du bare det almindelige 12-kolonne gitter-system og ikke noget fancy.

Hvis du anvender et CSS framework til dit projekt, såsom [Bootstrap](https://getbootstrap.com/) eller [Foundation](https://get.foundation/), så er der stor sandsynlighed for at det allerede inkluderer et gitter-system, som jeg i det tilfælde vil anbefale at du bruger så du undgår at skulle håndtere endnu en dependency.

Hvis du ikke er tilknyttet til et specifikt gitter-system, så vil det nok glæde dig at vide at der findes to top-kvalitets gitter-motorer baseret på Sass derude: [Susy](https://www.oddbird.net/susy/) og [Singularity](https://github.com/at-import/Singularity). Begge gør meget mere end du nogensinde vil få brug for, så du kan vælge den af dem du foretrækker og være sikker på at alle dine særtilfælde —selv de mest specielle af slagsen— vil være dækket. Hvis du spørger mig, så har Susy en anelse bedre community, men det er min holdning.

Alternativt kan du gå over til noget mere nede på jorden, såsom [csswizardry-grids](https://github.com/csswizardry/csswizardry-grids). Når alt kommer til alt, vil dit valg ikke have den store indvirkning på din kodestil, så det er faktisk mest op til dig.

**Videre læsning:**

-   [Susy](https://www.oddbird.net/susy/)
-   [Build Web Layouts Easily with Susy](https://css-tricks.com/build-web-layouts-easily-susy/)
-   [A Complete Tutorial to Susy 2](https://www.zell-weekeat.com/susy2-tutorial/)
-   [Sass Grids: From Neat to Susy](https://www.sitepoint.com/sass-grids-neat-susy/)
-   [Bootstrap’s Grid System vs Susy: a Comparison](https://www.sitepoint.com/bootstraps-grid-system-vs-susy-comparison/)
-   [How to Use Susy: Superpowered Sass Grids](https://webdesign.tutsplus.com/tutorials/how-to-use-susy-superpowered-sass-grids--cms-22744)
-   [A Creative Grid System with Sass and calc()](https://www.sitepoint.com/creative-grid-system-sass-calc/)

### SCSS-lint

Kode-linting er meget vigtigt. Ved at følge retningslinjer fra en styleguide, vil mængden af kodekvalitetsfejl normalt blive reduceret, men ingen er perfekt, og der er altid ting der kan forbedres. Derfor kan man sige, at dét linte kode er lige så vigtigt som at kommentere den.

[SCSS-lint](https://github.com/causes/scss-lint) er et værktøj, der hjælper dig med at holde dine SCSS filer rene og læsbare. Det er fuldt tilpasseligt og nemt at integrere med dine egne værktøjer.

Heldigvis er anbefalinger for SCSS-lint meget lig de der beskrives i dette dokument. For at konfigurere SCSS-lint i forhold til Sass Guidelines, så anbefaler jeg følgende setup:

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

Hvis du vil koble SCSS lint ind i din Grunt build proces, så bliver du nok glad for at vide at der er et Grunt plugin til netop dét kaldet [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint).

Dertil, så hvis du er på jagt efter et smart program der virker både med SCSS-lint og lignende, så arbejder folkene hos [Thoughtbot](https://thoughtbot.com/) (Bourbon, Neat…) på [Hound](https://houndci.com/).

**Videre læsning:**

-   [SCSS-lint](https://github.com/causes/scss-lint)
-   [Clean Up your Sass with SCSS-lint](https://blog.martinhujer.cz/clean-up-your-sass-with-scss-lint/)
-   [Improving Sass code quality on theguardian.com](https://www.theguardian.com/info/developer-blog/2014/may/13/improving-sass-code-quality-on-theguardiancom)
-   [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint)
-   [An Auto-Enforceable SCSS Styleguide](https://davidtheclark.com/scss-lint-styleguide/)

## Too Long; Didn’t read

For at opsummere, så ønsker vi:

-   Indentering á to (2) mellemrum, ingen tabs;
-   80-karakter brede linjer;
-   Ordentligt skrevet CSS, i flere linjer;
-   Meningsfuld brug af whitespace;
-   Citerede strenge (enkelt-citationstegn) & URL’er;
-   Intet efterstillet 0, obligatorisk førende 0;
-   Udregninger indpakket i paranteser;
-   Ingen magiske tal;
-   Farver udtrykt i nøgleord > HSL > RGB > hexadecimal;
-   Lister separeret af kommaer;
-   Ingen efterstillede kommaer i lister (fordi de er inlinede)
-   Efterstillede kommaer i maps;
-   Ingen selektor-indlejring undtagen pseudo-klasser og pseudo-elementer;
-   Bindestreg-afgrænset navngivning;
-   Omfattende kommentarer;
-   SassDoc-drevne API kommentarer;
-   Begrænset brug af `@extend`;
-   Simple mixins;
-   Så få løkker som muligt, ingen `@while`;
-   Begrænset antal af dependencies;
-   Meningsfuld anvendelse af advarsler og fejl;
