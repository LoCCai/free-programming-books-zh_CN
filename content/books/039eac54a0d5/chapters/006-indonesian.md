sekedar panduan ringkas penggunaan git. gak pake ribet ;)

oleh [Roger Dudler](http://www.twitter.com/rogerdudler) (alih bahasa [Itang Sanjana](http://twitter.com/ItangSanjana))  
kredit [@tfnico](http://www.twitter.com/tfnico), [@fhd](http://www.twitter.com/fhd) dan [Namics](http://www.namics.com)  
juga dalam bahasa [english](http://rogerdudler.github.io/git-guide/index.html), [deutsch](http://rogerdudler.github.io/git-guide/index.de.html), [español](http://rogerdudler.github.io/git-guide/index.es.html), [français](http://rogerdudler.github.io/git-guide/index.fr.html), [italiano](http://rogerdudler.github.io/git-guide/index.it.html), [nederlands](http://rogerdudler.github.io/git-guide/index.nl.html), [português](http://rogerdudler.github.io/git-guide/index.pt_BR.html), [русский](http://rogerdudler.github.io/git-guide/index.ru.html), [türkçe](http://rogerdudler.github.io/git-guide/index.tr.html),  
[မြန်မာ](http://rogerdudler.github.io/git-guide/index.my.html), [日本語](http://rogerdudler.github.io/git-guide/index.ja.html), [中文](http://rogerdudler.github.io/git-guide/index.zh.html), [한국어](http://rogerdudler.github.io/git-guide/index.ko.html) [Vietnamese](http://rogerdudler.github.io/git-guide/index.vi.html)  
silahkan laporkan permasalan ke [github](https://github.com/rogerdudler/git-guide/issues)

![](http://rogerdudler.github.io/git-guide/img/arrow.png)

## periksa repositori

buat lah salinan kerja dari repositori lokal dengan menjalankan perintah  
`git clone /jalur/ke/repositori`  
saat menggunakan server jarak-jauh, perintahnya menjadi  
`git clone namapengguna@host:/jalur/ke/repositori`

## tambah & komit

kamu bisa melakukan perubahan (penambahan ke **Indeks**) menggunakan  
`git add <namaberkas>`  
`git add *`  
Ini merupakan langkah awal alur-kerja dasar git. Untuk komit sepenuhnya gunakan  
`git commit -m "Pesan komit"`  
Sekarang berkas telah berkomit di **HEAD**, tapi belum di repositori jarak-jauh.

## percabangan

percabangan atau _branching_ digunakan untuk mengembangkan fitur-fitur secara terisolasi. Cabang utama atau _master_ merupakan cabang bawaan ketika kamu membuat repositori. Gunakan cabang lain untuk pengembangan, setelah selesai, gabungkan kembali ke cabang utama.

![](http://rogerdudler.github.io/git-guide/img/branches.png)

buat cabang baru dengan nama "fitur\_x" dan beralih kedalamnya menggunakan  
`git checkout -b fitur_x`  
beralih kembali ke _master_  
`git checkout master`  
dan hapus cabang yang tadi dibuat  
`git branch -d fitur_x`  
suatu cabang _tidak terbuka untuk yang lainnya_ kecuali jika kamu mengirimkannya ke repositori jarak-jauh.  
`git push origin <cabang>`

## perbaru & gabung

untuk memperbarui repositori lokal ke komit terkini, lakukan  
`git pull`  
dari direktori kerja kamu untuk _mengambil_ dan _menggabungkan_ perubahan jarak-jauh.  
untuk menggabungkan cabang lain ke cabang aktif (misal _master_), gunakan  
`git merge <cabang>`  
pada kasus diatas, git mencoba menggabungkan perubahan secara otomatis. Sayangnya hal ini tak selalu berjalan mulus dan bisa menyebabkan _konflik_. Kamu lah yang bertanggung jawab menggabungkan _konflik_ tersebut secara manual dengan menyunting berkas yang ditunjukkan git. Setelah itu, kamu perlu memarkahinya dengan  
`git add <namaberkas>`  
sebelum penggabungan berlaku, kamu bisa melakukan pratinjau menggunakan  
`git diff <cabang_asal> <cabang_tujuan>`

## menandai

sangat dianjurkan membuat penanda atau _tags_ untuk perangkat lunak yang dirilis. Hal ini amat lah lazim, yang juga terjadi di SVN. Kamu bisa membuat penanda baru dengan nama _1.0.0_ dengan menjalankan  
`git tag 1.0.0 1b2e1d63ff`  
_1b2e1d63ff_ adalah 10 karakter pertama dari identitas komit yang ingin kamu referensikan ke penanda. Kamu bisa mendapatkan identitas komit dengan melihat...  

## log

dalam bentuknya yang paling sederhana, kamu bisa mempelajari riwayat repositori menggunakan.. `git log`  
kamu bisa menambahkan banyak parameter untuk menampilkan log sesuai keinginan. Untuk melihat komit penulis tertentu:  
`git log --author=bob`  
Untuk melihat log yang dimampatkan, satu baris per komit:  
`git log --pretty=oneline`  
Atau mungkin kamu ingin melihat pohon _ASCII art_ seluruh percabangan disertai nama dan penandanya:  
`git log --graph --oneline --decorate --all`  
Sekedar melihat berkas yang berubah:  
`git log --name-status`  
Ini baru sedikit saja dari sekian banyak parameter yang bisa kamu gunakan. Lebih jauh lagi, lihat `git log --help`  

## mengembalikan perubahan lokal

Seandainya kamu melakukan kesalahan (yang tentunya tak pernah terjadi ;) kamu bisa mengembalikannya menggunakan perintah  
`git checkout -- <namaberkas>`  
perintah di atas mengembalikan perubahan di dalam pokok kerja kamu dengan konten terakhir dari _HEAD_. Perubahan dan berkas baru yang telah ditambahkan ke indeks akan tetap tersimpan.

Jika kamu ingin menggugurkan perubahan dan komit lokal seutuhnya, ambil riwayat terakhir dari server dan arahkan ke cabang _master_ lokal seperti ini  
`git fetch origin`  
`git reset --hard origin/master`
