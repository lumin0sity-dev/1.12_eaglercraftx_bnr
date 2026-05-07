package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

/**
 * Amethyst Shard - Added in Minecraft 1.17 (Caves & Cliffs Part I)
 * Drops from amethyst clusters found inside amethyst geodes.
 * Used to craft tinted glass, spyglasses, and calibrated sculk sensors.
 *
 * BEGINNER NOTE:
 * Like the copper ingot, this is a simple material item with no special behavior.
 * These are the easiest items to add to the game!
 * If you want to add a new simple item, copy this file and change:
 * 1. The class name (ItemAmethystShard -> ItemYourItem)
 * 2. setUnlocalizedName() value
 * 3. setRegistryName() value
 * 4. setCreativeTab() to the right tab
 * That's it!
 */
public class ItemAmethystShard extends Item {

    /**
     * Constructor - this runs when the item is first created during game startup
     */
    public ItemAmethystShard() {
        // Internal name used in code
        this.setUnlocalizedName("amethyst_shard");

        // Registry name - must be unique
        this.setRegistryName("amethyst_shard");

        // Amethyst shards go in the materials tab
        this.setCreativeTab(CreativeTabs.MATERIALS);

        // Shards stack up to 64
        this.setMaxStackSize(64);
    }
}
