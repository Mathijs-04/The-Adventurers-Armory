<script setup>
import Parchment from '../assets/Parchment.webp'
import FlameGif from '../assets/flame.gif'
import ProductCard from './ProductCard.vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { playButtonSound } from '../composables/useSound.js'

const emit = defineEmits(['viewDetails'])

const storeFlamePositions = ref({
  flame1: { top: '16%', left: '88.0%' },
  flame2: { top: '16%', left: '11.0%' }
})

const storeFlameConfigs = {
  windowed: {
    flame1: { top: '16%', left: '88.0%' },
    flame2: { top: '16%', left: '11.0%' }
  },
  laptop: {
    flame1: { top: '16%', left: '90.0%' },
    flame2: { top: '16%', left: '9.0%' }
  },
  fullscreen: {
    flame1: { top: '19%', left: '88.0%' },
    flame2: { top: '19%', left: '11.0%' }
  }
}

// Available item images
const itemImages = [
  'Item (1).png',
  'Item (2).png',
  'Item (3).png',
  'Item (4).png',
  'Item (5).png',
  'Item (6).png',
  'Item (7).png',
  'Item (8).png',
  'Item (9).png',
  'Item (10).png',
  'Item (11).png',
  'Item (12).png',
  'Item (13).png',
  'Item (14).png',
  'Item (15).png',
  'Item (16).png',
  'Item (17).png',
  'Item (18).png',
  'Item (19).png',
  'Item (20).png',
  'Item (21).png',
  'Item (22).png',
  'Item (23).png',
  'Item (24).png',
  'Item (25).png',
  'Item (26).png',
  'Item (27).png',
  'Item (28).png',
  'Item (29).png',
  'Item (30).png',
  'Item (31).png',
  'Item (32).png',
  'Item (33).png',
  'Item (34).png'
]

// Item data with names, descriptions, and prices
const itemData = [
  {
    name: 'Enchanted Sword',
    description: 'A legendary blade forged in dragonfire, imbued with ancient magic that never dulls.',
    price: 1250
  },
  {
    name: 'Mystic Potion',
    description: 'An elixir of rejuvenation that restores vitality and grants temporary invulnerability.',
    price: 450
  },
  {
    name: 'Wizard\'s Tome',
    description: 'An ancient spellbook containing forbidden knowledge and powerful incantations.',
    price: 3200
  },
  {
    name: 'Dragon Scale Armor',
    description: 'Impenetrable armor forged from the scales of an ancient dragon, offering ultimate protection.',
    price: 2800
  },
  {
    name: 'Phoenix Feather Wand',
    description: 'A wand crafted from the feather of a phoenix, channeling fire and rebirth magic.',
    price: 1950
  },
  {
    name: 'Crystal Ball of Foresight',
    description: 'A mystical orb that reveals glimpses of future events and hidden truths.',
    price: 3400
  },
  {
    name: 'Shadow Cloak',
    description: 'A cloak woven from darkness itself, granting invisibility and protection from light-based attacks.',
    price: 1800
  },
  {
    name: 'Elven Bow',
    description: 'A finely crafted bow from ancient elven woods, never misses its mark when drawn with pure intent.',
    price: 950
  },
  {
    name: 'Dwarven Hammer',
    description: 'Forged in the deepest mountains, this hammer can shape any metal and shatter any stone.',
    price: 1100
  },
  {
    name: 'Healing Crystal',
    description: 'A radiant crystal that mends wounds and cures ailments with a single touch.',
    price: 650
  },
  {
    name: 'Frost Gauntlets',
    description: 'Gloves imbued with eternal winter, freezing enemies and creating ice barriers.',
    price: 1350
  },
  {
    name: 'Lightning Rod',
    description: 'A staff that channels thunderbolts, striking multiple foes with devastating electrical energy.',
    price: 2200
  },
  {
    name: 'Poison Dagger',
    description: 'A blade coated in deadly venom that weakens enemies with every strike.',
    price: 750
  },
  {
    name: 'Mirror Shield',
    description: 'A shield that reflects spells and illusions back at their casters.',
    price: 1650
  },
  {
    name: 'Timekeeper Amulet',
    description: 'A pendant that allows brief glimpses into possible futures, aiding in decision-making.',
    price: 2900
  },
  {
    name: 'Fire Ruby Ring',
    description: 'A ring pulsing with inner flame, protecting the wearer from cold and granting fire resistance.',
    price: 1400
  },
  {
    name: 'Wind Walker Boots',
    description: 'Boots that allow the wearer to walk on air and move with incredible speed.',
    price: 1700
  },
  {
    name: 'Mind Stone',
    description: 'A gem that enhances mental abilities, allowing telepathy and mind control over weak-willed creatures.',
    price: 2500
  },
  {
    name: 'Soul Reaper Scythe',
    description: 'A spectral weapon that harvests the life force of enemies, growing stronger with each kill.',
    price: 3100
  },
  {
    name: 'Earth Titan Gauntlet',
    description: 'A massive glove that summons stone golems and controls the very earth beneath your feet.',
    price: 2750
  },
  {
    name: 'Water Spirit Orb',
    description: 'A floating sphere that controls water, creating waves, healing springs, and drowning mists.',
    price: 1850
  },
  {
    name: 'Blood Thorn Vine',
    description: 'A living plant weapon that drains the life from enemies and heals its wielder.',
    price: 1200
  },
  {
    name: 'Void Crystal',
    description: 'A dark gem that opens portals to other realms and banishes creatures to the void.',
    price: 3600
  },
  {
    name: 'Sunflare Crown',
    description: 'A crown that radiates holy light, blinding undead and healing allies in its glow.',
    price: 2400
  },
  {
    name: 'Moonshadow Mask',
    description: 'A mask that enhances night vision and allows transformation into various creatures.',
    price: 2100
  },
  {
    name: 'Stormcaller Horn',
    description: 'A horn that summons tempests and lightning storms to devastate battlefields.',
    price: 1950
  },
  {
    name: 'Lifebloom Seed',
    description: 'A magical seed that grows into a tree of eternal life, healing all who rest beneath it.',
    price: 800
  },
  {
    name: 'Death Knight Helm',
    description: 'An intimidating helmet that strikes fear into enemies and commands undead armies.',
    price: 2300
  },
  {
    name: 'Arcane Focus',
    description: 'A floating orb that amplifies magical power and stores excess mana for later use.',
    price: 1600
  },
  {
    name: 'Beastmaster Whistle',
    description: 'A whistle that can tame wild creatures and command them in battle.',
    price: 900
  },
  {
    name: 'Gravity Boots',
    description: 'Boots that manipulate gravitational forces, allowing impossible jumps and crushing strikes.',
    price: 1900
  },
  {
    name: 'Dreamweaver Pillow',
    description: 'A pillow that allows entry into dream realms, where thoughts become reality.',
    price: 1450
  },
  {
    name: 'Chaos Dice',
    description: 'Magical dice that can alter probability and create random magical effects.',
    price: 1150
  },
  {
    name: 'Harmony Harp',
    description: 'An instrument whose music calms beasts, heals wounds, and brings peace to troubled lands.',
    price: 1300
  }
]

// Function to get 3 random items
const getRandomItems = () => {
  const shuffled = [...itemImages].sort(() => 0.5 - Math.random())
  const selectedImages = shuffled.slice(0, 3)

  return selectedImages.map((image, index) => ({
    id: index + 1,
    image: image,
    ...itemData.find((_, dataIndex) => dataIndex === itemImages.indexOf(image))
  }))
}

// Sample product data - randomly selected each load
const products = ref(getRandomItems())

const handleProductSelect = (product) => {
  playButtonSound()
  emit('viewDetails', product)
}

const updateStoreFlamePosition = () => {
  // Check if in fullscreen mode
  if (document.fullscreenElement) {
    storeFlamePositions.value = storeFlameConfigs.fullscreen
  }
  // Check for laptop screen size (≤1440px)
  else if (window.innerWidth <= 1440) {
    storeFlamePositions.value = storeFlameConfigs.laptop
  }
  // Default windowed mode for larger screens
  else {
    storeFlamePositions.value = storeFlameConfigs.windowed
  }
}

onMounted(() => {
  updateStoreFlamePosition()
  document.addEventListener('fullscreenchange', updateStoreFlamePosition)
  window.addEventListener('resize', updateStoreFlamePosition)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', updateStoreFlamePosition)
  window.removeEventListener('resize', updateStoreFlamePosition)
})
</script>

<template>
  <div class="store">
    <img :src="FlameGif" alt="Store Flame 1" class="store-flame store-flame-1" />
    <img :src="FlameGif" alt="Store Flame 2" class="store-flame store-flame-2" />

    <div class="parchment-banner">
      <img :src="Parchment" alt="Parchment" class="parchment-image" />
      <h1 class="banner-text">Featured Items</h1>
    </div>

    <div class="products-grid">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
        @select-product="handleProductSelect"
      />
    </div>
  </div>
</template>

<style scoped>
.store {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-image: url('../assets/StoreView.webp');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.parchment-banner {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  margin-top: -12svh;
}

.parchment-image {
  max-width: 48vw;
  max-height: 36vh;
  object-fit: contain;
  filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.5));
}

.banner-text {
  position: absolute;
  top: 53%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: transparent;
  background: linear-gradient(45deg, #8B4513 0%, #654321 50%, #8B4513 100%);
  background-clip: text;
  -webkit-background-clip: text;
  font-family: 'Firlest', Arial, sans-serif;
  font-size: clamp(1.2rem, 3vw, 2.4rem);
  font-weight: normal;
  letter-spacing: 3px;
  text-align: center;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.7);
  pointer-events: none;
  white-space: nowrap;
  margin: 0;
  margin-top: -20px;
}

.products-grid {
  position: absolute;
  top: 50vh;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 3vw;
  justify-content: center;
  align-items: center;
  z-index: 15;
  max-width: 95vw;
}

.products-grid :deep(.product-card) {
  flex: 1;
  max-width: 585px; /* 450px * 1.3 = 585px (30% bigger) */
  min-width: 390px; /* 300px * 1.3 = 390px (30% bigger) */
}

/* Store flame styling */
.store-flame {
  position: absolute;
  width: 100px;
  height: 130px;
  pointer-events: none;
  z-index: 5;
  transform: translate(-50%, -50%);
}

.store-flame-1 {
  top: v-bind('storeFlamePositions.flame1.top');
  left: v-bind('storeFlamePositions.flame1.left');
}

.store-flame-2 {
  top: v-bind('storeFlamePositions.flame2.top');
  left: v-bind('storeFlamePositions.flame2.left');
}

/* Hide store flames on small and large screens (same as homepage) */
@media (max-width: 767px) {
  .store-flame {
    display: none !important;
  }
}

@media (min-width: 1921px) {
  .store-flame {
    display: none !important;
  }
}
</style>
