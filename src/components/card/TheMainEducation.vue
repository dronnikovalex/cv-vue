<template>
  <section class="study">
    <app-heading>
      Обучение
    </app-heading>

    <div class="study__container">
      <div class="study__item">
        <h3 class="study__title">Прикладная информатика в экономике</h3>
        <p class="study__years">2011 - 2017</p>
        <p class="study__description">Высшее образование. Магистр. ФГБОУ ВО «ОГУ имени И.С. Тургенева»</p>
      </div>
      <details>
        <summary 
          class="study__details" 
          @click="toggleDetails"
        >
          {{ summaryStatus === false ? 'Развернуть▼' : 'Свернуть▲' }}
        </summary>
        <div class="study__item">
          <h3 class="study__title">Общее среднее образование</h3>
          <p class="study__years">2000 - 2011</p>
          <p class="study__description">Муниципальное бюджетное общеобразовательное учреждение - средняя общеобразовательная школа №2 г. Орла</p>
        </div>
      </details>
    </div>
  </section>
</template>

<script>
import AppHeading from '@/components/ui/AppHeading'

export default {
  components: { AppHeading },

  data() {
    return {
      summaryStatus: false,
      stack: ['cypress', 'vue', 'postman', 'postgres', 'html', 'git', 'js'],
      mockExperience: [
        {
          name: 'ФГБОУ ВО «ОГУ имени И.С. Тургенева». 09.03.03 Прикладная информатика в экономике',
          dateFrom: '08/2019',
          dateTo: '02/2022',
          grade: 'Магистр',
          descripton: 'Высшее образование'
        },
        {
          name: 'Docsvision',
          dateFrom: '05/2019',
          dateTo: '08/2019',
          descripton: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta! Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, soluta!'
        },
      ]
    }
  },

  methods: {
    toggleDetails() {
      this.summaryStatus = !this.summaryStatus
    }
  }
}
</script>