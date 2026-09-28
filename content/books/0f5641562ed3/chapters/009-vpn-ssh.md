Secure connectivity is the backbone of modern systems administration. Whether you are linking remote offices, encrypting traffic across hostile networks, or simply copying files between servers, the tools in this section cover every practical scenario a Linux administrator will encounter.

This hub collects our in-depth guides on VPN protocols, SSH tunneling, and secure file transfer. Each guide includes real configuration examples you can adapt to production use.

## VPN Protocols

| Protocol | Key Strength | Guide |
| --- | --- | --- |
| [WireGuard](https://www.wireguard.com/ "WireGuard VPN") | Minimal codebase, kernel-level speed | [WireGuard Setup](https://cb.vu/vpn-ssh/wireguard-setup) |
| [OpenVPN](https://openvpn.net/ "OpenVPN") | Mature, highly configurable, wide client support | [OpenVPN Guide](https://cb.vu/vpn-ssh/openvpn-guide) |
| IPsec / strongSwan | Standards-based, interoperable with enterprise gear | [IPsec with strongSwan](https://cb.vu/vpn-ssh/ipsec-strongswan) |

Not sure which one to pick? Read the [VPN Protocol Comparison](https://cb.vu/vpn-ssh/vpn-protocol-comparison) for benchmarks, security analysis, and decision criteria.

## SSH Tunneling and Remote Access

SSH is far more than a login shell. The guides below show how to turn it into a full-featured encrypted transport layer.

-   [SSH Tunneling and Port Forwarding](https://cb.vu/vpn-ssh/ssh-tunneling) -- local, remote, and dynamic (SOCKS) forwarding with `autossh` and systemd persistence.
-   [rsync Over SSH](https://cb.vu/vpn-ssh/rsync-guide) -- efficient, incremental file synchronisation with bandwidth control and cron automation.
-   [SSHFS and Remote File Access](https://cb.vu/vpn-ssh/sshfs-remote-access) -- mount remote directories locally over SSH with reconnect and caching options.

## Choosing the Right Tool

| Use Case | Recommended Tool |
| --- | --- |
| Site-to-site VPN with high throughput | WireGuard or IPsec |
| Road-warrior laptop connecting to office | WireGuard or OpenVPN |
| Quick ad-hoc access to a single port | SSH local forward (`-L`) |
| Browsing through an encrypted proxy | SSH dynamic forward (`-D`) |
| Automated nightly backups | rsync over SSH with cron |
| Interactive file browsing on a remote host | [SSHFS](http://fuse.sourceforge.net/sshfs.html "SSHFS - SSH Filesystem") |

## Prerequisites

Most guides assume a Debian/Ubuntu or RHEL/Fedora system with root access. The specific package names for each distribution are noted in every article. A working firewall (nftables or iptables) and basic networking knowledge (IP addressing, routing, NAT) are helpful prerequisites.

* * *

_Browse the individual guides above, or start with the [VPN Protocol Comparison](https://cb.vu/vpn-ssh/vpn-protocol-comparison) to decide which technology fits your environment._

## Explore VPN & SSH

### [SSHFS and Remote File Access](https://cb.vu/vpn-ssh/sshfs-remote-access)

SSHFS guide: mounting remote directories, fstab configuration, performance tuning, and alternatives for remote file access.
