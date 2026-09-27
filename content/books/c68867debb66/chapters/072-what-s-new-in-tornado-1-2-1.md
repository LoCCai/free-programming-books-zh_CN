## Mar 3, 2011[¶](#mar-3-2011 "永久链接至标题")

We are pleased to announce the release of Tornado 1.2.1, available from
https://github.com/downloads/facebook/tornado/tornado\-1.2.1.tar.gz

This release contains only two small changes relative to version 1.2:
\* FacebookGraphMixin has been updated to work with a recent change to the
  Facebook API.
\* Running "setup.py install" will no longer attempt to automatically
  install pycurl.  This wasn't working well on platforms where the best way
  to install pycurl is via something like apt\-get instead of easy\_install.

This is an important upgrade if you are using FacebookGraphMixin, but
otherwise it can be safely ignored.
