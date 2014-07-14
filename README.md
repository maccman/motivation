Motivation
========

Your age.

Build
=====

For packaging a [.crx](https://developer.chrome.com/extensions/crx) you will need a [crxmake](https://github.com/Constellation/crxmake)

    $ git clone git@github.com:maccman/motivation.git
    $ cd motivation
    $ sudo gem install crxmake
    $ crxmake --pack-extension .
    
Installation
============

Drag and drop newly created `motivation.crx` to `chrome://extensions/` list.
