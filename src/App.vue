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
      data-cy="placeholder-container"
    >
      <the-placeholder 
        :error-message="errorMessage"
        :waiting-for-response="waitingForResponse"
        @repeat-loading="reFetchProfile"
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
        v-if="isTabletView"
        :is-mobile-view="isMobileView"
        :contacts="profile.contacts"
      />

      <main 
        class="card-container"
        data-cy="card-container"
      >
        <the-main-skills
          v-if="profile.stack"
          :stack="profile.stack"
          :is-short-title="isMobileView"
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
        v-if="isTabletView"
        :links="profile.links"
        @open-modal="openModal"
      />
    </div>

    <teleport to="body">
      <Transition name="fade">
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
              <app-input
                label-text="Имя"
                type="text"
                placeholder="&nbsp;"
                name="name"
              />

              <app-input
                label-text="Должность"
                type="text"
                placeholder="&nbsp;"
                name="position"
              />

              <app-input
                label-text="Контакт для обратной связи"
                type="text"
                placeholder="&nbsp;"
                name="contacts"
              />

              <div class="desription-field">
                <label for="description">Описание</label>
                <textarea 
                  id="description" 
                  v-model="description"
                  type="text" 
                  name="description"
                  @input="checkDescription"
                />    
                <small 
                  v-if="isEmptyDescription"
                  data-cy="error-message"
                >
                  {{ $options.requiredFieldText }}
                </small>              
              </div>

              <div class="reuqest-footer">
                <app-button
                  class="btn request-send"
                  data-cy="send-form"
                  :disabled="waitingForResponse"
                  @action="checkDescription"
                >
                  <app-loader
                    v-if="waitingForResponse" 
                    type="sm"
                  />
                  <span v-else>Отправить</span>
                </app-button>
              </div>
            </Form>
          </template>
        </app-modal>
      </Transition>
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
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import ThePlaceholder from '@/components/ThePlaceholder'
import AppModal from '@/components/ui/AppModal'
import AppLoader from '@/components/ui/AppLoader'
import AppToast from '@/components/ui/AppToast'
import AppButton from '@/components/ui/AppButton'
import AppInput from '@/components/ui/AppInput'
import toast from './mixins/toast'
import { sendFormRequest, fetchProfileInfo } from './api/cvApi'
import { Form } from 'vee-validate';
import * as yup from 'yup';
import codes from './codes'

export default {
  components: { 
    TheSidebar, 
    TheMainSkills, 
    TheMainExperience, 
    TheMainEducation, 
    TheHeader, 
    TheFooter,
    ThePlaceholder,
    AppModal, 
    AppLoader, 
    AppToast,
    AppButton,
    AppInput,
    Form, 
  },

  mixins: [toast],

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
      description: '',  
      profile: {},
      loading: false,
      waitingForResponse: false,
      errOnLoadPage: false,
      errorMessage: '',
      fetchPorifleError: false,
      schema,
    }
  },

  computed: {
    isTabletView() {
      return this.wWidth <= 992 ? true : false
    },

    isMobileView() {
      return this.wWidth < 577 ? true : false
    },
  },
  
  mounted() {
    this.loading = true

    fetchProfileInfo()
      .then(profileInfo => this.profile = profileInfo)
      .then(() => this.loading = false)
      .catch(e => {
        this.errOnLoadPage = true
        this.errorMessage = codes[e.code] || '[Ошибка] Что-то пошло не так.'
        this.loading = false
      }) 

    window.onresize = () => {
      this.wWidth = window.innerWidth
    }
  },

  methods: {
    updateName(text) {
      this.name = text
    },

    openModal() {
      this.modalVisibility = true
    },

    closeForm() {
      this.modalVisibility = false
      this.description = ''
      this.isEmptyDescription = false
    },

    checkDescription() {
      this.isEmptyDescription = this.description.length === 0
    },

    async sendForm(values) {
      console.log(values)

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
        this.waitingForResponse = true

        await sendFormRequest(payload)

        this.closeForm()
        this.showToast('[Успех] Сообщение успешно отправлено')
      } catch (e) {
        this.showToast(codes[e.code])
      }

      this.waitingForResponse = false
    },

    reFetchProfile() {
      this.waitingForResponse = true

      fetchProfileInfo()
        .then(profileInfo => this.profile = profileInfo)
        .then(() => this.waitingForResponse = false)
        .then(() => this.errOnLoadPage = false)
        .catch(e => {
          this.errorMessage = codes[e.code] || '[Ошибка] Что-то пошло не так.'
          this.waitingForResponse = false
        })
    }
  },
  
}

</script>
