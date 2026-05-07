package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

/**
 * Copper Ingot - Added in Minecraft 1.17 (Caves & Cliffs Part I)
 * Obtained by smelting Raw Copper in a furnace or blast furnace.
 * Used to craft copper blocks, lightning rods, and spyglasses.
 *
 * BEGINNER NOTE:
 * This is a simple material item - it has no special behavior.
 * Items like this (ingots, shards, etc.) are the simplest type to add!
 */
public class ItemCopperIngot extends Item {

    /**
     * Constructor - this runs when the item is first created during game startup
     */
    public ItemCopperIngot() {
        // Internal name used in code
        this.setUnlocalizedName("copper_ingot");

        // Registry name - must be unique
        this.setRegistryName("copper_ingot");

        // Ingots go in the materials tab alongside iron ingots, gold ingots, etc.
        this.setCreativeTab(CreativeTabs.MATERIALS);

        // Ingots stack up to 64 (default is already 64, but being explicit is good practice)
        this.setMaxStackSize(64);
    }
}
