#!/bin/bash

# Replace these with your actual stack names
AUTH_STACK_NAME="AuthStack"
API_STACK_NAME="ApiStack"

# Query the outputs
USER_POOL_CLIENT_ID=$(aws cloudformation describe-stacks --stack-name "$AUTH_STACK_NAME" --query "Stacks[0].Outputs[?OutputKey=='UserPoolClientId'].OutputValue" --output text)
USER_POOL_ID=$(aws cloudformation describe-stacks --stack-name "$AUTH_STACK_NAME" --query "Stacks[0].Outputs[?OutputKey=='UserPoolId'].OutputValue" --output text)
QUERY_API_URL=$(aws cloudformation describe-stacks --stack-name "$API_STACK_NAME" --query "Stacks[0].Outputs[?OutputKey=='QueryApiUrl'].OutputValue" --output text)

# Create the .env.local file
cat <<EOL > .env.local
NEXT_PUBLIC_USER_POOL_CLIENT_ID=${USER_POOL_CLIENT_ID}
NEXT_PUBLIC_USER_POOL_ID=${USER_POOL_ID}
NEXT_PUBLIC_QUERY_API_URL=${QUERY_API_URL}
EOL

echo ".env.local file created with the following content:"
cat .env.local