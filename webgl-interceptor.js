/**
 * WebGL Interceptor - Aggressive Texture Injection System
 * 
 * This module intercepts WebGL rendering calls to inject modern item textures
 * directly into the Eaglercraft rendering pipeline.
 * 
 * WARNING: This is extremely experimental and may break the game!
 */

(function() {
    'use strict';
    
    const LOG_PREFIX = '[WebGLPatch]';
    let isExperimentalEnabled = true;
    let webglContext = null;
    let textureCache = new Map();
    let replacementTextures = new Map();
    let stats = {
        texturesIntercepted: 0,
        texturesReplaced: 0,
        bindTextureCalls: 0,
        startTime: Date.now()
    };
    
    // Check URL parameter to disable experimental features
    function checkExperimentalToggle() {
        const urlParams = new URLSearchParams(window.location.search);
        const experimental = urlParams.get('experimental');
        if (experimental === 'false') {
            isExperimentalEnabled = false;
            console.log(LOG_PREFIX, 'Experimental features DISABLED via URL parameter');
            return false;
        }
        console.log(LOG_PREFIX, 'Experimental features ENABLED');
        return true;
    }
    
    // Get replacement texture for a given texture object
    function getReplacementTexture(texture) {
        if (!texture) return null;
        
        // Check if we have a replacement for this texture
        const replacement = replacementTextures.get(texture);
        if (replacement) {
            stats.texturesReplaced++;
            return replacement;
        }
        
        return null;
    }
    
    // Create a WebGL texture from image data
    function createTextureFromImage(gl, imageData) {
        try {
            const texture = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, texture);
            
            // Upload the image data
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, imageData);
            
            // Set texture parameters for proper rendering
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            
            return texture;
        } catch (error) {
            console.error(LOG_PREFIX, 'Failed to create texture from image:', error);
            return null;
        }
    }
    
    // Hook into WebGL context creation
    function interceptWebGLContext() {
        if (!isExperimentalEnabled) return;
        
        const originalGetContext = HTMLCanvasElement.prototype.getContext;
        
        HTMLCanvasElement.prototype.getContext = function(type, ...args) {
            const context = originalGetContext.apply(this, [type, ...args]);
            
            // Only intercept WebGL contexts
            if (context && (type === 'webgl' || type === 'webgl2' || type === 'experimental-webgl')) {
                console.log(LOG_PREFIX, 'WebGL context created, installing hooks...');
                webglContext = context;
                
                // Wrap bindTexture
                const originalBindTexture = context.bindTexture;
                context.bindTexture = function(target, texture) {
                    stats.bindTextureCalls++;
                    
                    // Check if we should replace this texture
                    const replacement = getReplacementTexture(texture);
                    const textureToUse = replacement || texture;
                    
                    // Only log replacements (not every bind call to avoid performance issues)
                    if (replacement && stats.texturesReplaced <= 10) {
                        console.log(LOG_PREFIX, 'Replacing texture (logging first 10 only)');
                    }
                    
                    // Call original with potentially replaced texture
                    return originalBindTexture.call(this, target, textureToUse);
                };
                
                // Wrap texImage2D to track texture creation
                const originalTexImage2D = context.texImage2D;
                context.texImage2D = function(...args) {
                    stats.texturesIntercepted++;
                    return originalTexImage2D.apply(this, args);
                };
                
                console.log(LOG_PREFIX, 'WebGL hooks installed successfully');
            }
            
            return context;
        };
        
        console.log(LOG_PREFIX, 'WebGL interceptor initialized');
    }
    
    // Public API for texture replacement
    window.WebGLTextureInjector = {
        // Register a replacement texture
        registerReplacement: function(originalTexture, replacementTexture) {
            if (!isExperimentalEnabled) return false;
            
            replacementTextures.set(originalTexture, replacementTexture);
            console.log(LOG_PREFIX, 'Registered texture replacement');
            return true;
        },
        
        // Load and create texture from URL
        loadTextureFromURL: function(url, callback) {
            if (!isExperimentalEnabled || !webglContext) {
                callback && callback(null);
                return;
            }
            
            const img = new Image();
            img.crossOrigin = 'anonymous';
            
            img.onload = function() {
                const texture = createTextureFromImage(webglContext, img);
                callback && callback(texture);
            };
            
            img.onerror = function(error) {
                console.error(LOG_PREFIX, 'Failed to load texture from URL:', url, error);
                callback && callback(null);
            };
            
            img.src = url;
        },
        
        // Get current statistics
        getStats: function() {
            const uptime = (Date.now() - stats.startTime) / 1000;
            return {
                ...stats,
                uptime: uptime,
                bindTexturePerSecond: stats.bindTextureCalls / uptime
            };
        },
        
        // Log statistics to console
        logStats: function() {
            const currentStats = this.getStats();
            console.log(LOG_PREFIX, 'Statistics:', currentStats);
        },
        
        // Check if experimental mode is enabled
        isEnabled: function() {
            return isExperimentalEnabled;
        },
        
        // Get the WebGL context
        getContext: function() {
            return webglContext;
        }
    };
    
    // Initialize on page load
    if (typeof window !== 'undefined') {
        checkExperimentalToggle();
        
        if (isExperimentalEnabled) {
            // Install interceptor immediately
            interceptWebGLContext();
            
            // Log statistics periodically (every 30 seconds)
            const statsInterval = setInterval(function() {
                if (stats.bindTextureCalls > 0) {
                    window.WebGLTextureInjector.logStats();
                }
            }, 30000);
            
            // Store interval for cleanup
            window.WebGLTextureInjector._statsInterval = statsInterval;
            
            console.log(LOG_PREFIX, 'Initialization complete');
        }
    }
    
})();
