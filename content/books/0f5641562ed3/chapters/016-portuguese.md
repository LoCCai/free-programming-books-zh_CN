## Sistema

[Hardware](#hardwareinfo) | [Estatísticas](#loadstats) | [Usuários](#users) | [Limites](#limits) | [Runlevels](#runlevels) | [Senha de Root](#resetpasswd) | [Compilação de Kernel](#compilekernel) | [Reparos de Grub](#grub)

Executando kernel e a informação do sistema

\# uname -a                           \# Mostra a versão do kernel (e a versão BSD)
# lsb\_release -a                     \# Informação completa de quaisquer distribuição
# cat /etc/SuSE-release              \# Mostra a versão SuSe
# cat /etc/debian\_version            \# Mostra a versão Debian

Usa /etc/`DISTR`\-release com `DISTR=` lsb (Ubuntu), redhat, gentoo, mandrake, sun (Solaris), e assim por diante. Veja também `/etc/issue`.

\# uptime                             \# Mostra quanto tempo o sistema está executando, ou seja, quanto tempo faz que o sistema não é desligado
# hostname                           \# Mostra na tela o nome da máquina
# hostname -i                        \# Exibe o endereço IP da máquina (apenas no Linux)
# man hier                           \# Descrição da hierarquia dos arquivos no sistema
# last reboot                        \# Exibe o histórico da reinicialização do sistema

## Informação do Hardware

Hardware detectado no kernel

\# dmesg                              \# Hardware detectado e mensagens de inicialização
# lsdev                              \# Informação sobre a instalação do hardware
# dd if=/dev/mem bs=1k skip=768 count=256 2>/dev/null | strings -n 8 \# Leitura da BIOS

### Linux

\# cat /proc/cpuinfo                  \# Modelo da CPU
# cat /proc/meminfo                  \# Informação da memória
# grep MemTotal /proc/meminfo        \# Exibe a memória física
# watch -n1 'cat /proc/interrupts'   \# Relógio interrompe continuamente mutável
# free -m                            \# Mostra o ‘tamanho’ usado e livre da memória (-m para MB)
# cat /proc/devices                  \# Dispositivos configurados
# lspci -tv                          \# Mostra os dispositivos PCI
# lsusb -tv                          \# Mostra os dispositivos USB
# lshal                              \# Mostra a lista de todos os dispositivos com suas propriedades
# dmidecode                          \# Mostra DMI/SMBIOS: como a informação da BIOS

### FreeBSD

\# sysctl hw.model                    \# Mostra o modelo da CPU
# sysctl hw                          \# Mostra várias informações do hardware
# sysctl vm                          \# Memória usada
# dmesg | grep "real mem"            \# Memória do hardware
# sysctl -a | grep mem               \# Configurações e informações sobre a memória do kernel
# sysctl dev                         \# Mostra os dispositivos configurados
# pciconf -l -cv                     \# Exibe dispositivos PCI
# usbdevs -v                         \# Exibe dispositivos USB
# atacontrol list                    \# Exibe dispositivos ATA
# camcontrol devlist -v              \# Exibe dispositivos SCSI

## Load, estatísticas e mensagens

Os comandos a seguir são usados para localizar o que está acontecendo no sistema.

\# top                                \# Exibe e atualiza os processos da CPU
# mpstat 1                           \# Exibe os processos das capacidades relacionadas
# vmstat 2                           \# a capacidade da memória virtual
# iostat 2                           \# Exibe a capacidade I/O (2s intervalo)
# systat -vmstat 1                   \# Resumo da capacidade do sistema BSD (1s intervalo)
# systat -tcp 1                      \# Conexões tcp no BSD (tenta também –ip)
# systat -netstat 1                  \# Ativa as conexões de rede BSD
# systat -ifstat 1                   \# BSD tráfego de redes ativas
# systat -iostat 1                   \# BSD taxa de transferência do disco e da CPU
# tail -n 500 /var/log/messages      \# As últimas 500 linhas mensagens do registro
# tail /var/log/warn                 \# Mensagens de alerta do sistema, veja em syslog.conf

## Usuários

\# id                                 \# Exibe o id, usuário e grupo ativo
# last                               \# Exibe o ultimo usuário logado
# who                                \# Exibe o usuário logado
# groupadd admin                     \# Adiciona um grupo admin e um usuário colin (Linux/Solaris)
# useradd -c "Colin Barschel" -g admin -m colin
# usermod -a -G <group> <user>       \# Adiciona um usuário ao grupo (Debian)
# groupmod -A <user> <group>         \# Adiciona um usuário ao grupo (SuSE)
# userdel colin                      \# Exclui o usuário Colin
# adduser joe                        \# FreeBSD, adiciona o usuário ao sistema (interativamente)
# rmuser joe                         \# FreeBSD, deleta o usuário joe (interativamente)
# pw groupadd admin                  \# Usa pw no FreeBSD
# pw groupmod admin -m newmember     \# Adiciona um novo membro ao grupo
# pw useradd colin -c "Colin Barschel" -g admin -m -s /bin/tcsh 
# pw userdel colin; pw groupdel admin

Senhas criptografadas estão armazenadas no /etc/shadow nos Linux e Solaris, no FreeBSD estão localizadas no /etc/master.passwd. Se o master.passwd for modificado manualmente (deleta a senha), executa `# pwd_mkdb -p master.passwd` para repor o banco de dados.

Para prevenir amplos acessos temporários (para todos os usuários mas root) use nologin. A mensagem do nologin será Exibido (talvez não trabalha com as chaves ssh).

\# echo "Desculpe não acessa agora" > /etc/nologin       \# (Linux)
# echo "Desculpe não acessa agora" > /var/run/nologin   \# (FreeBSD)

## Limites

Algumas aplicações requerem limites superiores em arquivos abertos (como o Proxy do servidor de web, banco de dados). O limite padrão são normalmente mais baixos.

### Linux

#### Cada Shell/script

O limite do Shell é regido por um ulimit. O estado é checado com `ulimit -a`. Por exemplo, para trocar os arquivos limites dos 1024 para 10240 faça:

\# ulimit -n 10240                    \# Isso é apenas validará dentro do Shell

O comando `ulimit` pode ser usado no em um script para trocar os limites do script apenas.

#### Por usuário/processo

Acesso de aplicações e usuários podem ser configurados no `/etc/security/limits.conf`. Por exemplo:

\# cat /etc/security/limits.conf
\*   hard    nproc   250              \# Limites de processos por usuários
asterisk hard nofile 409600          \# Aplicações limites de arquivos abertos

#### Sistema amplo

Limites do kernel são ajustados sysctl. Limites permanentes são ajustados no `/etc/sysctl.conf`.

\# sysctl -a                          \# Visualiza todo o limite do sistema
# sysctl fs.file-max                 \# Visualiza o limite máximo de arquivos abertos
# sysctl fs.file-max=102400          \# Troca o limite máximo 
# echo "1024 50000" > /proc/sys/net/ipv4/ip\_local\_port\_range  #Faixa de portas
# cat /etc/sysctl.conf
fs.file-max=102400                   \# Permanece a entrada no sysctl.conf
# cat /proc/sys/fs/file-nr           \# Como muitos arquivos descritos em uso

### FreeBSD

#### Cada Shell/script

Use o comando `limits` em csh ou tcsh ou igual ao Linux, use `ulimit` no bash shell.

#### Por usuário/processo

O padrão dos limites de acesso são configurados no `/etc/login.conf`. Um valor ilimitado ainda é limitado pelo sistema de valor máximo.

#### Sistema amplo

Limites do kernel também são definidas no sysctl. Permanece os limites que são definidos no `/etc/sysctl.conf` ou `/boot/loader.conf`. A sintaxe é igual ao Linux mas as chaves são diferentes.

\# sysctl -a                          \# Visualiza todo o limite do sistema
# sysctl kern.maxfiles=XXXX          \# Número máximo de descritores no arquivo
kern.ipc.nmbclusters=32768           \# Permanece a entrada no /etc/sysctl.conf
kern.maxfiles=65536                  \# Típico valor do squid
kern.maxfilesperproc=32768
kern.ipc.somaxconn=8192              \# Fila TCP. Melhor para apache/sendmail
# sysctl kern.openfiles              \# Quantos arquivos descritos são usados.
# sysctl kern.ipc.numopensockets     \# Quantos sockets estão em uso
# sysctl -w net.inet.ip.portrange.last=50000 \# Padrão é 1024-5000
# netstat -m                         \# Capacidade de memória da rede

Veja o [FreeBSD handbook Chapter 11](http://www.freebsd.org/doc/en_US.ISO8859-1/books/handbook/configtuning-kernel-limits.html)http://www.freebsd.org/handbook/configtuning-kernel-limits.html para detalhes.

### Solaris

Seguindo os valores no `/etc/system` incrementará o máximo de descrições por proc::

set rlim\_fd\_max = 4096               \# Limite físico nos arquivos de descrições para o único proc
set rlim\_fd\_cur = 1024               \# Limite lógico nas filas descritas para o único proc

## Runlevels

### Linux

Uma vez iniciado o kernel inicia o `init` que então começa o `rc` que inicia todos os scripts pertencente a um runlevel. O scripts são armazenados em um /etc/init.d e são ligados a um /etc/rc.d/rcN.d com N o número do runlevel.  
O nível padrão do runlevel é configurado em /etc/inittab. São normalmente 3 ou 5:

\# grep default: /etc/inittab                                         
id:3:initdefault:

O atual runlevel pode ser alterado com `init`. Por exemplo para ir do 3 para o 5:

\# init 5                             \# Entra o runlevel 5

-   0       Desliga e suspende
-   1       Modo Single-User (also S)
-   2       Multi-user sem rede
-   3       Multi-user com rede
-   5       Multi-user com X
-   6       Reinicia

Use `chkconfig` para configurar os programas que inicializará o boot pelo runlevel.

\# chkconfig --list                   \# Lista todos os scripts do init
# chkconfig --list sshd              \# Relata o estado do sshd
# chkconfig sshd --level 35 on       \# Configura sshd para level 3 e 5
# chkconfig sshd off                 \# Desabilita sshd todos os runlevels

Debian e distribuições baseadas no Debian como Ubuntu ou Knoppix usa o comando `update-rc.d` para gerenciar o script do runlevel. Por padrão começa em 2,3,4 e 5 e shutdown no 0,1 e 6.

\# update-rc.d sshd defaults          \# Ativa sshd como runlevel padrão 
# update-rc.d sshd start 20 2 3 4 5 . stop 20 0 1 6 .  \# Com argumentos explícitos
# update-rc.d -f sshd remove         \# Desabilita sshd para todos runlevels
# shutdown -h now (or # poweroff)    \# Desliga o sistema ou suspende

### FreeBSD

O boot do BSD se aproxima do sistema SysV, não existem runlevels. O final do estado (único usuário, com ou sem X) é configurado no `/etc/ttys`. Todos os scripts estão localizado no `/etc/rc.d/` e no `/usr/local/etc/rc.d/` a terceira parte das aplicações. A ativação do serviço está configurado no `/etc/rc.conf` e `/etc/rc.conf.local`. Por padrão está configurado no `/etc/defaults/rc.conf`. O script responde pelo menos para start|stop|status.

\# /etc/rc.d/sshd status
sshd is running as pid 552.
# shutdown now                       \# Entra no modo single-user 
# exit                               \# volta para o modo multi-usuário 
# shutdown -p now                    \# Desliga e suspende o sistema
# shutdown -r now                    \# Reiniciat

O processo do `init` pode ser usado para checar um dos seguintes runlevels. Por exemplo `# init 6` para reiniciar.

-   0       Desliga o sistema (sinal `USR2`)
-   1       Vai o modo single-user (sinal `TERM`)
-   6       Reinicia a máquina (sinal `INT`)
-   c       Bloqueia o acesso adicional `TSTP`)
-   q       Rescan o arquivo ttys(5) (sinal `HUP`)

## Zerar senha de Root

### Linux método 1

Ao boot carrega (lilo ou grub), entra a opção seleção de inicialização:

init=/bin/sh

O kernel montará a partição e o `init` inicializará o bourne Shell em vez do `rc` e o runlevel. Usa o comando `passwd` para trocar a senha e reinicia.Esqueça o modo single-user, você precisa da senha para isso.  
Se, depois do booting, a partição root é montado para somente para leitura, e remonta como rw:

\# mount -o remount,rw /
# passwd                             \# ou deleta a senha de root no (/etc/shadow)
# sync; mount -o remount,ro /        \# sync depois de remontar para somente leitura
# reboot

### FreeBSD método 1

No FreeBSD, inicia o single-user, remonta / rw e a senha. Você pode selecionar o modo single-user menu (opção 4) como Exibe na tela 10 segundos para iniciar. O modo single-user dará o Shell root da partição /.

\# mount -u /; mount -a               \# montará / rw
# passwd
# reboot

### Unixes e FreeBSD e Linux método 2

Outros Unixes não poderia deixá-lo ir embora com o truque simples init. A solução é montada na partição de outro SO (como um CD) e troca a senha no disco.

-   Inicia o CD live ou a instalação em um modo de recuperação que vai lhe dar um Shell
-   Procura a partição root com fdisk /dev/sda
-   • Monta e usa o chroot

\# mount -o rw /dev/ad4s3a /mnt
# chroot /mnt                        \# chroot into /mnt
# passwd
# reboot

## Módulos do Kernel

### Linux

\# lsmod                              \# lista todos os módulos carregados
# modprobe isdn                      \# Carrega um módulo

### FreeBSD

\# kldstat                            #Lista todos os módulos carregados
# kldload crypto                     \# Para carregar um módulo

## Compilando o Kernel

### Linux

\# cd /usr/src/linux
# make mrproper                      \# Limpa o antigo .config se existir
# make oldconfig                     \# Re-usa o antigo .config se existente
# make menuconfig                    \# ou xconfig (Qt) ou gconfig (GTK)
# make                               \# Cria uma imagem comprimida
# make modules                       \# Compila os módulos
# make modules\_install               \# Instala os módulos
# make install                       \# Instala o kernel
# reboot

### FreeBSD

Atualização opcional de origem (em `/usr/src`) com csup (como FreeBSD 6.2 ou posterior):

\# csup <supfile>

Eu sigo o supfile:

\*default host=cvsup5.FreeBSD.org  # www.freebsd.org/handbook/cvsup.html#CVSUP-MIRRORS
\*default prefix=/usr 
\*default base=/var/db
\*default release=cvs delete tag=RELENG\_7
src-all

Modifica e refaz o kernel, copia a configuração de arquivo genérica para o novo nome e edita como se precisa (você pode também editar o arquivo `GENERIC` diretamente). Para reiniciar a construção e após a interrupção, adiciona a opção `NO_CLEAN=YES`, o comando make evita a limpeza dos objetos já formados.

\# cd /usr/src/sys/i386/conf/
# cp GENERIC MYKERNEL
# cd /usr/src
# make buildkernel KERNCONF=MYKERNEL
# make installkernel KERNCONF=MYKERNEL

Para a reconstrução total SO:

\# make buildworld                    \# Constrói total o SO mas não o kernel
# make buildkernel                   \# Usa KERNCONF para ambos
# make installkernel
# reboot
# mergemaster -p                     \# Compare somente os arquivos essenciais e conhecidos
# make installworld
# mergemaster -i -U                  \# Atualiza todas as configurações e outros arquivos
# reboot

Para pequenas alterações no fonte, você pode usar NO\_CLEAN=yes para evitar a reconstrução de toda a árvore.

\# make buildworld NO\_CLEAN=yes       \# Não deleta os objetos antigos
# make buildkernel KERNCONF=MYKERNEL NO\_CLEAN=yes

## Repara o Grub

Então você quebrou o grub? Boot com CD live, \[procura sua partição Linux abaixo `/dev` e use o `fdisk` para localizar a partição do linux\] monte a partição linux, adicione o /proc e o /dev e use o `grub-install /dev/xyz`. Suponha que o linux esta em `/dev/sda6`:

\# mount /dev/sda6 /mnt               \# Monta a partição linux em /mnt
# mount --bind /proc /mnt/proc       \# monta o subsistema proc no /mnt
# mount --bind /dev /mnt/dev         \# monta os dispositivos no /mnt
# chroot /mnt                        \# troca a partição root Linux
# grub-install /dev/sda              \# reinstala grub com suas antigas configurações

## Processos

[Listando](#ps) | [Prioridade](#nice) | [Background/Foreground](#bgfg) | [Top](#top) | [Kill](#kill)

## Listagem e PIDs

Cada processo tem um número exclusivo, o PID. A lista de todos os processo em execução é obtido com o `ps`.

\# ps -auxefw                         \# Lista extensa de todos os processos em execução

No entanto o uso mais típico é com o pipe ou o `pgrep`:

\# ps axww | grep cron
  586  ??  Is     0:01.48 /usr/sbin/cron -s
# ps axjf                            \# Todos processos no formato de árvore(Linux)
# ps aux | grep 'ss\[h\]'              \# Localiza todos pids ssh sem o grep pid
# pgrep -l sshd                      \# Localiza os PIDs dos processos por (parte de) nome
# echo $$                            \# O PID de sua shell
# fuser -va 22/tcp                   \# Lista os processos usando a porta 22 (Linux)
# pmap PID                           \# Mapa dos processos em memória (Caça vazamentos de memória) (Linux)
# fuser -va /home                    \# Lista os processos acessing a partição /home
# strace df                          \# Traça os sinais e chamadas de sistema
# truss df                           \# Mesmo que acima em FreeBSD/Solaris/Unixware

## Prioridade

Altera a prioridade dos processos em execução com `renice`. **Número negativos tem uma prioridade maior** , o menor é -20 e o "nice" tem um valor positivo.

\# renice -5 586                      \# Maior Prioridade
586: Prioridade antiga 0, nova prioridade -5

Inicia o processo com uma prioridade definida com o `nice`. Positivo é "nice" ou fraco, negativo fixa uma prioridade forte. Certifique se `/usr/bin/nice` ou o shell embutido usou (Verifique com `# which nice`).

\# nice -n -5 top                     \# Prioridade forte(/usr/bin/nice)
# nice -n 5 top                      \# Prioridade fraca (/usr/bin/nice)
# nice +5 top                        \# tcsh tem nice embutido (mesmo que acima!)

Enquanto o nice altera o agendamento da CPU, um outro comando útil é o ionice, irá fixar o IO do disco. Isto é muito útil para aplicações intensivas (ex. compilação). Voce pode selecionar uma classe (ociosa - melhor esforço - tempo real ), a página do manual é curta e bem explicativa.

\# ionice c3 -p123                    \# ajusta a classe ociosa para o PID 123 (Linux Somente)
# ionice -c2 -n0 firefox             \# Executa o firefox com melhor esforço e maior prioridade
# ionice -c3 -p$$                    \# Ajusta o shell atual para prioridade ociosa

O ultimo comando é muito útil para compilar (ou debugar) um longo projeto. Cada comando iniciado neste shell terá a prioridade herdada. $$ é o seu shell pid (tente echo $$).  
FreeBSD usa idprio/rtprio (0= máxima prioridade, 31 = mais inativo)

\# idprio 31 make                     \# Compila com menor prioridade
# idprio 31 -1234                    \# Ajusta o PID 1234 com menor prioridade
# idprio -t -1234                    \# -t remove qualquer prioridade de tempo real/ociosa

## Background/Foreground

Quando iniciado a partir de um shell, os processos podem ser levados ao background e ao foreground com \[Ctrl\]-\[Z\] (^Z), `bg` e `fg`. Lista os processos com `jobs`.

\# ping cb.vu > ping.log
^Z                                   \# ping é interrompido (parado) com \[Ctrl\]-\[Z\] 
# bg                                 \# Coloca em segundo plano e continua executando 
# jobs -l                            \# Lista os processos em segundo plano
\[1\]  - 36232 Running                       ping cb.vu > ping.log
\[2\]  + 36233 Suspended (tty output)        top
# fg %2                              \# Traz o processo 2 de volta ao primeiro plano

Use `nohup` para iniciar o processo que tem que continuar a executar quando a shell é fechada.

\# nohup ping -i 60 > ping.log &

## Top

O programa `top` exibe informações dos processos em execução. Veja também o programa `htop` de htop.sourceforge.net (a versão mais poderosa do top) que roda em Linux e FreeBSD (`ports/sysutils/htop/`). Enquanto o top é executado pressione a tecla "h" para uma visão geral da ajuda. Teclas úteis são:

-   **u \[nome do usuário\]** Para exibir somente os processos pertencentes ao usuário. Use + ou deixe em branco para todos os usuários.
-   **k \[pid\]** Finaliza todos os processos com o pid.
-   **1** Para exibir todas as estatísticas dos processos (Linux somente)
-   **R** Para ordenar.

## Signals/Kill

Termina ou manda um sinal com `kill` ou `killall`.

\# ping -i 60 cb.vu > ping.log &
\[1\] 4712
# kill -s TERM 4712                  \# mesmo que finalizar com -15 4712
# killall -1 httpd                   \# Kill HUP processos por nome
# pkill -9 http                      \# Kill TERM processos por (parte de) nome
# pkill -TERM -u www                 \# Kill TERM processos usado por www
# fuser -k -TERM -m /home            \# Kill cada processo acessando /home (para desmontar)

Sinais importantes são:

-   1       `HUP` (desliga)
-   2       `INT` (suspende)
-   3       `QUIT` (fecha)
-   9       `KILL` (força)
-   15     `TERM` (software envia o sinal de término)

## Sistema de Arquivos

[Info de disco](#diskinfo) | [Boot](#fsboot) | [Uso de disco](#mountpoints) | [Arquivos abertos](#filesstat) | [Monta/remonta](#mountcd) | [Monta SMB](#mountsmb) | [Monta imagem](#mountimg) | [Queima ISO](#burniso) | [Criar image](#createimg) | [Memória de Disco](#creatememdisk) | [Desempenho de Disco](#diskperf)

## Permissões

Altere as permissões e propriedades com `chmod` e `chown`. A umask padrão pode ser alterada para todos os usuários em /etc/profile para Linux ou /etc/login.conf para FreeBSD. A umask padrão geralmente é 022. A umask é subtraído de 777, assim a umask 022 resulta na permissão de 755.

1 --x executa                        \# Modo 764 = executa/lê/escreve | lê/escreve | lê
2 -w- escreve                          \# Para:       |--  Dono  --|   |- Grupo-|   |Outros|
4 r-- lê
  ugo=a                              u=usuário, g=grupo, o=outros, a=todos

\# chmod \[OPÇÃO\] MODO\[,MODO\] ARQUIVO    \# MODO é na forma \[ugoa\]\*(\[-+=\](http://cb.vu/[rwxXst/]))
# chmod 640 /var/log/maillog         \# Restringir o log -rw-r-----
# chmod u=rw,g=r,o= /var/log/maillog \# O mesmo acima
# chmod -R o-r /home/\*               \# Remove recursivamente leitura para outros para todos os usuários
# chmod u+s /path/to/prog            \# Fixa SUID bit no executável (saiba o que esta fazendo!)
# find / -perm -u+s -print           \# Localiza todos os programas com o SUID bit
# chown user:group /path/to/file     \# Altera a propriedade do usuário e o grupo no arquivo
# chgrp group /path/to/file          \# Altera a propriedade da grupo no arquivo
# chmod 640 \`find ./ -type f -print\` \# Altera a propriedade para 640 em todos os arquivos
# chmod 751 \`find ./ -type d -print\` \# Altera a permissão para 751 para todos os diretórios

## Informação de Disco

\# diskinfo -v /dev/ad2               \# Informação sobre o disco (Setor/tamanho) FreeBSD
# hdparm -I /dev/sda                 \# Informação sobre o disco IDE/ATA (Linux)
# fdisk /dev/ad2                     \# Exibe e manipula a tabela de partições 
# smartctl -a /dev/ad2               \# O SMART exibe as informação do disco

## Boot

### FreeBSD

Para inicializar o antigo kernel se o novo kernel não inicializar, pare o boot durante a contagem regressiva

\# unload
# load kernel.old
# boot

## Sistema de ponto de montagem/Uso de disco

\# mount | column -t                  \# Exibe o sistema de arquivos montados no seu sistema
# df                                 \# Exibe o espaço livre no disco e dispositivos montados
# cat /proc/partitions               \# Exibe todas partições registradas (Linux)

### Uso de Disco

\# du -sh \*                           \# Lista o tamanho dos diretórios
# du -csh                            \# Tamanho total do diretório corrente 
# du -ks \* | sort -n -r              \# Ordena tudo por tamanho em kilobytes
# ls -lSr                            \# Exibe arquivos, maiores por último

## Quem tem arquivos abertos

Este é muito útil para localizar quem esta bloqueando a partição e tem que ser desmontado e recebe um erro típico:

\# umount /home/
umount: unmount of /home             \# Impossível desmontar porque um arquivo esta bloqueando o home
   Falhou: Dispositivo Ocupado

### FreeBSD e maioria dos Unixes

\# fstat -f /home                     \# Para montar o ponto
# fstat -p PID                       \# Para uma aplicação com PID
# fstat -u user                      \# Para um nome de usuário

Localiza arquivos de log aberto (ou outros arquivos abertos), pela palavra Xorg:

\# ps ax | grep Xorg | awk '{print $1}'
1252
# fstat -p 1252
USER     CMD          PID   FD MOUNT      INUM MODE         SZ|DV R/W
root     Xorg        1252 root /             2 drwxr-xr-x     512  r
root     Xorg        1252 text /usr     216016 -rws--x--x  1679848 r
root     Xorg        1252    0 /var     212042 -rw-r--r--   56987  w

O arquivo com inum 212042 é o único arquivo em /var:

\# find -x /var -inum 212042
/var/log/Xorg.0.log

### Linux

Localiza arquivos abertos em um ponto de montagem: `fuser` ou `lsof`:

\# fuser -m /home                     \# Lista os processos acessando o /home
# lsof /home
COMMAND   PID    USER   FD   TYPE DEVICE    SIZE     NODE NAME
tcsh    29029 eedcoba  cwd    DIR   0,18   12288  1048587 /home/eedcoba (guam:/home)
lsof    29140 eedcoba  cwd    DIR   0,18   12288  1048587 /home/eedcoba (guam:/home)

Sobre uma aplicação:

ps ax | grep Xorg | awk '{print $1}'
3324
# lsof -p 3324
COMMAND   PID    USER   FD   TYPE DEVICE    SIZE    NODE NAME
Xorg    3324 root    0w   REG        8,6   56296      12492 /var/log/Xorg.0.log

Sobre um arquivo único:

\# lsof /var/log/Xorg.0.log
COMMAND  PID USER   FD   TYPE DEVICE  SIZE  NODE NAME
Xorg    3324 root    0w   REG    8,6 56296 12492 /var/log/Xorg.0.log

## Montando e Remontando um Sistema de Arquivos

Por exemplo, o cdrom. Se listado em /etc/fstab

\# mount /cdrom

Ou localize o dispositivo em /dev ou com o dmesg

### FreeBSD

\# mount -v -t cd9660 /dev/cd0c /mnt  \# cdrom
# mount\_cd9660 /dev/wcd0c /cdrom     \# outro método
# mount -v -t msdos /dev/fd0c /mnt   \# disquete

Entrada no /etc/fstab:

\# Device                Mountpoint      FStype  Options         Dump    Pass#
/dev/acd0               /cdrom          cd9660  ro,noauto       0       0

Para permitir o usuário fazer:

\# sysctl vfs.usermount=1  \# Ou inserir a linha "vfs.usermount=1" em /etc/sysctl.conf

### Linux

\# mount -t auto /dev/cdrom /mnt/cdrom   \# Típico comando para montar cdrom
# mount /dev/hdc -t iso9660 -r /cdrom   \# Típico IDE
# mount /dev/scd0 -t iso9660 -r /cdrom  \# Típico SCSI cdrom
# mount /dev/sdc0 -t ntfs-3g /windows   \# Típico SCSI

Entrada no /etc/fstab:

/dev/cdrom   /media/cdrom  subfs noauto,fs=cdfss,ro,procuid,nosuid,nodev,exec 0 0

#### Montar uma Partição FreeBSD com Linux

Localize o número da partição com fdisk, esta é geralmente a partição root, mas poderia ser outro slice BSD também. Se o FreeBSD tem muitas slices, eles não são o que estão listados na tabela fdisk, porém visível em /dev/sda\* ou /dev/hda\*.

\# fdisk /dev/sda                     \# Localiza a partição FreeBSD
/dev/sda3   \*        5357        7905    20474842+  a5  FreeBSD
# mount -t ufs -o ufstype=ufs2,ro /dev/sda3 /mnt
/dev/sda10 = /tmp; /dev/sda11 /usr   \# Outros slices

### Remontar

Remontar um dispositivo sem desmontar. Necessário para fsck por exemplo

\# mount -o remount,ro /              \# Linux
# mount -o ro /                      \# FreeBSD

Copie os dados brutos a partir do cdrom em uma imagem iso:

\# dd if=/dev/cd0c of=file.iso

## Adicionar swap em tempo real

Suponha que você necessite de mais swap (agora mesmo), um arquivo de 2GB em /swap2gb (Linux comente).

\# dd if=/dev/zero of=/swap2gb bs=1024k count=2000
# mkswap /swap2gb                    \# Criar a área de Swap
# swapon /swap2gb                    \# Ative a swap. Agora em uso!
# swapoff /swap2gb                   \# Quando terminar, desative a swap
# rm /swap2gb

## Montar um Compartilhamento SMB

Suponha que nós queremos acessar o compartilhamento SMB em um computador smbserver, o endereço digitado em um computador Windows é \\\\smbserver\\myshare. Nós montamos em /mnt/smbshare. Alerta> cifs precisa de um IP ou nome DNS, não um nome Windows.

### Linux

\# smbclient -U user -I 192.168.16.229 -L //smbshare/    \# Lista os compartilhamentos
# mount -t smbfs -o username=winuser //smbserver/myshare /mnt/smbshare
# mount -t cifs -o username=winuser,password=winpwd //192.168.16.229/myshare /mnt/share

Adicionando com o pacote mount.cifs é possível armazenar as credenciais em um arquivo, por exemplo`/home/user/.smb`:

username=winuser
password=winpwd

E montar os seguintes:

\# mount -t cifs -o credentials=/home/user/.smb //192.168.16.229/myshare /mnt/smbshare

### FreeBSD

Use -I para pegar o IP (ou nome DNS); smbserver é o nome Windows.

\# smbutil view -I 192.168.16.229 //winuser@smbserver    \# List os compartilhamentos
# mount\_smbfs -I 192.168.16.229 //winuser@smbserver/myshare /mnt/smbshare

## Montar uma imagem

### Voltando ao Linux

\# mount -t iso9660 -o loop file.iso /mnt                \# Monta uma imagem de CD
# mount -t ext3 -o loop file.img /mnt                   \# Monta uma imagem com sistema de arquivos ext3

### FreeBSD

Com dispositivo de memória (faça # kldload md.ko se necessário):

\# mdconfig -a -t vnode -f file.iso -u 0
# mount -t cd9660 /dev/md0 /mnt
# umount /mnt; mdconfig -d -u 0                         \# Limpeza do dispositivo md

Ou com nó virtual:

\# vnconfig /dev/vn0c file.iso; mount -t cd9660 /dev/vn0c /mnt
# umount /mnt; vnconfig -u /dev/vn0c                    \# Limpeza do dispositivo vn

### Solaris e FreeBSD

Voltando ao início com a interface do arquivo ou lofi:

\# lofiadm -a file.iso
# mount -F hsfs -o ro /dev/lofi/1 /mnt
# umount /mnt; lofiadm -d /dev/lofi/1                   \# Limpeza do dispositivo lofi

## Criar e Queimar uma imagem ISO

Isto irá copiar setor por setor de um cd ou DVD. Com `conv=notrunc`, a imagem será menor se ouver conteúdo no cd. Veja abaixo o [dd examples](#dd).

\# dd if=/dev/hdc of=/tmp/mycd.iso bs=2048 conv=notrunc

Use mkisofs para criar uma imagem CD/DVD de arquivos em um diretório. Para evitar a restrições de nomes de arquivos: -r permite a extensão Rock Ridge comuns ao sistema UNIX, -J permite extensão Joliet usada por sistemas Microsoft. -L permite arquivos ISO9660 começando com um período.

\# mkisofs -J -L -r -V TITLE -o imagefile.iso /path/to/dir

Em FreeBSD, mkisofs é encontrado no ports em sysutils/cdrtools.

### Queimar uma imagem ISO de CD/DVD

#### FreeBSD

FreeBSD não ativa DMA em dispositivos ATAPI por padrão. DMA está habilitado com o comando sysctl e os argumentos abaixo, ou com /boot/loader.conf com as seguintes entradas::

hw.ata.ata\_dma="1"
hw.ata.atapi\_dma="1"

Use `burncd` com um dispositivo ATAPI(`burncd` é parte da base do sistema) e `cdrecord` ( em sysutils/cdrtools) com um disco SCSI.

\# burncd -f /dev/acd0 data imagefile.iso fixate      \# Para discos ATAPI
# cdrecord -scanbus                  \# Para localizar o dispositivo (like 1,0,0)
# cdrecord dev=1,0,0 imagefile.iso

#### Linux

Também usa `cdrecord` com Linux como descrito acima. Além disso é possível usar a interface ATAPI nativa que se encontra com:

\# cdrecord dev=ATAPI -scanbus

E queime o CD/DVD como acima.

#### Ferramentas dvd+rw

O [dvd+rw-tools](http://fy.chalmers.se/~appro/linux/DVD+RW/) pacote (FreeBSD: ports/sysutils/dvd+rw-tools) pode fazer tudo e inclui `growisofs` para queimar CDs ou DVDs. Os exemplos se referem aos dispositivos de DVD `/dev/dvd` que poderia ser um link simbólico para `/dev/scd0` (típico scsi em Linux) ou `/dev/cd0` (típico FreeBSD) ou `/dev/rcd0c` (típico NetBSD/OpenBSD de caráter SCSI) ou `/dev/rdsk/c0t1d0s2` (Exemplo de um dispositivo Solaris SCSI/ATAPI CD-ROM ). Existe uma boa documentação com exemplos em [FreeBSD handbook chapter 18.7](http://www.freebsd.org/handbook/creating-dvds.html)http://www.freebsd.org/handbook/creating-dvds.html.

                       \# -dvd-compat finaliza o disco
# growisofs -dvd-compat -Z /dev/dvd=imagefile.iso     \# Queima uma imagem iso existente
# growisofs -dvd-compat -Z /dev/dvd -J -R /p/to/data  \# Queima diretamente

### Converter um arquivo do Nero .nrg para .iso

O nero simplesmente adiciona um cabeçalho de 300Kb para uma imagem iso normal. Isto pode ser mudado com o dd.

\# dd bs=1k if=imagefile.nrg of=imagefile.iso skip=300

### Converter uma imagem /bin/cue para .iso

O pequeno [`bchunk` program](http://freshmeat.net/projects/bchunk/)http://freshmeat.net/projects/bchunk/ pode fazer isso. E no ports do FreeBSD em sysutils/bchunk.

\# bchunk imagefile.bin imagefile.cue imagefile.iso

## Criar um arquivo baseado em uma imagem

Por exemplo, uma partição de 1GB usando o arquivo /usr/vdisk.img. Aqui usamos o vnode 0, mas também poderia ser o 1.

### FreeBSD

\# dd if=/dev/random of=/usr/vdisk.img bs=1K count=1M
# mdconfig -a -t vnode -f /usr/vdisk.img -u 0         \# Cria o dispositivo /dev/md1
# bsdlabel -w /dev/md0
# newfs /dev/md0c
# mount /dev/md0c /mnt
# umount /mnt; mdconfig -d -u 0; rm /usr/vdisk.img    \# Cleanup the md device

O arquivo de imagem base pode ser automaticamente montado durante o boot com uma entrada em /etc/rc.conf and /etc/fstab. Teste sua instalação com `# /etc/rc.d/mdconfig start` (primeiro delete o dispositivo md0 com `# mdconfig -d -u 0`).  
Note, porém, que essa configuração automática só funcionará se o arquivo de imagem não é na partição root. A razão é que o script /etc/rc.d/mdconfig é executada muito cedo durante a inicialização e a partição raiz ainda é somente leitura. Imagens localizadas fora da partição raiz será montado mais tarde com o script /etc/rc.d/mdconfig2.  
/boot/loader.conf:

md\_load="YES"

/etc/rc.conf:

\# mdconfig\_md0="-t vnode -f /usr/vdisk.img"          \# /usr is not on the root partition

/etc/fstab: (Os 0 0 no final são importantes, diz ao fsck para ignorar este dispositivo, como ainda não existe)

/dev/md0                /usr/vdisk      ufs     rw              0       0

Também é possível aumentar o tamanho da imagem depois, dizer, por exemplo, 300 MB de maior dimensão.

\# umount /mnt; mdconfig -d -u 0
# dd if=/dev/zero bs=1m count=300 >> /usr/vdisk.img
# mdconfig -a -t vnode -f /usr/vdisk.img -u 0
# growfs /dev/md0
# mount /dev/md0c /mnt                                \# A maior partição de arquivos agora é 300MB

### Linux

\# dd if=/dev/zero of=/usr/vdisk.img bs=1024k count=1024
# mkfs.ext3 /usr/vdisk.img
# mount -o loop /usr/vdisk.img /mnt
# umount /mnt; rm /usr/vdisk.img                      \# Limpeza

### Linux with losetup

`/dev/zero` é muito mais rápido `urandom`, mas menos segura para criptografia

\# dd if=/dev/urandom of=/usr/vdisk.img bs=1024k count=1024
# losetup /dev/loop0 /usr/vdisk.img                   \# Cria e associa /dev/loop0
# mkfs.ext3 /dev/loop0
# mount /dev/loop0 /mnt
# losetup -a                                          \# Verifica os loops utilizados
# umount /mnt
# losetup -d /dev/loop0                               \# Separa
# rm /usr/vdisk.img

## Criar um Sistema de Arquivos de Memória

A memória do sistema de arquivos baseado é muito rápido para a aplicação de IO pesado. Como criar uma partição de 64 MB montado em / memdisk:

### FreeBSD

\# mount\_mfs -o rw -s 64M md /memdisk
# umount /memdisk; mdconfig -d -u 0                   \# Limpeza do dispositivo md
md     /memdisk     mfs     rw,-s64M    0   0         \# entrada /etc/fstab

### Linux

\# mount -t tmpfs -osize=64m tmpfs /memdisk

## Desempenho de Disco

Ler e escrever um arquivo de 1GB na partição ad4s3c (/home)

\# time dd if=/dev/ad4s3c of=/dev/null bs=1024k count=1000
# time dd if=/dev/zero bs=1024k count=1000 of=/home/1Gb.file
# hdparm -tT /dev/hda      \# Somente Linux

## Network

[Roteamento](#routing) | [Adicionar IP](#secondip) | [Alterar MAC](#changemac) | [Portas](#ports) | [Firewall](#firewall) | [IP Forward](#ipforward) | [NAT](#nat) | [DNS](#dns) | [DHCP](#dhcp) | [Tráfego](#traffic) | [QoS](#trafficctrl) | [NIS](#nis) | [Netcat](#netcat)

## Debugging (Veja mais [Traffic analysis)](#traffic)

### Linux

\# ethtool eth0              \# Mostra o estado da ethernet (substitui mii-diag)
# ethtool -s eth0 speed 100 duplex full \# Força 100Mbit Full duplex
# ethtool -s eth0 autoneg off \# Desabilita auto negociação
# ethtool -p eth1           \# Pisca o led da ethernet - muito útil quando suportado
# ip link show              \# Mostra todas as interfaces no Linux (semelhante ao ifconfig)
# ip link set eth0 up       \# Levanta o dispositivo (ou desce). O mesmo que "ifconfig eth0 up"
# ip addr show              \# Mostra todos os endereços IP no linux (semelhante ao ifconfig)
# ip neigh show             \# Semelhante ao arp -a

### Outros OS's

\# ifconfig fxp0             \# Verifica o campo "media" no FreeBSD
# arp -a                    \# Verifica o Roteador (ou host) entrada ARP (todos OS)
# ping cb.vu                \# A primeira coisa a tentar...
# traceroute cb.vu          \# Imprime o caminho de rota para o destino
# ifconfig fxp0 media 100baseTX mediaopt full-duplex \# 100Mbit full duplex (FreeBSD)
# netstat -s                \# Estatísticas do Sistema para protocolo de rede

Comandos adicionais que nem sempre são instalados por padrão, mas fácil de encontrar:

\# arping 192.168.16.254     \# Ping na camada ethernet
# tcptraceroute -f 5 cb.vu  \# Utiliza o TCP ao invés de icmp para rastrear firewalls

## Roteamento

### Imprimindo Tabela de Roteamento

\# route -n                  \# Linux ou use "ip route"
# netstat -rn               \# Linux, BSD and UNIX
# route print               \# Windows

### Adiciona e Deleta Rotas

#### FreeBSD

\# route add 212.117.0.0/16 192.168.1.1
# route delete 212.117.0.0/16
# route add default 192.168.1.1

Adiciona rota permanente em /etc/rc.conf

static\_routes="myroute"
route\_myroute="-net 212.117.0.0/16 192.168.1.1"

#### Linux

\# route add -net 192.168.20.0 netmask 255.255.255.0 gw 192.168.16.254
# ip route add 192.168.20.0/24 via 192.168.16.254       \# mesmo que acima com ip route
# route add -net 192.168.20.0 netmask 255.255.255.0 dev eth0
# route add default gw 192.168.51.254
# ip route add default via 192.168.51.254 dev eth0      \# mesmo que acima com ip route
# route delete -net 192.168.20.0 netmask 255.255.255.0

#### Solaris

\# route add -net 192.168.20.0 -netmask 255.255.255.0 192.168.16.254
# route add default 192.168.51.254 1                    \# 1 = saltos para o próximo gateway
# route change default 192.168.50.254 1

Entradas permanentes são estabelecidas em `/etc/defaultrouter`.

#### Windows

\# Route add 192.168.50.0 mask 255.255.255.0 192.168.51.253
# Route add 0.0.0.0 mask 0.0.0.0 192.168.51.254

Use add -p para criar uma rota persistente.

## Configure Endereços IP adicionais

### Linux

\# ifconfig eth0 192.168.50.254 netmask 255.255.255.0       \# Primeiro IP
# ifconfig eth0:0 192.168.51.254 netmask 255.255.255.0     \# Segundo IP
# ip addr add 192.168.50.254/24 dev eth0                   \# Equivalente ao comando ip 
# ip addr add 192.168.51.254/24 dev eth0 label eth0:1

### FreeBSD

\# ifconfig fxp0 inet 192.168.50.254/24                     \# Primeiro IP
# ifconfig fxp0 alias 192.168.51.254 netmask 255.255.255.0 \# Segundo IP
# ifconfig fxp0 -alias 192.168.51.254                      \# Remove o segundo apelido IP

Permanent entries in /etc/rc.conf

ifconfig\_fxp0="inet 192.168.50.254  netmask 255.255.255.0"
ifconfig\_fxp0\_alias0="192.168.51.254 netmask 255.255.255.0"

### Solaris

Check the settings with `ifconfig -a`

\# ifconfig hme0 plumb                                      \# Enable the network card
# ifconfig hme0 192.168.50.254 netmask 255.255.255.0 up    \# First IP
# ifconfig hme0:1 192.168.51.254 netmask 255.255.255.0 up  \# Second IP

## Alterar Endereço MAC

Normalmente você tem que derrubar a relação antes da mudança. Não me diga porque você quer mudar o endereço MAC ...

\# ifconfig eth0 down
# ifconfig eth0 hw ether 00:01:02:03:04:05      \# Linux
# ifconfig fxp0 link 00:01:02:03:04:05          \# FreeBSD
# ifconfig hme0 ether 00:01:02:03:04:05         \# Solaris
# sudo ifconfig en0 ether 00:01:02:03:04:05     \# Mac OS X Tiger
# sudo ifconfig en0 lladdr 00:01:02:03:04:05    \# Mac OS X Leopard

Muitas ferramentas existentes para Windows. Por Exemplo [etherchange](http://ntsecurity.nu/toolbox/etherchange/)http://ntsecurity.nu/toolbox/etherchange. Ou procure por "Mac Makeup", "smac".

## Portas em Uso

Listando portas abertas:

\# netstat -an | grep LISTEN
# lsof -i                  \# Linux Lista todas as conexões de Internet
# socklist                 \# Linux Mostra lista de sockets abertos
# sockstat -4              \# FreeBSD Lista Aplicações
# netstat -anp --udp --tcp | grep LISTEN        \# Linux
# netstat -tup             \# Lista conexões ativas de/para sistemas (Linux)
# netstat -tupl            \# Lista portas em escuta do sistema (Linux)
# netstat -ano             \# Windows

## Firewall

Verificando se o firewall esta executando.

### Linux

\# iptables -L -n -v                  \# Status
Open the iptables firewall
# iptables -P INPUT       ACCEPT     \# Abre tudo
# iptables -P FORWARD     ACCEPT
# iptables -P OUTPUT      ACCEPT
# iptables -Z                        \# Zera os contadores de pacotes para todas as regras
# iptables -F                        \# Limpa todas as Regras
# iptables -X                        \# Deleta todas as Regras

### FreeBSD

\# ipfw show                          \# Status
# ipfw list 65535 \# if answer is "65535 deny ip from any to any" the fw is disabled
# sysctl net.inet.ip.fw.enable=0     \# Disable
# sysctl net.inet.ip.fw.enable=1     \# Enable

## Encaminhamento IP para Roteamento

### Linux

Verifica e habilita o encaminhamento do IP com:

\# cat /proc/sys/net/ipv4/ip\_forward  \# Verifica o IP encaminhado 0=off, 1=on
# echo 1 > /proc/sys/net/ipv4/ip\_forward

ou edita /etc/sysctl.conf com:

net.ipv4.ip\_forward = 1

### FreeBSD

Verifica e habilita com:

\# sysctl net.inet.ip.forwarding      \# Verifica o IP encaminhado 0=off, 1=on
# sysctl net.inet.ip.forwarding=1
# sysctl net.inet.ip.fastforwarding=1	\# Para dedicação do roteador ou firewall
Permanencia com entrada em /etc/rc.conf:
gateway\_enable="YES"                 \# Defina como YES se essa máquina for um gateway.

### Solaris

\# ndd -set /dev/ip ip\_forwarding 1   \# Defina o IP para o encaminhamento 0=off, 1=on

## NAT Network Address Translation

### Linux

\# iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE	\# Para ativar o NAT
# iptables -t nat -A PREROUTING -p tcp -d 78.31.70.238 --dport 20022 -j DNAT \\
--to 192.168.16.44:22           \# Port forward 20022 to internal IP port ssh
# iptables -t nat -A PREROUTING -p tcp -d 78.31.70.238 --dport 993:995 -j DNAT \\
--to 192.168.16.254:993-995     \# Port forward of range 993-995
# ip route flush cache
# iptables -L -t nat            \# Check NAT status

Deleta a porta para o encaminhamento com -D em vez de -A.

### FreeBSD

\# natd -s -m -u -dynamic -f /etc/natd.conf -n fxp0
Ou edita /etc/rc.conf com:
firewall\_enable="YES"           \# Defina YES para ativar a função do firewall
firewall\_type="open"            \# Tipo de firewall (veja /etc/rc.firewall)
natd\_enable="YES"               \# Habilite natd (if firewall\_enable == YES).
natd\_interface="tun0"           \# Interface pública ou endereço de IP para uso.
natd\_flags="-s -m -u -dynamic -f /etc/natd.conf"

Porta em encaminhada com:

\# cat /etc/natd.conf 
same\_ports yes
use\_sockets yes
unregistered\_only
# redirect\_port tcp insideIP:2300-2399 3300-3399  \# Faixa de porta
redirect\_port udp 192.168.51.103:7777 7777

## DNS

No Unix o DNS são válidos para todas as interfaces e armazenadas no /etc/resolv.conf. O domínio para qual a máquina pertence é também armazenado no arquivo. A configuração mínima é:

nameserver 78.31.70.238
search sleepyowl.net intern.lab
domain sleepyowl.net

Verifica o nome do domínio no sistema com:

\# hostname -d                        \# Igual ao dnsdomainname

### Windows

No Windows o DNS são configurados pela interface. Para que exiba a configuração DNS e para limpar o cache do DNS usa-se:

\# ipconfig /?                        \# Exibe ajuda
# ipconfig /all                      \# Veja toda a informação incluindo o DNS

### Limpa o DNS

Limpe o cache DNS do SO, alguns aplicativos usa seu próprio cache (ex. Firefox).

\# /etc/init.d/nscd restart           \# Reinicia nscd, se utilizar - Linux/BSD/Solaris
# lookupd -flushcache                \# OS X Tiger
# dscacheutil -flushcache            \# OS X Leopard and newer
# ipconfig /flushdns                 \# Windows

### Encaminhe as Consultas

Faça um teste de configuração com seu amigo. Por exemplo o servidor DNS público `213.133.105.2 ns.second-ns.de` pode ser usado para teste. Veja como o servidor cliente responde isso (uma simples resposta).

\# dig sleepyowl.net
sleepyowl.net.          600     IN      A       78.31.70.238
;; SERVER: 192.168.51.254#53(192.168.51.254)

O roteador 192.168.51.254 respondeu e é responsável pela entrada do A. Pouca entrada pode ser requerida e o servidor de DNS pode selecionar com @:

\# dig MX google.com
# dig @127.0.0.1 NS sun.com          \# Para teste o local do servidor
# dig @204.97.212.10 NS MX heise.de  \# Consulta externa do servidor
# dig AXFR @ns1.xname.org cb.vu      \# Obtenha a zona cheia(zona de transferência)

O programa da máquina também é poderoso.

\# host -t MX cb.vu                   \# Obtenha o mail MX de entrada
# host -t NS -T sun.com              \# Obtenha o NS da conexão TCP.
# host -a sleepyowl.net              \# Obtenha qualquer coisa

### Consultas Inversas

Encontra o nome coletivo para o endereço de IP (in-addr.arpa). Isso pode ser feito `dig`, `host` e `nslookup`:

\# dig -x 78.31.70.238
# host 78.31.70.238
# nslookup 78.31.70.238

### /etc/hosts

Máquinas individuais podem ser configuradas no arquivo /etc/hosts ao contrário de executar localmente para resolver as consultas do nome da máquina. O formato é simples, por exempl

78.31.70.238   sleepyowl.net   sleepyowl

A prioridade entre as máquinas e as consultas dns, a ordem das consultas de resolução de nomes, podem ser configuradas no `/etc/nsswitch.conf` e /etc/host.conf. O arquivo existente do Windows, é normalmente no:

C:\\WINDOWS\\SYSTEM32\\DRIVERS\\ETC

## DHCP

### Linux

Algumas distribuições (SuSE) usa dhcpcd como cliente. O padrão é eth0.

\# dhcpcd -n eth0           \# Provocar uma renovação( não é sempre funciona)
# dhcpcd -k eth0           \# lançamento e encerramento

O arrendamento com a total informação são armazenadas no:

/var/lib/dhcpcd/dhcpcd-eth0.info

### FreeBSD

FreeBSD (e Debian) usa dhclient. Para configurar a interface (por exemplo bge0) executa:

\# dhclient bge0

O arrendamento com a total informação são armazenados no:

/var/db/dhclient.leases.bge0

Usa

/etc/dhclient.conf

para preceder as opções ou forçar as diferentes opções:

\# cat /etc/dhclient.conf
interface "rl0" {
    prepend domain-name-servers 127.0.0.1;
    default domain-name "sleepyowl.net";
    supersede domain-name "sleepyowl.net";
}

### Windows

O dhcp pode ser renovado com `ipconfig`:

\# ipconfig /renew          \# renova todos os adaptadores
# ipconfig /renew LAN      \# renew the adapter named "LAN"
# ipconfig /release WLAN   \# release the adapter named "WLAN"

Sim isto é uma boa idéia para renomear seu adaptador com simples nomes!

## Análise de Tráfego

[Bmon](http://people.suug.ch/~tgr/bmon/)http://people.suug.ch/~tgr/bmon/ é um pequeno console da largura de bandas e pode exibir o fluxo de diferentes interfaces.

### Sniff com tcpdump

\# tcpdump -nl -i bge0 not port ssh and src \\(192.168.16.121 or 192.168.16.54\\)
# tcpdump -n -i eth1 net 192.168.16.121           \# select to/from a single IP
# tcpdump -n -i eth1 net 192.168.16.0/24          \# select traffic to/from a network
# tcpdump -l > dump && tail -f dump               \# Buffered output
# tcpdump -i rl0 -w traffic.rl0                   \# Write traffic headers in binary file
# tcpdump -i rl0 -s 0 -w traffic.rl0              \# Write traffic + payload in binary file
# tcpdump -r traffic.rl0                          \# Read from file (also for ethereal
# tcpdump port 80                                 \# The two classic commands
# tcpdump host google.com
# tcpdump -i eth0 -X port \\(110 or 143\\)          \# Check if pop or imap is secure
# tcpdump -n -i eth0 icmp                         \# Only catch pings
# tcpdump -i eth0 -s 0 -A port 80 | grep GET      \# -s 0 for full packet -A for ASCII

Adiciona importante opções:

-   `-A`     Imprime cada pacotes na limpeza do texto (sem cabeçalho)
-   `-X`     Imprime pacotes em hex e ASCII
-   `-l`     Faça a linha de saída do buffer
-   `-D`     Imprime todas as interfaces disponíveis

No Windows usa o windump [www.winpcap.org](http://www.winpcap.org/). Usa windump -D para listar as interfaces.

### Scan com nmap

[Nmap](http://insecure.org/nmap/)http://insecure.org/nmap/ é a porta scanner com SO, isto normalmente são instalados nas distribuições e também estão disponíveis para windows. Se você não scan seus servidores, hackers fazem isso para você...

\# nmap cb.vu               \# scans todas portas reservadas TCP na máquina
# nmap -sP 192.168.16.0/24 \# Procura IP de fora e são usados pela máquina na máquina 0/24
# nmap -sS -sV -O cb.vu    \# Faz a descrição SYN scan com a versão e SO detectadas
PORT      STATE  SERVICE             VERSION
22/tcp    open   ssh                 OpenSSH 3.8.1p1 FreeBSD-20060930 (protocol 2.0)
25/tcp    open   smtp                Sendmail smtpd 8.13.6/8.13.6
80/tcp    open   http                Apache httpd 2.0.59 ((FreeBSD) DAV/2 PHP/4.
\[...\]
Running: FreeBSD 5.X
Uptime 33.120 days (since Fri Aug 31 11:41:04 2007)

Outro padrão mais usados são as ferramentas `hping` (www.hping.org) um pacote IP assembler/analyzer e `fping` (fping.sourceforge.net). fping pode checar multiplos rund-robin fashion.

## Controle de tráfego (QoS)

Controle de tráfego gerencia a fila, polícia, programação e outros parâmetros de tráfego para uma rede. Os exemplos seguintes são simples usos práticos do Linux e FreeBSD capacidades para uma melhor utilização da largura de banda disponível. limite upload

### Limite de upload

Modens DSL ou de cabo têm uma longa fila para melhorar o rendimento upload. No entanto preenchendo a fila com um dispositivo rápido (ethernet, por exemplo) irá diminuir drasticamente a interatividade. Por conseguinte, é útil para limitar a taxa de upload dispositivo para coincidir com a capacidade física do modem, isso deve melhorar muito a interatividade. Situado a cerca de 90% da máxima modem (cabo) de velocidade.

#### Linux

Para a 512 Kbit upload modem.

\# tc qdisc add dev eth0 root tbf rate 480kbit latency 50ms burst 1540
# tc -s qdisc ls dev eth0                         \# Status
# tc qdisc del dev eth0 root                      \# Delete the queue
# tc qdisc change dev eth0 root tbf rate 220kbit latency 50ms burst 1540

#### FreeBSD

FreeBSD usa o `dummynet` tráfego afiado que são configurados ipfw. Tubos são usados para aumentar seus limites da largura da banda na única do\[K|M\]{bit/s|Byte/s}, 0 meios ilimitados. Usando igual ao número do tubo reconfigurará isto. Por exemplo o limite do upload da largura da banda para 500 Kbit.

\# kldload dummynet                                \# carrega os módulos se necessário
# ipfw pipe 1 config bw 500Kbit/s                 \# cria um tubo com limitado pela largura da banda
# ipfw add pipe 1 ip from me to any               \# diverte todos os upload também pelo tubo

### Qualidade de Serviço

#### Linux

Prioridade nas filas com `tc` para otimizar VoIP. Veja o total exemplo no [voip-info.org](http://www.voip-info.org/wiki-QoS+Linux+with+HFS) ou [www.howtoforge.com](http://www.howtoforge.com/voip_qos_traffic_shaping_iproute2_asterisk). Suposto VoIP usados udp na porta 10000:11024 e dispositivos eth0 (também poderia ser ppp0 ou assim). Seguindo os comandos define o QoS para as filas das árvores e força o tráfego VoIP para as filas The following commands com QoS`0x1e` (todos os bits). O padrão do fluxo em 3 filas e QoS _Mínimo-atraso_ fluxo em 2 filas.

\# tc qdisc add dev eth0 root handle 1: prio priomap 2 2 2 2 2 2 2 2 1 1 1 1 1 1 1 0
# tc qdisc add dev eth0 parent 1:1 handle 10: sfq
# tc qdisc add dev eth0 parent 1:2 handle 20: sfq
# tc qdisc add dev eth0 parent 1:3 handle 30: sfq
# tc filter add dev eth0 protocol ip parent 1: prio 1 u32 \\
  match ip dport 10000 0x3C00 flowid 1:1          \# usa a faixa de portas para os servidores
  match ip dst 123.23.0.1 flowid 1:1              \# e/ou usa IP do servidor

Status and remove with

\# tc -s qdisc ls dev eth0                         \# status da fila
# tc qdisc del dev eth0 root                      \# deleta todos QoS

#### Calcula a faixa das portas e a máscara

O filtro tc define a faixa das portas e a máscara que você calculou. Encontra o 2^N _finalizando_ a faixa da porta, deduzi a faixa e converte para HEX. Essa é a sua máscara. Exemplo para 10000 -> 11024, a faixa é 1024.

\# 2^13 (8192) < 10000 < 2^14 (16384)              \# finalizando é 2^14 = 16384
# echo "obase=16;(2^14)-1024" | bc                \# mask is 0x3C00

#### FreeBSD

O max largura da banda é 500Kbit/s e nós definimos 3 filas com a prioridade 100:10:1 para VoIP:ssh:all the rest.

\# ipfw pipe 1 config bw 500Kbit/s 
# ipfw queue 1 config pipe 1 weight 100
# ipfw queue 2 config pipe 1 weight 10
# ipfw queue 3 config pipe 1 weight 1
# ipfw add 10 queue 1 proto udp dst-port 10000-11024
# ipfw add 11 queue 1 proto udp dst-ip 123.23.0.1 \# e/ou usa o IP do servidor
# ipfw add 20 queue 2 dsp-port ssh
# ipfw add 30 queue 3 from me to any              \# reinicia todos

Status e remove com

\# ipfw list                                       \# status das regras
# ipfw pipe list                                  \# status do tubo
# ipfw flush                                      \# deleta todas as regras por padrão

## NIS Debugging

Alguns comandos que deveria trabalhar ser bem configuradas NIS cliente:

\# ypwhich                  \# Obtem a conexão NIS do servidor de nomes
# domainname               \# Configura o nome do domínio NIS
# ypcat group              \# Mostra o grupo do servidor NIS
# cd /var/yp && make       \# Reconstrói o yp banco de dados
# rpcinfo -p servername    \# Relatório de serviço RPC do servidor

Está ypbind executando?

\# ps auxww | grep ypbind
/usr/sbin/ypbind -s -m -S servername1,servername2	\# FreeBSD
/usr/sbin/ypbind           \# Linux
# yppoll passwd.byname
Mapeia o passwd.byname têm outro número 1190635041. Seg Sep 24 13:57:21 2007
O serviço master é servername.domain.net.

### Linux

\# cat /etc/yp.conf
ypserver nomeservidor
domain domain.net broadcast

## Netcat

[Netcat](http://netcat.sourceforge.net/)http://netcat.sourceforge.net (nc) é o melhor conhecido como "network Swiss Army Knife", isto pode ser manipulado, cria ou lê/escreve TCP/IP conecções. Aqui são usados alguns exemplos, lá alguns mais no net, por exemplo [g-loaded.eu\[...\]](http://www.g-loaded.eu/2006/11/06/netcat-a-couple-of-useful-examples)http://www.g-loaded.eu/2006/11/06/netcat-a-couple-of-useful-examples e [here](http://www.terminally-incoherent.com/blog/2007/08/07/few-useful-netcat-tricks)http://www.terminally-incoherent.com/blog/2007/08/07/few-useful-netcat-tricks.  
Você precisa usar comandos `netcat` em vez de `nc`. Também veja um comando similar [socat](http://www.dest-unreach.org/socat).

### Transferência de arquivo

Copia a largura do diretório sobre uma conexão. A transferência é muito rápido (não em cima do protocolo) e você não precisa para bagunçar com NFS ou SMB ou FTP ou então, faça um simples arquivo avaliado no servidor, e coloque isso no cliente. Aqui 192.168.1.1 é o endereço do servidor.

server# tar -cf - -C VIDEO\_TS . | nc -l -p 4444         \# Diretório tar na porta do servidor 4444
client# nc 192.168.1.1 4444 | tar xpf - -C VIDEO\_TS     \# Puxa o arquivo na porta 4444
server# cat largefile | nc -l 5678                      \# O único arquivo
client# nc 192.168.1.1 5678 > largefile                 \# Puxa o único arquivo
server# dd if=/dev/da0 | nc -l 4444                     \# Imagem da partição
client# nc 192.168.1.1 4444 | dd of=/dev/da0            \# Puxa a partição para o clone
client# nc 192.168.1.1 4444 | dd of=da0.img             \# Puxa a partição para o arquivo

### Outros hacks

Especialmente aqui, você conhece mais do que você faz.

#### Shell remota

Opção -e somente para a versão Windows? Ou usa [nc 1.10](http://download.insecure.org/stf/nc110.tgz).

\# nc -lp 4444 -e /bin/bash                        \# Fornece um shell remoto (servidor clandestino)
# nc -lp 4444 -e cmd.exe                          \# shell remoto para Windows

#### Servidor de emergência web

Servidor único arquivo na porta 80 no loop.

\# while true; do nc -l -p 80 < unixtoolbox.xhtml; done

#### Bate-papo

Alice e Bob pode conversar com um socket TCP simples. O texto é transferido com a chave de entrada.

alice# nc -lp 4444
bob  # nc 192.168.1.1 4444

## SSH SCP

[Chave Pública](#publickey) | [Fingerprint](#sshfingerprint) | [SCP](#scp) | [Tunelamento](#sshtunnel)

## Autenticação por chave pública

Conecte na máquina sem senha utilizando a autenticação por chave pública. A idéia é acrescentar sua chave pública para a authorized\_keys2 arquivo na máquina remota. Para isso veja o exemplo: **conecte _máquina-cliente_ para _máquina-servidor_**, a chave é gerada no cliente. Com cygwin você poderia ter criada em sua casa um diretório e o diretório do .ssh utilizando `# mkdir -p /home/USER/.ssh`

-   Usa ssh-keygen para gerar o par de chaves. `~/.ssh/id_dsa` is the private key, `~/.ssh/id_dsa.pub` é chave pública.
-   Copia somente a chave pública para acrescentar o arquivo no servidor `~/.ssh/authorized_keys2` em sua casa no servidor.

\# ssh-keygen -t dsa -N ''
# cat ~/.ssh/id\_dsa.pub | ssh you@host-server "cat - >> ~/.ssh/authorized\_keys2"

### Utilizando o cliente Windows ssh.com

A versão não comercial do cliente ssh.com pode ser feito o download no site ftp: [ftp.ssh.com/pub/ssh/](http://ftp.ssh.com/pub/ssh/). Chaves geradas pelo cliente ssh.com precisa ser convertido para o servidor OpenSSH. Isso pode ser feito com o comando ssh-keygen

-   Cria o par de chaves com o cliente ssh.com: Configurações - Autenticação do Usuário - Gerar Novo...
-   Eu uso o tipo de chave DSA; comprimento da chave 2048.
-   Copia a gera chave pública pelo ssh.com cliente para o servidor também o ~/.ssh diretório.
-   As chaves estão no C:\\Documents and Settings\\%USERNAME%\\Application Data\\SSH\\UserKeys.
-   Usa o comando ssh-keygen no servidor para converter a chave:
    
    \# cd ~/.ssh
    # ssh-keygen -i -f keyfilename.pub >> authorized\_keys2
    

_Aviso:_ Nós usamos a chave DSA, RSA é também possível. A chave não é protegida por senha.

### Usando o putty para Windows

[Putty](http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html)http://www.chiark.greenend.org.uk/~sgtatham/putty/download.html é simples e livre o cliente ssh para Windows.

-   Cria o par de chaves com o programa puTTYgen.
-   Salve a chave pública (por exemplo em C:\\Documents and Settings\\%USERNAME%\\.ssh).
-   Copia a chave pública para o servidor no ~/.ssh folder:
    
    \# scp .ssh/puttykey.pub [\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection):.ssh/
    
-   Usa o comando ssh-keygen no servidor para converter a chave para OpenSSH:
    
    \# cd ~/.ssh
    # ssh-keygen -i -f puttykey.pub >> authorized\_keys2
    
-   Ponto da chave privada localizada nas configurações putty: Conexão - SSH - Auth

## Checa fingerprint

No primeiro login, ssh perguntará se a máquina for desconhecida com o fingerprint tem que ser armazenada no na máquina desconhecida. Para evitar um man-in-the-middle ataque o administrador do servidor pode ser enviado para seu servidor fingerprint que é comparado no primeiro login. Usa `ssh-keygen -l` para obter o fingerprint (no servidor):

\# ssh-keygen -l -f /etc/ssh/ssh\_host\_rsa\_key.pub      \# Para chave RSA
2048 61:33:be:9b:ae:6c:36:31:fd:83:98:b7:99:2d:9f:cd /etc/ssh/ssh\_host\_rsa\_key.pub
# ssh-keygen -l -f /etc/ssh/ssh\_host\_dsa\_key.pub      \# Para DSA (padrão)
2048 14:4a:aa:d9:73:25:46:6d:0a:48:35:c7:f4:16:d4:ee /etc/ssh/ssh\_host\_dsa\_key.pub

Agora o cliente se conectar a esse servidor, pode verificar que ele está se conectando ao servidor direito:

\# ssh linda
A autenticação da máquina 'linda (192.168.16.54)' não pode ser estabelecida.
Chave DSA fingerprint é 14:4a:aa:d9:73:25:46:6d:0a:48:35:c7:f4:16:d4:ee.
Você tem certeza que deseja continuar a conexão (sim/não)? sim

## Transferência segura de arquivos

Alguns comandos simples:

\# scp file.txt host-two:/tmp
# scp joe@host-two:/www/\*.html /www/tmp
# scp -r joe@host-two:/www /www/tmp

No Konqueror ou Midnight Commander isso é possível para o acesso do sistema remoto com o endereço **fish://user@porta**. Entretanto a implementação é muito lenta.  
Além disso é possível para montar o diretório remoto com **sshfs** um sistema de arquivo baseada no SCP. [Veja sshfs](http://fuse.sourceforge.net/sshfs.html)http://fuse.sourceforge.net/sshfs.html.

## Tunelamento

Tunelamento SSH permite o encaminhamento ou reverte para frente de uma porta através da conexão SSH, garantindo assim o tráfego e o acesso das portas que de outra fora são bloqueadas. Isso só com TCP. A nomenclatura geral para o encaminhamento e o reverso é (veja também [ssh and NAT example](#sshnat)):

\# ssh -L localport:desthost:destport user@gate  \# desthost como pode ser visto a partir do portão
# ssh -R destport:desthost:localport user@gate  \# porta local encaminha para o seu destino
    \# desthost: localport como pode ser visto a partir do cliente do início do túnel
# ssh -X user@gate   \# Para forçar encaminhamento X

Este conectará na porta e encaminhará a porta local para a máquina desthost: destport. Nota desthost é a máquina de destino _como pode ser visto pela porta_, então se a conexão é para a porta, então o desthost é o localhost. Mais do que uma porta para o encaminhamento é possível.

### Encaminha direto para a porta

Vamos dizer que nós queremos acessar o CVS (porta 2401) e http (porta 80) que estão executando na porta. Esse é simplesmente exemplo, na máquina destino é assim a máquina local, e nós usamor a porta 8080 localmente instanciada de 80 por isso não precisa ser o root. Primeiro a sessão ssh é aberta, ambos os services são acessíveis nas portas locais.

\# ssh -L 2401:localhost:2401 -L 8080:localhost:80 usuario@porta

### Netbios e desktop remoto encaminham para um segundo servidor

Vamos dizer que um servidor smb Windows a porta está por trás e não está executando o ssh. Nós precisamos de acesso ao compartilhamento SMB e desktop remoto também para o servidor.

\# ssh -L 139:smbserver:139 -L 3388:smbserver:3389 usuario@porta

O compartilhamento SMB pode agora ser acessado com \\\\127.0.0.1\\, mas somente se o local do compartilhamento desabilitado, porque _o local do compartilhamento é ouvido na porta 139_.  
Isto é possível para manter o local compartilhado habilitado, para isso nós precisamos criar um novo dispositivo virtual com um novo endereço IP para o tunelamento, o compartilhamento smb conectará através do endereço. Além disso _o local RDP está pronto para ser ouvido na porta 3389_, então nós escolhemos 3388. Para isso vamos usar um IP virtual 10.1.1.1.

-   Com putty usa-se Origem porta=10.1.1.1:139. É possível a criação múltipla de dispositivos de loop e o túnel. No Windows 2000, somente putty funcionou comigo. No Windows Vista também encaminhará a porta 445 na adição para a porta 139. Também no Vista o pacote KB942624 impede a porta 445 para ser encaminhada, então eu tive que desinstalar esse pacote no Vista.
-   Com o cliente ssh.com, desabilite "Permite somente conexão local". Desde que ssh.com vinculará todos os endereços, apenas uma parte única pode ser conectado.

Agora cria a interface loopback com o IP 10.1.1.1:

-   \# Sistema->Painel de Controle->Adicionar Hardware # Sim, Hardware está pronto para ser conectado # Adiciona um novo hardware (em baixo).
-   \# Instala o hardware que manualmente selecionado # Adaptador de Rede # Microsoft , Microsoft Adaptador Loopback.
-   Configura o endereço IP do dispositivo falso para 10.1.1.1 mask 255.255.255.0, sem gateway.
-   avançado->WINS, Habilita LMHosts Lookup; Desabilita NetBIOS sobre TCP/IP.
-   \# Habilita Cliente para Microsoft redes. # Desabilita compartilhamento de arquivo e impressora para a rede Microsoft.

Tive que reiniciar para esse trabalho. Agora conecta para o compartilhamento com \\\\10.1.1.1 e o desktop remoto para 10.1.1.1:3388.

#### Debug

Se não funcionar

-   São as portas encaminhadas: netstat -an? Veja isto 0.0.0.0:139 ou 10.1.1.1:139
-   Faz telnet 10.1.1.1 139 conectado?
-   Você precisa checar o box "Portas local aceita conexões de outras máquinas".
-   É o "Compartilhamento de arquivo e impressora para redes Microsoft" desabilitou na interface loopback?

### conexão de dois clientes atrás do NAT

Suponhamos dois clientes estão fazendo o gateway NAT e o cliente cliadmin têm conexão para cliente cliusuario (destino), ambos podem logar para a porta com ssh e são executados no Linux com sshd. Você não precisará ter acesso root em nenhum lugar desde que as portas do portão estão acima de 1024. Nós usamos 2022 na porta. Também porque a porta é usada localmente, a opção GatewayPorts não é necessário.  
No cliente cliusuario (de destino para a porta):

\# ssh -R 2022:localhost:22 usuario@porta            \# encaminha o cliente 22 para a porta: 2022

No cliente cliadmin (da máquina da porta):

\# ssh -L 3022:localhost:2022 admin@porta         \# encaminha o cliente 3022 para a porta:2022

Agora o administrador pode ligar diretamente para o cliente cliusuario com:

\# ssh -p 3022 admin@localhost                   \# local:3022 -> porta:2022 -> cliente:22

### Conecta com VNC por trás do NAT

Suponhamos um cliente Windows VNC escutando na porta 5900 tem que ter o acesso por trás do NAT. No cliente cliwin a porta:

\# ssh -R 15900:localhost:5900 user@gate

On client cliadmin (from host to gate):

\# ssh -L 5900:localhost:15900 admin@gate

Agora o administrador pode conectar diretamente ao cliente VNC com:

\# vncconnect -display :0 localhost

### Escave um túnel ssh multi-hop

Suponhamos que você não possa alcançar o servidor diretamente com ssh, mas somente através de várias máquinas (por exemplo, por causa de questões de roteamento). Às vezes, ainda é necessário para obter um cliente direto - conexão com o servidor, por exemplo, para copiar arquivos com scp ou encaminhar outras portas como SMB ou VNC. Uma maneira de fazer isso é a cadeia de túneis em conjunto para avançar com uma porta para o servidor ao longo do lúpulo. Este transportador porto só chega ao seu destino final na última conexão com o servidor.  
Suponha que queremos transmitir a porta SSH a partir de um cliente para um servidor mais de dois saltos. Uma vez que o túnel é construído, é possível se conectar ao servidor diretamente do cliente (e também adiciona outra porta para o encaminhamento).

#### Criando túnel no shell

cliente -> maquina1 -> maquina2 -> servidor e escavar túnel 5678

cliente>\# ssh -L5678:localhost:5678 máquina1        \# 5678 é uma porta arbitraria para o túnel
maquina\_1>\# ssh -L5678:localhost:5678 máquina2        \# sequência 5678 da máquina1 para a máquina2
maquina\_2>\# ssh -L5678:localhost:22 servidor         \# No final do túnel na porta 22 no servidor

#### Utilizando túnel com outro shell

cliente -> usando o túnel 5678 no servidor

\# ssh -p 5678 localhost                         \# conecta diretamente do cliente para o servidor
# scp -P 5678 myfile localhost:/tmp/            \# ou copia o arquivo diretamente utilizando o túnel
# rsync -e 'ssh -p 5678' myfile localhost:/tmp/ \# ou rsync o arquivo diretamente para o servidor

### Autoconnect script e manter vivo

Eu uso as variações do script a seguir para manter uma máquina alcançáveis por um túnel SSH reverso. A conexão é automaticamente reconstruída se fechado. Você pode adicionar vários `-L` or `-R` túneis em uma linha.

#!/bin/sh
COMMAND="ssh -N -f -g -R 3022:localhost:22 [\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection)"
pgrep -f -x "$COMMAND" > /dev/null 2>&1 || $COMMAND
exit 0

1 \* \* \* \* colin /home/colin/port\_forward.sh     \# crontab entrada (aqui a cada hora)

## VPN com SSH

A partir da versão 4.3, o OpenSSH pode usar o dispositivo tun/tap para encriptar um tunnel. Isto é muito semelhante a outras soluções VPN baseada em TLS como o OpenVPN. Uma vantagem com o SSH é que não há a necessidade de instalar e configurar um software adcional. Além disso o tunel utiliza a autenticação SSH como a chave compartilhada. A desvantagem é que o encapsulamento feito através do TCP que poderiam resultar em um desempenho ruim em um link lento. Além disso, o túnel está confiando em uma única conexão TCP (frágil). Esta técnica é muito útil para a configuração rápida de uma VPN baseada em IP. Não há nenhuma limitação quanto à única porta TCP, todas os protocolos de camadas 3/4 como o ICMP, TCP/UDP, etc são transmitidos através da VPN. Em qualquer caso, as seguintes opções são necessárias no arquivo sshd\_conf:

PermitRootLogin yes
PermitTunnel yes

## Conexão P2P Única

Aqui estamos conectando dois hosts, e hclient hserver com um túnel peer to peer. A conexão é _started from hclient_ para o hserver é feito como root. Os pontos de extremidade do túnel são 10.0.1.1 (servidor) e 10.0.1.2 (cliente) e criamos um dispositivo tun5 (isso também poderia ser um outro número). O procedimento é muito simples:

-   Conectar com SSH usando o túnel, opção-w
-   Configure os endereços IP do túnel. Uma vez no servidor e uma vez o cliente.

### Conectar ao servidor

Conexão iniciada no cliente e os comandos são executados no servidor.

#### Linux é o Servidor

cli># ssh -w5:5 root@hserver
srv># ifconfig tun5 10.0.1.1 netmask 255.255.255.252   \# Executada no shell do servidor

#### FreeBSD é o Servidor

cli># ssh -w5:5 root@hserver
srv># ifconfig tun5 10.0.1.1 10.0.1.2                  \# Executada no shell do servidor

### Configure o Cliente

Comandos executados no cliente:

cli># ifconfig tun5 10.0.1.2 netmask 255.255.255.252   \# Cliente é um Linux
cli># ifconfig tun5 10.0.1.2 10.0.1.1                  \# Cliente é um FreeBSD

Os dois hosts estão conectados de forma transparente e podem se comunicar com qualquer protocolo de camada 3/4 usando os endereços IP do túnel.

## Conectar Duas Redes

Além da instalação p2p acima, é mais útil conectar duas redes provadas com uma VPN SSH usando dois gateways. Supondo o exemplo, netA é 192.168.51.0/24 e netB 192.168.16.0/24. O procedimento é semelhante ao citado acima, nós precisamos somente adicionar o roteamento. O NAT deve ser ativado na interface privada somente se os gateways não são padrão da sua rede.  
192.168.51.0/24 (netA)|gatewayA <-> gatewayB|192.168.16.0/24 (netB)

-   Conectar com SSH usando o túnel, opção-w
-   Configure os endereços IP do túnel. Uma vez no servidor e uma vez o cliente.
-   Adicione o roteamento para as duas redes.
-   Se necessário, ative o NAT na interface privada do gateway.

A instalação é _started from gatewayA in netA_.

### Conectar do GatewayA para o GatewayB

A conexão é iniciada a partir gatewayA e os comandos são executados em gatewayB

#### GatewayB é o Linux

gatewayA># ssh -w5:5 root@gateB
gatewayB># ifconfig tun5 10.0.1.1 netmask 255.255.255.252 \# Executada no shell do GatewayB
gatewayB># route add -net 192.168.51.0 netmask 255.255.255.0 dev tun5
gatewayB># echo 1 > /proc/sys/net/ipv4/ip\_forward        \# Somente necessário se o gateway não for padrão
gatewayB># iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

#### GatewayB é o FreeBSD

gatewayA># ssh -w5:5 root@gateB                          \# Cria o dispositivo tun5
gatewayB># ifconfig tun5 10.0.1.1 10.0.1.2               \# Executada no shell do GatewayB
gatewayB># route add 192.168.51.0/24 10.0.1.2
gatewayB># sysctl net.inet.ip.forwarding=1               \# Somente necessário se o gateway não for padrão
gatewayB># natd -s -m -u -dynamic -n fxp0                \# veja [NAT](#nat)
gatewayA># sysctl net.inet.ip.fw.enable=1

### Configure GatewayA

Comando executado no GatewayA

#### GatewayA é o Linux

gatewayA># ifconfig tun5 10.0.1.2 netmask 255.255.255.252
gatewayA># route add -net 192.168.16.0 netmask 255.255.255.0 dev tun5
gatewayA># echo 1 > /proc/sys/net/ipv4/ip\_forward
gatewayA># iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE

#### GatewayA é o FreeBSD

gatewayA># ifconfig tun5 10.0.1.2 10.0.1.1
gatewayA># route add 192.168.16.0/24 10.0.1.2
gatewayA># sysctl net.inet.ip.forwarding=1
gatewayA># natd -s -m -u -dynamic -n fxp0                \# veja [NAT](#nat)
gatewayA># sysctl net.inet.ip.fw.enable=1

Agora as duas redes privadas estão conectadas transparentemente via VPN SSH. O NAT soemten é necessário se os gateways não forem o padrão da rede. Neste caso os clientes não sabem para onde encaminhar a resposta,e o nat deverá ser ativado.

## RSYNC

Rsync quase pode substituir completamente o cp e scp, além disso, se interromper as transferências são eficientemente reiniciado. A página do manual é boa... Aqui alguns Exemplos:  
Copia o conteúdo completo do diretório:

\# rsync -a /home/colin/ /backup/colin/                \# modo "arquivo". manter o mesmo
# rsync -a /var/ /var\_bak/
# rsync -aR --delete-during /home/user/ /backup/      \# utilização relativa (veja abaixo)

Mesmo que a anterior, porém sobre a rede com com compressão. O Rsync usa o SSH por padrão para o transporte e usará as chaves ssh se for definido. Use ":" como o SCP. Uma típica cópia remota:

\# rsync -axSRzv /home/user/ user@server:/backup/user/ \# Cópia remota
# rsync -a 'user@server:My\\ Documents' My\\ Documents  \# Simula a cópia para uma shell remota

Excluir qualquer diretório tmp dentro de /home/user/ e manter a hierarquia de pastas relativa, que o diretório remoto terá a estrutura /backup/home/user/. Isto é tipicamente usado para backups.

\# rsync -azR --exclude=tmp/ /home/user/ user@server:/backup/

Usa a porta 20022 para a conexão ssh:

\# rsync -az -e 'ssh -p 20022' /home/colin/ user@server:/backup/colin/

Usando o daemon rsync (usado com "::") é muito rápido, porém não encriptografados por ssh. A localização do /backup é definido pela configuração em /etc/rsyncd.conf. A variável RSYNC\_PASSWORD pode ser ajustado para evitar a necessidade de digitar a senha manualmente.

\# rsync -axSRz /home/ ruser@hostname::rmodule/backup/
# rsync -axSRz ruser@hostname::rmodule/backup/ /home/    \# Para copiar de volta

Algumas opções importantes:

-   `-a, --archive`       modo arquivo; mesmo que -rlptgoD (sem -H)
-   `-r, --recursive`       recursivo em diretórios
-   `-R, --relative`       usar nome de diretórios relativo
-   `-H, --hard-links`       preserva os links
-   `-S, --sparse`       manipula os arquivos de forma eficiente
-   `-x, --one-file-system`       não atravessa o limite do sistema de arquivos
-   `--exclude=PATTERN`       Exclui os arquivos padrões
-   `--delete-during`       exclui receptor durante xfer, não antes
-   `--delete-after`       exclui receptor após a transferência, não antes

## Rsync em Windows

Rsync está disponível para Windows através do Cygwin ou empacotado em [cwrsync](http://sourceforge.net/projects/sereds/)http://sourceforge.net/projects/sereds. Isto é muito conveniente para backups automatizados. Instalar um deles (_not both_) e adicione o caminho para as variáveis do sistema Windows: # Painel de controle -> Sistema -> aba Avançado, botão Variáveis de Ambiente. Edite a "Pasta" variáveis de sistema e adicione o caminho completo para o rsync instalado, exemplo: C:\\Program Files\\cwRsync\\bin ou C:\\cygwin\\bin. Desta forma os comandos `rsync` e `ssh` estão disponíveis no shell do Windows.

### Autenticação via Chave Pública

Rsync é automaticamente encapsulada por SSH e, portanto, usa a autenticação no servidor SSH. os backups automáticos para evitar a interação do usuário usa autenticação SSH via chave pública e pode ser usado o comando rsync que será executado sem uma senha.  
Todos os seguintes comandos são executados dentro de um console do Windows. Em um console (Iniciar -> Executar -> cmd) crie e carregue a chave conforme descrito no [SSH](#ssh), altere o "user" e "server" as appropriate. If the file authorized\_keys2 does not exist yet, simply copy id\_dsa.pub to authorized\_keys2 and upload it.conforme o caso. Se o arquivo authorized\_keys2 ainda não existe, basta copiar id\_dsa.pub para authorized\_keys2 e carregá-lo.

\# ssh-keygen -t dsa -N ''                   \# Cria a chave pública e privada
# rsync user@server:.ssh/authorized\_keys2 . \# Copia o arquivo localmente do server
# cat id\_dsa.pub >> authorized\_keys2        \# Ou usar um editor para adicionar a chave
# rsync authorized\_keys2 user@server:.ssh/  \# Copia o arquivo de volta para o server
# del authorized\_keys2                      \# Remove a cópia local

Agora teste com (em uma linha):

rsync -rv "/cygdrive/c/Documents and Settings/%USERNAME%/My Documents/" \\
'user@server:My\\ Documents/'

### Backup Automático

Use um arquivo em lotes para automatizar o backup e adicionar o arquivo nas tarefas agendadas (Programas -> Acessórios -> Ferramentas do Systema -> Tarefas Agendadas). Por exemplo crie o arquivo backup.bat e substitua user@server.

@ECHO OFF
REM rsync o diretório My Documents
SETLOCAL
SET CWRSYNCHOME=C:\\PROGRAM FILES\\CWRSYNC
SET CYGWIN=nontsec
SET CWOLDPATH=%PATH%
REM descomente a linha seguinte, se usar cygwin
SET PATH=%CWRSYNCHOME%\\BIN;%PATH%
echo Pressione Control-C para Abortar
rsync -av "/cygdrive/c/Documents and Settings/%USERNAME%/My Documents/" \\
'user@server:My\\ Documents/'
pause

## SUDO

Sudo is a standard way to give users some administrative rights without giving out the root password. Sudo is very useful in a multi user environment with a mix of server and workstations. Simply call the command with sudo:

\# sudo /etc/init.d/dhcpd restart            \# Run the rc script as root
# sudo -u sysadmin whoami                   \# Run cmd as an other user

## Configuration

Sudo is configured in `/etc/sudoers` and must only be edited with `visudo`. The basic syntax is (the lists are comma separated):

user hosts = (runas) commands          \# In /etc/sudoers

-   `users` one or more users or %group (like %wheel) to gain the rights
-   `hosts` list of hosts (or ALL)
-   `runas` list of users (or ALL) that the command rule can be run as. It is enclosed in ( )!
-   `commands` list of commands (or ALL) that will be run as root or as (runas)

Additionally those keywords can be defined as alias, they are called User\_Alias, Host\_Alias, Runas\_Alias and Cmnd\_Alias. This is useful for larger setups. Here a sudoers example:

\# cat /etc/sudoers
\# Host aliases are subnets or hostnames.
Host\_Alias   DMZ     = 212.118.81.40/28
Host\_Alias   DESKTOP = work1, work2

\# User aliases are a list of users which can have the same rights
User\_Alias   ADMINS  = colin, luca, admin
User\_Alias   DEVEL   = joe, jack, julia
Runas\_Alias  DBA     = oracle,pgsql

\# Command aliases define the full path of a list of commands
Cmnd\_Alias   SYSTEM  = /sbin/reboot,/usr/bin/kill,/sbin/halt,/sbin/shutdown,/etc/init.d/
Cmnd\_Alias   PW      = /usr/bin/passwd \[A-z\]\*, !/usr/bin/passwd root \# Not root pwd!
Cmnd\_Alias   DEBUG   = /usr/sbin/tcpdump,/usr/bin/wireshark,/usr/bin/nmap

\# The actual rules
root,ADMINS  ALL     = (ALL) NOPASSWD: ALL    \# ADMINS can do anything w/o a password.
DEVEL        DESKTOP = (ALL) NOPASSWD: ALL    \# Developers have full right on desktops
DEVEL        DMZ     = (ALL) NOPASSWD: DEBUG  \# Developers can debug the DMZ servers.

\# User sysadmin can mess around in the DMZ servers with some commands.
sysadmin     DMZ     = (ALL) NOPASSWD: SYSTEM,PW,DEBUG
sysadmin     ALL,!DMZ = (ALL) NOPASSWD: ALL   \# Can do anything outside the DMZ.
%dba         ALL     = (DBA) ALL              \# Group dba can run as database user.

\# anyone can mount/unmount a cd-rom on the desktop machines
ALL          DESKTOP = NOPASSWD: /sbin/mount /cdrom,/sbin/umount /cdrom

## Encrypt Files

## OpenSSL

### A single file

Encrypt and decrypt:

\# openssl aes-128-cbc -salt -in file -out file.aes
# openssl aes-128-cbc -d -salt -in file.aes -out file

Note that the file can of course be a tar archive.

### tar and encrypt a whole directory

\# tar -cf - directory | openssl aes-128-cbc -salt -out directory.tar.aes      \# Encrypt
# openssl aes-128-cbc -d -salt -in directory.tar.aes | tar -x -f -            \# Decrypt

### tar zip and encrypt a whole directory

\# tar -zcf - directory | openssl aes-128-cbc -salt -out directory.tar.gz.aes  \# Encrypt
# openssl aes-128-cbc -d -salt -in directory.tar.gz.aes | tar -xz -f -        \# Decrypt

-   Use -k mysecretpassword after aes-128-cbc to avoid the interactive password request. However note that this is highly insecure.
-   Use **aes-256-cbc** instead of **aes-128-cbc** to get even stronger encryption. This uses also more CPU.

## GPG

[GnuPG](http://gnupg.org/) is well known to encrypt and sign emails or any data. Furthermore gpg and also provides an advanced key management system. This section only covers files encryption, not email usage, signing or the Web-Of-Trust.  
The simplest encryption is with a symmetric cipher. In this case the file is encrypted with a password and anyone who knows the password can decrypt it, thus the keys are not needed. Gpg adds an extention ".gpg" to the encrypted file names.

\# gpg -c file                        \# Encrypt file with password
# gpg file.gpg                       \# Decrypt file (optionally -o otherfile)

### Using keys

For more details see [GPG Quick Start](http://www.madboa.com/geek/gpg-quickstart)http://www.madboa.com/geek/gpg-quickstart and [GPG/PGP Basics](http://aplawrence.com/Basics/gpg.html)http://aplawrence.com/Basics/gpg.html and the [gnupg documentation](http://gnupg.org/documentation)http://gnupg.org/documentation among others.  
The private and public keys are the heart of asymmetric cryptography. What is important to remember:

-   Your public key is used by _others_ to encrypt files that only you as the receiver can decrypt (not even the one who encrypted the file can decrypt it). The public key is thus meant to be distributed.
-   Your private key is encrypted with your passphrase and is used to decrypt files which were encrypted with _your_ public key. The private key must be kept **secure**. Also if the key or passphrase is lost, so are all the files encrypted with your public key.
-   The key files are called keyrings as they can contain more than one key.

First generate a key pair. The defaults are fine, however you will have to enter at least your full name and email and optionally a comment. The comment is useful to create more than one key with the same name and email. Also you should use a "passphrase", not a simple password.

\# gpg --gen-key                      \# This can take a long time

The keys are stored in ~/.gnupg/ on Unix, on Windows they are typically stored in  
C:/Documents and Settings/%USERNAME%/Application Data/gnupg/.

~/.gnupg/pubring.gpg                 \# Contains your public keys and all others imported
~/.gnupg/secring.gpg                 \# Can contain more than one private key

Short reminder on most used options:

-   **\-e** encrypt data
-   **\-d** decrypt data
-   **\-r** NAME encrypt for recipient NAME (or 'Full Name' or 'email@domain')
-   **\-a** create ascii armored output of a key
-   **\-o** use as output file

The examples use 'Your Name' and 'Alice' as the keys are referred to by the email or full name or partial name. For example I can use 'Colin' or '[\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection)' for my key \[Colin Barschel (cb.vu) <[\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection)\>\].

### Encrypt for personal use only

No need to export/import any key for this. You have both already.

\# gpg -e -r 'Your Name' file                  \# Encrypt with your public key
# gpg -o file -d file.gpg                     \# Decrypt. Use -o or it goes to stdout

### Encrypt - Decrypt with keys

First you need to export your public key for someone else to use it. And you need to import the public say from Alice to encrypt a file for her. You can either handle the keys in simple ascii files or use a public key server.  
For example Alice export her public key and you import it, you can then encrypt a file for her. That is only Alice will be able to decrypt it.

\# gpg -a -o alicekey.asc --export 'Alice'     \# Alice exported her key in ascii file.
# gpg --send-keys --keyserver subkeys.pgp.net KEYID   \# Alice put her key on a server.
# gpg --import alicekey.asc                   \# You import her key into your pubring.
# gpg --search-keys --keyserver subkeys.pgp.net 'Alice' \# or get her key from a server.

Once the keys are imported it is very easy to encrypt or decrypt a file:

\# gpg -e -r 'Alice' file                      \# Encrypt the file for Alice.
# gpg -d file.gpg -o file                     \# Decrypt a file encrypted by Alice for you.

### Key administration

\# gpg --list-keys                             \# list public keys and see the KEYIDS
    The KEYID follows the '/' e.g. for: pub   1024D/D12B77CE the KEYID is D12B77CE
# gpg --gen-revoke 'Your Name'                \# generate revocation certificate
# gpg --list-secret-keys                      \# list private keys
# gpg --delete-keys NAME                      \# delete a public key from local key ring
# gpg --delete-secret-key NAME                \# delete a secret key from local key ring
# gpg --fingerprint KEYID                     \# Show the fingerprint of the key
# gpg --edit-key KEYID                        \# Edit key (e.g sign or add/del email)

## Encrypt Partitions

[Linux with LUKS](#wluks) | [Linux dm-crypt only](#woluks) | [FreeBSD GELI](#bsdgeli) | [FBSD pwd only](#bsdpwd)

There are (many) other alternative methods to encrypt disks, I only show here the methods I know and use. Keep in mind that the security is only good as long the OS has not been tempered with. An intruder could easily record the password from the keyboard events. Furthermore the data is freely accessible when the partition is _attached_ and will not prevent an intruder to have access to it in this state.

Those instructions use the Linux `dm-crypt` (device-mapper) facility available on the 2.6 kernel. In this example, lets encrypt the partition `/dev/sdc1`, it could be however any other partition or disk, or USB or a file based partition created with `losetup`. In this case we would use `/dev/loop0`. See [file image partition](#losetup). The device mapper uses labels to identify a partition. We use `sdc1` in this example, but it could be any string.

### dm-crypt with LUKS

LUKS with dm-crypt has better encryption and makes it possible to have multiple passphrase for the same partition or to change the password easily. To test if LUKS is available, simply type `# cryptsetup --help`, if nothing about LUKS shows up, use the instructions below [Without LUKS](#woluks). First create a partition if necessary: `fdisk /dev/sdc`.

#### Create encrypted partition

\# dd if=/dev/urandom of=/dev/sdc1          \# Optional. For paranoids only (takes days)
# cryptsetup -y luksFormat /dev/sdc1       \# This destroys any data on sdc1
# cryptsetup luksOpen /dev/sdc1 sdc1
# mkfs.ext3 /dev/mapper/sdc1               \# create ext3 file system
# mount -t ext3 /dev/mapper/sdc1 /mnt
# umount /mnt
# cryptsetup luksClose sdc1                \# Detach the encrypted partition

#### Attach

\# cryptsetup luksOpen /dev/sdc1 sdc1
# mount -t ext3 /dev/mapper/sdc1 /mnt

#### Detach

\# umount /mnt
# cryptsetup luksClose sdc1

### dm-crypt without LUKS

\# cryptsetup -y create sdc1 /dev/sdc1      \# or any other partition like /dev/loop0
# dmsetup ls                               \# check it, will display: sdc1 (254, 0)
# mkfs.ext3 /dev/mapper/sdc1               \# This is done only the first time!
# mount -t ext3 /dev/mapper/sdc1 /mnt
# umount /mnt/
# cryptsetup remove sdc1                   \# Detach the encrypted partition

Do exactly the same (without the mkfs part!) to re-attach the partition. If the password is not correct, the mount command will fail. In this case simply remove the map sdc1 (`cryptsetup remove sdc1`) and create it again.

## FreeBSD

The two popular FreeBSD disk encryption modules are `gbde` and `geli`. I now use geli because it is faster and also uses the crypto device for hardware acceleration. See The [FreeBSD handbook Chapter 18.6](http://www.freebsd.org/handbook/disks-encrypting.html)http://www.freebsd.org/handbook/disks-encrypting.html for all the details. The geli module must be loaded or compiled into the kernel:

options GEOM\_ELI
device crypto                                       \# or as module:
# echo 'geom\_eli\_load="YES"' >> /boot/loader.conf   \# or do: kldload geom\_eli

### Use password and key

I use those settings for a typical disk encryption, it uses a passphrase AND a key to encrypt the master key. That is you need both the password and the generated key `/root/ad1.key` to attach the partition. The master key is stored inside the partition and is not visible. See below for typical USB or file based image.

#### Create encrypted partition

\# dd if=/dev/random of=/root/ad1.key bs=64 count=1  \# this key encrypts the mater key
# geli init -s 4096 -K /root/ad1.key /dev/ad1       \# -s 8192 is also OK for disks
# geli attach -k /root/ad1.key /dev/ad1             \# DO make a backup of /root/ad1.key
# dd if=/dev/random of=/dev/ad1.eli bs=1m           \# Optional and takes a long time
# newfs /dev/ad1.eli                                \# Create file system
# mount /dev/ad1.eli /mnt

#### Attach

\# geli attach -k /root/ad1.key /dev/ad1
# fsck -ny -t ffs /dev/ad1.eli                      \# In doubt check the file system
# mount /dev/ad1.eli /mnt

#### Detach

The detach procedure is done automatically on shutdown.

\# umount /mnt
# geli detach /dev/ad1.eli

#### /etc/fstab

The encrypted partition can be configured to be mounted with /etc/fstab. The password will be prompted when booting. The following settings are required for this example:

\# grep geli /etc/rc.conf
geli\_devices="ad1"
geli\_ad1\_flags="-k /root/ad1.key"
# grep geli /etc/fstab
/dev/ad1.eli         /home/private              ufs             rw      0       0

### Use password only

It is more convenient to encrypt a USB stick or file based image with a passphrase only and no key. In this case it is not necessary to carry the additional key file around. The procedure is very much the same as above, simply without the key file. Let's encrypt a file based image `/cryptedfile` of 1 GB.

\# dd if=/dev/zero of=/cryptedfile bs=1M count=1000  \# 1 GB file
# mdconfig -at vnode -f /cryptedfile
# geli init /dev/md0                                \# encrypts with password only
# geli attach /dev/md0
# newfs -U -m 0 /dev/md0.eli
# mount /dev/md0.eli /mnt
# umount /dev/md0.eli
# geli detach md0.eli

It is now possible to mount this image on an other system with the password only.

\# mdconfig -at vnode -f /cryptedfile
# geli attach /dev/md0
# mount /dev/md0.eli /mnt

## SSL Certificates

So called SSL/TLS certificates are cryptographic public key certificates and are composed of a public and a private key. The certificates are used to authenticate the endpoints and encrypt the data. They are used for example on a web server (https) or mail server (imaps).

## Procedure

-   We need a certificate authority to sign our certificate. This step is usually provided by a vendor like Thawte, Verisign, etc., however we can also create our own.
-   Create a certificate signing request. This request is like an unsigned certificate (the public part) and already contains all necessary information. The certificate request is normally sent to the authority vendor for signing. This step also creates the private key on the local machine.
-   Sign the certificate with the certificate authority.
-   If necessary join the certificate and the key in a single file to be used by the application (web server, mail server etc.).

## Configure OpenSSL

We use /usr/local/certs as directory for this example check or edit /etc/ssl/openssl.cnf accordingly to your settings so you know where the files will be created. Here are the relevant part of openssl.cnf:

\[ CA\_default \]
dir             = /usr/local/certs/CA       \# Where everything is kept
certs           = $dir/certs                \# Where the issued certs are kept
crl\_dir         = $dir/crl                  \# Where the issued crl are kept
database        = $dir/index.txt            \# database index file.

Make sure the directories exist or create them

\# mkdir -p /usr/local/certs/CA
# cd /usr/local/certs/CA
# mkdir certs crl newcerts private
# echo "01" > serial                        \# Only if serial does not exist
# touch index.txt

If you intend to get a signed certificate from a vendor, you only need a certificate signing request (CSR). This CSR will then be signed by the vendor for a limited time (e.g. 1 year).

## Create a certificate authority

If you do not have a certificate authority from a vendor, you'll have to create your own. This step is not necessary if one intend to use a vendor to sign the request. To make a certificate authority (CA):

\# openssl req -new -x509 -days 730 -config /etc/ssl/openssl.cnf \\
-keyout CA/private/cakey.pem -out CA/cacert.pem

## Create a certificate signing request

To make a new certificate (for mail server or web server for example), first create a request certificate with its private key. If your application do not support encrypted private key (for example UW-IMAP does not), then disable encryption with `-nodes`.

\# openssl req -new -keyout newkey.pem -out newreq.pem \\
-config /etc/ssl/openssl.cnf
# openssl req -nodes -new -keyout newkey.pem -out newreq.pem \\
-config /etc/ssl/openssl.cnf                \# No encryption for the key

Keep this created CSR (`newreq.pem`) as it can be signed again at the next renewal, the signature onlt will limit the validity of the certificate. This process also created the private key `newkey.pem`.

## Sign the certificate

The certificate request has to be signed by the CA to be valid, this step is usually done by the vendor. _Note: replace "servername" with the name of your server in the next commands_.

\# cat newreq.pem newkey.pem > new.pem
# openssl ca -policy policy\_anything -out servernamecert.pem \\
-config /etc/ssl/openssl.cnf -infiles new.pem
# mv newkey.pem servernamekey.pem

Now servernamekey.pem is the private key and servernamecert.pem is the server certificate.

## Create united certificate

The IMAP server wants to have both private key and server certificate in the same file. And in general, this is also easier to handle, but the file has to be kept securely!. Apache also can deal with it well. Create a file servername.pem containing both the certificate and key.

-   Open the private key (servernamekey.pem) with a text editor and copy the private key into the "servername.pem" file.
-   Do the same with the server certificate (servernamecert.pem).

The final servername.pem file should look like this:

\-----BEGIN RSA PRIVATE KEY-----
MIICXQIBAAKBgQDutWy+o/XZ/\[...\]qK5LqQgT3c9dU6fcR+WuSs6aejdEDDqBRQ
-----END RSA PRIVATE KEY-----
-----BEGIN CERTIFICATE-----
MIIERzCCA7CgAwIBAgIBBDANB\[...\]iG9w0BAQQFADCBxTELMAkGA1UEBhMCREUx
-----END CERTIFICATE-----

What we have now in the directory /usr/local/certs/:

-   CA/private/cakey.pem _(CA server private key)_
-   CA/cacert.pem _(CA server public key)_
-   certs/servernamekey.pem _(server private key)_
-   certs/servernamecert.pem _(server signed certificate)_
-   certs/servername.pem _(server certificate with private key)_

Keep the private key secure!

## View certificate information

To view the certificate information simply do:

\# openssl x509 -text -in servernamecert.pem      \# View the certificate info
# openssl req -noout -text -in server.csr        \# View the request info
# openssl s\_client -connect cb.vu:443            \# Check a web server certificate

## CVS

[Server setup](#cvssetup) | [CVS test](#cvstest) | [SSH tunneling](#cvsssh) | [CVS usage](#cvsusage)

## Server setup

### Initiate the CVS

Decide where the main repository will rest and create a root cvs. For example /usr/local/cvs (as root):

\# mkdir -p /usr/local/cvs
# setenv CVSROOT /usr/local/cvs      \# Set CVSROOT to the new location (local)
# cvs init                           \# Creates all internal CVS config files
# cd /root
# cvs checkout CVSROOT               \# Checkout the config files to modify them
# cd CVSROOT
edit config ( fine as it is)
# cvs commit config
cat >> writers                       \# Create a writers file (optionally also readers)
colin
^D                                   \# Use \[Control\]\[D\] to quit the edit
# cvs add writers                    \# Add the file writers into the repository
# cvs edit checkoutlist
# cat >> checkoutlist
writers
^D                                   \# Use \[Control\]\[D\] to quit the edit
# cvs commit                         \# Commit all the configuration changes

Add a **readers** file if you want to differentiate read and write permissions _Note:_ Do not (ever) edit files directly into the main cvs, but rather checkout the file, modify it and check it in. We did this with the file **writers** to define the write access.  
There are three popular ways to access the CVS at this point. The first two don't need any further configuration. See the examples on [CVSROOT](#cvsroot) below for how to use them:

-   Direct local access to the file system. The user(s) need sufficient file permission to access the CS directly and there is no further authentication in addition to the OS login. However this is only useful if the repository is local.
-   Remote access with ssh with the ext protocol. Any use with an ssh shell account and read/write permissions on the CVS server can access the CVS directly with ext over ssh without any additional tunnel. There is no server process running on the CVS for this to work. The ssh login does the authentication.
-   Remote access with pserver (default port: 2401/tcp). This is the preferred use for larger user base as the users are authenticated by the CVS pserver with a dedicated password database, there is therefore no need for local users accounts. This setup is explained below.

### Network setup with inetd

The CVS can be run locally only if a network access is not needed. For a remote access, the daemon inetd can start the pserver with the following line in /etc/inetd.conf (/etc/xinetd.d/cvs on SuSE):

cvspserver	stream  tcp  nowait  cvs  /usr/bin/cvs	cvs \\
--allow-root=/usr/local/cvs pserver

It is a good idea to block the cvs port from the Internet with the firewall and use an ssh tunnel to access the repository remotely.

### Separate authentication

It is possible to have cvs users which are not part of the OS (no local users). This is actually probably wanted too from the security point of view. Simply add a file named **passwd** (in the CVSROOT directory) containing the users login and password in the crypt format. This is can be done with the apache htpasswd tool.  
_Note:_ This passwd file is the only file which has to be edited directly in the CVSROOT directory. Also it won't be checked out. More info with htpasswd --help

\# htpasswd -cb passwd user1 password1  \# -c creates the file
# htpasswd -b passwd user2 password2

Now add `:cvs` at the end of each line to tell the cvs server to change the user to cvs (or whatever your cvs server is running under). It looks like this:

\# cat passwd
user1:xsFjhU22u8Fuo:cvs
user2:vnefJOsnnvToM:cvs

## Test it

Test the login as normal user (for example here me)

\# cvs -d :pserver:[\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection):/usr/local/cvs login
Logging in to :pserver:[\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection):2401/usr/local/cvs
CVS password:

### CVSROOT variable

This is an environment variable used to specify the location of the repository we're doing operations on. For local use, it can be just set to the directory of the repository. For use over the network, the transport protocol must be specified. Set the CVSROOT variable with `setenv CVSROOT string` on a csh, tcsh shell, or with `export CVSROOT=string` on a sh, bash shell.

\# setenv CVSROOT :pserver:<username>@<host>:/cvsdirectory
_For example:_
# setenv CVSROOT /usr/local/cvs                               \# Used locally only
# setenv CVSROOT :local:/usr/local/cvs                        \# Same as above
# setenv CVSROOT :ext:user@cvsserver:/usr/local/cvs           \# Direct access with SSH
# setenv CVS\_RSH ssh                                          \# for the ext access
# setenv CVSROOT :pserver:[\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection):/usr/local/cvs   \# network with pserver

When the login succeeded one can import a new project into the repository: **cd into** your project root directory

cvs import <module name> <vendor tag> <initial tag>
cvs -d :pserver:[\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection):/usr/local/cvs import MyProject MyCompany START

Where MyProject is the name of the new project in the repository (used later to checkout). Cvs will import the current directory content into the new project.

To checkout:

\# cvs -d :pserver:[\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection):/usr/local/cvs checkout MyProject
_or_
# setenv CVSROOT :pserver:[\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection):/usr/local/cvs
# cvs checkout MyProject

## SSH tunneling for CVS

We need 2 shells for this. On the first shell we connect to the cvs server with ssh and port-forward the cvs connection. On the second shell we use the cvs normally as if it where running locally.  
on shell 1:

\# ssh -L2401:localhost:2401 colin@cvs\_server   \# Connect directly to the CVS server. Or:
# ssh -L2401:cvs\_server:2401 colin@gateway     \# Use a gateway to reach the CVS

on shell 2:

\# setenv CVSROOT :pserver:colin@localhost:/usr/local/cvs
# cvs login
Logging in to :pserver:colin@localhost:2401/usr/local/cvs
CVS password:
# cvs checkout MyProject/src

## CVS commands and usage

### Import

The import command is used to add a whole directory, it must be run from within the directory to be imported. Say the directory /devel/ contains all files and subdirectories to be imported. The directory name on the CVS (the module) will be called "myapp".

\# cvs import \[options\] directory-name vendor-tag release-tag
# cd /devel                          \# Must be inside the project to import it
# cvs import myapp Company R1\_0      \# Release tag can be anything in one word

After a while a new directory "/devel/tools/" was added and it has to be imported too.

\# cd /devel/tools
# cvs import myapp/tools Company R1\_0

### Checkout update add commit

\# cvs co myapp/tools                 \# Will only checkout the directory tools
# cvs co -r R1\_1 myapp               \# Checkout myapp at release R1\_1 (is sticky)
# cvs -q -d update -P                \# A typical CVS update
# cvs update -A                      \# Reset any sticky tag (or date, option)
# cvs add newfile                    \# Add a new file
# cvs add -kb newfile                \# Add a new binary file
# cvs commit file1 file2             \# Commit the two files only
# cvs commit -m "message"            \# Commit all changes done with a message

### Create a patch

It is best to create and apply a patch from the working development directory related to the project, or from within the source directory.

\# cd /devel/project
# diff -Naur olddir newdir > patchfile \# Create a patch from a directory or a file
# diff -Naur oldfile newfile > patchfile

### Apply a patch

Sometimes it is necessary to strip a directory level from the patch, depending how it was created. In case of difficulties, simply look at the first lines of the patch and try -p0, -p1 or -p2.

\# cd /devel/project
# patch --dry-run -p0 < patchfile    \# Test the path without applying it
# patch -p0 < patchfile
# patch -p1 < patchfile              \# strip off the 1st level from the path

## SVN

[Server setup](#svnsetup) | [SVN+SSH](#svnssh) | [SVN over http](#svnhttp) | [SVN usage](#svnusage)

[Subversion (SVN)](http://subversion.tigris.org/)http://subversion.tigris.org/ is a version control system designed to be the successor of CVS (Concurrent Versions System). The concept is similar to CVS, but many shortcomings where improved. See also the [SVN book](http://svnbook.red-bean.com/en/1.4/)http://svnbook.red-bean.com/en/1.4/.

## Server setup

The initiation of the repository is fairly simple (here for example `/home/svn/` must exist):

\# svnadmin create --fs-type fsfs /home/svn/project1

Now the access to the repository is made possible with:

-   `file://` Direct file system access with the svn client with. This requires local permissions on the file system.
-   `svn://` or `svn+ssh://` Remote access with the svnserve server (also over SSH). This requires local permissions on the file system (default port: 2690/tcp).
-   `http://` Remote access with webdav using apache. No local users are necessary for this method.

Using the local file system, it is now possible to import and then check out an existing project. Unlike with CVS it is not necessary to cd into the project directory, simply give the full path:

\# svn import /project1/ file:///home/svn/project1/trunk -m 'Initial import'
# svn checkout file:///home/svn/project1

The new directory "trunk" is only a convention, this is not required.

### Remote access with ssh

No special setup is required to access the repository via ssh, simply replace `file://` with `svn+ssh/hostname`. For example:

\# svn checkout svn+ssh://hostname/home/svn/project1

As with the local file access, every user needs an ssh access to the server (with a local account) and also read/write access. This method might be suitable for a small group. All users could belong to a subversion group which owns the repository, for example:

\# groupadd subversion
# groupmod -A user1 subversion
# chown -R root:subversion /home/svn
# chmod -R 770 /home/svn

### Remote access with http (apache)

Remote access over http (https) is the only good solution for a larger user group. This method uses the apache authentication, not the local accounts. This is a typical but small apache configuration:

LoadModule dav\_module         modules/mod\_dav.so
LoadModule dav\_svn\_module     modules/mod\_dav\_svn.so
LoadModule authz\_svn\_module   modules/mod\_authz\_svn.so    # Only for access control

<Location /svn>
  DAV svn
  \# any "/svn/foo" URL will map to a repository /home/svn/foo
  SVNParentPath /home/svn
  AuthType Basic
  AuthName "Subversion repository"
  AuthzSVNAccessFile /etc/apache2/svn.acl
  AuthUserFile /etc/apache2/svn-passwd
  Require valid-user
</Location>

The apache server needs full access to the repository:

\# chown -R www:www /home/svn

Create a user with htpasswd2:

\# htpasswd -c /etc/svn-passwd user1  # -c creates the file

#### Access control svn.acl example

\# Default it read access. "\* =" would be default no access
\[/\]
\* = r
\[groups\]
project1-developers = joe, jack, jane
\# Give write access to the developers
\[project1:\]
@project1-developers = rw

## SVN commands and usage

See also the [Subversion Quick Reference Card](http://www.cs.put.poznan.pl/csobaniec/Papers/svn-refcard.pdf)http://www.cs.put.poznan.pl/csobaniec/Papers/svn-refcard.pdf. [Tortoise SVN](http://tortoisesvn.tigris.org/)http://tortoisesvn.tigris.org is a nice Windows interface.

### Import

A new project, that is a directory with some files, is imported into the repository with the `import` command. Import is also used to add a directory with its content to an existing project.

\# svn help import                                # Get help for any command
    # Add a new directory (with content) into the src dir on project1
# svn import /project1/newdir http://host.url/svn/project1/trunk/src -m 'add newdir'

### Typical SVN commands

\# svn co http://host.url/svn/project1/trunk      # Checkout the most recent version
    # Tags and branches are created by copying
# svn mkdir http://host.url/svn/project1/tags/   # Create the tags directory
# svn copy -m "Tag rc1 rel." http://host.url/svn/project1/trunk \\
                             http://host.url/svn/project1/tags/1.0rc1
# svn status \[--verbose\]                         # Check files status into working dir
# svn add src/file.h src/file.cpp                # Add two files
# svn commit -m 'Added new class file'           # Commit the changes with a message
# svn ls http://host.url/svn/project1/tags/      # List all tags
# svn move foo.c bar.c                           # Move (rename) files
# svn delete some\_old\_file                       # Delete files

## Useful Commands

[less](#less) | [vi](#vi) | [mail](#mail) | [tar](#tar) | [dd](#dd) | [screen](#screen) | [find](#find) | [Miscellaneous](#misccmd)

## less

The `less` command displays a text document on the console. It is present on most installation.

\# less unixtoolbox.xhtml

Some important commands are (^N stands for \[control\]-\[N\]):

-   **h H**       good help on display
-   **f ^F ^V SPACE**       Forward one window (or N lines).
-   **b ^B ESC-v**       Backward one window (or N lines).
-   **F**       Forward forever; like "tail -f".
-   **/pattern**       Search forward for (N-th) matching line.
-   **?pattern**       Search backward for (N-th) matching line.
-   **n**       Repeat previous search (for N-th occurrence).
-   **N**       Repeat previous search in reverse direction.
-   **q**       quit

## vi

Vi is present on ANY Linux/Unix installation (not gentoo?) and it is therefore useful to know some basic commands. There are two modes: command mode and insertion mode. The commands mode is accessed with **\[ESC\]**, the insertion mode with **i**. Use `: help` if you are lost.  
The editors `nano` and `pico` are usually available too and are easier (IMHO) to use.

### Quit

-   **:w** newfilename       save the file to newfilename
-   **:wq or :x**       save and quit
-   **:q!**       quit without saving

### Search and move

-   **/string**       Search forward for string
-   **?string**       Search back for string
-   **n**       Search for next instance of string
-   **N**       Search for previous instance of string
-   **{**       Move a paragraph back
-   **}**       Move a paragraph forward
-   **1G**       Move to the first line of the file
-   **nG**       Move to the n th line of the file
-   **G**       Move to the last line of the file
-   **:%s/OLD/NEW/g**       Search and replace every occurrence

### Delete copy paste text

-   **dd (dw)**       Cut current line (word)
-   **D**       Cut to the end of the line
-   **x**       Delete (cut) character
-   **yy (yw)**       Copy line (word) after cursor
-   **P**       Paste after cursor
-   **u**       Undo last modification
-   **U**       Undo all changes to current line

## mail

The `mail` command is a basic application to read and send email, it is usually installed. To send an email simply type "mail user@domain". The first line is the subject, then the mail content. Terminate and send the email with a single dot (.) in a new line. Example:

\# mail [\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection)
Subject: Your text is full of typos
"For a moment, nothing happened. Then, after a second or so, 
nothing continued to happen."
.
EOT
#

This is also working with a pipe:

\# echo "This is the mail body" | mail [\[email protected\]](https://cb.vu/cdn-cgi/l/email-protection)

This is also a simple way to test the mail server.

## tar

The command `tar` (tape archive) creates and extracts archives of file and directories. The archive .tar is uncompressed, a compressed archive has the extension .tgz or .tar.gz (zip) or .tbz (bzip2). Do not use absolute path when creating an archive, you probably want to unpack it somewhere else. Some typical commands are:

### Create

\# cd /
# tar -cf home.tar home/        \# archive the whole /home directory (c for create)
# tar -czf home.tgz home/       \# same with zip compression
# tar -cjf home.tbz home/       \# same with bzip2 compression

Only include one (or two) directories from a tree, but keep the relative structure. For example archive /usr/local/etc and /usr/local/www and the first directory in the archive should be local/.

\# tar -C /usr -czf local.tgz local/etc local/www
# tar -C /usr -xzf local.tgz    \# To untar the local dir into /usr
# cd /usr; tar -xzf local.tgz   \# Is the same as above

### Extract

\# tar -tzf home.tgz             \# look inside the archive without extracting (list)
# tar -xf home.tar              \# extract the archive here (x for extract)
# tar -xzf home.tgz             \# same with zip compression (-xjf for bzip2 compression)
                                \# remove leading path gallery2 and extract into gallery
# tar --strip-components 1 -zxvf gallery2.tgz -C gallery/ 
# tar -xjf home.tbz home/colin/file.txt    \# Restore a single file

### More advanced

\# tar c dir/ | gzip | ssh user@remote 'dd of=dir.tgz' \# arch dir/ and store remotely.
# tar cvf - \`find . -print\` > backup.tar              \# arch the current directory.
# tar -cf - -C /etc . | tar xpf - -C /backup/etc      \# Copy directories
# tar -cf - -C /etc . | ssh user@remote tar xpf - -C /backup/etc      \# Remote copy.
# tar -czf home.tgz --exclude '\*.o' --exclude 'tmp/' home/

## dd

The program `dd` (disk dump or destroy disk or see [the meaning of dd](http://roesler-ac.de/wolfram/acro/credits.htm)) is used to copy partitions and disks and for other copy tricks. Typical usage:

\# dd if=<source> of=<target> bs=<byte size> conv=<conversion>

Important conv options:

-   `notrunc`       do not truncate the output file, all zeros will be written as zeros.
-   `noerror`       continue after read errors (e.g. bad blocks)
-   `sync`       pad every input block with Nulls to ibs-size

The default byte size is 512 (one block). The MBR, where the partition table is located, is on the first block, the first 63 blocks of a disk are empty. Larger byte sizes are faster to copy but require also more memory.

### Backup and restore

\# dd if=/dev/hda of=/dev/hdc bs=16065b                \# Copy disk to disk (same size)
# dd if=/dev/sda7 of=/home/root.img bs=4096 conv=notrunc,noerror \# Backup /
# dd if=/home/root.img of=/dev/sda7 bs=4096 conv=notrunc,noerror \# Restore /
# dd bs=1M if=/dev/ad4s3e | gzip -c > ad4s3e.gz                  \# Zip the backup
# gunzip -dc ad4s3e.gz | dd of=/dev/ad0s3e bs=1M                 \# Restore the zip
# dd bs=1M if=/dev/ad4s3e | gzip | ssh eedcoba@fry 'dd of=ad4s3e.gz' \# also remote
# gunzip -dc ad4s3e.gz | ssh eedcoba@host 'dd of=/dev/ad0s3e bs=1M'
# dd if=/dev/ad0 of=/dev/ad2 skip=1 seek=1 bs=4k conv=noerror    \# Skip MBR
    \# This is necessary if the destination (ad2) is smaller.

### Recover

The command `dd` will read _every single block_ of the partition. In case of problems it is better to use the option `conv=sync,noerror` so dd will skip the bad block and write zeros at the destination. Accordingly it is important to set the block size equal or smaller than the disk block size. A 1k size seems safe, set it with `bs=1k`. If a disk has bad sectors and the data should be recovered from a partition, create an image file with dd, mount the image and copy the content to a new disk. With the option `noerror`, dd will skip the bad sectors and write zeros instead, thus only the data contained in the bad sectors will be lost.

\# dd if=/dev/hda of=/dev/null bs=1m                   \# Check for bad blocks
# dd bs=1k if=/dev/hda1 conv=sync,noerror,notrunc | gzip | ssh \\ \# Send to remote
root@fry 'dd of=hda1.gz bs=1k'
# dd bs=1k if=/dev/hda1 conv=sync,noerror,notrunc of=hda1.img    \# Store into an image
# mount -o loop /hda1.img /mnt                        \# [Mount the image](#createimg)
# rsync -ax /mnt/ /newdisk/                           \# Copy on a new disk
# dd if=/dev/hda of=/dev/hda                          \# Refresh the magnetic state
  \# The above is useful to refresh a disk. It is perfectly safe, but must be unmounted.

### Delete

\# dd if=/dev/zero of=/dev/hdc                         \# Delete full disk
# dd if=/dev/urandom of=/dev/hdc                      \# Delete full disk better
# kill -USR1 PID                                      \# View dd progress (Linux)
# kill -INFO PID                                      \# View dd progress (FreeBSD)

### MBR tricks

The MBR contains the boot loader and the partition table and is 512 bytes small. The first 446 are for the boot loader, the bytes 446 to 512 are for the partition table.

\# dd if=/dev/sda of=/mbr\_sda.bak bs=512 count=1       \# Backup the full MBR
# dd if=/dev/zero of=/dev/sda bs=512 count=1          \# Delete MBR and partition table
# dd if=/mbr\_sda.bak of=/dev/sda bs=512 count=1       \# Restore the full MBR
# dd if=/mbr\_sda.bak of=/dev/sda bs=446 count=1       \# Restore only the boot loader
# dd if=/mbr\_sda.bak of=/dev/sda bs=1 count=64 skip=446 seek=446 \# Restore partition table

## screen

Screen (a must have) has two main functionalities:

-   Run multiple terminal session within a single terminal.
-   A started program is decoupled from the real terminal and can thus run in the background. The real terminal can be closed and reattached later.

### Short start example

start screen with:

\# screen

Within the screen session we can start a long lasting program (like top).

\# top

Now detach with **Ctrl-a Ctrl-d**. Reattach the terminal with:

\# screen -R -D

In detail this means: If a session is running, then reattach. If necessary detach and logout remotely first. If it was not running create it and notify the user. Or:

\# screen -x

Attach to a running screen in a multi display mode. The console is thus shared among multiple users. Very useful for team work/debug!

### Screen commands (within screen)

All screen commands start with **Ctrl-a**.

-   **Ctrl-a ?** help and summary of functions
-   **Ctrl-a c** create an new window (terminal)
-   **Ctrl-a Ctrl-n and Ctrl-a Ctrl-p** to switch to the next or previous window in the list, by number.
-   **Ctrl-a Ctrl-N** where N is a number from 0 to 9, to switch to the corresponding window.
-   **Ctrl-a "** to get a navigable list of running windows
-   **Ctrl-a a** to clear a missed Ctrl-a
-   **Ctrl-a Ctrl-d** to disconnect and leave the session running in the background
-   **Ctrl-a x** lock the screen terminal with a password

The screen session is terminated when the program within the running terminal is closed and you logout from the terminal.

## Find

Some important options:

-   `-x` (on BSD) `-xdev` (on Linux)       Stay on the same file system (dev in fstab).
-   `-exec cmd {} \;`       Execute the command and replace {} with the full path
-   `-iname`       Like -name but is case insensitive
-   `-ls`       Display information about the file (like ls -la)
-   `-size n`       n is +-n (k M G T P)
-   `-cmin n`       File's status was last changed n minutes ago.

\# find . -type f ! -perm -444        \# Find files not readable by all
# find . -type d ! -perm -111        \# Find dirs not accessible by all
# find /home/user/ -cmin 10 -print   \# Files created or modified in the last 10 min.
# find . -name '\*.\[ch\]' | xargs grep -E 'expr' \# Search 'expr' in this dir and below.
# find / -name "\*.core" | xargs rm   \# Find core dumps and delete them (also try core.\*)
# find / -name "\*.core" -print -exec rm {} \\;  \# Other syntax
      \# Find images and create an archive, iname is not case sensitive. -r for append
# find . \\( -iname "\*.png" -o -iname "\*.jpg" \\) -print -exec tar -rf images.tar {} \\;
# find . -type f -name "\*.txt" ! -name README.txt -print  \# Exclude README.txt files
# find /var/ -size +10M -exec ls -lh {} \\;     \# Find large files > 10 MB
# find /var/ -size +10M -ls           \# This is simpler
# find . -size +10M -size -50M -print
# find /usr/ports/ -name work -type d -print -exec rm -rf {} \\;  \# Clean the ports
      \# Find files with SUID; those file are vulnerable and must be kept secure
# find / -type f -user root -perm -4000 -exec ls -l {} \\; 

Be careful with xarg or exec as it might or might not honor quotings and can return wrong results when files or directories contain spaces. In doubt use "-print0 | xargs -0" instead of "| xargs". The option -print0 must be the last in the find command. See this nice [mini tutorial for find](http://www.hccfl.edu/pollock/Unix/FindCmd.htm)http://www.hccfl.edu/pollock/Unix/FindCmd.htm.

\# find . -type f | xargs ls -l       \# Will not work with spaces in names
# find . -type f -print0 | xargs -0 ls -l  \# Will work with spaces in names
# find . -type f -exec ls -l '{}' \\; \# Or use quotes '{}' with -exec

## Miscellaneous

\# which command                      \# Show full path name of command
# time command                       \# See how long a command takes to execute
# time cat                           \# Use time as stopwatch. Ctrl-c to stop
# set | grep $USER                   \# List the current environment
# cal -3                             \# Display a three month calendar
# date \[-u|--utc|--universal\] \[MMDDhhmm\[\[CC\]YY\]\[.ss\]\]
# date 10022155                      \# Set date and time
# whatis grep                        \# Display a short info on the command or word
# whereis java                       \# Search path and standard directories for word
# setenv varname value               \# Set env. variable varname to value (csh/tcsh)
# export varname="value"             \# set env. variable varname to value (sh/ksh/bash)
# pwd                                \# Print working directory
# mkdir -p /path/to/dir              \# no error if existing, make parent dirs as needed
# mkdir -p project/{bin,src,obj,doc/{html,man,pdf},debug/some/more/dirs}
# rmdir /path/to/dir                 \# Remove directory
# rm -rf /path/to/dir                \# Remove directory and its content (force)
# cp -la /dir1 /dir2                 \# Archive and hard link files instead of copy
# cp -lpR /dir1 /dir2                \# Same for FreeBSD
# cp unixtoolbox.xhtml{,.bak}        \# Short way to copy the file with a new extension
# mv /dir1 /dir2                     \# Rename a directory
# ls -1                              \# list one file per line
# history | tail -50                 \# Display the last 50 used commands

Check file hashes with openssl. This is a nice alternative to the commands `md5sum` or `sha1sum` (FreeBSD uses `md5` and `sha1`) which are not always installed.

\# openssl md5 file.tar.gz            \# Generate an md5 checksum from file
# openssl sha1 file.tar.gz           \# Generate an sha1 checksum from file
# openssl rmd160 file.tar.gz         \# Generate a RIPEMD-160 checksum from file

## Install Software

Usually the package manager uses the proxy variable for http/ftp requests. In .bashrc:

export http\_proxy=http://proxy\_server:3128
export ftp\_proxy=http://proxy\_server:3128

## List installed packages

\# rpm -qa                            \# List installed packages (RH, SuSE, RPM based)
# dpkg -l                            \# Debian, Ubuntu
# pkg\_info                           \# FreeBSD list all installed packages
# pkg\_info -W smbd                   \# FreeBSD show which package smbd belongs to
# pkginfo                            \# Solaris

## Add/remove software

Front ends: yast2/yast for SuSE, redhat-config-packages for Red Hat.

\# rpm -i pkgname.rpm                 \# install the package (RH, SuSE, RPM based)
# rpm -e pkgname                     \# Remove package

### Debian

\# apt-get update                     \# First update the package lists
# apt-get install emacs              \# Install the package emacs
# dpkg --remove emacs                \# Remove the package emacs
# dpkg -S file                       \# find what package a file belongs to

### Gentoo

Gentoo uses emerge as the heart of its "Portage" package management system.

\# emerge --sync                      \# First sync the local portage tree
# emerge -u packagename              \# Install or upgrade a package
# emerge -C packagename              \# Remove the package
# revdep-rebuild                     \# Repair dependencies

### Solaris

The <cdrom> path is usually `/cdrom/cdrom0`.

\# pkgadd -d <cdrom>/Solaris\_9/Product SUNWgtar
# pkgadd -d SUNWgtar                 \# Add downloaded package (bunzip2 first)
# pkgrm SUNWgtar                     \# Remove the package

### FreeBSD

\# pkg\_add -r rsync                   \# Fetch and install rsync.
# pkg\_delete /var/db/pkg/rsync-xx    \# Delete the rsync package

Set where the packages are fetched from with the `PACKAGESITE` variable. For example:

\# export PACKAGESITE=ftp://ftp.freebsd.org/pub/FreeBSD/ports/i386/packages/Latest/ 
# or ftp://ftp.freebsd.org/pub/FreeBSD/ports/i386/packages-6-stable/Latest/

### FreeBSD [ports](http://www.freebsd.org/handbook/ports.html)http://www.freebsd.org/handbook/ports.html

The port tree `/usr/ports/` is a collection of software ready to compile and install (see man ports). The ports are updated with the program `portsnap`.

\# portsnap fetch extract             \# Create the tree when running the first time
# portsnap fetch update              \# Update the port tree
# cd /usr/ports/net/rsync/           \# Select the package to install
# make install distclean             \# Install and cleanup (also see man ports)
# make package                       \# Make a binary package of this port
# pkgdb -F                           \# Fix the package registry database

## Library path

Due to complex dependencies and runtime linking, programs are difficult to copy to an other system or distribution. However for small programs with little dependencies, the missing libraries can be copied over. The runtime libraries (and the missing one) are checked with `ldd` and managed with `ldconfig`.

\# ldd /usr/bin/rsync                 \# List all needed runtime libraries
# ldconfig -n /path/to/libs/         \# Add a path to the shared libraries directories
# ldconfig -m /path/to/libs/         \# FreeBSD
# LD\_LIBRARY\_PATH                    \# The variable set the link library path

## Convert Media

Sometimes one simply need to convert a video, audio file or document to another format.

## Text encoding

Text encoding can get totally wrong, specially when the language requires special characters like àäç. The command `iconv` can convert from one encoding to an other.

\# iconv -f <from\_encoding> -t <to\_encoding> <input\_file>
# iconv -f ISO8859-1 -t UTF-8 -o file.input > file\_utf8
# iconv -l                           \# List known coded character sets

Without the -f option, iconv will use the local char-set, which is usually fine if the document displays well.

## Unix - DOS newlines

Convert DOS (CR/LF) to Unix (LF) newlines and back **within a Unix shell**. See also `dos2unix` and `unix2dos` if you have them.

\# sed 's/.$//' dosfile.txt > unixfile.txt                  \# DOS to UNIX
# awk '{sub(/\\r$/,"");print}' dosfile.txt > unixfile.txt   \# DOS to UNIX
# awk '{sub(/$/,"\\r");print}' unixfile.txt > dosfile.txt   \# UNIX to DOS

Convert Unix to DOS newlines **within a Windows environment**. Use sed or awk from mingw or cygwin.

\# sed -n p unixfile.txt > dosfile.txt
# awk 1 unixfile.txt > dosfile.txt   \# UNIX to DOS (with a cygwin shell)

## PDF to Jpeg and concatenate PDF files

Convert a PDF document with `gs` (GhostScript) to jpeg (or png) images for each page. Also much shorter with `convert` and `mogrify` (from ImageMagick or GraphicsMagick).

\# gs -dBATCH -dNOPAUSE -sDEVICE=jpeg -r150 -dTextAlphaBits=4 -dGraphicsAlphaBits=4 \\
 -dMaxStripSize=8192 -sOutputFile=unixtoolbox\_%d.jpg unixtoolbox.pdf
# convert unixtoolbox.pdf unixtoolbox-%03d.png
# convert \*.jpeg images.pdf          \# Create a simple PDF with all pictures
# convert image000\* -resample 120x120 -compress JPEG -quality 80 images.pdf
# mogrify -format png \*.ppm          \# convert all ppm images to png format

Ghostscript can also concatenate multiple pdf files into a single one. This only works well if the PDF files are "well behaved".

\# gs -q -sPAPERSIZE=a4 -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=all.pdf \\
file1.pdf file2.pdf ...              \# On Windows use '#' instead of '='

## Convert video

Compress the Canon digicam video with an mpeg4 codec and repair the crappy sound.

\# mencoder -o videoout.avi -oac mp3lame -ovc lavc -srate 11025 \\
-channels 1 -af-adv force=1 -lameopts preset=medium -lavcopts \\
vcodec=msmpeg4v2:vbitrate=600 -mc 0 vidoein.AVI

See [sox](http://sox.sourceforge.net/) for sound processing.

## Copy an audio cd

The program [`cdparanoia`](http://xiph.org/paranoia/)http://xiph.org/paranoia/ can save the audio tracks (FreeBSD port in audio/cdparanoia/), `oggenc` can encode in Ogg Vorbis format, `lame` converts to mp3.

\# cdparanoia -B                      \# Copy the tracks to wav files in current dir
# lame -b 256 in.wav out.mp3         \# Encode in mp3 256 kb/s
# for i in \*.wav; do lame -b 256 $i \`basename $i .wav\`.mp3; done
# oggenc in.wav -b 256 out.ogg       \# Encode in Ogg Vorbis 256 kb/s

## Printing

## Print with lpr

\# lpr unixtoolbox.ps                 \# Print on default printer
# export PRINTER=hp4600              \# Change the default printer
# lpr -Php4500 #2 unixtoolbox.ps     \# Use printer hp4500 and print 2 copies
# lpr -o Duplex=DuplexNoTumble ...   \# Print duplex along the long side
# lpr -o PageSize=A4,Duplex=DuplexNoTumble ...

\# lpq                                \# Check the queue on default printer
# lpq -l -Php4500                    \# Queue on printer hp4500 with verbose
# lprm -                             \# Remove all users jobs on default printer
# lprm -Php4500 3186                 \# Remove job 3186. Find job nbr with lpq
# lpc status                         \# List all available printers
# lpc status hp4500                  \# Check if printer is online and queue length

Some devices are not postscript and will print garbage when fed with a pdf file. This might be solved with:

\# gs -dSAFER -dNOPAUSE -sDEVICE=deskjet -sOutputFile=\\|lpr file.pdf

Print to a PDF file even if the application does not support it. Use `gs` on the print command instead of `lpr`.

\# gs -q -sPAPERSIZE=a4 -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=/path/file.pdf

## Databases

## PostgreSQL

### Change root or a username password

\# psql -d template1 -U pgsql
> alter user pgsql with password 'pgsql\_password';  \# Use username instead of "pgsql"

### Create user and database

The commands `createuser`, `dropuser`, `createdb` and `dropdb` are convenient shortcuts equivalent to the SQL commands. The new user is bob with database bobdb ; use as root with pgsql the database super user:

\# createuser -U pgsql -P bob         \# -P will ask for password
# createdb -U pgsql -O bob bobdb     \# new bobdb is owned by bob
# dropdb bobdb                       \# Delete database bobdb
# dropuser bob                       \# Delete user bob

The general database authentication mechanism is configured in pg\_hba.conf

### Grant remote access

The file `$PGSQL_DATA_D/postgresql.conf` specifies the address to bind to. Typically `listen_addresses = '*'` for Postgres 8.x.  
The file `$PGSQL_DATA_D/pg_hba.conf` defines the access control. Examples:

\# TYPE  DATABASE    USER        IP-ADDRESS        IP-MASK          METHOD
host    bobdb       bob        212.117.81.42     255.255.255.255   password
host    all         all        0.0.0.0/0                           password

### Backup and restore

The backups and restore are done with the user pgsql or postgres. Backup and restore a single database:

\# pg\_dump --clean dbname > dbname\_sql.dump
# psql dbname < dbname\_sql.dump

Backup and restore all databases (including users):

\# pg\_dumpall --clean > full.dump
# psql -f full.dump postgres

In this case the restore is started with the database postgres which is better when reloading an empty cluster.

## MySQL

### Change mysql root or username password

#### Method 1

\# /etc/init.d/mysql stop
_or_
# killall mysqld
# mysqld --skip-grant-tables
# mysqladmin -u root password 'newpasswd'
# /etc/init.d/mysql start

#### Method 2

\# mysql -u root mysql
mysql> UPDATE USER SET PASSWORD=PASSWORD("newpassword") where user='root';
mysql> FLUSH PRIVILEGES;                           \# Use username instead of "root"
mysql> quit

### Create user and database (see [MySQL doc](http://dev.mysql.com/doc/refman/5.1/en/adding-users.html)http://dev.mysql.com/doc/refman/5.1/en/adding-users.html)

\# mysql -u root mysql
mysql> CREATE USER 'bob'@'localhost' IDENTIFIED BY 'pwd'; \# create only a user
mysql> CREATE DATABASE bobdb;
mysql> GRANT ALL ON \*.\* TO 'bob'@'%' IDENTIFIED BY 'pwd'; \# Use localhost instead of %
                                                   \# to restrict the network access
mysql> DROP DATABASE bobdb;                        \# Delete database
mysql> DROP USER bob;                              \# Delete user
mysql> DELETE FROM mysql.user WHERE user='bob and host='hostname'; \# Alt. command
mysql> FLUSH PRIVILEGES;

### Grant remote access

Remote access is typically permitted for a database, and not all databases. The file `/etc/my.cnf` contains the IP address to bind to. Typically comment the line `bind-address =` out.

\# mysql -u root mysql
mysql> GRANT ALL ON bobdb.\* TO bob@'xxx.xxx.xxx.xxx' IDENTIFIED BY 'PASSWORD';
mysql> REVOKE GRANT OPTION ON foo.\* FROM bar@'xxx.xxx.xxx.xxx';
mysql> FLUSH PRIVILEGES;                  \# Use 'hostname' or also '%' for full access

### Backup and restore

Backup and restore a single database:

\# mysqldump -u root -psecret --add-drop-database dbname > dbname\_sql.dump
# mysql -u root -psecret -D dbname < dbname\_sql.dump

Backup and restore all databases:

\# mysqldump -u root -psecret --add-drop-database --all-databases > full.dump
# mysql -u root -psecret < full.dump

Here is "secret" the mysql root password, there is no space after -p. When the -p option is used alone (w/o password), the password is asked at the command prompt.

## SQLite

[SQLite](http://www.sqlite.org/)http://www.sqlite.org is a small powerful self-contained, serverless, zero-configuration SQL database.

### Dump and restore

It can be useful to dump and restore an SQLite database. For example you can edit the dump file to change a column attribute or type and then restore the database. This is easier than messing with SQL commands. Use the command `sqlite3` for a 3.x database.

\# sqlite database.db .dump > dump.sql              \# dump
# sqlite database.db < dump.sql                    \# restore

### Convert 2.x to 3.x database

sqlite database\_v2.db .dump | sqlite3 database\_v3.db

## Disk Quota

A disk quota allows to limit the amount of disk space and/or the number of files a user or (or member of group) can use. The quotas are allocated on a per-file system basis and are enforced by the kernel.

## Linux setup

The quota tools package usually needs to be installed, it contains the command line tools.  
Activate the user quota in the fstab and remount the partition. If the partition is busy, either all locked files must be closed, or the system must be rebooted. Add `usrquota` to the fstab mount options, for example:

/dev/sda2     /home    reiserfs     rw,acl,user\_xattr,usrquota 1 1
# mount -o remount /home
# mount                              \# Check if usrquota is active, otherwise reboot

Initialize the quota.user file with `quotacheck`.

\# quotacheck -vum /home
# chmod 644 /home/aquota.user        \# To let the users check their own quota

Activate the quota either with the provided script (e.g. /etc/init.d/quotad on SuSE) or with `quotaon`:

quotaon -vu /home

Check that the quota is active with:

quota -v

## FreeBSD setup

The quota tools are part of the base system, however the kernel needs the option quota. If it is not there, add it and [recompile](#compilekernel) the kernel.

options QUOTA

As with Linux, add the quota to the fstab options (userquota, not usrquota):

/dev/ad0s1d    /home    ufs     rw,noatime,userquota    2  2
# mount /home                        \# To remount the partition

Enable disk quotas in /etc/rc.conf and start the quota.

\# grep quotas /etc/rc.conf
enable\_quotas="YES"                  \# turn on quotas on startup (or NO).
check\_quotas="YES"                   \# Check quotas on startup (or NO).
# /etc/rc.d/quota start

## Assign quota limits

The quotas are not limited per default (set to 0). The limits are set with `edquota` for single users. A quota can be also duplicated to many users. The file structure is different between the quota implementations, but the principle is the same: the values of blocks and inodes can be limited. _Only change the values of soft and hard_. If not specified, the blocks are 1k. The grace period is set with `edquota -t`. For example:

\# edquota -u colin

### Linux

Disk quotas for user colin (uid 1007):
  Filesystem         blocks       soft       hard     inodes     soft     hard
  /dev/sda8            108       1000       2000          1        0        0

### FreeBSD

Quotas for user colin:
/home: kbytes in use: 504184, limits (soft = 700000, hard = 800000)
   inodes in use: 1792, limits (soft = 0, hard = 0)

### For many users

The command `edquota -p` is used to duplicate a quota to other users. For example to duplicate a reference quota to all users:

\# edquota -p refuser \`awk -F: '$3 > 499 {print $1}' /etc/passwd\`
# edquota -p refuser user1 user2     \# Duplicate to 2 users

### Checks

Users can check their quota by simply typing `quota` (the file quota.user must be readable). Root can check all quotas.

\# quota -u colin                     \# Check quota for a user
# repquota /home                     \# Full report for the partition for all users

## Shells

Most Linux distributions use the bash shell while the BSDs use tcsh, the bourne shell is only used for scripts. Filters are very useful and can be piped:

-   `grep`   Pattern matching
-   `sed`   Search and Replace strings or characters
-   `cut`   Print specific columns from a marker
-   `sort`   Sort alphabetically or numerically
-   `uniq`   Remove duplicate lines from a file

For example used all at once:

\# ifconfig | sed 's/  / /g' | cut -d" " -f1 | uniq | grep -E "\[a-z0-9\]+" | sort -r
# ifconfig | sed '/.\*inet addr:/!d;s///;s/ .\*//'|sort -t. -k1,1n -k2,2n -k3,3n -k4,4n

The first character in the sed pattern is a tab. To write a tab on the console, use ctrl-v ctrl-tab.

## bash

Redirects and pipes for bash and sh:

\# cmd 1> file                         \# Redirect stdout to file.
# cmd 2> file                         \# Redirect stderr to file.
# cmd 1>> file                        \# Redirect and append stdout to file.
# cmd &> file                         \# Redirect both stdout and stderr to file.
# cmd >file 2>&1                      \# Redirects stderr to stdout and then to file.
# cmd1 | cmd2                         \# pipe stdout to cmd2
# cmd1 2>&1 | cmd2                    \# pipe stdout and stderr to cmd2

Modify your configuration in ~/.bashrc (it can also be ~/.bash\_profile). The following entries are useful, reload with ". .bashrc".

\# in .bashrc
bind '"\\e\[A"':history-search-backward \# Use up and down arrow to search
bind '"\\e\[B"':history-search-forward  \# the history. Invaluable!
set -o emacs                          \# Set emacs mode in bash (see below)
set bell-style visible                \# Do not beep, inverse colors
    \# Set a nice prompt like \[user@host\]/path/todir>
PS1="\\\[\\033\[1;30m\\\]\[\\\[\\033\[1;34m\\\]\\u\\\[\\033\[1;30m\\\]"
PS1="$PS1@\\\[\\033\[0;33m\\\]\\h\\\[\\033\[1;30m\\\]\]\\\[\\033\[0;37m\\\]"
PS1="$PS1\\w\\\[\\033\[1;30m\\\]>\\\[\\033\[0m\\\]"

\# To check the currently active aliases, simply type alias
alias  ls='ls -aF'                    \# Append indicator (one of \*/=>@|)
alias  ll='ls -aFls'                  \# Listing
alias  la='ls -all'
alias ..='cd ..'
alias ...='cd ../..'
export HISTFILESIZE=5000              \# Larger history
export CLICOLOR=1                     \# Use colors (if possible)
export LSCOLORS=ExGxFxdxCxDxDxBxBxExEx

## tcsh

Redirects and pipes for tcsh and csh (simple > and >> are the same as sh):

\# cmd >& file                         \# Redirect both stdout and stderr to file.
# cmd >>& file                        \# Append both stdout and stderr to file.
# cmd1 | cmd2                         \# pipe stdout to cmd2
# cmd1 |& cmd2                        \# pipe stdout and stderr to cmd2

The settings for csh/tcsh are set in `~/.cshrc`, reload with "source .cshrc". Examples:

\# in .cshrc
alias  ls      'ls -aF'
alias  ll      'ls -aFls'
alias  la      'ls -all'
alias  ..      'cd ..'
alias  ...     'cd ../..'
set   prompt    = "%B%n%b@%B%m%b%/> " \# like user@host/path/todir>
set   history   =  5000
set   savehist  = ( 6000 merge )
set   autolist                        \# Report possible completions with tab
set   visiblebell                     \# Do not beep, inverse colors

\# Bindkey and colors
bindkey -e     Select Emacs bindings  \# Use emacs keys to edit the command prompt
bindkey -k up history-search-backward \# Use up and down arrow to search
bindkey -k down history-search-forward
setenv CLICOLOR 1                     \# Use colors (if possible)
setenv LSCOLORS ExGxFxdxCxDxDxBxBxExEx

The emacs mode enables to use the emacs keys shortcuts to modify the command prompt line. This is extremely useful (not only for emacs users). The most used commands are:

-   C-a       Move cursor to beginning of line
-   C-e       Move cursor to end of line
-   M-b       Move cursor back one word
-   M-f       Move cursor forward one word
-   M-d       Cut the next word
-   C-w       Cut the last word
-   C-u       Cut everything before the cursor
-   C-k       Cut everything after the cursor (rest of the line)
-   C-y       Paste the last thing to be cut (simply paste)
-   C-\_       Undo

_Note:_ C- = hold control, M- = hold meta (which is usually the alt or escape key).

## Scripting

[Basics](#bournebasics) | [Script example](#bourneexample) | [awk](#awk) | [sed](#sed) | [Regular Expressions](#regex) | [useful commands](#shcmd)

The Bourne shell (/bin/sh) is present on all Unix installations and scripts written in this language are (quite) portable; `man 1 sh` is a good reference.

## Basics

### Variables and arguments

Assign with variable=value and get content with $variable

MESSAGE="Hello World"                        \# Assign a string
PI=3.1415                                    \# Assign a decimal number
N=8
TWON=\`expr $N \* 2\`                           \# Arithmetic expression (only integers)
TWON=$(($N \* 2))                             \# Other syntax
TWOPI=\`echo "$PI \* 2" | bc -l\`               \# Use bc for floating point operations
ZERO=\`echo "c($PI/4)-sqrt(2)/2" | bc -l\`

The command line arguments are

$0, $1, $2, ...                              \# $0 is the command itself 
$#                                           \# The number of arguments
$\*                                           \# All arguments (also $@)

### Special Variables

$$                                           \# The current process ID
$?                                           \# exit status of last command
  command
  if \[ $? != 0 \]; then
    echo "command failed"
  fi
mypath\=\`pwd\`
mypath\=${mypath}/file.txt
echo ${mypath##\*/}                           \# Display the filename only
echo ${mypath%%.\*}                           \# Full path without extention
var2\=${var:=string}                          \# Use var if set, otherwise use string
                                             # assign string to var and then to var2.

### Constructs

for file in \`ls\`
do
    echo $file
done

count\=0
while \[ $count -lt 5 \]; do
    echo $count
    sleep 1
    count\=$(($count + 1))
done

myfunction() {
    find . -type f -name "\*.$1" -print       \# $1 is first argument of the function
}
myfunction "txt"

#### Generate a file

MYHOME\=/home/colin
cat > testhome.sh << \_EOF
\# All of this goes into the file testhome.sh
if \[ -d "$MYHOME" \] ; then
    echo $MYHOME exists
else
    echo $MYHOME does not exist
fi
\_EOF
sh testhome.sh

## Bourne script example

As a small example, the script used to create a PDF booklet from this xhtml document:

#!/bin/sh
\# This script creates a book in pdf format ready to print on a duplex printer
if \[ $# \-ne 1 \]; then                        \# Check the argument
  echo 1>&2 "Usage: $0 HtmlFile"
  exit 1                                     \# non zero exit if error
fi

file\=$1                                      \# Assign the filename
fname\=${file%.\*}                             \# Get the name of the file only
fext\=${file#\*.}                              \# Get the extension of the file

prince $file -o $fname.pdf                   \# from www.princexml.com
pdftops -paper A4 -noshrink $fname.pdf $fname.ps \# create postscript booklet
cat $fname.ps |psbook|psnup -Pa4 -2 |pstops -b "2:0,1U(21cm,29.7cm)" > $fname.book.ps

ps2pdf13 -sPAPERSIZE=a4 -sAutoRotatePages=None $fname.book.ps $fname.book.pdf
                                             \# use #a4 and #None on Windows!
exit 0                                       \# exit 0 means successful

## Some awk commands

Awk is useful for field stripping, like cut in a more powerful way. Search this document for other examples. See for example [gnulamp.com](http://www.gnulamp.com/awk.html) and [one-liners for awk](http://student.northpark.edu/pemente/awk/awk1line.txt) for some nice examples.

awk '{ print $2, $1 }' file                  \# Print and inverse first two columns
awk '{printf("%5d : %s\\n", NR,$0)}' file     \# Add line number left aligned
awk '{print FNR "\\t" $0}' files              \# Add line number right aligned
awk NF test.txt                              \# remove blank lines (same as grep '.')
awk 'length > 80'                            \# print line longer than 80 char)

## Some sed commands

Here is [the one liner gold mine](http://student.northpark.edu/pemente/sed/sed1line.txt)http://student.northpark.edu/pemente/sed/sed1line.txt. And a good [introduction and tutorial to sed](http://www.grymoire.com/Unix/Sed.html)http://www.grymoire.com/Unix/Sed.html.

sed 's/string1/string2/g'                    \# Replace string1 with string2
sed -i 's/wroong/wrong/g' \*.txt              \# Replace a recurring word with g
sed 's/\\(.\*\\)1/\\12/g'                        \# Modify anystring1 to anystring2
sed '/<p>/,/<\\/p>/d' t.xhtml                 \# Delete lines that start with <p>
                                             \# and end with </p>
sed '/ \*#/d; /^ \*$/d'                        \# Remove comments and blank lines
sed 's/\[ \\t\]\*$//'                            \# Remove trailing spaces (use tab as \\t)
sed 's/^\[ \\t\]\*//;s/\[ \\t\]\*$//'                \# Remove leading and trailing spaces
sed 's/\[^\*\]/\[&\]/'                            \# Enclose first char with \[\] top->\[t\]op
sed = file | sed 'N;s/\\n/\\t/' > file.num     \# Number lines on a file

## Regular Expressions

Some basic regular expression useful for sed too. See [Basic Regex Syntax](http://www.regular-expressions.info/reference.html)http://www.regular-expressions.info/reference.html for a good primer.

\[\\^$.|?\*+()                          \# special characters any other will match themselves
\\                                    \# escapes special characters and treat as literal
\*                                    \# repeat the previous item zero or more times
.                                    \# single character except line break characters
.\*                                   \# match zero or more characters
^                                    \# match at the start of a line/string
$                                    \# match at the end of a line/string
.$                                   \# match a single character at the end of line/string
^ $                                  \# match line with a single space
\[^A-Z\]                               \# match any line beginning with any char from A to Z

## Some useful commands

The following commands are useful to include in a script or as one liners.

sort -t. -k1,1n -k2,2n -k3,3n -k4,4n         \# Sort IPv4 ip addresses
echo 'Test' | tr '\[:lower:\]' '\[:upper:\]'     \# Case conversion
echo foo.bar | cut -d . -f 1                 \# Returns foo
PID=$(ps | grep script.sh | grep bin | awk '{print $1}')    \# PID of a running script
PID=$(ps axww | grep \[p\]ing | awk '{print $1}')             \# PID of ping (w/o grep pid)
IP=$(ifconfig $INTERFACE | sed '/.\*inet addr:/!d;s///;s/ .\*//')   \# Linux
IP=$(ifconfig $INTERFACE | sed '/.\*inet /!d;s///;s/ .\*//')        \# FreeBSD
if \[ \`diff file1 file2 | wc -l\` != 0 \]; then \[...\] fi       \# File changed?
cat /etc/master.passwd | grep -v root | grep -v \\\*: | awk -F":" \\ \# Create http passwd
'{ printf("%s:%s\\n", $1, $2) }' > /usr/local/etc/apache2/passwd

testuser=$(cat /usr/local/etc/apache2/passwd | grep -v \\    \# Check user in passwd
root | grep -v \\\*: | awk -F":" '{ printf("%s\\n", $1) }' | grep ^user$)
:(){ :|:& };:                                \# bash fork bomb. Will kill your machine
tail +2 file > file2                         \# remove the first line from file

I use this little trick to change the file extension for many files at once. For example from .cxx to .cpp. Test it first without the `| sh` at the end. You can also do this with the command `rename` if installed. Or with bash builtins.

\# ls \*.cxx | awk -F. '{print "mv "$0" "$1".cpp"}' | sh
# ls \*.c | sed "s/.\*/cp & &.$(date "+%Y%m%d")/" | sh \# e.g. copy \*.c to \*.c.20080401
# rename .cxx .cpp \*.cxx                             \# Rename all .cxx to cpp
# for i in \*.cxx; do mv $i ${i%%.cxx}.cpp; done      \# with bash builtins

## Programming

## C basics

strcpy(newstr,str)                        /\* copy str to newstr \*/
expr1 ? expr2 : expr3                     /\* if (expr1) expr2 else expr3 \*/
x = (y > z) ? y : z;                      /\* if (y > z) x = y; else x = z; \*/
int a\[\]={0,1,2};                          /\* Initialized array (or a\[3\]={0,1,2}; \*/
int a\[2\]\[3\]={{1,2,3},{4,5,6}};            /\* Array of array of ints \*/
int i = 12345;                            /\* Convert in i to char str \*/
char str\[10\];
sprintf(str, "%d", i);

## C example

A minimal c program simple.c:

#include <stdio.h>
main() {
    int number=42;
    printf("The answer is %i\\n", number);  
}

Compile with:

\# gcc simple.c -o simple
# ./simple
The answer is 42

## C++ basics

\*pointer                                  // Object pointed to by pointer
&obj                                      // Address of object obj
obj.x                                     // Member x of class obj (object obj)
pobj->x                                   // Member x of class pointed to by pobj
                                          // (\*pobj).x and pobj->x are the same

## C++ example

As a slightly more realistic program in C++: a class in its own header (IPv4.h) and implementation (IPv4.cpp) and a program which uses the class functionality. The class converts an IP address in integer format to the known quad format.

### IPv4 class

#### IPv4.h:

#ifndef IPV4\_H
#define IPV4\_H
#include <string>

namespace GenericUtils {                          // create a namespace
class IPv4 {                                      // class definition
public:
    IPv4(); ~IPv4();
    std::string IPint\_to\_IPquad(unsigned long ip);// member interface
};
} //namespace GenericUtils
#endif // IPV4\_H

#### IPv4.cpp:

#include "IPv4.h"
#include <string>
#include <sstream>
using namespace std;                              // use the namespaces
using namespace GenericUtils;

IPv4::IPv4() {}                                   // default constructor/destructor
IPv4::~IPv4() {}
string IPv4::IPint\_to\_IPquad(unsigned long ip) {  // member implementation
    ostringstream ipstr;                          // use a stringstream
    ipstr << ((ip &0xff000000) >> 24)             // Bitwise right shift
          << "." << ((ip &0x00ff0000) >> 16)
          << "." << ((ip &0x0000ff00) >> 8)
          << "." << ((ip &0x000000ff));
    return ipstr.str();
}

### The program simplecpp.cpp

#include "IPv4.h"
#include <iostream>
#include <string>
using namespace std;
int main (int argc, char\* argv\[\]) {
    string ipstr;                                 // define variables
    unsigned long ipint = 1347861486;             // The IP in integer form
    GenericUtils::IPv4 iputils;                   // create an object of the class
    ipstr = iputils.IPint\_to\_IPquad(ipint);       // call the class member
    cout << ipint << " = " << ipstr << endl;      // print the result

    return 0;
}

Compile and execute with:

\# g++ -c IPv4.cpp simplecpp.cpp                \# Compile in objects
# g++ IPv4.o simplecpp.o -o simplecpp.exe      \# Link the objects to final executable
# ./simplecpp.exe 
1347861486 = 80.86.187.238

Use `ldd` to check which libraries are used by the executable and where they are located. Also used to check if a shared library is missing or if the executable is static.

\# ldd /sbin/ifconfig                           \# list dynamic object dependencies
# ar rcs staticlib.a \*.o                       \# create static archive
# ar t staticlib.a                             \# print the objects list from the archive
# ar x /usr/lib/libc.a version.o               \# extract an object file from the archive
# nm version.o                                 \# show function members provided by object

## Simple Makefile

The minimal Makefile for the multi-source program is shown below. The lines with instructions _must begin with a tab_! The back slash "\\" can be used to cut long lines.

CC = g++
CFLAGS = -O
OBJS = IPv4.o simplecpp.o

simplecpp: ${OBJS}
	${CC} -o simplecpp ${CFLAGS} ${OBJS}
clean:
	rm -f ${TARGET} ${OBJS}

## Online Help

## Documentation

<table><tbody><tr><td><a href="http://en.tldp.org/">Linux Documentation</a></td><td>en.tldp.org</td></tr><tr><td><a href="http://www.linuxmanpages.com/">Linux Man Pages</a></td><td>www.linuxmanpages.com</td></tr><tr><td><a href="http://www.oreillynet.com/linux/cmd/">Linux commands directory</a></td><td>www.oreillynet.com/linux/cmd</td></tr><tr><td><a href="http://linux.die.net/">Linux doc man howtos</a></td><td>linux.die.net</td></tr><tr><td><a href="http://www.freebsd.org/handbook/">FreeBSD Handbook</a></td><td>www.freebsd.org/handbook</td></tr><tr><td><a href="http://www.freebsd.org/cgi/man.cgi">FreeBSD Man Pages</a></td><td>www.freebsd.org/cgi/man.cgi</td></tr><tr><td><a href="http://www.freebsdwiki.net/">FreeBSD user wiki</a></td><td>www.freebsdwiki.net</td></tr><tr><td><a href="http://docs.sun.com/app/docs/coll/40.10">Solaris Man Pages</a></td><td>docs.sun.com/app/docs/coll/40.10</td></tr></tbody></table>

## Other Unix/Linux references

That's all folks!
