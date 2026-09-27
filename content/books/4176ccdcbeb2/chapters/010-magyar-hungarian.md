## Rólam

A git-flow egy git kiterjesztések gyűjteménye, amely magas fokú könyvtár műveleteket nyújt a Vincent Driessen-féle elágazási modellhez. [tovább](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Ez a puska a git-flow alap műveleteit és ezek következményeit mutatja be.

★ ★ ★

## Alap tippek

-   A git-flow tökéletes parancssori segítséget és kimenetet nyújt. Olvasd figyelmesen hogy lásd mit hogyan kell használni... [tovább](https://www.npmjs.com/package/gitflow)
-   A [Sourcetree](http://www.sourcetreeapp.com/), mint macOS/Windows Kliens, illetve a [GitHub Desktop for Linux](https://gist.github.com/berkorbay/6feda478a00b0432d13f1fc0a50467f1), mint Linux Kliens, mind kiváló git grafikus felület, amely git-flow segédletet biztosíŧ
-   A Git-flow egy merge-alapú megoldás. Viszont, nem képes rebase-elésre.

★ ★ ★

## [Telepítés](#setup)

-   Előfeltételként szükséges egy működő git telepítés.
-   A Git-flow macOS-on, Linux-on és Windows-on működik.

★ ★ ★

### macOS

Homebrew

> $ brew install git-flow

Macportolások

> $ port install git-flow

[tovább](https://github.com/nvie/gitflow/wiki/Mac-OS-X)

### Linux

> $ npm i -g gitflow

[tovább](https://github.com/nvie/gitflow/wiki/Linux)

### Windows (Cygwin)

> $ $ wget -q -O - --no-check-certificate https://github.com/nvie/gitflow/raw/develop/contrib/gitflow-installer.sh | bash

[tovább](https://github.com/nvie/gitflow/wiki/Windows)

Először telepítsd a wget-et, majd az util-linuxot a git-flow-hoz.

Részletes git-flow telepítési útmutatóért látogass el a [git flow wiki](https://github.com/nvie/gitflow/wiki)\-re.

![install git-flow](http://danielkummer.github.io/git-flow-cheatsheet/img/download.png)

## [Vágjunk bele](#getting_started)

A Git-flow-t először is inicializálni kell hogy személyre szabhasd a projektedet.

★ ★ ★

### Inicilizálás

Az inicializálást egy, már létező git könyvtárban(repo-ban) kell elkezdeni, az alábbi paranccsal:

> git flow init

Néhány kérdést fog feltenni a branch-eid elnevezési szabványaira való tekintettel.  
Ajánlott az alap értékekkel menni.

## [Feature-ök](#features)

-   Fejlessz új feature-őket a leendő kiadásokhoz
-   Ez jellemzően csak a fejlesztők repo-iban vannak

★ ★ ★

### Új feature elindítása

Új feature-ok fejlesztése a \`develop\` branchből indul.

A következő parancsot használd ehhez

> git flow feature start MYFEATURE

Ez a parancs új feature branch-et készít a \`develop\`-ba majd automatikusan átvált(checkout) arra a branch-re.

### Új feature befejezése

Új feature fejlesztésének befejezése. Ez a parancs a következőket csinálja

-   Merge-eli a MYFEATURE-t a 'develop' branchbe
-   Eltávolítja a feature branch-et
-   Visszalép a 'develop' branch-be

> git flow feature finish MYFEATURE

### Új feature kiadása

Csapatban fejlesztessz új feature-t?  
Publikáld az új feature-t a távoli szerverre, hogy más felhasználók is használni tudják.

> git flow feature publish MYFEATURE

### Kiadott feature beszerzése

Mások által publikált feature-okat így szerezhetsz be.

> git flow feature pull origin MYFEATURE

Követheted a feature-t az origin-ből a következőképpen

> git flow feature track MYFEATURE

## [Kiadás lérehozása](#release)

-   Támogatja új production release előkészítését
-   Megengedi új kiadásnak(release) bug-fixeit és metadata előkészítését.

★ ★ ★

### Kiadás elindítása

Új kiadás(release) létrehozásához, használd a \`git flow release\` parancsot. Ez készít egy release branch-et, amelyet a \`develop\` branch-ből ered.

> git flow release start RELEASE \[BASE\]

Tetszőlgesen csatolhatsz egy `[BASE]` commit sha-1 hash-t új kiadás elindításához. A megadott commit a \`develop\` branch-ből kell származnia.

★ ★ ★

Bölcs dolog kiadási branch publikálása létrehozás után, mivel más fejlesztők is adhatnak hozzá kiadási commitokat. Hasonlóképpen a feature publikáláshoz, használd az alábbi parancsot:

> git flow release publish RELEASE

(Követheted is a távoli kiadás-t ezzel a  
`git flow release track RELEASE` paranccsal)

### Kiadás lezárása

Egy kiadás lezárása a legnagyobb lépés a git elágazásban. A alábbi parancsok futnak le:

-   Egyesíti(Merge) a kiadási(release) branch-et a \`master\` branch-el
-   Hozzáadja a kiadás nevét Tag-ként a kiadáshoz
-   Visszafelé egyesíti a kiadási branch-et a \`develop\` branch-be
-   Eltávolítja a kiadási(release) branch-et

> git flow release finish RELEASE

Ne feledd a tag-eket is push-olni `git push origin --tags`

## [Hotfixek](#hotfixes)

-   Hotfixekre akkor van szükség, amikor egy nemkívánatos állapot áll fenn egy production verzióban.
-   Elágazhatnak a hozzátartózó tag-ből a master branch-en, amely a production verziót jelőli.

★ ★ ★

### git flow hotfix start

Hasonlóképpen más git-flow parancsokhoz, egy hotfix elindításához futtasd az alábbi parancsot.

> git flow hotfix start VERSION \[BASENAME\]

A verzió argumentum az új hotfix kiadási nevét jelenti. Tetszőlegesen megjelölhetsz egy kiindulási nevet is.

### Hotfix lezárása(finish)

Egy hotfix lezárása után, automatikusan egyesítve lesz mind a develop, mind a master banch-ekkel. Továbbá a master branch, egyesítés után, a hotfix verziójával lesz tag-elve.

> git flow hotfix finish VERSION

## Backlog

★ ★ ★

-   Nincs mindegyik parancs felsorolva itt, csupán a legfontosabbak
-   Továbbra is használhatod a git-et és az összes parancsait, ahogy eddig, a git-flow mindössze a eszköz kollekció.
-   A 'support'(támogatás) feature még beta verzióban van, használata nem ajánlott.
-   Ha a honosításban szeretnél segíteni, akkor forkold GitHubon

★ ★ ★
