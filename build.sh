#!/bin/bash
echo "building client"
cd client
npm install
npx webpack
echo "building server"
cd ../sever
npm install
tsc
echo "building finished"