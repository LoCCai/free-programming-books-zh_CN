Security is not a product you install; it is a continuous process of reducing attack surface, monitoring for anomalies, and responding to incidents. This hub organises the most important hardening topics for Linux servers and workstations into a set of focused guides you can work through sequentially or jump into as needed.

## Why Hardening Matters

A default Linux installation is designed for convenience, not security. Services listen on all interfaces, root login may be permitted over SSH, and firewall rules are often wide open. Every publicly reachable server is scanned within minutes of coming online by automated bots looking for default credentials, unpatched services, and misconfigured access controls. Hardening is the practice of closing those gaps before an attacker finds them.

The core principles are **least privilege**, **defense in depth**, and **auditability**. Least privilege means every user and process gets only the permissions it needs -- nothing more. Defense in depth layers multiple controls so that a single failure does not lead to full compromise. Auditability means you can reconstruct what happened after an incident, identify the root cause, and improve your defenses accordingly.

These principles apply whether you are managing a single VPS or a fleet of hundreds of servers. The scale changes but the fundamentals do not.

## The Hardening Workflow

A practical hardening workflow looks like this:

`1. Patch and update          ->  /security/server-checklist 2. Encrypt data at rest      ->  /security/encryption-guide 3. Harden TLS / certificates ->  /security/ssl-certificates 4. Lock down SSH access       ->  /security/ssh-hardening 5. Configure firewall         ->  /security/firewall-best-practices 6. Enable audit & IDS         ->  /security/audit-intrusion-detection 7. Apply MAC (SELinux/AA)     ->  /security/selinux-apparmor 8. Ongoing review & checklist ->  /security/server-checklist`

Each step builds on the previous one. Encryption protects data even if the disk is physically stolen. TLS protects data in transit between the client and the server. SSH hardening limits who can log in remotely. The firewall limits what traffic reaches the host at all. Audit and intrusion detection alert you when something slips through the other layers, and mandatory access control confines processes so that even a compromised service cannot read or modify files outside its defined policy.

## Quick Health Check

Before diving into the individual guides, run a quick health check on any server you manage. These commands take less than a minute and give you a snapshot of your current posture:

`# Are all packages up to date? sudo apt update && sudo apt list --upgradable   # Debian/Ubuntu sudo dnf check-update                            # Fedora/RHEL  # Is the firewall active? sudo ufw status verbose        # Ubuntu UFW sudo firewall-cmd --state      # firewalld sudo iptables -L -n -v         # raw iptables  # Is root SSH login disabled? grep -E '^PermitRootLogin' /etc/ssh/sshd_config  # Are there any world-writable files outside /tmp? sudo find / -xdev -type f -perm -0002 -not -path '/tmp/*' 2>/dev/null  # Which services are listening on external interfaces? sudo ss -tulnp  # Check for users with empty passwords sudo awk -F: '($2 == "" ) { print $1 }' /etc/shadow`

If any of those commands reveal surprises -- upgradable packages, a disabled firewall, root login enabled, unexpected listeners -- the guides linked above will walk you through fixing them.

## Understanding Attack Vectors

Common attack vectors against Linux systems include:

-   **Brute-force SSH** -- Automated tools like Hydra try thousands of username and password combinations per hour. Mitigated by key-only authentication, fail2ban, and port knocking. See [SSH Hardening](https://cb.vu/security/ssh-hardening).
-   **Unpatched services** -- Known CVEs in web servers, database engines, and mail servers are exploited within hours of public disclosure. Mitigated by regular updates, minimal installed packages, and monitoring CVE feeds. See [Server Checklist](https://cb.vu/security/server-checklist).
-   **Misconfigured TLS** -- Weak cipher suites, expired certificates, and missing HSTS headers allow man-in-the-middle attacks. Mitigated by modern cipher suites and automated certificate renewal. See [SSL/TLS Certificates](https://cb.vu/security/ssl-certificates).
-   **Privilege escalation** -- A low-privilege shell becomes root through SUID binaries, kernel exploits, or misconfigured sudo rules. Mitigated by SELinux/AppArmor, proper sudo configuration, and auditing. See [SELinux & AppArmor](https://cb.vu/security/selinux-apparmor).
-   **Data exfiltration** -- Once inside, attackers extract sensitive data over DNS, HTTPS, or other allowed protocols. Mitigated by egress firewall rules, encrypted storage, and network monitoring. See [Firewall Best Practices](https://cb.vu/security/firewall-best-practices).
-   **Supply chain attacks** -- Compromised packages or container images introduce backdoors at install time. Mitigated by verifying package signatures, using trusted repositories, and integrity monitoring with AIDE. See [Audit & Intrusion Detection](https://cb.vu/security/audit-intrusion-detection).

## Layered Defense Diagram

           `+---------------------------+            |   Application Layer       |  Input validation, WAF            +---------------------------+            |   Transport Layer (TLS)   |  /security/ssl-certificates            +---------------------------+            |   Authentication (SSH)    |  /security/ssh-hardening            +---------------------------+            |   Network (Firewall)      |  /security/firewall-best-practices            +---------------------------+            |   OS (MAC, Audit)         |  /security/selinux-apparmor            |                           |  /security/audit-intrusion-detection            +---------------------------+            |   Storage (Encryption)    |  /security/encryption-guide            +---------------------------+`

Each layer catches threats that the layer above might miss. An SQL injection that bypasses the application layer is still contained by MAC policies. A compromised SSH key is still limited by firewall rules that restrict lateral movement. Encryption protects data even if every other layer fails and the disk is physically removed.

## In-Depth Guides

| Guide | Focus |
| --- | --- |
| [Encryption Guide](https://cb.vu/security/encryption-guide) | LUKS, dm-crypt, GPG, eCryptfs |
| [SSL/TLS Certificates](https://cb.vu/security/ssl-certificates) | OpenSSL, [Let's Encrypt](https://letsencrypt.org/ "Let's Encrypt Free SSL"), certificate chains |
| [SSH Hardening](https://cb.vu/security/ssh-hardening) | Key auth, sshd\_config, fail2ban |
| [Firewall Best Practices](https://cb.vu/security/firewall-best-practices) | iptables, firewalld, default deny |
| [Audit & Intrusion Detection](https://cb.vu/security/audit-intrusion-detection) | auditd, AIDE, OSSEC |
| [SELinux & AppArmor](https://cb.vu/security/selinux-apparmor) | Mandatory access control policies |
| [Server Hardening Checklist](https://cb.vu/security/server-checklist) | Day-1 steps, ongoing maintenance |

For a broader collection of Unix and Linux command recipes, see the [Unix Toolbox](https://cb.vu/unixtoolbox.html).

## Common Mistakes to Avoid

Even experienced administrators fall into traps that undermine security:

1.  **Disabling SELinux instead of fixing the policy.** When SELinux blocks a service, the correct response is to investigate the AVC denial and write a targeted policy -- not to set `SELINUX=disabled`.
2.  **Using password authentication for SSH.** Passwords can be brute-forced; Ed25519 keys cannot (in any practical timeframe).
3.  **Forgetting IPv6.** Carefully crafted iptables rules mean nothing if ip6tables is wide open. Apply equivalent rules for both protocols.
4.  **Not testing backups.** A backup that has never been restored is not a backup; it is a hope. Schedule quarterly restore tests.
5.  **Running everything as root.** Every service should run under its own unprivileged user with a MAC profile.
6.  **Ignoring log files.** Logs are useless if nobody reads them. Automate log analysis with logwatch, fail2ban, and SIEM integration.
7.  **Hardening once and forgetting.** Security is not a one-time task. New vulnerabilities are discovered daily, configurations drift over time, and staff changes can introduce gaps.

## Threat Landscape Overview

Understanding the threat landscape helps prioritise hardening efforts. According to industry reports, the most common initial access vectors for Linux servers are:

-   **Exposed services with known CVEs** -- Attackers scan for specific version strings and exploit published vulnerabilities. Patch management is the single most effective countermeasure.
-   **Credential stuffing and brute force** -- Leaked password databases are used to attempt logins across unrelated services. Key-based SSH authentication and fail2ban eliminate this vector entirely.
-   **Misconfigured cloud instances** -- Default security groups, open storage buckets, and metadata service exposure are cloud-specific risks that compound the traditional Linux attack surface.
-   **Web application vulnerabilities** -- SQL injection, cross-site scripting, and remote code execution through application bugs bypass network-level controls entirely. Application hardening (input validation, WAF, least privilege database accounts) is essential but outside the scope of these OS-level guides.

The guides linked from this hub focus on OS-level and network-level controls. Application security is a separate discipline but benefits enormously from the containment that MAC and firewall rules provide.

## Getting Started

If you are hardening a server for the first time, start with the [Server Hardening Checklist](https://cb.vu/security/server-checklist) to cover the essentials on day one, then work through encryption, TLS, SSH, and firewall guides in order. Finally, add auditing and mandatory access control for production workloads.

If you already have servers in production, pick the guide that addresses your most obvious gap. A server with password-based SSH should start with [SSH Hardening](https://cb.vu/security/ssh-hardening). A server with no firewall should start with [Firewall Best Practices](https://cb.vu/security/firewall-best-practices).

Security is iterative. Revisit these guides whenever you deploy a new service, rotate credentials, or respond to an incident. The goal is not perfection but continuous improvement -- each pass should leave your systems more resilient than before.
