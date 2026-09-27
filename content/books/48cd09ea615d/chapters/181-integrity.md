## [Description](#description)

The attribute can be applied to [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script) or [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link) elements only.

The attribute consists of one or more components, each of which consists of:

-   An identifier for a [cryptographic hash function](https://developer.mozilla.org/en-US/docs/Glossary/Hash_function). Three hash functions are supported. In increasing order of strength, these are: SHA-256, SHA-384, and SHA-512.
-   The result of hashing the resource contents using the specified hash function.

When the browser downloads a resource with the `integrity` attribute set, it will first select the set of hashes that were generated using the strongest hash function present. That is, if the attribute contains values generated with SHA-256 and SHA-384, it will only use the hashes generated using SHA-384.

The browser will then calculate the hash of the resource contents using the specified function, and compare the result with all the specified values: if the actual value matches any of the specified values, then the browser will load the resource, otherwise it will refuse to load the resource.

For more details, see our guide to [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity).

## [Values](#values)

The value of this attribute consists of a whitespace-separated list of components, each of which has one of the following forms:

-   `sha256-HASH_VALUE`
-   `sha384-HASH_VALUE`
-   `sha512-HASH_VALUE`

In each case, the part preceding `-` identifies the [hash function](https://developer.mozilla.org/en-US/docs/Glossary/Hash_function) used, and `HASH_VALUE` is the [base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) encoding of the result of hashing the resource using the specified hash function.

## [Examples](#examples)

### [Including different hash functions](#including_different_hash_functions)

The following [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script) element includes an `integrity` attribute containing three values, one calculated using SHA-256, one calculated using SHA-384, and one calculated using SHA-512.

The browser will select the value that was calculated using the strongest algorithm that the browser supports. Since all modern browsers support SHA-512, this means that the browser will select the `sha512-` value. It will hash the file contents using SHA-512 and compare the result with the `sha512-` value, and load the file only if they match.

In this case providing multiple values enables a website to work with browsers that may not support all the hash functions.

html

```
<script
  src="https://cdn.example.com/script.js"
  integrity="
  sha256-NmUxNTFiMDUzZGIwZjcwZDIyYTc5NTA4ZmQyNT
  sha384-Tk2Yjg3YmYzMWNkZTdhMTFkM2FlNDg4ZjE3MzEzNTk3ZDlh
  sha512-OGUwYThkZDc2YzFlZGI5MDEzZmZhMGFkMGQ0OTQ3MzZkNGYZTEzODk2"
  crossorigin="anonymous"></script>
```

Note that in this and subsequent examples, we've truncated the example hash values, for brevity.

### [Including different hash values](#including_different_hash_values)

The following [`<script>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script) element includes an `integrity` attribute containing two different values, both calculated using the SHA-512 algorithm. These different values reflect alternative contents for the linked file.

If the SHA-512 hash of the linked file matches either of the given values, then the browser will load it.

This enables the server at `cdn.example.com` to respond with one of two versions of the file.

html

```
<script
  src="https://cdn.example.com/script.js"
  integrity="
  sha512-ZmQ5NjNiYWJjYTM3MjRhMGI4MTQzNWRmZTZkZGYyMzQyOGYYTZkYjBm
  sha512-OGUwYThkZDc2YzFlZGI5MDEzZmZhMGFkMGQ0OTQ3MzZkNGYZTEzODk2"
  crossorigin="anonymous"></script>
```

### [Including `integrity` on `<link>` elements](#including_integrity_on_link_elements)

The following [`<link>`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/link) element loads a stylesheet and includes an `integrity` attribute containing six values, reflecting two possible contents for the linked file, each calculated using three different hash functions.

The browser will select the set of values that were calculated using the strongest hash function that it supports: in modern browsers, this will be the two `sha512-` values.

It will then calculate the hash of the downloaded file using SHA-512, and compare the result with both the `sha512-` values: if either of them match, then the browser will load the resource.

html

```
<link
  rel="stylesheet"
  href="https://cdn.example.com/style.css"
  integrity="
  sha256-NmUxNTFiMDUzZGIwZjcwZDIyYTc5NTA4ZmQyNT
  sha256-OTcyMGZkY2Y3NGZhZjUwNWU5NGQ0ZWJhYWVhND
  sha384-Tk2Yjg3YmYzMWNkZTdhMTFkM2FlNDg4ZjE3MzEzNTk3ZDlh
  sha384-ZTdhYjQ2NTE5OTg0Yjc2ZDU2MDMxMDUxY2Y5NDMxYzI5NjA
  sha512-OGUwYThkZDc2YzFlZGI5MDEzZmZhMGFkMGQ0OTQ3MzZkNGYZTEzODk2
  sha512-IxZTcwZjE2ZjU3MzE4NWM5ODU4ZmJkYjBlYzBhYzFkYzU0OGJmM2ZkN"
  crossorigin="anonymous" />
```

## [Specifications](#specifications)

| Specification |
| --- |
| [HTML  
\# attr-link-integrity](https://html.spec.whatwg.org/multipage/semantics.html#attr-link-integrity) |
| [HTML  
\# attr-script-integrity](https://html.spec.whatwg.org/multipage/scripting.html#attr-script-integrity) |
| [Subresource Integrity  
\# the-integrity-attribute](https://w3c.github.io/webappsec-subresource-integrity/#the-integrity-attribute) |

## [Browser compatibility](#browser_compatibility)

### [html.elements.link.integrity](#html.elements.link.integrity)

### [html.elements.script.integrity](#html.elements.script.integrity)

## [See also](#see_also)

-   [Subresource Integrity](https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity)
-   [Supply chain attacks](https://developer.mozilla.org/en-US/docs/Web/Security/Attacks/Supply_chain_attacks)

## Help improve MDN

[Learn how to contribute](https://developer.mozilla.org/en-US/docs/MDN/Community/Getting_started)

This page was last modified on Apr 20, 2026 by [MDN contributors](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/integrity/contributors.txt).
