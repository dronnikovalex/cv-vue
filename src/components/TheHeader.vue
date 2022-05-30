<template>
  <header class="header">
    <div class="header__container">
      <div class="header__avatar avatar" />

      <div class="header__info">
        <div class="header__personal personal">
          <span class="header__surname surname">Дронников&nbsp;</span>
          <span class="header__name name">Алексей</span>
        </div>
        <span class="header__position">QA engineer</span>
      </div>
    
      <div class="header__contacts contacts">
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
        <div class="contacts__item header__phone item">
          <span class="item__placeholder">
            Телефон
          </span>
          <span class="item__value">
            +7-(953)-477-31-62
          </span>
        </div>
      </div>
    </div>
  </header>
</template>

<style scoped>
.header__phone  {
  padding: 0 !important
}
</style>