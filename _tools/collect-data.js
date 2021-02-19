const w3c = require("node-w3capi");

const config = require("./config.json");
const seriesList = require("../_data/series.json");
const seriesAnnotations = require("../_data/series-annotations.json");

const browserSpecs = require("browser-specs");
const browserStatuses = require("browser-statuses");

w3c.apiKey = config.w3cApiKey;

function annotateLeveledTitle(s, replacement) {
  return s.replace(/(Level ([0-9]*\.?)+)/, replacement)
    .replace(/( ([0-9]\.?)+)/, replacement);
}


(async function () {
  for (let shortname of seriesList) {
    let series = {
      shortname
    };
    const specs = await new Promise((res, rej) => w3c.specificationseries(shortname).specifications().fetch({embed: true}, (err, specs) => {
      if (err) return rej(err);
      return res(specs);
    }));
    series.title = annotateLeveledTitle(specs[0].title, '');
    series.doctype = seriesAnnotations[shortname] && seriesAnnotations[shortname].doctype ? "document" : "specification";
/*
doctype: # specification or document
logo:
  - url:
  - alt:
family: #markup
latestVersion:
  - url:
  - status:
  - date:
nextStage: #markup
groups: #markup
ED: editors draft
implementable: # boolean
mdn: #url
roadmap:
  - shipped:
    - name:
      source:
        - url
        - title
      platforms:
  - development:
videos: #url
translations:
  - title:
    lang:
    langEN:
contributable: # boolean
feedback:
  - url:
  - title:
tests:
  - url:
  - wpt: #boolean
translatable: #boolean
hashtag:
logos:
  - page: #url
  - qualifier: # official vs community
history:
  - date:
    url:
    status:
*/

  }
})();
