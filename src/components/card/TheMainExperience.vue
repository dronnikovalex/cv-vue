<template>
  <section class="experience">
    <app-heading>
      Опыт работы
    </app-heading>

    <div class="experience__container">
      <div 
        v-for="(experience, idx) in mockExperience"
        :key="idx"
        class="experience__item"
      >
        <h3>{{ experience.name }} | {{ experience.dateFrom }} - {{ experience.dateTo }}</h3>
        <p class="experience__position">Должность - QA</p>
        <p class="experience__description">{{ experience.descripton }}</p>
      </div>
    </div>
  </section>
</template>

<script>
import AppHeading from '@/components/ui/AppHeading'

export default {
  components: { AppHeading },

  data() {
    return {
      stack: ['cypress', 'vue', 'postman', 'postgres', 'html', 'git', 'js'],
      mockExperience: [
        {
          name: 'Arcsinus',
          dateFrom: '08/2019',
          dateTo: '02/2022',
          position: 'QA',
          descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        },
        {
          name: 'Docsvision',
          dateFrom: '05/2019',
          dateTo: '08/2019',
          position: 'Тестировщик',
          descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        },
      ]
    }
  }
}
</script>