<template>
  <section class="study">
    <app-caption>
      Обучение
    </app-caption>

    <div class="study__container">
      <div class="study__item">
        <h3 class="study__title">Прикладная информатика в экономике</h3>
        <p class="study__years">2011 - 2017</p>
        <p class="study__description">Высшее образование. Магистр. ФГБОУ ВО «ОГУ имени И.С. Тургенева»</p>
      </div>
      <a 
        href="#" 
        class="study__more"
      >
        Развернуть...
      </a>
    </div>
  </section>
</template>

<script>
import AppCaption from '@/components/ui/AppСaption'

export default {
  components: { AppCaption },

  data() {
    return {
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
  }
}
</script>