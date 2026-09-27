from django.contrib.syndication.views import Feed
from django.utils import feedgenerator

class ExampleFeed(Feed):

    \# FEED TYPE -- Optional. This should be a class that subclasses
    \# django.utils.feedgenerator.SyndicationFeed. This designates
    \# which type of feed this should be: RSS 2.0, Atom 1.0, etc. If
    \# you don't specify feed\_type, your feed will be RSS 2.0. This
    \# should be a class, not an instance of the class.

    feed\_type \= feedgenerator.Rss201rev2Feed

    \# TEMPLATE NAMES -- Optional. These should be strings
    \# representing names of Django templates that the system should
    \# use in rendering the title and description of your feed items.
    \# Both are optional. If a template is not specified, the
    \# item\_title() or item\_description() methods are used instead.

    title\_template \= None
    description\_template \= None

    \# TITLE -- One of the following three is required. The framework
    \# looks for them in this order.

    def title(self, obj):
        """
        Takes the object returned by get\_object() and returns the
        feed's title as a normal Python string.
        """

    def title(self):
        """
        Returns the feed's title as a normal Python string.
        """

    title \= 'foo' \# Hard-coded title.

    \# LINK -- One of the following three is required. The framework
    \# looks for them in this order.

    def link(self, obj):
        """
        # Takes the object returned by get\_object() and returns the URL
        # of the HTML version of the feed as a normal Python string.
        """

    def link(self):
        """
        Returns the URL of the HTML version of the feed as a normal Python
        string.
        """

    link \= '/blog/' \# Hard-coded URL.

    \# FEED\_URL -- One of the following three is optional. The framework
    \# looks for them in this order.

    def feed\_url(self, obj):
        """
        # Takes the object returned by get\_object() and returns the feed's
        # own URL as a normal Python string.
        """

    def feed\_url(self):
        """
        Returns the feed's own URL as a normal Python string.
        """

    feed\_url \= '/blog/rss/' \# Hard-coded URL.

    \# GUID -- One of the following three is optional. The framework looks
    \# for them in this order. This property is only used for Atom feeds
    \# (where it is the feed-level ID element). If not provided, the feed
    \# link is used as the ID.

    def feed\_guid(self, obj):
        """
        Takes the object returned by get\_object() and returns the globally
        unique ID for the feed as a normal Python string.
        """

    def feed\_guid(self):
        """
        Returns the feed's globally unique ID as a normal Python string.
        """

    feed\_guid \= '/foo/bar/1234' \# Hard-coded guid.

    \# DESCRIPTION -- One of the following three is required. The framework
    \# looks for them in this order.

    def description(self, obj):
        """
        Takes the object returned by get\_object() and returns the feed's
        description as a normal Python string.
        """

    def description(self):
        """
        Returns the feed's description as a normal Python string.
        """

    description \= 'Foo bar baz.' \# Hard-coded description.

    \# AUTHOR NAME --One of the following three is optional. The framework
    \# looks for them in this order.

    def author\_name(self, obj):
        """
        Takes the object returned by get\_object() and returns the feed's
        author's name as a normal Python string.
        """

    def author\_name(self):
        """
        Returns the feed's author's name as a normal Python string.
        """

    author\_name \= 'Sally Smith' \# Hard-coded author name.

    \# AUTHOR EMAIL --One of the following three is optional. The framework
    \# looks for them in this order.

    def author\_email(self, obj):
        """
        Takes the object returned by get\_object() and returns the feed's
        author's email as a normal Python string.
        """

    def author\_email(self):
        """
        Returns the feed's author's email as a normal Python string.
        """

    author\_email \= 'test@example.com' \# Hard-coded author email.

    \# AUTHOR LINK --One of the following three is optional. The framework
    \# looks for them in this order. In each case, the URL should include
    \# the "http://" and domain name.

    def author\_link(self, obj):
        """
        Takes the object returned by get\_object() and returns the feed's
        author's URL as a normal Python string.
        """

    def author\_link(self):
        """
        Returns the feed's author's URL as a normal Python string.
        """

    author\_link \= 'http://www.example.com/' \# Hard-coded author URL.

    \# CATEGORIES -- One of the following three is optional. The framework
    \# looks for them in this order. In each case, the method/attribute
    \# should return an iterable object that returns strings.

    def categories(self, obj):
        """
        Takes the object returned by get\_object() and returns the feed's
        categories as iterable over strings.
        """

    def categories(self):
        """
        Returns the feed's categories as iterable over strings.
        """

    categories \= ("python", "django") \# Hard-coded list of categories.

    \# COPYRIGHT NOTICE -- One of the following three is optional. The
    \# framework looks for them in this order.

    def feed\_copyright(self, obj):
        """
        Takes the object returned by get\_object() and returns the feed's
        copyright notice as a normal Python string.
        """

    def feed\_copyright(self):
        """
        Returns the feed's copyright notice as a normal Python string.
        """

    feed\_copyright \= 'Copyright (c) 2007, Sally Smith' \# Hard-coded copyright notice.

    \# TTL -- One of the following three is optional. The framework looks
    \# for them in this order. Ignored for Atom feeds.

    def ttl(self, obj):
        """
        Takes the object returned by get\_object() and returns the feed's
        TTL (Time To Live) as a normal Python string.
        """

    def ttl(self):
        """
        Returns the feed's TTL as a normal Python string.
        """

    ttl \= 600 \# Hard-coded Time To Live.

    \# ITEMS -- One of the following three is required. The framework looks
    \# for them in this order.

    def items(self, obj):
        """
        Takes the object returned by get\_object() and returns a list of
        items to publish in this feed.
        """

    def items(self):
        """
        Returns a list of items to publish in this feed.
        """

    items \= ('Item 1', 'Item 2') \# Hard-coded items.

    \# GET\_OBJECT -- This is required for feeds that publish different data
    \# for different URL parameters. (See "A complex example" above.)

    def get\_object(self, request, \*args, \*\*kwargs):
        """
        Takes the current request and the arguments from the URL, and
        returns an object represented by this feed. Raises
        django.core.exceptions.ObjectDoesNotExist on error.
        """

    \# ITEM TITLE AND DESCRIPTION -- If title\_template or
    \# description\_template are not defined, these are used instead. Both are
    \# optional, by default they will use the unicode representation of the
    \# item.

    def item\_title(self, item):
        """
        Takes an item, as returned by items(), and returns the item's
        title as a normal Python string.
        """

    def item\_title(self):
        """
        Returns the title for every item in the feed.
        """

    item\_title \= 'Breaking News: Nothing Happening' \# Hard-coded title.

    def item\_description(self, item):
        """
        Takes an item, as returned by items(), and returns the item's
        description as a normal Python string.
        """

    def item\_description(self):
        """
        Returns the description for every item in the feed.
        """

    item\_description \= 'A description of the item.' \# Hard-coded description.

    \# ITEM LINK -- One of these three is required. The framework looks for
    \# them in this order.

    \# First, the framework tries the two methods below, in
    \# order. Failing that, it falls back to the get\_absolute\_url()
    \# method on each item returned by items().

    def item\_link(self, item):
        """
        Takes an item, as returned by items(), and returns the item's URL.
        """

    def item\_link(self):
        """
        Returns the URL for every item in the feed.
        """

    \# ITEM\_GUID -- The following method is optional. If not provided, the
    \# item's link is used by default.

    def item\_guid(self, obj):
        """
        Takes an item, as return by items(), and returns the item's ID.
        """

    \# ITEM AUTHOR NAME -- One of the following three is optional. The
    \# framework looks for them in this order.

    def item\_author\_name(self, item):
        """
        Takes an item, as returned by items(), and returns the item's
        author's name as a normal Python string.
        """

    def item\_author\_name(self):
        """
        Returns the author name for every item in the feed.
        """

    item\_author\_name \= 'Sally Smith' \# Hard-coded author name.

    \# ITEM AUTHOR EMAIL --One of the following three is optional. The
    \# framework looks for them in this order.
    #
    \# If you specify this, you must specify item\_author\_name.

    def item\_author\_email(self, obj):
        """
        Takes an item, as returned by items(), and returns the item's
        author's email as a normal Python string.
        """

    def item\_author\_email(self):
        """
        Returns the author email for every item in the feed.
        """

    item\_author\_email \= 'test@example.com' \# Hard-coded author email.

    \# ITEM AUTHOR LINK -- One of the following three is optional. The
    \# framework looks for them in this order. In each case, the URL should
    \# include the "http://" and domain name.
    #
    \# If you specify this, you must specify item\_author\_name.

    def item\_author\_link(self, obj):
        """
        Takes an item, as returned by items(), and returns the item's
        author's URL as a normal Python string.
        """

    def item\_author\_link(self):
        """
        Returns the author URL for every item in the feed.
        """

    item\_author\_link \= 'http://www.example.com/' \# Hard-coded author URL.

    \# ITEM ENCLOSURE URL -- One of these three is required if you're
    \# publishing enclosures. The framework looks for them in this order.

    def item\_enclosure\_url(self, item):
        """
        Takes an item, as returned by items(), and returns the item's
        enclosure URL.
        """

    def item\_enclosure\_url(self):
        """
        Returns the enclosure URL for every item in the feed.
        """

    item\_enclosure\_url \= "/foo/bar.mp3" \# Hard-coded enclosure link.

    \# ITEM ENCLOSURE LENGTH -- One of these three is required if you're
    \# publishing enclosures. The framework looks for them in this order.
    \# In each case, the returned value should be either an integer, or a
    \# string representation of the integer, in bytes.

    def item\_enclosure\_length(self, item):
        """
        Takes an item, as returned by items(), and returns the item's
        enclosure length.
        """

    def item\_enclosure\_length(self):
        """
        Returns the enclosure length for every item in the feed.
        """

    item\_enclosure\_length \= 32000 \# Hard-coded enclosure length.

    \# ITEM ENCLOSURE MIME TYPE -- One of these three is required if you're
    \# publishing enclosures. The framework looks for them in this order.

    def item\_enclosure\_mime\_type(self, item):
        """
        Takes an item, as returned by items(), and returns the item's
        enclosure MIME type.
        """

    def item\_enclosure\_mime\_type(self):
        """
        Returns the enclosure MIME type for every item in the feed.
        """

    item\_enclosure\_mime\_type \= "audio/mpeg" \# Hard-coded enclosure MIME type.

    \# ITEM PUBDATE -- It's optional to use one of these three. This is a
    \# hook that specifies how to get the pubdate for a given item.
    \# In each case, the method/attribute should return a Python
    \# datetime.datetime object.

    def item\_pubdate(self, item):
        """
        Takes an item, as returned by items(), and returns the item's
        pubdate.
        """

    def item\_pubdate(self):
        """
        Returns the pubdate for every item in the feed.
        """

    item\_pubdate \= datetime.datetime(2005, 5, 3) \# Hard-coded pubdate.

    \# ITEM CATEGORIES -- It's optional to use one of these three. This is
    \# a hook that specifies how to get the list of categories for a given
    \# item. In each case, the method/attribute should return an iterable
    \# object that returns strings.

    def item\_categories(self, item):
        """
        Takes an item, as returned by items(), and returns the item's
        categories.
        """

    def item\_categories(self):
        """
        Returns the categories for every item in the feed.
        """

    item\_categories \= ("python", "django") \# Hard-coded categories.

    \# ITEM COPYRIGHT NOTICE (only applicable to Atom feeds) -- One of the
    \# following three is optional. The framework looks for them in this
    \# order.

    def item\_copyright(self, obj):
        """
        Takes an item, as returned by items(), and returns the item's
        copyright notice as a normal Python string.
        """

    def item\_copyright(self):
        """
        Returns the copyright notice for every item in the feed.
        """

    item\_copyright \= 'Copyright (c) 2007, Sally Smith' \# Hard-coded copyright notice.
