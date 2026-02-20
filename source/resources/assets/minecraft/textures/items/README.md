# Textures Directory

Place your item textures here as `.png` files.

## Required Textures

The following texture files are needed for the 5 example items:

| File | Item | Size |
|------|------|------|
| `blue_candle.png` | Blue Candle | 16x16 px |
| `trident.png` | Trident | 16x16 px |
| `copper_ingot.png` | Copper Ingot | 16x16 px |
| `netherite_sword.png` | Netherite Sword | 16x16 px |
| `amethyst_shard.png` | Amethyst Shard | 16x16 px |

## Where to Get Textures

### Option 1: Extract from Vanilla Minecraft (Recommended)
1. Find your Minecraft installation folder:
   - **Windows:** `%APPDATA%\.minecraft\versions\1.21.1\1.21.1.jar`
   - **Mac:** `~/Library/Application Support/minecraft/versions/1.21.1/1.21.1.jar`
   - **Linux:** `~/.minecraft/versions/1.21.1/1.21.1.jar`
2. Open the `.jar` file with 7-Zip or WinRAR (it's just a zip file)
3. Navigate to `assets/minecraft/textures/item/`
4. Copy the texture files you need to this directory

### Option 2: Use the Classic Faithful 32x Pack
The repository includes `Classic Faithful 32x - 1.21.1.zip` in the root directory.
Extract it and find textures in `assets/minecraft/textures/item/`.
Note: These are 32x32 pixels. Resize to 16x16 if needed, or keep at 32x32
(Eaglercraft should handle either size, but 16x16 is standard for 1.12).

### Option 3: Create Your Own Textures
Use any pixel art editor (Aseprite, GIMP, Paint.NET) to create 16x16 PNG files.

## Important Notes

- Textures MUST be PNG format
- Recommended size: 16x16 pixels (vanilla Minecraft standard)
- The filename must EXACTLY match the texture path in the model JSON
  (e.g., model says `"layer0": "minecraft:items/blue_candle"` → file is `blue_candle.png`)
- Textures are case-sensitive on Linux/Mac systems
