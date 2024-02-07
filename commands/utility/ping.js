const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("Bring")
    .setDescription("Replies with rest of the banger song"),
  async execute(interaction) {
    await interaction.reply("Bong Bong Bring Bong Bong Bring Bong Bong Bring!");
  },
};
