<template>
  <div>
    <StartSection />
    <ContactSection />
  </div>
</template>

<script>
import StartSection from '~/components/public_sections/StartSection.vue'
import ContactSection from '~/components/public_sections/ContactSection.vue'

export default {
  auth: false,

  components: {
    StartSection, ContactSection
  }
}
</script>
