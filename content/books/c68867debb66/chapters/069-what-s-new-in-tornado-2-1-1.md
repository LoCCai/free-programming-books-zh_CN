## Oct 4, 2011[¶](#oct-4-2011 "永久链接至标题")

### Bug fixes[¶](#bug-fixes "永久链接至标题")

-   Fixed handling of closed connections with the `epoll` (i.e. Linux) `IOLoop`. Previously, closed connections could be shut down too early, which most often manifested as “Stream is closed” exceptions in `SimpleAsyncHTTPClient`.
-   Fixed a case in which chunked responses could be closed prematurely, leading to truncated output.
-   `IOStream.connect` now reports errors more consistently via logging and the close callback (this affects e.g. connections to localhost on FreeBSD).
-   `IOStream.read_bytes` again accepts both `int` and `long` arguments.
-   `PeriodicCallback` no longer runs repeatedly when `IOLoop` iterations complete faster than the resolution of `time.time()` (mainly a problem on Windows).

### Backwards-compatibility note[¶](#backwards-compatibility-note "永久链接至标题")

-   Listening for `IOLoop.ERROR` alone is no longer sufficient for detecting closed connections on an otherwise unused socket. `IOLoop.ERROR` must always be used in combination with `READ` or `WRITE`.
