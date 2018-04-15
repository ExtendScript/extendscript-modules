#!/bin/bash

# prerequisites: https://gist.github.com/GitBruno/f384e39ec9c54cf4c203e73fb40b224f

# current folder
cd "${0%/*}"

# clear env if there
if [ -e "./.venv" ] ; then
	rm "./.venv"
fi

# create node env
virtualenv .venv
pip install nodeenv
nodeenv -p

echo "Ready to rock!"
