# Build Guide – Eaglercraft 1.12 with 1.13+ Item Support

This guide walks you through compiling the Eaglercraft 1.12 client after applying the
source modifications in this repository.

---

## Prerequisites

| Tool | Minimum Version | Download |
|------|----------------|---------|
| Java JDK | 17 | <https://adoptium.net/> |
| Git | 2.x | <https://git-scm.com/> |
| Gradle (bundled) | — | included in the source repo |

Verify Java is installed:

```bash
java -version
# Expected: openjdk version "17.x.x" ...
```

---

## Step 1 – Get the Full Source

```bash
git clone https://github.com/fixherbigger-sys/Eaglercraft-1.12.git
cd Eaglercraft-1.12
```

---

## Step 2 – Apply These Modifications

Copy every file from this repo's `src/` directory into the cloned source at the same
relative path:

```bash
# From the root of THIS repository:
cp -r src/ /path/to/Eaglercraft-1.12/

# Example on Windows (PowerShell):
# Copy-Item -Recurse src\ C:\Dev\Eaglercraft-1.12\
```

---

## Step 3 – Register Items in the Client Init

Open `src/main/java/net/minecraft/init/Items.java` (or equivalent bootstrap class) inside
`Eaglercraft-1.12` and add the following **at the bottom of the static initialisation
block**:

```java
// 1.13+ items
ModItems.register();
```

Import `net.minecraft.init.ModItems` at the top of the file if needed.

---

## Step 4 – Compile the Asset Pack

```bash
# Linux / macOS
./CompileEPK

# Windows
CompileEPK.bat
```

This bundles textures, models, and language files into `assets.epw`.

---

## Step 5 – Compile the Game

### WASM-GC version (recommended)

```bash
# Compile TeaVM → WASM
./CompileWASM

# Build the EagRuntime
./CompileEagRuntimeJS

# Bundle client
./MakeWASMClientBundle
```

Output is written to `javascript_dist/`.

### JavaScript version

```bash
./gradlew generateJavaScript
./CompileEagRuntimeJS
```

Output is written to `javascript/`.

---

## Step 6 – Deploy

Copy the compiled output to your web server or GitHub Pages repository:

```bash
cp javascript_dist/* /path/to/your/site/
```

Update `index.html` if the asset or script filenames changed.

---

## Troubleshooting

| Symptom | Likely Cause | Fix |
|---------|-------------|-----|
| `java: command not found` | Java not on PATH | Re-install JDK, set `JAVA_HOME` |
| `Gradle build FAILED` | Dependency download failed | Check internet; run `./gradlew --refresh-dependencies` |
| `ClassNotFoundException: ModItems` | Registration step skipped | Re-read Step 3 |
| Items still show as eggs | Asset pack not recompiled | Re-run Step 4 |
| White/missing texture | PNG not in correct path | Verify `textures/items/<name>.png` |

---

## Further Reading

- [ADDING_MORE_ITEMS.md](ADDING_MORE_ITEMS.md) – add your own 1.13+ items
- [BEGINNER_SETUP_GUIDE.md](BEGINNER_SETUP_GUIDE.md) – environment setup for beginners
