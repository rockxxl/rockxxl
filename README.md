# gatsby-starter-hello-world
Starter with the bare essentials needed for a [Gatsby](https://www.gatsbyjs.org/) site.

Install this starter (assuming Gatsby is installed) by running from your CLI:
```
gatsby new gatsby-site https://github.com/gatsbyjs/gatsby-starter-hello-world
```

Or [view the live demo here](https://gatsby-starter-hello-world-demo.netlify.com/).

## Running in development
`gatsby develop`


## Cap'ns log
### Cleaning up files
* use a bunch of regex and replace
* Add categories, based on title pattern.
* add missing news category
  * `grep -L "category" * | tar -T - -cf - | tar -C nieuws -xf -`
  * move back to `post` root and overwrite (just using Finder)

## Slug
* Create slugs based on title

## Redirect old permalinks to new
* `createRedirect` in `gatsby-node.js`
* Let Netlify handle redirects using `gatsby-plugin-netlify`
