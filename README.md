# OpenCode Workspace

A browser-based OpenCode workspace designed for GitHub Codespaces. You do not need to install anything on your Chromebook.

## Start in the browser

1. Open this repository on GitHub.
2. Select **Code → Codespaces → Create codespace on main**.
3. Wait for the container setup to complete. It installs OpenCode and starts the web server automatically.
4. Open the **Ports** panel and select the forwarded **OpenCode Web** port (4096). The port is configured as private.
5. When prompted for Basic Authentication, use:
   - Username: `opencode`
   - Password: run `bash .devcontainer/show-opencode-password.sh` in the Codespaces terminal.

The password is generated inside your Codespace and is never committed to this repository.

## Work on another GitHub repository

This workspace starts in its own repository. To work on one of your other projects, open the Codespaces terminal and run:

```bash
gh repo clone henriquefelix8920/REPOSITORY-NAME
cd REPOSITORY-NAME
opencode
```

Replace `REPOSITORY-NAME` with the repository you want to work on. GitHub CLI is included in the dev container.

## Useful commands

Restart the web server:

```bash
bash .devcontainer/start-opencode.sh
```

Display the login password:

```bash
bash .devcontainer/show-opencode-password.sh
```

Inspect startup logs:

```bash
tail -n 100 ~/.config/opencode-codespaces/server.log
```

## Notes

- OpenCode is installed in the cloud container, not on your Chromebook.
- The forwarded Codespaces port is private.
- You must configure an AI provider inside OpenCode. Provider/API usage may have separate charges.
- Stop the Codespace when you finish to avoid consuming compute time while it is idle.
