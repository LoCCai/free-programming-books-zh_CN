## Web Servers: Configuration, Security, and Performance

Web servers are the front door to every internet-facing application. Getting the configuration right -- from TLS termination to reverse proxying to database connectivity -- is essential for security, reliability, and speed.

This hub collects production-ready guides for the two dominant web servers, their supporting infrastructure, and the databases that back them.

## Web Server Configuration

| Topic | Description | Guide |
| --- | --- | --- |
| [Nginx](https://nginx.org/ "Nginx Web Server") | Server blocks, proxy\_pass, SSL, gzip, and tuning | [Nginx Guide](https://cb.vu/web-servers/nginx-guide) |
| [Apache](https://httpd.apache.org/ "Apache HTTP Server") | VirtualHosts, mod\_rewrite, MPMs, and .htaccess | [Apache Guide](https://cb.vu/web-servers/apache-guide) |

## TLS and Encryption

| Topic | Description | Guide |
| --- | --- | --- |
| SSL/TLS Setup | Certbot, cipher suites, HSTS, OCSP stapling | [SSL/TLS Setup](https://cb.vu/web-servers/ssl-tls-setup) |

## Traffic Management

| Topic | Description | Guide |
| --- | --- | --- |
| Reverse Proxy and Load Balancing | Upstream blocks, algorithms, health checks, WebSocket | [Reverse Proxy & Load Balancing](https://cb.vu/web-servers/reverse-proxy-load-balancing) |

## Optimization and Hardening

| Topic | Description | Guide |
| --- | --- | --- |
| Performance Tuning | Workers, compression, caching, CDN, benchmarking | [Performance Tuning](https://cb.vu/web-servers/performance-tuning) |
| Web Security | Security headers, rate limiting, WAF, fail2ban | [Web Security](https://cb.vu/web-servers/web-security) |

## Data Tier

| Topic | Description | Guide |
| --- | --- | --- |
| Database Administration | [MySQL](https://dev.mysql.com/doc/ "MySQL Documentation") and [PostgreSQL](https://www.postgresql.org/docs/ "PostgreSQL Documentation") install, backups, basic tuning | [Database Admin](https://cb.vu/web-servers/database-admin) |

## Choosing Between Nginx and Apache

| Criteria | Nginx | Apache |
| --- | --- | --- |
| Architecture | Event-driven, async | Process/thread-based (MPM) |
| Static file serving | Extremely fast | Fast with sendfile |
| .htaccess support | No (by design) | Yes |
| Dynamic modules | Limited (load at compile or since 1.9.11) | Extensive, loaded at runtime |
| Reverse proxy | First-class | Via mod\_proxy |
| Memory usage | Lower under high concurrency | Higher per connection |

Both are production-grade. Nginx is typically preferred for reverse proxying and high-concurrency workloads; Apache for legacy applications that depend on .htaccess or specific modules.

## Prerequisites

Guides assume a Debian/Ubuntu or RHEL-family system. Commands for both package managers are provided where they differ. A registered domain name and DNS access are needed for the SSL/TLS guide.

* * *

_Navigate back to the [cb.vu home page](https://cb.vu/) or pick a guide above to get started._

## Explore Web Servers
