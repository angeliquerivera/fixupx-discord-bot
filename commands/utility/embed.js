const { EmbedBuilder } = require("discord.js");
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
          option.setName("url").setDescription("instagram url")
        )
    )
    .addSubcommand((subcommand) =>
      subcommand
        .setName("tiktok")
        .setDescription("tiktok url")
        .addStringOption((option) =>
          option.setName("url").setDescription("tiktok url")
        )
    ),
    
    const exampleEmbed = new EmbedBuilder()
    .setColor(0x0099FF)
    .setTitle('Some title')
    .setURL('https://discord.js.org/')
    .setAuthor({ name: 'Some name', iconURL: 'https://i.imgur.com/AfFp7pu.png', url: 'https://discord.js.org' })
    .setDescription('Some description here')
    .setThumbnail('https://i.imgur.com/AfFp7pu.png')
    .addFields(
      { name: 'Regular field title', value: 'Some value here' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Inline field title', value: 'Some value here', inline: true },
      { name: 'Inline field title', value: 'Some value here', inline: true },
    )
    .addFields({ name: 'Inline field title', value: 'Some value here', inline: true })
    .setImage('https://i.imgur.com/AfFp7pu.png')
    .setTimestamp()
    .setFooter({ text: 'Some footer text here', iconURL: 'https://i.imgur.com/AfFp7pu.png' }),
  
  channel.send({ embeds: [exampleEmbed] }),
    
  //
  //
  // .addChoices(
  //   { name: "Twitter", value: "url_twitter" },
  //   { name: "Instagram", value: "url_instagram" },
  //   { name: "Tiktok", value: "url_tiktok" }
  // )
  // .addStringOption((option) =>
  //   option.setName("instagram").setDescription("instagram link posted")
  // )
  // .addStringOption((option) =>
  //   option.setName("tiktok").setDescription("tiktok link posted")
  // ),

  async execute(interaction) {
    if (interaction.options.getSubcommand() === "twitter") {
      const twitter = interaction.options.getString("url");

      if (twitter) {
        await interaction.reply(`https://fixup{url.params}`);
      }
    } else if (interaction.options.getSubcommand() === "instagram") {
      const instagram = interaction.options.getString("url");
      if (instagram) {
        await interaction.reply(`https://dd{url.params}`);
      }
    } else {
      await interaction.reply(`https://vx{url.params}`);
    }
  },
};
