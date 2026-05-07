# How to Add New Items to Eaglercraft 1.12

## Complete Beginner's Guide

This tutorial walks you through adding a custom item from scratch.
Use the 5 example items in the `items/` folder as templates.

**Estimated time per item:** 15–30 minutes once you've done it once.

---

## Overview

Adding an item requires changes in 5 places:

| # | What | Where |
|---|------|-------|
| 1 | Java class | `src/main/java/net/minecraft/item/ItemYourItem.java` |
| 2 | Registration | `src/main/java/net/minecraft/init/ItemRegistry.java` |
| 3 | Texture | `src/main/resources/assets/minecraft/textures/items/your_item.png` |
| 4 | Model JSON | `src/main/resources/assets/minecraft/models/item/your_item.json` |
| 5 | Translation | `src/main/resources/assets/minecraft/lang/en_us.lang` |

---

## Step 1: Create the Item Class

Create a new file: `src/main/java/net/minecraft/item/ItemYourItem.java`

Replace `YourItem` with a descriptive name (no spaces, capitalize each word).

### Template for a Simple Item (ingot, shard, etc.)

```java
package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

/**
 * My New Item - brief description of what it is/does
 */
public class ItemYourItem extends Item {

    public ItemYourItem() {
        // Internal name - use lowercase with underscores
        this.setUnlocalizedName("your_item");

        // Registry name - must be UNIQUE, use same as unlocalizedName
        this.setRegistryName("your_item");

        // Pick the creative tab where it should appear:
        // CreativeTabs.BUILDING_BLOCKS  - blocks for building
        // CreativeTabs.DECORATIONS      - decorative items
        // CreativeTabs.REDSTONE         - redstone components
        // CreativeTabs.TRANSPORTATION   - minecarts, boats
        // CreativeTabs.MISC             - miscellaneous
        // CreativeTabs.FOOD             - food items
        // CreativeTabs.TOOLS            - tools like pickaxes
        // CreativeTabs.COMBAT           - weapons and armor
        // CreativeTabs.BREWING          - potions and brewing
        // CreativeTabs.MATERIALS        - crafting materials
        this.setCreativeTab(CreativeTabs.MATERIALS);

        // Stack size: 64 for most items, 1 for tools/weapons
        this.setMaxStackSize(64);
    }
}
```

### Template for a Tool/Weapon (sword, axe, etc.)

```java
package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

/**
 * My New Sword
 */
public class ItemYourSword extends ItemSword {

    public ItemYourSword() {
        // Use ToolMaterial.DIAMOND as base if no better option exists
        // Available materials: WOOD, STONE, IRON, GOLD, DIAMOND
        super(ToolMaterial.DIAMOND);

        this.setUnlocalizedName("your_sword");
        this.setRegistryName("your_sword");
        this.setCreativeTab(CreativeTabs.COMBAT);

        // Stack size 1 for weapons (they have durability)
        this.setMaxStackSize(1);

        // Set custom durability (optional - overrides the material's default)
        // Diamond sword = 1561, Netherite = 2031, Iron = 250
        this.setMaxDamage(1561);
    }
}
```

### Template for a Food Item

```java
package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

/**
 * My New Food Item
 */
public class ItemYourFood extends ItemFood {

    public ItemYourFood() {
        // Parameters: (hungerRestored, saturationModifier, isWolfFood)
        // hungerRestored: how many hunger points restored (2 = 1 drumstick icon)
        // saturationModifier: how long the hunger lasts (0.6 is average)
        // isWolfFood: can wolves eat this?
        super(4, 0.6f, false);

        this.setUnlocalizedName("your_food");
        this.setRegistryName("your_food");
        this.setCreativeTab(CreativeTabs.FOOD);
        this.setMaxStackSize(64);
    }
}
```

---

## Step 2: Register the Item

Open `ItemRegistry.java` (in `source/ItemRegistry.java` or `src/main/java/net/minecraft/init/ItemRegistry.java`).

### 2a. Add the Item Declaration

Find the section that says `// ITEM DECLARATIONS` and add your item:

```java
/** Your Item - brief description */
public static final Item YOUR_ITEM = new ItemYourItem();
```

### 2b. Add to registerItems()

Find the `registerItems()` method and add:

```java
registerItem(YOUR_ITEM);
```

**Example of the full section after adding:**

```java
// In the declarations section:
public static final Item BLUE_CANDLE = new ItemBlueCandle();
public static final Item TRIDENT = new ItemTrident();
public static final Item YOUR_ITEM = new ItemYourItem();  // <-- add here

// In registerItems():
public static void registerItems() {
    registerItem(BLUE_CANDLE);
    registerItem(TRIDENT);
    registerItem(YOUR_ITEM);  // <-- add here
}
```

---

## Step 3: Add the Texture

Place your item texture PNG file at:
```
src/main/resources/assets/minecraft/textures/items/your_item.png
```

### Requirements
- **Format:** PNG (not JPG, not GIF)
- **Size:** 16×16 pixels (standard Minecraft resolution)
- **Name:** Must exactly match what you put in the model JSON (case-sensitive)

### Where to get textures
1. **Extract from Minecraft** — Open the Minecraft `.jar` file as a zip, navigate to `assets/minecraft/textures/item/`
2. **Classic Faithful pack** — The repository root has `Classic Faithful 32x - 1.21.1.zip`
3. **Create your own** — Use any pixel art editor (Aseprite, GIMP, Paint.NET)

---

## Step 4: Create the Model JSON

Create a new file at:
```
src/main/resources/assets/minecraft/models/item/your_item.json
```

### For a flat 2D item (ingot, shard, food, etc.)

```json
{
  "parent": "item/generated",
  "textures": {
    "layer0": "minecraft:items/your_item"
  }
}
```

### For a held tool/weapon (sword, pickaxe, etc.)

```json
{
  "parent": "item/handheld",
  "textures": {
    "layer0": "minecraft:items/your_item"
  }
}
```

> **Key:** `"layer0": "minecraft:items/your_item"` — the part after `items/` must
> match your texture filename **without** the `.png` extension.

---

## Step 5: Add the Translation

Open `src/main/resources/assets/minecraft/lang/en_us.lang` and add:

```
item.your_item.name=Your Item Display Name
```

The `your_item` part must match what you passed to `setUnlocalizedName()` in your Java class.

**Examples:**
```
item.your_item.name=My Awesome Item
item.copper_sword.name=Copper Sword
item.ruby_gem.name=Ruby
```

---

## Step 6: Rebuild

Run the build scripts again (see `BUILDING.md` for full details):

```bash
# Mac/Linux
./CompileEPK && ./CompileWASM && ./CompileEagRuntimeJS && ./MakeWASMClientBundle

# Windows (run each separately)
CompileEPK.bat
CompileWASM.bat
CompileEagRuntimeJS.bat
MakeWASMClientBundle.bat
```

---

## Step 7: Test Your Item

In-game, use the `/give` command:
```
/give @s your_item
```
Or find it in the Creative inventory tab you specified.

---

## 🔧 Troubleshooting

### Item appears as a purple/black checkerboard
**Cause:** Texture file is missing or named incorrectly.
**Fix:** Check that the texture file exists and the name in the JSON matches exactly.

### Item shows as "item.your_item.name" text
**Cause:** Translation entry is missing or the unlocalized name doesn't match.
**Fix:** Check `en_us.lang` and that `setUnlocalizedName()` value matches the lang key.

### Build error: `cannot find symbol: ItemYourItem`
**Cause:** The Java file isn't in the right location or has a typo in the class name.
**Fix:** Make sure the filename is `ItemYourItem.java` and the class inside is `public class ItemYourItem`.

### Item doesn't appear in Creative
**Cause:** `setCreativeTab()` wasn't called, or `registerItems()` isn't being called at startup.
**Fix:** Check Step 2 and make sure `ItemRegistry.registerItems()` is called during game init.

---

## 💡 Advanced: Adding Crafting Recipes

To make your item craftable, add a recipe in your `registerItems()` method or a dedicated registration class.

### Shapeless Recipe (ingredients in any order)

```java
GameRegistry.addShapelessRecipe(
    new ItemStack(ItemRegistry.YOUR_ITEM),      // output: 1x your item
    new ItemStack(Items.IRON_INGOT),            // ingredient 1
    new ItemStack(Items.DIAMOND)                // ingredient 2
);
```

### Shaped Recipe (ingredients in specific pattern)

```java
GameRegistry.addRecipe(
    new ItemStack(ItemRegistry.YOUR_ITEM),
    "XXX",    // row 1: 3 iron ingots
    " X ",    // row 2: 1 iron ingot in center
    " X ",    // row 3: 1 iron ingot in center
    'X', new ItemStack(Items.IRON_INGOT)
);
```

---

## 📚 Reference: Creative Tabs

| Tab Constant | In-game Tab Name |
|-------------|-----------------|
| `CreativeTabs.BUILDING_BLOCKS` | Building Blocks |
| `CreativeTabs.DECORATIONS` | Decoration Blocks |
| `CreativeTabs.REDSTONE` | Redstone |
| `CreativeTabs.TRANSPORTATION` | Transportation |
| `CreativeTabs.MISC` | Miscellaneous |
| `CreativeTabs.FOOD` | Food |
| `CreativeTabs.TOOLS` | Tools |
| `CreativeTabs.COMBAT` | Combat |
| `CreativeTabs.BREWING` | Brewing |
| `CreativeTabs.MATERIALS` | Materials |

## 📚 Reference: Tool Materials

| Material | Attack Damage | Durability | Harvest Level |
|----------|--------------|-----------|--------------|
| `ToolMaterial.WOOD` | +1 | 59 | 0 |
| `ToolMaterial.STONE` | +2 | 131 | 1 |
| `ToolMaterial.IRON` | +3 | 250 | 2 |
| `ToolMaterial.GOLD` | +3 | 32 | 0 |
| `ToolMaterial.DIAMOND` | +4 | 1561 | 3 |
