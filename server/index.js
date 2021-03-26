const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

// Middleaware
app.use(cors());

const tree = require("./tree.json");

app.get("/", function (req, res) {
  res.send(tree);
});

app.get("/firstnode", function (req, res) {
  const firstnode = { name: tree.name, value: tree.value, delta: tree.delta };

  res.send(firstnode);
});

app.get("/node", function (req, res) {
  let nodeId = req.query.nodeId;
  let currentChildren;
  let counter = 0;
  let currentChildrenResponse;

  try {
    while (counter < nodeId.length) {
      let position = nodeId.charAt(counter);

      if (counter === 0) {
        currentChildren = tree.children;
      } else {
        currentChildren = currentChildren[position].children;
      }

      counter++;
    }

    currentChildrenResponse = currentChildren.map((child) => {
      return { name: child.name, value: child.value, delta: child.delta };
    });
  } catch (error) {
    currentChildrenResponse = [];
    console.log(error);
  }

  res.send(currentChildrenResponse);
});

const port = process.env.Port || 5000;

app.listen(port, () => console.log(`Server is up and running ${port}`));
