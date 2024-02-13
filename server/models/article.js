const mongoose = require("mongoose");
const slugify = require("slugify");

// article schema
const articleSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    content: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // for avoid using id in article urls
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

// slugify the title of article to use in article url
articleSchema.pre("validate", function (next) {
  if (this.title) {
    this.slug = slugify(this.title, {
      lower: true,
      strict: true,
    });
  }

  next();
});

module.exports = mongoose.model("Article", articleSchema);
