The [django.core.files](https://django-chinese-docs.readthedocs.io/en/latest/ref/files/index.html#module-django.core.files "django.core.files: File handling and storage") module and its submodules contain built-in classes for basic file handling in Django.

## The File Class[¶](#the-file-class "Permalink to this headline")

_class_ File(_file\_object_)[¶](#django.core.files.File "Permalink to this definition")

The [File](#django.core.files.File "django.core.files.File") is a thin wrapper around Python’s built-in file object with some Django-specific additions. Internally, Django uses this class any time it needs to represent a file.

[File](#django.core.files.File "django.core.files.File") objects have the following attributes and methods:

name[¶](#django.core.files.File.name "Permalink to this definition")

The name of file including the relative path from [MEDIA\_ROOT](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-MEDIA_ROOT).

size[¶](#django.core.files.File.size "Permalink to this definition")

The size of the file in bytes.

file[¶](#django.core.files.File.file "Permalink to this definition")

The underlying Python file object passed to [File](#django.core.files.File "django.core.files.File").

mode[¶](#django.core.files.File.mode "Permalink to this definition")

The read/write mode for the file.

open(\[_mode=None_\])[¶](#django.core.files.File.open "Permalink to this definition")

Open or reopen the file (which by definition also does File.seek(0)). The mode argument allows the same values as Python’s standard open().

When reopening a file, mode will override whatever mode the file was originally opened with; None means to reopen with the original mode.

read(\[_num\_bytes=None_\])[¶](#django.core.files.File.read "Permalink to this definition")

Read content from the file. The optional size is the number of bytes to read; if not specified, the file will be read to the end.

\_\_iter\_\_()[¶](#django.core.files.File.__iter__ "Permalink to this definition")

Iterate over the file yielding one line at a time.

chunks(\[_chunk\_size=None_\])[¶](#django.core.files.File.chunks "Permalink to this definition")

Iterate over the file yielding “chunks” of a given size. chunk\_size defaults to 64 KB.

This is especially useful with very large files since it allows them to be streamed off disk and avoids storing the whole file in memory.

multiple\_chunks(\[_chunk\_size=None_\])[¶](#django.core.files.File.multiple_chunks "Permalink to this definition")

Returns True if the file is large enough to require multiple chunks to access all of its content give some chunk\_size.

write(\[_content_\])[¶](#django.core.files.File.write "Permalink to this definition")

Writes the specified content string to the file. Depending on the storage system behind the scenes, this content might not be fully committed until close() is called on the file.

close()[¶](#django.core.files.File.close "Permalink to this definition")

Close the file.

In addition to the listed methods, [File](#django.core.files.File "django.core.files.File") exposes the following attributes and methods of the underlying file object: encoding, fileno, flush, isatty, newlines, read, readinto, readlines, seek, softspace, tell, truncate, writelines, xreadlines.

## The ContentFile Class[¶](#the-contentfile-class "Permalink to this headline")

_class_ ContentFile(_File_)[¶](#django.core.files.base.ContentFile "Permalink to this definition")

The ContentFile class inherits from [File](#django.core.files.File "django.core.files.File"), but unlike [File](#django.core.files.File "django.core.files.File") it operates on string content (bytes also supported), rather than an actual file. For example:

from \_\_future\_\_ import unicode\_literals
from django.core.files.base import ContentFile

f1 \= ContentFile("esta sentencia está en español")
f2 \= ContentFile(b"these are bytes")

Changed in Django 1.5.

## The ImageFile Class[¶](#the-imagefile-class "Permalink to this headline")

_class_ ImageFile(_file\_object_)[¶](#django.core.files.images.ImageFile "Permalink to this definition")

Django provides a built-in class specifically for images. [django.core.files.images.ImageFile](#django.core.files.images.ImageFile "django.core.files.images.ImageFile") inherits all the attributes and methods of [File](#django.core.files.File "django.core.files.File"), and additionally provides the following:

width[¶](#django.core.files.images.ImageFile.width "Permalink to this definition")

Width of the image in pixels.

height[¶](#django.core.files.images.ImageFile.height "Permalink to this definition")

Height of the image in pixels.

## Additional methods on files attached to objects[¶](#additional-methods-on-files-attached-to-objects "Permalink to this headline")

Any [File](#django.core.files.File "django.core.files.File") that’s associated with an object (as with Car.photo, below) will also have a couple of extra methods:

File.save(_name_, _content_\[, _save=True_\])[¶](#django.core.files.File.save "Permalink to this definition")

Saves a new file with the file name and contents provided. This will not replace the existing file, but will create a new file and update the object to point to it. If save is True, the model’s save() method will be called once the file is saved. That is, these two lines:

\>>> car.photo.save('myphoto.jpg', content, save\=False)
\>>> car.save()

are the same as this one line:

\>>> car.photo.save('myphoto.jpg', content, save\=True)

Note that the content argument must be an instance of either [File](#django.core.files.File "django.core.files.File") or of a subclass of [File](#django.core.files.File "django.core.files.File"), such as [ContentFile](#django.core.files.base.ContentFile "django.core.files.base.ContentFile").

File.delete(\[_save=True_\])[¶](#django.core.files.File.delete "Permalink to this definition")

Removes the file from the model instance and deletes the underlying file. If save is True, the model’s save() method will be called once the file is deleted.
