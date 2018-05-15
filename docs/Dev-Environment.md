# Dev Environment

When developing npm modules it is a good idea to work in a segregated (virtual) environment. This provides a quick way to get set up without affecting your other projects and machine in general.

This is an optional guide on how you could set up your environment. Once you’re good to go, feel free to clone our [extendscriptr boilerplate](https://github.com/ExtendScript/extendscriptr-boilerplate) template.

    $ git clone https://github.com/ExtendScript/extendscriptr-boilerplate.git

## Setup using NodeEnv
I recommend using [`nodeenv`](https://github.com/ekalinin/nodeenv). A tool that integrates with [`virtualenvwrapper`](https://github.com/pypa/virtualenv) to manage isolated [`nodejs`](https://nodejs.org/en/) environments.

There is a great guide on how to setup your virtual environment at [python-guide.org](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

When your `virtualenv` is installed we can create a new environment for a project at the top level (next to your version control directory):

    $ virtualenv .venv

So your project folder looks roughly like this:

	 yourProject
	 ├── .git
	 │   ├── HEAD
	 │   ├── config
	 │   ├── ...
	 └── .venv
	     ├── bin
	     ├── include
	     └── lib

Now we are inside the virtual Python environment we can install the Node components.

    $ pip install nodeenv
    $ nodeenv -p

> The Python Package Index no longer supports http connections. You can ignore SSL errors by setting pypi.python.org as the trusted source: `pip install --trusted-host pypi.python.org nodeenv`

That's all, Now get to work!

    $ workon yourProject

> To make things even easier you can install and use our [build-node-venv](https://github.com/ESCPP/build-node-venv) module.

## .gitignore your .venv

We don't want to commit our virtual environment to git. Therefore it is advised to add the `.venv` folder to your global ignore file. Feel free to fork my [.gitignore_global](https://github.com/GitBruno/.gitignore_global).

## Setup using Docker

[Download](https://store.docker.com/) and install Docker if you have not allready and pull the official [docker-node](https://github.com/nodejs/docker-node). The git has some great documentation but if you're after a nicer read  check the write-up from [Azat Mardan](https://webapplog.com/node-docker/).

