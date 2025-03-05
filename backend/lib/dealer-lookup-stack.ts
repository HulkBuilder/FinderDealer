import * as cdk from 'aws-cdk-lib';
import * as s3 from 'aws-cdk-lib/aws-s3';
import * as lambda from 'aws-cdk-lib/aws-lambda';
import * as dynamodb from 'aws-cdk-lib/aws-dynamodb';
import * as s3n from 'aws-cdk-lib/aws-s3-notifications';
import * as iam from 'aws-cdk-lib/aws-iam';
import * as apigateway from 'aws-cdk-lib/aws-apigateway';
import { Construct } from 'constructs';

export class DealerLookupStack extends cdk.Stack {
    constructor(scope: Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);

        const dealerBucket = new s3.Bucket(this, 'DealerBucket', {
            bucketName: 'amplify-dealers-search',
            removalPolicy: cdk.RemovalPolicy.RETAIN
        });

        const dealerTable = new dynamodb.Table(this, 'DealerTable', {
            tableName: 'Dealers',
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            removalPolicy: cdk.RemovalPolicy.RETAIN
        });

        const lambdaRole = new iam.Role(this, 'DealerLambdaRole', {
            assumedBy: new iam.ServicePrincipal('lambda.amazonaws.com'),
            managedPolicies: [
                iam.ManagedPolicy.fromAwsManagedPolicyName('service-role/AWSLambdaBasicExecutionRole'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonDynamoDBFullAccess'),
                iam.ManagedPolicy.fromAwsManagedPolicyName('AmazonS3FullAccess')
            ]
        });

        const dealerLambda = new lambda.Function(this, 'DealerLambda', {
            functionName: 'DealerDataProcessor',
            runtime: lambda.Runtime.PYTHON_3_9,
            handler: 'lambda_function.lambda_handler',
            code: lambda.Code.fromAsset('backend/lambda'),
            role: lambdaRole
        });

        dealerBucket.addEventNotification(
            s3.EventType.OBJECT_CREATED,
            new s3n.LambdaDestination(dealerLambda),
            { prefix: 'dealers.csv' }
        );

        const api = new apigateway.RestApi(this, 'DealerApi', {
            restApiName: 'Dealer Lookup API'
        });
        
        const lambdaIntegration = new apigateway.LambdaIntegration(dealerLambda);
        api.root.addMethod('POST', lambdaIntegration);
    }
}
