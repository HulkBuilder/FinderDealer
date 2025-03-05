import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { DealerLookupStack } from '../lib/dealer-lookup-stack';

const app = new cdk.App();
new DealerLookupStack(app, 'DealerLookupStack', {});
