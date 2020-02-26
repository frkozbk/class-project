import instance from '../instance'

export const joinClass = (classCode) => {
  instance.post('/api/classroom/join',{secretcode:classCode})
    .then(response => {console.log(response)})
    .catch(err => console.log(err) )
}