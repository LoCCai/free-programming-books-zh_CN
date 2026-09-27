## 什麼是 git-flow ?

git-flow 是一個 git 擴充功能，依照 Vincent Driessen 的分支模型提供高層次的倉庫控制方式。 [查看更多](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

這個備忘清單將會為您展示 git-flow 的基本操作方式與結果。

★ ★ ★

## 基礎提示

-   git-flow 提供了極為出色的指令與輸出提示。請仔細閱讀並觀察發生了什麼事情...
-   [SourceTree](http://www.sourcetreeapp.com/) 是一個極為出色的 git 圖形介面應用程式，以內建了 git-flow 的功能。(支援 Mac OS X 與 Windows)
-   git-flow 是一個以合並(Merge)概念為基底的解決方案，它並無提供重置(rebase)特性分支的功能。

★ ★ ★

## [安裝](#setup)

-   你需要有一個已經初始化的 git 倉庫。
-   git-flow 可以在 macOS、Linux 和 Windows 之下使用。

★ ★ ★

### Mac OS X

透過 Homebrew 安裝

> $ brew install git-flow-avh

透過 Macports 安裝

> $ port install git-flow-avh

### Linux

> $ apt-get install git-flow

### Windows (Cygwin)

> $ wget -q -O - --no-check-certificate https://raw.github.com/petervanderdoes/gitflow-avh/develop/contrib/gitflow-installer.sh install stable | bash

在 Windows 下安装 git-flow, 你會需要 wget 和 util-linux。

## [開始 git-flow](#getting_started)

在開始使用 git-flow 之前，你必須完成一些簡單的設定。

★ ★ ★

### 初始化

開始使用 git-flow 前，你必須切換目錄至你的 git 專案中，並且以下列指令進行初始化:

> git flow init

接著您必須回答幾個問題，是關於分支名稱的定義。  
這裡建議使用預設值。

## [新功能分支(Feature)](#features)

-   為接下即將發佈的版本開發新功能時使用。
-   通常新功能分支只會存於開發者機器上。

★ ★ ★

### 開始新功能設計

新功能的開發是由 'develop' 分支的最後一個版本發展出來的。

使用下列的命令可以開始一個新功能的分支：

> git flow feature start MYFEATURE

這個命令將會於 'develop' 的最後一個版本建立出另一個 'feature/MYFEATURE' 分支，並自動切換至這個分支底下。現在你可以開始製作新功能。

### 完成新功能

當你在新功能分支完成新功能後，使用下列指令來結束新功能開發:

> git flow feature finish MYFEATURE

這個指令會替你完成下列動作:

-   合並(Merge) MYFEATURE 分支回到 'develop'
-   刪除這個新功能分支
-   切換回 'develop' 分支

### 發佈新功能分支

你是否需多人合作開發新功能？  
透過下列命令來發佈新功能分支到遠端 git 伺服器，讓其他使用者也能共用這個新功能分支。

> git flow feature publish MYFEATURE

### 取得新功能分支

當你需接手完成新功能時，透過下列命令取得遠端伺服器上的新功能分支，並得到所有保存在遠端伺服器上的變更紀錄：

> git flow feature pull MYFEATURE

你也可以透過下列指令進而追蹤一個功能:

> git flow feature track MYFEATURE

## [製作發佈版本(release)](#release)

-   用於支援準備發佈正式產品前的預備分支。
-   允許修正小問題，並為發布版本準備或修改中介資料。

★ ★ ★

### 開始推出新版本

使用下列指令準備推出(release)新版本分支:

> git flow release start RELEASE \[BASE\]

它會從 'develop' 分支的最後一個版本創建出 release 分支。

你也可以選擇性的加入一個 sha-1 hash 於`[BASE]`參數，這會讓 release 分支於您指定的 develop 提交紀錄點產生分支。有一點需要注意的是，sha-1 hash 只能是於'develop' 分支下。

★ ★ ★

最佳的狀況下，在創建出新的 release 分支後，應要立即的發布至遠端伺服器上，讓其他團隊中的開發者也能存取這個 release 分支。而這個發布指令很類似於發布新功能:

> git flow release publish RELEASE

(您也可以透過  
`git flow release track RELEASE` 指令來取得 release 版本的遠端更改)

### 完成推出新版本

完成 release 版本是一個很大的 git 分支操作。但你只許要執行下列指令:

> git flow release finish RELEASE

git flow 會幫你執行下面幾個步驟:

-   合並 release 分支到 'master'
-   在 master 加上版本號標籤(Tag)
-   合並 release 分支到 'develop'
-   移除 release 分支

## [快速修復(hotfix)](#hotfixes)

-   當你的產品發佈環境處於不可預期的狀況，且發生了一些需要立即修正的問題，您可以使用 hotfix 來幫助您。
-   hotfix 是從 master 中加入的版本標籤開始。

★ ★ ★

### 開始快速修復

快速修復(hotfix)就像其他的 git flow 指令一樣，您可以透過下列指令開始：

> git flow hotfix start VERSION \[BASENAME\]

你必須填寫一個 VERSION 參數，這代表當你完成 hotfix 時發佈的版本號碼。

此外你可以自由挑選修復開始的分支名稱`[BASENAME]`，分支名稱如果不填寫的狀況下，預設是 'master'。

### 完成快速修復

當你在快速修復分支完成修復後，透過下列的指令讓修復分支合並回 develop 和 master 分支。並且在 master 分支加上修訂版本號的標籤(tag):

> git flow hotfix finish VERSION

## 備註

★ ★ ★

-   這裡我們只介紹了重要且常用的功能，並非包含所有的指令。
-   git-flow 只是一個額外的擴充功能，即使安裝了 git-flow 後你依然可以使用你所知道的原生 git 指令。
-   'support' 分支目前為測試版本不建議使用。
-   如果你很樂意提供翻譯，我很樂意整合。

★ ★ ★
