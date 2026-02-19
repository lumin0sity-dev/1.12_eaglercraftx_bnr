package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

public class ItemBlueCandle extends Item {
    public ItemBlueCandle() {
        this.setUnlocalizedName("blue_candle");
        this.setRegistryName("minecraft", "blue_candle");
        this.setCreativeTab(CreativeTabs.DECORATIONS);
        this.maxStackSize = 64;
    }
}
