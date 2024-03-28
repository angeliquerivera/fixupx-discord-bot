// const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("embed")
    .setDescription("embeds the link given")
    .addSubcommand((subcommand) =>
      subcommand.setName("twitter").setDescription("twitter site")
    )
    .addSubcommand((subcommand) =>
      subcommand.setName("instagram").setDescription("instagram site")
    )

    .addSubcommand((subcommand) =>
      subcommand.setName("tiktok").setDescription("tiktok url")
    ),

  async execute(interaction) {
    await interaction.reply("embed");
  },
};

// async execute(interaction) {
//   const embed = new EmbedBuilder()
//     .setColor(0x0099ff)
//     .setTitle("EmbedLink")
//     .setURL("https://ddinstagram.com/", "https://fixupx.com")
//     .setDescription("Some description here")
//     .setImage("")
//     .setTimestamp(Date.now())
//     .setFooter({
//       text: "Some footer text here",
//       iconURL: "https://i.imgur.com/AfFp7pu.png",
//     });

//   await interaction.reply({ embeds: [embed] });
// },
