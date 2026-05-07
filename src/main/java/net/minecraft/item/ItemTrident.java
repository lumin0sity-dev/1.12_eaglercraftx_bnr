package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;
import net.minecraft.item.Item.ToolMaterial;

/**
 * Trident - introduced in Minecraft 1.13
 * A melee and ranged weapon that can be thrown.
 */
public class ItemTrident extends ItemSword {

    public ItemTrident() {
        super(ToolMaterial.DIAMOND);
        this.setUnlocalizedName("trident");
        this.setRegistryName("minecraft:trident");
        this.setCreativeTab(CreativeTabs.COMBAT);
        this.setMaxStackSize(1);
        this.setMaxDamage(250);
    }
}
