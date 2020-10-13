<template>
  <div class="bg-grey">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="relative flex items-center justify-center mb-12">
        <div
          class="z-10 flex flex-col items-center justify-center w-64 h-64 rounded-full bg-red"
        >
          <h1 class="text-5xl">{{ days[0].new_infections }}</h1>
          <p class="mb-2 -mt-3 text-xs">NEW INFECTIONS</p>
          <p>{{ $dateFns.format(days[0].date, 'P') }}</p>
        </div>
        <div
          class="absolute bg-opacity-25 rounded-full animate-ping h-68 w-68 bg-red"
        />
      </div>
      <p class="text-white">
        <span :class="[hasDecreased ? 'text-green' : 'text-red']">
          {{ hasDecreased ? '' : '+' }}{{ difference }}%
        </span>
        from the day before
      </p>
      <p class="text-sm text-center text-white">Weekly breakdown below</p>
    </div>

    <Details :days="days" :average="average" />
  </div>
</template>

<script>
/* eslint-disable camelcase */
export default {
  async asyncData({ $axios, $dateFns }) {
    const today = new Date()
    const tomorrow = $dateFns.addDays(today, 1)
    const sevenDaysAgo = $dateFns.subDays(tomorrow, 7)
    const { data } = await $axios.get(
      `https://api.coronatracker.com/v4/analytics/newcases/country?countryCode=GB&startDate=${$dateFns.format(
        sevenDaysAgo,
        'yyyy-MM-dd'
      )}&endDate=${$dateFns.format(tomorrow, 'yyyy-MM-dd')}`
    )

    const formatted = data
      .map((day) => {
        const { last_updated, ...rest } = day

        return {
          date: $dateFns.parseISO(last_updated),
          ...rest,
        }
      })
      .filter(({ new_infections }) => new_infections > 0)

    const days = [...formatted].reverse()

    const average =
      formatted.reduce((acc, curr) => curr.new_infections + acc, 0) /
      formatted.length

    return {
      days,
      today: days[0],
      yesterday: days[1],
      average,
    }
  },
  computed: {
    difference() {
      const difference = this.getPercentageChange(
        this.today.new_infections,
        this.yesterday.new_infections
      )

      return difference.toFixed(2)
    },
    hasDecreased() {
      return this.difference.includes('-')
    },
  },
  methods: {
    getPercentageChange(oldNumber, newNumber) {
      const decreaseValue = oldNumber - newNumber

      return (decreaseValue / oldNumber) * 100
    },
  },
}
</script>

<style lang="postcss">
.animate-ping {
  animation: ping 1.5s infinite;
}

@keyframes ping {
  75% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1.2);
    opacity: 0;
  }
}
</style>
