# SAM IoT Example

## Installation

Make sure to update the AWS CLI, otherwise you may not have support for SAM:

```
sudo pip install --upgrade awscli
```

Then create a artifacts bucket:

```
aws s3 mb s3://$USER-artifacts
```

Then deploy the template using SAM and this little helpher Bash script:

```
./deploy.sh
```

Done.

## Usage

1. Go to https://console.aws.amazon.com/apigateway/ 
2. Select `sam-iot-example`
3. Select `/event` -> `POST` and click the `Test`
4. Fill the Request Body with: `{"type":"buy","price":123.45}` and submit a few times
5. Go to https://console.aws.amazon.com/dynamodb/
6. Select `Tables`
7. Select the table that starts with `sam-iot-example-EventTable-`
8. Click on Items and you would see a few events
9. Go to https://console.aws.amazon.com/s3/
10. Select the bucket that starts with `sam-iot-example-archivefraudbucket-`
11. You should see a few fraud events

## Cleanup

Remove archived events from S3 Bucket by using the AWS Management Console. The name of the bucket starts with `sam-iot-example-archivefraudbucket-`

Then remove the stack:

```
aws cloudformation delete-stack --stack-name sam-iot-example
```

Then remove the artifacts bucket:

```
aws s3 rb s3://$USER-artifacts --force
```