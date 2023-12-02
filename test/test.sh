#!/bin/bash

cd /data
mkdir exports
cd exports
mkdir certificates
mkdir id-cards
mkdir opito
mkdir welcome-letter
cd opito
mkdir csv
cd /data
mkdir uploads
cd uploads
mkdir foets
mkdir learner-ids
mkdir pictures

cd /

ls -R | grep ":$" | sed -e 's/:$//' -e 's/[^-][^\/]*\//--/g' -e 's/^/   /' -e 's/-/|/'
