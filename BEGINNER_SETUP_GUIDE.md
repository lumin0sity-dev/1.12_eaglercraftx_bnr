# Beginner Setup Guide

This guide is written for users who have **no prior Java or build-tool experience**.
Take it one section at a time – you don't need to understand everything at once.

---

## Table of Contents

1. [What You Need](#1-what-you-need)
2. [Installing Java 17](#2-installing-java-17)
3. [Installing IntelliJ IDEA](#3-installing-intellij-idea)
4. [Installing Git](#4-installing-git)
5. [Basic Java Concepts](#5-basic-java-concepts)
6. [Using Git / GitHub](#6-using-git--github)
7. [Understanding Gradle](#7-understanding-gradle)
8. [Troubleshooting Common Errors](#8-troubleshooting-common-errors)
9. [Where to Get Help](#9-where-to-get-help)

---

## 1 – What You Need

| Tool | What it Does | Required? |
|------|-------------|-----------|
| Java 17 JDK | Compiles `.java` files into bytecode | ✅ Yes |
| IntelliJ IDEA (Community) | IDE for writing/editing code | Recommended |
| Git | Downloads source code from GitHub | ✅ Yes |
| Internet connection | Downloads dependencies | ✅ Yes |
| ~5 GB disk space | Source, build cache, output | ✅ Yes |

---

## 2 – Installing Java 17

### Windows

1. Go to <https://adoptium.net/temurin/releases/?version=17>.
2. Select **Windows**, **x64**, **JDK**, **.msi**.
3. Run the installer. Accept all defaults.
4. Open **Command Prompt** and type:
   ```
   java -version
   ```
   You should see something like `openjdk version "17.0.x"`.

### macOS

1. Go to <https://adoptium.net/temurin/releases/?version=17>.
2. Select **macOS**, your architecture (x64 or aarch64), **JDK**, **.pkg**.
3. Run the installer.
4. Open **Terminal** and verify:
   ```bash
   java -version
   ```

### Linux (Ubuntu / Debian)

```bash
sudo apt update
sudo apt install openjdk-17-jdk
java -version
```

---

## 3 – Installing IntelliJ IDEA

1. Go to <https://www.jetbrains.com/idea/download/>.
2. Download the **Community Edition** (free).
3. Run the installer; accept the defaults.
4. On first launch, choose **"New Project"** or **"Open"** to load the Eaglercraft source.

> **Tip:** IntelliJ will detect the Gradle build files automatically and configure the
> project for you.

---

## 4 – Installing Git

### Windows

Download from <https://git-scm.com/download/win> and run the installer.  
Use **Git Bash** (included) for all commands in this guide.

### macOS

```bash
xcode-select --install
```

### Linux

```bash
sudo apt install git
```

Verify:

```bash
git --version
# git version 2.x.x
```

---

## 5 – Basic Java Concepts

You don't need to become a Java developer – just understand the vocabulary.

| Term | Simple Explanation |
|------|--------------------|
| **Class** | A blueprint for an object (like a cookie cutter). `ItemTrident` is a class. |
| **Package** | A folder grouping related classes. `net.minecraft.item` maps to `net/minecraft/item/` on disk. |
| **Method** | A function inside a class. `register()` is a method. |
| **`extends`** | Means "this class inherits behaviour from another class". |
| **`static`** | Means the field/method belongs to the class itself, not to an instance. |

### File ↔ Package Mapping

If a file begins with `package net.minecraft.item;` it **must** live at
`src/main/java/net/minecraft/item/<FileName>.java`.

---

## 6 – Using Git / GitHub

### Clone a repository

```bash
git clone https://github.com/fixherbigger-sys/Eaglercraft-1.12.git
```

This creates a folder called `Eaglercraft-1.12` with all the source files.

### Check what has changed

```bash
git status
```

### Stage and commit your changes

```bash
git add .
git commit -m "Add 1.13+ item support"
```

### Push to GitHub (your fork)

```bash
git push origin main
```

---

## 7 – Understanding Gradle

Gradle is the build tool that compiles Java and packages assets.

### Running a Gradle task

```bash
# Linux / macOS
./gradlew <taskName>

# Windows (Command Prompt)
gradlew.bat <taskName>
```

### Common tasks

| Task | What it Does |
|------|-------------|
| `./gradlew build` | Compile all Java source |
| `./gradlew generateJavaScript` | Compile to JavaScript |
| `./gradlew clean` | Delete build artifacts |
| `./gradlew --refresh-dependencies` | Re-download all dependencies |

### Reading Build Output

- **`BUILD SUCCESSFUL`** – everything worked.
- **`BUILD FAILED`** – look for lines starting with `> Task :` that show `FAILED`.
  The error message just below those lines tells you what went wrong.

---

## 8 – Troubleshooting Common Errors

### "java: command not found" / "'java' is not recognized"

Java is installed but not on your PATH.

- **Windows:** Re-run the JDK installer and check the box *"Set JAVA_HOME"*.
- **Linux/macOS:** Add to `~/.bashrc` or `~/.zshrc`:
  ```bash
  export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
  export PATH=$JAVA_HOME/bin:$PATH
  ```
  Then run `source ~/.bashrc`.

### "Gradle build failed – Could not resolve dependencies"

Your internet connection was interrupted during the build. Run:

```bash
./gradlew build --refresh-dependencies
```

### "ClassNotFoundException: net.minecraft.init.ModItems"

You forgot to call `ModItems.register()` in the client init class.  
Re-read **Step 3** of [BUILD_GUIDE.md](BUILD_GUIDE.md).

### Items still show as eggs after compiling

The asset pack (`assets.epw`) was not recompiled.  
Re-run `./CompileEPK` (or `CompileEPK.bat` on Windows).

### White / missing texture in-game

- Check the PNG file exists at `assets/minecraft/textures/items/<name>.png`.
- Filenames are **case-sensitive** on Linux/macOS.
- Make sure the model JSON references the correct texture path.

---

## 9 – Where to Get Help

- **EaglercraftX Discord** – search Discord for "eaglercraft" to find active servers.
- **GitHub Issues** – open an issue in this repository describing your problem.
- **Stack Overflow** – for general Java/Gradle questions.
- **Minecraft Wiki** – <https://wiki.vg/> for protocol and item ID references.

---

*Good luck! Once your environment is set up, adding items becomes much faster.*
