package net.minecraft.item;

import net.minecraft.creativetab.CreativeTabs;

/**
 * Netherite Sword - Added in Minecraft 1.16 (Nether Update)
 * The strongest sword in the game, stronger than diamond.
 * It's also fire-resistant and floats in lava.
 *
 * BEGINNER NOTE:
 * This class extends "ItemSword" instead of "Item" because it's a sword.
 * ItemSword already handles attack damage, sweep attack, and other sword behavior.
 * We just need to set the material and custom durability.
 *
 * "super(ToolMaterial.DIAMOND)" means "call the ItemSword constructor with diamond material".
 * We use DIAMOND as the base because Eaglercraft 1.12 doesn't have NETHERITE material.
 * We then override the durability with setMaxDamage() to match actual netherite values.
 */
public class ItemNetheriteSword extends ItemSword {

    /**
     * Constructor - this runs when the item is first created during game startup
     *
     * @param material - The tool material that determines base stats
     */
    public ItemNetheriteSword() {
        // Call the parent ItemSword constructor with diamond stats as a base
        // NETHERITE doesn't exist in 1.12, so we approximate with DIAMOND
        super(ToolMaterial.DIAMOND);

        // Internal name used in code
        this.setUnlocalizedName("netherite_sword");

        // Registry name - must be unique
        this.setRegistryName("netherite_sword");

        // Swords go in the combat tab
        this.setCreativeTab(CreativeTabs.COMBAT);

        // Netherite sword durability in vanilla: 2031 uses
        // Diamond sword durability: 1561 uses (for reference)
        this.setMaxDamage(2031);
    }
}
