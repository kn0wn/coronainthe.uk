<template>
  <div class="bg-grey">
    <div class="flex flex-col items-center justify-center min-h-screen">
      <div class="relative flex items-center justify-center mb-12">
        <div
          :class="[hasDecreased ? 'bg-green' : 'bg-red']"
          class="z-10 flex flex-col items-center justify-center w-64 h-64 rounded-full"
        >
          <h1 class="text-5xl">{{ days[0].newCases }}</h1>
          <p class="mb-2 -mt-3 text-xs">NEW INFECTIONS</p>
          <p>{{ $dateFns.format(days[0].date, 'P') }}</p>
        </div>
        <div
          :class="[hasDecreased ? 'bg-green' : 'bg-red']"
          class="absolute bg-opacity-25 rounded-full animate-ping h-68 w-68"
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

    <Chart :days="all" />
    <Details :days="days" :average="average" />
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const endpoint =
      'https://api.coronavirus.data.gov.uk/v1/data?' +
      'filters=areaType=overview&' +
      'structure={"date":"date","newCases":"newCasesByPublishDate", "newDeaths": "newDeaths28DaysByPublishDate"}'

    const { data } = await $axios.get(endpoint)
    const sevenDays = data.data.slice(0, 7)
    const average = sevenDays.reduce((acc, curr) => curr.newCases + acc, 0) / sevenDays.length

    return {
      days: sevenDays,
      all: data.data,
      today: sevenDays[0],
      yesterday: sevenDays[1],
      average,
    }
  },
  computed: {
    difference() {
      const difference = this.getPercentageChange(this.today.newCases, this.yesterday.newCases)
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
