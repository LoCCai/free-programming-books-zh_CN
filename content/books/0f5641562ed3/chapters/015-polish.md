## System

[Sprzęt](#hardwareinfo) | [Statystyki](#loadstats) | [Użytkownicy](#users) | [Limity](#limits) | [Poziomy pracy](#runlevels) | [hasło roota](#resetpasswd) | [Kompilacja jądra](#compilekernel)

Działające jądro oraz informacje o systemie

\# uname -a                           \# Zwraca wersje jądra (oraz wersję BSD)
# lsb\_release -a                     \# Pełna informacja o dowolnej dystrybucji LSB
# cat /etc/SuSE-release              \# Wersja SuSE
# cat /etc/debian\_version            \# Wersja Debian

Użyj /etc/`DISTR`\-release z `DISTR=` lsb (Ubuntu), redhat, gentoo, mandrake, sun (Solaris), i tak dalej. Zobacz także `/etc/issue`.

\# uptime                             \# Pokazuje jak długo pracuje system + obciążenie
# hostname                           \# Systemowa nazwa hosta
# hostname -i                        \# Wyświetla adres IP hosta (tylko Linux)
# man hier                           \# Opis hierarchii katalogów systemu plików
# last reboot                        \# Pokazuje historię restartów systemu

## Informacje o sprzęcie

Sprzęt wykryty przez jądro

\# dmesg                              \# Wykryty sprzęt oraz wiadomości ze startu systemu
# lsdev                              \# Informacje o zainstalowanym sprzęcie
# dd if=/dev/mem bs=1k skip=768 count=256 2>/dev/null | strings -n 8 \# Czyta BIOS

### Linux

\# cat /proc/cpuinfo                  \# Model procesora (CPU)
# cat /proc/meminfo                  \# Informacje o kościach pamięci
# grep MemTotal /proc/meminfo        \# Wyświetla ilość pamięci fizycznej
# watch -n1 'cat /proc/interrupts'   \# Śledzi zmiany przerywań
# free -m                            \# Zajęta i wolna pamięć (-m podaje w MB)
# cat /proc/devices                  \# Skonfigurowane urządzenia
# lspci -tv                          \# Pokazuje urządzenia PCI
# lsusb -tv                          \# Pokazuje urządzenia USB
# lshal                              \# Wyświetla listę wszystkich urządzeń wraz z ich ustawieniami
# dmidecode                          \# Pokazuje DMI/SMBIOS: informacje o sprzęcie z BIOS

### FreeBSD

\# sysctl hw.model                    \# model procesora (CPU)
# sysctl hw                          \# Daje sporo informacji o sprzęcie
# sysctl vm                          \# Obciążenie pamięci
# dmesg | grep "real mem"            \# Wyświetla ilość pamięci fizycznej
# sysctl -a | grep mem               \# Ustawienia pamięci jądra i informacje
# sysctl dev                         \# Skonfigurowane urządzenia
# pciconf -l -cv                     \# Pokazuje urządzenia PCI
# usbdevs -v                         \# Pokazuje urządzenia USB
# atacontrol list                    \# Pokazuje urządzenia ATA
# camcontrol devlist -v              \# Pokazuje urządzenia SCSI

## Obciążenie, statystyki i wiadomości

Następujące polecenia przydają się w uzyskaniu informacji o stanie systemu.

\# top                                \# Wyświetla i aktualizuje procesy najbardziej obciążające procesor
# mpstat 1                           \# Wyświetla statystyki procesora
# vmstat 2                           \# Wyświetla statystyki pamięci wirtualnej
# iostat 2                           \# Wyświetla statystyki I/O (2 sekundowy interwał)
# systat -vmstat 1                   \# Podsumowanie statystyk systemowych w BSD (1 sekundowy interwał)
# systat -tcp 1                      \# Połączenia tcp w BSD (sprawdź też -ip)
# systat -netstat 1                  \# Aktywne połączenia sieciowe w BSD
# systat -ifstat 1                   \# Ruch sieciowy poprzez aktywne interfejsy w BSD
# systat -iostat 1                   \# Procesor i przepustowość dysku w BSD
# tail -n 500 /var/log/messages      \# Ostatnie 500 wiadomości jądra/sysloga
# tail /var/log/warn                 \# Wiadomości ostrzegawcze systemu w dzienniku logów, zobacz syslog.conf

## Użytkownicy

\# id                                 \# Pokazuje identyfikator aktywnego użytkownika wraz z loginem i grupą
# last                               \# Pokazuje ostatnie logowania w systemie
# who                                \# Pokazuje kto jest zalogowany w systemie
# groupadd admin                     \# Dodaje grupę "admin" i użytkownika "colin" (Linux/Solaris)
# useradd -c "Colin Barschel" -g admin -m colin
# usermod -a -G <group> <user>       \# Dodaje istniejącego użytkownika do grupy (Debian)
# groupmod -A <user> <group>         \# Dodaje istniejącego użytkownika do grupy (SuSE)
# userdel colin                      \# Usuwa użytkownika "colin" (Linux/Solaris)
# adduser joe                        \# Dodaje interaktywnie użytkownika "joe" - FreeBSD
# rmuser joe                         \# Usuwa interaktywnie użytkownika "joe" - FreeBSD
# pw groupadd admin                  \# Użyj pw we FreeBSD
# pw groupmod admin -m newmember     \# Dodaje nowego użytkownika do grupy
# pw useradd colin -c "Colin Barschel" -g admin -m -s /bin/tcsh 
# pw userdel colin; pw groupdel admin

Zaszyfrowane hasła są przechowywane w /etc/shadow w Linuksie i Solarisie oraz w /etc/master.passwd na FreeBSD. Jeśli master.passwd jest modyfikowany ręcznie (np. usunięte hasło), uruchom `# pwd_mkdb -p master.passwd` aby przebudować bazę.

Aby czasowo odebrać wszystkim użytkownikom możliwość logowania w systemie (wszystkim poza użytkownikiem root) użyj nologin. Zostanie wyświetlona wiadomość z nologin (może nie działać w przypadku ssh ze współdzielonymi kluczami).

\# echo "Przepraszam, brak możliwości logowania." > /etc/nologin       \# (Linux)
# echo "Przepraszam, brak możliwości logowania." > /var/run/nologin   \# (FreeBSD)

## Limity

Niektóre aplikacje wymagają wyższych limitów (mniejszych ograniczeń) na otwieranie plików lub gniazd (np. serwery proxy, www czy bazy danych). Domyślne limity są za niskie.

### Linux

#### Na powłokę/skrypt

Limity powłoki są zarządzane przez `ulimit`. Aktualne ustawienia są sprawdzane za pomocą `ulimit -a`. Na przykład, aby zmienić limit otwartych plików z 1024 do 10240:

\# ulimit -n 10240                    \# Działa tylko wewnątrz powłoki

Polecenie `ulimit` może być użyte wewnątrz skryptu, aby zmienić limity wyłącznie dla danego skryptu.

#### Na użytkownika/proces

Użytkownicy i aplikacje mogą być konfigurowani w `/etc/security/limits.conf`. Na przykład:

\# cat /etc/security/limits.conf
\*   hard    nproc   250              \# Limit procesów użytkownika
asterisk hard nofile 409600          \# Limit otwieranych przez aplikację plików

#### Cały system

Limity jądra są ustawiane przez `sysctl`. Trwale ustawia się limity w `/etc/sysctl.conf`.

\# sysctl -a                          \# Pokazuje wszystkie systemowe limity
# sysctl fs.file-max                 \# Pokazuje limit maksymalnej liczby otwartych plików
# sysctl fs.file-max=102400          \# Zmienia limit maksymalnej liczby otwartych plików
# echo "1024 50000" > /proc/sys/net/ipv4/ip\_local\_port\_range  \# Zakres portów
# cat /etc/sysctl.conf
fs.file-max=102400                   \# Trwały wpis w sysctl.conf
# cat /proc/sys/fs/file-nr           \# Jak wiele deskryptorów plików jest w użyciu

### FreeBSD

#### Na powłokę/skrypt

Użyj polecenia `limits` w csh lub tcsh lub jak w Linuksie, użyj `ulimit` w powłoce sh lub bash

#### Na użytkownika/proces

Domyślne limity na loginach są ustawione w `/etc/login.conf`. Wartości nielimitowane są ograniczane maksymalnymi limitami systemu.

#### Cały system

Limity jądra są ustawiane również za pomocą `sysctl`. Trwałe limity są ustawiane w `/etc/sysctl.conf` lub `/boot/loader.conf`. Składnia jest taka sama jak w Linuksie ale klucze są inne.

\# sysctl -a                          \# Pokazuje wszystkie limity systemu
# sysctl kern.maxfiles=XXXX          \# Maksymalna liczba deskryptorów plików
kern.ipc.nmbclusters=32768           \# Trwały wpis w /etc/sysctl.conf
kern.maxfiles=65536                  \# Typowy wpis dla Squid
kern.maxfilesperproc=32768
kern.ipc.somaxconn=8192              \# Kolejka TCP. Lepsze dla apache/sendmail
# sysctl kern.openfiles              \# Jak wiele deskryptorów plików jest w użyciu
# sysctl kern.ipc.numopensockets     \# Jak wiele otwartych gniazd jest w użyciu
# sysctl -w net.inet.ip.portrange.last=50000 \# Domyślnie jest 1024-5000
# netstat -m                         \# Statystyki bufora sieciowego

Więcej szczegółów znajdziesz w [FreeBSD handbook Chapter 11](http://www.freebsd.org/doc/en_US.ISO8859-1/books/handbook/configtuning-kernel-limits.html)http://www.freebsd.org/handbook/configtuning-kernel-limits.html.

### Solaris

Następujące wartości w `/etc/system` podniosą maksymalną liczbę deskryptorów plików na proces:

set rlim\_fd\_max = 4096               \# Twardy limit na deskryptory plików dla pojedynczego procesu.
set rlim\_fd\_cur = 1024               \# Miękki limit na deskryptor plików dla pojedynczego procesu.

## Poziomy pracy

### Linux

W czasie uruchamiania systemu jądro uruchamia proces `init`, który następnie uruchamia `rc`, który przetwarza wszystkie skrypty należące do danego poziomu pracy. Skrypty są przechowywane w /etc/init.d i są linkowane do /etc/rc.d/rcN.d, gdzie N jest poziomem pracy  
Domyślny poziom pracy jest zdefiniowany w /etc/inittab. Zazwyczaj jest to 3 lub 5:

\# grep default: /etc/inittab                                         
id:3:initdefault:

Aktualny poziom pracy (lista poziomów pod spodem) może być zmieniony za pomocą `init`. Na przykład przejście z poziomu 3 na 5:

\# init 5                             \# Przejście na 5 poziom pracy.

-   0       Zatrzymanie systemu
-   1       Pojedynczy użytkownik (także S)
-   2       Wielu użytkowników bez sieci
-   3       Wielu użytkowników z siecią
-   5       Wielu użytkowników w trybie graficznym
-   6       Ponowne uruchomienie systemu

Użyj `chkconfig` aby określić które programy mają uruchamiać się podczas ładowania poziomu pracy.

\# chkconfig --list                   \# Lista wszystkich skryptów init
# chkconfig --list sshd              \# Raport statusu serwera ssh
# chkconfig sshd --level 35 on       \# Włączenie serwera ssh dla 3 i 5 poziomu pracy
# chkconfig sshd off                 \# Wyłączenie serwera ssh dla wszystkich poziomów pracy

Debian oraz dystrybucje na nim bazujące, jak Ubuntu czy Knoppix, używają polecenia `update-rc.d` do zarządzania skryptami poziomów pracy. Domyślnie jest to start dla 2,3,4 i 5 poziomu oraz wyłączenie dla 0,1 i 6.

\# update-rc.d sshd defaults          \# Aktywacja serwera ssh na domyślnych poziomach pracy
# update-rc.d sshd start 20 2 3 4 5 . stop 20 0 1 6 .  \# ze wskazanymi argumentami
# update-rc.d -f sshd remove         \# Wyłączenie serwera ssh dla wszystkich poziomów pracy
# shutdown -h now (lub # poweroff)    \# Wyłączenie i zatrzymanie systemu

### FreeBSD

Podejście do startu systemu w BDS jest inne niż w SysV, nie ma tu poziomów pracy. Ostateczny stan ładowania systemu (pojedynczy użytkownik z lub bez środowiska graficznego) jest konfigurowany w `/etc/ttys`. Wszystkie skrypty systemu są zlokalizowane w `/etc/rc.d/` oraz w `/usr/local/etc/rc.d/` dla innych aplikacji. Aktywacja usług jest konfigurowana w `/etc/rc.conf` i `/etc/rc.conf.local`. Domyślne zachowanie jest konfigurowane w `/etc/defaults/rc.conf`. Skrypty odpowiadają przynajmniej na start|stop|status.

\# /etc/rc.d/sshd status
sshd is running as pid 552.
# shutdown now                       \# Przejdź w tryb pracy pojedynczego użytkownika
# exit                               \# Wróć do trybu pracy wielu użytkowników
# shutdown -p now                    \# Wyłącz i zatrzymaj system
# shutdown -r now                    \# Uruchom ponownie

Proces `init` może również być używany do przejścia w następujące poziomy stanów. Na przykład `# init 6` spowoduje przeładowanie systemu.

-   0       Zatrzymanie i wyłączenie zasilania (sygnał `USR2`)
-   1       Przejście w tryb pojedynczego użytkownika (sygnał `TERM`)
-   6       Ponowne uruchomienie maszyny (sygnał `INT`)
-   c       Blokowanie dalszych logowań (sygnał `TSTP`)
-   q       Powtórne przeskanowanie pliku ttys(5) (sygnał `HUP`)

## Resetowanie hasła roota

### Metoda linuksowa 1

W programie rozruchowym (lilo lub grub) użyj następującej opcji:

init=/bin/sh

Jądro zamontuje partycję root, a `init` wystartuje powłokę systemu zamiast `rc` i skryptów poziomów pracy. Użyj polecenia `passwd` aby zmienić hasło i przeładuj system. Zapomnij o pierwszym poziomie pracy, musisz w nim posłużyć się hasłem (nie w systemach Red Hat - HS).  
Jeżeli po starcie systemu partycja root jest zamontowana w trybie tylko do odczytu, przemontuj ją w trybie rw:

\# mount -o remount,rw /
# passwd                             \# lub usuń hasło roota (/etc/shadow)
# sync; mount -o remount,ro /        \# wykonaj sync przed przemontowaniem w tryb ro
# reboot

### Metoda FreeBSD 1

Na FreeBSD, uruchom system w trybie pojedynczy użytkownika, przemontuj w trybie rw i użyj passwd. Możesz wybrać ten tryb z menu bootowania (opcja 4),które wyświetla się przez 10 sekund w czasie startu systemu. Ten tryb pozwoli na pracę z uprawnieniami roota na partycji /.

\# mount -u /; mount -a               \# zamontuje / w trybie rw
# passwd
# reboot

### Metoda na Uniksy, FreeBSD i Linux 2

Inne Uniksy mogą nie pozwolić na prostą sztuczkę z init. Rozwiązaniem jest zamontowanie partycji root z innego systemu (np. dysku ratunkowego) i zmiana hasła na dysku.

-   Uruchom system z live CD lub dysku instalacyjnego w trybie ratunkowym, który umożliwi dostęp do powłoki.
-   Znajdź partycję root za pomocą fdisk np. fdisk /dev/sda
-   Zamontuj ją i użyj chroot:

\# mount -o rw /dev/ad4s3a /mnt
# chroot /mnt                        \# chroot do /mnt
# passwd
# reboot

## Moduły jądra

### Linux

\# lsmod                              \# Lista wszystkich modułów załadowanych przez jądro
# modprobe isdn                      \# Załadowanie modułu (w tym przypadku isdn)

### FreeBSD

\# kldstat                            \# Lista wszystkich modułów załadowanych przez jądro
# kldload crypto                     \# Załadowanie modułu (w tym przypadku crypto)

## Kompilowanie jądra

### Linux

\# cd /usr/src/linux
# make mrproper                      \# Czyszczenie wszystkiego, również pliki konfiguracyjne
# make oldconfig                     \# Użycie starego pliku .config jeżeli istnieje
# make menuconfig                    \# lub xconfig (Qt) lub gconfig (GTK)
# make                               \# Stworzenie skompresowanego obrazu jądra
# make modules                       \# Kompilowanie modułów
# make modules\_install               \# Instalowanie modułów
# make install                       \# Instalowanie jądra
# reboot

### FreeBSD

Opcjonalnie zaktualizuj drzewo źródeł (w `/usr/src`) za pomocą csup (dla FreeBSD 6.2 lub późniejsze):

\# csup <supfile>

Używam następującego pliku supfile:

\*default host=cvsup5.FreeBSD.org  # www.freebsd.org/handbook/cvsup.html#CVSUP-MIRRORS
\*default prefix=/usr 
\*default base=/var/db
\*default release=cvs delete tag=RELENG\_7
src-all

Aby zmodyfikować i przebudować jądro, skopiuj standardowy plik konfiguracyjny zmieniając jego nazwę i edytuj go wg potrzeb (możesz też edytować plik `GENERIC` bezpośrednio). Aby zrestartować budowanie w razie przerwania, dodaj opcję `NO_CLEAN=YES` do polecenia make; pomoże to uniknąć czyszczenia już zbudowanych obiektów.

\# cd /usr/src/sys/i386/conf/
# cp GENERIC MYKERNEL
# cd /usr/src
# make buildkernel KERNCONF=MYKERNEL
# make installkernel KERNCONF=MYKERNEL

Aby przebudować cały system:

\# make buildworld                    \# Buduje cały system, bez jądra
# make buildkernel                   \# Użyje KERNCONF jak wyżej w razie potrzeby
# make installkernel
# reboot
# mergemaster -p                     \# Porównuje pliki, o których wiadomo że są istotne
# make installworld
# mergemaster -i -U                  \# Aktualizuje całą konfigurację i inne pliki
# reboot

W przypadku małych zmian w źródle możesz użyć NO\_CLEAN=yes aby uniknąć przebudowywania całego drzewa. Jednak używaj tego ostrożnie.

\# make buildworld NO\_CLEAN=yes       \# Nie usuwa starych obiektów
# make buildkernel KERNCONF=MYKERNEL NO\_CLEAN=yes

## Procesy

[Listowanie](#ps) | [Priorytety](#nice) | [Tło/Pierwszy plan](#bgfg) | [Top](#top) | [Kill](#kill)

## Listy i PIDy

Każdy proces ma unikalny numer - PID. Lista wszystkich działających procesów jest zwracana przez `ps`.

\# ps -auxefw                         \# Rozległa lista wszystkich uruchomionych procesów

Jednak bardziej typowym jest użycie w potokach lub z `pgrep`:

\# ps axww | grep cron
  586  ??  Is     0:01.48 /usr/sbin/cron -s
# ps aux | grep 'ss\[h\]'              \# Znajduje wszystkie PID ssh bez PID grep
# pgrep -l sshd                      \# Znajduje PID procesu na podstawie jego (części) nazwy
# echo $$                            \# PID powłoki
# fuser -va 22/tcp                   \# Lista procesów używających portu 22 (Linux)
# fuser -va /home                    \# Lista procesów mających dostęp do partycji /home
# strace df                          \# Śledzenie systemowych wywołań i sygnałów
# truss df                           \# To samo co poprzednie dla FreeBSD/Solaris/Unixware
# history | tail -50                 \# Wyświetla 50 ostatnich użytych poleceń

## Priorytety

Zmiana priorytetu procesy za pomocą `renice`. Ujemne numery mają wyższy priorytet, najniższy jest -20, "nice" ma dodatnie wartości.

\# renice -5 586                      \# Mocniejszy priorytet
586: old priority 0, new priority -5

Uruchom proces ze zdefiniowanym priorytetem za pomocą `nice`. Dodatni jest "miłym" lub słabym, ujemny natomiast mocnym harmonogramem procesów. Upewnij się, który program jest używany `/usr/bin/nice` czy wbudowany w powłokę (sprawdź za pomocą `# which nice`).

\# nice -n -5 top                     \# Mocniejszy priorytet(/usr/bin/nice)
# nice -n 5 top                      \# Słabszy priorytet (/usr/bin/nice)
# nice +5 top                        \# Wbudowany w tcsh nice (taki sam jak wyżej!)

O ile nice zmienia harmonogram CPU, inne przydatne polecenie - `ionice` zmienia harmonogram IO dysku. Jest to bardzo przydatne w przypadku intensywnego użycia (IO) dysku przez aplikacje, co może przyczynić się do położenia maszyny na kolana pomimo niskiego priorytetu procesu. Polecenie jest dostępne jedynie w Linuksie (AFAIK). Możesz wybrać klasę (bezczynność (idle) - możliwie najlepsze (best effort) - czas rzeczywisty (real time)), strona man jest krótka i dobrze tłumaczy zagadnienie.

\# ionice c3 -p123                    \# Ustawia klasę idle dla PID 123
# ionice -c2 -n0 firefox             \# Uruchamia firefox z klasą best effort i wysokim priorytetem
# ionice -c3 -p$$                    \# Ustawia aktualnej powłoce priorytet idle

Dla przykładu ostanie polecenie jest bardzo przydatne podczas kompilacji (lub debugowania) dużych projektów. Każde polecenie uruchomione w danej powłoce będzie miało obniżony priorytet i nie będzie zakłócało pracy systemu. $$ jest PID-em Twojej powłoki (sprawdź echo $$).

## Procesy tła i pierwszego planu

Kiedy uruchamiamy proces w powłoce, mamy możliwość przeniesienia go do tła i z powrotem do pierwszego planu za pomocą \[Ctrl\]-\[Z\] (Z^), `bg` i `fg`. Na przykład, uruchom dwa procesy, przenieś je do tła, wyświetl ich listę za pomocą `jobs` i przywróć jeden do pierwszego planu.

\# ping cb.vu > ping.log
^Z                                   \# ping jest zawieszony (zatrzymany) za pomocą \[Ctrl\]-\[Z\] 
# bg                                 \# przekazany do tła i kontynuuje pracę
# jobs -l                            \# Lista procesów w tle
\[1\]  - 36232 Running                       ping cb.vu > ping.log
\[2\]  + 36233 Suspended (tty output)        top
# fg %2                              \# Przywrócenie procesu 2 do pierwszego planu

Użycie `nohup` do uruchomienia procesu, który będzie pracować po zamknięciu powłoki (niewrażliwy na zawieszanie).

\# nohup ping -i 60 > ping.log &

## Top

Program `top` wyświetla informacje o uruchomione procesach. Program `htop` z htop.sourceforge.net jest bardzo ciekawą i o wiele potężniejszą alternatywą. Działa na Linuksie i FreeBSD (`ports/sysutils/htop/`).

\# top

Kiedy top jest uruchomiony wciśnij h aby obejrzeć pomoc. Przydatnymi klawiszami są:

-   **u \[user name\]** Aby wyświetlić procesy tylko wskazanego użytkownika. Pozostaw pole puste aby zobaczyć procesy wszystkich użytkowników
-   **k \[pid\]** Zakończ proces o danym pid.
-   **1** Aby wyświetlić statystyki wszystkich procesorów (tylko w Linux)
-   **R**Włączenie/wyłączenie sortowania.

## Sygnały/Zabijanie procesów

Zatrzymanie lub wysłanie sygnału za pomocą `kill` lub `killall`.

\# ping -i 60 cb.vu > ping.log &
\[1\] 4712
# kill -s TERM 4712                  \# tak samo jak kill -15 4712
# killall -1 httpd                   \# wysyła sygnał HUP do procesu w oparciu o jego dokładną nazwę
# pkill -9 http                      \# wysyła sygnał TERM do procesu q oparciu o fragment jego nazwy
# pkill -TERM -u www                 \# wysyła sygnał TERM do procesu, którego właścicielem jest www
# fuser -k -TERM -m /home            \# wysyła sygnał TERM do wszystkich procesów korzystających z /home (umożliwiając odmontowanie)

Ważnymi sygnałami są:

-   1       `HUP` (hang up)
-   2       `INT` (interrupt) przerwanie
-   3       `QUIT` (quit) wyjście
-   9       `KILL` (non-catchable, non-ignorable kill) natychmiastowe przerwanie programu
-   15     `TERM` (software termination signal) zamknięcie programu

## System plików

[Informacje o dysku](#diskinfo) | [Start systemu](#fsboot) | [Wykorzystanie dysku](#mountpoints) | [Otwarte pliki](#filesstat) | [Montowanie/Przemontowanie](#mountcd) | [Montowanie SMB](#mountsmb) | [Montowanie obrazów](#mountimg) | [Wypalanie obrazów ISO](#burniso) | [Tworzenie obrazów](#createimg) | [Partycje w pamięci RAM](#creatememdisk) | [Wydajność dysku](#diskperf)

## Uprawnienia

Zmiana uprawnień i właściciela za pomocą poleceń `chmod` i `chown`. Domyślna maska (umask) może być zmieniona dla wszystkich użytkowników w /etc/profile dla Linux lub /etc/login.conf dla FreeBSD. Domyślna maska zazwyczaj ma wartość 022. Wartość umask zostanie odjęta od 777, tak więc umask 022 da wynik w postaci uprawnień 755.

1 --x wykonywanie                      \# Tryb 764 = czytanie/pisanie/wykonywanie | czytanie/pisanie | czytanie
2 -w- pisanie                          \# Dla:       |----    właściciel    ----|   |---  grupa ---|   | pozostali |
4 r-- czytanie
  ugo=a                              u=użytkownik, g=grupa, o=pozostali, a=wszyscy

\# chmod \[POCJA\] TRYB\[,TRYB\] PLIK    \# TRYB w postaci \[ugoa\]\*(\[-+=\](http://cb.vu/[rwxXst/]))
# chmod 640 /var/log/maillog         \# Ogranicza prawa pliku do -rw-r-----
# chmod u=rw,g=r,o= /var/log/maillog \# Tak samo jak wyżej
# chmod -R o-r /home/\*               \# Rekursywne odbiera prawa czytania wszystkim pozostałym użytkownikom
# chmod u+s /path/to/prog            \# Ustawia bitu SUID na pliku (wiedz co robisz!)
# find / -perm -u+s -print           \# Znajduje wszystkie programy z bitem SUID
# chown user:group /path/to/file     \# Zmienia użytkownika i grupę pliku
# chgrp group /path/to/file          \# Zmienia grupę pliku
# chmod 640 \`find ./ -type f -print\` \# Zmienia uprawnienia na 640 dla wszystkich plików
# chmod 751 \`find ./ -type d -print\` \# Zmienia uprawnienia na 751 dla wszystkich katalogów

## Informacje o dysku

\# diskinfo -v /dev/ad2               \# informacje o dysku (sektory/rozmiar) FreeBSD
# hdparm -I /dev/sda                 \# informacje o dysku IDE/ATA (Linux)
# fdisk /dev/ad2                     \# Wyświetla i manipuluje tablicą partycji
# smartctl -a /dev/ad2               \# Wyświetla informacje SMART dysku

## Boot

### FreeBSD

Aby uruchomić stare jądro, w przypadku problemów z uruchomieniem nowego, zatrzymaj uruchamianie w czasie odliczania.

\# unload
# load kernel.old
# boot

## Punkty montowania/Wykorzystanie dysku

\# mount | column -t                  \# Pokazuje zamontowane w systemie systemy plików
# df                                 \# Wyświetla wolne miejsce i zamontowane urządzenia
# cat /proc/partitions               \# Pokazuje wszystkie zamontowane partycje (Linux)

### Wykorzystane dysku

\# du -sh \*                           \# Rozmiar katalogów jako lista
# du -csh                            \# Całkowity rozmiar aktualnego katalogu
# du -ks \* | sort -n -r              \# Sortuje wszystko wg rozmiaru w kilobajtach
# ls -lSr                            \# Pokazuje pliki, największe na końcu

## Kto otworzył jakie pliki

Jest to pomocne przy znajdowaniu pliku blokującego partycję, która na być odmontowana. Daje to typowy błąd:

\# umount /home/
umount: unmount of /home             \# odmontowanie nie jest możliwe z powodu blokowania katalogu home przez plik
   failed: Device busy

### FreeBSD i większość Uniksów

\# fstat -f /home                     \# dla punktu montowania
# fstat -p PID                       \# dla aplikacji z PID
# fstat -u user                      \# dla nazwy użytkownika

Znajduje otwarty plik dziennika (lub inny otwarty plik), np. dla Xorg

\# ps ax | grep Xorg | awk '{print $1}'
1252
# fstat -p 1252
USER     CMD          PID   FD MOUNT      INUM MODE         SZ|DV R/W
root     Xorg        1252 root /             2 drwxr-xr-x     512  r
root     Xorg        1252 text /usr     216016 -rws--x--x  1679848 r
root     Xorg        1252    0 /var     212042 -rw-r--r--   56987  w

W /var znajduje się tylko jeden plik z inum 212042:

\# find -x /var -inum 212042
/var/log/Xorg.0.log

### Linux

Znalezienie otwartego pliku w punkcie montowania za pomocą `fuser` lub `lsof`:

\# fuser -m /home                     \# Lista procesów mających dostęp do /home
# lsof /home
COMMAND   PID    USER   FD   TYPE DEVICE    SIZE     NODE NAME
tcsh    29029 eedcoba  cwd    DIR   0,18   12288  1048587 /home/eedcoba (guam:/home)
lsof    29140 eedcoba  cwd    DIR   0,18   12288  1048587 /home/eedcoba (guam:/home)

Według aplikacji:

ps ax | grep Xorg | awk '{print $1}'
3324
# lsof -p 3324
COMMAND   PID    USER   FD   TYPE DEVICE    SIZE    NODE NAME
Xorg    3324 root    0w   REG        8,6   56296      12492 /var/log/Xorg.0.log

Według pojedynczego pliku:

\# lsof /var/log/Xorg.0.log
COMMAND  PID USER   FD   TYPE DEVICE  SIZE  NODE NAME
Xorg    3324 root    0w   REG    8,6 56296 12492 /var/log/Xorg.0.log

## Montowanie/odmontowywanie systemu plików

Na przykład cdrom. Jeżeli występuje w /etc/fstab:

\# mount /cdrom

Możesz szukać urządzenia w /dev/ lub za pomocą dmesg

### FreeBSD

\# mount -v -t cd9660 /dev/cd0c /mnt  \# Cdrom
# mount\_cd9660 /dev/wcd0c /cdrom     \# Inna metoda
# mount -v -t msdos /dev/fd0c /mnt   \# Dyskietka

Wpis w /etc/fstab:

\# Device                Mountpoint      FStype  Options         Dump    Pass#
/dev/acd0               /cdrom          cd9660  ro,noauto       0       0

Aby zezwolić użytkownikowi na montowanie:

\# sysctl vfs.usermount=1  \# Lub dodanie linii "vfs.usermount=1" w /etc/sysctl.conf

### Linux

\# mount -t auto /dev/cdrom /mnt/cdrom   \# Typowe polecenie montujące cdrom
# mount /dev/hdc -t iso9660 -r /cdrom   \# Typowy cdrom IDE
# mount /dev/scd0 -t iso9660 -r /cdrom  \# Typowy cdrom SCSI
# mount /dev/sdc0 -t ntfs-3g /windows   \# Typowe urządzenie SCSI

Wpisy w /etc/fstab:

/dev/cdrom   /media/cdrom  subfs noauto,fs=cdfss,ro,procuid,nosuid,nodev,exec 0 0

#### Montowanie partycji FreeBSD w Linuksie

Znajdź numer partycji za pomocą fdisk, jest to zazwyczaj partycja root ale może to również być inny "slice" BSD. Jeżeli BSD ma wiele "slice-ów", to nie znajdują się one na liście tabeli partycji fdisk, ale są widoczne w /dev/sda\* lub /dev/hda\*

\# fdisk /dev/sda                     \# Znalezienie partycji FreeBSD
/dev/sda3   \*        5357        7905    20474842+  a5  FreeBSD
# mount -t ufs -o ufstype=ufs2,ro /dev/sda3 /mnt
/dev/sda10 = /tmp; /dev/sda11 /usr   \# Pozostałe "slice-y"

### Przemontowywanie

Przemontowanie urządzenia bez jego odmontowania. Potrzebne na przykład dla fsck

\# mount -o remount,ro /              \# Linux
# mount -o ro /                      \# FreeBSD

Kopiowanie surowych danych z cdrom do obrazu iso:

\# dd if=/dev/cd0c of=file.iso

## Dodanie przestrzeni wymiany "w locie"

Przypuśćmy, że potrzebujesz więcej przestrzeni wymiany (w tej chwili), powiedzmy 2 GB w pliku /swap2g (tylko w Linux).

\# dd if=/dev/zero of=/swap2gb bs=1024k count=2000
# mkswap /swap2gb                    \# Tworzy przestrzeń wymiany
# swapon /swap2gb                    \# Aktywuje przestrzeń wymiany. od tej chwili w użyciu
# swapoff /swap2gb                   \# Kiedy kończysz, dezaktywujesz przestrzeń wymiany
# rm /swap2gb

## Montowanie zasobów SMB

Przypuśćmy, że chcemy uzyskać dostęp do zasobu SMB "myshare" na komputerze smbserver; adres, który wpiszemy w systemie Windows to \\\\smbserver\\myshare\\. Montujemy w /mnt/smbshare. Uwaga> cifs wymaga adresu IP lub DNS, nie nazwy Windows.

### Linux

\# smbclient -U user -I 192.168.16.229 -L //smbshare/    \# Lista zasobów
# mount -t smbfs -o username=winuser //smbserver/myshare /mnt/smbshare
# mount -t cifs -o username=winuser,password=winpwd //192.168.16.229/myshare /mnt/share

Pakiet mount.cifs umożliwia przechowywanie loginów i haseł w pliku, np. `/home/user/.smb`:

username=winuser
password=winpwd

i montujemy w następujący sposób:

\# mount -t cifs -o credentials=/home/user/.smb //192.168.16.229/myshare /mnt/smbshare

### FreeBSD

Użyj -I aby podać adres IP (lub nazwę DNS); smbserver jest nazwą Windows.

\# smbutil view -I 192.168.16.229 //winuser@smbserver    \# Lista zasobów
# mount\_smbfs -I 192.168.16.229 //winuser@smbserver/myshare /mnt/smbshare

## Montowanie obrazu

### Linux loop-back

\# mount -t iso9660 -o loop file.iso /mnt                \# Montowanie obrazu CD
# mount -t ext3 -o loop file.img /mnt                   \# Montowanie obrazu z systemem plików ext3

### FreeBSD

Interfejs "memory device" (wykonaj # kldload md.ko w razie potrzeby):

\# mdconfig -a -t vnode -f file.iso -u 0
# mount -t cd9660 /dev/md0 /mnt
# umount /mnt; mdconfig -d -u 0                         \# Czyszczenie md

Za pomocą wirtualnych węzłów:

\# vnconfig /dev/vn0c file.iso; mount -t cd9660 /dev/vn0c /mnt
# umount /mnt; vnconfig -u /dev/vn0c                    \# Czyszczenie vn

### Solaris i FreeBSD

Za pomocą pliku interfejsu loop-back lub lofi:

\# lofiadm -a file.iso
# mount -F hsfs -o ro /dev/lofi/1 /mnt
# umount /mnt; lofiadm -d /dev/lofi/1                   \# Czyszczenie lofi

## Tworzenie i wypalanie obrazu ISO

To polecenie skopiuje sektor po sektorze zawartość CD lub DVD. Bez `conv=notrunc` obraz będzie mniejszy, jeżeli na cd jest mało danych. Sprawdź poniżej oraz [przykłady dd](#dd)

\# dd if=/dev/hdc of=/tmp/mycd.iso bs=2048 conv=notrunc

Użyj mkisofs aby stworzyć obraz CD/DVD z plików w katalogu. Aby unikać ograniczeń w nazwach plików: -r włącza powszechne w Uniksach rozszerzenie Rock Ridge, -J włącza rozszerzenie Joliet używane przez systemy Microsoft, -L pozwala na rozpoczynanie nazwy plików od kropki ISO966

\# mkisofs -J -L -r -V TITLE -o imagefile.iso /path/to/dir

Na FreeBSD, mkisofs znajduje się w portach w sysutils/cdrtools.

### Wypalanie obrazów CD/DVD

#### FreeBSD

We FreeBSD DMA jest domyślnie wyłączone dla napędów ATAPI. DMA włącza się za pomocą polecenia sysctl i poniższych argumentów, lub za pomocą /boot/loader.conf z następującymi wpisami:

hw.ata.ata\_dma="1"
hw.ata.atapi\_dma="1"

Używaj `burncd` dla napędów ATAPI (`burncd` jest częścią podstawowego systemu) i `cdrecord` (w sysutils/cdrtools) dla napędów SCSI.

\# burncd -f /dev/acd0 data imagefile.iso fixate      \# Dla napędów ATAPI
# cdrecord -scanbus                  \# Wyszukanie urządzeń służących do nagrywania (np. 1,0,0)
# cdrecord dev=1,0,0 imagefile.iso

#### Linux

Używaj również `cdrecord` w Linuksie jak pokazano poniżej. Dodatkowo możliwe jest używanie natywnego interfejsu ATPI, który można znaleźć za pomocą:

\# cdrecord dev=ATAPI -scanbus

Wypalanie CD/DVD jak wyżej.

#### dvd+rw-tools

Pakiet [dvd+rw-tools](http://fy.chalmers.se/~appro/linux/DVD+RW/) (FreeBSD: ports/sysutils/dvd+rw-tools) ma szerokie możliwości i zawiera `growisofs` do wypalania CD lub DVD. Przykład odnosi się do urządzenia dvd jako `/dev/dvd`, który może być linkiem symbolicznym do `/dev/scd0` (charakterystyczne dla scsi w Linuksie) lub `/dev/cd0` (charakterystyczne dla FreeBSD) lub `/dev/rcd0c` (charakterystyczne dla scsi w NetBSD/OpenBSD) lub `/dev/rdsk/c0t1d0s2` (przykład urządzenia SCSI/ATAPI w Solaris). Istnieje dobra dokumentacja z przykładami na [FreeBSD handbook charpet 18.7](http://www.freebsd.org/handbook/creating-dvds.html) (po angielsku) http://www.freebsd.org/handbook/creating-dvds.html (po angielsku).

                       \# -dvd-compat closes the disk
# growisofs -dvd-compat -Z /dev/dvd=imagefile.iso     \# Wypala istniejący obraz iso
# growisofs -dvd-compat -Z /dev/dvd -J -R /p/to/data  \# Wypala bezpośrednio

### Konwersja pliku .nrg (Nero) do .iso

Nero zwyczajnie dodaje 300Kb nagłówek do normalnego obrazu iso. Można to wyciąć za pomocą dd.

\# dd bs=1k if=imagefile.nrg of=imagefile.iso skip=300

### Konwersja obrazu bin/cue do iso

Można to zrobić małym programem [`bchunk`](http://freshmeat.net/projects/bchunk/)http://freshmeat.net/projects/bchunk/. Występuje w portach FreeBSD w sysutils/bchunk.

\# bchunk imagefile.bin imagefile.cue imagefile.iso

## Stworzenie pliku obrazu

Na przykład 1GB partycja używa pliku /usr/vdisk.img. W tym przypadku używamy vnode 0 ale może to być również 1.

### FreeBSD

\# dd if=/dev/random of=/usr/vdisk.img bs=1K count=1M
# mdconfig -a -t vnode -f /usr/vdisk.img -u 0         \# Tworzy urządzenie /dev/md1
# bsdlabel -w /dev/md0
# newfs /dev/md0c
# mount /dev/md0c /mnt
# umount /mnt; mdconfig -d -u 0; rm /usr/vdisk.img    \# Czyści urządzenie md

Plik obrazu może być automatycznie zamontowany podczas startu systemu za pomocą wpisów w /etc/rc.conf i /etc/fstab. Sprawdź swoje ustawienia za pomocą `# /etc/rc.d/mdconfig start` (najpierw usuń urządzenie md0 za pomocą `# mdconfig -d -u 0`).  
Należy jednak pamiętać, że automatyczna konfiguracja działa tylko wówczas, gdy plik obrazu NIE znajduje się na partycji root. Powodem tego jest bardzo wczesne wykonanie skryptu /etc/rc.d/mdconfig w czasie startu systemu, w tym czasie partycja root jest zamontowana w trybie tylko do odczytu. Obraz zlokalizowany poza partycją root będzie zamontowany później za pomocą skryptu /etc/rc.d/mdconfig2.  
/boot/loader.conf:

md\_load="YES"

/etc/rc.conf:

\# mdconfig\_md0="-t vnode -f /usr/vdisk.img"          \# /usr nie jest na partycji root

/etc/fstab: (0 0 na końcu linii jest ważne, mówi ono fsck, że może zignorować urządzenie, ponieważ jeszcze ono nie istnieje.)

/dev/md0                /usr/vdisk      ufs     rw              0       0

Jest możliwość późniejszego zwiększenia rozmiaru obrazu, powiedzmy o 300MB.

\# umount /mnt; mdconfig -d -u 0
# dd if=/dev/zero bs=1m count=300 >> /usr/vdisk.img
# mdconfig -a -t vnode -f /usr/vdisk.img -u 0
# growfs /dev/md0
# mount /dev/md0c /mnt                                \# Plik partycji jest teraz większy o 300MB

### Linux

\# dd if=/dev/zero of=/usr/vdisk.img bs=1024k count=1024
# mkfs.ext3 /usr/vdisk.img
# mount -o loop /usr/vdisk.img /mnt
# umount /mnt; rm /usr/vdisk.img                      \# Czyszczenie

### Linux z losetup

`/dev/zero` jest dużo szybsze niż`urandom` lecz mniej bezpieczne dla szyfrowania.

\# dd if=/dev/urandom of=/usr/vdisk.img bs=1024k count=1024
# losetup /dev/loop0 /usr/vdisk.img                   \# Tworzy plik i powiązanie /dev/loop0
# mkfs.ext3 /dev/loop0
# mount /dev/loop0 /mnt
# losetup -a                                          \# Sprawdza użyte urządzenia loop
# umount /mnt
# losetup -d /dev/loop0                               \# Odłączenie
# rm /usr/vdisk.img

## Stworzenie tymczasowego systemu

Bazujący na pamięci system plików jest bardzo szybki dla wymagających (IO) aplikacji. Jak stworzyć 64MB partycję zamontowaną w /memdisk:

### FreeBSD

\# mount\_mfs -o rw -s 64M md /memdisk
# umount /memdisk; mdconfig -d -u 0                   \# Czyści urządzenie md
md     /memdisk     mfs     rw,-s64M    0   0         \# wpis w /etc/fstab

### Linux

\# mount -t tmpfs -osize=64m tmpfs /memdisk

## Wydajność dysku

Czytanie i pisanie 1GB pliku na partycji ad4s3c (/home)

\# time dd if=/dev/ad4s3c of=/dev/null bs=1024k count=1000
# time dd if=/dev/zero bs=1024k count=1000 of=/home/1Gb.file
# hdparm -tT /dev/hda      \# Tylko w Linux

## Sieć

[Ruting](#routing) | [Dodatkowe IP](#secondip) | [Zmiana MAC](#changemac) | [Porty](#ports) | [Zapora sieciowa (Firewall)](#firewall) | [Przekazywanie IP (IP forward)](#ipforward) | [NAT](#nat) | [DNS](#dns) | [DHCP](#dhcp) | [Ruch](#traffic) | [QoS](#trafficctrl) | [NIS](#nis) | [Netcat](#netcat)

## Debugowanie (Patrz także [Analiza ruchu)](#traffic)

### Linux

\# ethtool eth0              \# Pokazuje status Ethernetu (zastępuje mii-diag)
# ethtool -s eth0 speed 100 duplex full \# Wymusza tryb 100Mbit Full duplex
# ethtool -s eth0 autoneg off \# Wyłącza auto negocjacje
# ethtool -p eth1           \# Mruganie diody led na karcie ehternet - bardzo przydatne jeżeli wspierane przez urządzenie
# ip link show              \# Wyświetla wszystkie interfejsy w Linuksie (podobne do ifconfig)
# ip link set eth0 up       \# Włącza (up) lub wyłącza (down) interfejs. Tak samo jak "ifconfig eth0 up"
# ip addr show              \# Wyświetla wszystkie adresy IP w Linuksie (podobne do ifconfig)
# ip neigh show             \# Podobne do arp -a

### Inne systemy

\# ifconfig fxp0             \# Sprawdza pole "media" we FreeBSD
# arp -a                    \# Sprawdza wpisy ARP w ruterze (lub hoście) - wszystkie systemy
# ping cb.vu                \# Pierwsza rzecz do sprawdzenia...
# traceroute cb.vu          \# Drukuje ścieżkę rutingu do celu
# ifconfig fxp0 media 100baseTX mediaopt full-duplex \# tryb 100Mbit full duplex (FreeBSD)
# netstat -s                \# Statystyki protokołów sieciowych, dla wielu systemów

Dodatkowe polecenia, które nie zawsze są domyślnie zainstalowane, ale które można łatwo znaleźć:

\# arping 192.168.16.254     \# Ping w warstwie Ethernetu
# tcptraceroute -f 5 cb.vu  \# Używa tcp zamiast icmp aby przejść przez firewalle

## Ruting

### Drukowanie tabeli rutingu

\# route -n                  \# w Linux, można też "ip route"
# netstat -rn               \# Linux, BSD i UNIX
# route print               \# Windows

### Dodawanie i usuwanie tras

#### FreeBSD

\# route add 212.117.0.0/16 192.168.1.1
# route delete 212.117.0.0/16
# route add default 192.168.1.1

Trwałe dodanie tras rutingu w /etc/rc.conf

static\_routes="myroute"
route\_myroute="-net 212.117.0.0/16 192.168.1.1"

#### Linux

\# route add -net 192.168.20.0 netmask 255.255.255.0 gw 192.168.16.254
# ip route add 192.168.20.0/24 via 192.168.16.254       \# Tak samo jak powyżej z ip route
# route add -net 192.168.20.0 netmask 255.255.255.0 dev eth0
# route add default gw 192.168.51.254
# ip route add default via 192.168.51.254 dev eth0      \# Tak samo jak powyżej z ip route
# route delete -net 192.168.20.0 netmask 255.255.255.0

#### Solaris

\# route add -net 192.168.20.0 -netmask 255.255.255.0 192.168.16.254
# route add default 192.168.51.254 1                    \# 1 = skok (hop) do następnej bramy
# route change default 192.168.50.254 1

Stałe wpisy są ustawiane w `/etc/defaultrouter`.

#### Windows

\# Route add 192.168.50.0 mask 255.255.255.0 192.168.51.253
# Route add 0.0.0.0 mask 0.0.0.0 192.168.51.254

Użyj add -p aby ustawić trasę na stałe.

## Konfiguracja dodatkowych adresów IP

### Linux

\# ifconfig eth0 192.168.50.254 netmask 255.255.255.0       \# Pierwszy adres IP
# ifconfig eth0:0 192.168.51.254 netmask 255.255.255.0     \# Drugi adres IP
# ip addr add 192.168.50.254/24 dev eth0                   \# Odpowiednik powyższych
# ip addr add 192.168.51.254/24 dev eth0 label eth0:1

### FreeBSD

\# ifconfig fxp0 inet 192.168.50.254/24                     \# Pierwszy adres IP
# ifconfig fxp0 alias 192.168.51.254 netmask 255.255.255.0 \# Drugi adres IP
# ifconfig fxp0 -alias 192.168.51.254                      \# Usunięcie drugiego aliasu IP

Stałe wpisy w /etc/rc.conf

ifconfig\_fxp0="inet 192.168.50.254  netmask 255.255.255.0"
ifconfig\_fxp0\_alias0="192.168.51.254 netmask 255.255.255.0"

### Solaris

Sprawdź ustawienia za pomocą `ifconfig -a`

\# ifconfig hme0 plumb                                      \# Włącza kartę sieciową
# ifconfig hme0 192.168.50.254 netmask 255.255.255.0 up    \# Pierwszy adres IP
# ifconfig hme0:1 192.168.51.254 netmask 255.255.255.0 up  \# Drugi adres IP

## Zmiana adresu MAC

Zwykle trzeba wyłączyć interfejs sieciowy przed zmianą. Nie mów mi dlaczego chcesz zmieniać adres MAC...

\# ifconfig eth0 down
# ifconfig eth0 hw ether 00:01:02:03:04:05      \# Linux
# ifconfig fxp0 link 00:01:02:03:04:05          \# FreeBSD
# ifconfig hme0 ether 00:01:02:03:04:05         \# Solaris
# sudo ifconfig en0 ether 00:01:02:03:04:05     \# Mac OS X Tiger
# sudo ifconfig en0 lladdr 00:01:02:03:04:05    \# Mac OS X Leopard

Istnieje wiele narzędzi dla Windows. Np. [etherchange](http://ntsecurity.nu/toolbox/etherchange/)http://ntsecurity.nu/toolbox/etherchange. Możesz też poszukać "Mac Makeup" lub "smac".

## Używane porty

Nasłuchujące otwarte porty:

\# netstat -an | grep LISTEN
# lsof -i                  \# Linux, lista wszystkich połączeń internetowych
# socklist                 \# Linux, wyświetla listę otwartych gniazd
# sockstat -4              \# FreeBSD, nasłuchujące aplikacje
# netstat -anp --udp --tcp | grep LISTEN        \# Linux
# netstat -tup             \# Lista aktywnych połączeń do/z systemu (Linux)
# netstat -tupl            \# Lista nasłuchujących portów w systemie (Linux)
# netstat -ano             \# Windows

## Zapora sieciowa (Firewall)

Sprawdź czy zapora jest włączona (tylko typowe konfiguracje):

### Linux

\# iptables -L -n -v                  \# Status zapory
Open the iptables firewall
# iptables -P INPUT       ACCEPT     \# Otwarcie wszystkiego
# iptables -P FORWARD     ACCEPT
# iptables -P OUTPUT      ACCEPT
# iptables -Z                        \# Wyzerowanie pakietów i liczników bajtów we wszystkich łańcuchach
# iptables -F                        \# Wyczyszczenie wszystkich łańcuchów
# iptables -X                        \# Skasowanie wszystkich łańcuchów

### FreeBSD

\# ipfw show                          \# Status zapory
# ipfw list 65535 \# jeżeli odpowiedź brzmi "65535 deny ip from any to any", zapora jest wyłączona
# sysctl net.inet.ip.fw.enable=0     \# Wyłączenie
# sysctl net.inet.ip.fw.enable=1     \# Włączenie

## Przekazywanie IP dla rutingu

### Linux

Sprawdź a potem włącz przekazywania pakietów IP za pomocą:

\# cat /proc/sys/net/ipv4/ip\_forward  \# Sprawdzenie przekazywania pakietów 0=wyłączone, 1=włączone
# echo 1 > /proc/sys/net/ipv4/ip\_forward

lub zmień w /etc/sysctl.conf:

net.ipv4.ip\_forward = 1

### FreeBSD

Sprawdź i włącz za pomocą:

\# sysctl net.inet.ip.forwarding      \# Sprawdzenie przekazywania pakietów 0=wyłączone, 1=włączone
# sysctl net.inet.ip.forwarding=1
# sysctl net.inet.ip.fastforwarding=1	\# Dla dedykowanych ruterów lub zapór sieciowych
Trwale za pomocą wpisu w /etc/rc.conf:
gateway\_enable="YES"                 \# Ustaw na YES jeżeli ten host ma być bramą.

### Solaris

\# ndd -set /dev/ip ip\_forwarding 1   \# Ustawia przekazywania pakietów 0=wyłączone, 1=włączone

## NAT Sieciowa translacja adresów

### Linux

\# iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE	\# włączenie NAT
# iptables -t nat -A PREROUTING -p tcp -d 78.31.70.238 --dport 20022 -j DNAT \\
--to 192.168.16.44:22           \# Przekierowanie portu 20022 na wewnętrzny port IP ssh
# iptables -t nat -A PREROUTING -p tcp -d 78.31.70.238 --dport 993:995 -j DNAT \\
--to 192.168.16.254:993-995     \# Przekierowanie zakresu portów 993-995
# ip route flush cache
# iptables -L -t nat            \# Sprawdzeni statusu NAT

Usunięcie przekierowania portów za pomocą -D zamiast -A.

### FreeBSD

\# natd -s -m -u -dynamic -f /etc/natd.conf -n fxp0
Lub zmień w /etc/rc.conf:
firewall\_enable="YES"           \# Ustaw YES aby włączyć funkcjonalność zapory
firewall\_type="open"            \# Typ zapory (patrz /etc/rc.firewall)
natd\_enable="YES"               \# Włączenie natd (jeżeli firewall\_enable == YES).
natd\_interface="tun0"           \# Publiczny interfejs lub adresy IP do użycia.
natd\_flags="-s -m -u -dynamic -f /etc/natd.conf"

Przekierowanie portów za pomocą:

\# cat /etc/natd.conf 
same\_ports yes
use\_sockets yes
unregistered\_only
# redirect\_port tcp insideIP:2300-2399 3300-3399  \# zakres portów
redirect\_port udp 192.168.51.103:7777 7777

## DNS

W Uniksach wpisy DNS są poprawne dla wszystkich interfejsów i są przechowywane w /etc/resolv.conf. Domena, do której należy host jest również przechowywana w tym pliku. Minimalną konfiguracja jest:

nameserver 78.31.70.238
search sleepyowl.net intern.lab
domain sleepyowl.net

Sprawdź domenę nazw za pomocą:

\# hostname -d                        \# tak samo jak dnsdomainname

### Windows

W Windows DNS jest konfigurowany dla interfejsu. Aby wyświetlić konfigurację DNS lub wyczyścić cache DNS:

\# ipconfig /?                        \# Wyświetla pomoc
# ipconfig /all                      \# Pokazuje wszystkie informacje w tym DNS
# ipconfig /flushdns                 \# Czyści cache DNS

### Przekazywanie zapytań

W testowaniu ustawień DNS dig jest twoim przyjacielem. Na przykład publiczny serwer DNS `213.133.105.2 ns.second-ns.de` może być użyty do testów. Zobacz od jakiego serwera klient otrzymuje odpowiedź (uproszczoną odpowiedź).

\# dig sleepyowl.net
sleepyowl.net.          600     IN      A       78.31.70.238
;; SERVER: 192.168.51.254#53(192.168.51.254)

Ruter 192.168.51.254 odpowiedział i odpowiedź jest we wpisie A. Każdy wpis może być odpytany a serwer DNS może być wskazany za pomocą @:

\# dig MX google.com
# dig @127.0.0.1 NS sun.com          \# Aby sprawdzić lokalny serwer
# dig @204.97.212.10 NS MX heise.de  \# Odpytanie zewnętrznego serwera
# dig AXFR @ns1.xname.org cb.vu      \# Pobranie całej strefy (transfer strefy)

Program host jest również potężny.

\# host -t MX cb.vu                   \# Pobranie wpisu poczty MX
# host -t NS -T sun.com              \# Pobranie rekordu NS poprzez połączenie TCP
# host -a sleepyowl.net              \# Pobranie wszystkiego

### Zapytania zwrotne

Znajdź nazwę należącą do adresu IP (in-addr.arpa.). Można to zrobić za pomocą `dig`, `host` oraz `nslookup`:

\# dig -x 78.31.70.238
# host 78.31.70.238
# nslookup 78.31.70.238

### /etc/hosts

Pojedynczy host może być skonfigurowany w pliku /etc/hosts zamiast lokalnego uruchamiania `named` w celu rozwiązywania nazw hostów. Format pliku jest prosty, np.:

78.31.70.238   sleepyowl.net   sleepyowl

Priorytet rozwiązywania nazw pomiędzy DNS a hosts może być skonfigurowany w `/etc/nsswitch.conf` i /etc/host.conf. Plik ten istnieje również w Windows, zazwyczaj w:

C:\\WINDOWS\\SYSTEM32\\DRIVERS\\ETC

## DHCP

### Linux

Niektóre dystrybucje (SUSE) używają dhcpcd jako klienta. Domyślnym interfejsem jest eth0.

\# dhcpcd -n eth0           \# Spowodowanie odnowienia (nie zawsze działa)
# dhcpcd -k eth0           \# zwolnienie i wyłączenie

Pełne informacje o dzierżawie są przechowywane w:

/var/lib/dhcpcd/dhcpcd-eth0.info

### FreeBSD

FreeBSD (i Debian) używają dhclient. Aby skonfigurować interfejs (np. bge0) uruchom:

\# dhclient bge0

Pełne informacje o dzierżawie są przechowywane w:

/var/db/dhclient.leases.bge0

Użyj

/etc/dhclient.conf

aby wstawić opcje lub wymusić inne opcje:

\# cat /etc/dhclient.conf
interface "rl0" {
    prepend domain-name-servers 127.0.0.1;
    default domain-name "sleepyowl.net";
    supersede domain-name "sleepyowl.net";
}

### Windows

Dzierżawa dhcp może być odnowiona za pomocą `ipconfig`:

\# ipconfig /renew          \# odnowienie wszystkich interfejsów
# ipconfig /renew LAN      \# odnowienie interfejsu o nazwie "LAN"
# ipconfig /release WLAN   \# zwolnienie interfejsu o nazwie "WLAN"

Tak, nazywanie interfejsów prostymi nazwami to dobry pomysł!

## Analiza ruchu

[Bmon](http://people.suug.ch/~tgr/bmon/)http://people.suug.ch/~tgr/bmon/ jest małym konsolowym programem do monitorowania pasma, który może wyświetlać przepływ danych na różnych interfejsach.

### Nasłuchiwanie za pomocą tcpdump

\# tcpdump -nl -i bge0 not port ssh and src \\(192.168.16.121 or 192.168.16.54\\)
# tcpdump -n -i eth1 net 192.168.16.121           \# wskazanie ruchu do i z pojedynczego adresu IP
# tcpdump -n -i eth1 net 192.168.16.0/24          \# wskazanie ruchu do i z sieci
# tcpdump -l > dump && tail -f dump               \# Buforowane wyjście
# tcpdump -i rl0 -w traffic.rl0                   \# Zapis nagłówków ruchu do binarnego pliku
# tcpdump -i rl0 -s 0 -w traffic.rl0              \# Zapis ruchu + dane w binarnym pliku
# tcpdump -r traffic.rl0                          \# Czytanie z pliku (również ethreal)
# tcpdump port 80                                 \# Dwa klasyczne polecenia
# tcpdump host google.com
# tcpdump -i eth0 -X port \\(110 or 143\\)          \# Sprawdzenie czy pop i imap są zabezpieczone
# tcpdump -n -i eth0 icmp                         \# Przechwytuje tylko ping
# tcpdump -i eth0 -s 0 -A port 80 | grep GET      \# -s 0 dla pełnych pakietów -A dla ASCII

Dodatkowe ważne opcje:

-   `-A`     Drukuje każdy pakiet czystym tekstem (bez nagłówków)
-   `-X`     Drukuje pakiety w zapisie heksadecymalnym i ASCII
-   `-l`     Buforuje linie wyjścia
-   `-D`     Drukuje wszystkie dostępne interfejsy

W Windows używaj windump z [www.winpcap.org](http://www.winpcap.org/). Użyj windump -D aby wyświetlić listę interfejsów.

### Skanowanie za pomocą nmap

[Nmap](http://insecure.org/nmap/)http://insecure.org/nmap/ jest skanerem portów pozwalającym na detekcję systemów, zazwyczaj jest instalowany na większości dystrybucji, jest również dostępny dla Windows. Jeżeli nie przeskanujesz swojego serwera, hakerzy zrobią to za ciebie...

\# nmap cb.vu               \# skanuje wszystkie zarezerwowane porty na hoście
# nmap -sP 192.168.16.0/24 \# Sprawdza które adresy IP w sieci są użyte i przez jakie hosty
# nmap -sS -sV -O cb.vu    \# Wykonuje skanowanie typu stealth SYN połączone z detekcją systemu
PORT      STATE  SERVICE             VERSION
22/tcp    open   ssh                 OpenSSH 3.8.1p1 FreeBSD-20060930 (protocol 2.0)
25/tcp    open   smtp                Sendmail smtpd 8.13.6/8.13.6
80/tcp    open   http                Apache httpd 2.0.59 ((FreeBSD) DAV/2 PHP/4.
\[...\]
Running: FreeBSD 5.X
Uptime 33.120 days (since Fri Aug 31 11:41:04 2007)

Innymi niestandardowymi lecz użytecznymi narzędziami są `hping` (www.hping.org) analizator i generator pakietów oraz `fping` (fping.sourceforge.net). fping może sprawdzić wiele hostów.

## Kontrola ruchu (QoS)

Kontrola ruchu zarządza kolejkowaniem, politykami, harmonogramami i innymi parametrami ruchu w sieci. Poniższe przykłady są prostymi praktycznymi sposobami użycia Linuksa i FreeBSD w celu lepszego wykorzystania dostępnego pasma.

### Ograniczanie wysyłania danych

Modemy kablowe lub DSL dysponują długą kolejką w celu podniesienia przepustowości wysyłania danych. Jednakże wysycenie kolejki przez szybkie urządzenie (np. Ethernet) dramatycznie obniża interaktywność łącza. Z tego względu przydatne staje się ograniczenie prędkości urządzenia do fizycznych możliwości modemu, wpływa to znacząco na zwiększenie poziomu interaktywności. Ustaw około 90% maksymalnej prędkości modemu.

#### Linux

Dla modemu o prędkości wysyłania 512 Kbit.

\# tc qdisc add dev eth0 root tbf rate 480kbit latency 50ms burst 1540
# tc -s qdisc ls dev eth0                         \# Status
# tc qdisc del dev eth0 root                      \# Usunięcie kolejki
# tc qdisc change dev eth0 root tbf rate 220kbit latency 50ms burst 1540

#### FreeBSD

FreeBSD używa `dummynet` jako mechanizmu kształtowania ruchu, konfiguruje się go przez ipfw. Do ograniczania przepustowości (w jednostkach \[K|M\]{bit/s|Byte/s}) używa się potoków, 0 oznacza brak limitów. Użycie tego samego potoku powoduje zmianę jego konfiguracji. Na przykład ograniczenie ruchu wychodzącego do 500Kbit.

\# kldload dummynet                                \# załadowanie modułu, jeśli jest potrzebny
# ipfw pipe 1 config bw 500Kbit/s                 \# stworzenie potoku z ograniczeniem przepustowości
# ipfw add pipe 1 ip from me to any               \# skierowanie ruchu wychodzącego do potoku

### Jakość usług (QoS)

#### Linux

Określanie priorytetów w kolejce za pomocą `tc` w celu optymalizacji VoIP. Zobacz pełen przykład na [voip-info.org](http://www.voip-info.org/wiki-QoS+Linux+with+HFS) lub [www.howtoforge.com](http://www.howtoforge.com/voip_qos_traffic_shaping_iproute2_asterisk). Przypuśćmy, że VoIP używa portów udp 10000:11024 oraz urządzenia eth0 (może to być również ppp0 lub inne). Poniższe polecenia definiują QoS dla trzech kolejek i wymuszają ruch VoIP dla pierwszej kolejki z QoS `0x1e` (wszystkie bity ustawione). Domyślny ruch jest kierowany do kolejki trzeciej, a pakiety z QoS ustawionym na _Minimize-Delay_ do kolejki drugiej.

\# tc qdisc add dev eth0 root handle 1: prio priomap 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 0
# tc qdisc add dev eth0 parent 1:1 handle 10: sfq
# tc qdisc add dev eth0 parent 1:2 handle 20: sfq
# tc qdisc add dev eth0 parent 1:3 handle 30: sfq
# tc filter add dev eth0 protocol ip parent 1: prio 1 u32 \\
  match ip dport 10000 0x3C00 flowid 1:1          \# użycie zakresu portów serwera
  match ip dst 123.23.0.1 flowid 1:1              \# lub/i użycie adresu IP serwera

Status usunięcie za pomocą

\# tc -s qdisc ls dev eth0                         \# status kolejki
# tc qdisc del dev eth0 root                      \# skasowanie całego QoS

#### Określanie zakresu portów i maski

Filtr tc definiuje zakresy portów za pomocą portów i masek, które musisz określić. Znajdź potęgę 2^N dla wartości górnego zakresu portów, określ zakres i skonwertuj go na HEX. To twoja maska. Przykład dla 10000 -> 11024, zakres wynosi 1024.

\# 2^13 (8192) < 10000 < 2^14 (16384)              \# potęga 2^14 = 16384
# echo "obase=16;(2^14)-1024" | bc                \# maska wynosi 0x3C00

#### FreeBSD

Prędkość łącza wynosi 500Kbit/s i definiujemy 3 kolejki z priorytetami 100:10:1 dla VoIP:ssh:reszty.

\# ipfw pipe 1 config bw 500Kbit/s 
# ipfw queue 1 config pipe 1 weight 100
# ipfw queue 2 config pipe 1 weight 10
# ipfw queue 3 config pipe 1 weight 1
# ipfw add 10 queue 1 proto udp dst-port 10000-11024
# ipfw add 11 queue 1 proto udp dst-ip 123.23.0.1 \# lub/i użycie adresu IP serwera
# ipfw add 20 queue 2 dsp-port ssh
# ipfw add 30 queue 3 from me to any              \# cała reszta

Status and remove with

\# ipfw list                                       \# status reguł
# ipfw pipe list                                  \# status potoków
# ipfw flush                                      \# usuwa wszystkie reguły poza domyślnymi

## Debugowanie NIS

Niektóre polecenie, które powinny działać na dobrze skonfigurowanym kliencie NIS:

\# ypwhich                  \# zwraca nazwę serwera NIS, z którym jest połączony
# domainname               \# Nazwa domeny NIS, którą skonfigurowano
# ypcat group              \# powinno wyświetlić grupę z serwera NIS
# cd /var/yp && make       \# Przebudowuje bazę danych yp

Czy ypbind działa?

\# ps auxww | grep ypbind
/usr/sbin/ypbind -s -m -S servername1,servername2	\# FreeBSD
/usr/sbin/ypbind           \# Linux
# yppoll passwd.byname
Map passwd.byname has order number 1190635041. Mon Sep 24 13:57:21 2007
The master server is servername.domain.net.

### Linux

\# cat /etc/yp.conf
ypserver servername
domain domain.net broadcast

## Netcat

[Netcat](http://netcat.sourceforge.net/)http://netcat.sourceforge.net (nc) lepiej znany jako "sieciowy szwajcarski scyzoryk", może manipulować, tworzyć lub pisać/czytać połączenia TCP/IP. Oto kilka przydatnych przykładów, w sieci jest ich dużo więcej, na przykład [g-loaded.eu\[...\]](http://www.g-loaded.eu/2006/11/06/netcat-a-couple-of-useful-examples)http://www.g-loaded.eu/2006/11/06/netcat-a-couple-of-useful-examples lub [tu](http://www.terminally-incoherent.com/blog/2007/08/07/few-useful-netcat-tricks)http://www.terminally-incoherent.com/blog/2007/08/07/few-useful-netcat-tricks.  
Być może będziesz musiał użyć polecenia `netcat` zamiast `nc`. Sprawdź również podobne polecenie [socat](http://www.dest-unreach.org/socat).

### Transfer pliku

Kopiowanie dużego katalogu poprzez surowe połączenie tcp. Transfer jest bardzo szybki (brak obciążeń protokołów) i nie musisz grzebać się w NFS, SMB czy FTP, zwyczajnie udostępniasz plik na serwerze i dostajesz go na kliencie. Tutaj 192.168.1.1 jest adresem serwera.

server# tar -cf - -C VIDEO\_TS . | nc -l -p 4444         \# Udostępnienie zarchiwizowanego katalog na port 4444
client# nc 192.168.1.1 4444 | tar xpf - -C VIDEO\_TS     \# Odebranie pliku na porcie 4444
server# cat largefile | nc -l 5678                      \# Udostępnienie pojedynczego pliku
client# nc 192.168.1.1 5678 > largefile                 \# Odebranie pojedynczego pliku
server# dd if=/dev/da0 | nc -l 4444                     \# Udostępnienie obrazu partycji
client# nc 192.168.1.1 4444 | dd of=/dev/da0            \# Odebranie obrazu partycji do sklonowania
client# nc 192.168.1.1 4444 | dd of=da0.img             \# Odebranie obrazu partycji do pliku

### Inne hacki

Tutaj szczególnie musisz wiedzieć co robisz.

#### Zdalny dostęp do powłoki

Opcja -e tylko na wersji Windows? Lub użyj [nc 1.10](http://download.insecure.org/stf/nc110.tgz).

\# nc -lp 4444 -e /bin/bash                        \# Udostępnia zdalnie powłokę (backdoor na serwerze)
# nc -lp 4444 -e cmd.exe                          \# zdalna powłoka dla Windows

#### Ratunkowy serwer web

Udostępnienie pojedynczego pliku w pętli na porcie 80.

\# while true; do nc -l -p 80 < unixtoolbox.xhtml; done

#### Chat

Alice i Bob mogą rozmawiać poprzez gniazdo TCP. Tekst jest przesyłany po wciśnięciu klawisza enter.

alice# nc -lp 4444
bob  # nc 192.168.1.1 4444

## SSH SCP

[Klucz publiczny](#publickey) | [Odcisk palca (fingerprint)](#sshfingerprint) | [SCP](#scp) | [Tunelowanie](#sshtunnel)

## Uwierzytelnianie kluczem publicznym

Połączenie do hosta bez posługiwania się hasłem, z wykorzystaniem klucza publicznego. Chodzi o to, aby dodać swój klucz publiczny do pliku authorized\_keys na zdalnym hoście. W tym przykładzie **połączmy _host-klient_ do _host-serwer_**, klucz jest generowany na kliencie.

-   Użyj ssh-keygen aby wygenerować parę kluczy. `~/.ssh/id_dsa` jest kluczem prywatnym, `~/.ssh/id_dsa.pub` jest kluczem publicznym.
-   Skopiuj tylko klucz publiczny na serwer i dodaj go do pliku `~/.ssh/authorized_keys` na serwerze.

\# ssh-keygen -t dsa -N ''
# cat ~/.ssh/id\_dsa.pub | ssh you@host-server "cat - >> ~/.ssh/authorized\_keys"

### Używanie klienta ssh dla Windows z ssh.com

Nie komercyjna wersja klienta ssh.com może być pobrana ze strony [ftp.ssh.com/pub/ssh/](http://ftp.ssh.com/pub/ssh/). Klucze generowane przez klienta ssh.com muszą zostać skonwertowane dla serwera OpenSSH. Można to zrobić poleceniem ssh-keygen.

-   Stwórz parę kluczy za pomocą klienta ssh.com: Ustawienia - Uwierzytelnianie użytkownika - Generuj nowy....
-   Używam typu klucza DSA; długość klucza 2048.
-   Skopiuj klucz publiczny wygenerowany przez klienta ssh.com na serwer do katalogu ~/.ssh
-   Klucze znajdują się w C:\\Documents and Settings\\%USERNAME%\\Application Data\\SSH\\UserKeys.
-   Użyj polecenia ssh-keygen na serwerze do przekonwertowania klucza:
    
    \# cd ~/.ssh
    # ssh-keygen -i -f keyfilename.pub >> authorized\_keys2
    

_Wskazówka:_ Użyliśmy klucza DSA, możliwe jest także użycie klucza RSA. Klucz nie jest chroniony hasłem.

### Używanie putty dla Windows

[Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html jest prostym i darmowym klientem ssh dla Windows.

-   Stwórz parę kluczy za pomocą programu puTTYgen.
-   Zapisz publiczny i prywatny klucz (np. w C:\\Documents and Settings\\%USERNAME%\\.ssh).
-   Skopiuj publiczny klucz na serwer do katalogu ~/.ssh:
    
    \# scp .ssh/puttykey.pub [\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection):.ssh/
    
-   Użyj polecenia ssh-keygen na serwerze do przekonwertowania klucza do OpenSSH:
    
    \# cd ~/.ssh
    # ssh-keygen -i -f puttykey.pub >> authorized\_keys2
    
-   Wskaż lokalizację prywatnego klucza w ustawieniach putty: Connection - SSH - Auth

## Sprawdzanie odcisku

Podczas pierwszego logowania ssh zapyta czy dodać odcisk nieznanego hosta do przechowywanej listy znanych hostów. Aby zapobiec atakom typu man-in-the-middle administrator serwera może przesłać ci odcisk serwera, który jest porównywany w czasie pierwszego logowania. Użyj `ssh-keygen -l` do wygenerowania odcisku (na serwerze):

\# ssh-keygen -l -f /etc/ssh/ssh\_host\_rsa\_key.pub      \# Dla klucza RSA
2048 61:33:be:9b:ae:6c:36:31:fd:83:98:b7:99:2d:9f:cd /etc/ssh/ssh\_host\_rsa\_key.pub
# ssh-keygen -l -f /etc/ssh/ssh\_host\_dsa\_key.pub      \# Dla klucza DSA (domyślne)
2048 14:4a:aa:d9:73:25:46:6d:0a:48:35:c7:f4:16:d4:ee /etc/ssh/ssh\_host\_dsa\_key.pub

Teraz klient łączący się z tym serwerem może zweryfikować czy łączy się z właściwym serwerem:

\# ssh linda
The authenticity of host 'linda (192.168.16.54)' can't be established.
DSA key fingerprint is 14:4a:aa:d9:73:25:46:6d:0a:48:35:c7:f4:16:d4:ee.
Are you sure you want to continue connecting (yes/no)? yes

## Bezpieczne przesyłanie plików

Kilka prostych poleceń:

\# scp file.txt host-two:/tmp
# scp joe@host-two:/www/\*.html /www/tmp
# scp -r joe@host-two:/www /www/tmp

W Konqueror lub Midnight Commander istnieje możliwość uzyskania dostępu do zdalnych systemów plików za pomocą adresów **fish://user@gate**. Jednak ta implementacja jest bardzo wolna.  
Co więcej, jest możliwe montowanie zdalnych katalogów za pomocą **sshfs** klienta systemu plików bazującego na SCP. [Zobacz fuse sshfs](http://fuse.sourceforge.net/sshfs.html)http://fuse.sourceforge.net/sshfs.html.

## Tunelowanie

Tunelowanie SSH pozwala na przekierowywanie lub zwrotne przekierowywanie portów poprzez połączenie SSH, a tym samym zabezpieczanie ruchu i dostępu do portów, które w przeciwnym razie byłyby zablokowane. Działa tylko z TCP. Ogólna nomenklatura dla przekierowywania (patrz także [przykłady ssh i NAT](#sshnat)):

\# ssh -L localport:desthost:destport user@gate  \# host docelowy widziany z bramy
# ssh -R destport:desthost:localport user@gate  \# przekaż port lokalny na docelowy
# ssh -X user@gate   \# przekierowanie serwera X

Powyższe służy nawiązaniu połączenia z bramą i przekierowaniu lokalnych portów do hosta hostdocelowy:portdocelowy. Hostdocelowy jest adresem hosta _widzianym przez bramę_, więc jeżeli połączenie jest do bramy, hostdocelowy to localhost. Możliwe jest przekierowywanie więcej niż jednego portu.

### Bezpośrednie przekierowywanie na bramę

Powiedzmy, że chcemy uzyskać dostęp do CVS (port 2401) i http (port 80), które są uruchomione na bramie. Jest to najprostszy przykład, hostdocelowy to localhost, a my użyjemy lokalnie portu 8080 zamiast 80, tak aby nie było potrzeby korzystania z uprawnień root. Kiedy sesja ssh jest nawiązana, oba serwisy są dostępne na lokalnych portach.

\# ssh -L 2401:localhost:2401 -L 8080:localhost:80 user@gate

### Netbios i zdalny pulpit przekierowane na drugi serwer

Powiedzmy, że serwer Windows (smb) jest za bramą i nie ma działającego ssh. Potrzebujemy dostęp do udziałów smb oraz zdalnego pulpitu na tym serwerze.

\# ssh -L 139:smbserver:139 -L 3388:smbserver:3389 user@gate

Udział smb może być teraz dostępny za pomocą \\\\172.0.0.1 ale tylko wówczas, gdy lokalne udostępnianie jest wyłączone, powodem tego jest fakt, że _lokalne udostępnianie nasłuchuje na porcie 139_  
Jest możliwe pozostawienie lokalnego udostępniani udziałów, dla tego celu musimy stworzyć nowe wirtualne urządzenie z nowym adresem IP do tunelu, udział smb będzie połączony za pomocą tego adresu. Ponadto _lokalne RDP już słucha na porcie 3389_, tak więc wybieramy 3388. Dla tego przykładu użyjmy wirtualnego adresu IP 10.1.1.1

-   W putty użyj Source Port=10.1.1.1:139. Jest możliwe tworzenie wielu urządzeń i tuneli. U mnie, Windows 2000, działa tylko putty. Na Windows Vista trzeba przekierować dodatkowo, poza 139, także port 445. Na Vista poprawka KB942624 zapobiega możliwości przekierowanie portu 445, tak więc musiałem odinstalować tą poprawkę
-   W kliencie ssh.com, wyłącz "Allow local connections only". Ponieważ ssh.com przypisuje ustawienia do wszystkich adresów, może być podłączony tylko jeden zasób.

Stwórz interfejs loopback z adresem IP 10.1.1.1:

-   \# System->Panel sterowania->Dodaj sprzęt # Tak, urządzenie zostało już podłączone # Dodaj nowe urządzenie sprzętowe (na dole).
-   \# Zainstaluj sprzęt, który wybiorę ręcznie z listy # Karty sieciowe # Microsoft, Karta Microsoft Loopback.
-   Skonfiguruj adres IP urządzenia na 10.1.1.1 maska 255.255.255.0, bez bramy.
-   Zaawansowane->WINS, Włącz wyszukiwanie LMHOSTS; Wyłącz system NetBIOS poprzez TCP/IP.
-   \# Włącz Klient sieci Microsoft Networks. # Wyłącz Udostępnianie plików i drukarek w sieciach Microsoft Networks.

Musiałem zresetować system aby te ustawienia zaczęły działać. Teraz połącz się do udziału smb za pomocą \\\\10.1.1.1 i zdalnego pulpitu za pomocą 10.1.1.1:3388.

#### Debugowanie

Jeżeli to nie działa:

-   Czy porty są przekierowane: netstat -an? Szukaj 0.0.0.0:139 lub 10.1.1.1:139
-   Czy telnet 10.1.1.1 139 nawiązuje połączenie?
-   Musisz zaznaczyć checkbox "Local ports accept connections from other hosts" w putty.
-   Czy "Udostępnianie plików i drukarek w sieciach Microsoft Network" jest wyłączone dla interfejsu loopback?

### Połączenie dwóch klientów za NAT

Załóżmy, że dwaj klienci są za bramą z NAT, klient cliadmin musi połączyć się z klientem cliuser (cel), obaj mogą zalogować się do bramy za pomocą ssh i mają uruchomione sshd na Linux. Nie potrzebujesz nigdzie uprawnień użytkownika root tak długo do puki porty na bramie będą powyżej 1024. Używamy portu 2022 na bramie. Ponadto, ponieważ brama jest używana lokalnie, opcja GatewayPorts nie jest konieczna.  
Na kliencie cliuser (z celu do bramy):

\# ssh -R 2022:localhost:22 user@gate            \# przekieruj port 22 klienta na bramę:2022

Na kliencie cliadmin (z hosta do bramy):

\# ssh -L 3022:localhost:2022 admin@gate         \# przekieruj port klienta 3022 na bramę:2022

Teraz admin może połączyć się bezpośrednio z klientem cliuser za pomocą:

\# ssh -p 3022 admin@localhost                   \# local:3022 -> gate:2022 -> client:22

### Połączenie do VNC za NAT

Załóżmy, że windowsowy klient z VNC nasłuchującym na porcie 5900 musi być dostępny z poza NAT. Na kliencie cliwin do bramy:

\# ssh -R 15900:localhost:5900 user@gate

Na kliencie cliadmin (z hosta do bramy):

\# ssh -L 5900:localhost:15900 admin@gate

Teraz admin może połączyć się bezpośrednio z klientem VNC za pomocą:

\# vncconnect -display :0 localhost

### Tworzenie wieloelementowego tunelu ssh

Załóżmy, że nie możesz połączyć się ze swoim serwerem za pomocą ssh bezpośrednio, tylko poprzez wiele pośredniczących hostów (np. ze względu na routing). Czasami mimo wszystko jest potrzebne bezpośrednie połączenie klienta z serwerem, np. aby skopiować pliki za pomocą scp lub przekierować inne porty takie jak smb czy vnc. Jednym ze możliwych rozwiązań jest połączenie razem tuneli tak, aby przekierowywać porty do serwera poprzez wszystkie pośredniczące systemy. Taki port "przenoszący" osiąga swój cel w ostatnim połączeniu do serwera.  
Załóżmy, że chcemy przekierować ssh od klienta do serwera poprzez dwa inne systemy (dwa "hopy"). Kiedy tunel jest zbudowany, jest możliwe połączenie do serwer bezpośrednio z klienta (a także dodanie innego portu do przekierowania).

#### Tworzenie tunelu w jednej powłoce

klient -> host1 -> host2 -> serwer i tunel 5678

klient>\# ssh -L5678:localhost:5678 host1        \# 5678 jest arbitralnym portem tunelu
host\_1>\# ssh -L5678:localhost:5678 host2        \# łańcuch 5678 z hosta1 do hosta2
host\_2>\# ssh -L5678:localhost:22 server         \# koniec tunelu na porcie 22 serwera

#### Użycie tunelu z innym portem w innej powłoce

klient -> serwer używający tunelu 5678

\# ssh -p 5678 localhost                         \# bezpośrednie połączenie z klienta na serwer
# scp -P 5678 myfile localhost:/tmp/            \# lub bezpośrednie kopiowanie pliku za pomocą tunelu
# rsync -e 'ssh -p 5678' myfile localhost:/tmp/ \# lub bezpośredni rsync pliku na serwer

## VPN z SSH

Od wersji 4.3 OpenSSH może używać urządzeń tun/tap do szyfrowania tunelu. Jest to bardzo podobne do innych rozwiązań VPN bazujących na TLS np. OpenVPN. Jedną z zalet użycia SSH jest to, że nie ma potrzeby instalowania i konfigurowania dodatkowego oprogramowania. Dodatkowo tunel jako uwierzytelniania używa współdzielonych kluczy SSH. Minusem jest to, że pakiety są enkapsulowane w TCP, co może powodować niską wydajność na słabych łączach. Dodatkowo tunel działa na jednym (kruchym) połączeniu TCP. Ta technika jest bardzo przydatna do szybkiego zestawienia VPN bazującego na IP. Nie ma ograniczeń co do przekierowywanych portów TCP, wszystkie protokoły warstw 3 i 4 jak ICMP, TCP/UDP itd. są przekierowywane przez VPN. W każdym przypadku następujące opcje są wymagane w pliku sshd\_conf:

PermitRootLogin yes
PermitTunnel yes

## Pojedyncze połączenie P2P

Mamy do czynienia z połączeniem dwóch hostów, hclient i hserver za pomocą tunelu P2P. Połączenie jest _inicjowane przez hclinet_ do hserver i jest realizowane przez użytkownika root. Końcami tunelu są 10.0.1.1 (serwer) i 10.0.1.2 (klient), tworzymy urządzenie tun5 (może to być również inny numer). Procedura jest bardzo prosta:

-   Połączenie SSH z użyciem tunelu, opcja -w.
-   Konfiguracja adresów IP tunelu. Jeden po stronie serwera i drugi po stronie klienta.

### Połączenie do serwera

Połączenie uruchamiane na kliencie i polecenie wykonane na serwerze.

#### Serwer jest na Linuksie

cli># ssh -w5:5 root@hserver
srv># ifconfig tun5 10.0.1.1 netmask 255.255.255.252   \# Wykonane w powłoce serwera

#### Serwer jest na FreeBSD

cli># ssh -w5:5 root@hserver
srv># ifconfig tun5 10.0.1.1 10.0.1.2                  \# Wykonane w powłoce serwera

### Konfiguracja klienta

Polecenie wykonane na kliencie:

cli># ifconfig tun5 10.0.1.2 netmask 255.255.255.252   \# Klient jest na Linuksie
cli># ifconfig tun5 10.0.1.2 10.0.1.1                  \# Klient jest na FreeBSD

Dwa hosty są teraz połączone i mogą przeźroczyście komunikować się w dowolnym protokole warstw 3 i 4 używając adresów IP tunelu.

## Połączenie dwóch sieci

Jako uzupełnienie konfiguracji P2P, jest dużo praktyczniej połączyć dwie prywatne sieci za pomocą SSH VPN używając dwóch bram. Załóżmy dla przykładu siećA 192.168.51.0/24 i siećB 192.168.16.0/24. Procedura jest podobna do poprzedniej, będziemy musieli tylko dodać ruting. NAT musi być aktywny na prywatnych interfejsach tylko, jeżeli bramy nie są takie same jak domyślne bramy tych sieci.  
192.168.51.0/24 (siećA)|bramaA <-> bramaB|192.168.16.0/24 (siećB)

-   Połączenie SSH z użyciem tunelu, opcja -w.
-   Konfiguracja adresów IP tunelu. Jeden po stronie serwera i drugi po stronie klienta.
-   Dodanie rutingu do dwóch sieci.
-   Jeżeli potrzebne, aktywowanie NAT na prywatnych interfejsach bram.

Konfiguracja _zaczyna się od bramyA w sieciA_.

### Połączenie z sieciA do sieciB

Połączenie jest uruchamianie z sieciA a polecenia są wykonywane na bramieB.

#### bramaB jest na Linuksie

gateA># ssh -w5:5 root@gateB
gateB># ifconfig tun5 10.0.1.1 netmask 255.255.255.252 \# Wykonane w powłoce bramyB
gateB># route add -net 192.168.51.0 netmask 255.255.255.0 dev tun5
gateB># echo 1 > /proc/sys/net/ipv4/ip\_forward        \# Potrzebne tylko wówczas, jeżeli nie jest domyślną bramą
gateB># iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

#### bramaB jest na FreeBSD

gateA># ssh -w5:5 root@gateB                          \# Tworzy urządzenie tun5
gateB># ifconfig tun5 10.0.1.1 10.0.1.2               \# Wykonane w powłoce bramyB
gateB># route add 192.168.51.0/24 10.0.1.2
gateB># sysctl net.inet.ip.forwarding=1               \# Potrzebne tylko wówczas, jeżeli nie jest domyślną bramą
gateB># natd -s -m -u -dynamic -n fxp0                \# zobacz [NAT](#nat)
gateA># sysctl net.inet.ip.fw.enable=1

### Konfiguracja bramyA

Polecenia wykonywane na bramaA:

#### bramaA jest na Linuksie

gateA># ifconfig tun5 10.0.1.2 netmask 255.255.255.252
gateA># route add -net 192.168.16.0 netmask 255.255.255.0 dev tun5
gateA># echo 1 > /proc/sys/net/ipv4/ip\_forward
gateA># iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

#### bramaA jest na FreeBSD

gateA># ifconfig tun5 10.0.1.2 10.0.1.1
gateA># route add 192.168.16.0/24 10.0.1.2
gateA># sysctl net.inet.ip.forwarding=1
gateA># natd -s -m -u -dynamic -n fxp0                \# zobacz [NAT](#nat)
gateA># sysctl net.inet.ip.fw.enable=1

Dwie prywatne sieci są teraz przeźroczyście połączone poprzez SSH VPN. Przekierowanie IP i NAT są potrzebne tylko wtedy, jeżeli bramy nie są domyślnymi bramami. W takim przypadku klienci nie wiedzą gdzie przekierowywać odpowiedzi i dlatego NAT musi być aktywowany.

## RSYNC

Rsync może niemal całkowicie zastąpić cp i scp, co więcej przerwane transfery są efektywnie wznawiana. Wprowadzający ukośnik (lub jego brak) mają różne znaczenia, podręcznik man jest dobry... Oto kilka przykładów:  
Kopiowanie katalogów z pełną zawartością:

\# rsync -a /home/colin/ /backup/colin/
# rsync -a /var/ /var\_bak/
# rsync -aR --delete-during /home/user/ /backup/      \# użyj względnej ścieżki (patrz niżej)

Tak samo jak wcześniej ale poprzez sieć z kompresją. Rsynd używa domyślnie SSH do transferu i użyje kluczy ssh jeżeli te będą zastosowane. Użyj ":" jak w SCP. Typowe zdalne kopiowanie:

\# rsync -axSRzv /home/user/ user@server:/backup/user/

Wykluczenie każdego katalogu tmp wewnątrz /home/user/ i zatrzymanie hierarchii katalogów, zdalny katalog będzie miał strukturę /backup/home/user/. To typowe użycie dla kopii zapasowych.

\# rsync -azR --exclude /tmp/ /home/user/ user@server:/backup/

Użycie portu 20022 dla połaczenia ssh:

\# rsync -az -e 'ssh -p 20022' /home/colin/ user@server:/backup/colin/

Użycie demona rsync (użycie z "::") jest znaczeni szybsze, lecz nie szyfrowanie przez ssh. Położenie /backup jest definiowane w konfiguracji w /etc/rsyncd.conf. Zmienna RSYNC\_PASSWORD może być ustawiona aby uniknąć potrzeby ręcznego wprowadzania hasła.

\# rsync -axSRz /home/ ruser@hostname::rmodule/backup/
# rsync -axSRz ruser@hostname::rmodule/backup/ /home/    \# Aby skopiować z powrotem

Niektóre ważne opcje:

-   `-a, --archive`       tryb archiwum; to samo co -rlptgoD (nie -H)
-   `-r, --recursive`       rekursywnie w katalogach
-   `-R, --relative`       używa względnych nazw ścieżek
-   `-H, --hard-links`       zachowuje twarde dowiązania
-   `-S, --sparse`       obsługuje efektywnie rzadkie pliki (sparse files)
-   `-x, --one-file-system`       nie przekracza granic systemu pików
-   `--exclude=WZORZEC`       wyłącza pliki pasujące do WZORCA
-   `--delete-during`       odbiorca usuwa pliki w trakcie transferu, nie przed
-   `--delete-after`       odbiorca usuwa pliki po transferze, nie przed

## Rsync on Windows

Rsync jest dostępny dla Windows poprzez cygwin lub jako samodzielny pakiet w [cwrsync](http://sourceforge.net/projects/sereds/)http://sourceforge.net/projects/sereds. Bo bardzo wygodny sposób na zautomatyzowane kopie zapasowe. Zainstaluje jeden z nich (_nie dwa_) i dodaj ścieżkę do ścieżek systemowych Windows # Panel sterowania -> System -> zakładka Zaawansowane, przycisk Zmienne środowiskowe. Edytuj zmienną systemową "Path" i dodaj pełną ścieżkę do zainstalowanego rsync, np. C:\\Program Files\\cwRsync\\bin lub c:\\cygwin\\bin. W ten sposób polecenie `rsync` i `ssh` będą dostępne w powłoce Windows.

### Uwierzytelnianie za pomocą kluczy publicznych

Rsync jest automatycznie tunelowany przez SSH i dlatego używa uwierzytelniania SSH na serwerze. Automatyczne kopie zapasowe mają na celu unikanie interakcji z użytkownikiem, z tego powodu można użyć uwierzytelniania za pomocą kluczy publicznych, a polecenie rsync będzie uruchamiane bez hasła.  
Wszystkie poniższe polecenie są wykonywane wewnątrz konsoli Windows. W konsoli (Start -> Uruchom -> cmd) stwórz i wyślij klucze, tak jak to zostało opisane w [SSH](#ssh), zmień "użytkownik" i "serwer" wg potrzeb. Jeżeli plik authorized\_keys2 jeszcze nie istnieje, skopiuj id\_dsa.pub do authorized\_keys2 i wyślij.

\# ssh-keygen -t dsa -N ''                   \# Tworzy publiczny i prywatny klucz
# rsync user@server:.ssh/authorized\_keys2 . \# Kopiuje plik lokalnie z serwera
# cat id\_dsa.pub >> authorized\_keys2        \# Lub użyj edytora aby dodać klucz
# rsync authorized\_keys2 user@server:.ssh/  \# Kopiuje plik z powrotem na serwer
# del authorized\_keys2                      \# Usuwa lokalną kopię

Teraz przetestuj za pomocą (w jednej linii):

rsync -rv "/cygdrive/c/Documents and Settings/%USERNAME%/My Documents/" \\
'user@server:My\\ Documents/'

### Automatyczna kopia zapasowa

Użyj pliku wsadowego aby zautomatyzować kopie zapasowe i dodaj ten plik do zaplanowanych zadań (Programy -> Akcesoria -> Narzędzia systemowe -> Zaplanowane zadania). Na przykład stwórz plik backup.bat i zmień user@server.

@ECHO OFF
REM rsync the directory My Documents
SETLOCAL
SET CWRSYNCHOME=C:\\PROGRAM FILES\\CWRSYNC
SET CYGWIN=nontsec
SET CWOLDPATH=%PATH%
REM uncomment the next line when using cygwin
SET PATH=%CWRSYNCHOME%\\BIN;%PATH%
echo Press Control-C to abort
rsync -av "/cygdrive/c/Documents and Settings/%USERNAME%/My Documents/" \\
'user@server:My\\ Documents/'
pause
