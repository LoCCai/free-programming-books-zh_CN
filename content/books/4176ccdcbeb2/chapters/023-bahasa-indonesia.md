## Tentang git-flow

git-flow adalah sebuah ekstensi git untuk menyediakan operasi repositori tingkat tinggi untuk model percabangan _(branching model)_ Vincent Driessen. [baca lebih lanjut](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Rujukan ini menunjukan dasar penggunaan dan efek dari operasi git-flow

★ ★ ★

## Tips dasar

-   Git flow menyediakan bantuan _command line_ yang sangat baik. Baca perlahan untuk melihat apa yang terjadi
-   [Sourcetree](http://www.sourcetreeapp.com/) adalah salah satu program yang sangat baik untuk program git berbasis tampilan yang menyediakan dukungan git flow untuk macOS/Windows
-   Git-flow adalah solusi berbasis _merge_. Ini tidak me-_rebase_ fitur branch.

★ ★ ★

## [Setup](#setup)

-   Sebagai prasyarat, anda diharuskan memasang/menginstal git
-   Git flow dapat bekerja pada macOS, Linux dan Windows

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

Anda membutuhakn wget dan util-linus untuk menginstal git-flow.

Untuk detil instruksi pemasangan git flow kunjungi [git flow wiki](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation).

![install git-flow](http://danielkummer.github.io/git-flow-cheatsheet/img/download.png)

## [Mulai](#getting_started)

Git flow membutuhkan inisialisasi untuk menyesuaikan dengan proyek anda.

★ ★ ★

### Inisialisasi

Mulai menggunakan git-flow dengan menginisialisasi dalam repositori git yang sudah ada:

> git flow init

Anda akan diharuskan untuk menjawab beberapa pertanyaan mengenai konvensi nama untuk branch anda.  
Sangat direkomendasikan untuk menggunakan nilai bawaan.

## [Fitur](#features)

-   Mengembangkan fitur baru untuk rilis selanjutnya
-   Khususnya hanya dalam repositori yang sudah ada sebelumnya

★ ★ ★

### Mulai sebuah fitur baru

Pengembangan fitur baru dimulai dari _branch_ 'develop'.

Mulai pengembangan sebuah fitur baru dengan

> git flow feature start FITURSAYA

Perintah ini membuat sebuah _branch_ fitur baru berdasarkan 'develop' dan beralih ke branch tersebut

### Menyelesaikan sebuah fitur

Menyelesaikan pengembangan sebuah fitur. Tindakan ini melakukan hal berikut

-   Merge FITURSAYA kedalam 'develop'
-   Menghapus _branch_ fitur
-   Beralih kembali ke _branch_ 'develop'

> git flow feature finish FITURSAYA

### Mempublikasi sebuah Fitur

Apakah anda mengembangkan sebuah fitur dalam kolaborasi?  
Mempublikasikan sebuah fitur ke dalam server remot agar bisa digunakan oleh pengguna yang lain.

> git flow feature publish FITURSAYA

### Mendapatkan sebuah fitur yang telah terpublikasi

Mendapatkan sebuah fitur yang telah terpublikasi oleh pengguna lain.

> git flow feature pull origin FITURSAYA

Anda dapat melacak sebuah fitur bedasarkan asalnya dengan menggunakan `git flow feature track FITURSAYA`

## [Membuat sebuah rilis](#release)

-   Mendukung preparasi dari sebuah rilis _produksi_ baru
-   Memperbolehkan untuk pembenaran bug minor dan mempersiapkan meta-data untuk sebuah rilis

★ ★ ★

### Mulai sebuah rilis

Untuk memulai sebuah rilis, gunakan perintah git flow _release_. Perintah ini akan membuat sebuah _branch_ rilis yang dibuat dari _branch_ 'develop

> git flow release start RELEASE \[BASE\]

Anda dapat menambahkan opsi sebuah `[BASE]` commit sha-1 hash untuk memulai rilis dari. _Commit_ harus berada dalam _branch_ 'develop'.

★ ★ ★

Akan lebih bijak untuk mempublikasi _branch_ rilis setelah membuatnya memperbolehkan merilis _commits_ oleh developer yang lain. Melakukan ini sama dengan mempublikasi fitur dengan perintah:

> git flow release publish RELEASE

(Anda dapat melacak sebuah rilis remot dengan perintah  
`git flow release track RELEASE`)

### Menyelesaikan sebuah rilis

Menyelesaikan sebuah rilis adalah sebuah langkah besar dalam git _branching_. Ini melakukan beberapa tindakan:

-   Merge _branch_ rilis kembali ke 'master'
-   Menandai (_tags_) rilis dengan namanya sendiri
-   Merge rilis kembali ke dalam 'develop'
-   Menghapus _branch_ rilis

> git flow release finish RELEASE

Jangan lupa untuk melakukan _push_ pada penanda (_tags_) anda dengan `git push --tags`

## [Hotfixes](#hotfixes)

-   Hotfixes muncul dari kebutuhan untuk melakukan tindakan sesegera mungkin atas keadaan yang tidak diinginan pada versi _production_
-   Mungkin percabangan dari penanda (tag) yang sesuai dalam _branch_ master yang ditandai sebagai versi _production_

★ ★ ★

### git flow hotfix start

Seperti perintah git flow yang lain, sebuah _hotfix_ dimulai dengan

> git flow hotfix start VERSION \[BASENAME\]

Argumen versi dengan ini menandai nama sebuah rilis hotfix baru. Dengan opsi anda dapat menspesifikasikan sebuah penamaan dasar untuk memulai.

### Menyelesaikan sebuah hotfix

Dengan menyelesaikan sebuah _hotfix_ ini berarti akan di-_merge_ kembali ke dalam develop dan master. Sebagai tambahan merge ke master ditandai dengan versi _hotfix_.

> git flow hotfix finish VERSION

## _Backlog_

★ ★ ★

-   Tidak semua perintah yang tersedia dapat mencakup semua, hanya yang paling penting saja
-   Anda masih dapat menggunakan git dan semua perintahnya secara normal seperti yang anda ketahui, git flow adalah hanya sebuah koleksi alat
-   Penyokong fitur masih dalam versi beta, menggunakan ini tidak disarankan
-   Jika anda dapat menyediakan translasi saya akan senang untuk mengintegrasikannya

★ ★ ★
