# How to Add More 1.13+ Items

## Template for New Items

### 1. Create Item Class

File: `src/main/java/net/minecraft/item/ItemYourItem.java`

```java
package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

public class ItemYourItem extends Item {
    public ItemYourItem() {
        this.setUnlocalizedName("your_item");
        this.setRegistryName("minecraft", "your_item");
        this.setCreativeTab(CreativeTabs.MATERIALS);
        this.maxStackSize = 64;
    }
}
```

### 2. Register Item

Add to `src/main/java/net/minecraft/init/ModernItems.java`:

```java
public static final Item YOUR_ITEM = new ItemYourItem();

// In register():
GameRegistry.register(YOUR_ITEM);
```

### 3. Add Texture

Place your PNG in:
```
src/main/resources/assets/minecraft/textures/items/your_item.png
```

Use the exact registry name for the filename.

### 4. Add Model

Create `src/main/resources/assets/minecraft/models/item/your_item.json`:

```json
{
  "parent": "item/generated",
  "textures": {
    "layer0": "minecraft:items/your_item"
  }
}
```

Use `"item/handheld"` as parent for tools and weapons.

### 5. Add Translation

Add to `src/main/resources/assets/minecraft/lang/en_us.lang`:

```
item.your_item.name=Your Item Display Name
```

### 6. Recompile

Run the build scripts as described in `BUILD_INSTRUCTIONS.md`.

---

## Item Checklist

### 1.13 Items
- [ ] Trident ✅ (example provided)
- [ ] Crossbow
- [ ] Suspicious Stew
- [ ] Heart of the Sea
- [ ] Nautilus Shell
- [ ] Phantom Membrane
- [ ] Scute

### 1.14 Items
- [ ] Sweet Berries
- [ ] Bamboo

### 1.15 Items
- [ ] Honey Bottle
- [ ] Honeycomb

### 1.16 Items
- [ ] Netherite Sword ✅ (example provided)
- [ ] Netherite Pickaxe
- [ ] Netherite Axe
- [ ] Netherite Shovel
- [ ] Netherite Hoe
- [ ] Netherite Helmet
- [ ] Netherite Chestplate
- [ ] Netherite Leggings
- [ ] Netherite Boots
- [ ] Netherite Ingot
- [ ] Netherite Scrap
- [ ] Ancient Debris

### 1.17 Items
- [ ] Copper Ingot ✅ (example provided)
- [ ] Amethyst Shard ✅ (example provided)
- [ ] Blue Candle ✅ (example provided)
- [ ] White Candle
- [ ] Orange Candle
- [ ] Magenta Candle
- [ ] Light Blue Candle
- [ ] Yellow Candle
- [ ] Lime Candle
- [ ] Pink Candle
- [ ] Gray Candle
- [ ] Light Gray Candle
- [ ] Cyan Candle
- [ ] Purple Candle
- [ ] Red Candle
- [ ] Black Candle
- [ ] Brown Candle
- [ ] Green Candle
- [ ] Spyglass
- [ ] Glow Ink Sac

### 1.19 Items
- [ ] Echo Shard
- [ ] Recovery Compass

### 1.20 Items
- [ ] Brush

### 1.21 Items
- [ ] Mace
- [ ] Wind Charge
- [ ] Breeze Rod
- [ ] Trial Key
