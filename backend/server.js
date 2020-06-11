const pg = require('pg')
const WebSocket = require('ws')

const run = async () => {
  const db = new pg.Client({
    user: process.env.USER,
    host: '127.0.0.1',
    database: 'realtime',
    password: '',
    port: 5432,
  })
  console.log('Connecting to database...')
  await db.connect()
  console.log('Subscribing to channels...')
  await db.query('LISTEN insert')
  await db.query('LISTEN delete')
  await db.query('LISTEN update')
  console.log('Starting WebSocket server...')
  var server = new WebSocket.Server({
    port: 8080
  })
  server.on('connection', async (connection) => {
    console.log('Connection opened...')
    db.on('notification', (message) => {
      connection.send(JSON.stringify({
        channel: message.channel,
        payload: JSON.parse(message.payload)
      }))
    })
    connection.on('message', async (message) => {
      console.log(message)
      if (message === 'insert') {
        var sql = squel.insert()
          .into('accounts')
          .set('email', 'a@aol.com')
          .set('name', 'name')
          .toParam()
        await db.query(sql.text, sql.values)
      } else if (message === 'update') {
        var sql = squel.update()
          .table('accounts')
          .set('name', 'name2')
          .where('email = ?', 'a@aol.com')
          .toParam()
        await db.query(sql.text, sql.values)
      } else if (message === 'delete') {
        var sql = squel.delete()
          .from('accounts')
          .where('email = ?', 'a@aol.com')
          .toParam()
        await db.query(sql.text, sql.values)
      }
    })
  })
}

run()
