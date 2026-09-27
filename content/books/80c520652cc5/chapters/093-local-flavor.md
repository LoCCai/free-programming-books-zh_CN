## The “local flavor” add-ons[¶](#module-django.contrib.localflavor "Permalink to this headline")

Historically, Django has shipped with django.contrib.localflavor – assorted pieces of code that are useful for particular countries or cultures. Starting with Django 1.5, we’ve started the process of moving the code to outside packages (i.e., packages distributed separately from Django), for easier maintenance and to trim the size of Django’s codebase.

The localflavor packages are named django-localflavor-\*, where the asterisk is an [ISO 3166 country code](http://www.iso.org/iso/country_codes.htm). For example: django-localflavor-us is the localflavor package for the U.S.A.

Most of these localflavor add-ons are country-specific fields for the [_forms_](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/index.html) framework – for example, a USStateField that knows how to validate U.S. state abbreviations and a FISocialSecurityNumber that knows how to validate Finnish social security numbers.

To use one of these localized components, just import the relevant subpackage. For example, here’s how you can create a form with a field representing a French telephone number:

from django import forms
from django\_localflavor\_fr.forms import FRPhoneNumberField

class MyForm(forms.Form):
    my\_french\_phone\_no \= FRPhoneNumberField()

For documentation on a given country’s localflavor helpers, see its README file.

## How to migrate[¶](#how-to-migrate "Permalink to this headline")

If you’ve used the old django.contrib.localflavor package, follow these two easy steps to update your code:

1.  Install the appropriate third-party django-localflavor-\* package(s). Go to [https://github.com/django/](https://github.com/django/) and find the package for your country.
    
2.  Change your app’s import statements to reference the new packages.
    
    For example, change this:
    
    from django.contrib.localflavor.fr.forms import FRPhoneNumberField
    
    ...to this:
    
    from django\_localflavor\_fr.forms import FRPhoneNumberField
    

The code in the new packages is the same (it was copied directly from Django), so you don’t have to worry about backwards compatibility in terms of functionality. Only the imports have changed.

## Deprecation policy[¶](#deprecation-policy "Permalink to this headline")

In Django 1.5, importing from django.contrib.localflavor will result in a DeprecationWarning. This means your code will still work, but you should change it as soon as possible.

In Django 1.6, importing from django.contrib.localflavor will no longer work.

## Supported countries[¶](#supported-countries "Permalink to this headline")

The following countries have django-localflavor- packages.

-   Argentina: [https://github.com/django/django-localflavor-ar](https://github.com/django/django-localflavor-ar)
-   Australia: [https://github.com/django/django-localflavor-au](https://github.com/django/django-localflavor-au)
-   Austria: [https://github.com/django/django-localflavor-at](https://github.com/django/django-localflavor-at)
-   Belgium: [https://github.com/django/django-localflavor-be](https://github.com/django/django-localflavor-be)
-   Brazil: [https://github.com/django/django-localflavor-br](https://github.com/django/django-localflavor-br)
-   Canada: [https://github.com/django/django-localflavor-ca](https://github.com/django/django-localflavor-ca)
-   Chile: [https://github.com/django/django-localflavor-cl](https://github.com/django/django-localflavor-cl)
-   China: [https://github.com/django/django-localflavor-cn](https://github.com/django/django-localflavor-cn)
-   Colombia: [https://github.com/django/django-localflavor-co](https://github.com/django/django-localflavor-co)
-   Croatia: [https://github.com/django/django-localflavor-cr](https://github.com/django/django-localflavor-cr)
-   Czech Republic: [https://github.com/django/django-localflavor-cz](https://github.com/django/django-localflavor-cz)
-   Ecuador: [https://github.com/django/django-localflavor-ec](https://github.com/django/django-localflavor-ec)
-   Finland: [https://github.com/django/django-localflavor-fi](https://github.com/django/django-localflavor-fi)
-   France: [https://github.com/django/django-localflavor-fr](https://github.com/django/django-localflavor-fr)
-   Germany: [https://github.com/django/django-localflavor-de](https://github.com/django/django-localflavor-de)
-   Hong Kong: [https://github.com/django/django-localflavor-hk](https://github.com/django/django-localflavor-hk)
-   Iceland: [https://github.com/django/django-localflavor-is](https://github.com/django/django-localflavor-is)
-   India: [https://github.com/django/django-localflavor-in](https://github.com/django/django-localflavor-in)
-   Indonesia: [https://github.com/django/django-localflavor-id](https://github.com/django/django-localflavor-id)
-   Ireland: [https://github.com/django/django-localflavor-ie](https://github.com/django/django-localflavor-ie)
-   Israel: [https://github.com/django/django-localflavor-il](https://github.com/django/django-localflavor-il)
-   Italy: [https://github.com/django/django-localflavor-it](https://github.com/django/django-localflavor-it)
-   Japan: [https://github.com/django/django-localflavor-jp](https://github.com/django/django-localflavor-jp)
-   Kuwait: [https://github.com/django/django-localflavor-kw](https://github.com/django/django-localflavor-kw)
-   Lithuania: [https://github.com/simukis/django-localflavor-lt](https://github.com/simukis/django-localflavor-lt)
-   Macedonia: [https://github.com/django/django-localflavor-mk](https://github.com/django/django-localflavor-mk)
-   Mexico: [https://github.com/django/django-localflavor-mx](https://github.com/django/django-localflavor-mx)
-   The Netherlands: [https://github.com/django/django-localflavor-nl](https://github.com/django/django-localflavor-nl)
-   Norway: [https://github.com/django/django-localflavor-no](https://github.com/django/django-localflavor-no)
-   Peru: [https://github.com/django/django-localflavor-pe](https://github.com/django/django-localflavor-pe)
-   Poland: [https://github.com/django/django-localflavor-pl](https://github.com/django/django-localflavor-pl)
-   Portugal: [https://github.com/django/django-localflavor-pt](https://github.com/django/django-localflavor-pt)
-   Paraguay: [https://github.com/django/django-localflavor-py](https://github.com/django/django-localflavor-py)
-   Romania: [https://github.com/django/django-localflavor-ro](https://github.com/django/django-localflavor-ro)
-   Russia: [https://github.com/django/django-localflavor-ru](https://github.com/django/django-localflavor-ru)
-   Slovakia: [https://github.com/django/django-localflavor-sk](https://github.com/django/django-localflavor-sk)
-   Slovenia: [https://github.com/django/django-localflavor-si](https://github.com/django/django-localflavor-si)
-   South Africa: [https://github.com/django/django-localflavor-za](https://github.com/django/django-localflavor-za)
-   Spain: [https://github.com/django/django-localflavor-es](https://github.com/django/django-localflavor-es)
-   Sweden: [https://github.com/django/django-localflavor-se](https://github.com/django/django-localflavor-se)
-   Switzerland: [https://github.com/django/django-localflavor-ch](https://github.com/django/django-localflavor-ch)
-   Turkey: [https://github.com/django/django-localflavor-tr](https://github.com/django/django-localflavor-tr)
-   United Kingdom: [https://github.com/django/django-localflavor-gb](https://github.com/django/django-localflavor-gb)
-   United States of America: [https://github.com/django/django-localflavor-us](https://github.com/django/django-localflavor-us)
-   Uruguay: [https://github.com/django/django-localflavor-uy](https://github.com/django/django-localflavor-uy)

## django.contrib.localflavor.generic[¶](#django-contrib-localflavor-generic "Permalink to this headline")

The django.contrib.localflavor.generic package, which hasn’t been removed from Django yet, contains useful code that is not specific to one particular country or culture. Currently, it defines date, datetime and split datetime input fields based on those from [_forms_](https://django-chinese-docs.readthedocs.io/en/latest/topics/forms/index.html), but with non-US default formats. Here’s an example of how to use them:

from django import forms
from django.contrib.localflavor import generic

class MyForm(forms.Form):
    my\_date\_field \= generic.forms.DateField()

## Internationalization of localflavors[¶](#internationalization-of-localflavors "Permalink to this headline")

To activate translations for a newly-created localflavor application, you must include the application’s name (e.g. django\_localflavor\_jp) in the [INSTALLED\_APPS](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-INSTALLED_APPS) setting, so the internationalization system can find the catalog, as explained in [_How Django discovers translations_](https://django-chinese-docs.readthedocs.io/en/latest/topics/i18n/translation.html#how-django-discovers-translations).

If you’re still using the legacy localflavor application, you must include [django.contrib.localflavor](#module-django.contrib.localflavor "django.contrib.localflavor: A collection of various Django snippets that are useful only for a particular country or culture.") in [INSTALLED\_APPS](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-INSTALLED_APPS) (that will raise a DeprecationWarning).
