# Dev Environment

When you are developing with npm modules it is always a good idea to work in a segregated or virtual environment. This provides a quick way to get set-up and run existing projects, it also makes it possible to install specific versions of modules without affecting your other projects and machine in general.

After you have set up your environment as described below you can kick of your project by clone our [extendscriptr boilerplate](https://github.com/ExtendScript/extendscriptr-boilerplate) template.

    $ git clone https://github.com/ExtendScript/extendscriptr-boilerplate.git

## Setup using NodeEnv
I prefer to use the [`nodeenv`](https://github.com/ekalinin/nodeenv). A tool that integrates with [`virtualenvwrapper`](https://github.com/pypa/virtualenv) to manage my isolated [`nodejs`](https://nodejs.org/en/) (ExtendScript) environment.

There is a great guide on how to setup your virtual environment at [python-guide.org](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

After your Python environment is setup we can start to create our ExtendScript development environment. I'll name mine `esdev` but you can call it anything you like:

    $ virtualenv esdev

Now we are inside the virtual Python environment we can install the Node components.

    $ pip install nodeenv
    $ nodeenv -p

That's all! Now all your Node modules will be installed into your virtual `esdev` environment. Adding a polyfill is a good start.

    $ workon esdev
    $ npm install @extendscript/aes.fill.bundle.es5


## Setup using Docker

[Download](https://store.docker.com/) and install Docker if you have not allready and pull the official [docker-node](https://github.com/nodejs/docker-node). The git has some great documentation but if you're after a nicer read  check the write-up from [Azat Mardan](https://webapplog.com/node-docker/).

