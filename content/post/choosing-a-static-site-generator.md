+++
title = "Choosing a Static Site Generator in 2018"
date = 2018-05-01T18:10:30-04:00
draft = false

# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["hugo","netlify", "wordpress"]
summary = "Wordpress powers around 25% of the world's websites and has a rich ecosystem of themes, plugins, community support and hosting options. It is often my go-to recommendation when helping friends who want to deploy a website and I have built several Wordpress sites for clients. But, it's 2018 and I want to build my site with a static site generator."
categories = []

# Featured image
# Place your image in the `static/img/` folder and reference its filename below, e.g. `image = "example.jpg"`.
[header]
image = "Choosing-A-Blogging-Platform.png"
#caption = ""

#```golang
#func chooseBloggingPlatform() Platform {
#
#    wordpress := getWordpress()
#    hugo := getHugo()
#
#    if speed(hugo) > speed(wordpress) && security(hugo) > security(wordpress) {
#            return hugo
#        }
#
#    return wordpress
#}
#```
+++
Wordpress powers around 25% of the world's websites and has a rich ecosystem of themes, plugins, community support and hosting options. It is often my go-to recommendation when helping friends who want to deploy a website and I have built several Wordpress sites for clients. But, it's 2018 and I want to build my site with a static site generator.

```golang

func chooseBloggingPlatform() Platform {

    wordpress := getWordpress()
    hugo := getHugo()

    if speed(hugo) > speed(wordpress) && security(hugo) > security(wordpress) {
            return hugo
        }

    return wordpress
}

```

### Wordpress vs Static Site Generators

Wordpress is a full Content Management System (CMS) that allows writers to use a What You See is What You Get (WYSIWIG) interface to write content and serve it on the web. When you write a post on Wordpress, your data is actually stored in a MySQL database. Then when a user views a page on your site, Wordpress fetches the content from the database, renders HTML and serves that HTML back to the user's web browser.

![wordpress architecture](/img/wordpress-architecture.png)

Static site generators on the other hand use *pre-rendered content*. This means that the HTML, CSS and Javascript assets have already been built and are immediately ready to be served without the need to fetch and render from a database. When static sites are deployed to a Content Delivery Network (CDN) it makes for extremely fast load times and a great user experience. 

Static sites are also more secure than Wordpress sites because there is no admin console and no online way to edit content. While the Wordpress admin console is very powerful and makes it easy to edit and change content, it is also a well known attack vector that bad actors can use to compromise a site.

While there are lots of tradeoffs, I have a bias for action. Lets make a decision and start building. These are the main reasons I'm choosing a static site generator.

- I want to learn something new and I am comfortable with command line tools and deploying web content
- It will be cool to deploy something to Netlify for a very low cost (free?)
- A static site generator will give me more street cred amongst my peers :thinking:
- Static sites are much faster and more secure than full stack CMS systems like Wordpress

### Top Static Site Generators

After reading a few threads and articles, I narrowed the choices down to 3 options: *Jekyll, Hugo and VuePress*. I considered Jekyll because its been around for a while and has lots of themes and community support. Hugo seems like a good new option that is gaining a lot of traction and is built in Go, and VuePress is brand new and created by Evan You (the creator of Vue.js), but is geared more towards documentation.

Hugo and VuePress both appealed to me because I like Go and I like Vue, so installed both of them and tried them out. In both cases it only takes a few minutes to get a site running locally, but I immediately noticed how fast Hugo's generation and startup process is vs the the startup of the Node based VuePress. Go is just *SO* fast.

After poking around some more I found the Academic Theme for Hugo which I really liked and that was enough for me to make the decision to use Hugo.

### Working with Hugo

Hugo's directory layout is pretty straightforward and easy to grok. There is a directory for posts, one for static assets such as images and one for the theme you are using, etc.

Web content in Hugo is based on Markdown files which are then converted to static HTML during the build process. These files can be created from a command line helper.

```bash
hugo new post/choosing-a-static-site-generator.md
```
The above command creates a new file that is pre-populated with a little bit of meta data for the post.

```toml
---
title: "Choosing a Static Site Generator"
date: 2018-05-06T07:33:58-04:00
draft: true
---
```
Then you can fire up the local, hot-loading, blazing fast Hugo server with the `hugo server -D` command and start writing. 

So far so good. After I create a few more articles, I'll figure out how to actually deploy the site on a static host like Netlify or Github Pages.