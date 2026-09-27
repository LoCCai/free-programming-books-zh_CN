This module provides a class called [AtomFeed](#werkzeug.contrib.atom.AtomFeed "werkzeug.contrib.atom.AtomFeed") which can be used to generate feeds in the Atom syndication format (see [**RFC 4287**](http://tools.ietf.org/html/rfc4287.html)).

Example:

def atom\_feed(request):
    feed \= AtomFeed("My Blog", feed\_url\=request.url,
                    url\=request.host\_url,
                    subtitle\="My example blog for a feed test.")
    for post in Post.query.limit(10).all():
        feed.add(post.title, post.body, content\_type\='html',
                 author\=post.author, url\=post.url, id\=post.uid,
                 updated\=post.last\_update, published\=post.pub\_date)
    return feed.get\_response()

_class_ werkzeug.contrib.atom.AtomFeed(_title=None_, _entries=None_, _\*\*kwargs_)[¶](#werkzeug.contrib.atom.AtomFeed "永久链接至目标")

A helper class that creates Atom feeds.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>title</strong> – the title of the feed. Required.</li><li><strong>title_type</strong> – the type attribute for the title element. One of <tt><span>'html'</span></tt>, <tt><span>'text'</span></tt> or <tt><span>'xhtml'</span></tt>.</li><li><strong>url</strong> – the url for the feed (not the url <em>of</em> the feed)</li><li><strong>id</strong> – a globally unique id for the feed. Must be an URI. If not present the <cite>feed_url</cite> is used, but one of both is required.</li><li><strong>updated</strong> – the time the feed was modified the last time. Must be a <tt><span>datetime.datetime</span></tt> object. If not present the latest entry’s <cite>updated</cite> is used.</li><li><strong>feed_url</strong> – the URL to the feed. Should be the URL that was requested.</li><li><strong>author</strong> – the author of the feed. Must be either a string (the name) or a dict with name (required) and uri or email (both optional). Can be a list of (may be mixed, too) strings and dicts, too, if there are multiple authors. Required if not every entry has an author element.</li><li><strong>icon</strong> – an icon for the feed.</li><li><strong>logo</strong> – a logo for the feed.</li><li><strong>rights</strong> – copyright information for the feed.</li><li><strong>rights_type</strong> – the type attribute for the rights element. One of <tt><span>'html'</span></tt>, <tt><span>'text'</span></tt> or <tt><span>'xhtml'</span></tt>. Default is <tt><span>'text'</span></tt>.</li><li><strong>subtitle</strong> – a short description of the feed.</li><li><strong>subtitle_type</strong> – the type attribute for the subtitle element. One of <tt><span>'text'</span></tt>, <tt><span>'html'</span></tt>, <tt><span>'text'</span></tt> or <tt><span>'xhtml'</span></tt>. Default is <tt><span>'text'</span></tt>.</li><li><strong>links</strong> – additional links. Must be a list of dictionaries with href (required) and rel, type, hreflang, title, length (all optional)</li><li><strong>generator</strong> – the software that generated this feed. This must be a tuple in the form <tt><span>(name,</span> <span>url,</span> <span>version)</span></tt>. If you don’t want to specify one of them, set the item to <cite>None</cite>.</li><li><strong>entries</strong> – a list with the entries for the feed. Entries can also be added later with <a href="#werkzeug.contrib.atom.AtomFeed.add" title="werkzeug.contrib.atom.AtomFeed.add"><tt><span>add()</span></tt></a>.</li></ul></td></tr></tbody></table>

For more information on the elements see [http://www.atomenabled.org/developers/syndication/](http://www.atomenabled.org/developers/syndication/)

Everywhere where a list is demanded, any iterable can be used.

add(_\*args_, _\*\*kwargs_)[¶](#werkzeug.contrib.atom.AtomFeed.add "永久链接至目标")

Add a new entry to the feed. This function can either be called with a [FeedEntry](#werkzeug.contrib.atom.FeedEntry "werkzeug.contrib.atom.FeedEntry") or some keyword and positional arguments that are forwarded to the [FeedEntry](#werkzeug.contrib.atom.FeedEntry "werkzeug.contrib.atom.FeedEntry") constructor.

generate()[¶](#werkzeug.contrib.atom.AtomFeed.generate "永久链接至目标")

Return a generator that yields pieces of XML.

get\_response()[¶](#werkzeug.contrib.atom.AtomFeed.get_response "永久链接至目标")

Return a response object for the feed.

to\_string()[¶](#werkzeug.contrib.atom.AtomFeed.to_string "永久链接至目标")

Convert the feed into a string.

_class_ werkzeug.contrib.atom.FeedEntry(_title=None_, _content=None_, _feed\_url=None_, _\*\*kwargs_)[¶](#werkzeug.contrib.atom.FeedEntry "永久链接至目标")

Represents a single entry in a feed.

<table><colgroup><col> <col></colgroup><tbody><tr><th>参数:</th><td><ul><li><strong>title</strong> – the title of the entry. Required.</li><li><strong>title_type</strong> – the type attribute for the title element. One of <tt><span>'html'</span></tt>, <tt><span>'text'</span></tt> or <tt><span>'xhtml'</span></tt>.</li><li><strong>content</strong> – the content of the entry.</li><li><strong>content_type</strong> – the type attribute for the content element. One of <tt><span>'html'</span></tt>, <tt><span>'text'</span></tt> or <tt><span>'xhtml'</span></tt>.</li><li><strong>summary</strong> – a summary of the entry’s content.</li><li><strong>summary_type</strong> – the type attribute for the summary element. One of <tt><span>'html'</span></tt>, <tt><span>'text'</span></tt> or <tt><span>'xhtml'</span></tt>.</li><li><strong>url</strong> – the url for the entry.</li><li><strong>id</strong> – a globally unique id for the entry. Must be an URI. If not present the URL is used, but one of both is required.</li><li><strong>updated</strong> – the time the entry was modified the last time. Must be a <tt><span>datetime.datetime</span></tt> object. Required.</li><li><strong>author</strong> – the author of the entry. Must be either a string (the name) or a dict with name (required) and uri or email (both optional). Can be a list of (may be mixed, too) strings and dicts, too, if there are multiple authors. Required if the feed does not have an author element.</li><li><strong>published</strong> – the time the entry was initially published. Must be a <tt><span>datetime.datetime</span></tt> object.</li><li><strong>rights</strong> – copyright information for the entry.</li><li><strong>rights_type</strong> – the type attribute for the rights element. One of <tt><span>'html'</span></tt>, <tt><span>'text'</span></tt> or <tt><span>'xhtml'</span></tt>. Default is <tt><span>'text'</span></tt>.</li><li><strong>links</strong> – additional links. Must be a list of dictionaries with href (required) and rel, type, hreflang, title, length (all optional)</li><li><strong>categories</strong> – categories for the entry. Must be a list of dictionaries with term (required), scheme and label (all optional)</li><li><strong>xml_base</strong> – The xml base (url) for this feed item. If not provided it will default to the item url.</li></ul></td></tr></tbody></table>

For more information on the elements see [http://www.atomenabled.org/developers/syndication/](http://www.atomenabled.org/developers/syndication/)

Everywhere where a list is demanded, any iterable can be used.
