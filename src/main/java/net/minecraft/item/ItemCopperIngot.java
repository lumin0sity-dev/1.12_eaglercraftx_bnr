package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

/**
 * Copper Ingot - introduced in Minecraft 1.17
 * A crafting material smelted from raw copper.
 */
public class ItemCopperIngot extends Item {

    public ItemCopperIngot() {
        this.setUnlocalizedName("copper_ingot");
        this.setRegistryName("minecraft:copper_ingot");
        this.setCreativeTab(CreativeTabs.MATERIALS);
        this.setMaxStackSize(64);
    }
}
