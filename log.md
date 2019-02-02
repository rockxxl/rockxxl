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
