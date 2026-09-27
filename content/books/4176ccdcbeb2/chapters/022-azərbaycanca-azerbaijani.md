## Haqqında

Git-flow depo üzərində Vincent Driessen'in budaqlanma modeli üzrə yüksək səviyyəli əməliyyatlar aparmaq üçün git əlavələrinin yığınıdır. [ətraflı](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Bu soraqça git-flow əməliyyatlarının istifadəsinin əsaslarını və effektini göstərir

★ ★ ★

## Əsas ipucuları

-   Git-flow möhtəşəm kömək və çıxış imkanı verir. Nə baş verdiyini görmək üçün onu diqqətlə oxuyun ...
-   macOS/Windows kliyenti [Sourcetree](http://www.sourcetreeapp.com/) git üçün mükəmməl qrafik istifadəçi interfeysidir, həmçinin git-flow dəstəyi təqdim edir.
-   Git-flow birləşmə əsaslı həlldir. O xüsusiyyət budaqlarını birləşdirmək üçün rebase istifadə etmir.

★ ★ ★

## [Quraşdırılması](#setup)

-   Öncədən git'in quraşdırılması, işlək olması şərtdir.
-   Git flow macOS, Linux və Windows-da çalışır

★ ★ ★

### macOS

Homebrew

> $ brew install git-flow-avh

Macports

> $ port install git-flow-avh

### Linux

Debian əsaslı distributivlər

> $ apt-get install git-flow

Red Hat əsaslı distributivlər

> $ yum install gitflow

### Windows (Cygwin)

> $ wget -q -O - --no-check-certificate https://raw.github.com/petervanderdoes/gitflow-avh/develop/contrib/gitflow-installer.sh install stable | bash

Git-flow quraşdırmaq üçün wget və util-linux alətləri lazımdır.

Git-flow'nun detallı quraşdırılma addımları üçün zəhmət olmasa [git flow wiki](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation) səhifəsinə daxil olun.

![install git-flow](http://danielkummer.github.io/git-flow-cheatsheet/img/download.png)

## [Başlayarkən](#getting_started)

Layihənizin ilkin tənzimlənməsi üçün git-flow'nun başladılması lazımdır.

★ ★ ★

### Başladılma

Git-flow'nu mövcud git deponun daxilində başlatmaqla istifadə edin:

> git flow init

Budaqlarınızın adlandırma konvensiyasıyla bağlı bir neçə suala cavab verməli olacaqsınız.  
Öncədən təyin edilmiş qiymətlər istifadə etmək tövsiyyə olunur.

## [Xüsusiyyətlər](#features)

-   Gələcək buraxılışlar üçün yeni xüsusiyyətlər tərtib edin.
-   Adətən yalnız tərtibatçıların deposunda olur.

★ ★ ★

### Yeni xüsusiyyət başladın

Yeni xüsusiyyətlərin tərtibatı 'develop' budağından başlayır.

Yeni xüsusiyyətin tərtibatına

> git flow feature start MYFEATURE

ilə başlayın

Bu əmr 'develop' əsasında yeni xüsusiyyət budağı yaradır və ona qoşulur

### Xüsusiyyəti tamamlayın

Xüsusiyyətin tərtibatını tamamlayın. Bu əmr aşağıdakılarını yerinə yetirir:

-   MYFEATURE budağını 'develop' budağına birləşdirir
-   Xüsusiyyət budağını silir
-   'develop' budağına qoşulur

> git flow feature finish MYFEATURE

### Xüsusiyyəti yayımlayın

Xüsusiyyəti birlikdə tərtib edirsiniz?  
Tərtib etdiyiniz xüsusiyyəti kənar serverə yayımlayın ki, digər istifadəçilər ondan yararlana bilsinlər.

> git flow feature publish MYFEATURE

### Yayımlanmış xüsusiyyətin əldə olunması

Digər istifadəçinin yayımladığı xüsusiyyəti əldə edin.

> git flow feature pull origin MYFEATURE

Xüsusiyyəti origin deposunda aşağıdakı əmrlə izləyə bilərsiniz `git flow feature track MYFEATURE`

## [Buraxılış yaradın](#release)

-   Yeni buraxılışa hazırlıqda kömək edir.
-   Kiçik xətaların düzəldilməsinə və buraxılış üçün meta-məlumatların hazırlanmasına imkan verir

★ ★ ★

### Buraxılışa başlayın

Buraxılışa başlamaq üçün git flow release əmrindən istifadə edin. O 'develop' budağı əsasında buraxılış budağını yaradır.

> git flow release start RELEASE \[BASE\]

İstədiyiniz halda `[BASE]` - kommitin sha-1 heşini verməklə buraxılışa burdan başlaya bilərsiniz. Bu kommit 'develop' budağında olmalıdır.

★ ★ ★

Digər tərtibatçıların da buraxılış kommitlərinə imkan yaratmaq üçün, buraxılış budağı yaradıldıqdan dərhal sonra yayımlanması yaxşı olardı. Bunu aşağıdakı əmrlə, xüsusiyyət yayımlanmasına bənzər şəkildə edin:

> git flow release publish RELEASE

(Kənar buraxılışları izləmək üçün  
`git flow release track RELEASE` əmrindən istifadə edə bilərsiniz)

### Buraxılışı tamamlayın

Buraxılışın tamamlanması git budaqlanmsında böyük addımlardan biridir. O aşağıdakıları yerinə yetirir:

-   Buraxılış budağını 'master' budağına birləşdirir
-   Buraxılışı adına uyğun teqləyir
-   Buraxılış budağı geriyə, 'develop' budağına birləşir
-   Buraxılış budağı silinir

> git flow release finish RELEASE

`git push --tags` əmri ilə teqlərinizi göndərməyi unutmayın

## [Düzəlişlər](#hotfixes)

-   Düzəliş ehtiyacı məhsulun işlək, hazır versiyasındakı arzuolunmaz halı dərhal aradan qaldırmaq üçün yaranır.
-   Hazır versiyaya uyğun master budağındakı teqdən budaqlana bilər.

★ ★ ★

### git flow hotfix start

Digət git flow əmrləri kimi düzəliş

> git flow hotfix start VERSION \[BASENAME\]

ilə başlayır

Versiya arqumenti yeni düzəliş edilmiş buraxılış adını təyin edir. İstədiyiniz halda düzəlişə başlayacağınız BASENAME-kommiti göstərə bilərsiniz.

### Düzəlişi tamamlayın

Düzəliş tamamlandığı halda o 'develop' və 'master' budaqlarına birləşir. Əlavə olaraq 'master' budağına birləşmə düzəlişin versiyası ilə teqlənir.

> git flow hotfix finish VERSION

## Qeyd və qalıqlar

★ ★ ★

-   Bura bütün mövcud əmrlər deyil, ən vacibləri qeyd edilmişdir
-   Siz hələ də git və onun əmrlərini bildiyniz, normal qaydada istifadə edə bilərsiniz, git flow sadəcə alətlər toplusudur
-   'support' imkanı hələ beta versiyasındadır, istifadəsi tövsiyə olunmur
-   Əgər siz tərcümələr təqdim etmək istəsəniz, onları qoşmaqda məmnun olaram

★ ★ ★
