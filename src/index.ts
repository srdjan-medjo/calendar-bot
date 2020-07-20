import { app } from './config/bolt';
import { port } from './config/vars';
import messages from './listeners/messages';
import events from './listeners/events';
import commands from './listeners/commands';
import actions from './listeners/actions';

// listeners
messages(app);
events(app);
commands(app);
actions(app);

console.log('app', app);
// error handler
app.error((error): any => {
  console.error(error);
});

(async () => {
  await app.start(port);
  console.log(`Bot app running at ${port}`);
})();
