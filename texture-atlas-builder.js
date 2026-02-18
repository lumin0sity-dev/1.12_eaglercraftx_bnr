/**
 * Texture Atlas Builder - Combines textures into a single atlas
 * 
 * Creates a texture atlas from all loaded item textures for better performance.
 * Calculates UV coordinates for each texture in the atlas.
 */

(function() {
    'use strict';
    
    const LOG_PREFIX = '[AtlasBuilder]';
    const TEXTURE_SIZE = 16; // Standard Minecraft texture size
    const ATLAS_PADDING = 1; // Padding between textures to prevent bleeding
    
    let atlas = null;
    let atlasTexture = null;
    let uvMap = new Map();
    
    // Calculate optimal atlas dimensions
    function calculateAtlasDimensions(textureCount) {
        // Try to make a square atlas
        const texturesPerSide = Math.ceil(Math.sqrt(textureCount));
        const size = texturesPerSide * (TEXTURE_SIZE + ATLAS_PADDING);
        
        // Round up to nearest power of 2 for better GPU performance
        const powerOfTwo = Math.pow(2, Math.ceil(Math.log2(size)));
        
        return {
            width: powerOfTwo,
            height: powerOfTwo,
            texturesPerRow: Math.floor(powerOfTwo / (TEXTURE_SIZE + ATLAS_PADDING))
        };
    }
    
    // Build texture atlas from loaded textures
    function buildAtlas() {
        const textures = window.TextureLoader && window.TextureLoader.getLoadedItems();
        if (!textures || textures.length === 0) {
            console.warn(LOG_PREFIX, 'No textures loaded, cannot build atlas');
            return null;
        }
        
        console.log(LOG_PREFIX, 'Building atlas from', textures.length, 'textures...');
        
        const dimensions = calculateAtlasDimensions(textures.length);
        console.log(LOG_PREFIX, 'Atlas dimensions:', dimensions.width, 'x', dimensions.height);
        
        // Create canvas for atlas
        const canvas = document.createElement('canvas');
        canvas.width = dimensions.width;
        canvas.height = dimensions.height;
        const ctx = canvas.getContext('2d');
        
        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw each texture onto the atlas
        let index = 0;
        for (const itemId of textures) {
            const img = window.TextureLoader.getImage(itemId);
            if (!img) continue;
            
            const row = Math.floor(index / dimensions.texturesPerRow);
            const col = index % dimensions.texturesPerRow;
            
            const x = col * (TEXTURE_SIZE + ATLAS_PADDING);
            const y = row * (TEXTURE_SIZE + ATLAS_PADDING);
            
            // Draw texture
            try {
                ctx.drawImage(img, x, y, TEXTURE_SIZE, TEXTURE_SIZE);
                
                // Calculate UV coordinates (0.0 to 1.0)
                const uv = {
                    u1: x / dimensions.width,
                    v1: y / dimensions.height,
                    u2: (x + TEXTURE_SIZE) / dimensions.width,
                    v2: (y + TEXTURE_SIZE) / dimensions.height
                };
                
                uvMap.set(itemId, uv);
                index++;
            } catch (error) {
                console.error(LOG_PREFIX, 'Failed to draw texture', itemId, 'to atlas:', error);
            }
        }
        
        atlas = canvas;
        console.log(LOG_PREFIX, 'Atlas built successfully with', index, 'textures');
        
        return canvas;
    }
    
    // Convert atlas to WebGL texture
    function createWebGLAtlas() {
        if (!atlas) {
            console.warn(LOG_PREFIX, 'Atlas not built, cannot create WebGL texture');
            return null;
        }
        
        const gl = window.WebGLTextureInjector && window.WebGLTextureInjector.getContext();
        if (!gl) {
            console.warn(LOG_PREFIX, 'WebGL context not available');
            return null;
        }
        
        try {
            atlasTexture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, atlasTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, atlas);
            
            // Set texture parameters for pixel art
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            
            // Generate mipmaps
            gl.generateMipmap(gl.TEXTURE_2D);
            
            console.log(LOG_PREFIX, 'WebGL atlas texture created');
            return atlasTexture;
        } catch (error) {
            console.error(LOG_PREFIX, 'Failed to create WebGL atlas texture:', error);
            return null;
        }
    }
    
    // Public API
    window.TextureAtlasBuilder = {
        // Build the texture atlas
        build: function() {
            return buildAtlas();
        },
        
        // Create WebGL texture from atlas
        createWebGLTexture: function() {
            return createWebGLAtlas();
        },
        
        // Get UV coordinates for an item
        getUV: function(itemId) {
            return uvMap.get(itemId);
        },
        
        // Get the atlas canvas
        getAtlas: function() {
            return atlas;
        },
        
        // Get the WebGL atlas texture
        getWebGLTexture: function() {
            return atlasTexture;
        },
        
        // Export atlas as data URL (for debugging)
        exportAsDataURL: function() {
            return atlas ? atlas.toDataURL() : null;
        },
        
        // Get all UV mappings
        getAllUVs: function() {
            return new Map(uvMap);
        },
        
        // Get statistics
        getStats: function() {
            return {
                atlasWidth: atlas ? atlas.width : 0,
                atlasHeight: atlas ? atlas.height : 0,
                textureCount: uvMap.size,
                hasWebGLTexture: !!atlasTexture
            };
        }
    };
    
    console.log(LOG_PREFIX, 'Texture atlas builder module loaded');
    
})();
