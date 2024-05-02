const trigger = require("../schemas/triggerSchema");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    if (message.author.bot || !message.guild) return;

    const data = await trigger.find({ Guild: message.guild.id });

    await data.forEach(async (value) => {
      if (message.content.includes(value.Url)) {
        var blocked;
        await value.Block.forEach(async (channel) => {
          if (channel == message.channel.id) {
            blocked = true;
          }
        });

        if (blocked) return;
        else await message.reply(value.Reply);
      }
    });
  },
};
