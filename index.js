import connectMongo from './lib/db'
import config from './lib/config'
import app from './lib/app'
const port  = config.app.port || process.env.PORT

(async () => {
    try {
      const info = await connectMongo(config.mongodb.url);
      console.log(`Connected mongodb to ${info.host}:${info.port}/${info.name}`);
    } catch (error) {
      console.error('Unable to connect to database');
    }
  
    await app.listen(port);
    console.log(`Server started on port ${port}`);
})();