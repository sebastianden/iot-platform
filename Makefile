# Define your S3 bucket
S3_BUCKET = iot-platform-website
SET_ENV_SCRIPT = set_env.sh

# Define the targets
.PHONY: backend frontend clean app

# Command to deploy the backend
backend:
	@echo "Deploying backend..."
	@cd backend && cdk deploy --all

# Command to build the frontend and sync with S3
frontend:
	@echo "Setting up environment for frontend..."
	@cd frontend && ./$(SET_ENV_SCRIPT)  # Execute the set_env.sh script
	@echo "Building frontend..."
	@cd frontend && npm run build
	@echo "Syncing build to S3 bucket s3://$(S3_BUCKET)..."
	@cd frontend && aws s3 sync ./out s3://$(S3_BUCKET) --delete

# Command to build both backend and frontend
app: backend frontend
	@echo "Successfully deployed both backend and frontend."