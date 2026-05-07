package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

/**
 * Amethyst Shard - introduced in Minecraft 1.17
 * Dropped by amethyst clusters when mined with a pickaxe.
 * Used for crafting spyglasses and tinted glass.
 */
public class ItemAmethystShard extends Item {

    public ItemAmethystShard() {
        this.setUnlocalizedName("amethyst_shard");
        this.setRegistryName("minecraft:amethyst_shard");
        this.setCreativeTab(CreativeTabs.MATERIALS);
        this.setMaxStackSize(64);
    }
}
