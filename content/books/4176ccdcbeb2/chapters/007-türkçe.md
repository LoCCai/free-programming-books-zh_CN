## Hakkında

git-flow, Vincent Driessen'in dallanma modeli için geliştirilmiş, git repoları için üst düzey işlemler yapabilmenizi sağlayan, sözkonusu dallanma modelini kullanmayı oldukça kolaylaştıran git eklentilerini içerir.[  
Vincent Driessen'in dallanma modeli hakkında](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Bu döküman git flow işlemleri hakkında temel kullanım şekillerini içermektedir.

★ ★ ★

## Temel Ipuçları

-   Git flow komut satırları ile kusursuz yardım (help) ve çıktı (output) sağlar.
-   macOS ve Windows kullanıcıları için [Sourcetree](http://www.sourcetreeapp.com/) , git flowa destek veren mükemmel bir git gui aracıdır.
-   Git flow birleşme-kaynaşma (merge) tabanlı bir çözümdür. Rebase tabanlı çözümlemelerle karıştırılmamalıdır. Merge tabanlı çözümlerde merge işlemi sonucunda bütün değişiklikler kendi dallanmalarındaki commit ile tek bir dala (branch) bağlanır, başlangıç noktası sabittir. Rebase tabanlı çözümlerde ise kendi dalınız (branch) üzerinde yaptığınız değişiklikler, son yapılan commitler başlangıç noktası alınarak ana dal üzerine eklenir.

★ ★ ★

## [Ayarlar](#setup)

-   Git flow'u kullanabilmek için öncelikli olarak git kurulumunun yapılması gerekmektedir.
-   Git flow macOS, Linux ve Windows üzerinde çalıştırılabilir.

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

Git flow kurulumu için wget ve util-linux gerekmektedir.

Git-flow kurulumu hakkında detaylı bilgi için git flow wiki'yi ziyaret edebilirsiniz.[git flow wiki](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation).

![install git-flow](http://danielkummer.github.io/git-flow-cheatsheet/img/download.png)

## [Baslarken](#getting_started)

Git flow, kullanmak istediğiniz projede ayarlarınızı özelleştirmek amacıyla başlatılır (initialize).

★ ★ ★

### Başlangıç (Initialize)

git flow'u kullanmak istediğiniz reponuzdayken;

> git flow init

komutuyla başlatabilirsiniz.

Bu noktada kafanızda dallarınızı (branches) isimlendirme konusuna ilişkin birçok soru işareti oluşacaktır. Bu bağlamda varsayılan (default) değerleri kullanmanız önerilir.

## [Özellikler (Features)](#features)

-   Git flow ile yayınlamak üzere olduğunuz projenize ekleyeceğiniz özellikler için yeni dallarda (feature) kodlama yaparsınız.
-   Genel olarak sadece geliştirici repolarında bulunurlar.

★ ★ ★

### Yeni bir özellik eklemesi başlatmak

### (feature start)

Yeni özelliklerin eklenmesi öncelikle develop dalından (branch) başlar.

Yeni bir özelliği kodlamaya

> git flow feature start MYFEATURE

ile başlarız. Bu komut bize develop dalını (branch) temel alan bir özellik dalı (feature) oluşturur. Ve bulunduğumuz dalı feature/MYFEATURE olarak değiştirir.

### Bir özellik eklemesi bitirilirken (feature finish)

Bir özelliğin eklenme işlemi bitirilirken şunları yapılır:

-   Kendi çalıştığımız özellik dalı (burada MYFEATURE) develop ana dalı ile birleştirilir.
-   Bu birleşmeden sonra kendi özellik dalımız (MYFEATURE) silinir.
-   Bulunduğumuz dal tekrar develop olarak değiştirilir.

> git flow feature finish MYFEATURE

bu işlemleri bizler için yapar.

### Bir özelliği yayınlamak

### (Publish a feature)

Bir ekip içerisinde geliştirme mi yapıyorsunuz ?  
O zaman geliştirdiğiniz özelliği bir uzak sunucuya gönderin, böylelikle geliştirdiğiniz özellik diğer kullanıcılar tarafından kullanılabilir.Öyleyse ;

> git flow feature publish MYFEATURE

sizin için bu işi halledebilir.

### Yayınlanmış bir özelliği almak (Getting a published feature)

Uzak sunucu üzerinde yayınlanmış bir özelliği kendi yerel (local) çalışma ortamınıza aktarırken:

> git flow feature pull MYFEATURE

size yardımcı olacaktır.

## [Bir yayın çıkarırken (release)](#release)

-   Yeni bir ürünün yayınlanmasına yardımcı olur.
-   Küçük hata giderimleri ve meta-data hazırlığı için kullanılabilir.

★ ★ ★

### Bir sürüm yayınlamak

### (Start a release)

Yayınlamaya başlamak için,

> git flow release start RELEASE \[BASE\]

komutu kullanılır.Bu komut ile develop dalını temel kabul eden bir release dalı (branch) yaratılır.

Opsiyonel olarak yayınınızın `[BASE]` noktasından başlamasını sağlayabilirsiniz. Bu commit develop dalında (branch) iken yapılmalıdır.

★ ★ ★

Yayınlama dalınız (release branch) oluştuktan sonra bu yöntem ile diğer yazılımcılar tarafından yapılan release commitlerinin de kabul edilmesini sağlayabilirsiniz. Bunu özellik yayınlama (feature publishing) ile kolaylıkla yapabilirsiniz.

> git flow release publish RELEASE

(Uzak sunucu üzerindeki yayınları  
`git flow release track RELEASE`  
ile izleyebilirsiniz. )

### Bir sürüm yayınını tamamlamak

### (Finish up a release)

Bir sürüm yayınını tamamlarken git dallanmasının (branching) en büyük adımını atarız. Yayınlanma tamamlanırken:

-   Yayınlama yaptığımız dal olan release dalı (branch) master ana dalı ile birleştirilir.
-   Etiketler (tags) isimleri ile birlikte yayınlanır.
-   Arkaplandaki birleştirmeler (back-merges) develop dalında yayınlanır.
-   Yayınlama için açmış olduğumuz dal (branch) silinir.

> git flow release finish RELEASE

sizler için bu işlemleri halledecektir. Ancak etiketlerinizi de eklemeyi unutmayın! `git push --tags` bu sorununuzu da halledecektir.

## [Hata giderimleri (Hotfixes)](#hotfixes)

-   Yayına çıkarılmış bir versiyonda istenmeyen durumlar ortaya çıktığında ani hata giderimi için kullanılır.
-   Hotfixler, master ana dalı (branch)ındaki versiyon numarasını belirten etiketten dallanır (branching).

★ ★ ★

### Bir hata giderimini başlatmak

### (git flow hotfix start)

Diğer git flow komutlarında olduğu gibi bir hotfix başlatılırken :

> git flow hotfix start VERSION \[BASENAME\]

komutu kullanılır. Versiyon argümanları yeni hotfix yayınının adını alır. Opsiyonel olarak başlangıç noktası için bir isim özelleştirmesi yapabilirsiniz (basename).

### Hata giderimi bitirme

### (Finish a hotfix)

Bir hata giderimi tamamlanırken, develop ve master dalları ile birleştirilir. Ayrıca master dalına (branch) hotfix versiyonunun etiketi eklenir.

> git flow hotfix finish VERSION

## Içerik bilgisi (Backlog)

★ ★ ★

-   Bu dökümanda Git flow için en önemli komutlar ve kullanımları ile ilgili bilgiler verilmektedir. Ancak tüm Git flow komutları burda bahsedilenlerle sınırlı değildir.
-   Git flow kullanırken git ve gite ait diğer alt komutları gönlünüzce kullanabilirsiniz. Git flow sadece bir repo derleme-toplama aracıdır.
-   Support branch hala beta sürümündedir.Kullanımı tavsiye edilmemektedir.
-   Çevirilerinizle bize destek olabilirsiniz.Bunları projemize eklemekten mutluluk duyarız.

★ ★ ★
