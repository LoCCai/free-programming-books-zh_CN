juste un petit guide pour bien démarrer avec git. no deep shit ;)

par [Roger Dudler](http://www.twitter.com/rogerdudler) (translation by [KokaKiwi](https://github.com/KokaKiwi))  
Remerciements à [@tfnico](http://www.twitter.com/tfnico), [@fhd](http://www.twitter.com/fhd), [Namics](http://www.namics.com)  
this guide in [english](http://rogerdudler.github.io/git-guide/index.html), [deutsch](http://rogerdudler.github.io/git-guide/index.de.html), [español](http://rogerdudler.github.io/git-guide/index.es.html), [indonesian](http://rogerdudler.github.io/git-guide/index.id.html), [italiano](http://rogerdudler.github.io/git-guide/index.it.html), [nederlands](http://rogerdudler.github.io/git-guide/index.nl.html), [polski](http://rogerdudler.github.io/git-guide/index.pl.html), [português](http://rogerdudler.github.io/git-guide/index.pt_BR.html), [русский](http://rogerdudler.github.io/git-guide/index.ru.html), [türkçe](http://rogerdudler.github.io/git-guide/index.tr.html),  
[မြန်မာ](http://rogerdudler.github.io/git-guide/index.my.html), [日本語](http://rogerdudler.github.io/git-guide/index.ja.html), [中文](http://rogerdudler.github.io/git-guide/index.zh.html), [한국어](http://rogerdudler.github.io/git-guide/index.ko.html)  

![](http://rogerdudler.github.io/git-guide/img/arrow.png)

## ajouter & valider

Vous pouvez proposer un changement (l'ajouter à l'**Index**) en exécutant les commandes  
`git add <filename>`  
`git add *`  
C'est la première étape dans un workflow git basique. Pour valider ces changements, utilisez  
`git commit -m "Message de validation"`  
Le fichier est donc ajouté au **HEAD**, mais pas encore dans votre dépôt distant.

## envoyer des changements

Vos changements sont maintenant dans le **HEAD** de la copie de votre dépôt local. Pour les envoyer à votre dépôt distant, exécutez la commande  
`git push origin master`  
Remplacez _master_ par la branche dans laquelle vous souhaitez envoyer vos changements.

Si vous n'avez pas cloné votre dépôt existant et voulez le connecter à votre dépôt sur un serveur distant, vous devez l'ajouter avec  
`git remote add origin <server>`  
Maintenant, vous pouvez envoyer vos changements vers le serveur distant sélectionné

## branches

Les branches sont utilisées pour développer des fonctionnalités isolées des autres. La branche _master_ est la branche par défaut quand vous créez un dépôt. Utilisez les autres branches pour le développement et fusionnez ensuite à la branche principale quand vous avez fini.

![](http://rogerdudler.github.io/git-guide/img/branches.png)

créer une nouvelle branche nommée "feature\_x" et passer dessus pour l'utiliser  
`git checkout -b feature_x`  
retourner sur la branche principale  
`git checkout master`  
et supprimer la branche  
`git branch -d feature_x`  
une branche n'est _pas disponible pour les autres_ tant que vous ne l'aurez pas envoyée vers votre dépôt distant  
`git push origin <branch>`

## mettre à jour & fusionner

pour mettre à jour votre dépôt local vers les dernières validations, exécutez la commande  
`git pull`  
dans votre espace de travail pour _récupérer_ et _fusionner_ les changements distants.  
pour fusionner une autre branche avec la branche active (par exemple master), utilisez  
`git merge <branch>`  
dans les deux cas, git tente d'auto-fusionner les changements. Malheureusement, ça n'est pas toujours possible et résulte par des _conflits_. Vous devez alors régler ces _conflits_ manuellement en éditant les fichiers indiqués par git. Après l'avoir fait, vous devez les marquer comme fusionnés avec  
`git add <filename>`  
après avoir fusionné les changements, vous pouvez en avoir un aperçu en utilisant  
`git diff <source_branch> <target_branch>`

## tags

il est recommandé de créer des tags pour les releases de programmes. c'est un concept connu, qui existe aussi dans SVN. Vous pouvez créer un tag nommé _1.0.0_ en exécutant la commande  
`git tag 1.0.0 1b2e1d63ff`  
le _1b2e1d63ff_ désigne les 10 premiers caractères de l'identifiant du changement que vous voulez référencer avec ce tag. Vous pouvez obtenir cet identifiant avec  
`git log`  
vous pouvez utiliser moins de caractères de cet identifiant, il doit juste rester unique.

## remplacer les changements locaux

Dans le cas où vous auriez fait quelque chose de travers (ce qui bien entendu n'arrive jamais ;) vous pouvez annuler les changements locaux en utilisant cette commande  
`git checkout -- <filename>`  
cela remplacera les changements dans votre arbre de travail avec le dernier contenu du HEAD. Les changements déjà ajoutés à l'index, aussi bien les nouveaux fichiers, seront gardés.

Si à la place vous voulez supprimer tous les changements et validations locaux, récupérez le dernier historique depuis le serveur et pointez la branche principale locale dessus comme ceci  
`git fetch origin`  
`git reset --hard origin/master`
