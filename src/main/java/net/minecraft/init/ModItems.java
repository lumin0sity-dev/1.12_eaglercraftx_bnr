package net.minecraft.init;

import net.minecraft.item.Item;
import net.minecraft.item.ItemAmethystShard;
import net.minecraft.item.ItemBlueCandle;
import net.minecraft.item.ItemCopperIngot;
import net.minecraft.item.ItemNetheriteSword;
import net.minecraft.item.ItemTrident;
import net.minecraftforge.fml.common.registry.GameRegistry;

/**
 * ModItems - Registration class for 1.13+ items added to the Eaglercraft 1.12 client.
 *
 * Call {@link #register()} during the FML pre-initialization phase so that
 * items are registered before any world/server connection is established.
 *
 * Usage in your mod's main class:
 * <pre>
 *   {@literal @}EventHandler
 *   public void preInit(FMLPreInitializationEvent event) {
 *       ModItems.register();
 *   }
 * </pre>
 */
public class ModItems {

    // ---- 1.13+ Items -------------------------------------------------------

    /** Blue Candle (1.17) - decorative light source */
    public static final Item BLUE_CANDLE = new ItemBlueCandle();

    /** Trident (1.13) - melee/ranged weapon */
    public static final Item TRIDENT = new ItemTrident();

    /** Copper Ingot (1.17) - crafting material */
    public static final Item COPPER_INGOT = new ItemCopperIngot();

    /** Netherite Sword (1.16) - strongest sword */
    public static final Item NETHERITE_SWORD = new ItemNetheriteSword();

    /** Amethyst Shard (1.17) - crafting material */
    public static final Item AMETHYST_SHARD = new ItemAmethystShard();

    // ------------------------------------------------------------------------

    /**
     * Register all items with the Forge GameRegistry.
     * Must be called during the FML pre-initialization phase.
     */
    public static void register() {
        registerItem(BLUE_CANDLE);
        registerItem(TRIDENT);
        registerItem(COPPER_INGOT);
        registerItem(NETHERITE_SWORD);
        registerItem(AMETHYST_SHARD);
    }

    private static void registerItem(Item item) {
        GameRegistry.register(item);
    }
}
