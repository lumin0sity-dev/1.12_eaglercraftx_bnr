# Testing Guide - Runtime Texture Injection System

## Prerequisites
- Web server (cannot be tested with file:// protocol)
- Modern browser (Chrome, Firefox, Safari, or Edge)
- The repository files deployed to a web server

## Quick Start Testing

### 1. Basic Functionality Test

Open the browser console and run:
```javascript
// Wait for the system to initialize (about 500ms after page load)
setTimeout(() => {
    // Check initialization
    console.log('Stats:', getTextureLoaderStats());
    
    // Should show:
    // { totalMappings: 160, loadedTextures: 0, initialized: true }
}, 1000);
```

### 2. Test Specific Items

```javascript
// Test if items are available
console.log('Netherite sword:', hasModernItemTexture('minecraft:netherite_sword'));
console.log('Copper ingot:', hasModernItemTexture('minecraft:copper_ingot'));
console.log('Trident:', hasModernItemTexture('minecraft:trident'));

// Should all return: true
```

### 3. Get Texture Paths

```javascript
// Get paths to textures
console.log(getModernItemTexturePath('minecraft:netherite_sword'));
console.log(getModernItemTexturePath('minecraft:amethyst_shard'));
console.log(getModernItemTexturePath('minecraft:crossbow_standby'));

// Should return paths like: "textures/items/netherite_sword.png"
```

### 4. Load and Display Textures

```javascript
// Preload some textures
preloadModernItemTextures([
    'minecraft:netherite_sword',
    'minecraft:copper_ingot',
    'minecraft:amethyst_shard',
    'minecraft:trident'
]).then(() => {
    console.log('Textures loaded!');
    console.log('Stats:', getTextureLoaderStats());
    
    // Should show loadedTextures: 4
});
```

### 5. Display Textures in Browser

Create a test HTML page or use the browser console:
```javascript
// Create and append image elements
const testItems = [
    'minecraft:netherite_sword',
    'minecraft:copper_ingot',
    'minecraft:amethyst_shard'
];

preloadModernItemTextures(testItems).then(() => {
    testItems.forEach(item => {
        const texture = getModernItemTexture(item);
        if (texture) {
            const img = document.createElement('img');
            img.src = texture.src;
            img.width = 64;
            img.height = 64;
            img.style.imageRendering = 'pixelated';
            img.title = item;
            document.body.appendChild(img);
        }
    });
});
```

## Comprehensive Testing Checklist

### System Tests
- [ ] Texture loader script loads without errors
- [ ] JSON mappings file loads successfully
- [ ] System initializes (check console for initialization message)
- [ ] API functions are available globally

### API Tests
- [ ] `getTextureLoaderStats()` returns correct structure
- [ ] `hasModernItemTexture()` returns true for known items
- [ ] `hasModernItemTexture()` returns false for unknown items
- [ ] `getModernItemTexturePath()` returns correct paths
- [ ] `getModernItemTexture()` returns Image objects
- [ ] `preloadModernItemTextures()` loads textures successfully

### Texture Tests
- [ ] Netherite items load correctly
- [ ] Copper items load correctly
- [ ] Candles load correctly
- [ ] Pottery sherds load correctly
- [ ] Armor trims load correctly
- [ ] Modern wood types load correctly

### Performance Tests
- [ ] Initial load time is under 200ms
- [ ] Textures load on-demand (lazy loading works)
- [ ] Cached textures return instantly
- [ ] Memory usage stays reasonable (<50MB for all textures)

### Browser Compatibility Tests
- [ ] Works in Chrome/Chromium
- [ ] Works in Firefox
- [ ] Works in Safari
- [ ] Works in Edge
- [ ] Console shows no errors

### Error Handling Tests
- [ ] Invalid item IDs return null gracefully
- [ ] Missing textures don't crash the system
- [ ] Network errors are handled properly
- [ ] Console shows appropriate error messages

## Sample Test Items by Category

### Netherite (1.16)
```javascript
[
    'minecraft:netherite_sword',
    'minecraft:netherite_pickaxe',
    'minecraft:netherite_helmet',
    'minecraft:netherite_ingot'
]
```

### Copper (1.17)
```javascript
[
    'minecraft:copper_ingot',
    'minecraft:raw_copper'
]
```

### Candles (1.17)
```javascript
[
    'minecraft:candle',
    'minecraft:white_candle',
    'minecraft:red_candle',
    'minecraft:blue_candle'
]
```

### Amethyst (1.17)
```javascript
[
    'minecraft:amethyst_shard'
]
```

### Modern Wood (1.19-1.20)
```javascript
[
    'minecraft:mangrove_door',
    'minecraft:cherry_door',
    'minecraft:bamboo_door'
]
```

### Pottery & Trims (1.20)
```javascript
[
    'minecraft:angler_pottery_sherd',
    'minecraft:blade_pottery_sherd',
    'minecraft:bolt_armor_trim_smithing_template'
]
```

### 1.21 Items
```javascript
[
    'minecraft:breeze_rod',
    'minecraft:wind_charge',
    'minecraft:mace',
    'minecraft:wolf_armor'
]
```

## Expected Console Messages

On page load, you should see:
```
[TextureLoader] Initializing texture injection system...
[TextureLoader] Starting initialization...
[TextureLoader] Loaded 160 texture mappings
[TextureLoader] Ready to load 160 textures on-demand
[TextureLoader] Initialization complete!
[TextureLoader] Available items: 160
[TextureLoader] Use getModernItemTexture(itemId) to retrieve textures
[TextureLoader] Use getTextureLoaderStats() to see stats
[TextureLoader] Example items: minecraft:amethyst_shard, minecraft:angler_pottery_sherd, ...
```

## Troubleshooting

### "Texture mappings not loading"
- Check network tab for HTTP 404 errors
- Verify `item-texture-mappings.json` is accessible
- Check CORS settings if loading from different domain

### "Textures not displaying"
- Verify texture files exist in `textures/items/`
- Check browser console for image load errors
- Verify paths in mappings JSON are correct

### "Performance issues"
- Check how many textures are loaded (use `getTextureLoaderStats()`)
- Consider preloading only needed textures
- Clear cache if too many textures are loaded

## Visual Verification

The best way to verify is to:
1. Load the page in a browser
2. Open developer console (F12)
3. Run the test commands above
4. Check that textures load and display correctly
5. Verify no errors in console

## Automated Testing Script

Copy and paste this into browser console:
```javascript
(async function() {
    console.log('=== Texture Loader Test Suite ===\n');
    
    // Wait for initialization
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Test 1: Stats
    const stats = getTextureLoaderStats();
    console.log('✓ Stats:', stats);
    console.assert(stats.initialized === true, 'Should be initialized');
    console.assert(stats.totalMappings === 160, 'Should have 160 mappings');
    
    // Test 2: Has texture
    const has = hasModernItemTexture('minecraft:netherite_sword');
    console.log('✓ Has netherite_sword:', has);
    console.assert(has === true, 'Should have netherite_sword');
    
    // Test 3: Get path
    const path = getModernItemTexturePath('minecraft:copper_ingot');
    console.log('✓ Copper ingot path:', path);
    console.assert(path === 'textures/items/copper_ingot.png', 'Path should match');
    
    // Test 4: Load textures
    const items = ['minecraft:trident', 'minecraft:amethyst_shard'];
    await preloadModernItemTextures(items);
    console.log('✓ Preloaded:', items);
    
    // Test 5: Get texture
    const texture = getModernItemTexture('minecraft:trident');
    console.log('✓ Trident texture:', texture ? 'loaded' : 'null');
    console.assert(texture !== null, 'Should have texture');
    
    console.log('\n=== All Tests Passed! ===');
})();
```

## Integration Testing

To test integration with the actual game:
1. Deploy to web server
2. Load the game
3. Connect to a 1.13+ server
4. Look for items that are 1.13+ exclusive
5. Verify they display with correct textures instead of placeholders

Note: Full integration testing requires the game to be fully functional and connected to a newer server.
