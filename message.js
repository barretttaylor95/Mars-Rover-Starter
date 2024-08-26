class Message {
   // Write code here!
   constructor(name, commands) {
         if (!name) {
               throw Error("Message name required.");
         }
         //sets up message with name and commands
         this.name = name;
         this.commands = commands;
   }
}

module.exports = Message;