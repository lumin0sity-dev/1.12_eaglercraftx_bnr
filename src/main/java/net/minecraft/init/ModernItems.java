package net.minecraft.init;

import net.minecraft.item.*;
import net.minecraftforge.fml.common.registry.GameRegistry;

public class ModernItems {
    public static final Item BLUE_CANDLE = new ItemBlueCandle();
    public static final Item TRIDENT = new ItemTrident();
    public static final Item COPPER_INGOT = new ItemCopperIngot();
    public static final Item NETHERITE_SWORD = new ItemNetheriteSword();
    public static final Item AMETHYST_SHARD = new ItemAmethystShard();

    public static void register() {
        GameRegistry.register(BLUE_CANDLE);
        GameRegistry.register(TRIDENT);
        GameRegistry.register(COPPER_INGOT);
        GameRegistry.register(NETHERITE_SWORD);
        GameRegistry.register(AMETHYST_SHARD);
    }
}
