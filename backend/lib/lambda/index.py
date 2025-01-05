import os
import json
import boto3
from boto3.dynamodb.conditions import Key

# TODO: mypy, fastapi + docs

dynamodb = boto3.resource("dynamodb")
table = dynamodb.Table(os.getenv("DYNAMODB_TABLE"))
measurements = ["temperature", "humidity"]


def query_measurements(start: str, end: str, device: str) -> list:
    """
    Query DynamoDB for measurements from a specific device within a time range.

    Parameters
    ----------
    start: str
        Start timestamp
    end: str
        End timestamp
    device: str
        Device

    Returns
    -------
    list: Result of query
    """
    query_results = []

    response = table.query(
        KeyConditionExpression=Key("device").eq(device)
        & Key("timestamp").between(int(start), int(end))
    )
    query_results.extend(response["Items"])

    while "LastEvaluatedKey" in response:

        response = table.query(
            KeyConditionExpression=Key("device").eq(device)
            & Key("timestamp").between(int(start), int(end)),
            ExclusiveStartKey=response["LastEvaluatedKey"],
        )
        query_results.extend(response["Items"])

    return query_results


def format_results(query_results: list) -> dict[str, list]:
    """
    Arrange the query results into a dict of lists. Each key contains a list
    with either timestamps, devices or sensor measurements

    Parameters
    ----------
    query_results: list
        Results of queries

    Returns
    -------
    dict: Formatted results as dict of lists
    """
    data = []

    for item in query_results:
        formatted_item = {}
        for key, value in item.items():
            if key == "device":
                formatted_item["device"] = value
            elif key == "timestamp":
                formatted_item["timestamp"] = int(value)
            else:
                formatted_item[key] = float(value)
        data.append(formatted_item)
    return data


def lambda_handler(event: dict, _) -> dict:

    if event["httpMethod"] == "POST":
        req = json.loads(event["body"])
    elif event["httpMethod"] == "GET":
        req = event["queryStringParameters"]
    elif event["httpMethod"] == "OPTIONS":
        return {
            "statusCode": 200,
            "headers": {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            },
        }

    query_results = query_measurements(req["from"], req["to"], req["device"])
    data = format_results(query_results)

    return {
        "statusCode": 200,
        "body": json.dumps({"data": data}),
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
        },
    }
