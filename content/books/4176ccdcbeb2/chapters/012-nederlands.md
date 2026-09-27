## Over

git-flow is een set van git extensies voor high-level repository operaties voor Vincent Driessen's branching model. [meer](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Dit cheatsheet laat het basisgebruik en de effecten zien van git-flow operaties

★ ★ ★

## Basistips

-   Git flow biedt uitstekende commandline hulp en output. Lees het zorgvuldig om te zien wat er gebeurt...
-   Het macOS/Windows programma [Sourcetree](http://www.sourcetreeapp.com/) is een uitstekende grafische git interface en biedt git-flow ondersteuning
-   Git-flow is een op merge gebaseerde oplossing. Het rebaset feature branches niet.

★ ★ ★

## [Installatie](#setup)

-   Je hebt een werkende git installatie nodig.
-   Git flow werkt op macOS, Linux en Windows

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

Je hebt wget en util-linux nodig om git-flow te installeren.

Gedetailleerde installatie instructies voor git flow kun je vinden op de [git flow wiki](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation).

![install git-flow](http://danielkummer.github.io/git-flow-cheatsheet/img/download.png)

## [Aan de slag](#getting_started)

Git flow moet geinitializeerd zijn om je project setup aan te passen.

★ ★ ★

### Initializatie

Je kan git-flow initializeren door het volgende commando in een bestaande git repository uit te voeren:

> git flow init

Je dient een paar vragen te beantwoorden over de naamgevingsconventies voor je branches.  
Het is aanbevolen om de standaard waarden te gebruiken.

## [Features](#features)

-   Ontwikkel nieuwe features voor aankomende releases
-   Bestaat typisch alleen in de repository van de ontwikkelaar

★ ★ ★

### Een nieuwe feature starten

Nieuwe features hebben de 'develop' branch als uitgangspunt.

Start met ontwikkelen van een nieuwe feature met

> git flow feature start MYFEATURE

Deze actie maakt een nieuwe feature branch gebaseerd op 'develop' en schakelt over naar deze

### Het afronden van een feature

Rond de ontwikkeling van een feature af. Deze actie voert de volgende stappen uit

-   Merge MYFEATURE in 'develop'
-   Verwijdert de feature branch
-   Schakelt terug naar de 'develop' branch

> git flow feature finish MYFEATURE

### Een feature publiceren

Ontwikkel je de feature samen met anderen?  
Publiceer de feature branch dan naar de remote server zodat anderen deze branch ook kunnen gebruiken.

> git flow feature publish MYFEATURE

### Een gepubliceerde feature ophalen

Haal een door een andere ontwikkelaar gepubliceerde feature op.

> git flow feature pull origin MYFEATURE

Je kan de wijzigingen op de feature bijhouden op de server door `git flow feature track MYFEATURE` uit te voeren

## [Een release maken](#release)

-   Ondersteunt de voorbereiding op een nieuwe productie release
-   Staat kleine bugfixes toe en bereidt meta-data van een release voor

★ ★ ★

### Een release starten

Om een release te starten, kun je het git flow release commando gebruiken. Dit

maakt een release branch aan gebaseerd op de 'develop' branch.

> git flow release start RELEASE \[BASE\]

Je kan optioneel een `[BASE]` commit sha-1 hash toevoegen om de release hiervandaan te beginnen. Deze commit moet op de 'develop' branch aanwezig zijn.

★ ★ ★

Het is verstandig om de release branch te publiceren zodat andere ontwikkelaars hieraan kunnen meewerken. Dit lijkt op het publiceren van een feature branch:

> git flow release publish RELEASE

(Je kan wijzigingen op de release branch bijhouden met het  
`git flow release track RELEASE` commando)

### Een release afronden

Een release afronden is een grote stap in git branchen. Het voert verschillende acties uit:

-   De release branch wordt terug in 'master' gemerged
-   De release wordt getagged met zijn naam
-   De release wordt terug in 'develop' gemerged
-   Verwijdert de release branch

> git flow release finish RELEASE

Vergeet niet je tags te pushen met `git push --tags`

## [Hotfixes](#hotfixes)

-   Hotfixes ontstaan wanneer er onmiddellijk gehandeld moet worden na een bug in de live versie
-   Kan de corresponderende tag op de 'master' branch als basis hebben.

★ ★ ★

### git flow hotfix start

Zoals andere git flow commando's, een hotfix wordt gestart door

> git flow hotfix start VERSION \[BASENAME\]

Het VERSION argument slaat op de nieuwe hotfix release naam. Optioneel kun je de BASENAME aangeven waarvandaan begonnen moet worden.

### Een hotfix afronden

Het afronden van een hotfix zorgt ervoor dat deze zowel in develop als in master gemerged wordt. Aansluitend wordt de merge in de master getagged met de hotfix versie.

> git flow hotfix finish VERSION

## Backlog

★ ★ ★

-   Niet alle beschikbare commando's zijn hier behandeld, alleen de belangrijkste
-   Je kan git en al zijn commando's gewoon blijven gebruiken daar git flow alleen een handig gereedschap is
-   De 'support' feature is nog steeds in beta, het gebruik hiervan wordt niet geadviseerd
-   Als je vertalingen wilt aanleveren, zal ik deze graag integreren

★ ★ ★
