Linux provides a complete, production-grade networking stack built directly into the kernel. From a single laptop on Wi-Fi to a data-center router handling thousands of flows per second, the same core subsystems are at work: the socket layer, the Netfilter packet-filtering framework, the routing table, and a rich set of virtual-device drivers (bridges, bonds, VLANs, VXLANs, and more). This hub page gives you the big picture and points you to the dedicated in-depth guides listed below.

## In-Depth Guides

| Guide | What You Will Learn |
| --- | --- |
| [Network Configuration](https://cb.vu/networking/network-configuration) | IP addresses, routes, interfaces, NetworkManager and netplan |
| [DNS Configuration](https://cb.vu/networking/dns-guide) | resolv.conf, systemd-resolved, dig, BIND, Unbound |
| [Linux Firewall](https://cb.vu/networking/firewall-guide) | iptables rules, nftables syntax, UFW, firewalld |
| [Network Troubleshooting](https://cb.vu/networking/troubleshooting-tools) | tcpdump, ss, ping, traceroute, mtr, [nmap](http://insecure.org/nmap/ "Nmap Network Scanner") |
| [NAT & IP Forwarding](https://cb.vu/networking/nat-ip-forwarding) | MASQUERADE, SNAT, DNAT, building a Linux router |
| [DHCP & DNS Server](https://cb.vu/networking/dhcp-dns-server) | dnsmasq setup, static leases, PXE boot |
| [Bonding & VLANs](https://cb.vu/networking/bonding-vlans) | Bonding modes, 802.1Q VLANs, bridges, high availability |

See also the classic [Unix Toolbox](https://cb.vu/unixtoolbox.html) for a quick-reference style cheat sheet that covers many of these topics in condensed form.

## The Linux networking stack at a glance

When a packet arrives on a physical or virtual interface the kernel NIC driver places it into a ring buffer. The softirq mechanism picks it up and pushes it through the Netfilter hooks (PREROUTING, INPUT, FORWARD, OUTPUT, POSTROUTING). The routing decision consults the FIB (Forwarding Information Base), and the packet either enters a local socket or is forwarded out another interface.

                  `+-----------+   wire --->  NIC  | rx ring   |---> Netfilter PREROUTING                   +-----------+            |                                     routing decision                                    /              \                               INPUT              FORWARD                                 |                    |                            local socket         Netfilter POSTROUTING                                                      |                                                   tx ring ---> wire`

Understanding this flow is essential for writing firewall rules, setting up NAT, or debugging connectivity problems.

## Key configuration files

Most distributions store their persistent network configuration under `/etc`. The exact location depends on the network manager in use:

`# NetworkManager (RHEL, Fedora, most desktops) ls /etc/NetworkManager/system-connections/  # netplan (Ubuntu 18.04+) ls /etc/netplan/  # ifupdown (Debian, older Ubuntu) cat /etc/network/interfaces  # systemd-networkd ls /etc/systemd/network/`

Regardless of the tool you use, the kernel state is always visible through the `ip` command from iproute2:

`ip addr show          # list addresses on every interface ip route show         # display the main routing table ip link show          # show interface state (UP/DOWN, MTU, etc.) ip -s link show eth0  # show tx/rx statistics for eth0`

## Sysctl knobs for networking

The kernel exposes hundreds of tunables under `/proc/sys/net`. A few of the most commonly adjusted:

`# Enable IPv4 forwarding (required for routing / NAT) sysctl -w net.ipv4.ip_forward=1  # Persist across reboots echo "net.ipv4.ip_forward = 1" >> /etc/sysctl.d/99-forwarding.conf sysctl -p /etc/sysctl.d/99-forwarding.conf  # Increase the connection-tracking table for busy firewalls sysctl -w net.netfilter.nf_conntrack_max=262144  # Disable ICMP redirects (security hardening) sysctl -w net.ipv4.conf.all.accept_redirects=0 sysctl -w net.ipv4.conf.all.send_redirects=0`

## Network namespaces

Network namespaces are the foundation of container networking. Each namespace has its own interfaces, routing table, and Netfilter rules:

`# Create a namespace ip netns add blue  # Run a command inside the namespace ip netns exec blue ip addr show  # Create a veth pair connecting the default and blue namespaces ip link add veth0 type veth peer name veth1 ip link set veth1 netns blue  # Assign addresses ip addr add 10.0.0.1/24 dev veth0 ip netns exec blue ip addr add 10.0.0.2/24 dev veth1  # Bring both ends up ip link set veth0 up ip netns exec blue ip link set veth1 up  # Test ping -c 2 10.0.0.2`

[Docker](https://www.docker.com/ "Docker Containers"), Podman, and [Kubernetes](https://kubernetes.io/ "Kubernetes Container Orchestration") all build on this mechanism, though they add higher-level abstractions such as CNI plugins and iptables/nftables rules to wire containers together and expose services.

## Useful diagnostic one-liners

`# Which process is listening on port 443? ss -tlnp | grep :443  # Trace the route to a remote host traceroute -n 8.8.8.8  # Capture 50 packets on eth0 and write to a pcap file tcpdump -i eth0 -nn -c 50 -w /tmp/capture.pcap  # Show the ARP / neighbour table ip neigh show`

## Where to go next

Start with [Network Configuration](https://cb.vu/networking/network-configuration) if you need to set up IP addresses and routes. Move on to the [DNS Guide](https://cb.vu/networking/dns-guide) once connectivity is confirmed. Use the [Firewall Guide](https://cb.vu/networking/firewall-guide) to lock things down, and the [Troubleshooting Tools](https://cb.vu/networking/troubleshooting-tools) page when something is not working. The remaining guides -- [NAT & IP Forwarding](https://cb.vu/networking/nat-ip-forwarding), [DHCP & DNS Server](https://cb.vu/networking/dhcp-dns-server), and [Bonding & VLANs](https://cb.vu/networking/bonding-vlans) -- cover more advanced infrastructure scenarios. The [Unix Toolbox](https://cb.vu/unixtoolbox.html) is always handy as a pocket reference.
