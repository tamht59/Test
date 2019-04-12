import {CONTACT_GET_CATEGORY, CONTACT_POST_CHECK, CONTACT_POST_DATA} from '~/utils/constants/mutations'
import {mapDefaultAllStep} from '~/utils/helper/mutation'

export default {
  ...mapDefaultAllStep(CONTACT_GET_CATEGORY, 'contactCategory'),

  ...mapDefaultAllStep(CONTACT_POST_CHECK, 'contactPostCheckData'),

  ...mapDefaultAllStep(CONTACT_POST_DATA, 'contactPostData')
}
