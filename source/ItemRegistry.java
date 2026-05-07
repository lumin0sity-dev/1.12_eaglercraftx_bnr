package net.minecraft.init;

import net.minecraft.item.*;

/**
 * Item Registry - Where all custom items are declared and registered.
 *
 * HOW THIS WORKS (for beginners):
 * 1. We declare each item as a "static final" field at the top of this class.
 *    This creates one shared copy of the item that the whole game uses.
 *
 * 2. The registerItems() method is called once at game startup.
 *    It loops through each item and calls registerItem() to add it to the game.
 *
 * 3. Once registered, items appear in creative mode, can be given with /give,
 *    and can be referenced in recipes.
 *
 * TO ADD YOUR OWN ITEM:
 * 1. Create your item class in the items/ folder (copy an existing one as a template)
 * 2. Add a line here: public static final Item YOUR_ITEM = new ItemYourItem();
 * 3. Add a registerItem(YOUR_ITEM) call in registerItems()
 * 4. Add your texture to resources/assets/minecraft/textures/items/
 * 5. Add your model JSON to resources/assets/minecraft/models/item/
 * 6. Rebuild the project
 */
public class ItemRegistry {

    // =========================================================================
    // ITEM DECLARATIONS
    // Add your new items here as "public static final Item NAME = new ItemClass();"
    // =========================================================================

    /** Blue Candle - decorative light source (added in 1.17) */
    public static final Item BLUE_CANDLE = new ItemBlueCandle();

    /** Trident - throwable ocean weapon (added in 1.13) */
    public static final Item TRIDENT = new ItemTrident();

    /** Copper Ingot - crafting material from Raw Copper (added in 1.17) */
    public static final Item COPPER_INGOT = new ItemCopperIngot();

    /** Netherite Sword - strongest sword in the game (added in 1.16) */
    public static final Item NETHERITE_SWORD = new ItemNetheriteSword();

    /** Amethyst Shard - crafting material from amethyst geodes (added in 1.17) */
    public static final Item AMETHYST_SHARD = new ItemAmethystShard();

    // =========================================================================
    // REGISTRATION METHOD
    // This is called once at game startup to register all items
    // =========================================================================

    /**
     * Called during game initialization to register all custom items.
     *
     * IMPORTANT: This method must be called from the game's initialization code.
     * In Eaglercraft, look for the place where vanilla items are registered
     * (usually in Bootstrap.java or Items.java) and call this method there.
     */
    public static void registerItems() {
        // Register each item - add a new registerItem() call for each item you add
        registerItem(BLUE_CANDLE);
        registerItem(TRIDENT);
        registerItem(COPPER_INGOT);
        registerItem(NETHERITE_SWORD);
        registerItem(AMETHYST_SHARD);
    }

    // =========================================================================
    // HELPER METHOD
    // =========================================================================

    /**
     * Helper method to register a single item into the game.
     *
     * ⚠️ IMPORTANT FOR EAGLERCRAFT USERS:
     * Eaglercraft is not a standard Forge mod — it is a transpiled/compiled version
     * of vanilla Minecraft that runs in a browser via WebAssembly/JavaScript.
     * The registration code below is based on standard Forge 1.12.2 patterns and
     * is provided as a REFERENCE / STARTING POINT.
     *
     * You WILL need to adapt this to match how the Eaglercraft source code you are
     * working with actually registers items. The best approach is to:
     * 1. Search the Eaglercraft source for where a vanilla item (e.g. "ItemDiamond")
     *    is registered.
     * 2. Copy that exact same pattern here.
     *
     * @param item - The item instance to register
     */
    private static void registerItem(Item item) {
        // -----------------------------------------------------------------------
        // OPTION A: Forge-based registration (standard Forge 1.12.2 pattern)
        // Use this if the Eaglercraft source uses Forge's GameRegistry.
        // -----------------------------------------------------------------------
        net.minecraftforge.fml.common.registry.GameRegistry.register(item);

        // -----------------------------------------------------------------------
        // OPTION B: If Forge is NOT used, try the vanilla registry directly:
        // net.minecraft.util.ResourceLocation registryName = item.getRegistryName();
        // net.minecraft.item.Item.REGISTRY.register(0 /* unused */, registryName, item);
        // -----------------------------------------------------------------------

        // Register the item's model so it renders correctly in-game.
        // This tells the renderer to look for the JSON file at:
        //   assets/minecraft/models/item/<registryName>.json
        //
        // NOTE: This client-side call may need to be moved to a @SideOnly(Side.CLIENT)
        // init method if the build complains about server-side access to client classes.
        net.minecraft.client.renderer.block.model.ModelResourceLocation modelLocation =
            new net.minecraft.client.renderer.block.model.ModelResourceLocation(
                item.getRegistryName(), "inventory"
            );
        net.minecraft.client.Minecraft.getMinecraft()
            .getRenderItem()
            .getItemModelMesher()
            .register(item, 0, modelLocation);
    }
}
