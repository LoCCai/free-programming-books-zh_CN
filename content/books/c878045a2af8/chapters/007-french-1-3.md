## Sur l’auteur

Je m’appelle [Kitty Giraudel](https://kittygiraudel.com), je suis un·e développeur·se front-end français·e basé·e à Berlin (Allemagne) depuis 2015, actuellement en poste à [Cofenster](https://www.cofenster.com).

Je travaille avec Sass depuis maintenant plusieurs années et suis l’auteur·e de nombreux projets tournant autour de ce langage, tels que [SassDoc](http://sassdoc.com), SitePoint Sass Reference et [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/). Si vous désirez en savoir plus sur mes contributions envers la communauté Sass, jetez un oeil à [cette liste](https://github.com/KittyGiraudel/awesome-sass).

Je suis également l’auteur·e d’un livre français sur CSS intitulé [CSS3 Pratique du Design Web](https://www.eyrolles.com/Informatique/Livre/css3-9782212678963/) (publié aux éditions _Eyrolles_), ainsi qu’un livre sur Sass (en Anglais) intitulé [Jump Start Sass](https://learnable.com/books/jump-start-sass) (publié aux éditions _Learnable_).

[Suivez-moi sur Twitter](https://twitter.com/KittyGiraudel)

## Contributions

Sass Guidelines est un projet ouvert que je maintiens sur mon temps libre. S’assurer qu’il soit toujours à jour, documenté et pertinent représente beaucoup de travail. Heureusement, je reçois l’aide de nombreux et généreux contributeurs, notamment pour la tenue à jour des [différentes traductions](#options-panel). Pensez à les remercier !

Si vous souhaitez apporter votre contribution, vous pouvez tweeter et faire passer l’info, et le cas échéant corriger les erreurs typographiques en ouvrant une pull-request sur le [dépôt GitHub](https://github.com/KittyGiraudel/sass-guidelines).

Dernière chose avant de commencer : si vous avez aimé ce document, ou s’il est utile à votre travail ou à celui de votre équipe, n’hésitez pas à le soutenir pour que je puisse continuer de le faire évoluer !

[Soutenir Sass Guidelines](https://gum.co/sass-guidelines) [Faites passer le message](https://twitter.com/share?text=Sass+Guidelines%2C+An+opinionated+styleguide+for+writing+sane%2C+maintainable+and+scalable+Sass+by+%40KittyGiraudel+%E2%80%93&url=https://sass-guidelin.es)

## À propos de Sass

Voici comment [Sass](https://sass-lang.com) est décrit dans la [documentation](https://sass-lang.com/documentation/file.SASS_REFERENCE.html) :

> Sass est une extension de CSS qui ajoute puissance et élégance au langage de base.

L’objectif ultime de Sass est de combler les lacunes de CSS. Nous le savons, CSS n’est pas le meilleur langage du monde \[citation needed\]. Même s’il est très simple d’apprentissage, il peut rapidement devenir confus, en particulier dans les projets à grande échelle.

Sass intervient ici comme un méta-langage, pour améliorer la syntaxe CSS afin d’offrir des fonctionnalités supplémentaires et des outils pratiques. Dans le même temps, Sass entend rester proche du langage CSS.

Il ne s’agit pas de transformer CSS en langage de programmation. L’intention de Sass est simplement d’intervenir là où CSS montre ses limites. C’est pour cela qu’il est si simple de se lancer dans Sass : il ne fait qu’ajouter quelques fonctionnalités à CSS.

Ceci étant, il y a bien des manières d’utiliser ces fonctionnalités. Certaines sont bonnes, d’autres mauvaises, comme toujours. Les recommandations qui suivent ont pour objectif de vous donner une approche documentée et cohérente de l’écriture de code Sass.

### Ruby Sass ou LibSass

[Le premier commit de Sass](https://github.com/hcatlin/sass/commit/fa5048ba405619273e474a50400c7243fbff54fe) remonte à la fin 2006, il y a près de 10 ans. Inutile de dire qu’il a fait un long chemin depuis. À l’origine le projet a été développé en Ruby, mais d’autres variantes sont apparues ici et là. Celle qui a rencontré le plus de succès, [LibSass](https://webdesign.tutsplus.com/articles/getting-to-know-libsass--cms-23114) (écrite en C/C++) est désormais proche de la compatibilité totale avec la version Ruby originale.

En 2014, [les équipes de Ruby Sass et de LibSass ont décidé d’attendre que les deux versions soient synchronisées avant de continuer à avancer](https://github.com/sass/libsass/wiki/The-LibSass-Compatibility-Plan). Depuis lors, LibSass publie activement de nouvelles versions pour être toujours au niveau de son grand frère. Les quelques petites incohérences qui demeurent sont listées par mes soins dans le projet [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/). Si vous avez connaissance d’une incompatibilité entre les deux versions qui ne serait pas listée, n’hésitez pas à ouvrir un ticket.

Pour revenir au choix de votre compilateur, en fait tout dépend de votre projet. Si vous travaillez sur un projet Ruby on Rails, il est préférable d’utiliser Ruby Sass qui convient parfaitement dans ce cas. Il faut également garder à l’esprit que Ruby Sass sera toujours l’implémentation de référence et sera toujours en avance par rapport à LibSass. Si vous souhaitez [basculer de Ruby Sass à LibSass](https://www.sitepoint.com/switching-ruby-sass-libsass/), cet article est pour vous.

Pour des projets non-Ruby, LibSass est probablement une meilleure idée. Si vous utilisez Node.js par exemple, [node-sass](https://github.com/sass/node-sass) est tout indiqué.

### Sass ou SCSS

Il règne encore une certaine confusion autour du nom _Sass_, et pour une bonne raison : Sass désigne à la fois le préprocesseur et sa propre syntaxe. Pas très commode, n’est-ce pas ?

En fait, Sass désignait à l’origine une syntaxe dont la caractéristique était d’être basée sur l’indentation. Rapidement, les développeurs de Sass ont décidé de rapprocher Sass et CSS en proposant une syntaxe compatible avec CSS, appelée SCSS (pour _Sassy CSS_ qu’on peut traduire par _CSS à la Sass_ ou _CSS classieux_). Sa devise : si c’est valide en CSS, c’est du SCSS valide.

Depuis lors, Sass (le préprocesseur) propose [deux syntaxes](https://www.sitepoint.com/whats-difference-sass-scss/) différentes : Sass (pas tout en majuscules, [s’il vous plaît](http://sassnotsass.com)), qu’on appelle aussi _la syntaxe indentée_, et SCSS. Vous pouvez utiliser celle que vous voulez, les deux sont strictement équivalentes en termes de fonctionnalités. C’est donc une question d’esthétique personnelle.

La syntaxe de Sass repose sur l’indentation pour se débarrasser des accolades, des points-virgules et autres symboles de ponctuation, ce qui produit une syntaxe allégée et raccourcie. De son côté, SCSS est plus facile à apprendre puisqu’il repose sur la syntaxe CSS à laquelle il ne fait qu’ajouter quelques fonctionnalités.

Personnellement, je préfère SCSS parce qu’il est plus proche de CSS et plus accessible aux développeurs. C’est pourquoi SCSS est la syntaxe par défaut tout au long de ce document. Si vous préférez la syntaxe Sass indentée, vous pouvez choisir cette option dans le .

### Autres préprocesseurs

Sass est un préprocesseur parmi d’autres. Son concurrent le plus sérieux est [Less](http://lesscss.org/), un préprocesseur basé sur Node.js qui est devenu assez populaire grâce à [Bootstrap](https://getbootstrap.com/) qui l’utilise (jusqu’à la version 4). Il y a également [Stylus](https://stylus-lang.com/), un préprocesseur très permissif et flexible toutefois plus complexe à utiliser et à la communauté plus petite.

_Pourquoi choisir Sass plutôt qu’un autre préprocesseur ?_ Cette question peut toujours se poser aujourd’hui. Il n’y a pas si longtemps, l’argumentation aurait porté sur l’avantage de Sass dans les projets basés sur Ruby. Aujourd’hui que LibSass est synchronisé avec Ruby Sass, ce sont les performances de Sass qu’on pourrait mettre en avant.

Ce que j’aime avec Sass c’est son approche conservatrice de CSS. La conception de Sass est basée sur quelques principes forts : pour l’essentiel, elle découle de la conviction de ses concepteurs que (a) l’ajout de nouvelles fonctionnalités a un coût lié à leur complexité qui doit être justifié par leur utilité réelle et (b) on doit pouvoir comprendre facilement ce que fait un bloc de styles en regardant ce seul bloc. De plus, Sass est beaucoup plus attentif aux détails que les autres préprocesseurs. De ce que je peux constater, ses concepteurs sont extrêmement soucieux de supporter tous les cas d’usage de CSS même les plus _borderlines_, et d’assurer la cohérence globale. En d’autres termes, Sass est un logiciel créé pour résoudre de vrais problèmes, qui aide les développeurs en ajoutant des fonctionnalités utiles à CSS lorsque celui-ci se révèle insatisfaisant.

À côté des préprocesseurs, nous devons aussi mentionner d’autres outils dont on a beaucoup parlé dernièrement tels que [PostCSS](https://github.com/postcss/postcss) et [cssnext](https://cssnext.github.io/).

PostCSS est souvent (et de manière incorrecte) baptisé “postprocesseur”. Cette supposition, au-delà du nom trompeur, vient de l’idée que PostCSS analyserait du code CSS déjà processé par un préprocesseur. Bien que cela puisse fonctionner ainsi, ce n’est pas un pré-requis, si bien que PostCSS est désormais rangé simplement dans la catégorie “processeur“.

On parle souvent de “postprocesseurs” dans la mesure où ils compilent de la syntaxe propriétaire ou non-standardisée en CSS actuel. Ceci étant dit, ils sont assez proches des préprocesseurs, à ceci près qu’ils ne font qu’ajouter la syntaxe future de CSS.

PostCSS permet d’accéder aux “tokens” des feuilles de styles (comme les sélecteurs, propriétés, valeurs), pour les manipuler en JavaScript et compiler le tout en CSS à nouveau. Par exemple, la librairie [Autoprefixer](https://github.com/postcss/autoprefixer) qui ajoute les préfixes constructeurs est bâtie sur PostCSS. Elle analyse toutes les règles pour voir si des préfixes sont nécessaires en faisant des requêtes auprès de l’outil de support [CanIUse](https://caniuse.com), puis ajoute les préfixes requis ou les supprime lorsqu’ils ne le sont plus (en fonction des options choisies).

C’est très puissant pour créer des outils qui fonctionnent avec n’importe quel préprocesseur (ou même vanilla CSS), mais PostCSS n’est pas spécialement facile à utiliser (pour l’instant). Il faut avoir quelques connaissances en JavaScript pour s’en servir et son API est parfois déroutante. Si Sass prodigue un ensemble de fonctionnalités qui facilitent l’écriture de CSS, PostCSS confère un accès direct à l’AST CSS (_Abstract Syntax Tree_) et JavaScript.

Pour résumer, Sass est assez simple à prendre en main et aide à résoudre la majorité des problèmes de maintenance de feuilles de styles de qualité. De son côté, PostCSS est plus difficile à appréhender (surtout sans connaissances en JavaScript) mais s’avère être extrêmement puissant. Rien ne vous empêche d’utiliser les deux. En fait, PostCSS offre même un _parser_ officiel juste pour ça.

Merci à [Cory Simmons](https://twitter.com/corysimmons) pour son aide et son expertise dans cette section.

## Introduction

### Pourquoi un guide de style

Un guide de style n’est pas simplement un document agréable à lire, qui décrit l’état idéal de votre code. C’est un document-clé dans la vie d’un projet, qui décrit la façon dont un code devrait être écrit et pourquoi. C’est peut-être beaucoup pour un projet modeste, mais c’est une aide inappréciable pour créer un code propre, extensible et maintenable.

Il va sans dire que plus il y a de développeurs impliqués dans un projet, plus les guides de style sont nécessaires. Et plus l’échelle du projet est développée, plus un guide de style est obligatoire.

[Harry Roberts](https://csswizardry.com) le dit très bien dans ses [CSS Guidelines](https://cssguidelin.es/#the-importance-of-a-styleguide):

> Adopter des lignes de conduite en matière de code (on ne parle pas là d’un guide de style visuel donc) est primordial pour les équipes qui :
> 
> -   conçoivent et maintiennent des produits sur une durée raisonnable ;
> -   sont constituées de développeurs de multiples horizons et aux capacités variées ;
> -   sont constituées de plusieurs développeurs travaillant sur un même projet à un moment donné ;
> -   accueillent régulièrement de nouveaux collaborateurs ;
> -   ont des bases de codes sur lesquelles des développeurs différents travaillent en alternance.

### Avertissement

Commençons par le commencement : **ceci n’est pas un guide de style CSS**. Ce document ne parlera pas des conventions de nommage des classes CSS, des patterns modulaires ou de la question des IDs dans le monde CSS. Ces recommandations ne traitent que de contenus spécifiques à Sass.

Par ailleurs, ce guide de style est personnel et par conséquent **très engagé**. Vous pouvez le voir comme un ensemble de méthodologies et de conseils que j’ai polis et donnés pendant des années. Il me donne aussi l’opportunité de faire des liens vers un bon nombre de ressources instructives, n’hésitez pas à vous reporter aux _lectures complémentaires_.

Bien sûr, ce n’est pas la seule façon de faire, et cela correspondra ou pas à votre projet. Vous pouvez choisir ce qui vous intéresse et l’adapter à vos propres besoins. Comme on dit, _ça dépend_.

### Principes fondamentaux

Au bout du compte, s’il est une chose que je souhaite que vous reteniez de ce guide c’est que **[Sass devrait toujours rester aussi simple que possible](https://www.sitepoint.com/keep-sass-simple/)**.

Mes petites expériences stupides avec Sass, comme [les opérateurs _bitwise_](https://github.com/KittyGiraudel/SassyBitwise), [les itérateurs et générateurs](https://github.com/KittyGiraudel/SassyIteratorsGenerators) ou encore [un parser JSON](https://github.com/KittyGiraudel/SassyJSON) ont montré tout ce qu’on peut faire avec ce préprocesseur.

Cependant, CSS est un langage simple. L’intention de Sass est d’écrire du CSS, par conséquent il ne devrait pas être plus compliqué que le bon vieux CSS. Le [principe KISS](https://fr.wikipedia.org/wiki/Principe_KISS) (Keep It Simple Stupid) est essentiel ici et il devrait même prendre le pas sur le [principe DRY](https://fr.wikipedia.org/wiki/Ne_vous_r%C3%A9p%C3%A9tez_pas) (Don’t Repeat Yourself) dans certaines circonstances.

Parfois, il vaut mieux se répéter un peu pour conserver un code maintenable plutôt que construire un système lourd et inutilement compliqué qui devient difficile à maintenir en raison de sa complexité.

Encore une citation de [Harry Roberts](https://csswizardry.com) : **le pragmatisme doit prendre le pas sur la perfection**. Il est possible qu’à certains moments vous soyez amené à aller contre les règles énoncées ici. Si ça fait sens, si ça vous paraît juste, faites-le. Le code est un moyen, pas une fin en soi.

### Étendre le guide de style

Une grande partie de ce guide de style est basée sur mes propres opinions. J’ai lu et écrit du code Sass depuis plusieurs années déjà, au point où j’ai adopté un grand nombre de principes quand il s’agit d’écrire du code CSS propre. Je comprends que tout ne convienne pas à tout le monde, c’est parfaitement normal.

C’est pourquoi je pense qu’un guide de style est fait pour être étendu. S’approprier Sass Guidelines peut vouloir dire avoir un document stipulant que le code s’en tient à ces conventions à l’exception de quelques règles personnelles ; suite à quoi ces règles seraient détaillées.

Un exemple d’extension de guide de style peut être trouvé dans le [dépôt SassDoc](https://github.com/SassDoc/sassdoc/blob/master/GUIDELINES.md) (traduit):

> Ceci est une extension de [Node Styleguide](https://github.com/felixge/node-style-guide) par Felix Geisendörfer. Toute chose stipulée dans ce document prévaut sur une indication contraire mentionnée dans Node Styleguide.

## Syntaxe & formatage

À mon avis, la première chose que devrait proposer un guide de style est de décrire la façon dont notre code doit être écrit, du point vue de son aspect.

Lorsque plusieurs développeurs sont impliqués dans l’écriture de CSS sur un même projet, il ne faut pas longtemps avant que l’un d’entre eux commence à faire les choses à sa façon. Les directives servent à éviter cette perte de cohérence, mais aussi à aider chacun à lire et à mettre à jour le code.

Globalement, voici ce que nous voulons (inspiré sans honte des [CSS Guidelines](https://cssguidelin.es/#syntax-and-formatting)) :

-   Une indentation à deux (2) espaces, pas de tabulation ;
-   Pas plus de 80 caractères par ligne ;
-   Du CSS écrit sur plusieurs lignes ;
-   Une utilisation efficace des lignes vides.

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
// Quant à Sass, sa syntaxe indentée impose ces standards de codification
// Il n’y a donc pas de "mauvaise" manière de procéder
.foo
  display: block
  overflow: hidden
  padding: 0 1em
```

### Chaînes de caractères

Ça peut paraître incroyable, mais les chaînes de caractères jouent un grand rôle dans les écosystèmes CSS et Sass. La plupart des valeurs CSS sont soit des longueurs soit des identifiants, il est donc crucial de se tenir à des règles lorsqu’on utilise ces chaînes dans Sass.

#### Encodage

Afin d’éviter tout problème potentiel lié à l’encodage des caractères, il est recommandé de forcer l’encodage [UTF-8](https://fr.wikipedia.org/wiki/UTF-8) dans le [fichier principal](#fichier-principal) en utilisant la directive `@charset`. Assurez-vous que ce soit le premier élément de la feuille de style et qu’il n’y ait aucun caractère de quelque nature en amont.

```
@charset 'utf-8';
```

```
@charset 'utf-8'
```

#### Guillemets

En CSS, les chaînes de caractères n’ont pas à être entourées de guillemets, pas même celles qui contiennent des espaces. Prenez les noms de `font-family` par exemple : peu importe qu’elles soient ou non entre guillemets.

C’est pourquoi dans Sass les chaînes de caractères n’ont pas non plus à être entourées de guillemets. Mieux, (et heureusement) une chaîne de caractères entre guillemets est strictement équivalente à sa jumelle sans guillemets (p.ex. `'abc'` est strictement égale à `abc`).

Ceci étant, les langages qui ne requièrent pas d’envelopper les chaînes de caractères entre guillemets sont une infime minorité, c’est la raison pour laquelle **les chaînes de caractères devraient toujours être entourées de guillemets simples** (`'`) dans Sass (pourquoi des guillemets simples ? parce qu’ils sont plus faciles à taper sur un clavier _qwerty_). À part la cohérence avec d’autres langages, dont JavaScript le cousin de CSS, il y a plusieurs raisons à ce choix :

-   les noms de couleurs sont traités comme des couleurs lorsqu’ils ne sont pas entre guillemets, ce qui peut conduire à de sérieux problèmes ;
-   la plupart des colorations syntaxiques fonctionnent mieux avec les guillemets ;
-   la lisibilité est améliorée ;
-   il n’y a pas de raison valable de ne pas utiliser de guillemets.

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

Selon les spécifications CSS, la déclaration `@charset` doit utiliser des guillemets doubles [pour être considérée valide](https://www.w3.org/TR/css3-syntax/#charset-rule). Cependant, Sass s’en assure en compilant vos feuilles de styles si bien que vous pouvez tout à fait utiliser des guillemets simples, même pour `@charset`.

#### Chaînes comme valeurs CSS

Certaines valeurs spécifiques de CSS (identifiants), telles que `initial` ou `sans-serif` ne doivent pas être entourées de guillemets. Si vous déclarez `font-family: 'sans-serif'` CSS ignorera votre déclaration car il attend un identifiant et non une chaîne de caractères. C’est pourquoi on ne met jamais de guillemets autour de ces valeurs.

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

Il convient de faire une distinction entre les chaînes de caractères qui sont des valeurs CSS (il s’agit d’identifiants CSS) comme dans l’exemple qui précède, et les chaînes de caractères correspondant à des types de données Sass (par exemple les clés des maps).

On ne met pas de guillemets pour les premières, mais il en faut pour ces dernières.

#### Chaînes contenant des guillemets

Si une chaîne de caractères contient un ou plusieurs guillemets simples, on peut éviter l’utilisation d’échappements répétés en enveloppant la chaîne à l’intérieur de guillemets doubles (`"`) .

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

Les URL doivent être écrites entre guillemets pour les mêmes raisons que ci-dessus :

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

### Nombres

Dans Sass, un nombre est une donnée qui peut avoir une unité ou pas et qui décrit une longueur, une durée, une fréquence, un angle, etc. Cela permet d’effectuer des calculs sur les mesures.

#### Zéros

Une valeur décimale inférieure à `1` doit être précédée d’un zéro. N’écrivez pas de zéros finaux après le point.

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

Dans Sublime Text ainsi que d’autres éditeurs permettant d’effectuer des remplacements à partir d’expressions régulières, il est très facile d’ajouter le zéro manquant avant le point. Remplacez simplement `\s+\.(\d+)` par `\ 0.$1`. N’oubliez pas l’espace précédant le `0` par contre.

#### Unités

S’agissant de longueurs, une valeur égale à `0` ne doit pas être suivie de son unité.

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

Attention, cette pratique doit être utilisée uniquement pour les longueurs. Les zéros sans unité ne sont pas autorisés pour les propriétés utilisant des durées, comme `transition-delay`. Théoriquement, si un zéro sans unité est utilisé comme durée, la déclaration est jugée invalide. Tous les navigateurs ne sont pas aussi stricts, mais certains le sont. Pour résumer : n’omettez l’unité que pour les longueurs.

L’erreur la plus courante en ce qui concerne les nombres dans Sass est de penser que les unités sont de simples chaînes de caractères qu’on peut accoler à un nombre sans problème. Même si cela semble vrai, ce n’est pas ainsi que les unités fonctionnent. On peut voir les unités comme des symboles algébriques. Par exemple, dans le monde réel, si on multiplie 5 mètres par 5 mètres, on obtient 25 mètres carrés. La même logique s’applique à Sass.

Pour ajouter une unité à un nombre, vous devez multiplier ce nombre par _1 unité_.

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

Remarquez qu’en ajoutant _0 membre de cette unité_ on obtient le même résultat, mais je recommande la méthode indiquée ci-dessus car l’ajout de _0 unité_ peut créer une certaine confusion. En effet, si vous essayez de convertir un nombre dans une autre unité compatible, ajouter `0` ne fonctionnera pas. Davantage d’information à ce sujet dans [cet article sur CSS-Tricks](https://css-tricks.com/snippets/sass/correctly-adding-unit-number/).

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

En fin de compte, tout dépend de ce que vous cherchez à obtenir. Rappelez-vous simplement qu’ajouter l’unité sous forme de chaîne de caractères n’est pas la bonne méthode. [Utilisez des longueurs, pas des chaînes de caractères.](https://kittygiraudel.com/2013/09/03/use-lengths-not-strings/)

Pour supprimer l’unité d’une valeur, il suffit de la _diviser par une fois son unité_.

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

Si vous ajoutez une unité sous forme de chaîne de caractères à un nombre, le résultat est une chaîne de caractères, ce qui vous empêche d’effectuer toute opération sur la valeur. De même avec l’opération `slice` si vous découpez la partie numérique d’un nombre — ce qui n’est sans doute pas le résultat souhaité.

#### Calculs

**Les calculs numériques de premier niveau devraient toujours être entre parenthèses**. Non seulement la lisibilité s’en trouve considérablement améliorée, mais les éventuels cas _borderline_ sont résolus en forçant Sass à évaluer le contenu entre parenthèses.

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

#### Nombres magiques

L’expression “nombre magique” est un [vieux terme de programmation](https://fr.wikipedia.org/wiki/Nombre_magique_\(programmation\)#Constantes_num.C3.A9riques_non-nomm.C3.A9es) qui désigne _une constante numérique non nommée_. Quelque chose comme un nombre aléatoire _qui fonctionne_ sans que l’on sache dire exactement pourquoi.

Est-il utile de préciser que **les nombres magiques sont une plaie et doivent être évités à tout prix** ? Si vous ne pouvez pas expliquer logiquement la raison pour laquelle un nombre fonctionne, ajoutez un commentaire détaillant la façon dont vous êtes arrivé à ce nombre et pourquoi vous pensez qu’il est approprié. Il vaut mieux expliquer pourquoi vous ne comprenez pas comment quelque chose fonctionne que de laisser au développeur qui vous suivra le soin de comprendre les raisons de votre choix.

```
/**
 * 1. Nombre magique. Cette valeur est la plus basse que j’ai trouvée pour aligner le haut de
 * `.foo` avec celui de son parent. Il faut trouver une solution pour faire ça proprement.
 */
.foo {
  top: 0.327em; /* 1 */
}
```

```
/**
 * 1. Nombre magique. Cette valeur est la plus basse que j’ai trouvée pour aligner le haut de
 * `.foo` avec celui de son parent. Il faut trouver une solution pour faire ça proprement.
 */
.foo
  top: 0.327em /* 1 */
```

À ce sujet, CSS-Tricks a [un superbe article](https://css-tricks.com/magic-numbers-in-css/) à propos des nombres magiques en CSS, que je vous recommande de lire.

### Couleurs

Les couleurs occupent une place importante dans le langage CSS. Naturellement, Sass devient un excellent allié lorsqu’il s’agit de manipuler les couleurs, essentiellement à l’aide de quelques [fonctions puissantes](https://sass-lang.com/documentation/Sass/Script/Functions.html).

Sass est si utile quand il s’agit de manipuler les couleurs que des articles sont apparus de toute part pour en parler. Permettez-moi de vous recommander quelques lectures :

-   [How to Programmatically Go From One Color to Another](https://kittygiraudel.com/2014/01/30/programmatically-go-from-one-color-to-another-with-sass/)
-   [Using Sass to Build Color Palettes](https://www.sitepoint.com/using-sass-build-color-palettes/)
-   [Dealing with Color Schemes in Sass](https://www.sitepoint.com/dealing-color-schemes-sass/)

#### Formats de couleurs

Pour simplifier les couleurs autant que possible, mon conseil est de respecter l’ordre de préférence suivant pour les formats :

1.  [Notation HSL](https://fr.wikipedia.org/wiki/Teinte_saturation_lumi%C3%A8re);
2.  [Notation RGB](https://fr.wikipedia.org/wiki/Rouge_vert_bleu);
3.  Notation hexadécimale (en minuscules et en version raccourcie lorsque c’est possible).

Les mots-clés de couleur ne devraient pas être utilisés, sauf quand il s’agit de prototypage rapide. En effet, ils sont en anglais et certains d’entre eux font un bien piètre travail quand il s’agit d’exprimer la couleur qu’ils représentent, surtout pour des personnes dont l’anglais n’est pas la langue maternelle. De plus, les mots-clés n’ont pas vraiment de valeur sémantique. Par exemple, `grey` se trouve être plus foncé que `darkgrey`, et la confusion entre `grey` et `gray` peut engendrer une utilisation incohérente de cette couleur.

La représentation HSL n’est pas seulement la plus facile à appréhender pour le cerveau humain \[citation requise\], elle rend aussi les modifications de couleurs plus simples en permettant d’ajuster la teinte, la saturation et la valeur de manière individuelle.

Le format RGB a également l’avantage d’indiquer du premier coup d’oeil si la couleur est plutôt bleue, verte ou rouge. C’est pourquoi il peut être plus approprié que le format HSL dans certains cas, surtout quand il s’agit de décrire un pur rouge, vert ou bleu. Cependant, ce format rend la construction d’une couleur via ses trois composantes difficile.

Enfin, l’hexadécimal est presque indéchiffrable pour le cerveau humain. Ne l’utilisez qu’en dernier recours, si vous en avez besoin.

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

Si vous utilisez la notation HSL ou RGB, ajoutez toujours un espace après la virgule, mais n’ajoutez pas d’espace entre les parenthèses et le contenu.

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

#### Couleurs et variables

Si vous utilisez une couleur plusieurs fois, enregistrez-la dans une variable portant un nom représentatif de la couleur.

```
$sass-pink: hsl(330, 50%, 60%);
```

```
$sass-pink: hsl(330, 50%, 60%)
```

Vous pouvez maintenant utiliser cette variable où vous voulez. Cependant, si son usage est lié à un thème, je vous conseille de ne pas utiliser la variable directement mais plutôt de l’enregistrer elle-même dans une autre variable dont le nom explique la fonction.

```
$main-theme-color: $sass-pink;
```

```
$main-theme-color: $sass-pink
```

De cette façon vous éviterez qu’une modification de votre thème ne conduise à quelque chose comme `$sass-pink: blue`. [Cet article](https://davidwalsh.name/sass-color-variables-dont-suck) explique bien pourquoi il est important de bien nommer ses variables.

#### Éclaircir et obscurcir les couleurs

Les fonctions [`lighten`](https://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method) et [`darken`](https://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method) manipulent la luminosité d’une couleur dans l’espace HSL en augmentant ou en diminuant sa valeur. En fait, elles ne sont rien d’autre que des alias du paramètre `$lightness` de la fonction [`adjust-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#adjust_color-instance_method).

Toutefois, il arrive souvent que ces fonctions ne produisent pas le résultat escompté. La fonction [`mix`](https://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method) est une autre façon d’éclaircir une couleur en la mélangeant à du blanc ou à du noir.

L’avantage d’utiliser `mix` plutôt que les deux fonctions précédemment citées est qu’elle permet d’aller très progressivement vers le noir (ou vers le blanc) à mesure que l’on diminue la proportion de la couleur initiale, alors que `darken` et `lighten` font passer très rapidement la couleur au noir ou au blanc :

  

Illustration de la différence entre `lighten`/`darken` et `mix` par [KatieK](https://codepen.io/KatieK2/pen/tejhz/)

Si vous ne voulez pas écrire la fonction `mix` à chaque fois, vous pouvez créer deux fonctions faciles à utiliser, `tint` et `shade` (qui sont incluses dans [Compass](http://compass-style.org/reference/compass/helpers/colors/#shade)) pour obtenir la même chose :

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

La fonction [`scale-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method) échelonne les propriétés de manière plus fluide en prenant en compte leur degré de luminosité actuelle. Elle donne des résultats aussi beaux que `mix` mais avec des conventions d’utilisation plus claires. Le facteur d’échelonnage n’est cependant pas le même.

### Listes

Les listes sont l’équivalent des arrays (tables) dans Sass. Une liste est une structure de données plate (contrairement à [maps](#maps)) dont le but est de stocker des valeurs de tout type (y compris des listes, ce qui autorise l’imbrication de listes).

Les listes doivent respecter les recommandations suivantes :

-   sur une ligne ou sur plusieurs lignes ;
-   impérativement sur plusieurs lignes si elles comptent plus de 80 caractères ;
-   toujours utiliser une virgule pour séparer les éléments de la liste, sauf si elle est utilisée pour un contenu CSS ;
-   toujours entre parenthèses ;
-   ajouter une virgule après le dernier élément de la liste si elle compte plusieurs lignes.

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

Lorsque vous ajoutez de nouveaux items à une liste, utilisez toujours l’API fournie. N’essayez pas de les ajouter manuellement.

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

Dans [cet article](https://kittygiraudel.com/2013/07/15/understanding-sass-lists/), je parcours un certain nombre de trucs et astuces pour comprendre et manipuler les listes en Sass.

### Maps

Avec Sass, les auteurs de feuilles de styles peuvent définir des _maps_, qui sont l’équivalent en Sass des tableaux associatifs (ou dictionnaires ou tables d’association), des hashs ou même des objets JavaScript. Une map est une structure de données qui associe des clés (keys) à des valeurs. Les clés comme les valeurs peuvent être de tout type, y compris de type `map` même si je ne recommanderais pas l’utilisation de types complexes comme clés, ne serait-ce que dans un souci de simplicité.

Les maps doivent être écrites comme suit :

-   un espace après les deux-points (`:`) ;
-   parenthèse ouvrante (`(`) sur la même ligne que les deux-points (`:`) ;
-   **clés entre guillemets** si ce sont des chaînes de caractères (soit 99% des cas) ;
-   chaque paire clé/valeur sur sa propre ligne ;
-   virgule (`,`) à la fin de chaque clé/valeur ;
-   **virgule finale** (`,`) après le dernier item pour faciliter l’ajout, la suppression ou la réorganisation d’items ;
-   parenthèse fermante (`)`) sur sa propre ligne ;
-   pas d’espace ni de retour à la ligne entre la parenthèse finale et le point-virgule final.

Illustration :

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

Les écrits à propos des maps sont légions tant cette fonctionnalité était attendue. En voici 3 que je recommande : [Using Sass Maps](https://www.sitepoint.com/using-sass-maps/), [Extra Map functions in Sass](https://www.sitepoint.com/extra-map-functions-sass/), [Real Sass, Real Maps](http://blog.grayghostvisuals.com/sass/real-sass-real-maps/).

### Ensemble de règles CSS

Ici nous allons réviser ce que tout le monde sait, mais voici comment on devrait écrire une règle CSS (du moins selon la plupart des recommandations, dont [CSS Guidelines](https://cssguidelin.es/#anatomy-of-a-ruleset)) :

-   les sélecteurs liés sur la même ligne, sinon sur une ligne différente ;
-   l’accolade ouvrante (`{`) sur la ligne du dernier sélecteur séparé de celui-ci par un espace ;
-   chaque déclaration sur une même ligne ;
-   un espace après les deux-points (`:`) ;
-   toujours un point-virgule (`;`) à la dernière déclaration d’une règle ;
-   l’accolade fermante (`}`) sur sa propre ligne ;
-   une nouvelle ligne après l’accolade fermante.

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

En plus de ces recommandations liées à CSS, nous devons être attentifs aux points suivants :

-   les variables locales doivent être déclarées avant toute autre déclaration, puis séparées des autres par une ligne ;
-   les inclusions de mixins sans `@content` doivent venir avant toute déclaration ;
-   les sélecteurs imbriqués doivent toujours apparaître sur une nouvelle ligne ;
-   les inclusions de mixins avec `@content` doivent apparaître après les sélecteurs imbriqués ;
-   pas de saut de ligne avant une accolade fermante (`}`).

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

### Ordre des déclarations

Je ne connais aucun autre sujet où les opinions sont aussi partagées qu’en ce qui concerne l’ordre des déclarations CSS. Concrètement, deux opinions s’opposent :

-   s’en tenir à l’ordre alphabétique ;
-   classer les déclarations par type (position, display, color, font, autres…).

Il y a du pour et du contre dans chacune. D’un côté, l’ordre alphabétique est universel (du moins pour les langues utilisant l’alphabet latin), donc il n’y a pas de dispute possible quant à la position d’un sélecteur par rapport à un autre. Cependant, il me paraît bizarre de ne pas avoir des propriétés telles que `bottom` et `top` l’une derrière l’autre. Pourquoi les animations devraient-elles apparaître avant le type de display ? L’ordre alphabétique crée de nombreuses bizarreries.

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

D’un autre côté, ordonner par propriété semble parfaitement logique. Les déclarations de `font` sont regroupées, `top` et `bottom` sont réunis et la lecture d’une règle CSS ressemble à une petite histoire. Mais à moins de s’en tenir à des conventions comme [Idiomatic CSS](https://github.com/necolas/idiomatic-css), cette façon de faire laisse encore beaucoup de place à l’interprétation. Où situer `white-space` ? font ou display ? Où situer `overflow` ? Et quel ordre donner aux propriétés à l’intérieur d’un groupe ? (alphabétique ?… ô ironie…).

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

Il existe encore un autre modèle d’ordonnancement des types, [Concentric CSS](https://github.com/brandon-rhodes/Concentric-CSS), qui semble assez populaire lui aussi. Concentric CSS s’appuie sur le modèle de boîte pour définir l’ordre : il part de l’extérieur pour aller vers l’intérieur.

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

Je dois dire que je n’arrive pas à me décider moi-même. Un [récent sondage de CSS-Tricks](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/) a montré que plus de 45% des développeurs ordonnent leurs déclarations par type, contre 14% par ordre alphabétique. 39% le font au hasard, et j’en fais partie.

  ![Tableau montrant comment les développeurs ordonnent leurs déclarations CSS ](https://sass-guidelin.es/assets/images/css-order-chart.png)

Tableau montrant comment les développeurs ordonnent leurs déclarations CSS

C’est la raison pour laquelle je ne recommande pas de choix particulier dans ce guide de style. Choisisssez celui que vous préférez, du moment qu’il reste cohérent tout au long de vos feuilles de style (en d’autres termes : pas l’option _au hasard_).

Une [étude récente](https://web.archive.org/web/20190618180712/http://peteschuster.com/2014/12/reduce-file-size-css-sorting/) montre que l’utilisation de [CSS Comb](https://github.com/csscomb/csscomb.js) (qui s’appuie sur [un ordre par type](https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json)) pour organiser les déclarations CSS permet de réduire la taille moyenne des fichiers gzippés de 2,7% contre 1,3% lorsqu’ils sont ordonnés alphabétiquement.

### Imbrication des sélecteurs

Parmi les fonctionnalités offertes par Sass, l’une d’entre elles est souvent mal utilisée, c’est _l’imbrication des sélecteurs_. Celle-ci permet aux auteurs de feuilles de styles de créer de longs sélecteurs en imbriquant des sélecteurs plus courts les uns dans les autres.

#### Règle générale

Par exemple, l’imbrication Sass suivante :

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

… génèrera ce CSS :

```
.foo .bar:hover {
  color: red;
}
```

En suivant la même idée, il est possible depuis Sass 3.3 d’utiliser la référence au sélecteur courant (`&`) pour générer des sélecteurs avancés, par exemple :

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

… génèrera ce CSS :

```
.foo-bar {
  color: red;
}
```

```
.foo-bar
  color: red
```

Cette méthode est souvent utilisée avec [les conventions de nommage BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) pour générer des sélecteurs `.block__element` et `.block--modifier` à partir du sélecteur d’origine (`.block` dans ce cas).

Même si cela peut sembler anecdotique, la génération de nouveaux sélecteurs à l’aide de la référence au sélecteur courant (`&`) rend impossible la recherche de ces sélecteurs dans le code puisqu’ils n’existent pas en soi.

Le problème avec l’imbrication des sélecteurs est qu’elle rend le code plus difficile à lire. On doit reconstituer mentalement le sélecteur qui en résulte à partir des niveaux d’indentation. Il n’est pas toujours évident de se représenter ce que donnera le CSS final.

C’est d’autant plus vrai à mesure que les sélecteurs s’allongent et que les références au sélecteur courant (`&`) se multiplient. À un certain point, le risque de confusion devient tellement élevé que l’imbrication n’en vaut pas la peine.

Pour éviter de telles situations, nous **évitons l’imbrication des sélecteurs autant que possible**. Il y a cependant quelques exceptions à cette règle.

Pour éviter de telles situations, il existe la fameuse [Règle d’Inception](https://thesassway.herokuapp.com/beginner/the-inception-rule) (_The Inception Rule_) depuis quelques années. Celle-ci déconseille d’imbriquer au-delà de 3 niveaux, en référence au film Inception de Christopher Nolan. Je suis plus drastique encore et vais jusqu’à **déconseiller l’imbrication des sélecteurs autant que faire se peut**.

Bien qu’il y ait bien évidemment quelques exceptions à cette règle comme nous allons le voir dans la prochaine section, cette opinion tranchée semble malgré tout assez populaire. Vous pouvez en lire davantage dans [Beware of Selector Nesting](https://www.sitepoint.com/beware-selector-nesting-sass/) et [Avoid nested selectors for more modular CSS](https://thesassway.herokuapp.com/intermediate/avoid-nested-selectors-for-more-modular-css).

#### Exceptions

Pour commencer, il est permis — et même recommandé — d’imbriquer les pseudo-classes et les pseudo-éléments à l’intérieur du sélecteur initial.

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

Non seulement l’imbrication des pseudo-classes et pseudo-éléments est parfaitement justifiée (parce qu’il s’agit de sélecteurs étroitement liés) mais aussi elle permet de conserver tout ce qui concerne un même composant au même endroit.

De plus, lorsqu’on utilise des classes décrivant un état indépendant du composant telles que `.is-active`, il est tout à fait justifié de les imbriquer dans le sélecteur du composant de façon à avoir un code bien ordonné.

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

_Last but not least_, lorsqu’on applique un style à un élément parce qu’il se trouve être contenu dans un autre élément spécifique, il est également logique de l’imbriquer afin que tout ce qui concerne cet élément soit réuni au même endroit.

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

Comme pour toute chose, ce qui compte ce ne sont pas les détails mais la cohérence globale. Si vous vous sentez en confiance avec l’imbrication des sélecteurs, utilisez-la. Assurez-vous que toute l’équipe soit d’accord avec cette façon de faire.

## Conventions de nommage

Dans cette section, nous ne traiterons pas des conventions de nommage CSS pour une meilleure maintenabilité et le passage à l’échelle ; non seulement cela dépend de chacun, mais cela sort du cadre d’un guide de style Sass. Je vous suggère de consulter les conventions recommandées par [CSS Guidelines](https://cssguidelin.es/#naming-conventions).

Il existe un certain nombre de choses que l’on peut nommer en Sass, et il est important de bien les nommer de façon à assurer la cohérence et la lisibilité de votre code :

-   variables;
-   fonctions;
-   mixins.

Les placeholders Sass sont délibérément omis, car ils peuvent être considérés comme des sélecteurs CSS normaux, et suivent par conséquent les mêmes modèles de nommage que les classes.

En ce qui concerne les variables, les fonctions et les mixins, nous allons nous tenir à quelque chose de très _CSS_ : **bas-de-casse et séparation par un tiret**, et surtout signifiant.

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

Si vous êtes un développeur de frameworks ou si vous écrivez des bibliothèques, vous pouvez avoir besoin de variables qui ne sont pas supposées être mises à jour, en aucune circonstance : en d’autres termes des constantes. Malheureusement (ou heureusement ?), Sass ne permet pas de définir de telles entités, c’est pourquoi nous devons nous tenir à des conventions strictes si nous voulons que les choses soient claires.

Comme dans de nombreux langages, je suggère d’utiliser des variables tout en majuscules et snake-case pour indiquer qu’il s’agit de constantes. C’est non seulement une convention déjà ancienne, mais elle contraste fortement avec les variables tout en minuscules et séparées par des tirets.

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

Si vous désirez vraiment utiliser des constantes en Sass, vous devriez lire [cet article dédié à ce sujet](https://www.sitepoint.com/dealing-constants-sass/).

### Namespaces

Si vous avez l’intention de distribuer votre code Sass, sous forme de bibliothèque, de framework, de système de grille ou autre, il peut s’avérer intéressant de donner un _namespace_ à vos variables, fonctions, mixins et placeholders de façon à ce qu’ils n’entrent pas en conflit avec le code d’une autre personne.

Par exemple, si vous travaillez sur un projet _Sassy Unicorn_ qui est destiné à être distribué, il est important d’utiliser un namespace, tel que `su-`, suffisamment spécifique pour éviter toute collision de noms et suffisamment court pour ne pas devenir pénible à écrire.

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

[Kaelig](https://kaelig.fr) a [un super article à propos du namespace global de CSS](https://blog.kaelig.fr/post/44554267597/please-respect-the-global-css-namespace), si jamais le sujet vous passionne !

Le namespacing automatique est un des objectifs de la redéfinition à venir d’ `@import` à partir de Sass 4.0. Lorsque cela se concrétisera, il sera de moins en moins utile de réaliser manuellement le namespacing, et à terme les bibliothèques conçues de la sorte (avec espaces de noms manuels) pourraient devenir plus difficiles à utiliser.

## Architecture

La conception de l’architecture d’un projet CSS est probablement l’une des étapes les plus complexes dans la vie d’un projet. Conserver la cohérence de l’architecture et son sens est encore plus difficile.

Heureusement, l’un des principaux bénéfices de l’utilisation de préprocesseurs est la possibilité d’éclater le code en plusieurs fichiers sans impacter la performance (contrairement à la directive CSS `@import`). Grâce à la surcharge de la directive `@import` dans Sass, on peut de manière sûre (et recommandée) utiliser autant de fichiers que nécessaire dans le développement, qui seront tous compilés en une feuille de style unique pour la production.

On n’insistera jamais assez sur la nécessité d’utiliser des dossiers, même sur des projets de dimension modeste. À la maison, vous ne rangez pas tous vos papiers dans la même boîte. Vous utilisez des dossiers : un pour les papiers de la maison, un pour la banque, un pour les factures, etc. Il en va de même lorsqu’on structure un projet CSS. Éclatez votre code en plusieurs dossiers qui font sens, de façon à retrouver ce que vous cherchez quand vous devez revenir sur le code.

Il existe [plusieurs architectures populaires](https://www.sitepoint.com/look-different-sass-architectures/) pour les projets CSS : [OOCSS](https://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/), [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), ou inspirées de [Bootstrap](https://getbootstrap.com/) ou de [Foundation](https://get.foundation/)… Elles ont toutes leurs mérites et chacune a du pour et du contre.

Personnellement j’utilise une approche assez similaire à [SMACSS](http://smacss.com/) de [Jonathan Snook](https://snook.ca/), dont l’objectif est de conserver une architecture simple et évidente.

L’expérience m’a appris que l’architecture était la plupart du temps très spécifique au projet. Sentez-vous libre de rejeter complètement ou d’adapter la solution proposée — votre système doit répondre à vos besoins spécifiques.

### Composants

Il y a une différence essentielle entre un projet _qui marche_ et un _bon_ projet. Encore une fois, CSS est un langage confus \[citation requise\]. Moins nous avons de CSS et mieux nous nous portons. Nous ne voulons pas avoir à gérer des mégaoctets de code CSS. Pour conserver des feuilles de styles concises et efficaces — ce ne sera pas une surprise pour vous — il est généralement utile de voir l’interface comme un ensemble de composants.

Les composants peuvent être ce qu’on veut, du moment que :

-   ils font une chose, et une seule chose ;
-   ils sont réutilisables et réutilisés à travers le projet ;
-   ils sont indépendants.

Par exemple, un formulaire de recherche devrait être traité comme un composant. Il devrait être réutilisable, à différents endroits, sur différentes pages, dans des situations variées. Il ne devrait pas dépendre de sa position dans le DOM (footer, sidebar, main content…).

La plupart des éléments constituant une interface peuvent être pensés comme des composants et je recommande de se tenir à ce paradigme. Non seulement cela réduira le CSS nécessaire à un projet, mais encore ce sera bien plus facile à maintenir qu’un code chaotique et confus.

### Anatomie d’un Composant

Idéalement, les composants devraient exister dans leur propre fichier (dans le dossier `components/`, comme décrit dans la section dédiée [au pattern 7-1](#le-pattern-7-1)), par exemple `components/_button.scss`). Les styles décrits dans chaque composant devraient uniquement traiter :

-   du composant lui-même ;
-   des variantes du composant ainsi que de ses états ;
-   des descendants du composant (enfants) si nécessaire.

Si vous souhaitez rendre vos composants personnalisables de façon externe (via un thème provenant du dossier `themes/` par exemple), limitez les déclarations aux styles structurels comme les dimensions (`width`, `height`), marges (`padding`, `margin`), alignements, etc. Évitez les styles graphiques comme les couleurs, ombres, fonds, règles de typographie, etc.

Un fichier de composant peut inclure des variables, placeholders et mêmes mixins et fonctions du moment que ceux-ci sont spécifiques au dit composant. Gardez à l’esprit cependant qu’il faut éviter de référencer (`@import`\-er) un composant depuis un autre composant car cela peut rendre le projet extrêmement chaotique.

Voilà un exemple de composant bouton :

```
// Variables spécifiques aux boutons
$button-color: $secondary-color;

// … inclusion d’éléments spécifiques aux boutons :
// - mixins
// - placeholders
// - fonctions

/**
 * Boutons
 */
.button {
  @include vertical-rhythm;
  display: block;
  padding: 1rem;
  color: $button-color;
  // … etc.

  /**
   * Boutons en ligne sur larges écrans
   */
  @include respond-to('medium') {
    display: inline-block;
  }
}

/**
 * Icônes à l’intérieur des boutons
 */
.button > svg {
  fill: currentcolor;
  // … etc.
}

/**
 * Boutons en ligne
 */
.button--inline {
  display: inline-block;
}
```

```
// Variables spécifiques aux boutons
$button-color: $secondary-color

// … inclusion d’éléments spécifiques aux boutons :
// - mixins
// - placeholders
// - fonctions

/**
 * Boutons
 */
.button
  +vertical-rhythm
  display: block
  padding: 1rem
  color: $button-color
  // … etc.

  /**
   * Boutons en ligne sur larges écrans
   */
  +respond-to('medium')
    display: inline-block
}

/**
 * Icônes à l’intérieur des boutons
 */
.button > svg
  fill: currentcolor
  // … etc.

/**
 * Boutons en ligne
 */
.button--inline
  display: inline-block
```

Merci à [David Khourshid](https://twitter.com/davidkpiano) pour son aide et son expertise dans cette section.

### Le pattern 7-1

Revenons à l’architecture. J’utilise habituellement ce que j’appelle le _pattern 7-1_ : 7 dossiers, 1 fichier. Tous vos partiels regroupés dans 7 dossiers différents et un fichier simple à la racine (généralement appelé `main.scss`) qui les importe tous pour les compiler dans une feuille de style CSS.

-   `abstracts/`
-   `base/`
-   `components/`
-   `layout/`
-   `pages/`
-   `themes/`
-   `vendors/`

Et bien sûr :

-   `main.scss`

Si vous souhaitez utiliser le pattern 7-1, il y a déjà un [boilerplate](https://github.com/KittyGiraudel/sass-boilerplate) sur GitHub. Il contient tout ce dont vous avez besoin pour démarrer avec cette architecture.

  

Fond d’écran par [Julien He](https://twitter.com/julien_he)

Idéalement, nous pouvons proposer quelque chose comme ceci :

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

Les fichiers suivent les conventions de nommage décrites précédemment : minuscules et utilisation du trait d’union.

#### Dossier base

Le dossier `base/` contient ce que nous pourrions appeler le code standard (_boilerplate_) du projet. On pourrait y trouver par exemple le fichier de reset, quelques règles typographiques, et probablement une feuille de style définissant quelques styles standard pour les éléments HTML les plus employés (que j’ai l’habitude d’appeler `_base.scss`).

-   `_base.scss`
-   `_reset.scss`
-   `_typography.scss`

Si votre projet utilise _beaucoup_ d’animations CSS, vous pouvez envisager d’ajouter un fichier `_animations.scss` contenant les définitions de `@keyframes` pour toutes vos animations. Si vous n’utilisez les animations que de façon sporadique, laissez leur déclaration près des sélecteurs qui les emploient.

#### Dossier layout

Le dossier `layout/` contient tout ce qui concerne la mise en page du site ou de l’application. Ce dossier pourrait intégrer des feuilles de style pour les principales parties du site (header, footer, navigation, sidebar…), pour le système de grille ou même les styles CSS pour tous les formulaires.

-   `_grid.scss`
-   `_header.scss`
-   `_footer.scss`
-   `_sidebar.scss`
-   `_forms.scss`
-   `_navigation.scss`

Le dossier `layout/` pourrait aussi être appelé `partiels/`, selon ce que vous préférez.

#### Dossier composants

Pour les plus petits composants, il y a le dossier `components/`. Alors que `layout/` est _macro_ (c’est-à-dire qu’il définit l’_armature_ globale), `components/` est plus centré sur les widgets. Il contient toutes sortes de modules spécifiques tels qu’un slider, un loader, un widget et toutes ces sortes de choses. Il y a en général de nombreux fichiers dans `components/` car l’application tout entière devrait être essentiellement constituée de petits modules.

-   `_media.scss`
-   `_carousel.scss`
-   `_thumbnails.scss`

Le dossier `components/` pourrait également être appelé `modules/`, selon ce que vous préférez.

#### Dossier Pages

Si vous avez des styles spécifiques à certaines pages, il est préférable de les inclure à l’intérieur d’un dossier `pages/` dans un fichier portant le nom de la page. Par exemple, il n’est pas rare d’avoir des styles très spécifiques pour la page d’accueil, d’où la nécessité d’un fichier `_home.scss` dans `pages/`.

-   `_home.scss`
-   `_contact.scss`

Selon votre processus de déploiement, ces fichiers peuvent être appelés individuellement pour éviter de les mélanger aux autres dans la feuille de style finale. Cela dépend vraiment de vous.

#### Dossier Thèmes

Dans des sites ou applications de grande envergure, il n’est pas rare d’avoir plusieurs thèmes. Il y a certainement bien des façons de traiter les thèmes, mais personnellement j’aime les regrouper dans un dossier `themes/`.

-   `_theme.scss`
-   `_admin.scss`

On est ici dans des considérations très spécifiques aux projets, et il est probable que ce dossier n’existera pas dans bien des cas.

#### Dossier d’Abstractions

Le dossier `abstracts/` regroupe les outils et helpers Sass utilisés à travers le projet. Toutes les variables globales, les fonctions, les mixins et les placeholders devraient se retrouver dans ce dossier.

La règle générale concernant ce dossier est qu’il ne devrait pas retourner une seule ligne de CSS s’il était compilé seul. Ce ne sont ici que des helpers Sass.

-   `_variables.scss`
-   `_mixins.scss`
-   `_functions.scss`
-   `_placeholders.scss`

Le dossier `abstracts/` pourrait également être appelé `utilities/` ou `helpers/`, au choix.

#### Dossier vendors

Et _last but not least_, la plupart des projets comportent un dossier `vendors/` qui regroupe tous les fichiers CSS provenant de bibliothèques et frameworks externes — Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered, etc. Le fait de les mettre ainsi de côté dans un dossier séparé est une bonne façon d’indiquer qu’ils ne sont pas de vous et ne relèvent pas de votre responsabilité.

-   `_normalize.scss`
-   `_bootstrap.scss`
-   `_jquery-ui.scss`
-   `_select2.scss`

Si vous devez remplacer une section d’un fichier _vendor_, je recommande de créer un 8e dossier nommé `vendors-extensions/` dans lequel vous aurez des fichiers nommés en fonction du _vendor_ qu’ils remplacent.

Par exemple, `vendors-extensions/_boostrap.scss` serait un fichier contenant toutes les règles CSS qui re-déclarent le CSS par défaut de Bootstrap. Vous éviterez ainsi de modifier les fichiers _vendors_ eux-mêmes, ce qui n’est pas conseillé.

#### Fichier principal

Le fichier principal (généralement appelé `main.scss`) devrait être le seul fichier de toute la base à ne pas commencer par un underscore (`_`). Ce fichier ne devrait rien contenir d’autre que les `@import` et des commentaires.

Les fichiers doivent être importés en fonction du dossier dans lequel ils sont rangés, l’un après l’autre dans l’ordre suivant :

1.  `abstracts/`
2.  `vendors/`
3.  `base/`
4.  `layout/`
5.  `components/`
6.  `pages/`
7.  `themes/`

Afin d’assurer une bonne lisibilité, le fichier principal devrait respecter ces recommandations :

-   un fichier par `@import` ;
-   un `@import` par ligne ;
-   pas de saut de ligne entre 2 imports provenant du même dossier ;
-   un saut de ligne après le dernier import d’un dossier ;
-   les extensions fichiers et les underscores initiaux doivent être omis.

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

Il existe une autre façon d’importer les partiels, que je considère également valable. D’un côté, elle rend le fichier plus lisible. D’un autre côté, elle rend la mise à jour moins aisée. En tout cas, c’est à vous de décider, ce n’est pas très important. Dans cette façon de faire, le fichier principal doit respecter ces recommandations :

-   un `@import` par dossier ;
-   retour à la ligne après `@import` ;
-   chaque fichier sur sa propre ligne ;
-   un saut de ligne après le dernier import d’un dossier ;
-   les extensions fichiers et les underscores initiaux doivent être omis.

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

Pour éviter d’avoir à importer chaque fichier manuellement, il y a une extension de Sass Ruby appelée [sass-globbing](https://github.com/chriseppstein/sass-globbing), qui permet d’utiliser les patterns glob dans Sass `@import` tels que `@import "components/*"`.

Ceci dit, je ne la recommande pas car elle importe les fichiers par ordre alphabétique ce qui n’est pas souhaitable en général, surtout s’agissant d’un langage dans lequel l’ordre des sources est essentiel.

### À propos du “globbing”

En informatique, les “glob patterns” spécifient des collections de noms de fichiers contenant des caractères dits “joker”, tels que `*.scss`. De manière générale, globbing signifie déterminer un ensemble de fichiers à partir d’une expression plutôt que via une liste de noms de fichier. Quand il s’agit de Sass, cela signifie importer des fichiers individuels dans le [fichier principal](#fichier-principal) avec un pattern plutôt qu’en les listant un par un. Cela donnerait un fichier principal comme celui-ci :

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

Sass ne supporte pas le globbing par défaut car cela peut s’avérer dangereux dans la mesure où l’ordre de la source est important en CSS. En important les fichiers de manière dynamique (généralement par ordre alphabétique), on ne peut s’assurer de l’ordre de la source, ce qui peut engendrer des bugs difficiles à analyser.

Ceci étant dit, dans une architecture strictement basée sur les composants où un soin tout particulier est apporté à l’encapsulation des styles, l’ordre ne devrait pas vraiment importer, ce qui rend le globbing possible. Cela permettrait de faciliter l’ajout et le retrait des fichiers sans avoir à maintenir le fichier principal à la main.

Avec Ruby Sass, il existe une Gem Ruby appelée [sass-globbing](https://github.com/chriseppstein/sass-globbing) qui autorise ce comportement. Avec node-sass, on peut s’appuyer sur Node.js ou l’outil gérant la compilation des feuilles de styles (Gulp, Grunt, etc.).

### Fichier de la honte

Il existe un concept intéressant, popularisé par [Harry Roberts](https://csswizardry.com), [Dave Rupert](https://daverupert.com) et [Chris Coyier](https://css-tricks.com) qui consiste à ranger toutes les déclarations CSS, les hacks et tout ce dont on n’est pas vraiment fier dans un [fichier de la honte](https://csswizardry.com/2013/04/shame-css-full-net-interview/). Ce fichier, pathétiquement dénommé `_shame.scss`, est importé après tous les autres fichiers, à la toute fin de la feuille de style.

```
/**
 * Réparation du problème de spécificité sur la Nav.
 *
 * Quelqu’un a utilisé un ID dans le code du header (`#header a {}`) qui
 * prend le pas sur les sélecteurs nav (`.site-nav a {}`). Utiliser !important
 * pour l’écraser en attendant de trouver le temps de refactoriser le header.
 */
.site-nav a {
    color: #BADA55 !important;
}
```

```
/**
 * Réparation du problème de spécificité sur la Nav.
 *
 * Quelqu’un a utilisé un ID dans le code du header (`#header a {}`) qui prend le pas sur
 * les sélecteurs nav (`.site-nav a {}`). Utiliser !important pour l’écraser en attendant
 * de trouver le temps de refactoriser le header.
 */
.site-nav a
    color: #BADA55 !important
```

## Responsive Web Design et points de rupture

Je ne pense pas qu’il soit nécessaire de présenter le Responsive Web Design qui est maintenant omniprésent. Cependant vous vous demandez peut-être _pourquoi diable parler de RWD dans un guide de style Sass ?_ En fait, Sass peut nous faciliter la vie avec les points de rupture, voici ce qu’on peut faire.

### Nommer les points de rupture

Je pense qu’on peut affirmer sans crainte que les _media queries_ ne devraient jamais être liées à tel ou tel terminal. Par exemple, cibler spécifiquement les iPads ou les téléphones Blackberry est une très mauvaise idée. Les media queries doivent s’occuper d’amplitudes de tailles d’écran, jusqu’à ce que le design ne fonctionne plus comme souhaité et que la media query suivante prenne la relève.

Pour ces mêmes raisons, les points de rupture ne doivent pas être nommés en fonction d’un nom de terminal mais plutôt de quelque chose de plus général, d’autant que certains téléphones sont maintenant plus grands que certaines tablettes, certaines tablettes plus grandes que certains écrans d’ordinateurs, etc.

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

Ici, il est clair que toute convention de nommage clairement déconnectée de toute référence à un device particulier fera l’affaire, du moment qu’elle donne à comprendre l’ordre de grandeur.

```
$breakpoints: (
  'graine': (min-width: 800px),
  'pousse': (min-width: 1000px),
  'plante': (min-width: 1200px),
);
```

```
$breakpoints: ('graine': (min-width: 800px), 'pousse': (min-width: 1000px), 'plante': (min-width: 1200px))
```

L’exemple qui précède utilise des maps imbriquées pour définir les points de rupture, mais tout dépend de la façon dont vous gérez vos points de rupture. On pourrait tout aussi bien choisir des chaînes de caractères plutôt que des maps internes, pour plus de flexibilité (p.ex. `'(min-width: 800px)'`).

### Gestion des points de rupture

Une fois vos points de rupture nommés comme vous le souhaitez, il vous faut un moyen de les utiliser dans les media queries. Il y a de nombreuses façons d’y parvenir, mais je dois dire que je suis un fan des fonctions _getter_ pour lire les maps de points. C’est un système à la fois simple et efficace.

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

Évidemment, c’est un gestionnaire de points de rupture assez simpliste, si vous avez besoin d’un gestionnaire plus permissif, et si vous ne voulez pas réinventer la roue, je vous recommande [Sass-MQ](https://github.com/sass-mq/sass-mq), [Breakpoint](http://breakpoint-sass.com/) ou [include-media](https://github.com/eduardoboucas/include-media) qui ont fait leurs preuves.

Si vous souhaitez en savoir davantage sur les façons d’aborder les Media Queries en Sass, [SitePoint](https://www.sitepoint.com/managing-responsive-breakpoints-sass/) (via votre serviteur) et [CSS-Tricks](https://css-tricks.com/approaches-media-queries-sass/) proposent de très beaux articles.

### Utilisation des Media Queries

Il y a peu, un débat faisait rage sur la question de savoir où placer les media queries dans le code : à l’intérieur des sélecteurs (comme le permet Sass) ou ailleurs de façon strictement dissociée ? Je dois dire que je suis un fervent défenseur du système _media-queries-dans-les-sélecteurs_ car il s’accorde bien avec l’idée de _composants_.

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

Ce qui conduit au résultat suivant en CSS :

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

On vous dira que cette convention a pour effet la duplication de media queries en CSS, et c’est absolument vrai, même si des tests ont été réalisés qui montrent que cela n’a pas d’importance une fois que Gzip (ou équivalent) a fait son oeuvre :

> … nous avons étudié les implications en termes de performance de la combinaison ou de la dissociation des media queries et nous sommes arrivés à la conclusion que la différence est, au pire, minimale, au mieux inexistante. — Sam Richards, au sujet de Breakpoint

Maintenant, si vous êtes vraiment soucieux d’éviter toute duplication, vous pouvez utiliser un outil pour merger les media queries, comme [cette Gem](https://github.com/aaronjensen/sass-media_query_combiner), cependant je dois vous avertir de possibles effets collatéraux liés au déplacement de code — n’oubliez pas que l’ordre des sources est important en CSS.

## Variables

Les variables sont l’essence de tout langage de programmation. Elles nous permettent de réutiliser des valeurs sans avoir à les recopier sans cesse. Plus important encore, elles facilitent les mises à jour. Plus besoin de chercher et remplacer, ni de rechercher manuellement.

Cependant, CSS n’est rien d’autre qu’un grand panier contenant tous nos oeufs. Contrairement à de nombreux langages, CSS ne connaît pas vraiment la notion de _portée lexicale_ (_scope_). Il nous faut donc être attentifs lorsque nous ajoutons de nouvelles variables, si nous voulons éviter les conflits.

Mon conseil serait de ne créer de variables que lorsque cela fait vraiment sens. Ne créez pas de nouvelles variables juste pour le plaisir, ça n’améliorera en rien votre code. Une nouvelle variable ne devrait être créée que lorsque les critères suivants sont réunis :

-   La valeur est répétée au moins deux fois ;
-   il y a des chances que la valeur soit mise à jour au moins une fois ;
-   toutes les occurrences de la valeur sont liées à la variable (c’est-à-dire pas par coïncidence).

Rien ne sert de déclarer une variable qui ne sera jamais mise à jour ou qui n’est utilisée qu’à un seul endroit.

### Scoping

Le scoping des variables dans Sass a évolué avec les années. Jusqu’à récemment, les déclarations de variables à l’intérieur d’un jeu de règles et autres portées étaient locales par défaut. Cependant, lorsqu’il y avait déjà une variable globale portant le même nom, la déclaration locale modifiait la variable globale. Depuis la version 3.4, Sass traite correctement le concept de portée et crée une nouvelle variable locale.

La documentation parle de _global variable shadowing_. Lorsqu’on déclare à un niveau local (sélecteur, fonction, mixin…) une variable qui existe déjà au niveau global, on dit que la variable locale _masque_ la variable globale. Autrement dit, elle prend le pas sur la variable globale au niveau local.

Le petit code qui suit explique le concept de _variable shadowing_ :

```
// Initialise une variable globale au niveau racine.
$variable: 'initial value';

// Crée un mixin qui prend le pas sur cette variable globale.
@mixin global-variable-overriding {
  $variable: 'mixin value' !global;
}

.local-scope::before {
  // Crée une variable locale qui "masque" la variable globale.
  $variable: 'local value';

  // On inclut le mixin: il prend le pas sur la variable globale.
  @include global-variable-overriding;

  // Impression de la valeur de la variable.
  // C'est la variable **locale**, car elle masque la variable globale.
  content: $variable;
}

// Impression de la variable dans un autre sélecteur qui ne masque pas.
// C'est la variable **globale**, comme on s'y attendait.
.other-local-scope::before {
  content: $variable;
}
```

```
// Initialise une variable globale au niveau racine.
$variable: 'initial value'

// Crée un mixin qui prend le pas sur cette variable globale.
@mixin global-variable-overriding
  $variable: 'mixin value' !global

.local-scope::before
 // Crée une variable locale qui "masque" la variable globale.
  $variable: 'local value'

  // On inclut le mixin: il prend le pas sur la variable globale.
  +global-variable-overriding

  // Impression de la valeur de la variable.
  // C'est la variable **locale**, car elle masque la variable globale.
  content: $variable

// Impression de la variable dans un autre sélecteur qui ne masque pas.
// C'est la variable **globale**, comme on s'y attendait.
.other-local-scope::before
  content: $variable
```

### Le flag `!default`

Quand on construit une bibliothèque, un framework, un système de grilles ou n’importe quelle structure Sass destinée à être distribuée et utilisée par des développeurs externes, toutes les variables de configuration doivent être définies avec le flag `!default` ce qui permet qu’elles soient écrasées.

```
$baseline: 1em !default;
```

```
$baseline: 1em !default
```

De cette manière, un développeur peut définir sa propre variable `$baseline` _avant_ d’importer votre bibliothèque sans risquer de voir sa valeur redéfinie.

```
// La variable du développeur
$baseline: 2em;

// La déclaration de `$baseline` dans votre bibliothèque
@import 'your-library';

// $baseline == 2em;
```

```
// La variable du développeur
$baseline: 2em

// La déclaration de `$baseline` dans votre bibliothèque
@import your-library

// $baseline == 2em
```

### Le flag `!global`

Le flag `!global` ne doit être utilisé que lorsque l’on veut qu’une variable locale prenne le pas sur une variable globale. Lorsqu’on définit une variable à la racine, le flag `!global` doit être omis.

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

### Variables multiples ou maps

L’utilisation de maps plutôt que de variables multiples et distinctes présente un certain nombre d’avantages. Le principal réside dans la possibilité d’utiliser des boucles sur une map, ce qui n’est pas possible avec des variables distinctes.

Un autre avantage de l’utilisation de maps est la possibilité de créer des fonctions _getter_ pour fournir une API plus facile d’usage. Par exemple, considérons le code Sass suivant :

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

La directive `@extend` est une fonctionnalité puissante qui est bien souvent mal comprise. En règle générale, elle permet d’indiquer à Sass qu’il doit styler un sélecteur A comme s’il correspondait à un élément B. Il va sans dire que c’est un allié de poids lorsqu’on écrit un CSS modulaire.

Cependant, le vrai rôle de `@extend` est d’indiquer et de maintenir des relations (contraintes) au sein des sélecteurs étendus entre plusieurs règles. Concrètement, qu’est-ce que cela signifie ?

-   Les sélecteurs ont des contraintes (p.ex. `.bar` dans `.foo > .bar` doit avoir un parent `.foo`) ;
-   Ces contraintes sont passées au sélecteur qui étend (p.ex. `.baz { @extend .bar; }` va produire `.foo > .bar, .foo > .baz`) ;
-   Les déclarations du sélecteur étendu sont partagées avec le sélecteur qui étend.

Sachant cela, il est assez évident de voir comment le fait d’étendre des sélecteurs avec des contraintes trop souples peut engendrer une explosion du nombre de sélecteurs. Si `.baz .qux` étend `.foo .bar`, le sélecteur résultant peut être `.foo .baz .qux` ou `.baz .foo .qux`, dans la mesure où `.foo` et `.baz` sont des parents génériques. Ils peuvent être des parents, des grands-parents, etc.

Essayez toujours de définir des relations via les placeholders, plutôt que des classes. Ça permet d’utiliser n’importe quelle convention de nommage, et d’en changer sans problème. De plus, vu que les relations sont définies une fois seulement par les placeholders, il est bien plus rare de générer des sélecteurs non désirés.

```
%button {
  display: inline-block;
  // … styles de bouton

  // Relation : un %button qui est enfant d'une %modal
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
  // … styles de bouton

  // Relation : un %button qui est enfant d'une %modal
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

Il y a de nombreux scénarios où étendre des sélecteurs peut être pratique et utile. Gardez toujours en tête ces règles afin de pouvoir utiliser `@extend` sans crainte :

-   N’étendez que des `%placeholders`, pas de vrais sélecteurs.
-   Étendez un même `%placeholder` aussi peu de fois que possible.
-   Évitez les sélecteurs parents génériques (p.ex. `.foo .bar`) ou les voisins génériques (p.ex. `.foo ~ .bar`). C’est précisément ce qui créé des problèmes de sélecteurs.

Il est souvent dit que `@extend` aide à réduire la taille des feuilles de styles dans la mesure où il combine les sélecteurs plutôt que de dupliquer les déclarations. C’est vrai, cependant la différence devient négligeable quand [Gzip](https://en.wikipedia.org/wiki/Gzip) a effectué la compression.

Ceci étant dit, si vous ne pouvez pas utiliser Gzip (ou équivalent), basculer sur une approche utilisant `@extend` peut être envisageable, surtout si la taille de la feuille de styles constitue un problème de performance.

### Extend et les media queries

Vous ne devez étendre que des sélecteurs faisant partie du même cadre de média (directive `@media`). Considérez les media queries comme une autre contrainte.

```
%foo {
  content: 'foo';
}

// Nope
@media print {
  .bar {
    // Ça ne marche pas. Pire : c'est un crash.
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
    // Ça ne marche pas. Pire : c'est un crash.
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

Les opinions semblent très divisées vis-à-vis des avantages et inconvénients de `@extend`, et de nombreux développeurs (moi y compris) préconisent de ne pas l’utiliser, comme vous pouvez le lire dans ces articles :

-   [What Nobody Told you About Sass Extend](https://www.sitepoint.com/sass-extend-nobody-told-you/)
-   [Why You Should Avoid Extend](https://www.sitepoint.com/avoid-sass-extend/)
-   [Don’t Over Extend Yourself](https://pressupinc.com/blog/2014/11/dont-overextend-yourself-in-sass/)

Ceci étant dit et pour résumer, il est recommandé d’utiliser `@extend` exclusivement pour maintenir des relations entre les sélecteurs. Si deux sélecteurs ont des caractéristiques similaires, il y a là un cas d’utilisation typique pour `@extend`. S’ils n’ont rien à voir mais partagent quelques déclarations, un `@mixin` est probablement plus approprié. Davantage d’information sur leurs différences dans [cet article](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/).

Merci à [David Khourshid](https://twitter.com/davidkpiano) pour son aide et son expertise dans cette section.

## Mixins

Les mixins sont l’une des fonctionnalités les plus utilisées de Sass. Elles sont essentielles pour la réutilisabilité et pour les composants DRY. Il y a de bonnes raisons à cela : les mixins permettent aux auteurs de définir des styles qui peuvent être réutilisés dans l’ensemble de la feuille de styles sans avoir à recourir à des classes non sémantiques comme `.float-left`.

Ils contiennent des règles CSS complètes et tout ce qui est permis n’importe où dans un document Sass. Ils acceptent même des arguments, comme les fonctions. Il va sans dire que les possibilités sont infinies.

Mais je dois vous mettre en garde contre l’abus de mixins. Là encore, le plus important est la _simplicité_. Il peut être tentant de construire des mixins extrêmement puissants faisant appel massivement à la logique. Cela ressemble à de l’ingénierie excessive et de nombreux développeurs souffrent de cette affection. Ne réfléchissez pas trop et surtout concentrez-vous sur la simplicité. Si un mixin dépasse 20 lignes de code, alors soit il doit être éclaté en parties plus réduites, soit il doit être repensé.

### Les bases

Ceci étant dit, les mixins sont extrêmement utiles et vous devriez faire usage de quelques-uns. La règle générale est que si vous repérez un groupe de propriétés CSS qui apparaissent toujours ensemble pour une bonne raison (c’est-à-dire pas par pure coïncidence), vous pouvez les regrouper dans un mixin. Le [micro-clearfix hack de Nicolas Gallagher](http://nicolasgallagher.com/micro-clearfix-hack/) par exemple mérite d’être déclaré dans un mixin (sans argument).

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

Un autre exemple valable serait un mixin permettant de dimensionner un élément, qui définirait à la fois sa largeur et sa hauteur, en même temps. Non seulement il simplifie la saisie du code mais il en facilite également la lecture.

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

Pour des exemples plus avancés de mixins, jetez un oeil à [celui-ci pour générer des triangles en CSS](https://www.sitepoint.com/sass-mixin-css-triangles/), [celui-ci pour créer de longues ombres](https://www.sitepoint.com/ultimate-long-shadow-sass-mixin/) ou encore [celui-ci pour gérer les anciennes syntaxes de dégradés](https://www.sitepoint.com/building-linear-gradient-mixin-sass/).

### Argument-less mixins

Parfois les mixins sont utilisés simplement pour éviter de répéter le même groupe de déclarations encore et encore, et par conséquent ne nécessitent pas de paramètres, ou se trouvent avoir des valeurs par défaut suffisamment éloquentes qu’il ne soit pas nécessaire de leur passer d’arguments.

Dans ces cas de figure, on peut tout à fait omettre les parenthèses lorsqu’on appelle un mixin. Le mot-clé `@include` (ou signe `+` dans le cas de la syntaxe indentée) fait déjà office d’indicateur qu’il s’agit d’une inclusion de mixin ; les parenthèses sont obsolètes.

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

### Listes d’Arguments

Lorsque vous avez affaire à un nombre inconnu d’arguments dans un mixin, utilisez toujours une `arglist` plutôt qu’une liste. On peut voir `arglist` comme le 8e type de données de Sass, caché et non documenté, qui est implicitement utilisé lorsqu’on passe un nombre arbitraire d’arguments dans un mixin ou une fonction dont la signature contient `...`.

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

Quand vous construisez un mixin qui accepte quelques arguments (disons 3 ou plus), pensez à deux fois avant de les merger sous forme de liste ou de map en croyant que ce sera plus facile que de les passer un par un.

Sass gère très intelligemment les mixins et les déclarations de fonction, vous pouvez passer une liste ou une map comme une `arglist` dans une fonction ou un mixin de façon à ce qu’ils soient traités comme une série d’arguments.

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

Pour plus d’information sur les différences entre des arguments multiples, une liste, et une liste d’arguments pour un mixin, [SitePoint a un très bel article](https://www.sitepoint.com/sass-multiple-arguments-lists-or-arglist/).

### Mixins et préfixes constructeurs

Il pourrait être tentant de définir des mixins personnalisés pour traiter les préfixes constructeurs utilisés pour les propriétés CSS partiellement ou non supportées. Mais nous n’allons pas faire cela. D’abord, si vous pouvez utiliser [Autoprefixer](https://github.com/postcss/autoprefixer), faites-le. Il allégera votre code Sass, il sera toujours à jour et fera un bien meilleur boulot que vous pour préfixer ce qui doit l’être.

Malheureusement, Autoprefixer n’est pas toujours une option envisageable. Si vous utilisez [Bourbon](https://bourbon.io/) ou [Compass](http://compass-style.org/), vous savez sans doute déjà qu’ils proposent tous les deux une collection de mixins qui traitent les préfixes constructeurs pour vous. Utilisez-les.

Si vous ne pouvez utiliser ni Autoprefixer, ni Bourbon, ni Compass, alors — et seulement alors — vous pouvez créer votre propre mixin pour préfixer les propriétés CSS. Attention, ne construisez pas un mixin par propriété en écrivant manuellement chaque préfixe constructeur.

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

Faites-le plus intelligemment.

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

L’utilisation de ce mixin devrait être assez simple :

```
.foo {
  @include prefix(transform, rotate(90deg), ('webkit', 'ms'));
}
```

```
.foo
  +prefix(transform, rotate(90deg), ('webkit', 'ms'))
```

Gardez à l’esprit que c’est une solution assez pauvre. Par exemple, elle ne peut pas traiter les polyfills complexes tels que ceux requis pour Flexbox. En ce sens, Autoprefixer est une bien meilleure solution.

## Structures conditionnelles

Vous savez probablement déjà que Sass fournit des structures conditionnelles via les directives `@if` et `@else`. Vous n’avez sans doute pas besoin de structures conditionnelles dans vos feuilles de style habituelles, en fait elles existent essentiellement pour les bibliothèques et les frameworks.

Si toutefois vous en avez un jour besoin, voici les recommandations à suivre :

-   Pas de parenthèses sauf si elles sont nécessaires ;
-   Toujours un saut de ligne avant `@if` ;
-   Toujours un renvoi à la ligne après l’accolade ouvrante (`{`) ;
-   `@else` sur la même ligne que l’accolade fermante qui précède (`}`) ;
-   Toujours un saut de ligne après l’accolade fermante finale (`}`) sauf si la ligne suivante est aussi une accolade fermante (`}`).

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

Lorsqu’on teste si une valeur est fausse, on utilise toujours le mot-clé `not` plutôt que de tester sur `false` ou `null`.

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

Veillez à toujours mettre la partie variable à gauche de la déclaration et le résultat (in)attendu à droite. Les structures conditionnelles inversées sont souvent plus difficiles à lire, surtout pour les développeurs inexpérimentés.

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

Lorsqu’on utilise des structures conditionnelles à l’intérieur d’une fonction, toujours s’assurer que la fonction a une déclaration `@return` en dehors de tout bloc conditionnel.

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

## Boucles

Sass nous offre des structures complexes telles que les [listes](#listes) et les [maps](#maps), il n’est donc pas surprenant qu’il nous permette d’effectuer des itérations sur ces entités.

Toutefois, la présence de boucles implique généralement une logique légèrement complexe qui ne fait sans doute pas partie de la philosophie de Sass. Avant d’utiliser une boucle, assurez-vous que cela a un sens et que cela résout effectivement un problème.

### Each

La boucle `@each` est certainement la plus utilisée des trois boucles de Sass. Elle fournit une API propre pour itérer sur une liste ou une map.

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

Lorsque vous effectuez une itération sur une map, utilisez toujours les noms de variables `$key` et `$value` pour renforcer la cohérence.

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

De plus, assurez-vous de respecter ces recommandations qui aideront à préserver la lisibilité :

-   Toujours un saut de ligne avant `@each` ;
-   Toujours un saut de ligne après l’accolade fermante (`}`) sauf si la ligne suivante est une accolade fermante (`}`).

### For

La boucle `@for` peut être utile en lien avec les pseudo-classes CSS `:nth-*`. Mis à part ce scénario, préférez la boucle `@each` pour les itérations.

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

Utilisez toujours `$i` comme nom de variable pour respecter les conventions habituelles, à moins d’avoir une bonne raison de ne pas le faire. N’utilisez jamais le mot-clé `to`, mais toujours le mot-clé `through`. Nombreux sont les développeurs qui ne connaissent pas cette variante Sass.

De plus, assurez-vous de respecter ces recommandations qui aideront à préserver la lisibilité :

-   Toujours un saut de ligne avant `@for` ;
-   Toujours un saut de ligne après l’accolade fermante (`}`) sauf si la ligne suivante est une accolade fermante (`}`).

### While

La boucle `@while` n’a pas de cas d’usage dans les projets Sass réels, surtout parce qu’il n’y a aucun moyen de sortir de la boucle de l’intérieur. **Ne l’utilisez pas**.

## Avertissements et erreurs

S’il est une fonctionnalité de Sass souvent délaissée par les développeurs, c’est sa capacité à retourner dynamiquement des messages d’avertissement et d’erreur. Sass vient en effet avec trois directives permettant d’imprimer un contenu dans le système de sortie standard (CLI, compiling app…) :

-   `@debug`;
-   `@warn`;
-   `@error`.

Mettons `@debug` de côté puisqu’il est clairement prévu pour déboguer SassScript, ce qui n’est pas notre objet ici. Il nous reste `@warn` et `@error` qui sont semblables sauf sur un point : l’un stoppe le compilateur, l’autre non — je suppose que vous savez lequel fait quoi.

Il y a bien des possibilités d’avertissements et d’erreurs dans Sass, n’importe quel mixin ou fonction qui attend un argument ou un type spécifique pourrait envoyer une erreur si quelque chose n’allait pas ou afficher un avertissement lorsque vous faites une hypothèse.

### Avertissements

Prenez par exemple cette fonction de [Sass-MQ](https://github.com/sass-mq/sass-mq) qui essaie de convertir une valeur de `px` à `em` :

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

Si la valeur entrée se trouve être sans unité, la fonction suppose qu’elle est exprimée en pixels. Il est toutefois risqué de le faire sans avertir l’auteur que le logiciel a fait quelque chose qui pourrait être inattendu.

### Erreurs

Contrairement aux avertissements, les erreurs empêchent le compilateur d’aller plus loin. Elles stoppent la compilation et affichent un message pratique pour le débogage. C’est la raison pour laquelle les erreurs ne devraient être envoyées que lorsqu’il est impossible au programme d’aller plus loin. Si possible, essayez de contourner le problème et d’afficher un avertissement à la place.

Par exemple, admettons que vous construisez une fonction _getter_ pour accéder à des valeurs à partir d’une map spécifique. Vous pourriez envoyer une erreur si la clé requise n’existe pas dans la map.

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

Pour plus d’information sur une utilisation efficace de `@error`, cette [introduction à la gestion des erreurs](https://webdesign.tutsplus.com/tutorials/an-introduction-to-error-handling-in-sass--cms-19996) devrait vous aider.

## Outils

Ce qui est bien avec un préprocesseur CSS aussi populaire que Sass est qu’il est accompagné de tout un écosystème de frameworks, plugins, bibliothèques et outils. Après 8 ans d’existence, nous sommes proches du point où [tout ce qui peut être écrit en Sass a été écrit en Sass](https://kittygiraudel.com/2014/10/27/rethinking-atwoods-law/).

Mon conseil toutefois est de restreindre le nombre de dépendances au strict minimum. La gestion des dépendances est un enfer que vous pouvez vous épargner. De plus, il n’y a pas besoin de beaucoup de dépendances avec un langage comme Sass.

### Compass

[Compass](http://compass-style.org/) est le principal [framework Sass](https://www.sitepoint.com/compass-or-bourbon-sass-frameworks/) aujourd’hui. Développé par [Chris Eppstein](https://twitter.com/chriseppstein), l’un des deux concepteurs de Sass, il est encore là pour un bout de temps.

À titre personnel, [je ne l’utilise plus](https://www.sitepoint.com/dont-use-compass-anymore/) car il ralentit considérablement Sass. Ruby Sass en lui-même est déjà assez lent, et l’ajout de code Ruby et Sass supplémentaire n’arrange pas les choses.

En fait, nous n’utilisons qu’une petite partie du framework. Compass est énorme. Les mixins de compatibilité navigateurs ne sont que la partie visible de l’iceberg. Fonctions mathématiques, helpers pour les images, sprites… il y a tant de choses possibles avec ce formidable outil.

Malheureusement, il s’agit pour l’essentiel de _sucre syntactique_ mais pas de fonctionnalités exceptionnelles. Une exception serait la fonctionnalité de construction de sprites, mais [Grunticon](https://github.com/filamentgroup/grunticon) et [Grumpicon](http://grumpicon.com/) font le même travail aussi bien, avec l’avantage d’être pluggables dans le process de déploiement.

Rien n’interdit d’utiliser Compass, je ne le recommande pas toutefois, d’autant qu’il n’est pas compatible avec LibSass (bien que des efforts aient été faits dans cette direction).

Ruby Sass est actuellement en cours d’optimisation. Sont visés en particulier les styles faisant appel à des doses massives de logique, de fonctions et de mixins. Les performances de Compass et des autres frameworks devraient s’en trouver grandement améliorées et ne devraient plus ralentir Sass.

### Systèmes de grilles

Se passer d’un système de grilles n’est pas vraiment une option, maintenant que le Responsive Web Design est partout. Pour donner cohérence et solidité à votre design quelle que soit la taille de l’écran, nous utilisons une grille pour mettre en page les éléments, et quelques brillants esprits ont conçu des grilles réutilisables pour nous éviter d’avoir à coder encore et encore.

Soyons clairs pour commencer : je ne suis pas un grand fan des systèmes de grilles. J’en perçois le potentiel, mais je pense que ce sont souvent des marteaux pour tuer une mouche et qu’ils servent pour l’essentiel à dessiner des colonnes rouges sur fond blanc projetées en diapos dans les conférences de designers nerdy. Quand avez-vous pensé pour la dernière fois _Oh mon dieu, heureusement que j’ai cet outil pour construire ma grille 2-5-3.1-π_ ? C’est vrai, jamais. Parce que dans la plupart des cas, vous voulez simplement utiliser la bonne vieille grille à 12 colonnes.

Si vous utilisez un framework CSS pour votre projet, comme [Bootstrap](https://getbootstrap.com/) ou [Foundation](https://get.foundation/), il y a des chances qu’ils comprennent déjà un système de grilles, auquel cas je vous recommande de l’utiliser pour éviter d’avoir à gérer une dépendance supplémentaire.

Dans le cas contraire, vous serez content de savoir qu’il existe deux gestionnaires de grilles de premier ordre, basé sur Sass : [Susy](https://www.oddbird.net/susy/) et [Singularity](https://github.com/at-import/Singularity). Tous deux font bien plus que ce dont vous aurez jamais besoin, vous pouvez donc choisir celui que vous préférez et être sûr qu’il répondra à vos besoins même les plus complexes. À mon avis, Susy a une communauté plus importante, mais ce n’est jamais que mon opinion.

Vous pouvez également choisir quelque chose de plus simple comme [csswizardry-grids](https://github.com/csswizardry/csswizardry-grids). Au bout du compte, votre choix n’aura pas beaucoup d’impact sur votre style de code, donc c’est vraiment selon vos goûts et besoins.

### SCSS-lint

Il est important de faire l’analyse statique (_lint_) de votre code. Si vous suivez les recommandations d’un guide de style, vous réduirez grandement le nombre d’erreurs mais nul n’est parfait et on peut toujours s’améliorer. On peut donc dire que faire l’analyse statique du code est aussi important que le commenter.

[SCSS-lint](https://github.com/causes/scss-lint) est un outil qui vous aide à conserver des fichiers SCSS propres et lisibles. Il est entièrement personnalisable et facile à intégrer à vos outils de développement.

Par chance, les recommandations de SCSS-lint sont très similaires à celles de ce document. Si vous voulez configurer SCSS-lint selon les recommandations décrites ici, je vous propose la configuration suivante :

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

Si vous n’êtes pas convaincu de la nécessité de SCSS-lint, je vous recommande fortement ces articles : [Clean Up your Sass with SCSS-lint](https://blog.martinhujer.cz/clean-up-your-sass-with-scss-lint/), [Improving Sass code quality on theguardian.com](https://www.theguardian.com/info/developer-blog/2014/may/13/improving-sass-code-quality-on-theguardiancom) et [An Auto-Enforceable SCSS Styleguide](https://davidtheclark.com/scss-lint-styleguide/).

Au cas où vous voudriez intégrer SCSS-lint à votre processus de développement Grunt, il existe un plugin appelé [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint).

De plus, si vous cherchez une application soignée qui fonctionne avec SCSS-lint et autres, les ingénieurs de [Thoughtbot](https://thoughtbot.com/) (Bourbon, Neat…) travaillent sur [Hound](https://houndci.com/).

## Too Long; Didn’t read

Ces règles de conduite sont assez longues, par conséquent il est de bon ton d’avoir une version plus concise. Voici un résumé.

### Principes fondamentaux

-   L’intérêt principal d’un guide de style est la cohérence. Il est normal de ne pas se trouver en accord avec l’intégralité de Sass Guidelines, du moment que la cohérence est maintenue.
-   Il est important de garder le code Sass aussi simple qu’il puisse être et éviter de bâtir des systèmes complexes à moins d’y être contraint.
-   Gardez en tête que bien souvent _KISS_ (Keep It Simple, Stupid) est préférable à _DRY_ (Don’t Repeat Yourself).

### Syntaxe & Formatage

-   Indentation à 2 espaces, pas de tabulations.
-   La longueur des lignes doit être inférieure à 80 caractères autant que faire se peut. N’hésitez pas à diviser les lignes trop longues en plusieurs lignes plus courtes quand cela s’avère nécessaire.
-   Le code CSS doit être écrit de manière propre et évidente, si possible suivant les [CSS Guidelines](https://cssguidelin.es) de Harry Roberts.
-   Les lignes vides ne coûtent rien ; servez-vous en pour séparer les éléments, règles et déclarations.

#### Chaînes De Caractères

-   Déclarer la directive `@charset` en haut de la feuille de styles est fortement encouragé.
-   À moins d’être utilisées comme identifiants CSS, les chaînes de caractères doivent être mises entre guillemets simples. De même pour les URLs.

#### Nombres

-   Sass ne fait pas de distinction entre les nombres, les entiers, les flottants, par conséquent les zéros (0) inutiles après le point sont à éviter. En revanche, les zéros (0) avant le point dans le cas de nombres entre 0 et 1 sont à écrire dans un souci de lisibilité.
-   Une longueur valant zéro (0) ne devrait pas avoir d’unité.
-   Les manipulations d’unités devraient être considérées comme des opérations mathématiques standards, pas comme des manipulations de chaînes de caractères.
-   Afin d’améliorer la lisibilité du code, les calculs doivent être encerclés de parenthèses. De plus, les opérations mathématiques complexes peuvent être éclatées en plusieurs morceaux.
-   Les nombres magiques sont problématiques pour la maintenance du code et doivent être évités coûte que coûte. Quand cela n’est pas possible, pensez à expliquer la valeur douteuse dans un commentaire.

#### Couleurs

-   Les couleurs devraient être exprimées au format HSL si possible, puis RGB et enfin hexadécimal (bas-de-casse et forme raccourcie quand possible). Les mots clés sont à éviter.
-   Préférez `mix(..)` au lieu de `darken(..)` et `lighten(..)` pour éclaircir ou obscurcir une couleur.

#### Listes

-   À moins d’être utilisées comme associations directes avec des valeurs CSS utilisant des listes séparées par des espaces, les listes Sass doivent être séparées par des virgules.
-   Entourer les listes avec des parenthèses doit être considéré pour faciliter la lecture.
-   Les listes mises sur une ligne unique n’ont pas de virgule finale, mais les listes s’étendant sur plusieurs lignes en ont.

#### Maps

-   Les maps contenant au moins deux paires sont écrites sur plusieurs lignes.
-   Pour faciliter la maintenance, la dernière paire d’une map doit avoir une virgule finale.
-   Les clés d’une map qui se trouvent être des chaînes de caractères doivent être mises entre guillemets, comme toutes les autres chaînes.

#### Ordre des déclarations

-   Le système utilisé pour déterminer l’ordre des déclarations (alphabétique, par type, etc.) importe peu du moment qu’il est cohérent et utilisé partout.

#### Imbrication des sélecteurs

-   Évitez l’imbrication des sélecteurs quand elle n’est pas nécessaire (ce qui représente la majorité des cas).
-   Utilisez l’imbrication des sélecteurs pour les pseudo-classes et les pseudo-éléments.
-   Les media queries peuvent également être imbriquées dans le sélecteur auquel elles se rattachent.

### Conventions de nommage

-   Il est préférable de s’en tenir aux conventions de nommage de CSS qui sont (à l’exception de quelques erreurs) bas-de-casse et séparation par un tiret

-   CSS est un langage délicat ; n’hésitez pas à écrire des commentaires approfondis pour expliquer toute chose qui paraît douteuse.
-   Pour les variables, fonctions, mixins et placeholders constituant une API publique, utilisez les commentaires de SassDoc.

### Variables

-   Utilisez le flag `!default` pour toute variable faisant partie d’une API publique pouvant être changée sans crainte.
-   N’utilisez pas le flag `!global` à la racine car il est possible que cela constitue une violation de la syntaxe Sass à l’avenir.

### Extend

-   Contentez-vous d’étendre des placeholders et évitez d’étendre les sélecteurs CSS existants.
-   Étendez un même placeholder aussi peu que possible afin d’éviter les effets de bord.
