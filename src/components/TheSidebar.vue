<template>
  <aside class="sidebar about">
    <div class="about__avatar avatar" />
    <div class="about__info">
      <div class="about__personal personal">
        <span class="about__surname surname">Дронников</span>
        <span class="about__name name">Алексей</span>
      </div>
      <span class="about__position">QA engineer</span>
    </div>
    <div class="about__summary">
      <h2 class="sidebar__title">Обо мне</h2>
      
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis, pariatur? Quas corporis libero quos eius, adipisci porro ea distinctio consequuntur! amet consectetur adipisicing elit. Reiciendis, pariatur? Quas corporis libero quos eius, adipisci porro ea distinctio consequuntur!</p>
    </div>

    <hr class="sidebar__divider">

    <div class="about__contacts contacts">
      <h2 class="sidebar__title">Контакты</h2>

      <div class="contacts__item item">
        <span class="item__placeholder">
          Email
        </span>
        <span class="item__value">
          hoock57@gmail.com
        </span>
      </div>
      <div class="contacts__item item">
        <span class="item__placeholder">
          Telegram
        </span>
        <span class="item__value">
          t.me/aldronnikov
        </span>
      </div>
      <div class="contacts__item item">
        <span class="item__placeholder">
          Телефон
        </span>
        <span class="item__value">
          +7-(953)-477-31-62
        </span>
      </div>
      <div class="contacts__item item">
        <a 
          href="#"
          class="contacts__request"
        >
          <span class="text">
            Связаться
          </span>
        </a>
      </div>
    </div>

    <hr class="sidebar__divider">

    <div class="about__links links">
      <h2 class="sidebar__title">Ссылки</h2>

      <div class="link__item link">
        <span class="link__placeholder">
          Project repo
        </span>
        <span class="link__value">
          <font-awesome-icon :icon="[ 'fab', 'github' ]" /> <a href="https://github.com/dronnikovalex/cv-vue">github.com/dronnikovalex/cv-vue</a>
        </span>
      </div>
      <div class="link__item">
        <span class="link__placeholder">
          Cypress tests
        </span>
        <span class="link__value">
          <img 
            src="../images/cypress.png" 
            alt="cypress"
            class="cypress-icon"
          >
          <a href="https://github.com/dronnikovalex/cv-vue/cypress">github.com/dronnikovalex/cv-vue/cypress</a>
        </span>
      </div>
    </div>

    <teleport to="body">
      <app-modal>
        <template #body>
          <div class="request-body">
          
          <div class="input-field">
            <label for="name" class="inp">
              <input type="text" id="name" placeholder="&nbsp;">
              <span class="label">Имя</span>
              <span class="focus-bg"></span>
            </label>
          </div>

          <div class="input-field">
            <label for="position" class="inp">
              <input type="text" id="position" placeholder="&nbsp;">
              <span class="label">Должность</span>
              <span class="focus-bg"></span>
            </label>
          </div>

          <div class="input-field">
            <label for="contacts" class="inp">
              <input type="text" id="contacts" placeholder="&nbsp;">
              <span class="label">Контакты</span>
              <span class="focus-bg"></span>
            </label>
          </div>

          <div class="desription-field">
            <label for="description">Описание</label>
            <textarea id="description" type="text" name="description" />
          </div>
          
          </div>
        </template>
        <template #footer>
          <div class="reuqest-footer">
            <button 
              type="submit"
              class="btn"
            >
              Отправить
            </button>
          </div>
        </template>
      </app-modal>
    </teleport>
  </aside>
</template>

<script>
import AppModal from '@/components/ui/AppModal'

export default {
  components: { AppModal }
}
</script>script
