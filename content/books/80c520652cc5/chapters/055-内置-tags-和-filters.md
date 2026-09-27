This document describes Django’s built-in template tags and filters. It is recommended that you use the [_automatic documentation_](https://django-chinese-docs.readthedocs.io/en/latest/ref/contrib/admin/admindocs.html), if available, as this will also include documentation for any custom tags or filters installed.

## Built-in tag reference[¶](#built-in-tag-reference "Permalink to this headline")

### autoescape[¶](#autoescape "Permalink to this headline")

Controls the current auto-escaping behavior. This tag takes either on or off as an argument and that determines whether auto-escaping is in effect inside the block. The block is closed with an endautoescape ending tag.

When auto-escaping is in effect, all variable content has HTML escaping applied to it before placing the result into the output (but after any filters have been applied). This is equivalent to manually applying the [escape](#std:templatefilter-escape) filter to each variable.

The only exceptions are variables that are already marked as “safe” from escaping, either by the code that populated the variable, or because it has had the [safe](#std:templatefilter-safe) or [escape](#std:templatefilter-escape) filters applied.

Sample usage:

{% autoescape on %}
    {{ body }}
{% endautoescape %}

### block[¶](#block "Permalink to this headline")

Defines a block that can be overridden by child templates. See [_Template inheritance_](https://django-chinese-docs.readthedocs.io/en/latest/topics/templates.html#template-inheritance) for more information.

### cycle[¶](#cycle "Permalink to this headline")

Cycles among the given strings or variables each time this tag is encountered.

Within a loop, cycles among the given strings each time through the loop:

{% for o in some\_list %}
    <tr class="{% cycle 'row1' 'row2' %}"\>
        ...
    </tr>
{% endfor %}

You can use variables, too. For example, if you have two template variables, rowvalue1 and rowvalue2, you can cycle between their values like this:

{% for o in some\_list %}
    <tr class="{% cycle rowvalue1 rowvalue2 %}"\>
        ...
    </tr>
{% endfor %}

Note that variable arguments (rowvalue1 and rowvalue2 above) are NOT auto-escaped! So either make sure that you trust their values, or use explicit escaping, like this:

{% for o in some\_list %}
    <tr class="{% filter force\_escape %}{% cycle rowvalue1 rowvalue2 %}{% endfilter %}"\>
        ...
    </tr>
{% endfor %}

You can mix variables and strings:

{% for o in some\_list %}
    <tr class="{% cycle 'row1' rowvalue2 'row3' %}"\>
        ...
    </tr>
{% endfor %}

In some cases you might want to refer to the next value of a cycle from outside of a loop. To do this, just give the {% cycle %} tag a name, using “as”, like this:

{% cycle 'row1' 'row2' as rowcolors %}

From then on, you can insert the current value of the cycle wherever you’d like in your template by referencing the cycle name as a context variable. If you want to move the cycle onto the next value, you use the cycle tag again, using the name of the variable. So, the following template:

<tr>
    <td class="{% cycle 'row1' 'row2' as rowcolors %}"\>...</td>
    <td class="{{ rowcolors }}"\>...</td>
</tr>
<tr>
    <td class="{% cycle rowcolors %}"\>...</td>
    <td class="{{ rowcolors }}"\>...</td>
</tr>

would output:

<tr>
    <td class="row1"\>...</td>
    <td class="row1"\>...</td>
</tr>
<tr>
    <td class="row2"\>...</td>
    <td class="row2"\>...</td>
</tr>

You can use any number of values in a {% cycle %} tag, separated by spaces. Values enclosed in single (') or double quotes (") are treated as string literals, while values without quotes are treated as template variables.

Note that the variables included in the cycle will not be escaped. This is because template tags do not escape their content. Any HTML or Javascript code contained in the printed variable will be rendered as-is, which could potentially lead to security issues.

For backwards compatibility, the {% cycle %} tag supports the much inferior old syntax from previous Django versions. You shouldn’t use this in any new projects, but for the sake of the people who are still using it, here’s what it looks like:

{% cycle row1,row2,row3 %}

In this syntax, each value gets interpreted as a literal string, and there’s no way to specify variable values. Or literal commas. Or spaces. Did we mention you shouldn’t use this syntax in any new projects?

By default, when you use the as keyword with the cycle tag, the usage of {% cycle %} that declares the cycle will itself output the first value in the cycle. This could be a problem if you want to use the value in a nested loop or an included template. If you want to just declare the cycle, but not output the first value, you can add a silent keyword as the last keyword in the tag. For example:

{% for obj in some\_list %}
    {% cycle 'row1' 'row2' as rowcolors silent %}
    <tr class="{{ rowcolors }}"\>{% include "subtemplate.html " %}</tr>
{% endfor %}

This will output a list of <tr> elements with class alternating between row1 and row2; the subtemplate will have access to rowcolors in it’s context that matches the class of the <tr> that encloses it. If the silent keyword were to be omitted, row1 would be emitted as normal text, outside the <tr> element.

When the silent keyword is used on a cycle definition, the silence automatically applies to all subsequent uses of the cycle tag. In, the following template would output _nothing_, even though the second call to {% cycle %} doesn’t specify silent:

{% cycle 'row1' 'row2' as rowcolors silent %}
{% cycle rowcolors %}

### debug[¶](#debug "Permalink to this headline")

Outputs a whole load of debugging information, including the current context and imported modules.

### extends[¶](#extends "Permalink to this headline")

Signals that this template extends a parent template.

This tag can be used in two ways:

-   {% extends "base.html" %} (with quotes) uses the literal value "base.html" as the name of the parent template to extend.
-   {% extends variable %} uses the value of variable. If the variable evaluates to a string, Django will use that string as the name of the parent template. If the variable evaluates to a Template object, Django will use that object as the parent template.

See [_Template inheritance_](https://django-chinese-docs.readthedocs.io/en/latest/topics/templates.html#template-inheritance) for more information.

### filter[¶](#filter "Permalink to this headline")

Filters the contents of the variable through variable filters.

Filters can also be piped through each other, and they can have arguments – just like in variable syntax.

Sample usage:

{% filter force\_escape|lower %}
    This text will be HTML-escaped, and will appear in all lowercase.
{% endfilter %}

Note

The [escape](#std:templatefilter-escape) and [safe](#std:templatefilter-safe) filters are not acceptable arguments. Instead, use the [autoescape](#std:templatetag-autoescape) tag to manage autoescaping for blocks of template code.

### firstof[¶](#firstof "Permalink to this headline")

Outputs the first variable passed that is not False. Does NOT auto-escape variable values.

Outputs nothing if all the passed variables are False.

Sample usage:

{% firstof var1 var2 var3 %}

This is equivalent to:

{% if var1 %}
    {{ var1|safe }}
{% else %}{% if var2 %}
    {{ var2|safe }}
{% else %}{% if var3 %}
    {{ var3|safe }}
{% endif %}{% endif %}{% endif %}

You can also use a literal string as a fallback value in case all passed variables are False:

{% firstof var1 var2 var3 "fallback value" %}

Note that the variables included in the firstof tag will not be escaped. This is because template tags do not escape their content. Any HTML or Javascript code contained in the printed variable will be rendered as-is, which could potentially lead to security issues. If you need to escape the variables in the firstof tag, you must do so explicitly:

{% filter force\_escape %}
    {% firstof var1 var2 var3 "fallback value" %}
{% endfilter %}

### for[¶](#for "Permalink to this headline")

Loop over each item in an array. For example, to display a list of athletes provided in athlete\_list:

<ul>
{% for athlete in athlete\_list %}
    <li>{{ athlete.name }}</li>
{% endfor %}
</ul>

You can loop over a list in reverse by using {% for obj in list reversed %}.

If you need to loop over a list of lists, you can unpack the values in each sub-list into individual variables. For example, if your context contains a list of (x,y) coordinates called points, you could use the following to output the list of points:

{% for x, y in points %}
    There is a point at {{ x }},{{ y }}
{% endfor %}

This can also be useful if you need to access the items in a dictionary. For example, if your context contained a dictionary data, the following would display the keys and values of the dictionary:

{% for key, value in data.items %}
    {{ key }}: {{ value }}
{% endfor %}

The for loop sets a number of variables available within the loop:

 
| Variable | Description |
| --- | --- |
| forloop.counter | The current iteration of the loop (1-indexed) |
| forloop.counter0 | The current iteration of the loop (0-indexed) |
| forloop.revcounter | The number of iterations from the end of the loop (1-indexed) |
| forloop.revcounter0 | The number of iterations from the end of the loop (0-indexed) |
| forloop.first | True if this is the first time through the loop |
| forloop.last | True if this is the last time through the loop |
| forloop.parentloop | For nested loops, this is the loop “above” the current one |

### for ... empty[¶](#for-empty "Permalink to this headline")

The for tag can take an optional {% empty %} clause that will be displayed if the given array is empty or could not be found:

<ul>
{% for athlete in athlete\_list %}
    <li>{{ athlete.name }}</li>
{% empty %}
    <li>Sorry, no athlete in this list!</li>
{% endfor %}
<ul>

The above is equivalent to – but shorter, cleaner, and possibly faster than – the following:

<ul>
  {% if athlete\_list %}
    {% for athlete in athlete\_list %}
      <li>{{ athlete.name }}</li>
    {% endfor %}
  {% else %}
    <li>Sorry, no athletes in this list.</li>
  {% endif %}
</ul>

### if[¶](#if "Permalink to this headline")

The {% if %} tag evaluates a variable, and if that variable is “true” (i.e. exists, is not empty, and is not a false boolean value) the contents of the block are output:

{% if athlete\_list %}
    Number of athletes: {{ athlete\_list|length }}
{% elif athlete\_in\_locker\_room\_list %}
    Athletes should be out of the locker room soon!
{% else %}
    No athletes.
{% endif %}

In the above, if athlete\_list is not empty, the number of athletes will be displayed by the {{ athlete\_list|length }} variable.

As you can see, the if tag may take one or several {% elif %} clauses, as well as an {% else %} clause that will be displayed if all previous conditions fail. These clauses are optional.

New in Django 1.4.

The if tag now supports {% elif %} clauses.

### Boolean operators[¶](#boolean-operators "Permalink to this headline")

[if](#std:templatetag-if) tags may use and, or or not to test a number of variables or to negate a given variable:

{% if athlete\_list and coach\_list %}
    Both athletes and coaches are available.
{% endif %}

{% if not athlete\_list %}
    There are no athletes.
{% endif %}

{% if athlete\_list or coach\_list %}
    There are some athletes or some coaches.
{% endif %}

{% if not athlete\_list or coach\_list %}
    There are no athletes or there are some coaches (OK, so
    writing English translations of boolean logic sounds
    stupid; it's not our fault).
{% endif %}

{% if athlete\_list and not coach\_list %}
    There are some athletes and absolutely no coaches.
{% endif %}

Use of both and and or clauses within the same tag is allowed, with and having higher precedence than or e.g.:

{% if athlete\_list and coach\_list or cheerleader\_list %}

will be interpreted like:

if (athlete\_list and coach\_list) or cheerleader\_list

Use of actual parentheses in the [if](#std:templatetag-if) tag is invalid syntax. If you need them to indicate precedence, you should use nested [if](#std:templatetag-if) tags.

[if](#std:templatetag-if) tags may also use the operators \==, !=, <, \>, <=, \>= and in which work as follows:

### \== operator[¶](#operator "Permalink to this headline")

Equality. Example:

{% if somevar \== "x" %}
  This appears if variable somevar equals the string "x"
{% endif %}

### != operator[¶](#id1 "Permalink to this headline")

Inequality. Example:

{% if somevar !\= "x" %}
  This appears if variable somevar does not equal the string "x",
  or if somevar is not found in the context
{% endif %}

### < operator[¶](#id2 "Permalink to this headline")

Less than. Example:

{% if somevar < 100 %}
  This appears if variable somevar is less than 100.
{% endif %}

### \> operator[¶](#id3 "Permalink to this headline")

Greater than. Example:

{% if somevar \> 0 %}
  This appears if variable somevar is greater than 0.
{% endif %}

### <= operator[¶](#id4 "Permalink to this headline")

Less than or equal to. Example:

{% if somevar <= 100 %}
  This appears if variable somevar is less than 100 or equal to 100.
{% endif %}

### \>= operator[¶](#id5 "Permalink to this headline")

Greater than or equal to. Example:

{% if somevar \>= 1 %}
  This appears if variable somevar is greater than 1 or equal to 1.
{% endif %}

### in operator[¶](#in-operator "Permalink to this headline")

Contained within. This operator is supported by many Python containers to test whether the given value is in the container. The following are some examples of how x in y will be interpreted:

{% if "bc" in "abcdef" %}
  This appears since "bc" is a substring of "abcdef"
{% endif %}

{% if "hello" in greetings %}
  If greetings is a list or set, one element of which is the string
  "hello", this will appear.
{% endif %}

{% if user in users %}
  If users is a QuerySet, this will appear if user is an
  instance that belongs to the QuerySet.
{% endif %}

### not in operator[¶](#not-in-operator "Permalink to this headline")

Not contained within. This is the negation of the in operator.

The comparison operators cannot be ‘chained’ like in Python or in mathematical notation. For example, instead of using:

{% if a \> b \> c %}  (WRONG)

you should use:

{% if a \> b and b \> c %}

### Filters[¶](#filters "Permalink to this headline")

You can also use filters in the [if](#std:templatetag-if) expression. For example:

{% if messages|length \>= 100 %}
   You have lots of messages today!
{% endif %}

### Complex expressions[¶](#complex-expressions "Permalink to this headline")

All of the above can be combined to form complex expressions. For such expressions, it can be important to know how the operators are grouped when the expression is evaluated - that is, the precedence rules. The precedence of the operators, from lowest to highest, is as follows:

-   or
-   and
-   not
-   in
-   \==, !=, <, \>, <=, \>=

(This follows Python exactly). So, for example, the following complex [if](#std:templatetag-if) tag:

{% if a \== b or c \== d and e %}

...will be interpreted as:

(a \== b) or ((c \== d) and e)

If you need different precedence, you will need to use nested [if](#std:templatetag-if) tags. Sometimes that is better for clarity anyway, for the sake of those who do not know the precedence rules.

### ifchanged[¶](#ifchanged "Permalink to this headline")

Check if a value has changed from the last iteration of a loop.

The {% ifchanged %} block tag is used within a loop. It has two possible uses.

1.  Checks its own rendered contents against its previous state and only displays the content if it has changed. For example, this displays a list of days, only displaying the month if it changes:
    
    <h1>Archive for {{ year }}</h1>
    
    {% for date in days %}
        {% ifchanged %}<h3>{{ date|date:"F" }}</h3>{% endifchanged %}
        <a href="{{ date|date:"M/d"|lower }}/"\>{{ date|date:"j" }}</a>
    {% endfor %}
    
2.  If given one or more variables, check whether any variable has changed. For example, the following shows the date every time it changes, while showing the hour if either the hour or the date has changed:
    
    {% for date in days %}
        {% ifchanged date.date %} {{ date.date }} {% endifchanged %}
        {% ifchanged date.hour date.date %}
            {{ date.hour }}
        {% endifchanged %}
    {% endfor %}
    

The ifchanged tag can also take an optional {% else %} clause that will be displayed if the value has not changed:

{% for match in matches %}
    <div style="background-color:
        {% ifchanged match.ballot\_id %}
            {% cycle "red" "blue" %}
        {% else %}
            grey
        {% endifchanged %}
    "\>{{ match }}</div>
{% endfor %}

### ifequal[¶](#ifequal "Permalink to this headline")

Output the contents of the block if the two arguments equal each other.

Example:

{% ifequal user.pk comment.user\_id %}
    ...
{% endifequal %}

As in the [if](#std:templatetag-if) tag, an {% else %} clause is optional.

The arguments can be hard-coded strings, so the following is valid:

{% ifequal user.username "adrian" %}
    ...
{% endifequal %}

It is only possible to compare an argument to template variables or strings. You cannot check for equality with Python objects such as True or False. If you need to test if something is true or false, use the [if](#std:templatetag-if) tag instead.

An alternative to the ifequal tag is to use the [if](#std:templatetag-if) tag and the \== operator.

### ifnotequal[¶](#ifnotequal "Permalink to this headline")

Just like [ifequal](#std:templatetag-ifequal), except it tests that the two arguments are not equal.

An alternative to the ifnotequal tag is to use the [if](#std:templatetag-if) tag and the != operator.

### include[¶](#include "Permalink to this headline")

Loads a template and renders it with the current context. This is a way of “including” other templates within a template.

The template name can either be a variable or a hard-coded (quoted) string, in either single or double quotes.

This example includes the contents of the template "foo/bar.html":

{% include "foo/bar.html" %}

This example includes the contents of the template whose name is contained in the variable template\_name:

{% include template\_name %}

An included template is rendered with the context of the template that’s including it. This example produces the output "Hello, John":

-   Context: variable person is set to "john".
    
-   Template:
    
    {% include "name\_snippet.html" %}
    
-   The name\_snippet.html template:
    
    {{ greeting }}, {{ person|default:"friend" }}!
    

You can pass additional context to the template using keyword arguments:

{% include "name\_snippet.html" with person\="Jane" greeting\="Hello" %}

If you want to only render the context with the variables provided (or even no variables at all), use the only option:

{% include "name\_snippet.html" with greeting\="Hi" only %}

Note

The [include](#std:templatetag-include) tag should be considered as an implementation of “render this subtemplate and include the HTML”, not as “parse this subtemplate and include its contents as if it were part of the parent”. This means that there is no shared state between included templates – each include is a completely independent rendering process.

See also: [{% ssi %}](#std:templatetag-ssi).

### load[¶](#load "Permalink to this headline")

Loads a custom template tag set.

For example, the following template would load all the tags and filters registered in somelibrary and otherlibrary located in package package:

{% load somelibrary package.otherlibrary %}

You can also selectively load individual filters or tags from a library, using the from argument. In this example, the template tags/filters named foo and bar will be loaded from somelibrary:

{% load foo bar from somelibrary %}

See [_Custom tag and filter libraries_](https://django-chinese-docs.readthedocs.io/en/latest/howto/custom-template-tags.html) for more information.

### now[¶](#now "Permalink to this headline")

Displays the current date and/or time, using a format according to the given string. Such string can contain format specifiers characters as described in the [date](#std:templatefilter-date) filter section.

Example:

It is {% now "jS F Y H:i" %}

Note that you can backslash-escape a format string if you want to use the “raw” value. In this example, “f” is backslash-escaped, because otherwise “f” is a format string that displays the time. The “o” doesn’t need to be escaped, because it’s not a format character:

It is the {% now "jS o\\f F" %}

This would display as “It is the 4th of September”.

Changed in Django 1.4.

### regroup[¶](#regroup "Permalink to this headline")

Regroups a list of alike objects by a common attribute.

This complex tag is best illustrated by way of an example: say that “places” is a list of cities represented by dictionaries containing "name", "population", and "country" keys:

cities \= \[
    {'name': 'Mumbai', 'population': '19,000,000', 'country': 'India'},
    {'name': 'Calcutta', 'population': '15,000,000', 'country': 'India'},
    {'name': 'New York', 'population': '20,000,000', 'country': 'USA'},
    {'name': 'Chicago', 'population': '7,000,000', 'country': 'USA'},
    {'name': 'Tokyo', 'population': '33,000,000', 'country': 'Japan'},
\]

...and you’d like to display a hierarchical list that is ordered by country, like this:

-   India
    
    -   Mumbai: 19,000,000
    -   Calcutta: 15,000,000
    
-   USA
    
    -   New York: 20,000,000
    -   Chicago: 7,000,000
    
-   Japan
    
    -   Tokyo: 33,000,000
    

You can use the {% regroup %} tag to group the list of cities by country. The following snippet of template code would accomplish this:

{% regroup cities by country as country\_list %}

<ul>
{% for country in country\_list %}
    <li>{{ country.grouper }}
    <ul>
        {% for item in country.list %}
          <li>{{ item.name }}: {{ item.population }}</li>
        {% endfor %}
    </ul>
    </li>
{% endfor %}
</ul>

Let’s walk through this example. {% regroup %} takes three arguments: the list you want to regroup, the attribute to group by, and the name of the resulting list. Here, we’re regrouping the cities list by the country attribute and calling the result country\_list.

{% regroup %} produces a list (in this case, country\_list) of **group objects**. Each group object has two attributes:

-   grouper – the item that was grouped by (e.g., the string “India” or “Japan”).
-   list – a list of all items in this group (e.g., a list of all cities with country=’India’).

Note that {% regroup %} does not order its input! Our example relies on the fact that the cities list was ordered by country in the first place. If the cities list did _not_ order its members by country, the regrouping would naively display more than one group for a single country. For example, say the cities list was set to this (note that the countries are not grouped together):

cities \= \[
    {'name': 'Mumbai', 'population': '19,000,000', 'country': 'India'},
    {'name': 'New York', 'population': '20,000,000', 'country': 'USA'},
    {'name': 'Calcutta', 'population': '15,000,000', 'country': 'India'},
    {'name': 'Chicago', 'population': '7,000,000', 'country': 'USA'},
    {'name': 'Tokyo', 'population': '33,000,000', 'country': 'Japan'},
\]

With this input for cities, the example {% regroup %} template code above would result in the following output:

-   India
    
    -   Mumbai: 19,000,000
    
-   USA
    
    -   New York: 20,000,000
    
-   India
    
    -   Calcutta: 15,000,000
    
-   Japan
    
    -   Tokyo: 33,000,000
    

The easiest solution to this gotcha is to make sure in your view code that the data is ordered according to how you want to display it.

Another solution is to sort the data in the template using the [dictsort](#std:templatefilter-dictsort) filter, if your data is in a list of dictionaries:

{% regroup cities|dictsort:"country" by country as country\_list %}

### Grouping on other properties[¶](#grouping-on-other-properties "Permalink to this headline")

Any valid template lookup is a legal grouping attribute for the regroup tag, including methods, attributes, dictionary keys and list items. For example, if the “country” field is a foreign key to a class with an attribute “description,” you could use:

{% regroup cities by country.description as country\_list %}

Or, if country is a field with choices, it will have a [get\_FOO\_display()](https://django-chinese-docs.readthedocs.io/en/latest/ref/models/instances.html#django.db.models.Model.get_FOO_display "django.db.models.Model.get_FOO_display") method available as an attribute, allowing you to group on the display string rather than the choices key:

{% regroup cities by get\_country\_display as country\_list %}

{{ country.grouper }} will now display the value fields from the choices set rather than the keys.

### spaceless[¶](#spaceless "Permalink to this headline")

Removes whitespace between HTML tags. This includes tab characters and newlines.

Example usage:

{% spaceless %}
    <p>
        <a href="foo/"\>Foo</a>
    </p>
{% endspaceless %}

This example would return this HTML:

<p><a href="foo/"\>Foo</a></p>

Only space between _tags_ is removed – not space between tags and text. In this example, the space around Hello won’t be stripped:

{% spaceless %}
    <strong>
        Hello
    </strong>
{% endspaceless %}

### ssi[¶](#ssi "Permalink to this headline")

Outputs the contents of a given file into the page.

Like a simple [include](#std:templatetag-include) tag, {% ssi %} includes the contents of another file – which must be specified using an absolute path – in the current page:

{% ssi '/home/html/ljworld.com/includes/right\_generic.html' %}

The first parameter of ssi can be a quoted literal or any other context variable.

If the optional “parsed” parameter is given, the contents of the included file are evaluated as template code, within the current context:

{% ssi '/home/html/ljworld.com/includes/right\_generic.html' parsed %}

Note that if you use {% ssi %}, you’ll need to define [ALLOWED\_INCLUDE\_ROOTS](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-ALLOWED_INCLUDE_ROOTS) in your Django settings, as a security measure.

See also: [{% include %}](#std:templatetag-include).

### templatetag[¶](#templatetag "Permalink to this headline")

Outputs one of the syntax characters used to compose template tags.

Since the template system has no concept of “escaping”, to display one of the bits used in template tags, you must use the {% templatetag %} tag.

The argument tells which template bit to output:

 
| Argument | Outputs |
| --- | --- |
| openblock | {% |
| closeblock | %} |
| openvariable | {{ |
| closevariable | }} |
| openbrace | { |
| closebrace | } |
| opencomment | {# |
| closecomment | #} |

### url[¶](#url "Permalink to this headline")

Returns an absolute path reference (a URL without the domain name) matching a given view function and optional parameters. This is a way to output links without violating the DRY principle by having to hard-code URLs in your templates:

{% url 'path.to.some\_view' v1 v2 %}

The first argument is a path to a view function in the format package.package.module.function. It can be a quoted literal or any other context variable. Additional arguments are optional and should be space-separated values that will be used as arguments in the URL. The example above shows passing positional arguments. Alternatively you may use keyword syntax:

{% url 'path.to.some\_view' arg1\=v1 arg2\=v2 %}

Do not mix both positional and keyword syntax in a single call. All arguments required by the URLconf should be present.

For example, suppose you have a view, app\_views.client, whose URLconf takes a client ID (here, client() is a method inside the views file app\_views.py). The URLconf line might look like this:

('^client/(\\d+)/$', 'app\_views.client')

If this app’s URLconf is included into the project’s URLconf under a path such as this:

('^clients/', include('project\_name.app\_name.urls'))

...then, in a template, you can create a link to this view like this:

{% url 'app\_views.client' client.id %}

The template tag will output the string /clients/client/123/.

If you’re using [_named URL patterns_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/urls.html#naming-url-patterns), you can refer to the name of the pattern in the url tag instead of using the path to the view.

Note that if the URL you’re reversing doesn’t exist, you’ll get an [NoReverseMatch](https://django-chinese-docs.readthedocs.io/en/latest/ref/exceptions.html#django.core.urlresolvers.NoReverseMatch "django.core.urlresolvers.NoReverseMatch") exception raised, which will cause your site to display an error page.

If you’d like to retrieve a URL without displaying it, you can use a slightly different call:

{% url 'path.to.view' arg arg2 as the\_url %}

<a href="{{ the\_url }}"\>I'm linking to {{ the\_url }}</a>

This {% url ... as var %} syntax will _not_ cause an error if the view is missing. In practice you’ll use this to link to views that are optional:

{% url 'path.to.view' as the\_url %}
{% if the\_url %}
  <a href="{{ the\_url }}"\>Link to optional stuff</a>
{% endif %}

If you’d like to retrieve a namespaced URL, specify the fully qualified name:

{% url 'myapp:view-name' %}

This will follow the normal [_namespaced URL resolution strategy_](https://django-chinese-docs.readthedocs.io/en/latest/topics/http/urls.html#topics-http-reversing-url-namespaces), including using any hints provided by the context as to the current application.

Warning

Don’t forget to put quotes around the function path or pattern name!

Changed in Django 1.5: The first parameter used not to be quoted, which was inconsistent with other template tags. Since Django 1.5, it is evaluated according to the usual rules: it can be a quoted string or a variable that will be looked up in the context.

### verbatim[¶](#verbatim "Permalink to this headline")

New in Django 1.5.

Stops the template engine from rendering the contents of this block tag.

A common use is to allow a Javascript template layer that collides with Django’s syntax. For example:

{% verbatim %}
    {{if dying}}Still alive.{{/if}}
{% endverbatim %}

You can also designate a specific closing tag, allowing the use of {% endverbatim %} as part of the unrendered contents:

{% verbatim myblock %}
    Avoid template rendering via the {% verbatim %}{% endverbatim %} block.
{% endverbatim myblock %}

### widthratio[¶](#widthratio "Permalink to this headline")

For creating bar charts and such, this tag calculates the ratio of a given value to a maximum value, and then applies that ratio to a constant.

For example:

<img src="https://django-chinese-docs.readthedocs.io/en/latest/bar.png" alt="Bar"
     height="10" width="{% widthratio this\_value max\_value max\_width %}" />

If this\_value is 175, max\_value is 200, and max\_width is 100, the image in the above example will be 88 pixels wide (because 175/200 = .875; .875 \* 100 = 87.5 which is rounded up to 88).

### with[¶](#with "Permalink to this headline")

Caches a complex variable under a simpler name. This is useful when accessing an “expensive” method (e.g., one that hits the database) multiple times.

For example:

{% with total\=business.employees.count %}
    {{ total }} employee{{ total|pluralize }}
{% endwith %}

The populated variable (in the example above, total) is only available between the {% with %} and {% endwith %} tags.

You can assign more than one context variable:

{% with alpha\=1 beta\=2 %}
    ...
{% endwith %}

Note

The previous more verbose format is still supported: {% with business.employees.count as total %}

## Built-in filter reference[¶](#built-in-filter-reference "Permalink to this headline")

### add[¶](#add "Permalink to this headline")

Adds the argument to the value.

For example:

{{ value|add:"2" }}

If value is 4, then the output will be 6.

This filter will first try to coerce both values to integers. If this fails, it’ll attempt to add the values together anyway. This will work on some data types (strings, list, etc.) and fail on others. If it fails, the result will be an empty string.

For example, if we have:

{{ first|add:second }}

and first is \[1, 2, 3\] and second is \[4, 5, 6\], then the output will be \[1, 2, 3, 4, 5, 6\].

Warning

Strings that can be coerced to integers will be **summed**, not concatenated, as in the first example above.

### addslashes[¶](#addslashes "Permalink to this headline")

Adds slashes before quotes. Useful for escaping strings in CSV, for example.

For example:

{{ value|addslashes }}

If value is "I'm using Django", the output will be "I\\'m using Django".

### capfirst[¶](#capfirst "Permalink to this headline")

Capitalizes the first character of the value.

For example:

{{ value|capfirst }}

If value is "django", the output will be "Django".

### center[¶](#center "Permalink to this headline")

Centers the value in a field of a given width.

For example:

"{{ value|center:"15" }}"

If value is "Django", the output will be "     Django    ".

### cut[¶](#cut "Permalink to this headline")

Removes all values of arg from the given string.

For example:

{{ value|cut:" " }}

If value is "String with spaces", the output will be "Stringwithspaces".

### date[¶](#date "Permalink to this headline")

Formats a date according to the given format.

Uses a similar format as PHP’s date() function ([http://php.net/date](http://php.net/date)) with some differences.

Available format strings:

  
| Format character | Description | Example output |
| --- | --- | --- |
| a | 'a.m.' or 'p.m.' (Note that this is slightly different than PHP’s output, because this includes periods to match Associated Press style.) | 'a.m.' |
| A | 'AM' or 'PM'. | 'AM' |
| b | Month, textual, 3 letters, lowercase. | 'jan' |
| B | Not implemented. |   |
| c | ISO 8601 format. (Note: unlike others formatters, such as “Z”, “O” or “r”, the “c” formatter will not add timezone offset if value is a naive datetime (see [datetime.tzinfo](http://docs.python.org/2.7/library/datetime.html#datetime.tzinfo "(in Python v2.7)")). | 2008-01-02T10:30:00.000123+02:00, or 2008-01-02T10:30:00.000123 if the datetime is naive |
| d | Day of the month, 2 digits with leading zeros. | '01' to '31' |
| D | Day of the week, textual, 3 letters. | 'Fri' |
| e | Timezone name. Could be in any format, or might return an empty string, depending on the datetime. | '', 'GMT', '-500', 'US/Eastern', etc. |
| E | Month, locale specific alternative representation usually used for long date representation. | 'listopada' (for Polish locale, as opposed to 'Listopad') |
| f | Time, in 12-hour hours and minutes, with minutes left off if they’re zero. Proprietary extension. | '1', '1:30' |
| F | Month, textual, long. | 'January' |
| g | Hour, 12-hour format without leading zeros. | '1' to '12' |
| G | Hour, 24-hour format without leading zeros. | '0' to '23' |
| h | Hour, 12-hour format. | '01' to '12' |
| H | Hour, 24-hour format. | '00' to '23' |
| i | Minutes. | '00' to '59' |
| I | Daylight Savings Time, whether it’s in effect or not. | '1' or '0' |
| j | Day of the month without leading zeros. | '1' to '31' |
| l | Day of the week, textual, long. | 'Friday' |
| L | Boolean for whether it’s a leap year. | True or False |
| m | Month, 2 digits with leading zeros. | '01' to '12' |
| M | Month, textual, 3 letters. | 'Jan' |
| n | Month without leading zeros. | '1' to '12' |
| N | Month abbreviation in Associated Press style. Proprietary extension. | 'Jan.', 'Feb.', 'March', 'May' |
| o | ISO-8601 week-numbering year, corresponding to the ISO-8601 week number (W) | '1999' |
| O | Difference to Greenwich time in hours. | '+0200' |
| P | Time, in 12-hour hours, minutes and ‘a.m.’/’p.m.’, with minutes left off if they’re zero and the special-case strings ‘midnight’ and ‘noon’ if appropriate. Proprietary extension. | '1 a.m.', '1:30 p.m.', 'midnight', 'noon', '12:30 p.m.' |
| r | [**RFC 2822**](http://tools.ietf.org/html/rfc2822.html) formatted date. | 'Thu, 21 Dec 2000 16:01:07 +0200' |
| s | Seconds, 2 digits with leading zeros. | '00' to '59' |
| S | English ordinal suffix for day of the month, 2 characters. | 'st', 'nd', 'rd' or 'th' |
| t | Number of days in the given month. | 28 to 31 |
| T | Time zone of this machine. | 'EST', 'MDT' |
| u | Microseconds. | 000000 to 999999 |
| U | Seconds since the Unix Epoch (January 1 1970 00:00:00 UTC). |   |
| w | Day of the week, digits without leading zeros. | '0' (Sunday) to '6' (Saturday) |
| W | ISO-8601 week number of year, with weeks starting on Monday. | 1, 53 |
| y | Year, 2 digits. | '99' |
| Y | Year, 4 digits. | '1999' |
| z | Day of the year. | 0 to 365 |
| Z | Time zone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. | \-43200 to 43200 |

New in Django 1.4.

The e and o format specification characters were added in Django 1.4.

For example:

{{ value|date:"D d M Y" }}

If value is a datetime object (e.g., the result of datetime.datetime.now()), the output will be the string 'Wed 09 Jan 2008'.

The format passed can be one of the predefined ones [DATE\_FORMAT](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DATE_FORMAT), [DATETIME\_FORMAT](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DATETIME_FORMAT), [SHORT\_DATE\_FORMAT](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-SHORT_DATE_FORMAT) or [SHORT\_DATETIME\_FORMAT](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-SHORT_DATETIME_FORMAT), or a custom format that uses the format specifiers shown in the table above. Note that predefined formats may vary depending on the current locale.

Assuming that [USE\_L10N](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-USE_L10N) is True and [LANGUAGE\_CODE](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-LANGUAGE_CODE) is, for example, "es", then for:

{{ value|date:"SHORT\_DATE\_FORMAT" }}

the output would be the string "09/01/2008" (the "SHORT\_DATE\_FORMAT" format specifier for the es locale as shipped with Django is "d/m/Y").

When used without a format string:

{{ value|date }}

...the formatting string defined in the [DATE\_FORMAT](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-DATE_FORMAT) setting will be used, without applying any localization.

### default[¶](#default "Permalink to this headline")

If value evaluates to False, uses the given default. Otherwise, uses the value.

For example:

{{ value|default:"nothing" }}

If value is "" (the empty string), the output will be nothing.

### default\_if\_none[¶](#default-if-none "Permalink to this headline")

If (and only if) value is None, uses the given default. Otherwise, uses the value.

Note that if an empty string is given, the default value will _not_ be used. Use the [default](#std:templatefilter-default) filter if you want to fallback for empty strings.

For example:

{{ value|default\_if\_none:"nothing" }}

If value is None, the output will be the string "nothing".

### dictsort[¶](#dictsort "Permalink to this headline")

Takes a list of dictionaries and returns that list sorted by the key given in the argument.

For example:

{{ value|dictsort:"name" }}

If value is:

\[
    {'name': 'zed', 'age': 19},
    {'name': 'amy', 'age': 22},
    {'name': 'joe', 'age': 31},
\]

then the output would be:

\[
    {'name': 'amy', 'age': 22},
    {'name': 'joe', 'age': 31},
    {'name': 'zed', 'age': 19},
\]

### dictsortreversed[¶](#dictsortreversed "Permalink to this headline")

Takes a list of dictionaries and returns that list sorted in reverse order by the key given in the argument. This works exactly the same as the above filter, but the returned value will be in reverse order.

### divisibleby[¶](#divisibleby "Permalink to this headline")

Returns True if the value is divisible by the argument.

For example:

{{ value|divisibleby:"3" }}

If value is 21, the output would be True.

### escape[¶](#escape "Permalink to this headline")

Escapes a string’s HTML. Specifically, it makes these replacements:

-   < is converted to &lt;
-   \> is converted to &gt;
-   ' (single quote) is converted to &#39;
-   " (double quote) is converted to &quot;
-   & is converted to &amp;

The escaping is only applied when the string is output, so it does not matter where in a chained sequence of filters you put escape: it will always be applied as though it were the last filter. If you want escaping to be applied immediately, use the [force\_escape](#std:templatefilter-force_escape) filter.

Applying escape to a variable that would normally have auto-escaping applied to the result will only result in one round of escaping being done. So it is safe to use this function even in auto-escaping environments. If you want multiple escaping passes to be applied, use the [force\_escape](#std:templatefilter-force_escape) filter.

### escapejs[¶](#escapejs "Permalink to this headline")

Escapes characters for use in JavaScript strings. This does _not_ make the string safe for use in HTML, but does protect you from syntax errors when using templates to generate JavaScript/JSON.

For example:

{{ value|escapejs }}

If value is "testing\\r\\njavascript \\'string" <b>escaping</b>", the output will be "testing\\\\u000D\\\\u000Ajavascript \\\\u0027string\\\\u0022 \\\\u003Cb\\\\u003Eescaping\\\\u003C/b\\\\u003E".

### filesizeformat[¶](#filesizeformat "Permalink to this headline")

Formats the value like a ‘human-readable’ file size (i.e. '13 KB', '4.1 MB', '102 bytes', etc).

For example:

{{ value|filesizeformat }}

If value is 123456789, the output would be 117.7 MB.

File sizes and SI units

Strictly speaking, filesizeformat does not conform to the International System of Units which recommends using KiB, MiB, GiB, etc. when byte sizes are calculated in powers of 1024 (which is the case here). Instead, Django uses traditional unit names (KB, MB, GB, etc.) corresponding to names that are more commonly used.

### first[¶](#first "Permalink to this headline")

Returns the first item in a list.

For example:

{{ value|first }}

If value is the list \['a', 'b', 'c'\], the output will be 'a'.

### fix\_ampersands[¶](#fix-ampersands "Permalink to this headline")

Note

This is rarely useful as ampersands are automatically escaped. See [escape](#std:templatefilter-escape) for more information.

Replaces ampersands with &amp; entities.

For example:

{{ value|fix\_ampersands }}

If value is Tom & Jerry, the output will be Tom &amp; Jerry.

However, ampersands used in named entities and numeric character references will not be replaced. For example, if value is Caf&eacute;, the output will _not_ be Caf&amp;eacute; but remain Caf&eacute;. This means that in some edge cases, such as acronyms followed by semicolons, this filter will not replace ampersands that need replacing. For example, if value is Contact the R&D;, the output will remain unchanged because &D; resembles a named entity.

### floatformat[¶](#floatformat "Permalink to this headline")

When used without an argument, rounds a floating-point number to one decimal place – but only if there’s a decimal part to be displayed. For example:

  
| value | Template | Output |
| --- | --- | --- |
| 34.23234 | {{ value|floatformat }} | 34.2 |
| 34.00000 | {{ value|floatformat }} | 34 |
| 34.26000 | {{ value|floatformat }} | 34.3 |

If used with a numeric integer argument, floatformat rounds a number to that many decimal places. For example:

  
| value | Template | Output |
| --- | --- | --- |
| 34.23234 | {{ value|floatformat:3 }} | 34.232 |
| 34.00000 | {{ value|floatformat:3 }} | 34.000 |
| 34.26000 | {{ value|floatformat:3 }} | 34.260 |

Particularly useful is passing 0 (zero) as the argument which will round the float to the nearest integer.

  
| value | Template | Output |
| --- | --- | --- |
| 34.23234 | {{ value|floatformat:"0" }} | 34 |
| 34.00000 | {{ value|floatformat:"0" }} | 34 |
| 39.56000 | {{ value|floatformat:"0" }} | 40 |

If the argument passed to floatformat is negative, it will round a number to that many decimal places – but only if there’s a decimal part to be displayed. For example:

  
| value | Template | Output |
| --- | --- | --- |
| 34.23234 | {{ value|floatformat:"-3" }} | 34.232 |
| 34.00000 | {{ value|floatformat:"-3" }} | 34 |
| 34.26000 | {{ value|floatformat:"-3" }} | 34.260 |

Using floatformat with no argument is equivalent to using floatformat with an argument of \-1.

### force\_escape[¶](#force-escape "Permalink to this headline")

Applies HTML escaping to a string (see the [escape](#std:templatefilter-escape) filter for details). This filter is applied _immediately_ and returns a new, escaped string. This is useful in the rare cases where you need multiple escaping or want to apply other filters to the escaped results. Normally, you want to use the [escape](#std:templatefilter-escape) filter.

### get\_digit[¶](#get-digit "Permalink to this headline")

Given a whole number, returns the requested digit, where 1 is the right-most digit, 2 is the second-right-most digit, etc. Returns the original value for invalid input (if input or argument is not an integer, or if argument is less than 1). Otherwise, output is always an integer.

For example:

{{ value|get\_digit:"2" }}

If value is 123456789, the output will be 8.

### iriencode[¶](#iriencode "Permalink to this headline")

Converts an IRI (Internationalized Resource Identifier) to a string that is suitable for including in a URL. This is necessary if you’re trying to use strings containing non-ASCII characters in a URL.

It’s safe to use this filter on a string that has already gone through the [urlencode](#std:templatefilter-urlencode) filter.

For example:

{{ value|iriencode }}

If value is "?test=1&me=2", the output will be "?test=1&amp;me=2".

### join[¶](#join "Permalink to this headline")

Joins a list with a string, like Python’s str.join(list)

For example:

{{ value|join:" // " }}

If value is the list \['a', 'b', 'c'\], the output will be the string "a // b // c".

### last[¶](#last "Permalink to this headline")

Returns the last item in a list.

For example:

{{ value|last }}

If value is the list \['a', 'b', 'c', 'd'\], the output will be the string "d".

### length[¶](#length "Permalink to this headline")

Returns the length of the value. This works for both strings and lists.

For example:

{{ value|length }}

If value is \['a', 'b', 'c', 'd'\], the output will be 4.

### length\_is[¶](#length-is "Permalink to this headline")

Returns True if the value’s length is the argument, or False otherwise.

For example:

{{ value|length\_is:"4" }}

If value is \['a', 'b', 'c', 'd'\], the output will be True.

### linebreaks[¶](#linebreaks "Permalink to this headline")

Replaces line breaks in plain text with appropriate HTML; a single newline becomes an HTML line break (<br />) and a new line followed by a blank line becomes a paragraph break (</p>).

For example:

{{ value|linebreaks }}

If value is Joel\\nis a slug, the output will be <p>Joel<br />is a slug</p>.

### linebreaksbr[¶](#linebreaksbr "Permalink to this headline")

Converts all newlines in a piece of plain text to HTML line breaks (<br />).

For example:

{{ value|linebreaksbr }}

If value is Joel\\nis a slug, the output will be Joel<br />is a slug.

### linenumbers[¶](#linenumbers "Permalink to this headline")

Displays text with line numbers.

For example:

{{ value|linenumbers }}

If value is:

one
two
three

the output will be:

1\. one
2. two
3. three

### ljust[¶](#ljust "Permalink to this headline")

Left-aligns the value in a field of a given width.

**Argument:** field size

For example:

"{{ value|ljust:"10" }}"

If value is Django, the output will be "Django    ".

### lower[¶](#lower "Permalink to this headline")

Converts a string into all lowercase.

For example:

{{ value|lower }}

If value is Still MAD At Yoko, the output will be still mad at yoko.

### make\_list[¶](#make-list "Permalink to this headline")

Returns the value turned into a list. For a string, it’s a list of characters. For an integer, the argument is cast into an unicode string before creating a list.

For example:

{{ value|make\_list }}

If value is the string "Joel", the output would be the list \[u'J', u'o', u'e', u'l'\]. If value is 123, the output will be the list \[u'1', u'2', u'3'\].

### phone2numeric[¶](#phone2numeric "Permalink to this headline")

Converts a phone number (possibly containing letters) to its numerical equivalent.

The input doesn’t have to be a valid phone number. This will happily convert any string.

For example:

{{ value|phone2numeric }}

If value is 800-COLLECT, the output will be 800-2655328.

### pluralize[¶](#pluralize "Permalink to this headline")

Returns a plural suffix if the value is not 1. By default, this suffix is 's'.

Example:

You have {{ num\_messages }} message{{ num\_messages|pluralize }}.

If num\_messages is 1, the output will be You have 1 message. If num\_messages is 2 the output will be You have 2 messages.

For words that require a suffix other than 's', you can provide an alternate suffix as a parameter to the filter.

Example:

You have {{ num\_walruses }} walrus{{ num\_walruses|pluralize:"es" }}.

For words that don’t pluralize by simple suffix, you can specify both a singular and plural suffix, separated by a comma.

Example:

You have {{ num\_cherries }} cherr{{ num\_cherries|pluralize:"y,ies" }}.

Note

Use [blocktrans](https://django-chinese-docs.readthedocs.io/en/latest/topics/i18n/translation.html#std:templatetag-blocktrans) to pluralize translated strings.

### random[¶](#random "Permalink to this headline")

Returns a random item from the given list.

For example:

{{ value|random }}

If value is the list \['a', 'b', 'c', 'd'\], the output could be "b".

### rjust[¶](#rjust "Permalink to this headline")

Right-aligns the value in a field of a given width.

**Argument:** field size

For example:

"{{ value|rjust:"10" }}"

If value is Django, the output will be "    Django".

### safe[¶](#safe "Permalink to this headline")

Marks a string as not requiring further HTML escaping prior to output. When autoescaping is off, this filter has no effect.

Note

If you are chaining filters, a filter applied after safe can make the contents unsafe again. For example, the following code prints the variable as is, unescaped:

{{ var|safe|escape }}

### safeseq[¶](#safeseq "Permalink to this headline")

Applies the [safe](#std:templatefilter-safe) filter to each element of a sequence. Useful in conjunction with other filters that operate on sequences, such as [join](#std:templatefilter-join). For example:

{{ some\_list|safeseq|join:", " }}

You couldn’t use the [safe](#std:templatefilter-safe) filter directly in this case, as it would first convert the variable into a string, rather than working with the individual elements of the sequence.

### slugify[¶](#slugify "Permalink to this headline")

Converts to lowercase, removes non-word characters (alphanumerics and underscores) and converts spaces to hyphens. Also strips leading and trailing whitespace.

For example:

{{ value|slugify }}

If value is "Joel is a slug", the output will be "joel-is-a-slug".

### stringformat[¶](#stringformat "Permalink to this headline")

Formats the variable according to the argument, a string formatting specifier. This specifier uses Python string formatting syntax, with the exception that the leading “%” is dropped.

See [http://docs.python.org/library/stdtypes.html#string-formatting-operations](http://docs.python.org/library/stdtypes.html#string-formatting-operations) for documentation of Python string formatting

For example:

{{ value|stringformat:"E" }}

If value is 10, the output will be 1.000000E+01.

### time[¶](#time "Permalink to this headline")

Formats a time according to the given format.

Given format can be the predefined one [TIME\_FORMAT](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-TIME_FORMAT), or a custom format, same as the [date](#std:templatefilter-date) filter. Note that the predefined format is locale-dependant.

The time filter will only accept parameters in the format string that relate to the time of day, not the date (for obvious reasons). If you need to format a date, use the [date](#std:templatefilter-date) filter.

For example:

{{ value|time:"H:i" }}

If value is equivalent to datetime.datetime.now(), the output will be the string "01:23".

Another example:

Assuming that [USE\_L10N](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-USE_L10N) is True and [LANGUAGE\_CODE](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-LANGUAGE_CODE) is, for example, "de", then for:

{{ value|time:"TIME\_FORMAT" }}

the output will be the string "01:23:00" (The "TIME\_FORMAT" format specifier for the de locale as shipped with Django is "H:i:s").

When used without a format string:

{{ value|time }}

...the formatting string defined in the [TIME\_FORMAT](https://django-chinese-docs.readthedocs.io/en/latest/ref/settings.html#std:setting-TIME_FORMAT) setting will be used, without applying any localization.

### timesince[¶](#timesince "Permalink to this headline")

Formats a date as the time since that date (e.g., “4 days, 6 hours”).

Takes an optional argument that is a variable containing the date to use as the comparison point (without the argument, the comparison point is _now_). For example, if blog\_date is a date instance representing midnight on 1 June 2006, and comment\_date is a date instance for 08:00 on 1 June 2006, then {{ blog\_date|timesince:comment\_date }} would return “8 hours”.

Comparing offset-naive and offset-aware datetimes will return an empty string.

Minutes is the smallest unit used, and “0 minutes” will be returned for any date that is in the future relative to the comparison point.

### timeuntil[¶](#timeuntil "Permalink to this headline")

Similar to timesince, except that it measures the time from now until the given date or datetime. For example, if today is 1 June 2006 and conference\_date is a date instance holding 29 June 2006, then {{ conference\_date|timeuntil }} will return “4 weeks”.

Takes an optional argument that is a variable containing the date to use as the comparison point (instead of _now_). If from\_date contains 22 June 2006, then {{ conference\_date|timeuntil:from\_date }} will return “1 week”.

Comparing offset-naive and offset-aware datetimes will return an empty string.

Minutes is the smallest unit used, and “0 minutes” will be returned for any date that is in the past relative to the comparison point.

### title[¶](#title "Permalink to this headline")

Converts a string into titlecase.

For example:

{{ value|title }}

If value is "my first post", the output will be "My First Post".

### truncatechars[¶](#truncatechars "Permalink to this headline")

New in Django 1.4.

Truncates a string if it is longer than the specified number of characters. Truncated strings will end with a translatable ellipsis sequence (”...”).

**Argument:** Number of characters to truncate to

For example:

{{ value|truncatechars:9 }}

If value is "Joel is a slug", the output will be "Joel i...".

### truncatewords[¶](#truncatewords "Permalink to this headline")

Truncates a string after a certain number of words.

**Argument:** Number of words to truncate after

For example:

{{ value|truncatewords:2 }}

If value is "Joel is a slug", the output will be "Joel is ...".

Newlines within the string will be removed.

### truncatewords\_html[¶](#truncatewords-html "Permalink to this headline")

Similar to [truncatewords](#std:templatefilter-truncatewords), except that it is aware of HTML tags. Any tags that are opened in the string and not closed before the truncation point, are closed immediately after the truncation.

This is less efficient than [truncatewords](#std:templatefilter-truncatewords), so should only be used when it is being passed HTML text.

For example:

{{ value|truncatewords\_html:2 }}

If value is "<p>Joel is a slug</p>", the output will be "<p>Joel is ...</p>".

Newlines in the HTML content will be preserved.

### unordered\_list[¶](#unordered-list "Permalink to this headline")

Recursively takes a self-nested list and returns an HTML unordered list – WITHOUT opening and closing <ul> tags.

The list is assumed to be in the proper format. For example, if var contains \['States', \['Kansas', \['Lawrence', 'Topeka'\], 'Illinois'\]\], then {{ var|unordered\_list }} would return:

<li>States
<ul>
        <li>Kansas
        <ul>
                <li>Lawrence</li>
                <li>Topeka</li>
        </ul>
        </li>
        <li>Illinois</li>
</ul>
</li>

Note: An older, more restrictive and verbose input format is also supported: \['States', \[\['Kansas', \[\['Lawrence', \[\]\], \['Topeka', \[\]\]\]\], \['Illinois', \[\]\]\]\],

### upper[¶](#upper "Permalink to this headline")

Converts a string into all uppercase.

For example:

{{ value|upper }}

If value is "Joel is a slug", the output will be "JOEL IS A SLUG".

### urlencode[¶](#urlencode "Permalink to this headline")

Escapes a value for use in a URL.

For example:

{{ value|urlencode }}

If value is "http://www.example.org/foo?a=b&c=d", the output will be "http%3A//www.example.org/foo%3Fa%3Db%26c%3Dd".

An optional argument containing the characters which should not be escaped can be provided.

If not provided, the ‘/’ character is assumed safe. An empty string can be provided when _all_ characters should be escaped. For example:

{{ value|urlencode:"" }}

If value is "http://www.example.org/", the output will be "http%3A%2F%2Fwww.example.org%2F".

### urlize[¶](#urlize "Permalink to this headline")

Converts URLs in text into clickable links.

This template tag works on links prefixed with http://, https://, or www.. For example, http://goo.gl/aia1t will get converted but goo.gl/aia1t won’t.

It also supports domain-only links ending in one of the original top level domains (.com, .edu, .gov, .int, .mil, .net, and .org). For example, djangoproject.com gets converted.

Changed in Django 1.4.

Until Django 1.4, only the .com, .net and .org suffixes were supported for domain-only links.

Links can have trailing punctuation (periods, commas, close-parens) and leading punctuation (opening parens), and urlize will still do the right thing.

Links generated by urlize have a rel="nofollow" attribute added to them.

For example:

{{ value|urlize }}

If value is "Check out www.djangoproject.com", the output will be "Check out <a href="http://www.djangoproject.com" rel="nofollow">www.djangoproject.com</a>".

The urlize filter also takes an optional parameter autoescape. If autoescape is True, the link text and URLs will be escaped using Django’s built-in [escape](#std:templatefilter-escape) filter. The default value for autoescape is True.

Note

If urlize is applied to text that already contains HTML markup, things won’t work as expected. Apply this filter only to plain text.

### urlizetrunc[¶](#urlizetrunc "Permalink to this headline")

Converts URLs into clickable links just like [urlize](#urlize), but truncates URLs longer than the given character limit.

**Argument:** Number of characters that link text should be truncated to, including the ellipsis that’s added if truncation is necessary.

For example:

{{ value|urlizetrunc:15 }}

If value is "Check out www.djangoproject.com", the output would be 'Check out <a href="http://www.djangoproject.com" rel="nofollow">www.djangopr...</a>'.

As with [urlize](#urlize), this filter should only be applied to plain text.

### wordcount[¶](#wordcount "Permalink to this headline")

Returns the number of words.

For example:

{{ value|wordcount }}

If value is "Joel is a slug", the output will be 4.

### wordwrap[¶](#wordwrap "Permalink to this headline")

Wraps words at specified line length.

**Argument:** number of characters at which to wrap the text

For example:

{{ value|wordwrap:5 }}

If value is Joel is a slug, the output would be:

Joel
is a
slug

### yesno[¶](#yesno "Permalink to this headline")

Maps values for true, false and (optionally) None, to the strings “yes”, “no”, “maybe”, or a custom mapping passed as a comma-separated list, and returns one of those strings according to the value:

For example:

{{ value|yesno:"yeah,no,maybe" }}

  
| Value | Argument | Outputs |
| --- | --- | --- |
| True |   | yes |
| True | "yeah,no,maybe" | yeah |
| False | "yeah,no,maybe" | no |
| None | "yeah,no,maybe" | maybe |
| None | "yeah,no" | "no" (converts None to False if no mapping for None is given) |
