var mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  methodOverride = require("method-override"),
  expressSanitizer = require("express-sanitizer"),
  express = require("express");
const app = express();

const port = 1234;
mongoose.connect("mongodb://localhost:27017/blogs_app", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.set("useFindAndModify", false);
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);

app.use(expressSanitizer());

app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.use(express.static("public"));

var blogsSchema = new mongoose.Schema({
  title: String,
  body: String,
  image: String,
  created: { type: Date, default: Date.now }
});

var blogs = mongoose.model("blogs", blogsSchema);
// blogs.create(
//   {
//     title: "Sample Blog",
//     body: "This is the body of the blog post and the body looks nice",
//     image:
//       "https://images.pexels.com/photos/2822949/pexels-photo-2822949.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
//   },
//   function(err, blogs) {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log("New Campground");
//       console.log(blogs);
//     }
//   }
// );

app.get("/", (req, res) => {
  res.redirect("blogs");
});

//INDEX Route
app.get("/blogs", function(req, res) {
  blogs.find({}, function(err, blogs) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", { blogs: blogs });
    }
  });
});

//New Route
app.get("/blogs/new", function(req, res) {
  res.render("new");
});

app.post("/blogs", function(req, res) {
  //create blog
  //then redirect
  req.body.blog.body = req.sanitize(req.body.blog.body);
  blogs.create(req.body.blog, function(err, newBlog) {
    if (err) {
      console.log(err);
      res.render("new");
    } else {
      console.log(newBlog);
      res.redirect("/blogs");
    }
  });
});

//SHOW MORE
app.get("/blogs/:id", function(req, res) {
  blogs.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.render("show", { blog: foundBlog });
    }
  });
});

//EDIT ROUTE
app.get("/blogs/:id/edit", function(req, res) {
  blogs.findById(req.params.id, function(err, foundBlog) {
    if (err) {
      console.log(err);
    } else {
      res.render("edit", { blog: foundBlog });
    }
  });
});

//UPDATE ROUTE
app.put("/blogs/:id", function(req, res) {
  req.body.blog.body = req.sanitize(req.body.blog.body);
  blogs.findByIdAndUpdate(req.params.id, req.body.blog, function(
    err,
    updatedBlpg
  ) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs/" + req.params.id);
    }
  });
});

//DELETE ROUTE
app.delete("/blogs/:id", function(req, res) {
  blogs.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect("/blogs");
    } else {
      res.redirect("/blogs");
    }
  });
});

app.listen(port || process.env.PORT, () =>
  console.log(`App is running at ${port}`)
);
