## Introduzione

git-flow è un set di estensioni per git che offre comandi di alto livello sul repository per utilizzare il modello di branching di Vincent Driessen. [maggiori informazioni](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Questo cheatsheet mostra l'utilizzo di base a gli effetti dei comandi offerti da git-flow

★ ★ ★

## Consigli di base

-   Git flow offre un eccelente guida e un ottimo output a linea di comando. Leggeteli attentamente per vedere e capire cosa sta succedendo...
-   Il Client per macOS/Windows [Sourcetree](http://www.sourcetreeapp.com/) è un'eccellente GUI per git e offre supporto per git-flow
-   Git-flow è una soluzione basata sul merge. Non esegue alcun rebase sui feature branch.

★ ★ ★

## [Setup](#setup)

-   È necessaria un'installazione di git funzionante come prerequisito.
-   Git flow funziona su macOS, Linux e Windows

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

Sono necessari wget e util-linux per installare git-flow.

Per le istruzioni dettagliate riguardo all'installazione di git-flow visitate il [wiki di git flow](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation).

![install git-flow](http://danielkummer.github.io/git-flow-cheatsheet/img/download.png)

## [Per Iniziare](#getting_started)

Git flow ha la necessità di essere inizializzato onde personalizzare il setup del progetto.

★ ★ ★

### Inizializzazione

è possibile iniziare ad utilizzare git-flow inizializzandolo all'interno di un repository git esistente:

> git flow init

Dovrete rispondere ad alcune domande riguardanti la naming conventions da utilizzarsi per i branch.  
Si consglia l'uso dei valori di default proposti.

## [Features (Funzionalità)](#features)

-   Sviluppare nuove features per le releases in arrivo
-   Generalmente sono (branch) presenti solo nei repository di sviluppo

★ ★ ★

### Iniziare una nuova feature

Lo sviluppo di nuove feature comincia dal branch 'develop'.

Iniziate lo sviluppo di una nuova feature con

> git flow feature start MYFEATURE

Questa crea un nuovo feature branch basato su 'develop' e si sposta su quello (ne fa il checkout)

### Completamento di una feature

Termina lo sviluppo di una feature. Questa azione esegue le seguenti operazioni

-   Merge del branch MYFEATURE nel branch 'develop'
-   Rimuove il feature branch usato per lo sviluppo della feature
-   Si sposta di nuovo sul branch 'develop'

> git flow feature finish MYFEATURE

### Pubblicare una feature

State sviluppando una feature in collaborazione con altri?  
Pubblicate una feature sul server remoto in modo che possa essere utilizzata da altri utenti.

> git flow feature publish MYFEATURE

### Scaricare una feature pubblicata

Scaricare dal server remoto una feature pubblicata da un altro utente.

> git flow feature pull origin MYFEATURE

Potete tracciare una feature sul repository origin usando `git flow feature track MYFEATURE`

## [Creare una release](#release)

-   Supporto alla preparazione di una nuova release di produzione
-   Consente di eseguire bug fixes minori e preparare i meta-dati per la release

★ ★ ★

### Iniziare una release

Per iniziare una release usate il comando release di git flow. Crea un release branch a partire dal branch 'develop'.

> git flow release start RELEASE \[BASE\]

Potere facoltativamente fornire nel parametro `[BASE]` lo sha-1 hash del commit dal quale far partire la release. Il commit deve essere presente nel branch 'develop'.

★ ★ ★

È una buona idea pubblicare il release branch dopo averlo creato in modo da consentire l'invio di release commit anche da parte di altri sviluppatori. Potete farlo, usando un comando analogo a quello usato per pubblicare le features:

> git flow release publish RELEASE

(Potete tracciare la release remota con il comando `git flow release track RELEASE`)

### Completamento di una release

Terminare una release è uno dei passi più grandi nella gestione dei branch di git. Vengono eseguite svariate operazioni:

-   Merge del release branch su branch 'master'
-   Tagging della relase con il suo nome
-   Merge all'indietro della relase sul branch 'develop'
-   Rimozione del release branch

> git flow release finish RELEASE

Non dimenticate di fare il push dei tag creati con `git push --tags`

## [Hotfixes](#hotfixes)

-   Gli Hotfixes nascono dalla necessità di reagire prontamente di fronte ad uno stato indesiderato della versione live di produzione.
-   Possono essere creati a partire dal tag corrispondente sul branch master che contrassegna la versione di produzione.

★ ★ ★

### git flow hotfix start

Come gli altri comandi di git flow, un hotfix si inizia con

> git flow hotfix start VERSION \[BASENAME\]

La versione passata come argomento definisce il nuovo nome dell'hotfix release. Facoltativamente potete specificare un basename da cui partire (un tag di release sul branch 'master').

### completamento di un hotfix

Terminando un hotfix, questo viene integrato (merge) all'indietro all'interno dei branch 'develop' e 'master'. In aggiunta il master viene taggato con la versone dell'hotfix.

> git flow hotfix finish VERSION

## Backlog

★ ★ ★

-   Non tutti i comandi git disponibili sono riportati qui, solo quelli più importanti
-   Potete comunque sempre usare git e tutti i suoi comandi normalmente come li conoscete, git flow costituisce solamente una collezione di strumenti aggiuntivi.
-   La funzionalità 'support' è ancora in beta, il suo utilizzo non è consigliato
-   Se volete fornire una traduzione nella Vostra lingua, sarò felice di integrarla

★ ★ ★
