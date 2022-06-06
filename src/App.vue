<template>
  <div class="app-container-fluid">
    <div 
      v-if="loading" 
      class="loading"
    >
      <app-loader 
        type="bg"
      />
    </div>
    
    <div
      v-else 
      class="app-container"
    >
      <the-sidebar 
        :about="profile.about"
        :contacts="profile.contacts"
        :links="profile.links"
        @open-modal="openModal"
      />
  
      <the-header 
        v-if="isMobileView" 
        :contacts="profile.contacts"
      />

      <main class="card-container">
        <main-skills />

        <main-experience />
  
        <main-education />
      </main>

      <the-footer 
        v-if="isMobileView"
        :links="profile.links"
        @open-modal="openModal"
      />
    </div>

    <teleport to="body">
      <app-modal 
        :modal-visibility="modalVisibility"
        @close-form="closeForm"
      >
        <template #default>
          <Form
            class="request-body"
            :validation-schema="schema"
            @submit="sendForm"
          > 
            <div class="input-field">
              <label for="name" class="inp">
                <Field
                  id="name" 
                  v-model="name"
                  type="text"
                  placeholder="&nbsp;"
                  name="name"
                />
                <span class="label">Имя</span>
                <span class="focus-bg" />
                <small>
                  <ErrorMessage name="name" />
                </small>
              </label>
            </div>

            <div class="input-field">
              <label for="position" class="inp">
                <Field
                  id="position" 
                  v-model="position"
                  type="text"
                  placeholder="&nbsp;"
                  name="position"
                />
                <span class="label">Должность</span>
                <span class="focus-bg" />
                <small>
                  <ErrorMessage name="position" />
                </small>
              </label>
            </div>

            <div class="input-field">
              <label for="contacts" class="inp">
                <Field
                  id="contacts" 
                  v-model="contacts"
                  type="text"
                  placeholder="&nbsp;"
                  name="contacts"
                />
                <span class="label">Контакт для обратной связи</span>
                <span class="focus-bg" />
                <small>
                  <ErrorMessage name="contacts" />
                </small>
              </label>
            </div>

            <div class="desription-field">
              <label for="description">Описание</label>
              <textarea 
                id="description" 
                v-model="description"
                type="text" 
                name="description"
                @input="checkDescription"
              />    
              <small v-if="isEmptyDescription">
                {{ $options.requiredFieldText }}
              </small>              
            </div>

            <div class="reuqest-footer">
              <button 
                class="btn request-send"
                :disabled="formSending"
                @click="checkDescription"
              >
                <app-loader
                  v-if="formSending" 
                  type="sm"
                />
                <span v-else>Отправить</span>
              </button>
            </div>
          </Form>
        </template>
      </app-modal>
    </teleport>

    <teleport to="body">
      <app-toast v-if="toastVisibility">
        {{ toastMessage }}
      </app-toast>
    </teleport>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import MainSkills from '@/components/card/MainSkills'
import MainExperience from '@/components/card/MainExperience'
import MainEducation from '@/components/card/MainEducation'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import AppModal from '@/components/ui/AppModal'
import AppLoader from '@/components/ui/AppLoader'
import AppToast from '@/components/ui/AppToast'
import { sendFormRequest, fetchProfileInfo } from './api/cvApi'
import { Form, Field, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';
import codes from './codes'

export default {
  components: { TheSidebar, MainSkills, MainExperience, MainEducation, TheHeader, TheFooter, AppModal, Form, Field, ErrorMessage, AppLoader, AppToast },

  requiredFieldText: 'Обязательно для заполнения',

  data() {
    const schema = yup.object({
      name: yup
        .string()
        .trim()
        .required('Обязательно для заполнения'),
      position: yup
        .string()
        .matches(/^[A-Za-zА-Яа-я]+$/, "Поле должно содержать только буквы")
        .trim()
        .required('Обязательно для заполнения'),
      contacts: yup
        .string()
        .trim()
        .required('Обязательно для заполнения'),
    })

    return {
      wWidth: window.innerWidth,
      modalVisibility: false,
      isEmptyDescription: false,
      profile: {},
      name: '',
      position: '',
      description: '',
      contacts: '',
      loading: false,
      formSending: false,
      toastVisibility: false,
      toastMessage: '',
      schema,
    }
  },
  //TODO: Use css display with media-query instead of this
  computed: {
    isMobileView() {
      return this.wWidth <= 992 ? true : false
    },
  },
  
  async mounted() {
    try {
      this.loading = true
      this.profile = await fetchProfileInfo()
    }
    catch(e) {
      this.toastVisibility = true
      this.toastMessage = codes[e.message] || '[Ошибка] Что-то пошло не так.'
    }

    this.loading = false

    window.onresize = () => {
      this.wWidth = window.innerWidth
    }
  },

  methods: {
    openModal() {
      this.modalVisibility = true
    },

    closeForm() {
      this.modalVisibility = false
      this.name = ''
      this.position = ''
      this.contacts = ''
      this.description = '',
      this.isEmptyDescription = false
    },

    checkDescription() {
      this.isEmptyDescription = this.description.length === 0
    },

    async sendForm(values) {
      if (this.description.length === 0) {
        return
      }

      const payload = {
        id: Date.now(),
        date: (new Date()).toString(),
        ...values, 
        description: this.description,
      }

      try {
        this.formSending = true

        await sendFormRequest(payload)

        this.closeForm()
        this.toastVisibility = true
        this.toastMessage = '[Успех] Сообщение успешно отправлено'
      } catch (e) {
        this.toastVisibility = true
        this.toastMessage = codes[e.message] || '[Ошибка] Что-то пошло не так.'
      }

      setTimeout(() => this.toastVisibility= false, 5000)
      this.formSending = false
      
    },
  },
  
}


</script>
