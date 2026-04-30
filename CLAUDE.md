# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

> **Note:** The authoritative agent instructions live in `AGENTS.md` (used by GitHub Copilot). This file supplements with Claude Code–specific configuration.

## Project Status

Next.js 16 scaffold is set up. See [`AGENTS.md`](./AGENTS.md) for full project overview, commands, architecture, and conventions.

## Configured Permissions

`.claude/settings.local.json` pre-approves common Bash/PowerShell commands for npm, npx, git, and Claude Code tooling.

## Quick Reference

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start dev server |
| `npm run build` | Static export build |
| `npm test` | Run Jest tests |
