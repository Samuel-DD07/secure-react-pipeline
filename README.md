# 🔐 Secure React Pipeline

A fully automated security pipeline for React applications,  
integrated directly into GitHub Actions.

## What this does

Every push and pull request automatically triggers:

| Tool | What it checks |
|---|---|
| Semgrep | Static code analysis (SAST) — finds vuln patterns in JS/TS |
| OWASP Dependency-Check | Known CVEs in your npm dependencies |
| Gitleaks | Hardcoded secrets & API keys in your codebase |

## Why I built this

Most React apps ship to production without any automated  
security checks. This pipeline adds a security layer  
in under 10 minutes — no infra required.

## Stack

![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=github-actions&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react)
![OWASP](https://img.shields.io/badge/OWASP-000000?style=flat&logo=owasp&logoColor=white)

## Setup

```bash
# Clone this repo or copy .github/workflows/security.yml
# into your existing React project
```

## Results

> Pipeline added to a real React app — findings documented below.
> *(Results coming soon — work in progress)*

---
Built by [Samuel Dorismond](https://www.dorismond.fr) — Freelance DevSecOps
