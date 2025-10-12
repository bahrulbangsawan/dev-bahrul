---
title: GitHub CLI Complete Guide
description: Complete step-by-step guide to using GitHub from account creation to pushing code with GitHub CLI
---

# GitHub CLI Complete Guide

A complete beginner-friendly guide to GitHub, from creating an account to pushing your code using the GitHub CLI (Command Line Interface).

## What is GitHub?

GitHub is a platform where developers store and share their code. Think of it as Google Drive, but specifically designed for code with powerful collaboration features.

### Why Use GitHub?

- **Backup Your Code**: Never lose your work
- **Version Control**: Track every change you make
- **Collaboration**: Work with others on the same project
- **Portfolio**: Show your work to potential employers
- **Free**: Public repositories are completely free

---

## Part 1: Creating a GitHub Account

### Step 1: Sign Up

1. Go to [github.com](https://github.com)
2. Click **Sign up** button (top right)
3. Enter your email address
4. Create a strong password
5. Choose a username (this will be your GitHub identity)
   - Example: `bahrulbangsawan`, `johndoe`, etc.
   - This appears in your URLs: `github.com/your-username`
6. Click **Continue**

### Step 2: Verify Your Account

1. Check your email inbox
2. GitHub will send a verification code
3. Enter the code on GitHub
4. Click **Verify**

### Step 3: Personalize (Optional)

Answer a few questions:
- Are you a student or teacher? (optional)
- What do you plan to use GitHub for?
- Skip these if you want - click **Skip personalization**

### Step 4: Choose a Plan

- Select **Free** (perfect for most users)
- Free plan includes:
  - Unlimited public repositories
  - Unlimited private repositories
  - GitHub Actions (automation)
  - And more!

**You're now registered!** 🎉

---

## Part 2: Understanding Git vs GitHub

Before we continue, let's clarify the difference:

| Git | GitHub |
|-----|--------|
| Version control software | Website/platform |
| Works on your computer | Works on the internet |
| Tracks file changes | Stores your repositories |
| Command line tool | Web interface + CLI |
| Free and open source | Free for public repos |

**Analogy:**
- **Git** = Microsoft Word (the software)
- **GitHub** = OneDrive (the storage platform)

---

## Part 3: Installing Git

### For macOS

**Check if Git is already installed:**

```bash
git --version
```

If you see a version number, Git is installed! Skip to Part 4.

**If not installed:**

```bash
# Install using Homebrew (recommended)
brew install git

# Or download from: https://git-scm.com/download/mac
```

### For Windows

1. Download Git from [git-scm.com/download/win](https://git-scm.com/download/win)
2. Run the installer
3. Use default settings (just click Next)
4. Restart your terminal

### For Linux

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install git

# Fedora
sudo dnf install git

# Arch
sudo pacman -S git
```

### Verify Installation

```bash
git --version
```

You should see something like: `git version 2.39.0`

---

## Part 4: Configuring Git

Set up your identity (this will appear in your commits):

```bash
# Set your name
git config --global user.name "Your Name"

# Set your email (use the same email as GitHub)
git config --global user.email "your.email@example.com"

# Verify your settings
git config --global --list
```

**Example:**

```bash
git config --global user.name "Bahrul Bangsawan"
git config --global user.email "bahrul@example.com"
```

---

## Part 5: Installing GitHub CLI

GitHub CLI (`gh`) makes it easy to work with GitHub from your terminal.

### For macOS

```bash
# Using Homebrew (recommended)
brew install gh

# Verify installation
gh --version
```

### For Windows

**Option 1: Using winget**
```bash
winget install --id GitHub.cli
```

**Option 2: Using Scoop**
```bash
scoop install gh
```

**Option 3: Download installer**
- Go to [cli.github.com](https://cli.github.com)
- Download Windows installer
- Run the installer

### For Linux

**Debian/Ubuntu:**
```bash
curl -fsSL https://cli.github.com/packages/githubcli-archive-keyring.gpg | sudo dd of=/usr/share/keyrings/githubcli-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | sudo tee /etc/apt/sources.list.d/github-cli.list > /dev/null
sudo apt update
sudo apt install gh
```

**Fedora/CentOS:**
```bash
sudo dnf install gh
```

### Verify Installation

```bash
gh --version
```

You should see: `gh version 2.x.x`

---

## Part 6: Authenticate GitHub CLI

Connect your terminal to your GitHub account:

### Step 1: Login

```bash
gh auth login
```

### Step 2: Follow the Prompts

You'll see a series of questions:

```
? What account do you want to log into?
→ Select: GitHub.com

? What is your preferred protocol for Git operations?
→ Select: HTTPS (easier for beginners)

? Authenticate Git with your GitHub credentials?
→ Select: Yes

? How would you like to authenticate GitHub CLI?
→ Select: Login with a web browser
```

### Step 3: Copy the Code

You'll see:
```
! First copy your one-time code: XXXX-XXXX
Press Enter to open github.com in your browser...
```

1. **Copy the code** (highlight and Cmd+C or Ctrl+C)
2. Press **Enter**
3. Your browser will open

### Step 4: Authorize in Browser

1. Paste the code you copied
2. Click **Continue**
3. Click **Authorize github**
4. Return to your terminal

You should see: `✓ Authentication complete!`

### Step 5: Verify Login

```bash
gh auth status
```

You should see:
```
✓ Logged in to github.com as your-username
```

---

## Part 7: Understanding Project Structure

Before creating repositories, let's understand how projects are organized:

### Basic Project Structure

```
my-project/                    ← Project folder (root)
├── .git/                      ← Git tracking (hidden folder)
├── .gitignore                 ← Files to ignore
├── README.md                  ← Project description
├── src/                       ← Source code
│   ├── index.js
│   └── components/
├── public/                    ← Static files
└── package.json               ← Project info (for Node.js)
```

### Important Files

| File/Folder | Purpose |
|------------|---------|
| `.git/` | Git's database (never touch this!) |
| `.gitignore` | List of files Git should ignore |
| `README.md` | Project documentation (shows on GitHub) |
| `src/` | Your code files |
| `node_modules/` | Dependencies (don't commit this!) |

### What to Commit vs Ignore

**✅ Commit (push to GitHub):**
- Your source code (`src/`, `*.js`, `*.css`, etc.)
- Configuration files (`package.json`, `tsconfig.json`)
- Documentation (`README.md`, `docs/`)
- Assets you created (`images/`, `fonts/`)

**❌ Don't Commit (add to .gitignore):**
- Dependencies (`node_modules/`, `vendor/`)
- Build outputs (`dist/`, `build/`, `.next/`)
- Environment variables (`.env`, `.env.local`)
- System files (`.DS_Store`, `Thumbs.db`)
- API keys and secrets
- Large binary files

---

## Part 8: Creating Your First Repository

Let's create a project and push it to GitHub!

### Method 1: Create Locally, Then Push (Recommended)

#### Step 1: Create a Project Folder

```bash
# Create a new folder
mkdir my-first-project
cd my-first-project
```

#### Step 2: Initialize Git

```bash
# Initialize Git in this folder
git init
```

You'll see: `Initialized empty Git repository in /path/to/my-first-project/.git/`

**What happened?**
- Git created a hidden `.git/` folder
- This folder tracks all changes
- Your folder is now a "repository" (repo)

#### Step 3: Create Some Files

```bash
# Create a README file
echo "# My First Project" > README.md

# Create a simple HTML file (example)
echo "<!DOCTYPE html>
<html>
<head>
    <title>My Project</title>
</head>
<body>
    <h1>Hello, GitHub!</h1>
</body>
</html>" > index.html

# Create .gitignore
echo "node_modules/
.env
.DS_Store
dist/" > .gitignore
```

**Your structure now looks like:**
```
my-first-project/
├── .git/                  ← Git tracking
├── .gitignore             ← Ignore rules
├── README.md              ← Project description
└── index.html             ← Your code
```

#### Step 4: Check Status

```bash
git status
```

You'll see:
```
Untracked files:
  .gitignore
  README.md
  index.html
```

**What this means:**
- Git sees these files
- But isn't tracking them yet
- We need to "add" them

#### Step 5: Stage Files (Add to Git)

```bash
# Add all files
git add .

# Or add specific files
git add README.md
git add index.html
```

**What `git add` does:**
- Stages files for commit
- Like putting files in a box before shipping

Check status again:
```bash
git status
```

Now you'll see:
```
Changes to be committed:
  new file:   .gitignore
  new file:   README.md
  new file:   index.html
```

#### Step 6: Commit (Save Snapshot)

```bash
git commit -m "Initial commit: Add README and index.html"
```

**Commit message tips:**
- Keep it short and descriptive
- Use present tense: "Add feature" not "Added feature"
- Examples:
  - "Add homepage"
  - "Fix login bug"
  - "Update documentation"

You'll see:
```
[main 1a2b3c4] Initial commit: Add README and index.html
 3 files changed, 15 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
 create mode 100644 index.html
```

#### Step 7: Create GitHub Repository

```bash
gh repo create my-first-project --public --source=. --remote=origin --push
```

**What this command does:**
- `gh repo create` - Creates a new repository
- `my-first-project` - Repository name
- `--public` - Makes it public (use `--private` for private)
- `--source=.` - Uses current folder
- `--remote=origin` - Adds GitHub as "origin"
- `--push` - Pushes your code immediately

You'll see:
```
✓ Created repository username/my-first-project on GitHub
✓ Added remote https://github.com/username/my-first-project.git
✓ Pushed commits to https://github.com/username/my-first-project.git
```

**Done!** 🎉 Your code is now on GitHub!

Visit: `https://github.com/your-username/my-first-project`

---

### Method 2: Create on GitHub First

#### Step 1: Create Repository on GitHub

```bash
gh repo create my-project --public
```

You'll be asked:
```
? This will create 'my-project' in your account. Continue?
→ Select: Yes
```

#### Step 2: Clone to Your Computer

```bash
gh repo clone my-project
cd my-project
```

#### Step 3: Add Files & Push

```bash
# Create files
echo "# My Project" > README.md

# Add files
git add .

# Commit
git commit -m "Initial commit"

# Push to GitHub
git push
```

---

## Part 9: Daily Git Workflow

Here's your typical workflow when working on projects:

### The Basic Cycle

```bash
# 1. Make changes to your files
# (edit code in your editor)

# 2. Check what changed
git status

# 3. See specific changes
git diff

# 4. Stage files
git add .
# or stage specific files
git add filename.js

# 5. Commit with message
git commit -m "Add new feature"

# 6. Push to GitHub
git push
```

### Visual Workflow

```
Working Directory  →  Staging Area  →  Local Repository  →  GitHub
(your files)          (git add)         (git commit)         (git push)

example.js         →  example.js    →  ✓ Committed      →  ☁️ GitHub
(modified)            (staged)          (saved locally)      (backed up)
```

---

## Part 10: Essential Git Commands

### Status & Info

```bash
# Check status
git status

# View commit history
git log

# View changes
git diff

# Show branch info
git branch
```

### Adding & Committing

```bash
# Add all files
git add .

# Add specific file
git add filename.js

# Commit with message
git commit -m "Your message"

# Add and commit in one step
git commit -am "Your message"
```

### Pushing & Pulling

```bash
# Push to GitHub
git push

# Pull from GitHub (get latest changes)
git pull

# Push for the first time
git push -u origin main
```

### Branching

```bash
# Create new branch
git branch feature-name

# Switch to branch
git checkout feature-name

# Create and switch in one command
git checkout -b feature-name

# List all branches
git branch

# Delete branch
git branch -d feature-name
```

### Undoing Changes

```bash
# Discard changes in file
git checkout -- filename.js

# Unstage file (undo git add)
git reset filename.js

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1
```

---

## Part 11: GitHub CLI Commands

### Repository Management

```bash
# Create repository
gh repo create repo-name --public

# Create private repository
gh repo create repo-name --private

# Clone repository
gh repo clone username/repo-name

# View repository
gh repo view

# Delete repository (careful!)
gh repo delete repo-name
```

### Working with Issues

```bash
# Create issue
gh issue create

# List issues
gh issue list

# View specific issue
gh issue view 123

# Close issue
gh issue close 123
```

### Pull Requests

```bash
# Create pull request
gh pr create

# List pull requests
gh pr list

# View pull request
gh pr view 123

# Merge pull request
gh pr merge 123
```

### Other Useful Commands

```bash
# Open repository in browser
gh repo view --web

# Check authentication
gh auth status

# Logout
gh auth logout
```

---

## Part 12: Real-World Example

Let's create a complete project from scratch:

### Scenario: Creating a Portfolio Website

#### Step 1: Create Project

```bash
# Create and enter folder
mkdir portfolio-website
cd portfolio-website

# Initialize Git
git init
```

#### Step 2: Create Files

```bash
# Create README
echo "# Portfolio Website

My personal portfolio showcasing my projects.

## Technologies
- HTML
- CSS
- JavaScript" > README.md

# Create HTML file
echo "<!DOCTYPE html>
<html>
<head>
    <title>My Portfolio</title>
    <link rel='stylesheet' href='style.css'>
</head>
<body>
    <h1>Welcome to My Portfolio</h1>
    <p>Check out my projects!</p>
</body>
</html>" > index.html

# Create CSS file
echo "body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
}" > style.css

# Create .gitignore
echo ".DS_Store
node_modules/
.env" > .gitignore
```

#### Step 3: Project Structure

```
portfolio-website/
├── .git/
├── .gitignore
├── README.md
├── index.html
└── style.css
```

#### Step 4: First Commit

```bash
# Check files
git status

# Add all files
git add .

# Commit
git commit -m "Initial commit: Add portfolio structure"
```

#### Step 5: Create GitHub Repository & Push

```bash
# Create repo and push
gh repo create portfolio-website --public --source=. --remote=origin --push
```

#### Step 6: Make Changes

```bash
# Edit index.html (use your editor)
# Add more content...

# Check what changed
git diff

# Stage changes
git add index.html

# Commit
git commit -m "Add project section to homepage"

# Push to GitHub
git push
```

**Your portfolio is now live on GitHub!** 🎉

Visit: `https://github.com/your-username/portfolio-website`

---

## Part 13: Common Scenarios & Solutions

### Scenario 1: I Made a Mistake in My Last Commit

```bash
# Change the commit message
git commit --amend -m "New message"

# Add forgotten files to last commit
git add forgotten-file.js
git commit --amend --no-edit
```

### Scenario 2: I Want to Ignore Files I Already Committed

```bash
# Add to .gitignore first
echo "secret.txt" >> .gitignore

# Remove from Git (but keep file)
git rm --cached secret.txt

# Commit the change
git commit -m "Stop tracking secret.txt"
git push
```

### Scenario 3: Someone Else Updated the Repository

```bash
# Get latest changes
git pull

# If there are conflicts, Git will tell you
# Edit the conflicted files
# Then:
git add .
git commit -m "Resolve merge conflicts"
git push
```

### Scenario 4: I Want to Start Over

```bash
# Discard ALL local changes (careful!)
git reset --hard

# Get fresh copy from GitHub
git pull
```

### Scenario 5: Wrong Remote URL

```bash
# Check current remote
git remote -v

# Change remote URL
git remote set-url origin https://github.com/username/new-repo.git

# Verify
git remote -v
```

---

## Part 14: Best Practices

### Commit Messages

**Good:**
```bash
git commit -m "Add user authentication"
git commit -m "Fix navigation bug on mobile"
git commit -m "Update README with installation steps"
```

**Bad:**
```bash
git commit -m "stuff"
git commit -m "changes"
git commit -m "idk"
git commit -m "final final FINAL version"
```

### Commit Frequency

- **Too often**: Every line changed
- **Too rare**: Once a month
- **Just right**: After completing a feature or fix

**Good times to commit:**
- After adding a new feature
- After fixing a bug
- After updating documentation
- Before trying something risky
- At the end of the day

### .gitignore Essentials

```bash
# Dependencies
node_modules/
vendor/

# Build outputs
dist/
build/
*.min.js

# Environment variables
.env
.env.local
.env.production

# System files
.DS_Store
Thumbs.db
*.swp

# IDE settings
.vscode/
.idea/
*.suo

# Logs
*.log
npm-debug.log*
```

### README Best Practices

A good README includes:
1. Project title and description
2. Installation instructions
3. Usage examples
4. Technologies used
5. Screenshots (optional)
6. License
7. Contact information

---

## Part 15: Troubleshooting

### "Permission Denied (publickey)"

**Problem:** Can't push/pull from GitHub

**Solution:**
```bash
# Use HTTPS instead of SSH
git remote set-url origin https://github.com/username/repo.git

# Or set up SSH keys (advanced)
gh auth login
# Select HTTPS when asked
```

### "fatal: not a git repository"

**Problem:** Git command doesn't work

**Solution:**
```bash
# Make sure you're in the right folder
pwd

# Navigate to your project
cd path/to/your/project

# Or initialize Git
git init
```

### "Everything up-to-date"

**Problem:** Push doesn't work

**Solution:**
```bash
# You haven't committed changes
git status

# Add and commit first
git add .
git commit -m "Your changes"
git push
```

### "divergent branches"

**Problem:** Local and remote have different changes

**Solution:**
```bash
# Pull first
git pull

# Resolve any conflicts
# Then push
git push
```

### Accidentally Committed Large File

```bash
# Remove from last commit
git rm --cached large-file.zip
git commit --amend -m "Remove large file"
git push --force

# Add to .gitignore
echo "large-file.zip" >> .gitignore
```

---

## Part 16: Quick Reference

### Essential Commands Cheat Sheet

```bash
# Setup
git config --global user.name "Your Name"
git config --global user.email "email@example.com"
gh auth login

# Start new project
git init
gh repo create project-name --public --source=. --remote=origin --push

# Daily workflow
git status                      # Check status
git add .                       # Stage all files
git commit -m "Message"         # Commit changes
git push                        # Push to GitHub
git pull                        # Get latest changes

# Branches
git branch branch-name          # Create branch
git checkout branch-name        # Switch branch
git checkout -b new-branch      # Create and switch
git merge branch-name           # Merge branch

# GitHub CLI
gh repo create name             # Create repository
gh repo clone user/repo         # Clone repository
gh repo view --web              # Open in browser
gh issue create                 # Create issue
gh pr create                    # Create pull request
```

---

## Summary

You've learned how to:

✅ Create a GitHub account  
✅ Install and configure Git  
✅ Install and authenticate GitHub CLI  
✅ Understand project structure  
✅ Create repositories  
✅ Commit and push code  
✅ Use essential Git commands  
✅ Follow best practices  
✅ Troubleshoot common issues  

### Next Steps

1. **Practice**: Create a few test repositories
2. **Explore**: Browse other projects on GitHub
3. **Contribute**: Try contributing to open source
4. **Learn More**: 
   - Git branching strategies
   - GitHub Actions (automation)
   - Collaboration workflows
   - Advanced Git commands

### Useful Resources

- [GitHub Documentation](https://docs.github.com)
- [Git Documentation](https://git-scm.com/doc)
- [GitHub CLI Manual](https://cli.github.com/manual)
- [Interactive Git Tutorial](https://learngitbranching.js.org)

---

**Happy coding!** 🚀

Remember: Everyone makes mistakes with Git. Don't worry, almost everything is recoverable!
