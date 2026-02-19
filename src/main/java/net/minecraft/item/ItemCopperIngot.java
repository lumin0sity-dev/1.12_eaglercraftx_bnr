package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

public class ItemCopperIngot extends Item {
    public ItemCopperIngot() {
        this.setUnlocalizedName("copper_ingot");
        this.setRegistryName("minecraft", "copper_ingot");
        this.setCreativeTab(CreativeTabs.MATERIALS);
        this.maxStackSize = 64;
    }
}
