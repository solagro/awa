<p align="center">
  <a href="https://solagro.org/">
    <img alt="Gatsby" src="https://avatars0.githubusercontent.com/u/55191402" width="60" />
  </a>
</p>

<h1 align="center">
  Solagro / AWA
</h1>

## Getting Started

### Prerequisites

To be able to work with this project, you need:

- [nodejs](https://nodejs.org) *([nvm](https://github.com/nvm-sh/nvm) does a
  neat workthrough)*

### Development

```sh
$ git clone git@github.com:solagro/awa.git
$ cd awa
$ npm ci    # Install all dependencies
```

This will get you a copy of the project ready on your local machine.
<!-- See deployment for notes on how to deploy the project on a live system. -->

Start development mode with:

```sh
& npm start
```

Then open the source code and **start editing!**

Your site is running at [`http://localhost:8000`](http://localhost:8000)

You'll also see a second link: [`http://localhost:8000/___graphql`](http://localhost:8000/___graphql).  
This is a tool you can use to experiment with querying your data. Learn more
about using this tool in the [Gatsby tutorial](https://www.gatsbyjs.org/tutorial/part-five/#introducing-graphiql).

## Running the tests

```sh
$ npm t # Or `npm run test`
```

## Deployment

- Build command will give you a `public` directory.
- Transfert/copy this directory in a any place that will be served with `https`

```sh
$ npm run build
$ npx serve -s public
```

You can also test locally full build by using `serve` command after building:

```sh
$ npm run build
$ npm run serve

info gatsby serve running at: http://localhost:9000/
```

## Built With

- [Gatsby](https://www.gatsbyjs.org/)
- [Material UI](https://v4.mui.com/)

<!--
## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of
conduct, and the process for submitting pull requests to us.
-->

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available,
see the [tags on this repository](https://github.com/solagro/awa/tags).

### Tools

Releasing new tags requires [`git-extras`](https://github.com/tj/git-extras)
which provide [`git changelog`](https://github.com/tj/git-extras/blob/master/Commands.md#git-changelog)
command.

This will then be used like:

```sh
$ npm version <patch|minor|major|semver>
```
<!--
## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
-->
