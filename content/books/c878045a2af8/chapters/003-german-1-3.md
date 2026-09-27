## Über den Autor

Mein Name ist Kitty, ich bin ein Front-End Entwickler aus Frankreich, lebe seit 2015 in Berlin (Deutschland) und arbeite derzeit bei [Cofenster](https://www.cofenster.com).

Seit mehreren Jahren entwickle ich nun in Sass und bin Autor vieler Sass bezogener Projekte wie [SassDoc](http://sassdoc.com), SitePoint Sass Reference und [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/). Falls du an weiteren Beiträgen zur Sass Community meinerseits interessiert bist, werf doch einen Blick auf [diese Liste](http://github.com/KittyGiraudel/awesome-sass).

Außerdem habe ich das Buch (Französisch) [CSS3 Pratique du Design Web](https://www.amazon.fr/dp/2212140231) (_Eyrolles_ Edition), sowie ein Buch über Sass (Englisch) namens [Jump Start Sass](https://learnable.com/books/jump-start-sass) (_Learnable_ Edition) verfasst.

[Folg mir auf Twitter](https://twitter.com/KittyGiraudel)

## Mitwirken

Sass Guidelines ist ein freies Projekt welches ich in meiner Freizeit entwickle. Es ist daher recht großer Aufwand alles aktuell, dokumentiert und logisch zu halten. Glücklicherweise wird mir von vielen großartigen Mitwirkenden geholfen; besonders wenn es um die Pfleger der dutzend [verschiedenen Übersetzungen](#options-panel) geht. Also dankt Ihnen!

Falls du also Lust hast mitzuwirken, ist selbst ein Tweet, es weiterzusagen oder nur einen Schreibfehler zu korrigieren wirklich großartig! Das kannst du unter anderem durchs erstellen eines Bugreport oder Pull-Request im [GitHub Repository](https://github.com/KittyGiraudel/sass-guidelines).

Doch bevor wir starten: falls dir die Guidelines gefallen, sie nützlich für dich oder dein Team sind, würde ich mich wirklich freuen wenn du es unterstützt, sodass ich auch weiterhin daran arbeiten kann!

[Sass Guidelines unterstützen](https://gum.co/sass-guidelines) [Weitersagen](https://twitter.com/share?text=Sass+Guidelines%2C+An+opinionated+styleguide+for+writing+sane%2C+maintainable+and+scalable+Sass+by+%40KittyGiraudel+%E2%80%93&url=https://sass-guidelin.es)

## Über Sass

In Ihrer [Dokumentation](https://sass-lang.com/documentation/file.SASS_REFERENCE.html) beschreibt sich [Sass](https://sass-lang.com) als:

> \[…\] eine Erweiterung von CSS, welche Leistung und Eleganz zur ursprünglichen Sprache hinzufügt.

Das ultimative Ziel von Sass ist es, die Fehler von CSS zu beheben. Denn wir wissen ja alle, dass CSS wirklich nicht die beste Sprache der Welt ist \[Zitat benötigt\]. Sie ist zwar sehr einfach zu lernen, kann aber, gerade in großen Projekten, sehr schnell unübersichtlich werden.

Hier kommt Sass als Meta-Sprache hinzu, um die Syntax von CSS zu verbessern und nützliche Features sowie Extras hinzuzufügen. Trotz dessen möchte Sass aber konservativ gegenüber CSS bleiben.

Es geht nämlich nicht darum CSS in eine Programmiersprache voller Features umzuändern. Sass möchte lediglich da helfen wo CSS versagt. Deshalb ist Sass zu erlernen auch nicht schwieriger als CSS; es fügt einfach nur ein paar extra Features oben drauf.

Von daher gibt es gleichzeitig viele verschiedene Möglichkeiten diese Features einzusetzen. Manche sind gut, manche schlecht und andere wiederum unüblich. Die Absicht dieser Guidelines ist es einen konsistenten und dokumentierten Ansatz zu bieten um Sass zu schreiben.

### Ruby Sass oder LibSass

[Sass’ erster Commit](https://github.com/hcatlin/sass/commit/fa5048ba405619273e474a50400c7243fbff54fe) war Ende 2006, mittlerweile fast 10 Jahre zurück. Unnötig zu erwähnen das es seither einen langen Weg gegangen ist. Ursprünglich in Ruby entwickelt, wurde es bereits mehrmals in andere Sprachen übertragen; die erfolgreichste davon ist [LibSass](https://webdesign.tutsplus.com/articles/getting-to-know-libsass--cms-23114) (geschrieben in C/C++), welches nun nah dran ist vollständig Kompatibel mit der originalen Ruby version zu sein.

2014 haben sich die Teams von [Ruby Sass und LibSass dazu entschieden, zu warten, bis beide auf demselben Stand sind bevor es mit der Entwicklung weitergeht](https://github.com/sass/libsass/wiki/The-LibSass-Compatibility-Plan). Seither veröffentlicht LibSass regelmäßig neue Release Versionen. Die noch ausstehenden Features sind von mir unter durch das [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/) Projekt gesammelt und aufgelistet. Falls dir noch Ungleichheiten auffallen, die ich nicht aufgelistet habe, sei doch so nett und teil es mir mit.

Zurück zum Compiler. Eigentlich hängt es komplett von deinem Projekt ab. Wenn es ein Ruby on Rails Projekt ist, solltest du besser Ruby Sass benutzen da es genau darauf ausgerichtet ist. Ruby Sass wird außerdem immer die Referenzimplementation sein und LibSass in Sachen Features leiten. Und falls du danach schaust von Ruby Sass zu LibSass zu wechseln, ist [dieser Artikel](https://www.sitepoint.com/switching-ruby-sass-libsass/) etwas für dich.

In Nicht-Ruby Projekten welche einen speziellen Workflow brauchen, ist LibSass die bessere Wahl. Wenn du also, sagen wir Node.js, benutzen möchtest dann wäre [node-sass](https://github.com/sass/node-sass) deine Wahl.

### Sass oder SCSS

Es gibt eine relativ große Verwirrung über die Semantik des Wortes _Sass_. Aus gutem Grund: Sass steht für den Präprozessor selbst und die eigene Syntax. Nicht wirklich praktisch, oder?

Ursprünglich beschrieb Sass die Syntax, dessen Charakteristika in der Bedeutung von Einrückung lag. Doch relativ schnell haben sich die Entwickler von Sass dazu entschieden, die Lücke zwischen Sass und CSS zu schließen indem sie die CSS freundliche Syntax _SCSS_ (für _Sassy CSS_) eingeführt haben. Das Motto: wenn es valides CSS ist, ist es valides SCSS.

Seitdem bietet Sass (der Präprozessor) [zwei verschiedene Syntaxen](https://www.sitepoint.com/whats-difference-sass-scss/) an: Sass ([nicht in Großbuchstaben](http://sassnotsass.com)), auch bekannt unter der _vorgesehenen Syntax_, und SCSS. Welche du benutzt, ist komplett dir überlassen. Beide haben dieselben Features und es ist wirklich nur eine Frage der Ästhetik.

Sass’ Leerzeichenempfindliche Syntax beruht auf Einrückung um geschweifte Klammern, Semikolons und andere Zeichensetzung entfernen zu können. Das führt zu einer schlankeren und kürzeren Syntax. Währenddessen ist SCSS einfacher zu erlernen, da es überwiegend nur Kleinigkeiten zu CSS hinzufügt.

Ich selber ziehe SCSS gegenüber Sass vor, weil es näher an CSS liegt und freundlicher für die meisten Entwickler ist. Von daher wird SCSS auch der Standard in den gesamten Guidelines sein. Du kannst jedoch zur Sass Syntax in den wechseln.

### Andere Präprozessoren

Sass ist nur ein Präprozessor unter vielen. Sein größter Mitstreiter ist [Less](http://lesscss.org/), ein auf Node.js basierender Präprozessor welcher durch das CSS Framework [Bootstrap](https://getbootstrap.com/) (bis zur Version 4) bekannt wurde. Es gibt außerdem noch Stylus, ein sehr toleranter und flexibler Präprozessor welcher jedoch etwas schwieriger zu benutzen ist mit einer kleineren Community.

_Warum sollte ich Sass, irgendeinem anderen Präprozessor vorziehen?_ ist auch heute immernoch eine gute Frage. Es ist noch garnicht solange her, dass wir Sass für Ruby basierte Projekte empfohlen haben weil es in Ruby entwickelt wurde und sich gut mit Ruby on Rails gemacht hat. Jetzt wo LibSass nahezu aufgeholt hat, ist das kein relevanter Ratschlag mehr.

Was ich an Sass mag ist sein konservativer Ansatz zu CSS. Das Design von Sass ist stark auf folgende Prinzipien aufgebaut: die meisten Entscheidungen folgen dem Glauben des Kernteams dass a) extra Features hinzufügen sich auf die Komplexität auswirkt und von daher durch den Nutzen gerechtfertigt sein muss, und b) es einfach und logisch sein sollte über einen Block von Styles zu schauen. Außerdem hat Sass eine viel schärfere Aufmerksamkeit fürs Detail als andere Präprozessoren. So weit ich sagen kann, kümmern sich die Hauptentwickler wirklich darum jeden Sonderfall im CSS zu unterstützen und sicherzustellen das jedes generelle Verhalten konsistent ist. In anderen Worten, Sass ist Software die wirkliche Probleme lösen, und helfen möchte nützliche Funktionalität anzubieten da wo CSS versagt.

Präprozessoren mal zur Seite gestellt, sollten wir auch über Postprozessortools wie [PostCSS](https://github.com/postcss/postcss) und [cssnext](https://cssnext.github.io/) sprechen, welche eine große Aufmerksamkeit in den letzten Monaten erhalten haben.

PostCSS wird gewöhnlicher- und inkorrekterweise als “Postprozessor” angesehen. Die Annahme, zusammen mit dem unglücklichen Namen, ist, dass PostCSS über CSS parsed welches bereits von einem Präprozessor bearbeitet wurde. Das kann zwar so funktionieren, ist aber nicht die Anforderung. Von daher ist PostCSS eigentlich ein “Prozessor”.

Dadurch kannst du “tokens” aus deinem Stylesheet (wie Selektoren, Eigenschaften und Werte) mit JavaScript verarbeiten, um Operationen jeglicher Art auszuführen, welche dann wieder zu CSS kompilieren. [Autoprefixer](https://github.com/postcss/autoprefixer), die beliebte Prefixing-Bibliothek, ist zum Beispiel mit PostCSS gebaut. Es parst jede Regel um zu sehen ob Vendor-Prefixe benötigt werden, indem es das Browser-Support-Tool [CanIUse](https://caniuse.com) referenziert. Es entfernt oder fügt dann dementsprechend die Vendor-Prefixe hinzu.

Das ist unglaublich mächtig und großartig um Libraries, die mit irgendeinen Präprozessor (genauso wie Vanilla-CSS) zusammen arbeiten, zu bauen. Jedoch ist PostCSS nicht einfach zu benutzen. Du musst ein bisschen JavaScript können um überhaupt irgendwas damit zu bauen, und dazu kann die API noch verwirrend sein. Während Sass lediglich Features bereitstellt die nützlich sind um CSS zu schreiben, besitzt PostCSS direkten Zugriff auf den CSS AST (_abstract syntax tree_, oder abstrakter _Syntaxbaum_) und JavaScript.

Um es um kurz zu halten, Sass ist einigermaßen einfach und wird die meisten deiner Probleme lösen. Auf der anderen Seiten kann PostCSS schwierig sein (falls du nicht all zu gut in JavaScript bist), sich aber als extrem mächtig herausstellen. Es gibt keinen Grund weshalb du beides nicht nutzen solltest oder könntest. Tatsächlich bietet PostCSS sogar einen offiziellen SCSS-Parser genau dafür an.

Danke an [Cory Simmons](https://github.com/corysimmons) für seine Erfahrung und Hilfe zu dieser Sektion.

## Einleitung

### Warum ein Styleguide

Ein Styleguide ist nicht nur einfach ein schönes Dokument um darzustellen wie dein Code idealerweise aussehen sollte, sondern er ist essenziell für das Projekt, um zu beschreiben weshalb und wie Code geschrieben werden sollte. Zwar sieht es in kleinen Projekten etwas nach Overkill aus, zahlt sich am Ende aber in Sachen Skalierbarkeit, Wartbarkeit und einer sauberen Codebasis aus.

Deshalb gilt, je mehr Entwickler an einem Projekt arbeiten, desto wichtiger sind Guidelines. Und je größer das Projekt, desto notwendiger ist ein Styleguide.

[Harry Roberts](https://csswizardry.com) hat es in seinen [CSS Guidelines](https://cssguidelin.es/#the-importance-of-a-styleguide) bereits gut erklärt:

> Ein Code Styleguide (kein visueller) ist ein wertvolles Werkzeug für Teams die:
> 
> -   ein Produkt über eine gewisse Zeit lang bauen und warten;
> -   Entwickler mit unterschiedlichen Fähigkeiten und Spezialisierungen haben;
> -   eine gewisse Anzahl von unterschiedlichen Entwicklern auf einem Produkt arbeiten haben;
> -   regelmäßig neue Mitarbeiter onboarden;
> -   mehrere Codebasen haben, indem Entwickler hin und herspringen;

### Disclaimer

Zu aller erst: **das ist kein CSS Styleguide**. Hier werden keine Namenskonventionen für CSS Klassen, Modulare Patterns oder die Frage der ID’s im CSS diskutiert. Diese Guidelines fokussieren sich lediglich auf Sass spezifischen Inhalt.

Dazu ist dieser Styleguide mein eigener und von daher **stark meinungsbasiert**. Es ist eher eine Auswahl von Methodologien und Ratschlägen die ich über die Jahre verfeinert und weitergegeben habe. Es gibt mir ebenfalls die Möglichkeit auf interessante und aufschlussreiche Quellen zu verlinken. Also nicht die _weiteren Informationen_ verpassen.

Natürlich ist das hier nicht der einzige Weg das Thema anzugehen und es mag auch garnicht auf dein Projekt passen. Deshalb fühl dich frei einfach die Inhalte die dir am besten passen zu übernehmen.

### Grundprinzipien

Am Ende des Tages, möchte ich lediglich dass du eine Sache für dich mitnimmst: dass [**Sass so einfach wie möglich gehalten werden sollte**](https://www.sitepoint.com/keep-sass-simple/).

Dank meiner dummen Experimente wie [Binäre Operatoren](https://github.com/KittyGiraudel/SassyBitwise), [Iteratoren und Generatoren](https://github.com/KittyGiraudel/SassyIteratorsGenerators) sowie [einem JSON Parser](https://github.com/KittyGiraudel/SassyJSON) in Sass, können wir gut sehen was Sass als Präprozessor alles drauf hat.

CSS ist eine einfache Sprache. Da Sass beabsichtigt CSS zu schreiben, sollte es niemals komplexer als normales CSS werden. Das [KISS Prinzip](https://de.wikipedia.org/wiki/KISS-Prinzip) (Keep it simple, stupid) ist in diesem Fall der Schlüssel, und hat unter gewissen Umständen sogar vorrang über [DRY](https://de.wikipedia.org/wiki/Don%E2%80%99t_repeat_yourself) (Don’t repeat yourself).

Manchmal ist es besser sich etwas im Code zu wiederholen um es wartbar zu halten, anstatt ein schwerfälliges und unnötig kompliziertes System zu haben welches komplett unwartbar ist.

Um noch einmal [Harry Roberts](https://csswizardry.com) zu zitieren, **Pragmatimus geht vor Perfektion**. Ab einem gewissen Punkt wirst du dich wahrscheinlich selbst dabei erwischen wie du diese Regeln ignorierst. Wenn es Sinn macht und sich richtig anfühlt, dann tu es. Code ist ein Mittel zum Zweck, kein Ende.

### Erweiterung dieser Guidelines

Ein großer Teil dieses Styleguide ist stark meinungsbasiert. Ich lese und schreibe Sass nun seit einigen Jahren, bis zu dem Punkt wo ich eine Menge Prinzipien übers Schreiben von sauberen Stylesheets habe. Ich verstehe natürlich, dass es wohlmöglich einigen nicht zufrieden stellt weder passen wird. Und das ist absolut normal.

Dennoch glaube Ich dass dieser Styleguide dazu gemacht ist erweitert zu werden. Sass-Guidelines zu erweitern kann so einfach sein wie ein Dokument zu haben, indem erklärt wird das der folgende Code diesen Guidelines bis auf wenige Ausnahmen (in diesem Fall würden diese dann einfach unterhalb aufgeführt werden) folgt.

Ein Beispiel einer Erweiterung der Styleguide kann in dem [SassDoc Repository](https://github.com/SassDoc/sassdoc/blob/master/GUIDELINES.md) gefunden werden:

> Dies ist einer Erweiterung zu den [Node Styleguides](https://github.com/felixge/node-style-guide) von Felix Geisendörfer. Alles aus diesem Dokument überschreibt was in den Node Styleguides definiert sein könnte.

## Syntax & Formatierung

Wenn du mich fragst, sollte dass erste sein was ein Styleguide definiert, die Art und Weise wie der Code aussehen soll.

Wenn mehrere Entwickler in einem Projekt CSS schreiben, ist es nur eine Frage der Zeit bis einer anfängt etwas so zu machen wie er es für gut hält. Konsistente Code Guidelines verhindern dies nicht nur, sondern helfen auch wenn es darum geht den Code zu lesen und zu aktualisieren.

Grob gesehen wollen wir (schamlos inspiriert bei [CSS Guidelines](https://cssguidelin.es/#syntax-and-formatting)):

-   zwei (2) Spaces einrücken, keine Tabs;
-   idealerweise 80-Buchstaben lange Zeilen;
-   ordentlich geschriebene, mehrzeilige CSS Regeln;
-   sinnvoller Gebrauch von Leerzeichen.

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
// Seit Sass' vorgesehene Syntax diese Standards erzwingt
// gibt es keinen falschen Weg weiterzumachen
.foo
  display: block
  overflow: hidden
  padding: 0 1em
```

### Strings

Ob du es glaubst oder nicht, Strings spielen eine große Rolle in CSS und Sass. Die meisten Werte in CSS sind entweder Zahlen oder Identifikatoren. Deshalb ist es wichtig sich an gewisse Guidelines zu halten, wenn Strings in Sass verwendet werden.

#### Encoding

Um potentielle Probleme in der Zeichenkodierung zu vermeiden, empfehle ich [UTF-8](https://de.wikipedia.org/wiki/UTF-8) durch die `@charset` Regel im [Main Stylesheet](#main-datei) zu erzwingen. Versicher dich, dass es die allererste Regel in deinem Stylesheet ist, und nichts davor kommt.

```
@charset 'utf-8';
```

```
@charset 'utf-8'
```

#### Anführungszeichen

CSS setzt nicht voraus dass Strings in Anführungszeichen zu setzen sind, nichtmal jene die Leerzeichen beinhalten. Zum Beispiel font-family: für den CSS Parser ist es vollkommen egal ob du die Namen in Anführunsgzeichen setzt oder nicht.

Deshalb ist es in Sass _ebenfalls_ nicht nötig. Noch besser (und _zum Glück_, wie du zugeben musst), ein String in Anführungszeichen ist exakt identisch gegenüber einem String ohne (z.B. `'abc'` ist exakt gleich zu `abc`).

Im übrigen sind Sprachen die es nicht erfordern Strings in Anführungszeichen zu setzen eine Minderheit, deshalb **sollten Strings in Sass immer in einfachen Anführungszeichen (`'`) gesetzt werden** (sie sind einfacher zu tippen als die normalen auf einer _QWERTY_ Tastatur). Neben der Einheitlichkeit zu anderen Sprachen, einschließlich CSS’ Cousin JavaScript, gibt es mehrere Gründe dafür:

-   Farbnamen werden wie Farben interpretiert wenn sie in Anführungszeichen gesetzt sind, was zu ernsthaften Problemen führen kann;
-   die meisten Syntax-Highlighter bekommen Probleme mit Strings die nicht in Anführungszeichen stehen;
-   es unterstützt die generelle Lesbarkeit;
-   es gibt keinen wirklichen Grund es nicht zu tun.

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

Laut CSS Spezifikation, muss die `@charset` Regel mit doppelten Anführungszeichen deklariert werden um [valide](https://www.w3.org/TR/css3-syntax/#charset-rule) zu sein. Wie auch immer, Sass kümmert sich bereits darum wenn es CSS kompiliert, deswegen wird es kaum eine Auswirkung auf das Endergebnis haben. Deshalb kannst du ohne Probleme bei einfachen Anführungszeichen bleiben, selbst bei `@charset`.

#### Strings als CSS Werte

Bestimmte CSS Werte (Identifikatoren) wie `initial` oder `sans-serif` müssen nicht in Anführungszeichen stehen. Tatsächlich wird CSS unbemerkt versagen, wenn `font-family: 'sans-serif'` benutzt wird, da es einen Identifier erwartet und keinen String. Deshalb setzen wir diese Werte nicht in Anführungszeichen.

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

Deshalb können wir zwischen Strings die wie im vorigen Beispiel als CSS Werte (CSS Identifier) vorgesehen sind, und Strings die sich in Sass auf Datentypen wie beispielsweise Map Keys beziehen, unterscheiden.

Wir setzen ersteres nicht in Anführungszeichen, aber letzteres in einfache.

#### Strings die Anführungszeichen beinhalten

Wenn ein String mehrere einfache Anführungszeichen beinhaltet, mag man drüber nachdenken diese in doppelte (`"`) zu setzen, um zu vermeiden Zeichen escapen zu müssen.

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

URLs sollten aus denselben Gründen wie oben in Anführungszeichen gesetzt werden:

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

### Zahlen

In Sass sind Zahlen ein Datentyp der alles von einheitlosen Zahlen über Längen, Dauer, Frequenzen, Winkel und so weiter, beinhalten kann. Das erlaubt es dementsprechende Berechnung zu machen.

#### Nullen

Zahlen sollten immer eine Null vor dezimalen Werten, die weniger als eins sind, anzeigen. Eine Null niemals hinten anhängen.

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

In Sublime Text und anderen Editoren welche suchen und ersetzen mittels regulären Ausdrücken unterstützen, ist es ziemlich einfach eine Null zu einer Gleitkommazahl (wenn nicht zu allen) hinzuzufügen. Ersetze `\s+\.(\d+)` einfach mit `\ 0.$1`. Vergiss nicht das Leerzeichen vor der `0`.

#### Einheiten

Wenn es um Längen geht, sollte eine `0` niemals eine weitere Einheit besitzen.

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

Diese Praktik sollte nur bei Längen angewandt werden. Eine einheitenlose Null für Zeiteneinheiten wie `transition-delay` ist nicht erlaubt. Falls eine einheitenlose Null für eine Zeitdauer spezifiziert ist, sollte die Deklaration theoretischerweise als invalide erachtet und verworfen werden. Nicht alle Browser sind so strikt, aber manche. Langer Rede kurzer Sinn: Einheiten nur bei Längen weglassen.

Der häufigste Fehler den ich mir bei Zahlen in Sass vorstellen kann, ist der Gedanke dass Einheiten einfach nur ein String sind, die man sicher zu jeder Zahl hinzufügen kann. Das klingt zwar richtig, ist aber nicht wie Einheiten funktionieren. Stell dir eine Einheit als ein algebraisches Symbol vor. Zum Beispiel in der echten Welt, ist 5 Zoll multipliziert mit 5 Zoll gleich 25 Quadratzoll. Nach derselben Logik geht Sass.

Um eine Einheit zu einer Zahl hinzuzufügen, musst du diese Zahl mit _einer Einheit_ multiplizieren.

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

Einen _0 Wert der Einheit_ hinzuzufügen funktioniert ebenfalls, aber ich empfehle eher die obrige Methode da es sonst etwas verwirrend ist. Wenn du versuchst eine Zahl in eine andere kompatible Einheit zu konvertieren, wird 0 hinzuzufügen nicht klappen. Mehr dazu [in diesem Artikel](https://css-tricks.com/snippets/sass/correctly-adding-unit-number/).

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

Am Ende kommt es wirklich darauf an was du erreichen möchtest. Versuch dich einfach daran zu erinnern, das eine Einheit als String hinzuzufügen kein guter Weg ist fortzufahren.

Um die Einheit von einem Wert zu entfernen, musst du es um _eine Einheit seiner Art_ teilen.

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

Eine Einheit als String zu einer Zahl hinzuzufügen, macht sie zu einem String. Dadurch sind alle weiteren Operationen mit dem Wert nicht mehr möglich. Den numerischen Teil einer Einheit zu trennen, führt ebenfalls zu einem String. Das ist nicht was du willst. [Benutze Längen, keine Strings](https://kittygiraudel.com/2013/09/03/use-lengths-not-strings/).

#### Berechnungen

**Numerische Berechnungen auf höchser Ebene sollten immer in Klammern stehen**. Es erhöht nicht nur enorm die Lesbarkeit, sondern umgeht auch Edge Cases indem Sass gezwungen wird den Inhalt von Klammern zu erst zu berechnen.

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

#### Magische Zahlen

“Magische Zahlen” sind in der [Old School Programmierung](https://de.wikipedia.org/wiki/Magische_Zahl_\(Informatik\)#Magische_Zahlen_in_Code) ein Term dafür, _Werte direkt im Quellcode zu benutzen_. Grundsätzlich erklärt, ist es eine zufällige Zahl die _einfach funktioniert_™ ohne an irgendeine logische Begründung gebunden zu sein.

**Magische Zahlen sind schlechter Programmierstil und sollten unter allen Umständen vermieden werden**. Falls du mal keine gute Erklärung finden kannst, weshalb eine Zahl funktioniert, dann füg ein ausführlichen Kommentar hinzu der erklärt wie du dahin gekommen bist und weshalb du denkst dass es funktioniert. Zuzugeben dass du nicht weißt weshalb etwas funktioniert, ist manchmal hilfreicher für den nächsten Entwickler als wenn er komplett von Anfang herausfinden muss was passiert.

```
/**
 * 1. Magische Zahl. Das ist der niedrigste Wert den ich finden konnte,
 * um die Höhe von `.foo` zu seinem Elternelement auszurichten.
 * Idealerweise sollten wir das beheben.
 */
.foo {
  top: 0.327em; /* 1 */
}
```

```
/**
 * 1. Magische Zahl. Das ist der niedrigste Wert den ich finden konnte,
 * um die Höhe von `.foo` zu seinem Elternelement auszurichten.
 * Idealerweise sollten wir das beheben.
 */
.foo
  top: 0.327em /* 1 */
```

Zu dem Thema hat CSS-Tricks einen [hervoragenden Artikel](https://css-tricks.com/magic-numbers-in-css/) über magische Zahlen in CSS den ich dir nur empfehlen kann.

### Farben

Farben nehmen einen wichtigen Platz in der CSS Sprache ein. Normalerweise ist Sass ein wertvoller Verbündeter wenn es darum geht Farben zu manipulieren. Meistens dadurch [mächtige Funktionen](https://sass-lang.com/documentation/Sass/Script/Functions.html) bereit zu stellen.

Sass ist so nützlich Farben zu manipulieren dass das Internet voller Artikel über das Thema aufblüht. Lass mich ein paar Artikel empfehlen:

-   [How to Programmatically Go From One Color to Another](https://kittygiraudel.com/2014/01/30/programmatically-go-from-one-color-to-another-with-sass/)
-   [Using Sass to Build Color Palettes](https://www.sitepoint.com/using-sass-build-color-palettes/)
-   [Dealing with Color Schemes in Sass](https://www.sitepoint.com/dealing-color-schemes-sass/)

#### Farbformate

Um Farben so einfach wie sie sind zu lassen, ist mein Ratschlag folgende Reihenfolge bei Farbformaten zu respektieren:

1.  [HSL-Farbraum](https://de.wikipedia.org/wiki/HSV-Farbraum);
2.  [RGB-Farbraum](https://de.wikipedia.org/wiki/RGB-Farbraum);
3.  Hexadezimale Darstellung (Kleinbuchstaben und gekürzt).

CSS Farbkeywords sollten nur für schnelles Prototyping verwendet werden. Es sind zwar englische Wörter, jedoch haben manche eine wirklich schlechte Beschreibung der Farbe die sie repräsentieren, was vor allem für nicht englischsprachige ein Problem sein kann. Darüber hinaus sind Keywords nicht perfekt semantisch; zum Beispiel ist `grey` in Wirklichkeit dunkler als `darkgrey` und die Verwirrung zwischen `grey` und `gray` kann zu inkonsistenter Verwendung der Farbe führen.

Der HSL-Farbraum ist nicht nur am einfachsten für das menschliche Gehirn zu verstehen\[Zitat benötigt\], sondern er macht es außerdem ziemlich leicht für Stylesheet-Autoren Farben durchs anpassen des Farbton, der Sättigung und Helligkeit zu optimieren.

RGB hingegen hat immernoch den Vorteil direkt zu zeigen ob eine Farbe mehr in Richtung Blau, Grün oder Rot geht. Es ist jedoch nicht einfach eine Farbe aus den drei Komponenten zu erstellen.

Zuletzt, Hexadezimale Darstellung ist schwer lesbar für das menschliche Gedächtnis.

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

Wenn der HSL oder RGB-Farbaum verwendet wird, füge immer ein Leerzeichen nach dem Komma (`,`) hinzu, und keines zwischen Klammern und Inhalt (`(`, `)`).

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

#### Farben und Variablen

Wenn du eine Farbe mehr als einmal verwendest, speicher sie in einer sinnvoll benannten Variable.

```
$sass-pink: hsl(330, 50%, 60%);
```

```
$sass-pink: hsl(330, 50%, 60%)
```

Nun kannst du die Variable überall verwenden wo du willst. Wenn du aber stark an ein Theme gebunden bist, würde ich gegen diese Nutzung von Variablen argumentieren. Stattdessen, speicher die Variable in einer weiteren wo der Name erklärt wie sie eingesetzt werden soll.

```
$main-theme-color: $sass-pink;
```

```
$main-theme-color: $sass-pink
```

Dadurch verhinderst du auch bei einem Themewechsel etwas wie `$sass-pink: blue` machen zu müssen. [Dieser Artikel](https://davidwalsh.name/sass-color-variables-dont-suck) erledigt einen guten Job darin zu erklären weshalb es wichtig ist deine Farbvariablen durchzudenken.

#### Farben aufhellen und verdunkeln

Beide [`lighten`](https://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method) und [`darken`](https://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method) Funktionen manipulieren die Helligkeit einer Farbe im HSL-Farbraum durch hinzufügen oder entfernen von Helligkeit. Grundsätzlich sind sie nicht als Pseudonyme für den `$lightness` Parameter der [`adjust-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#adjust_color-instance_method) Funktion.

Das Ding ist, dass solche Funktionen oft nicht das erwartete Ergebnis liefern. Auf der anderen Seite ist die [`mix`](https://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method) Funktion ein netter Weg um eine Farbe durchs mischen mit `white` oder `black` aufzuhellen oder zu verdunkeln.

Der Vorteil von `mix` ist weder die oben genannten Funktionen, sondern dass es stufenweise ins Schwarz (oder Weiß) geht, je nachdem wie du das Verhältnis der Farbe verringerst. Wobei `darken` und `lighten` relativ schnell die Farbe ins Schwarz oder Weiß ausbleichen.

  

Illustration der Unterschiede von `lighten`/`darken` und `mix` von [KatieK](https://codepen.io/KatieK2/pen/tejhz/)

Wenn du nicht jedesmal die `mix` Funktion schreiben möchtest, kannst du dir auch zwei einfach zu verwendene Funktionen namens `tint` und `shade` (welche ebenfalls zu [Compass](http://compass-style.org/reference/compass/helpers/colors/#shade) dazu gehören) schreiben, um genau dasselbe zu erreichen:

```
/// Hellt eine Farbe leicht auf
/// @access public
/// @param {Color} $color - zu färbende Farbe
/// @param {Number} $percentage - Prozent von `$color` welcher die Farbe wiedergegeben werden soll
/// @return {Color}
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}

/// Verdunkelt eine Farbe leicht
/// @access public
/// @param {Color} $color - zu verdunkelnde Farbe
/// @param {Number} $percentage - Prozent von `$color` welcher die Farbe wiedergegeben werden soll
/// @return {Color}
@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}
```

```
/// Hellt eine Farbe leicht auf
/// @access public
/// @param {Color} $color - zu färbende Farbe
/// @param {Number} $percentage - Prozent von `$color` welcher die Farbe wiedergegeben werden soll
/// @return {Color}
@function tint($color, $percentage)
  @return mix($color, white, $percentage)

/// Verdunkelt eine Farbe leicht
/// @access public
/// @param {Color} $color - zu verdunkelnde Farbe
/// @param {Number} $percentage - Prozent von `$color` welcher die Farbe wiedergegeben werden soll
/// @return {Color}
@function shade($color, $percentage)
  @return mix($color, black, $percentage)
```

Die [`scale-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method) Funktion ist entworfen worden, um Werte flüssiger zu skalieren indem sie berücksichtigt wie hell oder dunkel sie bereits sind. Sie sollte Ergebnisse liefern, die genauso gut wie `mix` sind, aber mit einer eindeutigeren Aufrufkonvention. Der Skalierfaktor ist dennoch nicht derselbe.

### Listen

Listen sind Sass’ äquivalent zu Arrays. Eine Liste ist eine flache Datenstruktur (anders als [Maps](#maps)), vorgesehen um Werte jeden Typs (einschließlich Listen, was zu verschachtelten Listen führt) zu speichern.

Listen sollten folgende Guidelines beachten:

-   entweder einzeilig oder mehrzeilig;
-   auf jedenfall mehrzeilig wenn sie mehr als 80 Zeichen beinhalten;
-   es sei denn sie sind für CSS Zwecke verwendet, immer mit einem Komma getrennt;
-   immer in Klammern;
-   ein abschließendes Komma wenn mehrzeilig, keines wenn einzeilig.

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

Wenn neue Inhalte zu einer Liste hinzugefügt werden sollen, dann verwende immer die vorgesehene API. Füg sie nicht manuell hinzu.

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

**Weitere Informationen:**

+In [diesem Artikel](https://kittygiraudel.com/2013/07/15/understanding-sass-lists/) gehe ich durch eine Menge Tipps und Tricks wie man Listen in Sass korrekt benutzt und manipuliert.

### Maps

Mit Sass können Stylesheet Autoren sogenannte Maps definieren — der Sass Term für assoziative Arrays, Hashes oder sogar JavaScript Objects. Eine Map ist eine Datenstruktur welche Keys mit Werten vereinigt. Keys und Werte können von jedem Typ, einschließlich Maps, sein. Ich empfehle aber nicht solch komplexe Datentypen als Map-Keys zu verwenden, nur weil es möglich ist.

Maps sollten folgendermaßen geschrieben werden:

-   Leerzeichen nach Doppelpunkt (`:`);
-   öffnende Klammer (`(`) auf derselben Zeile wie der Doppelpunkt (`:`);
-   **Keys in Anführungszeichen** wenn sie Strings sind (was zu 99% der Fall ist);
-   jedes Key/Value Paar auf eine neue Zeile;
-   Komma (`,`) ans Ende von jedem Key/Value;
-   **abschließendes Komma** (`,`) ans letzte Element um das hinzufügen, entfernen oder neuordnen einfacher zu machen;
-   schließende Klammer (`)`) auf eine neue Zeile;
-   kein Leerzeichen oder neue Zeile zwischen schließender Klammer (`)`) und Semikolon (`;`)

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

Artikel über Sass Maps zeigen wie lang ersehnt dieses Feature war. Ich kann diese 3 Artikel empfehlen: [Using Sass Maps](https://www.sitepoint.com/using-sass-maps/), [Extra Map functions in Sass](https://www.sitepoint.com/extra-map-functions-sass/), [Real Sass, Real Maps](http://blog.grayghostvisuals.com/sass/real-sass-real-maps/).

### CSS Regelwerk

An diesem Punkt, ist es hauptsächlich nur noch ein Überarbeiten von dem was jeder schon weiß, aber hier haben wir wie CSS Regelwerke geschrieben werden sollten (zumindest, nach den meisten Guidelines, einschließlich [CSS Guidelines](https://cssguidelin.es/#anatomy-of-a-Regelwerk)):

-   verwandte Selektoren auf dieselbe Zeile; zusammenhanglose auf eine neue;
-   die öffnende Klammer (`{`) mit einem Leerzeichen zum letzten Selektor;
-   jede Deklaration auf eine neue Zeile;
-   ein Leerzeichen nach dem Doppelpunkt (`:`);
-   ein abschließendes Semikolon (`;`) ans Ende aller Deklarationen;
-   die schließende Klammer (`}`) auf eine neue Zeile;
-   eine neue Zeile nach der schließenden Klammer (`}`).

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

Zusätzlich zu den CSS bezogenen Guidelines, richtet sich unsere Aufmerksamkeit auf:

-   lokale Variablen sollen vor allen anderen Deklarationen zugewiesen und durch eine neue Zeile getrennt werden;
-   Mixin Aufrufe die kein `@content` besitzen, kommen vor alle Deklarationen;
-   verschachtelte Selektoren immer in eine neue Zeile;
-   Mixin-Aufrufe mit `@content` kommen nach jedem verschachtelten Selektor;
-   keine neue Zeile nach der schließenden Klammer (`}`).

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

### Anordnung der Deklarationen

Ich kann mir kein Thema vorstellen, wo die Meinungen am weitesten außeinander gehen als bei der Anordnung von Deklarationen in CSS. Konkret gibt es zwei Fraktionen:

-   sich an eine alphabetische Reihenfolge halten;
-   Deklarationen nach Typ (position, display, colors, font, sonstiges…) sortieren.

Es gibt bei beidem Vor- und Nachteile. Auf der einen Seite ist die alphabetische Reihenfolge universal (zumindest für Sprachen mit dem lateinischen Alphabet), also gibt es auch keine Diskussion darüber wie Werte sortiert werden sollen. Dennoch kommt es mir ziemlich komisch vor, Werte wie `bottom` und `top` nicht direkt beieinander zu sehen. Warum sollen Animationen vor dem Display-Typ erscheinen? Es gibt eine Menge Ungereimtheiten mit der alphabetischen Reihefolge.

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

Auf der anderen Seite macht die Sortierung nach Typ perfekt Sinn. Jede font bezogene Deklaration ist gesammelt, `top` und `bottom` sind beisammen und ein Regelwerk zu lesen fühlt sich einfach an wie eine Kurzgeschichte. Aber solange du dich an Konventionen wie [Idiomatic CSS](https://github.com/necolas/idiomatic-css) hälst, gibt es eine Menge Spielraum für Interpretationen wie man etwas machen soll. Wo gehört `white-space` hin: font oder display? Wozu gehört `overflow` nun wirklich? Was ist die Reihenfolge innerhalb einer Gruppe (es könnte alphabetisch sein, welch Ironie)?

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

Es gibt noch einen weiteren Ansatz bei der Sortierung nach Typ, genannt [Concentric CSS](https://github.com/brandon-rhodes/Concentric-CSS), welcher ebenfalls ziemlich bekannt zu sein scheint. Grundsätzlich richtet sich Concentric CSS an das box-model um die Reihenfolge zu definieren: von außen nach innen.

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

Ich kann mich selber nicht entscheiden. Eine [kürzliche Umfrage auf CSS-Tricks](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/) kam zum Schluss dass über 45% der Entwickler ihre Deklarationen nach Typ sortieren, wobei nur 14% die alphabetische Reihenfolge verwenden. Gleichzeitig sortieren 39% vollkommen zufällig, mich selbst eingeschlossen.

  ![Diagramm welches zeigt wie Entwickler ihre CSS Deklarationen ordnen ](https://sass-guidelin.es/assets/images/css-order-chart.png)

Diagramm welches zeigt wie Entwickler ihre CSS Deklarationen ordnen

Deshalb werde ich auch keines davon hier im Styleguide definieren. Nimm das was dir am besten gefällt, solange du konsistent durch alle Stylesheets bleibst (z.B. nicht die _Random_\-Option).

Eine [kürzliche Studie](https://web.archive.org/web/20190618180712/http://peteschuster.com/2014/12/reduce-file-size-css-sorting/) zeigt, dass die Verwendung von [CSS Comb](https://github.com/csscomb/csscomb.js) (welches [Typsortierung](https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json) verwendet) für CSS Deklarationen die durchschnittliche Dateigröße unter Gzip-Kompression um 2.7% verkürzt. Im Vergleich nur 1.3% wenn alphabetisch sortiert.

### Verschachtelung von Selektoren

Ein bestimmtes Feature von Sass, welches von vielen Entwickler übermäßig missbraucht wird, ist die _Verschachtelung von Selektoren_. Sie bietet einen Weg für Stylesheet Autoren, lange Selektoren, durchs ineinander verschachteln von kurzen Selektoren, zu erzeugen.

#### Generelle Regel

Zum Beispiel, folgende Sass Verschachtelung:

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

… wird dieses CSS generieren:

```
.foo .bar:hover {
  color: red;
}
```

Bei den gleichen Zeilen, ist es seit Sass 3.3 möglich die Selektorreferenz (`&`) zu verwenden um erweiterte Selektoren zu erzeugen. Zum Beispiel:

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

… wird dieses CSS generieren:

```
.foo-bar {
  color: red;
}
```

```
.foo-bar
  color: red
```

Diese Methode wird oft bei der [BEM Namenskonvention](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/) verwendet, um `.block__element` und `.block--modifier` Selektoren basierend auf dem originalen Selektor zu erzeugen (in diesem Fall `.block`).

Es mag vielleicht anekdotisch sein, neue Selektoren durch die aktuelle Selektorreferenz (`&`) zu erzeugen, macht sie aber dadurch nicht suchbar innerhalb der Codebasis da sie per se nicht existieren.

Das Problem mit dem Verschachteln von Selektoren ist, dass es den Code unheimlich schwer lesbar macht. Man muss den entsprechenden Selektor erst gedanklich erzeugen; es ist nicht immer offensichtlich wie das CSS am Ende aussehen wird.

Die Aussage gewinnt an Relevanz, sobald Selektoren immer länger werden und die Verwendung von (`&`) häufiger. Ab einem gewissen Punkt, ist das Risiko nicht mehr zu verstehen was passiert zu hoch und es nicht wert.

Um dem ganzen also Vorzubeugen, haben wir ein paar Jahre zurück viel über [die Inception-Regel](https://thesassway.herokuapp.com/beginner/the-inception-rule) gesprochen. Es wird nicht empfohlen mehr als 3 Ebenen tief zu verschachteln, als Referenz zu dem Film Inception von Christopher Nolan. Ich würde drastischer sein und es **vermeiden so viel wie möglich Selektoren zu verschachteln**.

Es gibt selbsverständlich ein paar Ausnahmen zu dieser Regel wie wir in der nächsten Sektion sehen werden. Diese Meinung scheint ziemlich beliebt zu sein. Du kannst mehr darüber in [Beware of Selector Nesting](https://www.sitepoint.com/beware-selector-nesting-sass/) und [Avoid nested selectors for more modular CSS](https://thesassway.herokuapp.com/intermediate/avoid-nested-selectors-for-more-modular-css) lesen.

#### Ausnahmen

Für Anfänger ist es erlaubt und sogar empfohlen Pseudoklassen und Pseudoelemente innerhalb des Selektors zu verschachteln.

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

Pseudoklassen sowie Pseudoelemente zu verschachteln macht nicht nur Sinn (da es mit nah verwandten Selektoren zu tun hat), es hilft auch alles einer Komponente an einem Platz zu halten.

Es ist ebenfalls absolut in Ordnung, Komponentenbezogene Statusklassen wie `.is-active` innerhalb des Selektors der Komponenten anzuordnen, einfach um es ordentlich zu halten.

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

Zu guter Letzt, wenn ein Element gestaltet werden muss weil es innerhalb eines weiteren Elements angeordnet ist, ist es ebenso in Ordnung diese zu verschachteln um alles was diese Komponente betrifft am selben Platz zu haben.

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

Wie mit allem, ist dieser spezifische Fall irgendwie irrelevant, denn wichtig ist Konsistenz. Wenn du dich also absolut okay mit Verschachtelung von Selektoren fühlst, dann mach es so. Versicher dich nur das auch dein ganzes Team damit einverstanden ist.

## Namenskonventionen

In dieser Sektion werden wir uns nicht den besten CSS Namenskonventionen für Wartbarkeit und Skalierbarkeit widmen; das gehört nicht zum Umfang eines Sass Styleguide und sollte generell dir überlassen sein. Ich würde die Konventionen von [CSS Guidelines](https://cssguidelin.es/#naming-conventions) empfehlen.

Es gibt ein paar Dinge die in Sass benannt werden können, und es ist wichtig diese auch gut zu benennen damit deine gesamte Codebasis konsistent und einfach zu lesen ist:

-   Variablen;
-   Funktionen;
-   Mixins.

Sass’ Platzhalter habe ich absichtlich ausgelassen, da sie als reguläre CSS Selektoren gesehen werden können und deshalb derselben Namenskonvention für Klassen folgen.

Bezüglich Variablen, Funktionen und Mixins werden wir uns an etwas sehr _CSS-mäßigen_ richten: Kleinbuchstaben, getrennt durch Bindestrich und vor allem bedeutsam.

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

### Konstanten

Falls du ein Framework- oder Library-Entwickler sein solltest, magst du wahrscheinlich schon Erfahrung mit Variablen gemacht haben, die unter keinen Umständen aktualisiert werden dürfen: Konstanten. Unglücklicherweise (oder zum Glück?) bietet Sass keinen Weg um solche Instanzen zu defineren, deshalb müssen wir auf eine strikte Namenskonvention zurückfallen um klar zu machen was wir meinen.

Wie in vielen Sprachen, schlage ich vor Variablen komplett in Großbuchstaben und Snake Case zu schreiben, wenn sie Konstanten sein sollen. Es ist nicht nur eine sehr alte Konvention, sondern stellt auch einen guten Kontrast zu in Kleinbuchstaben und mit Bindestrich getrennten Variablen.

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

Wenn du wirklich mit der Idee von Konstanten in Sass herumspielen möchtest, solltest du [diesen Artikel](https://www.sitepoint.com/dealing-constants-sass/) lesen.

### Namespace

Falls du deinen Sass Code in Form einer Library, Framework, Gridsystem oder was auch immer verbreiten möchtest, solltest du überlegen all deine Variablen, Funktionen, Mixins und Platzhalter mit einem Namespace zu versehen damit sie nicht mit jemand anderem Code in Konflikt geraten.

Zum Beispiel, wenn du an einem _Sassy Unicorn_ Projekt arbeitest, welches veröffentlicht werden soll, könntest du den Namespace `su-` benutzen. Er ist spezifisch genug um nicht mit anderen Namespaces in Konflikt zu geraten, und kurz genug um dir auf die Dauer beim schreiben nicht auf die Nerven zu gehen.

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

[Kaelig](https://kaelig.fr) hat [einen sehr aufschlussreichen Artikel über globale CSS Namespaces](https://blog.kaelig.fr/post/44554267597/please-respect-the-global-css-namespace) geschrieben, falls dich das Thema interessiert.

Beachte das automatisches Namespacing ein Designziel für die zukünftige Umgestaltung von `@import` in Sass 4.0 ist. Je näher wir vor der Verwirklichung stehen, desto weniger von nutzen ist es manuell Namespaces zu vergeben; eventuell werden Libraries deren Namespace manuell gepflegt wurde, sogar schwieriger zu benutzen sein.

## Architektur

Die Architektur eines CSS Projekts gehört wohl zu den schwierigsten Themen innerhalb eines Projekts. Sie dann noch konsistent und logisch zu halten, ist gleich viel schwieriger.

Zum Glück ist einer der Hauptvorteile eines CSS Präprozessor der, eine Codebasis über mehrere Dateien aufzuteilen ohne dabei die Performance zu beeinflussen (so wie die CSS Regel `@import` es tun würde). Dank der Erweiterung von `@import` in Sass, ist es sicher (und empfohlen) während der Entwicklung soviele Dateien wie nötig zu nutzen und sie dann in der Produktion zu einem Stylesheet zu kompilieren.

Darüber hinaus kann ich nicht oft genug erwähnen, wie wichtig es selbst in kleinen Projekten ist, Ordner zu verwenden. Zu Hause wirfst du schließlich auch nicht jedes Blatt Papier in eine große Kiste. Du ordnest sie; einen Ordner für die Wohnung, einen anderen für die Bank, in den nächsten kommen Rechnungen, und so weiter. Deshalb gibt es auch keinen Grund es mit der Struktur deines CSS anders zu machen. Teile es in verschiedene Ordner auf, sodass du dich später, wenn du zurück in das Projekt kommst, leicht zurecht findest.

Es gibt [viele beliebte Architekturen](https://www.sitepoint.com/look-different-sass-architectures/) für CSS Projekte: [OOCSS](https://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/), [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/) sowie ein [Bootstrap](https://getbootstrap.com/) und [Foundation](https://get.foundation/) ähnliches… alle mit ihren Vor- und Nachteilen.

Ich selber nutze einen Ansatz ähnlich wie [SMACSS](http://smacss.com/) von [Jonathan Snook](https://snook.ca/), welcher sich darauf fokusiert etwas einfach und offensichtlich zu halten.

Ich habe gelernt das Architektur meistens sehr Projektspezifisch ist. Deshalb tu dir keinen Zwang an mir komplett zu widersprechen oder nur die Lösungen zu übernehmen welche du brauchst.

### Komponenten

Es gibt einen großen Unterschied zwischen etwas _fertig_ stellen, und etwas _gut_ machen. CSS ist eine wirklich unsaubere Sprache \[Zitat nötig\] und je weniger, desto besser. Schließlich wollen wir keine Megabytes von CSS, sondern kurze und effiziente Stylesheets. Von daher—das wird kaum überraschen—, ist es generell eine gute Idee sich ein Interface als eine Sammlung von Komponenten vorzustellen.

Komponenten können alles sein, solange sie:

-   sich um genau eine Aufgabe kümmern;
-   wiederverwendbar und innerhalb des Projekt verwendet werden;
-   unabhängig sind.

Ein Suchfeld zum Beispiel sollte wie eine Komponente behandelt werden. Wiederverwendbar an verschiedenen Positionen, unterschiedlichen Seiten in mehreren Situation. Dazu noch unabhängig vom DOM (footer, sidebar, main content, …).

Die meisten Interfaces können als Set aus kleinen Komponenten gesehen werden. Ich kann nur empfehlen sich an so ein Paradigma zu halten, denn das wird nicht nur CSS ersparen sondern auch die Wartbarkeit gegenüber einem chaotischen Durcheinander einfacher machen.

### Komponentenstruktur

Idealerweise sollten Komponenten in einem eigenen Sass Partial (innerhalb des `components/` Ordner, wie beschrieben in dem [7-1 Muster](#das-7-1-muster)) wie `components/_button.scss` existieren. Die Styles innerhalb einer Komponente sollten sich lediglich um folgendes kümmern:

-   die Styles der Komponente selbst;
-   die Styles der Varianten, Modifizierungen und/oder Zustände der Komponente;
-   falls notwendig, die Styles der Kind-Elemente der Komponente.

Wenn deine Komponente von extern thematisch angepasst werden sollen (z.B. in einem Theme innerhalb des `themes/` Ordner), grenz die Deklarationen auf struktuerelle Styles wie Dimensionen (width/height), Innen- und Außenabstände oder Ausrichtungen ein. Lasse Farben, Schatten, Fontregeln oder Hintergrundregeln aus.

Ein Komponenten-Partial kann komponentenspezifische Variablen, Platzhalter und sogar Mixins und Funktionen enthalten. Vergiss aber nicht, dass Dateien aus anderen Komponenten zu referenzieren (z.B. `@import`\-en) vermieden werden sollte. Das kann deine Projektabhängigkeiten in ein unwartbares Chaos verwandeln.

Hier ist ein Beispiel eines Button-Komponenten Partial:

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

Danke an [David Khourshid](https://twitter.com/davidkpiano) für seine Hilfe und Expertise in dieser Sektion.

### Das 7-1 Muster

Zurück zur Architektur, oder? Ich arbeite normalerweise mit einem Muster was ich _7-1_ nenne: 7 Ordner, 1 Datei. Grundsätzlich hast du all deine partials in 7 verschiedenen Ordnern verteilt, und eine Datei auf dem Root-Level (normalerweise `main.scss`) importiert und kompiliert alles zu einem Stylesheet.

-   `abstracts/`
-   `base/`
-   `components/`
-   `layout/`
-   `pages/`
-   `themes/`
-   `vendors/`

Und natürlich:

-   `main.scss`

Wenn du das 7-1 Muster verwenden möchtest, gibt es bereits ein [Boilerplate](https://github.com/KittyGiraudel/sass-boilerplate) auf GitHub. Es sollte alles nötige beinhalten um mit der Architektur zu starten.

  

Wallpaper von [Julien He](https://twitter.com/julien_he)

Idealerweise haben wir am Ende etwas wie:

```
sass/
|
|– abstracts/
|   |– _variables.scss    # Sass Variablen
|   |– _functions.scss    # Sass Funktionen
|   |– _mixins.scss       # Sass Mixins
|   |– _placeholders.scss # Sass Platzhalter
|
|– base/
|   |– _reset.scss        # Reset/normalize
|   |– _typography.scss   # Regeln für Typographie
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
|   |– _home.scss         # Home spezifische Styles
|   |– _contact.scss      # Contact spezifische styles
|   …                     # Etc.
|
|– themes/
|   |– _theme.scss        # Default-Theme
|   |– _admin.scss        # Admin-Theme
|   …                     # Etc.
|
|– vendors/
|   |– _bootstrap.scss    # Bootstrap
|   |– _jquery-ui.scss    # jQuery UI
|   …                     # Etc.
|
|
`– main.scss              # Haupt Sass-Datei
```

Die Dateien sollten einer mit Bindestrich getrennten Namenskonvention folgen.

#### Base Ordner

Der `base/` Ordner beinhaltet etwas wie das Boilerplate des Projekts. Da wird eine Reset-Datei drin sein, ein paar Regeln für die Typografie und wahrscheinlich auch ein Stylesheet für allgemeinere HTML Elemente (welches ich `_base.scss` nenne):

-   `_base.scss`
-   `_reset.scss`
-   `_typography.scss`

Falls dein Projekt _eine Menge_ CSS Animationen verwendet, kannst du dir überlegen eine `\_animations.scss` mit allen `@keyframes` Definitionen von deiner Animationen hinzuzufügen. Falls du sie aber nur sporadisch benutzt, würde ich sie bei den jeweiligen Selektoren behalten.

#### Layout Ordner

Im `layout/` Ordner ist alles was für die Seite oder Applikation als Design definiert wird. Hier können Stylesheets für die Hauptbereiche der Seite (header, footer, navigation, sidebar, …), das Gridsystem oder Formulare drin sein.

-   `_grid.scss`
-   `_header.scss`
-   `_footer.scss`
-   `_sidebar.scss`
-   `_forms.scss`
-   `_navigation.scss`

Der `layout/` Ordner kann auch `partials/` genannt werden, je nachdem was du vorziehst.

#### Components Ordner

Für kleinere Komponenten gibt es den `components/` Ordner. Während der `layout/` Ordner eher klein bleibt (hier wird das globale Wireframe definiert), beinhaltet `components/` eher Widgets oder Module wie Slider, Loader und ähnliches. Durch den Ansatz eine Seite oder Applikation überwiegend aus kleinen Modulen zu entwickeln, sind hier tendenziell mehr Dateien vorhanden.

-   `_media.scss`
-   `_carousel.scss`
-   `_thumbnails.scss`

Der `components/` Ordner könnte auch, je nachdem was du vorziehst, `modules/` genannt werden.

#### Pages Ordner

Falls du seitenspezifische Stylesheets hast, solltest du sie lieber in einen `pages/` Ordner (benannt nach dem Namen der Seite) packen. Es ist nicht unüblich seitenspezifische Regeln für die Startseite zu haben, deshalb auch eine `_home.scss` in `pages/`.

-   `_home.scss`
-   `_contact.scss`

Je nachdem wie dein Deployment Prozess ist, können die Dateien auch für sich geladen werden, um Konflikte mit den anderen Stylesheets zu vermeiden. Auch hier ist es dir überlassen.

#### Themes Ordner

Es ist garnicht mal unüblich auf großen Seiten oder Applikationen verschiedene Themes zu verwenden. Jeder mag das Thema anders angehen, doch ich persönlich mag es alle in einem `themes/` Ordner zu verwalten.

-   `_theme.scss`
-   `_admin.scss`

Mein Ansatz ist sehr projektspezifisch und kann woanders wohl auch garnicht so vorkommen.

#### Abstracts Ordner

Der `abstracts/` Ordner umfasst alle Sass Tools und Helper die über das Projekt verteilt zum Einsatz kommen. Sei es globale Variablen, Funktionen, Mixins oder Platzhalter.

Die Grundregel hier ist, dass am Ende keine einzige Zeile CSS kompiliert werden soll, und die Dateien somit leer bleiben. Es sind reine Sass Helper.

-   `_variables.scss`
-   `_mixins.scss`
-   `_functions.scss`
-   `_placeholders.scss`

Bei einem sehr großen Projekt mit vielen abstrakten Utilities mag es interessant sein diese eher nach Typ oder Thema, wie zum Beispiel Typographie (`_typography.scss`), Theming (`_theming.scss`) etc., zu gruppieren. Jede Datei enthält alle zugehörigen Helper: Variablen, Funktionen, Mixins und Platzhalter. Das macht deinen Code einfacher zum durchsuchen und warten, besonders wenn die Dateien sehr groß werden.

Je nach dem was du bevorzugst, kann der `abstracts/` Ordner auch `utilities/` oder `helpers` genannt werden.

#### Vendors Ordner

Und zu guter Letzt, der `vendors/` Ordner. Die meisten Projekte besitzen einen solchen oder ähnlichen Ordner indem alles CSS von externen Libraries und Frameworks wie z.B. Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered und so weiter, gelistet sind. All diese in einem Ordner zu sammeln ist ein guter Weg zu sagen “Hey, das ist nicht von mir, nicht mein Code, nicht meine Verantwortung”.

-   `_normalize.scss`
-   `_bootstrap.scss`
-   `_jquery-ui.scss`
-   `_select2.scss`

Falls du irgendwann mal einen Bereich daraus überschreiben musst, rate ich einen achten Ordner namens `vendors-extensions` anzulegen. Dort kannst du die Dateien exakt danach benennen was sie überschreiben.

Zum Beispiel, `vendors-extensions/_bootstrap.scss` beinhaltet alle Regeln die einige von Bootstraps Default CSS überschreiben. Dadurch vermeide ich die Vendor-Dateien selbst zu bearbeiten, was generell keine gute Idee ist.

#### Main Datei

Die Main Datei (üblicherweise `main.scss` genannt) sollte die einzige Sass-Datei aus der Codebasis sein, welche nicht mit einem Unterstrich beginnt. Außer `@import` und Kommentaren steht dort nichts weiter drin.

Die Dateien sollten danach importiert werden, in welchem Ordner sie sich befinden. Eins nach dem anderen, nach folgender Reihenfolge:

1.  `abstracts/`
2.  `vendors/`
3.  `base/`
4.  `layout/`
5.  `components/`
6.  `pages/`
7.  `themes/`

Um die Lesbarkeit einzuhalten, solltest du außerdem diese Richtlinien beachten:

-   eine Datei pro `@import`;
-   ein `@import` pro Zeile;
-   keine neue Zeile zwischen imports vom selben Ordner;
-   eine neue Zeile nach dem letzten import aus einem Ordner;
-   Dateiendungen und Unterstriche am Anfang weglassen.

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

Es gibt noch einen weiteren Weg um die Datei zu strukturieren, welchen ich ebenfalls als richtig sehe. Auf der anderen Seite macht es das aktualisieren zwar schwieriger, aber da kannst du selbst entscheiden, welche Struktur dir am besten gefällt. Hier sollten diese Richtlinien beachtet werden:

-   ein `@import` pro Ordner;
-   ein Zeilenumbruch nach `@import`;
-   jede Datei in einer Zeile;
-   eine neue Zeile nach dem letzten import aus einem Ordner;
-   Dateiendungen und Unterstriche am Anfang weglassen.

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

### Über Globbing

In der Computerprogrammierung spezifizieren sogenannte Glob-Muster ein Set von Dateinamen, wie z.B. `*.scss`, mit Wildcard-Zeichen. Allgemein gesagt bedeutet es, dass Globbing ein Set nach einem Ausdruck anstatt einer Liste von Dateinnamen umfasst. Wenn das ganze auf Sass angewandt wird, bedeutet es dass Partials nach einem Glob-Muster in die [Main Datei](#main-datei) importiert und nicht individuell aufgelistet werden. Das führt zu folgender Main Datei:

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

Sass untersützt Datei Globbing nicht von Haus aus, da es aufgrund der Befehlsabhängigkeit in CSS ein gefährliches Feature sein kann. Wenn Dateien dynamisch importiert werden (in der Regel in alphabetisch), ist die Reihenfolge der importierten Dateien nicht mehr kontrollierbar und kann zu schwer zu entfernbaren Nebeneffekten führen.

In einer strikten, komponentenbasierten Architektur mit extra Rücksicht keine Styles von Partial zu Partial entweichen zu lassen, sollte die Reihenfolge nicht mehr wirklich wichtig sein, und erlauben das Glob-Muster zum importieren zu verwenden. Das macht es einfacher Partials hinzuzufügen oder zu entfernen ohne jedesmal sorgfältig die Main Datei aktualisieren zu müssen.

Um nicht jede Datei manuell zu importieren, gibt es die Erweiterung für Ruby Sass namens [sass-globbing](https://github.com/chriseppstein/sass-globbing) welche es ermöglicht das Glob-Muster in Sass zu `@import`\-en wie z.B. `@import "components/\*"`.

Ich würde es allerdings nicht empfehlen, da es nach alphabetischer Ordnung importiert was in der Regel nicht gewollt ist, besonders wenn man es mit einer Sprache zu tun hat die Abhängig von der Quellreihenfolge ist.

### Shame-Datei

Es gibt ein interessantes Konzept von [Harry Roberts](https://csswizardry.com), [Dave Rupert](https://daverupert.com) und [Chris Coyier](https://css-tricks.com), wo alle Deklarationen, Hacks und Dinge auf die wir nicht stolz sind, in einer [_Shame-Datei_](https://csswizardry.com/2013/04/shame-css-full-net-interview/) zusammengefasst sind. Die dramatisch benannte `_shame.scss` sollte nach jeder anderen Datei und ganz am Ende deines Stylesheets importiert werden.

```
/**
 * Nav spezifischer fix.
 *
 * Jemand hat eine ID im Header-Code (`#header a {}`) verwendet, welche den
 * Nav-Selektor (`.site-nav a {}`) überschreibt. Nutze !important um es zu
 * überschreiben, bis ich Zeit gefunden habe um den Header-Bereich zu
 * refactoren.
 */
.site-nav a {
    color: #BADA55 !important;
}
```

```
/**
 * Nav spezifischer fix.
 *
 * Jemand hat eine ID im Header-Code (`#header a {}`) verwendet, welche den
 * Nav-Selektor (`.site-nav a {}`) überschreibt. Nutze !important um es zu
 * überschreiben, bis ich Zeit gefunden habe um den Header-Bereich zu
 * refactoren.
 */
.site-nav a
    color: #BADA55 !important
```

## Responsive Webdesign und Breakpoints

Ich denke nicht das wir groß über Responsive Webdesign sprechen müssen, wo es mittlerweile überall zu finden ist. Dennoch fragst du dich bestimmt, _warum gibt es eine RWD Sektion in einem Sass Styleguide_? Eigentlich gibt es ein paar Dinge die getan werden können um die Benutzung von Breakpoints einfach zu machen, deshalb dachte ich es wäre garkeine schlechte Idee sie hier aufzulisten.

### Breakpoints benennen

Ich denke ich kann mit Sicherheit sagen dass Media Queries nicht auf ein bestimmtes Endgerät ausgerichtet sein sollten. Zum Beispiel ist es definitiv eine schlechte Idee, zu versuchen speziell iPads oder Blackberry Smartphones zu erreichen. Media Queries sollten sich um Bildschirmgrößen kümmern, solange ein neuer Media Query oder Designbreak übernimmt.

Aus demselben Grund sollten Breakpoints nicht nach einem Endgerät, sondern allgemeiner benannt werden. Gerade da einige Smartphones mittlerweile größer als ein Tablet sind, manche Tablets größer als ein kleiner Desktopmonitor, und so weiter…

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

An diesem Punkt wird [jede Namenskonvention](https://css-tricks.com/naming-media-queries/), die klar macht dass ein Design nicht auf einen bestimmten Gerätetyp zugeschnitten ist, den Zweck erfüllen. Solange sie die Größenordnung erraten lässt.

```
$breakpoints: (
  'samen': (min-width: 800px),
  'sprosse': (min-width: 1000px),
  'pflanze': (min-width: 1200px),
);
```

```
$breakpoints: ('samen': (min-width: 800px), 'sprosse': (min-width: 1000px), 'pflanze': (min-width: 1200px))
```

Das vorige Beispiel verwendet verschachtelte Maps um Breakpoints zu definieren, wie auch immer, das hängt ganz davon ab was für eine Art von Breakpointmanager du verwendest. Du könntest für eine bessere Flexibilität genauso gut Strings (z.B. `'(min-width: 800px)'`) anstatt Maps verwenden.

### Breakpoint-Manager

Sobald du deine Breakpoints so benannt hast wie du möchtest, musst du einen Weg finden sie in deinen Media Queries anzuwenden. Es gibt eine Menge Wege, doch ich muss sagen das ich ein großer Fan von Breakpoint-Maps mit einer Getter-Funktion bin. Es ist einfach und effizient.

```
/// Responsive-Manager
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
/// Responsive-Manager
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

Das ist natürlich ein ziemlich einfacher Breakpoint-Manager. Falls du einen etwas toleranteren brauchst, kann ich dir nur empfehlen das Rad nicht neu zu erfinden und dir [Sass-MQ](https://github.com/sass-mq/sass-mq), [Breakpoint](http://breakpoint-sass.com/) oder [include-media](https://github.com/eduardoboucas/include-media) anzuschauen.

Falls du mehr über Media-Queries in Sass erfahren möchtest, haben [SitePoint](https://www.sitepoint.com/managing-responsive-breakpoints-sass/) und [CSS-Tricks](https://css-tricks.com/approaches-media-queries-sass/) gute Artikel dazu.

### Media Queries verwenden

Noch garnicht lange her, gab es eine ziemlich hitzige Diskussion darüber wo man Media Queries deklarieren soll: gehören sie innerhalb eines Selektors (wie Sass es möglich macht) oder strikt getrennt? Ich muss sagen dass ich ein leidenschaftlicher Verfechter des _Media-Queries-in-Selektor_ Systems bin, da ich denke dass es gut mit der Idee von _Komponenten_ einher geht.

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

Führt zu folgenden CSS:

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

Du hast vielleicht schon gehört dass diese Konvention duplizierte Media Queries im CSS generiert. Das ist auf jedenfall richtig. Dennoch, es wurde getestet und das Ergebnis ist dass es keinen Unterschied macht sobald Gzip (oder ähnliches) seine Arbeit leistet:

> … wir haben den Test gemacht ob es Konsequenzen bei der Performance gibt, wenn Media Queries kombiniert oder zerstreut werden und sind zu dem Ergebnis gekommen dass der Unterschied, wenn auch hässlich, im schlimmsten Fall nur minimal und im besten Fall nicht existent ist.  
> — Sam Richards, bezüglich Breakpoint

Falls du also wirklich besorgt um duplizierte Media Queries bist, kannst du immer noch [ein Tool](https://github.com/aaronjensen/sass-media_query_combiner) zum zusammenfügen verwenden. Dennoch hab ich das Gefühl, ich muss dich vor möglichen Nebeneffekten wie verschobenes CSS warnen. Denn auch die Reihenfolge in CSS ist wichtig.

## Variablen

Variablen sind die Essenz jeder Programmiersprache. Sie erlauben es Werte wiederzuverwenden ohne sie jedesmal erneut kopieren zu müssen. Der wichtigste Punkt ist, dass sie es wirklich einfach machen einen Wert zu aktualisieren. Kein manuelles durchsuchen mehr.

CSS jedoch ist lediglich eine große Kiste mit all unseren Schätzen. Anders als andere Sprachen, existiert in CSS kein echter Scope. Deshalb müssen wir durch das Risiko von Konflikten, aufpassen wenn Variablen hinzugefügt werden.

Von daher ist mein Ratschlag Variablen nur dann zu erzeugen, wenn es auch wirklich Sinn macht. Erstelle keine Variablen einfach weil du kannst; es wird dich nicht weiter bringen. Eine neue Variable sollte nur bei folgenden Kriterien erzeugt werden:

-   der Wert wiederholt sich mindestens zweimal;
-   der Wert wird vorrausichtlich mindestens einmal aktualisiert;
-   alle Ereignisse des Werts befinden sich in der Variable und auch nicht durch Zufall.

Grundsätzlich macht es keinen Sinn eine Variable zu erstellen die niemals aktualisiert oder nur ein einziges Mal verwendet wird.

### Scoping

Der Scope von Variablen in Sass hat sich über die Jahre verändert. Bis vor kurzem waren Deklarationen innerhalb des Regelwerk und andere Scopes standardmäßig lokal. Wenn es jedoch eine globale Variable mit demselben Namen gab, hat die lokale Variable die globale überschrieben. Seit Version 3.4 allerdings, greift Sass das Konzept von Scopes korrekt und erzeugt stattdessen eine neue lokale Variable.

Sass’ Dokumentation spricht von _Beschattung globaler Variablen_. Wenn eine Variable im inneren Scope (Selektor, Funktion, Mixin, …) deklariert, aber schon im globalen Scope existiert, dann sagt man dass die globale Variable _beschattet_ wird. Grundsätzlich überscheibt es nur den lokalen Scope.

Folgendes Code-Snippet erklärt das Konzept der _Variablenbeschattung_:

```
// Initialisiere eine globale Variable auf Root-Level.
$variable: 'initial value';

// Erstelle ein Mixin das die globale Variable überschreibt.
@mixin global-variable-overriding {
  $variable: 'mixin value' !global;
}

.local-scope::before {
  // Erstelle eine lokale Variable die eine globale beschattet.
  $variable: 'local value';

  // Füg den Mixin ein: es überschreibt die globale Variable.
  @include global-variable-overriding;

  // Geb den Wert der Variable aus.
  // Es ist der **lokale**, da er die globale beschattet.
  content: $variable;
}

// Geb die Variable in einem anderen Selektor aus, welcher nicht beschattet.
// Es ist wie erwartet die **globale**.
.other-local-scope::before {
  content: $variable;
}
```

```
// Initialisiere eine globale Variable auf Root-Level.
$variable: 'initial value'

// Erstelle ein Mixin das die globale Variable überschreibt.
@mixin global-variable-overriding
  $variable: 'mixin value' !global

.local-scope::before
  // Erstelle eine lokale Variable die eine globale beschattet.
  $variable: 'local value'

  // Füg den Mixin ein: es überschreibt die globale Variable.
  +global-variable-overriding

  // Geb den Wert der Variable aus.
  // Es ist der **lokale**, da er die globale beschattet.
  content: $variable

// Geb die Variable in einem anderen Selektor aus, welcher nicht beschattet.
// Es ist wie erwartet die **globale**.
.other-local-scope::before
  content: $variable
```

### `!default` flag

Wenn eine Library, ein Framework, ein Gridsystem oder irgendwas anders in Sass verbreitet, und von externen Entwicklern benutzt wird, sollten alle Konfigurationsvariablen als `!default` markiert werden, sodass sie auch überschrieben werden können.

```
$baseline: 1em !default;
```

```
$baseline: 1em !default
```

Dadurch ist es einem Entwicker möglich, eigene `$baseline` Variable _vor_ dem importieren deiner Library zu defineren, ohne dass sie überschrieben wird.

```
// Eigene Variable des Entwickler
$baseline: 2em;

// Deine Library welche `$baseline` deklariert
@import 'your-library';

// $baseline == 2em;
```

```
// Eigene Variable des Entwickler
$baseline: 2em

// Deine Library welche `$baseline` deklariert
@import your-library

// $baseline == 2em
```

### `!global` flag

Das `!global` Flag sollte nur benutzt werden wenn eine globale Variable vom lokalen Scope überschrieben wird. Wenn eine Variable auf dem Root-Level definiert wird, sollte das `!global` Flag weggelassen werden.

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

### Mehrere Variablen oder Maps

Es gibt Vorteile Maps anstatt mehreren eindeutigen Variablen zu verwenden. Der größte ist, die Fähigkeit über eine Map zu iterieren, was mit eindeutigen Variablen nicht möglich ist.

Ein weiterer Vorteil von Maps ist die Möglichkeit eine kleine Getter-Funktion zu schreiben, um eine freundlichere API bereitzustellen. Stell dir zum Beispiel folgenden Sass-Code vor:

```
/// Map von z-index, sammelt alle Z-Ebenen der Applikation
/// @access private
/// @type Map
/// @prop {String} key - Name der Ebene
/// @prop {Number} value - Abbildung des Z-Wert eines Key’s
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// Bekomm den z-index Wert durch den Ebenennamen
/// @access public
/// @param {String} $layer - Name der Ebene
/// @return {Number}
/// @require $z-indexes
@function z($layer) {
  @return map-get($z-indexes, $layer);
}
```

```
/// Map von z-index, sammelt alle Z-Ebenen der Applikation
/// @access private
/// @type Map
/// @prop {String} key - Name der Ebene
/// @prop {Number} value - Abbildung des Z-Wert eines Key’s
$z-indexes: ('modal': 5000, 'dropdown': 4000, 'default': 1, 'below': -1,)

/// Bekomm den z-index Wert durch den Ebenennamen
/// @access public
/// @param {String} $layer - Name der Ebene
/// @return {Number}
/// @require $z-indexes
@function z($layer)
  @return map-get($z-indexes, $layer)
```

## Extend

Die `@extend` Regel ist ein mächtiges Feature welches häufig missverstanden wird. Generell ermöglicht es Sass zu sagen, dass ein Element A exakt gleich wie Selektor B gestyled werden soll. Deshalb kann es ein wertvoller Verbündeter bei modularem CSS sein.

Dennoch, der wahre Grund von `@extend` ist es die Beziehung (Beschränkungen) innerhalb erweiterter Selektoren zwischen Regelwerken zu pflegen. Was genau bedeutet das?

-   Selektoren haben _Beschränkungen_ (z.B. `.bar` in `.foo > .bar` muss ein Elternteil `.foo` haben);
-   Diese Beschränkungen werden zum erweiterten Selektor _übertragen_ (z.B. `.bar { @extend .bar; }` wird `.foo > .bar, .foo > .baz` erzeugen);
-   Die Deklarationen des erweiterten Selektors werden mit dem erweiternden Selektor geteilt.

Dem vorausgesetzt ist es ziemlich einfach zu sehen, wie erweiternde Selektoren mit nachsichtigen Beschränkungen zu Selektorexplosion führen können. Wenn `.baz .qux` `.foo .bar` erweitert, kann der erzeugte Selektor `.foo .baz .qux` oder `.baz .foo .qux` sein, da `.foo` und `.baz` allgemeine Vorfahren dessen sind.

Versuch immer solche Beziehungen durch Selektorenplatzhalter zu definieren, und nicht durch richtige Selektoren. Dadurch bekommst du die Freiheit jede Namenskonvention die du für deine Selektoren hast zu verwenden (und ändern). Da Beziehungen auch nur einmal innerhalb des Platzhalters definiert werden, ist die Möglichkeit ungewollte Selektoren zu erzeugen außerdem sehr gering.

Um Styles zu vererben, benutze `@exend` nur wenn der erweiternde `.class` oder `%placeholder` Selektor _ähnlich_ zu dem zu erweiterndem Selektor ist. Zum Beispiel `.error` ist ähnlich zu `.warning`, also kann `.error` `@extend .warning`.

```
%button {
  display: inline-block;
  // … Button Styles

  // Beziehung: ein %button, welcher ein Kind von %modal ist
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
  // … Button Styles

  // Beziehung: ein %button, welcher ein Kind von %modal ist
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

Es gibt viele Szenarien wo Selektoren zu erweitern hilfreich und wertvoll ist. Trotzdem behalte immer folgende Regeln im Kopf, damit du behutsam `@extend` benutzen kannst:

-   Benutze `@extend` hauptsächlich innerhalb `%placeholders`, nicht bei wirklichen Selektoren.
-   Wenn du eine Klasse erweiterst, dann erweitere nur eine Klasse mit einer anderen, niemals [komplexe Selektoren](https://www.w3.org/TR/selectors4/#syntax).
-   Erweiter einen `%placeholder` so wenig wie möglich.
-   Vermeide es allgemeine Vorfahren eines Selektors (z.B. `.foo .bar`) oder allgemeine Geschwister eines Selektor (z.B. `.foo ~ .bar`) zu erweitern. Genau das erzeugt eine Explosion von Selektoren.

Es wird oft gesagt dass `@extend` bei der Dateigröße mithilft, da es Selektoren kombiniert anstatt Werte zu duplizieren. Das ist zwar korrekt, dennoch ist der Unterschied geringfügig sobald [Gzip](https://de.wikipedia.org/wiki/Gzip) seine arbeit getan hat.

Wenn du von daher nicht auf Gzip (oder etwas ähnliches) zurückgreifen kannst, mag zu `@extend` zu wechseln wertvoll sein. Besonders wenn die Größe deines Stylesheets ein Performanceproblem ist.

### Extend und Media Queries

Du solltest Selektoren nur innerhalb desselben Media Scopes (`@media` Regel) erweitern. Stell dir ein Media Query als weitere Beschränkung vor.

```
%foo {
  content: 'foo';
}

// Nope
@media print {
  .bar {
    // Das funktioniert nicht. Noch schlimmer: es stürzt ab.
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
    // Das funktioniert nicht. Noch schlimmer: es stürzt ab.
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

Meinungen scheinen über die Vor- und Nachteile von `@extend` scheinen extrem weit auseinander zu gehen. Bis zu dem Punkt wo viele Entwickler, mich eingeschlossen, dagegen werben es zu verwenden. Mehr dazu kannst du in folgenden Artikeln lesen:

-   [What Nobody Told you About Sass Extend](https://www.sitepoint.com/sass-extend-nobody-told-you/)
-   [Why You Should Avoid Extend](https://www.sitepoint.com/avoid-sass-extend/)
-   [Don’t Over Extend Yourself](https://pressupinc.com/blog/2014/11/dont-overextend-yourself-in-sass/)

Um abzuschließen, rate Ich, `@extend` nur zu benutzen um die Beziehung innerhalb von Selektoren zu pflegen. Wenn zwei Selektoren charakteristisch gleich sind, ist es der perfekte Anwendungsfall für `@extend`. Wenn sie jedoch ohne Beziehung zueinander stehen, aber gleiche Regeln teilen dann passt ein `@mixin` besser. Mehr dazu wie man sich zwischen diesen beiden entscheidet findest du in dieser [Ausarbeitung](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/).

Danke an [David Khourshid](https://twitter.com/davidkpiano) für die Hilfe und Expertise in diesem Bereich.

## Mixins

Mixins gehören zu den meist genutzten Features in der gesamten Sass-Sprache. Sie sind aus gutem Grund der Schlüssel zur Wiederverwendbarkeit und DRY-Komponenten: Mixins erlauben es dem Autor durch sein gesamtes Stylesheet hinweg Styles wiederzuverwenden, ohne auf nicht-semantische Klassen wie `.float-left` zurückzufallen.

Sie können komplette CSS-Regeln beinhalten, und so gut wie alles was sonst noch in einem Sass-Dokument erlaubt ist. Sogar Parameter, genauso wie Funktionen, sind möglich. Die Möglichkeiten hierbei sind unendlich.

Dennoch habe ich das Gefühl, vor dem Missbrauch von Mixins warnen zu müssen. Denn erneut ist das Schlüsselwort hierbei _Einfachheit_. Es mag verlockend sein, extrem mächtige Mixins mit massiver Logik zu bauen. Man nennt es Over-Engineering, und die meisten Entwickler leiden darunter. Überdenke nicht zu viel und halt es vor allem einfach. Wenn ein Mixin länger als 20 Zeilen wird, solltest du es lieber in kleinere Teile aufteilen oder komplett überdenken.

### Grundlagen

Davon abgesehen sind Mixins extrem hilfreich und du solltest ein paar verwenden. Die Faustformel hierbei ist, wenn dir auffällt das eine bestimmte Gruppe von CSS Werten immer zusammen auftritt (also nicht zufällig), dann kannst du ein Mixin draus machen. Der [Mikro-Clearfix Hack von Nicolas Gallagher](http://nicolasgallagher.com/micro-clearfix-hack/) zum Beispiel, verdient es (ohne Argumente) in einem Mixin zu sein.

```
/// Helfer um innere floats korrekt darzustellen
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
/// Helfer um innere floats korrekt darzustellen
/// @author Nicolas Gallagher
/// @link http://nicolasgallagher.com/micro-clearfix-hack/ Micro Clearfix
@mixin clearfix
  &::after
    content: ''
    display: table
    clear: both
```

Ein weiteres Beispiel ist ein Mixin welches die Maße `width` und `height` für ein Element gleichzeitig definiert. Es macht den Code nicht nur schlanker zum schreiben, sondern auch einfacher zu lesen.

```
/// Helfer um die Dimensionen eines Element zu bestimmen
/// @author Kitty Giraudel
/// @param {Length} $width
/// @param {Length} $height
@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}
```

```
/// Helfer um die Dimensionen eines Element zu bestimmen
/// @author Kitty Giraudel
/// @param {Length} $width
/// @param {Length} $height
=size($width, $height: $width)
  width: $width
  height: $height
```

Für weitere komplexe Beispiele von Mixing, werf einen Blick auf \[dieses Mixin um CSS Dreiecke zu generieren\](http://sass-guidelin.es/zh/(https://www.sitepoint.com/sass-mixin-css-triangles/), [dieses Mixin für lange Schatten](https://www.sitepoint.com/ultimate-long-shadow-sass-mixin/) oder um [CSS Verläufe für alte Browser zu polyfillen](https://www.sitepoint.com/building-linear-gradient-mixin-sass/).

### Parameterlose Mixins

Manchmal werden Mixins nur dazu benutzt, um zu verhindern dass man eine Gruppe von Deklarationen immer und immer wieder wiederholt. Dennoch brauchen sie keine Parameter oder haben sensible Standardwerte welche nicht notwendigerweise einen Parameter benötigen.

In solchen Fällen können wir beim Aufruf ohne Probleme die Klammern weglassen. Das `@include` Keyword (oder `+` Zeichen in der Intended-Syntax) verhält sich bereits als ein Indikator dafür dass die Zeile ein Mixinaufruf ist; es werden keine extra Klammern benötigt.

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

### Parameterliste

Wenn du es mit einer unbekannten Anzahl von Parametern in einem Mixin zu tun hast, solltest du lieber `arglist` anstatt einer Liste verwenden. Stell dir `arglist` als den 8. versteckten und undokumentierten Datentyp mit der `...` Signatur in Sass vor, welcher unbedingt genutzt werden sollte, sobald du eine willkürliche Anzahl von Parametern in deinem Mixin oder Funktion hast.

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

Wenn du also ein Mixin erstellst welches eine handvoll Parameter (3 oder mehr) akzeptiert, überlege dir zweimal bevor du sie als Liste oder Map zusammenfügst weil du denkst es wäre einfacher als jeden Parameter nacheinander.

Sass ist sogar ziemlich Clever bei Mixin- und Funktionsdeklarationen. So sehr dass du selbst eine Liste oder Map als `arglist` in ein Mixin oder eine Funktion übergeben kannst, welche dann als Serie von Parametern aufgefasst wird.

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

Für weitere Informationen ob es besser ist mehrere Argumente, eine Liste oder eine Arguementenliste zu werdenen, [hat SitePoint einen netten Artikel zu dem Thema](https://www.sitepoint.com/sass-multiple-arguments-lists-or-arglist/).

### Mixins und Vendor-Prefixe

Es mag verlockend sein, eigene Mixins zu schreiben die sich drum kümmern nicht oder nur teilweise unterstützte CSS Werte mit Vendor-Prefixen zu versehen. Doch genau das wollen wir nicht. Erstens, wenn du [Autoprefixer](https://github.com/postcss/autoprefixer) verwenden kannst, tu es. Es wird Sass-Code von deinem Projekt entfernen, immer up-to-date sein und eine wesentlich bessere Arbeit als du, beim hinzufügen von Prefixen, leisten.

Unglücklicherweise ist Autoprefixer nicht für jeden eine Option. Wenn du entweder [Bourbon](https://bourbon.io/) oder [Compass](http://compass-style.org/) benutzt, weißt du vielleicht schon das beide eine gute Auswahl von Mixins bereitstellen um dir die Arbeit mit Vendor-Prefixen abzunehmen. Nutz diese.

Falls du weder Autoprefixer, Bourbon noch Compass benutzen kannst, dann, aber auch nur dann, kannst du deine eigenen Mixins schreiben um CSS Werte mit Prefixe zu versehen. Aber. Erstell dir keine Mixins die jede Eigenschaft einzeln ausgeben.

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

Mach es auf eine clevere Art und Weise.

```
/// Helfer-Mixing um Vendor-Prefixe hinzuzfügen
/// @access public
/// @author KittyGiraudel
/// @param {String} $property - CSS-Eigenschaft ohne Prefix
/// @param {*} $value - Reiner CSS-Wert
/// @param {List} $prefixes - Liste von Prefixen die hinzugefügt werden soll
@mixin prefix($property, $value, $prefixes: ()) {
  @each $prefix in $prefixes {
    -#{$prefix}-#{$property}: $value;
  }

  #{$property}: $value;
}
```

```
/// Helfer-Mixing um Vendor-Prefixe hinzuzfügen
/// @access public
/// @author KittyGiraudel
/// @param {String} $property - CSS-Eigenschaft ohne Prefix
/// @param {*} $value - Reiner CSS-Wert
/// @param {List} $prefixes - Liste von Prefixen die hinzugefügt werden soll
=prefix($property, $value, $prefixes: ())
  @each $prefix in $prefixes
    -#{$prefix}-#{$property}: $value

  #{$property}: $value
```

Das Mixin zu verwenden sollte ziemlich unkompliziert sein:

```
.foo {
  @include prefix(transform, rotate(90deg), ('webkit', 'ms'));
}
```

```
.foo
  +prefix(transform, rotate(90deg), ('webkit', 'ms'))
```

Bitte merk dir dass das eine wirklich schlechte Umsetzung ist. Zum Beispiel kann es nicht mit komplexen Polyfills, wie für Flexbox nötig, umgehen. In dem Fall ist Autoprefixer die bessere Wahl.

## Conditional Statements

Möglicherweise hast du bereits davon gehört, dass Sass Conditional Statements via `@if` und `@else` bereitstellt. Conditional Statements sollten eigentlich keinen Gebrauch in deinen Stylesheets finden, außer du hast ein Grund für komplexe Logik in deinem Code. Sie existieren hauptsächlich nur für Libraries und Frameworks.

Falls du Conditional Statemens doch einmal brauchst, beachte folgende Guidelines:

-   Keine Klammern solange sie nicht erforderlich sind;
-   Immer eine leere Zeile vor `@if`;
-   Immer einen Zeilenumbruch nach der öffnenden Klammer (`{`);
-   `@else` Statements auf dieselbe Zeile wie die vorherige, schließende Klammer (`}`);
-   Immer eine leere Zeile nach den schließenden Klammern (`}`), außer wenn die nächste Zeile ebenfalls eine schließende Klammer (`}`) ist.

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

Wenn du einen fälschlichen Werten testen willst, nutze lieber das `not` Keyword anstatt `false` oder `null`;

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

Die Variable kommt immer auf die linke Seite eines Statements, und das (un)erwartete Ergebnis auf die rechte. Umgekehrte Conditional Statements sind oft schwieriger zu lesen, gerade von unerfahrenen Entwicklern.

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

Wenn du Conditional Statements innerhalb einer Funktion verwendest, um unterschiedliche Ergebnisse basierend auf einer Bedingung wiederzugeben, stell sicher das die Funktion immer ein `@return` Statement außerhalb des Conditional-Blocks besitzt.

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

## Loops

Da Sass komplexe Datenstrukturen wie [Listen](#listen) und [Maps](#maps) anbietet, ist es keine Überraschung das es Autoren ebenfalls die Möglichkeit gibt über diese zu iterieren.

Allerdings mögen Loops sonst eher komplexe Logik andeuten welche wahrscheinlich nicht zu Sass gehört. Bevor du einen Loop benutzt, vergewissere dich dass es Sinn macht und auch ein Problem löst.

### Each

Der `@each`\-Loop ist definitiv der meist genutzte aller von Sass zur Verfügung gestellten Loops. Es bietet eine saubere API um über eine Liste oder Map zu iterieren.

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

Wenn du über eine Map iterierst, benutze immer `$key` und `$value` als Variablennamen um konsistent zu bleiben.

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

Halte dich außerdem für eine bessere Lesbarkeit an folgende Richtlinien:

-   Immer eine neue Zeile vor `@each`;
-   Immer eine neue Zeile nach den schließenden Klammern (`}`), außer die nächste Zeile ist ebenfalls eine schließende Klammer (`}`).

### For

Der `@for`\-Loop ist in Kombination mit der CSS Pseudoklasse `:nth-*` hilfreich. Außer in diesem Fall, solltest du eher einen `@each`\-Loop verwenden wenn du über etwas iterieren _musst_.

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

Als Variablennamen solltest du immer `$i` verwenden. Dadurch hälst du dich an bekannte Konventionen und solange du keinen wirklichen guten Grund hast, nutze immer das `through`\-Keyword anstatt dem `to`\-Keyword. Viele Entwickler wissen nicht einmal das Sass diese Variationen anbietet, deshalb kann es zu Verwirrungen kommen.

Halte dich außerdem für eine bessere Lesbarkeit an folgende Richtlinien:

-   Immer eine neue Zeile vor `@for`;
-   Immer eine neue Zeile nach den schließenden Klammern (`}`), außer die nächste Zeile ist ebenfalls eine schließende Klammer (`}`).

### While

Der `@while`\-Loop hat absolut keinen Anwendungsfall in einem richtigem Sass Projekt, besonders da es keinen Weg gibt den Loop von Innen zu unterbrechen. **Auf keinen Fall verwenden**.

## Warnungen und Fehler

Wenn es ein Feature gibt welches von Entwicklern oft übersehen wird, dann ist es die Fähigkeit dynamisch Warnungen und Fehler auszugeben. Tatsächlich kommt Sass mit drei eigenen Funktionen um Inhalt in dem Standardausgabesystem (CLI, kompilierte App, …) darzustellen.

-   `@debug`;
-   `@warn`;
-   `@error`.

Lasst uns `@debug` mal zur Seite stellen, da es dazu vorgesehen ist SassScript zu debuggen, was nicht unser Punkt ist. Bleiben uns noch `@warn` und `@error`, welche prinzipiell identisch sind außer dass eines davon den Compiler stoppt und das andere nicht. Ich überlasse es dir zu schätzen, welches davon was tut.

Es gibt eine Menge Spielraum für Warnungen und Fehler in einem Sass Projekt. Grundsätzlich kann jedes Mixin oder Funktion, welche einen bestimmten Typ von Parameter akzeptiert, einen Fehler anzeigen sobald etwas schief geht oder eine Warnung wenn eine Vermutung angestellt wird.

### Warnungen

Nimm diese Funktion von [Sass-MQ](https://github.com/sass-mq/sass-mq), welche versucht einen `px`\-Wert in `em` umzuwandeln, als Beispiel:

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

Wenn der Wert ohne Einheit ist, geht die Funktion davon aus das es als Pixel behandelt werden soll. An dieser Stelle ist eine Vermutung eventuell zu riskant, deshalb sollte der Entwickler davor gewarnt werden dass die Software etwas unerwartes ausgeben könnte.

### Fehler

Fehler, im Gegenteil zu Warnungen, hindern den Compiler dabei weiter zu machen. Grundsätzlich halten sie die Verarbeitung an und zeigen in der Ausgabe die Nachricht sowie den Stacktrace an, welcher gut fürs debuggen ist. Deshalb sollten Fehler immer nur dann angezeigt werden, wenn es für das Programm keinen Weg mehr gibt weiterzumachen. Wenn möglich, versuch um das Problem herum zu arbeiten und stattdessen eine Warnung anzuzeigen.

Lass uns als Beispiel annehmen dass du eine Getter-Funktion hast um Werte aus einer bestimmten Map zu erreichen. Du könntest einen Fehler anzeigen wenn der angeforderte Key in der Map nicht existiert.

```
/// Map von z-index, sammelt alle Z-Ebenen der Applikation
/// @access private
/// @type Map
/// @prop {String} key - Name der Ebene
/// @prop {Number} value - Abbildung des Z-Wert eines Key's
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// Bekomm den z-index Wert durch den Ebenennamen
/// @access public
/// @param {String} $layer - Name der Ebene
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
/// Map von z-index, sammelt alle Z-Ebenen der Applikation
/// @access private
/// @type Map
/// @prop {String} key - Name der Ebene
/// @prop {Number} value - Abbildung des Z-Wert eines Key's
$z-indexes: ('modal': 5000, 'dropdown': 4000, 'default': 1, 'below': -1,)

/// Bekomm den z-index Wert durch den Ebenennamen
/// @access public
/// @param {String} $layer - Name der Ebene
/// @return {Number}
/// @require $z-indexes
@function z($layer)
  @if not map-has-key($z-indexes, $layer)
    @error 'There is no layer named `#{$layer}` in $z-indexes. '
         + 'Layer should be one of #{map-keys($z-indexes)}.'

  @return map-get($z-indexes, $layer)
```

Für weitere Informationen wie `@error` effizient zu verwenden ist, sollte [diese Einführung über Error-Handling](https://webdesign.tutsplus.com/tutorials/an-introduction-to-error-handling-in-sass--cms-19996) weiterhelfen.

## Tools

Was an einem so bekannten CSS Präprozessor wie Sass gut ist, dass es mit einem gesamten Ökosystem an Frameworks, Plugins, Libraries und Tools daher kommt. Nach 8 Jahren Existenz, kommen wir dem Punkt immer näher wo [alles was in Sass geschrieben werden kann, auch in Sass geschrieben werden sollte](https://kittygiraudel.com/2014/10/27/rethinking-atwoods-law/).

Deshalb ist mein Ratschlag die Anzahl von Dependencies auf ein Minium zu halten. Dependencies zu verwalten ist eine Art von Hölle wo du kein Teil von sein willst. Dazu gibt es, wenn es um Sass geht, kaum bis garkeinen Nutzen von externen Dependencies.

### Compass

[Compass](http://compass-style.org/) ist das [Hauptframework für Sass](https://www.sitepoint.com/compass-or-bourbon-sass-frameworks/) da draußen. Entwickelt von [Chris Eppstein](https://twitter.com/chriseppstein), einer der Hauptentwickler von Sass, glaube ich nicht dass es in nächster Zeit dramatisch an Popularität verlieren wird.

Dennoch [benutze ich Compass nicht mehr](https://www.sitepoint.com/dont-use-compass-anymore/), denn der Hauptgrund ist, dass es Sass ziemlich verlangsamt. Ruby Sass selber ist schon langsam, von daher macht noch mehr Ruby und Sass es nicht besser.

Das Ding ist, dass wir wirklich wenig von dem gesamten Framework verwenden. Compass ist groß. Cross-Browser Kompabilitäts-Mixins sind nur die Spitze des Eisbergs. Mathematische Funktionen, Image-Helfer, Spriting, … da gibt es soviel was mit dem großartigen Stück Software erledigt werden kann.

Unglücklicherweise ist das alles nur Zucker und es gibt kein wirkliches Killer-Feature. Eine Ausnahme könnte der Sprite-Builder sein, welcher _wirklich gut_ ist, aber [Grunticon](https://github.com/filamentgroup/grunticon) oder [Grumpicon](http://grumpicon.com/) erledigen den Job genauso gut und haben den Vorteil in dem Build-Prozess integriert werden zu können.

Wie auch immer, ich verbiete natürlich nicht Compass zu verwenden auch wenn ich es, gerade seitdem es nicht mit LibSass kompatibel (es gab sogar Bemühungen in die Richtung) sein wird, nicht empfehlen kann. Wenn du dich damit wohler fühlst, ist dass verständlich, aber ich denke nicht dass du am Ende des Tages viel davon haben wirst.

Ruby Sass wird aktuell hervorragenden Optimierungen unterzogen, welche speziell auf logikschwere Styles mit vielen Funktionen und Mixins abziehlen. Diese sollten die Performance bis zu dem Punkt dramatisch verbessern, wo Compass und andere Frameworks Sass eventuell nicht mehr verlangsamen.

### Gridsysteme

Kein Gridsystem zu benutzen ist keine Option mehr, gerade jetzt wo Responsive Webdesign überall ist. Um ein Design konsistent und stabil über alle Größen hinweg aussehen zu lassen, benutzen wir eine Art Grid um Elemente auszurichten. Um so ein Grid nicht immer und immer wieder zu erfinden, haben ein paar brilliante Leute Ihre wiederverwendbar gemacht.

Lass mich vorher klarstellen: ich bin kein großer Fan von Gridsystemen. Natürlich sehe ich das Potential, aber ich denke die meisten sind komplett Overkill und hauptsächlich dazu benutzt rote Spalten auf weißem Hintergrund für nerdige Designer Speaker-Decks zu zeichnen. Wann war das letzte mal wo du dachtest _Gott-sei-dank-dass-ich-dieses-Tool-zum-2-5-3.1-π-Grid-bauen-habe_? Genau, noch nie. Denn in den meisten Fällen wollen wir nur ein gewöhnliches 12-Spalten Grid, nichts ausgefallenes.

Falls du ein CSS Framework wie [Bootstrap](https://getbootstrap.com/) oder [Foundation](https://get.foundation/) für dein Projekt benutzt, sind die Chancen groß das es bereits ein eigenes Gridsystem beinhaltet. In diesem Fall schlage ich vor auch dieses zu benutzen, anstatt noch eine weitere Dependency dazu zu holen.

Wenn du an ein bestimmtes Gridsystem gebunden bist, wirst du dich freuen zu hören dass es zwei erstklassige Sass betriebene Grid-Maschinen gibt: [Susy](https://www.oddbird.net/susy/) und [Singularity](https://github.com/at-import/Singularity). Beide machen mehr als du jemals brauchst. Deshalb kannst du dir einfach das heraussuchen was du bevorzugst, und sicher sein das alle Anwendungsfälle—selbst die raffinierten— abgedeckt sind. Wenn du mich fragst, hat Susy eine leicht bessere Community, aber das ist lediglich meine Meinung.

Oder du schaust dir eine lässigere Variante wie [csswizardry-grids](https://github.com/csswizardry/csswizardry-grids) an. Alles in allem, die Wahl wird keine große Auswirkung auf deinen Codingstyle haben, deshalb liegt es absolut bei dir.

### SCSS-lint

Code zu linten ist wirklich wichtig. Generell hilft es die Guidelines eines Styleguides zu folgen, um dabei die Menge an Qualitätsfehlern im Code zu reduzieren. Aber niemand ist perfekt und es gibt immer etwas zu verbessern. Deshalb kann man sagen das linting genauso wichtig wie kommentieren ist.

[SCSS-lint](https://github.com/causes/scss-lint) ist ein Tool um dir zu helfen deine SCSS-Dateien sauber und lesbar zu halten. Es ist komplett flexibel und einfach mit deinen eigenen Tools zu kombinieren.

Glücklicherweise sind die SCSS-Lint Empfehlungen sehr ähnlich zu denen die hier in dem Dokument beschrieben wurden. Um SCSS-Lint korrekt mit den Sass Guidelines einzustellen, empfehle ich dir folgendes Setup:

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

Falls du nicht überzeigt von der Notwendigkeit SCSS-Lint zu benutzen bist, kann ich diese großartigen Artikel empfehlen: [Clean Up your Sass with SCSS-lint](https://blog.martinhujer.cz/clean-up-your-sass-with-scss-lint/), [Improving Sass code quality on theguardian.com](https://www.theguardian.com/info/developer-blog/2014/may/13/improving-sass-code-quality-on-theguardiancom) und [An Auto-Enforceable SCSS Styleguide](https://davidtheclark.com/scss-lint-styleguide/).

Falls du SCSS-Lint in deinen Grunt Prozess einbauen möchtest, freut es dich bestimmt zu wissen das es dafür bereits ein Grunt-Plugin namens [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint) gibt.

Falls du außerdem auf der Jagd nach einer schicken Anwendung bist, welche mit SCSS-Lint oder ähnlichen läuft, die Leute von [Thoughtbot](https://thoughtbot.com/) (Bourbon, Neat…) arbeiten an [Hound](https://houndci.com/).

## Too Long; Didn’t read

Diese Guidelines sind ziemlich lang, und manchmal ist es gut sie zusammengefasst in einer kürzeren Version zu haben. Weiter unten ist diese Zusammenfassung.

### Grundprinzipien

-   Einen Styleguide zu haben bedeutet **Konsistenz**. Falls du mit gewissen Regeln von Sass Guidelines nicht übereinstimmst, ist das kein Problem solange du konsistent damit bleibst.
-   Sass sollte so einfach wie möglich gehalten werden. Vermeide es unnötig komplexe Systeme zu bauen, solange es nicht absolut notwendig ist.
-   Vergiss nicht das _KISS_ (Keep It Simple, Stupid) manchmal besser ist als _DRY_ (Don’t Repeat Yourself).

### Syntax & Formatierung

-   Eine Einrückung wird mit zwei (2) Spaces gemacht, keine Tabs.
-   Zeilen sollten, so weit wie möglich, kürzer als 80 Zeichen sein. Du kannst sie auch in mehrere Zeilen aufteilen wenn notwendig.
-   CSS sollte ordentlich geschrieben sein, möglichst den [CSS Guidelines](https://cssguidelin.es) von Harry Roberts folgend.
-   Leerzeichen sind umsonst, benutze sie um Einheiten, Regeln und Deklarationen zu trennen. Zögere nicht leere Zeilen zu verwenden, es kann nie schaden.

### Strings

-   Die `@charset` Regel zu Anfang eines Stylesheets zu deklarieren wird empfohlen.
-   Solange nicht als CSS-Bezeichner verwendet, sollten Strings immer in einfachen Anführungszeichen geschrieben werden. URLs sollten auch in Anführungszeichen gesetzt werden.

### Zahlen

-   Sass unterscheidet nicht zwischen Nummern, Integer oder Gleitkommazahlen, deshalb sollten angehängte Nullen (0) weggelassen werden. Wie auch immer, führende Nullen (0) helfen der Lesbarkeit und sollten hinzugefügt werden.
-   Eine Länge von Null (0) sollte keine Einheit haben.
-   Einheitenmanipulation sollte als arithmetische Operation durchdacht werden, nicht als String Operation.
-   Um die Lesbarkeit zu verbessern, sollten Top-Level Berechnungen in Klammern geschrieben werden. Komplexe, mathematische Berechnungen sollten eventuell in kleinere Teile aufgeteilt werden.
-   Magische Zahlen sind schlechter Programmierstil und sollten unter allen Umständen vermieden werden. Falls Zweifel bestehen, füge einen ausführlichen Kommentar zu deinem Wert hinzu.

### Farben

-   Farben sollten wenn möglich in HSL, danach RGB und danach Hexadezimal (in Kleinbuchstaben und gekürzt) ausgedrückt werden. Farbkeywords sollten vermieden werden.
-   Ziehe `mix(..)` `darken(..)` und `lighten(..)` vor, wenn eine Farbe verdunkelt oder erhellt werden soll.

### Listen

-   Listen sollten mit Komma getrennt werden, solange sie nicht als direktes Mapping zu mit leerzeichen getrennten CSS-Werten verwendet.
-   Klammern sollten auch als Verbesserung der Lesbarkeit gesehen werden.
-   Einzeilige Listen sollten kein angehängtes Komma haben, mehrzeilige Listen schon.

### Maps

-   Maps mit mehr als einem Wert sollten auf mehreren Zeilen aufgeteilt werden.
-   Um der Wartbarkeit zu helfen, sollte das letzte Paar einer Map ein angehängtes Komma haben.
-   Map Keys die Strings sind, sollten wie jeder andere Strings angeführt werden.

### Anordnung der Deklaration

-   Die Art Deklarationen anzuordnen (alphabetisch, nach Typ, etc.) ist prinzipiell egal solange es konsistent bleibt.

### Verschachtelung von Selektoren

-   Vermeide Selektorverschachtelung wenn es nicht gebraucht wird (was meistens der Fall ist).
-   Benutze Selektorverschachtelung für Pseudo-Klassen und Pseudo-Elemente.
-   Media Queries können ebenfalls im jeweiligen Selektor verschachtelt werden.

### Namenskonventionen

-   Es ist am besten sich an eine CSS-Namenskonvention zu halten, die komplett in Kleinbuchstaben geschrieben und mit Bindestrich getrennt sind.

### Kommentieren

-   CSS ist eine knifflige Sprache; deshalb halte dich nicht zurück sehr ausführliche Kommentare über Dinge die Zweifelhaft aussehen (oder sind) zu schreiben.
-   Für Variablen, Funktionen, Mixins und Platzhalter führe eine globale API ein. Verwende SassDoc Kommentare.

### Variablen

-   Verwende den `!default` Flag für Variablen die Teil einer öffentlichen API sind un sicher geändert werden können.
-   Verwende nicht den `!global` Flag auf Root-Level da es in Zukunft möglicherweise ein Verstoß gegen die Sass Syntax sein könnte.

### Erweitern

-   Bleib dabei Platzhalter zu erweitern, keine bereits existierenden CSS-Selektoren.
-   Erweiter einen Platzhalter so wenig wie möglich um Seiteneffekte zu vermeiden.
