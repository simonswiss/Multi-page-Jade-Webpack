# Multi-page Websites with Jade, Stylus, ES6 & Webpack

Webpack is awesome, but is usually used to build single page applications with React or other JS libraries.

Many of us front-end developers learned to love using Jade/Pug over the years, and would like to keep using this templating language for building traditional, multi-page websites.

This repository aims to let you keep using your Jade/Pug workflow, but step into the wonderful (and daunting) world of Webpack.

Create multiple Jade page templates, assign them in your webpack config and let Webpack handle the rest!

## How do I use this?

First, clone this repo on your local machine and `cd` into it. You can then install the package dependencies by running `npm install`.

You can then start the `webpack-dev-server` by running th command `npm start`.

To output your website for production, run the comman `npm run build`.

## Folder structure

```
src/
  jade/
  js/
    entries/
  stylus/
  images/
webpack-config
```

The files you should edit are inside the `src` folder.

Your Jade templates will be in the `src/jade/` folder and should be configured in your webpack config, as explained below.

When you run the `build` npm script, your files will be minified and output in a `dist` folder with the following structure:

```
dist/
  page1.html
  page2.html
  ...
  css/
    page1.css
    page2.css
    ...
  js/
    page1.js
    page2.js
    ...
  images/
    ...
```

## Webpack configuration


### HtmlWebpackPlugin

Each Jade file you want to convert to an HTML page needs to call an instance of the `HtmlWebpackPlugin`. To make things easier, I have created a function called `jadePage()` that will do just that.

You can see this fuction used at the bottom of the `webpack.config.js` file, in the `plugins` array. All you need to do is invoke that function and pass it the name of your Jade file.

If you wanted to compile a `contact.jade` file, you would simply add a line below the existing two, like so:

`jadePage('contact')`

### Entry Point

Each page also needs to have its' own entry point, in the `entry` object on top of the config file. Assuming your contact page is sitting in `src/jade/`, you can use the `PATHS.entries` to add your new entry, like so:

```
contact: PATHS.entries + 'contact.js'
```

## Entry Point File

Finally, you need to create a new Webpack entry file, in the `src/js/entries/` folder. This is where you'll import your JS and CSS modules, which will let Webpack know how to bundle your code together.