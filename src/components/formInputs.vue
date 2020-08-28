<template>
	<div class = " " >
		<div class = "q-gutter-sm  bg-grey-3" style ="padding:10px">
			<q-input filled v-model="form.name" label="Event Name" />
			<div  style = "display:flex;justify-content: space-evenly;">
		    <q-input class = "padding-sm" filled v-model="form.from" label = "From" mask="date" :rules="['date']" >
		      <template v-slot:append>
		        <q-icon name="event" class="cursor-pointer">
		          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
		            <q-date v-model="form.from">
		              <div class="row items-center justify-end">
		                <q-btn v-close-popup label="Close" color="primary" flat />
		              </div>
		            </q-date>
		          </q-popup-proxy>
		        </q-icon>
		      </template>
		    </q-input>

		    <q-input class = "padding-sm" filled v-model="form.to" label = "To" mask="date" :rules="['date']" >
		      <template v-slot:append>
		        <q-icon name="event" class="cursor-pointer">
		          <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
		            <q-date v-model="form.to" >
		              <div class="row items-center justify-end">
		                <q-btn v-close-popup label="Close" color="primary" flat />
		              </div>
		            </q-date>
		          </q-popup-proxy>
		        </q-icon>
		      </template>
		    </q-input>
			</div>
	    <q-select
		filled
		v-model="form.onDays"
		multiple
		:options="DayOptions"
		option-value="id"
		option-label="desc"
		emit-value
		map-options
		use-chips
		stack-label
		label="Pick Days"
	    />
	    <div class = "q-gutter-sm" style = "display:flex; justify-content:flex-end">
		    <q-btn @click = "saveTable" icon="save" color="positive" :loading="saveLoad" />
		 <!--    <q-btn @click = "loadTable" icon="send" color="grey" >
		    	<q-tooltip>
		    		Load Data to Table
		    	</q-tooltip>
		    </q-btn> -->
	    </div>
			</div>

	</div>
</template>
<script >
import {mapGetters, mapActions} from 'vuex';
import { Notify } from 'quasar'
export default {
	computed: {
		...mapGetters(['activeEvent']),
	},
	data () {
		return {
			saveLoad: false,
			form: {
				name: '',
				from: '2019/02/01',
				to: '2019/02/30',
				data: [],
				onDays: []
			},
			DayOptions: [
				{
					id: 1,
					desc: 'Mon'
				},
				{
					id: 2,
					desc: 'Tue'
				},
				{
					id: 3,
					desc: 'Wed'
				},
				{
					id: 4,
					desc: 'Thu'
				},
				{
					id: 5,
					desc: 'Fri'
				},
				{
					id: 6,
					desc: 'Sat'
				},
				{
					id: 0,
					desc: 'Sun'
				},
  	]
		}
	},
	methods: {
		...mapActions(['_activeEvent', '_pushEvents']),
		saveTable () {
			this.saveLoad = true;
			this.loadTable();
			this.$axios.post('events', this.form).then(r => {
				this._pushEvents(r.data);
				this.notify('saved!', 'positive');
				this.saveLoad = false;
			}).catch(e => {
				this.saveLoad = false;
				this.notify(e.response.data.message, 'negative', 'warning')
			})
		},
		loadTable () {
			this.form.data = this.getDates(new Date(this.form.from), new Date(this.form.to))
			this._activeEvent(this.form)
		},
		calcDate (from, to) {
			const diffTime = Math.abs(to - from);
			const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
			return diffDays;
		},
		notify(message, color, icon = 'thumb_up') {
			this.$q.notify({
				position:'top-right',
				message,
				color,
				icon
			})
		},
		getDates(startDate, stopDate) {
	    var dateArray = new Array();
	    var currentDate = startDate;
	    while (currentDate <= stopDate) {
	    	var sel = false;
	    	let p = new Date (currentDate);
	    	if(this.form.onDays.includes(p.getDay())) sel = true;
    		dateArray.push({
    			date: p,
    			weekday: p.getDay(),
    			day: p.getDate(),
    			month: p.getMonth(),
    			year: p.getFullYear(),
    			selected: sel
    		})
        currentDate = currentDate.addDays(1);
	    }
	    return dateArray;
		}
	},
	created () {
		Date.prototype.addDays = function(days) {
		    var date = new Date(this.valueOf());
		    date.setDate(date.getDate() + days);
		    return date;
		}
	}
}
</script>