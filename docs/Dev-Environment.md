# Dev Environment

When you are developing with npm modules it is always a good idea to work in a segregated or virtual environment. This provides a quick way to get set-up and run existing projects, it also makes it possible to install specific versions of modules without affecting your other projects and machine in general.

After you have set up your environment as described below you can kick of your project by clone our [extendscriptr boilerplate](https://github.com/ExtendScript/extendscriptr-boilerplate) template.

    $ git clone https://github.com/ExtendScript/extendscriptr-boilerplate.git

## Setup using NodeEnv
I prefer to use the [`nodeenv`](https://github.com/ekalinin/nodeenv). A tool that integrates with [`virtualenvwrapper`](https://github.com/pypa/virtualenv) to manage my isolated [`nodejs`](https://nodejs.org/en/) (ExtendScript) environment.

There is a great guide on how to setup your virtual environment at [python-guide.org](http://docs.python-guide.org/en/latest/dev/virtualenvs/)

After your Python environment is setup we can visit our project folder and create a new environment for this project at the top level (next to your version control directory):

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

> To make things even easier you can install [virtualenv-auto-activate.sh](https://gist.github.com/GitBruno/f384e39ec9c54cf4c203e73fb40b224f) so the virtual environment is automatically started when entering the folder.

## .gitignore your .venv

We don't want to commit our virtual environment to git. Therefore to finbish it off we need to add the `.venv` folder to our global ignore file. Feel free to fork my [.gitignore_global](https://github.com/GitBruno/.gitignore_global).

## Setup using Docker

[Download](https://store.docker.com/) and install Docker if you have not allready and pull the official [docker-node](https://github.com/nodejs/docker-node). The git has some great documentation but if you're after a nicer read  check the write-up from [Azat Mardan](https://webapplog.com/node-docker/).

