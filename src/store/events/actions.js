export const _activeEvent = ({commit}, payload) => {
  return commit('activeEvent_', payload)
}

export const _events = ({commit}, payload) => {
  return commit('events_', payload)
}

export const _pushEvents = ({commit}, payload) => {
  return commit('pushEvents_', payload)
}

