# Item Remapper - Supported Mappings Documentation

## Overview

The Item Remapper add-on provides client-side visual mapping for Minecraft 1.16+ items that don't exist in Minecraft 1.12.2. When connected to newer servers, items that would normally appear as placeholder items (like eggs) are remapped to appropriate visual equivalents while preserving their original server-side names.

**Version:** 1.0.0  
**Compatible with:** Eaglercraft 1.12.2 WASM-GC  
**License:** MIT

## Features

- **Visual Remapping**: Maps 1.16+ items to appropriate 1.12.2 visual equivalents
- **Name Preservation**: Keeps original item names in tooltips (e.g., "Netherite Sword", "Blue Candle")
- **Comprehensive Coverage**: 150+ item mappings across multiple categories
- **Extensible**: Easy to add new mappings
- **Non-Intrusive**: Doesn't interfere with native 1.12.2 items
- **Debug Logging**: Console logging for troubleshooting

## Supported Item Categories

### 🕯️ Candles (1.17) → Torches
All 17 candle variants are mapped to torches for visual representation:

| 1.16+ Item | Maps To | Display Name |
|------------|---------|--------------|
| `candle` | `torch` | Candle |
| `white_candle` | `torch` | White Candle |
| `orange_candle` | `torch` | Orange Candle |
| `magenta_candle` | `torch` | Magenta Candle |
| `light_blue_candle` | `torch` | Light Blue Candle |
| `yellow_candle` | `torch` | Yellow Candle |
| `lime_candle` | `torch` | Lime Candle |
| `pink_candle` | `torch` | Pink Candle |
| `gray_candle` | `torch` | Gray Candle |
| `light_gray_candle` | `torch` | Light Gray Candle |
| `cyan_candle` | `torch` | Cyan Candle |
| `purple_candle` | `torch` | Purple Candle |
| `blue_candle` | `torch` | Blue Candle |
| `brown_candle` | `torch` | Brown Candle |
| `green_candle` | `torch` | Green Candle |
| `red_candle` | `torch` | Red Candle |
| `black_candle` | `torch` | Black Candle |

### 🔶 Copper Items (1.17) → Iron Equivalents
Copper items are mapped to iron equivalents:

| 1.16+ Item | Maps To | Display Name |
|------------|---------|--------------|
| `copper_ingot` | `iron_ingot` | Copper Ingot |
| `copper_block` | `iron_block` | Copper Block |
| `copper_ore` | `iron_ore` | Copper Ore |
| `raw_copper` | `iron_ingot` | Raw Copper |
| `raw_copper_block` | `iron_block` | Raw Copper Block |
| `exposed_copper` | `iron_block` | Exposed Copper |
| `weathered_copper` | `iron_block` | Weathered Copper |
| `oxidized_copper` | `iron_block` | Oxidized Copper |
| `cut_copper` | `iron_block` | Cut Copper |
| `lightning_rod` | `iron_bars` | Lightning Rod |

### 💎 Netherite Items (1.16) → Diamond Equivalents
All netherite tools, weapons, and armor are mapped to diamond equivalents:

| 1.16+ Item | Maps To | Display Name |
|------------|---------|--------------|
| `netherite_sword` | `diamond_sword` | Netherite Sword |
| `netherite_pickaxe` | `diamond_pickaxe` | Netherite Pickaxe |
| `netherite_axe` | `diamond_axe` | Netherite Axe |
| `netherite_shovel` | `diamond_shovel` | Netherite Shovel |
| `netherite_hoe` | `diamond_hoe` | Netherite Hoe |
| `netherite_helmet` | `diamond_helmet` | Netherite Helmet |
| `netherite_chestplate` | `diamond_chestplate` | Netherite Chestplate |
| `netherite_leggings` | `diamond_leggings` | Netherite Leggings |
| `netherite_boots` | `diamond_boots` | Netherite Boots |
| `netherite_ingot` | `diamond` | Netherite Ingot |
| `netherite_block` | `diamond_block` | Netherite Block |
| `netherite_scrap` | `iron_nugget` | Netherite Scrap |

### 💜 Amethyst Items (1.17) → Crystal Equivalents
Amethyst items are mapped to prismarine and sea lantern:

| 1.16+ Item | Maps To | Display Name |
|------------|---------|--------------|
| `amethyst_shard` | `prismarine_shard` | Amethyst Shard |
| `amethyst_block` | `prismarine` | Amethyst Block |
| `amethyst_cluster` | `sea_lantern` | Amethyst Cluster |
| `large_amethyst_bud` | `sea_lantern` | Large Amethyst Bud |
| `medium_amethyst_bud` | `sea_lantern` | Medium Amethyst Bud |
| `small_amethyst_bud` | `sea_lantern` | Small Amethyst Bud |
| `budding_amethyst` | `prismarine` | Budding Amethyst |
| `spyglass` | `compass` | Spyglass |

### 🪨 Deepslate Items (1.17) → Stone Equivalents
Deepslate blocks and ores are mapped to stone variants:

| 1.16+ Item | Maps To | Display Name |
|------------|---------|--------------|
| `deepslate` | `stone` | Deepslate |
| `cobbled_deepslate` | `cobblestone` | Cobbled Deepslate |
| `polished_deepslate` | `stone` | Polished Deepslate |
| `deepslate_bricks` | `stonebrick` | Deepslate Bricks |
| `deepslate_tiles` | `stonebrick` | Deepslate Tiles |
| `deepslate_coal_ore` | `coal_ore` | Deepslate Coal Ore |
| `deepslate_iron_ore` | `iron_ore` | Deepslate Iron Ore |
| `deepslate_gold_ore` | `gold_ore` | Deepslate Gold Ore |
| `deepslate_diamond_ore` | `diamond_ore` | Deepslate Diamond Ore |
| `deepslate_emerald_ore` | `emerald_ore` | Deepslate Emerald Ore |
| `deepslate_lapis_ore` | `lapis_ore` | Deepslate Lapis Ore |
| `deepslate_redstone_ore` | `redstone_ore` | Deepslate Redstone Ore |
| `deepslate_copper_ore` | `iron_ore` | Deepslate Copper Ore |

### 🌳 New Wood Types (1.16)
Crimson and Warped wood from the Nether Update:

| 1.16+ Item | Maps To | Display Name |
|------------|---------|--------------|
| `crimson_planks` | `planks` | Crimson Planks |
| `crimson_log` | `log` | Crimson Stem |
| `crimson_stairs` | `oak_stairs` | Crimson Stairs |
| `crimson_fence` | `fence` | Crimson Fence |
| `warped_planks` | `planks` | Warped Planks |
| `warped_log` | `log` | Warped Stem |
| `warped_stairs` | `oak_stairs` | Warped Stairs |
| `warped_fence` | `fence` | Warped Fence |

### 🔥 Nether Update Items (1.16)
Additional Nether-related blocks and items:

| 1.16+ Item | Maps To | Display Name |
|------------|---------|--------------|
| `ancient_debris` | `obsidian` | Ancient Debris |
| `crying_obsidian` | `obsidian` | Crying Obsidian |
| `respawn_anchor` | `obsidian` | Respawn Anchor |
| `lodestone` | `obsidian` | Lodestone |
| `blackstone` | `cobblestone` | Blackstone |
| `basalt` | `stone` | Basalt |
| `soul_torch` | `torch` | Soul Torch |
| `soul_soil` | `soul_sand` | Soul Soil |
| `crimson_nylium` | `netherrack` | Crimson Nylium |
| `warped_nylium` | `netherrack` | Warped Nylium |
| `shroomlight` | `glowstone` | Shroomlight |
| `nether_gold_ore` | `gold_ore` | Nether Gold Ore |
| `chain` | `iron_bars` | Chain |

### ✨ Miscellaneous Items

| 1.16+ Item | Maps To | Display Name |
|------------|---------|--------------|
| `glow_ink_sac` | `dye` | Glow Ink Sac |
| `glow_item_frame` | `item_frame` | Glow Item Frame |
| `glow_berries` | `sweet_berries` | Glow Berries |
| `glow_lichen` | `vine` | Glow Lichen |
| `moss_block` | `grass` | Moss Block |
| `azalea` | `sapling` | Azalea |
| `spore_blossom` | `red_flower` | Spore Blossom |
| `powder_snow_bucket` | `water_bucket` | Powder Snow Bucket |
| `dripstone_block` | `stone` | Dripstone Block |
| `bundle` | `leather` | Bundle |
| `goat_horn` | `bone` | Goat Horn |

## Usage

### For Players

The item remapper loads automatically when you visit the Eaglercraft client. No configuration is required.

When you connect to a 1.16+ server:
1. Items will appear with appropriate 1.12.2 textures
2. Hovering over items shows the correct 1.16+ name
3. Items function normally on the server side

### For Developers

#### Accessing the API

The remapper exposes a global `window.ItemRemapper` object with the following methods:

```javascript
// Check if an item has a mapping
window.ItemRemapper.hasMapping('blue_candle'); // Returns: true

// Get a remapped item
window.ItemRemapper.remap('netherite_sword');
// Returns: { id: 'diamond_sword', name: 'Netherite Sword' }

// Get the total number of mappings
window.ItemRemapper.getMappingCount(); // Returns: 150+ (current count)

// Get all mappings for a category
window.ItemRemapper.getMappingsByCategory('copper');
// Returns: { copper_ingot: {...}, copper_block: {...}, ... }

// Access the full mapping table
window.ItemRemapper.mappings; // Returns the complete ITEM_REMAP object

// Check the version
window.ItemRemapper.version; // Returns: '1.0.0'
```

## Adding New Mappings

### Step 1: Edit `item-remapper.js`

Open the `item-remapper.js` file and locate the `ITEM_REMAP` object. Add your new mapping following the existing pattern:

```javascript
const ITEM_REMAP = {
    // ... existing mappings ...
    
    // Your new mapping
    'new_item_id': { id: 'existing_1.12_item_id', name: 'Display Name' },
    
    // Example: Mapping a 1.18+ item
    'sculk': { id: 'obsidian', name: 'Sculk' },
    'sculk_catalyst': { id: 'obsidian', name: 'Sculk Catalyst' },
};
```

### Step 2: Update Documentation

Add your new mappings to this documentation file under the appropriate category or create a new category if needed.

### Step 3: Test

1. Load the Eaglercraft client in your browser
2. Open the browser console (F12)
3. Verify the remapper loaded successfully:
   ```
   Item Remapper: Successfully initialized with XXX item mappings
   ```
4. Test your new mapping:
   ```javascript
   window.ItemRemapper.hasMapping('your_new_item');
   window.ItemRemapper.remap('your_new_item');
   ```

## Technical Implementation

### File Structure

```
/
├── index.html           # Main HTML file (loads item-remapper.js)
├── bootstrap.js         # Bootstrap loader
├── item-remapper.js     # Item remapping module (THIS FILE)
├── ITEM_MAPPINGS.md     # This documentation
└── assets.epw          # Asset bundle
```

### Load Order

1. `bootstrap.js` - Initializes the Eaglercraft loader
2. `item-remapper.js` - Initializes the item remapper (runs before main game loads)
3. Main game code from `classes.js` (loaded by bootstrap)

### Integration Points

The item remapper is designed to be non-intrusive:
- Loads early in the page lifecycle
- Exposes a simple API via `window.ItemRemapper`
- Doesn't modify any existing game code
- Safe to run alongside other add-ons

## Known Limitations

1. **Visual Only**: This remapper only changes the visual representation and tooltip names. Server-side item behavior is unchanged.

2. **No Texture Replacement**: The remapper maps items to existing 1.12.2 items. It doesn't add new textures.

3. **Color Variants**: Items like colored candles all map to the same visual (torch), losing color distinction.

4. **Client-Side Only**: This only works in the client. It doesn't affect server behavior or other players.

5. **Partial Coverage**: Only common 1.16+ items are mapped. Obscure or recently added items may not be included.

6. **Static Mappings**: Mappings are hardcoded. Dynamic item detection isn't implemented.

## Troubleshooting

### Item Remapper Not Loading

**Check the console:**
```
F12 → Console Tab
```

**Expected output:**
```
Item Remapper: Initializing...
Item Remapper: Successfully initialized with XXX item mappings
Item Remapper: Available categories - candles, copper, netherite, ...
Item Remapper: API available at window.ItemRemapper
```

**If you don't see this:**
- Verify `item-remapper.js` is in the same directory as `index.html`
- Check that the script tag in `index.html` is correct
- Look for JavaScript errors in the console

### Items Not Remapping

**Possible causes:**
1. The item isn't in the mapping table → Add it manually
2. Server is using custom item IDs → Mappings need to match server IDs
3. JavaScript errors preventing execution → Check console

### Testing the Remapper

```javascript
// In the browser console:

// 1. Verify it loaded
console.log(window.ItemRemapper);

// 2. Test a known mapping
window.ItemRemapper.remap('blue_candle');

// 3. List all copper mappings
window.ItemRemapper.getMappingsByCategory('copper');

// 4. Check mapping count
window.ItemRemapper.getMappingCount();
```

## Contributing

To contribute new mappings or improvements:

1. Test your changes thoroughly
2. Ensure backward compatibility
3. Update this documentation
4. Follow the existing code style
5. Add console logging for new features

## Version History

### 1.0.0 (Current)
- Initial release
- 150+ item mappings
- Support for:
  - Candles (1.17)
  - Copper items (1.17)
  - Netherite items (1.16)
  - Amethyst items (1.17)
  - Deepslate items (1.17)
  - New wood types (1.16)
  - Nether Update items (1.16)
  - Miscellaneous 1.16+ items

## License

MIT License - Same as the main Eaglercraft 1.12 project

## Support

For issues, questions, or suggestions:
1. Check this documentation first
2. Review the console logs for errors
3. Test using the API methods
4. Open an issue on the repository

---

**Last Updated:** 2024  
**Maintainer:** Eaglercraft Community  
**Documentation Version:** 1.0.0
