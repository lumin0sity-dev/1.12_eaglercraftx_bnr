package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

/**
 * Trident - Added in Minecraft 1.13
 * A throwable weapon that can be enchanted with Loyalty, Riptide, Channeling, etc.
 *
 * BEGINNER NOTE:
 * Weapons like the trident don't stack (you can only hold 1 at a time),
 * and they have durability (they break after being used a certain number of times).
 * setMaxDamage() controls how many uses before it breaks.
 */
public class ItemTrident extends Item {

    /**
     * Constructor - this runs when the item is first created during game startup
     */
    public ItemTrident() {
        // Internal name used in code
        this.setUnlocalizedName("trident");

        // Registry name - must be unique
        this.setRegistryName("trident");

        // Tridents go in the combat tab alongside swords and bows
        this.setCreativeTab(CreativeTabs.COMBAT);

        // Weapons don't stack - you can only hold 1 at a time
        this.setMaxStackSize(1);

        // Durability: how many uses before the item breaks
        // Trident has 250 durability in vanilla Minecraft 1.13+
        this.setMaxDamage(250);
    }
}
