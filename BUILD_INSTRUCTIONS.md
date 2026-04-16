# Building Eaglercraft 1.12 with Modern Items

## Prerequisites

- **Java 17** (required for TeaVM)
- **Git**
- **IntelliJ IDEA** or **Eclipse** (recommended)

## Step 1: Clone Source Repository

```bash
git clone https://github.com/fixherbigger-sys/Eaglercraft-1.12.git eaglercraft-source
cd eaglercraft-source
```

## Step 2: Copy Modified Files

Copy all files from this repository's `src/` folder into the source folder. See `SOURCE_SETUP.md` for the full directory mapping.

## Step 3: Import into IDE

- Open IntelliJ IDEA
- **File → Open** → Select `eaglercraft-source` folder
- Wait for Gradle/Maven to sync

## Step 4: Compile Assets

```bash
./CompileEPK
```

## Step 5: Compile WASM

```bash
./CompileWASM
```

## Step 6: Compile Runtime

```bash
./CompileEagRuntimeJS
```

## Step 7: Bundle Client

```bash
./MakeWASMClientBundle
```

## Output

Compiled client will be in the `javascript_dist/` folder.

## Deploy

Upload contents of `javascript_dist/` to your GitHub Pages repository.

## Notes

- Build time: approximately 10–30 minutes depending on your system
- Watch the console output for any errors during compilation
- If you encounter Java version errors, ensure `JAVA_HOME` points to Java 17
