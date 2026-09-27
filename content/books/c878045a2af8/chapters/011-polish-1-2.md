## O autorze

Nazywam się [Kitty Giraudel](https://kittygiraudel.com). Jestem front-end developerem. Pochodzę z Francji, a mieszkam od 2015 roku w Berlinie. Obecnie pracuję w [Cofenster](https://www.cofenster.com).

Piszę w Sassie już od kilku lat i jestem autorem wielu projektów związanych z Sassem, takich jak [SassDoc](http://sassdoc.com), SitePoint Sass Reference i [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/). [Tutaj](https://github.com/KittyGiraudel/awesome-sass) znajduje się pełna lista projektów, które składają się na mój wkład do społeczności Sassa.

Napisałem ponadto książkę o CSSie (w jęz. francuskim) zatytułowaną [CSS3 Pratique du Design Web](https://www.eyrolles.com/Informatique/Livre/css3-9782212678963/) (wyd. _Eyrolles_), a także książkę o Sassie (w jęz. angielskim) pod tytułem [Jump Start Sass](https://learnable.com/books/jump-start-sass) (wyd. _Learnable_).

[Napisz do mnie na Twitterze](https://twitter.com/KittyGiraudel)

## Pomoc w tworzeniu

Sass Guidelines jest darmowym projektem, którym zajmuję się w swoim wolnym czasie. Wymaga on ode mnie dużo poświęcenia, by stale go aktualizować, dokładnie dokumentować i podnosić jego wartość merytoryczną. Na szczęście pomaga mi w tym wiele wspaniałych osób, zwłaszcza w utrzymywaniu [wielu różnych tłumaczeń](#options-panel). Nie zapomnij im podziękować!

Jeśli chcesz uczestniczyć w jego współtworzeniu, możesz tweetnąć o nim albo w dowolny inny sposób komuś o nim powiedzieć. Jeśli zauważysz jakiś błąd, choćby literówkę – byłoby świetnie, jeśli otworzysz issue, czy zrobisz pull request na [repozytorium projektu na Githubie](https://github.com/KittyGiraudel/sass-guidelines)!

I ostatnia rzecz, choć nie mniej ważna: jeśli spodoba Ci się ten przewodnik, albo jeśli uznasz go jako przydatny dla Twojego zespołu, proszę rozważ jego wsparcie, tak bym mógł nadal nad nim pracować!

[Wesprzyj Sass Guidelines](https://gum.co/sass-guidelines) [Tweetnij o Sass Guidelines](https://twitter.com/share?text=Sass+Guidelines%2C+An+opinionated+styleguide+for+writing+sane%2C+maintainable+and+scalable+Sass+by+%40KittyGiraudel+%E2%80%93&url=https://sass-guidelin.es)

## O Sassie

Zdaniem twórców [Sassa](https://sass-lang.com), zawartym w jego [dokumentacji](https://sass-lang.com/documentation/file.SASS_REFERENCE.html):

> Sass jest rozszerzeniem dla CSSa, które dodaje mu mocy i elegancji.

Głównym zadaniem Sassa jest wyeliminowanie wad CSSa. Jak wszyscy wiemy, CSS nie jest najlepszym językiem świata \[potrzebne źródło\]. Z jednej strony jest on niewątpliwie łatwy do przyswojenia, z drugiej zaś niejednokrotnie zdarza się, że nasza baza kodu CSSa staje się niepotrzebnie skomplikowana i rozbudowana, zwłaszcza przy większych projektach.

W tym miejscu pojawia się Sass, jako tzw. meta-język, by poprawić składnię CSSa. Zapewnia on ponadto szereg dodatkowych cech i użytecznych narzędzi. Jednocześnie, Sass pozostaje dość konserwatywnym uzupełnieniem klasycznego CSSa.

Jego celem nie jest przekształcenie CSSa w pełnoprawny język programowania z prawdziwego zdarzenia. Sass jedynie pomaga tam, gdzie CSS zawodzi. Z tego też powodu, rozpoczynanie przygody z Sassem nie jest wcale trudniejsze od nauki CSSa: jest to bowiem jedynie zestaw dodatków rozwijających podstawową funkcjonalność.

Tym samym, istnieje wiele sposobów na korzystanie z tych dodatkowych rozwiązań. Niektóre są poprawne, niektóre mniej, a niektóre też są niezwykłe. Ten przewodnik ma na celu przedstawienie spójnego i dobrze udokumentowanego podejścia do pisania kodu w Sassie.

### Ruby Sass czy LibSass

[Pierwszy commit Sassa](https://github.com/hcatlin/sass/commit/fa5048ba405619273e474a50400c7243fbff54fe) pochodzi z końca 2006 roku, a więc było to ponad 8 lat temu. Nie trzeba więc dodawać, że Sass przebył dość długą drogę. Choć początkowo rozwijany w Ruby, od tego czasu pojawił się szereg różnych portów. Ten najbardziej kompletny, [LibSass](https://github.com/sass/libsass) (napisany w C/C++), jest bliski do pełnej kompatybilności z oryginalną wersją, napisaną w Ruby.

W 2014 roku, [zespoły pracujące nad Ruby Sass i LibSass postanowiły poczekać aby obie wersje się zrównały pod względem kompletności, zanim zaczną pracować nad nowymi udoskonaleniami](https://github.com/sass/libsass/wiki/The-LibSass-Compatibility-Plan). Od tego czasu, LibSass aktywnie wydaje nowe wersje swojego projektu i dąży do wyrównania ze swoim starszym bratem. Ostatnie pozostałe nieścisłości zostały zebrane i skategoryzowane przeze mnie w projekcie [Sass-Compatibility](https://kittygiraudel.github.io/sass-compatibility/). W przypadku znania jakichś innych nieścisłości pomiędzy tymi obiema wersjami kompilatorów Sassa, które nie zostały tam podane – bardzo proszę o utworzenie nowego issue.

Wracając do doboru kompilatora. Tak naprawdę, to wszystko zależy od konkretnego projektu. Jeśli oparty jest on o Ruby on Rails, oczywiście lepiej korzystać z Ruby Sass, który będzie idealnie z nim współgrał. Ponadto, Ruby Sass będzie zawsze tą pierwszorzędną implementacją i zawsze będzie o krok przed LibSassem, jeśli chodzi o dodatkową funkcjonalność.

W przypadku zaś projektów nieopartych o Ruby, a które wymagają integracji z określonym porządkiem pracy, LibSass będzie prawdopodobnie lepszym rozwiązaniem. Jest on bowiem stworzony pod kątem wykorzystania go przez różne wrappery. W przypadku chęci użycia go z Node.js, [node-sass](https://github.com/sass/node-sass) będzie dla Ciebie idealny.

**Dalsze informacje:**

-   [Getting to know LibSass](https://webdesign.tutsplus.com/articles/getting-to-know-libsass--cms-23114)
-   [Switching from Ruby Sass to LibSass](https://www.sitepoint.com/switching-ruby-sass-libsass/)

### Sass czy SCSS

Panuje powszechnie dosyć spore zamieszanie, jeśli chodzi o znaczenie nazwy _Sass_ i nie jest to bez powodu. Sass bowiem jest zarówno określeniem dla preprocesora, jak i swojej składni. Może to się wydawać nie do końca jasne, prawda?

Prawda jest taka, że Sass początkowo był określeniem dla składni, której cechą charakterystyczną była wrażliwość na indentację. Wkrótce potem, deweloperzy zarządzający Sassem postanowili zacieśnić różnicę między Sassem a CSSem udostępniając przyjazną CSSowi składnię zwaną _SCSS_, czyli _Sassy CSS_. Głównym założeniem temu przyświecającym było to, że jeśli coś jest zgodne z CSSem, jest też zgodne z SCSSem.

Od tego czasu, Sass (preprocesor) obsługuje dwie różne składnie: Sass (tylko nie wielkimi literami, [proszę](http://sassnotsass.com)), znany także jako _wcięta składnia_, i SCSS. Wybór między nimi należy tak naprawdę do autora kodu, bowiem obie są zgodne ze sobą jeśli chodzi o funkcjonalność. Różnica dotyczy tylko i wyłącznie kwestii estetycznych.

Wrażliwa na tzw. znaki niedrukowalne składnia opiera się na indentacji zmiast nawiasach klamrowych, średników czy innych znaków interpunkcyjnych, prowadząc do czystszej i krótszej składni. SCSS tymczasem jest łatwiejszy do nauki, bowiem składa się on tylko z niewielu drobnych dodatków do samego CSSa.

Osobiście preferuję SCSS nad Sassem z powodu większej kompatybilności z CSSem i łatwości przyswojenia go sobie dla większości deweloperów. Z tego też powodu, w poniższym przewodniku posługiwać się będę raczej SCSSem niż Sassem. Można jednak w każdej chwili zmienić składnię przykładów tego przewodnika w .

**Dalsze informacje:**

-   [What’s the difference between Sass and SCSS](https://www.sitepoint.com/whats-difference-sass-scss/)

### Inne preprocesory

Sass jest jednym z wielu dostępnych preprocesorów. Jego głównym konkurentem zdaje się być [LESS](http://lesscss.org/), który jest oparty o Node.js i który to zyskał popularność dzięki znanemu frameworkowi CSS, [Bootstrapowi](https://getbootstrap.com/). Znany jest także [Stylus](https://stylus-lang.com/) - zdający się być niczym nieskrępowaną wersją LESSa - z użyciem którego możesz zrobić w zasadzie wszystko, bowiem przekształca on właściwie CSS w pełnoprawny język programowania.

_Dlaczego wybrać Sass zamiast LESS czy innego preprocesora?_ jest wciąż aktualnym dziś pytaniem. Nie tak dawno temu rekomendowaliśmy Sass dla projektów bazujących dla Ruby właśnie dlatego, że był on pierwszym preprocesorem stworzonym w Ruby i dobrze współgrał z Ruby on Rails. Teraz, gdy LibSass nadgonił (w zasadzie) z oryginalnym Sassem, ten argument nie jest do końca właściwym.

Tym, co lubię w Sassie, jest jego konserwatywne podejście do CSSa. Design Sassa jest oparty na silnych podstawach: większość z rozwiązań składających się na Sass wynika z założenia twórców, że a) implementowanie dodatkowych funkcjonalności, z uwagi na ich kompleksowość, powinno być uzasadnione faktyczną ich użytecznością i b), że nie powinny one stwarzać trudności przy ocenie tego, co dany blok stylów robi. Ponadto, Sass zdaje się mieć znacznie lepsze podejście do detali od innych preprocesorów. Główni deweloperzy Sassa przykładają szczególną wagę do wspierania każdego możliwego wariantu dotyczącego pracy z CSSem i do tego, by wszystko było ze sobą spójne.

Innymi słowy, Sass nie jest tym preprocesorem, który zadowoli takich programistów jak ja poprzez dodawanie nadzwyczajnych funkcjonalności ponad to, co jest zawarte w języku, który od początku nie był do tego stworzony. Jest to oprogramowanie służące do rozwiązywania faktycznych problemów, pomagające w dostarczeniu użytecznych funkcjonalności do CSSa tam, gdzie mu ich brakuje.

Pomijając na chwilę kwestię preprocesorów, powinniśmy tutaj poruszyć też kwestię postprocesorów, które ostatnimi czasy stały się niesamowicie popularne. Stało się to głównie dzięki projektom takim jak [PostCSS](https://github.com/postcss/postcss) i [cssnext](https://cssnext.github.io/). Nazywane są często “postprocesorami”, bowiem transpilują składnię ze standardów, które dopiero nadchodzą, do powszechnego dzisiaj CSSa. Są one jednak zasadniczo tym samym co preprocesory, oprócz tego że nie zapewniają one niczego ponad funkcjonalność, która ma się pojawić w nadchodzących specyfikacjach składni CSS.

Można myśleć o postprocesorach jako polyfillach dla niewspieranych funkcjonalności CSSa. Dla przykładu, dają one możliwość pisania zmiennych w sposób, o jakim mówi [specyfikacja CSS](https://drafts.csswg.org/css-variables/). Takie arkusze stylów kompiluje się potem za pomocą postprocesora, w rezultacie czego wszystkie zmienne zastępowane są faktycznymi wartościami, zupełnie jak w przypadku Sassa.

Postprocesorom przyświeca idea dostarczania nowych, projektowanych dopiero funkcjonalności CSSa (takich jak zmienne) tym przeglądarkom, które tego obecnie nie wspierają. Gdy zaś rozwiązania te zaczną być powszechnie obsługiwane, postprocesor przestanie działać na rzecz przeglądarki.

Podczas gdy umożliwianie korzystania z przyszłej składni jest czymś, co zasługuje na pochwałę, nadal preferuję korzystać z Sassa. Są jednak rzeczy, do których postprocesor zdaje się być bardziej odpowiednim narzędziem niż Sass - prefixowanie CSSa dla przykładu - jednak do tego jeszcze tutaj wrócimy.

## Wprowadzenie

### Czemu służy ten przewodnik

Przewodnik stylu nie stanowi tylko przyjemności do czytania, prezentującej idealny stan kodu. Jest to przede wszystkim kluczowy dokument w życiu danego projektu, opisujący jak i dlaczego powinniśmy pisać określony kod. Może się wydawać, że jest to przesada dla małych projektów, pomaga on jednak w utrzymywaniu kodu czystego, skalowalnego w zależności od rozmiaru projektu i łatwego w utrzymaniu.

Nie wymaga to zatem podkreślenia, że im więcej deweloperów jest zaangażowanych do danego projektu, tym bardziej niezbędny zdaje się być taki przewodnik. I analogicznie - im większy jest projekt, tym istotniejszym jest przewodnik.

[Harry Roberts](https://csswizardry.com) określił to bardzo dobrze w [CSS Guidelines](https://cssguidelin.es/#the-importance-of-a-styleguide):

> Przewodnik stylu kodu (zaznaczam, nie chodzi tu o przewodnik po wizualnym stylu) jest cennym narzędziem dla zespołów, które:
> 
> -   budują i utrzymują produkty przez określony okresu czasu;
> -   składają się z deweloperów o różnych umiejętnościach i specjalizacjach;
> -   mają wielu różnych deweloperów pracujących nad danym produktem jednocześnie;
> -   regularnie wprowadzają nowych pracowników;
> -   posiadają określoną liczbę baz kodu, z których deweloperzy na bieżąco korzystają.

### Zastrzeżenie

Przede wszystkim: **to nie jest przewodnik po stylu dla CSSa**. Ten dokument nie będzie dotyczył konwencji nazewnictwa dla klas w CSSie, wzorów modularnych czy kwestii selektorów ID. Przewodnik ten zajmie się tylko i wyłącznie sprawami związanymi z Sassem.

Ponadto, został on napisany przeze mnie i przez to jest on **bardzo subiektywny**. Należy go traktować jako zbiór metodologii i porad, które wykorzystywałem i którymi się dzieliłem przez lata. Pozwala mi on jednocześnie na podlinkowanie wszelakiej maści pożytecznych źródeł, dlatego też sprawdzaj _dalsze informacje_ dla każdej z sekcji.

Nie ulega wątpliwości natomiast, że poradnik ten nie jest jedynym źródłem informacji i nie ma on wyłączności na prawdę. Co więcej - może się okazać, że wcale nie będzie odpowiadał konkretnym projektom. Zalecane jest więc korzystanie i adaptowanie go do własnych potrzeb. Jak zawsze, _to może działać inaczej w Twoim przypadku (your mileage may vary)_.

### Kluczowe reguły

Koniec końców, jeżeli miałbym określić jedyną rzecz jaką chciałbym, by została wyniesiona z czytania tego przewodnika, to jest nią to, że **Sass powinien być pisany tak prosto, jak to jest tylko możliwe**.

Dzięki moim zabawnym eksperymentom, takim jak [operator bitowy](https://github.com/KittyGiraudel/SassyBitwise), [iteratory i generatory](https://github.com/KittyGiraudel/SassyIteratorsGenerators) czy [parser JSON](https://github.com/KittyGiraudel/SassyJSON) napisanym w Sassie, możemy się przekonać jak dużo jest możliwe dzięki Sassowi.

Nie zapominajmy jednak, że CSS jest prostym językiem. Sass, którego celem jest pisanie CSSa, nie powinien zwiększać jego stopnia skomplikowania. [Zasada KISS](https://pl.wikipedia.org/wiki/KISS_\(reguła\)) (Keep It Simple, Stupid) jest tu kluczowa i można nawet stwierdzić, że przysłania ona [zasadę DRY](https://pl.wikipedia.org/wiki/DRY) (Don’t Repeat Yourself) w niektórych przypadkach.

Czasami warto się trochę powtórzyć i dzięki temu sprawić, że nasz kod stanie się łatwiejszy do utrzymania. Jest to zdecydowanie lepsze rozwiązanie niż ciężki, niekontrolowalny i niepotrzebnie skomplikowany kod, którego utrzymanie w dłuższej perspektywie jest wręcz niemożliwe.

Poza tym, zacytuję raz jeszcze [Harry’ego Robertsa](https://csswizardry.com) - **pragmatyzm wygrywa z perfekcjonizmem**. Na jakimś etapie zapewne stwierdzisz, że to co robisz nie jest do końca zgodne z zasadami opisanymi w tym przewodniku. Jeżeli ma to sens, jeżeli wydaje się to prawidłowe - rób to po swojemu. Nie zapominajmy wszak, że kod jest jedynie środkiem, nie celem.

### Rozwijanie przewodnika

Przeważająca część tego przewodnika jest wysoce subiektywna. Czytam i piszę o Sassie już od wielu lat i z tego też powodu mam swoje określone zasady, jeśli chodzi o pisanie przejrzystych arkuszy stylów. Rozumiem jednak, że mogą one nie spodobać się, bądź nie pasować każdemu i jest to zupełnie normalne.

Jestem przekonany, że tego typu przewodniki powinny być tworzone z myślą o ich rozwijaniu. Rozwijanie Sass Guidelines jest tak łatwe, jak umieszczenie w odpowiednim miejscu w projekcie informacji, że zawarty w nim kod pisany jest w zgodzie zasadami przedstawionymi w tym przewodniku, za wyjątkiem kilku reguł - a reguły te powinny być przedstawione poniżej.

Przykład takiego rozwinięcia przewodnika jest dostępny na [repozytorium SassDoc](https://github.com/SassDoc/sassdoc/blob/master/GUIDELINES.md):

> To jest rozwinięciem [Node Styleguide](https://github.com/felixge/node-style-guide), autorstwa Felixa Geisendörfera. Wszystko z tego dokumentu “nadpisuje” to, co znajduje się w Node Styleguide.

**Dalsze informacje:**

-   [Keep Sass Simple](https://www.sitepoint.com/keep-sass-simple/)

## Składnia i formatowanie

Pierwszą rzeczą, jaką powinien się zająć przewodnik po stylu jest niewątpliwie to, w jaki sposób nasz kod ma wyglądać.

Kiedy CSSem w tym samym projekcie zajmuje się kilku deweloperów, zazwyczaj jest to tylko kwestią czasu kiedy ktoś zacznie pisać rzeczy po swojemu. Przewodniki po stylu kodu, które promują spójność nie tylko temu zapobiegają, lecz także pomagają w czytaniu i aktualizowaniu kodu.

W dużym skrócie, chcemy (bezwstydnie zainspirowane przez [CSS Guidelines](https://cssguidelin.es/#syntax-and-formatting)):

-   indentacji składających się z (2) spacji, bez tabulatorów,
-   najlepiej 80 znaków w linii,
-   prawidłowo napisanych wieloliniowych reguł CSSa,
-   sensownego użycia tzw. znaków niedrukowalnych (whitespaces).

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
// Oparta na indentacjach składnia Sass wymusza określone standardy kodu
// więc kwestię nawiasów kwadratowych mamy z głowy
.foo
  display: block
  overflow: hidden
  padding: 0 1em
```

W tej sekcji nie zajmiemy się jeszcze zagadnieniem organizacji plików. Poruszone to zostanie w [dalszym miejscu](#architektura).

### Ciągi znaków

Choć może się to wydawać nie do końca oczywistym, łańcuchy (ciągi znaków) odgrywają kluczową rolę w ekosystemach CSS i Sass. Większość wartości w CSSie jest przedstawiana jako liczby albo jako łańcuchy (zazwyczaj bez znaków cudzysłowów), dlatego też niezbędnym jest trzymanie się pewnych zasad podczas pracy z łańcuchami w Sassie.

#### Encoding

Aby uniknąć potencjalnych problemów z kodowaniem znaków (character encoding), zalecanym jest by stosować system [UTF-8](https://pl.wikipedia.org/wiki/UTF-8) w [głównym arkuszu](#gwny-plik) z użyciem dyrektywy `@charset`. Należy się również upewnić, by był to pierwszy element w arkuszu i żeby nic wcześniej się przed nim nie znajdowało.

```
@charset 'utf-8';
```

```
@charset 'utf-8'
```

#### Cudzysłowia

CSS nie wymaga by łańcuchy (ciągi) znaków były umieszczane między cudzysłowami, nawet te zawierające spacje. Weźmy nazwy font-family dla przykładu: dla parsera CSS nie ma znaczenia, czy otoczymy je cudzysłowami, czy też nie.

Z tego powodu Sass _także_ nie wymaga, by ciągi znajdowały się między cudzysłowami. Co ciekawe (i na całe szczęście), ciąg umieszczony między takimi znakami jest dokładnie równy ciągowi bez cudzysłowów (`'abc'` jest ściśle równy `abc`).

Języki programowania, które nie wymagają by łańcuchy znaków były umieszczane między cudzysłowami, należą jednak do rzadkości i z tego też powodu **ciągi powinny być zawsze otoczone znakami pojedynczych cudzysłowów** w Sassie (pojedyncze z tego względu, że na standardowej klawiaturze QWERTY łatwiej jest ich użyć, niż podwójnych). Oprócz spójności z innymi językami, łącznie z kuzynem CSS - JavaScriptem, jest także szereg innych dla tego powodów:

-   nazwy kolorów traktowane są jako faktyczne kolory, gdy są pozbawione cudzysłowów, co może prowadzić do poważnych problemów,
-   większość rozwiązań do podświetlania składni (syntax highlighters) może mieć problem z ciągami pozbawionymi cudzysłowów,
-   poprawia to ogólną czytelność,
-   nie ma absolutnie żadnego słusznego powodu, by nie umieszczać ciągów pomiędzy cudzysłowami.

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

Zgodnie ze specyfikacją CSS, dyrektywa `@charset` powinna być deklarowana w podwójnych cudzysłowach [aby być uznana za właściwą](https://www.w3.org/TR/css3-syntax/#charset-rule). Co ciekawe, Sass na etapie kompilacji do CSSa zajmuje się także i tą regułą. Można tym samym spokojnie korzystać ze znaków pojedynczego cudzysłowa, nawet dla `@charset`.

#### Ciągi jako wartości w CSSie

Niektóre z wartości CSS, takie jak `initial` czy `sans-serif` wymagają, by nie znajdowały się pomiędzy cudzysłowami. Deklaracja `font-family: 'sans-serif'` zostanie pominięta, bowiem CSS oczekuje identyfikatora, a nie ciągu w cudzysłowach. Z tego też powodu unikamy umieszczania tych wartości w cudzysłowach.

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

Możemy dzięki temu zauważyć różnicę pomiędzy ciągami przeznaczonymi do użycia jako wartości CSS (identyfikatory), jak te w poprzednim przykładzie, oraz ciągami wykorzystywanymi przy typach danych w Sassie, jak na przykład klucze map.

Tych pierwszych nie umieszczamy w cudzysłowach, te drugie natomiast pomiędzy znakami pojedzynczych cudzysłowów (`'`).

#### Ciągi zawierające cudzysłowy

Jeżeli ciąg zawiera jeden lub więcej cudzysłowów, można rozważyć umieszczenie całego ciągu wewnątrz znaków podwójnych cudzysłowów (`"`). Zaoszczędzi nam to korzystanie ze zbyt wielu tzw. znaków ucieczki.

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

#### Adresy URL

Adresy URL także powinny być otaczane cudzysłowami, z tych samych powodów:

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

**Dalsze informacje:**

-   [All You Ever Need to Know About Sass Interpolation](https://webdesign.tutsplus.com/tutorials/all-you-ever-need-to-know-about-sass-interpolation--cms-21375)
-   [SassyStrings](https://github.com/KittyGiraudel/SassyStrings)

### Liczby

W Sassie, liczby są typem danych w którego skład wchodzą zarówno liczby niemianowane (bez jednostek), określenia dla długości, frekwencji, kątów i tak dalej. Pozwala to na przeprowadzanie na tych wartościach obliczeń.

#### Zera

Liczby powinny zawierać zero przed znakiem dziesiętnym, jeżeli ich wartość wynosi mniej niż jeden. Nigdy nie dodawajmy zer końcowych.

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

W Sublime Text i innych edytorach, które wykorzystują wyrażenia regularne (regular expressions) dla wyszukiwania i zastępowania, bardzo łatwo dodaje się poprzedzające zera do (każdych, jeśli nie wszystkich) liczb zmiennoprzecinkowych. Wystarczy bowiem zamienić `\s+\.(\d+)` na `\ 0.$1`. Nie zapomnij jednak o spacji przed `0`.

#### Jednostki

Zajmując się długościami, wartość `0` nigdy nie powinna mieć jednostki.

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

Uwaga, praktyka ta powinna być ograniczona jedynie do długości. Pominięcie jednostki w przypadku takiej własności jak `transition-delay` jest niedozwolone. W teorii, pozbawione jednostki zero przypisane jako wartość czasu trwania animacji czy przejścia jest nieprawidłowe i będzie zignorowane. Nie wszystkie przeglądarki są jednak tak surowe. Pamiętajmy jednak, by omijać jednostki tylko i wyłącznie dla wartości reprezentujących długości.

Najczęściej powtarzającym się błędem jaki przychodzi mi do głowy na myśl o liczbach w Sassie jest przekonanie, że jednostki są po prostu ciągami znaków, które można swobodnie i bezpiecznie dodawać do liczby. O ile może się wydawać, że tak jest, w rzeczywistości jednostki wcale tak nie funkcjonują. Należy myśleć o jednostkach jako matematycznych symbolach. Dla przykładu, mnożąc 5 cali przez 5 cali uzyskamy wynik 25 cali kwadratowych. Ta sama logika tyczy się Sassa.

By dodać jednostkę do liczby, należy pomnożyć tą liczbę przez _1 jednostkę_.

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

Pamiętaj, że dodając _0 tej jednostki_ też zadziała, lecz ja bym rekomendował używanie wyżej wspomnianej metody. Dodawanie _0 jednostki_ może być trochę mylące. I tak, próbując przekonwertować liczbę do innej, kompatybilnej jednostki, dodawanie 0 nie zadziała.

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

Ostatecznie zależy to w dużej mierze od tego, co staramy się osiągnąć. Należy mieć jednak na uwadze to, że dodawanie jednostki jako ciągu znaków nie jest dobrym rozwiązaniem.

By usunąć jednostkę z określonej wartości, dzielmy ją przez _jedną jednostkę jej typu_.

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

Dodając jednostkę jako ciąg do liczby uzyskujemy ciąg, wykluczając jakiekolwiek dodatkowe operacje na tej wartości. Wycinając sam numer z liczby zawierającej określenie jednostki również skutkować będzie otrzymaniem ciągu. A przecież nie o to nam chodzi.

#### Obliczenia

**Obliczenia najwyższego poziomu powinny być zawsze otoczone nawiasami**. Ten wymóg nie tylko drastycznie poprawia czytelność kodu, zapobiega on także niektórym rzadkim sytuacjom wymuszając na Sassie określenie wartości tego, co zawarte jest w tym nawiasie.

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

#### Liczby magiczne

Liczby magiczne są elementem [programowania starego typu](https://en.wikipedia.org/wiki/Magic_number_\(programming\)#Unnamed_numerical_constants) i określają _nienazwaną wartość liczbową_. Innymi słowy, są to losowe liczby które _po prostu działają_™, nie mając żadnego logicznego wyjaśnienia.

Rzecz jasna, **liczby magiczne są plagą i powinny być unikane za wszelką cenę**. Jeśli nie można sobie poradzić ze znalezieniem rozsądnego wytłumaczenia dlaczego dana liczba jest po prostu odpowiednia, pamiętajmy się o dodaniu wyczerpującego komentarza wyjaśniającego dlaczego na taką liczbę się zdecydowaliśmy i dlaczego się ona tutaj sprawdza. Przyznanie się do tego, że czegoś do końca nie wiemy jest zawsze lepsze dla innego dewelopera, niż pozostawianie im takiej łamigłówki do rozwiązania.

```
/**
 * 1. Magiczna liczba. Wartość ta jest najniższą jaką znalazłem,
 * która pozwala mi na wyrównanie góry `.foo` z jego parentem.
 * Najlepiej by jednak było, gdybyśmy to porządnie zrobili.
 */
.foo {
  top: 0.327em; /* 1 */
}
```

```
/**
 * 1. Magiczna liczba. Wartość ta jest najniższą jaką znalazłem,
 * która pozwala mi na wyrównanie góry `.foo` z jego parentem.
 * Najlepiej by jednak było, gdybyśmy to porządnie zrobili.
 */
.foo
  top: 0.327em /* 1 */
```

**Dalsze informacje:**

-   [Use Lengths, Not Strings](https://kittygiraudel.com/2013/09/03/use-lengths-not-strings/)
-   [Correctly Adding Unit to Number](https://css-tricks.com/snippets/sass/correctly-adding-unit-number/)
-   [Magic Numbers in CSS](https://css-tricks.com/magic-numbers-in-css/)
-   [Sassy-Math](https://github.com/at-import/sassy-math)

### Barwy

Barwy stanowią istotny element języka, jakim jest CSS. Jak moglibyśmy się już do tego przyzwyczaić, Sass jest cennym pomocnikiem także w kwestii manipulacji barwami, głównie za zasługą jego [funkcji](https://sass-lang.com/documentation/Sass/Script/Functions.html).

#### Formaty barw

Aby uczynić zagadnienie dotyczące barw najprostszym jak się tylko da, zalecałbym uszanować następujący porządek preferencji, jeśli chodzi o formaty barw:

1.  [HSL](https://pl.wikipedia.org/wiki/HSL);
2.  [RGB](https://pl.wikipedia.org/wiki/RGB);
3.  Określenia szesnastkowe (małymi literami i skrócone).

Słowa kluczowe reprezentujące barwy nie powinny być używane, za wyjątkiem szybkiego prototypowania projektu. Są one słowami z języka angielskiego i często, zwłaszcza dla osób dla których język angielski nie jest językiem ojczystym, nie najlepiej opisują kolor, jaki reprezentują. Ponadto, słowa kluczowe nie są w pełni semantyczne, np. `grey` jest faktycznie ciemniejszy od `darkgrey`, a mylenie `grey` i `gray` może prowadzić do niekonsekwentnego używania tego koloru.

Format HSL jest nie tylko najłatwiejszym do pojęcia dla ludziego mózgu\[potrzebne źródło\], ale także czyni prostym dla osób tworzących arkusze stylów modyfikowanie barw poprzez regulowanie osobno odcienia, nasycenia i jasności.

RGB posiada zaś tą zaletę, że patrząc na dane wartości w łatwy sposób możemy określić, czy dany kolor ma barwę bardziej zbliżoną do niebieskiego, zielonego czy czerwonego, jednak nie czyni on prostym faktyczne budowanie barwy z tych trzech części.

Na koniec, określenia szesnastkowe są dla ludzkiego umysłu niemal nie do rozszyfrowania. Używaj ich jedynie w ostateczności.

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

Używając systemu HSL czy RGB, zawsze dodawaj pojedynczą spację po przecinku (`,`), lecz bez spacji pomiędzy nawiasami (`(`, `)`) i ich zawartością.

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

#### Barwy i zmienne

Używając danej barwy więcej niż jeden raz, warto ją umieścić w zmiennej o nazwie, która w sposób konkretny reprezentuje dany kolor.

```
$sass-pink: hsl(330, 50%, 60%);
```

```
$sass-pink: hsl(330, 50%, 60%)
```

W tym momencie można używać tej zmiennej kiedykolwiek zachodzi taka potrzeba. Pamiętajmy jednak, że jeśli jej użycie jest silnie powiązane z określonym motywem, zalecałbym nie używać tej zmiennej “tak po prostu”. Zamiast tego, warto by ją przypisać do jakiejś innej zmiennej o nazwie objaśniającej jak powinna być właściwie użyta.

```
$main-theme-color: $sass-pink;
```

```
$main-theme-color: $sass-pink
```

Robiąc to w ten sposób zapobiega się sytuacji, w której zmiana motywu doprowadzi do czegoś jak `$sass-pink: blue`.

#### Rozjaśnianie i przyciemnianie barw

Funkcje służące zarówno [`rozjaśnianiu`](https://sass-lang.com/documentation/Sass/Script/Functions.html#lighten-instance_method), jak i [`przyciemnianiu`](https://sass-lang.com/documentation/Sass/Script/Functions.html#darken-instance_method) barw manipulują jasnością koloru w przestrzeni barwy HSL poprzez dodawanie lub, odpowiednio, odejmowanie od tejże jasności. Zasadniczo są one jedynie nazwą zastępczą (aliasem) dla parametru `$lightness` funkcji [`adjust-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#adjust_color-instance_method).

Rzecz w tym, że te funkcje często nie prowadzą do takich rezultatów, jakich od nich oczekujemy. Z drugiej jednak strony, funkcja [`mix`](https://sass-lang.com/documentation/Sass/Script/Functions.html#mix-instance_method) jest ciekawym rozwiązaniem dla rozjaśniania lub przyciemniania barw. Robi to poprzez mieszanie koloru z barwą `white` (białą), lub `black` (czarną).

Korzyścią z używania funkcji `mix`, zamiast jednej z tych poprzednio wspomnianych, jest niewątpliwie fakt, że zapewnia ona progresywne przejście do czerni (lub bieli) w trakcie zmniejszania proporcji głównego koloru, w czasie gdy funkcje `darken` i `lighten` w sposób o wiele bardziej nagły wytracają nasz kolor.

  

Ilustracja pokazująca różnicę pomiędzy funkcjami `lighten`/`darken` i `mix`, stworzona przez [KatieK](https://codepen.io/KatieK2/pen/tejhz/)

Aby nie używać pełnej funkcji `mix` za każdym razem, można stworzyć dwie, proste w użyciu, funkcje `tint` i `shade` (będące, co ciekawe, częścią [Compassa](http://compass-style.org/reference/compass/helpers/colors/#shade)), które dadzą ten sam efekt:

```
/// Stopniowo rozjaśniaj kolor
/// @access public
/// @param {Color} $color - kolor do rozjaśnienia
/// @param {Number} $percentage - procent pierwotnego `$color` w zwróconej wartości
/// @return {Color}
@function tint($color, $percentage) {
  @return mix(white, $color, $percentage);
}

/// Stopniowo przyciemniaj kolor
/// @access public
/// @param {Color} $color - kolor do przyciemnienia
/// @param {Number} $percentage - procent pierwotnego `$color` w zwróconej wartości
/// @return {Color}
@function shade($color, $percentage) {
  @return mix(black, $color, $percentage);
}
```

```
/// Stopniowo rozjaśniaj kolor
/// @access public
/// @param {Color} $color - kolor do rozjaśnienia
/// @param {Number} $percentage - procent pierwotnego `$color` w zwróconej wartości
/// @return {Color}
@function tint($color, $percentage)
  @return mix($color, white, $percentage)

/// Stopniowo przyciemniaj kolor
/// @access public
/// @param {Color} $color - kolor do przyciemnienia
/// @param {Number} $percentage - procent pierwotnego `$color` w zwróconej wartości
/// @return {Color}
@function shade($color, $percentage)
  @return mix($color, black, $percentage)
```

Funkcja [`scale-color`](https://sass-lang.com/documentation/Sass/Script/Functions.html#scale_color-instance_method) zaprojektowana została w celu skalowania właściwości bardziej płynnie, biorąc pod uwagę ich pierwotny wysoki, bądź niski, poziom. Co do zasady powinna przynosić efekt zbliżony do tego z funkcji `mix`, lecz sposób jej użycia może być nieco czytelniejszy. Czynnik odpowiadający za skalowanie nie jest jednak identyczny.

**Dalsze informacje:**

-   [A Visual Guide to Sass & Compass Color Functions](http://jackiebalzer.com/color)
-   [How to Programmatically Go From One Color to Another](https://kittygiraudel.com/2014/01/30/programmatically-go-from-one-color-to-another-with-sass/)
-   [Sass Color Variables That Don’t Suck](https://davidwalsh.name/sass-color-variables-dont-suck)
-   [Using Sass to Build Color Palettes](https://www.sitepoint.com/using-sass-build-color-palettes/)
-   [Dealing with Color Schemes in Sass](https://www.sitepoint.com/dealing-color-schemes-sass/)

### Listy

Listy są w Sassie odpowiednikiem tablic (arrays). Lista jest typem płaskiej struktury danych (w przeciwieństwie do [map](#mapy)), która stworzona została w celu przechowywania wartości różnego typu (włączając w to listy, tworząc tym samym zagnieżdżone listy).

Listy powinny być tworzone według następujących zasad:

-   pisane w jednej lub w wielu liniach
-   koniecznie w wielu liniach jeśli lista jest zbyt długa, by zmieścić się w 80 znakowej linii
-   przecinek powinien być zawsze używany jako separator, chyba że lista wykorzystywana jest wprost dla celów CSSa,
-   lista powinna być umieszczana wewnątrz nawiasów,
-   końcowy przecinek tylko i wyłącznie w przypadku list zajmujących wiele linii.

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

Dodając nowy składnik do listy, należy zawsze korzystać z dostępnego już API. Nie próbujmy dodawać niczego ręcznie.

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

**Dalsze informacje:**

-   [Understanding Sass lists](https://kittygiraudel.com/2013/07/15/understanding-sass-lists/)
-   [SassyLists](https://at-import.github.io/SassyLists/)

### Mapy

Od wersji 3.3 Sassa, autorzy arkuszy stylów mogą korzystać z map, które są niczym innym jak tablicami asocjacyjnymi (skojarzeniowymi, słownikami), haszami czy nawet obiektami JavaScriptowymi. Mapa jest takim typem danych, który powiązuje klucze (mogące być dowolnym typem danych, łącznie z mapami, choć nie jest to zalecane) z określonymi wartościami.

Mapy powinny być tworzone w następujący sposób:

-   spacja po dwukropku (`:`),
-   nawias otwierający (`(`) powinien się znajdować na tej samej linii co dwukropek (`:`),
-   **klucze umieszczone między cudzysłowami** jeśli są łańcuchami (co stanowi 99% przypadków),
-   każda para klucz–wartość na osobnej linii,
-   przecienk (`,`) na końcu każdej pary klucz–wartość,
-   **końcowy przecinek** (`,`) przy ostatnim elemencie, dzięki czemu łatwiej nam będzie dodawać, usuwać czy zmieniać kolejność składników mapy,
-   nawias zamykający (`)`) na osobnej linii,
-   bez spacji czy nowej linii między zamykającym nawiasem (`)`) a średnikiem (`;`).

Przykład:

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

**Dalsze informacje:**

-   [Using Sass Maps](https://www.sitepoint.com/using-sass-maps/)
-   [Debugging Sass Maps](https://www.sitepoint.com/debugging-sass-maps/)
-   [Extra Map functions in Sass](https://www.sitepoint.com/extra-map-functions-sass/)
-   [Real Sass, Real Maps](http://blog.grayghostvisuals.com/sass/real-sass-real-maps/)
-   [Sass Maps are Awesome](https://viget.com/extend/sass-maps-are-awesome)
-   [Sass list-maps](https://github.com/lunelson/sass-list-maps)
-   [Sass Maps Plus](https://github.com/lunelson/sass-maps-plus)
-   [Sassy-Maps](https://github.com/at-import/sassy-maps)
-   [Introduction to Sass Maps Usage and Examples](https://webdesign.tutsplus.com/tutorials/an-introduction-to-sass-maps-usage-and-examples--cms-22184)

### Reguły dotyczące CSSa

W tym miejscu, mimo że zapewne każdy je zna, warto jednak powtórzyć sobie podstawowe zasady dot. pisania zestawów reguł w CSSie (a przynajmniej te, które są przyjęte m.in. przez [CSS Guidelines](https://cssguidelin.es/#anatomy-of-a-ruleset)):

-   powiązane selektory umieszczamy na tej samej linii; niezwiązane ze sobą zaczynamy od nowej,
-   nawias otwierający (`{`) oddzielony od ostatniego selektora pojedynczą spacją,
-   każda deklaracja na swojej osobnej linii,
-   spacja po przecinku (`:`),
-   końcowy średnik (`;`) na końcu każdej deklaracji,
-   zamykający nawias (`}`) na osobnej linii,
-   nowa linia po zamykającym nawiasie (`}`).

Przykład:

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

Dodając do powyższych reguł związanych z samym CSSem warto też zwrócić uwagę, by:

-   lokalne zmienne zostały nie tylko zadeklarowane przed innymi deklaracjami, ale także rozdzielone przed nimi pojedynczą, pustą linią,
-   wywołania mixinów bez `@content` (dodatkowych deklaracji) znajdowały się przed innymi deklaracjami,
-   zagnieżdżone selektory zawsze zaczynały się od nowej linii,
-   mixiny z `@content` (deklaracjami) pojawiały się po wszelkich zagnieżdżonych selektorach,
-   nie było pustej linii po zamykającym nawiasie (`}`).

Przykład:

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

**Dalsze informacje:**

-   [Anatomy of a Ruleset](https://cssguidelin.es/#anatomy-of-a-ruleset)

### Sortowanie deklaracji

Nie przychodzi mi do głowy obecnie zagadnienie, co do którego zdania są tak bardzo podzielone, jak jest to w przypadku sortowania deklaracji w CSSie. W szczególności należy tu mówić o dwóch poglądach:

-   porządek alfabetyczny,
-   porządkowanie deklaracji ze względu na ich typ (pozycja, `display`, kolory, czcionki i inne…).

Obie metody mają swoje zalety i wady. Z jednej strony, sortowanie alfabetyczne jest uniwersalne (przynajmniej dla języków opartych o alfabet łaciński), więc przynajmniej nie sprawia ono większego problemu. Moim jednak zdaniem, nieumieszczanie własności takich jak `bottom` i `top` obok siebie jest pomysłem conajmniej dziwnym. Dlaczego też deklaracje dot. animacji miały by się znajdować przed własnością `display`? Jak można się domyśleć, w sortowaniu alfabetycznym nie trudno się doszukać szeregu takich nieścisłości.

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

Z drugiej zaś strony, porządkowanie własności według typu zdaje się mieć sens. Każda deklaracja związana z czcionkami jest obok siebie, `top` i `bottom` są znowu razem, a czytanie takiego zestawu reguł zdaje się być przyjemnością. Jednak o ile nie wymagane jest trzymanie się reguł określonych konwencji, takich jak [Idiomatic CSS](https://github.com/necolas/idiomatic-css), niektóre kwestie pozostają problematyczne. Gdzie, na przykład, umieścić własność `white-space`? W grupie fontów, czy obok `display`? Co zrobić z `overflow`? Wreszcie, jaka jest kolejność wewnątrz danej grupy tematycznej (czyżby alfabetyczna, o ironio)?

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

Istnieje również inny interesujący pogląd na porządkowanie reguł zwany [Concentric CSS](https://github.com/brandon-rhodes/Concentric-CSS), który zdaje się zyskiwać na popularności. W dużym skrócie, Concentric CSS opiera się na założeniu modelu pudełkowego (box-model) i w ten też sposób definiuje porządek deklaracji: od wewnątrz (pudełka) do zewnątrz.

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

Szczerze mówiąc sam jeszcze nie podjąłem ostatecznej decyzji. [Niedawno opublikowana sonda na CSS-Tricks](https://css-tricks.com/poll-results-how-do-you-order-your-css-properties/) pokazała, że 45% deweloperów sortuje swoje deklaracje według typów, 14% zaś alfabetycznie. Co ciekawe, 39% programistów robi to kompletnie losowo – i ja do tych osób również się zaliczam.

  ![Wykres pokazujący jak deweloperzy porządkują swoje deklaracje w CSSie ](https://sass-guidelin.es/assets/images/css-order-chart.png)

Wykres pokazujący jak deweloperzy porządkują swoje deklaracje w CSSie

Z tego też powodu nie mam zamiaru odgórnie narzucać określonego sposobu sortowania deklaracji w tym przewodniku. Wybór pozostawiam czytelnikowi, tylko by być w swym wyborze konsekwentnym.

[Ostatnie badania](https://web.archive.org/web/20190618180712/http://peteschuster.com/2014/12/reduce-file-size-css-sorting/) pokazują, że używanie [CSS Comb](https://github.com/csscomb/csscomb.js) (które z kolei korzysta z [sortowania wg. typu](https://github.com/csscomb/csscomb.js/blob/master/config/csscomb.json)) do porządkowania deklaracji w CSSie prowadzi do zmniejszania średniej wagi pliku kompresowanego przez Gzip o ok. 2.7%, podczas gdy sortowanie alfabetyczne przynosi rezultat w postaci 1.3%.

**Dalsze informacje:**

-   [On Declaration Sorting](https://meiert.com/en/blog/20140924/on-declaration-sorting/)
-   [Reduce File Size With CSS Sorting](https://web.archive.org/web/20190618180712/http://peteschuster.com/2014/12/reduce-file-size-css-sorting/)

### Zagnieżdżanie selektorów

Jedną z cech Sassa, która jest szczególnie nadużywana przez wielu deweloperów, jest niewątpliwie _zagnieżdżanie selektorów_. Rozwiązanie to pozwala autorom arkuszy stylów na używanie z długich, wieloczłonowych selektorów rozbijając je na krótsze i zagnieżdżanie ich.

#### Generalna zasada

Na przykład, poniższe zagnieżdżenie w Sassie:

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

… wygeneruje taki kod CSS:

```
.foo .bar:hover {
  color: red;
}
```

Oprócz tego, od momentu wydania Sassa w wersji 3.3 możliwe jest odwoływanie się do obecnego selektora poprzez (`&`), celem wygenerowania bardziej złożonego selektora. Dla przykładu:

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

… wygeneruje taki kod CSS:

```
.foo-bar {
  color: red;
}
```

```
.foo-bar
  color: red
```

Metoda ta jest często używana w połączeniu z [konwencją nazewnictwa BEM](https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/), by generować selektory `.block__element` i `.block--modifier` bazujące na ich oryginalnym selektorze (a więc `.block` w tym przypadku).

Podczas gdy może mieć to małe znaczenie, generowanie nowych selektorów w oparciu o odwołanie (`&`) do obecnego selektora sprawia, że wyszukiwanie w kodzie tych nowych selektorów staje się nie możliwe, gdyż one faktycznie (ich pełna nazwa) nie istnieją.

Problem zagnieżdżania selektorów leży głównie w tym, iż zmniejszają one czytelność kodu. Trzeba bowiem za każdym razem w myślach określać nazwę selektora, uzależniając ją wszak od poziomu zagnieżdżenia. Nie zawsze jest tym samym do końca wiadomo, jaki będzie rezultat w postaci skompilowanego kodu CSS.

To stwierdzenie staje się tym bardziej prawdziwe, im dłuże stają się selektory i częstsze odwołania (`&`) do obecnego selektora. Na pewnym etapie ryzyko pogubienia się w kodzie staje się przez to zbyt duże.

Aby zapobiec tego typu sytuacjom, **unikamy zagnieżdżania selektorów jeśli to jest możliwe**. Niemniej jednak są pewne wyjątki od tej zasady.

#### Wyjątki

Przede wszystkim, dozwolone jest – a nawet rekomendowane – zagnieżdżanie pseudo-klas i pseudo-elementów wewnątrz selektorów.

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

Użycie zagnieżdżania selektorów dla pseudo-klas i pseudo-elementów nie tylko ma sens (wszak dotyczy ono blisko powiązanych ze sobą selektorów), ale także pomaga w utrzymaniu całości komponentu w jednym miejscu.

Ponadto, uzasadnionym jest także umieszczanie niezależnych klas, takich jak `.is-active`, w ramach selektora danego komponentu.

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

Wreszcie, rozsądnym jest również zagnieżdżanie reguł dotyczących elementu znajdującego się wewnątrz innego elementu, tak aby deklaracje dotyczące całego komponentu znajdowały się w jednym miejscu.

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

Pracując z niedoświadczonymi deweloperami, takie selektory jak `.no-opacity &` mogą wydawać się trochę dziwne. By zapobiec wszelkim nieścisłościom, warto zbudować krótki mixin, który przetworzy taką składnię w wyraźne API.

```
/// Pomocniczy mixin zapewniający proste API dla zagnieżdżania selektorów
/// @param {String} $selector - Selektor
@mixin when-inside($selector) {
  #{$selector} & {
    @content;
  }
}
```

```
/// Pomocniczy mixin zapewniający proste API dla zagnieżdżania selektorów
/// @param {String} $selector - Selektor
=when-inside($selector) {
  #{$selector} &
    @content
}
```

Pozwoli nam to zmodyfikować poprzedni przykład, który teraz będzie wyglądał tak:

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

Jak we wszystkich sytuacjach, kluczem jest zawsze spójność. Jeśli czujesz się pewien zagnieżdżania selektorów, korzystaj z tego. Pamiętaj jednak by cały zespół, z którym pracujesz, się temu nie sprzeciwiał.

**Dalsze informacje:**

-   [Beware of Selector Nesting](https://www.sitepoint.com/beware-selector-nesting-sass/)
-   [The Inception Rule](https://thesassway.herokuapp.com/beginner/the-inception-rule)
-   [Avoid nested selectors for more modular CSS](https://thesassway.herokuapp.com/intermediate/avoid-nested-selectors-for-more-modular-css)

## Konwencje nazw

W tej sekcji nie zajmiemy się konwencjami na nazywanie elementów składni CSSa, które to mają za zadanie pomóc w łatwości utrzymania i skalowania kodu; nie tylko decyzja w tej kwestii należy do autora kodu, ale nie jest to też coś, co należy do zakresu merytorycznego tego przewodnika. Zalecam tym samym zapoznanie się z [CSS Guidelines](https://cssguidelin.es/#naming-conventions).

Jest jednak w Sassie kilka rzeczy posługujących się nazwami i ważne jest, by nazywać je w sposób, dzięki któremu kod będzie spójny i czytelny:

-   zmienne;
-   funkcje;
-   mixiny.

Placeholdery w Sassie zostały celowo tutaj ominięte bowiem traktować je należy jak zwykłe selektory CSSa, dotyczą ich więc zasady związane z nazewnictwem klas.

W odniesieniu natomiast do zmiennych, funkcji i mixinów, utrzymujemy konwencję znaną z _CSSa_: **małe litery, myślniki jako separatory**, a przede wszystkim – nazwy muszą nieść ze sobą znaczenie.

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

**Dalsze informacje:**

-   [CSS Guidelines’ Naming Conventions](https://cssguidelin.es/#naming-conventions)

### Stałe

Każdy deweloperem pracujący z frameworkami, czy też zajmujący się określonymi bibliotekami, często w pracy wykorzystuje zmienne, których z zasady nie należy zmieniać, niezależnie od sytuacji – a więc ze stałymi. Niestety (albo stety?), Sass nie zapewnia takiej funkcjonalności, dlatego też musimy się ograniczyć do korzystania określonego nazewnictwa, by wywołać taki efekt.

Jak w przypadku wielu innych języków programowania, zalecam korzystanie z nazw opartych o wielkie litery, rozdzielane znakami podkreślenia, aby oznaczyć stałe. Nie tylko jest to już przyjętą konwencją, ale także wyraźnie kontrastuje ze zmiennymi pisanymi małymi literami, rozdzielanymi myślnikami.

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

**Dalsze informacje:**

-   [Dealing With Constants in Sass](https://www.sitepoint.com/dealing-constants-sass/)

### Przestrzenie nazw

Jeśli zamierzamy rozpowszechniać swój kod pisany w Sassie, na przykład jako bibliotekę, framework, grid system czy cokolwiek innego, powinienno się rozważyć ograniczenie przestrzeni wszystkich swoich zmiennych, funkcji, mixinów i placeholderów. Ograniczy to wówczas możliwość wystąpienia konfliktu z kodem innego pochodzenia.

Na przykład, pracując nad projektem _Sassowski Jednorożec_, który z założenia ma być wykorzystywany przez deweloperów na całym świecie (kto by nie chciał z czegoś tak nazwanego korzystać?), warto się zastanowić się czy nie było by dobrze używać prefiksu `sj-` dla wszelkich nazw. Wydaje się, że będzie to na tyle specyficzne, że zapobiegnie wszelkim kolizjom nazwowym a jednocześnie też na tyle krótkie, że nie będzie sprawiało problemów przy pisaniu kodu.

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

Warto zaznaczyć, że automatyczne ograniczanie przestrzeni nazw jest jednym ze składników nadchodzących zmian w funkcji `@import` w wersji 4.0 Sassa. Jak już odpowiednie zmiany wejdą w życie, ręczne ograniczanie przestrzeni stanie się coraz to mniej użyteczne, a w końcu stanie się nawet problematyczne.

**Dalsze informacje:**

-   [Please Respect the Global CSS Namespace](https://blog.kaelig.fr/post/44554267597/please-respect-the-global-css-namespace)

## Architektura

Układanie struktury projektu wykorzystującego CSS jest prawdopodobnie jednym z najtrudniejszych zadań, jakie można napotkać w czasie zajmowania się takim projektem. Utrzymanie architektury spójnej i mającej znaczenie jest nawet trudniejsze.

Na szczęście, jedną z kluczowych zalet używania preprocesora CSS jest możliwość podziału bazy kodu na wiele plików bez spadku wydajności (czego skutkiem jest wykorzystywanie klasycznego `@import` w CSSie). Dzięki gruntownym zmianom w dyrektywie `@import`, jakie wniósł Sass, jej wykorzystywanie do dzielenia kodu na wiele plików w fazie programowania jest obecnie absolutnie bezpieczne (a nawet zalecane). Rezultatem jest bowiem pojedynczy plik CSS, który użyty zostanie w fazie produkcji.

Niezbędnym, nawet dla małych projektów, jest także podział na foldery. Analogicznie, nie wkładamy przecież wszystkich dokumentów papierowych na jeden stos, w jedno miejsce. Używa się do tego segregatorów, teczek; jednej na dokumenty dotyczące domu, jednej na papiery z banku, rachunki, itd. Nie ma absolutnie żadnego powodu by robić to inaczej w stosunku do projektu w CSSie. Podział kodu na odpowiednio nazwane foldery pozwoli nam na łatwiejsze dotarcie do potrzebnej nam części kodu wtedy, gdy do niego będziemy wracali.

Dostępnych jest obecnie wiele metod kategoryzacji kodu dla projektów w CSSie: [OOCSS](http://oocss.org/), [Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/), podobne do tego w [Bootstrapie](https://getbootstrap.com/), czy w [Foundation](https://get.foundation/). Wszystkie z nich mają swoje cechy, zalety i wady.

Ja osobiście korzystam z podejścia, które zdaje się być zbliżone do tego ujętego w [SMACSS](http://smacss.com/), stworzonego przez [Jonathana Snooka](https://snook.ca/). Opiera się ono przede wszystkim na prostocie.

Wybór architektury jest, co do zasady, uzależniony od charakteru projektu. Dostosuj swoje podejście do tego w zależności od Twoich potrzeb.

**Dalsze informacje:**

-   [A Look at Different Sass Architectures](https://www.sitepoint.com/look-different-sass-architectures/)
-   [An Introduction to OOCSS](https://www.smashingmagazine.com/2011/12/12/an-introduction-to-object-oriented-css-oocss/)

### Komponenty

Istnieje olbrzymia różnica pomiędzy czymś, co _działa_, a tym co _działa dobrze_. Jak już to zostało wielokrotnie powiedziane, CSS jest dosyć nieuporządkowanym językiem \[potrzebne źródło\]. Im mniej mamy CSSu, tym lepiej. Nie chcemy przecież zajmować się megabajtami kodu pisanego w CSSie. Warto więc pomyśleć o interfejsie jako o kolekcji komponentów, dzięki czemu nasze arkusze stylów będą nie tylko bardziej przejrzyste, lecz także bardziej wydajne.

Komponenty mogą reprezentować wszystko, o tyle o ile:

-   spełniają one tylko jedno zadanie,
-   mogą być wielokrotne użyte, w wielu miejscach w projekcie,
-   są niezależne.

Na przykład, formularz wyszukiwania powinien być traktowany jako komponent. Powinien on być przeznaczony do wielokrotnego użytku, w różnych miejscach, na różnych stronach i w różnych sytuacjach. Jego funkcjonalność i wygląd nie powinny zależeć od jego miejsca w DOMie (czy to będzie nagłówek, panel boczny, stopka…).

Zdecydowana większość elementów interfejsu może być traktowana jako małe elementy i jestem wielkim zwolennikiem tego poglądu. Pomaga on nie tylko zmniejszyć ilość CSSu potrzebnego dla całego projektu, ale także ułatwia utrzymanie całości kodu w porządku.

### Wzór 7-1

Wróćmy na chwilę do kwestii architektury. W swoich projektach korzystam zazwyczaj z czegoś, co nazywam _wzorem 7-1_: 7 folderów, 1 plik. W dużym skrócie, opiera się to na skategoryzowaniu wszystkich plików cząstkowych (partials) w 7 różnych folderów i na jednym pliku, który znajduje się w folderze głównym (zazwyczaj nazywam ten plik `main.scss`) i importuje wszystkie te części składowe do jednego arkusza stylów.

-   `base/`
-   `components/`
-   `layout/`
-   `pages/`
-   `themes/`
-   `utils/`
-   `vendors/`

I oczywiście:

-   `main.scss`

Chcąc wykorzystać wzór 7-1 w praktyce, dostępny jest gotowy [boilerplate](https://github.com/KittyGiraudel/sass-boilerplate) na GitHubie. Powinien on zawierać wszystko, co będzie potrzebne do rozpoczęcia nowego projektu.

  

Tapeta stworzona przez [Julien He](https://twitter.com/julien_he)

Co do zasady, możemy tu mówić o czymś takim:

```
sass/
|
|– base/
|   |– _reset.scss       # Reset/normalize
|   |– _typography.scss  # Reguły dot. typografii
|   …                    # Itd.
|
|– components/
|   |– _buttons.scss     # Przyciski
|   |– _carousel.scss    # Karuzela
|   |– _cover.scss       # Okładka
|   |– _dropdown.scss    # Rozwijane menu
|   …                    # Itd.
|
|– layout/
|   |– _navigation.scss  # Nawigacja
|   |– _grid.scss        # Grid system
|   |– _header.scss      # Nagłówek
|   |– _footer.scss      # Stopka
|   |– _sidebar.scss     # Pasek boczny
|   |– _forms.scss       # Formularze
|   …                    # Itd.
|
|– pages/
|   |– _home.scss        # Style dla strony głównej
|   |– _contact.scss     # Style dla konkretnej podstrony
|   …                    # Itd.
|
|– themes/
|   |– _theme.scss       # Główny motyw
|   |– _admin.scss       # Motyw dla panelu administratora
|   …                    # Itd.
|
|– utils/
|   |– _variables.scss   # Zmienne Sassa
|   |– _functions.scss   # Funkcje Sassa
|   |– _mixins.scss      # Mixiny Sassa
|   |– _helpers.scss     # Pomocnicze klasy i selektory
|
|– vendors/
|   |– _bootstrap.scss   # Bootstrap
|   |– _jquery-ui.scss   # jQuery UI
|   …                    # Itd.
|
|
`– main.scss             # Główny plik Sassa
```

Pliki są nazywane według tej samej konwencji, o której była mowa wyżej: do rozdzielania używany jest myślnik.

#### Folder base

W folderze `base/` znajduje się wszystko to, co możemy nazwać “gotowcem” dla naszego projektu. Możemy tam umieścić plik odpowiadający za reset podstawowych reguł CSSa, reguły dotyczące typografii i plik definiujący podstawowe style dla powszechnie używanych elementów HTMLa (który ja zazwyczaj nazywam `_base.scss`).

-   `_base.scss`
-   `_reset.scss`
-   `_typography.scss`

Jeśli Twój projekt wykorzystuje _dużo_ animacji w CSSie, rozważ dodanie tu pliku `_animations.scss` zawierającego definicje `@keyframes` dla wszystkich Twoich animacji. Jeśli natomiast tych animacji nie ma zbyt wiele, pozostaw te definicje przy selektorach, które z nich korzystają.

#### Folder layout

Folder `layout/` zawiera wszystko, co odpowiada za rozmieszczenie elementów na stronie czy w aplikacji. Folder ten składać się może z arkuszy stylów przeznaczonych dla głównych partii strony (nagłówek, stopka, nawigacja, pasek boczny…), grid systemu czy nawet reguł CSS dla wszystkich formularzy.

-   `_grid.scss`
-   `_header.scss`
-   `_footer.scss`
-   `_sidebar.scss`
-   `_forms.scss`
-   `_navigation.scss`

Folder `layout/` może być także nazwany folderem `partials/`, w zależności od upodobania.

#### Folder components

Dla mniejszych komponentów stworzony został folder `components/`. Podczas gdy `layout/` odpowiada style o charakterze _makro_ (definiujące globalną strukturę), `components` kładzie nacisk na widżety. Zawiera on wszystkiego rodzaju moduły, takie jak przyciski, karuzele, rozwijane menu, itd. Z reguły w folderze `components/` znajduje się wiele plików, dlatego że cała strona/aplikacja powinna się składać właśnie z takich drobnych modułów.

-   `_media.scss`
-   `_carousel.scss`
-   `_thumbnails.scss`

Folder `components/` może być także nazwany folderem `modules/`, w zależności od upodobania.

#### Folder pages

Style związane z konkretnymi podstronami lepiej umieszczać w folderze `pages/`, w pliku o nazwie określającej konkretną podstronę. Dla przykładu, popularnym jest rozwiązanie skupiania szczegółowych reguł, mających zastosowanie jedynie dla strony głównej w pliku `_home.scss` w folderze `pages/`.

-   `_home.scss`
-   `_contact.scss`

W zależności od procesu pracy nad projektem, pliki te mogą być odseparowane celem uniknięcia scalania ich z innymi do jednego arkusza stylów.

#### Folder themes

W przypadku większych stron i aplikacji, często spotyka się osobne motywy. Jest wiele sposobów radzenia sobie z nimi, jednak ja osobiście preferuję przechowywać je wszystkie w folderze `themes/`.

-   `_theme.scss`
-   `_admin.scss`

Zależy to w wysokim stopniu od charakteru danego projektu, dlatego też niewykluczone jest, że dla wielu celów taki folder nie będzie w ogóle przydatny.

#### Folder utils

Folder `utils/` zbiera wszystkie narzędzia i funkcje pomocnicze Sassa, używane w ramach projektu. Każda globalna zmienna, funkcja, mixin czy placeholder powinny się w nim znajdować.

Podstawową zasadą dla tego folderu jest to, by żaden ze znajdujących się w nim pliku nie powodował ani jednej dodatkowej linii do wynikowego, skompilowanego arkusza CSS. Jest to bowiem nic innego, niż zbiór tzw. pomocników.

-   `_variables.scss`
-   `_mixins.scss`
-   `_functions.scss`
-   `_placeholders.scss`

Pracując nad dużym projektem wykorzystującym wiele narzędzi, ciekawym rozwiązaniem zdaje się być grupowanie ich według przeznaczenia, a nie typu, na przykład typografia (`_typography.scss`), style (`_theming.scss`), itp. Każdy z tych plików powinien wówczas zawierać wszystkie powiązane narzędzia pomocnicze: zmienne, funkcje, mixiny i placeholdery. Ułatwi to bowiem czytanie i zarządzanie później tym kodem, zwłaszcza gdy pliki stają się co raz większe.

Folder `utils/` może być także nazwany folderem `utilities/` lub `helpers/`, w zależności od upodobania.

#### Folder vendors

Wreszcie, wiele projektów skorzysta także z obecności folderu `vendors/`, który to zawierać może wszystkie pliki CSS z różnych zewnętrznych bibliotek i frameworków, takich jak Normalize, Bootstrap, jQueryUI, FancyCarouselSliderjQueryPowered i innych. Umieszczanie ich wszystkich w ramach tego samego folderu jest sposobem na zasygnalizowanie, że “nie ja to napisałem, pochodzi to z zewnątrz i nie należy to do mojej odpowiedzialności”.

-   `_normalize.scss`
-   `_bootstrap.scss`
-   `_jquery-ui.scss`
-   `_select2.scss`

W przypadku gdy wymagane jest nadpisanie jakiejkolwiek z sekcji danego pliku zewnętrznego, zalecam utworzenie ósmego folderu nazwanego `vendors-extensions/`, w którym pliki zawierające reguły nadpisujące powinny nazywać się tak jak te pliki, które są nimi nadpisywane.

Na przykład, `vendors-extensions/_bootstrap.scss` będzie plikiem zawierającym wszystkie reguły CSS, których przeznaczeniem jest zmodyfikowanie niektórych ze standardowych dla Bootstrapa reguł. Służy to uniknięciu edytowania oryginalnych plików zewnętrznych, co samo w sobie nie należy do najlepszych pomysłów.

#### Główny plik

Główny plik (zazwyczaj nazywany jako `main.scss`) powinien być jedynym plikiem Sassa z całej bazy kodu, którego nazwa nie rozpoczyna się od podkreślnika. Plik ten nie powinien zawierać nic poza deklaracjami `@import` i komentarzami.

Pliki powinne być importowane z uwzględnieniem folderów, w których się znajdują, jeden po drugim w następującej kolejności:

1.  `utils/`
2.  `vendors/`
3.  `base/`
4.  `layout/`
5.  `components/`
6.  `pages/`
7.  `themes/`

Celem zapewnienia lepszej przejrzystości, plik główny powinien respektować poniższe zasady:

-   jeden plik dla każdej deklaracji `@import`,
-   jeden `@import` na linię,
-   bez nowej linii pomiędzy importami z tego samego folderu,
-   bez nowej linii po ostatnim imporcie z danego folderu,
-   rozszerzenie pliku i poprzedzający w nazwie podkreślnik powinny być pominięte.

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

Istnieje także inne podejście do importowania plików cząstkowych (partials), które wydaje mi się równie poprawne. W tym przypadku z jednej strony plik główny zdaje się być bardziej czytelny, z drugiej zaś jego aktualizowanie może być nieco bardziej utrudnione. Zgodnie z tą metodą, plik główny powinien respektować poniższe założenia:

-   jeden `@import` na folder,
-   importowane pliki pod `@import`,
-   każdy plik na swojej linii,
-   pusta linia po ostatnim imporcie dla danego folderu,
-   rozszerzenie pliku i poprzedzający w nazwie podkreślnik powinny być pominięte.

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

Aby nie importować pojedynczo każdego z plików, powstało rozszerzenie do Ruby Sass zwane [sass-globbing](https://github.com/chriseppstein/sass-globbing), które umożliwia wykorzystywanie tzw. glob patterns w `@import` Sassa, takich jak `@import "components/*"`.

Niemniej jednak nie zalecam korzystania z tego rozwiązania, bowiem importuje ono pliki według porządku alfabetycznego, co nie zawsze jest oczekiwanym rezultatem. Zwłaszcza w przypadkach, gdy mamy do czynienia z językiem wrażliwym na kolejność plików, jakim niewątpliwie jest CSS.

### Plik wstydu

Pojawił się ostatnio interesujący pomysł, którego twórcami uznać można [Harry’ego Robertsa](https://csswizardry.com), [Dave’a Ruperta](https://daverupert.com) and [Chrisa Coyiera](https://css-tricks.com). Zakłada on mianowicie umieszczenie wszelkich deklaracji CSSa, haków i rzeczy, z których nie jesteśmy do końca dumni, w tzw. _pliku wstydu_. Ten plik, przewrotnie nazwany `_shame.css`, importowany jest po wszelkich innych plikach, na samym końcu arkusza stylów.

```
/**
 * Fix dla szczegółowości nawigacji.
 *
 * Ktoś raczył użyć ID w kodzie nagłowka (`#header a {}`), który przysłania
 * selektory nawigacji (`.site-nav a {}`). Użyj !important by go nadpisać
 * do czasu gdy ktoś naprawi to paskudztwo w nagłówku.
 */
.site-nav a {
    color: #BADA55 !important;
}
```

```
/**
 * Fix dla szczegółowości nawigacji.
 *
 * Ktoś raczył użyć ID w kodzie nagłowka (`#header a {}`), który przysłania
 * selektory nawigacji (`.site-nav a {}`). Użyj !important by go nadpisać
 * do czasu gdy ktoś naprawi to paskudztwo w nagłówku.
 */
.site-nav a
    color: #BADA55 !important
```

**Dalsze informacje:**

-   [shame.css - full .net interview](https://csswizardry.com/2013/04/shame-css-full-net-interview/)

## Responsive Web Design i breakpointy

Nie wydaje mi się, by zagadnienie Responsive Web Design wymagało wprowadzenia. Zwłaszcza teraz, gdy jest ono obecne dosłownie wszędzie. Można jednak pokusić się o pytanie – _dlaczego przewodnik dla stylu Sassa zawiera sekcję poświęconą RWD?_ Tak naprawdę to jest kilka rzeczy, które można zrobić aby pracowało się z breakpointami przyjemniej, dlatego też postanowiłem poruszyć ten temat tutaj.

### Nazywanie breakpointów

Wydaje mi się, że można spokojnie powiedzieć, że media queries nie powinny być podporządkowane konkretnym urządzeniom. Dla przykładu, celowanie w iPady czy telefony Blackberry jest niewątpliwie złym pomysłem. Media queries powinny zajmować się pewnym zakresem rozmiarów ekranów, do czasu kiedy design ulega załamaniu i następna media query zaczyna obowiązywać.

Z tych samych powodów, breakpointy nie powinny być nazywane w nawiązaniu do konkretnych urządzeń, lecz bardziej ogólnie. Zwłaszcza teraz, gdy telefony stają się większe niż niektóre tablety, niektóre zaś tablety większe niż komputery o małych ekranach, i tak dalej…

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

Każda konwencja nazwowa, jaką w tym miejscu przyjmiemy, będzie dobra o ile tylko będzie przejrzysta i da w wystarczającym stopniu do zrozumienia, że nie jest ona związana konkretnymi urządzeniami.

```
$breakpoints: (
  'ziarenko': (min-width: 800px),
  'galazka': (min-width: 1000px),
  'roslina': (min-width: 1200px),
);
```

```
$breakpoints: ('ziarenko': (min-width: 800px), 'galazka': (min-width: 1000px), 'roslina': (min-width: 1200px))
```

Poprzednie przykłady korzystają z zagnieżdżonych map do definiowania breakpointów, niemniej jednak w dużej mierze zależy to od konkretnego menadżera breakpointów, jaki jest w danej sytuacji wykorzystywany. Możesz również zdecydować się na korzystanie z ciągów znaków (strings) zamiast map dla lepszej elastyczności (np. `'(min-width: 800px)'`).

**Dalsze informacje:**

-   [Naming Media Queries](https://css-tricks.com/naming-media-queries/)

### Menadżer breakpointów

W momencie gdy breakpointy są już nazwane, potrzeba sposobu by ich faktycznie użyć w media queries. Jest wiele możliwości by to zrobić, jednak muszę przyznać że jestem wielkim fanem funkcji wydobywających breakpointy z map.

```
/// Menadżer responsywności
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
/// Menadżer responsywności
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

Oczywiście, jest to dosyć uproszczone podejście do zarządzania breakpointami. Jeśli potrzebne jest rozwiązanie bardziej rozbudowane, zalecam nie odkrywać Ameryki na nowo lecz sprawdzić to, co już istnieje, na przykład [Sass-MQ](https://github.com/sass-mq/sass-mq), [Breakpoint](http://breakpoint-sass.com/) czy [include-media](https://github.com/eduardoboucas/include-media).

**Dalsze informacje:**

-   [Managing Responsive Breakpoints in Sass](https://www.sitepoint.com/managing-responsive-breakpoints-sass/)
-   [Approaches to Media Queries in Sass](https://css-tricks.com/approaches-media-queries-sass/)

### Używanie media queries

Nie tak dawno temu, w społeczności pojawiła się dosyć burzliwa dyskusja na temat tego gdzie powinno się deklarować media queries: czy powinny one się znajdować w ramach bloków selektorów (na co Sass pozwala), czy raczej winny one być odseparowane. Muszę przyznać, że jestem zwolennikiem poglądu by _media queries znajdowały się w ramach selektorów_, bowiem współgra on z ideą _komponentów_.

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

Co prowadzi do następującego CSSu:

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

Możesz usłyszeć opinie, że taka konwencja prowadzi do duplikowania media queries w wynikowym CSSie. Jest to niewątpliwie prawdą. Należy jednak zaznaczyć, że przeprowadzono w tej kwestii testy, które wykazały że nie ma to żadnego znaczenia, w momencie gdy Gzip (lub inna metoda kompresji) został użyty na serwerze:

> … rozstrzygając zagadnienie łączenia bądź rozbijania Media Queries w wielu miejscach i konsekwencji, jakie oba rozwiązania niosą dla kwestii wydajności, doszliśmy do wniosku, że różnica jest conajmniej minimalna, a w zasadzie nieistniejąca.  
> — [Sam Richards](https://twitter.com/snugug), odnośnie [Breakpoint](http://breakpoint-sass.com/)

Jeśli są jednak obawy co do duplikowania media queries, istnieją takie narzędzia do ich scalania, jak [ten gem](https://github.com/aaronjensen/sass-media_query_combiner). Muszę w tym momencie jednak ostrzec przed możliwymi skutkami ubocznymi przenoszenia z miejsca na miejsce kodu CSS. Należy wszak pamiętać, że w tym wypadku kolejność źródłowa ma kluczowe znaczenie.

**Dalsze informacje:**

-   [Inline or Combined Media queries? Fight!](http://benfrain.com/inline-or-combined-media-queries-in-sass-fight/)
-   [Sass::MediaQueryCombiner](https://github.com/aaronjensen/sass-media_query_combiner)

## Zmienne

Zmienne należą do istoty każdego języka programowania. Pozwalają nam na wielokrotne użycie określonych wartości bez potrzeby ich kopiowania. Przede wszystkim jednak, umożliwiają nam one aktualizowanie tych wartości w bardzo łatwy sposób.

Można jednak powiedzieć, że CSS jest niczym innym jak jednym wielkim kotłem pełnym wielu różności. W przeciwieństwie do innych języków, CSS nie zna koncepcji zasięgu widoczności (scope). Możliwość powstania konfliktu nazw musimy mieć więc stale na uwadze, jeśli dodajemy nowe zmienne.

Moja rada jest następujące: twórzmy zmienne tylko wtedy, kiedy ich istnienie ma sens. Nie róbmy tego pochopnie bo to nam w niczym nie pomoże. Nowa zmienna powinna być tworzona kiedy spełnione są następujące warunki:

-   określona wartość powtarza się conajmniej dwa razy,
-   określona wartość będzie w przyszłości aktualizowana, co najmniej raz,
-   wszystkie wystąpienia danej wartości są powiązane ze zmienną (nie przez przypadek).

Zasadniczo nie ma powodu aby deklarować zmienną która nigdy nie będzie aktualizowana albo taką, która będzie użyta tylko w jednym miejscu.

### Zasięg (scope)

Zasięg widoczności (scope) zmiennych w Sassie zmienił się w trakcie jego historii. Do niedawna, zmienne deklarowane w ramach zestawów reguł, czy też innych zakresów, standardowo traktowane były jako zmienne lokalne. Co ciekawe jednak, w przypadku gdy istniała już globalna zmienna o tej samej nazwie, mogła ona zostać nadpisana przez tą przypisaną lokalnie. Od czasu wersji 3.4, Sass już właściwie radzi sobie z koncepcją zasięgów i zamiast tego tworzy teraz nową, lokalną zmienną.

Dokumentacja traktuje także o _przysłanianiu zmiennych (variable shadowing)_. Deklarując zmienną o lokalnym zasięgu, która z kolei już istnieje w zasięgu globalnym, ta lokalna _przysłania_ tą globalną. Mówiąc wprost, nadpisuje ją na potrzeby lokalnego zasięgu (scope’u).

Poniższy przykład tłumaczy koncepcję _przysłaniania zmiennych_.

```
// Zainicjuj globalną zmienną na poziomie głównym.
$variable: 'initial value';

// Utwórz mixin, który nadpisuje globalną zmienną.
@mixin global-variable-overriding {
  $variable: 'mixin value' !global;
}

.local-scope::before {
  // Utwórz lokalną zmienną, która przysłania tą globalną.
  $variable: 'local value';

  // Użyj mixinu: zastąpi on globalną zmienną.
  @include global-variable-overriding;

  // Wydrukuj wartość zmiennej.
  // Będzie to ta **lokalna**, jako że przysłoniła tą globalną.
  content: $variable;
}

// Wydrukuj zmienną w innym selektorze, który jej nie przysłoni.
// Będzie to ta **globalna**, jak oczekiwano.
.other-local-scope::before {
  content: $variable;
}
```

```
// Zainicjuj globalną zmienną na poziomie głównym.
$variable: 'initial value'

// Utwórz mixin, który nadpisuje globalną zmienną.
@mixin global-variable-overriding
  $variable: 'mixin value' !global

.local-scope::before
  // Utwórz lokalną zmienną, która przysłania tą globalną.
  $variable: 'local value'

  // Użyj mixinu: zastąpi on globalną zmienną.
  +global-variable-overriding

  // Wydrukuj wartość zmiennej.
  // Będzie to ta **lokalna**, jako że przysłoniła tą globalną.
  content: $variable

// Wydrukuj zmienną w innym selektorze, który jej nie przysłoni.
// Będzie to ta **globalna**, jak oczekiwano.
.other-local-scope::before
  content: $variable
```

### Flaga `!default`

Budując bibliotekę, framework, system gridów albo jakikolwiek inny kod Sassa, który ma być rozpowszechniany i używany przez innych deweloperów, wszystkie zmienne konfigurujące powinny być deklarowane z flagą `!default`, dzięki czemu będą one mogły być później nadpisane.

```
$baseline: 1em !default;
```

```
$baseline: 1em !default
```

Dzięki temu deweloper może zdefiniować własną zmienną `$baseline` _przed_ importowaniem danej biblioteki bez obawy o to, że jego zmienna ulegnie zmianie.

```
// Zmienna dewelopera
$baseline: 2em;

// `$baseline` deklarowana przez Twoją bibliotekę
@import 'your-library';

// $baseline == 2em;
```

```
// Zmienna dewelopera
$baseline: 2em

// `$baseline` deklarowana przez Twoją bibliotekę
@import your-library

// $baseline == 2em
```

### Flaga `!global`

Flaga `!global` powinna być użyta jedynie wtedy, gdy zmienna z lokalnego zasięgu ma nadpisać zmienną globalną. Deklarując zmienną na głównym poziomie, flaga `!global` powinna zostać pominięta.

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

### Wiele zmiennych lub map

Używanie map zamiast wielu odrębnych zmiennych ma swoje zalety. Pozwala to przede wszystkim na korzystanie z pętli, co nie jest możliwe w przypadku zmiennych.

Kolejnym plusem tworzenia map jest możliwość konstruowania małych funkcji wydobywających, dających nam przyjazne w obsłudze API. Na przykład, rozważmy następujący kod:

```
/// Mapa z-indeksów, zbiera wszystkie warstwy Z aplikacji
/// @access private
/// @type Map
/// @prop {String} key - Nazwa warstwy
/// @prop {Number} value - Wartość Z przypisana do klucza
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// Wydobądź wartość z-index z nazwy warstwy
/// @access public
/// @param {String} $layer - Nazwa warstwy
/// @return {Number}
/// @require $z-indexes
@function z($layer) {
  @return map-get($z-indexes, $layer);
}
```

```
/// Mapa z-indeksów, zbiera wszystkie warstwy Z aplikacji
/// @access private
/// @type Map
/// @prop {String} key - Nazwa warstwy
/// @prop {Number} value - Wartość Z przypisana do klucza
$z-indexes: ('modal': 5000, 'dropdown': 4000, 'default': 1, 'below': -1,)

/// Wydobądź wartość z-index z nazwy warstwy
/// @access public
/// @param {String} $layer - Nazwa warstwy
/// @return {Number}
/// @require $z-indexes
@function z($layer)
  @return map-get($z-indexes, $layer)
```

## Extendy

Dyrektywa `@extend` należy do potężnych funkcjonalności Sassa, lecz jest ona często źle rozumiana. Co do zasady, dyrektywa ta pozwala na przekazanie Sassowi, żeby zaaplikował określone style selektorowi A tak, jakby pasował on także do selektora B. Nie ulega wątpliwości, że może to być pomocne przy pisaniu modułowego CSSa.

Niemniej jednak, prawdziwym przeznaczeniem dyrektywy `@extend` jest utrzymywanie powiązania (ograniczeń) pomiędzy regułami, w ramach rozwijanych selektorów. Co to konkretnie oznacza?

-   Selektory mają _ograniczenia_ (np. `.bar` w `.foo > .bar` musi mieć rodzica `.foo`);
-   Ograniczenia te są _przenoszone_ do rozwiniętego selektora (np. rezultatem `.baz { @extend .bar; }` będzie `.foo > .bar, .foo > .baz`);
-   Deklaracje rozwiniętego selektora będą dzielone z rozwijającym selektorem.

Biorąc powyższe pod uwagę można zauważyć, że rozwijanie selektorów luźnymi ograniczeniami może powodować znaczne zwiększenie rozmiarów takich selektorów. Jeśli `.baz .qux` rozwija `.foo .bar`, to selektorem wynikowym może być `.foo .baz .qux` lub `.baz .foo .qux`, jako że zarówno `.foo` i `.baz` są ogólnymi wstępnymi. Mogą być zatem rodzicami, dziadkami, itd.

Zawsze staraj się definiować powiązania za pomocą placeholderów, a nie faktycznych selektorów. Przyniesie to większą swobodę używania (i zmieniania) konwencji nazwowych dla Twoich selektorów, a jako że związki są definiowane tylko raz wewnątrz placeholderów, ryzyko utworzenia niepożądanego selektora jest znacznie niższe.

Dla dziedziczenia stylów używaj `@extend` wyłącznie wtedy, gdy rozwijający selektor `.class` czy `%placeholder` jest _tego rodzaju_, co rozwijany selektor. Na przykład, `.error` jest podobny do `.warning`, więc `.error` może wykorzystywać `@extend .warning`.

```
%button {
  display: inline-block;
  // … style dot. przycisku

  // Powiązanie: %button będący dzieckiem %modal
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
  // … style dot. przycisku

  // Powiązanie: %button będący dzieckiem %modal
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

Istnieje wiele sytuacji, w których rozwijanie selektorów może być pomocne i warte uwagi. Należy mieć jednak w pamięci poniższe zasady:

-   Korzystanie z extendów przede wszystkim na `%placeholderach`, nie na faktycznych selektorach.
-   Rozwijanie klas za pomocą innych klas, _nigdy_ [selektorem złożonym](https://www.w3.org/TR/selectors4/#syntax).
-   Bezpośrednie rozwijanie `%placeholderów` tak rzadko, jak to jest tylko możliwe.
-   Unikanie rozwijania selektora ogólnego zstępnego (np. `.foo .bar`), czy ogólnego rodzeństwa (np. `.foo ~ .bar`). To właśnie powoduje znaczne zwiększenie rozmiarów selektora.

Często się mówi, że `@extend` pomaga w zmniejszaniu rozmiaru pliku, z racji tego że łączy selektory zamiast duplikować własności. To prawda, jednak różnica po zastosowaniu kompresji [Gzip](https://en.wikipedia.org/wiki/Gzip) jest nieistotna.

Jeśli jednak w danej sytuacji niemożliwe jest użycie kompresji Gzip (lub jej ekwiwalentu), korzystanie z dyrektywy `@extend` może być dobrym rozwiązaniem, zwłaszcza gdy rozmiar arkusza stylów jest problemem dla wydajności naszego projektu.

### Extendy a media queries

Selektory należy rozwijać jedynie w ramach tego samego scope’u media (dyrektywy `@media`). Traktujmy tym samym media query jako kolejne ograniczenie dla extendów.

```
%foo {
  content: 'foo';
}

// Nope
@media print {
  .bar {
    // To nie działa. Co więcej - kompilator się wysypie.
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
    // To nie działa. Co więcej - kompilator się wysypie.
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

Podsumowując, zalecam wykorzystywanie dyrektywy `@extend` jedynie dla utrzymywania powiązań pomiędzy selektorami. Jeśli dwa selektory są w sposób charakterystyczny podobne do siebie, jest to idealny przykład dla wykorzystania `@extend`. Jeśli nie są one ze sobą szczególnie powiązane lecz jedynie dzielą pewne reguły, `@mixin` może być lepszym rozwiązaniem.

Dzięki dla [Davida Khourshid](https://twitter.com/davidkpiano) za jego pomoc w przygotowywaniu tej sekcji.

**Dalsze informacje:**

-   [What Nobody Told you About Sass Extend](https://www.sitepoint.com/sass-extend-nobody-told-you/)
-   [Why You Should Avoid Extend](https://www.sitepoint.com/avoid-sass-extend/)
-   [Don’t Over Extend Yourself](https://pressupinc.com/blog/2014/11/dont-overextend-yourself-in-sass/)
-   [When to Use Extend; When to Use a Mixin](https://csswizardry.com/2014/11/when-to-use-extend-when-to-use-a-mixin/)
-   [Extending in Sass Without Mess](https://www.smashingmagazine.com/2015/05/04/extending-in-sass-without-mess/)

## Mixiny

Mixiny są jedną z tych funkcjonalności Sassa, z których się najczęściej korzysta. Są one kluczowe dla ponownego wykorzystywania komponentów i dla zgodności z zasadą DRY. I słusznie: mixiny pozwalają twórcom na definiowanie stylów które mogą być wykorzystywane wszędzie w arkuszu stylu bez potrzeby korzystania z niesemantycznych klas, takich jak `.float-left`.

Mogą one zawierać pełne reguły CSS i zasadniczo wszystko, co wszędzie indziej w dokumencie Sassa jest dozwolone, może być użyte. Mogą one nawet przyjmować argumenty, zupełnie jak funkcje. Nie trzeba więc dodawać, że ich możliwości są niemal nieograniczone.

Czuję jednak potrzebę by ostrzec przed nadużywaniem mocy mixinów. Należy mieć bowiem ciągle na uwadze pojęcie _prostoty_. Może to się wydawać kuszące, by budować potężne, rozbudowane mixiny. Jest to jedna gruba przesada i, niestety, wielu deweloperów cierpi na tą chorobę. Dobrze napisany kod nie powinien robić wszystkiego na raz. Jeśli dany mixin rozwinie się na więcej niż 20 linii, należy rozważyć wydzielenie z niego części albo po prostu zastanowić się nad nim i przepisać go jeszcze raz.

### Podstawy

Mając to na uwadze, mixiny są niezwykle przydatne i, bez wątpienia, powinno się ich używać. Główną zasadą jest w tym przypadku to, że grupa własności CSS występująca razem z jakiegoś powodu (nie z przypadku) może zostać umieszczona w mixinie. [Micro-clearfix hack od Nicolasa Gallaghera](http://nicolasgallagher.com/micro-clearfix-hack/), na przykład, zasługuje na umieszczenie go w (bezargumentowym) mixinie.

```
/// Helper do oczyszczania floatów
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
/// Helper do oczyszczania floatów
/// @author Nicolas Gallagher
/// @link http://nicolasgallagher.com/micro-clearfix-hack/ Micro Clearfix
@mixin clearfix
  &::after
    content: ''
    display: table
    clear: both
```

Innym słusznym przykładem może być mixin do określenia rozmiarów elementu, definiujący zarówno `width` i `height`. Nie tylko sprawi on, że kod będzie łatwiejszy do pisania, ale i przyjemniejszy do czytania.

```
/// Helper do określania rozmiarów elementu
/// @author Kitty Giraudel
/// @param {Length} $width
/// @param {Length} $height
@mixin size($width, $height: $width) {
  width: $width;
  height: $height;
}
```

```
/// Helper do określania rozmiarów elementu
/// @author Kitty Giraudel
/// @param {Length} $width
/// @param {Length} $height
=size($width, $height: $width)
  width: $width
  height: $height
```

**Dalsze informacje:**

-   [Sass Mixins to Kickstart your Project](https://www.sitepoint.com/sass-mixins-kickstart-project/)
-   [A Sass Mixin for CSS Triangles](https://www.sitepoint.com/sass-mixin-css-triangles/)

### Mixiny bezargumentowe

Czasami mixiny używane są jedynie w celu uniknięcia powtarzania tych samych grup deklaracji, bez potrzeby korzystania z parametrów, bądź też mają na tyle rozsądne wartości podstawowe, że nie ma potrzeby podawania im własnych argumentów.

W tych wypadkach, wywołując mixin możemy spokojnie pomijać nawiasy. Słowo kluczowe `@include` (albo `+` dla wciętej składni) w wystarczającym stopniu sygnalizuje, iż mamy do czynienia z wywołaniem mixinu; nie ma więc tu potrzeby dla dodatkowych nawiasów.

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

### Listy argumentów

Mając do czynienia z nieokreśloną liczbą argumentów w mixinie, należy używać `arglist`, zamiast listy. `arglist` może być traktowany jako ósmy typ danych w Sassie, który podawany jest jako dowolna liczba argumentów dla mixinu albo funkcji, której sygnatura zawiera `...`.

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

Budując mixin, który akceptuje wiele argumentów (3 lub więcej), należy dwa razy pomyśleć zanim wprost poda się je jako listę albo mapę myśląc, że tak będzie łatwiej.

Sass jest dosyć sprytny jeśli chodzi o deklaracje mixinów i funkcji, do tego stopnia że pozwala on na podawanie listy lub mapy jako `arglist` do funkcji/mixinu, które tym samym zostają przeanalizowane jako argumenty.

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

**Dalsze informacje:**

-   [Sass Multiple Arguments, Lists or Arglist](https://www.sitepoint.com/sass-multiple-arguments-lists-or-arglist/)

### Mixiny a vendor prefixy

Definiowanie własnych mixinów do radzenia sobie z vendor prefixami dla niewspieranych lub częściowo wspieranych własności CSS może być kuszące. My jednak tego nie chcemy. Przede wszystkim, jeśli można użyć [Autoprefixera](https://github.com/postcss/autoprefixer), warto to zrobić. Został on napisany do tego celu i zrobi to bez wątpienia lepiej.

Niestety, zdarzają się przypadki w których z Autoprefixera skorzystać nie możemy. Jeśli natomiast używamy [Bourbona](https://bourbon.io/) albo [Compassu](http://compass-style.org/), oba rozwiązania radzą sobie z vendor prefixami same.

Jeśli jednak nie można skorzystać ani z Autoprefixera, ani z Bourbona czy Compassu, wtedy i tylko wtedy, można tworzyć własne mixiny dla prefixowania własności CSSa. Proszę jednak by nie tworzyć osobnych mixinów dla każdej z własności.

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

Zróbmy to mądrzej.

```
/// Mixin do produkowania vendor prefixów
/// @access public
/// @author KittyGiraudel
/// @param {String} $property - Własność CSS bez prefixu
/// @param {*} $value - Wartość
/// @param {List} $prefixes - Lista prefixów
@mixin prefix($property, $value, $prefixes: ()) {
  @each $prefix in $prefixes {
    -#{$prefix}-#{$property}: $value;
  }

  #{$property}: $value;
}
```

```
/// Mixin do produkowania vendor prefixów
/// @access public
/// @author KittyGiraudel
/// @param {String} $property - Własność CSS bez prefixu
/// @param {*} $value - Wartość
/// @param {List} $prefixes - Lista prefixów
=prefix($property, $value, $prefixes: ())
  @each $prefix in $prefixes
    -#{$prefix}-#{$property}: $value

  #{$property}: $value
```

Użycie takiego mixinu powinno być dosyć jasne:

```
.foo {
  @include prefix(transform, rotate(90deg), ('webkit', 'ms'));
}
```

```
.foo
  +prefix(transform, rotate(90deg), ('webkit', 'ms'))
```

Proszę mieć jednak na uwadze, że jest to dosyć kiepskie rozwiązanie. Na przykład, nie rozwiąże to problemu bardziej skomplikowanych składni, takich jak ta wymagana dla Flexboxa. W tych przypadkach, użycie Autoprefixera było by o wiele lepszą opcją.

**Dalsze informacje:**

-   [Autoprefixer](https://github.com/postcss/autoprefixer)
-   [Building a Linear-Gradient Mixin](https://www.sitepoint.com/building-linear-gradient-mixin-sass/)

## Instrukcje warunkowe (conditionals)

Sass zapewnia wsparcie dla instrukcji warunkowych poprzez dyrektywy `@if` i `@else`. Jeśli w bazie kodu brak jest średnio lub bardzo skomplikowanych rozwiązań, nie ma większej potrzeby dla stosowania tychże instrukcji. W zasadzie to one głównie istnieją dla potrzeb bibliotek i frameworków.

W każdym razie, gdy zajdzie jednak potrzeba skorzystania z instrukcji warunkowych, należy to robić w zgodności z poniższymi zasadami:

-   Bez nawiasów, chyba że są potrzebne,
-   Jedna pusta linia przed `@if`,
-   Kod po nawiasie otwierającym (`{`) na następnej linii,
-   `@else` na tej samej linii, co nawias zamykający (`}`),
-   Nowa pusta linia po ostatnim nawiasie zamykającym (`}`), chyba że następna linia zaczyna się od takiego nawiasu (`}`).

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

Testując czy podana wartość jest fałszywa, należy używać słowa `not` zamiast testowania wobec `false` czy `null`.

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

Należy zawsze umieszczać nazwę zmiennej po lewej stronie wyrażenia, a (nie)oczekiwany rezultat po prawej. Odwrócone instrukcje warunkowe są mniej zrozumiałe, szczególnie dla niedoświadczonych programistów.

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

Używając instrukcji warunkowych w ramach funkcji by zwracały one różne rezultaty, w zależności od jakiegoś warunku, należy się upewnić aby funkcja miała instrukcję `@return` poza jakimkolwiek blokiem warunkowym.

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

## Pętle

Ponieważ Sass daje możliwość korzystania z kompleksowych struktur danych, takich jak [listy](#listy) i [mapy](#mapy), nie jest niespodzianką że Sass zapewnia także dostęp do iteracji wewnątrz nich.

Obecność pętli zakłada zazwyczaj stosunkowo skomplikowane rozwiązania, które w arkuszach Sassa znaleźć się raczej nie powinny. Zanim zostanie podjęta decyzja o użyciu pętli należy się zastanowić, czy aby na pewno rozwiąże ona jakiś problem.

### Each

Pętla `@each` jest zdecydowanie najczęściej używaną z trzech form pętli dostarczanych przez Sassa. Zapewnia ona czyste API do iteracji wewnątrz listy czy mapy.

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

Iterując wewnątrz mapy, należy używać `$key` i `$value` jako nazw zmiennych celem wymuszenia spójności.

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

Należy się także upewnić, aby respektować poniższe zasady dla lepszej czytelności kodu:

-   Pustą linia przed `@each`,
-   Pustą linia po nawiasie zamykającym (`}`), chyba że następna linia zawiera taki właśnie nawias.

### For

Pętle `@for` mogą wydawać się użyteczne w połączeniu z pseudo-klasą `:nth-*` w CSSie. Z wyjątkiem tych sytuacji, zaleca się preferowanie pętli `@each` jeśli naprawdę _trzeba_ iterować wewnątrz czegoś.

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

Używajmy `$i` jako nazwy zmiennej by trzymać się ustalonej konwencji i, chyba że jest ku temu jakiś naprawdę ważny powód, nigdy nie używajmy słowa `to`. Należy zawsze korzystać z `through`. Wielu deweloperów nawet nie zdaje sobie sprawy z tego, że Sass daje taką możliwość.

Pamiętajmy także o następujących zasadach:

-   Nowa linia przed `@each`,
-   Pusta linia po nawiasie zamykającym (`}`), chyba że następna linia zawiera taki właśnie nawias.

### While

Pętle `@while` nie mają absolutnie żadnego uzasadnienia, by z nich korzystać w projektach Sassa. Zwłaszcza skoro nie ma możliwości przerwania pętli z jej środka. **Nie polecam**.

## Ostrzeżenia i błędy

Jeśli miałbym wybrać jedną z funkcji Sassa, która jest najczęściej pomijana przez deweloperów, jest to niewątpliwie możliwość dynamicznego wysyłania ostrzeżeń i błędów. Co może być dla niektórych niespodzianką, Sass zawiera trzy własne dyrektywy do wydruku treści w przeznaczonych do tego systemach (CLI, aplikacja do kompilowania,…):

-   `@debug`;
-   `@warn`;
-   `@error`.

Odłóżmy `@debug` na bok, bowiem stworzony on został z myślą o debugowaniu SassScriptu, który obecnie nie jest w naszym kręgu zainteresowania. Pozostały nam więc `@warn` i `@error`, które są zauważalnie podobne, z jednym tylko wyjątkiem - jedna z nich zatrzymuje kompilator, druga zaś nie. Mam nadzieję, że już w tym momencie staje się to oczywistym, która jak działa.

Warto także zaznaczyć, że w typowym projekcie Sassa, ostrzeżenia i błędy mogą być zjawiskiem dosyć częstym. Każdy mixin czy funkcja wymagająca określonego argumentu może zgłosić błąd jeśli coś źle pójdzie, albo przynajmniej wyświetlić ostrzeżenie.

**Dalsze informacje:**

-   [An Introduction To Error Handling](https://webdesign.tutsplus.com/tutorials/an-introduction-to-error-handling-in-sass--cms-19996)
-   [Building a Logger Mixin](https://webdesign.tutsplus.com/tutorials/building-a-logger-mixin-in-sass--cms-22070)
-   [SassyLogger](https://github.com/KittyGiraudel/SassyLogger)

### Ostrzeżenia

Weźmy za przykład tą funkcję z projektu [Sass-MQ](https://github.com/sass-mq/sass-mq), która konwertuje wartości z `px` do `em`:

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

Jeśli podana wartość okaże się nie mieć jednostki, funkcja z góry zakłada, że chodzi tu o piksele. W tym miejscu, takie założenie może być ryzykowne i z tego też powodu użytkownik powinien być ostrzeżony, że oprogramowanie zrobiło coś, co może być uznane za nieoczekiwane.

### Błędy

Błędy, w odróżnieniu do ostrzeżeń, zatrzymują kompilator i zapobiegają jego dalszemu działaniu. W dużym skrócie, zatrzymują proces kompilacji i wyświetlają wiadomość w strumieniu wyjścia (output), a także w stack trace, co pomaga w debugowaniu. Z tego też powodu błędu powinny być wysyłane w sytuacji, gdy nie ma innej możliwości by program mógł działać dalej. Kiedy to jest tylko możliwe, należy próbować obejść ten problem i wyświetlać zamiast tego ostrzeżenie.

Dla przykładu, powiedzmy że budowana jest funkcja wydobywająca wartość z danej mapy. Można wówczas wysyłać błąd za każdym razem, gdy żądany klucz nie istnieje.

```
/// Mapa z-indeksów, zbiera wszystkie warstwy Z aplikacji
/// @access private
/// @type Map
/// @prop {String} key - Nazwa warstwy
/// @prop {Number} value - Wartość Z przypisana do klucza
$z-indexes: (
  'modal': 5000,
  'dropdown': 4000,
  'default': 1,
  'below': -1,
);

/// Wydobądź wartość z-index z nazwy warstwy
/// @access public
/// @param {String} $layer - Nazwa warstwy
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
/// Mapa z-indeksów, zbiera wszystkie warstwy Z aplikacji
/// @access private
/// @type Map
/// @prop {String} key - Nazwa warstwy
/// @prop {Number} value - Wartość Z przypisana do klucza
$z-indexes: ('modal': 5000, 'dropdown': 4000, 'default': 1, 'below': -1,)

/// Wydobądź wartość z-index z nazwy warstwy
/// @access public
/// @param {String} $layer - Nazwa warstwy
/// @return {Number}
/// @require $z-indexes
@function z($layer)
  @if not map-has-key($z-indexes, $layer)
    @error 'There is no layer named `#{$layer}` in $z-indexes. '
         + 'Layer should be one of #{map-keys($z-indexes)}.'

  @return map-get($z-indexes, $layer)
```

## Narzędzia

Jedną z niewątpliwych zalet preprecessora CSS tak popularnego jak Sass jest to, że dostępny jest cały ekosystem frameworków, pluginów, bibliotek i narzędzi. Po 8 latach od powstania, zbliżamy się do momentu w którym [wszystko co może być napisane w Sassie, zostało napisane w Sassie](https://kittygiraudel.com/2014/10/27/rethinking-atwoods-law/).

Mimo to, moim zdaniem należy ograniczyć liczbę zależności do ścisłego minimum. Zarządzanie zależnościami jest swoistym piekłem, w którym na pewno nikt nie chciałby się znaleźć. Poza tym, potrzeba korzystania z zewnętrznych zależności, w odniesieniu do Sassa, jest mała, jeśli nie znikoma.

### Compass

[Compass](http://compass-style.org/) jest jednym z frameworków dostępnych dla Sassa. Zaprojektowany został przez [Chrisa Eppsteina](https://twitter.com/chriseppstein), jednego z dwóch głównych twórców Sassa. Jest on obecnie dosyć popularny i nie widzę powodu, dla którego miało by się to w najbliższym czasie zmienić.

Osobiście nie korzystam już z Compassa. Głównym tego powodem jest fakt, że powoduje on znaczne jego spowolnienie. Ruby Sass jest powolne samo w sobie, więc dodawanie więcej Ruby i Sassa ponad to wcale nie pomaga.

Rzecz w tym, że tak naprawdę używa się bardzo małego procenta całej funkcjonalności tego frameworka. Compass jest olbrzymi. Mixiny dla zapewnienia kompatybilności pomiędzy przeglądarkami to tylko wierzchołek góry lodowej. Funkcje matematyczne, funkcje pomagające z obrazkami, spriting… Compass dodaje bardzo dużo funkcjonalności.

Niestety, można powiedzieć że to są tylko słodycze, a naprawdę brak jest jakiejś _zabójczej_ funkcjonalności. Wyjątkiem może być funkcja budowania sprite’ów, która jest _naprawdę świetna_, lecz [Grunticon](https://github.com/filamentgroup/grunticon) i [Grumpicon](http://grumpicon.com/) robią to równie dobrze i mają ponadto tą zaletę, że można je dołączyć do zautomatyzowanego procesu budowania (jeśli z takiego korzystamy).

W każdym bądź razie, w żadnym wypadku nie zabraniam używania Compassu, chociaż też go nie polecam, zwłaszcza że nie jest on kompatybilny z LibSass (nawet jeśli pewne zamiary zostały w tym kierunku poczynione). Jeśli okazuje się on być w danej sytuacji pomocny, w porządku, ale nie wydaje mi się żeby jego zalety przewyższały jego wady.

Ruby Sass jest obecnie gruntownie optymalizowany i prace te są ukierunkowane w szczególności na rozbudowane style, z wieloma funkcjami i mixinami. Wydajność i szybkość kompilacji powinna zostać znacznie poprawiona, dzięki czemu Compass i inne frameworki nie będą tak bardzo spowalniać Sassa.

**Dalsze informacje:**

-   [Sass Frameworks: Compass or Bourbon](https://www.sitepoint.com/compass-or-bourbon-sass-frameworks/)
-   [Why I don’t use Compass anymore](https://www.sitepoint.com/dont-use-compass-anymore/)
-   [Is Compass to Sass with jQuery is to JavaScript?](https://www.sitepoint.com/compass-sass-jquery-javascript/)

### Systemy gridów

Pomijanie kwestii systemów gridów jest w dobie Responsive Web Designu obecnie niemożliwe. Aby sprawić, by design wyglądał spójnie i poprawnie na urządzeniach o różnych rozmiarach, stosujemy różnego rodzaju systemy “kratek”, zwanych gridami, odpowiednio rozkładające wszystkie elementy. Z kolei aby uniknąć potrzeby ręcznego pisania takiego systemu za każdym razem od nowa, niektórzy wspaniali ludzie postanowili udostępnić ich rozwiązania i sprawili, że są one dostęne do wielokrotnego użytku.

Powiedzmy sobie jednak szczerze: nie jestem wielkim fanem systemów gridów. Oczywiście, dostrzegam ich potencjał, jednak zdecydowana większość z nich jest zbyt skomplikowana i rozbudowana, a tak naprawdę używa się ich do rysowania czerwonych kolumn na białych tłach w trakcie prezentacji designerów. Czy ktoś ostatnio pomyślał – _wreszcie mogę zbudować grid dla kolumn 2-5-3.1-π_? Właśnie, nikt. Z tego też powodu w większości przypadków wystarczy proste rozwiązanie oparte o system 12 kolumn, nic nadzwyczajnego.

Korzystając z frameworków, takich jak [Bootstrap](https://getbootstrap.com/) czy [Foundation](https://get.foundation/), taki system gridów jest najprawdopodobniej już dołączony i to z tego rozwiązania polecam korzystać, zamiast dołączać do projektu jakąś kolejną zależność.

Jeśli nie jesteśmy przywiązani do określonego frameworku, mam dobrą wiadomość – dostępne są obecnie naprawdę dobre, oparte na Sassie, systemy gridów: [Susy](https://www.oddbird.net/susy/) i [Singularity](https://github.com/at-import/Singularity). Oba zapewniają funkcjonalność znacznie wykraczającą poza popularne potrzeby, więc wybierając jeden z nich można mieć pewność, że spełni on swoje zadanie we wszelkich możliwych, nawet tych najbardziej egzotycznych, sytuacjach. Moim zdaniem Susy ma trochę lepszą społeczność wokół siebie, ale to tylko moje zdanie.

Można też spróbować czegoś bardziej przyziemnego, choćby [csswizardry-grids](https://github.com/csswizardry/csswizardry-grids). W każdym bądź razie, wybór nie będzie miał olbrzymiego wpływu na styl kodu, więc swoboda decyzji należy tylko i wyłącznie do autora kodu.

**Dalsze informacje:**

-   [Build Web Layouts Easily with Susy](https://css-tricks.com/build-web-layouts-easily-susy/)
-   [A Complete Tutorial to Susy 2](https://www.zell-weekeat.com/susy2-tutorial/)
-   [Sass Grids: From Neat to Susy](https://www.sitepoint.com/sass-grids-neat-susy/)
-   [Bootstrap’s Grid System vs Susy: a Comparison](https://www.sitepoint.com/bootstraps-grid-system-vs-susy-comparison/)
-   [How to Use Susy: Superpowered Sass Grids](https://webdesign.tutsplus.com/tutorials/how-to-use-susy-superpowered-sass-grids--cms-22744)
-   [A Creative Grid System with Sass and calc()](https://www.sitepoint.com/creative-grid-system-sass-calc/)

### SCSS-lint

Prześwietlanie (linting) kodu jest zagadnieniem o bardzo dużej wadze. Zazwyczaj podążanie za sprawdzonymi wytycznymi, m.in. określonymi w tym przewodniku, redukuje ilość pomyłek w kodzie. Nie zapominajmy jednocześnie, że każdemu zdarzają się błędy i zawsze będzie coś do poprawki. Można więc śmiało stwierdzić, że linting kodu jest równie ważny co odpowiednie komentowanie go.

[SCSS-lint](https://github.com/causes/scss-lint) jest narzędziem, które pomaga w utrzymaniu plików SCSS w czystości i zapewnia ich czytelność. Jest ono w pełni konfigurowalne i jednocześnie bardzo proste w integracji z innymi narzędziami.

Na całe szczęście, rekomendacje SCSS-linta są w wysokim stopniu zbliżone do tych opisanych w tym przewodniku. Aby skonfigurować SCSS-lint w pełnej zgodności z Sass Guidelines, zalecam następujące jego ustawienia:

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

Chcąc dołączyć SCSS-lint do obecnego procesu budowania w Gruncie, dostępny jest plugin do Grunta o nazwie [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint).

Poza tym, chłopaki z [Thoughtbot](https://thoughtbot.com/) (Bourbon, Neat…) pracują obecnie nad [Hound](https://houndci.com/), który współpracuje z SCSS-lint i jemu podobnymi

**Dalsze informacje:**

-   [Clean Up your Sass with SCSS-lint](https://blog.martinhujer.cz/clean-up-your-sass-with-scss-lint/)
-   [Improving Sass code quality on theguardian.com](https://www.theguardian.com/info/developer-blog/2014/may/13/improving-sass-code-quality-on-theguardiancom)
-   [grunt-scss-lint](https://github.com/ahmednuaman/grunt-scss-lint)
-   [An Auto-Enforceable SCSS Styleguide](https://davidtheclark.com/scss-lint-styleguide/)

## Too long; Didn’t read

Przewodnik ten jest dosyć długi i czasami dobrze jest mieć dostęp do pewnego rodzaju podsumowania. Poniżej znajduje się właśnie takie podsumowanie.

### Kluczowe zasady

-   Korzystanie z przewodnika stylu ma na celu przede wszystkim wymuszenie konsekwentności. Można się nie zgadzać z niektórymi wytycznymi Sass Guidelines, aby tylko być w tym konsekwentnym.
-   Kod w Sassie powinien być pisany tak prosto, jak to jest tylko możliwe. W miarę możliwości, należy unikać budowania nadmiernie skomplikowanych systemów.
-   Należy pamiętać, że czasem zasada _KISS_ (Keep It Simple, Stupid) jest lepsza niż _DRY_ (Don’t Repeat Yourself).

### Składnia i formatowanie

-   Indentacja powinna się składać z dwóch (2) spacji, bez tabulatora.
-   Linie powinny być, jak to jest tylko możliwe, szerokie na 80 znaków. Można je dowolnie dzielić na wiele linii, w razie potrzeby.
-   CSS powinien być pisany, w miarę możliwości, zgodnie z regułami [CSS Guidelines](https://cssguidelin.es) autorstwa Harry’ego Robertsa.
-   Znaki niedrukowalne (whitespaces) powinny być używane do rozdzielania pojedynczych elementów, reguł i deklaracji. Nie obawiaj się zostawić pustej linii, to nic nie kosztuje.

#### Ciągi

-   Deklarowanie dyrektywy `@charset` na górze arkusza stylów jest wysoce zalecane.
-   Z wyjątkiem użycia ich jako identyfikatorów w CSSie, ciągi powinny być umieszczane pomiędzy znakami pojedynczych cudzysłowów. URLe również powinny być w cudzysłowach.

#### Liczby

-   Sass nie rozróżnia liczb całkowitych, czy zmiennoprzecinkowych i z tego też powodu zera końcowe powinny być pomijane. Z drugiej jednak strony, poprzedzające zera poprawiają czytelność kodu i powinny być dodawane.
-   Długość zerowa nie powinna mieć jednostki.
-   Manipulacja jednostkami powinna być rozumiana jako działanie arytmetyczne, nie operacja na ciągach znaków.
-   Aby poprawić czytelność kodu, powinno się umieszczać obliczenia najwyższego poziomu w nawiasach. Ponadto, kompleksowe działania matematyczne mogą być dzelone na mniejsze części.
-   Liczby magiczne drastycznie pogarszają czytelność kodu i powinno się ich unikać. W razie wątpliwości, należy dokładnie wytłumaczyć (w komentarzu) daną wartość.

#### Barwy

-   Barwy powinny być wyrażane w formacie HSL jeśli jest to tylko możliwe, potem RGB, a w ostateczności jako określenie szesnastkowe (małymi literami i skrócone). Należy unikać słów kluczowych reprezentujących barwy.
-   Użycie `mix(..)` zamiast `darken(..)` i `lighten(..)` powinno być preferowane w przypadkach, gdy potrzebne jest przyciemnienie i rozjaśnienie barwy.

#### Listy

-   Za wyjątkiem używania ich do bezpośredniego mapowania wartości CSSa rozdzielonych spacją, listy powinny być rozdzielane przecinkami.
-   Umieszczanie list wewnątrz nawiasów poprawia czytelność kodu.
-   Końcowy przecinek powinien być stosowany tylko i wyłącznie w przypadku list zajmujących wiele linii.

#### Mapy

-   Mapy składające się z więcej niż z jednej pary powinny być pisane na wielu liniach.
-   Celem poprawy łatwości utrzymania kodu, ostatnia para powinna być zakończona przecinkiem.
-   Klucze map, które są ciągami, powinny być umieszczane w cudzysłowach, tak jak każdy inny ciąg.

#### Sortowanie deklaracji

-   System użyty przy sortowaniu deklaracji (według porządku alfabetycznego, według typu, itd.) nie ma większego znaczenia. Powinien on być jednak stosowany konsekwentnie.

#### Zagnieżdżanie selektorów

-   Należy unikać zagnieżdżania selektorów jeśli nie jest to konieczne (a więc w większości przypadków).
-   Z zagnieżdżania selektorów warto korzystać przy pseudo-klasach i pseudo-elementach.
-   Media queries mogą również być zagnieżdżane wewnątrz selektorów, których dotyczą.

### Konwencje nazw

-   Zaleca się korzystanie z ogólnej konwencji nazw CSSa, która (z kilkoma wyjątkami) zakłada pisanie małą literą i rozdzielanie słów myślnikami.

### Komentarze

-   CSS jest specyficznym językiem. Nie powinno się więc unikać pisania szczegółowych komentarzy dotyczących rzeczy, które zdają się być (albo są) niezrozumiałe.
-   Dla zmiennych, funkcji, mixinów i placeholderów tworzących publiczne API, zaleca się korzystać z generatora dokumentacji SassDoc.

### Zmienne

-   Nie należy używać flagi `!default` dla jakiejkolwiek zmiennej będącej elementem publicznego API, która może być bezpiecznie zmieniona.
-   Nie należy używać flagi `!global` na głównym poziomie, jako że może ona być w przyszłości przyczyną niezgodności ze składnią Sassa.

### Extendy

-   Należy rozwijać placeholdery, nie zaś selektory CSSa.
-   Należy rozwijać ten sam placeholder tak rzadko, jak jest to tylko możliwe, celem uniknięcia nieoczekiwanych efektów ubocznych.
