const htmlparser2 = require("htmlparser2");
const domutils = require("domutils");
const { v4: uuidv4 } = require("uuid");
var fs = require("fs");

main();

function main() {
  const filePath = "data/reports.html";
  const txt = fs.readFileSync(filePath, "utf8");

  const dom = htmlparser2.parseDocument(txt);

  const table = domutils.getElementsByTagName("table", dom)[0];

  let data = [];
  data = domutils.getElementsByTagName("tr", table);
  data = data.slice(1); // header
  data = data.filter((row) => row.children.length == 5); // hr
  data = data.slice(1); // parent dir

  data = data.map((row) => row.children.map((col) => col.children[0]));

  thumbnails = data.filter((row) => !row[1].attribs.href.endsWith(".mp4")); // thumbnails
  thumbnails = thumbnails.map((row) => row[1].attribs.href);

  data = data.filter((row) => row[1].attribs.href.endsWith(".mp4")); // videos

  const mapToObj = (row) => {
    const href = row[1].attribs.href;
    const updatedAt = new Date(row[2].data);
    const size = row[3].data.trim();
    const description = row[4].data.trim() || undefined;
    const thumbnailUrl =
      thumbnails.find((thumbnail) => thumbnail.includes(href)) || undefined;
    const rawName = row[1].children[0].data;
    const name = processName(row[1].children[0].data);

    const date_re = /^([0-9]{8})*/g;

    let publishedAt = name.match(date_re);
    publishedAt =
      publishedAt && publishedAt.length > 0 && publishedAt[0] !== ""
        ? new Date(
            publishedAt[0].slice(0, 4),
            publishedAt[0].slice(4, 6),
            publishedAt[0].slice(6, 8)
          )
        : undefined;

    return {
      id: uuidv4(),
      url: `http://teleboario.it/video/${href}`,
      name: publishedAt ? name.slice(9) : name,
      rawName: rawName,
      size: size,
      updatedAt: updatedAt,
      description: description,
      thumbnailUrl:
        !!thumbnailUrl && `http://teleboario.it/video/${thumbnailUrl}`,
      publishedAt: publishedAt,
    };
  };

  data = data.map(mapToObj);

  console.log(`Processed ${data.length} records.`);

  str = JSON.stringify(data, (k, v) => (v === undefined ? null : v), 2);

  fs.writeFileSync("data/reports.json", str);
}

function processName(name) {
  name = name.toLowerCase();
  name = name.replace(/\uFFFD/g, "");
  name = removeUnderscore(name);
  name = keepUtf8Chars(name);
  name = removeExt(name);
  name = removeTgWeb(name);
  name = name.trim();
  return name;
}

function keepUtf8Chars(x) {
  return x
    .split("")
    .map((_, i) =>
      x.charCodeAt(i) <= 127 ||
      (x.charCodeAt(i) >= 160 && x.charCodeAt(i) <= 255)
        ? x.charAt(i)
        : ""
    )
    .join("");
}

function removeUnderscore(x) {
  return x.split("_").join(" ");
}

function removeExt(x) {
  return x.replace(".mp4", "");
}

function removeTgWeb(x) {
  return x.replace("tg web", "");
}
