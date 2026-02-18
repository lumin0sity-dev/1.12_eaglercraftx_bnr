/**
 * Texture Loader - Enhanced Texture Management System
 * 
 * Preloads and manages modern item textures for 1.13-1.21.1 items.
 * Converts textures to WebGL-compatible format and creates texture atlas.
 */

(function() {
    'use strict';
    
    const LOG_PREFIX = '[TextureLoader]';
    let textureAtlas = null;
    let textureMap = new Map();
    let loadedTextures = new Map();
    let isInitialized = false;
    let itemMappings = null;
    
    // Load item texture mappings
    async function loadItemMappings() {
        try {
            const response = await fetch('item-texture-mappings.json');
            if (!response.ok) {
                console.warn(LOG_PREFIX, 'item-texture-mappings.json not found, using empty mappings');
                return {};
            }
            itemMappings = await response.json();
            console.log(LOG_PREFIX, 'Loaded', Object.keys(itemMappings).length, 'item texture mappings');
            return itemMappings;
        } catch (error) {
            console.warn(LOG_PREFIX, 'Failed to load item mappings:', error);
            return {};
        }
    }
    
    // Preload a single texture
    function preloadTexture(itemId, texturePath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = function() {
                loadedTextures.set(itemId, img);
                console.log(LOG_PREFIX, 'Loaded texture for', itemId);
                resolve(img);
            };
            
            img.onerror = function(error) {
                console.warn(LOG_PREFIX, 'Failed to load texture for', itemId, ':', texturePath);
                reject(error);
            };
            
            img.src = texturePath;
        });
    }
    
    // Preload all textures
    async function preloadAllTextures() {
        if (!itemMappings) {
            await loadItemMappings();
        }
        
        const promises = [];
        for (const [itemId, mapping] of Object.entries(itemMappings)) {
            const texturePath = mapping.texture || `textures/items/${itemId}.png`;
            promises.push(
                preloadTexture(itemId, texturePath)
                    .catch(error => {
                        // Continue loading other textures even if one fails
                        console.warn(LOG_PREFIX, 'Skipping failed texture:', itemId);
                    })
            );
        }
        
        await Promise.all(promises);
        console.log(LOG_PREFIX, 'Preloaded', loadedTextures.size, 'textures');
    }
    
    // Convert loaded textures to WebGL format
    function convertToWebGLFormat() {
        const gl = window.WebGLTextureInjector && window.WebGLTextureInjector.getContext();
        if (!gl) {
            console.warn(LOG_PREFIX, 'WebGL context not available, skipping conversion');
            return;
        }
        
        for (const [itemId, img] of loadedTextures.entries()) {
            try {
                const texture = gl.createTexture();
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
                
                // Set texture parameters
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST_MIPMAP_LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
                
                // Generate mipmaps for better quality
                gl.generateMipmap(gl.TEXTURE_2D);
                
                textureMap.set(itemId, texture);
            } catch (error) {
                console.error(LOG_PREFIX, 'Failed to create WebGL texture for', itemId, ':', error);
            }
        }
        
        console.log(LOG_PREFIX, 'Converted', textureMap.size, 'textures to WebGL format');
    }
    
    // Initialize the texture loader
    async function initialize() {
        if (isInitialized) {
            console.warn(LOG_PREFIX, 'Already initialized');
            return;
        }
        
        console.log(LOG_PREFIX, 'Initializing texture loader...');
        
        try {
            await preloadAllTextures();
            isInitialized = true;
            console.log(LOG_PREFIX, 'Initialization complete');
        } catch (error) {
            console.error(LOG_PREFIX, 'Initialization failed:', error);
        }
    }
    
    // Public API
    window.TextureLoader = {
        // Initialize the texture loader
        initialize: initialize,
        
        // Get texture for an item ID
        getTexture: function(itemId) {
            return textureMap.get(itemId);
        },
        
        // Get loaded image for an item ID
        getImage: function(itemId) {
            return loadedTextures.get(itemId);
        },
        
        // Check if texture is loaded
        hasTexture: function(itemId) {
            return loadedTextures.has(itemId);
        },
        
        // Get all loaded item IDs
        getLoadedItems: function() {
            return Array.from(loadedTextures.keys());
        },
        
        // Get statistics
        getStats: function() {
            return {
                totalLoaded: loadedTextures.size,
                totalConverted: textureMap.size,
                isInitialized: isInitialized
            };
        },
        
        // Convert textures to WebGL format (call after WebGL context is ready)
        convertToWebGL: convertToWebGLFormat,
        
        // Get item mappings
        getMappings: function() {
            return itemMappings;
        }
    };
    
    console.log(LOG_PREFIX, 'Texture loader module loaded');
    
})();
