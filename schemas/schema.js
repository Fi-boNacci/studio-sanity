// First, we must import the schema creator
import createSchema from "part:@sanity/base/schema-creator";

// Then import schema types from any plugins that might expose them
import schemaTypes from "all:part:@sanity/base/schema-type";

// Then we give our schema to the builder and provide the result to Sanity
export default createSchema({
  // We name our schema
  name: "default",
  // Then proceed to concatenate our document type
  // to the ones provided by any plugins that are installed
  types: schemaTypes.concat([
    {
      title: "Post",
      name: "post",
      type: "document",
      fields: [
        {
          title: "Post title",
          name: "title",
          type: "string",
          description: "100 characters possible",
          validation: (Rule) => [
            Rule.required()
              .min(10)
              .error("Garchig 10 aas deesh temdegttei baih heregtei"),
            Rule.required()
              .max(80)
              .warning("Garchig 80 aas doosh temdegttei baih heregtei"),
          ],
        },
        {
          title: "Post subtitle",
          name: "subtitle",
          type: "string",
          description: "post type should be text",
        },
        {
          title: "Publisher",
          name: "publisher",
          type: "reference",
          to: [{ type: "publisher" }],
        },
        {
          title: "Image of post",
          name: "cover_image",
          type: "image",
          fields: [
            {
              title: "image title",
              name: "alt",
              type: "text",
            },
          ],
          options: {
            hotspot: true,
          },
        },
        {
          name: "content",
          type: "array",
          title: "Content",
          of: [
            {
              type: "block",
            },
            {
              type: "image",
              fields: [
                {
                  title: "image title",
                  name: "alt",
                  type: "text",
                  options: {
                    isHighlighted: true,
                  },
                },
                {
                  title: "image position",
                  name: "position",
                  type: "string",
                  options: {
                    isHighlighted: true,
                    list: [
                      { title: "center", value: "center" },
                      { title: "right", value: "right" },
                      { title: "left", value: "left" },
                    ],
                    layout: "radio",
                  },
                },
              ],
              options: {
                hotspot: true,
              },
            },
            {
              type: "code",
              options: {
                withFilename: true,
              },
            },
          ],
        },
        {
          title: "Date",
          name: "dateandtime",
          type: "datetime",
        },
        {
          title: "Slug",
          name: "slug",
          type: "slug",
          options: {
            source: "title",
            slugify: (input) =>
              input.toLowerCase().replace(/\s+/g, "-").slice(0, 200),
          },
        },
      ],
    },
    {
      title: "Publisher",
      name: "publisher",
      type: "document",
      fields: [
        {
          title: "Publisher name",
          name: "title",
          type: "string",
        },
        {
          title: "Publisher`s image",
          name: "avatar",
          type: "image",
        },
      ],
    },
  ]),
});
