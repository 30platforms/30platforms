+++
title = "Deploying a Static Site to Netlify"
date = 2018-05-09T22:25:13-04:00
draft = false

# Tags and categories
# For example, use `tags = []` for no tags, or the form `tags = ["A Tag", "Another Tag"]` for one or more tags.
tags = ["hugo", "netlify", "aws", "digital ocean", "github"]
categories = []

# Featured image
# Place your image in the `static/img/` folder and reference its filename below, e.g. `image = "example.jpg"`.
# Use `caption` to display an image caption.
#   Markdown linking is allowed, e.g. `caption = "[Image credit](http://example.org)"`.
# Set `preview` to `false` to disable the thumbnail in listings.
[header]
image = "headers/bubbles-wide.jpg"
caption = ""
preview = true

+++
Here's the cool thing about static sites - they are static! This means that they are easy to deploy and low cost to host. You can host a static site on any web server that  serves static assets, but I have decided to host this site on Netlify because Netlify is free and awesome for static sites. In this article I'll break down a few different hosting options for static sites.

### What is a Static Site Exactly?

A static site is web site that serves static HTML pages, usually with some CSS files and maybe a little bit of Javascript. For a site to be considered static, Javascript should be kept to a minimum. I consider 30platforms.com to be a static site, but it does use a little bit of Javascript to enable code highlighting (highlight.js) and a few Bootstrap interactive features (jQuery) and Google Analytics.

When you navigate around a static site, different HTML pages are served from the backend web server for each page in the site. This is the opposite of a Single Page Application (SPA) where the pages are rendered by client side Javascript and navigation is handled by a client side Javascript SPA framework.

Static sites are search engine friendly because for each URL crawled by a search engine, the server speedily returns static HTML and no client side Javascript rendering is needed. 

Static site generators modernize the process of building a static site by allowing you to use use HTML templates and author pages in simple Markdown files. Then the generator framework provides build tools to pre-render the source files into static HTML files, which can then be deployed a web server.

![static site generator](/img/static-site-generator.png)

### Static Site Hosting Options

Here are 4 good options for static site hosting that I considered for 30 Platforms:

1. Github Pages
2. Amazon Web Services S3
3. Digital Ocean with Nginx
4. Netlify

**Github Pages** is a popular option for documentation and showcase sites where the project source code is stored in a Github repository. Github Pages sites are deployed by committing your static HTML to the repository, which means that if you use a Static Site Generator, you need to run your build step locally and commit the resulting HTML. This feels slightly awkward to me as I'm used to running builds on a Continuous Integration server and only committing source code.

Of course you can host a static site on **Amazon Web Services**, but getting it setup is more complicated than Github Pages or Netlify. Due to the sheer volume of offerings, the AWS console itself is overwhelming. Hosting a static site on AWS involves setting up S3 buckets, configuring permissions to files (your HTML) and setting up a redirect to your www domain name. Then there are more steps to setup Cloudfront and HTTPS. On top of that, while hosting a static site with AWS should not be overly expensive, it is not free. It's hard to beat free.

With **Digital Ocean**, you can quickly provision cloud based Linux servers called Droplets. When you create a droplet, you will get root access to the server so that you can configure and install software on it. If you wanted to host a static site on a Droplet, you would most likely use the highly regarded Nginx web server. If you are looking for a "close to the metal" experience and you like operating Linux servers, then Digital Ocean can be fun, but it's probably even more steps and setup than AWS would be. Also, the smallest Droplet starts at $5 per month.

Since I have chosen to go with **Netlify**, I'll discuss it in further detail below, but here is a small matrix comparing these options.

<table class="table">
  <thead>
    <tr>
      <th></th><th>Cost</th><th>Features</th><th>Ease of Setup</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Github Pages</td><td>Free</td><td>Minimal</td><td>Easy</td>
    </tr>
    <tr>
      <td>Amazon Web Services</td><td>Negligible*</td><td>Extensive</td><td>Medium</td>
    </tr>
    <tr>
      <td>Digital Ocean</td><td>$5/Month</td><td>Extensive</td><td>Hard</td>
    </tr>
    <tr>
      <td>Netlify</td><td>Free</td><td>Extensive</td><td>Easy</td>
    </tr>
  </tbody>
</table>

<small>*Can vary based on traffic</small>

### Netlify

Netlify is billed as an *All-in-one platform for automating modern web projects* and everything about Netlify does feel modern and frictionless, but their pricing at $0 plus key features are unbeatable.

![netlify pricing](/img/netlify-pricing.png)

With Netlify you can automate deployment of a static site, on a custom domain, with HTTPS **for free**. That's hard to beat.

### Deploying a Hugo Site to Netlify

The easiest way to deploy a site to Netlify is to connect Netlify to a Github repository and use a [netlify.toml](https://github.com/30platforms/30platforms/blob/master/netlify.toml) file in the root of the repository.

```toml
[build]
  publish = "public"
  command = "hugo"

[context.production.environment]
  HUGO_VERSION = "0.40.2"
  HUGO_ENV = "production"
  HUGO_ENABLEGITINFO = "true"
```
This file contains the build instructions for Netlify. The first time you connect Netlify to your repo it will immediately perform a build and deploy of your site to a temporary domain name. From there, you can use the Netlify console to add a custom domain and HTTPS to your site. I would estimate that it took around 10 minutes to deploy this site *the very first time I tried Netlify*.

### Continuous Delivery

Once you complete your initial deployment to Netlify your site will already be configured for Continuous Delivery. Netlify will monitor your repository's master branch and automatically build and deploy any changes. This makes deployment as simple as a `git push` and changes will show up on the live site a minute or two later!

I hope you found this article helpful. If you have any feedback, I would love to hear it.
