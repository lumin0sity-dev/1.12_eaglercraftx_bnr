package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

public class ItemNetheriteSword extends ItemSword {
    public ItemNetheriteSword() {
        super(ToolMaterial.DIAMOND); // Use diamond stats for now
        this.setUnlocalizedName("netherite_sword");
        this.setRegistryName("minecraft", "netherite_sword");
        this.setCreativeTab(CreativeTabs.COMBAT);
    }
}
