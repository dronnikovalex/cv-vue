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
      v-else-if="errOnLoadPage"
      class="error-container"
    >
    <div class="error">
      <div class="error__title">
        <p>При загрузке страницы произошла ошибка:</p>
        <small class="">{{ errorMessage }}</small>
      </div>
      <div class="error__image" />
      <p class="error__subtitle">Пожалуйста, попробуйте снова</p>
      <app-button 
        class="btn error__button"
        @action="fetchProfile"
      >
        <app-loader
          v-if="waitingForRespose" 
          type="sm"
          color="black"
        />
        <span v-else>Повторить</span>
      </app-button>
    </div>
    
      
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
        <the-main-skills
          v-if="profile.stack"
          :stack="profile.stack" 
        />

        <the-main-experience 
          v-if="profile.experience"
          :experience="profile.experience" 
        />
  
        <the-main-education 
          v-if="profile.study"
          :study="profile.study" 
        />
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
                  ref="nameInput"
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
              <app-button
                class="btn request-send"
                :disabled="waitingForRespose"
                @action="checkDescription"
              >
                <app-loader
                  v-if="waitingForRespose" 
                  type="sm"
                />
                <span v-else>Отправить</span>
              </app-button>
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
import TheMainSkills from '@/components/card/TheMainSkills'
import TheMainExperience from '@/components/card/TheMainExperience'
import TheMainEducation from '@/components/card/TheMainEducation'
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'
import AppModal from '@/components/ui/AppModal'
import AppLoader from '@/components/ui/AppLoader'
import AppToast from '@/components/ui/AppToast'
import AppButton from '@/components/ui/AppButton'
import { sendFormRequest, fetchProfileInfo } from './api/cvApi'
import { Form, Field, ErrorMessage } from 'vee-validate';
import { configure } from 'vee-validate';
import * as yup from 'yup';
import codes from './codes'

configure({
  validateOnBlur: false,
  validateOnChange: false,
  validateOnInput: false,
  validateOnModelUpdate: false,
});

export default {
  components: { 
    TheSidebar, 
    TheMainSkills, 
    TheMainExperience, 
    TheMainEducation, 
    TheHeader, 
    TheFooter, 
    AppModal, 
    AppLoader, 
    AppToast,
    AppButton,
    Form, 
    Field, 
    ErrorMessage, 
  },

  requiredFieldText: 'Обязательно для заполнения',

  data() {
    const minInputLength = 2
    const maxInputLength = 35
    const schema = yup.object({
      name: yup
        .string()
        .trim()
        .test('len', `Минимум ${minInputLength} символа`, val => val.length >= minInputLength)
        .test('len', 'Обязательно для заполнения', val => val.length > 0)
        .test('len', `Максимум ${maxInputLength} символов`, val => val.length <= maxInputLength),
      position: yup
        .string()
        .matches(/^[A-Za-zА-Яа-я]+$/, "Поле должно содержать только буквы")
        .trim()
        .test('len', `Минимум ${minInputLength} символа`, val => val.length >= minInputLength)
        .test('len', 'Обязательно для заполнения', val => val.length > 0)
        .test('len', `Максимум ${maxInputLength} символов`, val => val.length <= maxInputLength),
      contacts: yup
        .string()
        .trim()
        .test('len', `Минимум ${minInputLength} символа`, val => val.length >= minInputLength)
        .test('len', 'Обязательно для заполнения', val => val.length > 0)
        .test('len', `Максимум ${maxInputLength} символов`, val => val.length <= maxInputLength),
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
      waitingForRespose: false,
      errOnLoadPage: false,
      errorMessage: '',
      toastVisibility: false,
      fetchPorifleError: false,
      toastMessage: '',
      schema,
    }
  },

  computed: {
    isMobileView() {
      return this.wWidth <= 992 ? true : false
    },
  },
  
  mounted() {
    this.loading = true

    fetchProfileInfo()
      .then(profileInfo => this.profile = profileInfo)
      .then(() => this.loading = false)
      .catch(e => {
        console.log(e)
        this.errOnLoadPage = true
        this.errorMessage = codes[e.code] || '[Ошибка] Что-то пошло не так.'
        this.loading = false
      }) 

    window.onresize = () => {
      this.wWidth = window.innerWidth
    }
  },

  methods: {
    openModal() {
      this.modalVisibility = true
      this.$nextTick(() => {
       this.$refs.nameInput.$el.focus()
      })
    },

    closeForm() {
      this.modalVisibility = false
      this.name = ''
      this.position = ''
      this.contacts = ''
      this.description = ''
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
        this.waitingForRespose = true

        await sendFormRequest(payload)

        this.closeForm()
        this.toastVisibility = true
        this.toastMessage = '[Успех] Сообщение успешно отправлено'
      } catch (e) {
        this.toastVisibility = true
        this.toastMessage = codes[e.code] || '[Ошибка] Что-то пошло не так.'
      }

      setTimeout(() => this.toastVisibility= false, 5000)
      this.waitingForRespose = false
      
    },

    fetchProfile() {
      this.waitingForRespose = true

      fetchProfileInfo()
        .then(profileInfo => this.profile = profileInfo)
        .then(() => this.waitingForRespose = false)
        .then(() => this.errOnLoadPage = false)
        .catch(e => {
          this.errorMessage = codes[e.code] || '[Ошибка] Что-то пошло не так.'
          this.waitingForRespose = false
        })
    }
  },
  
}

</script>
