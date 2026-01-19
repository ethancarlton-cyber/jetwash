# Security Checklist - Pre-Commit

**ALWAYS check before committing code to a public repository.**

## Before Every Commit

### 1. Check for Exposed Secrets
Run this command to scan for potential API keys:
```bash
git diff --cached | grep -iE "(api[_-]?key|secret|password|token|sk-|pk-|bearer)"
```

### 2. Common Patterns to Watch For
- `sk-` or `pk-` prefixes (OpenRouter, Stripe, etc.)
- `API_KEY`, `apiKey`, `api_key`
- `SECRET`, `secret`, `SECRET_KEY`
- `token`, `TOKEN`, `bearer`
- `password`, `PASSWORD`
- Base64-encoded strings that look like keys
- Any long alphanumeric strings (32+ characters)

### 3. Files That Often Contain Secrets
- `*.js` files with API calls
- `*.env` files (should NEVER be committed)
- Config files (`config.js`, `settings.js`)
- Scripts in `scripts/` folder
- Test files with hardcoded values

### 4. Safe Practices
- **Use environment variables** for all API keys
- **Add sensitive folders to .gitignore FIRST** before creating files
- **Use `.env.example`** with placeholder values, never real keys
- **Review `git diff --cached`** before every commit

## Current .gitignore Protections
These are already ignored in this project:
- `.env` and `.env.local`
- `scripts/` folder
- `node_modules/`

## If a Key is Exposed
1. **Immediately rotate the key** - create a new one, delete the old
2. **Remove from git history** if possible (or accept it's compromised)
3. **Check for unauthorized usage** in the service's dashboard
4. **Add the file/folder to .gitignore**

## Incident Log

| Date | What | Service | Resolution |
|------|------|---------|------------|
| 2026-01-19 | OpenRouter API key exposed in scripts/generate-images.js | OpenRouter | Key auto-disabled by OpenRouter, scripts removed from repo, added to .gitignore |

---

**Remember: Once a secret is in git history, assume it's compromised forever.**
