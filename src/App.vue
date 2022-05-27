<template>
  <div class="app-container-fluid">
    <div class="app-container">
      <the-sidebar />
  
      <main class="card-container">
        <main-skills />
  
        <main-experience />
  
        <main-education />
      </main>
    </div>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'
import MainSkills from '@/components/card/MainSkills'
import MainExperience from '@/components/card/MainExperience'
import MainEducation from '@/components/card/MainEducation'

export default {
  components: { TheSidebar, MainSkills, MainExperience, MainEducation },
  async mounted() {
    await fetch('https://vue-crm-fa9af-default-rtdb.europe-west1.firebasedatabase.app/users/QBS5tY1PaNSGSbZJCaQFGOmJH9y2.json?auth=eyJhbGciOiJSUzI1NiIsImtpZCI6IjZmOGUxY2IxNTY0MTQ2M2M2ZGYwZjMzMzk0YjAzYzkyZmNjODg5YWMiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL3NlY3VyZXRva2VuLmdvb2dsZS5jb20vdnVlLWNybS1mYTlhZiIsImF1ZCI6InZ1ZS1jcm0tZmE5YWYiLCJhdXRoX3RpbWUiOjE2NTM2ODgzMTEsInVzZXJfaWQiOiJRQlM1dFkxUGFOU0dTYlpKQ2FRRkdPbUpIOXkyIiwic3ViIjoiUUJTNXRZMVBhTlNHU2JaSkNhUUZHT21KSDl5MiIsImlhdCI6MTY1MzY4ODMxMSwiZXhwIjoxNjUzNjkxOTExLCJlbWFpbCI6ImFwcEBhcHAuYXBwIiwiZW1haWxfdmVyaWZpZWQiOmZhbHNlLCJmaXJlYmFzZSI6eyJpZGVudGl0aWVzIjp7ImVtYWlsIjpbImFwcEBhcHAuYXBwIl19LCJzaWduX2luX3Byb3ZpZGVyIjoicGFzc3dvcmQifX0.hy_VYcIEq59VSMHa1gqyZAWA-0x7_kpivTeQXLprC9JoBoN7hb0HM_uq6kzDDeWsA3hgaWmat-5VApzlJqLXN80F2_HC5S-bxXJ69Q10jGzBbZEb9zC3WefbTg9--hwPauUDOe_W96IcaA1j1-cfEzVc0SVxZbTyNUmCLhvnnfgTEnflR0CSgkd7MEN4B6qiizLGEvMaex5v4WF8e_Qz-v1sg4BfhJ6Fswe8bkqiqKdViwRvygRFiL6bO76WoSDG3ikv0zWHohBcBJy7LwXEgL7_XR5wgtm9pcwxis3BPr5FDcUZbdN_7CQ-R4C8lzexxyULpY8NcFRQRdEweP0I-w')
  }
}
</script>
