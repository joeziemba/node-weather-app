console.log('Starting app')

setTimeout( () => {
  console.log('Inside callback')
}, 1000)

setTimeout( () => {
  console.log('a second callback!')
}, 0)

console.log('Finishing up')
