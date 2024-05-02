const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("embeds the link given")
    .addSubcommand((subcommand) =>
      subcommand
        .setName("twitter")
        .setDescription("twitter site")
        .addStringOption((option) =>
          option.setName("url").setDescription("twitter url")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("instagram")
        .setDescription("instagram site")
        .addStringOption((option) =>
          option.setName("url").setDescription("ig url")
        )
    )

    .addSubcommand((subcommand) =>
      subcommand
        .setName("tiktok")
        .setDescription("tiktok site")
        .addStringOption((option) =>
          option.setName("url").setDescription("tiktok url")
        )
    ),
  async execute(interaction) {
    try {
      let finalUrl = "https://";

      // Grab the url subcommand string
      const currUrlType = interaction.options.getSubcommand();

      // Grab the path after the .com/, regardless of domain
      const currUrlPath = interaction.options
        .getString("url")
        .split(".com/")[1];

      // Build the final URL using the correct preview enabled website,
      // adding the URL path at the end
      switch (currUrlType) {
        case "twitter":
          finalUrl += `fixupx.com/${currUrlPath}`;
          break;
        case "instagram":
          finalUrl += `ddinstagram.com/${currUrlPath}`;
          break;
        case "tiktok":
          finalUrl += `vxtiktok.com/${currUrlPath}`;
          break;
        default:
          finalUrl += `google.com/`;
      }
      await interaction.reply(finalUrl);
    } catch (e) {
      // Report the error
      console.log("Something went wrong: ", e);
    }
  },
};
