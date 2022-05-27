<template>
  <div
    class='modal-backdrop'>
    <div 
      class="modal"
    >
      <h3  
        class="modal__title"
      >
          Контактная информация
      </h3>
      <span class="modal__close">&times;</span>
      
      <slot name="body" />
      <slot name="footer" />
    </div>
  </div> 
</template> 