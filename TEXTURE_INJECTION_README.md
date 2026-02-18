# WebGL Texture Injection System

This system implements aggressive runtime patching to inject modern Minecraft item textures (1.13-1.21.1) into the Eaglercraft 1.12 client.

## ⚠️ Warning

This is **highly experimental** code. See [EXPERIMENTAL_WARNING.md](EXPERIMENTAL_WARNING.md) for full details on risks and limitations.

## Quick Start

### Enable Experimental Features

By default, the texture injection system is **enabled**. To disable it, add `?experimental=false` to the URL:

```
https://your-server.com/index.html?experimental=false
```

### Testing the System

Open `test-texture-system.html` in a browser to test the individual components:

1. Open the file in a web browser via HTTP (not file://)
2. Check the "System Status" section to verify all modules loaded
3. Use the test buttons to verify functionality
4. Monitor the console output for debugging

## Architecture

### Components

1. **webgl-interceptor.js** - Core WebGL API hijacking
   - Intercepts `getContext()` to wrap WebGL contexts
   - Wraps `bindTexture()` to enable texture replacement
   - Tracks statistics on texture usage
   - Provides API for registering texture replacements

2. **texture-loader.js** - Texture management
   - Loads `item-texture-mappings.json` 
   - Preloads item textures from paths
   - Converts images to WebGL-compatible format
   - Handles errors gracefully

3. **texture-atlas-builder.js** - Performance optimization
   - Combines textures into a single atlas
   - Calculates UV coordinates for each texture
   - Creates WebGL texture from canvas
   - Reduces draw calls for better performance

4. **item-detector.js** - Runtime item detection
   - Intercepts WebSocket connections
   - Monitors DOM for item tooltips
   - Tracks unknown items
   - Triggers dynamic texture loading

5. **game-patcher.js** - Code patching
   - Hooks into game initialization
   - Patches runtime functions safely
   - Monitors script loading
   - Provides proxy-based interception

### Loading Order

**Critical:** Scripts must load in this exact order (already configured in index.html):

```html
<script src="texture-loader.js"></script>
<script src="texture-atlas-builder.js"></script>
<script src="webgl-interceptor.js"></script>
<script src="item-detector.js"></script>
<script src="game-patcher.js"></script>
<script src="bootstrap.js"></script> <!-- Game code loads last -->
```

## Configuration

### Item Texture Mappings

Edit `item-texture-mappings.json` to add or modify item textures:

```json
{
  "minecraft:item_name": {
    "texture": "textures/items/item_name.png",
    "name": "Display Name",
    "version": "1.X"
  }
}
```

### Texture Files

Place texture PNG files in `textures/items/` directory (currently not included).

To extract textures from the included resource pack:

```bash
# Extract the zip file
unzip "Classic Faithful 32x - 1.21.1.zip" -d extracted/

# Copy item textures
mkdir -p textures/items/
cp extracted/assets/minecraft/textures/item/*.png textures/items/
```

## API Reference

### WebGLTextureInjector

```javascript
// Register a texture replacement
WebGLTextureInjector.registerReplacement(originalTexture, replacementTexture);

// Load texture from URL
WebGLTextureInjector.loadTextureFromURL(url, callback);

// Get statistics
const stats = WebGLTextureInjector.getStats();

// Log stats to console
WebGLTextureInjector.logStats();

// Check if enabled
const enabled = WebGLTextureInjector.isEnabled();
```

### TextureLoader

```javascript
// Initialize loader
await TextureLoader.initialize();

// Get texture for item
const texture = TextureLoader.getTexture('minecraft:trident');

// Check if loaded
const hasIt = TextureLoader.hasTexture('minecraft:trident');

// Get stats
const stats = TextureLoader.getStats();

// Convert to WebGL (after context is ready)
TextureLoader.convertToWebGL();
```

### TextureAtlasBuilder

```javascript
// Build atlas from loaded textures
TextureAtlasBuilder.build();

// Create WebGL texture
const glTexture = TextureAtlasBuilder.createWebGLTexture();

// Get UV coordinates for an item
const uv = TextureAtlasBuilder.getUV('minecraft:trident');

// Export atlas as data URL (for debugging)
const dataUrl = TextureAtlasBuilder.exportAsDataURL();
```

### ItemDetector

```javascript
// Start monitoring
ItemDetector.start();

// Get detected items
const items = ItemDetector.getDetectedItems();

// Get unknown items
const unknown = ItemDetector.getUnknownItems();

// Log detected items
ItemDetector.logDetected();
```

### GamePatcher

```javascript
// Initialize patcher
GamePatcher.initialize();

// Manually patch a function
GamePatcher.patchFunction(obj, 'methodName', patchCallback);

// Get applied patches
const patches = GamePatcher.getAppliedPatches();
```

## Debugging

### Console Logging

All modules log with prefixed tags:

- `[WebGLPatch]` - WebGL interception
- `[TextureLoader]` - Texture loading
- `[AtlasBuilder]` - Atlas building
- `[ItemDetector]` - Item detection
- `[GamePatcher]` - Code patching
- `[ExperimentalInit]` - Initialization

### Browser Console

Open browser DevTools (F12) and run:

```javascript
// Get all stats at once
WebGLTextureInjector.logStats();
console.log(TextureLoader.getStats());
console.log(TextureAtlasBuilder.getStats());
console.log(ItemDetector.getStats());
console.log(GamePatcher.getStats());
```

### Common Issues

**WebGL context not available**
- System waits up to 30 seconds for context
- Check browser WebGL support at https://get.webgl.org/

**Textures not loading**
- Check `item-texture-mappings.json` is valid
- Verify texture files exist at specified paths
- Check browser console for 404 errors

**Performance issues**
- Reduce number of textures in mappings
- Disable atlas building (comment out in index.html)
- Add `?experimental=false` to URL

**Game doesn't start**
- Check browser console for errors
- Try disabling with `?experimental=false`
- Verify all script files loaded successfully

## Performance

### Expected Metrics

- Target: 60 FPS
- Minimum: 30 FPS
- Texture load time: < 5 seconds (for 100 textures)
- WebGL overhead: < 5% per frame

### Optimization Tips

1. Use texture atlas (single draw call vs. many)
2. Limit number of loaded textures
3. Use power-of-2 texture dimensions
4. Enable mipmapping for quality
5. Disable verbose logging in production

## Development

### Adding New Modules

1. Create new JS file
2. Wrap in IIFE: `(function() { ... })();`
3. Add to loading order in index.html
4. Expose public API via `window.ModuleName`
5. Use consistent logging prefix

### Contributing

See [EXPERIMENTAL_WARNING.md](EXPERIMENTAL_WARNING.md) for contribution guidelines.

## Known Limitations

- No actual texture files included (mappings only)
- May not work due to code obfuscation
- Performance impact varies by browser
- No guarantee of compatibility
- May break with game updates

## License

MIT License - Same as main repository

## Support

**No official support provided.** This is experimental code.

Use GitHub issues to report problems, but understand:
- Fixes are not guaranteed
- The system may never work reliably  
- No warranty or liability provided

---

**Status:** Experimental - Not Production Ready

**Last Updated:** 2026-02-18
