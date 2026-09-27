## À propos

git-flow est un ensemble d'extensions git permettant des opérations de haut niveau sur un dépôt pour appliquer le modèle de branches de Vincent Driessen. [détails](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Cet aide-mémoire montre l'utilisation et les effets des opérations git-flow

★ ★ ★

## Conseils de base

-   Les commandes et sorties de Git-flow apportent une aide précieuse. Lisez-les attentivement pour comprendre ce qui se passe…
-   Le logiciel pour macOS [Sourcetree](http://www.sourcetreeapp.com/) est une excellente interface graphique pour git qui supporte git-flow.
-   Git-flow est une solution basée sur les fusions (merge). Elle n'effectue pas de _rebase_ sur les branches de fonctionnalitées

★ ★ ★

## [Installation](#setup)

-   Une installation fonctionnelle de git est requise
-   Git flow fonctionne sur macOS, Linux et Windows

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

Vous aurez besoin de wget et de util-linux pour installer git-flow.

Pour des instructions détaillées concernant l'installation de git-flow, consultez le [wiki git-flow](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation).

![install git-flow](http://danielkummer.github.io/git-flow-cheatsheet/img/download.png)

## [Premiers pas](#getting_started)

Git flow doit être initialisé afin de personnaliser la configuration de votre projet.

★ ★ ★

### Initialisation

Commencez à utiliser git-flow en l'initialisant dans un dépôt git existant :

> git flow init

Vous devrez répondre à quelques questions concernant les conventions de nommage pour vos branches.  
Il est recommandé d'utiliser les valeurs par défaut.

## [Fonctionnalités/Features](#features)

-   Développe des nouvelles fonctionnalités pour la prochaine version
-   Existe en général uniquement dans les dépôts des développeurs

★ ★ ★

### Commencer une feature

Le développement d'une fonctionnalité commence à partir de la branche 'develop'

Commencer le développement d'une nouvelle fonctionnalité avec :

> git flow feature start MYFEATURE

Cette commande crée une nouvelle branche de fonctionnalité basée sur 'develop' et passe sur cette branche

### Terminer une fonctionnalité

Termine le développement d'une fonctionnalité. Cette action effectue les opérations suivantes:

-   Fusionne MYFEATURE dans 'develop'
-   Supprime la branche de fonctionnalité
-   Passe sur la branche 'develop'

> git flow feature finish MYFEATURE

### Publier une fonctionnalité

Vous développez une fonctionnalité en collaboration?  
Publiez une fonctionnalité sur le serveur distant pour qu'elle puisse être utilisée par d'autres utilisateurs.

> git flow feature publish MYFEATURE

### Récupérer une fonctionnalité publiée

Récupérer une fonctionnalité publiée par un autre utilisateur

> git flow feature pull origin MYFEATURE

Vous pouvez suivre une fonctionnalité sur le serveur distant en utilisant `git flow feature track MYFEATURE`

## [Livraison/Release](#release)

-   Prépare la sortie d'une nouvelle version de production
-   Permet les corrections de bugs mineurs et la préparation des métadonnées de la release

★ ★ ★

### Commencer une livraison

Pour commencer une livraison, utilisez la commande git-flow release

Créer une branche de livraison basée sur la branche de développement.

> git flow release start RELEASE \[BASE\]

Vous pouvez si besoin ajouter le paramètre `[BASE]`, correspondant au hash d'un commit à partir duquel commencera la livraison. Ce commit doit faire partie de la branche de développement.

★ ★ ★

Il est préférable de publier la branche de livraison après l'avoir créée pour permettre aux autres développeurs de commiter dessus. De la même manière que pour les fonctionnalités, utilisez cette commande:

> git flow release publish RELEASE

Vous pouvez suivre une livraison sur le serveur distant en utilisant  
`git flow release track RELEASE`

### Terminer une livraison

Terminer une livraison est une des étapes majeures de cette méthode. Plusieurs actions sont réalisées :

-   Fusionne la branche de livraison dans la branche 'master'
-   Etiquette (tag) la livraison par son nom
-   Fusionne la livraison dans la branche 'develop'
-   Supprime la branche de livraison

> git flow release finish RELEASE

N'oubliez pas de pousser vos étiquettes (tags) avec `git push --tags`

## [Correctifs/Hotfixes](#hotfixes)

-   Les correctifs sont utiles quand il est nécessaire de corriger immédiatement l'état incorrect de la version en production
-   Ils peuvent se baser sur l'étiquette de la branche 'master' indiquant la version en production.

★ ★ ★

### Commencer un hotfix

Comme pour les autres commandes git-flow, un hotfix est commencé par

> git flow hotfix start VERSION \[BASE\]

Ici, le paramètre VERSION indique le nom de la future release corrective. Vous pouvez si besoin spécifier le paramètre `[BASE]`, correspondant au hash d'un commit ou au nom d'une branche à partir duquel s'appliquera le hotfix.

### Terminer un hotfix

En terminant un hotfix, il est fusionné dans les branches 'develop' et 'master'. De plus la fusion vers 'master' est etiquetée par la version du hotfix.

> git flow hotfix finish VERSION

## En complément

★ ★ ★

-   Toutes les commandes disponibles ne sont pas abordées ici, seulement les principales
-   Vous pouvez toujours utiliser normalement git et toutes ses commandes telles que vous les connaissez, git flow est seulement un ensemble d'outils supplémentaires
-   La fonction 'support' est encore en version bêta, il n'est pas conseillé de l'utiliser
-   Si vous voulez ajouter des traductions de ce document, je les intégrerai avec plaisir

★ ★ ★
