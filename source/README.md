# Eaglercraft 1.12 Source Modifications
## Adding 1.13–1.21.1 Item Support

This directory contains source code modifications to add modern Minecraft items to Eaglercraft 1.12.

---

## ⚠️ Beginner Warning

This is **ADVANCED modification** requiring:
- Basic Java programming knowledge
- Comfort with the command line
- Patience and debugging skills
- Several hours to days of work

If you've never programmed before, expect a steep learning curve!
Consider joining an Eaglercraft community Discord for help.

---

## 📋 What's Included

| File/Folder | Purpose |
|------------|---------|
| `items/` | Java source files for each new item |
| `resources/` | Assets (models, textures, translations) in proper folder structure |
| `ItemRegistry.java` | Where items are declared and registered |
| `README.md` | This file |
| `BUILDING.md` | How to compile the modified client |
| `ADDING_ITEMS.md` | Tutorial for adding even more items |

### Example Items Included

| Item | Java Class | Minecraft Version Added |
|------|-----------|------------------------|
| Blue Candle | `ItemBlueCandle.java` | 1.17 |
| Trident | `ItemTrident.java` | 1.13 |
| Copper Ingot | `ItemCopperIngot.java` | 1.17 |
| Netherite Sword | `ItemNetheriteSword.java` | 1.16 |
| Amethyst Shard | `ItemAmethystShard.java` | 1.17 |

---

## 📁 Full Directory Structure

```
source/
├── items/                                      # Java item class files
│   ├── ItemBlueCandle.java
│   ├── ItemTrident.java
│   ├── ItemCopperIngot.java
│   ├── ItemNetheriteSword.java
│   └── ItemAmethystShard.java
├── resources/
│   └── assets/
│       └── minecraft/
│           ├── lang/
│           │   └── en_us.lang                  # Item display names
│           ├── models/
│           │   └── item/                       # JSON model definitions
│           │       ├── blue_candle.json
│           │       ├── trident.json
│           │       ├── copper_ingot.json
│           │       ├── netherite_sword.json
│           │       └── amethyst_shard.json
│           └── textures/
│               └── items/                      # PNG texture files (add yours here)
│                   └── README.md
├── ItemRegistry.java                           # Item registration code
├── README.md                                   # This file
├── BUILDING.md                                 # Compilation guide
└── ADDING_ITEMS.md                             # Tutorial for more items
```

---

## ✅ What These Modifications Provide

- ✅ Item class definitions (Java)
- ✅ Item registration code
- ✅ JSON model files
- ✅ Language/translation entries
- ✅ Basic properties (stack size, durability, creative tab)
- ✅ Complete documentation for beginners

## ❌ What's NOT Included (Advanced Features)

- ❌ Trident throwing mechanics
- ❌ Crafting recipes
- ❌ Special right-click behaviors
- ❌ Sound effects
- ❌ Enchantment compatibility code

These require deeper source code changes. See `ADDING_ITEMS.md` for guidance.

---

## 🚀 Quick Start

1. **Read `BUILDING.md`** — Detailed compilation instructions from scratch
2. **Get the textures** — See `resources/assets/minecraft/textures/items/README.md`
3. **Build the client** — Follow the steps in `BUILDING.md`
4. **Test the items** — Use `/give @s blue_candle` in-game
5. **Add more items** — Follow the tutorial in `ADDING_ITEMS.md`

---

## 🆘 Getting Help

- Eaglercraft Discord communities
- Minecraft modding forums (Forge/Fabric)
- GitHub Issues on this repository
- Reddit: r/Eaglercraft

---

## ⚡ Next Steps After Your First Build

1. Verify the 5 example items appear in Creative mode
2. Test that textures display correctly
3. Add more items using `ADDING_ITEMS.md`
4. Add crafting recipes (advanced — requires `GameRegistry.addRecipe()`)
5. Add block variants (candles that can be placed, etc.)

Good luck! 🎮
