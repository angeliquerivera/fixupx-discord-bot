const { EmbedBuilder } = require("discord.js");
const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fancy")
    .setDescription("embeds the link given with EmbedBuilder")
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
          finalUrl += `google.com/you+done+fucked+up`;
      }

      //       <meta
      //         content='(3) PEGGYx 🕯️🖤【HORROR VTUBER】 on X: "white desert.......  🔪
      // #yumenikki #ゆめにっき #PEGGYxART https://t.co/GKA0IQw6Uw" / X'
      //         property="og:title"
      //         data-rh="true"
      //       ></meta>;

      /**
       * Build the embed
       * - author.name: og:site_name
       * - URL: finalUrl
       * - title: og:title
       * - description: og:description
       * - image: og:image
       *
       * Continue from here:
       * https://github.com/FixTweet/FxTwitter/blob/main/src/render/video.ts
       */
      // Build the embed

      const prettierEmbed = new EmbedBuilder()
        .setColor(0x0099ff)
        .setTitle("Fancier Look")
        .setURL(finalUrl);

      // Respond with the embed
      await interaction.reply(prettierEmbed);
    } catch (e) {
      // Report the error
      console.log("Something went wrong: ", e);
    }
  },
};
