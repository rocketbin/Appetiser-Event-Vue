<template>
  <div style = "height:100%" >
    <div v-if = "event.data.length === 0" class = "flex flex-center" style = "width: 100%; height:100%">
        <div class = " bg-grey-3" style = "border-radius:3px; padding:10px">
          <span class = "text-grey-8">
            <q-btn round flat color="grey-7" icon="donut_large" />
            no selected data
          </span>
        </div>
    </div>
    <div v-else>
      <div style = "margin:10px">
        <div style = "">
          <span class = "text-h4">
            {{this.activeSelections}}
          </span>  
        </div>
        <q-scroll-area style="height: 80vh; max-width: 100%;">
          <q-list padding>
            <q-item v-for = "data in event.data" :active = "data.selected" active-class="bg-grey-5 ">
                <q-item-section avatar>
                  <q-btn round color = "accent" :label = "data.day"/>
                </q-item-section>
                <q-item-section v-if = "data.selected">
                  <q-item-label> {{ switchDays(data.weekday) }}</q-item-label>
                  <q-item-label caption>
                      {{event.name}}
                  </q-item-label>
                </q-item-section>
                <q-item-section v-else>
                  {{ switchDays(data.weekday) }}
                </q-item-section>
                <q-item-section side>
                  <q-item-label caption>{{ getDataDate(data.date) }}</q-item-label>
                </q-item-section>
              </q-item>
          </q-list>
        </q-scroll-area>
      </div>
    </div>
  </div>
</template>
<script >
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['activeEvent']),
    event () {
      return this.activeEvent;
    },
    activeSelections () {
      let f = this.monthName[new Date(this.event.from).getMonth()] + " " + new Date(this.event.from).getFullYear();
      let t = this.monthName[new Date(this.event.to).getMonth()] + " " + new Date(this.event.to).getFullYear();
      return f + " ~ " + t;
    }
  },
  data () {
    return {
      monthName: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }
  },
  methods: {
    getDataDate (date) {
      return (new Date(date)).toUTCString();
    },
    switchDays (day) {
      switch(day) {
        case 0:
          return 'Sunday';
          break;
        case 1:
          return 'Monday';
          break;
        case 2:
          return 'Tuesday';
          break;
        case 3:
          return 'Wednesday';
          break;
        case 4:
          return 'Thursday';
          break;
        case 5:
          return 'Friday';
          break;
        case 6:
          return 'Saturday';
          break;
      }
    }
  },
  mounted () {
    console.log(this.event.data.length)
  }
}
</script>