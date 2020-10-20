<template>
  <div class="container mx-auto">
    <div class="relative h-68">
      <canvas ref="coronaChart" />
    </div>
  </div>
</template>

<script>
import { theme } from '~/tailwind.config'
export default {
  props: {
    days: {
      type: Array,
      required: true,
    },
  },
  data: () => ({
    chart: null,
  }),
  mounted() {
    // Simple workaround
    const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)

    const today = this.$dateFns.parseISO(this.days[0].date)

    const threeMonthsAgo = this.$dateFns.subMonths(today, 1)
    const daysBetween = isMobileDevice ? 7 : this.$dateFns.differenceInDays(today, threeMonthsAgo)

    const labels = []

    for (let index = 0; index < daysBetween; index++) {
      const date = this.$dateFns.subDays(today, index)
      labels.push(this.$dateFns.format(date, 'P'))
    }

    const formattedDays = this.days.slice(0, daysBetween).reverse()

    const formattedCases = formattedDays.map(({ newCases }) => newCases)

    // eslint-disable-next-line no-undef
    this.chart = new Chart(this.$refs.coronaChart, {
      type: 'line',
      data: {
        labels: labels.reverse(),
        datasets: [
          {
            label: 'New Cases',
            data: formattedCases,
            borderColor: theme.colors.red,
            backgroundColor: `${theme.colors.red}40`,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
      },
    })
  },
}
</script>

<style></style>
