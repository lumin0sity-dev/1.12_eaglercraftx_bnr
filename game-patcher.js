/**
 * Game Patcher - Runtime Code Patching System
 * 
 * Hooks into the compiled classes.js to patch item rendering functions.
 * Intercepts item registry and texture atlas lookups.
 */

(function() {
    'use strict';
    
    const LOG_PREFIX = '[GamePatcher]';
    let patchesApplied = [];
    let isPatchingEnabled = true;
    
    // Safely patch a function on an object
    function patchFunction(obj, functionName, patchCallback) {
        if (!obj || typeof obj[functionName] !== 'function') {
            console.warn(LOG_PREFIX, 'Cannot patch', functionName, '- not a function');
            return false;
        }
        
        try {
            const original = obj[functionName];
            obj[functionName] = function(...args) {
                try {
                    return patchCallback.call(this, original, args);
                } catch (error) {
                    console.error(LOG_PREFIX, 'Patch error in', functionName, ':', error);
                    // Fallback to original function
                    return original.apply(this, args);
                }
            };
            
            patchesApplied.push(functionName);
            console.log(LOG_PREFIX, 'Successfully patched', functionName);
            return true;
        } catch (error) {
            console.error(LOG_PREFIX, 'Failed to patch', functionName, ':', error);
            return false;
        }
    }
    
    // Patch window.main to intercept game initialization
    function patchGameInitialization() {
        if (typeof window.main !== 'function') {
            console.warn(LOG_PREFIX, 'window.main not found, deferring patch');
            return false;
        }
        
        return patchFunction(window, 'main', function(original, args) {
            console.log(LOG_PREFIX, 'Game initialization intercepted');
            
            // Call original main
            const result = original.apply(this, args);
            
            // After game starts, try to hook into more internals
            setTimeout(function() {
                tryPatchGameInternals();
            }, 1000);
            
            return result;
        });
    }
    
    // Attempt to find and patch game internals
    function tryPatchGameInternals() {
        console.log(LOG_PREFIX, 'Attempting to patch game internals...');
        
        // Look for common patterns in the global scope
        const globalKeys = Object.keys(window);
        
        // Try to find item registry or texture manager
        for (const key of globalKeys) {
            const obj = window[key];
            if (!obj || typeof obj !== 'object') continue;
            
            // Look for item-related objects
            if (key.toLowerCase().includes('item') || 
                key.toLowerCase().includes('texture') ||
                key.toLowerCase().includes('registry')) {
                console.log(LOG_PREFIX, 'Found potential target:', key);
                tryPatchObject(obj, key);
            }
        }
    }
    
    // Try to patch methods on an object
    function tryPatchObject(obj, objectName) {
        if (!obj) return;
        
        const methods = Object.getOwnPropertyNames(obj);
        for (const method of methods) {
            if (typeof obj[method] !== 'function') continue;
            
            // Look for render/draw/get methods
            if (method.includes('render') || 
                method.includes('draw') ||
                method.includes('get') ||
                method.includes('bind')) {
                
                console.log(LOG_PREFIX, 'Found method:', objectName + '.' + method);
                
                // Could patch here, but we need to be very careful
                // For now, just log what we find
            }
        }
    }
    
    // Use Proxy to intercept property access
    function createProxyInterceptor(targetObj, name) {
        return new Proxy(targetObj, {
            get: function(target, prop) {
                const value = target[prop];
                
                // Log access to item-related properties
                if (typeof prop === 'string' && (
                    prop.includes('item') ||
                    prop.includes('texture') ||
                    prop.includes('atlas')
                )) {
                    console.log(LOG_PREFIX, 'Proxy intercepted:', name + '.' + prop);
                }
                
                return value;
            },
            
            set: function(target, prop, value) {
                // Log modifications
                if (typeof prop === 'string' && prop.includes('item')) {
                    console.log(LOG_PREFIX, 'Proxy set:', name + '.' + prop, '=', value);
                }
                
                target[prop] = value;
                return true;
            }
        });
    }
    
    // Patch console to intercept game logs
    function interceptGameLogs() {
        const originalLog = console.log;
        const originalWarn = console.warn;
        const originalError = console.error;
        
        console.log = function(...args) {
            // Look for item-related logs
            const message = args.join(' ');
            if (message.includes('item') || message.includes('texture')) {
                console.log(LOG_PREFIX, 'Game log (item-related):', ...args);
            }
            return originalLog.apply(console, args);
        };
        
        // Could also patch warn and error similarly
    }
    
    // Monitor for script loading
    function monitorScriptLoading() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.tagName === 'SCRIPT' && node.src) {
                        console.log(LOG_PREFIX, 'Script loaded:', node.src);
                        
                        // If classes.js is loaded, try patching
                        if (node.src.includes('classes.js')) {
                            console.log(LOG_PREFIX, 'classes.js detected, will attempt patching');
                            setTimeout(tryPatchGameInternals, 500);
                        }
                    }
                });
            });
        });
        
        observer.observe(document.documentElement, {
            childList: true,
            subtree: true
        });
    }
    
    // Initialize patching system
    function initialize() {
        console.log(LOG_PREFIX, 'Initializing game patcher...');
        
        // Monitor for script loading
        monitorScriptLoading();
        
        // Try to patch main immediately
        patchGameInitialization();
        
        // Set up a delayed retry in case main is loaded later
        setTimeout(function() {
            patchGameInitialization();
        }, 2000);
        
        console.log(LOG_PREFIX, 'Initialization complete');
    }
    
    // Public API
    window.GamePatcher = {
        // Initialize the patcher
        initialize: initialize,
        
        // Manually patch a function
        patchFunction: patchFunction,
        
        // Get list of applied patches
        getAppliedPatches: function() {
            return [...patchesApplied];
        },
        
        // Try to patch game internals immediately
        patchInternals: tryPatchGameInternals,
        
        // Create a proxy interceptor for an object
        createProxy: createProxyInterceptor,
        
        // Check if patching is enabled
        isEnabled: function() {
            return isPatchingEnabled;
        },
        
        // Enable/disable patching
        setEnabled: function(enabled) {
            isPatchingEnabled = enabled;
            console.log(LOG_PREFIX, 'Patching', enabled ? 'enabled' : 'disabled');
        },
        
        // Get statistics
        getStats: function() {
            return {
                patchesApplied: patchesApplied.length,
                patches: patchesApplied
            };
        }
    };
    
    console.log(LOG_PREFIX, 'Game patcher module loaded');
    
})();
