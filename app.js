const express = require("express");
const port = 3000;
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

// lấy về dữ liệu của 1 users
app.get("/api/v1/users/:id", (req, res) => {
  let { id } = req.params;
  try {
    let users = JSON.parse(fs.readFileSync("data/users.json"));
    let user = users.find((e, i) => e.id == +id);
    if (!user) {
      res.json({
        message: "user not found",
      });
    } else {
      res.json({
        user: user,
      });
    }
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

// lấy về dữ liệu của toàn bộ users
app.get("/api/v1/users", (req, res) => {
  try {
    let users = JSON.parse(fs.readFileSync("data/users.json"));
    res.json({
      users: users,
      status: "success",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
});

// thêm 1 users
app.post("/api/v1/users", (req, res) => {
  let { name, username, email, address, phone, website, company } = req.body;
  let newUser = req.body;
  try {
    let user = JSON.parse(fs.readFileSync("./data/users.json"));
    user.push(newUser);
    fs.writeFileSync("./data/users.json", JSON.stringify(user));
    res.json({
      message: "create users successfully",
    });
  } catch (error) {
    res.json({
      error: error,
      status: "success",
      message: "invalid path",
    });
  }
});

// chỉnh sửa 1 user email
app.put("/api/v1/users/:id", (req, res) => {
    const users = JSON.parse(fs.readFileSync('./data/users.json'))
    const { id } = req.params
    const findUser = users.findIndex((user) => user.id == id)
    if (findUser == -1) {
      res.send('User not found')
    }
    else {
      users[findUser] = req.body
      fs.writeFileSync('./data/users.json', JSON.stringify(users))
      res.send({
        message: 'Update successfully'
      })
    }
  });

// delete 1 user
app.delete("/api/v1/users/:id", (req, res) => {
    const { id } = req.params;
    let users = JSON.parse(fs.readFileSync("./data/users.json"));
    let postIndex = users.findIndex((user) => user.id === Number(id));
    try {
      users.splice(postIndex, 1);
      fs.writeFileSync("./data/users.json", JSON.stringify(users));
      res.json({
        message: "User deleted successfully",
        status: "success",
      });
    } catch (error) {
      res.json({
        error: error,
        status: "error",
        message: "Internal server error",
      });
    }
  });

// **********************

// lấy về dữ liệu của 1 users
app.get("/api/v1/posts/:id", (req, res) => {
    let { id } = req.params;
    try {
      let posts = JSON.parse(fs.readFileSync("data/posts.json"));
      let post = posts.find((e, i) => e.id == +id);
      if (!post) {
        res.json({
          message: "post not found",
        });
      } else {
        res.json({
          post: post,
        });
      }
    } catch (error) {
      res.json({
        error: error,
      });
    }
  });
  
  // lấy về dữ liệu của toàn bộ posts
  app.get("/api/v1/posts", (req, res) => {
    try {
      let posts = JSON.parse(fs.readFileSync("data/posts.json"));
      res.json({
        posts: posts,
        status: "success",
      });
    } catch (error) {
      res.json({
        error: error,
      });
    }
  });
  
  // thêm 1 posts
  app.post("/api/v1/posts", (req, res) => {
    let { userId,id,title,body} = req.body;
    let newUser = req.body;
    try {
      let user = JSON.parse(fs.readFileSync("./data/posts.json"));
      user.push(newUser);
      fs.writeFileSync("./data/posts.json", JSON.stringify(user));
      res.json({
        message: "create posts successfully",
      });
    } catch (error) {
      res.json({
        error: error,
        status: "success",
        message: "invalid path",
      });
    }
  });
  
  // chỉnh sửa posts
  app.put("/api/v1/posts/:id", (req, res) => {
      const posts = JSON.parse(fs.readFileSync('./data/posts.json'))
      const { id } = req.params
      const findUser = posts.findIndex((user) => user.id == id)
      if (findUser == -1) {
        res.send('User not found')
      }
      else {
        posts[findUser] = req.body
        fs.writeFileSync('./data/posts.json', JSON.stringify(posts))
        res.send({
          message: 'Update successfully'
        })
      }
    });
  
  // delete 1 posts
  app.delete("/api/v1/posts/:id", (req, res) => {
      const { id } = req.params;
      let posts = JSON.parse(fs.readFileSync("./data/posts.json"));
      let postIndex = posts.findIndex((user) => user.id === Number(id));
      try {
        posts.splice(postIndex, 1);
        fs.writeFileSync("./data/posts.json", JSON.stringify(posts));
        res.json({
          message: "User deleted successfully",
          status: "success",
        });
      } catch (error) {
        res.json({
          error: error,
          status: "error",
          message: "Internal server error",
        });
      }
    });
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
