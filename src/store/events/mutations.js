export const activeEvent_ = (state, payload) => {
	state.activeEvent = payload
}

export const events_ = (state, payload) => {
	payload.map(p => {
		p.data = JSON.parse(p.data);
		p.data.date = new Date(p.data.date);
		p.onDays = JSON.parse(p.onDays);
	})
	state.events = payload
}

export const pushEvents_ = (state, payload) => {
	payload.data = JSON.parse(payload.data);
	payload.onDays = JSON.parse(payload.onDays);
	payload.data.date = new Date(payload.data.date);
	state.events.unshift(payload)
}

