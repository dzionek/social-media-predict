#!/bin/bash

# Linters

function checkMypy() {
  echo "-> Mypy"
  mypy .
  echo
}

function checkFlake8() {
  echo "-> Flake8"
  flake8
  echo
}

function checkEsLint() {
  echo "-> ES-Lint"
  cd frontend || exit
  npm run eslint
  cd ..
  echo
}

function checkLinters() {
  echo
  echo "*** --- Linters --- ***"
  echo

  checkMypy
  checkFlake8
  checkEsLint
}

# Unit/Integration tests

function testJest() {
  echo "-> Jest"
  cd frontend || exit
  npm run test
  cd ..
  echo
}

function testPytest() {
  echo "-> Pytest"
  echo
  pytest --ignore=frontend --cov-config=.coveragerc --cov=. -n auto
}

function testUnit() {
  echo
  echo "*** --- Unit/Integration Tests --- ***"
  echo

  testJest
  testPytest
}

# All tests/checking

function all() {
    checkLinters
    testUnit
}

# Command line arg parser

case $1 in

  mypy)
    checkMypy
    ;;

  flake8)
    checkFlake8
    ;;

  eslint)
    checkEsLint
    ;;

  linters)
    checkLinters
    ;;

  jest)
    testJest
    ;;

  pytest)
    testPytest
    ;;

  unit)
    testUnit
    ;;

  all)
    all
    ;;

  *)
    echo
    echo "Incorrect arg: $1."
    echo
    ;;
esac
