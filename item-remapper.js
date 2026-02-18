/**
 * Item Remapper for Eaglercraft 1.12.2
 * 
 * This module provides client-side item remapping for 1.16+ Minecraft items
 * that don't exist in 1.12.2, mapping them to appropriate visual equivalents
 * while preserving their server-side names.
 * 
 * @version 1.0.0
 * @license MIT
 */

(function() {
    'use strict';
    
    console.log("Item Remapper: Initializing...");
    
    /**
     * Comprehensive item mapping table
     * Maps 1.16+ item IDs to 1.12.2 equivalents with custom display names
     * 
     * Format: 'new_item_id': { id: '1.12_item_id', name: 'Display Name' }
     */
    const ITEM_REMAP = {
        // ========== CANDLES (1.17) ==========
        // Map all candle variants to torches
        'candle': { id: 'torch', name: 'Candle' },
        'white_candle': { id: 'torch', name: 'White Candle' },
        'orange_candle': { id: 'torch', name: 'Orange Candle' },
        'magenta_candle': { id: 'torch', name: 'Magenta Candle' },
        'light_blue_candle': { id: 'torch', name: 'Light Blue Candle' },
        'yellow_candle': { id: 'torch', name: 'Yellow Candle' },
        'lime_candle': { id: 'torch', name: 'Lime Candle' },
        'pink_candle': { id: 'torch', name: 'Pink Candle' },
        'gray_candle': { id: 'torch', name: 'Gray Candle' },
        'light_gray_candle': { id: 'torch', name: 'Light Gray Candle' },
        'cyan_candle': { id: 'torch', name: 'Cyan Candle' },
        'purple_candle': { id: 'torch', name: 'Purple Candle' },
        'blue_candle': { id: 'torch', name: 'Blue Candle' },
        'brown_candle': { id: 'torch', name: 'Brown Candle' },
        'green_candle': { id: 'torch', name: 'Green Candle' },
        'red_candle': { id: 'torch', name: 'Red Candle' },
        'black_candle': { id: 'torch', name: 'Black Candle' },
        
        // ========== COPPER ITEMS (1.17) ==========
        // Map copper to iron equivalents
        'copper_ingot': { id: 'iron_ingot', name: 'Copper Ingot' },
        'copper_block': { id: 'iron_block', name: 'Copper Block' },
        'copper_ore': { id: 'iron_ore', name: 'Copper Ore' },
        'raw_copper': { id: 'iron_ingot', name: 'Raw Copper' },
        'raw_copper_block': { id: 'iron_block', name: 'Raw Copper Block' },
        'exposed_copper': { id: 'iron_block', name: 'Exposed Copper' },
        'weathered_copper': { id: 'iron_block', name: 'Weathered Copper' },
        'oxidized_copper': { id: 'iron_block', name: 'Oxidized Copper' },
        'cut_copper': { id: 'iron_block', name: 'Cut Copper' },
        'cut_copper_stairs': { id: 'stone_stairs', name: 'Cut Copper Stairs' },
        'cut_copper_slab': { id: 'stone_slab', name: 'Cut Copper Slab' },
        'waxed_copper_block': { id: 'iron_block', name: 'Waxed Copper Block' },
        'waxed_cut_copper': { id: 'iron_block', name: 'Waxed Cut Copper' },
        'lightning_rod': { id: 'iron_bars', name: 'Lightning Rod' },
        
        // ========== NETHERITE ITEMS (1.16) ==========
        // Map netherite to diamond equivalents
        'netherite_sword': { id: 'diamond_sword', name: 'Netherite Sword' },
        'netherite_pickaxe': { id: 'diamond_pickaxe', name: 'Netherite Pickaxe' },
        'netherite_axe': { id: 'diamond_axe', name: 'Netherite Axe' },
        'netherite_shovel': { id: 'diamond_shovel', name: 'Netherite Shovel' },
        'netherite_hoe': { id: 'diamond_hoe', name: 'Netherite Hoe' },
        'netherite_helmet': { id: 'diamond_helmet', name: 'Netherite Helmet' },
        'netherite_chestplate': { id: 'diamond_chestplate', name: 'Netherite Chestplate' },
        'netherite_leggings': { id: 'diamond_leggings', name: 'Netherite Leggings' },
        'netherite_boots': { id: 'diamond_boots', name: 'Netherite Boots' },
        'netherite_ingot': { id: 'diamond', name: 'Netherite Ingot' },
        'netherite_block': { id: 'diamond_block', name: 'Netherite Block' },
        'netherite_scrap': { id: 'iron_nugget', name: 'Netherite Scrap' },
        
        // ========== AMETHYST ITEMS (1.17) ==========
        // Map amethyst to appropriate crystal/gem equivalents
        'amethyst_shard': { id: 'prismarine_shard', name: 'Amethyst Shard' },
        'amethyst_block': { id: 'prismarine', name: 'Amethyst Block' },
        'amethyst_cluster': { id: 'sea_lantern', name: 'Amethyst Cluster' },
        'large_amethyst_bud': { id: 'sea_lantern', name: 'Large Amethyst Bud' },
        'medium_amethyst_bud': { id: 'sea_lantern', name: 'Medium Amethyst Bud' },
        'small_amethyst_bud': { id: 'sea_lantern', name: 'Small Amethyst Bud' },
        'budding_amethyst': { id: 'prismarine', name: 'Budding Amethyst' },
        'calcite': { id: 'quartz_block', name: 'Calcite' },
        'tuff': { id: 'stone', name: 'Tuff' },
        'smooth_basalt': { id: 'stone', name: 'Smooth Basalt' },
        'spyglass': { id: 'compass', name: 'Spyglass' },
        'tinted_glass': { id: 'glass', name: 'Tinted Glass' },
        
        // ========== DEEPSLATE ITEMS (1.17) ==========
        // Map deepslate to stone/cobblestone equivalents
        'deepslate': { id: 'stone', name: 'Deepslate' },
        'cobbled_deepslate': { id: 'cobblestone', name: 'Cobbled Deepslate' },
        'polished_deepslate': { id: 'stone', name: 'Polished Deepslate' },
        'deepslate_bricks': { id: 'stonebrick', name: 'Deepslate Bricks' },
        'cracked_deepslate_bricks': { id: 'stonebrick', name: 'Cracked Deepslate Bricks' },
        'deepslate_tiles': { id: 'stonebrick', name: 'Deepslate Tiles' },
        'cracked_deepslate_tiles': { id: 'stonebrick', name: 'Cracked Deepslate Tiles' },
        'chiseled_deepslate': { id: 'stonebrick', name: 'Chiseled Deepslate' },
        'deepslate_coal_ore': { id: 'coal_ore', name: 'Deepslate Coal Ore' },
        'deepslate_iron_ore': { id: 'iron_ore', name: 'Deepslate Iron Ore' },
        'deepslate_gold_ore': { id: 'gold_ore', name: 'Deepslate Gold Ore' },
        'deepslate_diamond_ore': { id: 'diamond_ore', name: 'Deepslate Diamond Ore' },
        'deepslate_emerald_ore': { id: 'emerald_ore', name: 'Deepslate Emerald Ore' },
        'deepslate_lapis_ore': { id: 'lapis_ore', name: 'Deepslate Lapis Ore' },
        'deepslate_redstone_ore': { id: 'redstone_ore', name: 'Deepslate Redstone Ore' },
        'deepslate_copper_ore': { id: 'iron_ore', name: 'Deepslate Copper Ore' },
        
        // ========== NETHER UPDATE (1.16) ==========
        // Ancient Debris and related
        'ancient_debris': { id: 'obsidian', name: 'Ancient Debris' },
        'crying_obsidian': { id: 'obsidian', name: 'Crying Obsidian' },
        'respawn_anchor': { id: 'obsidian', name: 'Respawn Anchor' },
        'lodestone': { id: 'obsidian', name: 'Lodestone' },
        
        // Nether blocks
        'crimson_nylium': { id: 'netherrack', name: 'Crimson Nylium' },
        'warped_nylium': { id: 'netherrack', name: 'Warped Nylium' },
        'crimson_roots': { id: 'tallgrass', name: 'Crimson Roots' },
        'warped_roots': { id: 'tallgrass', name: 'Warped Roots' },
        'nether_sprouts': { id: 'tallgrass', name: 'Nether Sprouts' },
        'weeping_vines': { id: 'vine', name: 'Weeping Vines' },
        'twisting_vines': { id: 'vine', name: 'Twisting Vines' },
        'shroomlight': { id: 'glowstone', name: 'Shroomlight' },
        'soul_soil': { id: 'soul_sand', name: 'Soul Soil' },
        'soul_torch': { id: 'torch', name: 'Soul Torch' },
        'soul_lantern': { id: 'lantern', name: 'Soul Lantern' },
        'soul_campfire': { id: 'campfire', name: 'Soul Campfire' },
        
        // Basalt
        'basalt': { id: 'stone', name: 'Basalt' },
        'polished_basalt': { id: 'stone', name: 'Polished Basalt' },
        'blackstone': { id: 'cobblestone', name: 'Blackstone' },
        'polished_blackstone': { id: 'stone', name: 'Polished Blackstone' },
        'chiseled_polished_blackstone': { id: 'stonebrick', name: 'Chiseled Polished Blackstone' },
        'gilded_blackstone': { id: 'gold_ore', name: 'Gilded Blackstone' },
        'polished_blackstone_bricks': { id: 'stonebrick', name: 'Polished Blackstone Bricks' },
        'cracked_polished_blackstone_bricks': { id: 'stonebrick', name: 'Cracked Polished Blackstone Bricks' },
        
        // Nether gold
        'nether_gold_ore': { id: 'gold_ore', name: 'Nether Gold Ore' },
        'gold_nugget': { id: 'gold_nugget', name: 'Gold Nugget' },
        
        // ========== WOOD TYPES ==========
        // Crimson wood (1.16)
        'crimson_planks': { id: 'planks', name: 'Crimson Planks' },
        'crimson_log': { id: 'log', name: 'Crimson Stem' },
        'crimson_stairs': { id: 'oak_stairs', name: 'Crimson Stairs' },
        'crimson_slab': { id: 'wooden_slab', name: 'Crimson Slab' },
        'crimson_fence': { id: 'fence', name: 'Crimson Fence' },
        'crimson_fence_gate': { id: 'fence_gate', name: 'Crimson Fence Gate' },
        'crimson_door': { id: 'wooden_door', name: 'Crimson Door' },
        'crimson_trapdoor': { id: 'trapdoor', name: 'Crimson Trapdoor' },
        'crimson_button': { id: 'wooden_button', name: 'Crimson Button' },
        'crimson_pressure_plate': { id: 'wooden_pressure_plate', name: 'Crimson Pressure Plate' },
        'stripped_crimson_stem': { id: 'log', name: 'Stripped Crimson Stem' },
        
        // Warped wood (1.16)
        'warped_planks': { id: 'planks', name: 'Warped Planks' },
        'warped_log': { id: 'log', name: 'Warped Stem' },
        'warped_stairs': { id: 'oak_stairs', name: 'Warped Stairs' },
        'warped_slab': { id: 'wooden_slab', name: 'Warped Slab' },
        'warped_fence': { id: 'fence', name: 'Warped Fence' },
        'warped_fence_gate': { id: 'fence_gate', name: 'Warped Fence Gate' },
        'warped_door': { id: 'wooden_door', name: 'Warped Door' },
        'warped_trapdoor': { id: 'trapdoor', name: 'Warped Trapdoor' },
        'warped_button': { id: 'wooden_button', name: 'Warped Button' },
        'warped_pressure_plate': { id: 'wooden_pressure_plate', name: 'Warped Pressure Plate' },
        'stripped_warped_stem': { id: 'log', name: 'Stripped Warped Stem' },
        
        // ========== MISCELLANEOUS 1.16+ ITEMS ==========
        // Targets and observers
        'target': { id: 'hay_block', name: 'Target' },
        'sculk_sensor': { id: 'note_block', name: 'Sculk Sensor' },
        
        // Powder snow
        'powder_snow_bucket': { id: 'water_bucket', name: 'Powder Snow Bucket' },
        'powder_snow': { id: 'snow', name: 'Powder Snow' },
        
        // Glow items (1.17)
        'glow_ink_sac': { id: 'dye', name: 'Glow Ink Sac' },
        'glow_item_frame': { id: 'item_frame', name: 'Glow Item Frame' },
        'glow_berries': { id: 'sweet_berries', name: 'Glow Berries' },
        'glow_lichen': { id: 'vine', name: 'Glow Lichen' },
        
        // Dripstone (1.17)
        'dripstone_block': { id: 'stone', name: 'Dripstone Block' },
        'pointed_dripstone': { id: 'stone', name: 'Pointed Dripstone' },
        
        // Misc blocks
        'moss_block': { id: 'grass', name: 'Moss Block' },
        'moss_carpet': { id: 'carpet', name: 'Moss Carpet' },
        'azalea': { id: 'sapling', name: 'Azalea' },
        'flowering_azalea': { id: 'sapling', name: 'Flowering Azalea' },
        'azalea_leaves': { id: 'leaves', name: 'Azalea Leaves' },
        'flowering_azalea_leaves': { id: 'leaves', name: 'Flowering Azalea Leaves' },
        'spore_blossom': { id: 'red_flower', name: 'Spore Blossom' },
        'big_dripleaf': { id: 'waterlily', name: 'Big Dripleaf' },
        'small_dripleaf': { id: 'tallgrass', name: 'Small Dripleaf' },
        'hanging_roots': { id: 'vine', name: 'Hanging Roots' },
        'rooted_dirt': { id: 'dirt', name: 'Rooted Dirt' },
        
        // Chain (1.16)
        'chain': { id: 'iron_bars', name: 'Chain' },
        
        // Misc items
        'bundle': { id: 'leather', name: 'Bundle' },
        'goat_horn': { id: 'bone', name: 'Goat Horn' },
    };
    
    /**
     * Remaps an item ID to its 1.12.2 equivalent
     * @param {string} itemId - The item ID to remap
     * @returns {object|null} Remapped item data or null if no mapping exists
     */
    function remapItem(itemId) {
        if (ITEM_REMAP.hasOwnProperty(itemId)) {
            const mapping = ITEM_REMAP[itemId];
            console.log(`Item Remapper: Mapping "${itemId}" -> "${mapping.id}" (${mapping.name})`);
            return mapping;
        }
        return null;
    }
    
    /**
     * Gets the total count of item mappings
     * @returns {number} Number of mapped items
     */
    function getMappingCount() {
        return Object.keys(ITEM_REMAP).length;
    }
    
    /**
     * Checks if an item has a mapping
     * @param {string} itemId - The item ID to check
     * @returns {boolean} True if mapping exists
     */
    function hasMapping(itemId) {
        return ITEM_REMAP.hasOwnProperty(itemId);
    }
    
    /**
     * Gets all mappings for a specific category
     * @param {string} category - The category name (e.g., 'candle', 'copper', 'netherite')
     * @returns {object} Object containing all mappings for the category
     */
    function getMappingsByCategory(category) {
        const results = {};
        const searchTerm = category.toLowerCase();
        
        for (const [key, value] of Object.entries(ITEM_REMAP)) {
            if (key.includes(searchTerm) || value.name.toLowerCase().includes(searchTerm)) {
                results[key] = value;
            }
        }
        
        return results;
    }
    
    // Expose API to global scope
    window.ItemRemapper = {
        remap: remapItem,
        hasMapping: hasMapping,
        getMappingCount: getMappingCount,
        getMappingsByCategory: getMappingsByCategory,
        version: '1.0.0',
        mappings: ITEM_REMAP
    };
    
    // Log initialization
    console.log(`Item Remapper: Successfully initialized with ${getMappingCount()} item mappings`);
    console.log('Item Remapper: Available categories - candles, copper, netherite, amethyst, deepslate, crimson, warped');
    console.log('Item Remapper: API available at window.ItemRemapper');
    
    // Example usage log
    if (typeof console !== 'undefined' && console.info) {
        console.info('Item Remapper: Example usage:');
        console.info('  window.ItemRemapper.remap("blue_candle")');
        console.info('  window.ItemRemapper.hasMapping("netherite_sword")');
        console.info('  window.ItemRemapper.getMappingsByCategory("copper")');
    }
    
})();
