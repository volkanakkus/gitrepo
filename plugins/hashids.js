import Hashids from 'hashids'

const hashids = new Hashids(
  '',
  0,
  'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
)

export default ({ app }, inject) => {
  inject('hashids', hashids)
}
