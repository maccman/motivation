Motivation for Firefox
=======================

![](screenshot.png)

Originally [here](http://gunargessner.com/motivation).

[Motivation] is a pretty awesome Google Chrome Extension. I'll teach you here
how to make it work in Firefox.

First, in order to change the New-Tab Page you'll need to install a Firefox
Add-on called [New Tab Homepage] (`about:config` [doesn't work anymore][aboutconfig]).

If you're git-savvy:

> The project is open-source by [Alex MacCaw], so you could go over to the [GitHub
> Repo] and clone it, BUT, the original files include vendor-specific css
properties only, which won't work in our loved FF. I've already created a [Pull
> Request], but for now we're better of cloning [my fork] of it.

Or, you can download it as a [zip file] and extract it somewhere.

You will have to keep these files, so choose an unobstructive path.

Inside it there is a file called `dashboard.html`. Run it with Firefox and you
should have something like this:

![file:///home/gcg/.motivation/dashboard.html](/inc/motivation.png)

Notice the URL -- should start with `file:///` -- and [set it as your home page][set
homepage].

That's it! Your new home page should be "Motivation" and the addon will make it
your new-tab hompage automagically.

Thank you.

[Motivation]: https://chrome.google.com/webstore/detail/motivation/ofdgfpchbidcgncgfpdlpclnpaemakoj
[New Tab Homepage]: https://github.com/gunar/motivation/archive/master.zip
[aboutconfig]: https://support.mozilla.org/en-US/questions/1084992
[Alex MacCaw]: http://blog.alexmaccaw.com/life-hacks
[GitHub Repo]: https://github.com/maccman/motivation
[Pull Request]: https://github.com/maccman/motivation/pull/17
[my fork]: https://github.com/gunar/motivation
[zip file]: https://github.com/gunar/motivation/archive/master.zip
[set homepage]: https://support.mozilla.org/en-US/kb/how-to-set-the-home-page


