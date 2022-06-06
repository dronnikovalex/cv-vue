<template>
  
    <div class="about__links links">
      <h2 class="sidebar__title">Ссылки</h2>

      <div class="link__item">
        <span class="link__placeholder">Project repo</span>
        <span class="link__value">
          <font-awesome-icon :icon="[ 'fab', 'github' ]" />
          <a href="https://github.com/dronnikovalex/cv-vue" target="_blank">github.com/dronnikovalex/cv-vue</a>
        </span>
      </div>
      <div class="link__item">
        <span class="link__placeholder">Cypress tests</span>
        <span class="link__value">
          <img 
            src="../../images/cypress.png" 
            alt="cypress"
            class="cypress-icon"
          >
          <a href="https://github.com/dronnikovalex/cv-vue/cypress" target="_blank">github.com/dronnikovalex/cv-vue/cypress</a>
        </span>
      </div>
      <div class="link__item">
        <span class="link__placeholder">Habr career</span>
        <span class="link__value">
          <font-awesome-icon :icon="[ 'fa', 'h-square' ]" />
          <a href="https://career.habr.com/aleksey-dronnikov57" target="_blank">habr.com/aleksey-dronnikov57</a>
        </span>
      </div>
      <div class="link__item">
        <span class="link__placeholder">VK</span>
        <span class="link__value">
          <font-awesome-icon :icon="[ 'fab', 'vk' ]" />
          <a href="https://vk.com/id38394670" target="_blank">vk.com/id38394670</a>
        </span>
      </div>
    </div>
</template>