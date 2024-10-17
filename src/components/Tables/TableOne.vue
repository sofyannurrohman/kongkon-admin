<script setup lang="ts">
import { ref } from 'vue'

import BrandOne from '@/assets/images/brand/brand-01.svg'
import BrandTwo from '@/assets/images/brand/brand-02.svg'
import BrandThree from '@/assets/images/brand/brand-03.svg'
import BrandFour from '@/assets/images/brand/brand-04.svg'
import BrandFive from '@/assets/images/brand/brand-05.svg'

const brandData = ref([
  {
    logo: BrandOne,
    name: 'Google',
    visitors: 3.5,
    revenues: '5,768',
    sales: 590,
    conversion: 4.8
  },
  {
    logo: BrandTwo,
    name: 'Twitter',
    visitors: 2.2,
    revenues: '4,635',
    sales: 467,
    conversion: 4.3
  },
  {
    logo: BrandThree,
    name: 'Github',
    visitors: 2.1,
    revenues: '4,290',
    sales: 420,
    conversion: 3.7
  },
  {
    logo: BrandFour,
    name: 'Vimeo',
    visitors: 1.5,
    revenues: '3,580',
    sales: 389,
    conversion: 2.5
  },
  {
    logo: BrandFive,
    name: 'Facebook',
    visitors: 3.5,
    revenues: '6,768',
    sales: 390,
    conversion: 4.2
  }
])
</script>

