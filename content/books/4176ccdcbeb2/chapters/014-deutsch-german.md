## Über

git-flow ist ein Menge von Git-Erweiterungen, welche komplexe Repository-Arbeiten nach Vincent Driessens Branching-Modell ermöglicht. [mehr](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Dieser Spickzettel veranschaulicht die grundlegende Nutzung und den Ablauf von git-flow Operationen.

★ ★ ★

## Grundlegende Tipps

-   git-flow bietet eine exzellente Hilfe und ausführliche Ausgabe auf der Kommandozeile. Lies Dir die Ausgaben aufmerksam durch und versuche zu verstehen, was passiert.
-   Der macOS/Windows Client [SourceTree](http://www.sourcetreeapp.com/) bietet ein exzellentes grafisches Interface und einfache Git-Flow Unterstützung.
-   git-flow ist eine rein Merge-basierte Lösung (Zusammenführung). Es findet kein Rebasing der Feature-Branches (Entwicklungszweige) statt.

★ ★ ★

## [Einrichtung](#setup)

-   Als Voraussetzung benötigst Du eine funktionierende Git Installation.
-   git-flow läuft unter macOS, Linux und Windows.

★ ★ ★

### macOS

Homebrew

> $ brew install git-flow-avh

Macports

> $ port install git-flow-avh

### Linux

> $ apt-get install git-flow

### Windows (Cygwin)

> $ wget -q -O - --no-check-certificate https://raw.github.com/petervanderdoes/gitflow-avh/develop/contrib/gitflow-installer.sh install stable | bash

Du benötigst wget und util-linux, um git-flow zu installieren.

Für eine detaillierte git-flow Installationsanleitung besuche bitte das [git flow wiki](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation).

![install git-flow](http://danielkummer.github.io/git-flow-cheatsheet/img/download.png)

## [Erste Schritte](#getting_started)

git-flow muss initalisiert werden, um das Projektsetup anzupassen.

★ ★ ★

### Initialisierung

Fange an mit git-flow zu arbeiten, indem Du es innerhalb eines bestehenden Git-Repository initialisierst:

> git flow init

Dabei musst Du einige Fragen bezüglich der Namenskoventionen Deiner Branches (Entwicklungszweige) beantworten.  
Es wird empfohlen, die Standardwerte zu verwenden.

## [Features](#features)

-   Entwicklung neuer Features für bevorstehende Releases.
-   Wird in der Regel nur in Entwickler-Repositories verwendet.

★ ★ ★

### Entwicklung neuer Features

Neue Features werden vom 'develop'-Branch abgeleitet.

Starte die Entwicklung eines neuen Features mittels

> git flow feature start MYFEATURE

Dieser Befehl erstellt einen neuen Feature-Branch basierend auf 'develop' und wechselt in diesen.

### Fertigstellung eines Features

Beende die Entwicklung eines Features. Dies führt zu folgenden Aktionen:

-   Zusammenführen von MYFEATURE in den 'develop'-Branch (Merge-Prozess)
-   Entfernt den Feature-Branch
-   Wechselt zurück in den 'develop'-Branch

> git flow feature finish MYFEATURE

### Veröffentlichen eines Features

Entwickelst Du ein Feature in Zusammenarbeit?  
Veröffentliche Dein Feature auf einem entfernten Server, so dass es auch von anderen verfolgt werden kann.

> git flow feature publish MYFEATURE

### Holen eines veröffentlichten Features

Hole ein Feature, welches von einem anderen Nutzer veröffentlicht wurde.

> git flow feature pull origin MYFEATURE

Du kannst ein Feature unter Verwendung von

> git flow feature track MYFEATURE

auf 'origin' verfolgen.

## [Erstelle ein Release](#release)

-   Unterstützt die Fertigstellung einer Produktionsversion.
-   Erlaubt geringfügige Bugfixes und die Erstellung der Metadaten für ein Release

★ ★ ★

### Beginne ein Release

Um ein neues Release zu beginnen, benutze den git flow release Befehl. Mit diesem wird ein Release-Branch vom aktuellen 'develop'-Branch erstellt.

> git flow release start RELEASE \[BASE\]

Du kannst optional einen `[BASE]` Commit sha-1 Hash bereitstellen, um ein Release von diesem Commit zu starten. Der Commit muss sich im 'develop'-Branch befinden.

★ ★ ★

Es ist ratsam, den Release-Branch nach der Erstellung zu veröffentlichen und damit anderen Entwicklern die Möglichkeit für Commits zu geben. Mache es ähnlich wie bei einem Feature-Branch mit dem Befehl:

> git flow release publish RELEASE

(Du kannst ein entferntes Remote-Release mittels  
`git flow release track RELEASE` verfolgen.)

### Fertigstellung eines Releases

Das Beenden eines Releases ist einer der größten Schritte im Git-Branching-Prozess. Es bewirkt folgende Aktionen:

-   Zusammenführen des Release-Branches zurück in den 'master'-Branch. (Merge-Prozess)
-   Markiert (Tagged) das Release mit seinem Namen
-   Zurückführen des Releases in den 'develop'-Branch (Merge-Prozess)
-   Entfernt den Release-Branch

> git flow release finish RELEASE

Vergesse nicht Deine Tags mittels `git push --tags` zu pushen.

## [Hotfixes](#hotfixes)

-   Hotfixes sind notwendig, sobald ein unerwünschter Zustand innerhalb einer Live-Produktionsversion eintritt und resultierend daraus sofort gehandelt werden muss.
-   Ein Hotfix kann aus dem entsprechenden Tag des 'master'-Branches, welcher die Produktionsversion markiert, direkt abgezweigt werden.

★ ★ ★

### git flow hotfix start

Ähnlich wie auch die anderen git-flow Befehle wird ein Hotfix mittels

> git flow hotfix start VERSION \[BASENAME\]

begonnen. Das VERSION-Argument markiert hierbei den neuen Hotfix-Release-Namen. Optional kannst Du auch einen BASENAME spezifizieren.

### Fertigstellung eines Hotfixes

Mit dem Beenden eines Hotfixes wird dieser in den 'develop'- und 'master'-Branch zusammengeführt (Merge). Nebenbei wird der 'master'-Branch mit einem Tag, welcher die Hotfix-Version beinhaltet, markiert.

> git flow hotfix finish VERSION

## Backlog

★ ★ ★

-   Nur die wichtigsten aller verfügbaren Befehle sind hier behandelt.
-   Du kannst weiterhin alle Git-Befehle normal nutzen, wie Du es gewohnt bist. Git-flow ist nur eine Werkzeugsammlung.
-   Das 'support' Feature ist noch in der Beta-Phase und die Nutzung nicht empfohlen.
-   Wenn Du Übersetzungen beisteuern möchtest, würde ich mich freuen, diese zu integrieren.

★ ★ ★
