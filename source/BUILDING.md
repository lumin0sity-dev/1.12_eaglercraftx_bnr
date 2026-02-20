# Building Eaglercraft 1.12 with Custom Items

## Complete Step-by-Step Guide for Beginners

This guide will take you from zero to a working Eaglercraft client with custom items.
**Estimated time:** 2–4 hours for first-time builders.

---

## 📋 Prerequisites Checklist

Before you start, you need to install:

- [ ] Java 17 (JDK, not just JRE)
- [ ] Git
- [ ] A text editor (VS Code recommended)

---

## Step 1: Install Java 17

You need **Java Development Kit (JDK) 17**, not just the Java Runtime.

### Windows
1. Go to [https://adoptium.net/](https://adoptium.net/)
2. Click **"Latest LTS Release"** → select **Temurin 17**
3. Download the `.msi` installer
4. Run the installer, check **"Set JAVA_HOME"** and **"Add to PATH"** options
5. Verify: Open Command Prompt and run:
   ```
   java -version
   ```
   You should see: `openjdk version "17.x.x"`

### Mac
Using Homebrew (recommended):
```bash
brew install openjdk@17
echo 'export PATH="/opt/homebrew/opt/openjdk@17/bin:$PATH"' >> ~/.zshrc
source ~/.zshrc
java -version
```

Without Homebrew:
1. Go to [https://adoptium.net/](https://adoptium.net/)
2. Download the macOS `.pkg` installer for Temurin 17
3. Run and install

### Linux (Ubuntu/Debian)
```bash
sudo apt update
sudo apt install openjdk-17-jdk
java -version
```

### Linux (Fedora/RHEL)
```bash
sudo dnf install java-17-openjdk-devel
java -version
```

---

## Step 2: Install Git

### Windows
1. Download from [https://git-scm.com/download/win](https://git-scm.com/download/win)
2. Run the installer with default settings
3. Verify: Open **Git Bash** and run `git --version`

### Mac
```bash
# Git usually comes with Xcode Command Line Tools
xcode-select --install
# OR via Homebrew:
brew install git
```

### Linux
```bash
sudo apt install git       # Ubuntu/Debian
sudo dnf install git       # Fedora/RHEL
```

---

## Step 3: Clone the Eaglercraft 1.12 Source Code

Open a terminal (Git Bash on Windows, Terminal on Mac/Linux):

```bash
# Clone the Eaglercraft 1.12 source
git clone https://github.com/fixherbigger-sys/Eaglercraft-1.12
cd Eaglercraft-1.12
```

> **Note:** If the above repository URL doesn't work, search GitHub for
> "Eaglercraft 1.12 source" — there are multiple forks available.

---

## Step 4: Copy This Repository's Modified Files

You need to copy the files from this `source/` directory into the Eaglercraft source:

### Copy Item Classes
Copy everything from `source/items/` into the Eaglercraft source at:
```
src/main/java/net/minecraft/item/
```

Command (adjust paths to match where you cloned things):
```bash
# Example - adjust YOUR_PATH to the actual location
cp source/items/*.java YOUR_PATH/Eaglercraft-1.12/src/main/java/net/minecraft/item/
```

### Copy ItemRegistry
Copy `source/ItemRegistry.java` into:
```
src/main/java/net/minecraft/init/
```

### Copy Resource Files
Copy everything from `source/resources/` into the Eaglercraft source at:
```
src/main/resources/
```

```bash
cp -r source/resources/. YOUR_PATH/Eaglercraft-1.12/src/main/resources/
```

### Add Textures
Follow the instructions in `source/resources/assets/minecraft/textures/items/README.md`
to get and place the texture PNG files.

---

## Step 5: Register Your Items in the Game

You need to call `ItemRegistry.registerItems()` from the game's initialization code.

1. Open the Eaglercraft source in your text editor
2. Find the file where vanilla items are initialized. Look for:
   - `Bootstrap.java`
   - `Items.java`
   - Any file that calls `new ItemDiamond()` or similar
3. Add this line where items are registered:
   ```java
   ItemRegistry.registerItems();
   ```

---

## Step 6: Build the Client

The Eaglercraft build process involves several steps. Run these from the Eaglercraft source directory:

### Windows
Open Command Prompt in the Eaglercraft folder and run each script:

```cmd
CompileEPK.bat
```
Wait for it to finish, then:
```cmd
CompileWASM.bat
```
Wait, then:
```cmd
CompileEagRuntimeJS.bat
```
Wait, then:
```cmd
MakeWASMClientBundle.bat
```

### Mac/Linux
Make the scripts executable first:
```bash
chmod +x CompileEPK CompileWASM CompileEagRuntimeJS MakeWASMClientBundle
```

Then run each one:
```bash
./CompileEPK && ./CompileWASM && ./CompileEagRuntimeJS && ./MakeWASMClientBundle
```

> **This will take 5–20 minutes** depending on your computer speed.
> Watch for error messages — if something fails, the build will stop.

---

## Step 7: Deploy to GitHub Pages

After a successful build:

1. The output files are in `javascript_dist/` (or similar — check the Eaglercraft docs)
2. Copy those files to your GitHub Pages repository
3. Push to GitHub
4. Wait 1–2 minutes for GitHub Pages to update
5. Visit your site and test

---

## 🛠️ Common Build Errors and Fixes

### Error: `javac: command not found`
**Cause:** Java is not installed or not in PATH.
**Fix:** Re-install Java 17 JDK and make sure to check "Add to PATH" during installation.

### Error: `cannot find symbol: ItemRegistry`
**Cause:** You forgot to copy `ItemRegistry.java` or it's in the wrong folder.
**Fix:** Make sure `ItemRegistry.java` is in `src/main/java/net/minecraft/init/`

### Error: `cannot find symbol: ItemBlueCandle`
**Cause:** The item class files aren't in the right folder.
**Fix:** Make sure all `Item*.java` files are in `src/main/java/net/minecraft/item/`

### Error: `cannot find symbol: GameRegistry`
**Cause:** The import for GameRegistry is missing or the class name is different in this version.
**Fix:** Check how vanilla items are registered in the source and match that pattern.

### Error: `OutOfMemoryError` during build
**Cause:** Not enough RAM allocated to Java.
**Fix:** Set the JAVA_OPTS environment variable:
```bash
export JAVA_OPTS="-Xmx4g"   # Mac/Linux
set JAVA_OPTS=-Xmx4g        # Windows CMD
```

### Build succeeds but items don't appear in-game
**Cause:** `ItemRegistry.registerItems()` is not being called at startup.
**Fix:** Double-check Step 5 — find where to call it and make sure it compiles.

---

## 📚 Further Reading

- [Eaglercraft GitHub](https://github.com/LAX1DUDE/eaglercraft) - Main Eaglercraft repo
- [Minecraft Forge Documentation](https://mcforge.readthedocs.io/) - How Minecraft modding works
- [Java Tutorial for Beginners](https://docs.oracle.com/javase/tutorial/) - Learn Java basics
- [Minecraft Wiki - Item](https://minecraft.wiki/w/Item) - Vanilla item reference

---

## 💬 Getting Help

If you get stuck, ask for help with:
1. The **exact error message** (copy-paste it)
2. Which **step** you're on
3. Your **operating system** (Windows/Mac/Linux)
4. The **Java version** output of `java -version`

Post in Eaglercraft Discord communities or open a GitHub Issue.
