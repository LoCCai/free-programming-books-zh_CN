git'e başlamak için basit bir rehber. atla deve değil ;)

by [Roger Dudler](http://www.twitter.com/rogerdudler)  
credits to [@tfnico](http://www.twitter.com/tfnico), [@fhd](http://www.twitter.com/fhd) and [Namics](http://www.namics.com)  
this guide in [english](http://rogerdudler.github.io/git-guide/index.html), [deutsch](http://rogerdudler.github.io/git-guide/index.de.html), [español](http://rogerdudler.github.io/git-guide/index.es.html), [français](http://rogerdudler.github.io/git-guide/index.fr.html), [indonesian](http://rogerdudler.github.io/git-guide/index.id.html), [italiano](http://rogerdudler.github.io/git-guide/index.it.html), [nederlands](http://rogerdudler.github.io/git-guide/index.nl.html), [polski](http://rogerdudler.github.io/git-guide/index.pl.html), [português](http://rogerdudler.github.io/git-guide/index.pt_BR.html), [русский](http://rogerdudler.github.io/git-guide/index.ru.html),  
[မြန်မာ](http://rogerdudler.github.io/git-guide/index.my.html), [日本語](http://rogerdudler.github.io/git-guide/index.ja.html), [中文](http://rogerdudler.github.io/git-guide/index.zh.html), [한국어](http://rogerdudler.github.io/git-guide/index.ko.html)  
please report issues on [github](https://github.com/rogerdudler/git-guide/issues)

![](http://rogerdudler.github.io/git-guide/img/arrow.png)

## ekleme & teslim

Değişiklikleri belirtmek (**Index**'e eklemek) için  
`git add <dosyaadı>`  
`git add *`  
Temel git iş akışında bu ilk adımdır. Değişiklikleri depoya eklemek için  
`git commit -m "Teslim mesajı"`  
Şimdi dosyalar **HEAD**'e eklendi, fakat henüz uzak deponuza değil.

## dallar ile çalışmak

Dallar farklı özellikleri ayrı ayrı geliştirmek için kullanılır. Yeni bir depo oluşturduğunuzda _master_ "varsayılan" daldır. Diğer dallar geliştirildikten sonra _master_'a birleştirilir.

![](http://rogerdudler.github.io/git-guide/img/branches.png)

"feature\_x" adıyla yeni bir dal oluşturup o dala geçmek için  
`git checkout -b feature_x`  
master'a geri geçmek için  
`git checkout master`  
ve oluşturduğumuz dalı silmek için  
`git branch -d feature_x`  
bir dalı uzak deponuza göndermedikçe  
_başkaları tarafından kullanılabilir olmaz_  
`git push origin <dal>`

## güncelleme & birleştirme

en son değişiklikleri (commit) yerel deponuza almak için  
`git pull`  
komutunu çalıştırın. Bu değişiklikleri al _(fetch)_ ve birleştir _(merge)_ yapacaktır. Aktif dala (örn. master) başka bir dalı birleştirmek için  
`git merge <dal>`  
her iki durumda da git değişiklikleri otomatik birleştirmeyi (auto-merge) dener. Maalesef, bu her zaman mümkün olmaz ve _çakışmalarla (conflict)_ sonuçlanır. Git tarafından gösterilen dosyaları elle düzenleyerek bu _çakışmaları_ birleştirmek size düşer. Değişikliklerden sonra, dosyaları eklemek için  
`git add <dosyaadı>`  
değişiklikleri birleştirmeden önce, önizleme yapmak için  
`git diff <kaynak_dal> <hedef_dal>`

## sürümlemek

yazılım sürümleriniz için sürüm adı (tag) oluşturmanız tavsiye edilir. bu SVN'de de mevcut olan bilindik bir kavramdır. _1.0.0_ adıyla bir sürüm numarası (tag) oluşturmak için  
`git tag 1.0.0 1b2e1d63ff`  
buradaki _1b2e1d63ff_ yayımlanacak yazılım sürümünüzün işlem numarasının ilk 10 karakteridir. İşlem kimlik numaralarını görmek için  
`git log`  
tekil olduğu sürece daha az işlem numarası da kullanabilirsiniz.

## yerel değişiklikleri geri almak

Yanlış birşey yapmanız durumunda (tabi ki böyle şeyler hiç olmaz ;)) yerel değişiklikleri geri almak için  
`git checkout -- <dosyaadı>`  
bu değişikliklerinizi HEAD içerisindeki son içerik ile değiştirir. Index'e önceden eklenmiş değişiklikler ve yeni dosyalar korunacaktır.

Eğer tüm yerel değişiklik ve teslimlerinizi iptal etmek istiyorsanız, sunucudan en son kayıtları getirin ve yerel master dalınıza gösterin  
`git fetch origin`  
`git reset --hard origin/master`
