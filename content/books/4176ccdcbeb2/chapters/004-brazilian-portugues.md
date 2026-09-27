## [Sobre](#sobre)

O git-flow é um conjunto de extensões para o git que provê operações de alto-nível para repositórios usando o modelo de branches do Vincent Driessen. [mais](http://nvie.com/posts/a-successful-git-branching-model/)

★ ★ ★

Este cheatsheet demonstra o uso básico e o efeito das operações do git-flow

★ ★ ★

## [Dicas básicas](#dicas_basicas)

-   O git-flow oferece na linha de comando ajuda e saídas excelentes. Leia atentamente para ver o que está acontecendo...
-   O cliente do macOS [Sourcetree](http://www.sourcetreeapp.com/) é um excelente gui para o git e tem suporte ao git-flow

★ ★ ★

## [Instalação](#instalacao)

-   Você precisa do git instalado como pré-requisito.
-   O git flow funciona no macOS, Linux e no Windows

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

## [Começando](#comecando)

O git-flow precisa ser inicializado para personalizar a configuração de seu projeto.

★ ★ ★

### Inicialização

Comece o uso do git-flow fazendo sua inicialização dentro de um repositório git existente:

> git flow init

Você precisa responder algumas questões relativas às convenções de nomenclatura dos seus branches.  
É recomendado que sejam usados os valores padrões.

## [Funcionalidades/features](#features)

-   Desenvolva novas funcionalidades para as versões futuras
-   Normalmente existem apenas nos repositórios dos desenvolvedores

★ ★ ★

### Começar uma nova funcionalidade

O desenvolvimento de novas funcionalidades começa no branch 'develop'.

Comece o desenvolvimento de uma nova funcionalidade com

> git flow feature start MYFEATURE

Esse comando cria um novo branch da funcionalidade baseado no 'develop' e alterna para ele

### Finalizar uma funcionalidade

Finaliza o desenvolvimento de uma funcionalidade. Esse comando faz o seguinte

-   Mescla MYFEATURE no 'develop'
-   Remove o branch da funcionalidade
-   Volta para o branch 'develop'

> git flow feature finish MYFEATURE

### Publicar uma funcionalidade

Você está desenvolvendo uma funcionalidade colaborativamente?  
Publique uma funcionalidade para o servidor remoto, assim ela pode ser utilizada por outros usuários.

> git flow feature publish MYFEATURE

### Obter uma funcionalidade publicada

Obtenha uma funcionalidade publicada por outro usuário e acompanhe as alterações remotas.

> git flow feature pull MYFEATURE

## [Criar uma versão/release](#release)

-   Auxilia a preparação de uma nova versão de produção
-   Permite correções de bugs menores e a preparação de metadados de uma versão

★ ★ ★

### Começar uma versão

Para começar uma versão, use o comando git flow release. Ele  
cria um branch da versão baseado no branch 'develop'.

> git flow release start RELEASE \[BASE\]

Você pode opcionalmente fornecer um hash sha-1 do commit `[BASE]` de onde começar a versão. O commit precisa estar no branch 'develop'

★ ★ ★

É sensato publicar o branch da versão depois de criá-lo, para permitir commits por outros desenvolvedores. É semelhante à publicação de uma funcionalidade com o comando:

> git flow release publish RELEASE

(Você pode acompanhar uma versão remota com o comando  
`git flow release track RELEASE`)

### Finalizar uma versão

A finalização de uma versão é um dos grandes passos na ramificação/branching do git. Ele executa várias ações:

-   Mescla o branch da versão no 'master'
-   Etiqueta a versão com seu nome
-   Mescla o branch da versão de volta no 'develop'
-   Remove o branch da versão

> git flow release finish RELEASE

## [Hotfixes](#hotfixes)

-   Os hotfixes surgem da necessidade de agir imediatamente sobre uma situação indesejada na versão de produção ativa
-   Pode ser criado a partir da tag correspondente no branch master que indica a versão em produção.

★ ★ ★

### git flow hotfix start

Assim como os outros comandos do git flow, um hotfix inicia com

> git flow hotfix start VERSION \[BASENAME\]

O argumento version marca o nome do novo hotfix. Opcionalmente, você pode especificar um basename para começar.

### Finalizar um hotfix

Ao finalizar um hotfix ele é mesclado tanto no develop quanto no master. Além disso, o merge no master é etiquetado.

> git flow hotfix finish VERSION

## Backlog

★ ★ ★

-   Nem todos os comandos disponíveis estão cobertos aqui, apenas os mais importantes deles
-   Você pode continuar a usar o git e todos os comandos dele normalmente como você já conhece, o git flow é apenas uma coleção de ferramentas
-   A funcionalidade 'support' continua no estágio beta, seu uso não é indicado
-   Se você quiser fornecer traduções, ficarei feliz de integrá-las

★ ★ ★
