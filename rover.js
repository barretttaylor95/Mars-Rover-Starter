class Rover {
   constructor(position) {
      this.position = position;
      this.mode = 'NORMAL';
      this.generatorWatts = 110;
   }

   receiveMessage(message) {
      //make a response
      let response = {
         message: message.name,
         results: []
      };
      
      //cycle commands
      for (let i = 0; i < message.commands.length; i++) {
         let command = message.commands[i];
         let result = {
            completed: true
         };

         // dealing with tha command types
         if (command.commandType === 'STATUS_CHECK') {
            result.roverStatus = {
               mode: this.mode,
               generatorWatts: this.generatorWatts,
               position: this.position
            };
         } else if (command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
         } else if (command.commandType === 'MOVE') {
            //can we move?
            if (this.mode === 'LOW_POWER') {
               //were running out of juice
               result.completed = false;
            } else {
               //yeah we can move
               this.position = command.value;
            }
         }

         response.results.push(result);
      }

      //send it all back
      return response;
   }
}

module.exports = Rover;