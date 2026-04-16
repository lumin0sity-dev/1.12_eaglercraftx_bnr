# Eaglercraft 1.12 – Modern Item Source Modifications

This folder contains **Java source code modifications** and asset files to add items from Minecraft 1.13–1.21.1 to Eaglercraft 1.12.

## What's Included

### Example Items (Proof of Concept)

| Item | Version | Java Class | Status |
|------|---------|------------|--------|
| Blue Candle | 1.17 | `ItemBlueCandle.java` | ✅ Ready |
| Trident | 1.13 | `ItemTrident.java` | ✅ Ready |
| Copper Ingot | 1.17 | `ItemCopperIngot.java` | ✅ Ready |
| Netherite Sword | 1.16 | `ItemNetheriteSword.java` | ✅ Ready |
| Amethyst Shard | 1.17 | `ItemAmethystShard.java` | ✅ Ready |

### File Structure

```
src/
└── main/
    ├── java/net/minecraft/
    │   ├── item/
    │   │   ├── ItemBlueCandle.java
    │   │   ├── ItemTrident.java
    │   │   ├── ItemCopperIngot.java
    │   │   ├── ItemNetheriteSword.java
    │   │   └── ItemAmethystShard.java
    │   └── init/
    │       └── ModernItems.java
    └── resources/assets/minecraft/
        ├── textures/items/
        │   ├── blue_candle.png
        │   ├── trident.png
        │   ├── copper_ingot.png
        │   ├── netherite_sword.png
        │   └── amethyst_shard.png
        ├── models/item/
        │   ├── blue_candle.json
        │   ├── trident.json
        │   ├── copper_ingot.json
        │   ├── netherite_sword.json
        │   └── amethyst_shard.json
        └── lang/
            └── en_us.lang
```

## Quick Start

1. Read `SOURCE_SETUP.md` to clone and set up the Eaglercraft-1.12 source repository
2. Copy the `src/` folder contents into the source repository
3. Call `ModernItems.register()` from your mod's initialization
4. Follow `BUILD_INSTRUCTIONS.md` to compile the client
5. Use `ADDING_ITEMS_GUIDE.md` to add more items

## Important Notes

> ⚠️ **This repository provides SOURCE CODE modifications, not a compiled client.**
> You must compile the code yourself using Java 17 and TeaVM.
> Build time is approximately 10–30 minutes.

> ✅ **Textures** are sourced from the Classic Faithful 32x pack (included in this repository as `Classic Faithful 32x - 1.21.1.zip`).

## Documentation

| File | Description |
|------|-------------|
| `SOURCE_SETUP.md` | How to set up the Eaglercraft-1.12 source repository |
| `BUILD_INSTRUCTIONS.md` | Step-by-step compilation guide |
| `ADDING_ITEMS_GUIDE.md` | How to add additional 1.13+ items |
