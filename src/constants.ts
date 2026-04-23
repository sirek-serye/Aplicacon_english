import { Unit, Mission, ShopItem, Student } from './types';

export const CURRENT_UNIT: Unit = {
  id: 'unit-1',
  number: 1,
  title: 'Welcome to School',
  description: 'Learn how to greet friends and teachers!',
  progress: 60,
  lessonsCompleted: 3,
  totalLessons: 5,
};

export const MISSIONS: Mission[] = [
  { id: '1', title: 'Log in today', gold: 50, completed: true },
  { id: '2', title: 'Learn 5 greetings', gold: 100, completed: false, progress: 2, total: 5 },
  { id: '3', title: 'Score 100% on a quiz', gold: 200, completed: false },
];

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: '1',
    name: 'Safari Fedora',
    description: 'Classic adventurer style.',
    price: 350,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD0CeHT7EnivjS40BUyplIiEFBLGxMk7j2FgJHxTrTMJ6BUV6YguGXSQ3WW3-7xeaXEIWEbqBpSXZTRwxMSbAkTn0OYdpRmjtXXbL35Drpgqgm71y0Z00AgwkVOi-JjALyBQkHNYXzGrZBL293nV3DnVNbZ3Q8jA0UUaM_Ux_2OaCL2tHF3jFy1JFR0_NmpXJ4mgAsACF-EPcxS31kdc1gw5INbKCIFu40ywCa4z9rQeWEal4wvI9iIfd5ZmoNNN4YDkgH-GjxRmOpi',
    category: 'hats',
    owned: false,
    equipped: false,
    isNew: true,
  },
  {
    id: '2',
    name: 'Sky Goggles',
    description: 'See clearly in the clouds.',
    price: 1500,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD9q8rloHtf2mLbWzB46LJtcSd08Y2DEBAaslRwa7yHsV3OAU5rnuC2f32YiDhgLdVyCvlGlzMUAPo40DrRfERPxc6zs_hgAOwFNBcnVihCJR8eESjPrTDhFJNoysRZQpsl5To2TCQ7OXOktnfXvTeAL71AHlaX2tXatTNRKxoAGXIHOUe1ve35BEXjX2JrE6sxYHfzP0iFXPoVu2US7RPEjaEx-GZd2PmV5DSJWSGZPkrMSAFmy973inykWCzO-gPuoUMOwrRNs6l7',
    category: 'hats',
    owned: false,
    equipped: false,
  },
  {
    id: '3',
    name: 'Crimson Bandana',
    description: 'Keeps the dust away.',
    price: 200,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0SCeBlZOtOkxAzE1ul0DiEJGP95Earowq5gBz_CQnz07jA_HLIVnj3rOoGgJWXElfUXtgBN_w1SFiOQRB0xud0mAkNkXQkCWGzMGdymSuEScjQqL-o4UhMdM0ROpl-7hqC3qGgS27qhanXBz7sx2pGFIfTCPiDv-8GMzT26w_QH-iekTfJy4cMQgfL5DJTz-Ymx8JMHy3ZUWFrMQRNIi5G2aXKGIQLWjw6VFNa1GPuRNhW716xrX3E-8BK7NUwzzivVjwQipdImgm',
    category: 'hats',
    owned: true,
    equipped: true,
  },
  {
    id: '4',
    name: 'Snow Peak Beanie',
    description: 'Perfect for tundra levels.',
    price: 250,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwY7KNGuBwPr_tFQPGSw6ADb0pFHKP55A0ZtjbAnmtisWjHbSmFscZyhSCwG1BtLN_7onIoDJIdDkkDi_qcPM5HUyGwm6MstQQKcmJiBgeSKFIvWhs5r6-AKlxT5jZDrTOuNBfgjRS5uFDnlClbO0HKkq8q6ILaMT2QRrBi9mEz8qWcJMJjsRoAdhjRGndQLUctFouCZLfPxcK5FpC7Sbsh4HtseB21dfmQGyg32nWrN9V0zxqbKyiuX9x0VymLmJDrxBKVdJTLGqv',
    category: 'hats',
    owned: false,
    equipped: false,
  }
];

export const STUDENTS: Student[] = [
  { id: '1', name: 'Alex Lopez', initials: 'AL', lastActive: '2h ago', currentUnit: 'Unit 4: The Marketplace', progress: 92, status: 'on-track' },
  { id: '2', name: 'Sofia Martinez', initials: 'SM', lastActive: '1d ago', currentUnit: 'Unit 3: The Forest', progress: 65, status: 'slipping' },
  { id: '3', name: 'Jamal Davis', initials: 'JD', lastActive: '5d ago', currentUnit: 'Unit 2: The Village', progress: 32, status: 'at-risk' },
];
