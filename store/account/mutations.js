import {
  ADMIN_ACCOUNT_GET_DATA,
  ADMIN_ACCOUNT_CHECK_DATA,
  ADMIN_ACCOUNT_POST_DATA,
  NEW_ACCOUNT_TOKEN_DATA,
  RETIRE_REASON_GET_CATEGORY,
  RETIRE_REASON_POST_DATA
} from '~/utils/constants/mutations'
import {mapDefaultAllStep} from '~/utils/helper/mutation'

export default {
  ...mapDefaultAllStep(ADMIN_ACCOUNT_GET_DATA, 'adminAccountGetData'),

  ...mapDefaultAllStep(ADMIN_ACCOUNT_CHECK_DATA, 'adminAccountCheckData'),

  ...mapDefaultAllStep(ADMIN_ACCOUNT_POST_DATA, 'adminAccountPostData'),

  ...mapDefaultAllStep(NEW_ACCOUNT_TOKEN_DATA, 'newAccountTokenData'),

  ...mapDefaultAllStep(RETIRE_REASON_GET_CATEGORY, 'retireReasonCategory'),

  ...mapDefaultAllStep(RETIRE_REASON_POST_DATA, 'retireReasonData')
}
