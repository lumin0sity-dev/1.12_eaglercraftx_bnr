package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

/**
 * Blue Candle - Added in Minecraft 1.17
 * This is a decorative light source that comes in various colors.
 *
 * BEGINNER NOTE:
 * This class extends "Item" which is the base class for all items in Minecraft.
 * The constructor (the method with the same name as the class) sets up the item's properties.
 */
public class ItemBlueCandle extends Item {

    /**
     * Constructor - this runs when the item is first created during game startup
     */
    public ItemBlueCandle() {
        // Internal name used in code (no spaces, use underscores)
        this.setUnlocalizedName("blue_candle");

        // Registry name - must be unique across ALL items (format: "modid:item_name" or just "item_name")
        this.setRegistryName("blue_candle");

        // Which creative inventory tab this item appears in
        // Options: BUILDING_BLOCKS, DECORATIONS, REDSTONE, TRANSPORTATION,
        //          MISC, FOOD, TOOLS, COMBAT, BREWING, MATERIALS, SEARCH, INVENTORY
        this.setCreativeTab(CreativeTabs.DECORATIONS);

        // How many of this item can stack in one inventory slot (max 64)
        this.setMaxStackSize(64);
    }
}
