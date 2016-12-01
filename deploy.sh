#!/bin/bash -e

echo "enter your artifacts bucket name"
read ARTIFACTS_BUCKET_NAME

rm -rf node_modules/
npm install --production
aws cloudformation package --template-file template.yml --output-template-file template.tmp.yml --s3-bucket "${ARTIFACTS_BUCKET_NAME}"
aws cloudformation deploy --template-file template.tmp.yml --stack-name sam-iot-example --capabilities CAPABILITY_IAM
