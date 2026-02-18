/**
 * Item Detector - Network Packet Monitoring System
 * 
 * Monitors network activity to detect when unknown items are received from server.
 * Triggers texture injection for specific items.
 */

(function() {
    'use strict';
    
    const LOG_PREFIX = '[ItemDetector]';
    let unknownItems = new Set();
    let detectedItems = new Map();
    let isMonitoring = false;
    
    // Intercept WebSocket to monitor packets
    function interceptWebSocket() {
        const OriginalWebSocket = window.WebSocket;
        
        window.WebSocket = function(...args) {
            const ws = new OriginalWebSocket(...args);
            
            console.log(LOG_PREFIX, 'WebSocket connection detected:', args[0]);
            
            // Intercept incoming messages
            const originalOnMessage = ws.onmessage;
            ws.addEventListener('message', function(event) {
                try {
                    // Try to detect item-related data
                    detectItemsInPacket(event.data);
                } catch (error) {
                    // Silently fail - we don't want to break the game
                }
            });
            
            return ws;
        };
        
        console.log(LOG_PREFIX, 'WebSocket interceptor installed');
    }
    
    // Attempt to detect items in packet data
    function detectItemsInPacket(data) {
        // This is a placeholder - actual implementation would need to understand
        // the Minecraft protocol format used by Eaglercraft
        
        // For now, we just track that packets are being received
        if (typeof data === 'string') {
            // Try to find item-related patterns in string data
            // This is very basic and would need proper protocol parsing
            const itemPatterns = [
                /minecraft:(\w+)/g,
                /\"item\":\s*\"([^\"]+)\"/g,
                /\"id\":\s*(\d+)/g
            ];
            
            for (const pattern of itemPatterns) {
                let match;
                while ((match = pattern.exec(data)) !== null) {
                    const itemId = match[1];
                    if (!detectedItems.has(itemId)) {
                        detectedItems.set(itemId, {
                            firstSeen: Date.now(),
                            count: 1
                        });
                        console.log(LOG_PREFIX, 'Detected new item:', itemId);
                    } else {
                        detectedItems.get(itemId).count++;
                    }
                }
            }
        }
    }
    
    // Monitor for unknown items in the game
    function startMonitoring() {
        if (isMonitoring) {
            console.warn(LOG_PREFIX, 'Already monitoring');
            return;
        }
        
        console.log(LOG_PREFIX, 'Starting item detection...');
        
        // Intercept WebSocket connections
        interceptWebSocket();
        
        // Monitor DOM for item tooltips
        monitorTooltips();
        
        isMonitoring = true;
    }
    
    // Monitor DOM for item tooltips
    function monitorTooltips() {
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        // Look for tooltip-like elements
                        if (node.className && (
                            node.className.includes('tooltip') ||
                            node.className.includes('item') ||
                            node.className.includes('inventory')
                        )) {
                            extractItemsFromElement(node);
                        }
                    }
                });
            });
        });
        
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
        
        console.log(LOG_PREFIX, 'DOM mutation observer installed');
    }
    
    // Extract item information from DOM element
    function extractItemsFromElement(element) {
        const text = element.textContent || element.innerText;
        if (!text) return;
        
        // Look for Minecraft item patterns
        const patterns = [
            /minecraft:(\w+)/g,
            /(\w+)_(\w+)/g // Items like "iron_sword"
        ];
        
        for (const pattern of patterns) {
            let match;
            while ((match = pattern.exec(text)) !== null) {
                const itemId = match[0];
                if (!unknownItems.has(itemId)) {
                    unknownItems.add(itemId);
                    console.log(LOG_PREFIX, 'Unknown item detected in DOM:', itemId);
                    
                    // Try to load texture for this item
                    tryLoadTexture(itemId);
                }
            }
        }
    }
    
    // Attempt to load texture for an unknown item
    function tryLoadTexture(itemId) {
        if (window.TextureLoader && !window.TextureLoader.hasTexture(itemId)) {
            console.log(LOG_PREFIX, 'Attempting to load texture for:', itemId);
            
            // This would trigger dynamic texture loading if implemented
            // For now, just log it
        }
    }
    
    // Public API
    window.ItemDetector = {
        // Start monitoring for items
        start: function() {
            startMonitoring();
        },
        
        // Get all detected items
        getDetectedItems: function() {
            return new Map(detectedItems);
        },
        
        // Get unknown items
        getUnknownItems: function() {
            return new Set(unknownItems);
        },
        
        // Check if an item is unknown
        isUnknown: function(itemId) {
            return unknownItems.has(itemId);
        },
        
        // Get statistics
        getStats: function() {
            return {
                detectedCount: detectedItems.size,
                unknownCount: unknownItems.size,
                isMonitoring: isMonitoring
            };
        },
        
        // Log detected items
        logDetected: function() {
            console.log(LOG_PREFIX, 'Detected items:', Array.from(detectedItems.keys()));
            console.log(LOG_PREFIX, 'Unknown items:', Array.from(unknownItems));
        }
    };
    
    console.log(LOG_PREFIX, 'Item detector module loaded');
    
})();
