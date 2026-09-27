## Despre

git-flow sunt un set de extensii git care furnizează operații de nivel înalt pentru întreg repository-ul folosind modelul de branch-uri al lui Vincent Driessen. [mai mult](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Această copiuță arată scenariile de bază, precum și efectul folosirii operațiilor git-flow.

★ ★ ★

## Pentru început

-   Git flow oferă ajutor și output excelente direct în linia de comandă. Citește-le cu atenție pentru a observa ce se întâmplă...
-   Clientul [Sourcetree](http://www.sourcetreeapp.com/) pentru macOS/Windows este o interfață excelentă pentru git și are suport pentru git-flow
-   Git-flow este o soluție bazată pe merge-uri. Nu face rebase pe branch-urile de tip feature.

★ ★ ★

## [Instalare](#setup)

-   Ca și precondiții este nevoie de o instalare git funcțională.
-   Git flow funcționează pe macOS, Linux și Windows

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

Vei avea nevoie de wget și de util-linux pentru a instala git-flow.

Pentru instrucțiuni detaliate de instalare a git flow te rugăm să vizitezi [wiki-ul git flow](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation).

![install git-flow](http://danielkummer.github.io/git-flow-cheatsheet/img/download.png)

## [La început](#getting_started)

Git flow trebuie să fie inițializat pentru a putea personaliza proiectul tău.

★ ★ ★

### Inițializare

Începe folosirea git-flow prin a-l inițializa în interiorul unui repository git deja existent:

> git flow init

Va fi necesar să răspunzi la căteva întrebări legate de convențiile de numire pentru branch-urile tale.  
Se recomandă să folosești valorile implicite.

## [Funcționalități/Features](#features)

-   Dezvoltă noi funcționalități pentru viitoarele release-uri
-   Există de obicei doar în repository-urile programatorilor

★ ★ ★

### Începere funcționalitate nouă

Dezvoltarea de funcționalități noi începe din branch-ul 'develop'.

Începe dezvoltarea unei funcționalități noi cu

> git flow feature start MYFEATURE

Această acțiune crează un nou branch bazat pe 'develop' și se mută pe el

### Finalizare funcționalitate

Încheie dezvoltarea unei funcționalități. Această acțiune execută următoarele operații

-   Face merge al branch-ului MYFEATURE în 'develop'
-   Șterge branch-ul de tip funcționalitate
-   Se mută înapoi pe branch-ul 'develop'

> git flow feature finish MYFEATURE

### Publicare funcționalitate

Dezvolți funcționalitate în colaborare cu altcineva?  
Publică-ți funcționalitatea pe server, ca ea să poată fi folosită și de alți utilizatori.

> git flow feature publish MYFEATURE

### Obținerea unei funcționalități publicate

Obține funcționalitate publicată de către un alt utilizator.

> git flow feature pull origin MYFEATURE

Poți urmări o funcționalitate la repository-ul origine folosind `git flow feature track MYFEATURE`

## [Predare/Release](#release)

-   Ajută la pregătirea unui nou release în producție
-   Permite fixarea unor probleme minore, precum și pregătirea meta-datelor asociate unui release

★ ★ ★

### Începere release

Pentru a începe un release nou, folosește comanda git flow release. Aceasta crează un nou branch de tip release bazat pe branch-ul 'develop'.

> git flow release start RELEASE \[BAZE\]

Este posibilă furnizarea unei `[BAZE]` sha-1 de commit pentru a fi folosit drept bază a release-ului ce se crează. Acest commit trebuie să existe pe branch-ul 'develop'.

★ ★ ★

Este înțelept a publica branch-ul de release după ce a fost creat, pentru a permite și altor programatori să contribuie. Acest proces este similar celui de publicare funcționalitate; se folosește comanda:

> git flow release publish RELEASE

(Poți urmări un release cu comanda  
`git flow release track RELEASE`)

### Finalizare release

Finalizarea unui release este unul din cei mai importanți pași din lucrul cu branch-urile în git. Se efectuează câteva acțiuni:

-   Merge al branch-ului release înapoi în 'master'
-   Crează tag (etichetă) pentru release, cu numele acestuia
-   Merge al release-ului în branch-ul 'develop'
-   Șterge branch-ul de release

> git flow release finish RELEASE

Nu uita să publici etichetele cu comanda `git push --tags`

## [Corecturi/Hotfixes](#hotfixes)

-   Corecturile provin din necesitatea de a acționa cât mai curând asupra unei stări nedorite a unei versiuni deja livrate
-   Se poate baza pe eticheta de pe branch-ul master corespunzătoare release-ului țintit.

★ ★ ★

### Începere corectură

Asemeni celorlalte comezi git flow, o corectură se începe cu

> git flow hotfix start VERSION \[BASENAME\]

Argumentul VERSION markează noul nume de release ce va fi atribuit corecturii. În mod opțional poți preciza un nume de bază de la care se va porni în crearea corecturii.

### Finalizare corectură

Prin finalizarea unei corecturi, aceasta va fi merge-uită înapoi în branch-urile 'develop' și 'master'. Suplimentar, 'master' va fi etichetat cu versiunea corecturii.

> git flow hotfix finish VERSION

## Rezerve

★ ★ ★

-   Nu toate comenzile disponibile sunt acoperite aici, ci doar cele mai importante
-   Poți folosi în continuare git și toate comenzile sale în mod normal, așa cum le cunoști, deoarece git flow este doar o colecție de instrumente suplimentare
-   Facilitatea de 'support' este încă în beta, de aceea folosirea sa nu este recomandată
-   Dacă dorești să ajuti la traducere, voi fi fericit să le integrez

★ ★ ★
