# Terraform CDK Demo

A [Terraform CDK](https://cdk.tf) demo for a HashiCorp [Twitch stream](https://www.twitch.tv/videos/731362097) by [@onlydole](https://twitter.com/onlydole), [@build1point0](https://twitter.com/build1point0) and [@skorfmann](https://twitter.com/skorfmann).

## Description

It'll build and push a Docker image out of the [./app](./app) folder and use that to spin up a Faragate service. Any change in the [./app](./app) folder will trigger a new deployment on the next `cdktf deploy`.

There's no Load Balancer or other staticly accessible endpoint, that's something to add in one of the next iterations. This means, in order to access the running Fargate task, you'll have to find the IP Address of that task via the AWS Console or the AWS CLI.

## Prerequisites

- Node >= 10.12
- Terraform CLI >= 0.12
- Docker

## Setup

```
yarn install
```

## Deployment

Assumes valid AWS credentials in ENV:

```
cdktf deploy
```
