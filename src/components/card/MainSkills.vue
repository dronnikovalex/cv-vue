<template>
  <section class="skills">
    <app-caption>
      <span class="default-size-title">Профессиональные навыки</span>
      <span class="sm-size-title">Навыки</span>
    </app-caption>

    <div class="skills__banner banner">
      <a
        v-for="(item, idx) in stack"
        :key="idx"
        :class="item"
        class="banner__item" 
        href="#" 
      />
    </div>

    <div class="skills__description">
      <div 
        v-for="(technology, idx) in mockDescription"
        :key="idx"
        class="skills__item"
      >
        <h3>{{ technology.name }}</h3>
        <p>{{ technology.descripton }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import AppCaption from '@/components/ui/AppСaption'

export default {
  components: { AppCaption },

  data() {
    return {
      stack: ['cypress', 'vue', 'postman', 'postgres', 'html', 'git', 'charles', 'js'],
      mockDescription: [
        {
          name: 'Cypress',
          descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        },
        {
          name: 'Vue',
          descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        },
        {
          name: 'Postman',
          descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        },
        {
          name: 'Postgres',
          descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        },
        {
          name: 'HTML, CSS',
          descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        },
        {
          name: 'Git',
          descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        },
        {
          name: 'Charles',
          descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        },
        {
          name: 'JavaScript',
          descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        },
        {
          name: 'ETC2',
          descripton: 'Loadrem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, solu Loadrem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, solu Loadrem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, solu Loadrem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        }
      ]
    }
  }
}
</script>