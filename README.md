gnome-shell-theme-spitter
=========================

A node app to swiftly develop gnome shell themes.

## Installation

### Deps

* [node](https://nodejs.org)
* [npm](https://www.npmjs.com)
* [gulp](https://www.npmjs.com/package/gulp)
* [gnome shell user themes extension](https://extensions.gnome.org/extension/19/user-themes/)

Clone repo, open a terminal and run `npm install`

### Configuration

Edit **theme.json** adjusting it with your info:

    "name": "theme-name",
    "user": "san",
    "version": "1.0.0",
    "shell": "GNOME Shell 3.18.4",
    "email": "santiago_rebella@hotmail.com",
    "url": "https://github.com/santiagoRebella",
    "author": "Santiago Rebella"

**name** and **user (the /home user folder name)** determines gulp task locPath var:
`
/home/${theme.user}/.themes/${theme.name}/gnome-shell/
`
used to send there builds and refresh shell. You can modify that in the gulpfile. 
*The rest of the info will be used in the build header*

### Deploy

Open a terminal and run **gulp deploy**, open the ***Tweak Tool*** and select the shell theme you just created.

## Use

Open a terminal, from project root run 

```
gulp
```

Now open file **src/base/theme.scss**, change something, watch it change live on save.

## Tasks

```
gulp deploy
```

Will transpile scss and copy css and assets to `/home/${theme.user}/.themes/${theme.name}/gnome-shell/`.

```
gulp pack
```

Will transpile scss and copy css and assets to a sibling folder of this project called **spits/theme-name** already standardly packed (you can of course change that in the gulpfile).

```
gulp
```

Will watch for changes on **/src** folder and transpile the scss on change, refreshing the shell.

## Motivation

I created this project because I love to mess up with gnomes, but was tired of 
```
alt + f2 >> rt
```
and found time ago a comment in a forum that did the magic: 

```
gdbus call --session --dest org.gnome.Shell --object-path /org/gnome/Shell --method org.gnome.Shell.Eval 'Main.loadTheme();'
```

I wanted mainly to squeeze that comment and share it.

Also to broke down the original scss in smaller SMACSS inspired bits and tried to make it centralized and bounded to src/base/theme.scss (this still in progress)

You can find the original sass gnome-shell sources at

* [gnome-shell-sass](https://git.gnome.org/browse/gnome-shell-sass/tree/)


### Code Structure quick overview

```
.
├── csslint-reporter.js
├── dist
│   ├── calendar-arrow-left-black.svg
│   ├── calendar-arrow-right-black.svg
│   ├── gnome-icon-black.png
│   └── gnome-shell.css
├── gulpfile.js
├── package.json
├── README.md
├── src
│   ├── assets
│   │   ├── calendar-arrow-left-black.svg
│   │   ├── calendar-arrow-left-white.svg
│   │   ├── calendar-arrow-right-black.svg
│   │   ├── calendar-arrow-right-white.svg
│   │   ├── gnome-foot.png
│   │   ├── gnome-icon-black.png
│   │   └── gnome-icon-white.png
│   ├── base
│   │   ├── globals.scss
│   │   ├── palette.scss
│   │   └── theme.scss
│   ├── components
│   │   ├── buttons.scss
│   │   ├── dashboard.scss
│   │   ├── eeky.scss
│   │   ├── entries.scss
│   │   ├── looking-glass.scss
│   │   ├── modal-dialogs.scss
│   │   ├── notifications-message-tray.scss
│   │   ├── osd.scss
│   │   ├── overview.scss
│   │   ├── popovers-menus.scss
│   │   ├── screenshield.scss
│   │   ├── top-bar.scss
│   │   ├── widgets.scss
│   │   └── workspaces.scss
│   ├── mixins
│   │   ├── buttons.scss
│   │   └── entries.scss
│   ├── theme-manifest.scss
│   └── tools
│       └── drawing.scss
└── theme.json

```

## Contributors

Comments and improvements allways welcome. Fork it!

## License

  Copyright (c) 2016, Santiago Rebella <santiago_rebella@hotmail.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 2 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.

  You should have received a copy of the GNU General Public License
  along with this program.  If not, see <http://www.gnu.org/licenses/>.
