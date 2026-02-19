package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

public class ItemTrident extends Item {
    public ItemTrident() {
        this.setUnlocalizedName("trident");
        this.setRegistryName("minecraft", "trident");
        this.setCreativeTab(CreativeTabs.COMBAT);
        this.maxStackSize = 1;
        this.setMaxDamage(250);
    }
}
