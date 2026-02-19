# Setting Up the Eaglercraft 1.12 Source Repository

## Prerequisites

- **Java 17** (required for TeaVM compilation)
- **Git**
- **IntelliJ IDEA** or **Eclipse** (recommended)

## Step 1: Clone the Source Repository

```bash
git clone https://github.com/fixherbigger-sys/Eaglercraft-1.12.git eaglercraft-source
cd eaglercraft-source
```

## Step 2: Copy Modified Files

Copy all files from this repository's `src/` folder into the corresponding location inside `eaglercraft-source/`:

```
eaglercraft-source/
└── src/
    └── main/
        ├── java/
        │   └── net/
        │       └── minecraft/
        │           ├── item/          ← copy item class files here
        │           └── init/          ← copy ModernItems.java here
        └── resources/
            └── assets/
                └── minecraft/
                    ├── textures/items/  ← copy PNG textures here
                    ├── models/item/     ← copy JSON models here
                    └── lang/            ← merge en_us.lang entries here
```

## Step 3: Register Items in Main Mod Class

Find the mod initialization class (typically `src/main/java/net/minecraft/init/Items.java` or your mod's main class) and call `ModernItems.register()` during the item registration phase:

```java
// In your mod's init or Items registration:
ModernItems.register();
```

## Step 4: Import into IDE

- Open **IntelliJ IDEA**
- **File → Open** → Select `eaglercraft-source` folder
- Wait for Gradle/Maven to sync dependencies

## Project Structure Overview

```
eaglercraft-source/
├── src/main/java/         Java source files
├── src/main/resources/    Assets (textures, models, lang)
├── javascript/            TeaVM output destination
├── CompileEPK             Asset compilation script
├── CompileWASM            WASM compilation script
├── CompileEagRuntimeJS    Runtime JS compilation script
└── MakeWASMClientBundle   Final bundle script
```
