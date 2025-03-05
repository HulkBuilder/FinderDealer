
import boto3
import csv
import os
import json
from io import StringIO

s3 = boto3.client("s3")
dynamodb = boto3.resource("dynamodb")
BUCKET_NAME = "amplify-dealers-search"
FILE_KEY = "dealers.csv"
TABLE_NAME = "Dealers"

def lambda_handler(event, context):
    try:
        response = s3.get_object(Bucket=BUCKET_NAME, Key=FILE_KEY)
        csv_data = response["Body"].read().decode("utf-8")
        dealers = csv.reader(StringIO(csv_data))
        table = dynamodb.Table(TABLE_NAME)
        
        for dealer in dealers:
            id, name, address, city, state, zip_code = dealer
            table.put_item(
                Item={"id": id, "name": name, "address": address, "city": city, "state": state, "zip": zip_code}
            )
        
        return {"statusCode": 200, "body": json.dumps("Dealers imported successfully!")}
    except Exception as e:
        return {"statusCode": 500, "body": json.dumps(f"Error: {str(e)}")}
