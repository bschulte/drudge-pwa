#!/bin/bash

npm run build

scp -r build/* bschulte@204.48.21.24:/var/www/drudge.cromox.org/html/