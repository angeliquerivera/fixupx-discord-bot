let twitterUrl = new URL("https://www.vxtwitter.com/");
let instagramUrl = new URL("https://www.ddinstagram.com/");
let params1 = new URLSearchParams(twitterUrl.search);
let params2 = new URLSearchParams(instagramUrl.search);

console.log(params1.getAll());
console.log(params2.getAll());
