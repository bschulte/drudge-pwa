import * as cheerio from "cheerio";

const isOkLinkText = (text: string) => {
  const textLetters = text.replace(/[^a-zA-Z ]/gi, "");
  const numWords = textLetters.split(" ").length;

  if (numWords > 3) {
    return true;
  }

  if (textLetters === textLetters.toUpperCase()) {
    return false;
  }

  return true;
};

export const parsePage = (html: string) => {
  const $ = cheerio.load(html);

  const links = $("a");

  // Go through the links and extract the text
  const linkData: any[] = [];
  $("a").each(function(i, ele) {
    // Skip any of the links just to home pages of websites
    const url = $(this).attr("href");
    if (
      !url.endsWith(".com") &&
      !url.endsWith(".com/") &&
      !url.endsWith(".org") &&
      !url.endsWith(".org/")
    ) {
      // Filter down further. Links that have text that are 1, 2 or 3
      // words long with all caps are ones we want to ignore
      const text = $(this).text();
      if (isOkLinkText(text)) {
        linkData.push({ url, text });
      }
    }
  });

  return linkData;
};
