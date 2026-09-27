## The “sites” framework[¶](#module-django.contrib.sites "Permalink to this headline")

Django comes with an optional “sites” framework. It’s a hook for associating objects and functionality to particular Web sites, and it’s a holding place for the domain names and “verbose” names of your Django-powered sites.

Use it if your single Django installation powers more than one site and you need to differentiate between those sites in some way.

The whole sites framework is based on a simple model:

_class_ Site[¶](#django.contrib.sites.models.Site "Permalink to this definition")

A model for storing the domain and name attributes of a Web site. The [SITE\_ID](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-SITE_ID) setting specifies the database ID of the [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") object associated with that particular settings file.

domain[¶](#django.contrib.sites.models.Site.domain "Permalink to this definition")

The domain name associated with the Web site.

name[¶](#django.contrib.sites.models.Site.name "Permalink to this definition")

A human-readable “verbose” name for the Web site.

How you use this is up to you, but Django uses it in a couple of ways automatically via simple conventions.

## Example usage[¶](#example-usage "Permalink to this headline")

Why would you use sites? It’s best explained through examples.

### Associating content with multiple sites[¶](#associating-content-with-multiple-sites "Permalink to this headline")

The Django-powered sites [LJWorld.com](http://www.ljworld.com/) and [Lawrence.com](http://www.lawrence.com/) are operated by the same news organization – the Lawrence Journal-World newspaper in Lawrence, Kansas. LJWorld.com focuses on news, while Lawrence.com focuses on local entertainment. But sometimes editors want to publish an article on _both_ sites.

The brain-dead way of solving the problem would be to require site producers to publish the same story twice: once for LJWorld.com and again for Lawrence.com. But that’s inefficient for site producers, and it’s redundant to store multiple copies of the same story in the database.

The better solution is simple: Both sites use the same article database, and an article is associated with one or more sites. In Django model terminology, that’s represented by a [ManyToManyField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ManyToManyField "django.db.models.ManyToManyField") in the Article model:

from django.db import models
from django.contrib.sites.models import Site

class Article(models.Model):
    headline \= models.CharField(max\_length\=200)
    \# ...
    sites \= models.ManyToManyField(Site)

This accomplishes several things quite nicely:

-   It lets the site producers edit all content – on both sites – in a single interface (the Django admin).
    
-   It means the same story doesn’t have to be published twice in the database; it only has a single record in the database.
    
-   It lets the site developers use the same Django view code for both sites. The view code that displays a given story just checks to make sure the requested story is on the current site. It looks something like this:
    
    from django.contrib.sites.models import get\_current\_site
    
    def article\_detail(request, article\_id):
        try:
            a \= Article.objects.get(id\=article\_id, sites\_\_id\_\_exact\=get\_current\_site(request).id)
        except Article.DoesNotExist:
            raise Http404
        \# ...
    

### Associating content with a single site[¶](#associating-content-with-a-single-site "Permalink to this headline")

Similarly, you can associate a model to the [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") model in a many-to-one relationship, using [ForeignKey](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ForeignKey "django.db.models.ForeignKey").

For example, if an article is only allowed on a single site, you’d use a model like this:

from django.db import models
from django.contrib.sites.models import Site

class Article(models.Model):
    headline \= models.CharField(max\_length\=200)
    \# ...
    site \= models.ForeignKey(Site)

This has the same benefits as described in the last section.

### Hooking into the current site from views[¶](#hooking-into-the-current-site-from-views "Permalink to this headline")

You can use the sites framework in your Django views to do particular things based on the site in which the view is being called. For example:

from django.conf import settings

def my\_view(request):
    if settings.SITE\_ID \== 3:
        \# Do something.
        pass
    else:
        \# Do something else.
        pass

Of course, it’s ugly to hard-code the site IDs like that. This sort of hard-coding is best for hackish fixes that you need done quickly. The cleaner way of accomplishing the same thing is to check the current site’s domain:

from django.contrib.sites.models import get\_current\_site

def my\_view(request):
    current\_site \= get\_current\_site(request)
    if current\_site.domain \== 'foo.com':
        \# Do something
        pass
    else:
        \# Do something else.
        pass

This has also the advantage of checking if the sites framework is installed, and return a [RequestSite](#django.contrib.sites.models.RequestSite "django.contrib.sites.models.RequestSite") instance if it is not.

If you don’t have access to the request object, you can use the get\_current() method of the [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") model’s manager. You should then ensure that your settings file does contain the [SITE\_ID](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-SITE_ID) setting. This example is equivalent to the previous one:

from django.contrib.sites.models import Site

def my\_function\_without\_request():
    current\_site \= Site.objects.get\_current()
    if current\_site.domain \== 'foo.com':
        \# Do something
        pass
    else:
        \# Do something else.
        pass

### Getting the current domain for display[¶](#getting-the-current-domain-for-display "Permalink to this headline")

LJWorld.com and Lawrence.com both have email alert functionality, which lets readers sign up to get notifications when news happens. It’s pretty basic: A reader signs up on a Web form, and he immediately gets an email saying, “Thanks for your subscription.”

It’d be inefficient and redundant to implement this signup-processing code twice, so the sites use the same code behind the scenes. But the “thank you for signing up” notice needs to be different for each site. By using [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") objects, we can abstract the “thank you” notice to use the values of the current site’s [name](#django.contrib.sites.models.Site.name "django.contrib.sites.models.Site.name") and [domain](#django.contrib.sites.models.Site.domain "django.contrib.sites.models.Site.domain").

Here’s an example of what the form-handling view looks like:

from django.contrib.sites.models import get\_current\_site
from django.core.mail import send\_mail

def register\_for\_newsletter(request):
    \# Check form values, etc., and subscribe the user.
    \# ...

    current\_site \= get\_current\_site(request)
    send\_mail('Thanks for subscribing to %s alerts' % current\_site.name,
        'Thanks for your subscription. We appreciate it.\\n\\n\-The %s team.' % current\_site.name,
        'editor@%s' % current\_site.domain,
        \[user.email\])

    \# ...

On Lawrence.com, this email has the subject line “Thanks for subscribing to lawrence.com alerts.” On LJWorld.com, the email has the subject “Thanks for subscribing to LJWorld.com alerts.” Same goes for the email’s message body.

Note that an even more flexible (but more heavyweight) way of doing this would be to use Django’s template system. Assuming Lawrence.com and LJWorld.com have different template directories ([TEMPLATE\_DIRS](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-TEMPLATE_DIRS)), you could simply farm out to the template system like so:

from django.core.mail import send\_mail
from django.template import loader, Context

def register\_for\_newsletter(request):
    \# Check form values, etc., and subscribe the user.
    \# ...

    subject \= loader.get\_template('alerts/subject.txt').render(Context({}))
    message \= loader.get\_template('alerts/message.txt').render(Context({}))
    send\_mail(subject, message, 'editor@ljworld.com', \[user.email\])

    \# ...

In this case, you’d have to create subject.txt and message.txt template files for both the LJWorld.com and Lawrence.com template directories. That gives you more flexibility, but it’s also more complex.

It’s a good idea to exploit the [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") objects as much as possible, to remove unneeded complexity and redundancy.

### Getting the current domain for full URLs[¶](#getting-the-current-domain-for-full-urls "Permalink to this headline")

Django’s get\_absolute\_url() convention is nice for getting your objects’ URL without the domain name, but in some cases you might want to display the full URL – with http:// and the domain and everything – for an object. To do this, you can use the sites framework. A simple example:

\>>> from django.contrib.sites.models import Site
\>>> obj \= MyModel.objects.get(id\=3)
\>>> obj.get\_absolute\_url()
'/mymodel/objects/3/'
\>>> Site.objects.get\_current().domain
'example.com'
\>>> 'http://%s%s' % (Site.objects.get\_current().domain, obj.get\_absolute\_url())
'http://example.com/mymodel/objects/3/'

## Default site and syncdb[¶](#default-site-and-syncdb "Permalink to this headline")

django.contrib.sites registers a [post\_syncdb](https://django-chinese-docs.readthedocs.io/en/latest/ref/signals.html#django.db.models.signals.post_syncdb "django.db.models.signals.post_syncdb") signal handler which creates a default site named example.com with the domain example.com. For example, this site will be created after Django creates the test database.

## Caching the current Site object[¶](#caching-the-current-site-object "Permalink to this headline")

As the current site is stored in the database, each call to Site.objects.get\_current() could result in a database query. But Django is a little cleverer than that: on the first request, the current site is cached, and any subsequent call returns the cached data instead of hitting the database.

If for any reason you want to force a database query, you can tell Django to clear the cache using Site.objects.clear\_cache():

\# First call; current site fetched from database.
current\_site \= Site.objects.get\_current()
\# ...

\# Second call; current site fetched from cache.
current\_site \= Site.objects.get\_current()
\# ...

\# Force a database query for the third call.
Site.objects.clear\_cache()
current\_site \= Site.objects.get\_current()

## The CurrentSiteManager[¶](#the-currentsitemanager "Permalink to this headline")

_class_ CurrentSiteManager[¶](#django.contrib.sites.managers.CurrentSiteManager "Permalink to this definition")

If [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") plays a key role in your application, consider using the helpful [CurrentSiteManager](#django.contrib.sites.managers.CurrentSiteManager "django.contrib.sites.managers.CurrentSiteManager") in your model(s). It’s a model [_manager_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/managers.html) that automatically filters its queries to include only objects associated with the current [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site").

Use [CurrentSiteManager](#django.contrib.sites.managers.CurrentSiteManager "django.contrib.sites.managers.CurrentSiteManager") by adding it to your model explicitly. For example:

from django.db import models
from django.contrib.sites.models import Site
from django.contrib.sites.managers import CurrentSiteManager

class Photo(models.Model):
    photo \= models.FileField(upload\_to\='/home/photos')
    photographer\_name \= models.CharField(max\_length\=100)
    pub\_date \= models.DateField()
    site \= models.ForeignKey(Site)
    objects \= models.Manager()
    on\_site \= CurrentSiteManager()

With this model, Photo.objects.all() will return all Photo objects in the database, but Photo.on\_site.all() will return only the Photo objects associated with the current site, according to the [SITE\_ID](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-SITE_ID) setting.

Put another way, these two statements are equivalent:

Photo.objects.filter(site\=settings.SITE\_ID)
Photo.on\_site.all()

How did [CurrentSiteManager](#django.contrib.sites.managers.CurrentSiteManager "django.contrib.sites.managers.CurrentSiteManager") know which field of Photo was the [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site")? By default, [CurrentSiteManager](#django.contrib.sites.managers.CurrentSiteManager "django.contrib.sites.managers.CurrentSiteManager") looks for a either a [ForeignKey](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ForeignKey "django.db.models.ForeignKey") called site or a [ManyToManyField](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/fields.html#django.db.models.ManyToManyField "django.db.models.ManyToManyField") called sites to filter on. If you use a field named something other than site or sites to identify which [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") objects your object is related to, then you need to explicitly pass the custom field name as a parameter to [CurrentSiteManager](#django.contrib.sites.managers.CurrentSiteManager "django.contrib.sites.managers.CurrentSiteManager") on your model. The following model, which has a field called publish\_on, demonstrates this:

from django.db import models
from django.contrib.sites.models import Site
from django.contrib.sites.managers import CurrentSiteManager

class Photo(models.Model):
    photo \= models.FileField(upload\_to\='/home/photos')
    photographer\_name \= models.CharField(max\_length\=100)
    pub\_date \= models.DateField()
    publish\_on \= models.ForeignKey(Site)
    objects \= models.Manager()
    on\_site \= CurrentSiteManager('publish\_on')

If you attempt to use [CurrentSiteManager](#django.contrib.sites.managers.CurrentSiteManager "django.contrib.sites.managers.CurrentSiteManager") and pass a field name that doesn’t exist, Django will raise a ValueError.

Finally, note that you’ll probably want to keep a normal (non-site-specific) Manager on your model, even if you use [CurrentSiteManager](#django.contrib.sites.managers.CurrentSiteManager "django.contrib.sites.managers.CurrentSiteManager"). As explained in the [_manager documentation_](https://django-chinese-docs.readthedocs.io/en/latest/topics/db/managers.html), if you define a manager manually, then Django won’t create the automatic objects \= models.Manager() manager for you. Also note that certain parts of Django – namely, the Django admin site and generic views – use whichever manager is defined _first_ in the model, so if you want your admin site to have access to all objects (not just site-specific ones), put objects \= models.Manager() in your model, before you define [CurrentSiteManager](#django.contrib.sites.managers.CurrentSiteManager "django.contrib.sites.managers.CurrentSiteManager").

## How Django uses the sites framework[¶](#how-django-uses-the-sites-framework "Permalink to this headline")

Although it’s not required that you use the sites framework, it’s strongly encouraged, because Django takes advantage of it in a few places. Even if your Django installation is powering only a single site, you should take the two seconds to create the site object with your domain and name, and point to its ID in your [SITE\_ID](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-SITE_ID) setting.

Here’s how Django uses the sites framework:

-   In the [redirects framework](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/redirects.html#module-django.contrib.redirects "django.contrib.redirects: A framework for managing redirects."), each redirect object is associated with a particular site. When Django searches for a redirect, it takes into account the current site.
-   In the comments framework, each comment is associated with a particular site. When a comment is posted, its [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") is set to the current site, and when comments are listed via the appropriate template tag, only the comments for the current site are displayed.
-   In the [flatpages framework](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/flatpages.html#module-django.contrib.flatpages "django.contrib.flatpages: A framework for managing simple ?flat? HTML content in a database."), each flatpage is associated with a particular site. When a flatpage is created, you specify its [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site"), and the [FlatpageFallbackMiddleware](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/flatpages.html#django.contrib.flatpages.middleware.FlatpageFallbackMiddleware "django.contrib.flatpages.middleware.FlatpageFallbackMiddleware") checks the current site in retrieving flatpages to display.
-   In the [syndication framework](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/syndication.html#module-django.contrib.syndication "django.contrib.syndication: A framework for generating syndication feeds, in RSS and Atom, quite easily."), the templates for title and description automatically have access to a variable {{ site }}, which is the [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") object representing the current site. Also, the hook for providing item URLs will use the domain from the current [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") object if you don’t specify a fully-qualified domain.
-   In the [authentication framework](https://django-chinese-docs.readthedocs.io/en/latest/topics/auth/index.html#module-django.contrib.auth "django.contrib.auth: Django's authentication framework."), the [django.contrib.auth.views.login()](https://django-chinese-docs.readthedocs.io/en/latest/topics/auth/default.html#django.contrib.auth.views.login "django.contrib.auth.views.login") view passes the current [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") name to the template as {{ site\_name }}.
-   The shortcut view (django.views.defaults.shortcut) uses the domain of the current [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") object when calculating an object’s URL.
-   In the admin framework, the “view on site” link uses the current [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") to work out the domain for the site that it will redirect to.

## RequestSite objects[¶](#requestsite-objects "Permalink to this headline")

Some [_django.contrib_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/index.html) applications take advantage of the sites framework but are architected in a way that doesn’t _require_ the sites framework to be installed in your database. (Some people don’t want to, or just aren’t _able_ to install the extra database table that the sites framework requires.) For those cases, the framework provides a [RequestSite](#django.contrib.sites.models.RequestSite "django.contrib.sites.models.RequestSite") class, which can be used as a fallback when the database-backed sites framework is not available.

_class_ RequestSite[¶](#django.contrib.sites.models.RequestSite "Permalink to this definition")

A class that shares the primary interface of [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") (i.e., it has domain and name attributes) but gets its data from a Django [HttpRequest](https://django-chinese-docs.readthedocs.io/en/latest/ref/request-response.html#django.http.HttpRequest "django.http.HttpRequest") object rather than from a database.

The save() and delete() methods raise NotImplementedError.

\_\_init\_\_(_request_)[¶](#django.contrib.sites.models.RequestSite.__init__ "Permalink to this definition")

Sets the name and domain attributes to the value of [get\_host()](https://django-chinese-docs.readthedocs.io/en/latest/ref/request-response.html#django.http.HttpRequest.get_host "django.http.HttpRequest.get_host").

A [RequestSite](#django.contrib.sites.models.RequestSite "django.contrib.sites.models.RequestSite") object has a similar interface to a normal [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site") object, except its [\_\_init\_\_()](#django.contrib.sites.models.RequestSite.__init__ "django.contrib.sites.models.RequestSite.__init__") method takes an [HttpRequest](https://django-chinese-docs.readthedocs.io/en/latest/ref/request-response.html#django.http.HttpRequest "django.http.HttpRequest") object. It’s able to deduce the domain and name by looking at the request’s domain. It has save() and delete() methods to match the interface of [Site](#django.contrib.sites.models.Site "django.contrib.sites.models.Site"), but the methods raise NotImplementedError.
