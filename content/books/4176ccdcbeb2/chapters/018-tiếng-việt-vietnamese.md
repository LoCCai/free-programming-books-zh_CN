## git-flow là gì?

git-flow là một tiện ích mở rộng của git, giúp các thao tác trên repository (kho mã nguồn) trở nên dễ dàng và hiệu quả hơn dựa trên mô hình phân nhánh của Vincent Driessen. [xem chi tết ở đây](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Bài tóm tắt nãy sẽ cho bạn biết các thao tác sử dụng cơ bản và sự hiệu quả của git-flow.

★ ★ ★

## Một vài lời khuyên

-   Git-flow sẽ hỗ trợ thao tác và cho ra kết quả rất tuyệt vời. Hãy đọc bài viết này cẩn thận để xem điều kì diệu gì sẽ xảy ra ;)
-   Git-client - [Sourcetree](http://www.sourcetreeapp.com/) là một git-client có giao diện GUI rất tiện lợi và cũng hỗ trợ git-flow trên giao diện.
-   Git-flow hoạt động dựa trên các thao tác gộp nhánh (merge). Nó không thực hiện các thao tác sắp xếp commits (rebase) trên các nhánh tính năng.

★ ★ ★

## [Cài đặt](#setup)

-   Bạn cần cài đặt git trước khi có thể cài git-flow.
-   Git-flow có thể hoạt động trên macOS, Linux và Windows.

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

Bạn cần wget và util-linux để cài đặt git-flow.

Xem chi tiết về cách cài đặt git-flow ở trang sau: [git-flow wiki](https://github.com/petervanderdoes/gitflow-avh/wiki/Installation).

![install git-flow](http://danielkummer.github.io/git-flow-cheatsheet/img/download.png)

## [Bắt đầu nào](#getting_started)

Git flow cần phải được khởi tạo để có thể tùy chỉnh các cài đặt của dự án của bạn.

★ ★ ★

### Khởi tạo

Sau khi di chuyển tới thư mục dự án, chạy lệnh sau để khởi tạo git-flow.

> git flow init

Bạn sẽ cần trả lời một số câu hỏi cho việc thiết lập git-flow sau câu lệnh khởi tạo. Chúng tôi khuyên bạn nên sử dụng các giá trị \[mặc định\].

## [Làm việc với các chức năng](#features)

-   Phát triển các chức năng mới cho lần phát hành kế tiếp.
-   Về cơ bản việc này thường chỉ xảy ra ở kho mã nguồn (respository) của các lập trình viên.

★ ★ ★

### Bắt đầu quá trình phát triển một chức năng mới

Để phát triển chức năng mới bạn nên bắt đầu từ nhánh phát triển 'develop'. Ví dụ với chức năng MYFEATURE:

> git flow feature start MYFEATURE

Lệnh này sẽ tạo ra một nhánh mới từ nhánh 'develop' và tự động chuyển sang nhánh mới này.

### Kết thúc quá trình phát triển một chức năng

Điều này xảy ra sau khi bạn đã phát triển xong một chức năng (ví dụ phía trên là MYFEATURE), lệnh kết thúc quá trình phát triển chức năng sẽ tự động thực hiện các thao tác:

-   Gộp nhánh (merge branch) chức năng (MYFEATURE) vào nhánh 'develop'
-   Xoá nhánh chức năng (MYFEATURE)
-   Chuyển sang (checkout) nhánh 'develop'

> git flow feature finish MYFEATURE

### Đẩy mã nguồn của chức năng lên máy chủ

Khi bạn làm việc với những người khác trên cùng một chức năng, bạn sẽ cần đẩy (push) phần mã nguồn của bạn cho chức năng đó lên máy chủ (remote) để những người khác có thể kéo về (pull) được.

> git flow feature publish MYFEATURE

### Kéo mã nguồn của chức năng xuống máy bạn

Khi bạn cần kéo (pull) mã nguồn của chức năng về để phát triển tiếp sau khi nó đã được cập nhập bởi những thành viên khác (và họ đã đẩy nó lên máy chủ).

> git flow feature pull REMOTE\_NAME MYFEATURE

## [Tạo một bản phát hành](#release)

-   Hỗ trợ bạn chuẩn bị cho bản phát hành mới.
-   Cho phép sửa các lỗi nhỏ và chuẩn bị các tài liệu cần thiết cho bản phát hành.

★ ★ ★

### Bắt đầu một phát hành mới

Để bắt đầu một phát hành mới, sử dụng lệnh release của git flow.

Lệnh này sẽ tạo ra nhánh 'release' từ nhánh 'develop'.

> git flow release start RELEASE \[BASE\]

Tùy chọn `[BASE]` cho phép commit được một giá trị hash sha-1. Trường hợp không chỉ định tùy chọn này thì HEAD sẽ được sử dụng.

★ ★ ★

Để công bố phần code 'release' của mình cho các thành viên khác, ta có thể làm tương tự như với công bố tính năng bằng lệnh sau:

> git flow release publish RELEASE

(Bạn có thể theo dấu remote 'release' bằng lệnh  
`git flow release track RELEASE` )

### Kết thúc release

Kết thúc release là một bước lớn trong chiến lược phân nhánh git. Nó thực hiện các việc sau:

-   Merge nhánh 'release' vào nhánh 'master'
-   Gắn tag ở nhánh 'master' dành cho bản release
-   Merge lại nhánh 'release' vào nhánh 'develop'
-   Xóa bỏ nhánh 'release'

> git flow release finish RELEASE

## [Sửa đổi nóng - hotfix](#hotfixes)

-   Sử dụng cho các trường hợp khẩn cấp cần phải sửa đổi ngay trên bản sản phẩm (nhánh master).
-   Có thể tạo nhánh giải quyết khẩn cấp từ tag của nhánh 'master'.

★ ★ ★

### Bắt đầu hotfix

Giống như các lệnh khác của git flow, hotfix bắt đầu với:

> git flow hotfix start VERSION \[BASENAME\]

Tham số VERSION ở đây chỉ định tên của phiên bản release hotfix này. Còn tham số tùy chọn basename sẽ chỉ định tên nhánh cơ bản thay cho hotfix thay vì nhánh 'master'

### Kết thúc hotfix

Kết thúc hotfix sẽ merge lại nội dung thay đổi vào nhánh 'develop' và 'master'. Ở nhánh 'master' sẽ được gắn tag là phiên bản của hotfix.

> git flow hotfix finish VERSION

## Lưu ý

★ ★ ★

-   Ở đây không giới thiệu được tất cả các lệnh mà chỉ đưa ra một số lệnh quan trọng nhất của git-flow.
-   Tất nhiên là bạn vẫn có thể sử dụng toàn bộ các lệnh thông thường của git. Git-flow chỉ đơn giản là một tập hợp các lệnh mở rộng cho git.
-   Chức năng nhánh 'support' vẫn đang là bản beta nên không được đề cập ở đây.
-   Tôi rất sẵn sàng tích hợp bất kì bản dịch nào nếu bạn sẵn lòng :)

★ ★ ★
