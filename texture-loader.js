/**
 * Runtime Texture Injection System for 1.13-1.21.1 Items
 * Loads textures for items that don't exist in Minecraft 1.12.2
 */

(function() {
    'use strict';
    
    console.log('[TextureLoader] Initializing texture injection system...');
    
    // Global texture registry
    window.modernItemTextures = {
        mappings: {},
        loadedTextures: {},
        textureCache: new Map(),
        initialized: false
    };
    
    /**
     * Load the item texture mappings JSON
     */
    function loadTextureMappings() {
        return fetch('item-texture-mappings.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to load texture mappings: ' + response.status);
                }
                return response.json();
            })
            .then(mappings => {
                window.modernItemTextures.mappings = mappings;
                console.log('[TextureLoader] Loaded ' + Object.keys(mappings).length + ' texture mappings');
                return mappings;
            })
            .catch(error => {
                console.error('[TextureLoader] Error loading texture mappings:', error);
                return {};
            });
    }
    
    /**
     * Preload a single texture into cache
     */
    function preloadTexture(itemId, texturePath) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.onload = () => {
                window.modernItemTextures.textureCache.set(itemId, img);
                window.modernItemTextures.loadedTextures[itemId] = texturePath;
                resolve(img);
            };
            
            img.onerror = (error) => {
                console.warn('[TextureLoader] Failed to load texture for ' + itemId + ':', texturePath);
                reject(error);
            };
            
            img.src = texturePath;
        });
    }
    
    /**
     * Preload all textures (lazy loading approach - only load when needed)
     */
    function preloadTextures(mappings) {
        // We'll use lazy loading - textures are loaded on-demand
        // This function just validates the mappings are loaded
        console.log('[TextureLoader] Ready to load ' + Object.keys(mappings).length + ' textures on-demand');
        return Promise.resolve();
    }
    
    /**
     * Get texture for a specific item ID
     */
    window.getModernItemTexture = function(itemId) {
        // Normalize item ID
        if (!itemId.startsWith('minecraft:')) {
            itemId = 'minecraft:' + itemId;
        }
        
        // Check cache first
        if (window.modernItemTextures.textureCache.has(itemId)) {
            return window.modernItemTextures.textureCache.get(itemId);
        }
        
        // Check if we have a mapping for this item
        const texturePath = window.modernItemTextures.mappings[itemId];
        if (!texturePath) {
            return null;
        }
        
        // Load texture asynchronously
        preloadTexture(itemId, texturePath).catch(err => {
            console.error('[TextureLoader] Failed to load texture for', itemId, err);
        });
        
        return null; // Return null for first request, will be cached for next time
    };
    
    /**
     * Get texture path for a specific item ID
     */
    window.getModernItemTexturePath = function(itemId) {
        // Normalize item ID
        if (!itemId.startsWith('minecraft:')) {
            itemId = 'minecraft:' + itemId;
        }
        
        return window.modernItemTextures.mappings[itemId] || null;
    };
    
    /**
     * Check if an item has a modern texture available
     */
    window.hasModernItemTexture = function(itemId) {
        // Normalize item ID
        if (!itemId.startsWith('minecraft:')) {
            itemId = 'minecraft:' + itemId;
        }
        
        return itemId in window.modernItemTextures.mappings;
    };
    
    /**
     * Preload specific textures by item IDs
     */
    window.preloadModernItemTextures = function(itemIds) {
        const promises = itemIds.map(itemId => {
            // Normalize item ID
            if (!itemId.startsWith('minecraft:')) {
                itemId = 'minecraft:' + itemId;
            }
            
            const texturePath = window.modernItemTextures.mappings[itemId];
            if (texturePath && !window.modernItemTextures.textureCache.has(itemId)) {
                return preloadTexture(itemId, texturePath);
            }
            return Promise.resolve();
        });
        
        return Promise.all(promises).then(results => {
            console.log('[TextureLoader] Preloaded ' + results.length + ' textures');
            return results;
        });
    };
    
    /**
     * Get statistics about loaded textures
     */
    window.getTextureLoaderStats = function() {
        return {
            totalMappings: Object.keys(window.modernItemTextures.mappings).length,
            loadedTextures: window.modernItemTextures.textureCache.size,
            initialized: window.modernItemTextures.initialized
        };
    };
    
    /**
     * Initialize the texture loader
     */
    function initialize() {
        console.log('[TextureLoader] Starting initialization...');
        
        loadTextureMappings()
            .then(mappings => {
                return preloadTextures(mappings);
            })
            .then(() => {
                window.modernItemTextures.initialized = true;
                console.log('[TextureLoader] Initialization complete!');
                console.log('[TextureLoader] Available items:', Object.keys(window.modernItemTextures.mappings).length);
                console.log('[TextureLoader] Use getModernItemTexture(itemId) to retrieve textures');
                console.log('[TextureLoader] Use getTextureLoaderStats() to see stats');
                
                // Log some example items
                const examples = Object.keys(window.modernItemTextures.mappings).slice(0, 5);
                console.log('[TextureLoader] Example items:', examples.join(', '));
            })
            .catch(error => {
                console.error('[TextureLoader] Initialization failed:', error);
            });
    }
    
    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initialize);
    } else {
        initialize();
    }
    
})();
