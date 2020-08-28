<template>
	<div>
		<span class = "text-grey text-h6">
			<q-icon name = "event" />
			Events
		</span>
    <q-scroll-area style="height: 40vh; min-width: 100%;min-height: 40vh">
      <q-inner-loading :showing="loading">
        <q-spinner-bars   size="50px" color="accent" />
      </q-inner-loading>
			<q-list padding>
        <q-item clickable v-ripple v-for = "event in events" active-class="bg-grey-5 " @click = "_activeEvent(event)">
          <q-item-section class = "text-grey-8">
						{{event.name }}         	
          </q-item-section>
        <q-item-section avatar>
          <q-icon color="primary" name="play_circle_outline" />
        </q-item-section>
        </q-item>
			</q-list>
    </q-scroll-area>
	</div>
</template>
<script>
import {mapGetters, mapActions} from 'vuex'
export default {
	computed: {
		...mapGetters(['events']),
	},
	data () {
		return {
			loading: false
		}
	},
	methods: {
		...mapActions(['_events', '_activeEvent']),
		getEvents() {
			this.loading = true;
			this.$axios.get('events').then(r => {
				this._events(r.data);
				this.loading = false;
			}).catch(e => {
				this.loading = false;
				this.notify('failed to retrieve events', 'negative', 'warning');
			});
		},
		notify(message, color, icon = 'thumb_up') {
			this.$q.notify({
				position:'top-right',
				message,
				color,
				icon
			})
		},
	},
	mounted() {
		this.getEvents()
	}
}
</script>