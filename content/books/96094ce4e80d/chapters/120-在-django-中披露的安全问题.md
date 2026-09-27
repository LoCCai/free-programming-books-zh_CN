Django's development team is strongly committed to responsible reporting and disclosure of security-related issues, as outlined in [Django's security policies](https://docs.djangoproject.com/zh-hans/2.0/internals/security/).

As part of that commitment, we maintain the following historical list of issues which have been fixed and disclosed. For each issue, the list below includes the date, a brief description, the [CVE identifier](https://en.wikipedia.org/wiki/Common_Vulnerabilities_and_Exposures) if applicable, a list of affected versions, a link to the full disclosure and links to the appropriate patch(es).

## Issues prior to Django's security process[¶](#issues-prior-to-django-s-security-process "Permalink to this headline")

Some security issues were handled before Django had a formalized security process in use. For these, new releases may not have been issued at the time and CVEs may not have been assigned.

## Issues under Django's security process[¶](#issues-under-django-s-security-process "Permalink to this headline")

All other security issues have been handled under versions of Django's security process. These are listed below.

### September 9, 2011 - [CVE-2011-4140](https://nvd.nist.gov/view/vuln/detail?vulnId=2011-4140)[¶](#september-9-2011-cve-2011-4140 "Permalink to this headline")

Potential CSRF via `Host` header. [Full description](https://www.djangoproject.com/weblog/2011/sep/09/security-releases-issued/)

#### Versions affected[¶](#id17 "Permalink to this headline")

This notification was an advisory only, so no patches were issued.

-   Django 1.2
-   Django 1.3

### December 10, 2012 - No CVE 1[¶](#december-10-2012-no-cve-1 "Permalink to this headline")

Additional hardening of `Host` header handling. [Full description](https://www.djangoproject.com/weblog/2012/dec/10/security/)

### December 10, 2012 - No CVE 2[¶](#december-10-2012-no-cve-2 "Permalink to this headline")

Additional hardening of redirect validation. [Full description](https://www.djangoproject.com/weblog/2012/dec/10/security/)

### February 19, 2013 - No CVE[¶](#february-19-2013-no-cve "Permalink to this headline")

Additional hardening of `Host` header handling. [Full description](https://www.djangoproject.com/weblog/2013/feb/19/security/)

### February 1, 2016 - [CVE-2016-2048](https://nvd.nist.gov/view/vuln/detail?vulnId=2016-2048)[¶](#february-1-2016-cve-2016-2048 "Permalink to this headline")

User with "change" but not "add" permission can create objects for `ModelAdmin`’s with `save_as=True`. [Full description](https://www.djangoproject.com/weblog/2016/feb/01/releases-192-and-189/)

#### Versions affected[¶](#id54 "Permalink to this headline")

-   Django 1.9 [(patch)](https://github.com/django/django/commit/adbca5e4db42542575734b8e5d26961c8ada7265)
