// import something here
import baseTable from 'src/components/baseTable'
import formInputs from 'src/components/formInputs'
import eventList from 'src/components/eventList'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/cli-documentation/boot-files#Anatomy-of-a-boot-file
export default async ( { app, router, Vue  } ) => {
  // something to do
  Vue.component('base-table', baseTable);
  Vue.component('form-inputs', formInputs);
  Vue.component('event-list', eventList);

}
