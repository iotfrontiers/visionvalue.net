#!/bin/bash
git status --porcelain

if [[ `git status --porcelain` ]]; then
  echo 'collection changed'
else
  echo 'collection unchanged'
fi
