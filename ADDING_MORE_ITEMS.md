# Adding More 1.13+ Items

Follow these steps each time you want to add a new Minecraft 1.13–1.21.1 item to the
Eaglercraft 1.12 client.

---

## Step 1 – Create the Item Class

Copy the appropriate template below into
`src/main/java/net/minecraft/item/Item<YourName>.java`.

### Template A – Simple material / decorative item

```java
package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

public class Item<YourName> extends Item {

    public Item<YourName>() {
        this.setUnlocalizedName("<registry_name>");
        this.setRegistryName("minecraft:<registry_name>");
        this.setCreativeTab(CreativeTabs.MATERIALS); // change tab as needed
        this.setMaxStackSize(64);
    }
}
```

### Template B – Weapon / tool (extends ItemSword or ItemTool)

```java
package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;
import net.minecraft.item.Item.ToolMaterial;

public class Item<YourName> extends ItemSword {

    public Item<YourName>() {
        super(ToolMaterial.DIAMOND); // adjust material
        this.setUnlocalizedName("<registry_name>");
        this.setRegistryName("minecraft:<registry_name>");
        this.setCreativeTab(CreativeTabs.COMBAT);
        this.setMaxStackSize(1);
        this.setMaxDamage(250); // set durability
    }
}
```

Replace `<YourName>` with a PascalCase name (e.g. `Spyglass`) and `<registry_name>` with
the lowercase snake_case Minecraft registry name (e.g. `spyglass`).

---

## Step 2 – Register the Item

Open `src/main/java/net/minecraft/init/ModItems.java` and add:

```java
// At the top, with the other field declarations:
public static final Item YOUR_ITEM = new ItemYourName();

// Inside the register() method:
registerItem(YOUR_ITEM);
```

---

## Step 3 – Add a Texture

Place a 16×16 (or 32×32 for HD packs) PNG in:

```
src/main/resources/assets/minecraft/textures/items/<registry_name>.png
```

You can extract textures from the **Classic Faithful 32x - 1.21.1.zip** file in this
repository:

1. Open the zip (e.g. with 7-Zip or `unzip`).
2. Navigate to `assets/minecraft/textures/item/`.
3. Copy `<registry_name>.png` to the path shown above.

---

## Step 4 – Add an Item Model

Create `src/main/resources/assets/minecraft/models/item/<registry_name>.json`:

```json
{
  "parent": "item/generated",
  "textures": {
    "layer0": "minecraft:items/<registry_name>"
  }
}
```

Use `"parent": "item/handheld"` for held tools and weapons.

---

## Step 5 – Add a Translation

Append to `src/main/resources/assets/minecraft/lang/en_us.lang`:

```
item.<registry_name>.name=<Display Name>
```

---

## Step 6 – Rebuild

Re-run the full build pipeline described in [BUILD_GUIDE.md](BUILD_GUIDE.md).

---

## Item ID Reference – Selected 1.13–1.21.1 Items

| Registry Name | Display Name | Version Added |
|---------------|-------------|---------------|
| `trident` | Trident | 1.13 |
| `crossbow` | Crossbow | 1.14 |
| `netherite_sword` | Netherite Sword | 1.16 |
| `netherite_pickaxe` | Netherite Pickaxe | 1.16 |
| `netherite_ingot` | Netherite Ingot | 1.16 |
| `netherite_scrap` | Netherite Scrap | 1.16 |
| `spyglass` | Spyglass | 1.17 |
| `amethyst_shard` | Amethyst Shard | 1.17 |
| `copper_ingot` | Copper Ingot | 1.17 |
| `blue_candle` | Blue Candle | 1.17 |
| `glow_berries` | Glow Berries | 1.17 |
| `recovery_compass` | Recovery Compass | 1.19 |
| `echo_shard` | Echo Shard | 1.19 |
| `brush` | Brush | 1.20 |
| `mace` | Mace | 1.21 |

---

## Common Pitfalls

- **Registry name must match exactly** – Minecraft uses lowercase snake_case; a mismatch
  means the item won't be found.
- **Texture path is case-sensitive** on Linux/macOS – `Trident.png` ≠ `trident.png`.
- **Rebuild assets after every texture/model change** – the `.epw` asset pack is compiled
  separately from the Java code.
- **Stack size of 1 for tools and weapons** – forgetting this causes visual glitches in
  the inventory.
