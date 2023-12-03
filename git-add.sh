#!/bin/bash

file=TR00

for ((c = 0; c <= 9; c++)); do
  git add uploads/pictures/$file$c*.*
  git commit -m "pictures/$file$c*.*"
  git push
done
