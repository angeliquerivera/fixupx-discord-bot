const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bring")
    .setDescription("Replies with bong!"),
  async execute(interaction) {
    await interaction.reply("bong bong bring bong bong bring bong bong bring!");
  },
};
