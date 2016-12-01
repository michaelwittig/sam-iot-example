# SAM IoT Example

## Installation

1. Make sure to update the AWS CLI, otherwise you may not have support for SAM:

```
sudo pip install --upgrade awscli
```

2. Create a artifacts bucket:

```
aws s3 mb s3://$USER-artifacts
```

3. Deploy the template using SAM:

```
./deploy.sh
```

Done.

## Usage

TODO

## Cleanup

TODO
