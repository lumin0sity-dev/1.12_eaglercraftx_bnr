# Source Code Modifications – 1.13+ Item Support

This directory contains Java source modifications for the Eaglercraft 1.12 client that add
recognition of select items from Minecraft 1.13–1.21.1.  These files are **not** compiled on
their own; they must be merged into the full Eaglercraft 1.12 source before building.

---

## What's Included

| File | Description |
|------|-------------|
| `src/main/java/net/minecraft/item/ItemBlueCandle.java` | Blue Candle (1.17) |
| `src/main/java/net/minecraft/item/ItemTrident.java` | Trident (1.13) |
| `src/main/java/net/minecraft/item/ItemCopperIngot.java` | Copper Ingot (1.17) |
| `src/main/java/net/minecraft/item/ItemNetheriteSword.java` | Netherite Sword (1.16) |
| `src/main/java/net/minecraft/item/ItemAmethystShard.java` | Amethyst Shard (1.17) |
| `src/main/java/net/minecraft/init/ModItems.java` | Item registration |
| `src/main/resources/assets/minecraft/models/item/*.json` | Item models |
| `src/main/resources/assets/minecraft/textures/items/*.png` | Placeholder textures |
| `src/main/resources/assets/minecraft/lang/en_us.lang` | English translations |

---

## Quick Start

1. Read **[BEGINNER_SETUP_GUIDE.md](BEGINNER_SETUP_GUIDE.md)** if you have no Java experience.
2. Follow **[BUILD_GUIDE.md](BUILD_GUIDE.md)** to compile a working client.
3. See **[ADDING_MORE_ITEMS.md](ADDING_MORE_ITEMS.md)** to extend support to additional items.

---

## How It Works

When an Eaglercraft 1.12 client receives an item packet whose registry name it doesn't
recognise (e.g. `minecraft:trident`) it falls back to rendering a placeholder (usually a
Spawn Egg).  By registering the new item classes through `ModItems.register()` the client
maps the registry name to a proper class, chooses the correct model JSON, and renders the
right texture.

---

## License

These modifications are released under the same
[MIT License](https://opensource.org/licenses/MIT) as the parent project.
