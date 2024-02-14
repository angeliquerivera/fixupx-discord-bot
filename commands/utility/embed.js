const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("embeds the link given")
    .addStringOption((option) =>
      option
        .setName("url")
        .setDescription("url link posted")
        .setRequired(true)
        .addChoices(
          { name: "Twitter", value: "url_twitter" },
          { name: "Instagram", value: "url_instagram" },
          { name: "Tiktok", value: "url_tiktok" }
        )
    ),
  async execute(interaction) {
    const url = interaction.options.getString("url");
  },
};
