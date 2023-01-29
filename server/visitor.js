import axios from 'axios'

export default function visit(url) {
  axios.get(url)
    .then(res => {
      console.log('Works fine...')
    })
    .catch(err => {
      console.log('Something went wrong!')
    })
}
