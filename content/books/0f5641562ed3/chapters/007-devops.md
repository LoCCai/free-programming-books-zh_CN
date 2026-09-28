## DevOps: Infrastructure as Code, CI/CD, and Automation

DevOps bridges the gap between development and operations by treating infrastructure like software -- version-controlled, tested, and deployed through automated pipelines. This section collects practical, command-level guides for the tools that form the backbone of modern DevOps workflows.

Whether you are managing a handful of servers or orchestrating thousands of containers, the guides below will give you production-ready configurations you can adapt immediately.

## Version Control and GitOps

| Topic | Description | Guide |
| --- | --- | --- |
| [Git](https://git-scm.com/ "Git Version Control") for Sysadmins | Branching, rebasing, hooks, and infrastructure repos | [Git for Sysadmins](https://cb.vu/devops/git-sysadmin) |

## Containers and Orchestration

| Topic | Description | Guide |
| --- | --- | --- |
| [Docker](https://www.docker.com/ "Docker Containers") | Images, volumes, networking, Compose, and security | [Docker Guide](https://cb.vu/devops/docker-guide) |
| [Kubernetes](https://kubernetes.io/ "Kubernetes Container Orchestration") | Pods, Deployments, Services, Ingress, and resource management | [Kubernetes Fundamentals](https://cb.vu/devops/kubernetes-fundamentals) |

## Configuration Management and IaC

| Topic | Description | Guide |
| --- | --- | --- |
| [Ansible](https://www.ansible.com/ "Ansible Automation") | Playbooks, roles, vault, and ad-hoc commands | [Ansible Guide](https://cb.vu/devops/ansible-guide) |
| [Terraform](https://www.terraform.io/ "Terraform Infrastructure as Code") | HCL, providers, state management, modules, and workspaces | [Terraform Guide](https://cb.vu/devops/terraform-guide) |

## Pipelines and Delivery

| Topic | Description | Guide |
| --- | --- | --- |
| CI/CD Pipelines | [GitHub Actions](https://github.com/features/actions "GitHub Actions CI/CD"), [GitLab CI](https://docs.gitlab.com/ee/ci/ "GitLab CI/CD Documentation"), caching, secrets, matrix builds | [CI/CD Pipelines](https://cb.vu/devops/cicd-pipelines) |

## Reliability and Recovery

| Topic | Description | Guide |
| --- | --- | --- |
| Backup Strategies | rsync, Borg, [Restic](https://restic.net/ "Restic Backup Program"), 3-2-1 rule, automated schedules | [Backup Strategies](https://cb.vu/devops/backup-strategies) |

## Classic Unix Reference

For the foundational Unix and Linux commands that underpin every tool above, see the original [Unix Toolbox](https://cb.vu/unixtoolbox.html) -- a encyclopedic quick-reference covering file systems, networking, process management, and more.

## Choosing the Right Tool

| Need | Recommended |
| --- | --- |
| Version-controlled server configs | Git + Ansible or Terraform |
| Build and test every commit | GitHub Actions or GitLab CI |
| Package an app with its dependencies | Docker |
| Run containers at scale | Kubernetes |
| Provision cloud infrastructure | Terraform |
| Configure servers idempotently | Ansible |
| Reliable incremental backups | Borg or Restic |

## Prerequisites

Most guides assume a Debian/Ubuntu or RHEL-family system with root or sudo access. Familiarity with the Linux command line and basic networking is expected. Each article lists specific package installation steps.

* * *

_Navigate back to the [cb.vu home page](https://cb.vu/) or pick a guide from the list above to get started._

## Explore DevOps
