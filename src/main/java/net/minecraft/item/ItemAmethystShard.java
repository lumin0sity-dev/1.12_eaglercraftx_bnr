package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

public class ItemAmethystShard extends Item {
    public ItemAmethystShard() {
        this.setUnlocalizedName("amethyst_shard");
        this.setRegistryName("minecraft", "amethyst_shard");
        this.setCreativeTab(CreativeTabs.MATERIALS);
        this.maxStackSize = 64;
    }
}
