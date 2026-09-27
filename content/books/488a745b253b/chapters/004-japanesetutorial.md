このチュートリアルは Mercurial の使い方を紹介します。 SCM ソフトウェアを使うにあたっての特定の予備知識は必要ありません。

![{i}](https://wiki.mercurial-scm.org/moin-static/modernized/img/icon-info.png "{i}") あらかじめ [Mercurial を理解する](https://wiki.mercurial-scm.org/JapaneseUnderstandingMercurial) を見ておくとよいでしょう

Contents

1.  [Mercurial の使い方のチュートリアル](#Mercurial_.2BMG5PfzBEZbkwbjDBMOUw.2FDDIMOowojDr-)
2.  [はじめに](#A.2BMG8wWDCBMGs-)
3.  [このチュートリアルの読み方](#A.2BMFMwbjDBMOUw.2FDDIMOowojDrMG6KrTB.2FZbk-)
4.  [参考](#A.2BU8KAAw-)

## はじめに

このチュートリアルを読み終われば、次のことが分かるでしょう:

-   Mercurial を使うのに必要な基本的な考えとコマンド
-   ソフトウェアプロジェクトに貢献する際の Mercurial の簡単な使い方

Mercurial のマニュアルページ [hg(1)](http://mercurial-users.jp/manual/hg.1.html) と [hgrc(5)](http://mercurial-users.jp/manual/hgrc.5.html) に目を通すことを強くお勧めします。 マニュアルページは [リリース tarball](http://www.selenic.com/mercurial/release/?M=D) にも doc/hg.1.html と doc/hgrc.5.html として含まれています。 コマンドラインで hg help <command> とタイプしても良いでしょう。

チュートリアルは以下のページに分かれています:

1.  [JapaneseTutorialInstall](https://wiki.mercurial-scm.org/JapaneseTutorialInstall) - Mercurial をインストールする
    
2.  [TutorialInit](https://wiki.mercurial-scm.org/TutorialInit) - Initialize a [repository](https://wiki.mercurial-scm.org/Repository)
    
3.  [JapaneseTutorialClone](https://wiki.mercurial-scm.org/JapaneseTutorialClone) - 既存の [リポジトリ](https://wiki.mercurial-scm.org/Repository) のコピーを作成する
    
4.  [JapaneseTutorialHistory](https://wiki.mercurial-scm.org/JapaneseTutorialHistory) - [リポジトリ](https://wiki.mercurial-scm.org/Repository) の履歴を閲覧する
    
5.  [JapaneseTutorialFirstChange](https://wiki.mercurial-scm.org/JapaneseTutorialFirstChange) - 最初の変更を行う
    
6.  [JapaneseTutorialShareChange](https://wiki.mercurial-scm.org/JapaneseTutorialShareChange) - 他の [リポジトリ](https://wiki.mercurial-scm.org/Repository) と変更を共有する
    
7.  [JapaneseTutorialExport](https://wiki.mercurial-scm.org/JapaneseTutorialExport) - 他の人と変更を共有する
    
8.  [JapaneseTutorialMerge](https://wiki.mercurial-scm.org/JapaneseTutorialMerge) - 1つのファイルに対しての複数の独立した変更を扱う
    
9.  [JapaneseTutorialConflict](https://wiki.mercurial-scm.org/JapaneseTutorialConflict) - 手作業が必要な [マージ](https://wiki.mercurial-scm.org/Merge) を扱う
    
10.  [JapaneseTutorialConclusion](https://wiki.mercurial-scm.org/JapaneseTutorialConclusion) - 最後に
     

## このチュートリアルの読み方

書式の取り決めは簡単です。コマンド名と引数は 固定フォント で表示されます。

シェルやコマンドプロンプトに対して打つ必要がある入力行は固定幅フォントで表示され、 $ 文字で行が始まります。

Mercurial やシェルが表示する出力行も固定幅フォントで表示されますが、行頭の特別な文字はありません。

$ これはユーザが入力した行です
これはプログラムが出力した行です

全ての例で bash シェルを使っています。他の Unix シェルや Windows の cmd.exe でも考え方は同じですが、いくつかの操作の構文は変わるかもしれません。例えば、Unix シェルの ls は Windows の dir とだいたい同じで、 Unix の vi は Windows の edit と同じようなものです。

さぁ、 [JapaneseTutorialInstall](https://wiki.mercurial-scm.org/JapaneseTutorialInstall) から始めましょう。

## 参考

-   [Mercurial を理解する](https://wiki.mercurial-scm.org/JapaneseUnderstandingMercurial) - Mercurial の基本をさっとイラストで説明
    
-   [初心者向けガイド](https://wiki.mercurial-scm.org/JapaneseBeginnersGuides)
    
-   [http://mercurial.aragost.com/kick-start/](http://mercurial.aragost.com/kick-start/) - Mertin Geisler による Mercurial を始めるためのエクササイズ
    
-   [http://hginit.com/ の和訳](http://d.hatena.ne.jp/mmitou/20100501/1272680474) - Joel Spolsky によるチュートリアル
    

* * *

[CategoryJapanese](https://wiki.mercurial-scm.org/CategoryJapanese)

[Chinese](https://wiki.mercurial-scm.org/ChineseTutorial), [Czech](https://wiki.mercurial-scm.org/CzechTutorial), [English](https://wiki.mercurial-scm.org/Tutorial), [French](https://wiki.mercurial-scm.org/FrenchTutorial), [German](https://wiki.mercurial-scm.org/GermanTutorial), [Italian](https://wiki.mercurial-scm.org/ItalianTutorial), [Korean](https://wiki.mercurial-scm.org/KoreanTutorial), [Lithuanian](https://wiki.mercurial-scm.org/LithuanianTutorial), [Português do Brasil](https://wiki.mercurial-scm.org/BrazilianPortugueseTutorial), [Spanish](https://wiki.mercurial-scm.org/SpanishTutorial), [Russian](https://wiki.mercurial-scm.org/RussianTutorial), [Ukrainian](https://wiki.mercurial-scm.org/UkrainianTutorial), [Thai](https://wiki.mercurial-scm.org/ThaiTutorial)
