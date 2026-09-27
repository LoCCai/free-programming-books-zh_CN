una guía sencilla para comenzar con git. sin complicaciones ;)

por [Roger Dudler](http://www.twitter.com/rogerdudler) (traducido por [@lfbarragan](http://www.twitter.com/lfbarragan) y [@adrimatellanes](https://twitter.com/adrimatellanes))  
créditos a [@tfnico](http://www.twitter.com/tfnico), [@fhd](http://www.twitter.com/fhd) y [Namics](http://www.namics.com)  
disponible en [english](http://rogerdudler.github.io/git-guide/index.html), [deutsch](http://rogerdudler.github.io/git-guide/index.de.html), [français](http://rogerdudler.github.io/git-guide/index.fr.html), [indonesian](http://rogerdudler.github.io/git-guide/index.id.html), [italiano](http://rogerdudler.github.io/git-guide/index.it.html), [nederlands](http://rogerdudler.github.io/git-guide/index.nl.html), [polski](http://rogerdudler.github.io/git-guide/index.pl.html), [português](http://rogerdudler.github.io/git-guide/index.pt_BR.html), [русский](http://rogerdudler.github.io/git-guide/index.ru.html), [türkçe](http://rogerdudler.github.io/git-guide/index.tr.html),  
[မြန်မာ](http://rogerdudler.github.io/git-guide/index.my.html), [日本語](http://rogerdudler.github.io/git-guide/index.ja.html), [中文](http://rogerdudler.github.io/git-guide/index.zh.html), [한국어](http://rogerdudler.github.io/git-guide/index.ko.html)  
por favor, reporta cualquier problema en [github](https://github.com/rogerdudler/git-guide/issues)

![](http://rogerdudler.github.io/git-guide/img/arrow.png)

## crea un repositorio nuevo

Crea un directorio nuevo, ábrelo y ejecuta  
`git init`  
para crear un nuevo repositorio de git.

## hacer checkout a un repositorio

Crea una copia local del repositorio ejecutando  
`git clone /path/to/repository`  
Si utilizas un servidor remoto, ejecuta  
`git clone username@host:/path/to/repository`

## flujo de trabajo

Tu repositorio local esta compuesto por tres "árboles" administrados por git. El primero es tu `Directorio de trabajo` que contiene los archivos, el segundo es el `Index` que actua como una zona intermedia, y el último es el `HEAD` que apunta al último commit realizado.

![](http://rogerdudler.github.io/git-guide/img/trees.png)

## add & commit

Puedes registrar cambios (añadirlos al **Index**) usando  
`git add <filename>`  
`git add .`  
Este es el primer paso en el flujo de trabajo básico. Para hacer commit a estos cambios usa  
`git commit -m "Commit message"`  
Ahora el archivo esta incluído en el **HEAD**, pero aún no en tu repositorio remoto.

## ramas

Las ramas son utilizadas para desarrollar funcionalidades aisladas unas de otras. La rama _master_ es la rama "por defecto" cuando creas un repositorio. Crea nuevas ramas durante el desarrollo y fusiónalas a la rama principal cuando termines.

![](http://rogerdudler.github.io/git-guide/img/branches.png)

Crea una nueva rama llamada "feature\_x" y cámbiate a ella usando  
`git checkout -b feature_x`  
vuelve a la rama principal  
`git checkout master`  
y borra la rama  
`git branch -d feature_x`  
Una rama nueva _no estará disponible para los demás_ a menos que subas (push) la rama a tu repositorio remoto  
`git push origin <branch>`

## actualiza & fusiona

Para actualizar tu repositorio local al commit más nuevo, ejecuta  
`git pull`  
en tu directorio de trabajo para _bajar_ y _fusionar_ los cambios remotos.  
Para fusionar otra rama a tu rama activa (por ejemplo master), utiliza  
`git merge <branch>`  
en ambos casos git intentará fusionar automáticamente los cambios. Desafortunadamente, no siempre será posible y se podrán producir _conflictos_. Tú eres responsable de fusionar esos _conflictos_ manualmente al editar los archivos mostrados por git. Después de modificarlos, necesitas marcarlos como fusionados con  
`git add <filename>`  
Antes de fusionar los cambios, puedes revisarlos usando  
`git diff <source_branch> <target_branch>`

## etiquetas

Se recomienda crear etiquetas para cada nueva versión publicada de un software. Este concepto no es nuevo, ya que estaba disponible en SVN. Puedes crear una nueva etiqueta llamada _1.0.0_ ejecutando  
`git tag 1.0.0 1b2e1d63ff`  
_1b2e1d63ff_ se refiere a los 10 caracteres del commit id al cual quieres referirte con tu etiqueta. Puedes obtener el commit id con  
`git log`  
también puedes usar menos caracteres que el commit id, pero debe ser un valor único.

## reemplaza cambios locales

En caso de que hagas algo mal (lo que seguramente nunca suceda ;) puedes reemplazar cambios locales usando el comando  
`git checkout -- <filename>`  
Este comando reemplaza los cambios en tu directorio de trabajo con el último contenido de HEAD. Los cambios que ya han sido agregados al Index, así como también los nuevos archivos, se mantendrán sin cambio.

Por otro lado, si quieres deshacer todos los cambios locales y commits, puedes traer la última versión del servidor y apuntar a tu copia local principal de esta forma  
`git fetch origin`  
`git reset --hard origin/master`
