## Wprowadzenie

git-flow jest zbiorem rozszerzeń gita dostarczającym wysokopoziomowe operacje na repozytorium, wspierającym strategię rozgałęziania opracowaną przez Vincenta Driessena. [Czytaj więcej](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Ta ściągawka prezentuje podstawy użycia i efekt działania operacji git-flow.

★ ★ ★

## Podstawowe wskazówki

-   Git flow dostarcza świetną pomoc z poziomu wiersza poleceń. Czytaj ją uważne, aby wiedzieć, co się dzieje...
-   [Sourcetree](http://www.sourcetreeapp.com/) - klient dla OSX/Windowsa, który jest wyśmienitą nakładką graficzną dla gita posiadającą wsparcie dla git-flow.
-   Git-flow bazuje na scalaniu. Nie używa rebase do integrowania zmian.

★ ★ ★

## [Konfiguracja](#setup)

-   Zanim zaczniesz, potrzebujesz działającego gita.
-   Git flow działa na OSX, Linuxie oraz Windowsie.

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

Potrzebujesz wget oraz util-linux żeby zainstalować git-flow.

Szczegółową instrukcję instalacji git-flow możesz znaleźć na stronie [wiki](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation).

![install git-flow](http://danielkummer.github.io/git-flow-cheatsheet/img/download.png)

## [Pierwsze kroki](#getting_started)

Żeby dostosować ustawienia Twojego projektu, git flow musi zostać zainicjalizowany.

★ ★ ★

### Inicjalizacja

Rozpocznij używanie git-flow inicjalizując go w istniejącym repozytorium gita:

> git flow init

Będziesz musiał odpowiedzieć na kilka pytań dotyczących nazewnictwa gałęzi.  
Zaleca się stosowanie wartości domyślnych.

## [Funkcjonalności](#features)

-   Dostarczają nowych funkcjonalności do nadchodzących wydań.
-   Zazwyczaj istnieją tylko w repozytoriach deweloperów.

★ ★ ★

### Rozpocznij nową funkcjonalność

Rozwój nowej funkcjonalności rozpoczyna się od gałęzi 'develop'.

Rozpocznij rozwój nowej funkcjonalności używając:

> git flow feature start MYFEATURE

W ten sposób tworzysz gałąź dla nowej funkcjonalności bazując na gałęzi 'develop' jednocześnie się na nią przełączając.

### Zakończ funkcjonalność

Zakończenie rozwoju funkcjonalności. Ta czynność spowoduje:

-   Scalenie gałęzi MYFEATURE do gałęzi 'develop'
-   Usunięcie gałęzi funkcjonalności
-   Przełączenie z powrotem do gałęzi 'develop'

> git flow feature finish MYFEATURE

### Opublikowanie funkcjonalności

Rozwijasz funkcjonalność w grupie?  
Opublikuj funkcjonalność na serwerze zdalnym, dzięki czemu inni też będą jej mogli z niej korzystać.

> git flow feature publish MYFEATURE

### Pobieranie opublikowanej zmiany

Pobierz zmianę opublikowaną przez innego użytkownika.

> git flow feature pull origin MYFEATURE

Możesz śledzić zmianę na serwerze źródłowym używając `git flow feature track MYFEATURE`

## [Utwórz wydanie](#release)

-   Wspomaga przygotowanie nowego wydania produkcyjnego
-   Pozwala na drobne poprawki błędów oraz przygotowanie metadanych dla wydania

★ ★ ★

### Rozpocznij wydanie

Aby rozpocząć wydanie użyj polecenia git flow release. Zostanie stworzona gałąź wydania bazująca na gałęzi 'develop'.

> git flow release start RELEASE \[BASE\]

Opcjonalnie w `[BASE]` możesz podać skrót sha-1 zmiany od której chcesz rozpocząć wydanie. Zmiana musi pochodzić z gałęzi 'develop'.

★ ★ ★

Mądrze jest opublikować gałąź wydania po tym jak się ją stworzy, umożliwiając dodawanie zmian do wydania innym deweloperom. Możesz tego dokonać analogicznie do opublikowania funkcjonalności:

> git flow release publish RELEASE

(Używając polecenia  
`git flow release track RELEASE` możesz śledzić zdalne wydanie)

### Zakończ wydanie

Kończenie wydania jest jednym z dużych kroków podczas pracy z gałęziami gita. Realizuje ono szereg działań:

-   Scala gałąź wydania do gałęzi 'master'
-   Taguje wydanie jego nazwą
-   Scala z powrotem gałąź wydania do gałęzi 'develop'
-   Usuwa gałąź wydania

> git flow release finish RELEASE

Nie zapomnij o wypchnięciu tagów poleceniem `git push --tags`

## [Poprawki](#hotfixes)

-   Poprawki wynikają z konieczności podjęcia natychmiastowych działań wobec niepożądanego stanu działającej w wersji produkcyjnej
-   Mogą rozgałęziać się od odpowiedniego tagu wskazującego wersję produkcyjną.

★ ★ ★

### git flow hotfix start

Podobnie jak inne operacje git flow, poprawkę rozpoczyna się od

> git flow hotfix start VERSION \[BASENAME\]

Parametr VERSION znakuje nazwę nowej poprawki. Opcjonalnie w BASENAME możesz podać nazwę gałęzi od której rozpoczniesz.

### Zakończ poprawkę

Operacja kończenia poprawki scala poprawkę do gałęzi develop oraz master. Dodatkowo scalenie do gałęzi master jest tagowane wersją poprawki.

> git flow hotfix finish VERSION

## Końcowe uwagi

★ ★ ★

-   Nie zostały tutaj opisane wszystkie dostępne polecenia, a jedynie te najważniejsze
-   Możesz wciąż normalnie używać gita oraz wszystkich jego poleceń tak jak to robiłeś do tej pory - git flow jest tylko zestawem dodatkowych narzędzi
-   Funkcjonalność 'support' jest wciąż w fazie beta - użycie jej nie jest zalecane
-   Jeśli chciałbyś dostarczyć poprawki do tego tłumaczenia, z chęcią je dołączę.

★ ★ ★
