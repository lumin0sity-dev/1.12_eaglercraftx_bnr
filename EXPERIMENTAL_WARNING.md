# ⚠️ EXPERIMENTAL FEATURES WARNING ⚠️

## WebGL Texture Injection System

This repository contains **highly experimental** code for injecting modern Minecraft item textures (1.13-1.21.1) into the Eaglercraft 1.12 client.

### What This Does

The texture injection system attempts to:
- Intercept WebGL rendering calls at runtime
- Replace placeholder textures (eggs) with modern item textures
- Patch the compiled game code to recognize new items
- Monitor network packets for unknown items
- Build texture atlases for performance

### Known Risks

⚠️ **USE AT YOUR OWN RISK** ⚠️

This code may:
- **Completely break the game** - rendering issues, crashes, freezes
- **Cause severe performance degradation** - frame drops, stuttering
- **Not work at all** - due to code obfuscation or WASM compilation
- **Break with any client updates** - tightly coupled to current implementation
- **Interfere with other rendering** - WebGL patches affect all rendering
- **Trigger anti-cheat systems** - runtime code modification
- **Cause browser crashes** - memory leaks or infinite loops

### How to Disable

If you experience issues, you can disable the experimental features by adding `?experimental=false` to the URL:

```
https://your-server.com/index.html?experimental=false
```

This will prevent all patching systems from loading.

### Technical Details

#### Files Involved

- `webgl-interceptor.js` - Intercepts WebGL API calls
- `texture-loader.js` - Manages texture loading and caching
- `texture-atlas-builder.js` - Builds texture atlases
- `item-detector.js` - Monitors network packets
- `game-patcher.js` - Patches compiled game code
- `item-texture-mappings.json` - Maps item IDs to textures

#### Loading Order

The files **must** be loaded in this exact order:
1. `texture-loader.js`
2. `texture-atlas-builder.js`
3. `webgl-interceptor.js`
4. `item-detector.js`
5. `game-patcher.js`
6. `bootstrap.js` (game code)

#### Browser Compatibility

Tested on:
- ❓ Chrome/Chromium - Unknown
- ❓ Firefox - Unknown
- ❓ Safari - Unknown
- ❓ Edge - Unknown

### Performance Impact

Expected performance metrics:
- Target: 60 FPS
- Minimum acceptable: 30 FPS
- May vary based on:
  - Number of loaded textures
  - Browser WebGL implementation
  - System resources

### Debugging

To enable verbose logging, open browser console (F12) and look for:
- `[WebGLPatch]` - WebGL interception logs
- `[TextureLoader]` - Texture loading logs
- `[AtlasBuilder]` - Atlas building logs
- `[ItemDetector]` - Item detection logs
- `[GamePatcher]` - Code patching logs

You can also call these debug functions from the console:
```javascript
// Get statistics
WebGLTextureInjector.logStats();
TextureLoader.getStats();
TextureAtlasBuilder.getStats();
ItemDetector.logDetected();
GamePatcher.getAppliedPatches();
```

### Fallback Plan

If this doesn't work:
1. Document the failure reasons
2. Consider server-side solutions
3. Contact the original Eaglercraft developers
4. Wait for official support in future versions

### Contributing

If you want to improve this system:
1. Test thoroughly before submitting changes
2. Document any new risks or issues
3. Maintain backward compatibility
4. Add extensive logging for debugging
5. Include performance metrics

### Support

**NO OFFICIAL SUPPORT PROVIDED**

This is experimental code. Use the GitHub issues to report problems, but understand that:
- Fixes are not guaranteed
- The system may never work reliably
- Updates may break functionality
- No warranty or liability is provided

### License

This code is provided under the same MIT license as the main repository.

---

**Last Updated:** 2026-02-18

**Status:** Experimental - Not Production Ready
