#!/bin/bash
dir=`pwd`;
echo "setting up database directories"
cd ..
mkdir data
cd data
mkdir log
cd log
touch log.txt
cd $dir
echo "building client"
cd client
npm install
npx webpack
cd $dir
echo "building server"
cd server
npm install
tsc
echo "building finished"