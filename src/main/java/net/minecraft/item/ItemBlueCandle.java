package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

/**
 * Blue Candle - introduced in Minecraft 1.17
 * A decorative light-source block item.
 */
public class ItemBlueCandle extends Item {

    public ItemBlueCandle() {
        this.setUnlocalizedName("blue_candle");
        this.setRegistryName("minecraft:blue_candle");
        this.setCreativeTab(CreativeTabs.DECORATIONS);
        this.setMaxStackSize(64);
    }
}
