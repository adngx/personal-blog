---
title: "Setting Up My Dev Environment on Windows"
description: "The tools, terminal setup, and editor config that made coding on Windows actually pleasant."
pubDate: 2026-07-09
tags: ["tooling", "windows"]
---

When I started coding, I used whatever was already on my laptop. That meant Notepad and the default Command Prompt. It worked, barely. Here is what I use now and why.

## Terminal: Windows Terminal + PowerShell

Windows Terminal is a huge upgrade over the old console. Tabs, profiles, and proper Unicode support. I paired it with PowerShell 7, which has better scripting and nicer defaults than the built in Windows PowerShell.

## Editor: VS Code

Not a controversial pick, but the extensions matter more than the editor itself:

- **GitLens** for seeing who changed what and when
- **Error Lens** for inline error display (no more squinting at the Problems panel)
- **Prettier** for formatting (set it to format on save and stop thinking about it)

## Node.js: use nvm-windows

Version managers save headaches. When a project needs Node 18 and another needs Node 20, `nvm use 20` is a lot easier than reinstalling.

## What I still want to improve

- WSL 2 for Linux native tools without leaving Windows
- Better Git aliases for common workflows
- A proper dotfiles repo so I can replicate this on any machine

The goal is a setup that gets out of the way. I want to think about the code, not the tools.
