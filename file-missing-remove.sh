#!/bin/bash

folder=$(basename $(pwd))

for i in *; do
  if ! grep -qxFe "$i" ../$folder.txt; then
    echo "Deleting: $i"
    rm "$i"
  fi
done
