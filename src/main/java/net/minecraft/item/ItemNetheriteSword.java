package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;
import net.minecraft.item.Item.ToolMaterial;

/**
 * Netherite Sword - introduced in Minecraft 1.16
 * The strongest sword in the game, crafted from netherite ingots.
 * Floats in lava and is fire-resistant.
 */
public class ItemNetheriteSword extends ItemSword {

    public ItemNetheriteSword() {
        super(ToolMaterial.GOLD); // uses GOLD as a placeholder tier; full netherite requires custom ToolMaterial
        this.setUnlocalizedName("netherite_sword");
        this.setRegistryName("minecraft:netherite_sword");
        this.setCreativeTab(CreativeTabs.COMBAT);
        this.setMaxStackSize(1);
        this.setMaxDamage(2031);
    }
}
