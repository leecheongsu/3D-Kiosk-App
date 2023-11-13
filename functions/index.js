const functions = require("firebase-functions");
const parse5 = require("parse5");
const cors = require("cors")({ origin: true });
const fetch = require("node-fetch");
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", { structuredData: true });
//   response.send("Hello from Firebase!");
// });

function findTag(node, data) {
  const { tagName, attribute, content, id } = data;

  if (node.tagName === tagName) {
    if (attribute) {
      if (node.attrs[0].name === attribute && node.attrs[0].value === content) {
        return node;
      }
    } else if (id) {
      if (node.attrs[0].name === "id" && node.attrs[0].value === id) {
        return node;
      }
    } else {
      return node;
    }
  }

  if (node.childNodes) {
    for (const childNode of node.childNodes) {
      const foundNode = findTag(childNode, data);
      if (foundNode) {
        return foundNode;
      }
    }
  }

  return null;
}

exports.getUrlInfo = functions.region("asia-northeast3").https.onRequest((request, response) => {
  cors(request, response, () => {
    // get url from request
    const url = request.query.url;
    if (!url) {
      response.sendStatus(404);
      response.send({
        message: "url is empty",
      });
    }
    fetch(url, { mode: "no-cors" })
      .then((response) => response.text())
      .then((html) => {
        const document = parse5.parse(html);

        // 'title' 태그 찾기
        const titleNode = findTag(document, { tagName: "title" });
        const metaOGImageNode = findTag(document, { tagName: "meta", attribute: "property", content: "og:image" });

        let title = "";
        let og_image = "";

        if (titleNode.childNodes[0].value) {
          title = titleNode.childNodes[0].value;
        }
        if (metaOGImageNode.attrs[1].value) {
          og_image = metaOGImageNode.attrs[1].value;
        }
        // 결과 출력
        if (titleNode) {
          response.send({
            title,
            og_image,
          });
        } else {
          response.send({
            message: "Title not found.",
          });
        }
      });
  });
});
exports.getUrlTitle = functions.region("asia-northeast3").https.onRequest((request, response) => {
  cors(request, response, () => {
    // get url from request
    const url = request.query.url;
    if (!url) {
      response.sendStatus(404);
      response.send({
        message: "url is empty",
      });
    }
    fetch(url, { mode: "no-cors" })
      .then((response) => response.text())
      .then((html) => {
        const document = parse5.parse(html);

        // 'title' 태그 찾기
        const titleNode = findTag(document, { tagName: "title" });

        // 결과 출력
        if (titleNode) {
          response.send({
            title: titleNode.childNodes[0].value,
          });
        } else {
          response.send({
            message: "Title not found.",
          });
        }
      });
  });
});
exports.getUrlHTMLTitleTag = functions.region("asia-northeast3").https.onRequest((request, response) => {
  cors(request, response, () => {
    // get url from request
    const url = request.query.url;
    if (!url) {
      response.sendStatus(404);
      response.send({
        message: "url is empty",
      });
    }
    fetch(url, { mode: "no-cors" })
      .then((response) => response.text())
      .then((html) => {
        const document = parse5.parse(html);

        // 'title' 태그 찾기
        const titleNode = findTag(document, { tagName: "title" });

        // 결과 출력
        if (titleNode) {
          response.send({
            title: titleNode.childNodes[0].value,
          });
        } else {
          response.sendStatus(404);
          response.send({
            message: "Title not found.",
          });
        }
      });
  });
});

exports.isValidUrl = functions.region("asia-northeast3").https.onRequest((request, response) => {
  cors(request, response, () => {
    const url = request.query.url;
    if (!url) {
      response.sendStatus(404);
      response.send({
        message: "url is empty",
      });
    }
    fetch(url, { mode: "no-cors" })
      .then((response) => response.text())
      .then((html) => {
        const document = parse5.parse(html);

        // 'title' 태그 찾기
        const errorNode = findTag(document, { tagName: "div", id: "error-actions" });
        console.log(errorNode);
        console.log(errorNode.value);
        for (const childNode of errorNode.parentNode.childNodes) {
          console.log(childNode);
        }
        // 결과 출력
        if (errorNode) {
          response.send({
            error: errorNode.value,
          });
        } else {
          response.sendStatus(404);
          response.send({
            message: "Title not found.",
          });
        }
      });
  });
});
