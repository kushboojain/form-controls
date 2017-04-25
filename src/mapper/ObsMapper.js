import { createObsFromControl } from 'src/helpers/Obs';
import { cloneDeep } from 'lodash';

export class ObsMapper {

  getInitialObject(formName, formVersion, control, bahmniObservations) {
    return createObsFromControl(formName, formVersion, control, bahmniObservations);
  }

  getValue(obs) {
    return { value: obs.value, comment: obs.comment };
  }

  getData(record) {
    const obs = cloneDeep(record.dataSource);
    if (obs.formFieldPath !== record.formFieldPath) {
      obs.uuid = undefined;
      obs.formFieldPath = record.formFieldPath;
    }
    obs.value = record.value.value;
    obs.comment = record.value.comment;
    obs.voided = record.value.value === undefined;
    obs.inactive = !record.active;
    if (record.control.concept && record.control.concept.datatype === 'Complex') {
      if (obs.voided && obs.formFieldPath.split('-')[1] !== '0'){
        return null;
      }
      if(!obs.voided){
        obs.voided = obs.value.indexOf('voided') > 0;
      }
    }
    return obs;
  }

  getChildren() {
    return [];
  }
}
